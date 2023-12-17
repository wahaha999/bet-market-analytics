import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  components: {
    MuiTypography: {
      styleOverrides: {
        root: {
          display: "inline",
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 18,
          textTransform: "capitalize",
          marginLeft: "10px",
        },
      },
    },
  },
});

export default theme;
