const { response } = require("express")
const { onlineUsers } = require("../GlobalVariable/variable")
const { Comments } = require("../model/comments")
const { Posts } = require("../model/post")
const { FriendRequst } = require("../model/freindRequest")
const { Notification } = require("../model/notification")
const Users = require("../model/user")

const SocialMediaSocket = (socket, io) => {

    socket.on('UpdateFeed', (data) => {


        const { post, friends } = data

        Object.keys(friends).map((id) => {
            if (onlineUsers[id]) {
                socket.to(onlineUsers[id]).emit('InsertNewPost', post)
            }
        })

        socket.emit('InsertNewPost', post)


    })

    socket.on('incoming_notification', async (data) => {
        const type = data.type
        let finalResponse = null

        if (type == 'like' || type == 'comment') {

            const post = data.info
            let id = post._id

            if (type == 'comment') {
                id = post.postID
            }
            const result = await Posts.findById(id).lean()


            if (type == 'like') {

                if (result) {
                    let likesSet = new Set(await result.likes.map(id => id.toString()))
                    const senderIdStr = data.senderID.toString()


                    if (likesSet.has(senderIdStr)) {
                        likesSet.delete(senderIdStr)
                        data.type = 'dislike'


                    } else {
                        likesSet.add(senderIdStr)


                    }



                    // Convert back to ObjectId before saving
                    const ObjectId = require('mongoose').Types.ObjectId
                    const likesArr = Array.from(likesSet).map(id => new ObjectId(id))

                    const update = await Posts.updateOne({ _id: post._id }, { likes: likesArr })

                }

            }
            else {

                const comment = new Comments(post)
                const save = await comment.save()
                if (save) {
                    const comment = [save._id, ...result.comments]

                    const update = await Posts.updateOne({ _id: result._id }, { comments: comment })


                }


            }
            if (type == 'comment' || type == 'like') {
                const result = await Posts.findById(id).populate({
                    path: 'comments',
                    options: { sort: { 'TimeStamp': -1 } },
                    populate: {
                        path: 'userID',
                        model: 'Users'
                    }
                }).populate('shares').populate('userID').lean()
                if (result) {

                    const friends = result.userID.friends
                    data.info = result


                    const notification = new Notification(data)
                    const LikeCommentNotify = await notification.save()
                    const newResult = await Notification.findById(LikeCommentNotify._id).populate('senderID').populate('receiverID')
                    finalResponse = newResult
                    if (newResult) {


                        Object.keys(friends).map((id) => {
                            if (onlineUsers[id]) {

                                socket.to(onlineUsers[id]).emit('updateFeed', result)
                            }

                        })
                        if (onlineUsers[result.userID._id]) {
                            socket.to(onlineUsers[result.userID._id]).emit('updateFeed', result)

                        }
                        socket.emit('updateFeed', result)

                    }


                }

            }

        }
        else {
            let rqstData = data.info

            if (type == 'friendRequest') {


                const result = new FriendRequst(rqstData)
                const save = await result.save()

                if (save) {
                    const updatedInfo = await FriendRequst.findById(save._id).populate('senderID').populate('receiverID').lean()
                    data.info = updatedInfo

                    const newRqstListSender = await FriendRequst.find({ senderID: rqstData.senderID, pending: true }).populate('senderID', { 'password': 0, 'chatHistory': 0, 'friends': 0 }).populate('receiverID', { 'password': 0, 'chatHistory': 0, 'friends': 0 }).sort({ Timestamp: -1 }).lean()

                    const newPendingListReceiver = await FriendRequst.find({ receiverID: rqstData.receiverID, pending: true }).populate('senderID', { 'password': 0, 'chatHistory': 0, 'friends': 0 }).populate('receiverID', { 'password': 0, 'chatHistory': 0, 'friends': 0 }).sort({ Timestamp: -1 }).lean()

                    if (onlineUsers[rqstData.receiverID]) {
                        socket.to(onlineUsers[rqstData.receiverID]).emit('updateRqstPendingList', ({
                            type: 'pendingList',
                            data: newPendingListReceiver
                        }))
                    }


                    socket.emit('updateRqstPendingList', ({
                        type: 'rqstList',
                        data: newRqstListSender
                    }))

                }





            } else if (type == 'cancelRequest' || type == 'cancelPending') {
                let findAndDelete = await FriendRequst.deleteOne({ _id: rqstData._id })

                let Sender = null
                let Receiver = null
                if (findAndDelete) {
                    Sender = await FriendRequst.find({ senderID: rqstData.senderID, pending: true }).populate('senderID', { 'password': 0, 'chatHistory': 0, 'friends': 0 }).populate('receiverID', { 'password': 0, 'chatHistory': 0, 'friends': 0 }).sort({ Timestamp: -1 }).lean()

                    Receiver = await FriendRequst.find({ receiverID: rqstData.receiverID, pending: true }).populate('senderID', { 'password': 0, 'chatHistory': 0, 'friends': 0 }).populate('receiverID', { 'password': 0, 'chatHistory': 0, 'friends': 0 }).sort({ Timestamp: -1 }).lean()

                }

                if (type == 'cancelRequest') {
                    if (onlineUsers[rqstData.receiverID]) {
                        socket.to(onlineUsers[rqstData.receiverID]).emit('updateRqstPendingList', ({
                            type: 'pendingList',
                            data: Receiver
                        }))


                    }
                    socket.emit('updateRqstPendingList', ({
                        type: 'rqstList',
                        data: Sender
                    }))
                } else {
                    if (onlineUsers[rqstData.senderID]) {
                        socket.to(onlineUsers[rqstData.senderID]).emit('updateRqstPendingList', ({
                            type: 'rqstList',
                            data: Sender
                        }))
                    }
                    socket.emit('updateRqstPendingList', ({
                        type: 'pendingList',
                        data: Receiver
                    }))

                }




                return

            }

            else {
                rqstData.pending = false

                const update = await FriendRequst.updateOne({ _id: rqstData._id }, { pending: false })
                if (update) {
                    const sender = await Users.findById(rqstData.senderID).lean()
                    const receiver = await Users.findById(rqstData.receiverID).lean()

                    const friendsofSender = sender.friends
                    let SenderFriendList = sender.friendList
                    const friendsofReceiver = receiver.friends
                    let ReceiverFriendList = receiver.friendList

                    if (!(friendsofSender[rqstData.receiverID._id])) {
                        friendsofSender[rqstData.receiverID._id] = "newFriend"

                        SenderFriendList.push(rqstData.receiverID._id)

                    }
                    if (!(friendsofReceiver[rqstData.senderID._id])) {
                        friendsofReceiver[rqstData.senderID._id] = "newFriend"

                        ReceiverFriendList.push(rqstData.senderID._id)
                    }



                    const senderUpdate = await Users.updateOne({ _id: rqstData.senderID }, { friends: friendsofSender, friendList: SenderFriendList })
                    const receiverUpdate = await Users.updateOne({ _id: rqstData.receiverID }, { friends: friendsofReceiver, friendList: ReceiverFriendList })

                    // find two profile and then send------

                    const senderUpdated = (await Users.findById(rqstData.senderID).populate('friendList').lean())
                    const receiverUpdated = (await Users.findById(rqstData.receiverID).populate('friendList').lean())

                    if (senderUpdate && receiverUpdate) {
                        if (onlineUsers[rqstData.senderID._id]) {
                            socket.to(onlineUsers[rqstData.senderID._id]).emit('updateMyProfile', senderUpdated)
                        }
                        socket.emit('updateMyProfile', receiverUpdated)
                    }
                }
                data.info = rqstData


            }

            const notification = new Notification(data)
            const Request_accept = await notification.save()

            finalResponse = Request_accept


        }

        // For likes and comment, i will get updated posts in the info

        // for friend Request and accept i will get friend   Request  Schema  inside   the      info

        if (finalResponse) {

            console.log('Notification', finalResponse)

            if (onlineUsers[data.receiverID] && data.type != 'dislike') {
                socket.to(onlineUsers[data.receiverID]).emit('getNotification', finalResponse)

            }
            else {
                console.log('recieverID', data.receiverID, 'Not Online')
            }
        }





    })



    socket.on('deletePost', async (data) => {
        try {
            const post = data.post
            const deletPost = await Posts.deleteOne({ _id: post._id })
            if (deletPost) {
                socket.emit('deleteApost', { id: post._id })

                const friends = (await Users.findById(post.userID._id).select('friendList')).friendList

                friends.map((item) => {
                    if (onlineUsers[item.toString()]) {
                        socket.to(onlineUsers[item.toString()]).emit('deleteApost', { id: post._id })
                    }
                })

            }
            // const friends=(await Users.findById(post.userID._id).select('friendList')).friendList

            // friends.map((item)=>{
            //    if(onlineUsers[item.toString()]){
            //     socket.to(onlineUsers[item.toString()]).emit('deleteApost',{id:post._id})
            //    }
            // })



        } catch (error) {

        }
    })

    socket.on('unfriend', async (data) => {
        const { friend, me } = data


        const myID = await Users.findById(me._id).lean()
        const friendID = await Users.findById(friend._id).lean()

        const myfriends = myID.friends
        const myfriendList = myID.friendList
       
        const friend_friends = friendID.friends
        const friend_friendList = friendID.friendList

        console.log('friend info',friendID)


        if (friend_friends[myID._id]) {
            delete friend_friends[myID._id]
            const result_friend=friend_friendList.filter((item) => item.toString() != myID._id)
            const updatedUser = await Users.updateOne({ _id: friendID._id }, { friends:friend_friends,friendList:result_friend})
            const updatedFriend = (await Users.findById(friend._id).populate('freindList').lean())
            if(onlineUsers[friendID._id]){
                socket.to(onlineUsers[friendID._id]).emeit('updateMyProfile',updatedFriend)
            }
        }
        if (myfriends[friendID._id]) {
            delete myfriends[friendID._id]
            const result_my=myfriendList.filter((item) => item.toString() != friendID._id)
            const updatedUser = await Users.updateOne({ _id: myID._id }, { friends:myfriends,friendList:result_my})
            const udpatedMyID = (await Users.findById(me._id).populate('freindList').lean())

            socket.emit('updateMyProfile',udpatedMyID)
        }  

    })


}



module.exports = {
    SocialMediaSocket
}