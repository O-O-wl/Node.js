var express = require('express');
var router = express.Router();

const User = require('../schemas/user');  // 스키마의 해당 컬렉션을 import

/* GET home page. */
router.get('/', function(req, res, next) {

  User.find()
      .then((users)=>{
        res.render('mongoose', { users });
      })
      .catch((err)=>{
        console.error(err);
        next(err);
      })


});

module.exports = router;
