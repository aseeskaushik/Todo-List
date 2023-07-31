// importing express
const express= require('express');

// defining port
const port= 8000;


// importing database
const db= require('./config/mongoose');

// importing Collection or Todolist
const Todolist= require('./models/todo');

// creating server
const app=express();

// setting up view engine
app.set('view engine','ejs');

// setting up views path
app.set('views','./views');

// middleware to encode form data
app.use(express.urlencoded());

// to access static files
app.use(express.static('assets'));


// controller to get form data
app.post('/todo-form',function(req,res){
    Todolist.create({
        description: req.body.description,
        category: req.body.category,
        duedate: req.body.duedate
    },function(err,newtask){
        if(err){
            console.log('Error in taking form data',err);
            return;
        }
        console.log('Your Task',newtask);
        return res.redirect('back');
    });
});

// controller for deleting tasks
app.get('/delete-contacts', function(req, res) {
    console.log(req.query);
    var id = req.query;

    // to check the number of tasks to be deleted
    var count = Object.keys(id).length;
    for (let i = 0; i < count; i++) {
        //Deleting the task from the database by using their individual ids
        Todolist.findByIdAndDelete(Object.keys(id)[i], function(err) {
            if (err) {
                console.log("Error in deleting the task from DB");
            }
        });
        console.log("Task-Deleted");
    }
    return res.redirect('back');
});

// controller for rendering home page
app.get('/',function(req,res){
    Todolist.find({},function(err,todo){
        if(err){
            console.log('Error in fetching data from database',err);
            return;
        }
        return res.render('home',{
            Todo_list: todo
        });
    }); 
});


// listining the server
app.listen(port,function(err){
    if(err){
        console.log('Error',err);
        return;
    }

    console.log('Express Server is up and running on port:',port);
})