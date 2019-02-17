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

/* 세션 객체 생성 */
const session = {};

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

        /* 1970 이후 지나온 시간*/
        const randomInt = + new Date();



        // 4. 쿠키 만료시간 설정
        const expires = new Date();
        expires.setMinutes(expires.getMinutes()+5);



        /* 세션에 알수 없는 키를 바탕으로 쿠키를 저장 */
        session[randomInt] = {
            name,
            expires,
        };


        /* 응답코드 , 쿠키  , 쿠키만료시간 , js 에서 쿠키 접근 설정여부 , 쿠키의 유효경로 */
        res.writeHead(302, {
            Location: '/',
            'Set-Cookie': `session=${randomInt}; Expires=${expires.toGMTString()}; HttpOnly; Path=/`,
        });
        res.end(name);

    /*  쿠키에 세션이라는 속성이 존재하는지 , session 에서 expire가 현재 시간보다 이후 일시 -> 만료시간전일시 */
    }else if(cookies.session && session[cookies.session].expires > new Date()){
        res.writeHead(200,{'Content-Type':'text/html;charset=utf-8'});
        res.end(`${session[cookies.session].name}님 안녕하세요`)

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

            - 개발자도구에서 노출되어 보안에 취약하다.
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
/* =============================================================
                          - 메모리 세션 -
                     메모리에 데이터 저장하는 세션
           외부에서 안보이는 서버 메모리에 저장 -- 쿠키의 노출을막기위해

                       쿠키는 정보가 브라우저
                      세션은 정보가 서버내에 존재

             쿠키는 서버내에서 정보를 찾을수있는 인덱스만 저장하고
            서버내에서 쿠키에 저장된 인덱스로 세션내에서 찾아서 반환

=============================================================== */