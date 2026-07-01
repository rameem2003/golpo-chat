const friendRequestModel = require("../models/friendRequest.model");
const userModel = require("../models/user.model");

const findFriendByName = async (name, userId) => {
  try {
    // except current user
    let res = await userModel.find({
      name: { $regex: name, $options: "i" },
      _id: { $ne: userId },
    });
    return res;
  } catch (error) {
    throw new Error("Error finding user: " + error.message);
  }
};

const findFriendRequestById = async (requestId) => {
  try {
    // except "accepted" and "rejected" requests
    let res = await friendRequestModel.findById(requestId);
    return res;
  } catch (error) {
    throw new Error("Error finding friend request: " + error.message);
  }
};

const findFriendRequestByPair = async (pair) => {
  // pair is normalized { user1, user2 }
  try {
    let res = await friendRequestModel.findOne(pair);

    return res;
  } catch (error) {
    throw new Error("Error finding friend request: " + error.message);
  }
};

const requestSend = async (pair, sender, receiver) => {
  try {
    // send request from sender to receiver
    let newRequest = new friendRequestModel({
      ...pair,
      sender,
      receiver,
    });
    await newRequest.save();
    return newRequest;
  } catch (error) {
    throw new Error("Error sending friend request: " + error.message);
  }
};

const deleteFriendRequestPair = async (id) => {
  try {
    await friendRequestModel.findByIdAndDelete(id);
  } catch (error) {
    throw new Error("Error deleting friend request: " + error.message);
  }
};

const getSentRequests = async (userId) => {
  try {
    return await friendRequestModel
      .find({
        sender: userId,
        status: { $ne: "accepted" }, // Exclude accepted requests
      })
      .populate("receiver", "name email avatar")
      .sort({
        createdAt: -1,
      });
  } catch (error) {
    throw new Error("Error getting sent friend requests: " + error.message);
  }
};

const getReceivedRequests = async (userId) => {
  try {
    return await friendRequestModel
      .find({
        receiver: userId,
        status: "pending",
      })
      .populate("sender", "name email avatar")
      .sort({
        createdAt: -1,
      });
  } catch (error) {
    throw new Error("Error getting received friend requests: " + error.message);
  }
};

module.exports = {
  findFriendByName,
  findFriendRequestByPair,
  requestSend,
  getSentRequests,
  getReceivedRequests,
  findFriendRequestById,
  deleteFriendRequestPair,
};
