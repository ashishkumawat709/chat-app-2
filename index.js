const express = require('express')
const app = express()
const http = require('http').createServer(app)
const PORT = process.env.PORT || 4000

app.use(express.static('public'))

const io = require('socket.io')(http)
io.on('connection', (socket) => {
    console.log('Connected...' )

    socket.on("chat", (data)=>{
        io.sockets.emit("chat", data)
    })

    socket.on("typing", (data)=>{
        socket.broadcast.emit("typing", data)
    })
})
http.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`)
})