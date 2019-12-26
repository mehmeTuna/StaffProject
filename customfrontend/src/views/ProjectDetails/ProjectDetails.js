import React, { useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import { Tabs, Tab, Divider, colors } from '@material-ui/core';

import axios from 'utils/axios';
import { Page, Alert } from 'components';
import { Header, Overview, Files, Activities, Subscribers } from './components';

const useStyles = makeStyles(theme => ({
  root: {
    width: theme.breakpoints.values.lg,
    maxWidth: '100%',
    margin: '0 auto',
    padding: theme.spacing(3)
  },
  tabs: {
    marginTop: theme.spacing(3)
  },
  divider: {
    backgroundColor: colors.grey[300]
  },
  alert: {
    marginTop: theme.spacing(3)
  },
  content: {
    marginTop: theme.spacing(3)
  }
}));

const ProjectDetails = props => {
  const { match, history } = props;
  const classes = useStyles();
  const { id, tab } = match.params;
  const [openAlert, setOpenAlert] = useState(true);
  const [project, setProject] = useState(null);

  useEffect(() => {
    let mounted = true;

    const fetchProject = () => {
      axios.get('/api/projects/1').then(response => {
        if (mounted) {
          setProject(response.data.project);
        }
      });
    };

    fetchProject();

    return () => {
      mounted = false;
    };
  }, []);

  const handleAlertClose = () => {
    setOpenAlert(false);
  };

  const handleTabsChange = (event, value) => {
    history.push(value);
  };

  const tabs = [
    { value: 'overview', label: 'Overview' },
    { value: 'files', label: 'Files' },
    { value: 'activity', label: 'Activity' },
    { value: 'subscribers', label: 'Subscribers' }
  ];

  if (!tab) {
    return <Redirect to={`/projects/${id}/overview`} />;
  }

  if (!tabs.find(t => t.value === tab)) {
    return <Redirect to="/errors/error-404" />;
  }

  if (!project) {
    return null;
  }

  return (
    <Page
      className={classes.root}
      title="Project Details"
    >
      <Header project={project} />
      <Tabs
        className={classes.tabs}
        onChange={handleTabsChange}
        scrollButtons="auto"
        value={tab}
        variant="scrollable"
      >
        {tabs.map(tab => (
          <Tab
            key={tab.value}
            label={tab.label}
            value={tab.value}
          />
        ))}
      </Tabs>
      <Divider className={classes.divider} />
      {openAlert && (
        <Alert
          className={classes.alert}
          message="The content holder has extended the deadline! Good luck"
          onClose={handleAlertClose}
        />
      )}
      <div className={classes.content}>
        {tab === 'overview' && <Overview project={project} />}
        {tab === 'files' && <Files files={project.files} />}
        {tab === 'activity' && <Activities activities={project.activities} />}
        {tab === 'subscribers' && (
          <Subscribers subscribers={project.subscribers} />
        )}
      </div>
    </Page>
  );
};

ProjectDetails.propTypes = {
  history: PropTypes.object.isRequired,
  match: PropTypes.object.isRequired
};

export default ProjectDetails;
