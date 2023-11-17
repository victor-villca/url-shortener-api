const createHttpError = require('http-errors');
const ShortUrl = require('../models/UrlModel');
const shortId = require('shortid');

async function renderIndex(req, res, next) {
    try {
        res.render('index');
    } catch (error) {
        next(error);
    }
}

async function redirectShortUrl(req, res, next) {
    try {
        const { shortId } = req.params;
        const result = await ShortUrl.findOne({ shortId });
        if (!result) {
            throw createHttpError.NotFound("Short URL does not exist");
        }
        res.redirect(result.url);
    } catch (error) {
        next(error);
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
            res.render('index', { short_url: `${process.env.LINK_UI}/${urlExists.shortId}` });
            return;
        }

        const shortUrl = new ShortUrl({ url: url, shortId: shortId.generate() });
        const result = await shortUrl.save();
        res.render('index', { short_url: `${process.env.LINK_UI}/${result.shortId}` });
    } catch (error) {
        next(error);
    }
}

module.exports = {
    renderIndex,
    redirectShortUrl,
    createShortUrl,
};
