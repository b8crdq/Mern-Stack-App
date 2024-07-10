const mongoose = require('mongoose');

// import mongoose from 'mongoose';
const { Schema } = mongoose;

const NotesSchema = new Schema({
    user :{
        type : mongoose.Schema.Types.ObjectId,
        ref : 'user'
    },
    title : {
        type: String,
        required: true
    },
    description: {
        type : String,
        required: true
    },
    tag: {
        type : String,
        default : "General"
       
       
    },
    date: {
        type : Date,
        required : Date.now
    },
  
});
const User =  mongoose.model('notes',NotesSchema);
User.createIndexes();
module.exports  = User;