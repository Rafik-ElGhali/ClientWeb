import React, { useState, useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import "./CourseTable.css";
import Axios from "axios";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";

import { styled } from "@mui/system";
import TablePaginationUnstyled from "@mui/base/TablePaginationUnstyled";

function createData(id, name, email, courses, freeday) {
  return { id, name, email, courses, freeday };
}

const rows = [
  createData(
    101,
    "Mahmoud Mansouri",
    "mahmoud.mansouri@medtech.tn",
    "ALL CS Courses",
    "Vendredi"
  ),
].sort((a, b) => (a.calories < b.calories ? -1 : 1));

const blue = {
  200: "#A5D8FF",
  400: "#3399FF",
};

const grey = {
  50: "#F3F6F9",
  100: "#E7EBF0",
  200: "#E0E3E7",
  300: "#CDD2D7",
  400: "#B2BAC2",
  500: "#A0AAB4",
  600: "#6F7E8C",
  700: "#3E5060",
  800: "#2D3843",
  900: "#1A2027",
};

const Root = styled("div")(
  ({ theme }) => `
      table {
        font-family: IBM Plex Sans, sans-serif;
        font-size: 0.875rem;
        border-collapse: collapse;
        width: 100%;
      }
    
      td,
      th {
        border: 1px solid ${
          theme.palette.mode === "dark" ? grey[800] : grey[200]
        };
        text-align: left;
        padding: 6px;
      }
    
      th {
        background-color: ${
          theme.palette.mode === "dark" ? grey[900] : grey[100]
        };
      }
      `
);

const CustomTablePagination = styled(TablePaginationUnstyled)(
  ({ theme }) => `
      & .MuiTablePaginationUnstyled-spacer {
        display: none;
      }
      & .MuiTablePaginationUnstyled-toolbar {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        gap: 10px;
    
        @media (min-width: 768px) {
          flex-direction: row;
          align-items: center;
        }
      }
      & .MuiTablePaginationUnstyled-selectLabel {
        margin: 0;
      }
      & .MuiTablePaginationUnstyled-select {
        padding: 2px;
        border: 1px solid ${
          theme.palette.mode === "dark" ? grey[800] : grey[200]
        };
        border-radius: 50px;
        background-color: transparent;
        &:hover {
          background-color: ${
            theme.palette.mode === "dark" ? grey[800] : grey[50]
          };
        }
        &:focus {
          outline: 1px solid ${
            theme.palette.mode === "dark" ? blue[400] : blue[200]
          };
        }
      }
      & .MuiTablePaginationUnstyled-displayedRows {
        margin: 0;
    
        @media (min-width: 768px) {
          margin-left: auto;
        }
      }
      & .MuiTablePaginationUnstyled-actions {
        padding: 2px;
        border: 1px solid ${
          theme.palette.mode === "dark" ? grey[800] : grey[200]
        };
        border-radius: 50px;
        text-align: center;
      }
      & .MuiTablePaginationUnstyled-actions > button {
        margin: 0 8px;
        border: transparent;
        border-radius: 2px;
        background-color: transparent;
        &:hover {
          background-color: ${
            theme.palette.mode === "dark" ? grey[800] : grey[50]
          };
        }
        &:focus {
          outline: 1px solid ${
            theme.palette.mode === "dark" ? blue[400] : blue[200]
          };
        }
      }
      `
);

export default function ProfessorCourse() {
  useEffect(() => {
    Axios.get("http://localhost:5000/api/getteachers").then((response) => {
      setProfessorList(response.data);
    });
  }, []);

  const [professorList, setProfessorList] = useState([]);

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <div className="tableau">
      <Root sx={{ width: 500, maxWidth: "100%", padding: "50px" }}>
        <table aria-label="custom pagination table">
          <thead>
            <tr>
              <th>Id</th>
              <th>Name</th>
              <th>Email</th>
              <th>Course</th>
              <th>Free day</th>
            </tr>
          </thead>
          <tbody>
            {(rowsPerPage > 0
              ? professorList.slice(
                  page * rowsPerPage,
                  page * rowsPerPage + rowsPerPage
                )
              : professorList
            ).map((row) => (
              <tr key={row.Id}>
                <td>{row.Id}</td>
                <td style={{ width: 120 }} align="right">
                  {row.Name}
                </td>
                <td style={{ width: 120 }} align="right">
                  {row.Email}
                </td>
                <td style={{ width: 120 }} align="right">
                  {row.Course}
                </td>
                <td style={{ width: 120 }} align="right">
                  {row.Freeday}
                </td>
              </tr>
            ))}

            {emptyRows > 0 && (
              <tr style={{ height: 41 * emptyRows }}>
                <td colSpan={3} />
              </tr>
            )}
          </tbody>
          <tfoot>
            <tr>
              <CustomTablePagination
                rowsPerPageOptions={[5, 10, 25, { label: "All", value: -1 }]}
                colSpan={10}
                count={rows.length}
                rowsPerPage={rowsPerPage}
                page={page}
                componentsProps={{
                  select: {
                    "aria-label": "rows per page",
                  },
                  actions: {
                    showFirstButton: true,
                    showLastButton: true,
                  },
                }}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
              />
            </tr>
          </tfoot>
        </table>
        <Stack spacing={8} sx={{ padding: "50px" }} direction="row">
          <Link to="/AddProfessor">
            <Button variant="contained">Add Proffesors</Button>
          </Link>
        </Stack>
      </Root>
    </div>
  );
}

// export default function ProfessorCourse() {
//   return <div></div>;
// }
