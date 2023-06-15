const jwt = require("jsonwebtoken")

const verifyJWT = (req, res, next) => {
    const { key } = req.params
    jwt.verify(key, process.env.API_SECRET, (err, data) => {
        if (err) {
            console.log("Invalid Token or Token Expired")
            res.status(200).json({ success: false, message: err.message.includes("expired") ? "API Key Expired" : "Invalid API Key" })
            return
        }
        const { username, email } = data
        console.log(`${username} used the API Key with email ID : ${email}`)
        next()
    })
}

module.exports = verifyJWT