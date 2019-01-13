'use strict';

const mongoose = require('mongoose');

const tileSchema = mongoose.Schema({
  title: {
    type: String,
    required: true,
    unique: true,
  },
  customNote: {
    type: String,
    required: false,
    unique: false,
  },
  checkList: {
    type: Object,
    require: false,
    unique: false,
  },
  activeApi: {
    type: Object,
    required: false,
    unique: true,
  },
});

module.exports = mongoose.model('tile', tileSchema);
