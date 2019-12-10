import React from "react";
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import TextField from '@material-ui/core/TextField';
import {makeStyles} from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import DateFnsUtils from '@date-io/date-fns';
import {MuiPickersUtilsProvider, KeyboardTimePicker, KeyboardDatePicker} from '@material-ui/pickers';

import Progress from "./Porgress";

const useStyles = makeStyles(theme => ({
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120
    },
    selectEmpty: {
        marginTop: theme.spacing(2)
    }
}));

export default function UserDefine() {
    const user = {
        title: "User Define",
        step: 2
    }

    // The first commit of Material-UI
    const [selectedDate,
        setSelectedDate] = React.useState(new Date());

    const handleDateChange = date => {
        setSelectedDate(date);
    };

    const classes = useStyles();
    const [age,
        setAge] = React.useState('');

    const handleChange = event => {
        setAge(event.target.value);
    };
    return (
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
                            <Box m={1}>
                                <TextField
                                    id="outlined-textarea"
                                    label="Adress"
                                    placeholder="Adress"
                                    multiline
                                    />
                            </Box>
                            <Box m={1}>
                                <TextField
                                    id="filled-number"
                                    label="Telephone"
                                    type="number"
                                    InputLabelProps={{
                                    shrink: true
                                }}/>
                            </Box>
                            <Box m={1}>
                                <TextField
                                    id="filled-number"
                                    label="Gsm"
                                    type="number"
                                    InputLabelProps={{
                                    shrink: true
                                }}/>
                            </Box>
                        </Grid>
                        <Grid container direction="row" justify="center" alignItems="center">
                            <Box m={1}>
                                <FormControl className={classes.formControl}>
                                    <Select
                                        value={age}
                                        onChange={handleChange}
                                        displayEmpty
                                        className={classes.selectEmpty}>
                                        <MenuItem value="" disabled>
                                            Gender
                                        </MenuItem>
                                        <MenuItem value={10}>Unspecified</MenuItem>
                                        <MenuItem value={20}>Mela</MenuItem>
                                        <MenuItem value={30}>Female</MenuItem>
                                    </Select>
                                    <FormHelperText></FormHelperText>
                                </FormControl>
                            </Box>
                            <Box m={1}>
                                <FormControl className={classes.formControl}>
                                    <Select
                                        value={age}
                                        onChange={handleChange}
                                        displayEmpty
                                        className={classes.selectEmpty}>
                                        <MenuItem value="" disabled>
                                            Martial Status
                                        </MenuItem>
                                        <MenuItem value={10}>Unspecified</MenuItem>
                                        <MenuItem value={20}>Single</MenuItem>
                                        <MenuItem value={30}>Married</MenuItem>
                                    </Select>
                                    <FormHelperText></FormHelperText>
                                </FormControl>
                            </Box>
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
                        </Grid>
                    </form>
                </Grid>
            </Box>
        </Grid>
    );
}