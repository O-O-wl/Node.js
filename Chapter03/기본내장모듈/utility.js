const util = require('util');
const crypto = require('crypto');


//  deprecated 조만간 지원이 중단될 메서드임을 알려줌
const dontuseme = util.deprecate((x,y) => {
    console.log(x+y);
},'이 함수는 2018년 까지만 지원합니다.');

dontuseme(1,2);

/*=============== 프로미스 적용되게 하는 메소드 : promisify ========================*/


const randomBytesPromise = util.promisify(crypto.randomBytes);
const pbkdf2Promise = util.promisify(crypto.pbkdf2);

// 1. 바이트 만들어지면 프로미스반환
randomBytesPromise(64)
// 2 -1 . 성공이면 salt생성후 암호화 하고 프로미스 리턴
    .then((buf) => {
        const salt = buf.toString('base64');
        return pbkdf2Promise('부엉이1234',salt,854131,64,'sha512');
    })
    //3. 프로미스 가 true 면 return된 걸 key 매개변수로 반환 받아 console.log
    .then((key)=>{
        console.log('password:',key.toString('base64'));
    })
    .catch((error) =>{
        console.error(error);
    });

/** =============== async - await ========================*/
(async () => {
    const buf = await randomBytesPromise(64);
    const salt = buf.toString('base64');
    const key = await pbkdf2Promise('부엉이1234',salt,854131,64,'sha512');
    console.log('password:',key.toString('base64'))
})();