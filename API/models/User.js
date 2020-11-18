const mongoose = require('mongoose');
const UserSchema = mongoose.Schema(
    {
        _id: mongoose.Schema.Types.ObjectId,
        Name: String,
        Email: String,
        Password: String,       
        ID_Num: Number
    });

module.exports = mongoose.model('User', UserSchema);