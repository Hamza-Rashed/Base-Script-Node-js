const
    express = require("express"),
    path = require("path"),
    employeesControllers = require("../../controllers/employeeControllers"),
    router = express.Router();

router.get('/employeesPage', (req, res) => {
    res.sendFile(path.join(__dirname, '..', '..' , 'views', 'subRoot', 'employees' , 'allEmployees.html'))
})

router.get('/addEmployee', (req, res) => {
    res.sendFile(path.join(__dirname, '..', '..' , 'views', 'subRoot', 'employees' , 'addEmplyee.html'))
})

router.route("/")
    .get(employeesControllers.getAllEmployees)
    .post(employeesControllers.craeteEmployee)
    .put(employeesControllers.updateEmployee)
    .delete(employeesControllers.deleteEmployee);

router.route("/:id")
    .get(employeesControllers.getEmployee)

module.exports = router