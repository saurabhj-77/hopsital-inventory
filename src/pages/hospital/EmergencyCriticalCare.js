import React, { useState, useEffect, useRef } from 'react';
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
  Tabs,
  Tab,
  Fab,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions
} from '@mui/material';
import {
  Add as AddIcon,
  NotificationsActive as EmergencyIcon,
  PriorityHigh as CriticalIcon,
  LocalHospital as HospitalIcon,
  Warning as WarningIcon,
  Error as ErrorIcon,
  CheckCircle as CheckCircleIcon,
  CalendarToday as CalendarIcon,
  Biotech as BiotechIcon,
  Medication as MedicationIcon,
  Vaccine as VaccineIcon,
  Speed as SpeedIcon,
  Inventory as InventoryIcon,
  Close as CloseIcon,
  Search as SearchIcon,
  FilterList as FilterIcon,
  Download as DownloadIcon,
  Mic as MicIcon,
  Stop as StopIcon,
  SmartToy as AiIcon,
  PlayArrow as PlayIcon,
  VolumeUp as VolumeIcon,
  Refresh as RefreshIcon,
  TrendingUp as TrendingUpIcon,
  History as HistoryIcon,
  LocalShipping as ShippingIcon
} from '@mui/icons-material';

// AI Voice Agent Messages
const aiMessages = {
  emergency: [
    "🆘 Critical Alert: Ventilator stock in ICU is at 15% capacity. Immediate restocking required within 24 hours.",
    "⚠️ Emergency Department: Trauma kits consumption increased by 45% this week. Consider increasing stock levels.",
    "🚨 ICU Monitoring: Patient monitors showing 92% utilization. Two units scheduled for maintenance next week.",
    "💊 Medication Alert: Emergency medications stock optimal. Epinephrine supply needs review in 3 days.",
    "🔬 Equipment Status: All critical care equipment operational. Defibrillator maintenance due in 5 days."
  ],
  inventory: [
    "📊 Inventory Summary: 87% of critical care items are well-stocked. 6 items require immediate attention.",
    "🔄 Restock Needed: IV pumps inventory at 22%. Supplier delivery expected in 2 days.",
    "📈 Usage Trends: Emergency department consumption patterns show 30% increase in weekend usage.",
    "🔔 Maintenance Alerts: 3 pieces of equipment require scheduled maintenance this week.",
    "💰 Cost Analysis: Critical care inventory value at $284,500. 12% increase from last month."
  ],
  recommendations: [
    "🤖 AI Recommendation: Increase ventilator backup stock by 20% based on usage patterns.",
    "📋 Suggestion: Schedule preventive maintenance for all ICU monitors next quarter.",
    "🛒 Order Advice: Place emergency order for surgical gloves - current stock depleting faster than expected.",
    "📊 Predictive Alert: Based on trends, expect increased demand for oxygen masks in upcoming month.",
    "⚡ Optimization: Consider redistributing emergency crash carts between ER and ICU for better accessibility."
  ]
};

