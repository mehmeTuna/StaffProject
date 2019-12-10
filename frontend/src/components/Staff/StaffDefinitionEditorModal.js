import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import CreateIcon from '@material-ui/icons/Create';

import UserDefine from "./StaffDefinitionPaged/UserDefine";
import WorkingCondition from "./StaffDefinitionPaged/WorkingCondition";
import WorkingTimecondition from "./StaffDefinitionPaged/WorkingTimeCondition";

export default function StaffDefinitionEditorModal() {
    const [fullWidth,
        setFullWidth] = React.useState(true);
    const [maxWidth,
        setMaxWidth] = React.useState('md');
    const [open,
        setOpen] = React.useState(false);
    const [scroll,
        setScroll] = React.useState('paper');

       const [count, setCount] = useState(1);

    const handleClickOpen = scrollType => () => {
        setOpen(true);
        setScroll(scrollType);
    };

    const handleClose = () => {
        setOpen(false);
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
                add new staff
            </Button>
            <Dialog
                fullWidth={fullWidth}
                maxWidth={maxWidth}
                open={open}
                onClose={handleClose}
                scroll={scroll}
                aria-labelledby="responsive-dialog-title"
                aria-describedby="scroll-dialog-description">
                <DialogContent dividers={scroll === 'paper'}>
                    {count === 1 && <UserDefine/>}
                    {count === 2 && <WorkingCondition/>}
                    {count === 3 && <WorkingTimecondition/>}
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setCount(count - 1)} color="primary">
                        Previous
                    </Button>
                    <Button onClick={() => setCount(count + 1)} color="primary">
                       {count === 3 ? "Save" : "Next"}
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}
