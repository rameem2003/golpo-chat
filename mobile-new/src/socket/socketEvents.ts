import { getSocket } from "./socket";

// export const testSocket = (payload: any, off: boolean = false) => {
//   const socket = getSocket();
//   if (!socket) {
//     console.log("Socket not connected");
//     return;
//   }

//   if (off) {
//     socket.off("testSocket", payload);
//   } else if (typeof payload == "function") {
//     socket.on("testSocket", payload);
//   } else {
//     socket.emit("testSocket", "Hello from client");
//   }
// };

// listen friend events
export const listenFriendEvents = (handlers: any) => {
  const socket = getSocket();

  if (!socket) {
    console.log("Socket not connected");
    return;
  }

  socket.on("friend:request:new", handlers.onNew);

  socket.on("friend:request:accepted", handlers.onAccepted);

  socket.on("friend:request:rejected", handlers.onRejected);

  socket.on("friend:request:cancelled", handlers.onCancelled);

  return () => {
    socket.off("friend:request:new", handlers.onNew);

    socket.off("friend:request:accepted", handlers.onAccepted);

    socket.off("friend:request:rejected", handlers.onRejected);

    socket.off("friend:request:cancelled", handlers.onCancelled);
  };
};
