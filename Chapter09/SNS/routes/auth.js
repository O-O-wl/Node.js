const express = require('express');
const bcrypt = require('bcrypt');


const passport = require('passport');


const { User } = require('../models');
const flash = require('connect-flash');

const {isLoggedIn,isNotLoggedIn} = require('middlewares');


const router = express.Router();



/**=====================================================
 *
                  @회원가입로직 미들웨어
                  @POST  /auth/join
 *
 ======================================================*/
// 로그인중이 아닌지 확인하는 미들웨어 실행 후 회원가입 미들웨어 추가로 실행
router.post('/join',isNotLoggedIn,async (req,res,next)=>{

    const { email,nick,password } = req.body;
    // console.log(`회원가입요청 ${email},${nick},${password}`);
   // res.send(`회원가입요청 \n email:${email}\n nick:${nick}\npassword:${password}`)

    //router.use(flash());

    try{
        /*===============================================
                 회원가입 이전 전처리로직 - 기존회원확인
        ================================================ */
        const exUser = User.find({where:{email}});

        if(exUser){
            console.log('회원가입실패');
            req.flash('joinError',' 이미 가입된 이메일 입니다.');
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



/**=====================================================
 *
                      @로그인 로직 미들웨어
                     @POST /auth/login
 *
 ======================================================*/
// 로그인 중이 아닌지 확인하는 미들웨어 실행후 로그인로직을 수행하는 미들웨어 추가로 실행
router.post('/login',isNotLoggedIn,(req,res,next)=>{

                        // passport 의 local속성   /  done(에러,성공,실패) strategy 반환값 처리
    passport.authenticate('local',(authError,user,Info)=>{

        /*========= 에러 핸들링 ==========*/
        if(authError){
            console.error(authError);
            next(authError);
        }

        /* =========== 실패 =============*/
        else if(!user){
            req.flash('loginError',Info.message); // 알림후 리다이렉트
            return req.redirect('/');
        }

        /** ======== Done 성공 =========*/
        // done 의 user로 로그인 -> req.user 에  사용자 정보저장 /// 실패로직도 구현
        return req.login(user,(loginError)=>{

            /* 가능성은적지만 로그인과정 에 발생할 에러처리*/
            if(loginError){
                console.error(loginError);
                return next(loginError);
            }
            return req.redirect('/');
        })




    })

});


/**=====================================================
 *
                 @로그아웃 로직 미들웨어
                @GET  /auth/logout
 *
 ======================================================*/
router.get('/logout',isLoggedIn,(req,res,next)=>{

    req.logout(); // 패스포트를 통해 자동으로 추가된 메소드
    /*
    호출하면 등록 정보 logout()가 제거되고 req.user로그인 세션이 지워집니다 (있는 경우).*/

    req.session.destroy(); //  req.user 삭제를 위한 세션객체 속성 삭
    res.redirect('/'); //로그아웃후 메인페이지로 반환


});


module.exports = router;