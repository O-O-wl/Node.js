const string = 'abc';
const number =1;
const boolean = true;

const obj = {
    outside:{
        inside:{
            key : 'value'
        },
    },
};

console.time('전체시간'); /*  시간 시작점 */

console.log('평범한 로그');
console.log(string,number,boolean);
console.error('에러 메시지는 console.error 에 담아요');



console.dir(obj,{color:true,depth:2});

for(let i = 0 ; i <100000 ; i++){
    continue;
}

console.timeEnd('전체시간'); /* 시간 끝점  - 매개변수를 키로 사용 */

// console.table - 여러개 한번에 추적가능
// console.error