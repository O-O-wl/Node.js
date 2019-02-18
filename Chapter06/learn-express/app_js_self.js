
const express = require('express');
const http = require('http');
const logger = require('morgan');



const app = express();

// =============== 미들웨어 =============== //

app.use(logger('dev')); /* morgan 모듈의 메소드 미들웨어를 만나면 기록해주는 메소드 */

app.use((req,res,next)=>{
    console.log('1번째 미들웨어');
    next(); // 요청을 밑으로 보내는 메소드
});


app.use((req,res,next)=>{
    console.log('2번째 미들웨어');
    next();
});





// =============== 라우터 =============== //


app.get('/',(req,res,next)=>{
    console.log('3번째 라우터 미들웨어');
    res.write('hello \n');
    next()
});

app.get('/',(req,res)=>{
    console.log('4번째 라우터 미들웨어');
    res.end('Express');
});

app.get('/users',(req,res)=>{
    console.log('5번째 라우터 미들웨어');
    res.send('Hello users');
    /** @send() 로 전송  -> express 모듈을 import 하면 req 객체에 send 메소드가 추가된다*/
});

app.post('/',(req,res)=>{

});





module.exports = app;