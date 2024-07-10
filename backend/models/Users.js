const mongoose = require('mongoose');

// import mongoose from 'mongoose';
const { Schema } = mongoose;

const userSchema = new Schema({
    name : {
        type: String,
        required: true
    },
    password: {
        type : String,
        required: true
    },
    email: {
        type : String,
        required : true,
        unique: true
    },
    date: {
        type : Date,
        required : Date.now
    },
  
});


module.exports  = mongoose.model('user',userSchema);