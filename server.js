const express = require('express');
const mongoose = require('mongoose');
const {User} = require('./models/users');
const bodyparser = require('body-parser');
var _ = require('lodash');

var app = express();
mongoose.Promise = global.Promise;
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: true }));

app.use(express.static(__dirname + '/HTML'));
mongoose.connect('mongodb://localhost:27017/Login-Register', (err) => {
    if(err){
        console.log('Error connecting to database');
    }else{
        console.log('Connected to database'); 
    }
});

app.post('/Register', (req, res) => {

    var data = new User(req.body);
    data.save().then(() => {
        res.send('Your are Registered, you can now login.. ');
    }).catch((e) => {
        res.status(400).send(e);
    })
});

app.post('/Login', (req,res) => {

    var data = _.pick(req.body, ['email', 'password']);
    User.findByinput(data.email, data.password).then((user) => {
        res.send('You are logged in');
    }).catch((e) => {
        res.send('Invalid credentials');
    })
    
});


app.post('/Otp', (req,res) => {

    var data = _.pick(req.body, ['email', 'Mob']);
    User.OTP(data.email, data.Mob).then((user) => {
        res.send('OTP is sent');
    }).catch((e) => {
        res.send('unable to send OTP');
    })
});

app.listen(3000, () => {
    console.log('server is up and running at port 3000');
})





 
