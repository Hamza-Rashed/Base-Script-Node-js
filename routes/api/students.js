const
    express = require("express"),
    path = require("path"),
    studentsControllers = require("../../controllers/studentControllers"),
    router = express.Router();

router.get('/studentsPage', (req, res) => {
    res.sendFile(path.join(__dirname, '..', '..' , 'views', 'subRoot', 'students' , 'allStudents.html'))
})

router.get('/addStudent', (req, res) => {
    res.sendFile(path.join(__dirname, '..', '..' , 'views', 'subRoot', 'students' , 'addStudent.html'))
})

router.route("/")
    .get(studentsControllers.getAllStudents)
    .post(studentsControllers.createStudents)
    .put(studentsControllers.updateStudent)
    .delete(studentsControllers.deleteStudent)

router.route("/:id")
    .get(studentsControllers.getStudent)

module.exports = router