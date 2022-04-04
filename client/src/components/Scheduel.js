import React, { useEffect, useState } from "react";
import { styled, alpha } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import { ViewState } from "@devexpress/dx-react-scheduler";
import {
  Scheduler,
  WeekView,
  Appointments,
} from "@devexpress/dx-react-scheduler-material-ui";
import moment from "moment";
import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Chip from "@mui/material/Chip";
import { getDay } from "date-fns";

const PREFIX = "Demo";

const classes = {
  todayCell: `${PREFIX}-todayCell`,
  weekendCell: `${PREFIX}-weekendCell`,
  today: `${PREFIX}-today`,
  weekend: `${PREFIX}-weekend`,
};

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

function getStyles(name, personName, theme) {
  return {
    fontWeight:
      personName.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

const StyledWeekViewTimeTableCell = styled(WeekView.TimeTableCell)(
  ({ theme }) => ({
    [`&.${classes.todayCell}`]: {
      backgroundColor: alpha(theme.palette.primary.main, 0.1),
      "&:hover": {
        backgroundColor: alpha(theme.palette.primary.main, 0.14),
      },
      "&:focus": {
        backgroundColor: alpha(theme.palette.primary.main, 0.16),
      },
    },
    [`&.${classes.weekendCell}`]: {
      backgroundColor: alpha(theme.palette.action.disabledBackground, 0.04),
      "&:hover": {
        backgroundColor: alpha(theme.palette.action.disabledBackground, 0.04),
      },
      "&:focus": {
        backgroundColor: alpha(theme.palette.action.disabledBackground, 0.04),
      },
    },
  })
);

const StyledWeekViewDayScaleCell = styled(WeekView.DayScaleCell)(
  ({ theme }) => ({
    [`&.${classes.today}`]: {
      backgroundColor: alpha(theme.palette.primary.main, 0.16),
    },
    [`&.${classes.weekend}`]: {
      backgroundColor: alpha(theme.palette.action.disabledBackground, 0.06),
    },
  })
);

const TimeTableCell = (props) => {
  const { startDate } = props;
  const date = new Date(startDate);

  if (date.getDate() === new Date().getDate()) {
    return (
      <StyledWeekViewTimeTableCell {...props} className={classes.todayCell} />
    );
  }
  if (date.getDay() === 0 || date.getDay() === 6) {
    return (
      <StyledWeekViewTimeTableCell {...props} className={classes.weekendCell} />
    );
  }
  return <StyledWeekViewTimeTableCell {...props} />;
};

const DayScaleCell = (props) => {
  const { startDate, today } = props;

  if (today) {
    return <StyledWeekViewDayScaleCell {...props} className={classes.today} />;
  }
  if (startDate.getDay() === 0 || startDate.getDay() === 6) {
    return (
      <StyledWeekViewDayScaleCell {...props} className={classes.weekend} />
    );
  }
  return <StyledWeekViewDayScaleCell {...props} />;
};

const appointmentss = [
  {
    title: "Discrete mathematics",
    startDate: new Date(2018, 5, 25, 11, 0),
    endDate: new Date(2018, 5, 25, 12, 0),
    id: 1,
    location: "Room 1",
  },
  {
    title: "Data Structure",
    startDate: new Date(2018, 5, 25, 12, 11),
    endDate: new Date(2018, 5, 25, 13, 0),
    id: 1,
    location: "Room 1",
  },
  {
    title: "JAVA",
    startDate: new Date(2018, 5, 25, 13, 30),
    endDate: new Date(2018, 5, 25, 15, 35),
    id: 2,
    location: "Room 2",
  },
];

console.log(appointmentss[0]);
var eight = moment().set({
  year: 2018,
  month: 5,
  date: 25,
  hour: 8,
  minute: 0,
});

const initialCourses = [
  { title: "cs101", duration: 2, id: 1 },
  { title: "cs102", duration: 2, id: 2 },
  { title: "cs103", duration: 4, id: 3 },
  { title: "cs104", duration: 2, id: 4 },
  { title: "cs105", duration: 4, id: 4 },
];

function addHoursToDate(objDate, intHours) {
  var numberOfMlSeconds = objDate.getTime();
  var addMlSeconds = intHours * 60 * 60 * 1000;
  var newDateObj = new Date(numberOfMlSeconds + addMlSeconds);

  return newDateObj;
}
const addDays = function (date, days) {
  // var date = new Date(this.valueOf());
  date.setDate(date.getDate() + days);
  return date;
};

let numberOfDays = 0;
const semesterStartDate = new Date(2018, 5, 25, 8, 0);

// // const currentDate = "2018-05-24";
const currentDate = "2018-06-25";
const Scheduel = () => {
  const theme = useTheme();
  const [coursesList, setCoursesList] = useState([]);
  const [courses, setCourses] = useState(initialCourses);

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setCoursesList(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value
    );
  };

  useEffect(() => {
    displaySelectedCourses();
  }, []);

  const filterSelectedCourse = () => {
    let filteredCourses = [];
    coursesList.map((selectedCourse, index) => {
      console.log("coursesarray", courses);
      courses.map((course) => {
        console.log("message ", course.title);
        console.log("selectedcourse ", selectedCourse);
        if (course.title === selectedCourse) {
          filteredCourses.push(course);
        }
      });
    });
    console.log(filteredCourses);
    setCourses([...coursesList, filteredCourses]);
  };

  useEffect(() => {
    if (coursesList.length > 0) {
      filterSelectedCourse();
      displaySelectedCourses();
    }
  }, [coursesList]);

  const displaySelectedCourses = () => {
    courses.map((course, index) => {
      if (index === 0) {
        course.startDate = semesterStartDate;
      } else {
        //checking if we can still fit other courses

        if (
          addHoursToDate(
            courses[index - 1].endDate,
            course.duration
          ).getHours() > 18
        ) {
          //Moving to a new Day
          numberOfDays++;

          course.startDate = addDays(semesterStartDate, numberOfDays);
        } else {
          course.startDate = courses[index - 1].endDate;
        }
      }
      course.endDate = addHoursToDate(course.startDate, course.duration);

      return course;
    });
  };

  coursesList.forEach((title, index) => {});

  return (
    <div>
      <FormControl sx={{ m: 1, width: 300 }}>
        <InputLabel id="demo-multiple-chip-label">Chip</InputLabel>
        <Select
          labelId="demo-multiple-chip-label"
          id="demo-multiple-chip"
          multiple
          value={coursesList}
          onChange={handleChange}
          input={<OutlinedInput id="select-multiple-chip" label="Chip" />}
          renderValue={(selected) => (
            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
              {selected.map((value) => (
                <Chip key={value} label={value} />
              ))}
            </Box>
          )}
          MenuProps={MenuProps}
        >
          {initialCourses.map((name) => (
            <MenuItem
              key={name.title}
              value={name.title}
              style={getStyles(name.title, coursesList, theme)}
            >
              {name.title}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <Paper>
        <Scheduler data={courses} height={800}>
          <ViewState currentDate={currentDate} />
          <WeekView
            startDayHour={7}
            endDayHour={20}
            timeTableCellComponent={TimeTableCell}
            dayScaleCellComponent={DayScaleCell}
          />
          <Appointments />
        </Scheduler>
      </Paper>
    </div>
  );
};

export default Scheduel;
