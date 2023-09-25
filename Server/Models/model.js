const mongoose = require('mongoose');

const DataSchema = new mongoose.Schema({
  men:{
    type:Number,
    required: true
  },
  women:{
    type:Number,
    required: true
  },
  boys:{
    type:Number,
    required: true
  },
  girls:{
    type:Number,
    required: true
  }
})

module.exports = mongoose.model('dataset', DataSchema);