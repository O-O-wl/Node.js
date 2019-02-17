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

const server = http.createServer((req,res)=>{
    let html = fs.readFile('./client.html',(err,data)=>{
        res.end(data.toString());
    })
}).listen(9999,()=>{
    console.log('9999포트에서 서버 대기중')
});
