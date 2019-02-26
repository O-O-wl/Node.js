
const express = require('express');
const logger = require('morgan');
const session = require('express-session');
const cookieParse = require('cookie-parser');
const path = require('path');
const flash = require('connect-flash');

const userRouter = require('./routes/user');
const pagesRouter = require('./routes/page');


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
app.use('/',pagesRouter);


app.listen(app.get('port'),()=>{
    console.log(`${app.get('port')}포트에서 서버 실행중입니다.`)
});