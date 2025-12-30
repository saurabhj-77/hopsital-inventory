import React, { useState, useEffect, useRef } from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  TextField,
  Button,
  Avatar,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  IconButton,
  Paper,
  Chip,
  Divider,
  Badge,
  Fab,
  Zoom,
  Fade,
} from '@mui/material';
import {
  Send,
  AttachFile,
  EmojiEmotions,
  Videocam,
  Phone,
  MoreVert,
  Search,
} from '@mui/icons-material';
import { getDummyData, updateDummyData } from '../../data/DummyData';
import { STORAGE_KEYS } from '../../utils/LocalStorage';
import { auth } from '../../utils/Auth';

const TeamChat = () => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [activeChat, setActiveChat] = useState(null);
  const [users, setUsers] = useState([]);
  const messagesEndRef = useRef(null);

  const currentUser = auth.getCurrentUser();

  useEffect(() => {
    initializeChatData();
    scrollToBottom();
  }, [messages]);

  const initializeChatData = () => {
    const usersData = getDummyData(STORAGE_KEYS.USERS);
    setUsers(usersData.filter(user => user.id !== currentUser.id));

    let chatData = getDummyData(STORAGE_KEYS.CHAT_MESSAGES);
    if (chatData.length === 0) {
      chatData = [
        {
          id: '1',
          senderId: '2',
          receiverId: '1',
          message: 'Hi John, the foundation work is completed ahead of schedule.',
          timestamp: new Date(Date.now() - 3600000).toISOString(),
          read: true,
        },
        {
          id: '2',
          senderId: '1',
          receiverId: '2',
          message: 'Great work Alice! Please proceed with the structural framing.',
          timestamp: new Date(Date.now() - 1800000).toISOString(),
          read: true,
        },
        {
          id: '3',
          senderId: '3',
          receiverId: '1',
          message: 'The electrical materials will be delivered tomorrow morning.',
          timestamp: new Date(Date.now() - 900000).toISOString(),
          read: false,
        },
      ];
      updateDummyData(STORAGE_KEYS.CHAT_MESSAGES, chatData);
    }

    if (usersData.length > 1 && !activeChat) {
      setActiveChat(usersData[1]); // Set first employee as active chat
    }

    setMessages(chatData);
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSendMessage = () => {
    if (!newMessage.trim() || !activeChat) return;

    const messageData = {
      id: Date.now().toString(),
      senderId: currentUser.id,
      receiverId: activeChat.id,
      message: newMessage,
      timestamp: new Date().toISOString(),
      read: false,
    };

    const updatedMessages = [...messages, messageData];
    setMessages(updatedMessages);
    updateDummyData(STORAGE_KEYS.CHAT_MESSAGES, updatedMessages);
    setNewMessage('');
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const getConversationMessages = (userId) => {
    return messages.filter(
      msg => 
        (msg.senderId === currentUser.id && msg.receiverId === userId) ||
        (msg.senderId === userId && msg.receiverId === currentUser.id)
    ).sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp));
  };

  const getLastMessage = (userId) => {
    const convMessages = getConversationMessages(userId);
    return convMessages.length > 0 ? convMessages[convMessages.length - 1] : null;
  };

  const getUnreadCount = (userId) => {
    return messages.filter(
      msg => msg.senderId === userId && msg.receiverId === currentUser.id && !msg.read
    ).length;
  };

  const formatTime = (timestamp) => {
    return new Date(timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const ChatBubble = ({ message, isOwn }) => (
    <Fade in={true}>
      <Box
        sx={{
          display: 'flex',
          justifyContent: isOwn ? 'flex-end' : 'flex-start',
          mb: 2,
        }}
      >
        <Box
          sx={{
            maxWidth: '70%',
            p: 2,
            borderRadius: 2,
            backgroundColor: isOwn ? 'primary.main' : 'grey.100',
            color: isOwn ? 'white' : 'text.primary',
            position: 'relative',
            '&:before': {
              content: '""',
              position: 'absolute',
              width: 0,
              height: 0,
              [isOwn ? 'right' : 'left']: -8,
              top: 0,
              borderStyle: 'solid',
              borderWidth: '0 8px 8px 8px',
              borderColor: isOwn 
                ? 'transparent transparent primary.main transparent'
                : 'transparent transparent grey.100 transparent',
            },
          }}
        >
          <Typography variant="body1">{message.message}</Typography>
          <Typography 
            variant="caption" 
            sx={{ 
              display: 'block',
              mt: 0.5,
              opacity: 0.7,
              textAlign: isOwn ? 'right' : 'left',
            }}
          >
            {formatTime(message.timestamp)}
          </Typography>
        </Box>
      </Box>
    </Fade>
  );

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
        <Typography variant="h4" sx={{ fontWeight: 700 }}>
          Team Chat
        </Typography>
        <Box sx={{ display: 'flex', gap: 1 }}>
          <Button startIcon={<Videocam />} variant="outlined">
            Start Meeting
          </Button>
          <Button startIcon={<Phone />} variant="outlined">
            Call Team
          </Button>
        </Box>
      </Box>

      <Card sx={{ height: 'calc(100vh - 200px)' }}>
        <Box sx={{ display: 'flex', height: '100%' }}>
          {/* Sidebar */}
          <Box sx={{ width: 300, borderRight: 1, borderColor: 'divider', display: 'flex', flexDirection: 'column' }}>
            <Box sx={{ p: 2, borderBottom: 1, borderColor: 'divider' }}>
              <TextField
                fullWidth
                size="small"
                placeholder="Search conversations..."
                InputProps={{
                  startAdornment: <Search sx={{ color: 'text.secondary', mr: 1 }} />,
                }}
              />
            </Box>

            <List sx={{ flexGrow: 1, overflow: 'auto' }}>
              {users.map((user) => {
                const lastMessage = getLastMessage(user.id);
                const unreadCount = getUnreadCount(user.id);
                
                return (
                  <ListItem
                    key={user.id}
                    button
                    selected={activeChat?.id === user.id}
                    onClick={() => setActiveChat(user)}
                    sx={{
                      borderBottom: 1,
                      borderColor: 'divider',
                      '&.Mui-selected': {
                        backgroundColor: 'primary.light',
                        color: 'white',
                      },
                    }}
                  >
                    <ListItemAvatar>
                      <Badge
                        color="success"
                        variant="dot"
                        overlap="circular"
                        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                      >
                        <Avatar src={user.avatar} alt={user.name}>
                          {user.name.charAt(0)}
                        </Avatar>
                      </Badge>
                    </ListItemAvatar>
                    <ListItemText
                      primary={
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                          <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
                            {user.name}
                          </Typography>
                          {lastMessage && (
                            <Typography variant="caption" color="text.secondary">
                              {formatTime(lastMessage.timestamp)}
                            </Typography>
                          )}
                        </Box>
                      }
                      secondary={
                        <Typography 
                          variant="body2" 
                          color="text.secondary"
                          sx={{
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            whiteSpace: 'nowrap',
                          }}
                        >
                          {lastMessage ? lastMessage.message : 'No messages yet'}
                        </Typography>
                      }
                    />
                    {unreadCount > 0 && (
                      <Chip
                        label={unreadCount}
                        color="primary"
                        size="small"
                        sx={{ ml: 1 }}
                      />
                    )}
                  </ListItem>
                );
              })}
            </List>
          </Box>

          {/* Chat Area */}
          <Box sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
            {activeChat ? (
              <>
                {/* Chat Header */}
                <Box sx={{ p: 2, borderBottom: 1, borderColor: 'divider', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    <Avatar src={activeChat.avatar} alt={activeChat.name}>
                      {activeChat.name.charAt(0)}
                    </Avatar>
                    <Box>
                      <Typography variant="h6" sx={{ fontWeight: 600 }}>
                        {activeChat.name}
                      </Typography>
                      <Typography variant="body2" color="success.main">
                        Online
                      </Typography>
                    </Box>
                  </Box>
                  <Box>
                    <IconButton>
                      <Phone />
                    </IconButton>
                    <IconButton>
                      <Videocam />
                    </IconButton>
                    <IconButton>
                      <MoreVert />
                    </IconButton>
                  </Box>
                </Box>

                {/* Messages */}
                <Box sx={{ flexGrow: 1, p: 2, overflow: 'auto', backgroundColor: 'grey.50' }}>
                  {getConversationMessages(activeChat.id).map((message) => (
                    <ChatBubble
                      key={message.id}
                      message={message}
                      isOwn={message.senderId === currentUser.id}
                    />
                  ))}
                  <div ref={messagesEndRef} />
                </Box>

                {/* Message Input */}
                <Box sx={{ p: 2, borderTop: 1, borderColor: 'divider' }}>
                  <Box sx={{ display: 'flex', gap: 1, alignItems: 'flex-end' }}>
                    <IconButton size="small">
                      <AttachFile />
                    </IconButton>
                    <IconButton size="small">
                      <EmojiEmotions />
                    </IconButton>
                    <TextField
                      fullWidth
                      multiline
                      maxRows={3}
                      placeholder="Type a message..."
                      value={newMessage}
                      onChange={(e) => setNewMessage(e.target.value)}
                      onKeyPress={handleKeyPress}
                      variant="outlined"
                      size="small"
                    />
                    <Zoom in={newMessage.length > 0}>
                      <IconButton 
                        color="primary" 
                        onClick={handleSendMessage}
                        sx={{ 
                          backgroundColor: 'primary.main',
                          color: 'white',
                          '&:hover': {
                            backgroundColor: 'primary.dark',
                          },
                        }}
                      >
                        <Send />
                      </IconButton>
                    </Zoom>
                  </Box>
                </Box>
              </>
            ) : (
              <Box sx={{ flexGrow: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Typography variant="h6" color="text.secondary">
                  Select a conversation to start chatting
                </Typography>
              </Box>
            )}
          </Box>
        </Box>
      </Card>
    </Box>
  );
};

export default TeamChat;