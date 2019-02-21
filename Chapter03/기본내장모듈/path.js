const path  = require('path');

console.log(path.sep);          // 디렉터리 구분자
console.log(path.delimiter);    // 환경변수 구분자  - node,npm 같은 건 경로를 저장하는 환경변수
console.log(path.dirname(__filename));  // 디렉터리 정보 가져오기
console.log(path.extname(__filename));  // 확장자 정보가져오기
console.log(path.basename(__filename)); // 파일이름 가져오기
console.log(path.parse(__filename));    // 파일 경로를 쪼개는 메소드
console.log(path.format({ root: '/',    // 쪼개진 파일 포맷 합치는 메소드
    dir: '/Users/ldcpaul/WebstormProjects/Node_js/Chapter03/기본내장모듈',
    base: 'path.js',
    ext: '.js',
    name: 'path' }
));


// 경로 정규화
console.log(path.normalize('/Users/ldcpaul/WebstormProjects/\Node_js/Chapter03/\기본내장모듈'));

// 상대경로 절대경로 여부
console.log(path.isAbsolute('/Users/ldcpaul/WebstormProjects/Node_js/Chapter03/기본내장모듈'));

// A -> B 로가는 상대경로
console.log(path.relative('/Users/ldcpaul/WebstormProjects/Node_js/Chapter03/기본내장모듈','/Users'));

// 여러 PATH 를 합쳐서 계산  (.)은 현재디렉터리를 의미함 - 절대경로도 상대경로로 취급
console.log(path.join(__dirname,'..','..','/Chapter03','.','기본내장객체','timer.js'));

// 매개변수의 '/기본내장객체' 절대경로로 취급 
console.log(path.resolve(__dirname,'..','..','/Chapter03','.','기본내장객체','timer.js'));