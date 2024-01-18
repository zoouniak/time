const express = require("express");
const http = require("http");
const socket = require("socket.io");
const { ensureAuthenticated } = require("../passport/authMiddleware");
const chatRoom = require("../model/room");

router = express.Router();

router.get("/", ensureAuthenticated, async (req, res) => {
  try {
    const rooms = await chatRoom.find();
    obj = {};
    obj.rooms = rooms;
    res.render("chatList", obj);
  } catch (err) {
    console.log(err);
  }
});

router.get("/create", ensureAuthenticated, (req, res) => {
  res.render("roomCreate");
});
router.post("/create", ensureAuthenticated, async (req, res) => {
  const room = new chatRoom({
    name: req.body.name,
    info: req.body.info,
    master: req.session.passport.user.name,
  });
  const newRoom = await room.save();
  res.redirect("/chat");
});
module.exports = router;
