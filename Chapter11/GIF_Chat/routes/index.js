
const express = require('express');

const router = express.Router();

const Room = require('../schemas/room');
const Chat = require('../schemas/chat');

router.get('/', async (req, res,next) => {

    const rooms = await Room.find();

    res.render('main',{rooms,title:"채팅방",error: req.flash("roomError")});
 //   res.send('hello');
    res.next();
});


/**==============================
        방 생성 라우터 미들웨어
          @GET  /room
===============================*/
router.get('/room',(req,res,next)=>{
    res.render('room',{title:"방목록"})
});

/**==============================
        방 생성 요청 라우터 미들웨어
            @POST  /room
 ===============================*/
router.post('/room',async (req,res,next)=>{
    const {title,max,password} = req.body;

    try{
        const room =  new Room({
            title,
            max,
            password,
            owner:req.session.color
        });

        const newRoom  = await room.save();
        console.log(newRoom);
        const io  = req.app.get('io');


        /*===================================
                 새로운 채팅방 생성이벤트
                  모든 소켓에 emit
         =====================================*/
        io.of('/room').emit('newRoom',newRoom);

        res.redirect(`/room/${newRoom._id}?password=${req.body.password}`)



    }catch (e) {
        console.error(e);
        next(e);
    }


});


/**==============================
        방 접속 라우터 미들웨어
        @POST  /room/roomId
 ===============================*/
router.get('/room/:id',async (req,res,next)=>{

    try {
        const room = await Room.findOne({_id: req.params.id});

        const io = req.app.get('io');

        const { rooms } = io.of('/chat').adapter;

        if (!room) {
            req.flash('roomError', '존재하지 않는 방입니다.');
            res.redirect('/');
        }
         if(room.password && room.password !== req.query.password){

            req.flash('roomError', '비밀번호가 일치하지 않습니다.');
            res.redirect('/');

        }


         if(rooms  && rooms[req.params.id] && room.max <= rooms[req.params.id].length ){
            res.flash('roomError','방 허용 인원 초과');
            res.redirect('/')
            }

         const chats = await Chat.find({room:room._id}).sort('createAt');
         return res.render('chat',{
             title:room.title,
             chats,
             user:req.session.color
         })


    }catch(e){
        console.error(e);
        next(e);
    }




});




/**==============================
        방 삭제 라우터 미들웨어
    @Delete  /room/roomId
 ===============================*/
router.delete('/room/:id', async (req,res,next)=>{

    try {
        const roomId = req.params.id;

        await Room.remove({_id: id});
        await Chat.remote({room: roomId});

        const io = req.app.get('io');

        res.send('ok');

        // 방목록에 접속해있는 소켓클라이언트에 전송
        setTimeout(() =>
        {
            io.of('/room').emit('removeRoom', roomId);
        },2000);

        res.redirect('/', res.flash())
    }catch(e){
        console.error(e);
        next(e);
    }



});
/**=============================
              채팅 추가
     @POST /room/roomId/chat
 ===============================*/
router.post('/room/:id/chat',async (req,res,next)=>{

    try {
        const roomId = req.params.id;

        const chat = new Chat({
            room: roomId,
            user: req.session.color,
            chat: req.body.chat
        });

        await chat.save();
        req.app.get('io').of('/chat').to(roomId).emit('chat',chat);
    }catch(e){
        console.error(e);
        next(e)
    }
});



module.exports = router;