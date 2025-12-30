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
  Task,
  Group,
} from '@mui/icons-material';
import { getDummyData, updateDummyData } from '../../data/DummyData';
import { STORAGE_KEYS } from '../../utils/LocalStorage';
import { auth } from '../../utils/Auth';

const TaskChat = () => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [activeTask, setActiveTask] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [users, setUsers] = useState([]);
  const messagesEndRef = useRef(null);

  const currentUser = auth.getCurrentUser();

  useEffect(() => {
    initializeChatData();
    scrollToBottom();
  }, [messages]);

  const initializeChatData = () => {
    const usersData = getDummyData(STORAGE_KEYS.USERS);
    const tasksData = getDummyData(STORAGE_KEYS.TASKS).filter(task => task.assignedTo === currentUser?.id);
    
    setUsers(usersData);
    setTasks(tasksData);

    let chatData = getDummyData(STORAGE_KEYS.CHAT_MESSAGES);
    if (chatData.length === 0) {
      chatData = [
        {
          id: '1',
          taskId: '1',
          senderId: '2',
          message: 'The foundation work is progressing well. We should be done by tomorrow.',
          timestamp: new Date(Date.now() - 3600000).toISOString(),
          type: 'text',
        },
        {
          id: '2',
          taskId: '1',
          senderId: '1',
          message: 'Great! Please make sure to document any issues you encounter.',
          timestamp: new Date(Date.now() - 1800000).toISOString(),
          type: 'text',
        },
        {
          id: '3',
          taskId: '2',
          senderId: '3',
          message: 'The electrical materials have been delivered to the site.',
          timestamp: new Date(Date.now() - 900000).toISOString(),
          type: 'text',
        },
      ];
      updateDummyData(STORAGE_KEYS.CHAT_MESSAGES, chatData);
    }

    if (tasksData.length > 0 && !activeTask) {
      setActiveTask(tasksData[0]);
    }

    setMessages(chatData);
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSendMessage = () => {
    if (!newMessage.trim() || !activeTask) return;

    const messageData = {
      id: Date.now().toString(),
      taskId: activeTask.id,
      senderId: currentUser.id,
      message: newMessage,
      timestamp: new Date().toISOString(),
      type: 'text',
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

  const getTaskMessages = (taskId) => {
    return messages
      .filter(msg => msg.taskId === taskId)
      .sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp));
  };

  const getLastMessage = (taskId) => {
    const taskMessages = getTaskMessages(taskId);
    return taskMessages.length > 0 ? taskMessages[taskMessages.length - 1] : null;
  };

  const getUnreadCount = (taskId) => {
    return messages.filter(
      msg => msg.taskId === taskId && msg.senderId !== currentUser.id
    ).length;
  };

  const formatTime = (timestamp) => {
    return new Date(timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const ChatBubble = ({ message, isOwn }) => {
    const sender = users.find(user => user.id === message.senderId);
    
    return (
      <Fade in={true}>
        <Box
          sx={{
            display: 'flex',
            justifyContent: isOwn ? 'flex-end' : 'flex-start',
            mb: 2,
          }}
        >
          {!isOwn && (
            <Avatar src={sender?.avatar} sx={{ width: 32, height: 32, mr: 1, mt: 0.5 }}>
              {sender?.name?.charAt(0)}
            </Avatar>
          )}
          
          <Box sx={{ maxWidth: '70%' }}>
            {!isOwn && (
              <Typography variant="caption" sx={{ ml: 1, color: 'text.secondary' }}>
                {sender?.name}
              </Typography>
            )}
            <Box
              sx={{
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

          {isOwn && (
            <Avatar src={currentUser?.avatar} sx={{ width: 32, height: 32, ml: 1, mt: 0.5 }}>
              {currentUser?.name?.charAt(0)}
            </Avatar>
          )}
        </Box>
      </Fade>
    );
  };

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
        <Typography variant="h4" sx={{ fontWeight: 700 }}>
          Task Communication
        </Typography>
        <Box sx={{ display: 'flex', gap: 1 }}>
          <Button startIcon={<Videocam />} variant="outlined">
            Video Call
          </Button>
          <Button startIcon={<Group />} variant="outlined">
            Team Meeting
          </Button>
        </Box>
      </Box>

      <Card sx={{ height: 'calc(100vh - 200px)' }}>
        <Box sx={{ display: 'flex', height: '100%' }}>
          {/* Task Sidebar */}
          <Box sx={{ width: 300, borderRight: 1, borderColor: 'divider', display: 'flex', flexDirection: 'column' }}>
            <Box sx={{ p: 2, borderBottom: 1, borderColor: 'divider' }}>
              <TextField
                fullWidth
                size="small"
                placeholder="Search tasks..."
                InputProps={{
                  startAdornment: <Search sx={{ color: 'text.secondary', mr: 1 }} />,
                }}
              />
            </Box>

            <List sx={{ flexGrow: 1, overflow: 'auto' }}>
              {tasks.map((task) => {
                const lastMessage = getLastMessage(task.id);
                const unreadCount = getUnreadCount(task.id);
                
                return (
                  <ListItem
                    key={task.id}
                    button
                    selected={activeTask?.id === task.id}
                    onClick={() => setActiveTask(task)}
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
                        color="primary"
                        badgeContent={unreadCount}
                        overlap="circular"
                      >
                        <Avatar sx={{ backgroundColor: 'primary.main' }}>
                          <Task />
                        </Avatar>
                      </Badge>
                    </ListItemAvatar>
                    <ListItemText
                      primary={
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                          <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
                            {task.title}
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
                  </ListItem>
                );
              })}
            </List>
          </Box>

          {/* Chat Area */}
          <Box sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
            {activeTask ? (
              <>
                {/* Chat Header */}
                <Box sx={{ p: 2, borderBottom: 1, borderColor: 'divider', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    <Avatar sx={{ backgroundColor: 'primary.main' }}>
                      <Task />
                    </Avatar>
                    <Box>
                      <Typography variant="h6" sx={{ fontWeight: 600 }}>
                        {activeTask.title}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        Progress: {activeTask.progress}% • Due: {new Date(activeTask.dueDate).toLocaleDateString()}
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
                  {getTaskMessages(activeTask.id).length === 0 ? (
                    <Box sx={{ textAlign: 'center', py: 4 }}>
                      <Typography variant="h6" color="text.secondary">
                        No messages yet
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        Start the conversation by sending a message
                      </Typography>
                    </Box>
                  ) : (
                    getTaskMessages(activeTask.id).map((message) => (
                      <ChatBubble
                        key={message.id}
                        message={message}
                        isOwn={message.senderId === currentUser.id}
                      />
                    ))
                  )}
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
                      placeholder={`Message about ${activeTask.title}...`}
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
                <Box sx={{ textAlign: 'center' }}>
                  <Task sx={{ fontSize: 64, color: 'text.secondary', mb: 2 }} />
                  <Typography variant="h6" color="text.secondary">
                    Select a task to start chatting
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Choose a task from the sidebar to view and participate in discussions
                  </Typography>
                </Box>
              </Box>
            )}
          </Box>
        </Box>
      </Card>
    </Box>
  );
};

export default TaskChat;