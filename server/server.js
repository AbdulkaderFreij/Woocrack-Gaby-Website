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

<<<<<<< HEAD
const PORT=5000;
/******************  todo table  **************** */
=======
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

>>>>>>> a7d4643a9e14e7e2c1e99d2f8eee928343bb562f
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

/******************  ngos table  **************** */

app.get('/ngos', (req, res)=>{
    knex.select().from('ngos').then((ngos)=>{
        res.send(ngos);
    })   
});

app.get('/ngos/:id', (req, res)=>{
    const id = req.params.id;
    knex.select().from('ngos').where('id', id).then((ngos)=>{
        res.send(ngos);
    }) 
});

app.post('/ngos', (req,res)=>{
    const { name, ngo_name, email, phone, certified_image } = req.query;
    knex('ngos').insert({
        name: name,
        ngo_name: ngo_name,
        email: email,
        phone: phone,
        certified_image: certified_image
    })
    .then((ngos)=>{
        res.send(ngos);
    })
})

app.put('/ngos/:id', (req,res)=>{
    const id = req.params.id;
    const { name, ngo_name, email, phone, certified_image } = req.query;
    knex('ngos').where('id', id)
    .update({
        name: name,
        ngo_name: ngo_name,
        email: email,
        phone: phone,
        certified_image: certified_image
    })
    .then(()=>{
        knex.select()
        .from('ngos')
        .then((ngos)=>{
            res.send(ngos)
        })
    })
})

app.delete('/ngos/:id', (req,res)=>{
    const id = req.params.id;
    knex('ngos').where('id', id).del().then(()=>{
        knex.select().from('ngos').then((ngos)=>{
            res.send(ngos);
        })
    })
})

/******************  videos_tracking table  **************** */

app.get('/videos_tracking', (req, res)=>{
    knex.select().from('videos_tracking').then((videos_tracking)=>{
        res.send(videos_tracking);
    })   
});

app.get('/videos_tracking/:id', (req, res)=>{
    const id = req.params.id;
    knex.select().from('videos_tracking').where('id', id).then((videos_tracking)=>{
        res.send(videos_tracking);
    }) 
});

app.post('/videos_tracking', (req,res)=>{
    const {email, count } = req.query;
    knex('videos_tracking').insert({
        email: email,
        count: count,
    })
    .then((videos_tracking)=>{
        res.send(videos_tracking);
    })
})

app.put('/videos_tracking/:id', (req,res)=>{
    const id = req.params.id;
    const {email, count} = req.query;
    knex('videos_tracking').where('id', id)
    .update({
        email: email,
        count: count,
    })
    .then(()=>{
        knex.select()
        .from('videos_tracking')
        .then((videos_tracking)=>{
            res.send(videos_tracking)
        })
    })
})

app.delete('/videos_tracking/:id', (req,res)=>{
    const id = req.params.id;
    knex('videos_tracking').where('id', id).del().then(()=>{
        knex.select().from('videos_tracking').then((videos_tracking)=>{
            res.send(videos_tracking);
        })
    })
})

/******************  users table  **************** */

app.get('/users', (req, res)=>{
    knex.select().from('users').then((users)=>{
        res.send(users);
    })   
});

app.get('/users/:id', (req, res)=>{
    const id = req.params.id;
    knex.select().from('users').where('id', id).then((users)=>{
        res.send(users);
    }) 
});

app.post('/users', (req,res)=>{
    const {name, email, password, left_update, licence_key } = req.query;
    knex('users').insert({
        name: name,
        email: email,
        password: password,
        left_update: left_update,
        licence_key: licence_key
    })
    .then((users)=>{
        res.send(users);
    })
})

app.put('/users/:id', (req,res)=>{
    const id = req.params.id;
    const {name, email, password, left_update, licence_key} = req.query;
    knex('users').where('id', id)
    .update({
        name: name,
        email: email,
        password: password,
        left_update: left_update,
        licence_key: licence_key
    })
    .then(()=>{
        knex.select()
        .from('users')
        .then((users)=>{
            res.send(users)
        })
    })
})

