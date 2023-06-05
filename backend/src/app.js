const app = require('express')();
const server = require('http').createServer(app);
var cors = require('cors')
const io = require('socket.io')(server);
const port = process.env.PORT || 8080;

const rooms = [{name: 'leagueOfLegends', messages: []}];

app.use(cors())

io.on('connection', (socket) => {
  console.log('user connected');

  socket.on('disconnect', function () {
    console.log('user disconnected');
  });
  
  socket.on('message', (data) => {
    const message = {message: data.message, timestamp: data.createdAt, user: data.name, id:socket.id}

    io.to(socket.id).emit("receive_message", data.message);
        rooms[0].messages.push(message);
    console.log(data, socket.id);
  });

})

server.listen(port, function() {
  console.log(`Listening on port ${port}`);
});