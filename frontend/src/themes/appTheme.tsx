import { createTheme } from "@mui/material";

export const appTheme = createTheme({
  palette: {
    primary: {
      main: "#A20D32",
    },
    secondary: {
      main: "#E3CDB9",
    },
    background: {
      default: "#FAF2E9",
    },
    error: {
      main: "#FF0000",
    },
    info: {
      main: "#C2DDDD",
    },
    warning: {
      main: "#FEB417",
    },
  },
  components: {
    MuiTableRow: {
      styleOverrides: {
        root: {
          "&:hover": {
            backgroundColor: "#fdfbf8",
          },
        },
      },
    },
  },
});
