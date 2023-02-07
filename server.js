var express = require('express');
var bodyParser = require('body-parser')
var mongoose = require('mongoose');

var app = express();
var http = require('http').Server(app);
const io = require('socket.io')(http);

const messageRouter = require('./routes/messageRoutes')(io)
const userRouter = require('./routes/userRoutes')(io)

app.use(express.static(__dirname + "/pages"));
app.use(express.json());
app.use(bodyParser.urlencoded({extended: false}))
app.use(messageRouter)
app.use(userRouter)

io.on('connection', (socket) => {
  socket.join("happy")
  socket.join("sad")
  socket.join("mad")

  var allRooms = Array.from(socket.rooms)
  console.log(allRooms)
  socket.emit('rooms', allRooms)
  socket.on('leave', (room) => {
    socket.leave(room)
    socket.emit('gone', allRooms)
    console.log("Fine, then stop being " + room)
  })
  app.set("socket", socket)
})



var dbUrl = 'mongodb+srv://temp:9GW3DWTtGAn.D9@cluster0.qibcjdv.mongodb.net/fs2?retryWrites=true&w=majority'

mongoose.connect(dbUrl , { useUnifiedTopology: true, useNewUrlParser: true }, (err) => {
    if (err) {
        console.log('mongodb connected',err);
    }else{
        console.log('Successfully mongodb connected');
    }
})

var server = http.listen(3000, () => {
  console.log('server is running on port', server.address().port);
});