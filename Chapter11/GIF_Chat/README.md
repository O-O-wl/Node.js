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

module.exports = (server,app) =>{

    const io = SocketIO(server); //클라이언트 접속 path

// 익스프레스에서의 객체저장
    app.set('io',io); // io 객체 글로벌 사용

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
       
---
 #### `Express 에서의 글로벌 객체 저장`

**`app.set('key',object)`**

**`req.app.get('key')`**

--- 

#### `Socket.io 에서의 미들웨어 사용`
 ```js
    const SocketIO = require('socket.io');

    const io = SocketIO(server);
    
    io.use((socket,next)=>{

      const req = socket.request;
      const res = socket.request.res;
      MiddleWare(req,res,next);
        })
  ```

---
#### `채팅방 나가기`

```js
// socket 해제
        socket.on('disconnect',async ()=>{

            console.log(' Chat namespace 접속해제');

            // 방에서 소켓 제거
            socket.leave(roomId);

            // 나간 소켓 제거후 다시 카운팅
            const currentRoom = socket.adapter.rooms[roomId];
            // 방에 대한 정보 와 인원

            const userCount = currentRoom.length | 0



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

```

 - ### `삭제를 요청할때 axios 요청을 하고  라우터에서 DB를 조작하는 것이 좋다`

---

### `해당 소켓에 emit`
```js
 socket.emit('messageName',
    {
        'user':'부엉이',
        'chat':{
            'content':'부엉부엉',
            'createAt':`${Date()}`
        }
    }
)
```


--- 

### `BroadCast`
```js
 io.emit('messageName',
    {
        'user':'올빼미',
        'chat':{
            'content':'올뻄올뻄',
            'createAt':`${Date()}`
        }
    }
)
```