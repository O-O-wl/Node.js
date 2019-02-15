const timeout = setTimeout(() => { /*   timeout - 객체명은 키워드라고 생각하면됨    */
    console.log('1.5초 후 실행');
},1500);

let count = 0;

const interval = setInterval(() => {
    count++;
    console.log(`${count}초 지남`); // 백틱으로 탬플릿 문자열

},1000);

setTimeout(() =>{clearInterval(interval);console.log('타이머 종료')},10100);


/**
 * @Note - set , clear 짝을 이룸
 * setImmediate 는 즉시 실행  -> 왜 사용할까? -> 이벤트 루프로 보내서 비동기 처리를 하기위해서*/