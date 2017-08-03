const express = require('express')
const app = express()
const path = require('path')
const mustacheExpress = require('mustache-express');
const mongoose = require('mongoose');

mongoose.Promise = require('bluebird');
mongoose.connect('mongodb://localhost:27017/sbMugs');


app.engine('mustache', mustacheExpress());
app.set('views', './views')
app.set('view engine', 'mustache')

app.use(express.static(path.join(__dirname, 'static')))

app.get("/", function(req, res, next){
  res.render("index", {appType:"Express"})
})

app.listen(3000, function(){
  console.log("App running on port 3000")
})
