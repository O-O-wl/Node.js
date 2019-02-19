const express = require('express');

const router = express.Router();

router.get('/',(req,res,next)=>{
    console.log('pug')
    res.render('test',{
        title:'Hello',
        title2:'Express',
        fruits:['아보카도','피망','메론']

    });
    //res.send('index2');
});

router.get('/users',(req,res,next)=>{
 //   res.send('index2/users');
    res.render('test2',{
        title:'Hello',
        title2:'Express',
        fruits:['아보카도','피망','메론']

    });
});


module.exports = router;