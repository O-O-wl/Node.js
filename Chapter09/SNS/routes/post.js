const express = require('express');
const multer = require('multer');
const path = require('path');
const { Post,Hashtag } = require('../models');
const router = express.Router();

// 업로드 객체 생성({옵션})
const upload = multer({

    // 디스크 저장 위치옵션 - 서버디스크 , 구글디스크등 선택
    storage : multer.diskStorage({

        //저장할 디렉터리
        destination(req,file,cb){

            cb(null ,'uploads/') //cb  - (에러,결과값) - callback

        },

        // 생성할 파일명
        filename(req,file,cb){
            const ext = path.extname(file.originalname);  // 확장자 설정

            cb(null,path.basename(file.originalname,ext)// 확장자 제외 파일명
                +new Date().valueOf() // 현재 시간 - 파일명 중복 방어
                + ext   // 확장자
            )
        },
    }) ,

    limit:{filesize:5 * 1024 * 1024 } // 파일 크기 제한 5MB
});

/** =============================
          @upload
  @single   - 이미지 한개
  @array    - 이미지 여러개 ( 단일필드 )
  @field    - 이미지 여러개 ( 여러필드 )
  @none     - 이미지 X
 ================================*/


/* =======================
         이미지업로드
       post/img
 =========================*/
router.post('/img',upload.single('img'),(req,res)=>{
    console.log(req.body,req.file) ;// multer 로 업로드한 파일 - req.file  에  저장됨
    res.json({url:`/img/${req.file.filename}`})

}); //upload.single('input 태그의 id ')



/* ======================
        게시글 업로드
 =========================*/
const upload2 = multer();
router.post('/',upload2.none(), async (req,res,next)=>{
    try{

      const post = await Post.create({
            content:req.body.content,
            img: req.body.url,
            userId:req.user.id // 릴레이션
        });

      // 정규표현식을 이용한 해쉬태그들을 배열로 반환
     const hashTags = req.body.content.match(/#[^\s]*/g); //정규표현식 /#(공백아닌 문자열로 시작하는지) global로 탐

        /**========================================
                            @match
            대응되는 문자열을 찾는 RegExp 메소드입니다.
                정보를 가지고 있는 배열을 반환합니다.
            대응되는 문자열을 찾지 못했다면 null을 반환합니다.
         ===========================================*/
      if(hashTags){

          const result = await Promise.all(hashTags.map(tag=>

              Hashtag.findOrCreate({ //찾아보고 없으면 create
                  where:{
                      //slice(1~) - #표시 삭제
                      title:tag.slice(1).toLowerCase()
                  }
              }) // findOrCreate end
         )); // Promise End


    //      console.log(result);
          //result를 기반으로 PostHashtag 테이블 로우 생성
          await post.addHashtags(result.map(r => r[0]));

          /**================================
                         @관계
            A.getB      : 관계있는 로우 조회
            A.addB      : 관계 생성
            A.setB      : 관계 수정
            A.removeB   : 관계 제거
           ===============================*/

      } // if(hashTags) end
        res.redirect('/');

    }catch(e){
        console.error(e);
        next(e);
    }
});


module.exports = router;