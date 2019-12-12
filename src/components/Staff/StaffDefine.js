import React from "react";
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import TextField from '@material-ui/core/TextField';
import {makeStyles} from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Button from '@material-ui/core/Button';
import DateFnsUtils from '@date-io/date-fns';
import FormLabel from '@material-ui/core/FormLabel';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import {MuiPickersUtilsProvider, KeyboardDatePicker} from '@material-ui/pickers';

import Progress from "./StaffDefinitionPaged/Porgress";
import WorkingTimeDefined from "./../WorkingTimeDefined";

const useStyles = makeStyles(theme => ({
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120
    },
    selectEmpty: {
        marginTop: theme.spacing(2)
    }
}));

export default function StaffDefine() {
    const user = {
        title: "Staff Define",
        step: 2
    }

    const [password,
        setPassword] = React.useState("");

    // The first commit of Material-UI
    const [selectedDate,
        setSelectedDate] = React.useState(new Date());

    const handleDateChange = date => {
        setSelectedDate(date);
    };

    const classes = useStyles();
    const [experience,
        setExperience] = React.useState('');

    const [workingTime,
        setWorkingTime] = React.useState('');

    const workingTimeChange = event => {
        setWorkingTime(event.target.value);
    };

    const handleChange = event => {
        setExperience(event.target.value);
    };

    const createPassword = () => {
        setPassword("12345");
    }

    return (
        <React.Fragment>
            {workingTime === 'free' && <WorkingTimeDefined type={workingTime}/>}
            {workingTime === 'planned' && <WorkingTimeDefined type={workingTime}/>}
            {workingTime === 'fullTime' && <WorkingTimeDefined type={workingTime}/>}
            <Grid container direction="column" justify="center" alignItems="center">
                <Box>
                    <Progress progress={user}/>
                </Box>
                <Box>
                    <Grid container direction="column" justify="center" alignItems="center">
                        <form noValidate autoComplete="off">
                            <Grid container direction="row" justify="center" alignItems="center">
                                <Box m={1}><TextField id="standard-basic" label="Fore Name"/></Box>
                                <Box m={1}><TextField id="standard-basic" label="Middle Name"/></Box>
                                <Box m={1}><TextField id="standard-b asic" label="Last Name"/></Box>
                            </Grid>
                            <Grid container direction="row" justify="center" alignItems="center">
                                <Box minWidth="45%" m={1}>
                                    <Grid container direction="row" justify="center" alignItems="center">
                                        <Box m={1}>
                                        <TextField id="standard-b asic" label="GSM"/>
                                        </Box>
                                        <Box>
                                            {password === ""
                                                ? <Button variant="contained" color="primary" onClick={createPassword}>
                                                        Set Password
                                                    </Button>
                                                : <TextField id="standard-b asic" label="Password" value={password}/>
}
                                        </Box>
                                    </Grid>
                                </Box>
                            </Grid>
                            <Grid container direction="row" justify="center" alignItems="center">
                                <Box m={1}>
                                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                        <KeyboardDatePicker
                                            margin="normal"
                                            id="date-picker-dialog"
                                            label="Birthday"
                                            format="MM/dd/yyyy"
                                            value={selectedDate}
                                            onChange={handleDateChange}
                                            KeyboardButtonProps={{
                                            'aria-label': 'change date'
                                        }}/>
                                    </MuiPickersUtilsProvider>
                                </Box>
                                <Box m={1}>
                                    <FormControl className={classes.formControl}>
                                        <Select
                                            value={experience}
                                            onChange={handleChange}
                                            displayEmpty
                                            className={classes.selectEmpty}>
                                            <MenuItem value="" disabled>
                                                Experience
                                            </MenuItem>
                                            <MenuItem value={10}>Unspecified</MenuItem>
                                            <MenuItem value={20}>Mela</MenuItem>
                                            <MenuItem value={30}>Female</MenuItem>
                                        </Select>
                                        <FormHelperText></FormHelperText>
                                    </FormControl>
                                </Box>
                            </Grid>
                        </form>
                    </Grid>
                </Box>
                {experience !== "" && <Box>
                    <Grid container direction="row" justify="center" alignItems="center">
                        <Box m={1}>
                            <TextField
                                id="filled-number"
                                label="Periode"
                                type="number"
                                InputLabelProps={{
                                shrink: true
                            }}/>
                        </Box>
                        <Box m={1}>
                            <FormControl className={classes.formControl}>
                                <Select
                                    value={experience}
                                    onChange={handleChange}
                                    displayEmpty
                                    className={classes.selectEmpty}>
                                    <MenuItem value="" disabled>
                                        Factor
                                    </MenuItem>
                                    <MenuItem value={10}>Unspecified</MenuItem>
                                    <MenuItem value={20}>Mela</MenuItem>
                                    <MenuItem value={30}>Female</MenuItem>
                                </Select>
                                <FormHelperText></FormHelperText>
                            </FormControl>
                        </Box>
                        <Box m={1}>
                            <TextField
                                id="filled-number"
                                label="Pay"
                                type="number"
                                InputLabelProps={{
                                shrink: true
                            }}/>
                        </Box>
                    </Grid>
                </Box>
}
                {experience !== "" && <Box>
                    <Grid container direction="row" justify="center" alignItems="center">
                        <Box>
                            <FormControl component="fieldset" className={classes.formControl}>
                                <FormLabel component="legend">Working Time Conditions</FormLabel>
                                <FormControl component="fieldset">
                                    <RadioGroup
                                        aria-label="position"
                                        name="position"
                                        value={workingTime}
                                        onChange={workingTimeChange}
                                        row>
                                        <FormControlLabel
                                            value="free"
                                            control={< Radio color = "primary" />}
                                            label="Free Time"
                                            labelPlacement="end"/>
                                        <FormControlLabel
                                            value="planned"
                                            control={< Radio color = "primary" />}
                                            label="Planned Time"
                                            labelPlacement="end"/>
                                        <FormControlLabel
                                            value="fullTime"
                                            control={< Radio color = "primary" />}
                                            label="Full Time"
                                            labelPlacement="end"/>
                                    </RadioGroup>
                                </FormControl>
                            </FormControl>
                        </Box>
                    </Grid>
                </Box>
}
            </Grid>
        </React.Fragment>
    );
}