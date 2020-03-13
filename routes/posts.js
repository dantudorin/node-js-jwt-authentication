const express = require('express');
const router = express.Router();
const verifyToken = require('./verify-token');

router.get('/posts', verifyToken, (req, res, next) => {
    res.json({
        posts : {
            title : 'my first post',
            description : 'random data to be send'
        }
    });
});

module.exports = router;