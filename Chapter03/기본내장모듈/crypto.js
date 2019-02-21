const crypto = require('crypto');

// '부엉이1234'를 'sha512'암호화알고리즘으로 암호화하여 , 'base64'인코딩방식으로 보여준다.
const cryptoedPW = crypto.createHash('sha512').update('부엉이1234').digest('base64');

console.log(cryptoedPW);

/* =====================================
    해쉬는 암호화 할 수 있으나 복호화 불가능
            - 단방향암호화
    1234 - 'qwdmkqwmdlkqfmq123fdq'
    9748 - 'qwdmkqwmdlkqfmq123fdq'

    비밀번호 충돌 가능
 * ===================================== */


console.log("=======================================================================================");


const pbkd2PW = crypto.randomBytes(64 , (err,buf) =>{ // 1. 64길이의 문자열 생성 -> salt로 사용할 문자열
    const salt = buf.toString('base64');
    console.log('salt',salt);
    console.time('암호화');
    // 2. pbkdf2('비밀번호',salt,반복횟수,출력바이트,해시알고리즘)
    /* salt 문자열에 '854103'번의 'sha512'해시 알고리즘을 적용*/
    crypto.pbkdf2('부엉이1234',salt,854103,64,'sha512',(err,key) => {
        console.log('password : ',key.toString('base64'))
        console.timeEnd('암호화');


    })

    }

);

