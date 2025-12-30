import React, { useState, useEffect, useRef } from 'react';
import {
  Box,
  Typography,
  TextField,
  IconButton,
  Card,
  CardContent,
  Chip,
  Avatar,
  Fade,
  Slide,
  Grow,
  Zoom,
  Divider,
  Button,
  Paper
} from '@mui/material';
import {
  Send as SendIcon,
  SmartToy as BotIcon,
  Person as PersonIcon,
  Inventory as InventoryIcon,
  Warning as WarningIcon,
  CalendarToday as CalendarIcon,
  Analytics as AnalyticsIcon,
  LocalHospital as HospitalIcon,
  LocalHospital as EmergencyIcon,
  Science as ScienceIcon,
  AttachFile as AttachFileIcon,
  Mic as MicIcon,
  ThumbUp as ThumbUpIcon,
  ThumbDown as ThumbDownIcon,
  RestartAlt as RestartAltIcon
} from '@mui/icons-material';

// Dummy data for AI responses
const aiResponses = {
  greetings: [
    "Hello! I'm your CareTrack AI Assistant. How can I help with hospital inventory today?",
    "Hi there! I'm here to assist with stock levels, expiry tracking, and inventory management.",
    "Welcome! I can help you monitor inventory, track expiries, and analyze usage patterns."
  ],
  capabilities: [
    "I can help you with:\n• Stock levels and alerts\n• Expiry date tracking\n• Department inventory\n• Usage analytics",
    "Here's what I can assist with:\n• Real-time stock monitoring\n• Expiration date management\n• Department-specific inventory\n• Usage patterns and analytics"
  ],
  suggestions: [
    "What's low on stock?",
    "Check expiry of antibiotics",
    "Show me ICU supplies",
    "Emergency department inventory",
    "Usage analytics",
    "Stock levels"
  ]
};

const sampleConversations = [
  {
    id: 1,
    type: 'bot',
    message: "Hello! I'm your CareTrack AI Assistant. I can help you with stock levels, expiry tracking, and inventory management.",
    timestamp: "7:57 PM"
  },
  {
    id: 2,
    type: 'user',
    message: "Hello",
    timestamp: "7:57 PM"
  },
  {
    id: 3,
    type: 'bot',
    message: "I can help you with:\n\n• 'What's low on stock?'\n• 'Check expiry of antibiotics'\n• 'Show me ICU supplies'\n• 'Emergency department inventory'\n• 'Usage analytics'\n• 'Stock levels'\n\nWhat would you like to know?",
    timestamp: "7:57 PM"
  }
];

const quickActions = [
  { icon: <InventoryIcon />, label: 'Stock Levels', color: '#2196f3' },
  { icon: <WarningIcon />, label: 'Low Stock', color: '#ff9800' },
  { icon: <CalendarIcon />, label: 'Expiry Tracking', color: '#f44336' },
  { icon: <HospitalIcon />, label: 'Department', color: '#4caf50' },
  { icon: <AnalyticsIcon />, label: 'Analytics', color: '#9c27b0' },
  { icon: <EmergencyIcon />, label: 'Emergency', color: '#ff5722' }
];

const departments = [
  'ICU', 'Emergency', 'Pharmacy', 'Surgery', 'Pediatrics', 'Radiology', 'Laboratory'
];