// Emergency & Critical Care Data
const initialData = {
  criticalItems: [
    {
      id: 1,
      name: 'Ventilators',
      category: 'Life Support',
      stock: 8,
      minStock: 12,
      currentUsage: 15,
      status: 'Critical',
      department: 'ICU',
      lastMaintenance: '2024-01-10',
      nextMaintenance: '2024-04-10',
      value: 45000,
      usageRate: '95%',
      alertLevel: 'High'
    },
    {
      id: 2,
      name: 'Defibrillators',
      category: 'Emergency',
      stock: 6,
      minStock: 8,
      currentUsage: 6,
      status: 'Low Stock',
      department: 'ER',
      lastMaintenance: '2024-01-12',
      nextMaintenance: '2024-04-12',
      value: 18000,
      usageRate: '88%',
      alertLevel: 'Medium'
    },
    {
      id: 3,
      name: 'Patient Monitors',
      category: 'Monitoring',
      stock: 22,
      minStock: 25,
      currentUsage: 20,
      status: 'Adequate',
      department: 'ICU/ER',
      lastMaintenance: '2024-01-08',
      nextMaintenance: '2024-04-08',
      value: 22000,
      usageRate: '91%',
      alertLevel: 'Low'
    },
    {
      id: 4,
      name: 'IV Pumps',
      category: 'Therapeutic',
      stock: 35,
      minStock: 40,
      currentUsage: 32,
      status: 'Adequate',
      department: 'ICU',
      lastMaintenance: '2024-01-15',
      nextMaintenance: '2024-04-15',
      value: 12000,
      usageRate: '85%',
      alertLevel: 'Low'
    },
    {
      id: 5,
      name: 'Emergency Crash Carts',
      category: 'Emergency',
      stock: 12,
      minStock: 15,
      currentUsage: 11,
      status: 'Low Stock',
      department: 'ER',
      lastMaintenance: '2024-01-05',
      nextMaintenance: '2024-04-05',
      value: 8500,
      usageRate: '92%',
      alertLevel: 'Medium'
    },
    {
      id: 6,
      name: 'Oxygen Concentrators',
      category: 'Respiratory',
      stock: 18,
      minStock: 20,
      currentUsage: 16,
      status: 'Adequate',
      department: 'ICU/ER',
      lastMaintenance: '2024-01-14',
      nextMaintenance: '2024-04-14',
      value: 15000,
      usageRate: '89%',
      alertLevel: 'Low'
    }
  ],
  emergencyAlerts: [
    {
      id: 1,
      type: 'Critical',
      message: 'Ventilator stock below minimum threshold',
      item: 'Ventilators',
      department: 'ICU',
      timestamp: '2 hours ago',
      priority: 'High'
    },
    {
      id: 2,
      type: 'Maintenance',
      message: 'Defibrillator maintenance overdue',
      item: 'Defibrillators',
      department: 'ER',
      timestamp: '5 hours ago',
      priority: 'High'
    },
    {
      id: 3,
      type: 'Stock',
      message: 'Emergency medication stock running low',
      item: 'Epinephrine',
      department: 'ER',
      timestamp: '1 day ago',
      priority: 'Medium'
    },
    {
      id: 4,
      type: 'Equipment',
      message: 'Patient monitor needs calibration',
      item: 'Patient Monitors',
      department: 'ICU',
      timestamp: '2 days ago',
      priority: 'Medium'
    }
  ],
  liveStats: {
    icuBedOccupancy: '94%',
    erWaitTime: '12min',
    criticalPatients: 8,
    availableVentilators: 2,
    emergencyCases: 15
  },
  aiRecommendations: [
    {
      id: 1,
      type: 'Restock',
      message: 'Order 4 additional ventilators for ICU',
      priority: 'Critical',
      impact: 'High',
      estimatedCost: 180000,
      timeline: '48 hours'
    },
    {
      id: 2,
      type: 'Maintenance',
      message: 'Schedule preventive maintenance for all defibrillators',
      priority: 'High',
      impact: 'Medium',
      estimatedCost: 5000,
      timeline: '1 week'
    },
    {
      id: 3,
      type: 'Optimization',
      message: 'Redistribute emergency crash carts between departments',
      priority: 'Medium',
      impact: 'High',
      estimatedCost: 0,
      timeline: '24 hours'
    }
  ]
};

