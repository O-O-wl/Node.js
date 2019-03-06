const SocketIO = require('socket.io');

module.exports = (server) =>{
    const io = SocketIO(server,{path:'/socket.io'}); //클라이언트 접속 path

    io.on('connection',(socket)=>{

      //  console.log(socket);
        const req =  socket.request;
        const ip = req.headers['x-forwarded-for']
            || req.connection.remoteAddress;


        //                                          socket.id 로 클라이언트 구분
        console.log(`클라이언트 접속\n ip:${ip}\n req.ip: ${req.ip}\n socket.id:${socket.id} `);

        // 접속 종료
        io.on('disconnect',()=>{
            clearInterval(socket.interval)
        });

        // 에러 이벤트 핸들링
        io.on('error',(error)=>{
            console.error(error);

        });

        // 답장 이벤트
        socket.on('fromClient',(data)=>{
            console.log(data);
        });
        socket.interval = setInterval(()=>{
            // 전송 이벤
            socket.emit('fromServer',`${new Date()} - 서버 `)
        },2000)



    })
};