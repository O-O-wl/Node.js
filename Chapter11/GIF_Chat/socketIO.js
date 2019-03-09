const SocketIO = require('socket.io');

const axios = require('axios');

module.exports = (server,app,sessionMiddleWare) =>{

    const io = SocketIO(server, { path: '/socket.io' }); //클라이언트 접속 path



    /**===================================================
              IO 객체 setting -- Express 글로벌 사용하기위해
                @app.set('key',object)
                @req.app.get('key')
     ====================================================*/
        app.set('io',io);

        // SocketIO 에서의 미들웨어 사용
        io.use((socket,next)=>{
            /**=============================
                @req = socket.request
                @res = socket.request.res
             ==============================*/
            const req = socket.request;
            const res = socket.request.res;
           sessionMiddleWare(req,res,next);
           // next();
        });



    /*===========================
               네임 스페이스

              URL 에서 캐칭
             특정역할을 모아두기위해
    ============================*/
    const room = io.of('/room'); // url 에서 캐칭 --네임스페이스 --
    const chat = io.of('/chat');

    room.on('connection',(socket)=>{
        console.log(socket.id,' Room namespace 접속');


        console.log(`방 인 원 :${socket.adapter.rooms}`);

        socket.on('disconnect',()=>{
            console.log(' Room namespace 접속해제')
        })
    });

    chat.on('connection',(socket)=>{
        console.log(socket.id,'  Chat namespace 접속');

        const req = socket.request;

        const { headers:{referer}  } =req;
        const roomId = referer.split('/')[referer.split['/'].length-1].replace(/\?.+/,'');
        // room/{ROOM_ID} -> req.headers.referer

        /**=====================================
                     @Socket.io

                 @socket.join(ROOM_ID)
             해당 ROOM_ID 에 접속하는 메소드

                 @socket.to(ROOM_ID).emit()
             해당 ROOM_ID 에 메시지를 보내는 메소드

                 @socket.leave(ROOM_ID)
             해당 ROOM_ID 에 접속해제 하는 메소드
         ======================================*/

      socket.join(roomId);

        socket.to(roomId).emit('join',{
            user:'system',
            chat:`${req.session.color}님이 입장하였습니다.`
        });



        // socket 해제
        socket.on('disconnect',async ()=>{

            console.log(' Chat namespace 접속해제');

            // 방에서 소켓 제거
            socket.leave(roomId);

            // 나간 소켓 제거후 다시 카운팅
            const currentRoom = socket.adapter.rooms[roomId];

            const userCount = currentRoom.length | 0 ;

            if(userCount === 0){

                // 방제거
                try{
                    await  axios.delete(`http://localhost:${process.env.PORT}/room/${roomId}`);
                    console.log('방 제거 요청 성공')
                }catch(error){
                    console.error(error);
                }
            }else{
                socket.to(roomId).emit('exit',{
                    user:'system',
                    chat:`${req.session.color}님이 퇴장하셨습니다.`
                })
            }

        })
    });




    /** @NameSpace - '/' */
    io.on('connection',(socket)=>{

        console.log(`방 인 원 :${socket.adapter.rooms.length}`);
      //  console.log(socket);
        const req =  socket.request;
        const ip = req.headers['x-forwarded-for']
            || req.connection.remoteAddress;


        //                                          socket.id 로 클라이언트 구분
        console.log(`클라이언트 접속\n ip:${ip}\n req.ip: ${req.ip}\n socket.id:${socket.id} `);

        // 접속 종료
        socket.on('disconnect',()=>{
            clearInterval(socket.interval);
            console.log('클라이언트 종료');
        });

        // 에러 이벤트 핸들링
        socket.on('error',(error)=>{
            console.error(error);

        });

        // 답장 이벤트
        socket.on('fromClient',(data)=>{
            console.log(data);
        });

        socket.on('fromIOS',(data)=>{
            console.log(data);
            console.log(`orient socket id : ${socket.id}`);
        });


        socket.interval = setInterval(()=>{
            // 전송 이벤
            var comment = `${new Date()} - 서버 `;

            socket.emit('fromServer',comment);
            console.log(comment);
            console.log(`target socket id : ${socket.id}`);

        },2000)




    })
};

// 초기에 socket.io는 http 요청으로  웹소켓 사용여부물음