const mongoose = require("mongoose");

const Schema = new mongoose.Schema(
  {
    email: {
      type: String,
      unique: true,
      required: true,
    },
    name: {
      givenName: {
        type: String,
        required: true,
      },
      familyName: {
        type: String,
      },
    },
    gender: String,
  },
  { collection: "member" }
);
const Member = mongoose.model("Member", Schema);
module.exports = Member;
