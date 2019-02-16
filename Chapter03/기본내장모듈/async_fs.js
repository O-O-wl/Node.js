const fs = require('fs');

//var count = 0;
console.log('시작');
fs.readFile('./readme.txt',(err,data)=>{

    console.log(`1번 : ${data.toString()}`)
});
fs.readFile('./readme.txt',(err,data)=>{

    console.log(`2번 : ${data.toString()}`)
});
fs.readFile('./readme.txt',(err,data)=>{

    console.log(`3번 : ${data.toString()}`)
});

console.log('끝');


// 비동기 처리 순서 가늠할수 없음
/*
* 시작
끝
1번 : 저를 읽어주세요
3번 : 저를 읽어주세요
2번 : 저를 읽어주세요
➜  기본내장모듈 git:(master) ✗ node async_fs
시작
끝
1번 : 저를 읽어주세요
2번 : 저를 읽어주세요
3번 : 저를 읽어주세요
*/