const mongoose = require('mongoose')
const Schema = mongoose.Schema

const shortUrlSchema =  new Schema (
    {
        url : {
            type: String,
            required: true,
        },
        shortId  : {
            type : String,
            required : true,
        }
    },
    {
        timestamps: true,
    }
)
const ShortUrl = mongoose.model('ShortUrl', shortUrlSchema);
module.exports = ShortUrl;