const mongoose = require("mongoose");
const chatRoomSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    count: {
      type: Number,
      default: 1,
    },
    timestamp: {
      type: Date,
      default: Date.now,
    },
    info: {
      type: String,
    },
    master: {
      type: String,
    },
  },
  { collection: "chatRoom" }
);

const ChatRoom = mongoose.model("ChatRoom", chatRoomSchema);

module.exports = ChatRoom;
