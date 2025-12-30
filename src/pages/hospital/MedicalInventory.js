import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Card,
  CardContent,
  Grid,
  Chip,
  IconButton,
  Modal,
  Fade,
  Slide,
  Grow,
  TextField,
  Button,
  MenuItem,
  Divider,
  Avatar,
  Tooltip,
  Paper,
  alpha,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  CardMedia,
  Fab,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  CircularProgress
} from '@mui/material';
import {
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  LocalHospital as MedicalIcon,
  Inventory as InventoryIcon,
  Warning as WarningIcon,
  Error as ErrorIcon,
  CheckCircle as CheckCircleIcon,
  CalendarToday as CalendarIcon,
  Close as CloseIcon,
  Science as ScienceIcon,
  LocalPharmacy as PharmacyIcon,
  Biotech as BiotechIcon,
  ArrowBack as ArrowBackIcon,
  Save as SaveIcon,
  Cancel as CancelIcon,
  TrendingUp as TrendingUpIcon,
  LocalShipping as ShippingIcon,
  Mic as MicIcon,
  Stop as StopIcon,
  SmartToy as AIIcon,
  VolumeUp as VolumeUpIcon,
  AutoAwesome as AutoAwesomeIcon
} from '@mui/icons-material';

// ---------- subtle keyframes via sx ----------
const floatUp = {
  '@keyframes floatUp': {
    '0%':   { transform: 'translateY(0px)' },
    '50%':  { transform: 'translateY(-8px)' },
    '100%': { transform: 'translateY(0px)' },
  }
};
const pulse = {
  '@keyframes pulse': {
    '0%':   { transform: 'scale(1)', opacity: 0.7 },
    '50%':  { transform: 'scale(1.08)', opacity: 1 },
    '100%': { transform: 'scale(1)', opacity: 0.7 },
  }
};
const shine = {
  '@keyframes shine': {
    '0%':   { transform: 'translateX(-150%)' },
    '100%': { transform: 'translateX(150%)' },
  }
};
const voicePulse = {
  '@keyframes voicePulse': {
    '0%':   { transform: 'scale(1)', boxShadow: '0 0 0 0 rgba(102, 126, 234, 0.7)' },
    '70%':  { transform: 'scale(1.05)', boxShadow: '0 0 0 15px rgba(102, 126, 234, 0)' },
    '100%': { transform: 'scale(1)', boxShadow: '0 0 0 0 rgba(102, 126, 234, 0)' },
  }
};
const aiGlow = {
  '@keyframes aiGlow': {
    '0%':   { boxShadow: '0 0 5px rgba(102, 126, 234, 0.5)' },
    '50%':  { boxShadow: '0 0 20px rgba(102, 126, 234, 0.8)' },
    '100%': { boxShadow: '0 0 5px rgba(102, 126, 234, 0.5)' },
  }
};

// friendly category cover images (replace with your local assets if you prefer)
const categoryCovers = {
  Pharmacy: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?q=80&w=1600&auto=format&fit=crop',
  Consumable: 'https://images.unsplash.com/photo-1580281657527-47b45e3a2b11?q=80&w=1600&auto=format&fit=crop',
  Equipment: 'https://images.unsplash.com/photo-1586773860418-d37222d8fce3?q=80&w=1600&auto=format&fit=crop',
  Laboratory: 'https://images.unsplash.com/photo-1581091014534-8982f0b9f5c5?q=80&w=1600&auto=format&fit=crop',
  Default: 'https://images.unsplash.com/photo-1505751172876-fa1923c5c528?q=80&w=1600&auto=format&fit=crop',
};

// --------- Sample inventory data (unchanged) ---------
const initialInventoryItems = [
  { id: 1, name: 'Paracetamol 500mg', quantity: 25, minStock: 10, expiryDate: '2026-03-15', category: 'Pharmacy', status: 'In Stock', batchNumber: 'BATCH-001', supplier: 'MedSupply Pvt Ltd', value: 1250, lastUpdated: '2024-01-15', usageRate: 'High' },
  { id: 2, name: 'Syringe 5ml', quantity: 8, minStock: 15, expiryDate: '2025-01-10', category: 'Consumable', status: 'Low Stock', batchNumber: 'BATCH-002', supplier: 'SafeNeedle Corp', value: 240, lastUpdated: '2024-01-14', usageRate: 'Medium' },
  { id: 3, name: 'Insulin Pen', quantity: 0, minStock: 5, expiryDate: '2024-06-01', category: 'Pharmacy', status: 'Out of Stock', batchNumber: 'BATCH-003', supplier: 'Diabetic Care Inc', value: 0, lastUpdated: '2024-01-10', usageRate: 'High' },
  { id: 4, name: 'Bandages', quantity: 45, minStock: 20, expiryDate: '2027-08-20', category: 'Consumable', status: 'In Stock', batchNumber: 'BATCH-004', supplier: 'First Aid Supplies', value: 900, lastUpdated: '2024-01-12', usageRate: 'Medium' },
  { id: 5, name: 'Antiseptic Solution', quantity: 12, minStock: 8, expiryDate: '2025-09-30', category: 'Pharmacy', status: 'In Stock', batchNumber: 'BATCH-005', supplier: 'CleanCare Medical', value: 360, lastUpdated: '2024-01-13', usageRate: 'High' },
  { id: 6, name: 'Surgical Gloves', quantity: 3, minStock: 25, expiryDate: '2026-05-15', category: 'Consumable', status: 'Critical', batchNumber: 'BATCH-006', supplier: 'SafeTouch Medical', value: 75, lastUpdated: '2024-01-11', usageRate: 'Very High' }
];

