import React, { useState, useEffect } from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/styles';

import axios from 'utils/axios';
import useRouter from 'utils/useRouter';
import { Page } from 'components';
import {
  ConversationList,
  ConversationDetails,
  ConversationPlaceholder
} from './components';

const useStyles = makeStyles(theme => ({
  root: {
    height: '100%',
    cursor: 'pointer',
    display: 'flex',
    overflow: 'hidden',
    '@media (max-width: 863px)': {
      '& $conversationList, & $conversationDetails': {
        flexBasis: '100%',
        width: '100%',
        maxWidth: 'none',
        flexShrink: '0',
        transform: 'translateX(0)'
      }
    }
  },
  openConversion: {
    '@media (max-width: 863px)': {
      '& $conversationList, & $conversationDetails': {
        transform: 'translateX(-100%)'
      }
    }
  },
  conversationList: {
    width: 300,
    flexBasis: 300,
    flexShrink: 0,
    '@media (min-width: 864px)': {
      borderRight: `1px solid ${theme.palette.divider}`
    }
  },
  conversationDetails: {
    flexGrow: 1
  },
  conversationPlaceholder: {
    flexGrow: 1
  }
}));

const Chat = () => {
  const classes = useStyles();
  const router = useRouter();
  const [conversations, setConversations] = useState([]);

  useEffect(() => {
    let mounted = true;

    const fetchConversations = () => {
      axios.get('/api/chat/conversations').then(response => {
        if (mounted) {
          setConversations(response.data.conversations);
        }
      });
    };

    fetchConversations();

    return () => {
      mounted = false;
    };
  }, []);

  let selectedConversation;

  if (router.match.params.id) {
    selectedConversation = conversations.find(
      c => c.id === router.match.params.id
    );
  }

  return (
    <Page
      className={clsx({
        [classes.root]: true,
        [classes.openConversion]: selectedConversation
      })}
      title="Chat"
    >
      <ConversationList
        className={classes.conversationList}
        conversations={conversations}
      />
      {selectedConversation ? (
        <ConversationDetails
          className={classes.conversationDetails}
          conversation={selectedConversation}
        />
      ) : (
        <ConversationPlaceholder className={classes.conversationPlaceholder} />
      )}
    </Page>
  );
};

export default Chat;
