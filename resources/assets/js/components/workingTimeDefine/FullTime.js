import React from "react";
import Grid from '@material-ui/core/Grid';
import {Box} from "@material-ui/core";
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Button from '@material-ui/core/Button';

const styles = {
    title: {
        color: "#476282"
    },
    weekTitle: {
        fontSize: "1em",
        padding: 5,
        textAlign: 'center',
        color: "#476282"
    },
    weekContent: {
        fontSize: "1em"
    }
}

export default class FullTime extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            age: "",
            open: false
        }

        this.handleChange = this.handleChange.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.handleOpen = this.handleOpen.bind(this);
    }

    handleChange(event) {
        this.setState({age: event.target.value});
    };

    handleClose() {
        this.setState({open: false});
    };

    handleOpen() {
        this.setState({open: true});
    };

    render() {

        const selectPlan = <div style={styles.weekTitle}>
            <Button onClick={this.handleOpen}>
                Select Plan
            </Button>
            <FormControl>
                <Select
                    labelId="demo-controlled-open-select-label"
                    id="demo-controlled-open-select"
                    open={this.state.open}
                    onClose={this.handleClose}
                    onOpen={this.handleOpen}
                    value={this.state.age}
                    onChange={this.handleChange}>
                    <MenuItem value="">
                        <em>None</em>
                    </MenuItem>
                    <MenuItem value={10}>Ten</MenuItem>
                    <MenuItem value={20}>twenty</MenuItem>
                    <MenuItem value={30}>Thirty</MenuItem>
                </Select>
            </FormControl>
        </div>
        return (
            <Box>
                <Grid container direction="row" justify="center" alignItems="center">
                    <Box margin={1}>
                        <Paper style={styles.weekTitle}>
                            <Typography variant="subtitle1" gutterBottom>
                                Monday
                            </Typography>
                            {selectPlan}
                        </Paper>
                    </Box>
                    <Box margin={1}>
                        <Paper style={styles.weekTitle}>
                            <Typography variant="subtitle1" gutterBottom>
                                Tuesday
                            </Typography>
                            {selectPlan}
                        </Paper>
                    </Box>
                    <Box margin={1}>
                        <Paper style={styles.weekTitle}>
                            <Typography variant="subtitle1" gutterBottom>
                                Wednesday
                            </Typography>
                            {selectPlan}
                        </Paper>
                    </Box>
                    <Box margin={1}>
                        <Paper style={styles.weekTitle}>
                            <Typography variant="subtitle1" gutterBottom>
                                Thursday
                            </Typography>
                            {selectPlan}
                        </Paper>
                    </Box>
                    <Box margin={1}>
                        <Paper style={styles.weekTitle}>
                            <Typography variant="subtitle1" gutterBottom>
                                Friday
                            </Typography>
                            {selectPlan}
                        </Paper>
                    </Box>
                    <Box margin={1}>
                        <Paper style={styles.weekTitle}>
                            <Typography variant="subtitle1" gutterBottom>
                                Saturday
                            </Typography>
                            {selectPlan}
                        </Paper>
                    </Box>
                    <Box margin={1}>
                        <Paper style={styles.weekTitle}>
                            <Typography variant="subtitle1" gutterBottom>
                                Sunday
                            </Typography>
                            {selectPlan}
                        </Paper>
                    </Box>
                </Grid>
            </Box>
        );
    }
}