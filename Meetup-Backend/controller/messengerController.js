const GroupInfo = require('../model/groupInfo')
const Message = require('../model/message')
const Users = require('../model/user')
// const {io}=require('../index')
const { onlineUsers } = require('../GlobalVariable/variable')
const show = (req, res) => {
    res.send('<h1>Got here</h1>')
}

const SendInfo = (socket, onlineUsers, io) => {
    console.log(`User has connected id:${socket.id}`)
}


const createGroup = async (req, res) => {
    const { adminID, members, groupName } = req.body
    const form = new GroupInfo({ adminID, groupName, members })



    try {

        const GroupForm = await form.save()

        if (GroupForm) {
            for (let id in members) {

                if (onlineUsers[id]) {

                    const result = await Users.findById(id)

                    if (!result.chatHistory[form_id]) {
                        result.chatHistory.set(form._id, "GroupChat")
                        const update = await result.save()
                        if (update) {
                            global.io.to(onlineUsers[id]).emit('sendAlert', update.chatHistory)

                        }

                    }



                } else {
                    const result = await Users.findById(id)

                    if (result.chatHistory) {


                        if (!result.chatHistory[form_id]) {
                            result.chatHistory.set(form._id, "GroupChat")
                            const update = await result.save()
                        }
                    }
                }

            }
            res.send({
                message: "Group Created"
            })

        }



    } catch (error) {

        res.send(error.message)

    }



}

const loadMessage = async (req, res) => {

    const { type } = req.query

    const { id, userID } = req.body


    try {

        let findMessage = null
        if (type == 'groupChat') {
            findMessage = await Message.find({ groupID: id })
        } else {
            findMessage = await Message.find({ $or: [{ $and: [{ senderID: userID }, { receiverID: id }] }, { $and: [{ senderID: id }, { receiverID: userID }] }] })


        }
        if (findMessage) {
            res.status(201).send({
                message: "Successfully Loaded",
                data: findMessage
            })



        }





    } catch (error) {
        res.status(404).send({
            'message': error.message
        })
    }





}
const practice = async (req, res) => {
    // One-to-One Chats

    const userID = req.query.id;
    const oneToOneChats = await Message.aggregate([
        {
            $match: {
                receiverID: { $ne: null },
                $or: [
                    { senderID: userID },
                    { receiverID: userID }
                ]
            }
        },
        {
            $addFields: {
                chatPartner: {
                    $cond: [
                        { $eq: ["$senderID", userID] },
                        "$receiverID",
                        "$senderID"
                    ]
                }
            }
        },
        { $sort: { time: -1 } },
        {
            $group: {
                _id: "$chatPartner",
                lastMessage: { $first: "$message" },
                lastTime: { $first: "$time" },
                senderID: { $first: "$senderID" },
                receiverID: { $first: "$receiverID" },
                groupID: { $first: "$groupID" },
                read: { $first: "$read" },
                delivered: { $first: "$delivered" }
            }
        },
        { $sort: { lastTime: -1 } }
    ]);


    // Group Chats Step 1: Fetch group IDs where user is a member
    const groups = await GroupInfo.find({
        [`members.${userID}`]: { $exists: true }
    }).select('_id');

    const groupIDs = groups.map(g => g._id.toString());

    // Group Chats Step 2: Fetch latest messages from these groups
    const groupChats = await Message.aggregate([
        {
            $match: {
                $or: [
                    { groupID: { $in: groupIDs } },
                    { $and: [{ senderID: userID }, { groupID: { $ne: null } }] }
                ]  // Only group messages
            }
        },
        {
            $addFields: {
                chatPartner: "$groupID"
            }
        },
        { $sort: { time: -1 } },
        {
            $group: {
                _id: "$chatPartner",
                lastMessage: { $first: "$message" },
                lastTime: { $first: "$time" },
                senderID: { $first: "$senderID" },
                receiverID: { $first: "$receiverID" },
                groupID: { $first: "$groupID" },
                read: { $first: "$read" },
                delivered: { $first: "$delivered" }
            }
        },
        { $sort: { lastTime: -1 } }
    ]);

   

    // Final merge: one-to-one chats + group chats
    const allChats = [...oneToOneChats, ...groupChats].sort((a, b) => new Date(b.lastTime) - new Date(a.lastTime));
    res.send(allChats)


}

