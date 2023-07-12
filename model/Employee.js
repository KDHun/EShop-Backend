const mongoose = require("mongoose");

const Employee = new mongoose.Schema(
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
      type: String,
    },
    Email: {
      required: true,
      type: String,
    },
    Salary: {
      type: Number,
    },
    Role: {
      type: String,
    },
  },
  { collection: "Employee" }
);

module.exports = mongoose.model("Employee", Employee);
