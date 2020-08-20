import React from 'react'
import Grid from '@material-ui/core/Grid'
import Box from '@material-ui/core/Box'
import {
  makeStyles,
  createMuiTheme,
  ThemeProvider
} from '@material-ui/core/styles'
import Avatar from '@material-ui/core/Avatar'
import Typography from '@material-ui/core/Typography'

const theme = createMuiTheme()

theme.typography.h3 = {
  fontSize: '1.2rem',
  '@media (min-width:600px)': {
    fontSize: '1.5rem'
  },
  [theme.breakpoints.up('md')]: {
    fontSize: '2rem'
  }
}

const useStyles = makeStyles(theme => ({
  avatarContent: {
    textAlign: 'center'
  },
  large: {
    marginLeft: 'auto',
    marginRight: 'auto',
    width: theme.spacing(10),
    height: theme.spacing(10)
  },
  heroTitle: {
    fontSize: 24
  },
  item: {
    paddingTop: '0.25rem',
    paddingRight: theme.spacing(1)
  }
}))

export default function HeroProfile({...props}) {
  const classes = useStyles()
  return (
    <Grid {...props} container spacing={3}>
      <Grid className={classes.avatarContent} item xs={12} md={4} lg={4}>
        <Avatar
          alt="Remy Sharp"
          src="https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.scoop.it%2Ftopic%2Fweb-solution-3%2Fp%2F4106940175%2F2019%2F04%2F12%2Fprofile-card-design-css3-transition&psig=AOvVaw1bRppYQeVSAoLAeqNEX-Gu&ust=1589698204995000&source=images&cd=vfe&ved=0CAIQjRxqFwoTCNj-sLjlt-kCFQAAAAAdAAAAABAa"
          className={classes.large}
        />
        <ThemeProvider theme={theme}>
          <Typography variant="h6">Full Name</Typography>
          <Typography variant="subtitle1">Barmen Bar</Typography>
        </ThemeProvider>
      </Grid>
      <Grid container item xs={12} md={8} lg={8}>
        <Grid item>
          <ThemeProvider theme={theme}>
            <Typography variant="subtitle1">Birthday</Typography>
            <Typography className={classes.item} variant="subtitle1">
              Address
            </Typography>
            <Typography className={classes.item} variant="subtitle1">
              Phone
            </Typography>
            <Typography className={classes.item} variant="subtitle1">
              Email
            </Typography>
            <Typography className={classes.item} variant="subtitle1">
              Gender
            </Typography>
            <Typography className={classes.item} variant="subtitle1">
              Martial Status
            </Typography>
          </ThemeProvider>
        </Grid>
        <Grid item>
          <ThemeProvider theme={theme}>
            <Typography variant="h6">Birthday</Typography>
            <Typography variant="h6">Birthday</Typography>
            <Typography variant="h6">Birthday</Typography>
            <Typography variant="h6">Birthday</Typography>
            <Typography variant="h6">Birthday</Typography>
            <Typography variant="h6">Birthday</Typography>
          </ThemeProvider>
        </Grid>
      </Grid>
    </Grid>
  )
}
