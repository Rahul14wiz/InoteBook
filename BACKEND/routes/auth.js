const express = require('express');
const router = express.Router();
const User = require('../models/User');
const {body, validationResult} = require('express-validator');


//Create a User using: Post "/api/auth" It doesn't require Auth
router.post('/', [
    body('name','Enter a vaild Name').isLength({ min: 3 }),
    body('email','Enter a vaild Email').isEmail(),
    body('password','Password must be atleast 5 character').isLength({ min: 5 }),
    ], (req,res)=>{
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
          return res.status(400).json({ errors: errors.array() });
        }
        User.create({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password
          }).then(user => res.json(user))
          .catch(err=>{console.log(err)
        res.json({error:"Please enter a unique value for email"})})
})

module.exports =  router