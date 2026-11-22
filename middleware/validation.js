const Joi = require('joi')

exports.departmentValidator = (req, res, next)=>{
    const departmentSchema = Joi.object({
        name: Joi.string().trim().pattern(new RegExp("^[\\p{L}]+([\\s'\\-\\.][\\p{L}]+)*$", "u")).required().messages({
            "any.required": "Department name is required",
            "string.empty": "Department name cannot be empty",
            "string.pattern.base": "Department must contain only letters, spaces, hyphens, apostrophes, and periods"
        }),
        faculty: Joi.string().trim().pattern(new RegExp("^[\\p{L}]+([\\s'\\-\\.][\\p{L}]+)*$", "u")).required().messages({
            "any.required": "Faculty is required",
            "string.empty": "Faculty cannot be empty",
            "string.pattern.base": "Faculty must contain only letters, spaces, hyphens, apostrophes, and periods"
        })
    })

     const {error} = departmentSchema.validate(req.body)
    if(error){
        return res.status(400).json({
            message: error.details[0].message
        })
    }

    next();
}

exports.courseValidator = (req, res, next)=>{
    const courseSchema = Joi.object({
        courseCode: Joi.string().pattern(new RegExp("^[A-Z]{2,5}[0-9]{3,4}$")).required().messages({
            "any.required": "Course code is required",
            "string.empty": "Course code can not be empty",
            "string.pattern.base": "Course code must contain 2-5 uppercase letters followed by 3-4 digits (e.g., CSC101)"
        }),
        title: Joi.string().pattern(new RegExp("^[\\p{L}]+([\\s'\\-\\.][\\p{L}]+)*$", "u")).required().messages({
            "any.required": "Course title is required",
            "string.empty": "Course title can not be empty",
             "string.pattern.base": "Faculty must contain only letters, spaces, hyphens, apostrophes, and periods"
        }),
        creditUnit: Joi.string().trim().required().messages({
            "any.required": "Course unit is required",
            "string.empty": "Course unit can not be empty"
        })
    })


    
     const {error} = courseSchema.validate(req.body)
    if(error){
        return res.status(400).json({
            message: error.details[0].message
        })
    }

    next();
}