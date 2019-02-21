


/**========================================================

                @Note - 사용자 스키마

 ===========================================================*/


const mongoose = require('mongoose');

const { Schema } = mongoose;
const userSchema = new Schema({
    name:{
        type: String, //자바스크립트의 객체
        required: true, // NOT NULL
        unique : true,
    },
    age:{
    type: Number,
        required: true,
},
married:{
    type: Boolean,
        required: true,
},

comment: String, // 설정값이 Type 1개 뿐이라서

    createAt:{
    type:Date,
default: Date.now(), //기본값
}

});

module.exports = mongoose.model('User',userSchema);