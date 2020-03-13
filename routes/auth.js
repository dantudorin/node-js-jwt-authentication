const express = require('express');
const router = express.Router();
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jsonWebToken = require('jsonwebtoken');

router.post('/register', async (req, res, next) => {

    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(req.body.password, salt);

    let user = new User({
        name : req.body.name,
        email : req.body.email,
        password : hashPassword
    });

    let existingUser = await User.findOne({email : user.email});
        
    if(existingUser) {
          return res.status(200).send('User already registered');
    }

    user.save()
        .then(payload => {
           return res.status(200).send(payload);
        })
        .catch(error => {
            res.status(500).send(error);
        });
});
 
router.post('/login', async (req, res, next) => {

    let user = await User.findOne({email : req.body.email});

    if(!user) {
        return res.status(400).send('Email not found! Please register');
    }

    let validPass = await bcrypt.compare(req.body.password, user.password);
    
    if(!validPass) {
        return res.status(400).send('Invalid password');
    }

    //Create and assign token
    const token = jsonWebToken.sign({_id : user.id}, process.env.TOKEN_SECRET);
    return res.header('auth-token', token).status(200).send(token);
});

module.exports = router;