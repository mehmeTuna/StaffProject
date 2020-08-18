import React from 'react'
import {connect} from 'react-redux'

import {makeStyles} from '@material-ui/core/styles'
import {
  ListItem,
  ListItemAvatar,
  ListItemText,
  Avatar,
  IconButton,
  Typography,
  List,
  ListItemSecondaryAction
} from '@material-ui/core'
import InfoIcon from '@material-ui/icons/Info'
import {Link} from 'react-router-dom'
import StaffAvatar from './Staff/StaffAvatar'

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
  demo: {
    backgroundColor: theme.palette.background.paper
  },
  title: {
    margin: theme.spacing(4, 0, 2)
  }
}))

const Item = ({item, businessName}) => {
  return (
    <ListItem
      button
      component={Link}
      to={`/${businessName}/staff/list/${item.id}`}
    >
      <ListItemAvatar>
        <StaffAvatar src={item.image} online={item.online} />
      </ListItemAvatar>
      <ListItemText
        primary={
          <Typography variant="h5" gutterBottom>
            {`${item.firstName} ${item.lastName}`}
          </Typography>
        }
        secondary={
          item.experience_data !== null && (
            <Typography variant="h6" gutterBottom>
              {item.experience_data.identifier}
            </Typography>
          )
        }
      />
      <ListItemSecondaryAction>
        <IconButton edge="end" aria-label="Info">
          <InfoIcon />
        </IconButton>
      </ListItemSecondaryAction>
    </ListItem>
  )
}

function StaffListComponent({listItems, businessName}) {
  const classes = useStyles()

  return (
    <List dense className={classes.root}>
      {listItems.map((item, key) => {
        return <Item key={key} item={item} businessName={businessName} />
      })}
    </List>
  )
}

const mapStateProps = state => {
  return {
    listItems: state.staffReducer.staff,
    businessName: state.profileReducer.username
  }
}

const StaffList = connect(mapStateProps, null)(StaffListComponent)

export default StaffList
