const express = require('express');
const socketio = require('socket.io');
const app = express();
const cors = require('cors');

app.use(cors());

app.use(express.static(__dirname + '/public'));

const expressServer = app.listen(3000);
const io = socketio(expressServer, {
  cors: {
    origin: '*', // Allow connections from any origin (replace with your specific domain in a production environment)
    methods: ['GET', 'POST'], // Allow specified HTTP methods
  },
});

io.on('connection', (socket) => {
  console.log(socket.id, 'connected');
  // in ws we use send method and in socket.io we use emit event
  //socket.emit('messageFromServer', { data: 'Welcome to the socketio server' });

  socket.on('messageFromClient', dataFromClient=>{
    console.log(dataFromClient)
    // io to inform all connections
    io.emit('newMessageToClients', {text: dataFromClient.text})
})

});

