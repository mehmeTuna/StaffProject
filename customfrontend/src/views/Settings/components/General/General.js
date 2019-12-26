import React, {useState, useEffect} from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import {makeStyles} from '@material-ui/styles';
import {
    Grid,
    Card,
    CardContent,
    CardActions,
    Avatar,
    Typography,
    Button,
    CardHeader,
    Divider,
    Switch,
    TextField,
    colors
} from '@material-ui/core';

import axios from 'utils/axios';
import SuccessSnackbar from './components/SuccessSnackbar';

const useStyles = makeStyles(theme => ({
    root: {},
    content: {
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'column',
        textAlgin: 'center'
    },
    name: {
        marginTop: theme.spacing(1)
    },
    avatar: {
        height: 100,
        width: 100
    },
    removeBotton: {
        width: '100%'
    },
    saveButton: {
        color: theme.palette.white,
        backgroundColor: colors.green[600],
        '&:hover': {
            backgroundColor: colors.green[900]
        }
    }
}));

const General = () => {

    const classes = useStyles();
    const [profile,
        setProfile] = useState(null);

    useEffect(() => {
        let mounted = true;

        const fetchProfile = () => {
            axios
                .get('/api/account/profile')
                .then(response => {
                    if (mounted) {
                        setProfile(response.data.profile);
                    }
                });
        };

        fetchProfile();

        return () => {
            mounted = false;
        };
    }, []);

    if (!profile) {
        return null;
    }

    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [values, setValues] = useState({
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      state: "",
      country: "",
      isPublic: "",
      canHire: "",
    });

    const handleChange = event => {
        event.persist();

        setValues({
            ...values,
            [event.target.name]: event.target.type === 'checkbox'
                ? event.target.checked
                : event.target.value
        });
    };

    const handleSubmit = event => {
        event.preventDefault();
        setOpenSnackbar(true);
    };

    const handleSnackbarClose = () => {
        setOpenSnackbar(false);
    };

    const states = ['Alabama', 'New York', 'San Francisco'];

    return (
        <Grid {...rest} className={clsx(classes.root, className)} container spacing={3}>
            <Grid item lg={4} md={6} xl={3} xs={12}>
                <Card {...rest} className={clsx(classes.root, className)}>
                    <CardContent className={classes.content}>
                        <Avatar className={classes.avatar} src="#"/>
                        <Typography className={classes.name} gutterBottom variant="h3">
                            Mehmet Tuna
                        </Typography>
                        <Typography color="textSecondary" variant="body1">
                            Free Time, GSM
                        </Typography>
                        <Typography color="textSecondary" variant="body2">
                            Birthday
                        </Typography>
                    </CardContent>
                    <CardActions>
                        <Button className={classes.removeBotton} variant="text">
                            Remove picture
                        </Button>
                    </CardActions>
                </Card>
            </Grid>
            <Grid item lg={8} md={6} xl={9} xs={12}>
                <Card {...rest} className={clsx(classes.root, className)}>
                    <form onSubmit={handleSubmit}>
                        <CardHeader title="Profile"/>
                        <Divider/>
                        <CardContent>
                            <Grid container spacing={4}>
                                <Grid item md={6} xs={12}>
                                    <TextField
                                        fullWidth
                                        helperText="Please specify the first name"
                                        label="First name"
                                        name="firstName"
                                        onChange={handleChange}
                                        required
                                        value={values.firstName}
                                        variant="outlined"/>
                                </Grid>
                                <Grid item md={6} xs={12}>
                                    <TextField
                                        fullWidth
                                        label="Last name"
                                        name="lastName"
                                        onChange={handleChange}
                                        required
                                        value={values.lastName}
                                        variant="outlined"/>
                                </Grid>
                                <Grid item md={6} xs={12}>
                                    <TextField
                                        fullWidth
                                        label="Email Address"
                                        name="email"
                                        onChange={handleChange}
                                        required
                                        value={values.email}
                                        variant="outlined"/>
                                </Grid>
                                <Grid item md={6} xs={12}>
                                    <TextField
                                        fullWidth
                                        label="Phone Number"
                                        name="phone"
                                        onChange={handleChange}
                                        type="text"
                                        value={values.phone}
                                        variant="outlined"/>
                                </Grid>
                                <Grid item md={6} xs={12}>
                                    <TextField fullWidth label="Select State" name="state" onChange={handleChange} select // eslint-disable-next-line react/jsx-sort-props
                                        SelectProps={{
                                        native: true
                                    }} value={values.state} variant="outlined">
                                        {states.map(state => (
                                            <option key={state} value={state}>
                                                {state}
                                            </option>
                                        ))}
                                    </TextField>
                                </Grid>
                                <Grid item md={6} xs={12}>
                                    <TextField
                                        fullWidth
                                        label="Country"
                                        name="country"
                                        onChange={handleChange}
                                        required
                                        value={values.country}
                                        variant="outlined"/>
                                </Grid>
                                <Grid item md={6} xs={12}>
                                    <Typography variant="h6">Make Contact Info Public</Typography>
                                    <Typography variant="body2">
                                        Means that anyone viewing your profile will be able to see your contacts details
                                    </Typography>
                                    <Switch
                                        checked={values.isPublic}
                                        color="secondary"
                                        edge="start"
                                        name="isPublic"
                                        onChange={handleChange}/>
                                </Grid>
                                <Grid item md={6} xs={12}>
                                    <Typography variant="h6">Available to hire</Typography>
                                    <Typography variant="body2">
                                        Toggling this will let your teamates know that you are available for acquireing
                                        new projects
                                    </Typography>
                                    <Switch
                                        checked={values.canHire}
                                        color="secondary"
                                        edge="start"
                                        name="canHire"
                                        onChange={handleChange}/>
                                </Grid>
                            </Grid>
                        </CardContent>
                        <Divider/>
                        <CardActions>
                            <Button className={classes.saveButton} type="submit" variant="contained">
                                Save Changes
                            </Button>
                        </CardActions>
                    </form>
                    <SuccessSnackbar onClose={handleSnackbarClose} open={openSnackbar}/>
                </Card>
            </Grid>
        </Grid>
    );
};

General.propTypes = {
    className: PropTypes.string
};

export default General;
