
const Message = require('../model/message')
const GroupInfo = require('../model/groupInfo')
const Users = require('../model/user')
const { onlineUsers, sizeOfonlineUsers, setMainUser, MainUser } = require('../GlobalVariable/variable')
const SocketEvents = (socket, io) => {





    // ____________________custom function ________________________
    const ChatUser = async (userID) => {
        let ChatUsers = []
        const result = await Users.findById(userID).lean()

        if (result) {
            for (const id in result.chatHistory) {

                const find = (await Users.findById(id).lean()) || (await GroupInfo.findById(id).lean())
                if (find) {

                    find["lastMessage"] = result.chatHistory[id]
                    ChatUsers = [...ChatUsers, find]

                }
            }


        }
        return ChatUsers
    }

    const findDBid = () => {
        const id = Object.keys(onlineUsers).find((key) => onlineUsers[key] == socket.id)
        return id
    }

    const friendsInformation = async (userID) => {

        const result = await Users.findById(userID).lean()
        let friendsInfo = {}
        for (const id in result.friends) {
            const user = await Users.findById(id).lean()
            if (user) {
                if (!friendsInfo[id]) {
                    friendsInfo[id] = user


                }
            }
        }

        return friendsInfo

    }
    const chatListFormate = async (saved,id) => {
       
        const chatPartner = await Users.findById(id)

        
        const data = {

                _id:id,
                name: chatPartner.name,
                age: chatPartner.age,
                address: chatPartner.address,
                email: chatPartner.email,
                phone: chatPartner.phone,
                lastMessage: saved.message,
                lastTime: saved.time

           
        }
  
        return data
    }

    // __________________end of custom function___________________________








    console.log(`User has connected id:${socket.id}`)
    socket.on('join-user', async (info) => {

        if (info.userID) {
            onlineUsers[info.userID] = socket.id
            console.log(`${info.userID} has Joined`)
            console.log('current onlineUser', onlineUsers)


        }
        io.emit('getOnlineUsers', onlineUsers)

        const ChatUsers = await ChatUser(info.userID)
        const friendsInfo = await friendsInformation(info.userID)


        // socket.emit('ChatList', ChatUsers)

        socket.emit('friendsInfo', friendsInfo)


    })

    // ____________________Sending ChatList___________________________


    socket.on('join-group', async (data,
        
        
        // callback
    
) => {


        socket.join(data.groupID)
        // const result =await socket.in(`${data.groupID}`).fetchSockets()
        // console.log('Group Member',result)
        // console.log('user',data.userInfo.name,'Has Joined')
        // io.to(data.groupID).emit('Welcome_message', { message: `User ${data.userName} has joined` })

        console.log(`Joined ${data.groupID} Group by ${data.userInfo.name}`)
        // callback({
        //     status:201,
        //     message:`Join the Group ${data.groupID} Successfully`
        // })
    })



    // ____________One to One message_______________


    socket.on('OneToOne', async (MsgData) => {

        
        const selected=MsgData.receiver
        const send = new Message(MsgData.msg)

        try {

            const saved = await send.save()

            if (saved) {

                const id = findDBid()
                if (saved.receiverID) {

                    if (saved.senderID == id) {

                        const partnerData=await chatListFormate(saved,saved.senderID)
                        const MyData= await chatListFormate(saved,saved.receiverID)

                        console.log('partnerData',partnerData)
                        console.log('myData',MyData)
                        socket.emit('ChatList', MyData)
                        if (onlineUsers[saved.receiverID]){
                            socket.to(onlineUsers[saved.receiverID]).emit('ChatList',partnerData)
                        }


                    } else {
                        
                        const partnerData=chatListFormate(saved,saved.receiverID)
                        const MyData=chatListFormate(saved,saved.senderID)
                        socket.emit('ChatList', partnerData)
                        if (onlineUsers[saved.receiverID]){
                            socket.to(onlineUsers[saved.receiverID]).emit('ChatList',MyData)
                        }
                    }

                } else {
                 

                   selected.lastMessage=saved.message
                   selected.lastTime=saved.time
                    console.log('group message',selected)
                   socket.to(selected._id).emit('ChatList',selected)
                }



                // const sender = await Users.findById(MsgData.senderID).lean()
                // const receiver = await Users.findById(MsgData.receiverID).lean()



                // const chatHistory_sender = sender.chatHistory
                // const chatHistory_receiver = receiver.chatHistory
                // if (!chatHistory_sender[MsgData.receiverID]) {
                //     chatHistory_sender[MsgData.receiverID] = MsgData.message
                // } else {
                //     chatHistory_sender[MsgData.receiverID] = MsgData.message
                // }

                // if (!chatHistory_receiver[MsgData.senderID]) {
                //     chatHistory_receiver[MsgData.senderID] = MsgData.message
                // } else {
                //     chatHistory_receiver[MsgData.senderID] = MsgData.message
                // }



                // const update_sender = await Users.updateOne({ _id: MsgData.senderID }, { $set: { chatHistory: chatHistory_sender } })
                // const update_receiver = await Users.updateOne({ _id: MsgData.receiverID }, { $set: { chatHistory: chatHistory_receiver } })


                // const user1=await ChatUser(MsgData.senderID)
                // const user2=await ChatUser(MsgData.receiverID)

                // const id=findDBid()

                // if(id==MsgData.senderID){
                //     socket.emit('ChatList', user1)
                //     if(MsgData.groupID==null && onlineUsers[MsgData.receiverID]){
                //         socket.to(onlineUsers[MsgData.receiverID]).emit('ChatList', user2)
                //     }
                // }







                if (saved.groupID == null) {
                    if (onlineUsers[MsgData.receiverID]) {

                        socket.to(onlineUsers[MsgData.receiverID]).emit('sendmessage', send)
                    }




                } else {
                    socket.to(saved.groupID).emit('sendmessage', send)
                }

                socket.emit('sendmessage', send)


            }
        } catch (error) {
            console.log(error.message)
        }
    });



    const SendChatList = async (members) => {


        for (const key in members) {
            if (onlineUsers.hasOwnProperty(key)) {


                const result = await Users.find({ _id: key })



                socket.to(onlineUsers[key]).emit('SendingUpdatedChatlist', result.chatHistory)

            }
        }

    }

    socket.on('do', () => {
        const result = Object.keys(onlineUsers).find((key) => {


            if (onlineUsers[key] == socket.id) {
                console.log('true', socket.id, onlineUsers[key])
                delete onlineUsers[key]
            }

        })



    })


    // socket.on('CreatGroup',)

    // setInterval(() => {
    //     io.emit('onlineUsers',onlinUsers)
    // },5000);

    // socket.on('disconnect',()=>{
    //     console.log(`A user ${socket.id} disconnected`)

    // })

    socket.on('CreateGroup', async (CombinedData) => {
        const data=CombinedData[0]
        const Groupmessage=CombinedData[1]
        const groupInfo = new GroupInfo(data)
     

        try {
            const create = await groupInfo.save()
            const grouInfo = create.toObject()

            if (create) {

                const data={
                    _id:grouInfo._id,
                    adminID:grouInfo.adminID,
                    groupName:grouInfo.groupName,
                    members:grouInfo.members,
                    lastMessage:Groupmessage.message
                }


                for (const [key, value] of groupInfo.members.entries()) {

                     if(key!=grouInfo.adminID){
                        if(onlineUsers[key]){
                            socket.to(onlineUsers[key]).emit('ChatList',data)
                        }
                     }else{
                        socket.emit('ChatList',data)
                     }

                    // const user = await Users.findById(key).lean()

                    // if (user) {
                    //     ChatHistory = user.chatHistory
                    //     if (!ChatHistory[groupInfo._id])
                    //         ChatHistory[groupInfo._id] = '1'
                    // }

                    // const update = await Users.updateOne({ _id: key }, { $set: { chatHistory: ChatHistory } })

                    // if (update) {
                    //     const chat = await ChatUser(user._id)
                    //     console.log('Chat List', chat)
                    //     if (onlineUsers[user._id] && (user._id != groupInfo.adminID)) {

                    //         socket.to(onlineUsers[user._id]).emit('ChatList', chat)

                    //     }
                        // if (user._id == groupInfo.adminID) {
                        //     socket.emit('ChatList', chat)
                        // }
                    
                }
                Groupmessage.groupID=grouInfo._id
                const newMessage=new Message(Groupmessage)

                const saveMessage=await newMessage.save()
                console.log('message',saveMessage)


            }
        } catch (error) {
            console.log(error.message)
        }
    })







    // }

    socket.on('disconnect', () => {
        console.log(`User disconnected: ${socket.id}`);

        Object.keys(onlineUsers).find((key) => {
            if (onlineUsers[key] == socket.id) {
                delete onlineUsers[key]
            }
        })

        io.emit('getOnlineUsers', onlineUsers)
    });






}

module.exports = SocketEvents;