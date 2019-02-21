const fs = require('fs');


// 1. 스트림 생성
const readStream = fs.createReadStream('./ReadMeByBuffer.txt',{ highWaterMark : 16  }); // highWaterMark -  몇 바이트씩 읽을 지

// 2. 스트림에서 읽어온 바이너리 데이터 저장할 배열 생성
const data = [];

// 3. 데이터 읽어오는 이벤트 발생시 chunk(읽어온 데이터) - > 배열 저장
readStream.on('data',(chunk) => {
    data.push(chunk);
    console.log('data',chunk,chunk.length);
});

// 4. 데이터 읽어오는 작업 종료
readStream.on('end',()=>{
    // 5. 바이너리 데이터를 문자열로
    console.log('end : ',Buffer.concat(data).toString()) ; //Buffer 는 global
});

// 에러 처리
readStream.on('error',()=>{
    console.log('error',error) ; //Buffer 는 global
});

/**
 *====================================================================
 *  data <Buffer ec a0 80 eb 8a 94 20 ec a1 b0 ea b8 88 ec 94 a9> 16
 *  data <Buffer 20 ec a1 b0 ea b8 88 ec 94 a9 20 eb 82 98 eb 88> 16
 *  data <Buffer a0 ec 84 9c 20 ec a0 84 eb 8b ac eb 90 a9 eb 8b> 16
 *  data <Buffer 88 eb 8b a4 2e 20 eb 82 98 eb 88 a0 ec a7 84 20> 16
 *  data <Buffer ec a1 b0 ea b0 81 ec 9d 84 20 63 68 75 6e 6b 20> 16
 *  data <Buffer eb 9d bc ea b3 a0 20 eb b6 80 eb a6 85 eb 8b 88> 16
 *  data <Buffer eb 8b a4 2e 0a> 5
 *  end 저는 조금씩 조금씩 나눠서 전달됩니다. 나눠진 조각을 chunk 라고 부릅니다.
 *  ==================================================================
 */