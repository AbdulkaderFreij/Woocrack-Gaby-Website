const dotenv =require('dotenv');
dotenv.config();

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

const passport = require('passport');
const passportJWT = require('passport-jwt');
const JwtStrategy = passportJWT.Strategy;
const ExtractJwt = passportJWT.ExtractJwt;
const bookshelf = require('bookshelf');
const securePassword = require('bookshelf-secure-password');
const db = bookshelf(knex);
db.plugin(securePassword)
const jwt = require('jsonwebtoken')

const User = db.Model.extend({
    tableName: 'test_users',
    hasSecurePassword: true
})


const opts = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.SECRET_OR_KEY
};

const strategy = new JwtStrategy(opts, (payload, next) => {
    User.forge({id: payload.id}).fetch().then(res => {
        next(null, res);
    });
})

passport.use(strategy);

app.use(passport.initialize());

const PORT=process.env.PORT || 5000;



app.post('/seedUser', (req, res) => {
    const {email, password} = req.body;
    if(!req.body.email || !req.body.password) {
        return res.status(401).send('no fields')
    }
    const user = new User({
        email: email,
        password: password
    })

    user.save().then(()=> {res.send('ok')})
});

app.get('/protected', passport.authenticate('jwt', {session: false}), (req, res) => {
    res.send('i am protected')
})

app.post('/getToken', (req, res) => {
    const {email, password} = req.body;
    if(!req.body.email || !req.body.password) {
        return res.status(401).send('fields not sent')
    }
    User.forge({ email: email}).fetch().then(result => {
        if (!result) {
            return res.status(400).send('user not found')
        }
        result.authenticate(password).then(user=>{
            const payload = {id: user.id};
            const token = jwt.sign(payload, process.env.SECRET_OR_KEY)
            res.send(token)
        }) .catch(err => {
            return res.status(401).send({err: err})
        })
    })
})

app.get('/getUser' , passport.authenticate('jwt', { session: false}), (req, res)=> {
    res.send(req.user)
})

app.get("/", (req,res)=>{
    res.send('Hello World')
})


const checkAuth = (req, res, next) => {
    try {
      let token = '';
      if (req.body.token) {
        token = req.body.token;
      } else if (req.query.token) {
        token = req.query.token
      }
      const tokenDecodedData = jwt.verify(token, process.env.SECRET_OR_KEY);
      console.log("token",tokenDecodedData)
      next();
    } catch (error) {
      console.log(error.message)
      res.json({
        error: true,
        data: error
      });
    }
  }

app.get('/verify', checkAuth, (req, res, next) => {

    res.json({
      status: 200,
  
    })
  })

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
