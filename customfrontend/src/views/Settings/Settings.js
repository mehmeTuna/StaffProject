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
import SuccessSnackbar from './components/General/components/SuccessSnackbar';

import {Page} from 'components';
import {Header} from './components';

const useStyles = makeStyles(theme => ({
    root: {
        width: theme.breakpoints.values.lg,
        maxWidth: '100%',
        margin: '0 auto',
        padding: theme.spacing(3)
    },
    divider: {
        backgroundColor: colors.grey[300]
    },
    container: {
        marginTop: theme.spacing(3)
    },
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

const Settings = props => {
    const {match, history} = props;
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

    const [openSnackbar,
        setOpenSnackbar] = useState(false);
    const [values,
        setValues] = useState({
        avatar: "",
        avatarUrl: "",
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        workingCondition: "",
        password: "",
        isPublic: "",
        canHire: ""
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

    const handleImageChange = (e) => {
        e.preventDefault();

        let reader = new FileReader();
        let file = e.target.files[0];

        reader.onloadend = () => {
            setValues({avatar: file, avatarUrl: reader.result});
        }

        reader.readAsDataURL(file)
    }

    const workingConditions = ['one', 'two', 'three'];

    return (
        <Page className={classes.root} title="Staff">
            <Header/>
            <Divider className={classes.divider}/>
            <div className={classes.container}>
                <form onSubmit={handleSubmit}>
                    <Grid className={classes.root} container spacing={3}>
                        <Grid item lg={4} md={6} xl={3} xs={12}>
                            <Card className={classes.root}>
                                <CardContent className={classes.content}>
                                    {values.avatarUrl === ""
                                        ? <Button variant="contained" component="label">
                                                Select Profile Image
                                                <input
                                                    type="file"
                                                    style={{
                                                    display: "none"
                                                }}
                                                    onChange={(e) => handleImageChange(e)}/>
                                            </Button>
                                        : <Avatar className={classes.avatar} src={values.avatarUrl}/>}
                                </CardContent>
                            </Card>
                        </Grid>
                        <Grid item lg={8} md={6} xl={9} xs={12}>
                            <Card className={classes.root}>
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
                                            <TextField fullWidth label="Working Conditions" name="workingCondition" onChange={handleChange} select // eslint-disable-next-line react/jsx-sort-props
                                                SelectProps={{
                                                native: true
                                            }} value={values.workingCondition} variant="outlined">
                                                {workingConditions.map(state => (
                                                    <option key={state} value={state}>
                                                        {state}
                                                    </option>
                                                ))}
                                            </TextField>
                                        </Grid>
                                        <Grid item md={6} xs={12}>
                                            <TextField
                                                fullWidth
                                                label="Password"
                                                name="password"
                                                onChange={handleChange}
                                                required
                                                value={values.password}
                                                variant="outlined"/>
                                        </Grid>
                                        <Grid item lg={4} md={6} xs={12}>
                                            <TextField
                                                fullWidth
                                                label="Periode"
                                                name="periode"
                                                onChange={handleChange}
                                                required
                                                value={values.periode}
                                                variant="outlined"/>
                                        </Grid>
                                        <Grid item lg={4} md={6} xs={12}>
                                            <TextField
                                                fullWidth
                                                label="Factor"
                                                name="factor"
                                                onChange={handleChange}
                                                required
                                                value={values.factor}
                                                variant="outlined"/>
                                        </Grid>
                                        <Grid item lg={4} md={6} xs={12}>
                                            <TextField
                                                fullWidth
                                                label="Pay"
                                                name="pay"
                                                onChange={handleChange}
                                                required
                                                value={values.pay}
                                                variant="outlined"/>
                                        </Grid>
                                    </Grid>
                                </CardContent>
                                <Divider/>
                                <CardActions>
                                    <Button className={classes.saveButton} type="submit" variant="contained">
                                        Save Changes
                                    </Button>
                                </CardActions>
                                <SuccessSnackbar onClose={handleSnackbarClose} open={openSnackbar}/>
                            </Card>
                        </Grid>
                    </Grid>
                </form>
            </div>
        </Page>
    );
};

Settings.propTypes = {
    history: PropTypes.object.isRequired,
    match: PropTypes.object.isRequired
};

export default Settings;
