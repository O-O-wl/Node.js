const os = require('os');

console.log(os.arch());
console.log(os.uptime()); // 운영체제 실행후 흐른 시간
console.log(os.release()); //  OS버전
console.log(os.homedir()); //  홈디렉터리
console.log(os.freemem()); // 현재 사용가능한 메모리
console.log(os.totalmem());   // 전체 메모리
console.log(os.cpus());    //cpu 정보