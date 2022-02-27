const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");
const teachersroute = require("./Routes/teachers.routes");
const coursesroute = require("./Routes/courses.routes");
const cohortsroute = require("./Routes/cohorts.routes");
const app = express();

mongoose.connect("mongodb://localhost:27017/pmgsystem", {
  useNewUrlParser: true,
});
app.use(cors());
const PORT = process.env.PORT || 5000;

app.use(express.json());

app.use("/", teachersroute);
app.use("/", coursesroute);
app.use("/", cohortsroute);

app.listen(PORT, () => {
  console.log("Sever Running");
});
