//Require modules
const path = require('path');
const http = require('http');
const express = require('express');
const socketio = require('socket.io');
const formatMessage = require('./utils/messages');
const { userJoin, getCurrentUser } = require('./utils/users');

// Invoked Functions
const app = express();
const server = http.createServer(app);
const io = socketio(server);


// Set static folder
app.use(express.static(path.join(__dirname, 'public')));

const botName = 'Josh Bot';

// Run when client connects 
io.on('connection', (socket) => {

    socket.on("joinRoom", ({ username, room }) => {
        let user = userJoin(socket.id, username, room);
        
        socket.join(user.room);

        // Welcome current user 
        socket.emit('message', formatMessage(botName, 'Welcome Josh'))

        // Broadcast when user connects 
        socket.broadcast
            .to(user.room)
            .emit(
                'message',
                formatMessage(botName, `${user.username} has joined the chat`
                ));
    });



    // Listen for chatMessage
    socket.on('chatMessage', (msg) => {
        io.emit('message', formatMessage('USER', msg));

        // Runs when a client disconnects
        socket.on('disconnect', () => {
            io.to(user.room).emit(
                'message', 
                formatMessage(botName, `${user.username} has left the chat`))
        });
    });
});

const PORT = 3000 || process.env.PORT;

server.listen(PORT, () => console.log(`Server running on port ${PORT}`));

