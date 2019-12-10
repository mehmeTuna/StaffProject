import 'date-fns';
import React from 'react';
import {withStyles, makeStyles} from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';
import Box from '@material-ui/core/Box';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormLabel from '@material-ui/core/FormLabel';
import DateFnsUtils from '@date-io/date-fns';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import {MuiPickersUtilsProvider, KeyboardDatePicker} from '@material-ui/pickers';

import HeroAvatar from './Staff/HeroAvatar';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';

const CssTextField = withStyles({
    root: {
        '& label.Mui-focused': {
            color: 'green'
        },
        '& .MuiInput-underline:after': {
            borderBottomColor: 'green'
        },
        '& .MuiOutlinedInput-root': {
            '& fieldset': {
                borderColor: 'black'
            },
            '&:hover fieldset': {
                borderColor: 'blue'
            },
            '&.Mui-focused fieldset': {
                borderColor: 'green'
            }
        }
    }
})(TextField);

const useStyles = makeStyles(theme => ({
    root: {
        marginLeft: 10,
        marginTop: 30
    },
    margin: {
        marginTop: 5
    },
    input: {
        width: "48%",
        marginRight: 10,
        minWidth: 200
    },
    working: {
        marginTop: 10
    },
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120
    },
    selectEmpty: {
        marginTop: theme.spacing(2)
    }
}));

