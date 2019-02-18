/*==============================================
                Node 는 싱글스레드
              따라서 코어를 한개만 사용

                  클러스터링
    - 나머지 idle 코어도 전부 사용하기 위한 방법
===============================================*/



const cluster = require('cluster');
const os = require('os');
const http = require('http');


const numCPUs = os.cpus().length; // CPU 의 갯수

//console.log(numCPUs); // 8  왜 8개지 ...


if(cluster.isMaster){ // 관리자 프로세스

    console.log(`관리자 프로세스 아이디 : ${process.pid}`);

    for(let i = 0 ; i < numCPUs ; i += 1){
        cluster.fork() ; // CPU core 갯수 만큼 워커 프로세스 생성
    }

    cluster.on('exit',(worker,code,signal)=>{
        console.log(`${worker.process.pid} 워커가 종료되었습니다.`);

       // cluster.fork(); // 워커가 종료됬으니 , 새로 생성
    })

}else{ //cluster.isWorker - 일꾼 프로세스

    http.createServer((req,res)=>{

        /* =======================================================
               일꾼이 요청을 실행하는지 확인 하기 위해 요청시 프로세스 kill

                      모든 워커프로세스 사망시 - 요청 거절
        ========================================================*/
        res.end('http server',()=>{
            setInterval(()=>{
                process.exit();

            },1000);

        })


    }).listen(8080);
    console.log(process.pid,'워커 실행');
}
