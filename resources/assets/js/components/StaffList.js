import React from 'react'
import Grid from '@material-ui/core/Grid'
import Box from '@material-ui/core/Box'
import Avatar from '@material-ui/core/Avatar'
import {makeStyles} from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'

import FilterModal from './Staff/FilterModal'
import StaffDefinitionEditorModal from './Staff/StaffDefinitionEditorModal'
import StaffAbout from './Staff/StaffAbout'

const useStyles = makeStyles(theme => ({
  textColor: {
    opacity: 0.8,
    fontWeight: 'bold',
    color: '#495057'
  }
}))

function UserList(data) {
  const classes = useStyles()

  let user = data.user
  return (
    <Box
      border={1}
      borderRadius={10}
      borderColor={'#E5E8E9'}
      p={1}
      marginTop={1}
    >
      <Grid
        container
        direction="row"
        justify="space-between"
        alignItems="center"
      >
        <Box>
          <Grid
            container
            direction="row"
            justify="flex-start"
            alignItems="center"
          >
            <Box marginRight={2} component="div" display="inline">
              {user.img !== undefined ? (
                <Avatar>H</Avatar>
              ) : (
                <Avatar
                  alt="Remy Sharp"
                  src="https://picsum.photos/id/696/200/300"
                />
              )}
            </Box>
            <Box>
              <Grid
                container
                direction="row"
                justify="center"
                alignItems="center"
              >
                <Box>
                  <Grid
                    container
                    direction="column"
                    justify="flex-end"
                    alignItems="flex-start"
                  >
                    <Box className={classes.textColor}>Full Name</Box>
                    <Box className={classes.textColor}>Alias</Box>
                  </Grid>
                </Box>
                <Box marginLeft={1}>
                  <Grid
                    container
                    direction="column"
                    justify="flex-start"
                    alignItems="flex-start"
                  >
                    <Box>{user.FullName}</Box>
                    <Box>{user.Alias}</Box>
                  </Grid>
                </Box>
              </Grid>
            </Box>
          </Grid>
        </Box>
        <Box>
          <Grid container direction="row" justify="center" alignItems="center">
            <Box>
              <Grid
                container
                direction="column"
                justify="flex-end"
                alignItems="flex-start"
              >
                <Box className={classes.textColor}>Class</Box>
                <Box className={classes.textColor}>Experience</Box>
                <Box className={classes.textColor}>Status</Box>
              </Grid>
            </Box>
            <Box marginLeft={1}>
              <Grid
                container
                direction="column"
                justify="flex-start"
                alignItems="flex-start"
              >
                <Box>{user.Class}</Box>
                <Box>{user.Experience}</Box>
                <Box>{user.Status}</Box>
              </Grid>
            </Box>
          </Grid>
        </Box>
        <Box>
          <Grid container direction="row" justify="center" alignItems="center">
            <Box>
              {user.active !== undefined ? (
                <Button size="small" color="secondary">
                  S. Working
                </Button>
              ) : (
                <Button size="small" color="secondary">
                  Dont S. Wokring
                </Button>
              )}
            </Box>
          </Grid>
        </Box>
        <Box>
          <StaffAbout Staff={user} />
        </Box>
      </Grid>
    </Box>
  )
}

export default class StaffList extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      userListData: [
        {
          Alias: 'Bulent',
          FullName: 'Bulent Colak',
          Gender: 'Male',
          CreationTime: '25.10.2019 20:39:42',
          Password: 'Assigned',
          Staff: 'Bulent Colak',
          Birthday: '25.10.1974',
          Age: '45',
          MartialStatus: 'Unspesified',
          Gsm: '0072 7292641',
          Class: 'Boss',
          Experience: 'FOUNDER',
          Status: 'Recruitment',
          ProcessTime: '25.10.2019 19:47:44',
          Working: true
        },
        {
          Alias: 'Bulent',
          FullName: 'Mehmet Tuna',
          Gender: 'Male',
          CreationTime: '25.10.2019 20:39:42',
          Password: 'Assigned',
          Staff: 'Bulent Colak',
          Birthday: '25.10.1974',
          Age: '45',
          MartialStatus: 'Unspesified',
          Gsm: '0072 7292641',
          Class: 'Boss',
          Experience: 'FOUNDER',
          Status: 'Recruitment',
          ProcessTime: '25.10.2019 19:47:44',
          Working: false
        }
      ]
    }
  }

  render() {
    const userList = this.state.userListData.map((data, key) => (
      <UserList key={key} user={data} />
    ))
    return (
      <Box
        mx="auto"
        marginTop="2em"
        marginLeft={{
          xs: 10,
          md: 10,
          lg: 15
        }}
        width={{
          xs: '90%',
          md: '90%',
          lg: '85%'
        }}
      >
        <Box>
          <Grid
            container
            direction="row"
            justify="space-between"
            alignItems="center"
          >
            <StaffDefinitionEditorModal />
            <FilterModal />
          </Grid>
        </Box>
        <Box minWidth={600}>{userList}</Box>
      </Box>
    )
  }
}
