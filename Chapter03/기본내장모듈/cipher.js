const crypto = require('crypto');


// '열쇠' cipher decipher 의 열쇠가 동일해야함
const cipher  = crypto.createCipher('aes-256-cbc','열쇠');

// 1. 'utf8'형식의 문자열 '부엉이1234'를 'base64'암호문으로 변환
let result = cipher.update('부엉이1234','utf8','base64');
// 1-2 . 암호화 마무리
result += cipher.final('base64');
console.log('암호:',result);


const decipher = crypto.createDecipher('aes-256-cbc','열쇠');

// 2. 'base64'형식의 암호문   'nIytPFW070HUl4LUmPoklQ=='  을  'utf8'형식의 문자열으로 변환
let result2 = decipher.update(result,'base64','utf8');
// 2-2 . 복호화 마무리
result2 += decipher.final('utf8');
console.log('원본:',result2);