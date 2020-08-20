import React from 'react'
import {makeStyles, withStyles, CardHeader, Box} from '@material-ui/core'
import Slide from '@material-ui/core/Slide'
import Card from '@material-ui/core/Card'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import CloseIcon from '@material-ui/icons/Close'
import Backdrop from '@material-ui/core/Backdrop'
import Btn from '../assets/Button'
import theme from '../theme'
import FormControl from '@material-ui/core/FormControl'
import InputLabel from '@material-ui/core/InputLabel'
import Select from '@material-ui/core/Select'
import MenuItem from '@material-ui/core/MenuItem'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Checkbox from '@material-ui/core/Checkbox'

const useStyles = makeStyles(theme => ({
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff'
  },
  details: {
    right: 0,
    width: 375,
    height: '100vh',
    position: 'absolute'
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120
  }
}))

const GreenCheckbox = withStyles({
  root: {
    color: theme.colors.primary,
    '&$checked': {
      color: theme.colors.primary
    }
  },
  checked: {}
})(props => <Checkbox color="default" {...props} />)

const CustomCheckBox = ({title, ...props}) => (
  <Box>
    <FormControlLabel control={<GreenCheckbox {...props} />} label={title} />
  </Box>
)

export default function StaffFilter(props) {
  const classes = useStyles()

  return (
    <React.Fragment>
      <Backdrop className={classes.backdrop} open={props.data.isFilterOpen}>
        <Slide direction="left" in={true} mountOnEnter unmountOnExit>
          <Card className={classes.details} variant="outlined">
            <CardHeader
              avatar={
                <Btn
                  variant="outlined"
                  style={{color: 'black'}}
                  startIcon={<CloseIcon />}
                  onClick={() => props.setOpen(false)}
                >
                  Close
                </Btn>
              }
            />
            <CardContent>
              <CustomCheckBox
                checked={props.data.balance}
                onChange={e =>
                  props.updateFilterData(
                    Object.assign({}, props.data, {balance: e.target.checked})
                  )
                }
                name="checkedA"
                title="Already paid"
              />
              <CustomCheckBox
                checked={props.data.payment}
                onChange={e =>
                  props.updateFilterData(
                    Object.assign({}, props.data, {
                      payment: e.target.checked
                    })
                  )
                }
                name="checkedA"
                title="List those with payment"
              />
              <Box>
                <FormControl variant="outlined" className={classes.formControl}>
                  <InputLabel id="demo-simple-select-outlined-label">
                    Experience
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-outlined-label"
                    id="demo-simple-select-outlined"
                    value={props.data.experience}
                    onChange={e =>
                      props.updateFilterData(
                        Object.assign({}, props.data, {
                          experience: e.target.value
                        })
                      )
                    }
                    label="Experince"
                  >
                    <MenuItem value="All">All</MenuItem>
                    {props.staff.map((e, key) => (
                      <MenuItem key={key} value={e.experience}>
                        {e.experience}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Box>
            </CardContent>
            <CardActions>
              <Btn
                style={{backgroundColor: theme.colors.primary}}
                onClick={props.applyFilter}
              >
                APPLY FILTERS
              </Btn>
            </CardActions>
          </Card>
        </Slide>
      </Backdrop>
    </React.Fragment>
  )
}
