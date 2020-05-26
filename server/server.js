const express=require("express");
const cors=require("cors");
const app=express();
app.use(express.urlencoded({extended:true}));
app.use(cors());
const knex=require('./db/knex')
const bodyparser=require('body-parser');
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({extended:false}));
const knex_populate=require('knex-populate');

const PORT=5000;

app.get('/todos', (req, res)=>{
    knex.select().from('todos').then((todos)=>{
        res.send(todos);
    })   
});

app.get('/todos/:id', (req, res)=>{
    const id = req.params.id;
    knex.select().from('todos').where('id', id).then((todo)=>{
        res.send(todo);
    }) 
});

app.post('/todos', (req,res)=>{
    const { title, completed } = req.query;
    knex('todos').insert({
        title: title,
        completed: completed
    })
    .then((todos)=>{
        res.send(todos);
    })
})

app.put('/todos/:id', (req,res)=>{
    const id = req.params.id;
    const { title, completed } = req.query;
    knex('todos').where('id', id)
    .update({
        title: title,
        completed: completed
    })
    .then(()=>{
        knex.select()
        .from('todos')
        .then((todos)=>{
            res.send(todos)
        })
    })
})

app.delete('/todos/:id', (req,res)=>{
    const id = req.params.id;
    knex('todos').where('id', id).del().then(()=>{
        knex.select().from('todos').then((todos)=>{
            res.send(todos);
        })
    })
})

app.get('/test', (req, res, next)=>{
    knex_populate(knex, 'todos')
    .find()
    .exec()
    .then(results=>{
        res.send(results)
    })
})

app.listen(PORT, () => console.log(`Server running at: http://localhost:${PORT}/`));
