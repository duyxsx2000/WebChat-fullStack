import mongoose from "mongoose";
const { Schema } = mongoose;


const dataStatus = new Schema({
    name:String,
    img:String,
    like:Number,
    title:String,
    cmt:{type: [String],required: true,default: []},
    tusCmt:Boolean,
   
})


const dataUser = new Schema({
    name:String,
    account:String,
    sdt:String,
    password:String


})
const listFriend = new Schema({
    name:String,
    listFriend:{type: [String],required: true,default: []}
})
const dataMessenger = new Schema({
    name:[String],
    messenger:[{
        dateSend:Date,
        sender:String,
        content:String
    }],
    openmessenger:Boolean
})
const dataGroupChat = new Schema({
    name:String,
    messenger:String,
    dateChat:Date,
    img:String
})
const dataListRoomChat = new Schema({
    listMember:[String],
    nameRoom:String,
    content:[
        {
            name:String,
            messenger:String,
            dateChat:Date,
            img:String
        }
    ]
})

export const RoomChat = mongoose.model('roomchat',dataListRoomChat,'listRoomChat')
export const GrupChat = mongoose.model('groupChat',dataGroupChat,'dataGroupChat')

export const Friend  = mongoose.model('friend',listFriend,'dataListFriend')
export const User = mongoose.model("user",dataUser,'dataUser')
export const Status = mongoose.model('dataStatus',dataStatus,'dataStatus')
export const Messenger = mongoose.model("messenger",dataMessenger,'dataMessenger')

