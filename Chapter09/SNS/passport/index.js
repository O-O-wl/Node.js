
const local = require('./localStrategy');
const kakao  = require('./kakaoStrategy');

const { User } = require('../models');

/**=======================================
                  @전략
      여기서의 전략 누구를 로그인 시켜줄것인가?
 =========================================*/


const userCash = {}; // 캐싱을 저장할 객체

module.exports = (passport) =>{

    // 객체를 세션에 저장하기위해 경량화?하는 과정
    /** *********************************************
     *                                              *
                        @실행시점
                 passport.initialize()
     *        세션에 저장될 형태를 정하는 메소드             *
     *                                              *
     ************************************************/
    passport.serializeUser((user,done)=>{

        console.log('==========================');
        console.log('   serializeUser called');
        console.log('==========================');
        /*====================================================

            user = {id:1 , name:'부엉이' , age:27 }

                         1 로 변환

         req.session.passport.user & req.user = { id:1 }

        ======================================================*/

        done(null,user.id); // 세션에 id 만 저장

    });



    /** *********************************************
     *                                              *
                        @실행시점
                  passport.session()

     *  매 요청시마다 passport.session 미들웨어에 걸려서 실행 *
     *                                               *
     *                                               *
     *************************************************/
    passport.deserializeUser((id,done)=>{
        console.log('==========================');
        console.log('  deserializeUser called');
        console.log('==========================');
        console.log('id',id);
        /*=========================================
                          id = 1

                          객채화

            user = {id:1 , name:'부엉이' , age:27 }

         ============================================*/


        User.find({where:{id}})
         .then(user => done(null,user)  //캐싱

             // find의 결과물로 user 반환  => 콜백메소드 / req.user 에 다시 저장
        ).catch(e =>done(e));
    });


    local(passport);  // 로컬패스포트 활성화
    kakao(passport);  // 카카오 패스포트 활성화
};