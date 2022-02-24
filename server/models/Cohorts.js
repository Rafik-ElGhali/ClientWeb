const mongoose = require("mongoose");

const CohortsSchema = new mongoose.Schema({
  CohortName: {
    type: String,
  },
  NbrOfStudent: {
    type: Number,
  },
});

const Cohorts = mongoose.model("Cohorts", CohortsSchema);
module.exports = Cohorts;
