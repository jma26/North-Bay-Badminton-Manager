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

let activeUsers = [];

io.on('connection', (socket) => {
  console.log('Hello', socket.id);
    /* ******************************** */
    // Need to save activeUsers to database or as an array in server (cheap way)
    socket.on('new_user', (data) => {
      // Add new user to array
      activeUsers.push(data.user);
      console.log(activeUsers);
      // Send current active users in chatroom to all
      io.emit("active_users", {'users': activeUsers});
      // Send socket chat history to user that signed in
      connection.query("SELECT `Message_content` FROM `messages`", (err, db_data) => {
        console.log(err);
        for (let x in db_data) {
          socket.emit('chat_history', {message: db_data[x].Message_content})
        }
      });
    })
  // Receive message
  socket.on('send_message', (data) => {
    console.log(data);
    // Save socket chat message into mysql db
    connection.query("INSERT INTO `messages` (`Message_content`) VALUES ('" + data.message + "')", (err, db_data) => {
      console.log(err);
    });
    io.emit('send_received_message', data);
  })
  // Disconnect from socket when user navigates away
  socket.on('disconnect_user', (data) => {
    console.log('Disconnecting data', data);
    // Find index of the user
    let index = activeUsers.indexOf(data.user);
    console.log("User's index is", index);
    // Pop the user out of the array
    activeUsers.splice(index, 1);
    // Update all users with array
    io.emit("active_users", {'users': activeUsers})
    socket.removeAllListeners();
  })
})

// Allow CORS
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
})

// Retrieve all available Leagues
app.get('/getAllLeagues', (req, res) => {
  connection.query('SELECT * FROM `LEAGUE`', (err, data) => {
    console.log(data);
    res.json(data);
  })
})