const EmergencyCriticalCare = () => {
  const [data, setData] = useState(initialData);
  const [selectedItem, setSelectedItem] = useState(null);
  const [detailModalOpen, setDetailModalOpen] = useState(false);
  const [addModalOpen, setAddModalOpen] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [departmentFilter, setDepartmentFilter] = useState('All');
  const [statusFilter, setStatusFilter] = useState('All');
  const [activeTab, setActiveTab] = useState(0);
  
  // AI Voice Agent State
  const [aiListening, setAiListening] = useState(false);
  const [aiSpeaking, setAiSpeaking] = useState(false);
  const [aiMessage, setAiMessage] = useState('');
  const [aiDialogOpen, setAiDialogOpen] = useState(false);
  const [currentAiCategory, setCurrentAiCategory] = useState('emergency');

  const speechSynth = useRef(null);
  const recognition = useRef(null);

  useEffect(() => {
    const timer = setTimeout(() => setLoaded(true), 400);
    
    // Initialize speech synthesis
    speechSynth.current = window.speechSynthesis;
    
    // Initialize speech recognition
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      recognition.current = new SpeechRecognition();
      recognition.current.continuous = false;
      recognition.current.interimResults = false;
      
      recognition.current.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        handleVoiceCommand(transcript);
      };
      
      recognition.current.onend = () => {
        setAiListening(false);
      };
    }
    
    return () => clearTimeout(timer);
  }, []);

  const handleVoiceCommand = (command) => {
    const lowerCommand = command.toLowerCase();
    let response = '';
    
    if (lowerCommand.includes('stock') || lowerCommand.includes('inventory')) {
      response = aiMessages.inventory[Math.floor(Math.random() * aiMessages.inventory.length)];
      setCurrentAiCategory('inventory');
    } else if (lowerCommand.includes('recommend') || lowerCommand.includes('suggestion')) {
      response = aiMessages.recommendations[Math.floor(Math.random() * aiMessages.recommendations.length)];
      setCurrentAiCategory('recommendations');
    } else {
      response = aiMessages.emergency[Math.floor(Math.random() * aiMessages.emergency.length)];
      setCurrentAiCategory('emergency');
    }
    
    speakAiMessage(response);
  };

  const startListening = () => {
    if (recognition.current) {
      setAiListening(true);
      recognition.current.start();
    }
  };

  const stopListening = () => {
    if (recognition.current) {
      setAiListening(false);
      recognition.current.stop();
    }
  };

  const speakAiMessage = (message) => {
    if (speechSynth.current.speaking) {
      speechSynth.current.cancel();
    }
    
    setAiMessage(message);
    setAiSpeaking(true);
    
    const utterance = new SpeechSynthesisUtterance(message);
    utterance.rate = 0.9;
    utterance.pitch = 1;
    utterance.volume = 0.8;
    
    utterance.onend = () => {
      setAiSpeaking(false);
    };
    
    speechSynth.current.speak(utterance);
  };

  const stopSpeaking = () => {
    if (speechSynth.current.speaking) {
      speechSynth.current.cancel();
      setAiSpeaking(false);
    }
  };

  const getRandomAiMessage = (category = 'emergency') => {
    const messages = aiMessages[category];
    return messages[Math.floor(Math.random() * messages.length)];
  };

  const handleItemClick = (item) => {
    setSelectedItem(item);
    setDetailModalOpen(true);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Critical': return '#EF4444';
      case 'Low Stock': return '#F59E0B';
      case 'Adequate': return '#10B981';
      default: return '#6B7280';
    }
  };

  const getAlertLevelColor = (level) => {
    switch (level) {
      case 'High': return '#EF4444';
      case 'Medium': return '#F59E0B';
      case 'Low': return '#10B981';
      default: return '#6B7280';
    }
  };

