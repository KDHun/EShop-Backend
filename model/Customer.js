const mongoose = require("mongoose");

const Customer = new mongoose.Schema(
  {
    FirstName: {
      required: true,
      type: String,
    },
    MiddleName: {
      type: String,
    },
    LastName: {
      required: true,
      type: String,
    },
    DOB: {
      type: String,
    },
    Phone: {
      required: true,
      type: String,
    },
    Email: {
      type: String,
    },
  },
  { collection: "Customer" }
);

module.exports = mongoose.model("Customer", Customer);
