import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import InfoIcon from '@material-ui/icons/Info';
import Grid from '@material-ui/core/Grid';
import {Box} from '@material-ui/core';

import StaffCareerList from "./StaffCarerList";
import StaffEmploymentHistory from "./StaffEmploymentHistory";

export default function StaffAbout(data) {
    const staff = data.Staff;
    const [open,
        setOpen] = React.useState(false);
    const [fullWidth] = React.useState(true);
    const [maxWidth] = React.useState('lg');

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
                    <Box>
                        <Box marginBottom={5} fontSize="2em">
                            <Box>Staff Carer List</Box>
                            <Button variant="contained" size="medium" color="primary">
                                Add Career Entry
                            </Button>
                        </Box>
                        <StaffCareerList/>
                    </Box>
                    <Box>
                        <Box marginBottom={5} fontSize="2em">
                            <Box>Staff Employment History</Box>
                            <Button variant="contained" size="medium" color="primary">
                                Recruit
                            </Button>
                            <Button variant="contained" size="medium" color="primary">
                                Dismiss
                            </Button>
                        </Box>
                        <StaffEmploymentHistory/>
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