const mongoose = require('mongoose')
const Course = require('./../models/course')

const createCourse = (req, res) => {
    //console.log(req.body);
    const course = new Course({
        _id: mongoose.Types.ObjectId(),
        title: req.body.title,
        description: req.body.description,
    })

    return course
        .save()
        .then((newCourse) => {
            return res.status(200).json({
                success: true,
                message: 'New cause created successfully',
                Course: newCourse
            })

        })
        .catch((err) => {
            console.log(err)
            res.status(500).json({
                success: true,
                message: 'Server error. Please try again.',
                error: err.message,
            })
        })
}

const getAllCourse = (req, res) => {
    Course.find()
        .select('_id title description')
        .then((allCourse) => {
            return res.status(200).json({
                success: true,
                message: 'A list of all course',
                Course: allCourse,
            })
        })
        .catch((err) => {
            res.status(500).json({
                success: true,
                message: 'Server error. Please try again.',
                error: err.message,
            })
        })
}

const getSingleCourse = (req, res) => {
    const id = req.params.courseId
    Course.findById(id)
        .then((singleCourse) => {
            res.status(200).json({
                success: true,
                message: `More on ${singleCourse.title}`,
                Course: singleCourse,
            })
        })
        .catch((err) => {
            res.status(500).json({
                success: true,
                message: 'This coures does not exist',
                error: err.message,
            })
        })
}

const updateCourse = (req, res) => {
    const id = req.params.courseId
    const updateObject = req.body
    Course.update({ _id: id}, { $set: updateObject })
        .then(() => {
            res.status(200).json({
                success: true,
                message: 'Course is updated',
                updateCourse: updateObject,
            })
        })
        .catch((err) => {
            res.status(500).json({
            success: false,
            message: 'Server error. Please try again.'
            });
        })
}

const deleteCourse = (req, res) => {
    const id = req.params.courseId
    Course.findByIdAndRemove(id)
        .exec()
        .then(() => {
            res.status(204).json({
                success: true,
            })
        })
        .catch((err) => {
            res.status(500).json({
                success: false,
            })
        })
}

module.exports = {
    createCourse,
    getAllCourse,
    getSingleCourse,
    updateCourse,
    deleteCourse,
}
