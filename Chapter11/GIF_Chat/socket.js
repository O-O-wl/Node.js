const WebSocket = require('ws');


module.exports = (server)=>{
    // 웹소켓 모듈로 웹소켓 서버 생ㄹ성
    const wss = new WebSocket.Server({server}) ; // http 서버랑 wss 서버는 포트공유


    // ws 요청이 오면 양방향 연결 수립시 실행되는 이벤트 'connection'
    wss.on('connection',(ws,req)=>{ //커넥션 이벤트시 소켓,요청이 인자로 들어옴

      //  console.log(ws);

        const ip = req.headers['x-forwarded-for'] ||  // 프록시 서버를 거치기 이전의 ip
                    req.connection.remoteAddress;     // 최종 ip
       // console.log(ip);
        console.log('클라이언트 접속',ip);


        // 클라이언트가 메세지를 보냈을 시 실행되는 이벤트
        ws.on('message',(message)=>{

            console.log(message)
        });

        // 에러 발생 이벤트
        ws.on('error',(error)=>{
            console.error(error)

        });

        // 클라이언트가 소켓과 연결을 끊었을때 실행되는 이벤트
        ws.on('close',()=>{

            console.log('클라이언트 연결해제',ip);
            clearInterval(ws.interval)
        });

        const interval = setInterval(()=>{
            if(ws.readyState === ws.OPEN){ // 연결된 상태가 아닌 상태에서 메시지를 보내면 에러가 날수있
                ws.send(` ${new Date()} - 서버에서 `)
            }
            },3000);

        /** =======================================
                        @readyState

                CONNECTING  :   연결중
                OPEN        :   연결수립
                CLOSEING    :   종료중
                CLOSED      :   종료
         ========================================*/
    })
};