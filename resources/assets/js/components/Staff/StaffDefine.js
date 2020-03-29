import React from 'react'
import Grid from '@material-ui/core/Grid'
import Box from '@material-ui/core/Box'
import TextField from '@material-ui/core/TextField'
import MenuItem from '@material-ui/core/MenuItem'
import FormHelperText from '@material-ui/core/FormHelperText'
import FormControl from '@material-ui/core/FormControl'
import Select from '@material-ui/core/Select'
import Button from '@material-ui/core/Button'
import DateFnsUtils from '@date-io/date-fns'
import FormLabel from '@material-ui/core/FormLabel'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Radio from '@material-ui/core/Radio'
import RadioGroup from '@material-ui/core/RadioGroup'
import {MuiPickersUtilsProvider, KeyboardDatePicker} from '@material-ui/pickers'

import Progress from './StaffDefinitionPaged/Porgress'
import WorkingTimeDefined from './../WorkingTimeDefined'

export default class StaffDefine extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      experienceData: [
        {
          id: 1,
          name: 'Boss',
          periode: 1,
          factor: 'week',
          pay: 500
        },
        {
          id: 2,
          name: 'Staff',
          periode: 1,
          factor: 'week',
          pay: 500
        }
      ],
      workingTime: '',
      foreName: '',
      middleName: '',
      lastName: '',
      gsm: '',
      password: '',
      birthday: '01/01/2001',
      experience: ''
    }
  }

  render() {
    const experienceMenu = this.state.experienceData.map((data, key) => (
      <MenuItem key={key} value={data.id}>
        {data.name}
      </MenuItem>
    ))
    return (
      <React.Fragment>
        {this.state.workingTime === 'free' && (
          <WorkingTimeDefined type={this.state.workingTime} />
        )}
        {this.state.workingTime === 'planned' && (
          <WorkingTimeDefined type={this.state.workingTime} />
        )}
        {this.state.workingTime === 'fullTime' && (
          <WorkingTimeDefined type={this.state.workingTime} />
        )}
        <Grid container direction="column" justify="center" alignItems="center">
          <Box>
            <Progress progress="Staff Define" />
          </Box>
          <Box>
            <Grid
              container
              direction="column"
              justify="center"
              alignItems="center"
            >
              <form noValidate autoComplete="off">
                <Grid
                  container
                  direction="row"
                  justify="center"
                  alignItems="center"
                >
                  <Box m={1}>
                    <TextField
                      id="standard-basic-foreName"
                      label="Fore Name"
                      value={this.state.foreName}
                      onChange={event =>
                        this.setState({foreName: event.target.value})
                      }
                    />
                  </Box>
                  <Box m={1}>
                    <TextField
                      id="standard-basic-middleName"
                      label="Middle Name"
                      value={this.state.middleName}
                      onChange={event =>
                        this.setState({middleName: event.target.value})
                      }
                    />
                  </Box>
                  <Box m={1}>
                    <TextField
                      id="standard-b asic-lastName"
                      label="Last Name"
                      value={this.state.lastName}
                      onChange={event =>
                        this.setState({lastName: event.target.value})
                      }
                    />
                  </Box>
                </Grid>
                <Grid
                  container
                  direction="row"
                  justify="center"
                  alignItems="center"
                >
                  <Box minWidth="45%" m={1}>
                    <Grid
                      container
                      direction="row"
                      justify="center"
                      alignItems="center"
                    >
                      <Box m={1}>
                        <TextField
                          id="standard-b asic"
                          label="GSM"
                          value={this.state.gsm}
                          onChange={event =>
                            this.setState({gsm: event.target.value})
                          }
                        />
                      </Box>
                      <Box>
                        {this.state.password === '' ? (
                          <Button
                            variant="contained"
                            onClick={() => this.setState({password: '12345'})}
                          >
                            Set Password
                          </Button>
                        ) : (
                          <TextField
                            id="standard-b asic"
                            label="Password"
                            value={this.state.password}
                            onChange={event =>
                              this.setState({password: event.target.value})
                            }
                          />
                        )}
                      </Box>
                    </Grid>
                  </Box>
                </Grid>
                <Grid
                  container
                  direction="row"
                  justify="center"
                  alignItems="center"
                >
                  <Box m={1}>
                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                      <KeyboardDatePicker
                        margin="normal"
                        id="date-picker-dialog"
                        label="Birthday"
                        format="MM/dd/yyyy"
                        value={this.state.birthday}
                        onChange={date => this.setState({birthday: date})}
                        KeyboardButtonProps={{
                          'aria-label': 'change date'
                        }}
                      />
                    </MuiPickersUtilsProvider>
                  </Box>
                  <Box m={1}>
                    <FormControl>
                      <Select
                        value={this.state.experience}
                        onChange={event =>
                          this.setState({experience: event.target.value})
                        }
                        displayEmpty
                      >
                        <MenuItem value="" disabled>
                          Experience
                        </MenuItem>
                        {experienceMenu}
                      </Select>
                      <FormHelperText></FormHelperText>
                    </FormControl>
                  </Box>
                </Grid>
              </form>
            </Grid>
          </Box>
          {this.state.experience !== '' && (
            <Box>
              <Grid
                container
                direction="row"
                justify="center"
                alignItems="center"
              >
                <Box m={1}>
                  <TextField
                    id="filled-number"
                    label="Periode"
                    type="number"
                    value={
                      this.state.experienceData.filter(
                        value => value.id === this.state.experience
                      )[0].periode
                    }
                  />
                </Box>
                <Box m={1}>
                  <FormControl>
                    <Select
                      value={
                        this.state.experienceData.filter(
                          value => value.id === this.state.experience
                        )[0].factor
                      }
                      onChange={event =>
                        this.setState({experience: event.target.value})
                      }
                      displayEmpty
                    >
                      <MenuItem value="" disabled>
                        Factor
                      </MenuItem>
                      <MenuItem value="week">Week</MenuItem>
                      <MenuItem value="month">Month</MenuItem>
                    </Select>
                    <FormHelperText></FormHelperText>
                  </FormControl>
                </Box>
                <Box m={1}>
                  <TextField
                    id="filled-number"
                    label="Pay"
                    type="number"
                    value={
                      this.state.experienceData.filter(
                        value => value.id === this.state.experience
                      )[0].pay
                    }
                  />
                </Box>
              </Grid>
            </Box>
          )}
          {this.state.experience !== '' && (
            <Box>
              <Grid
                container
                direction="row"
                justify="center"
                alignItems="center"
              >
                <Box marginTop={5}>
                  <FormControl component="fieldset">
                    <FormLabel component="legend">
                      Working Time Conditions
                    </FormLabel>
                    <FormControl component="fieldset">
                      <RadioGroup
                        aria-label="position"
                        name="position"
                        value={this.state.workingTime}
                        onChange={event =>
                          this.setState({workingTime: event.target.value})
                        }
                        row
                      >
                        <FormControlLabel
                          value="free"
                          control={<Radio color="primary" />}
                          label="Free Time"
                          labelPlacement="end"
                        />
                        <FormControlLabel
                          value="planned"
                          control={<Radio color="primary" />}
                          label="Planned Time"
                          labelPlacement="end"
                        />
                        <FormControlLabel
                          value="fullTime"
                          control={<Radio color="primary" />}
                          label="Full Time"
                          labelPlacement="end"
                        />
                      </RadioGroup>
                    </FormControl>
                  </FormControl>
                </Box>
              </Grid>
            </Box>
          )}
        </Grid>
      </React.Fragment>
    )
  }
}
