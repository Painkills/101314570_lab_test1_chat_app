const express = require('express');
const app = express();
const dm = require('../models/directMessageModel');
const pm = require('../models/messageModel');
const user = require('../models/userModel');

// Get all messages (JUST FOR TESTING)
app.get('/messages', async (req, res) => {
    const messages = await pm.find({})
    try {
        res.status(200).send(messages);
    } catch (err) {
        res.status(500).send(err);
    }
})

// Get Messages by Room
app.get('/messages/:room', async (req, res) => {
    
    const room = req.params.room
    const messages = await pm.find({room : room});
    
    try {
      if(messages.length != 0){
        res.send(messages);
      }else{
        res.send(JSON.stringify({status:false, message: "No data found"}))
      }
    } catch (err) {
      res.status(500).send(err);
    }
});

// Get latest message by Room
app.get('/messages/latest/:room', async (req, res) => {
    
    const room = req.params.room
    const messages = await pm.find({room : room}).sort({'created': -1});
    console.log(messages[0])

    try {
      if(messages.length != 0){
        res.send(messages[0]);
      }else{
        res.send(JSON.stringify({status:false, message: "No data found"}))
      }
    } catch (err) {
      res.status(500).send(err);
    }
});
  
app.post('/messages', async (req, res) => {
    var message = new pm(req.body);
    try {
        await message.save((err) => {
          if(err){
                res.send(err)
            }else{
                res.send(message);
            }
        });
    } catch (err) {
        res.status(500).send(err);
    }
})

module.exports = app