const StatCard = ({ title, value, subtitle, icon, color, gradient, delay = 0 }) => (
  <Grow in={loaded} timeout={500 + delay}>
    <Card
      sx={{
        background: gradient,
        color: 'black',
        borderRadius: 3,
        height: '100%', // Ensures uniform height in Grid layout
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        transition: 'all 0.3s ease',
        '&:hover': {
          transform: 'translateY(-4px)',
          boxShadow: `0 12px 24px ${alpha(color, 0.3)}`
        }
      }}
    >
      <CardContent
        sx={{
          p: 3,
          flexGrow: 1,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          minHeight: 180, // 🔹 Adjust this to control card height
        }}
      >
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-start'
          }}
        >
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
          <Box
            sx={{
              background: 'rgba(255,255,255,0.2)',
              borderRadius: 2,
              p: 1,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              minWidth: 48,
              minHeight: 48
            }}
          >
            {icon}
          </Box>
        </Box>
      </CardContent>
    </Card>
  </Grow>
);


  const CriticalItemCard = ({ item, index }) => {
    const statusColor = getStatusColor(item.status);
    const alertColor = getAlertLevelColor(item.alertLevel);

    return (
      <Grow in={loaded} timeout={500 + index * 100}>
        <Card
          sx={{
            cursor: 'pointer',
            transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
            '&:hover': {
              transform: 'translateY(-8px)',
              boxShadow: `0 16px 32px ${alpha(statusColor, 0.2)}`,
              border: `2px solid ${alpha(statusColor, 0.3)}`
            },
            border: `1px solid ${alpha(statusColor, 0.2)}`,
            borderRadius: 3,
            overflow: 'hidden',
            position: 'relative'
          }}
          onClick={() => handleItemClick(item)}
        >
          <CardContent sx={{ p: 3 }}>
            {/* Header */}
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                <Avatar sx={{ 
                  bgcolor: alpha(statusColor, 0.1), 
                  color: statusColor 
                }}>
                  <EmergencyIcon />
                </Avatar>
                <Box>
                  <Typography variant="h6" fontWeight="700" color="#1E293B">
                    {item.name}
                  </Typography>
                  <Typography variant="body2" color="#64748B" sx={{ fontWeight: 500 }}>
                    {item.category} • {item.department}
                  </Typography>
                </Box>
              </Box>
              <Chip
                label={item.status}
                size="small"
                sx={{
                  backgroundColor: alpha(statusColor, 0.1),
                  color: statusColor,
                  fontWeight: 600,
                  border: `1px solid ${statusColor}`
                }}
              />
            </Box>

            {/* Stock Information */}
            <Box sx={{ mb: 2 }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                <Typography variant="body2" fontWeight="600" color="#64748B">
                  Stock Level
                </Typography>
                <Typography variant="body2" fontWeight="700" color={statusColor}>
                  {item.stock} / {item.minStock}
                </Typography>
              </Box>
              <LinearProgress 
                variant="determinate" 
                value={Math.min((item.stock / item.minStock) * 100, 100)} 
                sx={{ 
                  height: 6, 
                  borderRadius: 3,
                  backgroundColor: alpha(statusColor, 0.2),
                  '& .MuiLinearProgress-bar': {
                    backgroundColor: statusColor
                  }
                }}
              />
            </Box>

            {/* Usage & Maintenance */}
            <Grid container spacing={2} sx={{ mb: 2 }}>
              <Grid item xs={6}>
                <Box>
                  <Typography variant="caption" color="#64748B">
                    Current Usage
                  </Typography>
                  <Typography variant="body2" fontWeight="600" color="#3B82F6">
                    {item.currentUsage} units
                  </Typography>
                </Box>
              </Grid>
              <Grid item xs={6}>
                <Box>
                  <Typography variant="caption" color="#64748B">
                    Usage Rate
                  </Typography>
                  <Typography variant="body2" fontWeight="600" color="#8B5CF6">
                    {item.usageRate}
                  </Typography>
                </Box>
              </Grid>
            </Grid>

            {/* Alert Level & Value */}
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Chip
                label={`Alert: ${item.alertLevel}`}
                size="small"
                sx={{
                  backgroundColor: alpha(alertColor, 0.1),
                  color: alertColor,
                  fontWeight: 600
                }}
              />
              <Typography variant="body2" fontWeight="700" color="#10B981">
                ${item.value.toLocaleString()}
              </Typography>
            </Box>
          </CardContent>

          {/* Critical Alert Badge */}
          {item.alertLevel === 'High' && (
            <Box
              sx={{
                position: 'absolute',
                top: 12,
                right: 12,
                width: 8,
                height: 8,
                borderRadius: '50%',
                backgroundColor: alertColor,
                animation: 'pulse 1s infinite'
              }}
            />
          )}
        </Card>
      </Grow>
    );
  };

  const AIAgentDialog = () => (
    <Dialog 
      open={aiDialogOpen} 
      onClose={() => setAiDialogOpen(false)}
      maxWidth="sm"
      fullWidth
    >
      <DialogTitle>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <AiIcon sx={{ color: '#667eea' }} />
          <Typography variant="h6" fontWeight="700">
            Hospital Inventory AI Assistant
          </Typography>
        </Box>
      </DialogTitle>
      <DialogContent>
        <Box sx={{ textAlign: 'center', py: 2 }}>
          <Avatar sx={{ 
            width: 80, 
            height: 80, 
            margin: '0 auto 16px',
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
          }}>
            <AiIcon sx={{ fontSize: 40 }} />
          </Avatar>
          
          {aiMessage && (
            <Paper sx={{ p: 2, mb: 2, background: alpha('#667eea', 0.05) }}>
              <Typography variant="body1" sx={{ fontStyle: 'italic' }}>
                "{aiMessage}"
              </Typography>
            </Paper>
          )}

          <Box sx={{ display: 'flex', gap: 1, justifyContent: 'center', mb: 2 }}>
            <Button
              variant="outlined"
              onClick={() => speakAiMessage(getRandomAiMessage('emergency'))}
              startIcon={<EmergencyIcon />}
            >
              Emergency Update
            </Button>
            <Button
              variant="outlined"
              onClick={() => speakAiMessage(getRandomAiMessage('inventory'))}
              startIcon={<InventoryIcon />}
            >
              Inventory Report
            </Button>
            <Button
              variant="outlined"
              onClick={() => speakAiMessage(getRandomAiMessage('recommendations'))}
              startIcon={<TrendingUpIcon />}
            >
              AI Recommendations
            </Button>
          </Box>

          <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center', alignItems: 'center' }}>
            <Button
              variant="contained"
              startIcon={aiListening ? <StopIcon /> : <MicIcon />}
              onClick={aiListening ? stopListening : startListening}
              color={aiListening ? 'error' : 'primary'}
            >
              {aiListening ? 'Stop Listening' : 'Voice Command'}
            </Button>
            
            {aiSpeaking && (
              <Button
                variant="outlined"
                startIcon={<StopIcon />}
                onClick={stopSpeaking}
                color="secondary"
              >
                Stop Speaking
              </Button>
            )}
          </Box>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={() => setAiDialogOpen(false)}>Close</Button>
      </DialogActions>
    </Dialog>
  );

  return (
    <Box sx={{ p: 4, minHeight: '100vh', background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)', position: 'relative' }}>
      {/* AI Voice Agent Fab */}
      <Tooltip title="AI Inventory Assistant" arrow>
        <Fab
          color="primary"
          sx={{
            position: 'fixed',
            bottom: 24,
            right: 24,
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            '&:hover': {
              background: 'linear-gradient(135deg, #764ba2 0%, #667eea 100%)',
              transform: 'scale(1.1)'
            },
            transition: 'all 0.3s ease',
            zIndex: 1000
          }}
          onClick={() => setAiDialogOpen(true)}
        >
          {aiSpeaking ? <VolumeIcon /> : <AiIcon />}
        </Fab>
      </Tooltip>

      {/* Header */}
      <Box sx={{ mb: 4 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 3 }}>
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
               Emergency & Critical Care
            </Typography>
            <Typography variant="body1" color="text.secondary" sx={{ fontWeight: 600, mb: 1 }}>
              Real-time monitoring and management of ICU/ER critical equipment and supplies
            </Typography>
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
            Add Critical Item
          </Button>
        </Box>

        {/* Live Stats Cards */}
        <Grid container spacing={3} sx={{ mb: 4 }}>
          <Grid item xs={12} sm={6} md={2.4}>
            <StatCard
              title="ICU Occupancy"
              value={data.liveStats.icuBedOccupancy}
              subtitle="Bed utilization"
              icon={<HospitalIcon sx={{ color: 'black', fontSize: 28 }} />}
              color="#EF4444"
              gradient="linear-gradient(135deg, #EF4444 0%, #DC2626 100%)"
            />
          </Grid>
          <Grid item xs={12} sm={6} md={2.4}>
            <StatCard
              title="ER Wait Time"
              value={data.liveStats.erWaitTime}
              subtitle="Average waiting"
              icon={<SpeedIcon sx={{ color: 'black', fontSize: 28 }} />}
              color="#F59E0B"
              gradient="linear-gradient(135deg, #F59E0B 0%, #D97706 100%)"
              delay={200}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={2.4}>
            <StatCard
              title="Critical Patients"
              value={data.liveStats.criticalPatients}
              subtitle="In intensive care"
              icon={<CriticalIcon sx={{ color: 'black', fontSize: 28 }} />}
              color="#8B5CF6"
              gradient="linear-gradient(135deg, #8B5CF6 0%, #7C3AED 100%)"
              delay={400}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={2.4}>
            <StatCard
              title="Available Ventilators"
              value={data.liveStats.availableVentilators}
              subtitle="Ready for use"
              icon={<EmergencyIcon sx={{ color: 'black', fontSize: 28 }} />}
              color="#10B981"
              gradient="linear-gradient(135deg, #10B981 0%, #059669 100%)"
              delay={600}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={2.4}>
            <StatCard
              title="Emergency Cases"
              value={data.liveStats.emergencyCases}
              subtitle="Today's cases"
              icon={<WarningIcon sx={{ color: 'black', fontSize: 28 }} />}
              color="#3B82F6"
              gradient="linear-gradient(135deg, #3B82F6 0%, #1D4ED8 100%)"
              delay={800}
            />
          </Grid>
        </Grid>

        {/* Emergency Alerts */}
        <Card sx={{ mb: 3, border: '2px solid #EF4444', background: alpha('#EF4444', 0.05) }}>
          <CardContent sx={{ p: 3 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
              <WarningIcon sx={{ color: '#EF4444', fontSize: 32 }} />
              <Typography variant="h5" fontWeight="800" color="#1E293B">
                Emergency Alerts
              </Typography>
            </Box>
            <Grid container spacing={2}>
              {data.emergencyAlerts.map((alert) => (
                <Grid item xs={12} sm={6} md={3} key={alert.id}>
                  <Paper sx={{ 
                    p: 2, 
                    background: alpha(getAlertLevelColor(alert.priority), 0.1),
                    border: `1px solid ${alpha(getAlertLevelColor(alert.priority), 0.3)}`,
                    borderRadius: 2
                  }}>
                    <Typography variant="h6" fontWeight="700" color="#1E293B" gutterBottom>
                      {alert.item}
                    </Typography>
                    <Typography variant="body2" color="#64748B" sx={{ display: 'block', mb: 1 }}>
                      {alert.message}
                    </Typography>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <Chip
                        label={alert.priority}
                        size="small"
                        sx={{
                          backgroundColor: alpha(getAlertLevelColor(alert.priority), 0.2),
                          color: getAlertLevelColor(alert.priority),
                          fontWeight: 600
                        }}
                      />
                      <Typography variant="body2" color="#64748B">
                        {alert.timestamp}
                      </Typography>
                    </Box>
                  </Paper>
                </Grid>
              ))}
            </Grid>
          </CardContent>
        </Card>

        {/* Filters */}
        <Paper sx={{ p: 2, mb: 3, background: 'rgba(255, 255, 255, 0.9)' }}>
          <Grid container spacing={2} alignItems="center">
            <Grid item xs={12} sm={4}>
              <TextField
                fullWidth
                placeholder="Search critical items..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                size="small"
                InputProps={{
                  startAdornment: <SearchIcon sx={{ color: 'text.secondary', mr: 1 }} />
                }}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                fullWidth
                select
                label="Department"
                value={departmentFilter}
                onChange={(e) => setDepartmentFilter(e.target.value)}
                size="small"
              >
                <MenuItem value="All">All Departments</MenuItem>
                <MenuItem value="ICU">ICU</MenuItem>
                <MenuItem value="ER">Emergency Room</MenuItem>
                <MenuItem value="ICU/ER">Both</MenuItem>
              </TextField>
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                fullWidth
                select
                label="Status"
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                size="small"
              >
                <MenuItem value="All">All Status</MenuItem>
                <MenuItem value="Critical">Critical</MenuItem>
                <MenuItem value="Low Stock">Low Stock</MenuItem>
                <MenuItem value="Adequate">Adequate</MenuItem>
              </TextField>
            </Grid>
          </Grid>
        </Paper>
      </Box>

      <Grid container spacing={4}>
        {/* Critical Items Grid */}
        <Grid item xs={12} lg={8}>
          <Typography variant="h4" fontWeight="800" color="#1E293B" gutterBottom>
            Critical Care Inventory
          </Typography>
          <Grid container spacing={3}>
            {data.criticalItems.map((item, index) => (
              <Grid item xs={12} sm={4} md={4} key={item.id}>
                <CriticalItemCard item={item} index={index} />
              </Grid>
            ))}
          </Grid>
        </Grid>

        {/* AI Recommendations Sidebar */}
        <Grid item xs={12} lg={4}>
          <Card sx={{ mb: 3 }}>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 3 }}>
                <AiIcon sx={{ color: '#667eea', fontSize: 28 }} />
                <Typography variant="h5" fontWeight="800" color="#1E293B">
                  AI Recommendations
                </Typography>
              </Box>
              <List>
                {data.aiRecommendations.map((recommendation) => (
                  <ListItem key={recommendation.id} sx={{ 
                    border: `1px solid ${alpha(getAlertLevelColor(recommendation.priority), 0.2)}`,
                    borderRadius: 2,
                    mb: 1,
                    background: alpha(getAlertLevelColor(recommendation.priority), 0.05)
                  }}>
                    <ListItemIcon>
                      <TrendingUpIcon sx={{ color: getAlertLevelColor(recommendation.priority) }} />
                    </ListItemIcon>
                    <ListItemText 
                      primary={recommendation.message}
                      secondary={
                        <Box sx={{ mt: 1 }}>
                          <Typography variant="caption" display="block">
                            Impact: {recommendation.impact} • Timeline: {recommendation.timeline}
                          </Typography>
                          {recommendation.estimatedCost > 0 && (
                            <Typography variant="caption" color="#10B981" fontWeight="600">
                              Estimated Cost: ${recommendation.estimatedCost.toLocaleString()}
                            </Typography>
                          )}
                        </Box>
                      }
                      primaryTypographyProps={{ fontWeight: 600, fontSize: '0.9rem' }}
                    />
                  </ListItem>
                ))}
              </List>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card>
            <CardContent>
              <Typography variant="h6" fontWeight="700" color="#1E293B" gutterBottom>
                Quick Actions
              </Typography>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                <Button
                  variant="outlined"
                  startIcon={<EmergencyIcon />}
                  onClick={() => speakAiMessage(getRandomAiMessage('emergency'))}
                >
                  Emergency Report
                </Button>
                <Button
                  variant="outlined"
                  startIcon={<InventoryIcon />}
                  onClick={() => speakAiMessage(getRandomAiMessage('inventory'))}
                >
                  Inventory Summary
                </Button>
                <Button
                  variant="outlined"
                  startIcon={<ShippingIcon />}
                >
                  Order Supplies
                </Button>
                <Button
                  variant="outlined"
                  startIcon={<HistoryIcon />}
                >
                  Maintenance Log
                </Button>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* AI Agent Dialog */}
      <AIAgentDialog />

      {/* Detail Modal */}
      <Modal open={detailModalOpen} onClose={() => setDetailModalOpen(false)}>
        <Fade in={detailModalOpen}>
          <Box sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: { xs: '95%', sm: 600 },
            maxHeight: '90vh',
            overflow: 'auto',
            bgcolor: 'background.paper',
            borderRadius: 3,
            boxShadow: 24,
            p: 4
          }}>
            {selectedItem && (
              <Box>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 3 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    <Avatar sx={{ 
                      bgcolor: alpha(getStatusColor(selectedItem.status), 0.1), 
                      color: getStatusColor(selectedItem.status),
                      width: 60,
                      height: 60
                    }}>
                      <EmergencyIcon />
                    </Avatar>
                    <Box>
                      <Typography variant="h4" fontWeight="800" color="#1E293B">
                        {selectedItem.name}
                      </Typography>
                      <Typography variant="body1" color="#64748B" sx={{ fontWeight: 500 }}>
                        {selectedItem.category} • {selectedItem.department}
                      </Typography>
                    </Box>
                  </Box>
                  <IconButton onClick={() => setDetailModalOpen(false)}>
                    <CloseIcon />
                  </IconButton>
                </Box>

                <Grid container spacing={3}>
                  <Grid item xs={12} sm={6}>
                    <Paper sx={{ p: 2, background: '#f8f9fa', borderRadius: 2 }}>
                      <Typography variant="h6" fontWeight="700" color="#1E293B" gutterBottom>
                        Stock Information
                      </Typography>
                      <List>
                        <ListItem>
                          <ListItemText 
                            primary="Current Stock" 
                            secondary={selectedItem.stock}
                            primaryTypographyProps={{ fontWeight: 600 }}
                          />
                        </ListItem>
                        <ListItem>
                          <ListItemText 
                            primary="Minimum Required" 
                            secondary={selectedItem.minStock}
                            primaryTypographyProps={{ fontWeight: 600 }}
                          />
                        </ListItem>
                        <ListItem>
                          <ListItemText 
                            primary="Current Usage" 
                            secondary={`${selectedItem.currentUsage} units`}
                            primaryTypographyProps={{ fontWeight: 600 }}
                          />
                        </ListItem>
                      </List>
                    </Paper>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Paper sx={{ p: 2, background: '#f8f9fa', borderRadius: 2 }}>
                      <Typography variant="h6" fontWeight="700" color="#1E293B" gutterBottom>
                        Maintenance
                      </Typography>
                      <List>
                        <ListItem>
                          <ListItemText 
                            primary="Last Maintenance" 
                            secondary={new Date(selectedItem.lastMaintenance).toLocaleDateString()}
                            primaryTypographyProps={{ fontWeight: 600 }}
                          />
                        </ListItem>
                        <ListItem>
                          <ListItemText 
                            primary="Next Maintenance" 
                            secondary={new Date(selectedItem.nextMaintenance).toLocaleDateString()}
                            primaryTypographyProps={{ fontWeight: 600 }}
                          />
                        </ListItem>
                        <ListItem>
                          <ListItemText 
                            primary="Usage Rate" 
                            secondary={selectedItem.usageRate}
                            primaryTypographyProps={{ fontWeight: 600 }}
                          />
                        </ListItem>
                      </List>
                    </Paper>
                  </Grid>
                </Grid>
              </Box>
            )}
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

export default EmergencyCriticalCare;