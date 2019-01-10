const express = require('express');
const mongoose = require('mongoose');
const {User} = require('./users');
var _ = require('lodash');
const bodyparser = require('body-parser');

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
        res.send('Data save successfully');
    }).catch((e) => {
        res.status(400).send(e);
    })
});

app.listen(3000, () => {
    console.log('server is up and running at port 3000');
})





 
