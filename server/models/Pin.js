const mongoose = require("mongoose");

const PinSchema = new mongoose.Schema({
    pinId: { type: Number, unique: true },
    pinUrl: String,      //이미지 url
    pinCreator: String,  //userEmail || admin
    pinKeyword: String
});

module.exports = mongoose.model('Pin', PinSchema);