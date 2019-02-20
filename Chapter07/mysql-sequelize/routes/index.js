var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('sequelize', { title: 'Express' ,users:[{id:3,name:'부엉이',age:27,married:false} ] });
});

module.exports = router;
