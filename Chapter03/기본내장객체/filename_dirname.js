console.log(__filename);
console.log(__dirname);
console.log(process.version);   // 설치된 노드버젼
console.log(process.cwd());     // 프로세스 실행위치
console.log(process.pid);       // 프로세스 아이디
console.log(process.platform);  // 운영체제
console.log(process.uptime());  // 프로세스 시작후 흐른 시간
console.log(process.cpuUsage());//  cpu 사용량
process.exit();                 // 프로세스 종료 -- 이벤트루프 , REPL 종료
console.log(process.execPath);  //  노드 경로



