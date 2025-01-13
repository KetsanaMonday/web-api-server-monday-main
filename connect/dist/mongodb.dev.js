"use strict";

var mongoose = require('mongoose');

var dotenv = require('dotenv').config();

var uri = process.env.uri;
var uri1 = process.env.URLONLINE;
var Schema = mongoose.Schema;
mongoose.set('strictQuery', false);
exports.conn = mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});