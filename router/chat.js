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
    obj.name = req.session.passport.user.name;
    res.render("chat", obj);
  } catch (err) {
    console.log(err);
  }
});
module.exports = router;
