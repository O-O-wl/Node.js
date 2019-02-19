/**====================================================
                        @라우터
        app.js에 모든 라우팅을 하면 파일이 너무 커질수있다.

       app.use('/abc',router) + router.get('/df')
                      @GET /abc/df

       app.use('/users',router) + router.post('/')
                       @POST /users/

======================================================*/


// 각각의 라우터 모듈의 구성

// index.js

const express = require('express');   //express 모듈
const router = express.Router();         // express.router 객체생성

/* GET home page. */
router.get('/', function(req, res, next) {   // 생성된 라우터 객체에 콜백메소드 추가
    res.render('index', { title: 'Express' });
});

module.exports = router;
