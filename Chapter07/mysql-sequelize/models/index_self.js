const path = require('path');
const Sequelize = require('sequelize');

const env = process.env.NODE_ENV || 'development';
    // 환경변수 설정  'development' - 개발용 / 'production' - 배포용

const config = require('../config/config')[env];
console.log("config[env] 는 ",config);
    // config 가져오기  -- mysql 설정파일 (json) => 바로 객체화


const sequelize = new Sequelize(config.database,config.username,config.password,config);
    // Sequelize 객체 생성 - (mysql , uid,pw , 나머지 설정)

const db ={};

db.Sequelize = Sequelize;
db.sequelize = sequelize;


db.User = require('./user')(sequelize,Sequelize);
db.Comment = require('./comment')(sequelize,Sequelize);

// 일 대 다 관계

db.User.hasMany(db.Comment,{foreignKey : 'commenter',sourceKey:'id'});   // commenter 의 출처 키 'id'
// sourceKey - User 가 가지고있음
// foreignKey - 상대 가 가지고있음
/**@풀어쓰기1  'User'객체는 여러개의 db.Comment를 가질 수있다 .*/
/**@풀어쓰기2  'commenter' 라는 외래키의 'db.Comment'의 원천으로 'id' 를 설정 한다. */




db.Comment.belongsTo(db.User,{foreignKey : 'commenter',targetKey:'id'}); // commenter 의 타겟 키 'user.id'
// foreignKey - Comment 가 가지고있음
// targetKey - 상대가 가지고있음

/**@풀어쓰기1 'Comment'객체는 여러개의 db.User에 포함되어있다.  */
/**@풀어쓰기2 'commenter' 라는 외래키의 타겟은 db.User 의 'id'이다. */

/**==================================================
            @일대일 - (hasOne,belongsTo)
            @일대다 - (hasMany,belongsTo)
            @다대다 - (belongsToMany,belongsToMany)
=====================================================*/


module.exports = db;