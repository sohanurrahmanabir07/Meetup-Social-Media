const mongoose=require('mongoose')
const Schema=mongoose.Schema
const NotificationSchema=new mongoose.Schema({
    senderID:{type: Schema.Types.ObjectId,ref:'Users'},
    receiverID:{type: Schema.Types.ObjectId, ref:'Users'},
    type:{
        type:String,
        enum:['friendRequest','requestAccept','like','comment','dislike','cancelRequest','cancelPending']
    },
    info:Schema.Types.Mixed,
    TimeStamp:String,
    read:{
        type:Boolean,
        default:false
    }
})

const Notification=mongoose.model('Notifications',NotificationSchema)

module.exports={
    Notification
}