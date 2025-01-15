const mongoose = require('mongoose');
const dotenv = require('dotenv').config();

const uri=process.env.uri;
const uri1=process.env.URLONLINE;
const uri2=process.env.URLMONGODB;
const uri3=process.env.URLDATABASE;
const url=process.env.UrlDatabase;
const { Schema } = mongoose;
const uri55 = "mongodb+srv://admin:To77977441@cluster0.twcai.mongodb.net/WhatTeach?retryWrites=true&w=majority&appName=Cluster0";


mongoose.set('strictQuery', true);
// const app = new mongoose.connect('mongodb+srv://admin:To77977441@cluster0.twcai.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0', {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//    });
const options={
    useNewUrlParser: true,
    useUnifiedTopology: true,
}
const app = new mongoose.connect(uri55, options);
exports.conn= app;