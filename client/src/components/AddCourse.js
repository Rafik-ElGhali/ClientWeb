import React, { useState } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import Axios from "axios";
import Button from "@mui/material/Button";
import { Avatar, Grid, Paper, Typography } from "@mui/material";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";

export default function AddCourse() {
  const paperStyle = { padding: "30px 20px", width: 300, margin: "20px auto" };
  const headerStyle = { margin: 0, padding: "10px" };
  const avatarStyle = { backgroundColor: "#1bbd7e" };
  const courseform = { padding: "10px" };
  const formstyle = { margin: 10 };
  const [CourseCode, setCourseCode] = useState(0);
  const [CourseName, setCourseName] = useState("");
  const [NumberOfCredits, setNumberOfCredits] = useState(0);
  const [Cohorts, setCohorts] = useState("");
  const [Prerequisites, setPrerequisites] = useState("");
  const [Teachers, setTeachers] = useState("");
  const addToList = () => {
    Axios.post("http://localhost:5000/api/addcourses", {
      CourseCode: CourseCode,
      CourseName: CourseName,
      NumberOfCredits: NumberOfCredits,
      Cohorts: Cohorts,
      Prerequisites: Prerequisites,
      Teachers: Teachers,
    });
  };
  return (
    <div>
      <Grid>
        <Paper elevation={10} style={paperStyle}>
          <Grid align="center">
            <Avatar style={avatarStyle}>
              <AddCircleOutlineIcon />
            </Avatar>
            <h2 style={headerStyle}>Add Courses</h2>
            <div style={courseform}>
              <Typography variant="caption">
                Please fill the form this to create an account
              </Typography>
            </div>
          </Grid>
          <form>
            <TextField
              label="Course Code"
              style={formstyle}
              onChange={(event) => {
                setCourseCode(event.target.value);
              }}
            />
            <TextField
              label="Course Name"
              style={formstyle}
              onChange={(event) => {
                setCourseName(event.target.value);
              }}
            />
            <TextField
              label="Number of Credits"
              style={formstyle}
              onChange={(event) => {
                setNumberOfCredits(event.target.value);
              }}
            />
            <TextField
              label="Cohorts"
              style={formstyle}
              onChange={(event) => {
                setCohorts(event.target.value);
              }}
            />
            <TextField
              label="Prerequisites"
              style={formstyle}
              onChange={(event) => {
                setPrerequisites(event.target.value);
              }}
            />
            <TextField
              label="Teachers"
              style={formstyle}
              onChange={(event) => {
                setTeachers(event.target.value);
              }}
            />
            <Button
              type="submit"
              variant="contained"
              color="primary"
              onClick={addToList}
            >
              Add
            </Button>
          </form>
        </Paper>
      </Grid>
    </div>
  );
}
