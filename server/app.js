const { Server } = require("socket.io");
const dotenv = require("dotenv");
dotenv.config();
const app = require("./server");

const io = new Server({
  cors: {
    origin: "http://localhost:3000",
  },
});

let onlineUsers = [];

const addNewUser = (userId, socketId) => {
  console.log(onlineUsers);
  !onlineUsers.some((user) => user._id === userId) &&
    onlineUsers.push({ userId, socketId });
  console.log(onlineUsers);
};

const removeUser = (socketId) => {
  onlineUsers = onlineUsers.filter((user) => user.socketId !== socketId);
};

const getUser = (userId) => {
  return onlineUsers.find((user) => user._id === userId);
};

io.on("connection", (socket) => {
  socket.on("newUser", (username) => {
    addNewUser(username._id, socket.id);
   });
  
  socket.on(
    "sendNotification",
    ({ senderName, senderEmail, receiverId, image, step }) => {
      const receiver = getUser(receiverId);
      io.to(receiver.socketId).emit("getNotification", {
        senderName,
        senderEmail,
        image,
        step,
      });
    }
  );

  socket.on("disconnect", () => {
    removeUser(socket.id);
  });
});

io.listen(5001);

const port = 8080; //process.env.port;
app.listen(port, () => {
  console.log("server started on port " + port);
});
