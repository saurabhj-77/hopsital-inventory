import React, { useState, useEffect, useRef } from 'react';
import { 
  Box, 
  Typography, 
  Button, 
  Modal, 
  Card, 
  CardContent,
  TextField,
  MenuItem,
  Chip,
  IconButton,
  Fade,
  Slide,
  Grow,
  Zoom,
  Grid,
  LinearProgress,
  Avatar,
  Tooltip,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
  Badge,
  CardMedia,
  Fab,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  CircularProgress,
    Checkbox,
  FormControlLabel,
  FormGroup,
  Stepper,
  Step,
  StepLabel
} from '@mui/material';
import {
  Add as AddIcon,
  Inventory as InventoryIcon,
  Warning as WarningIcon,
  Error as ErrorIcon,
  LocalPharmacy as PharmacyIcon,
  MedicalServices as EquipmentIcon,
  Science as LabIcon,
  LocalHospital as ConsumableIcon,
  Category as OtherIcon,
  Notifications as AlertIcon,
  Close as CloseIcon,
  TrendingUp as TrendingUpIcon,
  NotificationsActive as EmergencyIcon,
  Schedule as ScheduleIcon,
  ArrowForward as ArrowForwardIcon,
  CalendarToday as CalendarIcon,
  Science as ScienceIcon,
  LocalHospital as HospitalIcon,
  Biotech as BiotechIcon,
  AccessTime as AccessTimeIcon,
  PriorityHigh as PriorityHighIcon,
  CheckCircle as CheckCircleIcon,
  RemoveCircle as RemoveCircleIcon,
  Mic as MicIcon,
  Stop as StopIcon,
  SmartToy as AIIcon,
  VolumeUp as VolumeUpIcon,
  AutoAwesome as AutoAwesomeIcon
} from '@mui/icons-material';

// ✨ Enhanced keyframe animations
const floatUp = {
  '@keyframes floatUp': {
    '0%':   { transform: 'translateY(0px)' },
    '50%':  { transform: 'translateY(-8px)' },
    '100%': { transform: 'translateY(0px)' },
  }
};

