**`$ npm i mysql2 sequelize`**



**`$ sudo npm i -g sequelize-cli`**  
###### - Sequelize Command Lind Interface : 터미널에서 바로 ORM 사용

**`$ sequlize init`**
###### - 프로젝트에 필요한 파일들 생성

**`$ sequlize db:create`**
###### - Schema 생성   - config.json 참조하여 생성


### config.json
```json
 {
  "development": {
    "username": "root",
    "password": null,
    "database": "nodejs", // 스키마
    "host": "127.0.0.1",
    "dialect": "mysql"
  },
  "test": {
    "username": "root",
    "password": null,
    "database": "database_test",
    "host": "127.0.0.1",
    "dialect": "mysql"
  },
  "production": {
    "username": "root",
    "password": null,
    "database": "database_production",
    "host": "127.0.0.1",
    "dialect": "mysql"
  }
}

```

**`프로젝트내에 'models'디렉터리 와 실제 DB내의 테이블이 1:1 관계`**