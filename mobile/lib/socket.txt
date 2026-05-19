import { io } from "socket.io-client";

const socket = io("http://10.0.2.2:5000", {
  transports: ["websocket"],
  autoConnect: true,
});

socket.on("connect", () => {
  console.log("socket connected:", socket.id);
});

socket.on("disconnect", () => {
  console.log("socket disconnected");
});

socket.on("connect_error", (err) => {
  console.log("socket error:", err.message);
});

export default socket;
