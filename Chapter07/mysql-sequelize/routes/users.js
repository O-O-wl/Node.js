var express = require('express');
var router = express.Router();

var { User } = require('../models/index_self');


/*============ GET ===============*/
router.get('/', function(req, res, next) {
  User.findAll()   // 비동기 요청
      //프로미스
      .then((users)=>{   // 배열로 반환 - 'users'테이블 모두 조회
        res.json(users); // 배열을 JSON으로 반환

      })
      .catch((err)=>{
    console.error(err);
    next(err);
  })
});


/*============ POST ===============*/
router.post('/', function(req, res, next) {

  User.create({
    name:req.body.name,
    age:req.body.age,
    married:req.body.married
  }).then((result)=>{
    console.log(result);
    res.status(201).json(result)
  }).catch((err)=>{
    console.error(err);
    next(err);
  })


});


module.exports = router;
