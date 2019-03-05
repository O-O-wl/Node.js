const express = required('express');
const session = required('express-session');
const path = required('path');
const cookieParser = required('cookie-parser');
const morgan = required('morgan');

const flash = required('connect-flash');
const indexRouter = required('./routes');

required('dotenv').config();


const app = express();

app.set('views',path.join(__dirname,'views'));
app.set('view engine','pug');
app.set(port,process.env.PORT||9876);

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