const mongoose = require('mongoose');
const validator = require('validator');

var UserSchema = new mongoose.Schema({
    f_name: {
        type: String,
        required: true,
        trim: true,
        minlength: 1, 
    },
    
    l_name: {
        type: String,
        required: true,
        trim: true,
        minlength: 1, 
    },
    
    email: {
        type: String,
        required: true,
        trim: true,
        minlength: 1,
        unique: true,
        validate:{
            validator:validator.isEmail,
            message:'{VALUE} is not a valid email'
        }
        
    },
    password: {
        type: String,
        required: true,
        minlength: 6
    }
});
var User = mongoose.model('User', UserSchema);

module.exports = {User};