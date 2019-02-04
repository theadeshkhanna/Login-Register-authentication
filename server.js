const express = require('express');
const mongoose = require('mongoose');
const {User} = require('./models/users');
const bodyparser = require('body-parser');
var _ = require('lodash');
const exphbs = require('express-handlebars');
const request = require('request');


var app = express();

mongoose.Promise = global.Promise;


app.engine('handlebars', exphbs({   
    defaultLayout: 'main'
}));
app.set('view engine', 'handlebars');

app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: true }));


mongoose.connect('mongodb://localhost:27017/Login-Register', (err) => {
    if(err){
        console.log('Error connecting to database');
    }else{
        console.log('Connected to database'); 
    }
});

app.get('/', (req, res) => {
    res.render('index');
});

app.post('/register', (req, res) => {

    var data = new User(req.body);
    data.save().then(() => {
        res.render('login');
    }).catch((e) => {
        res.status(400).send(e);
    })
});

app.get('/login', (req, res) => {
    res.render('login');
});

app.get('/register', (req, res) => {
    res.render('register');
});

app.post('/login', (req,res) => {

    var data = _.pick(req.body, ['email', 'password']);
    User.findByinput(data.email, data.password).then((user) => {
        res.send('You are logged in');
    }).catch((e) => {
        res.send('Invalid credentials');
    })
    
});

app.get('/forgotPassword', (req, res) => {
    res.render('forgotPassword');
});

app.post('/forgotPassword', (req,res) => {
    var data = _.pick(req.body, ['email', 'Mob']);
    User.OTP(data.email, data.Mob).then((user) => {
        res.render('OTP');
    }).catch((e) => {
        res.send('unable to send OTP');
    })
});

app.get('/OTP', (req, res) => {
    res.render('OTP');
});

app.post('/OTP', (req, res) => {
    var data = _.pick(req.body, ['otp']);
    var a = User.verify(data.otp);
    if(a == 1){
        res.render('ChangePassword');
    }else{
        res.status(404).send('Error');
    }
});


app.listen(3000, () => {
    console.log('server is up and running at port 3000');
})





 
