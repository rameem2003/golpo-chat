require("dotenv").config();
const http = require("http");
const app = require("./app");
const { welcomeNote } = require("./constant/constant");
const { initSocket } = require("./lib/socket");

const server = http.createServer(app);

initSocket(server);

server.listen(process.env.PORT || 5000, () => {
  console.log(welcomeNote);
});
