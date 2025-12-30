import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Card,
  CardContent,
  Grid,
  Chip,
  Button,
  Modal,
  Fade,
  Slide,
  Grow,
  TextField,
  Divider,
  Avatar,
  Tooltip,
  Paper,
  alpha,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  IconButton,
  LinearProgress,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Badge,
  MenuItem,
  Switch,
  FormControlLabel,
  Tabs,
  Tab,
  Fab,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  CircularProgress
} from '@mui/material';
import {
  Add as AddIcon,
  MedicalServices as EquipmentIcon,
  Warning as WarningIcon,
  Error as ErrorIcon,
  CheckCircle as CheckCircleIcon,
  CalendarToday as CalendarIcon,
  LocalHospital as HospitalIcon,
  Biotech as BiotechIcon,
  Science as ScienceIcon,
  Build as BuildIcon,
  Emergency as EmergencyIcon,
  Speed as SpeedIcon,
  BatteryAlert as BatteryIcon,
  Thermostat as TemperatureIcon,
  CleanHands as SterileIcon,
  History as HistoryIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Download as DownloadIcon,
  FilterList as FilterIcon,
  Search as SearchIcon,
  QrCode2 as QRIcon,
  Refresh as RefreshIcon,
  TrendingUp as TrendingUpIcon,
  Schedule as ScheduleIcon,
  LocalShipping as ShippingIcon,
  Close as CloseIcon,
  Mic as MicIcon,
  Stop as StopIcon,
  SmartToy as AIIcon,
  VolumeUp as VolumeUpIcon,
  AutoAwesome as AutoAwesomeIcon
} from '@mui/icons-material';

// Surgical Equipment Categories
const equipmentCategories = [
  'Anesthesia',
  'Monitoring',
  'Surgical Instruments',
  'Life Support',
  'Diagnostic',
  'Therapeutic',
  'Emergency',
  'Sterilization'
];

// Equipment Status Types
const statusTypes = {
  operational: { label: 'Operational', color: '#10B981', icon: <CheckCircleIcon /> },
  maintenance: { label: 'Maintenance', color: '#F59E0B', icon: <BuildIcon /> },
  critical: { label: 'Critical', color: '#EF4444', icon: <WarningIcon /> },
  retired: { label: 'Retired', color: '#6B7280', icon: <ErrorIcon /> }
};

// Enhanced Animations
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

// Sample Surgical Equipment Data
const initialSurgicalEquipment = [
  {
    id: 1,
    name: 'Anesthesia Machine',
    model: 'Aespire 7100',
    manufacturer: 'GE Healthcare',
    category: 'Anesthesia',
    status: 'operational',
    lastMaintenance: '2024-01-15',
    nextMaintenance: '2024-04-15',
    department: 'Operating Room 1',
    serialNumber: 'AM-OR1-001',
    value: 45000,
    usageHours: 1240,
    maintenanceHistory: [
      { date: '2024-01-15', type: 'Scheduled', technician: 'John Smith', notes: 'Routine maintenance completed' },
      { date: '2023-10-20', type: 'Repair', technician: 'Sarah Johnson', notes: 'Replaced pressure sensors' }
    ],
    specifications: {
      power: 'AC 110-240V',
      weight: '180kg',
      dimensions: '120x60x150cm',
      warranty: '2 years'
    }
  },
  {
    id: 2,
    name: 'Patient Monitor',
    model: 'IntelliVue MX750',
    manufacturer: 'Philips',
    category: 'Monitoring',
    status: 'maintenance',
    lastMaintenance: '2024-01-10',
    nextMaintenance: '2024-02-10',
    department: 'ICU',
    serialNumber: 'PM-ICU-005',
    value: 22000,
    usageHours: 3560,
    maintenanceHistory: [
      { date: '2024-01-10', type: 'Emergency', technician: 'Mike Davis', notes: 'Display unit replacement' }
    ],
    specifications: {
      power: 'AC/Battery',
      weight: '8.5kg',
      dimensions: '38x28x15cm',
      warranty: '3 years'
    }
  },
  {
    id: 3,
    name: 'Surgical C-Arm',
    model: 'Zenition 70',
    manufacturer: 'Philips',
    category: 'Diagnostic',
    status: 'operational',
    lastMaintenance: '2024-01-08',
    nextMaintenance: '2024-07-08',
    department: 'Radiology',
    serialNumber: 'SC-RAD-003',
    value: 185000,
    usageHours: 890,
    maintenanceHistory: [
      { date: '2024-01-08', type: 'Scheduled', technician: 'Emily Chen', notes: 'Calibration and safety check' }
    ],
    specifications: {
      power: 'AC 220V',
      weight: '650kg',
      dimensions: '180x120x220cm',
      warranty: '5 years'
    }
  },
  {
    id: 4,
    name: 'Defibrillator',
    model: 'Lifepak 15',
    manufacturer: 'Stryker',
    category: 'Emergency',
    status: 'critical',
    lastMaintenance: '2023-12-20',
    nextMaintenance: '2024-01-20',
    department: 'Emergency Room',
    serialNumber: 'DF-ER-012',
    value: 18000,
    usageHours: 2150,
    maintenanceHistory: [
      { date: '2023-12-20', type: 'Repair', technician: 'Robert Wilson', notes: 'Battery system replacement' }
    ],
    specifications: {
      power: 'AC/Battery',
      weight: '7.2kg',
      dimensions: '33x28x15cm',
      warranty: '4 years'
    }
  },
  {
    id: 5,
    name: 'Ventilator',
    model: 'Puritan Bennett 980',
    manufacturer: 'Medtronic',
    category: 'Life Support',
    status: 'operational',
    lastMaintenance: '2024-01-12',
    nextMaintenance: '2024-04-12',
    department: 'ICU',
    serialNumber: 'VT-ICU-008',
    value: 32000,
    usageHours: 1870,
    maintenanceHistory: [
      { date: '2024-01-12', type: 'Scheduled', technician: 'Lisa Brown', notes: 'Pressure calibration' }
    ],
    specifications: {
      power: 'AC/Battery',
      weight: '12.5kg',
      dimensions: '40x35x20cm',
      warranty: '3 years'
    }
  },
  {
    id: 6,
    name: 'Electrosurgical Unit',
    model: 'Force FX-8C',
    manufacturer: 'Medtronic',
    category: 'Surgical Instruments',
    status: 'operational',
    lastMaintenance: '2024-01-05',
    nextMaintenance: '2024-04-05',
    department: 'Operating Room 2',
    serialNumber: 'ES-OR2-004',
    value: 28000,
    usageHours: 2340,
    maintenanceHistory: [
      { date: '2024-01-05', type: 'Scheduled', technician: 'David Lee', notes: 'Generator testing' }
    ],
    specifications: {
      power: 'AC 110V',
      weight: '15kg',
      dimensions: '45x35x25cm',
      warranty: '2 years'
    }
  }
];

