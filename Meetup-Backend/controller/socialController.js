const { Posts } = require("../model/post")
const cloudinary = require("../Cloudinary/cloudinary")
const { Notification } = require("../model/notification")
const { model } = require("mongoose")
const Users = require("../model/user")
const { FriendRequst } = require("../model/freindRequest")
const fetchPost = async (req, res) => {

    try {
        const page = parseInt(req.query.page)


        const myProfile = req.body


        const friends = Object.keys(myProfile.friends)
        friends.push(myProfile._id)

        // const result = await Posts.find({ userID: { $in: friends } }).populate('userID').populate('comments').skip((page - 1) * 2).limit(10)
        const result = await Posts.find({ userID: { $in: friends } }).populate('userID').populate({
            path: 'comments',
            options: { sort: { 'TimeStamp': -1 } },
            populate: {
                path: 'userID',
                model: 'Users'
            }
        }).sort({ createdAt: -1 }).skip((page - 1) * 2).limit(10)
        if (result) {
            res.status(201).send(result)
        }


    } catch (error) {
        res.send(error.message)
    }


}
const updateInfo = async (req, res) => {
    try {
        const data = req.body
        const updateResult = await Users.updateOne({ _id: data.id }, { bio: data.bio, name: data.name, worksAt: data.worksAt, dOb: data.dOb, status: data.status, address: data.address })
        if (updateResult) {
            const profile = await Users.findById(data.id).populate('friendList')
            res.status(201).send({
                updatedProfile: profile
            })

        }
    } catch (error) {
        res.send(error.message)
    }

}

const fetchPhoto = async (req, res) => {
    const { id } = req.query

    const getPhotos = (await Posts.find({ userID: id, type: 'photo' })).populate

}
const getMyProfile = async (req, res) => {
    const { id } = req.query

    console.log('id', id)

    try {

        const result = await Users.findById(id).populate('friendList')
        if (result) {
            res.status(201).send(result)
        }

    } catch (error) {
        res.status(500).send({
            messsage: 'Something Error in Server'
        })
    }

}

const myPost = async (req, res) => {
    const { id } = req.query
    const page = 1

    try {
        const posts = await Posts.find({ userID: id }).populate('userID').populate({
            path: 'comments',
            options: { sort: { 'Timestamp': -1 } },
            populate: {
                path: 'userID',
                model: 'Users'
            }
        }).skip((page - 1) * 2).limit(10)

        if (posts) {
            res.status(201).send(posts)
        } else {
            res.send('Couldnt find')
        }


    } catch (error) {
        res.send(error.message)
    }

}

const uploadPPorCP = async (req, res) => {

    const image = req.file
    const { id, type } = req.query

    console.log(req.query)
    let path = null
    try {
        if (image) {
            await cloudinary.uploader.upload(req.file.path)
                .then((res) => {
                    path = res.secure_url
                })
        }
        if (type == 'pp') {
            const user = await Users.updateOne({ _id: id }, { pp: path })

        } else {
            const user = await Users.updateOne({ _id: id }, { cp: path })

        }

        const updatedUser = await Users.findById(id).populate('friendList')
        console.log('updateUser', updatedUser)
        res.status(201).send({
            updatedUser: updatedUser
        })

    } catch (error) {

    }
}

const removePPorCP = async (req, res) => {

    try {
        const { id, type } = req.query

        const getUser=await Users.findById(id).lean()

        if(type=='pp'){
            const updateProfile=await Users.updateOne({_id:id},{pp:null})
        }else{
            const updateProfile=await Users.updateOne({_id:id},{cp:null})
        }

        const updatedUser=await Users.findById(id).populate('friendList')
        if(updatedUser){
            res.status(201).send({
                updateUser:updatedUser
            })
        }
    } catch (error) {
        res.send(error.message)
    }
}




const doPost = async (req, res) => {
    const image = req.file

    let data = null
    if (image) {


        data = JSON.parse(req.body.data)
        if (data.type == 'photo') {
            await cloudinary.uploader.upload(req.file.path)
                .then((resp) => {
                    data.imageUrl = resp.secure_url
                })
                .catch((error) => {


                    res.status(401).send({ message: 'Failed to Upload Please Try Again' })

                    return
                }
                )
        }


    } else {
        data = req.body

    }


    const post = new Posts(data)
   
    try {
        const save = await post.save()
        console.log('post to be saved',post)
        if (save) {
            const finalData = await Posts.findById(save._id).populate('userID').populate({
                path: 'comments',
                options: { sort: { 'Timestamp': -1 } },
                populate: {
                    path: 'userID',
                    model: 'Users'
                }
            })

            if (finalData) {

            }
            res.status(201).send(finalData)
        }else{
            console.log('Not Saved ')
        }
    } catch (error) {
        res.send(error.message)
    }
}

const getUSer = async (req, res) => {
    try {
        const users = await Users.find().select({ 'password': 0, 'chatHistory': 0, }).populate('friendList')

        if (users) {
            res.status(201).send(users)
        } else {
            res.status(401).send('couldnot Find')
        }
    } catch (error) {

    }
}

const fileUpload = async (req, res) => {
    await cloudinary.uploader.upload(req.file.path)
        .then((response) => {

            return response

        })
        .catch((err) => {
            return null
        })


}
const loadNotification = async (req, res) => {

    const { id, l, p } = req.query
    try {
        const page = parseInt(p)
        const result = await Notification.find({ receiverID: id }).sort({ TimeStamp: -1 }).populate('senderID').populate('receiverID').skip((page - 1) * 10).limit(parseInt(l))
        if (result) {
            res.status(201).send(result)
        } else {
            res.status(204).send({
                message: 'No Notification'
            })
        }
    } catch (error) {
        res.status(401).send(error.message)
    }


}

const loadRequestandPendingList = async (req, res) => {
    const { id } = req.query

    try {
        const friendRequest = await FriendRequst.find({ senderID: id, pending: true }).populate('senderID', { 'password': 0, 'chatHistory': 0, 'friends': 0 }).populate('receiverID', { 'password': 0, 'chatHistory': 0, 'friends': 0 }).lean()

        const pendingRequest = await FriendRequst.find({ receiverID: id, pending: true }).populate('senderID', { 'password': 0, 'chatHistory': 0, 'friends': 0 }).populate('receiverID', { 'password': 0, 'chatHistory': 0, 'friends': 0 }).lean()


        res.status(201).send({
            'requestList': friendRequest,
            'pendingList': pendingRequest
        })
    } catch (error) {
        res.status(401).send(error.message)
    }





}

const markReadNotification = async (req, res) => {
    const { id } = req.body
    try {
        const updateNotification = await Notification.updateOne({ _id: id }, { read: true })

        if (updateNotification) {
            res.status(201).send('Updated')
        } else {
            res.status(401).send('Couldnt Found')
        }

    } catch (error) {
        res.send(error)
    }


}

const DeleteCollection = async (req, res) => {
    // const collection = req.query.collection
    const result = await Notification.deleteMany({ type: 'dislike' })
    res.send(result)

}



module.exports = {
    fetchPost, doPost, fileUpload, loadNotification, myPost, getUSer, DeleteCollection, loadRequestandPendingList, markReadNotification, getMyProfile, updateInfo, uploadPPorCP,removePPorCP
}