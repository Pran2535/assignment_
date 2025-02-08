const http = require("http");
const dotenv = require("dotenv");
dotenv.config();
const app = require("./app");
const connectDB = require("./config/db");
const socketServer = require("./sockets/eventSocket");

// Create HTTP server
const server = http.createServer(app);

// Connect to MongoDB
connectDB();

// Setup Socket.IO
const { Server } = require("socket.io");
const io = new Server(server, {
  cors: {
    origin: "*",
  },
});

// Initialize Socket.IO events
socketServer(io);

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
