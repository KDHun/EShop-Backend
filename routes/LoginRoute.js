const express = require("express");
const User = require("../model/User");
const Employee = require("../model/Employee");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require('jsonwebtoken');

module.exports = router;

router.post("/register", async (req, res) => {
  // Our register logic starts here
  try {
    // Get user input
    const {
      FirstName,
      MiddleName,
      LastName,
      DOB,
      Phone,
      Salary,
      Role = "Admin",
      Email,
      Password,
    } = req.body;

    // Validate user input
    if (!(Email && Password && FirstName && LastName)) {
      res.status(400).send("All input is required");
    }

    // check if user already exist
    // Validate if user exist in our database
    const oldUser = await User.findOne({ Email });

    if (oldUser) {
      return res.status(409).send("User Already Exist. Please Login");
    }
    const data = new Employee({
      FirstName: FirstName,
      MiddleName: MiddleName,
      LastName: LastName,
      DOB: DOB,
      Phone: Phone,
      Email: Email,
      Salary: Salary,
      Role: Role,
    });
    try {
        // Create New Empoyee
      const dataToSave = await data.save();
      //res.status(200).json(dataToSave);

      encryptedPassword = await bcrypt.hash(Password, 10);

      // Create user in our database
      const NewUser = await User.create({
        Email: Email.toLowerCase(), // sanitize: convert email to lowercase
        Password: encryptedPassword,
        EmployeeId: dataToSave._id,
      });

      // Create token
      const token = jwt.sign(
        { user_id: NewUser._id, Email },
        process.env.TOKEN_KEY,
        {
          expiresIn: "2h",
        }
      );
      // save user token
      NewUser.Token = token;

      // return new user
      res.status(201).json(NewUser);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
    //Encrypt user password
  } catch (err) {
    
  }
  // Our register logic ends here
});

router.post("/login", async (req, res) => {

    // Our login logic starts here
    try {
      // Get user input
      const { Email, Password } = req.body;
  
      // Validate user input
      if (!(Email && Password)) {
        res.status(400).send("All input is required");
      }
      // Validate if user exist in our database
      const user = await User.findOne({ Email });
  
      if (user && (await bcrypt.compare(Password, user.Password))) {
        // Create token
        const token = jwt.sign(
          { user_id: user._id, Email },
          process.env.TOKEN_KEY,
          {
            expiresIn: "2h",
          }
        );
  
        // save user token
        user.Token = token;
  
        // user
        res.status(200).json(user);
      }
      res.status(400).send("Invalid Credentials");
    } catch (err) {
      
    }
    // Our register logic ends here
  });
