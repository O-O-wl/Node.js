const express = require('express');
const session = require('express-session');
const path = require('path');
const cookieParser = require('cookie-parser');
const morgan = require('morgan');

const flash = require('connect-flash');
const indexRouter = require('./routes');


const webSocket = require('./socket');


require('dotenv').config();


const app = express();

app.set('views',path.join(__dirname,'views'));
app.set('view engine','pug');
app.set('port',process.env.PORT||9876);

app.use(morgan('dev'));
app.use(express.static(path.join(__dirname,'public')));
app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use(cookieParser(process.env.COOKIE_SERCRET));

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

});

const server = app.listen(app.get('port'),()=>{
console.log(`${app.get('port')}번 포트에서 대기중`)
});

webSocket(server);