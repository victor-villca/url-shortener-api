const express = require('express')
const apiController = require('../controllers/APiController')

const apiRouter = express.Router();

apiRouter.get('/' , apiController.getUrls);
apiRouter.post('/', apiController.createShortUrl)

module.exports=apiRouter;