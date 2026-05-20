const getPair = require("../lib/frindshipPair");
const { findUserById } = require("../services/auth.service");
const {
  requestSend,
  getSentRequests,
  getReceivedRequests,
  findFriendRequestByPair,
  findFriendRequestById,
  findFriendByName,
} = require("../services/friendRequest.service");
const { createFriendship } = require("../services/friendShip.service");
const { getOnlineUsers, getIO } = require("../socket/socket-store");

const findFriend = async (req, res) => {
  const user = req.user.id;
  const name = req.query.name;

  try {
    const friend = await findFriendByName(name, user);
    return res.status(200).send({ success: true, data: friend });
  } catch (error) {
    return res.status(400).send({ success: false, message: error.message });
  }
};

const sendFriendRequest = async (req, res) => {
  const io = getIO();
  const onlineUsers = getOnlineUsers();
  try {
    const sender = req.user.id;
    const receiver = req.params.userId;

    // Check if sender and receiver are the same
    if (sender === receiver) {
      return res.status(400).send({
        success: false,
        message: "You cannot send a friend request to yourself.",
      });
    }

    // pair in friend request
    const pair = getPair(sender, receiver);

    // Check if a friend request already exists

    const existFriendRequest = await findFriendRequestByPair(pair);
    if (existFriendRequest) {
      if (existFriendRequest.status === "pending") {
        return res.status(400).send({
          success: false,
          message: "Friend request already sent.",
        });
      } else if (existFriendRequest.status === "accepted") {
        return res.status(400).send({
          success: false,
          message: "Friend request already accepted.",
        });
      }
    }

    // send friend request
    const newRequest = await requestSend(pair, sender, receiver);

    const receiverSocketId = onlineUsers.get(receiver);

    if (receiverSocketId) {
      io.to(receiverSocketId).emit("friend:request:new", {
        requestId: newRequest._id,

        sender: await findUserById(sender),

        receiver: await findUserById(receiver),

        status: "pending",
      });
    }

    return res.status(201).send({
      success: true,
      message: "Friend request sent successfully.",
      data: newRequest,
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Error sending friend request: " + error.message,
      error: error.message,
    });
  }
};

const getSentFriendRequests = async (req, res) => {
  try {
    const sentRequests = await getSentRequests(req.user.id);
    res.status(200).send({
      success: true,
      message: "Sent friend requests fetched successfully.",
      data: sentRequests,
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Error fetching sent friend requests: " + error.message,
      error: error.message,
    });
  }
};

const getReceivedFriendRequests = async (req, res) => {
  try {
    const receivedRequests = await getReceivedRequests(req.user.id);
    res.status(200).send({
      success: true,
      message: "Received friend requests fetched successfully.",
      data: receivedRequests,
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Error fetching received friend requests: " + error.message,
      error: error.message,
    });
  }
};

const acceptFriendRequest = async (req, res) => {
  const user = req.user.id;
  const requestId = req.params.requestId;
  const io = getIO();
  const onlineUsers = getOnlineUsers();

  try {
    // find friend request by id
    const friendRequest = await findFriendRequestById(requestId);

    if (!friendRequest) {
      return res.status(404).send({
        success: false,
        message: "Friend request not found.",
      });
    }

    // check if the user is the receiver of the friend request
    if (friendRequest.receiver.toString() !== user) {
      return res.status(403).send({
        success: false,
        message: "You are not allowed to accept this request.",
      });
    }

    // request already accepted
    if (friendRequest.status !== "pending") {
      return res.status(400).send({
        success: false,
        message: `Friend request already ${friendRequest.status}.`,
      });
    }

    // update request status to accepted
    friendRequest.status = "accepted";
    friendRequest.actionBy = user;

    await friendRequest.save();

    // create friendship
    await createFriendship(friendRequest.user1, friendRequest.user2);

    const payload = {
      requestId: friendRequest._id,

      sender: await findUserById(friendRequest.sender),

      receiver: await findUserById(friendRequest.receiver),

      status: "accepted",
    };

    const senderSocketId = onlineUsers.get(friendRequest.sender.toString());

    if (senderSocketId) {
      io.to(senderSocketId).emit("friend:request:accepted", payload);
    }

    res.status(200).send({
      success: true,
      message: "Friend request accepted successfully.",
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Error accepting friend request: " + error.message,
      error: error.message,
    });
  }
};

const rejectFriendRequest = async (req, res) => {
  const user = req.user.id;
  const requestId = req.params.requestId;
  const io = getIO();
  const onlineUsers = getOnlineUsers();

  try {
    // find friend request by id
    const friendRequest = await findFriendRequestById(requestId);

    if (!friendRequest) {
      return res.status(404).send({
        success: false,
        message: "Friend request not found.",
      });
    }

    // check if the user is the receiver of the friend request
    if (friendRequest.receiver.toString() !== user) {
      return res.status(403).send({
        success: false,
        message: "You are not allowed to reject this request.",
      });
    }

    // request already accepted
    if (friendRequest.status !== "pending") {
      return res.status(400).send({
        success: false,
        message: `Friend request already ${friendRequest.status}.`,
      });
    }

    // update request status to rejected
    friendRequest.status = "rejected";
    friendRequest.actionBy = user;

    await friendRequest.save();
    const payload = {
      requestId: friendRequest._id,

      sender: await findUserById(friendRequest.sender),

      receiver: await findUserById(friendRequest.receiver),

      status: "rejected",
    };

    const senderSocketId = onlineUsers.get(friendRequest.sender.toString());

    if (senderSocketId) {
      io.to(senderSocketId).emit("friend:request:rejected", payload);
    }

    res.status(200).send({
      success: true,
      message: "Friend request rejected successfully.",
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Error rejecting friend request: " + error.message,
      error: error.message,
    });
  }
};

const cancelFriendRequest = async (req, res) => {
  const user = req.user.id;
  const requestId = req.params.requestId;
  const io = getIO();
  const onlineUsers = getOnlineUsers();

  try {
    // find friend request by id
    const friendRequest = await findFriendRequestById(requestId);

    if (!friendRequest) {
      return res.status(404).send({
        success: false,
        message: "Friend request not found.",
      });
    }

    // check if the user is the sender of the friend request
    if (friendRequest.sender.toString() !== user) {
      return res.status(403).send({
        success: false,
        message: "You are not allowed to cancel this request.",
      });
    }

    // request already accepted
    if (friendRequest.status !== "pending") {
      return res.status(400).send({
        success: false,
        message: `Friend request already ${friendRequest.status}.`,
      });
    }

    // update request status to canceled
    friendRequest.status = "cancelled";
    friendRequest.actionBy = user;

    await friendRequest.save();

    const payload = {
      requestId: friendRequest._id,

      sender: await findUserById(friendRequest.sender),

      receiver: await findUserById(friendRequest.receiver),

      status: "cancelled",
    };

    const receiverSocketId = onlineUsers.get(friendRequest.receiver.toString());

    if (receiverSocketId) {
      io.to(receiverSocketId).emit("friend:request:cancelled", payload);
    }

    res.status(200).send({
      success: true,
      message: "Friend request canceled successfully.",
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Error canceling friend request: " + error.message,
      error: error.message,
    });
  }
};

module.exports = {
  findFriend,
  sendFriendRequest,
  getSentFriendRequests,
  getReceivedFriendRequests,
  acceptFriendRequest,
  rejectFriendRequest,
  cancelFriendRequest,
};
