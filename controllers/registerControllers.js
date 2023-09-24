const 
    path = require("path"),
    fsPromises = require("fs").promises,
    bcrypt = require("bcrypt");

let userDB = {
    users : require("../models/users.json"),
    setUser : function(data){this.users = data}
}

let handleNewRegister = async (req, res) => {
    let {fullName, email, password} = req.body

    // Check if the data the came from user are empty !!
    if(!fullName || !email || !password) return res.status(400).json({msg : "All data are required"})

    let findUser = userDB.users.find(res => res.email === email)
    
    // Check if there is any duplicate
    if(findUser) return res.sendStatus(409).json({msg : "This user already created!"})

    // Hashed the paswsword
    let hashedPass = await bcrypt.hash(password , 10)

    // The new user after hashing the password
    let userToAdded = {
        fullName : fullName,
        email : email,
        password : hashedPass
    }

    userDB.setUser([...userDB.users , userToAdded])

    await fsPromises.writeFile(
        path.join(__dirname, "..", "models", "users.json") , JSON.stringify(userDB.users)
    )

    res.status(201).json({msg : `User ${fullName} Added`})
    
}

module.exports = {handleNewRegister}