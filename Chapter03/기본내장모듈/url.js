const url = require('url');

const URL = url.URL;
const myURL = new URL('https://search.naver.com/search.naver?where=nexearch&query=히든프라이스&sm=top_lve&ie=utf8');


console.log('new URL():',myURL);

// URL 조립
console.log('url.format():',url.format(myURL));


console.log('===============================');

const parsedURL = url.parse('https://search.naver.com/search.naver?where=nexearch&query=히든프라이스&sm=top_lve&ie=utf8');

//  URL 쪼개기
console.log('url.parse():',parsedURL);

/** @URL.SearchParams.*/
/*
* append(key)    : 매개변수 추가
* get(key)       : 매개변수 값 가져오기
* getAll(key)    : 해당 키의 값 여러개 가져오기 ex) id=3&id=9&id=1
* has(key)       : 키의 유무
* keys()         : 모든 키
* values()       : 모든 값
* set(key,val)   : 기존의 키에 값 오버라이드
* delete(key)    : 해당 키 제거
* toString()     : 조작한 객체를 다시 문자열로 변환
* */

/**  @URL_구조
┌────────────────────────────────────────────────────────────────────────────────────────────────┐
│                                              href                                              │
├──────────┬──┬─────────────────────┬────────────────────────┬───────────────────────────┬───────┤
│ protocol │  │        auth         │          host          │           path            │ hash  │
│          │  │                     ├─────────────────┬──────┼──────────┬────────────────┤       │
│          │  │                     │    hostname     │ port │ pathname │     search     │       │
│          │  │                     │                 │      │          ├─┬──────────────┤       │
│          │  │                     │                 │      │          │ │    query     │       │*/
/*
"  https:   //    user   :   pass   @ sub.example.com : 8080   /p/a/t/h  ?  query=string   #hash "  */
/**
│          │  │          │          │    hostname     │ port │          │                │       │
│          │  │          │          ├─────────────────┴──────┤          │                │       │
│ protocol │  │ username │ password │          host          │          │                │       │
├──────────┴──┼──────────┴──────────┼────────────────────────┤          │                │       │
│   origin    │                     │         origin         │ pathname │     search     │ hash  │
├─────────────┴─────────────────────┴────────────────────────┴──────────┴────────────────┴───────┤
│                                              href                                              │
└────────────────────────────────────────────────────────────────────────────────────────────────┘*/