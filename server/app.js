const app = require('express')();
const server = require('http').createServer(app); 

const io = require('socket.io')(server, {
    cors: {
        origin: '*',
        methods: ['GET', 'POST']
    }
});

app.get('/test', (req, res) => {
    res.send('<h1>Socket</h1>')
})

io.on('connection', (socket) => {
    socket.emit('chat', 'Välkommen till chatten! Kom ihåg att alltid skriva snälla saker. :)')  

    socket.on('chat', (arg) => {
        console.log('incoming chat', arg);
       // io.emit('chat', arg); 
       socket.broadcast.emit('chat', arg); 
    })
})

server.listen(process.env.PORT || '8080'); 
