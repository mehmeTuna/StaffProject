import React from 'react';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import { trTR } from '@material-ui/core/locale';

import MiniDrawer from './components/MiniDrawer';
import StaffCareerList from './components/StaffCareerList/StaffCareerList';
import { Route, Switch } from 'react-router-dom'


const theme = createMuiTheme({
  palette: {
    primary: { main: '#1976d2' },
  },
}, trTR);

function App() {
  return (
    <ThemeProvider theme={theme}>
        <Switch>
          <Route exact path="/" component={MiniDrawer} />
          <Route path="/Staff-Career-List" component={StaffCareerList} />
        </Switch>
    </ThemeProvider>
  );
}

export default App;
