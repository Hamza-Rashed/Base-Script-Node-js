const data = {
    students : require("../models/students.json"),
    setStudent : (data) => this.students = data
}

const getAllStudents = (req, res) => {
    res.status(200).json(data.students)
}

const createStudents = (req, res) => {

    let newStudent = {
        id : data.students[data.students.length - 1].id + 1 || 1,
        fullName : req.body.fullName,
        phoneNumber : req.body.phoneNumber,
        email : req.body.email,
        password : req.body.password
    }

    if(!newStudent.fullName || !newStudent.phoneNumber || !newStudent.email || !newStudent.password) {
        return res.status(400).json({msg : "Must fill all info"})
    }

    data.setStudent = [...data.students , newStudent]

    res.status(201).json(newStudent)
}

const updateStudent = (req, res) => {
    let updatedStudent = {
        id : req.body.id,
        fullName : req.body.fullName,
        phoneNumber : req.body.phoneNumber,
        email : req.body.email,
        password : req.body.password
    }

    let student = data.students.find(res => res.id == parseInt(updatedStudent.id))

    if(!student) {
        return res.status(400).json({msg : "The student not found"})
    }

    if(updatedStudent.fullName) student.fullName = updatedStudent.fullName
    if(updatedStudent.phoneNumber) student.phoneNumber = updatedStudent.phoneNumber
    if(updatedStudent.email) student.email = updatedStudent.email
    if(updatedStudent.password) student.password = updatedStudent.password

    let studentsWithoutUpdatedOne = data.students.filter(res => res.id !== parseInt(updatedStudent.id))

    data.students = [...studentsWithoutUpdatedOne , student]

    res.status(201).json(updatedStudent)

}

const deleteStudent = (req, res) => {
    let id = req.body.id
    let student = data.students.find(res => res.id == parseInt(id))

    if(!student) {
        return res.status(400).json({msg : "Student not found"})
    }

    let dataWithoutDeletedStudent = data.students.filter(res => res.id !== id)

    data.students = [dataWithoutDeletedStudent]

    res.status(200).json(data.students)
}

const getStudent = (req, res) => {
    let id = req.params.id
    let student = data.students.find(res => res.id == parseInt(id))

    if(!student) {
        return res.status(400).json({msg : "Student not found"})
    }

    res.status(200).json(student)
}

module.exports = {
    getAllStudents,
    createStudents,
    updateStudent,
    deleteStudent,
    getStudent
}