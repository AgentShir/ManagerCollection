const mongoose = require('mongoose');

mongoose.Promise = require('bluebird');
mongoose.connect('mongodb://localhost:27017/sbMugs');

const sbMugsSchema = new mongoose.Schema({
  id: {type: Number},
  city: {type: String},
  country: {type: String},
  edition: {type: String},
  image: {type: String}
})

const sbMugs = mongoose.model('sbMugs', sbMugsSchema);

// function getAllSmurfs(callback) {
//   SmurfModel.findMany({})
//     .then(function(smurfs) {
//       callback(smurfs);
//     })
//     .catch(function(error) {
//       console.log("error", error);
//       callback(null);
//     })
// }

module.exports = sbMugs;
