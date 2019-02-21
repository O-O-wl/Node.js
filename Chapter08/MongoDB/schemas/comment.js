

/**========================================================

                    @Note - 댓글 스키마

 ===========================================================*/


const mongoose = require('mongoose');
const { Schema } = mongoose;
const { Types:ObjectId } = Schema;

const commentSchema = Schema({

        // User 스키마의 Id 참조하는 자바스크립트 객체
    commenter : {
        type: ObjectId,
        required: true,
        ref: 'User'
    },
    comment:{
        type:String,
        required:true
    },
    createAt:{
        type:Date,
        default:Date.now()
    }


});

module.exports = mongoose.model('Comment',commentSchema);