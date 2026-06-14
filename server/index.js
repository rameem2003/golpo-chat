require("dotenv").config();
const http = require("http");
const app = require("./app");
const { welcomeNote } = require("./constant/constant");
const { initSocket } = require("./socket/socket");

const server = http.createServer(app);

initSocket(server);

server.listen(process.env.PORT || 5000, "0.0.0.0", () => {
  console.log(welcomeNote);
});
