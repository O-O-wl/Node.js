const express = require('express');
const bcrypt = require('bcrypt');
const { User } = require('../models');
const flash = require('connect-flash');

const router = express.Router();



router.post('/join',async (req,res,next)=>{

    const { email,nick,password } = req.body;
    // console.log(`회원가입요청 ${email},${nick},${password}`);
   // res.send(`회원가입요청 \n email:${email}\n nick:${nick}\npassword:${password}`)


    try{
        /*===============================================
                 회원가입 이전 전처리로직 - 기존회원확인
        ================================================ */
        const exUser = User.findOne({where:{email}});

        if(exUser){
            req.flash('회원가입실패',' 이미 가입된 이메일 입니다.');
            return res.redirect('/join');
        }

        /**============================================
                        패스워드 암호화
        ==============================================*/
        console.time('암호화');
       const hash =  await bcrypt.hash(password,20);// 암호화 정도
        console.timeEnd('암호화');


     await User.create({
            email,
          nick,
          password:(hash)
        });
     return res.redirect('/'); // 회원가입 성공 로직

    }
    catch (e) {
        next(e)
    }


});



router.post('/login',(req,res,next)=>{

});




module.exports = router;