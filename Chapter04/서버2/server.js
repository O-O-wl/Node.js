const http = require('http');

const parseCookies = (cookie = '') =>
    cookie
        .split(';')
        .map(v => v.split('='))
        .reduce((acc, [k, v]) => {
            acc[k.trim()] = decodeURIComponent(v);
            return acc;
        }, {});

http.createServer((req, res) => {
    //  parseCookies - 쿠키 문자열을 넣으면 쿠키 객체로 변환
    const cookies = parseCookies(req.headers.cookie); // req.headers.cookie -> 개발자 도구의 request-header-cookie 의 값
    console.log(req.url, cookies);


     res.writeHead(200, { 'Set-Cookie': 'mycookies=test' }); // writeHead('응답코드' )  {Set-Cookie: 'key = val'}
    res.end('Hello Cookie');
})
    .listen(9999, () => {
        console.log('9999번 포트에서 서버 대기중입니다!');
    });


/*==============================================================
                            - 쿠키 -
              클라이언트 와 서버 간의 쉬운 데이터 전송에 이용
              처음에 서버에서 발급을 받은 후 , 이 후 매요청마다
                          쿠키를 같이 보낸다.


==============================================================*/
