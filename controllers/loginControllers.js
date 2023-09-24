require("dotenv").config()
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const fsPromises = require("fs").promises;
const path = require("path");
const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET;
const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET;

let userDB = {
    users: require("../models/users.json"),
    setUser : function(data) {this.users = data}
}

let hundleLoginUser = async (req, res) => {
    let { fullName, email, password } = req.body

    // Check if the data the came from user are empty !!
    if (!fullName || !email || !password) return res.status(500).json({ msg: "All data are required!" })

    let userRequested = userDB.users.find(res => res.email === email)

    // Check if user not found
    if (!userRequested) return res.sendStatus(401)

    // Use the compare method to encrypt the password
    let matchPassword = await bcrypt.compare(password, userRequested.password)

    // Check if the password correct or not
    if (matchPassword) {

        // Start to create JWT Token
        let payload = {
            fullName, email
        }
        let accessToken = jwt.sign(
            payload,
            ACCESS_TOKEN_SECRET,
            {expiresIn : "30s"}
        )

        let refreshToken = jwt.sign(
            payload,
            REFRESH_TOKEN_SECRET,
            {expiresIn : "1d"}
        )

        // Remove the current user from the data
        let otherUsers = userDB.users.filter(res => res.email !== userRequested.email)

        // Provide the access token to the current user
        let currentUser = {...userRequested, refreshToken}
        
        // Add the current user again with his token to the Orignal data
        userDB.setUser([...otherUsers , currentUser]);

        // Store everything in the JSON File
        await fsPromises.writeFile(
            path.join(__dirname, "..", "models", "users.json") , JSON.stringify(userDB.users)
        )

        // Store the refresh token in the Cookie with httpOnly because it more safe and it's not accessible by Java Script 
        res.cookie('jwt', refreshToken, {httpOnly:true, sameSite: 'None', secure:true ,maxAge: 24 * 60 * 60 * 1000})

        res.status(200).json({
            msg: `Welcome ${fullName} and your token is ${accessToken}`
        })

    } else {
        return res.sendStatus(401)
    }

}



module.exports = { hundleLoginUser }