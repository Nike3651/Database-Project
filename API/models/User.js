const mongoose = require('mongoose');
const UserSchema = mongoose.Schema(
    {
        _id: mongoose.Schema.Types.ObjectId,
        Name: {type: String, required: true},
        Email: {type: String, required: true},
        Password: {type: String, required: true},       
        ID_Num: {type: Number, required: true}
    });

module.exports = mongoose.model('User', UserSchema); 