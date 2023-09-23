const data = {
    employees : require("../models/employees.json"),
    setEmployees : function(data) { this.employees = data}
}

let getAllEmployees = (req, res) => {
    res.json(data.employees)
}

let craeteEmployee = (req, res) => {
    let newEmployee = {
        id : data.employees[data.employees.length - 1].id + 1 || 1,
        fullName : req.body.fullName,
        phoneNumber : req.body.phoneNumber,
        email : req.body.email,
        password : req.body.password
    }

    if(!newEmployee.fullName || !newEmployee.phoneNumber || !newEmployee.email || !newEmployee.password) {
        return res.status(400).json({msg : `All data are required`})
    }

    data.setEmployees = [...data.employees , newEmployee]

    res.status(201).json(newEmployee)
}

let updateEmployee = (req , res) => {

    let newUpdatedEmployee = {
        id : req.body.id,
        fullName : req.body.fullName,
        phoneNumber : req.body.phoneNumber,
        email : req.body.email,
        password : req.body.password
    }

    // Find the employee that we need to update
    let employee = data.employees.find(res => res.id == parseInt(newUpdatedEmployee.id))

    if(!employee) {
        return res.status(400).json({msg : `The employee for id ${id} not found`})
    }

    // Check what the user need to update
    // Update the requisted employee with the new data that we got from user
    if(newUpdatedEmployee.fullName) employee.fullName = newUpdatedEmployee.fullName
    if(newUpdatedEmployee.phoneNumber) employee.phoneNumber = newUpdatedEmployee.phoneNumber
    if(newUpdatedEmployee.email) employee.email = newUpdatedEmployee.email
    if(newUpdatedEmployee.password) employee.password = newUpdatedEmployee.password

    // Remove the old employee to add the new one insted of the old one
    let dataWithOutReplacedEmployee = data.employees.filter(res => res.id !== newUpdatedEmployee.id)

    data.setEmployees([...dataWithOutReplacedEmployee , employee])

    res.status(200).json(employee)

}

let deleteEmployee = (req , res) => {
    let id = req.body.id
    let employee = data.employees.find(res => res.id == parseInt(id))

    if(!employee) {
        return res.status(400).json({msg : `The employee for id ${id} not found`})
    }

    let dataWithoutDeletedEmployee = data.employees.filter(res => res.id !== parseInt(id))

    data.setEmployees(dataWithoutDeletedEmployee)

    res.status(200).json("Deleted")
}

let getEmployee = (req , res) => {
    let id = req.params.id

    let employee = data.employees.find(res => res.id == parseInt(id))

    if(!employee) {
        return res.status(400).json({msg : "The employee not found"})
    }

    res.json(employee)
}

module.exports = {
    getAllEmployees,
    craeteEmployee,
    updateEmployee,
    deleteEmployee,
    getEmployee
}