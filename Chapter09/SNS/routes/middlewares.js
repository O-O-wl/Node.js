

/** =================================
            로그인 여부 확인
        로그인 중일시  다음미들웨어로
 ====================================*/
exports.isLoggedIn = (req,res,next)=>{

    // 로그인 여부
    if(req.isAuthenticated()) {
        next();

    }else{
        res.status(403).send('로그인 필요');
    }

};




/* =================================
           비로그인 여부 확인후
         다음 미들웨어로  넘긴다.
 ====================================*/
exports.isNotLoggedIn = (req,res,next)=>{
    if(!req.isAuthenticated()){
        next();

    }else{
        res.redirect('/')
    }

};