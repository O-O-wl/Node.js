const https = require('https');
const fs = require('fs');


const http2 = require('http2');


// 무료 인증서 lets encrypt  인증서 발급 받았다는 가정하에 진행
https.createServer(
    {// https 는 인증서에 대한 인자값이 추가된다
    cert : fs.readFile('도메인 인증서 경로'),
    key : fs.readFile('도메인 비밀키 경로'),
    ca : [
        fs.readFile('상위 인증서 경로'),
        fs.readFile('상위 인증서 경로'),
        fs.readFile('상위 인증서 경로'),
        fs.readFile('상위 인증서 경로'),
    ]
}

,(req,res)=>{
    res.end('https 서버 접속');
}).listen(443,()=>{
    console.log('443 포트에서 요청 대기중.')
});


/*===================================
        https 를 기반으로 돌아간다.
*==================================== */
// 무료 인증서 lets encrypt  인증서 발급 받았다는 가정하에 진행
http2.createSecureServer(
    {// http2 는 인증서에 대한 인자값이 추가된다
        cert : fs.readFile('도메인 인증서 경로'),
        key : fs.readFile('도메인 비밀키 경로'),
        ca : [
            fs.readFile('상위 인증서 경로'),
            fs.readFile('상위 인증서 경로'),
            fs.readFile('상위 인증서 경로'),
            fs.readFile('상위 인증서 경로'),
        ]
    }

    ,(req,res)=>{
        res.end('https 서버 접속');
    }).listen(443,()=>{
    console.log('443 포트에서 요청 대기중.')
});