const chatList = async (req, res) => {
    const userID = req.query.id;

    // const result = await Message.aggregate([
    //     {
    //         $match: {
    //             $or: [
    //                 { senderID: userID },
    //                 { receiverID: userID },
    //                 { groupID: { $ne: null } }  // fetch group messages too
    //             ]
    //         }
    //     },
    //     {
    //         $lookup: {
    //             from: 'groupinfos', // MongoDB uses lowercase collection names by default
    //             localField: 'groupID',
    //             foreignField: '_id',
    //             as: 'groupDetails'
    //         }
    //     },
    //     {
    //         $match: {
    //             $or: [
    //                 // one-to-one messages
    //                 { senderID: userID },
    //                 { receiverID: userID },
    //                 // group messages where user is part of the members map
    //                 {
    //                     $and: [
    //                         { groupDetails: { $ne: [] } },
    //                         { "groupDetails.members": { $exists: true } },
    //                         { $expr: { $gt: [{ $indexOfArray: [{ $objectToArray: { $arrayElemAt: ["$groupDetails.members", 0] } }, { k: userID }] }, -1] } }
    //                     ]
    //                 }
    //             ]
    //         }
    //     },
    //     {
    //         $addFields: {
    //             chatPartner: {
    //                 $cond: [
    //                     { $ifNull: ["$groupID", false] },
    //                     "$groupID",  // Group: use groupID as chat partner
    //                     {
    //                         $cond: [
    //                             { $eq: ["$senderID", userID] },
    //                             "$receiverID",  // One-to-one: who is the other person
    //                             "$senderID"
    //                         ]
    //                     }
    //                 ]
    //             }
    //         }
    //     },
    //     {
    //         $sort: { time: -1 }
    //     },
    //     {
    //         $group: {
    //             _id: "$chatPartner",   // Will hold groupID or userID
    //             lastMessage: { $first: "$message" },
    //             lastTime: { $first: "$time" },
    //             senderID: { $first: "$senderID" },
    //             receiverID: { $first: "$receiverID" },
    //             groupID: { $first: "$groupID" },
    //             read: { $first: "$read" },
    //             delivered: { $first: "$delivered" }
    //         }
    //     },
    //     {
    //         $sort: { lastTime: -1 }
    //     }
    // ]);


    // const result = await Message.aggregate([
    //     {
    //         $lookup: {
    //             from: 'groupinfos',
    //             localField: 'groupID',
    //             foreignField: '_id',
    //             as: 'groupDetails'
    //         }
    //     },
    //     {
    //         $match: {
    //             $or: [
    //                 { senderID: userID },  // One-to-one or group: you sent
    //                 { receiverID: userID }, // One-to-one: you received
    //                 {
    //                     $and: [
    //                         { groupID: { $ne: null } },      // Message is for a group
    //                         { groupDetails: { $ne: [] } },   // Group exists
    //                         { "groupDetails.members": { $exists: true } },
    //                         {
    //                             $expr: {
    //                                 $gt: [
    //                                     {
    //                                         $indexOfArray: [
    //                                             {
    //                                                 $map: {
    //                                                     input: { $objectToArray: { $arrayElemAt: ["$groupDetails.members", 0] } },
    //                                                     as: "member",
    //                                                     in: "$$member.k"
    //                                                 }
    //                                             },
    //                                             userID
    //                                         ]
    //                                     },
    //                                     -1
    //                                 ]
    //                             }
    //                         }
    //                     ]
    //                 }
    //             ]
    //         }
    //     },
    //     {
    //         $addFields: {
    //             chatPartner: {
    //                 $cond: [
    //                     { $ifNull: ["$groupID", false] },
    //                     "$groupID",  // if it's a group message, chatPartner = groupID
    //                     {
    //                         $cond: [
    //                             { $eq: ["$senderID", userID] },
    //                             "$receiverID",  // else if you are sender, partner = receiver
    //                             "$senderID"    // else you are receiver, partner = sender
    //                         ]
    //                     }
    //                 ]
    //             }
    //         }
    //     },
    //     { $sort: { time: -1 } },
    //     {
    //         $group: {
    //             _id: "$chatPartner",
    //             lastMessage: { $first: "$message" },
    //             lastTime: { $first: "$time" },
    //             senderID: { $first: "$senderID" },
    //             receiverID: { $first: "$receiverID" },
    //             groupID: { $first: "$groupID" },
    //             read: { $first: "$read" },
    //             delivered: { $first: "$delivered" }
    //         }
    //     },
    //     { $sort: { lastTime: -1 } }
    // ]);

    const oneToOneChats = await Message.aggregate([
        {
            $match: {
                receiverID: { $ne: null },
                $or: [
                    { senderID: userID },
                    { receiverID: userID }
                ]
            }
        },
        {
            $addFields: {
                chatPartner: {
                    $cond: [
                        { $eq: ["$senderID", userID] },
                        "$receiverID",
                        "$senderID"
                    ]
                }
            }
        },
        { $sort: { time: -1 } },
        {
            $group: {
                _id: "$chatPartner",
                lastMessage: { $first: "$message" },
                lastTime: { $first: "$time" },
                senderID: { $first: "$senderID" },
                receiverID: { $first: "$receiverID" },
                groupID: { $first: "$groupID" },
                read: { $first: "$read" },
                delivered: { $first: "$delivered" }
            }
        },
        { $sort: { lastTime: -1 } }
    ]);


    // Group Chats Step 1: Fetch group IDs where user is a member
    const groups = await GroupInfo.find({
        [`members.${userID}`]: { $exists: true }
    }).select('_id');

    const groupIDs = groups.map(g => g._id.toString());

    // Group Chats Step 2: Fetch latest messages from these groups
    const groupChats = await Message.aggregate([
        {
            $match: {
                $or: [
                    { groupID: { $in: groupIDs } },
                    { $and: [{ senderID: userID }, { groupID: { $ne: null } }] }
                ]  // Only group messages
            }
        },
        {
            $addFields: {
                chatPartner: "$groupID"
            }
        },
        { $sort: { time: -1 } },
        {
            $group: {
                _id: "$chatPartner",
                lastMessage: { $first: "$message" },
                lastTime: { $first: "$time" },
                senderID: { $first: "$senderID" },
                receiverID: { $first: "$receiverID" },
                groupID: { $first: "$groupID" },
                read: { $first: "$read" },
                delivered: { $first: "$delivered" }
            }
        },
        { $sort: { lastTime: -1 } }
    ]);

   

    // Final merge: one-to-one chats + group chats
    const result = [...oneToOneChats, ...groupChats].sort((a, b) => new Date(b.lastTime) - new Date(a.lastTime));




    let chatList = {}
    await Promise.all(result.map(async (item) => {

        let info = ''
        if (!item.groupID) {
            info = await Users.findById(item._id).select({ chatHistory: 0, password: 0, friends: 0 }).lean()
        } else {

            info = await GroupInfo.findById(item.groupID).lean()

        }

        if (info) {
            info.lastMessage = item.lastMessage
            info.lastTime=item.lastTime


        }
        if (!chatList[info._id]) {
            chatList[info._id] = info
        }

    }))

    console.log('From the RESTAPi ChatList')

    res.send(chatList)



};


module.exports = {
    show, createGroup, loadMessage, chatList, practice
}