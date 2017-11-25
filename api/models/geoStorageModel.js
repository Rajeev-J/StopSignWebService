'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var SignSchema = new Schema({
    name: String,
    loc: {
        type: [Number],
        index: '2d'
    }
});

SignSchema.index({
    "loc": "2dsphere"
});

module.exports = mongoose.model('Sign', SignSchema);