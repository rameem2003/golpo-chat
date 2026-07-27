import AsyncStorage from "@react-native-async-storage/async-storage";
import { io, Socket } from "socket.io-client";
import { SOCKET_URL } from "@/constants/Constants";
let socket: Socket | null = null;

export const connectSocket = async () => {
  console.log("Connecting socket...");
  const token = await AsyncStorage.getItem("accessToken");
  console.log("token" + token);

  if (!token) {
    // console.log("Error 10");
    throw new Error("Please login first");
  }

  if (!socket) {
    socket = io(SOCKET_URL, {
      auth: {
        token,
      },
    });

    await new Promise((resolve, reject) => {
      socket?.on("connect", () => {
        console.log(`Socket Connected: ${socket?.id}`);
        resolve(true);
      });

      socket?.once("connect_error", (error) => {
        console.log("Socket connect error:", error.message);
        socket?.disconnect();
        socket = null;
        reject(error);
      });
    });

    socket.on("disconnect", () => {
      console.log("Socket Disconnected");
      socket = null;
    });
  }

  return socket;
};

export const getSocket = () => {
  // if (!socket) {
  //   throw new Error("Socket not connected");
  // }

  return socket;
};

export const disconnectSocket = () => {
  if (socket) {
    socket.disconnect();
    socket = null;
  }
};
