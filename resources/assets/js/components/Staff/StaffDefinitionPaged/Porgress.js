import React from "react";
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';

export default function Progress(props) {
    const progress = props.progress;

    return (
        <Grid container direction="column" justify="center" alignItems="center">
            <Box>
                <Typography variant="h5" gutterBottom>
                    {progress.title}
                </Typography>
            </Box>
        </Grid>
    );
}