import { createTheme } from "@mui/material";
import { purple } from "@mui/material/colors";

const theme = createTheme({
  palette: {
    primary: {
      main: purple[500],
    },
    secondary: {
      main: "#f44336",
    },
    warning: {
      dark: "black",
    },
  },
});
