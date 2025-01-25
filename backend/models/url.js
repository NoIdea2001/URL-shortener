const mongoose = require("mongoose");

const urlSchema = new mongoose.Schema(
  {
    shortId: {
      type: String,
      required: true,
      unique: true,
    },
    redirectURL: {
      type: String,
      required: true,
    },
    createdBy: {
      type: String,
      required: true,
    },
    visitHistory: [
      {
        timestamp: { type: Number },
        ipaddress: { type: String },
        location: {
          city: { type: String },
          region: { type: String },
          country: { type: String },
          zip: { type: String },
        },
      },
    ],
  },
  { timestamps: true }
);

const URL = mongoose.model("url", urlSchema);

module.exports = URL;
