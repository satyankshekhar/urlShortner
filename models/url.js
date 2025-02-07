const mongoose = require('mongoose')

const urlSchema = mongoose.Schema({
    redirectUrl: {
        type: String,
        unique: true,
        required: true
    },
    shortedUrl: {
        type: String,
        unique: true,
        required: true
    }
});

const urlModel = mongoose.model('ckn', urlSchema);
module.exports = urlModel;