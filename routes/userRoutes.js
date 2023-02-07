const express = require('express');
const user = require('../models/userModel');
const app = express();


app.get('/users', async (req, res) => {
    const users = await user.find({})
    try {
        res.status(200).send(users);
    } catch (err) {
        res.status(500).send(err);
    }
})
  
app.post('/users', async (req, res) => {
    var new_user = new user(req.body);
    try {
        await new_user.save((err) => {
          if(err){
                res.send(err)
            }else{
                res.send(new_user);
            }
        });
    } catch (err) {
        res.status(500).send(err);
    }
})


app.post('/signin', async (req, res) => {  
    const socket = req.app.get("socket")
    const username = req.body.username
    const password = req.body.password 
    const located_user = await user.findOne({username : username});
    
    if (!located_user) {
        return socket.emit('loginFailed', "Incorrect username or password");
    }

    const isPasswordValid = await located_user.validatePassword(password);

    if (!isPasswordValid) {
        return socket.emit('loginFailed', "Incorrect username or password");
    }

    console.log(located_user.getFullName())
    socket.emit('loginAccept', located_user.getFullName());
});

module.exports = app