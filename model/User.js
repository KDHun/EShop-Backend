const mongoose = require("mongoose");

const User = new mongoose.Schema({
  
  Email: {
    type: String,
    unique: true,
  },
  Password: {
    type: String,
  },
  Token: {
    type: String,
  },
  EmployeeId: {
    type: String,
  }
});

module.exports = mongoose.model("User", User);
