const mongoose=require('mongoose')
const Schema=mongoose.Schema
const CommentSchema=new mongoose.Schema({
    userID:{type: Schema.Types.ObjectId,ref:'Users' },
    comment:String,
    postID:{type: Schema.Types.ObjectId,ref:'Posts' },
    likes:{
        type:Number,
        default:0
    },
    replies:[{type:Schema.Types.ObjectId,ref:'replies'}],

    TimeStamp:String

})

const Comments=mongoose.model('Comments',CommentSchema)

module.exports={
    Comments
}