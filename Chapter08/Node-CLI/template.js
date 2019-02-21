#!/usr/bin/env node
const fs = require('fs');
const path = require('path');



const type = process.argv[2];
const name = process.argv[3];
const directory = process.argv[4];



console.clear();




const htmlTemplate =
    `
    <!DOCTYPE html>
    <html>
    <head>
        <meta charset="utf-8"/>
        <title>Template</title>
    </head>
    <body>
        <h1>HELLO 👋</h1>
            <p>This is CLI 🧸</p>
    </body>
    
    </html>
    `;
const routeTemplate =
    `
        const express = require('express');
        const router = express.Router();
        
        router.get('/',(req,res,next)=>{
            try{
            res.send('ok');
            }catch(err){
            console.error(err)
            next(err)
            }
        })
        module.exports = router;
    `;

/*========================== 경로에 맞는 디렉터리 생성 ==================================*/
const mkdirp = (dir)=>{
    const dirname = path.relative('.',path.normalize(dir)) // 현재디렉터리에서 의 상대경로
        .split(path.sep).filter(p=>!!p);
    dirname.forEach((d,idx)=>{
        const pathBuilder = dirname.slice(0,idx+1).join(path.sep);
        if(!exist(pathBuilder)){
            fs.mkdirSync(pathBuilder)
        }
    })
};

/*==================================   존재여부 확인 메소드 =====================================*/
const exist = (dir) =>{
    try{
        fs.accessSync(dir,fs.constants.F_OK| fs.constants.R_OK | fs.constants.W_OK);
        return true;
    }catch (e) {
        console.error(e)

        return false
    }
};


/*==================================    템플릿 생성 메소드 ====================================*/
const makeTemplate = ()=>{
    mkdirp(directory);
    /*====================    html    ====================*/
    if(type === 'html'){
        const pathToFile = path.join(directory,`${name}.html`);
        if(exist(pathToFile)){
            console.error("이미 파일이 존재합니다.")
        } else {
        fs.writeFileSync(pathToFile,htmlTemplate);
        console.log(pathToFile,'생성완료')
    }}
        /*====================    express-router    ====================*/
    else if(type === 'express-router'){
            const pathToFile = path.join(directory,`${name}.js`);
            if(exist(pathToFile)){
                console.error("이미 파일이 존재합니다.")
            } else {
                fs.writeFileSync(pathToFile,routeTemplate);
                console.log(pathToFile,'생성완료')
            }

}else{
        console.log('html 또는 express-router 둘 중 하나를 입력하세요.')
    }};


/*======================================= main =======================================*/
const program = ()=>{
    if(!type || !name){
        console.error('사용방법 : cli html|express-router 파일명 [생성경로]')
    }else{
        makeTemplate();
    }
};

program();