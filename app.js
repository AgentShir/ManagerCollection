const express = require('express')
const app = express()
const path = require('path')
const mustacheExpress = require('mustache-express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

mongoose.Promise = require('bluebird');
mongoose.connect('mongodb://localhost:27017/sbMugs');



var sbMugsModel = require('./models/sbMugs');

app.engine('mustache', mustacheExpress());
app.set('views', './views')
app.set('view engine', 'mustache')

app.use(express.static(path.join(__dirname, 'static')))
app.use(bodyParser.urlencoded({ extended: false }))

app.get("/", function(req, res, next){
  res.render("index", {appType:"Starbucks Mugs"})
})

app.get("/allMugs", function(req, res, next){
    sbMugsModel.getAllMugs(function(searchResults){
      res.render('mugs', {
        mug: searchResults,
        appType: "All the Mugs"
      });
    });
})

app.post('/mugs', function(req, res){
  console.log('Mug Info: ', req.body);

  var data = {
    city:req.body.city,
    country:req.body.country,
    edition:req.body.edition,
    image:req.body.image
  };

  sbMugsModel.createMug(data, function(mug) {
      if (mug) {
        var model = {
          appType: "Mug Added",
          mug: mug
        }
        res.render("mugs", model);
      }
      else {
        res.redirect("/");
      }
  });
});

app.get("/delete/:id", function(req, res, next){
    sbMugsModel.deleteMug(req.params.id, function(mug) {
      res.render("mugs", mug);
    });
});

app.post("/edit/:id", function(req, res, next){

  var data = {
    city:req.body.city,
    country:req.body.country,
    edition:req.body.edition,
    image:req.body.image
  };
    console.log(data);
    sbMugsModel.editMug(req.params.id, data, null, function(mug){
      res.render("mugs", mug);
    });
});

app.get("/edit/:id", function(req, res, next){
  var model = {
    appType: "Edit the Mug Info",
    id: req.params.id
  }
  res.render("edit", model);

});

app.listen(3000, function(){
  console.log("App running on port 3000")
})
