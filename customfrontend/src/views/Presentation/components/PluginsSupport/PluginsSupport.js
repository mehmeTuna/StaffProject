import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/styles';
import { Typography, Grid } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: theme.palette.white
  },
  inner: {
    padding: theme.spacing(6, 3),
    width: theme.breakpoints.values.lg,
    maxWidth: '100%',
    margin: '0 auto'
  },
  media: {
    '& img': {
      width: '100%',
      height: 'auto'
    }
  }
}));

const PluginsSupport = props => {
  const { className, ...rest } = props;

  const classes = useStyles();

  return (
    <div
      {...rest}
      className={clsx(classes.root, className)}
    >
      <div className={classes.inner}>
        <Grid
          alignItems="center"
          container
          justify="space-between"
        >
          <Grid
            item
            lg={3}
            md={6}
            xs={12}
          >
            <Typography
              gutterBottom
              variant="h3"
            >
              Support for Plugins
            </Typography>
            <Typography variant="subtitle2">
              The kit provides support for multiple third-party plugins right
              out of the box like Chart.js, Dropzone.js, Kanban Plugin and many
              more.
            </Typography>
          </Grid>
          <Grid
            className={classes.media}
            item
            lg={4}
            md={6}
            xs={12}
          >
            <img
              alt="User flows"
              src="/images/presentation/plugins_support.png"
            />
          </Grid>
        </Grid>
      </div>
    </div>
  );
};

PluginsSupport.propTypes = {
  className: PropTypes.string
};

export default PluginsSupport;
