const router = require('express').Router()

const {createCourse, getAllCourses, getOneCourse, updateCourse, deleteCourse} = require('../controllers/courseController')

const {courseValidator} = require('../middleware/validation')

router.post('/createcourse/:departmentId', courseValidator, createCourse);
router.get('/getallcourse', getAllCourses);
router.get('/getonecourse/:id', getOneCourse);
router.patch('/updatecourse/:id', courseValidator, updateCourse);
router.delete('/deletecourse/:id', deleteCourse)



module.exports = router