module.exports = (io) => {
  io.on("connection", (socket) => {
    console.log("New client connected:", socket.id);

    // Join a specific event room
    socket.on("joinEvent", (eventId) => {
      socket.join(eventId);
      console.log(`Socket ${socket.id} joined room: ${eventId}`);
    });

    // Listen for attendee updates and broadcast them to the room
    socket.on("attendeeUpdate", (data) => {
      // Data should include the eventId and updated attendee info
      io.to(data.eventId).emit("updateAttendees", data);
    });

    socket.on("disconnect", () => {
      console.log("Client disconnected:", socket.id);
    });
  });
};
