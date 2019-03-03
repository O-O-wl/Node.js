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
- ######  4. `.env` 파일을 `process.env` 에 넣어주는 모듈 -> 보안
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
- ###### 10. `/passport/localStrategy.js` 작성
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
----
- ###### 11. `join` 로직 작성
 ```
  /routes/auth.js
 ```
-  ```js
    router.post('/join',async (req,res,next)=>{

    const { email,nick,password } = req.body;
 
    try{
        /*===============================================
                 회원가입 이전 전처리로직 - 기존회원확인
        ================================================ */
        const exUser = User.find({where:{email}});
                // 시퀄라이져

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
     return res.redirect('/'); // 회원가입 성공후  리다이렉느

    }
    catch (e) {
        next(e)
    }


    });
    
  

   ```

----
- ###### 12.`login` 로직 작성
 ```
  /routes/auth.js
 ```

 - ``` js


    const passport = require('passport');
    router.post('/login',(req,res,next)=>{

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




    ```

    - **`Note`**
        - **`localStrategy 에서 수행하고 반환된 done 객체핸들링`**
       
 ---
 - ###### 13. `passport` 설정파일 작성
 ```
  /passport/localStrategy,kakaoStrategy,index.js
 ```
 ---
 - ###### 1. `passport` 설정파일 작성
 ```
  /passport/localStrategy,kakaoStrategy,index.js
 ```
 ---
