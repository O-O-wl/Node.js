const express = require('express');

const router = express.Router();

router.get('/',(req,res,next)=>{
    console.log('pug')
    res.render('test',{
        title:'Hello',
        title2:'Express'
    });
    //res.send('index2');
});

router.get('/users',(req,res,next)=>{
    res.send('index2/users');
});


module.exports = router;