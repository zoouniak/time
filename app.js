const express = require("express");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const passport = require("passport");
const passportConfig = require("./passport");
const memberRouter = require("./router/member");
passportConfig();
require("dotenv").config();

const app = express();
// ejs 설정
app.set("views", __dirname + "/view");
app.set("view engine", "ejs");

app.use(cookieParser(process.env.COOKIE_SECRET));

// 세션 설정
app.use(
  session({
    resave: false,
    saveUninitialized: false,
    secret: process.env.COOKIE_SECRET,
    cookie: {
      httpOnly: true,
      secure: false,
    },
  })
);

app.use(passport.initialize()); // 요청 객체에 passport 설정을 심음
app.use(passport.session()); // req.session 객체에 passport정보를 추가 저장
// passport.session()이 실행되면, 세션쿠키 정보를 바탕으로 해서 passport/index.js의 deserializeUser()가 실행하게 한다.

app.use("/member", memberRouter);

app.get("/", (req, res) => {
  obj = {};
  obj = req.session;
  res.render("home", obj);
});
app.listen(process.env.PORT, () => {
  console.log("대기중");
});
