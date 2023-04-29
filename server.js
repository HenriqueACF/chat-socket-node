const express = require('express');
const path = require('path');
const http = require('http');
const socketIO = require('socket.io');

const app = express();
const server = http.createServer(app)
const io = socketIO(server)

server.listen(3000)
console.log('API RODANDO NA PORTA 3000')

app.use(express.static(path.join(__dirname, 'public')))

let connectedUsers = []

//Conexao socket
io.on('connection', (socket)=>{
    console.log('Conextao encontrada...')

    socket.on('join-request', (username)=>{
        socket.username = username
        connectedUsers.push(username)

        console.log(connectedUsers)

        socket.emit('user-ok', connectedUsers)
        //broadcast
        socket.broadcast.emit('list-update', {
            joined: username,
            list: connectedUsers
        })
    })

    //disconnect
    socket.on('disconnect', ()=>{
        connectedUsers = connectedUsers.filter(u => u != socket.username)
        console.log(connectedUsers)

        socket.broadcast.emit('list-update', {
            left: socket.username,
            list: connectedUsers
        })
    })

    socket.on('send-msg', (txt)=>{
        let obj = {
            username: socket.username,
            message: txt
        }

        //socket.emit('show-msg', obj)
        socket.broadcast.emit('show-msg', obj)
    })

})