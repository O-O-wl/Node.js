
const express = require('express');
const http = require('http');

const app = express();

// =============== 라우터 =============== //


app.get('/',(req,res)=>{
    res.send('hello Express');
});

app.get('/users',(req,res)=>{
    res.send('Hello users');
    /** @send() 로 전송  -> express 모듈을 import 하면 req 객체에 send 메소드가 추가된다*/
});

app.post('/',(req,res)=>{

});


// ===================================== //

module.exports = app;