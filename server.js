var express = require('express');
var bodyParser = require('body-parser')
var mongoose = require('mongoose');
const messageRouter = require('./routes/messageRoutes')

var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.use(express.static(__dirname));
app.use(express.json());
app.use(bodyParser.urlencoded({extended: false}))

var dbUrl = 'mongodb+srv://temp:9GW3DWTtGAn.D9@cluster0.qibcjdv.mongodb.net/fs2?retryWrites=true&w=majority'

io.on('connection', (socket) => {
  console.log(`A NEW user is connected: ${socket.id}`)
  //console.log(socket.rooms);
  //socket.join("room1")
  //console.log(socket.rooms);
})

mongoose.connect(dbUrl , { useUnifiedTopology: true, useNewUrlParser: true }, (err) => {
    if (err) {
        console.log('mongodb connected',err);
    }else{
        console.log('Successfully mongodb connected');
    }
})

app.use(messageRouter)

var server = http.listen(3000, () => {
  console.log('server is running on port', server.address().port);
});