#!/usr/bin/env node
const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin, //standard input
    output:process.stdout //standard output
});

console.clear();

const callback = (answer)=>{
    if (answer ==='Y'){
        console.log('감사함미다 ! 😊')
    }else if(answer ==='N') {
        console.log(' 죄송함미다.. 😔')
    }else {
        console.log('( Y/N )로 입력해주세요 .');
        rl.question('예제 재미있으신가여? (Y/N)\n',callback);
        return;

    }
    rl.close();

};

rl.question('예제 재미있으신가여? (Y/N)\n',callback);

//init();