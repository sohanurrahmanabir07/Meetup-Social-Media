const { Posts } = require("../model/post")
const cloudinary = require("../Cloudinary/cloudinary")
const { Notification } = require("../model/notification")
const fetchPost = async (req, res) => {

    try {
        const page = parseInt(req.query.page)

        const myProfile = req.body
        const friends = myProfile.friends
        friends.push(myProfile._id)

        const result = await Posts.find({ userID: { $in: friends } }).skip((page - 1) * 2).limit(2)
        if (result) {
            res.status(201).send(result)
        }


    } catch (error) {
        res.send(error.message)
    }


}


const doPost = async (req, res) => {
    const image = req.file

    
    let data = null
    if (image) {
        
        console.log('Found the Image')
        data = JSON.parse(req.body.data)
        console.log('Parsing the Data To JS',data)
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
        if (save) {
            res.status(201).send(save)
        }
    } catch (error) {
        res.send(error.message)
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

    const { id, l,p } = req.query
    try {
        const page = parseInt(p)
        const result = await Notification.find({ receiverID: id }).skip((page - 1) * 10).limit(parseInt(l))
        if(result){
            res.status(201).send(result)
        }else{
            res.status(204).send({
                message:'No Notification'
            })
        }
    } catch (error) {
        res.status(401).send(error.message)
    }


}


module.exports = {
    fetchPost, doPost, fileUpload,loadNotification
}