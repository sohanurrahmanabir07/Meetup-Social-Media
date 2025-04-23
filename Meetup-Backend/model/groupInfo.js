const mongoose=require('mongoose')

const GroupInfoSchema=new mongoose.Schema({
    adminID:String,
    groupName:String,
    members: {       
        type:Map,
        of: mongoose.Schema.Types.Mixed
    },
    time:String,

})

const GroupInfo=mongoose.model('GroupInfo',GroupInfoSchema)

module.exports=GroupInfo