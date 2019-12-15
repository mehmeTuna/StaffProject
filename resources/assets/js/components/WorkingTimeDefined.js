import React from "react";
import Dialog from '@material-ui/core/Dialog';
import Button from '@material-ui/core/Button';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';

import FreeTime from "./workingTimeDefine/FreeTime";
import FullTime from "./workingTimeDefine/FullTime";
import PlannedTime from "./workingTimeDefine/PlannedTime";

export default function WorkingTimeDefined(data) {
 const type = data.type ;
  const [fullWidth] = React.useState(true);
  const [maxWidth] = React.useState('sm');
  const [open,
      setOpen] = React.useState(true);
  const [scroll] = React.useState('paper');

    const handleClose = () => {
      setOpen(false);
  };

    return (
        <Dialog
            fullWidth={fullWidth}
            maxWidth={maxWidth}
            open={open}
            onClose={handleClose}
            scroll={scroll}
            aria-labelledby="responsive-dialog-title"
            aria-describedby="scroll-dialog-description">
            <DialogContent dividers={scroll === 'paper'}>
                {type === "free" && <FreeTime />}
                {type === "planned" && <PlannedTime />}
                {type === "fullTime" && <FullTime />}
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose} color="primary">
                    Cancel
                </Button>
                <Button onClick={handleClose} color="primary">
                    Save
                </Button>
            </DialogActions>
        </Dialog>
    );
}