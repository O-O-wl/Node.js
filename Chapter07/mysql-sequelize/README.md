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

- **`models/user.js`**
  
    ``` js
      module.exports = (sequelize,DataTypes)=>{
     return sequelize.define('user', { 
        //두번쨰 인자 칼럼정의
        */내부적으로 id 존재  /
        name: {},
        age: {},
        married: {},
        comment: {},
        create_at: {},
     }
     ,{ // 3번째 인자 시퀄라이저 설정
        timestamps:false, // 생성일  기록 - 위에 create_at 이 있기에 false
        underscored:true // true - 스네이크 , false - 캐멜  
      });
     };
     ```
- **`models/comment.js`**
  
    ``` js
      module.exports = (sequelize,DataTypes)=>{
    return sequelize.define('comment',{

      //commenter 생략 
       */내부적으로 id 존재  /
        comment:{
            type:DataTypes.STRING(100),
            allowNull:false
        },
        create_at:{
            type:DataTypes.DATE,
            allowNull:false,
            defaultValue: sequelize.literal('now()')
        }
    },{
        timestamps:false,
        underscored:true
        }
    );}
     ```   
- **`models/index.js`**
  
    ``` js
    const path = require('path');
    
    const Sequelize = require('sequelize');
    
    const env = process.env.NODE_ENV || 'development';
    
    const config = require('../config/config')[env];
    
    const sequelize = new Sequelize(config.database,config.username,config.password,config);

    const db ={};

    db.Sequelize = Sequelize;
    db.sequelize = sequelize;

    db.User = require('./user')(sequelize,Sequelize);
    db.Comment = require('./comment')(sequelize,Sequelize);


    db.User.hasMany(db.Comment,{foreignKey : 'commenter',sourceKey:'id'});   
    // commenter 의 출처 키 'id'

    db.Comment.belongsTo(db.User,{foreignKey : 'commenter',targetKey:'id'}); 
    // commenter 의 타겟 키 'user.id'
    
    */
    일대일 - (hasOne,belongsTo)
    일대다 - (hasMany,belongsTo)
    다대다 - (belongsToMany)
    /

    module.exports = db;

     ```        

---

| DB 메소드 | 기능 |
| :---: | :---: |
|  **`create`** |**`생성 하기`**  |
|  **`findAll`** |**` 전체목록 조회`**  |
|  **`find`** |**` 하나만 조회`**  |
|  **`destroy`** |**` 삭제 메소드`**  |
|  **`update`** |**` 수정 메소드`**  |
**`비동기 처리 메소드이고 , promise를 지원한다.`**

---
**`ORM 에서 CRUD 구현부`**
```js
/*================== GET =====================*/
router.get('/:id', function(req, res, next) {
   Comment.findAll({
        include:{  //JOIN
            model:User, // TARGET TABLE
            where:{id:req.params.id}, // ON
        }
    })
        .then((result)=>{
        console.log(result);
        res.status(200).json(result)
    }).catch((err)=>{
            console.error(err);
            next(err);
        }
    )
/*===================== POST ======================*/
router.post('/', (req, res, next) =>{
    Comment.create({
        commenter:req.body.id, 
        comment:req.body.comment
    }).then((result)=>{
        console.log(result);
        res.status(201).json(result)
    }).catch((err)=>{
        console.error(err);
        next(err);
        }
    )

});

/*================== PATCH ======================*/
router.patch('/:id', function(req, res, next) {
    comment.update({
        comment:req.body.comment
    },{ where: {id:req.params.id}
    }).then((result)=>{
        console.log(result);
        res.json(result)
    }).catch((err)=>{
        console.error(err);
        next(err);
    })
})
;
/*=================== DELETE =====================*/
router.delete('/:id', function(req, res, next) {
    comment.destoy(
        {
            where : {
                id : req.params.id // 삭제 조건
            }
        }
    ).then((result)=>{
        console.log(result);
        res.status(200).json(result)
    }).catch((err)=>{
            console.error(err);
            next(err);
        }
    )
});

```