import React from 'react';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import {useTheme, makeStyles} from '@material-ui/core/styles';
import {
    Container,
    Paper,
    Typography,
    Grid,
    DialogContentText,
    DialogContent,
    DialogActions,
    Dialog,
    DialogTitle,
    Button
} from "@material-ui/core";
import AddIcon from '@material-ui/icons/Add';


const styles = makeStyles(theme => ({
  containerCreateButton: {
    marginLeft: "Auto",
    marginRight: "Auto",
    width: 200,
    height: 200,
    paddingTop: 70,
    transiction: "0.2",
    color: "#75B72B",
    "&:hover": {
        transiction: "0.2",
        background: "#eceff1"
    }
}
}));

export default function CareerDefineModal() {
    const [open,
        setOpen] = React.useState(false);
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const classes = styles();

    return (
        <div>
            <Paper
                className={classes.containerCreateButton}
                onClick={handleClickOpen}>
                <Grid container direction="column" justify="space-between" alignItems="center">
                    <AddIcon fontSize="large"/>
                    <Typography component="p">
                        Yeni bir kariyer tanımla
                    </Typography>
                </Grid>
            </Paper>
            <Dialog
                fullScreen={fullScreen}
                open={open}
                onClose={handleClose}
                aria-labelledby="responsive-dialog-title">
                <DialogTitle id="responsive-dialog-title">{"Kariyer Tanımla"}</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        buraya eklenecek kariyer tanımı sayfası
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary" autoFocus>
                        Ekle
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}