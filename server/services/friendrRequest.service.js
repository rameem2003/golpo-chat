const friendRequestModel = require("../models/friendRequest.model");

const findFriendRequest = async (pair) => {
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
