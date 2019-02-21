const EventEmitter = require('events'); // 이벤트를 발생시킬 수 있는 객체  -- 커스텀으로 이벤트를 만들수있는 모듈

const
    myEvent = new EventEmitter();


/* ================================
           on == addListener
   ===============================*/

myEvent.addListener('방문',()=>{
    console.log('방문해주셔서 감사합니다.');

});

/**======== 여러개 등록 가능 ============*/
myEvent.on('종료',()=>{
    console.log('안녕히가세요');
});



/*=============================*/
  myEvent.on('종료',()=>{
   console.log('제발 좀 가세요 - 하나만 삭제불가능');
  });

// 여러개의 이벤트리스너중에 특정하나만 삭제하고 싶으면 변수에 넣고 , 삭제

//위의 코드를 아래의 코드로 변환

const rm = () =>{
    console.log('제발 좀 가세요 - 하나만 삭제가능');
};

myEvent.on('종료',rm);
/*=================================*/
/**===================================*/
/* 한번만 실행되는 리스너 */
myEvent.once('특별이벤트',()=>{
    console.log('한 번만 실행됩니다.')
});



myEvent.emit('방문');  // '방문' 이벤트 발생

myEvent.emit('특별이벤트');
myEvent.emit('특별이벤트');


myEvent.on('계속',()=>{
   console.log('계속 리스닝');
});
myEvent.emit('계속');

console.log("================================================================");

myEvent.emit('종료');  // '종료' 이벤트 발생
console.log(`'종료'에 달려있는 이벤트 리스너의 갯수 : ${myEvent.listenerCount('종료')}`);

myEvent.off('종료',rm);
//myEvent.removeListener('종료',rm);    0ff === removeListener


console.log("======================== 이벤트 제거 ==============================");
myEvent.emit('종료');
console.log(`'종료'에 달려있는 이벤트 리스너의 갯수 : ${myEvent.listenerCount('종료')}`);

