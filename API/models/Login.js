const mongoose = require('mongoose');
const LoginSchema = mongoose.Schema(
    {
        _id: mongoose.Schema.Types.ObjectId,
        Email: {
            type: String, 
            required: true, 
            unique: true, 
            match: /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/
        },
        Password: {type: String, required: true}
    });

module.exports = mongoose.model('Login', LoginSchema); 