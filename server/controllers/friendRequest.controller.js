const getPair = require("../lib/frindshipPair");
const {
  requestSend,
  getSentRequests,
  getReceivedRequests,
  findFriendRequestByPair,
  findFriendRequestById,
} = require("../services/friendRequest.service");
const { createFriendship } = require("../services/friendShip.service");

const sendFriendRequest = async (req, res) => {
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
  sendFriendRequest,
  getSentFriendRequests,
  getReceivedFriendRequests,
  acceptFriendRequest,
  rejectFriendRequest,
  cancelFriendRequest,
};
