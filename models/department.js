const mongoose = require('mongoose')

const departmentSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    faculty: {
        type: String,
        required: true
    },
    courseId: [{
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'Courses'
    }]

}, {
    timestamps: true
})

const departmentModel = mongoose.model('Departments', departmentSchema)

module.exports = departmentModel