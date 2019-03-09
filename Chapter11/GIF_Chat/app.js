const express = require('express');
const session = require('express-session');
const path = require('path');
const cookieParser = require('cookie-parser');
const morgan = require('morgan');
const ColorHash = require('color-hash');

const flash = require('connect-flash');
const indexRouter = require('./routes');
require('dotenv').config();
const connect = require('./schemas');

const webSocket = require('./socketIO');

const sessionMiddleWare = session({
    resave:false,
    saveUninitialized:false,
    secret:process.env.COOKIE_SECRET,
    cookie:{
        httpOnly:true,
        secure:false,
    }
});


const app = express();






app.set('views',path.join(__dirname,'views'));
app.set('view engine','pug');
app.set('port',process.env.PORT||9876);



connect();

app.use(morgan('dev'));
app.use(express.static(path.join(__dirname,'public')));
app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use(cookieParser(process.env.COOKIE_SERCRET));



app.use(sessionMiddleWare);




app.use(flash());



/** ===========================
            sessionId로
        사용자 색상정하는 미들웨어
 =============================*/
app.use((req,res,next)=>{

    console.log("세션 아이디: ",req.sessionID);
    if(!req.session.color){
      //session ID 를 해싱해서 랜덤한 color 값 생성
        const colorHash = new ColorHash();
        req.session.color = colorHash.hex(req.sessionID);

        console.log('색상:',req.session.color)
    }
    next();
});


app.use('/',indexRouter);

app.use((req,res,next)=>{
    const error = new Error('NOT FOUND');
    error.status  = 404;
    next();

});


app.use((err,req,res)=>{

    res.locals.message = err.message;
    res.locals.error = req.app.get('env'==='devlopment'?err:{});
    res.status(err.status||500);
    res.render(error);

});//

const server = app.listen(app.get('port'),()=>{
console.log(`${app.get('port')}번 포트에서 대기중`)
});

webSocket(server,app,sessionMiddleWare);

//+ axios@0.18.0
// + multer@1.4.1
// + mongoose@5.4.17
// + color-hash@1.0.3  -- 사용자이름에 컬러