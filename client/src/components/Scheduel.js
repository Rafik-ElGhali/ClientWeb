import React from "react";
import { styled, alpha } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import { ViewState } from "@devexpress/dx-react-scheduler";
import {
  Scheduler,
  WeekView,
  Appointments,
} from "@devexpress/dx-react-scheduler-material-ui";
import moment from "moment";
import appointments from "./demo-data/today-appointments";

const PREFIX = "Demo";

const classes = {
  todayCell: `${PREFIX}-todayCell`,
  weekendCell: `${PREFIX}-weekendCell`,
  today: `${PREFIX}-today`,
  weekend: `${PREFIX}-weekend`,
};

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
  //   {
  //     title: "HI",
  //     startDate: "2019-06-23T8:30",
  //     endDate: "2019-06-23T9:30",
  //   },
  //   {
  //     title: "Math",
  //     startDate: "2019-06-23T10:30",
  //     endDate: "2019-06-23T12:30",
  //   },
  //   {
  //     title: "Math",
  //     startDate: new Date(2019, 6, 23, 15, 15),
  //     endDate: new Date(2019, 6, 23, 17, 30),
  //   },
  // {
  //   title: "JAVVVVAAAA",
  //   startDate: new Date(2018, 5, 25, 7, 35),
  //   endDate: new Date(2018, 5, 25, 8, 30),
  //   id: 0,
  //   location: "Room 1",
  // },
  // {
  //   title: "Mah",
  //   startDate: new Date(2018, 5, 25, 8, 35),
  //   endDate: new Date(2018, 5, 25, 10, 30),
  //   id: 0,
  //   location: "Room 1",
  // },
  //   {
  //     title: "Website Re-Design Plan",
  //     startDate: new Date(2018, 5, 25, 9, 35),
  //     endDate: new Date(2018, 5, 25, 11, 30),
  //     id: 0,
  //     location: "Room 1",
  //   },
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
  {
    title: "ISS",
    startDate: new Date(2018, 5, 26, 10, 0),
    endDate: new Date(2018, 5, 26, 11, 0),
    id: 3,
    location: "Room 2",
  },
  {
    title: "JAVA",
    startDate: new Date(2018, 5, 26, 12, 0),
    endDate: new Date(2018, 5, 26, 13, 35),
    id: 4,
    location: "Room 2",
  },
  {
    title: "Differential",
    startDate: new Date(2018, 5, 26, 14, 30),
    endDate: new Date(2018, 5, 26, 15, 45),
    id: 5,
    location: "Room 2",
  },
  {
    title: "Database",
    startDate: new Date(2018, 5, 27, 9, 45),
    endDate: new Date(2018, 5, 27, 11, 15),
    id: 6,
    location: "Room 1",
  },
  {
    title: "Marketing",
    startDate: new Date(2018, 5, 27, 12, 0),
    endDate: new Date(2018, 5, 27, 14, 0),
    id: 7,
    location: "Room 3",
  },
  {
    title: "Web Dev",
    startDate: new Date(2018, 5, 27, 15, 15),
    endDate: new Date(2018, 5, 27, 16, 30),
    id: 8,
    location: "Room 3",
  },
  {
    title: "Game dev",
    startDate: new Date(2018, 5, 28, 11, 0),
    endDate: new Date(2018, 5, 28, 12, 0),
    id: 9,
    location: "Room 3",
  },
  {
    title: "Mobile",
    startDate: new Date(2018, 5, 28, 11, 0),
    endDate: new Date(2018, 5, 28, 13, 30),
    id: 10,
    location: "Room 1",
  },
  {
    title: "UX/UI",
    startDate: new Date(2018, 5, 28, 14, 0),
    endDate: new Date(2018, 5, 28, 15, 30),
    id: 11,
    location: "Room 2",
  },
  {
    title: "Finance",
    startDate: new Date(2018, 5, 29, 10, 0),
    endDate: new Date(2018, 5, 29, 11, 30),
    id: 12,
    location: "Room 2",
  },
  {
    title: "Governance",
    startDate: new Date(2018, 5, 29, 14, 30),
    endDate: new Date(2018, 5, 29, 16, 0),
    id: 13,
    location: "Room 3",
  },
  {
    title: "Intro to c",
    startDate: new Date(2018, 5, 29, 16, 30),
    endDate: new Date(2018, 5, 29, 18, 0),
    id: 14,
    location: "Room 3",
  },
  {
    title: "3d Modeling",
    startDate: new Date(2018, 5, 29, 12, 20),
    endDate: new Date(2018, 5, 29, 14, 0),
    id: 15,
    location: "Room 2",
  },

  {
    title: "Python",
    startDate: new Date(2018, 5, 26, 0, 0),
    endDate: new Date(2018, 5, 27, 0, 0),
    id: 34,
    location: "Room 1",
  },
  {
    title: "Machine Learning",
    startDate: new Date(2018, 5, 29, 10, 0),
    endDate: new Date(2018, 5, 30, 14, 30),
    id: 35,
    location: "Room 1",
  },
];

