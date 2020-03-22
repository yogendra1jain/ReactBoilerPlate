import { createMuiTheme } from '@material-ui/core/styles';

const theme = createMuiTheme({

   palette: {
      primary: {
         main: '#313787',
      },
      secondary: {
         main: '#009688',
      },
      default: {
         main: '#dc0909'
      },
      background: {
         default: "#fff"
      }
   },
   typography: {
      fontFamily: "\"Karla\", \"sans-serif\"",
      button: {
         fontSize: "0.875rem",
         textTransform: "uppercase",
         fontWeight: 500,
         fontFamily: "\"Karla\", \"sans-serif\"",
         color: "rgba(0, 0, 0, 0.87)"
      }
   },
});

export default theme;