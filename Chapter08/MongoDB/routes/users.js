var express = require('express');
var router = express.Router();
var User = require('../schemas/user');

/*====================== GET ========================*/
router.get('/', function(req, res, next) {
    User.find()
        .then((users)=>{
            res.json(users);
        })
        .catch((err)=>{
            console.error(err);
            next(err);
        })

});

/*====================== POST ========================*/
router.post('/', function(req, res, next) {
    console.log(`name:${req.body.name},age:${req.body.age},married:${req.body.married},`)
   const user = new User({
       name: req.body.name,
       age: parseInt(req.body.age),
       married: req.body.married,
   });


   user.save()
       .then((result)=>{
           res.status(201).json(result);

       })
       .catch((err)=>{
           console.error(err);
           next(err);
       })

});

module.exports = router;
