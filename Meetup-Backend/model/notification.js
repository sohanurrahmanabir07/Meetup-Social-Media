const mongoose=require('mongoose')
const Schema=mongoose.Schema
const NotificationSchema=new mongoose.Schema({
    senderID:{type: Schema.Types.ObjectId,ref:'Users'},
    receiverID:{type: Schema.Types.ObjectId, ref:'Users'},
    type:{
        type:String,
        enum:['friendRequest','requestAccept','like','comment']
    },
    info:Schema.Types.Mixed,
    Timestamp:String
})

const Notification=mongoose.model('Notifications',NotificationSchema)

module.exports={
    Notification
}