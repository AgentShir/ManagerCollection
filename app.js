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
        appType: "Here's Your Mug Collection"
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

    var queryObject = {"_id": req.params.id};

    sbMugsModel.sbMugs.findOne(queryObject)
      .then(function(mug) {
        mug.active = false;

        mug.save()
          .then(function() {
            res.redirect('/allmugs');
          })
          .catch(function(error) {
            console.log(error)
            res.redirect('/');
          })
      });
});

app.get("/edit/mug/:id", function(req, res){
  var id = req.params.id;
  var query ={"_id": id};
  sbMugsModel.sbMugs.findOne(query)
    .then(function(mug){
      res.render('edit', mug);
    })
    .catch(function(error){
      console.log("Collection! Show thyself!", error);
    })
});

app.post("/submit/mug", function(req, res){

  var data = {};
  data._id = req.body._id;
  data.city = req.body.city;
  data.country = req.body.country;
  data.edition = req.body.edition;
  data.image = req.body.image;
  console.log(data);

  var queryObject = {"_id": data._id};

  sbMugsModel.sbMugs.findOne(queryObject)
    .then(function(mug) {
      mug.city = data.city;
      mug.country = data.country;
      mug.edition = data.edition;
      mug.image = data.image;

      mug.save()
        .then(function() {
          res.redirect('/allmugs');
        })
        .catch(function(error) {
          console.log(error)
          res.redirect('/');
        })
    });
});

app.listen(3000, function(){
  console.log("App running on port 3000")
})