// AI Voice Agent Component - NEW ADDITION
const AIVoiceAgent = ({ onVoiceCommand, inventoryItems }) => {
  const [isListening, setIsListening] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [conversation, setConversation] = useState([]);
  const [agentOpen, setAgentOpen] = useState(false);

  // Speech Synthesis Function
  const speakText = (text) => {
    if ('speechSynthesis' in window) {
      const speech = new SpeechSynthesisUtterance();
      speech.text = text;
      speech.volume = 1;
      speech.rate = 0.9;
      speech.pitch = 1;
      speech.lang = 'en-US';
      
      // Filter for a more natural voice if available
      const voices = window.speechSynthesis.getVoices();
      const naturalVoice = voices.find(voice => 
        voice.name.includes('Google') || 
        voice.name.includes('Samantha') || 
        voice.name.includes('Microsoft')
      );
      
      if (naturalVoice) {
        speech.voice = naturalVoice;
      }
      
      window.speechSynthesis.speak(speech);
    }
  };

  const handleVoiceCommand = () => {
    if (isListening) {
      setIsListening(false);
      return;
    }

    setIsListening(true);
    
    // Simulate listening and processing
    setTimeout(() => {
      setIsListening(false);
      setIsProcessing(true);
      
      // Simulate AI processing
      setTimeout(() => {
        const lowStockItems = inventoryItems.filter(item => 
          item.status === 'Low Stock' || item.status === 'Critical'
        );
        const expiringSoon = inventoryItems.filter(item => {
          const expiry = new Date(item.expiryDate);
          const today = new Date();
          const diffTime = expiry - today;
          const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
          return diffDays <= 30 && diffDays > 0;
        });

        let response = "";
        if (lowStockItems.length > 0) {
          response = `I found ${lowStockItems.length} low stock items including ${lowStockItems.slice(0, 2).map(item => item.name).join(' and ')}. Consider reordering these soon.`;
        } else if (expiringSoon.length > 0) {
          response = `There are ${expiringSoon.length} items expiring within 30 days. Check the expiring soon filter for details.`;
        } else {
          response = "Your inventory looks good! All items are well stocked and no immediate expirations.";
        }

        const aiMessage = {
          type: 'ai', 
          message: response,
          action: 'inventory_status'
        };
        
        setConversation(prev => [
          ...prev,
          { type: 'user', message: 'Check inventory status' },
          aiMessage
        ]);
        
        setIsProcessing(false);
        
        // Speak the AI response
        speakText(response);
        
        if (onVoiceCommand) {
          onVoiceCommand(aiMessage);
        }
      }, 1500);
    }, 2000);
  };

  const handleTextCommand = (command) => {
    setIsProcessing(true);
    setConversation(prev => [
      ...prev,
      { type: 'user', message: command }
    ]);

    setTimeout(() => {
      let response = "";
      let action = null;

      if (command.toLowerCase().includes('low stock') || command.toLowerCase().includes('running low')) {
        const lowStock = inventoryItems.filter(item => 
          item.status === 'Low Stock' || item.status === 'Critical'
        );
        response = `You have ${lowStock.length} low stock items: ${lowStock.map(item => `${item.name} (${item.quantity} left)`).join(', ')}`;
        action = 'filter_low_stock';
      } else if (command.toLowerCase().includes('expir') || command.toLowerCase().includes('expiring')) {
        const expiring = inventoryItems.filter(item => {
          const expiry = new Date(item.expiryDate);
          const today = new Date();
          const diffTime = expiry - today;
          const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
          return diffDays <= 30;
        });
        response = `There are ${expiring.length} items expiring within 30 days: ${expiring.map(item => `${item.name} on ${new Date(item.expiryDate).toLocaleDateString()}`).join(', ')}`;
        action = 'filter_expiring';
      } else if (command.toLowerCase().includes('pharmacy')) {
        const pharmacy = inventoryItems.filter(item => item.category === 'Pharmacy');
        response = `Pharmacy category has ${pharmacy.length} items with total value of $${pharmacy.reduce((sum, item) => sum + item.value, 0)}. Key items: ${pharmacy.slice(0, 3).map(item => item.name).join(', ')}`;
        action = 'filter_pharmacy';
      } else if (command.toLowerCase().includes('add') || command.toLowerCase().includes('new item')) {
        response = "I can help you add a new inventory item. Please use the 'Add New Item' button to get started.";
        action = 'add_item';
      } else {
        response = "I can help you manage medical inventory. Try asking about low stock items, expiring items, or specific categories like pharmacy.";
      }

      const aiMessage = {
        type: 'ai', 
        message: response,
        action: action
      };

      setConversation(prev => [
        ...prev,
        aiMessage
      ]);
      
      setIsProcessing(false);
      
      // Speak the AI response
      speakText(response);
      
      if (onVoiceCommand) {
        onVoiceCommand(aiMessage);
      }
    }, 1000);
  };

  return (
    <>
      {/* Floating AI Assistant Button */}
      <Fab
        color="primary"
        aria-label="ai-voice-agent"
        onClick={() => setAgentOpen(true)}
        sx={{
          position: 'fixed',
          bottom: 24,
          right: 24,
          width: 60,
          height: 60,
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          animation: isListening ? 'voicePulse 2s infinite' : 'aiGlow 3s ease-in-out infinite',
          '&:hover': {
            background: 'linear-gradient(135deg, #5a6fd8 0%, #6a4190 100%)',
            transform: 'scale(1.1)'
          },
          transition: 'all 0.3s ease',
          zIndex: 1000
        }}
      >
        {isProcessing ? <CircularProgress size={24} sx={{ color: 'white' }} /> : <AIIcon />}
      </Fab>

      {/* AI Voice Agent Dialog */}
      <Dialog 
        open={agentOpen} 
        onClose={() => setAgentOpen(false)}
        maxWidth="sm"
        fullWidth
        PaperProps={{
          sx: {
            borderRadius: 3,
            background: 'linear-gradient(135deg, #f5f7fa 0%, #dfe9f3 100%)',
            minHeight: '400px'
          }
        }}
      >
        <DialogTitle sx={{ 
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          color: 'white',
          fontWeight: 800
        }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <AIIcon />
            Medical Inventory Assistant
          </Box>
        </DialogTitle>
        
        <DialogContent sx={{ p: 3 }}>
          {/* Conversation History */}
          <Box sx={{ mb: 3, maxHeight: '300px', overflow: 'auto' }}>
            {conversation.length === 0 ? (
              <Typography color="text.secondary" textAlign="center" sx={{ py: 4 }}>
                Ask me about low stock items, expiring products, or inventory status. I'll speak the answers too!
              </Typography>
            ) : (
              conversation.map((msg, index) => (
                <Box
                  key={index}
                  sx={{
                    display: 'flex',
                    justifyContent: msg.type === 'user' ? 'flex-end' : 'flex-start',
                    mb: 2
                  }}
                >
                  <Card
                    sx={{
                      maxWidth: '80%',
                      background: msg.type === 'user' 
                        ? 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' 
                        : 'white',
                      color: msg.type === 'user' ? 'white' : 'text.primary',
                      borderRadius: 3,
                      p: 2,
                      border: msg.type === 'ai' ? '1px solid #667eea20' : 'none'
                    }}
                  >
                    <Typography variant="body2">
                      {msg.message}
                    </Typography>
                  </Card>
                </Box>
              ))
            )}
            
            {isProcessing && (
              <Box sx={{ display: 'flex', justifyContent: 'flex-start', mb: 2 }}>
                <Card sx={{ background: 'white', borderRadius: 3, p: 2 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <CircularProgress size={16} />
                    <Typography variant="body2">Analyzing inventory...</Typography>
                  </Box>
                </Card>
              </Box>
            )}
          </Box>

          {/* Quick Commands */}
          <Grid container spacing={1} sx={{ mb: 2 }}>
            {['Check low stock', 'Expiring items', 'Pharmacy status', 'Add new item'].map((cmd) => (
              <Grid item xs={6} key={cmd}>
                <Chip
                  label={cmd}
                  onClick={() => handleTextCommand(cmd)}
                  variant="outlined"
                  sx={{ 
                    width: '100%',
                    cursor: 'pointer',
                    '&:hover': { background: 'rgba(102, 126, 234, 0.1)' }
                  }}
                />
              </Grid>
            ))}
          </Grid>
        </DialogContent>
        
        <DialogActions sx={{ p: 3, flexDirection: 'column', gap: 2 }}>
          <Button
            fullWidth
            variant={isListening ? "contained" : "outlined"}
            color={isListening ? "error" : "primary"}
            startIcon={isListening ? <StopIcon /> : <MicIcon />}
            onClick={handleVoiceCommand}
            disabled={isProcessing}
            sx={{
              py: 1.5,
              borderRadius: 3,
              fontWeight: 700,
              background: isListening ? '#ff4757' : 'transparent',
              '&:hover': {
                background: isListening ? '#ff3742' : 'rgba(102, 126, 234, 0.1)'
              }
            }}
          >
            {isListening ? 'Stop Listening' : 'Start Voice Command'}
          </Button>
          
          <Typography variant="caption" color="text.secondary" textAlign="center">
            Try: "What's running low?" or "Show me expiring items"
          </Typography>
        </DialogActions>
      </Dialog>
    </>
  );
};

const MedicalInventory = () => {
  const [inventoryItems, setInventoryItems] = useState(initialInventoryItems);
  const [selectedItem, setSelectedItem] = useState(null);
  const [detailModalOpen, setDetailModalOpen] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [editedItem, setEditedItem] = useState(null);
  const [loaded, setLoaded] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('All');
  const [statusFilter, setStatusFilter] = useState('All');

  const categories = ['All', 'Pharmacy', 'Consumable', 'Equipment', 'Laboratory'];
  const statuses = ['All', 'In Stock', 'Low Stock', 'Out of Stock', 'Critical'];

  useEffect(() => {
    const timer = setTimeout(() => setLoaded(true), 300);
    return () => clearTimeout(timer);
  }, []);

  // NEW: AI Voice Command Handler
  const handleVoiceCommand = (command) => {
    if (command.action === 'filter_low_stock') {
      setStatusFilter('Low Stock');
    } else if (command.action === 'filter_expiring') {
      // You could implement an expiring filter here
      setSearchTerm('expiring');
    } else if (command.action === 'filter_pharmacy') {
      setCategoryFilter('Pharmacy');
    } else if (command.action === 'add_item') {
      // Trigger add new item flow
      console.log("Add new item triggered via AI");
    }
  };

  // ALL ORIGINAL FUNCTIONS REMAIN UNCHANGED
  const handleItemClick = (item) => {
    setSelectedItem(item);
    setEditedItem({ ...item });
    setDetailModalOpen(true);
    setEditMode(false);
  };

  const handleEdit = () => setEditMode(true);

  const handleSave = () => {
    if (editedItem) {
      const updatedItems = inventoryItems.map(item =>
        item.id === editedItem.id ? editedItem : item
      );
      setInventoryItems(updatedItems);
      setSelectedItem(editedItem);
      setEditMode(false);
    }
  };

  const handleCancel = () => {
    setEditedItem(selectedItem ? { ...selectedItem } : null);
    setEditMode(false);
  };

  const handleDelete = () => {
    if (selectedItem) {
      const updatedItems = inventoryItems.filter(item => item.id !== selectedItem.id);
      setInventoryItems(updatedItems);
      setDetailModalOpen(false);
      setSelectedItem(null);
    }
  };

  const handleInputChange = (field, value) => {
    setEditedItem(prev => ({ ...prev, [field]: value }));
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'In Stock': return '#4caf50';
      case 'Low Stock': return '#ff9800';
      case 'Out of Stock': return '#f44336';
      case 'Critical': return '#d32f2f';
      default: return '#9e9e9e';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'In Stock': return <CheckCircleIcon />;
      case 'Low Stock': return <WarningIcon />;
      case 'Out of Stock': return <ErrorIcon />;
      case 'Critical': return <ErrorIcon />;
      default: return <InventoryIcon />;
    }
  };

  const getCategoryIcon = (category) => {
    switch (category) {
      case 'Pharmacy': return <PharmacyIcon />;
      case 'Consumable': return <MedicalIcon />;
      case 'Equipment': return <ScienceIcon />;
      case 'Laboratory': return <BiotechIcon />;
      default: return <InventoryIcon />;
    }
  };

  const getDaysUntilExpiry = (expiryDate) => {
    const today = new Date();
    const expiry = new Date(expiryDate);
    const diffTime = expiry - today;
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  };

  const getExpiryStatus = (expiryDate) => {
    const days = getDaysUntilExpiry(expiryDate);
    if (days < 0) return { status: 'Expired', color: '#f44336' };
    if (days <= 30) return { status: 'Expiring Soon', color: '#ff9800' };
    if (days <= 90) return { status: 'Near Expiry', color: '#ffc107' };
    return { status: 'Valid', color: '#4caf50' };
  };

  const filteredItems = inventoryItems.filter(item => {
    const matchesSearch =
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.batchNumber.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = categoryFilter === 'All' || item.category === categoryFilter;
    const matchesStatus = statusFilter === 'All' || item.status === statusFilter;
    return matchesSearch && matchesCategory && matchesStatus;
  });

  // ---------- Card component (Enhanced with AI indicators) ----------
  const InventoryCard = ({ item, index }) => (
    <Grow in={loaded} timeout={500 + index * 100}>
      <Card
        sx={{
          cursor: 'pointer',
          transition: 'all 0.35s cubic-bezier(0.2, 0.8, 0.2, 1)',
          '&:hover': {
            transform: 'translateY(-8px) scale(1.01)',
            boxShadow: '0 16px 40px rgba(0,0,0,0.18)',
            border: `2px solid ${getStatusColor(item.status)}`
          },
          border: `1px solid #e0e0e0`,
          borderRadius: 3,
          overflow: 'hidden',
          position: 'relative',
          background: 'linear-gradient(180deg, #ffffff, #fafbff)'
        }}
        onClick={() => handleItemClick(item)}
      >
        {/* NEW: AI Quick Action */}
        <Tooltip title="Ask AI about this item">
          <IconButton
            sx={{
              position: 'absolute',
              top: 8,
              right: 8,
              zIndex: 3,
              background: 'rgba(102, 126, 234, 0.1)',
              '&:hover': { background: 'rgba(102, 126, 234, 0.2)' }
            }}
            size="small"
          >
            <AIIcon sx={{ fontSize: 16, color: '#667eea' }} />
          </IconButton>
        </Tooltip>

        {/* soft image overlay */}
        <CardMedia
          image={categoryCovers[item.category] || categoryCovers.Default}
          title={`${item.category} cover`}
          sx={{
            position: 'absolute',
            inset: 0,
            opacity: 0.12,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            filter: 'grayscale(20%)',
            pointerEvents: 'none'
          }}
        />
        {/* animated sheen */}
        <Box sx={{
          position: 'absolute', top: 0, left: 0, right: 0, height: 2, overflow: 'hidden', zIndex: 1,
          '&::after': {
            content: '""',
            display: 'block',
            width: '40%', height: '100%',
            background: `linear-gradient(90deg, transparent, ${alpha(getStatusColor(item.status), 0.6)}, transparent)`,
            ...shine,
            animation: 'shine 2.6s linear infinite'
          }
        }}/>

        <CardContent sx={{ p: 3, position: 'relative', zIndex: 2 }}>
          {/* Header */}
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
              <Avatar sx={{ bgcolor: alpha(getStatusColor(item.status), 0.12), color: getStatusColor(item.status), border: `1px solid ${alpha(getStatusColor(item.status), 0.4)}` }}>
                {getCategoryIcon(item.category)}
              </Avatar>
              <Box>
                <Typography variant="h6" fontWeight="800" color="#1f2d3d">
                  {item.name}
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 600 }}>
                  {item.category}
                </Typography>
              </Box>
            </Box>
            <Chip
              icon={getStatusIcon(item.status)}
              label={item.status}
              size="small"
              sx={{
                backgroundColor: alpha(getStatusColor(item.status), 0.1),
                color: getStatusColor(item.status),
                fontWeight: 800,
                border: `1px solid ${getStatusColor(item.status)}`
              }}
            />
          </Box>

          {/* Quantity Bar */}
          <Box sx={{ mb: 2 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
              <Typography variant="body2" fontWeight="700" color="text.secondary">
                Quantity
              </Typography>
              <Typography variant="body2" fontWeight="800" color={item.quantity <= item.minStock ? '#f44336' : '#2e7d32'}>
                {item.quantity} / {item.minStock} units
              </Typography>
            </Box>
            <Box sx={{ height: 8, backgroundColor: '#f2f4f8', borderRadius: 4, overflow: 'hidden' }}>
              <Box
                sx={{
                  height: '100%',
                  backgroundColor: item.quantity <= item.minStock ? '#f44336' : '#4caf50',
                  width: `${Math.min((item.quantity / (item.minStock * 2)) * 100, 100)}%`,
                  transition: 'all 0.3s ease'
                }}
              />
            </Box>
          </Box>

          {/* Details */}
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <CalendarIcon sx={{ fontSize: 16, color: 'text.secondary' }} />
                <Typography variant="body2" fontWeight="600">
                  {new Date(item.expiryDate).toLocaleDateString()}
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={6}>
              <Typography variant="body2" fontWeight="800" color={getExpiryStatus(item.expiryDate).color} textAlign="right">
                {getExpiryStatus(item.expiryDate).status}
              </Typography>
            </Grid>
          </Grid>

          {/* Batch & Value */}
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 2 }}>
            <Typography variant="caption" color="text.secondary" fontWeight="700">
              {item.batchNumber}
            </Typography>
            <Typography variant="body2" fontWeight="900" color="#5b6ef5">
              ${item.value}
            </Typography>
          </Box>
        </CardContent>

        {/* Expiry Warning Dot */}
        {getDaysUntilExpiry(item.expiryDate) <= 30 && (
          <Box
            sx={{
              position: 'absolute',
              top: 12,
              right: 40, // Adjusted for AI button
              width: 10,
              height: 10,
              borderRadius: '50%',
              backgroundColor: getExpiryStatus(item.expiryDate).color,
              ...pulse,
              animation: 'pulse 2.2s ease-in-out infinite'
            }}
          />
        )}
      </Card>
    </Grow>
  );

  // ---------- Detail Modal (Enhanced with AI features) ----------
  const renderDetailModal = () => (
    <Modal open={detailModalOpen} onClose={() => setDetailModalOpen(false)}>
      <Fade in={detailModalOpen}>
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: { xs: '95%', sm: 640 },
            maxHeight: '90vh',
            overflow: 'auto',
            bgcolor: 'background.paper',
            borderRadius: 4,
            boxShadow: 24,
            border: '1px solid rgba(31,45,61,0.12)',
            backgroundImage: 'radial-gradient(circle at 10% 0%, rgba(102,126,234,0.06), transparent 40%)'
          }}
        >
          {selectedItem && (
            <Box>
              {/* Header */}
              <Box sx={{ p: 3, borderBottom: '1px solid #e9edf3', position: 'sticky', top: 0, background: 'inherit', zIndex: 2 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    <IconButton onClick={() => setDetailModalOpen(false)} sx={{ color: 'text.secondary' }}>
                      <ArrowBackIcon />
                    </IconButton>
                    <Box>
                      <Typography variant="h4" fontWeight="900" color="#1f2d3d">
                        {editMode ? 'Edit Item' : selectedItem.name}
                      </Typography>
                      <Typography variant="body1" color="text.secondary" sx={{ fontWeight: 600 }}>
                        {selectedItem.category} • {selectedItem.batchNumber}
                      </Typography>
                    </Box>
                  </Box>
                  <Box sx={{ display: 'flex', gap: 1 }}>
                    {/* NEW: AI Analysis Button */}
                    <Tooltip title="AI Analysis">
                      <IconButton sx={{ color: '#667eea' }}>
                        <AutoAwesomeIcon />
                      </IconButton>
                    </Tooltip>
                    {!editMode ? (
                      <>
                        <Tooltip title="Edit Item">
                          <IconButton onClick={handleEdit} sx={{ color: '#667eea' }}>
                            <EditIcon />
                          </IconButton>
                        </Tooltip>
                        <Tooltip title="Delete Item">
                          <IconButton onClick={handleDelete} sx={{ color: '#f44336' }}>
                            <DeleteIcon />
                          </IconButton>
                        </Tooltip>
                      </>
                    ) : (
                      <>
                        <Tooltip title="Save Changes">
                          <IconButton onClick={handleSave} sx={{ color: '#4caf50' }}>
                            <SaveIcon />
                          </IconButton>
                        </Tooltip>
                        <Tooltip title="Cancel">
                          <IconButton onClick={handleCancel} sx={{ color: '#f44336' }}>
                            <CancelIcon />
                          </IconButton>
                        </Tooltip>
                      </>
                    )}
                    <IconButton onClick={() => setDetailModalOpen(false)}>
                      <CloseIcon />
                    </IconButton>
                  </Box>
                </Box>

                {/* Status Chip */}
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <Chip
                    icon={getStatusIcon(selectedItem.status)}
                    label={selectedItem.status}
                    sx={{
                      backgroundColor: alpha(getStatusColor(selectedItem.status), 0.1),
                      color: getStatusColor(selectedItem.status),
                      fontWeight: 800,
                      fontSize: '0.9rem',
                      border: `2px solid ${getStatusColor(selectedItem.status)}`
                    }}
                  />
                  {/* NEW: AI Status Indicator */}
                  <Chip
                    icon={<AIIcon />}
                    label="AI Monitoring"
                    size="small"
                    variant="outlined"
                    sx={{
                      fontWeight: 700,
                      color: '#667eea',
                      borderColor: '#667eea'
                    }}
                  />
                </Box>
              </Box>

              {/* Content */}
              <Box sx={{ p: 3 }}>
                {editMode ? (
                  <Grid container spacing={3}>
                    <Grid item xs={12} sm={6}>
                      <TextField fullWidth label="Item Name" value={editedItem.name} onChange={(e) => handleInputChange('name', e.target.value)} size="small" />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField fullWidth select label="Category" value={editedItem.category} onChange={(e) => handleInputChange('category', e.target.value)} size="small">
                        <MenuItem value="Pharmacy">Pharmacy</MenuItem>
                        <MenuItem value="Consumable">Consumable</MenuItem>
                        <MenuItem value="Equipment">Equipment</MenuItem>
                        <MenuItem value="Laboratory">Laboratory</MenuItem>
                      </TextField>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField fullWidth type="number" label="Quantity" value={editedItem.quantity} onChange={(e) => handleInputChange('quantity', parseInt(e.target.value))} size="small" />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField fullWidth type="number" label="Minimum Stock" value={editedItem.minStock} onChange={(e) => handleInputChange('minStock', parseInt(e.target.value))} size="small" />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField fullWidth type="date" label="Expiry Date" value={editedItem.expiryDate} onChange={(e) => handleInputChange('expiryDate', e.target.value)} InputLabelProps={{ shrink: true }} size="small" />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField fullWidth label="Batch Number" value={editedItem.batchNumber} onChange={(e) => handleInputChange('batchNumber', e.target.value)} size="small" />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField fullWidth label="Supplier" value={editedItem.supplier} onChange={(e) => handleInputChange('supplier', e.target.value)} size="small" />
                    </Grid>
                  </Grid>
                ) : (
                  <Grid container spacing={3}>
                    <Grid item xs={12} sm={6}>
                      <Paper sx={{ p: 2, background: alpha('#667eea', 0.06), borderRadius: 2, border: '1px solid #e9edf3' }}>
                        <Typography variant="h6" fontWeight="800" color="#667eea" gutterBottom>
                          Stock Information
                        </Typography>
                        <List dense>
                          <ListItem>
                            <ListItemIcon><InventoryIcon color="primary" /></ListItemIcon>
                            <ListItemText primary="Current Quantity" secondary={`${selectedItem.quantity} units`} primaryTypographyProps={{ fontWeight: 700 }} />
                          </ListItem>
                          <ListItem>
                            <ListItemIcon><WarningIcon color="warning" /></ListItemIcon>
                            <ListItemText primary="Reorder Level" secondary={`${selectedItem.minStock} units`} primaryTypographyProps={{ fontWeight: 700 }} />
                          </ListItem>
                          <ListItem>
                            <ListItemIcon><TrendingUpIcon color="info" /></ListItemIcon>
                            <ListItemText primary="Usage Rate" secondary={selectedItem.usageRate} primaryTypographyProps={{ fontWeight: 700 }} />
                          </ListItem>
                        </List>
                      </Paper>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <Paper sx={{ p: 2, background: alpha('#4caf50', 0.06), borderRadius: 2, border: '1px solid #e9edf3' }}>
                        <Typography variant="h6" fontWeight="800" color="#2e7d32" gutterBottom>
                          Product Details
                        </Typography>
                        <List dense>
                          <ListItem>
                            <ListItemIcon><CalendarIcon color="action" /></ListItemIcon>
                            <ListItemText primary="Expiry Date" secondary={new Date(selectedItem.expiryDate).toLocaleDateString()} primaryTypographyProps={{ fontWeight: 700 }} />
                          </ListItem>
                          <ListItem>
                            <ListItemIcon><ShippingIcon color="action" /></ListItemIcon>
                            <ListItemText primary="Supplier" secondary={selectedItem.supplier} primaryTypographyProps={{ fontWeight: 700 }} />
                          </ListItem>
                          <ListItem>
                            <ListItemIcon><MedicalIcon color="action" /></ListItemIcon>
                            <ListItemText primary="Batch Number" secondary={selectedItem.batchNumber} primaryTypographyProps={{ fontWeight: 700 }} />
                          </ListItem>
                        </List>
                      </Paper>
                    </Grid>

                    {/* Expiry Status */}
                    <Grid item xs={12}>
                      <Paper
                        sx={{
                          p: 2,
                          background: alpha(getExpiryStatus(selectedItem.expiryDate).color, 0.1),
                          border: `2px solid ${getExpiryStatus(selectedItem.expiryDate).color}`,
                          borderRadius: 2
                        }}
                      >
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                          <CalendarIcon sx={{ color: getExpiryStatus(selectedItem.expiryDate).color }} />
                          <Box>
                            <Typography variant="h6" fontWeight="900" color={getExpiryStatus(selectedItem.expiryDate).color}>
                              {getExpiryStatus(selectedItem.expiryDate).status}
                            </Typography>
                            <Typography variant="body2" color="text.secondary" fontWeight="700">
                              {Math.abs(getDaysUntilExpiry(selectedItem.expiryDate))} days {getDaysUntilExpiry(selectedItem.expiryDate) < 0 ? 'ago' : 'remaining'}
                            </Typography>
                          </Box>
                        </Box>
                      </Paper>
                    </Grid>

                    {/* NEW: AI Recommendations */}
                    <Grid item xs={12}>
                      <Paper
                        sx={{
                          p: 2,
                          background: 'linear-gradient(135deg, rgba(102,126,234,0.08), rgba(118,75,162,0.08))',
                          border: '2px solid rgba(102,126,234,0.2)',
                          borderRadius: 2
                        }}
                      >
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                          <AIIcon sx={{ color: '#667eea' }} />
                          <Typography variant="h6" fontWeight="800" color="#667eea">
                            AI Recommendations
                          </Typography>
                        </Box>
                        <Typography variant="body2" color="text.secondary">
                          {selectedItem.quantity <= selectedItem.minStock 
                            ? `Consider reordering ${selectedItem.name} soon. Current stock (${selectedItem.quantity}) is at or below reorder level.`
                            : `Stock levels for ${selectedItem.name} are adequate. Next reorder suggested when quantity reaches ${selectedItem.minStock} units.`
                          }
                        </Typography>
                      </Paper>
                    </Grid>
                  </Grid>
                )}
              </Box>
            </Box>
          )}
        </Box>
      </Fade>
    </Modal>
  );

  return (
    <Box
      sx={{
        p: 4,
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #f5f7fa 0%, #dfe9f3 100%)',
        position: 'relative',
        overflow: 'hidden'
      }}
    >
      {/* NEW: AI Voice Agent Integration */}
      <AIVoiceAgent 
        onVoiceCommand={handleVoiceCommand}
        inventoryItems={inventoryItems}
      />

      {/* floating background orbs */}
      <Box sx={{
        position: 'absolute', top: -140, right: -140, width: 280, height: 280, borderRadius: '50%',
        background: 'radial-gradient(circle at 30% 30%, #a5b4fc55, transparent 60%)',
        filter: 'blur(10px)',
        ...floatUp, animation: 'floatUp 12s ease-in-out infinite'
      }}/>
      <Box sx={{
        position: 'absolute', bottom: -160, left: -160, width: 320, height: 320, borderRadius: '50%',
        background: 'radial-gradient(circle at 70% 70%, #c4b5fd55, transparent 60%)',
        filter: 'blur(12px)',
        ...floatUp, animation: 'floatUp 14s ease-in-out 0.6s infinite'
      }}/>

      {/* Header (Enhanced with AI branding) */}
      <Box sx={{ mb: 4 }}>
        <Box
          sx={{
            display: 'flex', justifyContent: 'space-between', alignItems: { xs: 'flex-start', md: 'center' }, mb: 3, gap: 3,
            p: { xs: 2.5, md: 3 }, borderRadius: 3,
            background: 'linear-gradient(135deg, rgba(102,126,234,0.10), rgba(118,75,162,0.10))',
            border: '1px solid rgba(102,126,234,0.25)',
            boxShadow: '0 12px 32px rgba(31,45,61,0.08)', backdropFilter: 'blur(6px)',
            position: 'relative', overflow: 'hidden'
          }}
        >
          <Box sx={{ position: 'absolute', inset: 0, background: 'radial-gradient(800px 160px at -10% 0%, rgba(255,255,255,0.6), transparent 40%)', pointerEvents: 'none' }} />
          <Box>
            <Typography
             variant="h4"
                sx={{
                  fontWeight: 900,
                  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  mb: 1,
                  letterSpacing: 0.4,
                }}
            >
              AI-Powered Medical Inventory
            </Typography>
            <Typography variant="body1" color="text.secondary" sx={{ fontWeight: 600, mb: 1 }}>
              {filteredItems.length} items tracked • Voice-enabled inventory management
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mt: 1 }}>
              <Chip 
                label="AI Voice Assistant" 
                color="primary" 
                variant="outlined" 
                size="small" 
                sx={{ fontWeight: 700 }} 
                icon={<VolumeUpIcon />}
              />
              <Chip 
                label="Smart Monitoring" 
                color="success" 
                variant="outlined" 
                size="small" 
                sx={{ fontWeight: 700 }} 
                icon={<AIIcon />}
              />
            </Box>
          </Box>

          <Button
            variant="contained"
            startIcon={<AddIcon />}
            sx={{
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                boxShadow: '0 10px 24px rgba(102, 126, 234, 0.35)',
                '&:hover': {
                  boxShadow: '0 16px 32px rgba(102, 126, 234, 0.45)',
                  transform: 'translateY(-2px)'
                },
                transition: 'all 0.3s ease',
                borderRadius: 2,
                px: 3,
                py: 1.5,
                fontWeight: 800,
                fontSize: '1rem'
              }}
          >
            Add New Item
          </Button>
        </Box>

        {/* Filters (Enhanced with AI Quick Actions) */}
        <Paper
          sx={{
            p: 2, mb: 3, background: 'rgba(255, 255, 255, 0.9)',
            borderRadius: 3, border: '1px solid #e9edf3',
            boxShadow: '0 10px 28px rgba(31,45,61,0.06)'
          }}
        >
          <Grid container spacing={2} alignItems="center">
            <Grid item xs={12} sm={3}>
              <TextField fullWidth placeholder="Search items..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} size="small" />
            </Grid>
            <Grid item xs={12} sm={3}>
              <TextField fullWidth select label="Category" value={categoryFilter} onChange={(e) => setCategoryFilter(e.target.value)} size="small">
                {categories.map(category => (<MenuItem key={category} value={category}>{category}</MenuItem>))}
              </TextField>
            </Grid>
            <Grid item xs={12} sm={3}>
              <TextField fullWidth select label="Status" value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)} size="small">
                {statuses.map(status => (<MenuItem key={status} value={status}>{status}</MenuItem>))}
              </TextField>
            </Grid>
            <Grid item xs={12} sm={3}>
              <Button
                fullWidth
                variant="outlined"
                startIcon={<AutoAwesomeIcon />}
                onClick={() => {/* AI Quick Analysis */}}
                sx={{
                  height: '40px',
                  fontWeight: 700,
                  borderColor: '#667eea',
                  color: '#667eea',
                  '&:hover': {
                    background: 'rgba(102, 126, 234, 0.1)'
                  }
                }}
              >
                AI Insights
              </Button>
            </Grid>
          </Grid>
        </Paper>
      </Box>

      {/* Inventory Grid */}
      <Grid container spacing={3}>
        {filteredItems.map((item, index) => (
          <Grid item xs={12} sm={6} md={4} key={item.id}>
            <InventoryCard item={item} index={index} />
          </Grid>
        ))}
      </Grid>

      {/* Empty State */}
      {filteredItems.length === 0 && (
        <Box sx={{ textAlign: 'center', py: 8 }}>
          <MedicalIcon sx={{ fontSize: 64, color: 'text.secondary', mb: 2 }} />
          <Typography variant="h5" color="text.secondary" gutterBottom> No items found </Typography>
          <Typography variant="body1" color="text.secondary"> Try adjusting your search or ask the AI assistant for help </Typography>
        </Box>
      )}

      {/* Detail Modal */}
      {renderDetailModal()}
    </Box>
  );
};

export default MedicalInventory;