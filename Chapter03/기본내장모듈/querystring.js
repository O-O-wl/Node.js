const querystring = require('querystring');
const url = require('url');

// url 속성 쪼개는 메소드
const parsedURL = url.parse('https://search.naver.com/search.naver?sm=top_hty&fbm=1&ie=utf8&query=깃허브');

// parse 된 url 의 query 부분을 쪼개는 메소드
const query = querystring.parse(parsedURL.query);


console.log(query);

// 쪼개진 쿼리스트링 을 다시 합쳐서 string 으로 반환하는 메소드
console.log(querystring.stringify(query));