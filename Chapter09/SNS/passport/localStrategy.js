const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');
const { User } = require('../models'); // 디비 접근하기위해 연결


module.exports = (passport) =>{
    passport.use(new LocalStrategy({
        usernameField: 'email',         //req.body.email - app.use(urlencoded) 가 해석해서 바꾸어줌 -- 키워드 일치해야함
        passwordField: 'password',      //req.body.password
    }     // setting End
    ,async (email,password,done) => {
        /**====================================
                        @Done
                '에러','성공','실패' 의 포맷을 가짐
             @에러 - done(서버에러)
             @성공 - done(null,사용자정보)
             @실패 - done(null,false,실패정보)
         ======================================*/
        try{

            const exUser = await User.find({where:{email}});
            // 이메일 여부 검사 - 비동기



            if(exUser){
                //비밀번호 검사로직

                // passwordField 와 exUser의 비밀번호 비교
                const result = await bcrypt.compare(password,exUser,password);
                /**===========================================
                                @bcrypt
                        - 비밀번호 암호화 알고리즘
                ============================================== */
                // T/F

                if(result){  /** @성공 */
                    done(null,exUser);

                }else{ /* 비밀번호 불일치*/
                    done(null,false,{message:'비밀번호가 일치하지 않습니다.'});

                }

            }else{ /*이메일이 존재하지 않음*/


                done(null,false,{message:'가입되지 않은 회원입니다.'})
                //에러 - Null , 실패 , 실패메세지
            }


        }catch(error){
            /*에러 발생*/
            console.error(error);
            done(error) // done 에 error 를 넣어줌
        }
        } //async End
    ));
};

// 패스포트에 로컬전략객체생성 - 인자로 이메일/패스워드 -> 사용자폼에 맞게