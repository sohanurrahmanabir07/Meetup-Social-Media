const mongoose=require('mongoose')

const MessageSchema=new mongoose.Schema({
    users:String,
    message:String,
    time:String,
    senderID:String,
    receiverID:String,
    groupID:String,
    read:Boolean,
    delivered:Boolean

})

const Message=mongoose.model('Message',MessageSchema)
module.exports=Message