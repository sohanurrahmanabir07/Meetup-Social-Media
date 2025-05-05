const mongoose=require('mongoose')
const Schema=mongoose.Schema
const UsersSchema=new mongoose.Schema({
    name:String,
    address:String,
    email:String,
    friends:{
        type:Map,
        of:String
    },
    friendList:[{type:Schema.Types.ObjectId,ref:'Users'}],
    phone:{
        type:String,
        unique:true,
        minLength:[6,'Number is too short'],
        maxLength:[11,'Number is too long']
    },
    bio:{
        type:String
    },
    worksAt:{type:String},
    status:{type:String,enum:['single','married','in a relationship','divorced']},
    dOb:{type:Date},
    cp:{type:String},
    pp:{type:String},
    password:{
        type:String,
        minLength:[6,'Password Too short'],

    },
    chatHistory:{
        type:Map,
        of:String
    }

})

const Users=mongoose.model('Users',UsersSchema)
module.exports=Users