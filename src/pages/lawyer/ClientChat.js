// src/components/lawyer/ClientChat.js
import React, { useState, useRef, useEffect } from "react";
import {
  Box,
  Card,
  CardContent,
  Typography,
  TextField,
  IconButton,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
  Chip,
  Paper,
} from "@mui/material";
import {
  Send as SendIcon,
  AttachFile as AttachIcon,
  Videocam as VideoIcon,
} from "@mui/icons-material";

const ClientChat = () => {
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: "client",
      text: "Hello, I have some questions about the partnership agreement draft.",
      timestamp: "2024-01-15 10:30 AM",
      client: "Medical Clinic LLC",
    },
    {
      id: 2,
      sender: "lawyer",
      text: "Of course! I'm reviewing the draft now. What specific questions do you have?",
      timestamp: "2024-01-15 10:32 AM",
    },
    {
      id: 3,
      sender: "client",
      text: "I wanted to clarify the data ownership terms in section 5.2 and the termination notice period.",
      timestamp: "2024-01-15 10:35 AM",
      client: "Medical Clinic LLC",
    },
  ]);

  const [newMessage, setNewMessage] = useState("");
  const [selectedClient, setSelectedClient] = useState("Medical Clinic LLC");
  const messagesEndRef = useRef(null);

  const clients = [
    { name: "Medical Clinic LLC", unread: 2, lastMessage: "2 hours ago" },
    { name: "Retail Corp", unread: 0, lastMessage: "1 day ago" },
    { name: "Tech Startup Inc", unread: 1, lastMessage: "3 hours ago" },
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      const newMsg = {
        id: messages.length + 1,
        sender: "lawyer",
        text: newMessage,
        timestamp: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
      };
      setMessages([...messages, newMsg]);
      setNewMessage("");
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <Box sx={{ p: 3, height: "calc(100vh - 100px)" }}>
      <Typography variant="h4" gutterBottom sx={{ fontWeight: 600, mb: 4 }}>
        Client Communication
      </Typography>

      {/* Layout container replacing Grid */}
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          gap: 3,
          height: "100%",
        }}
      >
        {/* Clients List */}
        <Box sx={{ flex: { xs: "none", md: "0 0 30%" }, height: "100%" }}>
          <Card sx={{ height: "100%" }}>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Clients
              </Typography>
              <List>
                {clients.map((client, index) => (
                  <ListItem
                    key={index}
                    button
                    selected={selectedClient === client.name}
                    onClick={() => setSelectedClient(client.name)}
                    sx={{
                      borderRadius: 1,
                      mb: 1,
                      backgroundColor:
                        selectedClient === client.name
                          ? "primary.light"
                          : "transparent",
                      "&:hover": {
                        backgroundColor: "action.hover",
                      },
                    }}
                  >
                    <ListItemAvatar>
                      <Avatar sx={{ bgcolor: "primary.main" }}>
                        {client.name.charAt(0)}
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText
                      primary={client.name}
                      secondary={`Last message: ${client.lastMessage}`}
                    />
                    {client.unread > 0 && (
                      <Chip label={client.unread} color="primary" size="small" />
                    )}
                  </ListItem>
                ))}
              </List>
            </CardContent>
          </Card>
        </Box>

        {/* Chat Area */}
        <Box sx={{ flex: 1, display: "flex", flexDirection: "column" }}>
          <Card
            sx={{
              height: "100%",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <CardContent
              sx={{ flex: 1, display: "flex", flexDirection: "column", p: 0 }}
            >
              {/* Chat Header */}
              <Box sx={{ p: 2, borderBottom: 1, borderColor: "divider" }}>
                <Box
                  display="flex"
                  justifyContent="space-between"
                  alignItems="center"
                >
                  <Box>
                    <Typography variant="h6">{selectedClient}</Typography>
                    <Typography variant="body2" color="textSecondary">
                      Online - Last active 5 min ago
                    </Typography>
                  </Box>
                  <IconButton color="primary">
                    <VideoIcon />
                  </IconButton>
                </Box>
              </Box>

              {/* Messages */}
              <Box sx={{ flex: 1, overflow: "auto", p: 2 }}>
                {messages.map((message) => (
                  <Box
                    key={message.id}
                    sx={{
                      display: "flex",
                      justifyContent:
                        message.sender === "lawyer"
                          ? "flex-end"
                          : "flex-start",
                      mb: 2,
                    }}
                  >
                    <Paper
                      sx={{
                        p: 2,
                        maxWidth: "70%",
                        backgroundColor:
                          message.sender === "lawyer"
                            ? "primary.main"
                            : "grey.100",
                        color:
                          message.sender === "lawyer"
                            ? "white"
                            : "text.primary",
                      }}
                    >
                      {message.sender === "client" && (
                        <Typography
                          variant="caption"
                          color="textSecondary"
                          display="block"
                          gutterBottom
                        >
                          {message.client}
                        </Typography>
                      )}
                      <Typography variant="body1">{message.text}</Typography>
                      <Typography
                        variant="caption"
                        sx={{
                          display: "block",
                          mt: 1,
                          color:
                            message.sender === "lawyer"
                              ? "white"
                              : "text.secondary",
                        }}
                      >
                        {message.timestamp}
                      </Typography>
                    </Paper>
                  </Box>
                ))}
                <div ref={messagesEndRef} />
              </Box>

              {/* Message Input */}
              <Box sx={{ p: 2, borderTop: 1, borderColor: "divider" }}>
                <Box display="flex" gap={1} alignItems="flex-end">
                  <IconButton size="small">
                    <AttachIcon />
                  </IconButton>
                  <TextField
                    fullWidth
                    multiline
                    maxRows={3}
                    placeholder="Type your message..."
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    onKeyPress={handleKeyPress}
                    variant="outlined"
                    size="small"
                  />
                  <IconButton
                    color="primary"
                    onClick={handleSendMessage}
                    disabled={!newMessage.trim()}
                  >
                    <SendIcon />
                  </IconButton>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Box>
      </Box>
    </Box>
  );
};

export default ClientChat;
