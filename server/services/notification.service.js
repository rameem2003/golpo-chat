const { default: Expo } = require("expo-server-sdk");
const userModel = require("../models/user.model");

const expo = new Expo();

const updatePushNotificationToken = async (userId, token) => {
  try {
    // check if the token is not changed
    const user = await userModel.findById(userId);
    if (user.notificationToken === token) {
      return {
        success: true,
        message: "Notification token is already up to date.",
      };
    }
    // Update the user's notification token in the database
    let res = await userModel.findByIdAndUpdate(
      userId,
      { notificationToken: token },
      { new: true },
    );
    console.log("updatePushNotificationToken res: " + res);
    return {
      success: true,
      message: "Notification token updated successfully.",
    };
  } catch (error) {
    throw new Error("Error updating push notification token: " + error.message);
  }
};

const sendPushNotification = async (token, title, body, metadata) => {
  if (!Expo.isExpoPushToken(token)) {
    throw new Error("Invalid Token", 400);
  }

  const message = {
    to: token,
    sound: "default",
    title: title,
    body: body,
    data: metadata || {},
  };

  const tickets = await expo.sendPushNotificationsAsync([message]);
  console.log("sendPushNotification tickets: " + tickets);
  return tickets;
};

module.exports = { sendPushNotification, updatePushNotificationToken };
