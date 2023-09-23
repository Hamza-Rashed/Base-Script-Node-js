require("dotenv").config();
const express = require("express");
const config = require("./config/configration");
const path = require("path");
const app = express();
const verfiedJWT = require("./middleware/VerfiedJWT");

const paths = {
    public : path.join(__dirname , '/Public'),
    root : require("./routes/root"),
    employees : require("./routes/api/employees"),
    students : require("./routes/api/students"),
    register: require('./routes/api/register'),
    login: require("./routes/api/login")
}

    app.use(express.json())
    app.use(express.urlencoded({extended: true}))


    app.use('/', express.static(paths.public))
    app.use('/employees', express.static(paths.public))
    app.use('/register', express.static(paths.public))
    app.use('/students', express.static(paths.public))
    app.use('/login', express.static(paths.public))

    
    app.use('/', paths.root)
    app.use('/register', paths.register)
    app.use('/login', paths.login)

    // All Routes Here will be verfied before access to the data
    app.use(verfiedJWT)
    app.use('/employees', paths.employees)
    app.use('/students', paths.students)

    
app.all('*', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'views', '404.html'))
})

app.listen(config.PORT, () => {
    console.log(`Server is running on PORT ${config.PORT}`);
})