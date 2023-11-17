const express = require('express')
const shortId = require('shortid')
const createHttpError = require('http-errors')
const mongoose = require('mongoose')
const path = require('path')
require('dotenv').config()
const ShortUrl = require('./src/models/UrlModel')
const routerUI = require('./src/routes/UrlRoutes')


const app = express()

const MONGO_CONNECTION = process.env.MONGO_URL
const PORT = process.env.PORT
const LINK = process.env.LINK


app.use(express.static(path.join(__dirname, 'public')))
app.use(express.json())
app.use(express.urlencoded({extended: false}))


app.set('view engine', 'ejs')
app.get('/', (req, res) => res.render('info'))
app.use('/UIshortener', routerUI)


app.use((req, res, next) => {
     next(createHttpError.NotFound())
})

app.use((err, req, res, next) => {
    res.status(err.status  || 500)
    //res.render('index', {error: err.message})
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