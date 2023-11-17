const express = require('express')
const {getUI, getUIShortId, postUIshort} = require('../controllers/UrlUIControllers')

const urlUIRouter = express.Router();
urlUIRouter.get("/", getUI)
urlUIRouter.get("/:id", getUIShortId)
urlUIRouter.post("/", postUIshort)

module.exports = urlUIRouter