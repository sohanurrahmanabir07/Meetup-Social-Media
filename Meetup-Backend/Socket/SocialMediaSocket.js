const { response } = require("express")
const { onlineUsers } = require("../GlobalVariable/variable")
const { Comments } = require("../model/comments")
const { Posts } = require("../model/post")
const { FriendRequst } = require("../model/freindRequest")
const { Notification } = require("../model/notification")

const SocialMediaSocket = (socket, io) => {

    socket.on('UpdateFeed', (data) => {

        const { post, friends } = data

        Object.keys(friends).map((id) => {
            if (onlineUsers[id]) {
                socket.to(onlineUsers[id]).emit('InsertNewPost', post)
            }
        })


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
                    const updatedLike = parseInt(result.likes) + 1
                    const update = await Posts.updateOne({ _id: post._id }, { likes: updatedLike })
                    const likeNotification = await Notification()

                }

            } else {

                const comment = new Comments(post)
                const save = await comment.save()
                if (save) {
                    const comment = result.comments
                    comment.push(save._id)
                    const update = await Posts.updateOne({ _id: result._id }, { comments: comment })


                }


            }
            if (type == 'comment' || type == 'like') {
                const result = await Posts.findById(id).populate('comments').populate('shares').populate('userID').lean()
                if (result) {

                    const friends = result.userID.friends
                    data.info = result
                    finalResponse = data

                    const notification = new Notification(data)
                    const LikeCommentNotify = await notification.save()
                    if (LikeCommentNotify) {
                        Object.keys(friends).map((id) => {
                            if (onlineUsers[id]!=socket.id) {
                                socket.to(onlineUsers[id]).emit('updateFeed', result)
                            }else{
                                socket.emit('updateFeed', result)
                            }
                        })
                    }







                }

            }

        } else {
            let rqstData = data.info
            if (type == 'friendRequest') {


                const result = new FriendRequst(rqstData)
                const save = await result.save()

                if (save) {
                    const updatedInfo = await FriendRequst.findById(save._id).populate('senderID').populate('receiverID').lean()
                    data.info=updatedInfo

                }

            } else {
                rqstData.pending = false
                const update = await FriendRequst.updateOne({ _id: rqstData._id }, { pending: false })
                data.info = rqstData


            }
            const notification = new Notification(data)
            const Request_accept = await notification.save()
            finalResponse = data





        }

        // For likes and comment, i will get updated posts in the info

        // for friend Request and accept i will get friend   Request  Schema  inside   the      info

        if (finalResponse) {


            if (onlineUsers[data.receiverID]) {
                socket.to(onlineUsers[data.receiverID]).emit('getNotificaion', finalResponse)
            }
        }





    })


}



module.exports = {
    SocialMediaSocket
}