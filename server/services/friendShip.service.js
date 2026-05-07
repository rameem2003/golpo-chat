const friendshipModel = require("../models/friendship.model");

const findUserFriendships = async (userId) => {
  try {
    // populate user1 and user2 to get friend details
    return await friendshipModel
      .find({
        $or: [{ user1: userId }, { user2: userId }],
      })
      .populate("user1", "name email avatar")
      .populate("user2", "name email avatar")
      .sort({ createdAt: -1 });
  } catch (error) {
    throw new Error("Error finding user friendships: " + error.message);
  }
};

const createFriendship = async (user1, user2) => {
  try {
    let newFriendship = new friendshipModel({
      user1,
      user2,
    });
    await newFriendship.save();
    return newFriendship;
  } catch (error) {
    throw new Error("Error creating friendship: " + error.message);
  }
};

module.exports = {
  createFriendship,
  findUserFriendships,
};
