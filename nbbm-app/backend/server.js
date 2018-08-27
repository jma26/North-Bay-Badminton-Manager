const mysql = require('mysql');
const express = require('express');
const socketIo = require('socket.io');
const app = express();

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'NorthBayBadminton',
  port: 3306
});

// Port 
const port = process.env.PORT || 8000;
// Have server to listen to port
const server = app.listen(port, () => {
  console.log(`listening on port ${port}`);
})

// MySQL connection
connection.connect((err) => {
  if (err) throw err;
  console.log('MySQL connection successful!');
})

// Pass the same server object to socketIo
const io = socketIo(server);

io.on('connection', (socket) => {
  console.log(socket.id);
  // Receive message
  socket.on('send_message', (data) => {
    console.log(data);
    io.emit('receive_message', data);
  })
})