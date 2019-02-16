const fs = require('fs');

// (파일경로 , 권한) F - 존재여부 (found?) , R/W - 읽기/쓰기 가능 여부
fs.access('./folder',fs.constants.F_OK | fs.constants.R_OK | fs.constants.W_OK, (err) =>{
if(err) {
    if (err.code === 'ENOENT') { /* 폴더 존재하지않음*/
        console.log('디렉터리 존재하지않음');
        fs.mkdir('./folder', (err) => {
            if (err) {
                throw  err;
            }
            console.log('디렉터리 생성 성공');
            fs.open('./folder/file.js', 'w', (err, fd) => { /* '폴더/파일'오픈 없으면 option 'w' 파일 생성 - 'a'는 기존파일에 추가 */
                if (err) {
                    throw err;
                }
                console.log(`빈파일 만들기 성공 ${fd}`);
                fs.rename('./folder/file.js', './folder/newfile.js', (err) => {
                    if (err) {
                        throw err;
                    }
                    console.log('이름 변경 성공')
                });
            });
        });
    } else{if(err) throw err;}
}else {
    console.log("이미 폴더 존재")
}
}
);

