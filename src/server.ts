import http from "http";
import app from "./app";
import { initSocket } from "./socket";
import { connectDB } from "./config/db";

const server = http.createServer(app);

// attach socket to same server
initSocket(server);

server.listen(3001, async() => {
await connectDB();
  console.log("Server running on port 3001");
});
