import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import FormLabel from '@material-ui/core/FormLabel';
import FormControl from '@material-ui/core/FormControl';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import Checkbox from '@material-ui/core/Checkbox';
import Grid from '@material-ui/core/Grid';
import DateFnsUtils from '@date-io/date-fns';
import {MuiPickersUtilsProvider, KeyboardTimePicker, KeyboardDatePicker} from '@material-ui/pickers';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import SearchIcon from '@material-ui/icons/Search';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import CreateIcon from '@material-ui/icons/Create';

export default function FilterModal() {
    const [open,
        setOpen] = React.useState(false);
    const [scroll,
        setScroll] = React.useState('paper');

    const handleClickOpen = scrollType => () => {
        setOpen(true);
        setScroll(scrollType);
    };

    const handleClose = () => {
        setOpen(false);
    };

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

    const [selectedDate,
        setSelectedDate] = React.useState(new Date());

    const handleDateChange = date => {
        setSelectedDate(date);
    };

    const descriptionElementRef = React.useRef(null);
    React.useEffect(() => {
        if (open) {
            const {current: descriptionElement} = descriptionElementRef;
            if (descriptionElement !== null) {
                descriptionElement.focus();
            }
        }
    }, [open]);

    return (
        <div>
            <Button color="primary" onClick={handleClickOpen('body')}>
                <CreateIcon/>
                Filters
            </Button>
            <Dialog
                open={open}
                onClose={handleClose}
                scroll={scroll}
                aria-labelledby="scroll-dialog-title"
                aria-describedby="scroll-dialog-description">
                <DialogTitle id="scroll-dialog-title">Subscribe</DialogTitle>
                <DialogContent dividers={scroll === 'paper'}>
                    <Grid container direction="row" justify="space-between" alignItems="flex-start">
                        <Box>
                            <FormControl component="fieldset">
                                <FormLabel component="legend">Gender</FormLabel>
                                <FormGroup>
                                    <FormControlLabel
                                        control={< Checkbox checked = {
                                        gilad
                                    }
                                    onChange = {
                                        handleChange('gilad')
                                    }
                                    value = "gilad" />}
                                        label="Unspecified"/>
                                    <FormControlLabel
                                        control={< Checkbox checked = {
                                        jason
                                    }
                                    onChange = {
                                        handleChange('jason')
                                    }
                                    value = "jason" />}
                                        label="Female"/>
                                    <FormControlLabel
                                        control={< Checkbox checked = {
                                        antoine
                                    }
                                    onChange = {
                                        handleChange('antoine')
                                    }
                                    value = "antoine" />}
                                        label="Male"/>
                                </FormGroup>
                            </FormControl>
                        </Box>
                        <Box>
                            <FormControl component="fieldset">
                                <FormLabel component="legend">Experience Filter</FormLabel>
                                <FormGroup>
                                    <FormControlLabel
                                        control={< Checkbox checked = {
                                        gilad
                                    }
                                    onChange = {
                                        handleChange('gilad')
                                    }
                                    value = "gilad" />}
                                        label="Unspecified"/>
                                    <FormControlLabel
                                        control={< Checkbox checked = {
                                        jason
                                    }
                                    onChange = {
                                        handleChange('jason')
                                    }
                                    value = "jason" />}
                                        label="Manager"/>
                                    <FormControlLabel
                                        control={< Checkbox checked = {
                                        antoine
                                    }
                                    onChange = {
                                        handleChange('antoine')
                                    }
                                    value = "antoine" />}
                                        label="Operator"/>
                                    <FormControlLabel
                                        control={< Checkbox checked = {
                                        antoine
                                    }
                                    onChange = {
                                        handleChange('antoine')
                                    }
                                    value = "antoine" />}
                                        label="Staff"/>
                                    <FormControlLabel
                                        control={< Checkbox checked = {
                                        antoine
                                    }
                                    onChange = {
                                        handleChange('antoine')
                                    }
                                    value = "antoine" />}
                                        label="Boss"/>
                                    <FormControlLabel
                                        control={< Checkbox checked = {
                                        antoine
                                    }
                                    onChange = {
                                        handleChange('antoine')
                                    }
                                    value = "antoine" />}
                                        label="Other"/>
                                </FormGroup>
                            </FormControl>
                        </Box>
                        <Box>
                            <FormControl component="fieldset">
                                <FormLabel component="legend">Work Type Filter</FormLabel>
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
                                        label="Planned"/>
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
                            </FormControl>
                        </Box>
                        <Box>
                            <FormControl component="fieldset">
                                <FormLabel component="legend">Still Working</FormLabel>
                                <FormGroup>
                                    <FormControlLabel
                                        control={< Checkbox checked = {
                                        gilad
                                    }
                                    onChange = {
                                        handleChange('gilad')
                                    }
                                    value = "gilad" />}
                                        label="Yes"/>
                                    <FormControlLabel
                                        control={< Checkbox checked = {
                                        jason
                                    }
                                    onChange = {
                                        handleChange('jason')
                                    }
                                    value = "jason" />}
                                        label="No"/>
                                </FormGroup>
                            </FormControl>
                        </Box>
                        <Box>
                            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                <Grid container direction="row" justify="space-between" alignItems="center">
                                    <Box>
                                        <KeyboardDatePicker
                                            disableToolbar
                                            variant="inline"
                                            format="MM/dd/yyyy"
                                            margin="normal"
                                            id="date-picker-inline"
                                            label="Date picker inline"
                                            value={selectedDate}
                                            onChange={handleDateChange}
                                            KeyboardButtonProps={{
                                            'aria-label': 'change date'
                                        }}/></Box>
                                    <Box>
                                        <KeyboardDatePicker
                                            margin="normal"
                                            id="date-picker-dialog"
                                            label="Date picker dialog"
                                            format="MM/dd/yyyy"
                                            value={selectedDate}
                                            onChange={handleDateChange}
                                            KeyboardButtonProps={{
                                            'aria-label': 'change date'
                                        }}/></Box>
                                </Grid>
                            </MuiPickersUtilsProvider>
                        </Box>
                    </Grid>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        <SearchIcon/>
                        Uygula
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}