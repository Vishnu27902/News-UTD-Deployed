const mongoose = require("mongoose")

const connectDb = async (connectionString) => {
    mongoose.connect(connectionString).then(() => {
        console.log("Database Connection Established")
    }).catch((err) => {
        console.log(err.message)
    })
}

module.exports = connectDb