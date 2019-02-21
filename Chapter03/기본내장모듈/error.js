/*
* - Node.js 는 싱글스레드
* - 따라서 예외처리를 잘해주지 않으면
* - 프로그램이 다운 되버릴 수 있다.
* */

const fs = require('fs');


/* - 처리되지 않은 에러를 한번에 모아서 에러 처리
 - 에러를 기록은 하나 에러를 해결하는 것은 아님 */
process.on('uncaughtException',(err)=>{
    console.error(`예기치 못한 에러 : ${err}`)
    // 서버 복구 로직  -> 무조건적으로 실행되는 코드는 아님
});

setInterval(()=>{
    throw new Error('서버를 고장내주마');
},1000);

setInterval(()=>{
    console.log('실행됩니다.');

},2000);