const CareTrackAIAssistant = () => {
  const [conversations, setConversations] = useState(sampleConversations);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    const timer = setTimeout(() => setLoaded(true), 300);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [conversations]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSendMessage = () => {
    if (inputMessage.trim() === '') return;

    // Add user message
    const userMessage = {
      id: conversations.length + 1,
      type: 'user',
      message: inputMessage,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setConversations(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsTyping(true);

    // Simulate AI response after delay
    setTimeout(() => {
      let response = '';
      
      if (inputMessage.toLowerCase().includes('low') || inputMessage.toLowerCase().includes('stock')) {
        response = "Currently, 15 items are low on stock including:\n• Paracetamol 500mg (Stock: 100, Min: 400)\n• Surgical Masks (Stock: 200, Min: 1000)\n• IV Catheters (Stock: 75, Min: 300)\n\nWould you like to see the complete low stock list?";
      } else if (inputMessage.toLowerCase().includes('expir') || inputMessage.toLowerCase().includes('antibiotic')) {
        response = "Here are antibiotics expiring soon:\n• Amoxicillin 250mg - Expires in 15 days\n• Cephalexin 500mg - Expires in 30 days\n• Azithromycin 250mg - Expires in 45 days\n\n7 items total will expire within 60 days.";
      } else if (inputMessage.toLowerCase().includes('icu') || inputMessage.toLowerCase().includes('supply')) {
        response = "ICU Department Inventory:\n• Ventilators: 12/15 available\n• Patient Monitors: 18/20 in use\n• IV Pumps: 25/30 operational\n• Emergency Drugs: Fully stocked\n\nAll critical items are above minimum levels.";
      } else if (inputMessage.toLowerCase().includes('emergency')) {
        response = "Emergency Department Stock Status:\n• Trauma Kits: 45/50\n• Emergency Medications: 92%\n• Diagnostic Equipment: 100%\n• Personal Protective Equipment: 78%\n\nAlert: PPE stock needs replenishment in 2 weeks.";
      } else if (inputMessage.toLowerCase().includes('analytics')) {
        response = "Usage Analytics for Last 30 Days:\n• Medication usage: +12% increase\n• Equipment utilization: 85%\n• Stock turnover rate: 4.2\n• Emergency consumption: 230 items\n\nTrend: Surgical supplies usage increased by 18%.";
      } else {
        response = "I understand you're asking about inventory. I can help you with:\n• Current stock levels and alerts\n• Expiry date tracking and predictions\n• Department-specific inventory status\n• Usage patterns and analytics\n\nWhat specific information would you like?";
      }

      const botMessage = {
        id: conversations.length + 2,
        type: 'bot',
        message: response,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };

      setConversations(prev => [...prev, botMessage]);
      setIsTyping(false);
    }, 1500);
  };

  const handleQuickAction = (action) => {
    let message = '';
    switch (action) {
      case 'Stock Levels':
        message = "Show me current stock levels";
        break;
      case 'Low Stock':
        message = "What items are low on stock?";
        break;
      case 'Expiry Tracking':
        message = "Check items expiring soon";
        break;
      case 'Department':
        message = "Show department inventory";
        break;
      case 'Analytics':
        message = "Show usage analytics";
        break;
      case 'Emergency':
        message = "Emergency department inventory status";
        break;
      default:
        message = action;
    }
    setInputMessage(message);
  };

  const handleSuggestionClick = (suggestion) => {
    setInputMessage(suggestion);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const formatMessage = (text) => {
    return text.split('\n').map((line, index) => (
      <Typography key={index} variant="body2" sx={{ mb: line.includes('•') ? 0.5 : 1 }}>
        {line}
      </Typography>
    ));
  };

  const clearConversation = () => {
    setConversations([
      {
        id: 1,
        type: 'bot',
        message: aiResponses.greetings[0],
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }
    ]);
  };

  return (
    <Box sx={{ 
      height: '100vh', 
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      display: 'flex',
      flexDirection: 'column'
    }}>
      {/* Header */}
      <Fade in={loaded} timeout={500}>
        <Box sx={{ 
          p: 3, 
          background: 'rgba(255, 255, 255, 0.1)',
          backdropFilter: 'blur(10px)',
          borderBottom: '1px solid rgba(255, 255, 255, 0.2)'
        }}>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
            <Avatar sx={{ 
              bgcolor: 'white', 
              color: '#667eea',
              width: 48,
              height: 48,
              mr: 2
            }}>
              <BotIcon />
            </Avatar>
            <Box>
              <Typography variant="h4" fontWeight="800" color="white">
                Hospital Inventory AI Assistant
              </Typography>
              <Typography variant="body1" color="rgba(255, 255, 255, 0.8)">
                Your intelligent hospital inventory companion
              </Typography>
            </Box>
          </Box>
          
          <Typography variant="body2" color="rgba(255, 255, 255, 0.9)" sx={{ mb: 1 }}>
            Help you with:
          </Typography>
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
            {['Stock levels and alerts', 'Expiry date tracking', 'Department inventory', 'Usage analytics'].map((item, index) => (
              <Chip
                key={item}
                label={item}
                size="small"
                sx={{
                  background: 'rgba(255, 255, 255, 0.2)',
                  color: 'white',
                  border: '1px solid rgba(255, 255, 255, 0.3)',
                  backdropFilter: 'blur(10px)'
                }}
              />
            ))}
          </Box>
        </Box>
      </Fade>

      {/* Main Content */}
      <Box sx={{ 
        flex: 1, 
        display: 'flex', 
        overflow: 'hidden',
        background: 'white'
      }}>
        {/* Quick Actions Sidebar */}
        <Slide in={loaded} direction="right" timeout={700}>
          <Box sx={{ 
            width: 280, 
            background: 'linear-gradient(180deg, #f8f9fa 0%, #e9ecef 100%)',
            borderRight: '1px solid #dee2e6',
            p: 2,
            display: 'flex',
            flexDirection: 'column'
          }}>
            <Typography variant="h6" fontWeight="600" color="#2c3e50" sx={{ mb: 2 }}>
              Quick Actions
            </Typography>
            
            <Box sx={{ mb: 3 }}>
              {quickActions.map((action, index) => (
                <Button
                  key={action.label}
                  startIcon={action.icon}
                  onClick={() => handleQuickAction(action.label)}
                  sx={{
                    justifyContent: 'flex-start',
                    width: '100%',
                    mb: 1,
                    py: 1.5,
                    background: 'white',
                    border: '1px solid #e9ecef',
                    color: '#2c3e50',
                    '&:hover': {
                      background: action.color,
                      color: 'white',
                      transform: 'translateX(4px)'
                    },
                    transition: 'all 0.3s ease'
                  }}
                >
                  {action.label}
                </Button>
              ))}
            </Box>

            <Divider sx={{ my: 2 }} />

            <Typography variant="h6" fontWeight="600" color="#2c3e50" sx={{ mb: 2 }}>
              Departments
            </Typography>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
              {departments.map(dept => (
                <Chip
                  key={dept}
                  label={dept}
                  size="small"
                  onClick={() => handleSuggestionClick(`${dept} department inventory`)}
                  sx={{
                    background: 'white',
                    border: '1px solid #dee2e6',
                    '&:hover': {
                      background: '#667eea',
                      color: 'white'
                    }
                  }}
                />
              ))}
            </Box>

            <Box sx={{ flex: 1 }} />

            <Button
              startIcon={<RestartAltIcon />}
              onClick={clearConversation}
              sx={{
                width: '100%',
                py: 1.5,
                background: 'linear-gradient(135deg, #ff6b6b 0%, #ee5a52 100%)',
                color: 'white',
                fontWeight: 600,
                '&:hover': {
                  background: 'linear-gradient(135deg, #ee5a52 0%, #ff6b6b 100%)',
                  transform: 'translateY(-2px)'
                },
                transition: 'all 0.3s ease'
              }}
            >
              New Conversation
            </Button>
          </Box>
        </Slide>

        {/* Chat Area */}
        <Box sx={{ 
          flex: 1, 
          display: 'flex', 
          flexDirection: 'column',
          background: 'white'
        }}>
          {/* Messages Container */}
          <Box sx={{ 
            flex: 1, 
            overflow: 'auto', 
            p: 3,
            background: 'linear-gradient(180deg, #fafbfc 0%, #ffffff 100%)'
          }}>
            {conversations.map((msg, index) => (
              <Grow in={loaded} timeout={500 + index * 100} key={msg.id}>
                <Box sx={{ 
                  display: 'flex', 
                  justifyContent: msg.type === 'user' ? 'flex-end' : 'flex-start',
                  mb: 3
                }}>
                  <Box sx={{ 
                    display: 'flex',
                    alignItems: 'flex-start',
                    maxWidth: '70%',
                    flexDirection: msg.type === 'user' ? 'row-reverse' : 'row'
                  }}>
                    <Avatar sx={{ 
                      bgcolor: msg.type === 'user' ? '#667eea' : '#e9ecef',
                      color: msg.type === 'user' ? 'white' : '#667eea',
                      width: 40,
                      height: 40,
                      mx: 1
                    }}>
                      {msg.type === 'user' ? <PersonIcon /> : <BotIcon />}
                    </Avatar>
                    
                    <Card sx={{ 
                      background: msg.type === 'user' 
                        ? 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' 
                        : 'linear-gradient(135deg, #f8f9fa 0%, #ffffff 100%)',
                      color: msg.type === 'user' ? 'white' : 'text.primary',
                      border: msg.type === 'user' ? 'none' : '1px solid #e9ecef',
                      borderRadius: 3,
                      boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                      maxWidth: '100%'
                    }}>
                      <CardContent sx={{ p: 2.5, '&:last-child': { pb: 2.5 } }}>
                        <Box sx={{ whiteSpace: 'pre-wrap', fontSize:'2rem'}}>
                          {formatMessage(msg.message)}
                        </Box>
                        <Typography variant="caption" sx={{ 
                          color: msg.type === 'user' ? 'rgba(255,255,255,0.7)' : 'text.secondary',
                          mt: 1,
                          display: 'block',
                          fontSize:'1rem'
                        }}>
                          {msg.timestamp}
                        </Typography>
                      </CardContent>
                    </Card>
                  </Box>
                </Box>
              </Grow>
            ))}

            {isTyping && (
              <Box sx={{ display: 'flex', justifyContent: 'flex-start', mb: 3 }}>
                <Box sx={{ display: 'flex', alignItems: 'flex-start', maxWidth: '70%' }}>
                  <Avatar sx={{ 
                    bgcolor: '#e9ecef',
                    color: '#667eea',
                    width: 40,
                    height: 40,
                    mx: 1
                  }}>
                    <BotIcon />
                  </Avatar>
                  <Card sx={{ 
                    background: 'linear-gradient(135deg, #f8f9fa 0%, #ffffff 100%)',
                    border: '1px solid #e9ecef',
                    borderRadius: 3
                  }}>
                    <CardContent sx={{ p: 2 }}>
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Box sx={{ 
                          width: 8, 
                          height: 8, 
                          borderRadius: '50%', 
                          bgcolor: '#667eea',
                          mr: 1,
                          animation: 'pulse 1.5s infinite'
                        }} />
                        <Box sx={{ 
                          width: 8, 
                          height: 8, 
                          borderRadius: '50%', 
                          bgcolor: '#667eea',
                          mr: 1,
                          animation: 'pulse 1.5s infinite',
                          animationDelay: '0.3s'
                        }} />
                        <Box sx={{ 
                          width: 8, 
                          height: 8, 
                          borderRadius: '50%', 
                          bgcolor: '#667eea',
                          animation: 'pulse 1.5s infinite',
                          animationDelay: '0.6s'
                        }} />
                      </Box>
                    </CardContent>
                  </Card>
                </Box>
              </Box>
            )}
            
            <div ref={messagesEndRef} />
          </Box>

          {/* Suggestions */}
          {conversations.length <= 3 && (
            <Fade in={loaded} timeout={1000}>
              <Box sx={{ p: 2, borderTop: '1px solid #e9ecef' }}>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 2, textAlign: 'center' }}>
                  Try asking about:
                </Typography>
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, justifyContent: 'center' }}>
                  {aiResponses.suggestions.map((suggestion, index) => (
                    <Chip
                      key={suggestion}
                      label={suggestion}
                      onClick={() => handleSuggestionClick(suggestion)}
                      sx={{
                        background: 'linear-gradient(135deg, #667eea20, #764ba220)',
                        border: '1px solid #667eea40',
                        color: '#667eea',
                        fontWeight: 500,
                        '&:hover': {
                          background: 'linear-gradient(135deg, #667eea, #764ba2)',
                          color: 'white'
                        },
                        transition: 'all 0.3s ease'
                      }}
                    />
                  ))}
                </Box>
              </Box>
            </Fade>
          )}

          {/* Input Area */}
          <Box sx={{ 
            p: 2, 
            borderTop: '1px solid #e9ecef',
            background: 'white'
          }}>
            <Box sx={{ 
              display: 'flex', 
              alignItems: 'flex-end',
              background: '#f8f9fa',
              borderRadius: 3,
              border: '1px solid #e9ecef',
              p: 1,
              transition: 'all 0.3s ease',
              '&:focus-within': {
                borderColor: '#667eea',
                boxShadow: '0 0 0 2px rgba(102, 126, 234, 0.1)'
              }
            }}>
              <IconButton sx={{ color: '#667eea', mr: 1 }}>
                <AttachFileIcon />
              </IconButton>
              
              <TextField
                fullWidth
                multiline
                maxRows={4}
                placeholder="Ask about inventory, expiry, stock..."
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                variant="standard"
                InputProps={{ disableUnderline: true }}
                sx={{ 
                  '& .MuiInputBase-input': {
                    py: 1,
                    px: 1
                  }
                }}
              />
              
              <IconButton sx={{ color: '#667eea', mr: 1 }}>
                <MicIcon />
              </IconButton>
              
              <Zoom in={inputMessage.trim().length > 0}>
                <IconButton 
                  onClick={handleSendMessage}
                  sx={{ 
                    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                    color: 'white',
                    '&:hover': {
                      background: 'linear-gradient(135deg, #764ba2 0%, #667eea 100%)',
                      transform: 'scale(1.1)'
                    },
                    transition: 'all 0.3s ease'
                  }}
                >
                  <SendIcon />
                </IconButton>
              </Zoom>
            </Box>
            
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 1 }}>
              <Typography variant="caption" color="text.secondary">
                CareTrack AI • Hospital Inventory Assistant
              </Typography>
              <Box>
                <IconButton size="small" sx={{ color: 'text.secondary' }}>
                  <ThumbUpIcon fontSize="small" />
                </IconButton>
                <IconButton size="small" sx={{ color: 'text.secondary' }}>
                  <ThumbDownIcon fontSize="small" />
                </IconButton>
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>

      <style jsx>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.5; }
        }
      `}</style>
    </Box>
  );
};

export default CareTrackAIAssistant;