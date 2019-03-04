const KakaoStrategy = require('passport-kakao').Strategy;

const { User } = require('../models');

module.exports = (passport) => {

    console.log('2.카카오서버에 인증위임');
        /**===========================
                     - 2 -

                   @카카오인증위임
            인증 완료후 콜할 URL 설정
         =============================*/
    passport.use(new KakaoStrategy({
            clientID : process.env.KAKAO_ID, // 카카오앱의 아이디
            callbackURL : '/auth/kakao/callback'   // 카카오 에 요청후 돌아올 주소
                                                    // 리다이렉트 주소 - 콜백을받을 라우터
        },
        /**===========================
                      - 4 -

                  @카카오인증위임
              인증 완료후 콜할 URL 설정
         =============================*/
        async (accessToken,refreshToken,profile,done)=>{


            try{
            console.log('4. 카카오 인증 콜백후  kakaoStrategy 에서 후 처리');
                const exUser = await User.find({where:{
                    snsId:profile.id, // 카카오 서버에서 반환해준 profile 의 id 속성
                    provider:'kakao'
                }});
            // DB에서 kakao 기존에 가입했는지 확인


            if(exUser){
                done(null,exUser);
            }else{


                console.log("========================================");
                console.log(`           KAKAO PROFILE OBJECT`           );
                console.log(                    profile                 );
                console.log(profile._json && profile._json.kaccount_email);
                console.log("========================================");


                const newUser = await User.create({

                    // 카카오 명세
                    email:'-',
                    nick:profile.displayName,
                    snsId:profile.id,
                    provider: 'kakao',
                } );

                done(null,newUser);
            }

    } catch(e){
            console.error(e);
             done(e);
        }
}))

};


/**===================================================================
                           @흐름

                     1. /auth/kakao
                     2. 카카오로그인 성공후
                     3. /auth/kakao/callback 으로 프로필 반환


 ====================================================================*/