export default function StaffDefinitionEditor() {
    const classes = useStyles();
    const [value,
        setValue] = React.useState('female');
    const inputLabel = React.useRef(null);
    const [age,
        setAge] = React.useState('');

    const handleChange = event => {
        setValue(event.target.value);
    };

    // The first commit of Material-UI
    const [selectedDate,
        setSelectedDate] = React.useState(new Date());

    const handleDateChange = date => {
        setSelectedDate(date);
    };
    const [labelWidth,
        setLabelWidth] = React.useState(0);
    React.useEffect(() => {
        setLabelWidth(inputLabel.current.offsetWidth);
    }, []);

    return (
        <form className={classes.root} noValidate>
            <Grid container direction="row" justify="space-between" alignItems="center">
                <Box p={1}>
                    <Grid container direction="row" justify="space-around" alignItems="center">
                        <CssTextField
                            className={classes.margin}
                            label="Fore Name"
                            variant="outlined"
                            id="custom-css-outlined-input"/>
                        <CssTextField
                            className={classes.margin}
                            label="Middle Name"
                            variant="outlined"
                            id="custom-css-outlined-input"/>
                        <CssTextField
                            className={classes.margin}
                            label="Last Name"
                            variant="outlined"
                            id="custom-css-outlined-input"/>
                    </Grid>
                    <Box display="flex" flexDirection="row">
                        <Grid container direction="row" justify="space-around" alignItems="center">
                            <Box border={1} p={1} m={1}>
                                <FormControl component="fieldset">
                                    <FormLabel component="legend">Gender</FormLabel>
                                    <RadioGroup
                                        aria-label="position"
                                        name="position"
                                        value={value}
                                        onChange={handleChange}
                                        row>
                                        <FormControlLabel
                                            value="unspesified"
                                            control={< Radio color = "primary" />}
                                            label="Unspesified"
                                            labelPlacement="end"/>
                                        <FormControlLabel
                                            value="female"
                                            control={< Radio color = "primary" />}
                                            label="Female"
                                            labelPlacement="end"/>
                                        <FormControlLabel
                                            value="male"
                                            control={< Radio color = "primary" />}
                                            label="Male"
                                            labelPlacement="end"/>
                                    </RadioGroup>
                                </FormControl>
                            </Box>
                            <Box border={1} p={1} m={1}>
                                <FormControl component="fieldset">
                                    <FormLabel component="legend">MartialStatus</FormLabel>
                                    <RadioGroup
                                        aria-label="position"
                                        name="position"
                                        value={value}
                                        onChange={handleChange}
                                        row>
                                        <FormControlLabel
                                            value="unspesified"
                                            control={< Radio color = "primary" />}
                                            label="Unspesified"
                                            labelPlacement="end"/>
                                        <FormControlLabel
                                            value="single"
                                            control={< Radio color = "primary" />}
                                            label="Single"
                                            labelPlacement="end"/>
                                        <FormControlLabel
                                            value="married"
                                            control={< Radio color = "primary" />}
                                            label="Married"
                                            labelPlacement="end"/>
                                    </RadioGroup>
                                </FormControl>
                            </Box>
                        </Grid>
                    </Box>
                    <Box>
                        <Grid container direction="row" justify="space-between" alignItems="center">
                            <Box>
                                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                    <KeyboardDatePicker
                                        margin="normal"
                                        id="date-picker-dialog"
                                        label="Birthday:"
                                        format="MM/dd/yyyy"
                                        value={selectedDate}
                                        onChange={handleDateChange}
                                        KeyboardButtonProps={{
                                        'aria-label': 'change date'
                                    }}/>
                                </MuiPickersUtilsProvider>
                            </Box>
                            <Box className={classes.input}>
                                <CssTextField
                                    fullWidth
                                    className={classes.margin}
                                    label="Adress:"
                                    variant="outlined"
                                    id="custom-css-outlined-input"/>
                            </Box>
                        </Grid>
                    </Box>
                    <Box>
                        <Grid container direction="row" justify="space-between" alignItems="center">
                            <Box className={classes.input}>
                                <CssTextField
                                    fullWidth
                                    className={classes.margin}
                                    label="Telephone:"
                                    variant="outlined"
                                    id="custom-css-outlined-input"/>
                            </Box>
                            <Box className={classes.input}>
                                <CssTextField
                                    fullWidth
                                    className={classes.margin}
                                    label="GSM:"
                                    variant="outlined"
                                    id="custom-css-outlined-input"/>
                            </Box>
                        </Grid>
                    </Box>
                    <Box>
                        <Grid container direction="row" justify="space-start" alignItems="center">
                            <Box className={classes.input}>
                                <CssTextField
                                    fullWidth
                                    className={classes.margin}
                                    label="Password:"
                                    variant="outlined"
                                    id="custom-css-outlined-input"/>
                            </Box>
                            <Box>
                                <Button variant="contained" color="primary">
                                    Set Password
                                </Button>
                            </Box>
                        </Grid>
                    </Box>
                    <Grid container direction="row" justify="space-between" alignItems="center">
                        <Box>
                            <Grid
                                container
                                direction="row"
                                justify="space-around"
                                alignItems="center"
                                className={classes.working}>
                                <Box>
                                    <FormControl variant="outlined" className={classes.formControl}>
                                        <InputLabel ref={inputLabel} id="demo-simple-select-outlined-label">
                                            Experience
                                        </InputLabel>
                                        <Select
                                            labelId="demo-simple-select-outlined-label"
                                            id="demo-simple-select-outlined"
                                            value={age}
                                            onChange={handleChange}
                                            labelWidth={labelWidth}>
                                            <MenuItem value="">
                                                <em>Experience</em>
                                            </MenuItem>
                                            <MenuItem value={10}>Ten</MenuItem>
                                            <MenuItem value={20}>Twenty</MenuItem>
                                            <MenuItem value={30}>Thirty</MenuItem>
                                        </Select>
                                    </FormControl>
                                    <CssTextField
                                        className={classes.margin}
                                        label="Periode"
                                        variant="outlined"
                                        id="custom-css-outlined-input"/>
                                    <FormControl variant="outlined" className={classes.formControl}>
                                        <InputLabel ref={inputLabel} id="demo-simple-select-outlined-label">
                                            Factor
                                        </InputLabel>
                                        <Select
                                            labelId="demo-simple-select-outlined-label"
                                            id="demo-simple-select-outlined"
                                            value={age}
                                            onChange={handleChange}
                                            labelWidth={labelWidth}>
                                            <MenuItem value="">
                                                <em>Factor</em>
                                            </MenuItem>
                                            <MenuItem value={10}>Ten</MenuItem>
                                            <MenuItem value={20}>Twenty</MenuItem>
                                            <MenuItem value={30}>Thirty</MenuItem>
                                        </Select>
                                    </FormControl>
                                    <CssTextField
                                        className={classes.margin}
                                        label="Pay"
                                        variant="outlined"
                                        id="custom-css-outlined-input"/>
                                </Box>
                            </Grid>
                            <Grid
                                container
                                direction="row"
                                justify="space-around"
                                alignItems="center"
                                className={classes.working}>
                                <Box>
                                    <FormControl component="fieldset">
                                        <FormLabel component="legend">Working Time Conditions</FormLabel>
                                        <RadioGroup
                                            aria-label="position"
                                            name="position"
                                            value={value}
                                            onChange={handleChange}
                                            row>
                                            <FormControlLabel
                                                value="unspesified"
                                                control={< Radio color = "primary" />}
                                                label="Free Time"
                                                labelPlacement="end"/>
                                            <FormControlLabel
                                                value="single"
                                                control={< Radio color = "primary" />}
                                                label="Planned-Time"
                                                labelPlacement="end"/>
                                            <FormControlLabel
                                                value="married"
                                                control={< Radio color = "primary" />}
                                                label="Full-Time"
                                                labelPlacement="end"/>
                                        </RadioGroup>
                                    </FormControl>
                                </Box>
                            </Grid>
                        </Box>
                    </Grid>
                </Box>
                <Box m={2}>
                    <HeroAvatar/>
                </Box>
            </Grid>
        </form>
    );
}
