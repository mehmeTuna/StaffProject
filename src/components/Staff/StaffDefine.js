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
import HeroAvatar from './HeroAvatar';
import FormLabel from '@material-ui/core/FormLabel';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import DescriptionIcon from '@material-ui/icons/Description';
import {MuiPickersUtilsProvider, KeyboardDatePicker} from '@material-ui/pickers';

import Progress from "./StaffDefinitionPaged/Porgress";

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

    // The first commit of Material-UI
    const [selectedDate,
        setSelectedDate] = React.useState(new Date());

    const handleDateChange = date => {
        setSelectedDate(date);
    };

    const classes = useStyles();
    const [age,
        setAge] = React.useState('');

    const [state,
        setState] = React.useState({gilad: true, jason: false, antoine: false});
    const {gilad, jason, antoine} = state;

    const handleChange = event => {
        setAge(event.target.value);
    };

    const handleChangeEvent = name => event => {
        setState({
            ...state,
            [name]: event.target.checked
        });
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
                                <TextField
                                    id="outlined-textarea"
                                    label="Adress"
                                    placeholder="Adress"
                                    multiline/>
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
            <Box>
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
            </Box>
            <Box>
                <Box>
                    <Grid container direction="row" justify="center" alignItems="center">
                        <Box marginRight={5}>
                            <HeroAvatar/>
                        </Box>
                        <Box>
                            <FormControl component="fieldset" className={classes.formControl}>
                                <FormLabel component="legend">Working Time Conditions</FormLabel>
                                <FormGroup>
                                    <FormControlLabel
                                        control={< Checkbox checked = {
                                        gilad
                                    }
                                    onChange = {
                                        handleChangeEvent('gilad')
                                    }
                                    value = "gilad" />}
                                        label="Free Time"/>
                                    <FormControlLabel
                                        control={< Checkbox checked = {
                                        jason
                                    }
                                    onChange = {
                                        handleChangeEvent('jason')
                                    }
                                    value = "jason" />}
                                        label="Planned Time"/>
                                    <FormControlLabel
                                        control={< Checkbox checked = {
                                        antoine
                                    }
                                    onChange = {
                                        handleChangeEvent('antoine')
                                    }
                                    value = "antoine" />}
                                        label="Full Time"/>
                                </FormGroup>
                                <FormHelperText>
                                    <Button variant="contained" color="primary">
                                        <DescriptionIcon/>
                                        Generate
                                    </Button>
                                </FormHelperText>
                            </FormControl>
                        </Box>
                    </Grid>
                </Box>
            </Box>
        </Grid>
    );
}