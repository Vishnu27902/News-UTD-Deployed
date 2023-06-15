const path = require("path")
const userModel = require("../models/userModel")
const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")
const publicPath = path.join(__dirname, "..", "public")

const homeFileGetter = (req, res) => {
    res.sendFile(path.join(publicPath, "home.html"))
}

const loginFileGetter = (req, res) => {
    res.sendFile(path.join(publicPath, "login.html"))
}

const registerFileGetter = (req, res) => {
    res.sendFile(path.join(publicPath, "register.html"))
}

const NewsAPIFileGetter = (req, res) => {
    res.sendFile(path.join(publicPath, "NewsAPI.html"))
}

const loginPostController = async (req, res) => {
    let { email, password } = req.body
    email = email.toLowerCase()
    const userData = await userModel.findOne({ _id: email })
    if (!userData) {
        console.log("Email ID doesn't exist")
        res.status(200).json({ success: false, message: "Invalid Email or Password" })
        return
    }
    const passwordCheck = await bcrypt.compare(password, userData.password)
    if (passwordCheck) {
        let session = req.session
        session.username = userData.username
        session.email = userData._id
        const apiKey = userData.apiKey
        if (apiKey) {
            jwt.verify(apiKey, process.env.API_SECRET, async (err, data) => {
                if (err) {
                    console.log(err.message)
                    await userModel.updateOne({ _id: email }, { $unset: { apiKey: 1 } })
                    res.status(200).json({ success: true, message: "Token Expired" })
                    return
                }
                session.apiKey = apiKey
                res.status(200).json({ success: true, message: "Old API Key is valid" })
            })
        } else {
            let token = jwt.sign({ username: userData.username, email: email }, process.env.API_SECRET, { expiresIn: "1d" })
            await userModel.updateOne({ _id: email }, { $set: { apiKey: token } })
            session.apiKey = token
            console.log(`User ${userData.username} logged in`)
            res.status(200).json({ success: true, message: "Login Successful" })
        }
    } else {
        console.log("Incorrect Password")
        res.status(200).json({ success: false, message: "Invalid Email or Password" })
    }
}

const registerPostController = async (req, res) => {
    let { username, email, password, phnumber } = req.body
    username = username.charAt(0).toUpperCase() + username.slice(1).toLowerCase()
    email = email.toLowerCase()
    const duplicateData = await userModel.findOne({ _id: email, phnumber: phnumber }).exec()
    if (duplicateData) {
        console.log("Email ID or Phone Number Already Exists")
        res.status(200).json({ success: false, message: "Email or Phone Number Already Exists" })
        return
    }
    password = await bcrypt.hash(password, 10)
    await userModel.create({ username: username, _id: email, password: password, phnumber: phnumber }).then(() => {
        console.log("New User Created")
        res.status(200).json({ success: true, message: `New User ${username} registered Successfully` })
    }).catch((err) => {
        console.log("Error Occurred")
        res.status(200).json({ success: false, message: `Error Occurred : ${err.message}` })
    })
}

const getApiKey = async (req, res) => {
    const session = req.session
    if (session.apiKey) {
        jwt.verify(session.apiKey,process.env.API_SECRET,(err,data)=>{
            if(err){
                res.status(200).json({ success: false, username: session.username, message:err.message })
                return
            }
            res.status(200).json({ success: true, apiKey: session.apiKey, username: session.username })
        })
    } else {
        res.status(200).json({ success: false, username: session.username })
    }
}

const generateApiKeyController = async (req, res) => {
    const { username, email } = req.session
    const session=req.session
    const apiKey = jwt.sign({ username, email }, process.env.API_SECRET, { expiresIn: '1d' })
    session.apiKey=apiKey
    await userModel.updateOne({ _id: email }, { $set: { apiKey: apiKey } })
    res.status(200).json({ success: true, message: "New API Key Generated", apiKey: apiKey })
}

const logoutController=async(req,res)=>{
    req.session.destroy()
    res.status(301).redirect("/home")
}

module.exports = { homeFileGetter, loginFileGetter, registerFileGetter, loginPostController, registerPostController, generateApiKeyController, NewsAPIFileGetter, getApiKey,logoutController }