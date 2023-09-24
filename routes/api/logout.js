const express = require("express")
const route = express.Router()
const logoutController = require("../../controllers/logoutController")

route.get('/', logoutController.handleLogOut)

module.exports = route