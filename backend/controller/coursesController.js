const Course = require('../models/courseModels')
const mongoose = require('mongoose')

//get all course
const getCourses = async (req,res) => {
    const courses = await Course.find({}).sort({createdAt: 1})
    res.status(200).json(courses)
}


//get a single course
const getSingleCourse = async (req, res) => {
     
    const { id } = req.params;

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: "Not a valid ID"})
    }

    const course = await Course.findById(id)
    if(!course){
        return res.status(404).json({err: "No such courses"})
    }
    res.status(200).json(course)
}


//create a new course
const createCourse = async (req, res) => {
    const { title, description, price } = req.body

    let emptyFields = []

    if(!title){
        emptyFields.push('title')
    }
    if(!description){
        emptyFields.push('description')
    }
    if(!price){
        emptyFields.push('price')
    }
    if(emptyFields.length > 0){
        let copyEmptyFields = emptyFields
        let few = copyEmptyFields.slice(0,-1)
        let last = copyEmptyFields.slice(-1)
        return res.status(400).json({err: 'Please fill in the ' + few.join(', ') + " and " + last + " feild." })
    }

    try {
        const course = await Course.create({ title, description, price })
        res.status(200).json(course)
    } catch (err){
        res.status(400).json({err: err.message}),
        console.log(err);
    }
}

//delete a course
const deleteCourse = async (req, res) => {
    const { id } = req.params;

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: "Not a valid ID"})
    }
    
    const course = await Course.findOneAndDelete({_id: id})
    if(!course){
        return res.status(404).json({err: "No such courses"})
    }
    res.status(200).json(course)
}



//update a course
const updateCourse = async (req, res) => {
    const { id } = req.params;

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: "Not a valid ID"})
    }

    const course = await Course.findByIdAndUpdate({_id: id},{
        ...req.body
    })

    if(!course){
        return res.status(404).json({err: "No such courses"})
    }
    res.status(200).json(course)
}



module.exports = {
    getCourses, getSingleCourse, createCourse, 
    deleteCourse, updateCourse
}