const http = require('http');
const fs = require('fs');
const url = require('url');
const qs = require('querystring');


const parseCookies = (cookie = '') =>
    cookie
        .split(';')
        .map(v => v.split('='))
        .reduce((acc, [k, v]) => {
            acc[k.trim()] = decodeURIComponent(v);
            return acc;
        }, {});

const server = http.createServer((req, res) => {
    //  parseCookies - 쿠키 문자열을 넣으면 쿠키 객체로 변환
    const cookies = parseCookies(req.headers.cookie); // req.headers.cookie -> 개발자 도구의 request-header-cookie 의 값
    console.log(req.url, cookies);

    // 1.  url 이 /login 으로 시작할시
    if(req.url.startsWith('/login')){

        // 2. url을 parse 해서 비구조화 할당으로 query 추출
        const { query } = url.parse(req.url);

        // 3. 추출된 쿼리에서 또 name 추출
        const { name } = qs.parse(query);

        // 4. 쿠키 만료시간 설정
        const expires = new Date();
        expires.setMinutes(expires.getMinutes()+5);
        /* 응답코드 , 쿠키  , 쿠키만료시간 , js 에서 쿠키 접근 설정여부 , 쿠키의 유효경로 */


        res.writeHead(302, {
            Location: '/',
            'Set-Cookie': `name=${encodeURIComponent(name)}; Expires=${expires.toGMTString()}; HttpOnly; Path=/`,
        });
        res.end(name);


    }else if(cookies.name){
        res.writeHead(200,{'Content-Type':'text/html;charset=utf-8'});
        res.end(`${cookies.name}님 안녕하세요`)

    }

    else{
        fs.readFile('./client.html',(err,data)=>{
            res.end(data);
            //res.end();
        })
    }


     res.writeHead(200, { 'Set-Cookie': 'mycookies=test' }); // writeHead('응답코드' )  {Set-Cookie: 'key = val'}
   // res.end('Hello Cookie');
})
    .listen(9999, () => {
        console.log('9999번 포트에서 서버 대기중입니다!');
    });

server.on('error',(err)=>{
    console.error(err);
});



/*==============================================================
                            - 쿠키 -
              클라이언트 와 서버 간의 쉬운 데이터 전송에 이용
              처음에 서버에서 발급을 받은 후 , 이 후 매요청마다
                          쿠키를 같이 보낸다.


==============================================================*/
/**==========================================================
 *                    -   응 답 코 드 -
 *
 *                 200 -  성공
 *                 302 -  임시 이동 -> Location 으로
 *                 400 - Bad Request
 *                 404 - Not Found
 *
 * ========================================================== */