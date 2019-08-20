const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const path = require('path');

const publicPath = path.resolve(__dirname, "public");
app.use(express.static(publicPath));
app.use(bodyParser.urlEncoded({extended: false}));
app.use(bodyParser.json()):
app.set('view engine', 'hbs');

app.get('/', function(req, res)=>{
  res.render('index', params);
});

app.post('/', function(req, res)=>{

  res.redirect('/');
});
