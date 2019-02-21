const fs = require('fs');

const writeStream = fs.createWriteStream('./WriteMeByStream.txt');

writeStream.on('finish',() => {
    console.log('파일쓰기 완료')
});
writeStream.write('이 글을 씁니다 \n');
writeStream.write('한 번 더 글을 씁니다 \n');
writeStream.write('다시 한 번 더 글을 씁니다 \n');
writeStream.end();


