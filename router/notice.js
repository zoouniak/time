const express = require("express");
const { ensureAuthenticated } = require("../passport/authMiddleware");
const Notice = require("../model/notice");
require("dotenv").config();
const moment = require("moment");
const router = express.Router();

router.get("/", ensureAuthenticated, async (req, res) => {
  obj = {};
  obj.notices = await Notice.find();
  res.locals.moment = moment;
  res.render("notice", obj);
});
router.get("/save/verify", ensureAuthenticated, async (req, res) => {
  res.render("verify");
});
router.post("/save/verify", ensureAuthenticated, (req, res) => {
  const password = req.body.password;
  if (password == process.env.PASSWORD) {
    res.render("writeNotice");
  } else res.redirect("/");
});
router.post("/save", ensureAuthenticated, async (req, res) => {
  const notice = new Notice({
    title: req.body.title,
    content: req.body.content,
    writeTime: Date.now(),
  });
  await notice.save();
  res.redirect("/notice");
});

module.exports = router;
