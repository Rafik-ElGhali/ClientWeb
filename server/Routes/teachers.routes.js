const router = require("express").Router();
const Teacher = require("../models/Teacher");

router.post("/api/addteachers", async (req, res) => {
  const teacherId = req.body.Id;
  const teacherName = req.body.Name;
  const teacherEmail = req.body.Email;
  const teacherCourse = req.body.Course;
  const teacherFreeDay = req.body.Freeday;
  const teacher = new Teacher({
    Id: teacherId,
    Name: teacherName,
    Email: teacherEmail,
    Course: teacherCourse,
    Freeday: teacherFreeDay,
  });

  try {
    await teacher.save();
    res.send("inserted data");
  } catch (err) {
    console.log(err);
  }
});

router.get("/api/getteachers", async (req, res) => {
  Teacher.find({}, (err, result) => {
    if (err) {
      res.send(err);
    }
    res.send(result);
  });
});

module.exports = router;
