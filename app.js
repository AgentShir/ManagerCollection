const express = require('express')
const app = express()
const path = require('path')
const mustacheExpress = require('mustache-express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

app.engine('mustache', mustacheExpress());
app.set('views', './views')
app.set('view engine', 'mustache')

app.use(express.static(path.join(__dirname, 'static')))
app.use(bodyParser.urlencoded({ extended: false }))

app.get("/", function(req, res, next){
  res.render("index", {appType:"Starbucks Mugs"})
})

app.post('/mugs', function(req, res){
  console.log('Mug Info: ', req.body);

  var data = {
    id:req.body.id,
    city:req.body.city,
    country:req.body.country,
    edition:req.body.edition,
    image:req.body.image
  };

  sbMugsModel.createsbMug(data, function(sbMugs) {
    if (sbMugs) {
      var model = {
        appType: "Mug Added",
        sbMugs: sbMugs
      }
      res.render("sbMugs", model);
    }
    else {
      res.redirect("/");
    }
  });

  res.render("mugs", {id:req.body.id,
    city:req.body.city,
    country:req.body.country,
    edition:req.body.edition,
    image:req.body.image});

  });



app.listen(3000, function(){
  console.log("App running on port 3000")
})
