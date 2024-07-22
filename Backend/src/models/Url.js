const mongoose = require("mongoose");
const validator = require("validator");

function validateURL(url) {
  return validator.isURL(url, {
    require_protocol: true,
    host_whitelist: ["localhost"],
  });
}

const urlSchema = new mongoose.Schema({
  url: {
    type: String,
    required: [true, "please enter an url"],
    validate: [validator.isURL, "Plase Enter a valid URL"],
  },
  shortUrl: {
    type: String,
    required: [true, "please enter an url"],
    validate: [validateURL, "Plase Enter a valid URL"],
  },
  description: {
    type: String,
    maxlength: [105, "Description can't exceed 30 characters"],
  },
  numberClicks: {
    type: Number,
    default: 0,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  user: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    require: true,
  },
});

module.exports = mongoose.model("Url", urlSchema);
