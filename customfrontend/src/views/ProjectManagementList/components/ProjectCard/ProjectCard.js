import React from 'react';
import {Link as RouterLink} from 'react-router-dom';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import moment from 'moment';
import {makeStyles} from '@material-ui/styles';
import {
    Avatar,
    Button,
    Card,
    CardContent,
    Link,
    Typography,
    colors
} from '@material-ui/core';

import getInitials from 'utils/getInitials';

const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
        alignItems: 'center',
        flexWrap: 'wrap',
        marginBottom: theme.spacing(2)
    },
    content: {
        padding: theme.spacing(2),
        flexGrow: 1,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        [
            theme
                .breakpoints
                .down('sm')
        ]: {
            width: '100%',
            flexWrap: 'wrap'
        },
        '&:last-child': {
            paddingBottom: theme.spacing(2)
        }
    },
    header: {
        maxWidth: '100%',
        width: 240,
        display: 'flex',
        [
            theme
                .breakpoints
                .down('sm')
        ]: {
            marginBottom: theme.spacing(2),
            flexBasis: '100%'
        }
    },
    avatar: {
        marginRight: theme.spacing(2)
    },
    stats: {
        padding: theme.spacing(1),
        [
            theme
                .breakpoints
                .down('sm')
        ]: {
            flexBasis: '50%'
        }
    },
    actions: {
        padding: theme.spacing(1),
        [
            theme
                .breakpoints
                .down('sm')
        ]: {
            flexBasis: '50%'
        }
    }
}));

const ProjectCard = props => {
    const {
        project,
        className,
        ...rest
    } = props;

    const classes = useStyles();

    const statusColors = {
        'Working': "#75B72B",
        "Not Working": colors.grey[600],
    };

    return (
        <Card {...rest} className={clsx(classes.root, className)}>
            <CardContent className={classes.content}>
                <div className={classes.header}>
                    <Avatar alt="Author" className={classes.avatar} src={project.author.avatar}>
                        {getInitials(project.author.name)}
                    </Avatar>
                    <div>
                        <Link color="textPrimary" component={RouterLink} noWrap to="#" variant="h5">
                           Full Name
                        </Link>
                        <Typography variant="body2">
                            Experience{' '}
                            <Link
                                color="textPrimary"
                                component={RouterLink}
                                to="/management/customers/1"
                                variant="h6">
                                Experience
                            </Link>
                        </Typography>
                    </div>
                </div>
                <div className={classes.stats}>
                    <Typography variant="h6">
                       Planned
                    </Typography>
                    <Typography variant="body2">Project price</Typography>
                </div>
                <div className={classes.stats}>
                    <Typography variant="h5">Boss</Typography>
                    <Typography variant="body2">Class</Typography>
                </div>
                <div className={classes.stats}>
                    <Typography variant="h6">
                        4541452154
                    </Typography>
                    <Typography variant="body2">GSM</Typography>
                </div>
                <div className={classes.stats}>
                    <Typography variant="h6">
                        01.01.1960
                    </Typography>
                    <Typography variant="body2">Birthday</Typography>
                </div>
                <div className={classes.stats}>
                    <Typography
                        style={{
                        color: statusColors["Working"]
                    }}
                        variant="h6">
                        Working Time
                    </Typography>
                    <Typography variant="body2">Project status</Typography>
                </div>
                <div className={classes.actions}>
                    <Button color="primary" size="small" variant="outlined">
                        View
                    </Button>
                </div>
            </CardContent>
        </Card>
    );
};

ProjectCard.propTypes = {
    className: PropTypes.string,
    project: PropTypes.object.isRequired
};

export default ProjectCard;
