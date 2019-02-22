
const express = require('express');
const logger = require('morgan');
const session = require('express-session');
const cookieParse = require('cookie-parser');
const path = require('path');
const flash = require('connect-flash');



const app = express();

app.set('views',path.join(__dirname,'views'));
app.set('view engine','pug');
app.set('port',process.env.PORT || 9999);



app.use(logger('dev'));

app.use(express.json());
app.use(express.urlencoded);
app.use(express.static(path.join(__dirname,'public')));
app.use(cookieParse('nodeSNSSecret'));
app.use(session({
    resave:false,
    saveUninitialized:false,
    secret:'nodeSNSSecret',
    cookie:{
        httpOnly:true,
        secure:false,
    }
}));

app.use(flash());


app.listen(app.get('port'),()=>{
    console.log(`${app.get('port')}포트에서 서버 실행중입니다.`)
});