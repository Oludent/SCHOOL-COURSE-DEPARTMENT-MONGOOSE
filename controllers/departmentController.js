const departmentModel = require('../models/department')


exports.createDept = async (req, res)=>{
    try {
        const {name, faculty} = req.body
        const dept = await departmentModel.findOne({name: name.toLowerCase()})
        if (dept){
            return res.status(404).json({
                message: `Department already exists!`
            })
        }
        const data = {
            name: name.toLowerCase(),
            faculty
        }
        const createDepartment = await departmentModel.create(data)
        res.status(201).json({
            message: `Department created successfully`,
            data: createDepartment
        })
    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}


exports.getAllDept = async (req, res)=>{
    try {
        const getAll = await departmentModel.find()
        res.status(200).json({
            message: `All department found and the total is: ${getAll.length}`,
            data: getAll
        })
        
    } catch (error) {
       res.status(500).json({
            message: error.message
        }) 
    }
}


exports.getOneDept = async (req, res)=>{
    try {
        const {id} = req.params
        const dept = await departmentModel.findById(id).populate('courseId')
        if(!dept){
            return res.status(404).json({
                message: `Department not found`
            })
        }
        res.status(200).json({
            messgae: `Department found successfully`,
            data: dept
        })
    } catch (error) {
         res.status(500).json({
            message: error.message
        }) 
    }
}


exports.updateDept = async (req, res)=>{
    try {
        const {id} = req.params
        const {name, faculty} = req.body
        const dept = await departmentModel.findById(id)
        if(!dept){
            return res.status(404).json({
                message: `Department not found`
            })
        }
        const data = {
            name,
            faculty
        }
        if(name && name !== dept.name){
            const deptExist = await departmentModel.findOne({name: name.toLowerCase()})
            if(deptExist){
                return res.status(400).json({
                    message: `Department name exist already and cant have two records`
                })
            }
        }
        const updateDepart = await departmentModel.findByIdAndUpdate(id, data, {new: true})
        res.status(200).json({
            message: `Department updated successfully`,
            data: updateDepart
        })
    } catch (error) {
        res.status(500).json({
            message: error.message
        }) 
    }
}


exports.deleteDept = async (req, res)=>{
    try {
        const {id} = req.params
        const dept = await departmentModel.findById(id)
        if(!dept){
            return res.status(404).json({
                message: `Department not found`
            })
        }
        const deleteDept = await departmentModel.findByIdAndDelete(id)
        res.status(200).json({
            message: `Department deleted successfully`,
            data: deleteDept
        })
    } catch (error) {
         res.status(500).json({
            message: error.message
        }) 
    }
}