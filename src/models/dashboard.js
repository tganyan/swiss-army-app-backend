'use strict';

const mongoose = require('mongoose');

const dashboardSchema = mongoose.Schema({
  title: {
    type: String,
    required: true,
    unique: true,
  },
  tiles: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'tile',
    },
  ],
},
{
  usePushEach: true,
});

module.exports = mongoose.model('dashboard', dashboardSchema);
