const mongoose = require('mongoose');


//몽구스 커넥션

const { MONGO_ID,MONGO_PASSWORD,NODE_ENV } = process.env;

// 몽고디비 접속 URL
const MONGO_URL = `mongodb://${MONGO_ID}:${MONGO_PASSWORD}@localhost:27017/admin`;

module.exports = () =>{


    // connect 함수 선언


    const connect = () =>{
        mongoose.connect(MONGO_URL,{
            dbName: 'gifchat',

        },(error)=>{
            if(error){
                console.log('몽고디비 에러:',error)
            }else{
                console.log('몽고디비 연결 성공 ')
            }

        })
    };

    // 호출
    connect();



    // 연결시 일어날 수 있는 이벤트 처리
    mongoose.connection.on('error',(error)=>{
        console.log('몽고디비 연결에러2',error)
    });

    mongoose.connection.on('disconnected',()=>{
        console.log('몽고디비 접속이 끊겼습니다. 재시도 합니다.');
        connect();
    });

    require('./room');
    require('./chat');
};