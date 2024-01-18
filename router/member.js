const express = require("express");
const passport = require("passport");
const router = express.Router();
require("dotenv").config();

// 로그인
router.get(
  "/login",
  passport.authenticate("google", {
    scope: ["email", "profile"],
  })
);

// 구글 로그인 리다이렉트
router.get(
  "/login/redirect",
  passport.authenticate("google", {
    failureRedirect: "/",
  }),
  (req, res) => {
    res.redirect("/");
  }
);

// 로그아웃
router.get("/logout", (req, res) => {
  req.session.destroy();
  res.redirect("/");
});

module.exports = router;
