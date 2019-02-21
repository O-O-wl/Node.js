var express = require('express');
var router = express.Router();
var { User } = require('../models/index_self');
/* GET home page. */
router.get('/', (req, res, next)=>{
  User.findAll()   // 비동기 요청
  //프로미스
      .then((users)=>{// 배열로 반환 - 'users'테이블 모두 조회
        res.render('sequelize', { users }); // users : users -> users 로 생략가능
      })
      .catch((err)=>{
        console.error(err);
        next(err);
      });


});

module.exports = router;
