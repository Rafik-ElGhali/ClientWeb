import React, { useState } from "react";
import Box from "@mui/material/Box";
import Axios from "axios";
import TextField from "@mui/material/TextField";
import { Avatar, Button, Grid, Paper, Typography } from "@mui/material";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";

export default function AddCohorts() {
  const paperStyle = { padding: "30px 20px", width: 300, margin: "20px auto" };
  const headerStyle = { margin: 0, padding: "10px" };
  const avatarStyle = { backgroundColor: "#1bbd7e" };
  const courseform = { padding: "10px" };
  const formstyle = { margin: 10 };
  const [CohortName, setCohortName] = useState("");
  const [NbrOfStudent, setNbrOfStudent] = useState("");

  const addToList = () => {
    Axios.post("http://localhost:5000/api/addcohorts", {
      CohortName: CohortName,
      NbrOfStudent: NbrOfStudent,
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
            <h2 style={headerStyle}>Add Cohort</h2>
            <div style={courseform}>
              <Typography variant="caption">
                Please fill this form to add a cohort
              </Typography>
            </div>
          </Grid>
          <form>
            <TextField
              label="Cohort Name"
              style={formstyle}
              onChange={(event) => {
                setCohortName(event.target.value);
              }}
            />
            <TextField
              label="Nbr of student"
              style={formstyle}
              onChange={(event) => {
                setNbrOfStudent(event.target.value);
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
