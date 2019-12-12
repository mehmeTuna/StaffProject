import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import CreateIcon from '@material-ui/icons/Create';

import StaffDefine from "./StaffDefine";

export default function StaffDefinitionEditorModal() {
    const [fullWidth] = React.useState(true);
    const [maxWidth] = React.useState('md');
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
                    <StaffDefine/>
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
        </div>
    );
}
