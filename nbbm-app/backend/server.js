const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const app = express();

const server = http.createServer(app);
const io = socketIo(server);

io.on('connection', (socket) => {
  
})

const port = process.env.PORT || 8000;
app.listen(port, () => {
  console.log('listening on port', port);
})


