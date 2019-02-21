const fs = require('fs');


/*  ==========================  비동기 방식으로 진행 ==========================================*/

/** ================================== 파일 읽어오기 ================================== */
fs.readFile('./readme.txt',(err,data) => {
    if(err){
        throw err;
    }
    console.log(data); // 바이너리 <Buffer ec a0 80 eb a5 bc 20 ec 9d bd ec 96 b4 ec a3 bc ec 84 b8 ec 9a 94>
    console.log(data.toString()); // 문자열 - 저를 읽어주세요
});

/** =========================== 파일 쓰고 , 쓴파일 읽어오기 ============================ */
fs.writeFile('./writeme.txt','글을 써주세요',(err)=>{
    if(err){
        throw err;
    }

    fs.readFile('./writeme.txt',(err,data)=>{
        if(err){
            throw  err;

        }
        console.log(data); // <Buffer ea b8 80 ec 9d 84 20 ec 8d a8 ec a3 bc ec 84 b8 ec 9a 94 2e>

        console.log(data.toString()) // 글을 써주세요

    })
});

