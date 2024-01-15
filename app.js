const express = require("express");
const app = express();
const memberRouter = require("./router/member");

app.set("views", __dirname + "/view");
app.set("view engine", "ejs");

app.use("/member", memberRouter);
app.get("/", (req, res) => {
  res.render("home");
});
app.listen(3000, () => {
  console.log("대기중");
});
