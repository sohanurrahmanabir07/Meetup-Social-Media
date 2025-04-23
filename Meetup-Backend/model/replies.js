const mongoose=require('mongoose')
const Schema=mongoose.Schema
const RepliesSchema=new mongoose.Schema({
    userID:{type: Schema.Types.ObjectId,ref:'Users' },
    commentID:{type:Schema.Types.ObjectId,ref:'Comments'},
    postID:{type: Schema.Types.ObjectId,ref:'Posts' },
    replies:String,
    likes:Number,

    Timestamp:String

})

const Replies=mongoose.model('Replies',RepliesSchema)

module.exports={
    Replies
}