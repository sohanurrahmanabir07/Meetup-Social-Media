const mongoose=require('mongoose')

const Schema=mongoose.Schema

const FriendRequestSchema=new Schema({
    senderID:{type: Schema.Types.ObjectId,ref:'Users'},
    receiverID:{type: Schema.Types.ObjectId,ref:'Users'},
    pending:Boolean,
    Timestamp:String
})

const FriendRequst=mongoose.model('FriendRequests',FriendRequestSchema)

module.exports={
    FriendRequst
}