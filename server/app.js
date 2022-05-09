const { Server } = require("socket.io");
const dotenv = require("dotenv");
dotenv.config();
const app = require("./server");

const io = new Server({
  cors: {
    origin: "http://localhost:80",
  },
});

let onlineUsers = [];

const addNewUser = (userId, socketId) => {
  if(!onlineUsers.some((user) => user.userId === userId)){
    onlineUsers.push({ userId, socketId });
  };
};

const removeUser = (socketId) => {
  onlineUsers = onlineUsers.filter((user) => user.socketId !== socketId);
};

const getUser = (userId) => {
  return onlineUsers.find((user) => user.userId === userId); 
};

io.on("connection", (socket) => {
  socket.on("newUser", (username) => {
    addNewUser(username, socket.id);
   });
  
  socket.on(
    "sendNotification",
    ({ senderId, receiverId, step }) => {
      const receiver = getUser(receiverId);
      const sender = getUser(senderId);
      if(receiver){
        io.to(receiver.socketId).emit("getNotification", {
          senderId,
          step,
        });
      }
      if (sender) {
        io.to(sender.socketId).emit("getNotification", {
          senderId,
          step,
        });
      }
    }
  );

  socket.on("disconnect", () => {
    removeUser(socket.id);
  });
});

io.listen(3000);

const port = 8080; //process.env.PROT;
app.listen(port, () => {
  console.log("server started on port " + port);
});
