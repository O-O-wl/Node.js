const http = require('http');

// node 는 런타임 이고 , http 모듈이 서버의 역할을 하는 것 -- 웹브라우저의 요청을 처리할수 있는 모듈

const fs = require('fs');






/*==============================================================
*             -    PORT    -
*         서버 내에서 프로세스를 구분하는 번호
*      DB-MySQL(3306),FTP(21),HTTP(80)
*         등 여러 요청 처리가 필요하다.
*     프로세스당 포트를 다르게 할당하여 관리한다.
*
*   http  : 80
*   https : 443
*  - 하나의 도메인에도 포트로 분기가 가능하다.
*
*  8080 port 를 쓰는 이유? 리눅스,맥 에서는 1024이하의 포트는 관리자 권한 필요
*
*  서비스할시 80,443 은 도메인에 생략이 가능하기에 사용 // 다른포트는 생략불가능
*================================================================
*/



// 'req'로 요청을 확인 , res 응답
const server = http.createServer((req,res) => {
    console.log('서버 실행');


    fs.readFile('./server2.html',(err,data)=>{

        if(err){
            throw err;
        }
        // 서버의 역할은 브라우저에 데이터가 들어있는 버퍼를 보내기만 하면된다. 나머지 처리는 브라우저의 역할이다.
        res.write(data);
       
        res.end();
    })
   /* res.write('<h1>Hello Node!</h1>');
    res.write('<h2>Hello JS!</h2>');
    res.write('<h3>Hello JS!</h3>');
    res.write('<h4>Hello JS!</h4>');
    res.write('<h5>Hello JS!</h5>');
    res.write('<h6>Hello JS!</h6>');
    res.end('<p>Hello Server!</p>'); //응답의 엔드포인트
    */



}).listen('9999',()=>{
    // node 런타임에 올리면 listen 상태 -- 대기상태에 들어간다. -- listen의 콜백메소드
    console.log('9999 포트에서 서버대기중입니다!')
});

server.on('listening',()=>{
console.log('대기중')
});

server.on('error',(err)=>{
console.error(`에러:${err}`)
});