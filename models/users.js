const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const accountSid = 'ACc31dd1631220a0a11f6fc1344cc00002';
const Authtoken = '547425147c4bf4fc6c682fa1f0ec089e';
const phoneNo = '+15636874037';
const client = require('twilio')(accountSid, Authtoken);

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
        validate: {
            validator: validator.isEmail,
            message: '{VALUE} is not a valid email'
        }

    },
    password: {
        type: String,
        required: true,
        minlength: 6
    },
    Mob: {
        type: Number,
        required: true
    }
});

UserSchema.pre('save', function (next) {
    var user = this;
    if (user.isModified('password')) {
        bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(user.password, salt, (err, hash) => {
                user.password = hash;
                next();
            });
        });
    } else {
        next();
    }
});

UserSchema.statics.findByinput = function (email, password) {
    var user = this;
    return user.findOne({ email }).then((user) => {
        if (!user) {
            return Promise.reject();
        }

        return new Promise((resolve, reject) => {
            bcrypt.compare(password, user.password, (err, res) => {
                if (res) {
                    resolve(user);
                } else {
                    reject();
                }
            })
        });
    });
};


var val = Math.floor(1000 + Math.random() * 9000);

UserSchema.statics.OTP = function (email, Mob) {
    var user = this;
    return user.findOne({ email }).then((user) => {
        if (!user) {
            return Promise.reject();
        }

        return new Promise((resolve, reject) => {
            client.messages.create({
                to: Mob,
                from: phoneNo,
                body: `The OTP for your password verification is ${val}`
            }, (err, res) => {
                if (res) {
                    resolve(user);
                } else {
                    reject();
                }
            })
                .done();
        });
    });
};
var User = mongoose.model('User', UserSchema);

module.exports = { User,
    val
};