/**====================================================
 *
 ######################## 미들웨어 ########################

                @morgan - logger
        요청 url /   http 요청메소드 / 상태응답코드
                   기록하는 미들웨어
   요청과 응답에 관한 내용 로깅을 하기에 응답이 나가야 로그찍힘


                   @express.json
                @express.urlencoded
                    bodyparser


                   @cookie-parser
                쿠키를 파싱해주는 미들웨어

           @cookieParser('secret code')
     클라이언트에 쿠키를 저장할 때 , 서버에서 발행한 쿠키인지 확인



                      @express.static
        정적 파일(public 디렉터리)에 있는 파일 읽어오는 미들웨어



                    @express-session(
                        @SessionOption
                        {
                         resave: 요청이 들어올 때마다 재저장을 할 것인지,
                         saveUninitialized: 처음에 빈 세션객체라도 메모리에 올릴 것 인지,
                         secret:'secret code',
                         cookie:{
                            httpOnly:true,
                            secure: https 를 사용할 것인
                            }
                         });

 
                    @connect-flash
                일회성 메세지를 표시해주는 미들웨어



 =======================================================*/

