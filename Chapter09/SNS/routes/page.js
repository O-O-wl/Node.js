const express = require('express');
const router = express.Router();
const { isLoggedIn,isNotLoggedIn } = require('./middlewares');
const { User , Post , Hashtag} = require('../models');
// 페이지 렌더링 라우터


/*================================    프로필 페이지    ======================================*/
router.get('/profile',isLoggedIn,(req,res,next)=>{
    res.render('profile',{
        title:'내정보 - Node SNS',
        user:req.user
    });


});




/*================================  회원가입 페이지  ======================================*/
router.get('/join',isNotLoggedIn,(req,res,next)=>{
    res.render('join',{
        title:'회원가입 - Node SNS ',
        user : req.user,
        joinError:req.flash('join Error')
    })
});





router.get('/',async(req,res,next)=>{

    const posts = await Post.findAll({
        include:{
            model:User,
            attribute:['id','nick']
        }
    });

    await res.render('main',{
        title:"Node SNS",
        twits:posts,
        user:req.user,
        loginError:req.flash('loginError')
    })
});


module.exports = router;