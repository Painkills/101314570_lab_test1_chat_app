const express = require('express');
const dm = require('../models/directMessageModel');
const pm = require('../models/messageModel');
const user = require('../models/userModel');
const app = express();


app.get('/messages', async (req, res) => {
    const messages = await pm.find({})
    try {
        res.status(200).send(messages);
      } catch (err) {
        res.status(500).send(err);
      }
})
  
app.post('/messages', (req, res) => {
    var message = new pm(req.body);
    message.save((err) =>{ 
        if(err)
        {
        //sendStatus(500);
        console.log(err)
        }

        //Send Message to all users
        io.emit('message', req.body);
        res.sendStatus(200);
    })
})

module.exports = app