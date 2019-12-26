import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import uuid from 'uuid/v1';
import { makeStyles } from '@material-ui/styles';
import {
  Typography,
  List,
  ListItem,
  ListItemIcon,
  ListItemText
} from '@material-ui/core';
import ContactSupportIcon from '@material-ui/icons/ContactSupportOutlined';

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
  content: {
    marginTop: theme.spacing(6)
  }
}));

const FAQ = props => {
  const { className, ...rest } = props;

  const classes = useStyles();

  const faqs = [
    {
      title: 'What do we use for styling our components?',
      description:
        'We use Material-ui\'s hooks api as we think it’s the best way of avoiding clutter.'
    },
    {
      title:
        'Are the design files (sketch, figma) included in the Standard Package?',
      description:
        'No, we offer the design source file only to Standard Plus Sketch & Figma and Extended Package.'
    },
    {
      title: 'Are you providing support for setting up my project?',
      description:
        'Yes, we offer email support for all our customers & even skype meetings for our extended license customers.'
    }
  ];

  return (
    <div
      {...rest}
      className={clsx(classes.root, className)}
    >
      <div className={classes.inner}>
        <Typography
          align="center"
          variant="h3"
        >
          FAQ
        </Typography>
        <div className={classes.content}>
          <List disablePadding>
            {faqs.map(faq => (
              <ListItem key={uuid()}>
                <ListItemIcon>
                  <ContactSupportIcon />
                </ListItemIcon>
                <ListItemText
                  primary={faq.title}
                  primaryTypographyProps={{ variant: 'h5' }}
                  secondary={faq.description}
                  secondaryTypographyProps={{ variant: 'body1' }}
                />
              </ListItem>
            ))}
          </List>
        </div>
      </div>
    </div>
  );
};

FAQ.propTypes = {
  className: PropTypes.string
};

export default FAQ;
