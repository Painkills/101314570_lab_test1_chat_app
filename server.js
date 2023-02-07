var express = require('express');
var bodyParser = require('body-parser')
var mongoose = require('mongoose');
const messageRouter = require('./routes/messageRoutes')
const userRouter = require('./routes/userRoutes')

var app = express();
var http = require('http').Server(app);
global.io = require('socket.io')(http);

app.use(express.static(__dirname + "/pages"));
app.use(express.json());
app.use(bodyParser.urlencoded({extended: false}))
app.use(messageRouter)
app.use(userRouter)

var dbUrl = 'mongodb+srv://temp:9GW3DWTtGAn.D9@cluster0.qibcjdv.mongodb.net/fs2?retryWrites=true&w=majority'

io.on('connection', (socket) => {
  socket.join("happy")
  socket.join("sad")
  socket.join("mad")
  app.set("socket", socket)
})

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