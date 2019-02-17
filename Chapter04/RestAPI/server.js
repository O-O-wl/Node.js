/** ================================================
                  - Rest API -
            서버에 자원을 클라이언트가 주소를 통해
       자원을 가져오는 것에 주소를 어떻게 구조화 할것인가

                @GET    - 받다
                @POST   - 게시 -> 등록

                @PUT    - 삽입 -> 전체수정
                @PATCH  - 수정 -> 부분수정
                @DELETE - 제거 -> 삭제

       GET - 동사 / localhost:9999/Datas/5 - 자원

 ===================================================*/

const http  = require('http');
const fs = require('fs');


const users = {};

const server = http.createServer((req,res)=>{

    /*============== GET ===============*/

         if(req.method ==='GET'){
             //=========== URL 분기 ==============//
             if(req.url ==='/'){

                 return fs.readFile('./client.html',(err,data)=>{
                     if(err){
                         throw err;
                     }
                     res.end(data)
                 })


             }
             else if(req.url ==='/users'){


                 res.writeHead(200,{'Content-Type':'text/html;charset=utf-8'});
                 return res.end(JSON.stringify(users))  // 객체를 문자열로 반환
             }

             /** @정적파일반환 */
             else{
                 return (fs.readFile(`.${req.url}`,(err,data)=>{
                     if(err){
                         console.log(`${req.url}파일이 존재하지 않습니다.`);
                         throw  err;
                     }
                     res.end(data);

                 }))
             }
             /**===========================================================

              @Note html에서 css,js 가 필요하기떄문에 서버에 그 파일을 url로 요청하므로


             else if(req.url ==='/client.css'){
                 return fs.readFile('./client.css',(err,data)=>{
                     if(err){
                         throw err;
                     }
                     res.end(data)
                 })

             }
             else if(req.url ==='/client.js'){
                 return fs.readFile('./client.js',(err,data)=>{
                     if(err){
                         throw err;
                     }
                     res.end(data)
                 })

             }*/
             //==================================//
         }

    /*============== POST ===============*/

    else if(req.method === 'POST'){

             //=========== URL 분기 ==============//
             if(req.url ==='/'){


             }

             else if(req.url ==='/users'){

                 // 1. 본문을 받을 문자열
                 let body ='';

                 // 2. 스트림으로 전송받으면 스트리밍 진행
                 req.on('data',(chunk)=>{
                     // 3. 하나하나의 데이터 chunk 를 body를 담을 문자열에 덮붙임
                     body += chunk;

                 });

                 // 4. req 로 들어온 데이터 스트리밍 끝난 후
                 req.on('end',()=>{
                     console.log(`POST 본문 (body): ${body}`);

                     // 5. 본문을 JSON 으로 변환 -> 비구조화 할당
                     const { name } = JSON.parse(body);

                     // 6. POST 요청시 요청시간으로 아이디생성
                     const id = +new Date();

                     // 7. ID 를 이용하여 저장
                     users[id] = name;

                     // 8. 생성 성공을 나타내는 헤더 생성
                     res.writeHead(201,{'Content-Type':'text/html;charset=utf-8'});

                     res.end('사용자 등록 성공');

                 })

             }

             //==================================//
         }
    /*============== PUT ===============*/

    else if(req.method === 'PUT'){

             //=========== URL 분기 ==============//
             if(req.url ==='/'){

             }
             // 1. PUT 요청 메소드 , '/users/' 로 시작하는 요청 URL
             else if(req.url.startsWith('/users/')){

                 // 2 .URL splite -> id 추출
                 const id = req.url.split('/')[2];

                 // 3. body 문자열 자원 생성
                 let body ='';

                 // 4. 스트림을 읽어서 바디 문자열에 저장
                 req.on('data',(chunk)=>{
                     body +=chunk;
                 });

                 // 5. 모든 스트림 읽어온다음
                 return req.on('end',()=>{

                     console.log(`PUT 본문 : ${body}`);

                     // 6. id 에 해당하는 값을 새로 읽어온 값으로 저장
                     users[id] = JSON.parse(body).name

                     res.writeHead(200,{'Content-Type':'text/html;charset=utf-8'});
                     res.end(`${JSON.stringify(users)}`)
                 })

             }
             //==================================//
         }
    /*============== PATCH ===============*/

    else if(req.method === 'PATCH'){

             //=========== URL 분기 ==============//
             if(req.url ==='/'){

             }
             else if(req.url ==='/users'){


             }
             //==================================//
         }
    /*============== DELETE ===============*/

    else if(req.method === 'DELETE'){

             //=========== URL 분기 ==============//
             if(req.url ==='/'){

             }
// 1. PUT 요청 메소드 , '/users/' 로 시작하는 요청 URL
             else if(req.url.startsWith('/users/')){

                 // 2 .URL splite -> id 추출
                 const id = req.url.split('/')[2];

                 // 3. body 문자열 자원 생성
                 let body ='';

                 // 4. 스트림을 읽어서 바디 문자열에 저장
                 req.on('data',(chunk)=>{
                     body +=chunk;
                 });

                 // 5. 모든 스트림 읽어온다음
                 return req.on('end',()=>{

                     console.log(`PUT 본문 : ${body}`);

                     // 6. id 에 해당하는 값 삭제
                     delete users[id]; // = JSON.parse(body).name

                     res.writeHead(200,{'Content-Type':'text/html;charset=utf-8','Allow':'*'});

                     res.end(`${JSON.stringify(users)}`)
                 })

             }
             //==================================//
         }

}).listen(9999,()=>{ /* 종료되지 않고 유지 */
    console.log('9999포트에서 서버 대기중')
});