app.delete('/users/:id', (req,res)=>{
    const id = req.params.id;
    knex('users').where('id', id).del().then(()=>{
        knex.select().from('users').then((users)=>{
            res.send(users);
        })
    })
})

/******************  packages table  **************** */

app.get('/packages', (req, res)=>{
    knex.select().from('packages').then((packages)=>{
        res.send(packages);
    })   
});

app.get('/packages/:id', (req, res)=>{
    const id = req.params.id;
    knex.select().from('packages').where('id', id).then((packages)=>{
        res.send(packages);
    }) 
});

app.post('/packages', (req,res)=>{
    const {updates, interval, video } = req.query;
    knex('packages').insert({
        updates: updates,
        interval: interval,
        video: video,
    })
    .then((packages)=>{
        res.send(packages);
    })
})

app.put('/packages/:id', (req,res)=>{
    const id = req.params.id;
    const {updates, interval, video} = req.query;
    knex('packages').where('id', id)
    .update({
        updates: updates,
        interval: interval,
        video: video,
    })
    .then(()=>{
        knex.select()
        .from('packages')
        .then((packages)=>{
            res.send(packages)
        })
    })
})

app.delete('/packages/:id', (req,res)=>{
    const id = req.params.id;
    knex('packages').where('id', id).del().then(()=>{
        knex.select().from('packages').then((packages)=>{
            res.send(packages);
        })
    })
})

/******************  packages_users table  **************** */

app.get('/packages_users', (req, res)=>{
    knex.select().from('packages_users').then((users_packages)=>{
        res.send(users_packages);
    })   
});

app.get('/packages_users/:id', (req, res)=>{
    const id = req.params.id;
    knex.select().from('packages_users').where('id', id).then((packages_users)=>{
        res.send(packages_users);
    }) 
});

app.post('/packages_users', (req,res)=>{
    const {active, package_id, user_id} = req.query;
    knex('packages_users').insert({
        active: active,
        package_id: package_id,
        user_id: user_id
    })
    .then((packages_users)=>{
        res.send(packages_users);
    })
})

app.put('/packages_users/:id', (req,res)=>{
    const id = req.params.id;
    const {active, package_id, user_id} = req.query;
    knex('packages_users').where('id', id)
    .update({
        active: active,
        package_id: package_id,
        user_id: user_id,
    })
    .then(()=>{
        knex.select()
        .from('packages_users')
        .then((packages_users)=>{
            res.send(packages_users)
        })
    })
})

app.delete('/packages_users/:id', (req,res)=>{
    const id = req.params.id;
    knex('packages_users').where('id', id).del().then(()=>{
        knex.select().from('packages_users')
        .then((packages_users)=>{
            res.send(packages_users);
        })
    })
})

/******************  products table  **************** */

app.get('/products', (req, res)=>{
    knex.select().from('products').then((products)=>{
        res.send(products);
    })   
});

app.get('/products/:id', (req, res)=>{
    const id = req.params.id;
    knex.select().from('products').where('id', id).then((products)=>{
        res.send(products);
    }) 
});

app.post('/products', (req,res)=>{
    const {type, link } = req.query;
    knex('products').insert({
        type: type,
        link: link,
    })
    .then((products)=>{
        res.send(products);
    })
})

app.put('/products/:id', (req,res)=>{
    const id = req.params.id;
    const {type, link} = req.query;
    knex('products').where('id', id)
    .update({
        type: type,
        link: link,
    })
    .then(()=>{
        knex.select()
        .from('products')
        .then((products)=>{
            res.send(products)
        })
    })
})

app.delete('/products/:id', (req,res)=>{
    const id = req.params.id;
    knex('products').where('id', id).del().then(()=>{
        knex.select().from('products')
        .then((products)=>{
            res.send(products);
        })
    })
})

