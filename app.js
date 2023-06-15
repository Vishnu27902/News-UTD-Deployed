require("dotenv").config()
const express = require("express")
const path = require("path")
const mongoose = require("mongoose")
const expressSession = require("express-session")
const cors = require("cors")
const { PORT } = process.env || 5000
const { MONGO_ATLAS_URI } = process.env
const { SESSION_SECRET } = process.env
const app = express()
const homeRouter = require("./routes/homeRoutes")
const apiRouter = require("./routes/apiRoutes")
const connectDb = require("./database/dbConnection")
const verifyJWT = require("./middleware/verifyJWT")

connectDb(MONGO_ATLAS_URI)

app.use(cors({ origin: true }))
app.use(expressSession({
    secret: SESSION_SECRET,
    resave: false,
    saveUninitialized: true
}))
app.use(express.urlencoded({ extended: false }), express.json())

app.use("/home", express.static(path.join(__dirname, "public")), homeRouter)
app.use("/news/api/:key", verifyJWT, apiRouter)

function errFunction(req, res) {
    res.status(404).send("<h1>Error 404 : Resource Not Found</h1>")
}

app.use("*", errFunction)

mongoose.connection.on("open", () => {
    app.listen(PORT, () => {
        console.log(`Server listening to Port 5000.. http://localhost:${PORT}/home`)
    })
})