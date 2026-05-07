const { findUserFriendships } = require("../services/friendShip.service");

const getAllFriends = async (req, res) => {
  const userId = req.user.id;
  try {
    const friendships = await findUserFriendships(userId);
    res.status(200).send({
      success: true,
      message: "Friendships fetched successfully.",
      data: friendships,
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Error fetching friendships: " + error.message,
      error: error.message,
    });
  }
};

module.exports = {
  getAllFriends,
};
