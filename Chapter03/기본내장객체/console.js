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


// 객체 를 표현하기 좋은 콘솔
console.dir(obj,{colors:false,depth:1});  /** @Note: colors : 색상유무 , depth: 객체의 표현 블럭 */
console.dir(obj,{colors:true,depth:2});


for(let i = 0 ; i <100000 ; i++){
    continue;
}


/** 추적 경로를 찍어보고 싶으면 사용 */
function a(){
console.trace('메소드 실행 스택')
}function b(){
a()
}function c(){
b()
}
function d(){
c()
}

console.timeEnd('전체시간'); /* 시간 끝점  - 매개변수를 키로 사용 */

d()
// console.table - 여러개 한번에 추적가능
// console.error