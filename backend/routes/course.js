const express = require('express')
const Course = require('../models/courseModels')
const { getCourses, getSingleCourse, createCourse, deleteCourse, updateCourse } = require('../controller/coursesController')

const router = express.Router()

//GET request
router.get("/", getCourses)

//GET request
router.get("/:id", getSingleCourse)

//POST request
router.post("/", createCourse)

//DELETE request
router.delete("/:id", deleteCourse)

//UPDATE request
router.patch("/:id", updateCourse)

module.exports = router