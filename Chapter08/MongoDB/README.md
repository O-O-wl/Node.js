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
     - **`설정파일 수정`**    
  - 
    ``` vim
     ...
     security:
        authorization : enabled
    ```
     - **``**    
---

