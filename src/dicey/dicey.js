const express = require('express');
const app = express();
const path = require('path');
const bodyParser = require('body-parser');
const fs = require('fs');

const publicPath = path.resolve(__dirname, "public");
app.use(express.static(publicPath));
app.use(bodyParser.urlencoded({extended: false}));
app.set('view engine', 'hbs');

var contents = fs.readFileSync('words').toString();

var lookUp = {};
contents.split("\n").map((x)=>x.split("\t")).forEach((arr)=>{lookUp[parseInt(arr[0])] = arr[1];});
app.get('/', function(req, res){
  res.redirect('/dice');
});

app.get('/dice', function(req, res){
  let params = {hasPhrase: false}
  if(req.query.number && req.query.separator){
    console.log(req.query);
    params.phrases = getPhrase(req.query.number, req.query.separator);
    params.hasPhrase = true;
  }
  res.render('index', params);
});

app.get('/about', function(req, res){
  res.render('about');
});

app.get('/css/base.css', function(req, res){
  res.sendFile("css/base.css");
});

function getPhrase(number, separator){
  let arr = [];
  [...new Array(parseInt(number))].forEach(()=>{
    arr.push(phrase());
  });
  let phra = arr.map((x)=>{return x[1];}).join(separator);
  let ret = {"arr":arr, "phrase": phra};
  return ret;
}
function phrase(){
  let s = "";
  [...new Array(5)].forEach(()=>{
    s += (Math.floor(Math.random()*5)+1);
  });
  s = parseInt(s);
  return [s, lookUp[s]];
}
app.listen(8080);
