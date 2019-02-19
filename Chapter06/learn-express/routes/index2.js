const express = require('express');

const router = express.Router();

router.get('/',(req,res,next)=>{
    res.send('index2');
});

router.get('/users',(req,res,next)=>{
    res.send('index2/users');
});


module.exports = router;