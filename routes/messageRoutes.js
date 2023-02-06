const express = require('express');
const dm = require('../models/directMessageModel');
const pm = require('../models/messageModel');
const user = require('../models/userModel');
const app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);


app.get('/messages', async (req, res) => {
    const messages = await pm.find({})
    try {
        res.status(200).send(messages);
    } catch (err) {
        res.status(500).send(err);
    }
})
  
app.post('/messages', async (req, res) => {
    var message = new pm(req.body);
    try {
        await message.save((err) => {
          if(err){
                res.send(err)
            }else{
                io.emit('message', req.body)
                res.send(message);
            }
        });
    } catch (err) {
        res.status(500).send(err);
    }
})

module.exports = app