# `Express 를 이용한 SNS`

----
<img src="https://cdn-images-1.medium.com/max/1200/0*ShbzlvZjT-VI72oW.png" width ='400' height ='200' >
<img src = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQNLB2jaw7mK8XLZMDOiegBqpDwor7tPTIgnwHQK2PdjyA_6M54" width ="150" ><img src="https://upload.wikimedia.org/wikipedia/en/thumb/6/62/MySQL.svg/1200px-MySQL.svg.png" width='200' height ="100">

----

- **`Node.js`**             
- **`Sequelzie`**
- **`MySQL`**
- **`Express`**


----

- ###### 1. 커맨드라인에서 사용할수있게 글로벌로 인스톨

```
$ npm i -g sequelize-cli nodemon
```
-    **`nodemon`** - `소스 수정시 자동반영`
---

- ###### 2. ORM,MySQL 패키지 인스톨
```
$ npm i  mysql2  sequelize
```


---


- ######  3. DB 환경 설정 
    ```
    config/config.json
    ```
---
- ###### 4. `.env` 파일을 `process.env` 에 넣어주는 모듈 -> 보안
```
$ npm i dotenv
```
---

- ###### 5. 모델객체 정의
 ```
    /models/user,post,hashtag.js
 ```
---
- ###### 6. `/models/index.js` 에 모델간의 관계정의

---

- ###### 7. `passport` 관련 패키지 install
 ```
  $  npm i passport passport-local passport-kakako bcrypt
 ```
- **모듈 info**
    - **`passport`**    : `passport 본체`
    - **`passport-local`**   :  `이메일 로그인`
    - **`passport-kakako `**    : `카카오로그인`
    - **`bcrypt`**: `비밀번호암호화`

---
- ###### 8. `passport` 설정파일 작성
 ```
  /passport/localStrategy,kakaoStrategy,index.js
 ```
 ---
  - ###### 9. `app.js` 에 `passport` 연결
```javascript
    const passport = required('passport');
    const passportConfig = required('/passport')

    app.use(passport.initialize()) */설정초기화/
    app.use(passport.session()) 
    */ strategy로 로그인 완료후 사용자 정보를 Session에 저장하게 설정  /
    //  ! - express-session 이 위에 정의 되어있어야한다. 
    
 ```
---
- ###### `10. /passport/localStrategy.js` 작성
```js
 LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');
const { User } = require('../models'); // 디비 접근하기위해 연결


module.exports = (passport) =>{
    passport.use(new LocalStrategy({
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
            if(exUser){ // 이메일 여부
                //비밀번호 검사로직
          const result = await bcrypt.compare(password,exUser,password);
           

                if(result){  //성공
                    
                }else{ //비밀번호 일치여부

                }

            }else{ /*이메일이 존재하지 않음*/
            }


        }catch(error){
            /*에러 발생*/
            console.error(errror);
            done(error) // done 에 error 를 넣어줌
        }
        } //async End
    ));
};

// 패스포트
```