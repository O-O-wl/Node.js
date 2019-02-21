var express = require('express');
var router = express.Router();
var { Comment } = require('../models/index_self');

var { User } = require('../models/index_self');

/*=========== GET =============*/
router.get('/:id', function(req, res, next) {
    console.log("요청 id",req.params.id);
    Comment.findAll({
        include:{  //JOIN
            model:User, // TARGET TABLE
            where:{id:req.params.id}, // ON
        }
    })
        .then((result)=>{
       // console.log(result);
        res.status(200).json(result)
    }).catch((err)=>{
            console.error(err);
            next(err);
        }
    )
});

/*=========== POST =============*/
router.post('/', (req, res, next) =>{
    Comment.create({
        commenter:req.body.id,
        comment:req.body.comment
    }).then((result)=>{
        //console.log(result);
        res.status(201).json(result)
    }).catch((err)=>{
        console.error(err);
        next(err);
        }
    )

});

/*=========== PATCH =============*/
router.patch('/:id', function(req, res, next) {
    Comment.update({
        comment:req.body.comment
    },{ where: {id:req.params.id}
    }).then((result)=>{
        console.log(result);
        res.json(result)
    }).catch((err)=>{
        console.error(err);
        next(err);
    })
})
;

/*=========== DELETE =============*/
router.delete('/:id', function(req, res, next) {
    Comment.destroy(
        {
            where : {
                id : req.params.id
            }
        }
    ).then((result)=>{
        console.log(result);
        res.status(200).json(result)
    }).catch((err)=>{
            console.error(err);
            next(err);
        }
    )
});

module.exports = router;
