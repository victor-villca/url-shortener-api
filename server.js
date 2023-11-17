const express = require('express')
var cors = require('cors')
const shortId = require('shortid')
const createHttpError = require('http-errors')
const mongoose = require('mongoose')
const path = require('path')
require('dotenv').config()
const ShortUrl = require('./src/models/UrlModel')
const routerUI = require('./src/routes/UrlRoutes')
const apiRouter = require('./src/routes/ApiRoutes')


const app = express()

const MONGO_CONNECTION = process.env.MONGO_URL
const PORT = process.env.PORT
const LINK = process.env.LINK

app.use(cors())

app.use(express.static(path.join(__dirname, 'public')))
app.use(express.json())
app.use(express.urlencoded({extended: false}))


app.set('view engine', 'ejs')
app.get('/', (req, res) => res.render('info'))

app.use('/UIshortener', routerUI)
app.use('/api', apiRouter)


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
app.use((req, res, next) => {
     next(createHttpError.NotFound())
})

app.use((err, req, res, next) => {
    res.status(err.status  || 500)
    res.send(err.message)
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