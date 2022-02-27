const router = require("express").Router();
const Courses = require("../models/Courses");

router.post("/api/addcourses", async (req, res) => {
  const coursecode = req.body.CourseCode;
  const coursename = req.body.CourseName;
  const credits = req.body.NumberOfCredits;
  const cohorts = req.body.Cohorts;
  const prerequisites = req.body.Prerequisites;
  const teachers = req.body.Teachers;

  const Course = new Courses({
    CourseCode: coursecode,
    CourseName: coursename,
    NumberOfCredits: credits,
    Cohorts: cohorts,
    Prerequisites: prerequisites,
    Teachers: teachers,
  });

  try {
    await Course.save();
    res.send("inserted data");
  } catch (err) {
    console.log(err);
  }
});

router.get("/api/getcourses", async (req, res) => {
  Courses.find({}, (err, result) => {
    if (err) {
      res.send(err);
    }
    res.send(result);
  });
});

module.exports = router;
