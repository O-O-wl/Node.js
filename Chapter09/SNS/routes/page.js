const express = require('express');
const router = express.Router();

// 페이지 렌더링 라우터


/*================================    프로필     ======================================*/
router.get('/profile',(req,res,next)=>{
    res.render('profile',{title:'내정보 - Node SNS',user:null});


});




/*================================  회원가입   ======================================*/
router.get('/join',(req,res,next)=>{
res.render('join',{title:'회원가입 - Node SNS ',user : null,joinError:req.flash('join Error')})
});


router.get('/',(req,res,next)=>{

    res.render('main',{
        title:"Node SNS",
        twits:[],
        user:null,
        loginError:reg.flash('loginError')
    })
});



module.exports = router;