const courses = [
  { title: "cs101", duration: 2 },
  { title: "cs102", duration: 2 },
  { title: "cs103", duration: 2 },
  { title: "cs104", duration: 2 },
];
console.log(appointmentss[0]);
var eight = moment().set({
  year: 2018,
  month: 5,
  date: 25,
  hour: 8,
  minute: 0,
});
console.log(eight.toString());

courses[0].startDate = eight.toDate();
var tenend = eight.add(courses[0].duration, "hours");
console.log(tenend.toString());
courses[0].endDate = tenend.toDate();
console.log(courses[0]);
var ten = moment().set({
  year: 2018,
  month: 5,
  date: 25,
  hour: 10,
  minute: 10,
});
console.log(ten.toString());
ten.add(2, "hours");
console.log(ten.toString());

const times = [
  {
    startDate: new Date(2018, 5, 26, 8, 30),
    endDate: new Date(2018, 5, 26, 10, 0),
  },
  {
    startDate: new Date(2018, 5, 26, 10, 10),
    endDate: new Date(2018, 5, 26, 12, 40),
  },
  {
    startDate: new Date(2018, 5, 26, 13, 40),
    endDate: new Date(2018, 5, 26, 15, 10),
  },
  {
    startDate: new Date(2018, 5, 26, 15, 20),
    endDate: new Date(2018, 5, 26, 16, 50),
  },
];
const obj3 = { ...courses, ...times };
const obj4 = Object.assign(times, courses);

console.log(obj4);

const appointmentsss = [{}];
const datecreator = () => {
  return new Date();
};
//console.log(new Date(2022, 8, 10, 10));
function randomDate(start, end) {
  return new Date(
    start.getTime() + Math.random() * (end.getTime() - start.getTime())
  );
}

function isBetween(start, days) {
  var startTS = start.getTime();
  var now = new Date().getTime();
  var endTS = startTS + days * 24 * 60 * 60 * 1000;
  return now >= startTS && now <= endTS;
}

const s = randomDate(new Date(2022, 9, 1, 10, 0), new Date(2022, 9, 1, 12, 0));
const e = randomDate(new Date(2022, 9, 1, 10), new Date(2022, 9, 10));
//var g = isBetween(d, 4);
console.log(s);
// console.log(e);

const getDatesBetween = (startDate, endDate, includeEndDate) => {
  const dates = [];
  const currentDate = startDate;
  while (currentDate < endDate) {
    dates.push(new Date(currentDate));
    currentDate.setDate(currentDate.getDate() + 1);
  }
  if (includeEndDate) dates.push(endDate);
  return dates;
};

//console.log(getDatesBetween(new Date(2020, 0, 1), new Date(2020, 0, 3)));
// console.log(
//   getDatesBetween(
//     new Date(2020, 0, 1, 10, 0),
//     new Date(2020, 0, 3, 12, 0),
//     true
//   )
// );

// const currentDate = "2018-05-24";
const currentDate = "2018-06-27";
export const Scheduel = () => {
  return (
    <div>
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
