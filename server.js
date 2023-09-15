import express from 'express';
import { createServer } from 'node:http';
import { Server } from 'socket.io';

const app = express();
app.use(express.static('./public'));

const server = createServer(app);
const io = new Server(server);

app.get('/', (req, res) => {
    return res.send()
});

io.on('connection', (socket) => {
    console.log('a user connected --> ' + socket.id);
    socket.on('disconnect', () => {
        console.log('user disconnected');
    });
    socket.on('chat message', (msg) => {
        msg = `${socket.id} ENVIOU: ${msg}`
        console.log(msg);
        io.emit('chat message', msg);
    })
});

server.listen(3030, () => {
    console.log('server running at http://localhost:3030');
});