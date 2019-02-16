const fs = require('fs');


/******************* 콜백 헬 ************************/

/*
console.log('시작');

fs.readFile('./readme.txt',(err,data)=>{

    console.log(`1번 : ${data.toString()}`)
    fs.readFile('./readme.txt',(err,data)=>{

        console.log(`2번 : ${data.toString()}`)
        fs.readFile('./readme.txt',(err,data)=>{

            console.log(`3번 : ${data.toString()}`)

                console.log('끝');

        });
    });
});
*/

// 블럭킹 
console.log('시작');

let data = fs.readFileSync('./readme.txt');
console.log('1번:',data.toString());
 data = fs.readFileSync('./readme.txt');
console.log('2번:',data.toString());
 data = fs.readFileSync('./readme.txt');
console.log('3번:',data.toString());

console.log('끝');