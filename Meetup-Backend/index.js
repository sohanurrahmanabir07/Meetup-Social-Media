const express = require('express')
const cors = require('cors')
const connectDB = require('./database/mongodb')
const SocketEvents = require('./Socket/socketEvent')
const cookieParser = require('cookie-parser')
const app = express()
const port = 6500
const http = require('http')
const server = http.createServer(app)
app.use(cookieParser())
app.use(cors({
  origin: [process.env.URL],
  credentials: true
}))
app.use(express.json())

const { Server } = require('socket.io')
const route = require('./routes/route')
const { onlineUsers } = require('./GlobalVariable/variable')
const { SocialMediaSocket } = require('./Socket/SocialMediaSocket')
global.io = new Server(server, {
  cors: {
    origin: process.env.URL,
    credentials: true,
  }
});

app.use('/', route)
app.set('scoketio', io)
connectDB()
app.use((req, res, next) => {
  req.io = io;
  return next();
});


// ---------------Socket------------

io.on('connection', (socket) => {


  SocketEvents(socket, io)
  SocialMediaSocket(socket,io)
 



})




server.listen(port, () => {
  console.log(`Server is running on ${port}`)
})

