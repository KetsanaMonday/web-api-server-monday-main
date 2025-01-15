"use strict";

var mongoose = require('mongoose');

var dotenv = require('dotenv').config();

var uri = process.env.uri;
var uri1 = process.env.URLONLINE;
var uri2 = process.env.URLMONGODB;
var uri3 = process.env.URLDATABASE;
var url = process.env.UrlDatabase;
var Schema = mongoose.Schema;
var uri55 = "mongodb+srv://admin:To77977441@cluster0.twcai.mongodb.net/WhatTeach?retryWrites=true&w=majority&appName=Cluster0";
mongoose.set('strictQuery', true); // const app = new mongoose.connect('mongodb+srv://admin:To77977441@cluster0.twcai.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0', {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//    });

var options = {
  useNewUrlParser: true,
  useUnifiedTopology: true
};
var app = new mongoose.connect(uri55, options);
exports.conn = app;