const getPair = require("../lib/frindshipPair");
const {
  findFriendRequest,
  requestSend,
  getSentRequests,
  getReceivedRequests,
} = require("../services/friendRequest.service");

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

    const existFriendRequest = await findFriendRequest(pair);
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

module.exports = {
  sendFriendRequest,
  getSentFriendRequests,
  getReceivedFriendRequests,
};
