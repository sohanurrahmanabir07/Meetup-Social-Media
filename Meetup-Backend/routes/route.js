const express=require('express')
const route=express.Router()
const {show,createGroup,loadMessage,chatList,practice}=require('../controller/messengerController')
const {registration,Login}=require('../controller/authController')
const { fetchPost, doPost, fileUpload, loadNotification, myPost, getUSer, DeleteCollection, loadRequestandPendingList, markReadNotification, getMyProfile, updateInfo,uploadPPorCP, removePPorCP } = require('../controller/socialController')

const upload = require('../Middleware/FileHandling/multer')





// -----------------------------All Route--------------------------

route.get('/show',show)
route.post('/registration',registration)
route.post('/login',Login)

route.post('/create_group',createGroup)
route.post('/load_message',loadMessage)

route.get('/chatList',chatList)

route.get('/practice',practice)




// _____________________________Social Routes_______________________________

route.post('/newsFeed',fetchPost)
route.post('/newsPost',upload.single('image'),doPost)
route.get('/mypost',myPost)

route.get('/getUsers',getUSer)
route.get('/getMyprofile',getMyProfile)
route.post('/updateInfo',updateInfo)
route.post('/sendFile',upload.single('image'),fileUpload)
route.post('/uploadpporcp',upload.single('image'),uploadPPorCP)
route.get('/removepporcp', removePPorCP )
route.get('/notification',loadNotification)
route.get('/getRequestPendingList',loadRequestandPendingList)
route.get('/deleteDocument',DeleteCollection)
route.post('/markReadNotification',markReadNotification)

module.exports=route