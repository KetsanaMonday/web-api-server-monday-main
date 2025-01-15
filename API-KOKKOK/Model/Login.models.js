
const mongoose = require('mongoose');
const Schema = new mongoose.Schema({
    MemberID:String,
    MemberPassword:String,
    LoginKey:String,
    created_date:{type:Date},
    updated_date:{type:Date}
});
module.exports = mongoose.model('MemberLogin',Schema);