const 
    express = require("express"),
    router = express.Router(),
    loginUser = require("../../controllers/loginControllers");


router.post("/", loginUser.hundleLoginUser)

module.exports = router