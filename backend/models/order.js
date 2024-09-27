const mongoose = require("mongoose");

const oderSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Types.ObjectId,
      ref: "User",
    },
    book: {
      type: mongoose.Types.ObjectId,
      ref: "Book",
    },
    status: {
      type: String,
      default: "Order Placed",
      enum: ["Order Placed", "Out for delivery", "Deliver", "Canceled"],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Order", oderSchema);
