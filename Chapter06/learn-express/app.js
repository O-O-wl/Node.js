var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));


//app.use(express.json()); 바꿀수 있음 콜백메소드에 미들웨어와 추가기능을 추가 하고싶으면 사용
app.use((req,res,next)=>{
  console.log('룰루랄랄')
  express.json(req,res,next);
});


app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// 라우터 부분  - 커스텀라우터 모듈
app.use('/', indexRouter);
app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message; /* 템플릿 엔진에서 사용할 변수 -  다른 미들웨어에서도 사용하게 하기 위해서 */

  res.locals.error = req.app.get('env') === 'development' ? err : {}; /* 템플릿 엔진에서 사용할 변수 */

  /**=================================================================
             @app.get.set() 은 딕셔너리 처럼도 사용가능하다

         @req.app.get.set ('env') -  위랑 무슨차이가 잇으까

                  req.app == app
      그러나 app.get/set 은 router 에서는 사용할수 없다
   매개변수로 app 이 없으므로 싱글톤? 처럼 req.app으로 참조를 얻어와야한다

  =====================================================================*/

  /*=============================================================
           req.app 에 저장하면 모든 요청이 공유할수있는 자원이 된다.

           req.password 이런 식으로 바로 저장하면 임시 변수가 생겨서 저장됨
  =================================================================*/

  // render the error page
  res.status(err.status || 500);
  res.render('error');
 // res.sendFile(); 
 // res.json({hello:'oowl'});  - JSON 응답
});

module.exports = app;
