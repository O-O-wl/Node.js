
const local = require('./localStrategy');
const kakao  = require('./kakaoStrategy');
/**=======================================
                  @전략
      여기서의 전략 누구를 로그인 시켜줄것인가?
 =========================================*/

module.exports = (passport) =>{

    local(passport);  // 로컬패스포트 활성화
    kakao(passport);  // 카카오 패스포트 활성화
};