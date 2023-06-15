const express = require("express")
const { theHindu, indianExpress, hindustanTimes, timesOfIndia, economicTimes } = require("../controllers/newsApiControllers")
const apiRouter = express.Router()

apiRouter.route("/TheHindu").get(theHindu)

apiRouter.route("/IndianExpress").get(indianExpress)

apiRouter.route("/HindustanTimes").get(hindustanTimes)

apiRouter.route("/TimesOfIndia").get(timesOfIndia)

apiRouter.route("/EconomicTimes").get(economicTimes)

module.exports = apiRouter