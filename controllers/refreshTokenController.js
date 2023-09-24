require("dotenv").config()
const jwt = require("jsonwebtoken");

const userDB = {
    users : require("../models/users.json"),
    setUser : function (data) {this.users = data}
}

let handleRefreshToken = async (req , res) => {
    const cookies = req.cookies

    if(!cookies?.jwt) return res.sendStatus(401);
    
    let refreshToken = cookies.jwt

    let findUser = userDB.users.find(res => res.refreshToken === refreshToken);

    if(!findUser) return res.sendStatus(403); // Foribben

    jwt.verify(
        refreshToken,
        process.env.REFRESH_TOKEN_SECRET,
        (err, decoded) => {
            console.log();
            if (err || findUser.email !== decoded.email) return res.sendStatus(403);
            let payload = {
                fullName : decoded.fullName,
                email : decoded.email
            }

            let accessToken = jwt.sign(
                payload,
                process.env.ACCESS_TOKEN_SECRET,
                {expiresIn: '30s'}
            )

            res.json({accessToken})
        }
    )
}


module.exports = {handleRefreshToken}