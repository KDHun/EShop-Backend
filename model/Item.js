const mongoose = require("mongoose");

const Item = new mongoose.Schema(
  {
    Name: {
      required: true,
      type: String,
    },
    Price: {
      required: true,
      type: String,
    },
    Discount: {
      type: String,
    },
    Quanity: {
      required: true,
      type: String,
    },
    Description: {
      type: String,
    },
  },
  { collection: "Item" }
);

module.exports = mongoose.model("Item", Item);
