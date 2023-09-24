const fsPromises = require("fs").promises;
const path = require("path");

const userDB = {
    users : require("../models/users.json"),
    setUser : function (data) {this.users = data}
}

let handleLogOut = async (req, res) => {
    let cookies = req.cookies;

    if(!cookies?.jwt) return sendSattus(401);

    let refreshToken = cookies.jwt

    let findUser = userDB.users.find(res => res.refreshToken === refreshToken)

    if(!findUser) {
        res.clearCookie("jwt", {httpOnly: true, sameSite: 'None', secure:true})
        res.sendStatus(204) // No Content
    }

    let otherUsers = userDB.users.filter(res => res.refreshToken !== findUser.refreshToken)

    let currentUser = {...findUser, refreshToken: ""}

    userDB.setUser([...otherUsers, currentUser])

    await fsPromises.writeFile(
        path.join(__dirname, "..", "models","users.json"),
        JSON.stringify(userDB.users)
    )

    res.clearCookie("jwt", {httpOnly: true, sameSite: 'None', secure:true})
    res.sendStatus(204) // No Content
}


module.exports = {handleLogOut}