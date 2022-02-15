const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    userEmail: String,
    userSavedPins: [Object],
    userCreatedPins: [Object]
});

module.exports = mongoose.model('User', UserSchema);