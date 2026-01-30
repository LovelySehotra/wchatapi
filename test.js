// src/test.js
const { io } = require("socket.io-client");

const socket = io("http://localhost:3001", {
  // auth: {
  //   // token: "YOUR_JWT_TOKEN",
  // },
});

socket.on("connect", () => {
  console.log("✅ Connected:", socket.id);
});

socket.on("connect_error", (err) => {
  console.log("❌ Connection Error:", err.message);
  console.log("❌ Error:", err.message);
});
