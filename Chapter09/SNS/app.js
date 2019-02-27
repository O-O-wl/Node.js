
const express = require('express');
const logger = require('morgan');
const session = require('express-session');
const cookieParse = require('cookie-parser');
const path = require('path');
const flash = require('connect-flash');

const userRouter = require('./routes/user');
const pagesRouter = require('./routes/page');

const passport = require('passport'); // 패스포드객체 연결
const passportConfig = require('./passport'); // 패스포트 설정


const { sequelize } = require('./models');



require('dotenv').config();  // .env 의 값들이 process.env 에 들어감



const app = express();

sequelize.sync();



app.set('views',path.join(__dirname,'views'));
app.set('view engine','pug');
app.set('port',process.env.PORT || 9999);



app.use(logger('dev'));

app.use(express.json());
app.use(express.urlencoded({extends:false}));
app.use(express.static(path.join(__dirname,'public')));
app.use(cookieParse(process.env.COOKIE_SECRET));
app.use(session({
    resave:false,
    saveUninitialized:false,
    secret:process.env.COOKIE_SECRET,
    cookie:{
        httpOnly:true,
        secure:false,
    }
}));

app.use(flash());

app.use(passport.initialize());
//설정 초기화

app.use(passport.session());
// 로그인시 사용자정보를 세션으로 가져오는 것 ==> JWT 를 써도됨
// express-session 객체가 위에 먼저 정의되어있어야한다.


app.use('/',pagesRouter);


app.listen(app.get('port'),()=>{
    console.log(`${app.get('port')}포트에서 서버 실행중입니다.`)
});