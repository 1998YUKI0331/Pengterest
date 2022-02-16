const mongoose = require("mongoose");

const FamousSchema = new mongoose.Schema({
    pinUrl: String,      //이미지 url
    pinKeyword: String
});

module.exports = mongoose.model('Famous', FamousSchema);