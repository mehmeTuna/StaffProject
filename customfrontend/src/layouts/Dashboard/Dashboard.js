import React, {Suspense, useState} from 'react';
import {renderRoutes} from 'react-router-config';
import PropTypes from 'prop-types';
import {makeStyles} from '@material-ui/styles';
import {LinearProgress} from '@material-ui/core';

import {NavBar, TopBar, ChatBar} from './components';

const useStyles = makeStyles(() => ({
    root: {
        height: '100%',
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden'
    },
    topBar: {
        zIndex: 2,
        position: 'relative'
    },
    container: {
        display: 'flex',
        flex: '1 1 auto',
        overflow: 'hidden'
    },
    navBar: {
        zIndex: 3,
        width: 256,
        minWidth: 256,
        flex: '0 0 auto'
    },
    content: {
        overflowY: 'auto',
        flex: '1 1 auto'
    }
}));

const Dashboard = props => {
    const {route} = props;

    const classes = useStyles();
    const [openNavBarMobile,
        setOpenNavBarMobile] = useState(false);

    const handleNavBarMobileOpen = () => {
        setOpenNavBarMobile(true);
    };

    const handleNavBarMobileClose = () => {
        setOpenNavBarMobile(false);
    };

    return (
        <div className={classes.root}>
            <TopBar className={classes.topBar} onOpenNavBarMobile={handleNavBarMobileOpen}/>
            <div className={classes.container}>
                <NavBar
                    className={classes.navBar}
                    onMobileClose={handleNavBarMobileClose}
                    openMobile={openNavBarMobile}/>
                <main className={classes.content}>
                    <Suspense fallback={< LinearProgress />}>
                        {renderRoutes(route.routes)}
                    </Suspense>
                </main>
            </div>
            {false && <ChatBar/>}
        </div>
    );
};

Dashboard.propTypes = {
    route: PropTypes.object
};

export default Dashboard;
