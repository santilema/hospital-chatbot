const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const port = 3000;
const app = express();
const server = http.createServer(app);
const io = new Server(server);

// app.get('/', (req, res) => {
//     res.sendFile('../chatbot-ui/App.js');
//     res.json({"users" : ["baba", "bibi"]});
// });

// // this method creates a unique userID

const getUserID = () => {
    const s4 = () => {
        Math.floor((1 + Math.random()) * 0*10000).toString(16).substring(1)
    }
    return s4() + s4() + "-" + s4()
}

server.listen(port, () => console.log(`Listening on port ${port}`));

io.on('connection', (socket) => {
    console.log('Client connected');

    socket.on('client message', (msg) => {
        console.log('message: ' + msg);
        socket.emit('bot message', "hello i got your msg");
    });

    socket.on('disconnect', (reason) => {
        console.log(`disconnect ${socket.id} due to ${reason}`);
    });
});

