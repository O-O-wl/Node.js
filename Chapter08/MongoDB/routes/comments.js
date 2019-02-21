const express = require('express');
const router = express.Router();
const Comment = require('../schemas/comment');


/*====================== GET ========================*/
router.get('/:id', function(req, res, next) {
    Comment.find({commenter:req.params.id}).populate('commenter') //합치는 로직
        .then((comments)=>{
            res.json(comments)
        }).catch((err)=>{
            console.error(err);
            next(err);
    })

});

/*====================== POST ========================*/
router.post('/', function(req, res, next) {

    const comment = new Comment({
        commenter : req.body.id,
        comment: req.body.comment,
        createAt: new Date()
    });
    comment.save()
        .then((result)=>{
            res.status(201).json(result);
        }
        ).catch((err)=>{
        console.error(err);
        next(err);
    })

});

/*====================== PATCH ========================*/
router.patch('/:id', function(req, res, next) {

    Comment.update({_id : req.params.id},{comment:req.body.comment})
        .then((result)=>{
            res.json(result);
        }).catch((err)=>{
            console.error(err);
            next(err);
    })
});


/*====================== DELETE ========================*/
router.delete('/:id', async (req, res, next) =>{
       const result = await Comment.remove({_id:req.params.id});
       await res.json(result)
});



module.exports =  router;