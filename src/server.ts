import http from "http";
import app from "./app";
import { initSocket } from "./socket";

const server = http.createServer(app);

// attach socket to same server
initSocket(server);

server.listen(3000, () => {
  console.log("Server running on port 3000");
});
