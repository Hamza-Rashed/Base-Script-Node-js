const 
    express = require("express"),
    router = express.Router(),
    registerControllers = require("../../controllers/registerControllers")
    path = require("path");


router.get('/registerPage', (req, res) => {
    res.sendFile(path.join(__dirname, "..", "..", "views","subRoot","register","register.html"))
})

router.post("/" , registerControllers.handleNewRegister)




module.exports = router