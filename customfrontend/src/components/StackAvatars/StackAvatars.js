import React, { memo } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import uuid from 'uuid/v1';
import { makeStyles } from '@material-ui/styles';
import { Tooltip, Avatar } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    paddingLeft: 20
  },
  avatar: {
    border: `3px solid ${theme.palette.white}`,
    marginLeft: -20,
    '&:hover': {
      zIndex: 2
    }
  },
  more: {
    backgroundColor: theme.palette.error.main,
    color: theme.palette.error.contrastText,
    fontSize: 14,
    fontWeight: theme.typography.fontWeightMedium
  }
}));

const StackAvatars = props => {
  const { avatars, limit, className, ...rest } = props;

  const classes = useStyles();

  const avatarNodes = avatars.slice(0, limit).map(item => (
    <Tooltip
      key={uuid()}
      title="View"
    >
      <Avatar
        className={classes.avatar}
        src={item}
      />
    </Tooltip>
  ));

  if (avatars.length > limit) {
    avatarNodes.push(
      <Tooltip
        key={uuid()}
        title="View"
      >
        <Avatar className={clsx(classes.avatar, classes.more)}>
          +{avatars.length - limit}
        </Avatar>
      </Tooltip>
    );
  }

  return (
    <div
      {...rest}
      className={clsx(classes.root, className)}
    >
      {avatarNodes}
    </div>
  );
};

StackAvatars.propTypes = {
  avatars: PropTypes.array.isRequired,
  className: PropTypes.string,
  limit: PropTypes.number.isRequired
};

StackAvatars.defaultProps = {
  limit: 3
};

export default memo(StackAvatars);