// AI Voice Agent Component - NEW ADDITION
const AIVoiceAgent = ({ onVoiceCommand, equipment }) => {
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
        const criticalEquipment = equipment.filter(item => item.status === 'critical');
        const maintenanceDue = equipment.filter(item => {
          const nextMaintenance = new Date(item.nextMaintenance);
          const today = new Date();
          const diffTime = nextMaintenance - today;
          const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
          return diffDays <= 7 && diffDays > 0;
        });

        let response = "";
        if (criticalEquipment.length > 0) {
          response = `Alert: ${criticalEquipment.length} critical equipment items need immediate attention including ${criticalEquipment.slice(0, 2).map(item => item.name).join(' and ')}.`;
        } else if (maintenanceDue.length > 0) {
          response = `${maintenanceDue.length} equipment items require maintenance within 7 days. Check the maintenance schedule for details.`;
        } else {
          response = "All surgical equipment is operational. Maintenance schedule is up to date.";
        }

        const aiMessage = {
          type: 'ai', 
          message: response,
          action: 'equipment_status'
        };
        
        setConversation(prev => [
          ...prev,
          { type: 'user', message: 'Check equipment status' },
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

      if (command.toLowerCase().includes('critical') || command.toLowerCase().includes('urgent')) {
        const critical = equipment.filter(item => item.status === 'critical');
        response = `You have ${critical.length} critical equipment items: ${critical.map(item => `${item.name} in ${item.department}`).join(', ')}`;
        action = 'filter_critical';
      } else if (command.toLowerCase().includes('maintenance') || command.toLowerCase().includes('service')) {
        const maintenanceNeeded = equipment.filter(item => item.status === 'maintenance');
        response = `${maintenanceNeeded.length} equipment items are under maintenance: ${maintenanceNeeded.map(item => `${item.name} (${item.model})`).join(', ')}`;
        action = 'filter_maintenance';
      } else if (command.toLowerCase().includes('operational') || command.toLowerCase().includes('working')) {
        const operational = equipment.filter(item => item.status === 'operational');
        response = `${operational.length} equipment items are operational and ready for use. Total value: $${operational.reduce((sum, item) => sum + item.value, 0).toLocaleString()}`;
        action = 'filter_operational';
      } else if (command.toLowerCase().includes('anesthesia') || command.toLowerCase().includes('monitoring')) {
        const category = command.toLowerCase().includes('anesthesia') ? 'Anesthesia' : 'Monitoring';
        const categoryItems = equipment.filter(item => item.category === category);
        response = `${category} category has ${categoryItems.length} items worth $${categoryItems.reduce((sum, item) => sum + item.value, 0).toLocaleString()}. Includes: ${categoryItems.slice(0, 3).map(item => item.name).join(', ')}`;
        action = `filter_${category.toLowerCase()}`;
      } else {
        response = "I can help you manage surgical equipment. Ask about critical items, maintenance status, operational equipment, or specific categories like anesthesia or monitoring.";
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
            Surgical Equipment Assistant
          </Box>
        </DialogTitle>
        
        <DialogContent sx={{ p: 3 }}>
          {/* Conversation History */}
          <Box sx={{ mb: 3, maxHeight: '300px', overflow: 'auto' }}>
            {conversation.length === 0 ? (
              <Typography color="text.secondary" textAlign="center" sx={{ py: 4 }}>
                Ask me about equipment status, maintenance schedules, critical items, or specific equipment categories. I'll speak the answers too!
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
                    <Typography variant="body2">Analyzing equipment data...</Typography>
                  </Box>
                </Card>
              </Box>
            )}
          </Box>

          {/* Quick Commands */}
          <Grid container spacing={1} sx={{ mb: 2 }}>
            {['Critical equipment', 'Maintenance status', 'Operational items', 'Anesthesia machines'].map((cmd) => (
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
            Try: "Show critical equipment" or "What needs maintenance?"
          </Typography>
        </DialogActions>
      </Dialog>
    </>
  );
};

const SurgicalEquipment = () => {
  const [equipment, setEquipment] = useState(initialSurgicalEquipment);
  const [selectedEquipment, setSelectedEquipment] = useState(null);
  const [detailModalOpen, setDetailModalOpen] = useState(false);
  const [addModalOpen, setAddModalOpen] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('All');
  const [statusFilter, setStatusFilter] = useState('All');
  const [activeTab, setActiveTab] = useState(0);
  const [newEquipment, setNewEquipment] = useState({
    name: '',
    model: '',
    manufacturer: '',
    category: '',
    department: '',
    serialNumber: '',
    value: '',
    specifications: {
      power: '',
      weight: '',
      dimensions: '',
      warranty: ''
    }
  });

  useEffect(() => {
    const timer = setTimeout(() => setLoaded(true), 400);
    return () => clearTimeout(timer);
  }, []);

  // NEW: AI Voice Command Handler
  const handleVoiceCommand = (command) => {
    if (command.action === 'filter_critical') {
      setStatusFilter('critical');
    } else if (command.action === 'filter_maintenance') {
      setStatusFilter('maintenance');
    } else if (command.action === 'filter_operational') {
      setStatusFilter('operational');
    } else if (command.action === 'filter_anesthesia') {
      setCategoryFilter('Anesthesia');
    } else if (command.action === 'filter_monitoring') {
      setCategoryFilter('Monitoring');
    }
  };

  // ALL ORIGINAL FUNCTIONS REMAIN UNCHANGED
  const handleEquipmentClick = (item) => {
    setSelectedEquipment(item);
    setDetailModalOpen(true);
  };

  const handleAddEquipment = () => {
    const newItem = {
      id: equipment.length + 1,
      ...newEquipment,
      status: 'operational',
      lastMaintenance: new Date().toISOString().split('T')[0],
      nextMaintenance: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      usageHours: 0,
      maintenanceHistory: [],
      value: parseInt(newEquipment.value)
    };
    
    setEquipment(prev => [...prev, newItem]);
    setAddModalOpen(false);
    setNewEquipment({
      name: '',
      model: '',
      manufacturer: '',
      category: '',
      department: '',
      serialNumber: '',
      value: '',
      specifications: {
        power: '',
        weight: '',
        dimensions: '',
        warranty: ''
      }
    });
  };

  const getDaysUntilMaintenance = (date) => {
    const today = new Date();
    const maintenanceDate = new Date(date);
    const diffTime = maintenanceDate - today;
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  };

  const getMaintenanceStatus = (days) => {
    if (days < 0) return { status: 'Overdue', color: '#EF4444' };
    if (days <= 7) return { status: 'Due Soon', color: '#F59E0B' };
    if (days <= 30) return { status: 'Upcoming', color: '#3B82F6' };
    return { status: 'Scheduled', color: '#10B981' };
  };

  const filteredEquipment = equipment.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.model.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.serialNumber.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = categoryFilter === 'All' || item.category === categoryFilter;
    const matchesStatus = statusFilter === 'All' || item.status === statusFilter;
    
    return matchesSearch && matchesCategory && matchesStatus;
  });

  const stats = {
    total: equipment.length,
    operational: equipment.filter(item => item.status === 'operational').length,
    maintenance: equipment.filter(item => item.status === 'maintenance').length,
    critical: equipment.filter(item => item.status === 'critical').length,
    totalValue: equipment.reduce((sum, item) => sum + item.value, 0)
  };

  const StatCard = ({ title, value, subtitle, icon, color, gradient, delay = 0 }) => (
    <Grow in={loaded} timeout={500 + delay}>
      <Card sx={{ 
        background: gradient,
        color: 'black',
        borderRadius: 3,
        height: '100%', 
        transition: 'all 0.3s ease',
        '&:hover': {
          transform: 'translateY(-4px)',
          boxShadow: `0 12px 24px ${alpha(color, 0.3)}`
        },
        position: 'relative',
        overflow: 'hidden'
      }}>
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
          <AIIcon sx={{ fontSize: 14, color: 'black', opacity: 0.8 }} />
        </Box>

        <CardContent sx={{ p: 3 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <Box>
              <Typography variant="h4" fontWeight="800" sx={{ mb: 0.5 }}>
                {value}
              </Typography>
              <Typography variant="h5" sx={{ opacity: 0.9, fontWeight: 600 }}>
                {title}
              </Typography>
              <Typography variant="h6" sx={{ opacity: 0.8, mt: 1 }}>
                {subtitle}
              </Typography>
            </Box>
            <Box sx={{ 
              background: 'rgba(255,255,255,0.2)', 
              borderRadius: 2, 
              p: 1,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              {icon}
            </Box>
          </Box>
        </CardContent>
      </Card>
    </Grow>
  );

  const EquipmentCard = ({ item, index }) => {
    const daysUntilMaintenance = getDaysUntilMaintenance(item.nextMaintenance);
    const maintenanceStatus = getMaintenanceStatus(daysUntilMaintenance);
    const status = statusTypes[item.status];

    return (
      <Grow in={loaded} timeout={500 + index * 100}>
        <Card
          sx={{
            cursor: 'pointer',
            transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
            '&:hover': {
              transform: 'translateY(-8px)',
              boxShadow: `0 16px 32px ${alpha(status.color, 0.2)}`,
              border: `2px solid ${alpha(status.color, 0.3)}`
            },
            border: `1px solid ${alpha(status.color, 0.2)}`,
            borderRadius: 3,
            overflow: 'hidden',
            position: 'relative'
          }}
          onClick={() => handleEquipmentClick(item)}
        >
          {/* NEW: AI Quick Action */}
          <Tooltip title="Ask AI about this equipment">
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

          <CardContent sx={{ p: 3 }}>
            {/* Header */}
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                <Avatar sx={{ bgcolor: alpha(status.color, 0.1), color: status.color }}>
                  <EquipmentIcon />
                </Avatar>
                <Box>
                  <Typography variant="h6" fontWeight="700" color="#1E293B">
                    {item.name}
                  </Typography>
                  <Typography variant="body2" color="#64748B" sx={{ fontWeight: 500 }}>
                    {item.model} • {item.manufacturer}
                  </Typography>
                </Box>
              </Box>
              <Chip
                icon={status.icon}
                label={status.label}
                size="small"
                sx={{
                  backgroundColor: alpha(status.color, 0.1),
                  color: status.color,
                  fontWeight: 600,
                  border: `1px solid ${status.color}`
                }}
              />
            </Box>

            {/* Department & Serial */}
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
              <Typography variant="body2" fontWeight="600" color="#1E293B">
                {item.department}
              </Typography>
              <Typography variant="caption" color="#64748B" fontWeight="500">
                {item.serialNumber}
              </Typography>
            </Box>

            {/* Maintenance Status */}
            <Box sx={{ mb: 2 }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                <Typography variant="body2" fontWeight="600" color="#64748B">
                  Next Maintenance
                </Typography>
                <Typography variant="body2" fontWeight="700" color={maintenanceStatus.color}>
                  {maintenanceStatus.status}
                </Typography>
              </Box>
              <LinearProgress 
                variant="determinate" 
                value={Math.max(0, Math.min(100, (30 - daysUntilMaintenance) / 30 * 100))} 
                sx={{ 
                  height: 6, 
                  borderRadius: 3,
                  backgroundColor: alpha(maintenanceStatus.color, 0.2),
                  '& .MuiLinearProgress-bar': {
                    backgroundColor: maintenanceStatus.color
                  }
                }}
              />
              <Typography variant="caption" color="#64748B" sx={{ mt: 0.5, display: 'block' }}>
                Due: {new Date(item.nextMaintenance).toLocaleDateString()} ({daysUntilMaintenance} days)
              </Typography>
            </Box>

            {/* Usage & Value */}
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Box>
                <Typography variant="caption" color="#64748B">
                  Usage
                </Typography>
                <Typography variant="body2" fontWeight="700" color="#1E293B">
                  {item.usageHours.toLocaleString()} hrs
                </Typography>
              </Box>
              <Box sx={{ textAlign: 'right' }}>
                <Typography variant="caption" color="#64748B">
                  Value
                </Typography>
                <Typography variant="body2" fontWeight="700" color="#10B981">
                  ${item.value.toLocaleString()}
                </Typography>
              </Box>
            </Box>
          </CardContent>

          {/* Maintenance Warning Badge */}
          {daysUntilMaintenance <= 7 && (
            <Box
              sx={{
                position: 'absolute',
                top: 12,
                right: 40, // Adjusted for AI button
                width: 8,
                height: 8,
                borderRadius: '50%',
                backgroundColor: maintenanceStatus.color,
                animation: 'pulse 2s infinite'
              }}
            />
          )}
        </Card>
      </Grow>
    );
  };

  const renderDetailModal = () => (
    <Modal open={detailModalOpen} onClose={() => setDetailModalOpen(false)}>
      <Fade in={detailModalOpen}>
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: { xs: '95%', sm: 800 },
            maxHeight: '90vh',
            overflow: 'auto',
            bgcolor: 'background.paper',
            borderRadius: 3,
            boxShadow: 24,
            border: '1px solid rgba(255, 255, 255, 0.2)',
            background: 'linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%)'
          }}
        >
          {selectedEquipment && (
            <Box>
              {/* Header */}
              <Box sx={{ p: 3, borderBottom: '1px solid #e0e0e0' }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    <Avatar sx={{ bgcolor: alpha(statusTypes[selectedEquipment.status].color, 0.1), color: statusTypes[selectedEquipment.status].color, width: 60, height: 60 }}>
                      <EquipmentIcon />
                    </Avatar>
                    <Box>
                      <Typography variant="h4" fontWeight="800" color="#1E293B">
                        {selectedEquipment.name}
                      </Typography>
                      <Typography variant="body1" color="#64748B" sx={{ fontWeight: 500 }}>
                        {selectedEquipment.model} • {selectedEquipment.manufacturer}
                      </Typography>
                    </Box>
                  </Box>
                  <Box sx={{ display: 'flex', gap: 1 }}>
                    {/* NEW: AI Analysis Button */}
                    <Tooltip title="AI Equipment Analysis">
                      <IconButton sx={{ color: '#667eea' }}>
                        <AutoAwesomeIcon />
                      </IconButton>
                    </Tooltip>
                    <IconButton onClick={() => setDetailModalOpen(false)}>
                      <CloseIcon />
                    </IconButton>
                  </Box>
                </Box>

                <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                  <Chip
                    icon={statusTypes[selectedEquipment.status].icon}
                    label={statusTypes[selectedEquipment.status].label}
                    sx={{
                      backgroundColor: alpha(statusTypes[selectedEquipment.status].color, 0.1),
                      color: statusTypes[selectedEquipment.status].color,
                      fontWeight: 700
                    }}
                  />
                  <Chip label={selectedEquipment.category} variant="outlined" />
                  <Chip label={selectedEquipment.department} variant="outlined" />
                  {/* NEW: AI Monitoring Chip */}
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

              {/* Tabs */}
              <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <Tabs value={activeTab} onChange={(e, newValue) => setActiveTab(newValue)}>
                  <Tab label="Overview" />
                  <Tab label="Maintenance History" />
                  <Tab label="Specifications" />
                  <Tab label="AI Insights" />
                </Tabs>
              </Box>

              {/* Tab Content */}
              <Box sx={{ p: 3 }}>
                {activeTab === 0 && (
                  <Grid container spacing={3}>
                    <Grid item xs={12} md={6}>
                      <Paper sx={{ p: 3, background: alpha('#3B82F6', 0.05) }}>
                        <Typography variant="h6" fontWeight="700" color="#1E293B" gutterBottom>
                          Equipment Details
                        </Typography>
                        <List>
                          <ListItem>
                            <ListItemText 
                              primary="Serial Number" 
                              secondary={selectedEquipment.serialNumber}
                              primaryTypographyProps={{ fontWeight: 600 }}
                            />
                          </ListItem>
                          <ListItem>
                            <ListItemText 
                              primary="Department" 
                              secondary={selectedEquipment.department}
                              primaryTypographyProps={{ fontWeight: 600 }}
                            />
                          </ListItem>
                          <ListItem>
                            <ListItemText 
                              primary="Value" 
                              secondary={`$${selectedEquipment.value.toLocaleString()}`}
                              primaryTypographyProps={{ fontWeight: 600 }}
                            />
                          </ListItem>
                          <ListItem>
                            <ListItemText 
                              primary="Usage Hours" 
                              secondary={selectedEquipment.usageHours.toLocaleString()}
                              primaryTypographyProps={{ fontWeight: 600 }}
                            />
                          </ListItem>
                        </List>
                      </Paper>
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <Paper sx={{ p: 3, background: alpha('#10B981', 0.05) }}>
                        <Typography variant="h6" fontWeight="700" color="#1E293B" gutterBottom>
                          Maintenance Schedule
                        </Typography>
                        <List>
                          <ListItem>
                            <ListItemIcon>
                              <CalendarIcon color="primary" />
                            </ListItemIcon>
                            <ListItemText 
                              primary="Last Maintenance" 
                              secondary={new Date(selectedEquipment.lastMaintenance).toLocaleDateString()}
                              primaryTypographyProps={{ fontWeight: 600 }}
                            />
                          </ListItem>
                          <ListItem>
                            <ListItemIcon>
                              <ScheduleIcon color="warning" />
                            </ListItemIcon>
                            <ListItemText 
                              primary="Next Maintenance" 
                              secondary={new Date(selectedEquipment.nextMaintenance).toLocaleDateString()}
                              primaryTypographyProps={{ fontWeight: 600 }}
                            />
                          </ListItem>
                          <ListItem>
                            <ListItemIcon>
                              <HistoryIcon color="info" />
                            </ListItemIcon>
                            <ListItemText 
                              primary="Days Remaining" 
                              secondary={getDaysUntilMaintenance(selectedEquipment.nextMaintenance)}
                              primaryTypographyProps={{ fontWeight: 600 }}
                            />
                          </ListItem>
                        </List>
                      </Paper>
                    </Grid>
                  </Grid>
                )}

                {activeTab === 1 && (
                  <Paper sx={{ p: 3 }}>
                    <Typography variant="h6" fontWeight="700" color="#1E293B" gutterBottom>
                      Maintenance History
                    </Typography>
                    <List>
                      {selectedEquipment.maintenanceHistory.map((record, index) => (
                        <ListItem key={index} sx={{ border: '1px solid #e0e0e0', borderRadius: 2, mb: 1 }}>
                          <ListItemIcon>
                            <BuildIcon color="action" />
                          </ListItemIcon>
                          <ListItemText 
                            primary={`${record.type} - ${new Date(record.date).toLocaleDateString()}`}
                            secondary={
                              <Box>
                                <Typography variant="body2" color="#64748B">
                                  Technician: {record.technician}
                                </Typography>
                                <Typography variant="body2" color="#64748B">
                                  Notes: {record.notes}
                                </Typography>
                              </Box>
                            }
                            primaryTypographyProps={{ fontWeight: 600 }}
                          />
                        </ListItem>
                      ))}
                    </List>
                  </Paper>
                )}

                {activeTab === 2 && (
                  <Paper sx={{ p: 3 }}>
                    <Typography variant="h6" fontWeight="700" color="#1E293B" gutterBottom>
                      Technical Specifications
                    </Typography>
                    <Grid container spacing={2}>
                      {Object.entries(selectedEquipment.specifications).map(([key, value]) => (
                        <Grid item xs={12} sm={6} key={key}>
                          <Box sx={{ p: 2, background: '#f8f9fa', borderRadius: 2 }}>
                            <Typography variant="body2" fontWeight="600" color="#64748B" sx={{ textTransform: 'capitalize' }}>
                              {key.replace(/([A-Z])/g, ' $1')}
                            </Typography>
                            <Typography variant="body1" fontWeight="700" color="#1E293B">
                              {value}
                            </Typography>
                          </Box>
                        </Grid>
                      ))}
                    </Grid>
                  </Paper>
                )}

                {activeTab === 3 && (
                  <Paper sx={{ p: 3, background: 'linear-gradient(135deg, rgba(102,126,234,0.08), rgba(118,75,162,0.08))' }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
                      <AIIcon sx={{ color: '#667eea' }} />
                      <Typography variant="h6" fontWeight="800" color="#667eea">
                        AI Equipment Insights
                      </Typography>
                    </Box>
                    
                    <Grid container spacing={2}>
                      <Grid item xs={12} md={6}>
                        <Card sx={{ p: 2, background: alpha('#10B981', 0.1), border: '1px solid #10B98120' }}>
                          <Typography variant="subtitle2" fontWeight="700" color="#10B981" gutterBottom>
                            Maintenance Prediction
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            Next service recommended in {Math.max(0, getDaysUntilMaintenance(selectedEquipment.nextMaintenance))} days based on usage patterns.
                          </Typography>
                        </Card>
                      </Grid>
                      <Grid item xs={12} md={6}>
                        <Card sx={{ p: 2, background: alpha('#3B82F6', 0.1), border: '1px solid #3B82F620' }}>
                          <Typography variant="subtitle2" fontWeight="700" color="#3B82F6" gutterBottom>
                            Performance Analytics
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            {selectedEquipment.usageHours > 2000 ? 'High usage equipment - consider preventive maintenance' : 'Normal usage pattern detected'}
                          </Typography>
                        </Card>
                      </Grid>
                      <Grid item xs={12}>
                        <Card sx={{ p: 2, background: alpha('#F59E0B', 0.1), border: '1px solid #F59E0B20' }}>
                          <Typography variant="subtitle2" fontWeight="700" color="#F59E0B" gutterBottom>
                            AI Recommendations
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            {getDaysUntilMaintenance(selectedEquipment.nextMaintenance) <= 7 
                              ? 'Schedule immediate maintenance to prevent downtime'
                              : 'Equipment is well-maintained. Continue regular service schedule.'
                            }
                          </Typography>
                        </Card>
                      </Grid>
                    </Grid>
                  </Paper>
                )}
              </Box>
            </Box>
          )}
        </Box>
      </Fade>
    </Modal>
  );

  return (
    <Box sx={{ 
      p: 4, 
      minHeight: '100vh', 
      background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',
      position: 'relative'
    }}>
      {/* NEW: AI Voice Agent Integration */}
      <AIVoiceAgent 
        onVoiceCommand={handleVoiceCommand}
        equipment={equipment}
      />

      {/* Enhanced Background Orbs */}
      <Box sx={{
        position: 'absolute',
        top: -140, right: -140, width: 280, height: 280, borderRadius: '50%',
        background: 'radial-gradient(circle at 30% 30%, #a5b4fc55, transparent 60%)',
        filter: 'blur(10px)',
        ...floatUp, animation: 'floatUp 12s ease-in-out infinite'
      }}/>
      <Box sx={{
        position: 'absolute',
        bottom: -160, left: -160, width: 320, height: 320, borderRadius: '50%',
        background: 'radial-gradient(circle at 70% 70%, #c4b5fd55, transparent 60%)',
        filter: 'blur(12px)',
        ...floatUp, animation: 'floatUp 14s ease-in-out 0.6s infinite'
      }}/>

      {/* Header (Enhanced with AI branding) */}
      <Box sx={{ mb: 4 }}>
        <Box sx={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: { xs: 'flex-start', md: 'center' }, 
          mb: 3,
          p: 3,
          borderRadius: 3,
          background: 'linear-gradient(135deg, rgba(102,126,234,0.10), rgba(118,75,162,0.10))',
          border: '1px solid rgba(102,126,234,0.25)',
          boxShadow: '0 12px 32px rgba(31,45,61,0.08)',
          backdropFilter: 'blur(6px)',
          position: 'relative',
          overflow: 'hidden'
        }}>
          <Box sx={{ position: 'absolute', inset: 0, background: 'radial-gradient(800px 160px at -10% 0%, rgba(255,255,255,0.6), transparent 40%)', pointerEvents: 'none' }} />
          <Box>
            <Typography variant="h4"
                sx={{
                  fontWeight: 900,
                  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  mb: 1,
                  letterSpacing: 0.4,
                }}>
               AI-Powered Surgical Equipment
            </Typography>
            <Typography variant="body1" color="text.secondary" sx={{ fontWeight: 600, mb: 1 }}>
              Voice-enabled medical equipment management and predictive maintenance
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
                label="Predictive Maintenance" 
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
            onClick={() => setAddModalOpen(true)}
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
            Add Equipment
          </Button>
        </Box>

        {/* Stats Cards */}
        <Grid container spacing={3} sx={{ mb: 4 }}>
          <Grid item xs={12} sm={6} md={2.4}>
            <StatCard
              title="Total Equipment"
              value={stats.total}
              subtitle="All surgical devices"
              icon={<EquipmentIcon sx={{ color: 'black', fontSize: 28 }} />}
              color="#667eea"
              gradient="linear-gradient(135deg, #667eea 0%, #764ba2 100%)"
            />
          </Grid>
          <Grid item xs={12} sm={6} md={2.4}>
            <StatCard
              title="Operational"
              value={stats.operational}
              subtitle="Ready for use"
              icon={<CheckCircleIcon sx={{ color: 'black', fontSize: 28 }} />}
              color="#10B981"
              gradient="linear-gradient(135deg, #10B981 0%, #059669 100%)"
              delay={200}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={2.4}>
            <StatCard
              title="Maintenance"
              value={stats.maintenance}
              subtitle="Under service"
              icon={<BuildIcon sx={{ color: 'black', fontSize: 28 }} />}
              color="#F59E0B"
              gradient="linear-gradient(135deg, #F59E0B 0%, #D97706 100%)"
              delay={400}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={2.4}>
            <StatCard
              title="Critical"
              value={stats.critical}
              subtitle="Needs attention"
              icon={<WarningIcon sx={{ color: 'black', fontSize: 28 }} />}
              color="#EF4444"
              gradient="linear-gradient(135deg, #EF4444 0%, #DC2626 100%)"
              delay={600}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={2.4}>
            <StatCard
              title="Total Value"
              value={`$${(stats.totalValue / 1000).toFixed(0)}K`}
              subtitle="Equipment worth"
              icon={<TrendingUpIcon sx={{ color: 'black', fontSize: 28 }} />}
              color="#8B5CF6"
              gradient="linear-gradient(135deg, #8B5CF6 0%, #7C3AED 100%)"
              delay={800}
            />
          </Grid>
        </Grid>

        {/* Filters (Enhanced with AI Quick Actions) */}
        <Paper sx={{ 
          p: 2, 
          mb: 3, 
          background: 'rgba(255, 255, 255, 0.9)',
          borderRadius: 3,
          border: '1px solid #e9edf3',
          boxShadow: '0 10px 28px rgba(31,45,61,0.06)'
        }}>
          <Grid container spacing={2} alignItems="center">
            <Grid item xs={12} sm={3}>
              <TextField
                fullWidth
                placeholder="Search equipment..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                size="small"
                InputProps={{
                  startAdornment: <SearchIcon sx={{ color: 'text.secondary', mr: 1 }} />
                }}
              />
            </Grid>
            <Grid item xs={12} sm={3}>
              <TextField
                fullWidth
                select
                label="Category"
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
                size="small"
              >
                <MenuItem value="All">All Categories</MenuItem>
                {equipmentCategories.map(category => (
                  <MenuItem key={category} value={category}>{category}</MenuItem>
                ))}
              </TextField>
            </Grid>
            <Grid item xs={12} sm={3}>
              <TextField
                fullWidth
                select
                label="Status"
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                size="small"
              >
                <MenuItem value="All">All Status</MenuItem>
                {Object.entries(statusTypes).map(([key, status]) => (
                  <MenuItem key={key} value={key}>{status.label}</MenuItem>
                ))}
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

      {/* Equipment Grid */}
      <Grid container spacing={3}>
        {filteredEquipment.map((item, index) => (
          <Grid item xs={12} sm={6} md={4} key={item.id}>
            <EquipmentCard item={item} index={index} />
          </Grid>
        ))}
      </Grid>

      {/* Empty State */}
      {filteredEquipment.length === 0 && (
        <Box sx={{ textAlign: 'center', py: 8 }}>
          <EquipmentIcon sx={{ fontSize: 64, color: 'text.secondary', mb: 2 }} />
          <Typography variant="h5" color="text.secondary" gutterBottom>
            No equipment found
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Try adjusting your search or ask the AI assistant for help
          </Typography>
        </Box>
      )}

      {/* Detail Modal */}
      {renderDetailModal()}

      {/* Add Equipment Modal (Enhanced with AI) */}
      <Modal open={addModalOpen} onClose={() => setAddModalOpen(false)}>
        <Fade in={addModalOpen}>
          <Box sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: { xs: '95%', sm: 600 },
            bgcolor: 'background.paper',
            borderRadius: 3,
            boxShadow: 24,
            p: 4
          }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
              <AIIcon sx={{ color: '#667eea' }} />
              <Typography variant="h4" fontWeight="800">
                Add New Equipment
              </Typography>
            </Box>
            
            {/* AI Suggestion Card */}
            <Card sx={{ mb: 3, background: 'linear-gradient(135deg, #f8f9ff 0%, #f0f4ff 100%)', border: '1px solid #667eea20' }}>
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                  <AIIcon sx={{ color: '#667eea', fontSize: 20 }} />
                  <Typography variant="subtitle2" fontWeight="700" color="#667eea">
                    AI Suggestion
                  </Typography>
                </Box>
                <Typography variant="body2" color="text.secondary">
                  Consider adding maintenance schedules and warranty information for better equipment tracking.
                </Typography>
              </CardContent>
            </Card>

            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Equipment Name"
                  value={newEquipment.name}
                  onChange={(e) => setNewEquipment({...newEquipment, name: e.target.value})}
                  size="small"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Model"
                  value={newEquipment.model}
                  onChange={(e) => setNewEquipment({...newEquipment, model: e.target.value})}
                  size="small"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Manufacturer"
                  value={newEquipment.manufacturer}
                  onChange={(e) => setNewEquipment({...newEquipment, manufacturer: e.target.value})}
                  size="small"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  select
                  label="Category"
                  value={newEquipment.category}
                  onChange={(e) => setNewEquipment({...newEquipment, category: e.target.value})}
                  size="small"
                >
                  {equipmentCategories.map(category => (
                    <MenuItem key={category} value={category}>{category}</MenuItem>
                  ))}
                </TextField>
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Department"
                  value={newEquipment.department}
                  onChange={(e) => setNewEquipment({...newEquipment, department: e.target.value})}
                  size="small"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Serial Number"
                  value={newEquipment.serialNumber}
                  onChange={(e) => setNewEquipment({...newEquipment, serialNumber: e.target.value})}
                  size="small"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Value ($)"
                  type="number"
                  value={newEquipment.value}
                  onChange={(e) => setNewEquipment({...newEquipment, value: e.target.value})}
                  size="small"
                />
              </Grid>
              <Grid item xs={12}>
                <Button 
                  variant="contained" 
                  onClick={handleAddEquipment}
                  fullWidth
                  sx={{ 
                    mt: 2,
                    py: 1.5,
                    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                    borderRadius: 2,
                    fontWeight: 700
                  }}
                >
                  Add Equipment
                </Button>
              </Grid>
            </Grid>
          </Box>
        </Fade>
      </Modal>

      <style jsx>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.5; }
        }
      `}</style>
    </Box>
  );
};

export default SurgicalEquipment;