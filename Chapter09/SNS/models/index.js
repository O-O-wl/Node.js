const Sequelize = require('sequelize');
const env = process.env.NODE_ENV || 'development';
const config = require('../config/config')[env];

const db = {};

const sequelize = new Sequelize(config.database,config.username,config.password,config);

db.sequelize = sequelize;
db.Sequelize = Sequelize;

// 관계정의부

db.User = require('./user')(sequelize,Sequelize);
db.Post = require('./post')(sequelize,Sequelize);
db.Hashtag = require('./hashtag')(sequelize,Sequelize);

db.User.hasMany(db.Post);
db.Post.belongsTo(db.User);
// 릴레이션 설정에 의해 Post 테이블에 userId 라는 칼럼이 추가된다.


db.Post.belongsToMany(db.Hashtag,{through:'PostHashTag'});
db.Hashtag.belongsToMany(db.Post,{through:'PostHashTag'});

// 다대다 관계시 -> 새로운 테이블이 생성된다    1 : M - N : 1 - 'through: xxxx' 모델명



db.User.belongsToMany(db.User,{through:'Follow' , as:'Followers',foreignKey:'followingId'});  // 일반인
db.User.belongsToMany(db.User,{through:'Follow', as:'Following',foreignKey:'followerId'});   // 유명인
// Follower - Following
/*{through:'테이블명' , as:'관계명',foreignKey:'참조키'}*/


db.User.belongsToMany(db.Post,{through:'Like'});
db.Post.belongsToMany(db.User,{through:'Like'});



module.exports = db;