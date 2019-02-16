const fs = require('fs');

const readStream  = fs.createReadStream('./pipe_front.txt');
const readStream2 = fs.createWriteStream('./pipe_back.txt');
// 파일 복사하는 현상 -- 읽기스트림 을 쓰기스트림에 연결
//readStream.pipe(readStream2);

const copy = fs.copyFile('./pipe_front.txt','./pipe_back.txt',(err)=>{
    console.log(err);
});
