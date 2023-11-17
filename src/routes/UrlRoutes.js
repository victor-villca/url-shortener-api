const express = require('express');
const uiController = require('../controllers/UrlUIControllers')

const routerUI = express.Router();

routerUI.get('/', uiController.renderIndex);
routerUI.get('/:shortId', uiController.redirectShortUrl);
routerUI.post('/', uiController.createShortUrl);

module.exports = routerUI;
