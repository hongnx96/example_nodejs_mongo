const mongoose = require('mongoose')
const Course = require('./../models/course')

const createCourse = async (req, res) => {
    try {
        const course = new Course({
            _id: mongoose.Types.ObjectId(),
            title: req.body.title,
            description: req.body.description,
        })
        const newCourse = await course.save()
        return res.status(200).json({
            success: true,
            message: 'New cause created successfully',
            Course: newCourse
        })
    } catch (error) {
        console.log(error);
    }
}

const getAllCourse = async (req, res) => {
    try {
        const allCourse = await Course.find().select('_id title description')
        return res.status(200).json({
            success: true,
            message: 'A list of all course',
            Course: allCourse,
        })
        
    } catch (error) {
        console.log(error);
    }

}

const getSingleCourse = async (req, res) => {
    try {
        const id = req.params.courseId
        const singleCourse = await Course.findById(id)
        res.status(200).json({
            success: true,
            message: `More on ${singleCourse.title}`,
            Course: singleCourse,
        })
    } catch (error) {
        console.log(error);
    }
}

const updateCourse = async (req, res) => {
    try {
        const id = req.params.courseId
        const updateObject = req.body
        await Course.updateOne({ _id: id}, { $set: updateObject })
        res.status(200).json({
            success: true,
            message: 'Course is updated',
            updateCourse: updateObject,
        })
    } catch (error) {
        console.log(error);
    }
}

const deleteCourse = async (req, res) => {
    try {
        const id = req.params.courseId
        await Course.findByIdAndRemove(id).exec()
        res.status(204).json({
            success: true,
        })
    } catch (error) {
        console.log(error);
    }
}

module.exports = {
    createCourse,
    getAllCourse,
    getSingleCourse,
    updateCourse,
    deleteCourse,
}
