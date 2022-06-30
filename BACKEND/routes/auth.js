const express = require('express');
const router = express.Router();
const User = require('../models/User')


//Create a User using: Post "/api/auth" It doesn't require Auth
router.post('/', (req,res)=>{
    console.log(req.body);
    const user = User(req.body);
    user.save();
    res.send("hello Rahul")
})

module.exports =  router