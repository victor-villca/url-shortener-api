require('dotenv').config()
const ShortUrl = require('../models/UrlModel')
const LINK = process.env.LINK_UI


const getUI = async (req, res, next) => {
    res.render('index.ejs')
}
const getUIShortId = async (req, res, next) => {
    try {
        const {shortId }= req.params
        const result = await ShortUrl.findOne({shortId})
        if(!result){
            throw createHttpError.NotFound("Short url does not exists")
        }
        res.redirect(result.url)
    } catch (error) {
        next(error)
        
    }
}

const postUIshort = async (res, req, next) => {
    try {
        const {url} = req.body
        console.log(url)
        if(!url){
            throw createHttpError.BadRequest('Provide a valid url')
        }
        const urlExists = await ShortUrl.findOne({url})
        if(urlExists){
            res.render('index', {short_url :  `${LINK}/${urlExists.shortId}`})
            return
        }

        const shortUrl = new ShortUrl({url: url, shortId: shortId.generate() })
        const result = await shortUrl.save()
    } catch (error) {
        next(error)
    }
}

module.exports = {
    getUI, getUIShortId, postUIshort
}