require("dotenv").config()

// The port value . You can update it from .env file PORT variable
let PORT = process.env.PORT

// Database connect .. You can update it from .env file DATABASE variable
let DATABASE = process.env.DATABASE



module.exports = {PORT, DATABASE}