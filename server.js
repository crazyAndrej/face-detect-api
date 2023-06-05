const express = require('express');
const bcrypt = require('bcrypt-node');
const cors = require('cors');

const register = require('./controllers/register');
const signin = require('./controllers/signin');
const profile = require('./controllers/profile');
const image = require('./controllers/image');

const knex = require('knex');

process.env.NODE_TLS_REJECT_UNAUTHORIZED = 0

const db = knex({
  // connect to your own database here:
  client: 'pg',
  connection: {
    host : '127.0.0.1',
    user : 'andrejs lukasevics',
    password : '',
    database : 'face-detect'
  }
});

const app = express();
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: false }));

app.get('/', (req, res) => {
  res.send('it`s working');
});
app.post('/signin', signin.handleSignin(db, bcrypt));
app.post('/register', (req, res) => {
  register.handleRegister(req, res, db, bcrypt);
});
app.get('/profile/:id', (req, res) => {
  profile.handleProfileGet(req, res, db);
});
app.put('/image', (req, res) => {
  image.handleImage(req, res, db);
});
app.post('/imageurl', (req, res) => {
  image.handleApiCall(req, res);
});

app.listen(3000, ()=> {
  console.log('app is running on port 3000');
})

/*
/-->res = this is working
/signIn --> POST = success/fail
/register --> POST = user
/profile/:userId --> GET = user
/image --> PUT --> user


*/
