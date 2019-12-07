import React from "react";
import { Route, Switch } from "react-router-dom";

import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
import { trTR } from "@material-ui/core/locale";
import Box from '@material-ui/core/Box';


import Header from './components/Header';
import LeftMenu from './components/LeftMenu';
import StaffDefinitionEditor from './components/StaffDefinitionEditor';


const theme = createMuiTheme(
  {
    palette: {
      primary: {
        main: "#1976d2"
      }
    }
  },
  trTR
);

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Header />
      <Box display="flex" flexDirection="row">
        <Box>
          <LeftMenu />
        </Box>
        <Box>
          <Switch>
            <Route path="/"  component={StaffDefinitionEditor} />
            <Route path='/Staff-Definition' component={StaffDefinitionEditor} />
          </Switch>
        </Box>
      </Box>
    </ThemeProvider>
  );
}

export default App;
