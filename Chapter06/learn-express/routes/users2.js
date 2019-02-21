const express = require('express');

const router = express.Router();

router.get('/',(req,res,next)=>{
    res.send('사실상 실행안됨~~');
});

router.get('/1',(req,res,next)=>{
    res.send('users2/1');
});


module.exports = router;