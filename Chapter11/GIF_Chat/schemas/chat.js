const mongoose  = require('mongoose');
const { Schema } =mongoose;
const { Types:{ ObjectId } } = mongoose.Schema;


const chatSchema  = new Schema({

    room : {
        type:ObjectId,
        required:true,
        ref:'Room'
    },
    user:{
        type:String,
        required:true
    },
    chat:{
        type:String,

    },
    gif:{
        type:String
    },
    createAt:{
        type:Date,
        default: Date.now,
    }
});

module.exports = mongoose.model('Chat',chatSchema);
