const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');

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

UserSchema.pre('save', function (next) {
    var user = this;
    if(user.isModified('password')){
        bcrypt.genSalt(10, (err,salt) => {
            bcrypt.hash(user.password, salt, (err,hash) => {
                user.password = hash;
                next();
            });
        });
   }else{
       next();
   }
    });

    UserSchema.statics.findByinput = function(email, password){
        var user = this;
        return user.findOne({email}).then((user) => {
            if(!user){
                return Promise.reject();
            }

            return new Promise((resolve, reject) => {
                bcrypt.compare(password, user.password, (err,res) => {
                    if(res){
                        resolve(user);
                    }else{
                        reject();
                    }
                })
            });
        });
    };
var User = mongoose.model('User', UserSchema);

module.exports = {User};