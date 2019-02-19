
const express = require('express');
const http = require('http');
const logger = require('morgan');
const session = require('express-session');   // 세션은 메모리에 저장 -> 서버재시작시 날라감 -> 대처로 디비에 저장 or Redis
const flash = require('connect-flash');
const cookieParser = require('cookie-parser');
const index2Router = require('./routes/index2.js');
const users2Router = require('./routes/users2.js');
var path = require('path');


const app = express();

// =============== 미들웨어 =============== //

app.use(logger('dev')); /* morgan 모듈의 메소드 미들웨어를 만나면 기록해주는 메소드  -- */


app.set(express.static(path.join(__dirname,'public'))); /*  요청한 파일이 없으면 next  위에 있어야 밑에 로직이 실행되는 낭비가 없*/

app.use(express.json());
app.use(express.urlencoded({extended: false}));



app.use(cookieParser('secret code'));    // 쿠키 활성화


app.use(session({
    resave:false,
    saveUninitialized:false,
    secret:'secret code',
    cookie:{
        httpOnly:true,
        secure:false
    }
}));         // 세션 활성화


app.use(flash());

app.use((req,res,next)=>{
    console.log('1번째 미들웨어');

    next(); // 요청을 밑으로 보내는 메소드
});




app.use('/',index2Router);

app.use('/err/',(req,res,next)=>{


    try { // 에러 가능성있는 로직부분은 try - catch

        throw new Error('서버를 고장내주마!');

        console.log('2번째 미들웨어');

    }catch (error){
        next(error); // next(error) 에 담아서 넘김
    }
    next();
});

app.use('/users',users2Router);

// 라우터 모두 찾앗을때 라우터를 요청에 해당하는  라우터를 찾지못하면 응답불가


app.use((req,res,next)=>{
    res.status(404).send('404 NOT FOUND');
    //next()
});



// 500 에러
app.use((error,req,res)=>{
    console.error(error);
    res.status(500).send('서버 내에 ERROR 발생');
    //next()
});



/*

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
/*
});

app.post('/',(req,res)=>{

});



*/

module.exports = app;