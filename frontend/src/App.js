import React from "react";
import {Route, Switch} from "react-router-dom";

import {createMuiTheme, ThemeProvider} from "@material-ui/core/styles";
import {trTR} from "@material-ui/core/locale";
import Box from '@material-ui/core/Box';

import Header from './components/Header';
import LeftMenu from './components/LeftMenu';
import StaffDefinitionEditor from './components/StaffDefinitionEditor';
import StaffCareerList from './components/StaffCareerList';

const theme = createMuiTheme({
    palette: {
        primary: {
            main: "#1976d2"
        }
    }
}, trTR);

function App() {
    return (
        <ThemeProvider theme={theme}>
            <Header/>
            <Switch>
                <Route path='/Staff-Career-List' component={StaffCareerList}/>
                <Route path='/Staff-Definition' component={StaffDefinitionEditor}/>
                <Route path="/" component={StaffCareerList}/>
            </Switch>
        </ThemeProvider>
    );
}

export default App;
