const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({
    courseCode: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    creditUnit: {
        type: Number,
        required: true
    },
    departmentId: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'Departments',
        required: true
    }
}, {
    timestamps: true
})

const courseModel = mongoose.model('Courses', courseSchema)

module.exports = courseModel