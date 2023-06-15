const express = require("express")
const { homeFileGetter, loginFileGetter, registerFileGetter, registerPostController, loginPostController, generateApiKeyController, NewsAPIFileGetter, getApiKey, logoutController } = require("../controllers/homeControllers")
const homeRouter = express.Router()

homeRouter.route("/").get(homeFileGetter)

homeRouter.route("/login").get(loginFileGetter).post(loginPostController)

homeRouter.route("/apiKey").get(getApiKey)

homeRouter.route("/NewsAPI").get(NewsAPIFileGetter)

homeRouter.route("/newApiKey").get(generateApiKeyController)

homeRouter.route("/register").get(registerFileGetter).post(registerPostController)

homeRouter.route("/logout").get(logoutController)

module.exports = homeRouter