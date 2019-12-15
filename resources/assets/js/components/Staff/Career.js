import React from "react";
import {Box, Grid} from "@material-ui/core";
import {makeStyles} from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import CreateIcon from '@material-ui/icons/Create';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
        '& > *': {
            margin: theme.spacing(1)
        }
    },
    bigAvatar: {
        width: 100,
        height: 100,
    },
    heroTitle: {
        fontSize: "2em",
        margin: 10,
    },
    heroSubContent: {
        marginTop: 20,
        marginLeft: 20,
    },
    textColor: {
        opacity: .8,
        fontWeight: "bold",
        color: "#495057",
        fontSize: "1.5em"
    },
    editButton: {
        color: "#75B72B",
    },
    paperTitle: {
      padding: "10",
    }
}));

export default function Career() {

    const classes = useStyles();

    return (
        <Box>
            <Grid container direction="row" justify="space-around" alignItems="center">
                <Box>
                    <Box>
                        <Grid container direction="row" justify="start" alignItems="center">
                            <Box>
                                <Avatar
                                    alt="Alt Title"
                                    src="https://picsum.photos/id/193/200/300"
                                    className={classes.bigAvatar}/>
                            </Box>
                            <Box className={classes.heroTitle}>
                                Hero Title
                            </Box>
                        </Grid>
                    </Box>
                    <Box>
                        <Grid container direction="row" justify="start" alignItems="center">
                            <Box>
                                <Grid container direction="column" justify="flex-end" alignItems="flex-start">
                                    <Box className={classes.textColor}>
                                        <CreateIcon className={classes.editButton}/>
                                        Age:
                                    </Box>
                                    <Box className={classes.textColor}>
                                        <CreateIcon className={classes.editButton}/>
                                        Telephone:
                                    </Box>
                                    <Box className={classes.textColor}>
                                        <CreateIcon className={classes.editButton}/>
                                        GSM:
                                    </Box>
                                    <Box className={classes.textColor}>
                                        <CreateIcon className={classes.editButton}/>
                                        Email:
                                    </Box>
                                    <Box className={classes.textColor}>
                                        <CreateIcon className={classes.editButton}/>
                                        Adress:
                                    </Box>
                                    <Box className={classes.textColor}>
                                        <CreateIcon className={classes.editButton}/>
                                        Martail Status:
                                    </Box>
                                    <Box className={classes.textColor}>
                                        <CreateIcon className={classes.editButton}/>
                                        Gender Status:
                                    </Box>
                                </Grid>
                            </Box>
                            <Box marginLeft={1}>
                                <Grid container direction="column" justify="flex-start" alignItems="flex-start">
                                    <Box className={classes.textColor}>
                                        21
                                    </Box>
                                    <Box className={classes.textColor}>
                                        21412414
                                    </Box>
                                    <Box className={classes.textColor}>
                                        124124
                                    </Box>
                                    <Box className={classes.textColor}>
                                        undefined
                                    </Box>
                                    <Box className={classes.textColor}>
                                        undefined
                                    </Box>
                                    <Box className={classes.textColor}>
                                        undefined
                                    </Box>
                                    <Box className={classes.textColor}>
                                        undefined
                                    </Box>
                                </Grid>
                            </Box>
                        </Grid>
                    </Box>
                </Box>
                <Box>
                    <Paper  className={classes.paperTitle}>
                        <Typography variant="h5" component="h3">
                            Working Plan alt kısm planı neyse o eklenecek ama spesifik tek bi tablo gibi değilde. Planı tarif edecek şekilde
                        </Typography>
                    </Paper>
                </Box>
            </Grid>
        </Box>
    );
}