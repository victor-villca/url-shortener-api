const ShortUrl = require('../models/UrlModel');
const createHttpError = require('http-errors');
const shortId = require('shortid');

async function getUrls (req, res, next){
    try {
        const urls = await ShortUrl.find({});
        res.status(200).json(urls)
    } catch (error) {
        res.status(error.status)
        throw new Error(error.message)
    }
}

async function createShortUrl(req, res, next) {
    try {
        const { url } = req.body;
        if (!url) {
            throw createHttpError.BadRequest('Provide a valid URL');
        }
        const urlExists = await ShortUrl.findOne({ url });
        if (urlExists) {
            res.send({ short_url: `${process.env.LINK}/${urlExists.shortId}` })
            return;
        }

        const shortUrl = new ShortUrl({ url: url, shortId: shortId.generate() });
        const result = await shortUrl.save();
        res.send({ short_url: `${process.env.LINK}/${result.shortId}` })
    } catch (error) {
        next(error);
    }
}

module.exports = {
    getUrls, createShortUrl,
}