import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import {makeStyles} from '@material-ui/core/styles';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import InfoIcon from '@material-ui/icons/Info';
import Grid from '@material-ui/core/Grid';
import {Box} from '@material-ui/core';
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

import StaffCareerList from "./StaffCarerList";
import StaffEmploymentHistory from "./StaffEmploymentHistory";

const useStyles = makeStyles({
    root: {
        flexGrow: 1
    }
});

export default function StaffAbout(data) {
    const classes = useStyles();
    const staff = data.Staff;
    const [open,
        setOpen] = React.useState(false);
    const [fullWidth] = React.useState(true);
    const [maxWidth] = React.useState('lg');

    const [userTab,
        setUserTab] = React.useState(0);

    const handleTab = (event, newValue) => {
        setUserTab(newValue);
    }

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <React.Fragment>
            <Button color="primary" onClick={handleClickOpen}>
                <InfoIcon/>
                Details
            </Button>
            <Dialog
                fullWidth={fullWidth}
                maxWidth={maxWidth}
                open={open}
                onClose={handleClose}
                aria-labelledby="max-width-dialog-title">
                <DialogContent>
                    <Grid container direction="row" justify="space-between" alignItems="center">
                        <Box>
                            <Button onClick={handleClose} color="primary">
                                Close
                            </Button>
                        </Box>
                        <Box>
                            Staff Detail
                        </Box>
                        <Box></Box>
                    </Grid>
                    <Box marginTop={1}>
                        <Paper className={classes.root}>
                            <Tabs
                                value={userTab}
                                onChange={handleTab}
                                indicatorColor="primary"
                                textColor="primary"
                                variant="scrollable"
                                scrollButtons="auto">
                                <Tab label="Rapor"/>
                                <Tab label="Progress Payment"/>
                                <Tab label="Workıng Plan"/>
                                <Tab label="Career"/>
                                <Tab label="Employment Hıstroy"/>
                            </Tabs>
                        </Paper>
                    </Box>
                    <Box marginTop={2}>
                        {userTab === 1 && <StaffCareerList/>}
                        {userTab === 4 && <StaffEmploymentHistory/>}
                    </Box>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Close
                    </Button>
                </DialogActions>
            </Dialog>
        </React.Fragment>
    );
}