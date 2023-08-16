const mongoose = require("mongoose");

const AlarmSchema = new mongoose.Schema({
  time: {
    type: String,
    required: true,
  },
  OnOff: {
    type: Boolean,
    required: true,
  },
});

const Alarm = mongoose.model("alarm-app", AlarmSchema);

module.exports = Alarm;
