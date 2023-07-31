const mongoose= require('mongoose');
mongoose.connect('mongodb://127.0.0.1/todo_list_db');

const db= mongoose.connection;

db.on('error',console.error.bind(console,'error connnecting to db'));
db.once('open',function(){
    console.log('successfully connected to database')
})