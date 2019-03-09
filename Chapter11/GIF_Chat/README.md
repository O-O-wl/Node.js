# `Socket.io 채팅프로그램`



---
**`init`**
```js
const server = app.listen(app.get('port'),()=>{
console.log(`${app.get('port')}번 포트에서 대기중`)
});

webSocket(server);
```
-    서버 생성후 socket.io 모듈 exports 메소드 실행
---
**`socketIO.js`**
```js
const SocketIO = require('socket.io');

module.exports = (server) =>{

    const io = SocketIO(server); //클라이언트 접속 path

    /** @NameSpace - '/' */
    io.on('connection',(socket)=>{

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
    })
};

// 초기에 socket.io는 http 요청으로  웹소켓 사용여부물음
```

- **`connection` , `disconnected`,`error` 핸들링**
---
**`NameSpace` : `불필요한 이벤트에 데이터가 클라이언트에 전달되지 않게끔`**
```js
const SocketIO = require('socket.io');

module.exports = (server) =>{

    const io = SocketIO(server); //클라이언트 접속 path


    const room = io.of('/room')
    const chat = io.of('/chat')

```

---
### `Socket.io 기본 메소드`

- **Socket.io**
  
  - **`socket.join(ROOM_ID)`**:`해당 ROOM_ID 에 접속하는 메소드`

  - **`socket.to(ROOM_ID).emit('eventName',{})`**:
             `해당 ROOM_ID 에 메시지를 보내는 메소드`

  - **`socket.leave(ROOM_ID)`**:
             `해당 ROOM_ID 에 접속해제 하는 메소드`
       
