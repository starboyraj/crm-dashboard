const mongoose = require("mongoose");

const leadSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    name: { type: String, required: true },
    email: { type: String },
    phone: { type: String },
    status: {
      type: String,
      enum: ["hot", "warm", "cold"],
      default: "warm",
    },
    notes: [
      {
        text: String,
        date: Date,
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Lead", leadSchema);
