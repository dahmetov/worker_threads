require('dotenv').config()
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/admin', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    user: process.env.MONGODB_USER,
    pass: process.env.MONGODB_PASS
}).
catch(error => console.log(error));

const UrlSchema = new mongoose.Schema({
    url: {
        type: String,
        max: 255,
    },
    status: {
        type: String,
        default: 'NEW'
    },
    http_code: {
        type: Number,
        default: null,
    },
}, {
    timestamps: true,
});

module.exports = mongoose.model('url', UrlSchema);