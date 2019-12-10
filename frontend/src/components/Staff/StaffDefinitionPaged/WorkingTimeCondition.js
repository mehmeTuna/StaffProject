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
import HeroAvatar from './../HeroAvatar';
import FormLabel from '@material-ui/core/FormLabel';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import DescriptionIcon from '@material-ui/icons/Description';

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

export default function WorkingTimeCondition() {
    const user = {
        title: "User Define",
        step: 4
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

    const handleChange = name => event => {
        setState({
            ...state,
            [name]: event.target.checked
        });
    };

    const {gilad, jason, antoine} = state;
    const error = [gilad, jason, antoine]
        .filter(v => v)
        .length !== 2;

    return (
        <Grid container direction="column" justify="center" alignItems="center">
            <Box>
                <Progress progress={user}/>
            </Box>
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
                                    handleChange('gilad')
                                }
                                value = "gilad" />}
                                    label="Free Time"/>
                                <FormControlLabel
                                    control={< Checkbox checked = {
                                    jason
                                }
                                onChange = {
                                    handleChange('jason')
                                }
                                value = "jason" />}
                                    label="Planned Time"/>
                                <FormControlLabel
                                    control={< Checkbox checked = {
                                    antoine
                                }
                                onChange = {
                                    handleChange('antoine')
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
        </Grid>
    );
}