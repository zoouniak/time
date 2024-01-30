const mongoose = require("mongoose");
const Counter = require("./sequence");

const noticeSchema = new mongoose.Schema({
  noticeId: { type: Number, unique: true },
  title: { type: String, required: true },
  content: { type: String, required: true },
  writeTime: { type: Date, default: Date.now },
  readCnt: { type: Number, default: 0 },
});

noticeSchema.pre("save", async function (next) {
  const doc = this;
  try {
    const counter = await Counter.findByIdAndUpdate(
      { _id: "noticeId" },
      { $inc: { sequence_value: 1 } },
      { new: true, upsert: true }
    );

    doc.noticeId = counter.sequence_value;
    next();
  } catch (err) {
    next(err);
  }
});

const Notice = mongoose.model("Notice", noticeSchema);

module.exports = Notice;
