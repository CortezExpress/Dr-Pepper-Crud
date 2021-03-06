const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema ({
    email       : String, 
    username    : String,
    password    : String,
    description : String, 

    facebookID  : String,
    googleID    : String
});

const User = mongoose.model('User', userSchema);
module.exports = User;


