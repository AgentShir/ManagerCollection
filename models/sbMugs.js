const mongoose = require('mongoose');
mongoose.Promise = require('bluebird');

const url = "mongodb://localhost:27017/sbMugs";
mongoose.createConnection(url);

const sbMugsSchema = new mongoose.Schema({
  city: {type: String},
  country: {type: String},
  edition: {type: String},
  image: {type: String},
  active: {type: Boolean, default: true}
})

const sbMugs = mongoose.model('sbMugs', sbMugsSchema);

function getAllMugs(callback) {
  sbMugs.find({"active": true})
    .then(function(mugs) {
      callback(mugs);
    })
    .catch(function(error) {
      console.log("error", error);
      callback(null);
    })
}

function createMug(data, callback) {

  var mug = new sbMugs(data);

  mug.save()
    .then(function() {
      callback(mug);
    })
    .catch(function(error) {
      console.log("Whoops, it did not save", error);
      callback();
    })
}

function deleteMug(data, callback) {

  var mug = new sbMugs({_id: data});

  sbMugs.remove(mug)
    .then(function() {
      callback(mug);
    })
    .catch(function(error) {
      console.log("Whoops!", error);
      callback();
    })
}

function editMug(id, data) {
  var mug = new sbMugs({_id: id});
  console.log('But does it work');
  sbMugs.update(data, mug).then(function() {
      })
      .catch(function(error) {
        console.log("Whoops!", error);
      })

  console.log('I might have broken it');
}

module.exports = {
  getAllMugs: getAllMugs,
  createMug: createMug,
  sbMugs: sbMugs,
  deleteMug: deleteMug,
  editMug: editMug
}

var myMug = new sbMugs({city: "Washington DC", country: "USA", edition: "13 You Are Here Series", image: "http://fredorange.com/files/mugs/3142/image.jpg"});
console.log(myMug.toObject());
