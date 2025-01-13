const mongoose = require('mongoose');

const dotenv = require('dotenv').config();

const uri=process.env.uri;
const uri1=process.env.URLONLINE;

const { Schema } = mongoose;

mongoose.set('strictQuery', false);
exports.conn = mongoose.connect(uri, {
 useNewUrlParser: true,
 useUnifiedTopology: true,
});
