const router = require("express").Router();
const Cohorts = require("../models/Cohorts");

router.post("/api/addcohorts", async (req, res) => {
  const cohortname = req.body.CohortName;
  const nbrofstudent = req.body.NbrOfStudent;

  const Cohort = new Cohorts({
    CohortName: cohortname,
    NbrOfStudent: nbrofstudent,
  });

  try {
    await Cohort.save();
    res.send("inserted data");
  } catch (err) {
    console.log(err);
  }
});

router.get("/api/getcohorts", async (req, res) => {
  Cohorts.find({}, (err, result) => {
    if (err) {
      res.send(err);
    }
    res.send(result);
  });
});

module.exports = router;
