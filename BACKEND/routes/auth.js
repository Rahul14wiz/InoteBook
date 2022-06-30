const express = require("express");
const router = express.Router();
const User = require("../models/User");
const { body, validationResult } = require("express-validator");

//Create a User using: Post "/api/auth/createuser" , No login require
router.post(
  "/createuser",
  [
    body("name", "Enter a vaild Name").isLength({ min: 3 }),
    body("email", "Enter a vaild Email").isEmail(),
    body("password", "Password must be atleast 5 character").isLength({
      min: 5,
    }),
  ],
  async (req, res) => {
    //Errors -> return Bad request
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    //Check whether the user with this email exists already
    try {
      let user = await User.findOne({ email: req.body.email });
      if (user) {
        return res
          .status(400)
          .json({ error: "Sorry a user already exists with this email-id" });
      }
      //Create a new user
      user = await User.create({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
      });
      res.json({ user });
    } 
    catch (error) {
      console.error(error.message);
      res.status(500).send("Some error Occurred");
    }
  }
);

module.exports = router;
