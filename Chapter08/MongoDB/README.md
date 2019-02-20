## `MongoDB Setting`
---
-  **`$ /usr/bin/ruby -e "(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/isntall)"`**
     
    - **`패키지매니저 homebrew설치`**

- **`$ brew install mongodb`**
    - **`brew 패키지매니저를 이용해 mongoDB install`**


- **`$ sudo mkdir -p /data/db`**
    - **`홈 디렉터리에 데이터저장할 목적의 폴더 생성`**    

- **`$ sudo mongod`**
    - **`mongodb 실행`**

- **`$ brew services start mongodb`**
     - **`서버 실행`**

- **`$ mongo`**
     - **`데이터베이스 접속`**


 - **`$ use admin`**
     - **`admin 권한으로 접속`**
     

  - **`$ db.createUser({user:'이름',pwd:'비밀번호',roles:['root']}`**
     - **`사용자 생성`**   

  - **`$ brew services stop mongodb`**
     - **`몽고디비 중단`**   

  - **`$ vim /usr/local/etc/mongod.conf`**
     - **`설정파일 수정 - 추가`** 

  - ```
     ...
     security:
        authorization : enabled
     ```

- **`$ brew services start mongodb`**   
    - **`재시작`**  

- **`$ mongo admin -u [이름] [비밀번호]`**  
    - **`로그인으로 접속`**  

---


## `Mongo DB`
######  - JavaScript 문법을 활용한 DB
###### - 관계형 데이터베이스가 아니다. - NOSQL
###### - 관계를 표현하는법 
- **`key 처럼 id를 비슷하게하여 활용 - 무제한적으로 늘어날 수 있는 경우`**
- **`Nested 구조로 오브젝트내에 다른 오브젝트를 속성으로 넣는다. - 한정된 갯수일 경우 `**
---
**` -   Mysql     : 스키마 - 테이블 - 로우`**

**`- MongoDB : DB - 컬렉션 - 도큐먼트(컬렉션내에 다 다른 형식일 수 있음)`**
