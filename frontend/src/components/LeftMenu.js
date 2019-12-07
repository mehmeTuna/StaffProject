import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import ListSubheader from '@material-ui/core/ListSubheader';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Collapse from '@material-ui/core/Collapse';
import SendIcon from '@material-ui/icons/Send';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import StarBorder from '@material-ui/icons/StarBorder';

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    maxWidth: 250,
    backgroundColor: theme.palette.background.paper,
  },
  nested: {
    paddingLeft: theme.spacing(4),
  },
  iconRight:{
      marginRight:10
  }
}));

export default function LeftMenu() {
  const classes = useStyles();
  const [open, setOpen] = React.useState(true);

  const handleClick = () => {
    setOpen(!open);
  };

  return (
    <List
      component="nav"
      aria-labelledby="nested-list-subheader"
      subheader={
        <ListSubheader component="div" id="nested-list-subheader">
          İşlemler
        </ListSubheader>
      }
      className={classes.root}
    >
      <ListItem button dense component="a" href="#">
        <SendIcon className={classes.iconRight} />
        <ListItemText primary="Business Authorized Staff List" />
      </ListItem>
      <ListItem button dense component="a" href="#">
        <SendIcon className={classes.iconRight} />
        <ListItemText primary="Business Defined Experiences List" />
      </ListItem>
      <ListItem button dense component="a" href="#">
         <SendIcon className={classes.iconRight} />
        <ListItemText primary="Business Editor" />
      </ListItem>
      <ListItem button dense component="a" href="#">
       <SendIcon className={classes.iconRight} />
        <ListItemText primary="Business MinWage List" />
      </ListItem>
      <ListItem button dense component="a" href="#">
          <SendIcon className={classes.iconRight} />
        <ListItemText primary="Business Relay Editor" />
      </ListItem>
      <ListItem button dense component="a" href="#">
         <SendIcon className={classes.iconRight} />
        <ListItemText primary="Career Editor" />
      </ListItem>
      <ListItem button dense component="a" href="#">
         <SendIcon className={classes.iconRight} />
        <ListItemText primary="Staff Career List" />
      </ListItem>
      <ListItem button dense component="a" href="#">
         <SendIcon className={classes.iconRight} />
        <ListItemText primary="Staf fDefinition Editort" />
      </ListItem>
      <ListItem button dense component="a" href="#">
          <SendIcon className={classes.iconRight} />
        <ListItemText primary="Staff Editor" />
      </ListItem>
      <ListItem button dense component="a" href="#">
         <SendIcon className={classes.iconRight} />
        <ListItemText primary="Staf Employment History" />
      </ListItem>
      <ListItem button dense component="a" href="#">
         <SendIcon className={classes.iconRight} />
        <ListItemText primary="Staff Identity Card" />
      </ListItem>
      <ListItem button dense component="a" href="#">
         <SendIcon className={classes.iconRight} />
        <ListItemText primary="Staff List" />
      </ListItem>
      <ListItem button dense component="a" href="#">
          <SendIcon className={classes.iconRight} />
        <ListItemText primary="Staff Progress Payment Calculator And Definition Editor" />
      </ListItem>
      <ListItem button dense component="a" href="#">
          <SendIcon className={classes.iconRight} />
        <ListItemText primary="Staff Progress Payment History List" />
      </ListItem>
      <ListItem button dense component="a" href="#">
        <ListItemIcon>
          <SendIcon />
        </ListItemIcon>
        <ListItemText primary="Staff Time IO Report" />
      </ListItem>
      <ListItem button onClick={handleClick}>
      <SendIcon className={classes.iconRight} />
        <ListItemText primary="Inbox" />
        {open ? <ExpandLess /> : <ExpandMore />}
      </ListItem>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          <ListItem button className={classes.nested}>
            <ListItemIcon>
              <StarBorder />
            </ListItemIcon>
            <ListItemText primary="Starred" />
          </ListItem>
        </List>
      </Collapse>
    </List>
  );
}
