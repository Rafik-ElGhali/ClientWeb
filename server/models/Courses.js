const mongoose = require("mongoose");

const CourseSchema = new mongoose.Schema({
  CourseCode: {
    type: Number,
  },

  CourseName: {
    type: String,
  },

  NumberOfCredits: {
    type: Number,
  },
  Cohorts: {
    type: String,
  },
  Prerequisites: {
    type: String,
  },
  Teachers: {
    type: String,
  },
});

const Course = mongoose.model("Course", CourseSchema);
module.exports = Course;
