import React from "react";
import Typography from '@material-ui/core/Typography';
import CheckCircleSharpIcon from '@material-ui/icons/CheckCircleSharp';
import MaximizeSharpIcon from '@material-ui/icons/MaximizeSharp';
import Avatar from '@material-ui/core/Avatar';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  customAvatar: {
    width:"1em",
    height:"1em"
  }
});

export default function Progress(props) {
    const progress = props.progress;
    const classes = useStyles();

    return (
        <Grid container direction="column" justify="center" alignItems="center">
            <Box>
                <Typography variant="h5" gutterBottom>
                    {progress.title}
                </Typography>
            </Box>
            <Box>
                <Grid container direction="row" justify="center" alignItems="center">
                    <Box>
                        <Grid container direction="row" justify="center" alignItems="center">
                          {progress.step <= 1 ? <Avatar className={classes.customAvatar}>1</Avatar> : <CheckCircleSharpIcon color="primary"/>}
                            Staff Information
                        </Grid>
                    </Box>
                    <Box paddingTop={3} >
                        <MaximizeSharpIcon/>
                    </Box>
                    <Box>
                        <Grid container direction="row" justify="center" alignItems="center">
                        {progress.step <= 2 ? <Avatar className={classes.customAvatar}>2</Avatar> : <CheckCircleSharpIcon color="primary"/>}
                            Working Condition
                        </Grid>
                    </Box>
                    <Box paddingTop={3} >
                        <MaximizeSharpIcon/>
                    </Box>
                    <Box>
                        <Grid container direction="row" justify="center" alignItems="center">
                        {progress.step <= 3 ? <Avatar className={classes.customAvatar}>3</Avatar> : <CheckCircleSharpIcon color="primary"/>}
                            Working Time Condition
                        </Grid>
                    </Box>
                </Grid>
            </Box>
        </Grid>
    );
}