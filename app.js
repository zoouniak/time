const express = require("express");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const socket = require("socket.io");
const http = require("http");
require("dotenv").config();

// db connnection
const connect = require("./config");
connect();

// passport config
const passport = require("passport");
const passportConfig = require("./passport");
passportConfig();

// router
const memberRouter = require("./router/member");
const chatRouter = require("./router/chat");
const exp = require("constants");

const app = express();
app.use(express.json()); // parse JSON body
app.use(express.urlencoded({ extended: true })); // parse url-encoded body

const server = http.createServer(app);
const io = socket(server);

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
app.use("/chat", chatRouter);

app.get("/", (req, res) => {
  obj = {};
  obj = req.session;
  res.render("home", obj);
});

io.on("connection", (socket) => {
  // 소켓 커넥션이 성공적으로 이루어졌을 때 실행되는 이벤트 처리
  socket.on("chat message", (msg) => {
    io.emit("chat message", msg); // Broadcast the message to all connected clients
  });
});

server.listen(process.env.PORT, () => {
  console.log("대기중");
});
