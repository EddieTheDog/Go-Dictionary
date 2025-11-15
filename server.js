const express = require('express');
const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http);

const PORT = process.env.PORT || 3000;

// Serve static files
app.use(express.static('public'));

// Handle socket connections
io.on('connection', (socket) => {
    console.log('User connected:', socket.id);

    // Admin commands
    socket.on('admin-command', (data) => {
        console.log('Admin command:', data);

        // Broadcast command to all users except sender (admin)
        socket.broadcast.emit('execute-command', data);
    });

    // Admin announcements
    socket.on('admin-announcement', (message) => {
        console.log('Admin announcement:', message);
        socket.broadcast.emit('show-announcement', message);
    });

    socket.on('disconnect', () => {
        console.log('User disconnected:', socket.id);
    });
});

http.listen(PORT, () => console.log(`Server running on port ${PORT}`));
