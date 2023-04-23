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

//Conexao socket
io.on('connection', (socket)=>{
    console.log('Conextao encontrada...')


})