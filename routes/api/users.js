const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const keys = require("../../config/keys");
const passport = require("passport");
//for paypal
const http = require('http');
const bodyParser = require('body-parser');
const path = require('path');
const cors = require('cors');

require('dotenv').config();


router.use(cors());


// Load input validation
const validateRegisterInput = require("../../validation/register");
const validateLoginInput = require("../../validation/login");

// Load User model
const User = require("../../models/User");

router.post("/register", (req, res) => {
  // Form validation
  const { errors, isValid } = validateRegisterInput(req.body);
  // Check validation
  if (!isValid) {
    return res.status(400).json(errors);
  }

  User.findOne({ email: req.body.email }).then(user => {
    if (user) {
      return res.status(400).json({ email: "Email already exists" });
    } else {
      const newUser = new User({
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        email: req.body.email,
        password: req.body.password,
        // gender: req.body.gender,
        // birthday: req.body.birthday,
        // country: req.body.country,
        favourite_club: req.body.favourite_club,
        partner_email_communication: req.body.partner_email_communication,
        // phone: req.body.phone,
        // post_code: req.body.post_code,
        premier_email_communication:req.body.premier_email_communication
      });

      // Hash password before saving in database
      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          if (err) throw err;
          newUser.password = hash;
          newUser.save((err,data)=>{
              if(err){
                  console.log(err)
              }
              else{
                res.json(data)
              }
            })
        });
      });
    }
  });
});

// @route POST api/users/login
// @desc Login user and return JWT token
// @access Public
router.post("/login", (req, res) => {
  // Form validation

  const { errors, isValid } = validateLoginInput(req.body);

  // Check validation
  if (!isValid) {
    return res.status(400).json(errors);
  }

  const email = req.body.email;
  const password = req.body.password;

  // Find user by email
  User.findOne({ email }).then(user => {
    // Check if user exists
    if (!user) {
      return res.status(404).json({ emailnotfound: "Email not found" });
    }

    // Check password
    bcrypt.compare(password, user.password).then(isMatch => {
      if (isMatch) {
        // User matched
        // Create JWT Payload
        const payload = {
          id: user.id,
          name: user.name,
          email: user.email
        };

        // Sign token
        jwt.sign(
          payload,
          keys.secretOrKey,
          {
            expiresIn: 31556926 // 1 year in seconds
          },
          (err, token) => {
            res.json({
              success: true,
              token: "Bearer " + token
            });
          }
        );
      } else {
        return res
          .status(400)
          .json({ passwordincorrect: "Password incorrect" });
      }
    });
  });
});

router.post("/get-all-doctors", (req, res) => {
  User.find((error, data)=>{
    if(error){
      return next(error)
    }
    else{
        res.json(data);
    }
  })
})

router.post("/delete-user", (req, res)=>{
  User.findByIdAndDelete(req.body.id, (error, data)=>{
    if(error){
      console.log(error)
    }
    else{
      res.json(data)
    }
  })
})

router.post("/get-one-user", (req, res)=>{
  User.findById(req.body.id, (error, data)=>{
    if(error){
      console.log(error)
    }
    else{
      res.json(data)
    }
  })
})

module.exports = router;
