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

  // Save active user to mysql db
  socket.on('new_user', (data) => {
    connection.query("INSERT INTO `activeusers` (`user`) VALUES ('" + data.user + "')"), (err, db_data) => {
      console.log(err);
      console.log(db_data);
    }
    // Retrieve all active users again and emit to everybody else
    connection.query("SELECT `user` FROM `activeusers`", (err, db_data) => {
      console.log(err);
      console.log(db_data);
      let activeUsers = [];
      for (data of db_data) {
        activeUsers.push(data.user);
      }
      console.log(activeUsers);
      io.emit("active_users", {'users': activeUsers})
    })
    // Send socket chat history to user that signed in
    connection.query("SELECT `message_content` FROM `messages`", (err, db_data) => {
      console.log(err);
      for (data of db_data) {
        socket.emit('chat_history', {message: data.message_content})
      }
    });
  })

  // Receive message
  socket.on('send_message', (data) => {
    console.log(data);
    // Save socket chat message into mysql db
    connection.query("INSERT INTO `messages` (`message_content`) VALUES ('" + data.message + "')", (err, db_data) => {
      console.log(err);
    });
    io.emit('send_received_message', data);
  })

  // Disconnect from socket when user navigates away
  socket.on('disconnect_user', (data) => {
    console.log('Disconnecting data', data);
    // Delete active user from mysql
    connection.query("DELETE FROM `activeusers` WHERE `user` = '" + data.user + "'", (err, db_data) => {
      console.log(err);
      console.log(db_data);
    });
    // Retrieve all active users again and emit to everybody else
    connection.query("SELECT `user` FROM `activeusers`", (err, db_data) => {
      console.log(err);
      console.log(db_data);
      let activeUsers = [];
      for (data of db_data) {
        activeUsers.push(data.user);
      }
      io.emit("active_users", {'users': activeUsers})
    });
    socket.removeAllListeners();
  })
})

// Allow CORS
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
})