const mongoose= require('mongoose');
const todoSchema= new mongoose.Schema({
    description:{
        type: String,
        required: true
    },
    category:{
        type: String,
        required: false
    },
    duedate:{
        type: Date,
        required: true
    }
})

const Todolist= mongoose.model('Todolist', todoSchema);

module.exports= Todolist;