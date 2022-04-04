import React, { useState } from "react";
import Box from "@mui/material/Box";
import Axios from "axios";
import TextField from "@mui/material/TextField";
import { Avatar, Button, Grid, Paper, Typography } from "@mui/material";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";

export default function AddProfessor() {
  const paperStyle = { padding: "30px 20px", width: 300, margin: "20px auto" };
  const headerStyle = { margin: 0, padding: "10px" };
  const avatarStyle = { backgroundColor: "#1bbd7e" };
  const courseform = { padding: "10px" };
  const formstyle = { margin: 10 };
  const [Id, setId] = useState(0);
  const [Name, setName] = useState("");
  const [Email, setEmail] = useState("");
  const [Course, setCourse] = useState("");
  const [Freeday, setFreeDay] = useState("");
  const addToList = () => {
    Axios.post("http://localhost:5000/api/addteachers", {
      Id: Id,
      Name: Name,
      Email: Email,
      Course: Course,
      Freeday: Freeday,
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
            <h2 style={headerStyle}>Add Teachers</h2>
            <div style={courseform}>
              <Typography variant="caption">
                Please fill this form to add a Professor
              </Typography>
            </div>
          </Grid>
          <form>
            <TextField
              label="Id"
              style={formstyle}
              onChange={(event) => {
                setId(event.target.value);
              }}
            />
            <TextField
              label="Name"
              style={formstyle}
              onChange={(event) => {
                setName(event.target.value);
              }}
            />
            <TextField
              label="Email"
              style={formstyle}
              onChange={(event) => {
                setEmail(event.target.value);
              }}
            />
            <TextField
              label="Course"
              style={formstyle}
              onChange={(event) => {
                setCourse(event.target.value);
              }}
            />
            <TextField
              label="Free day"
              style={formstyle}
              onChange={(event) => {
                setFreeDay(event.target.value);
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
