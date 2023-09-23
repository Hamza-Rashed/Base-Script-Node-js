require("dotenv").config();

const jwt = require("jsonwebtoken");
const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET;

let verfiedJWT = (req, res, next) => {
    let authHeader = req.headers['authorization']
    if(!authHeader) return res.sendStatus(401);
    let token = authHeader.split(" ")[1]

    jwt.verify(
        token,
        ACCESS_TOKEN_SECRET,
        (err , decoded) => {
            if(err) return res.sendStatus(403);
            req.email = decoded.email
            next()
        }
    )
}

module.exports = verfiedJWT