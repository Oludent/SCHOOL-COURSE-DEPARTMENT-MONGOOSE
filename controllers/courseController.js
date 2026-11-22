const courseModel = require('../models/course')
const departmentModel = require('../models/department')


exports.createCourse = async (req, res)=>{
    try {
        const {departmentId} = req.params
        const {courseCode, title, creditUnit} = req.body

        const course = await courseModel.findOne({courseCode: courseCode.toLowerCase()})
        
        if(course){
            return res.status(400).json({
                message: `Course code already exits`
            })
        }
        const department = await departmentModel.findById(departmentId)

        if(!department){
            return res.status(400).json({
                message: `Course can not exist outside a department`
            })
        }
        
        const data = {
            courseCode: courseCode.toLowerCase(),
            title,
            creditUnit,
            departmentId
        }
        const courseCreated = new courseModel(data)

        department.courseId.push(courseCreated._id)

        await courseCreated.save()
        await department.save()

        res.status(201).json({
            message: `New course created successfully`,
            data: courseCreated
        })
    } catch (error) {
         res.status(500).json({
            message: error.message
        }) 
    }
}


exports.getAllCourses = async (req, res)=>{
    try {
        const courses = await courseModel.find()
        res.status(200).json({
            message: `All courses found and are of this total: ${courses.length}`,
            data: courses
        })
    } catch (error) {
         res.status(500).json({
            message: error.message
        }) 
    }
}


exports.getOneCourse = async (req, res)=>{
    try {
        const {id} = req.params
        const course = await courseModel.findById(id).populate('departmentId')
        if(!course){
            return res.status(404).json({
                message: `Course not found`
            })
        }
        res.status(200).json({
            message: `Course found successfully!`,
            data: course
        })
    } catch (error) {
         res.status(500).json({
            message: error.message
        }) 
    }
}


exports.updateCourse = async (req, res)=>{
    try {
        const {id} = req.params
        const {courseCode, title, creditUnit} = req.body
        const course = await courseModel.findById(id)

        if(!course){
            return res.status(404).json({
                message: `Course not found!`
            })
        }

       
        if(courseCode && courseCode !== course.courseCode){
            const courseExist = await courseModel.findOne({courseCode: courseCode.toLowerCase()})
            if(courseExist){
                res.status(400).json({
                    messgae: `Course code: ${courseCode} already exists`
                })
            }
        }

        
         const data = {
            courseCode,
            title,
            creditUnit
        }

        const updatedCourse = await courseModel.findByIdAndUpdate(id, data, {new: true})

        res.status(200).json({
            message: `Course updated successfully!`,
            data: updatedCourse
        })
    } catch (error) {
          res.status(500).json({
            message: error.message
        }) 
    }
}


exports.deleteCourse = async (req, res)=>{
    try {
        const {id} = req.params
        const course = await courseModel.findById(id)

        if(!course){
            return res.status(404).json({
                message: `Course not found!`
            })
        }

        const deletedCourse = await courseModel.findByIdAndDelete(id)

        res.status(200).json({
            message: `Course deleted successully!`,
            data: deletedCourse
        })
    } catch (error) {
           res.status(500).json({
            message: error.message
        }) 
    }
}