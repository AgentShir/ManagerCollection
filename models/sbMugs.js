const mongoose = require('mongoose');

const sbMugsSchema = new mongoose.Schema({
  id: {type: Number},
  city: {type: String},
  country: {type: String},
  edition: {type: String},
  image: {type: String}
})

const sbMugs = mongoose.model('sbMugs', sbMugsSchema);

module.exports = sbMugs;
