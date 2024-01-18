const mongoose = require("mongoose");

require("dotenv").config();
async function connect() {
  try {
    await mongoose.connect(process.env.MONGO_URL, {
      dbName: "nodedb",
    });

    console.log("MongoDB connection successful");
  } catch (err) {
    console.log("Connection error", err);
  }
}
mongoose.connection.on("error", (error) => {
  console.error("Connection error", error);
});
mongoose.connection.on("disconnected", () => {
  console.error("몽고디비 연결이 끊겼습니다. 연결을 재시도합니다.");
  connect();
});

module.exports = connect;
