const express = require("express")
const route = express.Router()
const refreshTokenController = require("../../controllers/refreshTokenController")

route.get('/', refreshTokenController.handleRefreshToken)

module.exports = route