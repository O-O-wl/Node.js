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




/* 모든 라우터를 거쳐갔을때   실패 할수있음    ->  그러면 서버가 더이상 진행하지못하고 오류에 빠질수있음 */
/*============== 404 ERROR ==============*/
app.use((req,res,next)=>{

    // 응답상태코드 404 설정 , 메세지는 404 NOT FOUND
    res.status(404).send('NOT FOUND');
   // next()
});

/*============== 500 ERROR ==============*/
app.use((err,req,res,next)=>{

    // 응답상태코드 500 설정 , 메세지는 404 NOT FOUND
    res.status(500).send('');
    // next()
});