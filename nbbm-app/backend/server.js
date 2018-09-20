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
  console.log('Hello', socket.id);
    /* ******************************** */
    // Need to save activeUsers to database or as an array in server (cheap way)
    /* ******************************** */
    // Send socket chat history to user that signed in
    connection.query("SELECT `Message_content` FROM `messages`", (err, db_data) => {
      console.log(err);
      for (let x in db_data) {
        socket.emit('chat_history', {message: db_data[x].Message_content})
      }
    });
  // Receive message
  socket.on('send_message', (data) => {
    console.log(data);
    // Save socket chat message into mysql db
    connection.query("INSERT INTO `messages` (`Message_content`) VALUES ('" + data.message + "')", (err, db_data) => {
      console.log(err);
    });
    io.emit('send_received_message', data);
  })
})