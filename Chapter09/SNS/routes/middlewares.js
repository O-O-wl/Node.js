exports.isLogedIn = (req,res,next)=>{

    // 로그인 여부
    if(req.isAuthenticated()) {
        next();

    }else{
        res.status(403).send('로그인 필요');
    }

};
exports.isNotLogedIn = (req,res,next)=>{
    if(!req.isAuthenticated()){

    }

};