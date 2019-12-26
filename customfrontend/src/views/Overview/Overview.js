import React from 'react';
import { makeStyles } from '@material-ui/styles';
import axios from "axios";

import { Page } from 'components';
import {
  Header,
  Statistics,
  Notifications,
  Projects,
  Todos
} from './components';

import { API_BASE } from "./../../config/env";

const useStyles = makeStyles(theme => ({
  root: {
    width: theme.breakpoints.values.lg,
    maxWidth: '100%',
    margin: '0 auto',
    padding: theme.spacing(3)
  },
  statistics: {
    marginTop: theme.spacing(3)
  },
  notifications: {
    marginTop: theme.spacing(6)
  },
  projects: {
    marginTop: theme.spacing(6)
  },
  todos: {
    marginTop: theme.spacing(6)
  }
}));



const Overview = props => {
  const classes = useStyles();
  let businessData;
  axios.post(API_BASE + "/business/admin").then((result)=> businessData = result.data );  

  return (
    <Page
      className={classes.root}
      title="Overview"
    >
      <Header data={businessData} />
      <Statistics className={classes.statistics} />
      <Notifications className={classes.notifications} />
      <Projects className={classes.projects} />
      <Todos className={classes.todos} />
    </Page>
  );
};

export default Overview;
