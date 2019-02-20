const path = require('path');
const Sequelize = require('sequelize');


const env = process.env.NODE_ENV || 'development';
    // 환경변수 설정  'development' - 개발용 / 'production' - 배포용

const config = require('../config/config.json');
    // config 가져오기  -- mysql 설정파일 (json) => 바로 객체화


const sequelize = new Sequelize(config.database,config[username],config.password,config);
    // Sequelize 객체 생성 - (mysql , uid,pw , 나머지 설정)

const db ={};

db.Sequelize = Sequelize;
db.sequelize = sequelize;


db.User = require('./user')(sequelize,Sequelize);
db.Comment = require('./comment')(sequelize,Sequelize);

module.exports = db;