/******************  categories table  **************** */

app.get('/categories', (req, res)=>{
    knex.select().from('categories').then((categories)=>{
        res.send(categories);
    })   
});

app.get('/categories/:id', (req, res)=>{
    const id = req.params.id;
    knex.select().from('categories').where('id', id).then((categories)=>{
        res.send(categories);
    }) 
});

app.post('/categories', (req,res)=>{
    const {name } = req.query;
    knex('categories').insert({
        name: name,
    })
    .then((categories)=>{
        res.send(categories);
    })
})

app.put('/categories/:id', (req,res)=>{
    const id = req.params.id;
    const {name} = req.query;
    knex('categories').where('id', id)
    .update({
        name: name,
    })
    .then(()=>{
        knex.select()
        .from('categories')
        .then((categories)=>{
            res.send(categories)
        })
    })
})

app.delete('/categories/:id', (req,res)=>{
    const id = req.params.id;
    knex('categories').where('id', id).del().then(()=>{
        knex.select().from('categories')
        .then((categories)=>{
            res.send(categories);
        })
    })
})

/******************  categories_products table  **************** */

app.get('/categories_products', (req, res)=>{
    knex.select().from('categories_products').then((categories_products)=>{
        res.send(categories_products);
    })   
});

app.get('/categories_products/:id', (req, res)=>{
    const id = req.params.id;
    knex.select().from('categories_products').where('id', id).then((categories_products)=>{
        res.send(categories_products);
    }) 
});

app.post('/categories_products', (req,res)=>{
    const {product_id, category_id } = req.query;
    knex('categories_products').insert({
        product_id: product_id,
        category_id: category_id,
    })
    .then((categories_products)=>{
        res.send(categories_products);
    })
})

app.put('/categories_products/:id', (req,res)=>{
    const id = req.params.id;
    const {category_id, product_id} = req.query;
    knex('categories_products').where('id', id)
    .update({
        category_id: category_id,
        product_id: product_id,
    })
    .then(()=>{
        knex.select()
        .from('categories_products')
        .then((categories_products)=>{
            res.send(categories_products)
        })
    })
})

app.delete('/categories_products/:id', (req,res)=>{
    const id = req.params.id;
    knex('categories_products').where('id', id).del().then(()=>{
        knex.select().from('categories_products')
        .then((categories_products)=>{
            res.send(categories_products);
        })
    })
})

/******************  products_versions table  **************** */

app.get('/products_versions', (req, res)=>{
    knex.select().from('products_versions').then((products_versions)=>{
        res.send(products_versions);
    })   
});

app.get('/products_versions/:id', (req, res)=>{
    const id = req.params.id;
    knex.select().from('products_versions').where('id', id).then((products_versions)=>{
        res.send(products_versions);
    }) 
});

app.post('/products_versions', (req,res)=>{
    const {version, download_path, product_id } = req.query;
    knex('products_versions').insert({
        version: version,
        download_path: download_path,
        product_id: product_id
    })
    .then((products_versions)=>{
        res.send(products_versions);
    })
})

app.put('/products_versions/:id', (req,res)=>{
    const id = req.params.id;
    const {version, download_path, product_id} = req.query;
    knex('products_versions').where('id', id)
    .update({
        version: version,
        download_path: download_path,
        product_id: product_id
    })
    .then(()=>{
        knex.select()
        .from('products_versions')
        .then((products_versions)=>{
            res.send(products_versions)
        })
    })
})

app.delete('/products_versions/:id', (req,res)=>{
    const id = req.params.id;
    knex('products_versions').where('id', id).del().then(()=>{
        knex.select().from('products_versions')
        .then((products_versions)=>{
            res.send(products_versions);
        })
    })
})



app.listen(PORT, () => console.log(`Server running at: http://localhost:${PORT}/`));
