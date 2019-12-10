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
import Button from '@material-ui/core/Button';

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

export default function WorkingCondition() {
    const user = {
        title: "User Define",
        step: 3
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
                            <Box minWidth="40%" m={1}><TextField fullWidth id="standard-b asic" label="Email"/></Box>
                            <Box minWidth="45%" m={1}>
                                <Grid container direction="row" justify="center" alignItems="center">
                                    <Box>
                                        <TextField id="standard-b asic" label="Password"/>
                                    </Box>
                                    <Box>
                                        <Button variant="contained" color="primary">
                                            Set Password
                                        </Button>
                                    </Box>
                                </Grid>
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
                                            Experience
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
                                    label="Periode"
                                    type="number"
                                    InputLabelProps={{
                                    shrink: true
                                }}/>
                            </Box>
                            <Box m={1}>
                                <FormControl className={classes.formControl}>
                                    <Select
                                        value={age}
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
                    </form>
                </Grid>
            </Box>
        </Grid>
    );
}