const pulse = {
  '@keyframes pulse': {
    '0%':   { transform: 'scale(1)', opacity: 0.6 },
    '50%':  { transform: 'scale(1.04)', opacity: 1 },
    '100%': { transform: 'scale(1)', opacity: 0.6 },
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

const itemImages = {
  'Paracetamol 500mg': 'https://assets.sayacare.in/api/images/product_image/large_image/23/74/Paracetamol-500-mg-Tablet_1.webp',               // packaging of Paracetamol 500mg  
  'Amoxicillin 250mg': 'https://assets.sayacare.in/api/images/product_image/large_image/44/44/Amoxicillin-250-mg-Capsule_1.webp',             // image of Amoxicillin 250mg capsules  
  'Vitamin D3': 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRQB3AzPHnCMQq0t77Vjg0k-w-6vrePJYhVZw&s',                     // bottle of Vitamin D3 supplement  
  'Ventilator': 'https://t4.ftcdn.net/jpg/03/42/70/29/360_F_342702991_xOJ5AhUpXdoLhMGcK2ca0RFvWWpZHX84.jpg',                     // ICU ventilator machine  
  'Defibrillator': 'https://t4.ftcdn.net/jpg/00/49/96/25/360_F_49962531_wrljOD26pd2vZUqsCIwQjNlqdOr7zJQl.jpg',                  // external defibrillator device (AED style)  
  'Patient Monitor': 'https://media.istockphoto.com/id/1351287260/photo/ventilator-machine.jpg?s=612x612&w=0&k=20&c=PI1LX3U39t7RZaCUvDwFWmdnQJxADum45rkBAec8Jjw=',                // multi-parameter patient monitor display  
  'Blood Test Strips': 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTmRejyM8Pc1hliTrDU0vpRUeLj-4bo8Wk0ew&s',              // box of blood glucose test strips  
  'Lab Reagent A': 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTo2p79P3VhR0SY5Lpyy1wRdZjaUxvpHj6FLA&s',                  // generic lab reagent bottle / chemical reagent  
  'Test Tubes': 'https://media.istockphoto.com/id/1355737306/photo/blood-drawing-equipment-in-laboratory-for-analysis.jpg?s=612x612&w=0&k=20&c=Q6136v2_ot3LISYedZTG7E1CziO4iwDGA-rH29BywuQ=',                     // rack of test tubes in a lab  
  'Surgical Masks': 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSGqQESs7EwffpNYd4OqxdWtBTFzHGlX9-wCQ&s',                  // pile of blue surgical masks  
  'Gloves': 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRtdnEsDixZCK7dX-04nOGLX4xA8iGtyJ9dTQ&s',                         // box of medical gloves (disposable)  
  'Syringes': 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR6NwKPcUDShnnhPAK9YOxEMzeh_NgEvkbLMQ&s',                       // set of syringes ready for use  
  'Cleaning Supplies': 'https://thumbs.dreamstime.com/b/cleaning-supplies-bucket-plastic-isolated-white-background-42066322.jpg',              // hospital-cleaning spray & cloths  
  'Office Materials': 'https://media.istockphoto.com/id/649195666/photo/office-supplies-still-life.jpg?s=612x612&w=0&k=20&c=npYjedECC8Lt-g31egnnl0yOhY7SIjfZIT9h2CdxQbE='                // general office stationery & materials  
};


// friendly category cover images (royalty-free placeholders)
const categoryCovers = {
  pharmacy: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?q=80&w=1200&auto=format&fit=crop',
  equipment: 'https://images.unsplash.com/photo-1586773860418-d37222d8fce3?q=80&w=1200&auto=format&fit=crop',
  lab: 'https://images.unsplash.com/photo-1582719478250-3e1e0b97958a?q=80&w=1200&auto=format&fit=crop',
  consumable: 'https://images.unsplash.com/photo-1582719478171-2f30b9a4f0ea?q=80&w=1200&auto=format&fit=crop',
  other: 'https://images.unsplash.com/photo-1521791136064-7986c2920216?q=80&w=1200&auto=format&fit=crop',
};

// Comprehensive dummy data (unchanged)
const initialInventoryData = {
  totalItems: 245,
  lowStock: 18,
  expired: 7,
  totalValue: 124420,
  categories: {
    pharmacy: { 
      count: 120, 
      value: 15420,
      items: [
        { id: 1, name: 'Paracetamol 500mg', stock: 1000, minStock: 500, value: 1500 },
        { id: 2, name: 'Amoxicillin 250mg', stock: 800, minStock: 400, value: 3200 },
        { id: 3, name: 'Vitamin D3', stock: 300, minStock: 200, value: 900 }
      ]
    },
    equipment: { 
      count: 45, 
      value: 89200,
      items: [
        { id: 1, name: 'Ventilator', stock: 15, minStock: 5, value: 45000 },
        { id: 2, name: 'Defibrillator', stock: 8, minStock: 3, value: 22000 },
        { id: 3, name: 'Patient Monitor', stock: 22, minStock: 10, value: 22200 }
      ]
    },
    lab: { 
      count: 38, 
      value: 12300,
      items: [
        { id: 1, name: 'Blood Test Strips', stock: 50, minStock: 200, value: 2500 },
        { id: 2, name: 'Lab Reagent A', stock: 150, minStock: 100, value: 7500 },
        { id: 3, name: 'Test Tubes', stock: 500, minStock: 300, value: 2300 }
      ]
    },
    consumable: { 
      count: 32, 
      value: 5400,
      items: [
        { id: 1, name: 'Surgical Masks', stock: 200, minStock: 1000, value: 1000 },
        { id: 2, name: 'Gloves', stock: 1500, minStock: 800, value: 3000 },
        { id: 3, name: 'Syringes', stock: 800, minStock: 400, value: 1400 }
      ]
    },
    other: { 
      count: 10, 
      value: 2100,
      items: [
        { id: 1, name: 'Cleaning Supplies', stock: 50, minStock: 20, value: 1500 },
        { id: 2, name: 'Office Materials', stock: 30, minStock: 15, value: 600 }
      ]
    }
  },
  lowStockItems: [
    { id: 1, name: 'Paracetamol 500mg', currentStock: 100, minStock: 400, category: 'pharmacy', urgency: 'high', value: 1500 },
    { id: 2, name: 'Blood Test Strips', currentStock: 50, minStock: 200, category: 'lab', urgency: 'high', value: 2500 },
    { id: 3, name: 'Surgical Masks', currentStock: 200, minStock: 1000, category: 'consumable', urgency: 'medium', value: 1000 },
    { id: 4, name: 'IV Catheters', currentStock: 75, minStock: 300, category: 'pharmacy', urgency: 'medium', value: 2250 }
  ],
  expiredItems: [
    { id: 1, name: 'Vitamin D3', expiryDate: '2024-01-13', daysAgo: 2, category: 'pharmacy', batch: 'BATCH-001', value: 450 },
    { id: 2, name: 'Eye Drops', expiryDate: '2024-01-09', daysAgo: 6, category: 'pharmacy', batch: 'BATCH-002', value: 320 },
    { id: 3, name: 'Lab Reagent A', expiryDate: '2024-01-10', daysAgo: 5, category: 'lab', batch: 'BATCH-003', value: 1500 },
    { id: 4, name: 'Antiseptic Solution', expiryDate: '2024-01-08', daysAgo: 7, category: 'consumable', batch: 'BATCH-004', value: 280 }
  ],
  alerts: [
    { id: 1, type: 'high', message: 'Medicine A expires in 1 day', item: 'Medicine A', daysLeft: 1, category: 'pharmacy', priority: 'Critical' },
    { id: 2, type: 'high', message: 'Medicine B expires in 3 days', item: 'Medicine B', daysLeft: 3, category: 'pharmacy', priority: 'Critical' },
    { id: 3, type: 'medium', message: 'Equipment maintenance due in 7 days', item: 'X-Ray Machine', daysLeft: 7, category: 'equipment', priority: 'High' },
    { id: 4, type: 'low', message: 'Routine stock check overdue', item: 'General Inventory', daysLeft: -2, category: 'other', priority: 'Medium' },
    { id: 5, type: 'high', message: 'Insulin stock critically low', item: 'Insulin Vials', daysLeft: 0, category: 'pharmacy', priority: 'Critical' }
  ],
  trends: {
    totalItems: '+12%',
    lowStock: '-5%',
    expired: '+2%',
    totalValue: '+8%'
  },
  inventoryBreakdown: {
    active: 187,
    inTransit: 36,
    reserved: 15,
    outOfStock: 7,
    totalValue: 23400
  }
};

// AI Voice Agent Component - NEW ADDITION
const AIVoiceAgent = ({ onVoiceCommand, inventoryData }) => {
  const [isListening, setIsListening] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [conversation, setConversation] = useState([]);
  const [agentOpen, setAgentOpen] = useState(false);
    const speakText = (text) => {
    if ('speechSynthesis' in window) {
      const speech = new SpeechSynthesisUtterance();
      speech.text = text;
      speech.volume = 1;
      speech.rate = 0.9;
      speech.pitch = 1;
      window.speechSynthesis.speak(speech);
    }
  };

  const handleVoiceCommand = () => {
    if (isListening) {
      setIsListening(false);
      window.speechSynthesis.cancel();
      return;
    }

    setIsListening(true);
    
    setTimeout(() => {
      setIsListening(false);
      setIsProcessing(true);
      
      setTimeout(() => {
        const randomCommands = [
          "Showing low stock items",
          "Displaying expired items",
          "Opening pharmacy category",
          "Showing priority alerts",
          "Adding new item to inventory"
        ];
        
        const randomCommand = randomCommands[Math.floor(Math.random() * randomCommands.length)];
        
        setConversation(prev => [
          ...prev,
          { type: 'user', message: 'Voice command received' },
          { type: 'ai', message: randomCommand }
        ]);
        
        setIsProcessing(false);
         speakText(randomCommand);
        
        if (onVoiceCommand) {
          onVoiceCommand(randomCommand);
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
      let response = "I can help you with inventory management. Try asking about low stock, expired items, or specific categories.";
      
      if (command.toLowerCase().includes('low stock')) {
        response = `There are ${inventoryData.lowStock} low stock items requiring attention. ${inventoryData.lowStockItems.slice(0, 2).map(item => `${item.name} (${item.currentStock} left)`).join(', ')}`;
      } else if (command.toLowerCase().includes('expired')) {
        response = `Found ${inventoryData.expired} expired items that need disposal. ${inventoryData.expiredItems.slice(0, 2).map(item => `${item.name} expired ${item.daysAgo} days ago`).join(', ')}`;
      } else if (command.toLowerCase().includes('pharmacy')) {
        response = `Pharmacy category has ${inventoryData.categories.pharmacy.count} items worth $${inventoryData.categories.pharmacy.value}. Key items: ${inventoryData.categories.pharmacy.items.slice(0, 2).map(item => item.name).join(', ')}`;
      } else if (command.toLowerCase().includes('alert')) {
        response = `You have ${inventoryData.alerts.length} priority alerts. ${inventoryData.alerts.slice(0, 2).map(alert => alert.message).join(', ')}`;
      }

      setConversation(prev => [
        ...prev,
        { type: 'ai', message: response }
      ]);
      setIsProcessing(false);
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
            AI Voice Assistant
          </Box>
        </DialogTitle>
        
        <DialogContent sx={{ p: 3 }}>
          <Box sx={{ mb: 3, maxHeight: '300px', overflow: 'auto' }}>
            {conversation.length === 0 ? (
              <Typography color="text.secondary" textAlign="center" sx={{ py: 4 }}>
                Start a conversation with the AI assistant. Ask about inventory status, low stock items, or get recommendations.
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
                      p: 2
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
                    <Typography variant="body2">AI is thinking...</Typography>
                  </Box>
                </Card>
              </Box>
            )}
          </Box>

          {/* Quick Commands */}
          <Grid container spacing={1} sx={{ mb: 2 }}>
            {['Show low stock', 'Check expired', 'Pharmacy status', 'View alerts'].map((cmd) => (
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
            Try: "Show me low stock items" or "What's expired?"
          </Typography>
        </DialogActions>
      </Dialog>
    </>
  );
};

const Dashboard = () => {
  const [inventoryData, setInventoryData] = useState(initialInventoryData);
  const [modalOpen, setModalOpen] = useState(false);
  const [currentModal, setCurrentModal] = useState('');
  const [modalData, setModalData] = useState(null);
  const [addItemOpen, setAddItemOpen] = useState(false);
  const [newItem, setNewItem] = useState({
    name: '',
    category: '',
    quantity: '',
    minStock: '',
    expiryDate: ''
  });
  const [loaded, setLoaded] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
const [itemImageModalOpen, setItemImageModalOpen] = useState(false);
const [selectedAlert, setSelectedAlert] = useState(null);
const [alertDetailModalOpen, setAlertDetailModalOpen] = useState(false);
const [orderStep, setOrderStep] = useState(0);
  useEffect(() => {
    const timer = setTimeout(() => setLoaded(true), 500);
    return () => clearTimeout(timer);
  }, []);

  // NEW: AI Voice Command Handler
  const handleVoiceCommand = (command) => {
    if (command.includes('low stock')) {
      handleCardClick('lowStock', inventoryData);
    } else if (command.includes('expired')) {
      handleCardClick('expired', inventoryData);
    } else if (command.includes('pharmacy')) {
      handleCardClick('pharmacy', inventoryData.categories.pharmacy);
    } else if (command.includes('alert')) {
      handleCardClick('alerts', inventoryData.alerts);
    } else if (command.includes('add')) {
      setAddItemOpen(true);
    }
  };

  // ALL ORIGINAL FUNCTIONS REMAIN UNCHANGED
  const handleCardClick = (type, data) => {
    setCurrentModal(type);
    setModalData(data);
    setModalOpen(true);
  };

  const handleAddItem = () => {
    if (newItem.name && newItem.category && newItem.quantity) {
      const updatedData = { ...inventoryData };
      updatedData.totalItems += parseInt(newItem.quantity);
      
      const categoryKey = newItem.category.toLowerCase();
      if (updatedData.categories[categoryKey]) {
        updatedData.categories[categoryKey].count += parseInt(newItem.quantity);
      }

      if (parseInt(newItem.quantity) <= parseInt(newItem.minStock)) {
        updatedData.lowStockItems.push({
          id: Date.now(),
          name: newItem.name,
          currentStock: parseInt(newItem.quantity),
          minStock: parseInt(newItem.minStock),
          category: categoryKey,
          urgency: 'high',
          value: 0
        });
        updatedData.lowStock += 1;
      }

      setInventoryData(updatedData);
      setAddItemOpen(false);
      setNewItem({ name: '', category: '', quantity: '', minStock: '', expiryDate: '' });
    }
  };

  const getCategoryIcon = (category) => {
    const icons = {
      pharmacy: <PharmacyIcon />,
      equipment: <EquipmentIcon />,
      lab: <LabIcon />,
      consumable: <ConsumableIcon />,
      other: <OtherIcon />
    };
    return icons[category] || <OtherIcon />;
  };

  const getUrgencyColor = (urgency) => {
    const colors = {
      high: '#ff4757',
      medium: '#ffa502',
      low: '#2ed573',
      default: '#a4b0be'
    };
    return colors[urgency] || colors.default;
  };

  const getPriorityIcon = (priority) => {
    const icons = {
      Critical: <PriorityHighIcon sx={{ color: '#ff4757' }} />,
      High: <WarningIcon sx={{ color: '#ffa502' }} />,
      Medium: <ErrorIcon sx={{ color: '#ffa502' }} />,
      Low: <CheckCircleIcon sx={{ color: '#2ed573' }} />
    };
    return icons[priority] || <CheckCircleIcon />;
  };

  // ---------- UI: Main Cards (Enhanced with AI indicators) ----------
  const renderMainCards = () => {
    const cards = [
      {
        title: 'Total Items',
        value: inventoryData.totalItems,
        icon: <InventoryIcon sx={{ fontSize: 32 }} />,
        color: '#1976d2',
        gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        type: 'total',
        trend: inventoryData.trends.totalItems,
        subtitle: 'Active Inventory'
      },
      {
        title: 'Low Stock',
        value: inventoryData.lowStock,
        icon: <WarningIcon sx={{ fontSize: 32 }} />,
        color: '#ed6c02',
        gradient: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
        type: 'lowStock',
        trend: inventoryData.trends.lowStock,
        subtitle: 'Needs Reordering'
      },
      {
        title: 'Expired',
        value: inventoryData.expired,
        icon: <ErrorIcon sx={{ fontSize: 32 }} />,
        color: '#d32f2f',
        gradient: 'linear-gradient(135deg, #f78ca0 0%, #f9748f 100%)',
        type: 'expired',
        trend: inventoryData.trends.expired,
        subtitle: 'Requires Action'
      },
      {
        title: 'Total Value',
        value: `$${inventoryData.totalValue.toLocaleString()}`,
        icon: <TrendingUpIcon sx={{ fontSize: 32 }} />,
        color: '#2e7d32',
        gradient: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
        type: 'value',
        trend: inventoryData.trends.totalValue,
        subtitle: 'Inventory Worth'
      }
    ];

    return (
      <Grid container spacing={3} sx={{ mb: 4 }}>
        {cards.map((card, index) => (
          <Grid item xs={12} sm={6} md={3} key={card.title}>
            <Grow in={loaded} timeout={500 + index * 200}>
              <Card 
                sx={{ 
                  height: 168,
                  background: card.gradient,
                  color: 'black',
                  fontSize: '30px',
                  cursor: 'pointer',
                  transition: 'all 0.45s cubic-bezier(0.2, 0.8, 0.2, 1)',
                  '&:hover': {
                    transform: 'translateY(-8px) scale(1.015)',
                    boxShadow: '0 24px 60px rgba(0,0,0,0.35)'
                  },
                  position: 'relative',
                  overflow: 'hidden',
                  borderRadius: 3,
                  // NEW: Enhanced glass effect with AI touch
                  '&:before': {
                    content: '""',
                    position: 'absolute',
                    inset: 0,
                    background: 'radial-gradient(1200px 200px at -10% -30%, rgba(255,255,255,0.18), transparent 40%), radial-gradient(800px 200px at 120% 130%, rgba(255,255,255,0.12), transparent 40%)',
                    opacity: 0.8,
                    pointerEvents: 'none'
                  }
                }}
                onClick={() => handleCardClick(card.type, inventoryData)}
              >
                <CardContent sx={{ position: 'relative', zIndex: 2, height: '100%' }}>
                  <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 1 }}>
                      <Box>
                        <Typography variant="h4" sx={{ fontWeight: 800, opacity: 0.9, fontSize: '1.6rem', letterSpacing: 0.2 }}>
                          {card.title}
                        </Typography>
                        <Typography variant="h5" sx={{ opacity: 0.85, fontWeight: 800, fontSize: '1.1rem', letterSpacing: 0.2  }}>
                          {card.subtitle}
                        </Typography>
                      </Box>
                      {/* NEW: AI Tooltip */}
                      <Tooltip title="Ask AI about this metric">
                        <Box sx={{ 
                          opacity: 0.95,
                          transform: 'scale(1)',
                          transition: 'transform 0.3s ease',
                          filter: 'drop-shadow(0 2px 8px rgba(0,0,0,0.2))',
                          '&:hover': {
                            transform: 'scale(1.1)'
                          }
                        }}>
                          {card.icon}
                        </Box>
                      </Tooltip>
                    </Box>
                    
                    <Box sx={{ flexGrow: 1, display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between' }}>
                      <Typography variant="h4" sx={{ fontWeight: 800, lineHeight: 1 }}>
                        {card.value}
                      </Typography>
                      <Chip 
                        label={card.trend} 
                        size="small"
                        sx={{ 
                          backgroundColor: 'rgba(255,255,255,0.22)', 
                          color: 'black',
                          fontWeight: 800,
                          fontSize: '1rem',
                          letterSpacing: 0.3,
                          borderRadius: 1.5
                        }}
                      />
                    </Box>
                  </Box>
                </CardContent>
                
                {/* NEW: AI Indicator */}
                <Box
                  sx={{
                    position: 'absolute',
                    top: 8,
                    right: 8,
                    background: 'rgba(255,255,255,0.2)',
                    borderRadius: '50%',
                    width: 24,
                    height: 24,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}
                >
                  <AIIcon sx={{ fontSize: 14, opacity: 0.8 }} />
                </Box>

                {/* Animated background elements */}
                <Box 
                  sx={{
                    position: 'absolute',
                    top: -50,
                    right: -50,
                    width: 120,
                    height: 120,
                    borderRadius: '50%',
                    background: 'rgba(255,255,255,0.12)',
                    zIndex: 1,
                    ...floatUp,
                    animation: 'floatUp 6s ease-in-out infinite'
                  }}
                />
                <Box 
                  sx={{
                    position: 'absolute',
                    bottom: -30,
                    left: -30,
                    width: 90,
                    height: 90,
                    borderRadius: '50%',
                    background: 'rgba(255,255,255,0.06)',
                    zIndex: 1,
                    ...floatUp,
                    animation: 'floatUp 7.5s ease-in-out 0.6s infinite'
                  }}
                />
              </Card>
            </Grow>
          </Grid>
        ))}
      </Grid>
    );
  };

  // ---------- UI: Category Cards (Enhanced) ----------
  const renderCategoryCards = () => {
    const categories = [
      { key: 'pharmacy', label: 'Pharmacy', color: '#667eea', icon: <PharmacyIcon /> },
      { key: 'equipment', label: 'Equipment', color: '#764ba2', icon: <EquipmentIcon /> },
      { key: 'lab', label: 'Laboratory', color: '#f093fb', icon: <LabIcon /> },
      { key: 'consumable', label: 'Consumable', color: '#f5576c', icon: <ConsumableIcon /> },
      { key: 'other', label: 'Other', color: '#4facfe', icon: <OtherIcon /> }
    ];

    return (
      <Box sx={{ mb: 4 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 3 }}>
          <Typography variant="h5" sx={{ fontWeight: 800, color: '#1f2d3d', letterSpacing: 0.2 }}>
            📦 Inventory Categories
          </Typography>
          {/* NEW: AI Quick Actions */}
          <Tooltip title="AI Category Analysis">
            <Button
              startIcon={<AutoAwesomeIcon />}
              variant="outlined"
              size="small"
              sx={{
                borderRadius: 2,
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
          </Tooltip>
        </Box>
        <Grid container spacing={2}>
          {categories.map((category, index) => (
            <Grid item xs={12} sm={6} md={2.4} key={category.key}>
              <Slide in={loaded} direction="up" timeout={700 + index * 150}>
                <Card 
                  sx={{ 
                    height: 180,
                    cursor: 'pointer',
                    transition: 'all 0.35s ease',
                    border: `1px solid ${category.color}26`,
                    background: `linear-gradient(180deg, ${category.color}18, ${category.color}08)`,
                    '&:hover': {
                      transform: 'translateY(-6px)',
                      border: `1px solid ${category.color}50`,
                      boxShadow: `0 16px 36px ${category.color}26`,
                      background: `linear-gradient(180deg, ${category.color}22, ${category.color}10)`
                    },
                    borderRadius: 3,
                    position: 'relative',
                    overflow: 'hidden',
                  }}
                  onClick={() => handleCardClick(category.key, inventoryData.categories[category.key])}
                >
                  <CardMedia
                    image={categoryCovers[category.key]}
                    title={`${category.label} cover`}
                    sx={{
                      position: 'absolute',
                      inset: 0,
                      opacity: 0.14,
                      backgroundSize: 'cover',
                      backgroundPosition: 'center',
                      filter: 'grayscale(20%)'
                    }}
                  />
                  <CardContent sx={{ textAlign: 'center', height: '100%', position: 'relative', zIndex: 1 }}>
                    <Avatar 
                      sx={{ 
                        bgcolor: `${category.color}24`, 
                        // color: category.color,
                        color: 'black',
                        width: 70,
                        height: 70,
                        margin: '0 auto 12px',
                        transition: 'all 0.3s ease',
                        border: `1px solid ${category.color}40`,
                        ...pulse,
                        animation: 'pulse 4s ease-in-out infinite'
                      }}
                    >
                      {category.icon}
                    </Avatar>
                    <Typography variant="h4" sx={{ fontWeight: 800, fontSize: '1.2rem', mb: 0.25 }}>
                      {inventoryData.categories[category.key].count}
                    </Typography>
                    <Typography variant="h4" sx={{ color: 'black', fontWeight: 800, fontSize: '1.2rem' }}>
                      {category.label}
                    </Typography>
                    <Typography variant="caption" sx={{ color: category.color, fontWeight: 700, display: 'inline-block', fontSize: '1.2rem', mt: 0.5 }}>
                      ${inventoryData.categories[category.key].value.toLocaleString()}
                    </Typography>

                    {/* sheen line */}
                    <Box sx={{
                      position: 'absolute',
                      top: 0, left: 0, right: 0, height: 2,
                      overflow: 'hidden',
                      '&::after': {
                        content: '""',
                        display: 'block',
                        width: '40%',
                        height: '100%',
                        background: `linear-gradient(90deg, transparent, ${category.color}, transparent)`,
                        ...shine,
                        animation: 'shine 2.4s linear infinite'
                      }
                    }} />
                  </CardContent>
                </Card>
              </Slide>
            </Grid>
          ))}
        </Grid>
      </Box>
    );
  };

  // ---------- UI: Alerts (Enhanced) ----------
  const renderAlertCard = () => (
    <Fade in={loaded} timeout={1000}>
      <Card 
        sx={{ 
          mb: 3,
          cursor: 'pointer',
          transition: 'all 0.3s ease',
          border: '1px solid #ff6b6b20',
          background: 'linear-gradient(135deg, #ff6b6b10, #ff6b6b05)',
          '&:hover': {
            transform: 'translateY(-4px)',
            border: '1px solid #ff6b6b40',
            boxShadow: '0 8px 24px rgba(255, 107, 107, 0.2)',
            background: 'linear-gradient(135deg, #ff6b6b15, #ff6b6b08)'
          },
          borderRadius: 3,
          position: 'relative',
          overflow: 'hidden'
        }}
        onClick={() => handleCardClick('alerts', inventoryData.alerts)}
      >
        <CardContent>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
            <Badge badgeContent={inventoryData.alerts.length} color="error" sx={{ mr: 2 }}>
              <EmergencyIcon sx={{ color: '#ff6b6b', fontSize: 32 }} />
            </Badge>
            <Box sx={{ flexGrow: 1 }}>
              <Typography variant="h6" sx={{ fontWeight: 800 }}>
                Priority Alerts
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Requires immediate attention
              </Typography>
            </Box>
            {/* NEW: AI Alert Analysis */}
            <Tooltip title="AI Alert Analysis">
              <IconButton 
                size="small" 
                sx={{ 
                  mr: 1,
                  background: 'rgba(102, 126, 234, 0.1)',
                  '&:hover': { background: 'rgba(102, 126, 234, 0.2)' }
                }}
              >
                <AIIcon sx={{ fontSize: 20, color: '#667eea' }} />
              </IconButton>
            </Tooltip>
            <ArrowForwardIcon sx={{ color: 'text.secondary' }} />
          </Box>
          <Grid container spacing={1}>
            {inventoryData.alerts.slice(0, 4).map((alert) => (
              <Grid item xs={12} sm={6} key={alert.id}>
                <Box 
                  sx={{ 
                    display: 'flex',
                    alignItems: 'center',
                    p: 1.5,
                    borderRadius: 2,
                    backgroundColor: 
                      alert.type === 'high' ? '#ffebee' : 
                      alert.type === 'medium' ? '#fff3e0' : '#f5f5f5',
                    border: `1px solid ${
                      alert.type === 'high' ? '#ffcdd2' : 
                      alert.type === 'medium' ? '#ffe0b2' : '#e0e0e0'
                    }`,
                    transition: '0.2s ease',
                    '&:hover': { transform: 'translateX(4px)' }
                  }}
                >
                  <Box 
                    sx={{ 
                      width: 8,
                      height: 8,
                      borderRadius: '50%',
                      backgroundColor: getUrgencyColor(alert.type),
                      mr: 1.5,
                      flexShrink: 0
                    }} 
                  />
                  <Typography variant="body2" sx={{ fontWeight: 600, flexGrow: 1 }}>
                    {alert.message}
                  </Typography>
                </Box>
              </Grid>
            ))}
          </Grid>
        </CardContent>
      </Card>
    </Fade>
  );

  // ALL ORIGINAL MODAL CONTENT AND RENDER FUNCTIONS REMAIN EXACTLY THE SAME
  // [Previous modal content functions unchanged...]

  const renderModalContent = () => {
    switch (currentModal) {
      case 'total':
        return (
          <Box>
            <Typography variant="h5" gutterBottom sx={{ fontWeight: 800, color: '#1f2d3d' }}>
              📊 Total Inventory Overview
            </Typography>
            <Typography variant="body1" color="text.secondary" sx={{ mb: 3, fontSize: '1.1rem' }}>
              Complete breakdown of hospital inventory status
            </Typography>
            
            <Grid container spacing={2} sx={{ mb: 3 }}>
              <Grid item xs={12} sm={6}>
                <Card sx={{ p: 2, bgcolor: '#e8f5e8', border: '2px solid #4caf50', borderRadius: 2 }}>
                  <Typography variant="h4" fontWeight="800" color="#2e7d32" textAlign="center">
                    {inventoryData.inventoryBreakdown.active}
                  </Typography>
                  <Typography variant="body1" textAlign="center" fontWeight="600">
                    Active Items
                  </Typography>
                </Card>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Card sx={{ p: 2, bgcolor: '#e3f2fd', border: '2px solid #2196f3', borderRadius: 2 }}>
                  <Typography variant="h4" fontWeight="800" color="#1565c0" textAlign="center">
                    {inventoryData.inventoryBreakdown.totalValue}
                  </Typography>
                  <Typography variant="body1" textAlign="center" fontWeight="600">
                    Total Value ($)
                  </Typography>
                </Card>
              </Grid>
            </Grid>

            <List>
              {[
                { label: 'Active Items', value: inventoryData.inventoryBreakdown.active, icon: <CheckCircleIcon color="success" />, color: '#2e7d32' },
                { label: 'In Transit', value: inventoryData.inventoryBreakdown.inTransit, icon: <AccessTimeIcon color="info" />, color: '#1565c0' },
                { label: 'Reserved', value: inventoryData.inventoryBreakdown.reserved, icon: <InventoryIcon color="warning" />, color: '#ef6c00' },
                { label: 'Out of Stock', value: inventoryData.inventoryBreakdown.outOfStock, icon: <ErrorIcon color="error" />, color: '#c62828' }
              ].map((item) => (
                <ListItem key={item.label} sx={{ 
                  p: 2, 
                  mb: 1.2, 
                  bgcolor: '#f8f9fa', 
                  borderRadius: 2,
                  border: '1px solid #e9ecef',
                  transition: 'all 0.2s ease',
                  '&:hover': { bgcolor: '#eef2f7', transform: 'translateX(4px)' },
                  fontSize: '1.1rem'
                }}>
                  <ListItemIcon sx={{ fontSize: '1.1rem' }}>{item.icon}</ListItemIcon>
                  <ListItemText 
                    primary={item.label} 
                    primaryTypographyProps={{ fontWeight: 700 }}
                    sx={{ fontSize: '1.1rem' }}
                  />
                  <Typography variant="h5" fontWeight="800" color={item.color} sx={{ fontSize: '1.1rem' }}>
                    {item.value}
                  </Typography>
                </ListItem>
              ))}
            </List>
          </Box>
        );
      
      case 'lowStock':
        return (
          <Box>
            <Typography variant="h5" gutterBottom sx={{ fontWeight: 800, color: '#1f2d3d' }}>
              ⚠️ Low Stock Items
            </Typography>
            <Typography variant="body1" color="text.secondary" sx={{ mb: 3, fontSize: '1.1rem' }}>
              Items requiring immediate reordering
            </Typography>
            
            <List>
              {inventoryData.lowStockItems.map((item) => (
                <ListItem key={item.id} sx={{ 
                  p: 2.5, 
                  mb: 2, 
                  bgcolor: '#fff3e0', 
                  borderRadius: 2,
                  border: `2px solid ${getUrgencyColor(item.urgency)}`,
                  transition: 'all 0.2s ease',
                  '&:hover': { bgcolor: '#ffecb3' }
                }}>
                  <ListItemIcon>
                    <WarningIcon sx={{ color: getUrgencyColor(item.urgency) }} />
                  </ListItemIcon>
                  <Box sx={{ flexGrow: 1 }}>
                    <Typography variant="subtitle1" fontWeight="800" sx={{fontSize: '1.1rem' }}>
                      {item.name}
                    </Typography>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mt: 0.5, flexWrap: 'wrap' }}>
                      <Chip 
                        label={item.category} 
                        size="small" 
                        sx={{ textTransform: 'capitalize', fontWeight: 700, fontSize: '1.1rem' }}
                      />
                      <Typography variant="body2" color="text.secondary" sx={{fontSize: '1.1rem' }}>
                        Value: ${item.value}
                      </Typography>
                    </Box>
                  </Box>
                  <Box sx={{ textAlign: 'right' }}>
                    <Typography color="error" fontWeight="800" sx={{fontSize: '1.1rem' }}>
                      {item.currentStock} / {item.minStock}
                    </Typography>
                    <LinearProgress 
                      variant="determinate" 
                      value={(item.currentStock / item.minStock) * 100} 
                      sx={{ 
                        width: 120, 
                        height: 8, 
                        borderRadius: 4, 
                        mt: 1,
                        backgroundColor: '#ffcdd2',
                        '& .MuiLinearProgress-bar': {
                          backgroundColor: getUrgencyColor(item.urgency)
                        }
                      }}
                    />
                    <Typography variant="caption" color="error" fontWeight="800" sx={{fontSize: '1.1rem' }}>
                      Shortage: {item.minStock - item.currentStock}
                    </Typography>
                  </Box>
                </ListItem>
              ))}
            </List>
          </Box>
        );
      
      case 'expired':
        return (
          <Box>
            <Typography variant="h5" gutterBottom sx={{ fontWeight: 800, color: '#1f2d3d' }}>
              🚫 Expired Items
            </Typography>
            <Typography variant="body1" color="text.secondary" sx={{ mb: 3, fontSize:'1.1rem' }}>
              Items that have expired and require disposal
            </Typography>
            
            <List>
              {inventoryData.expiredItems.map((item) => (
                <ListItem key={item.id} sx={{ 
                  p: 2.5, 
                  mb: 2, 
                  bgcolor: '#ffebee', 
                  borderRadius: 2,
                  border: '2px solid #f44336',
                  transition: 'all 0.2s ease',
                  '&:hover': { bgcolor: '#ffcdd2' }
                }}>
                  <ListItemIcon>
                    <RemoveCircleIcon sx={{ color: '#f44336' }} />
                  </ListItemIcon>
                  <Box sx={{ flexGrow: 1 }}>
                    <Typography variant="subtitle1" fontWeight="800" sx={{fontSize: '1.1rem' }}>
                      {item.name}
                    </Typography>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mt: 0.5, flexWrap: 'wrap' }}>
                      <Chip 
                        label={item.category} 
                        size="small" 
                        sx={{ textTransform: 'capitalize', fontWeight: 700, fontSize: '1.1rem' }}
                      />
                      <Typography variant="body2" color="text.secondary" sx={{fontSize: '1.1rem' }}>
                        Batch: {item.batch}
                      </Typography>
                      <Typography variant="body2" color="text.secondary" sx={{fontSize: '1.1rem' }}>
                        Value: ${item.value}
                      </Typography>
                    </Box>
                  </Box>
                  <Box sx={{ textAlign: 'right' }}>
                    <Typography color="error" fontWeight="800" sx={{fontSize: '1.1rem' }}>
                      Expired {item.daysAgo} days ago
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{fontSize: '1.1rem' }}>
                      {new Date(item.expiryDate).toLocaleDateString()}
                    </Typography>
                  </Box>
                </ListItem>
              ))}
            </List>
          </Box>
        );
      
      case 'value':
        return (
          <Box>
            <Typography variant="h5" gutterBottom sx={{ fontWeight: 800, color: '#1f2d3d', fontSize: '1.1rem' }}>
              💰 Inventory Value Analysis
            </Typography>
            <Typography variant="body1" color="text.secondary" sx={{ mb: 3 , fontSize: '1.1rem' }}>
              Total value and distribution across categories
            </Typography>
            
            <Card sx={{ p: 3, bgcolor: '#e3f2fd', mb: 3, borderRadius: 2 }}>
              <Typography variant="h3" fontWeight="800" color="#1565c0" textAlign="center">
                ${inventoryData.totalValue.toLocaleString()}
              </Typography>
              <Typography variant="h6" textAlign="center" fontWeight="700">
                Total Inventory Value
              </Typography>
            </Card>

            <List>
              {Object.entries(inventoryData.categories).map(([category, data]) => (
                <ListItem key={category} sx={{ 
                  p: 2, 
                  mb: 1.1, 
                  bgcolor: '#f8f9fa', 
                  borderRadius: 2,
                  border: '1px solid #e9ecef',
                  transition: '0.2s',
                  '&:hover': { bgcolor: '#eef2f7' }
                }}>
                  <ListItemIcon>
                    <Avatar sx={{ bgcolor: '#667eea20', color: '#667eea', fontSize:'1.1rem'}}>
                      {getCategoryIcon(category)}
                    </Avatar>
                  </ListItemIcon>
                  <ListItemText 
                    primary={category.charAt(0).toUpperCase() + category.slice(1)} 
                    secondary={`${data.count} items`}
                    primaryTypographyProps={{ fontWeight: 800, fontSize: '1.1rem' }}
                    secondaryTypographyProps={{ fontSize: '1.1rem' }}
                  />
                  <Typography variant="h6" fontWeight="800" color="#1565c0" sx={{ fontSize: '1.1rem' }}>
                    ${data.value.toLocaleString()}
                  </Typography>
                </ListItem>
              ))}
            </List>
          </Box>
        );
      
case 'alerts':
  return (
    <Box>
      <Typography variant="h5" gutterBottom sx={{ fontWeight: 800, color: '#1f2d3d' }}>
        🔔 Priority Alert Center
      </Typography>
      <Typography variant="body1" color="text.secondary" sx={{ mb: 3, fontSize: '1.1rem' }}>
        Critical alerts requiring immediate action
      </Typography>
      
      <List>
        {inventoryData.alerts.map((alert) => (
          <ListItem 
            key={alert.id} 
            sx={{ 
              p: 2.5, 
              mb: 2, 
              bgcolor: 
                alert.type === 'high' ? '#ffebee' : 
                alert.type === 'medium' ? '#fff3e0' : '#f5f5f5',
              borderRadius: 2,
              border: `2px solid ${
                alert.type === 'high' ? '#f44336' : 
                alert.type === 'medium' ? '#ff9800' : '#9e9e9e'
              }`,
              cursor: 'pointer',
              transition: 'all 0.2s ease',
              '&:hover': { 
                transform: 'translateY(-2px)',
                boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
              }
            }}
            onClick={() => {
              setSelectedAlert(alert);
              setAlertDetailModalOpen(true);
              setOrderStep(0);
            }}
          >
            <ListItemIcon>
              {getPriorityIcon(alert.priority)}
            </ListItemIcon>
            <Box sx={{ flexGrow: 1 }}>
              <Typography variant="h6" fontWeight="800">
                {alert.message}
              </Typography>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mt: 0.5, flexWrap: 'wrap' }}>
                <Chip 
                  label={alert.priority} 
                  size="small"
                  color={alert.type === 'high' ? 'error' : alert.type === 'medium' ? 'warning' : 'default'}
                  sx={{ fontWeight: 700 }}
                />
                <Chip 
                  label={alert.category} 
                  size="small" 
                  variant="outlined"
                  sx={{ textTransform: 'capitalize', fontWeight: 700, fontSize: '1.1rem' }}
                />
                <Typography variant="h5" color="text.secondary" sx={{ fontSize: '1.1rem' }}>
                  Item: {alert.item}
                </Typography>
              </Box>
            </Box>
            <Box sx={{ textAlign: 'right' }}>
              <Typography 
                fontWeight="800" 
                color={alert.daysLeft <= 3 ? 'error' : 'warning'}
                sx={{fontSize: '1.1rem'}}
              >
                {alert.daysLeft > 0 ? `${alert.daysLeft} days left` : `${Math.abs(alert.daysLeft)} days overdue`}
              </Typography>
              <Typography variant="caption" color="text.secondary" sx={{fontSize: '1.1rem'}}>
                Click for details
              </Typography>
            </Box>
          </ListItem>
        ))}
      </List>
    </Box>
  );
      
      default:
if (['pharmacy', 'equipment', 'lab', 'consumable', 'other'].includes(currentModal)) {
  const category = inventoryData.categories[currentModal];
  return (
    <Box>
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
        <Avatar sx={{ bgcolor: '#667eea20', color: '#667eea', mr: 2, width: 60, height: 60, fontSize:'1.4rem' }}>
          {getCategoryIcon(currentModal)}
        </Avatar>
        <Box>
          <Typography variant="h5" sx={{ fontWeight: 800, textTransform: 'capitalize' }}>
            {currentModal} Category
          </Typography>
          <Typography variant="h6" color="text.secondary">
            Detailed overview of {currentModal} inventory
          </Typography>
        </Box>
      </Box>
      
      <Grid container spacing={2} sx={{ mb: 3 }}>
        <Grid item xs={12} sm={6}>
          <Card sx={{ p: 2, textAlign: 'center', bgcolor: '#f8f9fa', borderRadius: 2 }}>
            <Typography variant="h4" fontWeight="800" color="#667eea">
              {category.count}
            </Typography>
            <Typography variant="h6" fontWeight="700">
              Total Items
            </Typography>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Card sx={{ p: 2, textAlign: 'center', bgcolor: '#f8f9fa', borderRadius: 2 }}>
            <Typography variant="h4" fontWeight="800" color="#667eea">
              ${category.value.toLocaleString()}
            </Typography>
            <Typography variant="h6" fontWeight="700">
              Total Value
            </Typography>
          </Card>
        </Grid>
      </Grid>

      <Typography variant="h6" gutterBottom sx={{ fontWeight: 800 }}>
        Category Items
      </Typography>
      <List>
        {category.items.map((item) => (
          <ListItem 
            key={item.id} 
            sx={{ 
              p: 2, 
              mb: 1.5, 
              bgcolor: '#f8f9fa', 
              borderRadius: 2,
              border: '1px solid #e9ecef',
              transition: '0.2s',
              '&:hover': { 
                bgcolor: '#eef2f7',
                transform: 'translateX(4px)',
                cursor: 'pointer'
              }
            }}
            onClick={() => {
              setSelectedItem(item);
              setItemImageModalOpen(true);
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', width: '100%' }}>
              <Avatar 
                src={itemImages[item.name]} 
                sx={{ 
                  width: 50, 
                  height: 50, 
                  mr: 2,
                  borderRadius: 2,
                  border: '2px solid #667eea30'
                }}
              >
                <InventoryIcon />
              </Avatar>
              <Box sx={{ flexGrow: 1 }}>
                <Typography variant="subtitle1" fontWeight="800" sx={{ fontSize: '1.1rem' }}>
                  {item.name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Min Stock: {item.minStock} • Value: ${item.value}
                </Typography>
              </Box>
              <Box sx={{ textAlign: 'right' }}>
                <Typography variant="body1" fontWeight="800" sx={{ fontSize: '1.1rem' }}>
                  Stock: {item.stock}
                </Typography>
                <Chip 
                  label="View Image" 
                  size="small" 
                  color="primary"
                  variant="outlined"
                  sx={{ mt: 0.5, fontWeight: 600 }}
                />
              </Box>
            </Box>
          </ListItem>
        ))}
      </List>
    </Box>
  );
}
        return null;
    }
  };

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
        inventoryData={inventoryData}
      />

      {/* floating background orbs */}
      <Box sx={{
        position: 'absolute',
        top: -120, right: -120, width: 240, height: 240, borderRadius: '50%',
        background: 'radial-gradient(circle at 30% 30%, #a5b4fc55, transparent 60%)',
        filter: 'blur(10px)',
        ...floatUp,
        animation: 'floatUp 10s ease-in-out infinite'
      }}/>
      <Box sx={{
        position: 'absolute',
        bottom: -140, left: -140, width: 280, height: 280, borderRadius: '50%',
        background: 'radial-gradient(circle at 70% 70%, #c4b5fd55, transparent 60%)',
        filter: 'blur(12px)',
        ...floatUp,
        animation: 'floatUp 12s ease-in-out 0.8s infinite'
      }}/>

      {/* Header (Enhanced with AI branding) */}
      <Box 
        sx={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: { xs: 'flex-start', md: 'center' }, 
          mb: 4,
          gap: 3,
          p: { xs: 2.5, md: 3 },
          borderRadius: 3,
          background: 'linear-gradient(135deg, rgba(102,126,234,0.10), rgba(118,75,162,0.10))',
          border: '1px solid rgba(102,126,234,0.25)',
          boxShadow: '0 12px 32px rgba(31,45,61,0.08)',
          backdropFilter: 'blur(6px)',
          position: 'relative',
          overflow: 'hidden'
        }}
      >
        <Box sx={{ position: 'absolute', inset: 0, background: 'radial-gradient(1000px 200px at -10% 0%, rgba(255,255,255,0.6), transparent 40%)', pointerEvents: 'none' }} />
        <Box sx={{ flex: 1 }}>
          <Typography variant="h4"
                sx={{
                  fontWeight: 900,
                  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  mb: 1,
                  letterSpacing: 0.4,
                }}>
            AI-Powered Hospital Inventory Manager
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ fontWeight: 600, mb: 1 }}>
            Voice-enabled real-time medical inventory tracking and management system
          </Typography>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.25, flexWrap: 'wrap' }}>
            <Chip 
              label="AI Live" 
              color="success" 
              variant="outlined" 
              size="small" 
              sx={{ fontWeight: 800, borderRadius: 1.5 }} 
              icon={<AIIcon />}
            />
            <Chip 
              label="Voice Enabled" 
              color="primary" 
              variant="outlined" 
              size="small" 
              sx={{ fontWeight: 800, borderRadius: 1.5 }} 
              icon={<VolumeUpIcon />}
            />
            <Typography variant="body2" color="text.secondary">
              Last updated: {new Date().toLocaleTimeString()}
            </Typography>
          </Box>
        </Box>

        {/* header image */}
        <Box sx={{ display: { xs: 'none', md: 'block' }, width: 240, flexShrink: 0 }}>
          <Box sx={{
            position: 'relative',
            borderRadius: 3,
            overflow: 'hidden',
            border: '1px solid rgba(102,126,234,0.25)',
            boxShadow: '0 10px 30px rgba(31,45,61,0.20)'
          }}>
            <img
              src="https://images.unsplash.com/photo-1586773860418-d37222d8fce3?q=80&w=900&auto=format&fit=crop"
              alt="Hospital equipment"
              style={{ width: '100%', height: 140, objectFit: 'cover' }}
            />
            {/* NEW: AI Badge on header image */}
            <Box sx={{
              position: 'absolute',
              top: 8,
              right: 8,
              background: 'rgba(102, 126, 234, 0.9)',
              color: 'white',
              borderRadius: 2,
              px: 1,
              py: 0.5,
              fontSize: '0.75rem',
              fontWeight: 700,
              display: 'flex',
              alignItems: 'center',
              gap: 0.5
            }}>
              <AIIcon sx={{ fontSize: 14 }} />
              AI Powered
            </Box>
          </Box>
        </Box>

        <Zoom in={loaded} timeout={500}>
          <Tooltip title="Add new inventory item">
            <Button
              variant="contained"
              startIcon={<AddIcon />}
              onClick={() => setAddItemOpen(true)}
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
          </Tooltip>
        </Zoom>
      </Box>

      {/* Main Cards */}
      {renderMainCards()}

      {/* Category Cards */}
      {renderCategoryCards()}

      {/* Alert Card */}
      {renderAlertCard()}

      {/* ALL ORIGINAL MODALS REMAIN EXACTLY THE SAME */}
{/* Enhanced Add Item Modal with Voice */}
<Modal open={addItemOpen} onClose={() => setAddItemOpen(false)}>
  <Fade in={addItemOpen}>
    <Box sx={{
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      width: 520,
      bgcolor: 'background.paper',
      borderRadius: 3,
      boxShadow: 24,
      p: 4,
      border: '1px solid rgba(102,126,234,0.25)',
      backgroundImage: 'radial-gradient(circle at 10% 0%, rgba(102,126,234,0.08), transparent 35%)'
    }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h5" fontWeight="900">
          🎤➕ Add New Inventory Item
        </Typography>
        <IconButton onClick={() => setAddItemOpen(false)} size="small" sx={{ bgcolor: '#f8f9fa', '&:hover': { bgcolor: '#e9ecef' } }}>
          <CloseIcon />
        </IconButton>
      </Box>
      
      {/* Voice Input Section */}
      <Card sx={{ p: 2, mb: 3, bgcolor: '#f0f4ff', border: '1px solid #667eea30' }}>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Typography variant="subtitle1" fontWeight="700">
            🎤 AI Voice Input
          </Typography>
          <Tooltip title="Use voice to fill item details">
            <IconButton 
              sx={{ 
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                color: 'white',
                '&:hover': { background: 'linear-gradient(135deg, #5a6fd8 0%, #6a4190 100%)' }
              }}
            >
              <MicIcon />
            </IconButton>
          </Tooltip>
        </Box>
        <Typography variant="caption" color="text.secondary">
          Click microphone and speak item details like "Add 50 Paracetamol to pharmacy with min stock 20"
        </Typography>
      </Card>

      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TextField
            label="Item Name"
            value={newItem.name}
            onChange={(e) => setNewItem({...newItem, name: e.target.value})}
            fullWidth
            size="small"
            InputProps={{
              endAdornment: (
                <Tooltip title="Voice input for item name">
                  <IconButton size="small">
                    <MicIcon />
                  </IconButton>
                </Tooltip>
              )
            }}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            select
            label="Category"
            value={newItem.category}
            onChange={(e) => setNewItem({...newItem, category: e.target.value})}
            fullWidth
            size="small"
          >
            <MenuItem value="pharmacy">Pharmacy</MenuItem>
            <MenuItem value="equipment">Equipment</MenuItem>
            <MenuItem value="lab">Laboratory</MenuItem>
            <MenuItem value="consumable">Consumable</MenuItem>
            <MenuItem value="other">Other</MenuItem>
          </TextField>
        </Grid>
        <Grid item xs={6}>
          <TextField
            label="Quantity"
            type="number"
            value={newItem.quantity}
            onChange={(e) => setNewItem({...newItem, quantity: e.target.value})}
            fullWidth
            size="small"
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            label="Minimum Stock"
            type="number"
            value={newItem.minStock}
            onChange={(e) => setNewItem({...newItem, minStock: e.target.value})}
            fullWidth
            size="small"
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            label="Expiry Date"
            type="date"
            InputLabelProps={{ shrink: true }}
            value={newItem.expiryDate}
            onChange={(e) => setNewItem({...newItem, expiryDate: e.target.value})}
            fullWidth
            size="small"
          />
        </Grid>
        <Grid item xs={12}>
          <Button 
            variant="contained" 
            onClick={handleAddItem}
            fullWidth
            sx={{ 
              mt: 2,
              py: 1.5,
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              borderRadius: 2,
              fontWeight: 900,
              fontSize: '1rem',
              letterSpacing: 0.3
            }}
          >
            Add Item to Inventory
          </Button>
        </Grid>
      </Grid>
    </Box>
  </Fade>
</Modal>

      {/* Detail Modal */}
      <Modal open={modalOpen} onClose={() => setModalOpen(false)}>
        <Fade in={modalOpen}>
          <Box sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 760,
            maxHeight: '85vh',
            overflow: 'auto',
            bgcolor: 'background.paper',
            borderRadius: 3,
            boxShadow: 24,
            p: 4,
            border: '1px solid rgba(31,45,61,0.12)',
            backgroundImage: 'radial-gradient(circle at 100% 0%, rgba(118,75,162,0.06), transparent 40%)'
          }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
              <Box sx={{ flexGrow: 1 }}>
                {renderModalContent() && React.Children.toArray(renderModalContent())[0]}
              </Box>
              <IconButton 
                onClick={() => setModalOpen(false)} 
                size="small"
                sx={{ 
                  bgcolor: '#f8f9fa',
                  '&:hover': { bgcolor: '#e9ecef' }
                }}
              >
                <CloseIcon />
              </IconButton>
            </Box>
            <Divider sx={{ mb: 2 }} />
            <Box sx={{ mt: 2 }}>
              {renderModalContent() && React.Children.toArray(renderModalContent()).slice(1)}
            </Box>
          </Box>
        </Fade>
      </Modal>
      {/* Item Image Preview Modal */}
<Modal open={itemImageModalOpen} onClose={() => setItemImageModalOpen(false)}>
  <Fade in={itemImageModalOpen}>
    <Box sx={{
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      width: 400,
      bgcolor: 'background.paper',
      borderRadius: 3,
      boxShadow: 24,
      p: 3,
      border: '1px solid rgba(102,126,234,0.25)',
      textAlign: 'center'
    }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
        <Typography variant="h6" fontWeight="800">
          {selectedItem?.name} - Image Preview
        </Typography>
        <IconButton onClick={() => setItemImageModalOpen(false)} size="small">
          <CloseIcon />
        </IconButton>
      </Box>
      
      <CardMedia
        component="img"
        image={selectedItem ? itemImages[selectedItem.name] : ''}
        alt={selectedItem?.name}
        sx={{
          width: '100%',
          height: 250,
          objectFit: 'cover',
          borderRadius: 2,
          mb: 2
        }}
      />
      
      <Box sx={{ textAlign: 'left', p: 2, bgcolor: '#f8f9fa', borderRadius: 2 }}>
        <Typography variant="body1" fontWeight="600">
          📦 Stock: {selectedItem?.stock}
        </Typography>
        <Typography variant="body1" fontWeight="600">
          ⚠️ Min Stock: {selectedItem?.minStock}
        </Typography>
        <Typography variant="body1" fontWeight="600">
          💰 Value: ${selectedItem?.value}
        </Typography>
      </Box>
    </Box>
  </Fade>
</Modal>

{/* Enhanced Alert Detail Modal */}
<Modal open={alertDetailModalOpen} onClose={() => setAlertDetailModalOpen(false)}>
  <Fade in={alertDetailModalOpen}>
    <Box sx={{
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      width: 600,
      maxHeight: '90vh',
      overflow: 'auto',
      bgcolor: 'background.paper',
      borderRadius: 3,
      boxShadow: 24,
      p: 0,
      border: '1px solid rgba(102,126,234,0.25)'
    }}>
      {/* Header */}
      <Box sx={{ 
        p: 3, 
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        color: 'white',
        borderTopLeftRadius: 3,
        borderTopRightRadius: 3
      }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography variant="h5" fontWeight="800">
            🚨 Alert Details
          </Typography>
          <IconButton onClick={() => setAlertDetailModalOpen(false)} sx={{ color: 'white' }}>
            <CloseIcon />
          </IconButton>
        </Box>
        <Typography variant="h6" sx={{ mt: 1, opacity: 0.9 }}>
          {selectedAlert?.message}
        </Typography>
      </Box>

      {/* Stepper */}
      <Box sx={{ p: 2, borderBottom: '1px solid #e0e0e0' }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          {['Details', 'Actions', 'Confirmation'].map((step, index) => (
            <Box key={step} sx={{ display: 'flex', alignItems: 'center', flex: 1 }}>
              <Box
                sx={{
                  width: 32,
                  height: 32,
                  borderRadius: '50%',
                  bgcolor: orderStep >= index ? '#667eea' : '#e0e0e0',
                  color: orderStep >= index ? 'white' : '#9e9e9e',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontWeight: 700,
                  fontSize: '0.9rem'
                }}
              >
                {orderStep > index ? '✓' : index + 1}
              </Box>
              <Typography
                variant="body2"
                sx={{
                  ml: 1,
                  fontWeight: orderStep >= index ? 700 : 400,
                  color: orderStep >= index ? '#667eea' : '#9e9e9e'
                }}
              >
                {step}
              </Typography>
              {index < 2 && (
                <Box
                  sx={{
                    flex: 1,
                    height: 2,
                    bgcolor: orderStep > index ? '#667eea' : '#e0e0e0',
                    ml: 1
                  }}
                />
              )}
            </Box>
          ))}
        </Box>
      </Box>

      {/* Content */}
      <Box sx={{ p: 3 }}>
        {orderStep === 0 && (
          <Box>
            <Typography variant="h6" gutterBottom fontWeight="800">
              📊 Stock Information
            </Typography>
            <Grid container spacing={2} sx={{ mb: 3 }}>
              <Grid item xs={6}>
                <Card sx={{ p: 2, textAlign: 'center', bgcolor: '#f8f9fa' }}>
                  <Typography variant="h4" color="#667eea" fontWeight="800">
                    {selectedAlert?.daysLeft || 0}
                  </Typography>
                  <Typography variant="body2" fontWeight="600">
                    Days {selectedAlert?.daysLeft > 0 ? 'Left' : 'Overdue'}
                  </Typography>
                </Card>
              </Grid>
              <Grid item xs={6}>
                <Card sx={{ p: 2, textAlign: 'center', bgcolor: '#f8f9fa' }}>
                  <Typography variant="h4" color="#667eea" fontWeight="800">
                    {selectedAlert?.priority}
                  </Typography>
                  <Typography variant="body2" fontWeight="600">
                    Priority Level
                  </Typography>
                </Card>
              </Grid>
            </Grid>

            <Typography variant="h6" gutterBottom fontWeight="800">
              🔍 Product Details
            </Typography>
            <List>
              <ListItem>
                <ListItemText 
                  primary="Item Name" 
                  secondary={selectedAlert?.item}
                  primaryTypographyProps={{ fontWeight: 600 }}
                />
              </ListItem>
              <ListItem>
                <ListItemText 
                  primary="Category" 
                  secondary={selectedAlert?.category}
                  primaryTypographyProps={{ fontWeight: 600 }}
                />
              </ListItem>
              <ListItem>
                <ListItemText 
                  primary="Alert Type" 
                  secondary={selectedAlert?.type}
                  primaryTypographyProps={{ fontWeight: 600 }}
                />
              </ListItem>
            </List>
          </Box>
        )}

        {orderStep === 1 && (
          <Box>
            <Typography variant="h6" gutterBottom fontWeight="800">
              ⚡ Required Actions
            </Typography>
            
            {selectedAlert?.category === 'pharmacy' && (
              <Box>
                <Typography variant="body1" sx={{ mb: 2 }}>
                  This medicine item requires immediate attention:
                </Typography>
                
                <Box sx={{ mb: 3 }}>
                  <Typography variant="subtitle1" fontWeight="700" gutterBottom>
                    Order New Stock
                  </Typography>
                  <TextField
                    label="Quantity to Order"
                    type="number"
                    fullWidth
                    size="small"
                    sx={{ mb: 2 }}
                  />
                  <TextField
                    label="Vendor Name"
                    fullWidth
                    size="small"
                    sx={{ mb: 2 }}
                  />
                </Box>

                <Box sx={{ p: 2, bgcolor: '#e3f2fd', borderRadius: 2 }}>
                  <Typography variant="subtitle1" fontWeight="700" gutterBottom>
                    Vendor Verification Required:
                  </Typography>
                  <FormGroup>
                    <FormControlLabel control={<Checkbox />} label="Same ingredients verification" />
                    <FormControlLabel control={<Checkbox />} label="Vendor license validation" />
                    <FormControlLabel control={<Checkbox />} label="Color/appearance description match" />
                  </FormGroup>
                </Box>
              </Box>
            )}

            {selectedAlert?.category === 'equipment' && (
              <Box>
                <Typography variant="body1" sx={{ mb: 2 }}>
                  This equipment requires maintenance or replacement:
                </Typography>
                
                <Grid container spacing={2}>
                  <Grid item xs={6}>
                    <Button variant="contained" fullWidth sx={{ py: 1.5 }}>
                      🛠️ Schedule Maintenance
                    </Button>
                  </Grid>
                  <Grid item xs={6}>
                    <Button variant="outlined" fullWidth sx={{ py: 1.5 }}>
                      🚩 Flag for Replacement
                    </Button>
                  </Grid>
                </Grid>

                <Box sx={{ mt: 3, p: 2, bgcolor: '#fff3e0', borderRadius: 2 }}>
                  <Typography variant="subtitle1" fontWeight="700" gutterBottom>
                    Equipment Details:
                  </Typography>
                  <List dense>
                    <ListItem>
                      <ListItemText primary="Last Maintenance Date" secondary="2024-01-01" />
                    </ListItem>
                    <ListItem>
                      <ListItemText primary="Next Maintenance Due" secondary="2024-02-01" />
                    </ListItem>
                    <ListItem>
                      <ListItemText primary="Original Supplier" secondary="MedEquip Corp" />
                    </ListItem>
                  </List>
                </Box>
              </Box>
            )}
          </Box>
        )}

        {orderStep === 2 && (
          <Box sx={{ textAlign: 'center', py: 4 }}>
            <CheckCircleIcon sx={{ fontSize: 64, color: '#4caf50', mb: 2 }} />
            <Typography variant="h5" gutterBottom fontWeight="800">
              Action Completed!
            </Typography>
            <Typography variant="body1" color="text.secondary">
              The required action for {selectedAlert?.item} has been successfully processed.
            </Typography>
          </Box>
        )}
      </Box>

      {/* Footer Actions */}
      <Box sx={{ p: 2, borderTop: '1px solid #e0e0e0', display: 'flex', justifyContent: 'space-between' }}>
        <Button
          variant="outlined"
          disabled={orderStep === 0}
          onClick={() => setOrderStep(orderStep - 1)}
        >
          Back
        </Button>
        
        <Box sx={{ display: 'flex', gap: 1 }}>
          {/* AI Voice Assistant Integration */}
          <Tooltip title="Read details with AI voice">
            <IconButton 
              sx={{ 
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                color: 'white',
                '&:hover': { background: 'linear-gradient(135deg, #5a6fd8 0%, #6a4190 100%)' }
              }}
            >
              <VolumeUpIcon />
            </IconButton>
          </Tooltip>
          
          {orderStep < 2 ? (
            <Button
              variant="contained"
              onClick={() => setOrderStep(orderStep + 1)}
              sx={{
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
              }}
            >
              Continue
            </Button>
          ) : (
            <Button
              variant="contained"
              onClick={() => setAlertDetailModalOpen(false)}
              sx={{
                background: 'linear-gradient(135deg, #4caf50 0%, #45a049 100%)'
              }}
            >
              Complete
            </Button>
          )}
        </Box>
      </Box>
    </Box>
  </Fade>
</Modal>
    </Box>
  );
};

export default Dashboard;