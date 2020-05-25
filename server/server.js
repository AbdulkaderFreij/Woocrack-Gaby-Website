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

/****** Start of selection with condition********/
app.get('/todos', (req, res)=>{
    knex.raw('select * from todos').then((todos)=>{
        res.send(todos.rows);
    })  
});

// OR

/*app.get('/todos', (req, res)=>{
    knex.select().from('todos').then((todos)=>{
        res.send(todos);
    })   
});*/

/****** Start of whole selection********/
app.get('/todos/:id', (req, res)=>{
    const id = req.params.id;
    knex.raw(`select * from todos where id=${id}`).then((todos)=>{
        res.send(todos.rows);
    })   
});

//OR

/*app.get('/todos/:id', (req, res)=>{
    const id = req.params.id;
    knex.select().from('todos').where('id', id).then((todo)=>{
        res.send(todo);
    }) 
});*/
/********End of whole selection (Read)********/

/****** Start of Create********/
/* app.post('/todos', (req,res)=>{
    knex.raw('insert into todos(title,user_id) values(?,?)',['go play some sports','7'])
    .then(()=>{
        knex.select().from('todos')
    .then((todos)=>{
        res.send(todos);
    })
})
})*/

//OR

app.post('/todos', (req,res)=>{
    const {title} = req.query;
    const {user_id} = req.query;
    knex('todos').insert({
        title: title,
        user_id: user_id
    })
    .then((todos)=>{
        res.send(todos);
    })
})
/****** End of Create********/

/****** Start of Update********/
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

/****** End of Update********/

/****** Start of Delete********/
app.delete('/todos/:id', (req,res)=>{
    const id = req.params.id;
    knex('todos').where('id', id).del().then(()=>{
        knex.select().from('todos').then((todos)=>{
            res.send(todos);
        })
    })
})
/****** End of Delete********/

/****** Start of InnerJoin********/
app.get('/todos-of-user/:id', (req,res)=>{
    const id = req.params.id;
    knex.from('todos')
    .innerJoin('users', 'todos.user_id','users.id')
    .where('todos.user_id', id)
    .then((data)=>{res.send(data)})
})  
/****** End of InnerJoin********/

/****** Start of knex populate********/
app.get('/test', (req, res, next)=>{
    knex_populate(knex, 'todos')
    .find()
    .exec()
    .then(results=>{
        res.send(results)
    })
})
/****** End of knex populate********/

app.listen(PORT, () => console.log(`Server running at: http://localhost:${PORT}/`));
