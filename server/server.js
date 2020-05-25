const express=require("express");
const cors=require("cors");
const app=express();
app.use(express.urlencoded({extended:true}));
app.use(cors());
const knex=require('./db/knex')
const bodyparser=require('body-parser');
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({extended:false}));

const PORT=5000;

app.get('/todos', (req, res)=>{
    knex.raw('select * from todos').then((todos)=>{
        res.send(todos.rows);
    })  
});

// OR

// app.get('/todos', (req, res)=>{
//     knex.select().from('todos').then((todos)=>{
//         res.send(todos);
//     })   
// });


app.get('/todos/:id', (req, res)=>{
    const id = req.params.id;
    knex.raw(`select * from todos where id=${id}`).then((todos)=>{
        res.send(todos.rows);
    })   
});


//OR

// app.get('/todos/:id', (req, res)=>{
//     const id = req.params.id;
//     knex.select().from('todos').where('id', id).then((todo)=>{
//         res.send(todo);
//     }) 
// });

app.listen(PORT, () => console.log(`Server running at: http://localhost:${PORT}/`));
