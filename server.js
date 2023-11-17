const express = require('express')
const shortId = require('shortid')
const createHttpError = require('http-errors')
const mongoose = require('mongoose')
const path = require('path')
require('dotenv').config()
const ShortUrl = require('./src/models/UrlModel')


const app = express()

const MONGO_CONNECTION = process.env.MONGO_URL
const PORT = process.env.PORT
const LINK = process.env.LINK


app.use(express.static(path.join(__dirname, 'public')))
app.use(express.json())
app.use(express.urlencoded({extended: false}))


app.set('view engine', 'ejs')

app.get('/', async (req, res, next) => {
    res.render('index')
})

app.get('/:shortId', async (req, res, next) => {
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


})

app.post('/', async(req, res, next) => {
    try {
        const {url} = req.body
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
        res.render('index', 
         {short_url :  `${LINK}/${result.shortId}`}
        )

    } catch (error) {
        next(error)
    }
})

app.use((req, res, next) => {
    next(createHttpError.NotFound())
})

app.use((err, req, res, next) => {
    res.status(err.status  || 500)
    res.render('index', {error: err.message})
})


mongoose.set('strictQuery', false)

mongoose.connect(MONGO_CONNECTION).
then(()=>{
    app.listen(PORT, () => {
        console.log(`API REST | Server started | Port ${PORT}`);
    });      
    console.log('API REST | Database connected on MongoDB Atlas');
}).catch(err => {
    console.log('API REST | Database connection error');
    console.log(err);
});