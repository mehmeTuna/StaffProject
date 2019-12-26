import React from 'react';
import { makeStyles } from '@material-ui/styles';

import { Page } from 'components';
import {
  Header,
  FAQ,
  PluginsSupport,
  SourceFiles,
  UserFlows
} from './components';

const useStyles = makeStyles(() => ({
  root: {}
}));

const Presentation = () => {
  const classes = useStyles();

  return (
    <Page
      className={classes.root}
      title="Presentation"
    >
      <Header />
      <UserFlows />
      <PluginsSupport />
      <SourceFiles />
      <FAQ />
    </Page>
  );
};

export default Presentation;
