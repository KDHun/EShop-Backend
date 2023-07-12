const mongoose = require("mongoose");

const Bill = new mongoose.Schema(
  {
    CustomerId: {
      required: true,
      type: String,
    },
    CustomerName: {
      type: String,
    },
    TotalAmount: {
      required: true,
      type: String,
    },
    TotalItem: {
      type: String,
    },
    Items: {
      required: true,
      type: Array,
    }
  },
  { collection: "Bill" }
);

module.exports = mongoose.model("Bill", Bill);
