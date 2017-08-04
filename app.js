const express = require('express')
const app = express()
const path = require('path')
const mustacheExpress = require('mustache-express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

mongoose.Promise = require('bluebird');
mongoose.connect('mongodb://localhost:27017/sbMugs');


app.engine('mustache', mustacheExpress());
app.set('views', './views')
app.set('view engine', 'mustache')

app.use(express.static(path.join(__dirname, 'static')))
app.use(bodyParser.urlencoded({ extended: false }))

app.get("/", function(req, res, next){
  res.render("index", {appType:"Starbucks Mugs"})
})

app.post('/', function(req, res){
  console.log('Mug Info: ', req.body);
  res.render("mugs", {id:req.body.id, city:req.body.city, country:req.body.country, edition:req.body.edition, image:req.body.image});
});

app.listen(3000, function(){
  console.log("App running on port 3000")
})
