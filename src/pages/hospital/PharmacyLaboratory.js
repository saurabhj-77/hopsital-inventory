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
  Tabs,
  Tab,
  FormControlLabel,
  Switch,
  Fab,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  CircularProgress
} from '@mui/material';
import {
  Add as AddIcon,
  LocalPharmacy as PharmacyIcon,
  Science as LabIcon,
  Warning as WarningIcon,
  Error as ErrorIcon,
  CheckCircle as CheckCircleIcon,
  CalendarToday as CalendarIcon,
  Biotech as BiotechIcon,
  Medication as MedicationIcon,
  Vaccine as VaccineIcon,
  Bloodtype as BloodtypeIcon,
  NotificationsActive as TestTubeIcon,
  Analytics as AnalyticsIcon,
  TrendingUp as TrendingUpIcon,
  Inventory as InventoryIcon,
  Close as CloseIcon,
  Search as SearchIcon,
  FilterList as FilterIcon,
  Download as DownloadIcon,
  QrCode2 as QRIcon,
  History as HistoryIcon,
  Speed as SpeedIcon,
  LocalHospital as HospitalIcon,
  Mic as MicIcon,
  Stop as StopIcon,
  SmartToy as AIIcon,
  VolumeUp as VolumeUpIcon,
  AutoAwesome as AutoAwesomeIcon
} from '@mui/icons-material';

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

// Pharmacy & Laboratory Data
const initialData = {
  pharmacy: {
    medications: [
      {
        id: 1,
        name: 'Paracetamol 500mg',
        category: 'Analgesic',
        stock: 1250,
        minStock: 500,
        expiryDate: '2025-06-15',
        batch: 'BATCH-PC-001',
        supplier: 'MedSupply Pharma',
        unitCost: 0.25,
        usageRate: 'High',
        status: 'In Stock',
        lastRestocked: '2024-01-10'
      },
      {
        id: 2,
        name: 'Amoxicillin 250mg',
        category: 'Antibiotic',
        stock: 320,
        minStock: 200,
        expiryDate: '2024-09-30',
        batch: 'BATCH-AM-002',
        supplier: 'Global Pharma',
        unitCost: 0.45,
        usageRate: 'Medium',
        status: 'In Stock',
        lastRestocked: '2024-01-12'
      },
      {
        id: 3,
        name: 'Insulin Vials',
        category: 'Hormone',
        stock: 45,
        minStock: 100,
        expiryDate: '2024-04-20',
        batch: 'BATCH-IN-003',
        supplier: 'Diabetic Care Inc',
        unitCost: 25.00,
        usageRate: 'Critical',
        status: 'Low Stock',
        lastRestocked: '2024-01-05'
      },
      {
        id: 4,
        name: 'Morphine 10mg',
        category: 'Narcotic',
        stock: 85,
        minStock: 50,
        expiryDate: '2025-12-31',
        batch: 'BATCH-MO-004',
        supplier: 'Controlled Pharma',
        unitCost: 8.50,
        usageRate: 'Medium',
        status: 'In Stock',
        lastRestocked: '2024-01-08'
      }
    ],
    expired: [
      {
        id: 1,
        name: 'Vitamin D3',
        expiryDate: '2024-01-13',
        daysAgo: 2,
        batch: 'BATCH-VD-001',
        quantity: 50,
        value: 150
      }
    ],
    lowStock: [
      {
        id: 1,
        name: 'Insulin Vials',
        currentStock: 45,
        minStock: 100,
        daysToStockout: 7,
        urgency: 'Critical'
      },
      {
        id: 2,
        name: 'Saline Solution',
        currentStock: 120,
        minStock: 300,
        daysToStockout: 14,
        urgency: 'High'
      }
    ]
  },
  laboratory: {
    reagents: [
      {
        id: 1,
        name: 'Blood Test Strips',
        category: 'Hematology',
        stock: 150,
        minStock: 200,
        expiryDate: '2024-08-15',
        batch: 'BATCH-BT-001',
        supplier: 'LabTech Supplies',
        unitCost: 2.50,
        usageRate: 'High',
        status: 'Low Stock',
        lastRestocked: '2024-01-09'
      },
      {
        id: 2,
        name: 'COVID-19 Test Kits',
        category: 'Virology',
        stock: 500,
        minStock: 300,
        expiryDate: '2024-11-30',
        batch: 'BATCH-CV-002',
        supplier: 'BioTest Corp',
        unitCost: 8.75,
        usageRate: 'Medium',
        status: 'In Stock',
        lastRestocked: '2024-01-14'
      },
      {
        id: 3,
        name: 'Urine Test Strips',
        category: 'Biochemistry',
        stock: 800,
        minStock: 400,
        expiryDate: '2025-03-20',
        batch: 'BATCH-UT-003',
        supplier: 'Diagnostic Labs',
        unitCost: 1.20,
        usageRate: 'High',
        status: 'In Stock',
        lastRestocked: '2024-01-11'
      }
    ],
    equipment: [
      {
        id: 1,
        name: 'Centrifuge',
        status: 'Operational',
        lastMaintenance: '2024-01-10',
        nextMaintenance: '2024-04-10',
        department: 'Hematology',
        usage: '85%'
      },
      {
        id: 2,
        name: 'Blood Analyzer',
        status: 'Maintenance',
        lastMaintenance: '2024-01-08',
        nextMaintenance: '2024-01-22',
        department: 'Biochemistry',
        usage: '92%'
      },
      {
        id: 3,
        name: 'PCR Machine',
        status: 'Operational',
        lastMaintenance: '2024-01-05',
        nextMaintenance: '2024-07-05',
        department: 'Molecular Biology',
        usage: '78%'
      }
    ],
    pendingTests: [
      { id: 1, test: 'Complete Blood Count', patient: 'John Doe', priority: 'Routine', status: 'Processing' },
      { id: 2, test: 'COVID-19 PCR', patient: 'Jane Smith', priority: 'Urgent', status: 'Pending' },
      { id: 3, test: 'Liver Function Test', patient: 'Mike Johnson', priority: 'Routine', status: 'Completed' }
    ]
  },
  stats: {
    pharmacy: {
      totalMedications: 124,
      lowStock: 8,
      expired: 3,
      totalValue: 45200
    },
    laboratory: {
      totalReagents: 45,
      lowStock: 5,
      equipmentOperational: 12,
      pendingTests: 23
    }
  }
};

// AI Voice Agent Component - NEW ADDITION
const AIVoiceAgent = ({ onVoiceCommand, data, activeSection }) => {
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
        const currentData = data[activeSection];
        let response = "";

        if (activeSection === 'pharmacy') {
          const lowStockMeds = currentData.medications.filter(item => 
            item.status === 'Low Stock' || item.status === 'Critical'
          );
          const expiringSoon = currentData.medications.filter(item => {
            const expiry = new Date(item.expiryDate);
            const today = new Date();
            const diffTime = expiry - today;
            const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
            return diffDays <= 30 && diffDays > 0;
          });

          if (lowStockMeds.length > 0) {
            response = `Pharmacy Alert: ${lowStockMeds.length} medications are low stock including ${lowStockMeds.slice(0, 2).map(item => item.name).join(' and ')}. Urgent reordering needed.`;
          } else if (expiringSoon.length > 0) {
            response = `${expiringSoon.length} pharmacy items are expiring within 30 days. Check the expiry alerts section.`;
          } else {
            response = "Pharmacy inventory is well maintained. All medications are adequately stocked with no immediate expirations.";
          }
        } else {
          const lowStockReagents = currentData.reagents.filter(item => item.status === 'Low Stock');
          const equipmentIssues = currentData.equipment.filter(item => item.status !== 'Operational');
          
          if (lowStockReagents.length > 0) {
            response = `Laboratory Alert: ${lowStockReagents.length} reagents are low stock including ${lowStockReagents.slice(0, 2).map(item => item.name).join(' and ')}.`;
          } else if (equipmentIssues.length > 0) {
            response = `${equipmentIssues.length} laboratory equipment items need attention. Check equipment status.`;
          } else {
            response = "Laboratory operations are running smoothly. All reagents are stocked and equipment is operational.";
          }
        }

        const aiMessage = {
          type: 'ai', 
          message: response,
          action: 'status_check'
        };
        
        setConversation(prev => [
          ...prev,
          { type: 'user', message: `Check ${activeSection} status` },
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
        const currentData = data[activeSection];
        const lowStockItems = activeSection === 'pharmacy' ? 
          currentData.medications.filter(item => item.status === 'Low Stock' || item.status === 'Critical') :
          currentData.reagents.filter(item => item.status === 'Low Stock');
        
        response = `${activeSection === 'pharmacy' ? 'Pharmacy' : 'Laboratory'} has ${lowStockItems.length} low stock items: ${lowStockItems.map(item => `${item.name} (${item.stock} left)`).join(', ')}`;
        action = 'show_low_stock';
      } else if (command.toLowerCase().includes('expir') || command.toLowerCase().includes('expiring')) {
        const currentData = data[activeSection];
        const items = activeSection === 'pharmacy' ? currentData.medications : currentData.reagents;
        const expiring = items.filter(item => {
          const expiry = new Date(item.expiryDate);
          const today = new Date();
          const diffTime = expiry - today;
          const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
          return diffDays <= 30;
        });
        response = `There are ${expiring.length} ${activeSection === 'pharmacy' ? 'medications' : 'reagents'} expiring within 30 days. Check the expiry alerts.`;
        action = 'show_expiring';
      } else if (command.toLowerCase().includes('equipment') || command.toLowerCase().includes('machines')) {
        const equipmentIssues = data.laboratory.equipment.filter(item => item.status !== 'Operational');
        response = `Laboratory has ${equipmentIssues.length} equipment items needing attention: ${equipmentIssues.map(item => `${item.name} (${item.status})`).join(', ')}`;
        action = 'show_equipment';
      } else if (command.toLowerCase().includes('tests') || command.toLowerCase().includes('pending')) {
        const pendingTests = data.laboratory.pendingTests.filter(test => test.status !== 'Completed');
        response = `There are ${pendingTests.length} pending laboratory tests including ${pendingTests.slice(0, 2).map(test => test.test).join(' and ')}`;
        action = 'show_pending_tests';
      } else {
        response = `I can help you manage ${activeSection === 'pharmacy' ? 'pharmacy medications' : 'laboratory operations'}. Ask about low stock, expiring items, equipment status, or pending tests.`;
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
            {activeSection === 'pharmacy' ? 'Pharmacy' : 'Laboratory'} Assistant
          </Box>
        </DialogTitle>
        
        <DialogContent sx={{ p: 3 }}>
          {/* Conversation History */}
          <Box sx={{ mb: 3, maxHeight: '300px', overflow: 'auto' }}>
            {conversation.length === 0 ? (
              <Typography color="text.secondary" textAlign="center" sx={{ py: 4 }}>
                Ask me about {activeSection === 'pharmacy' ? 'medication stock, expiring drugs, or pharmacy alerts' : 'reagent inventory, equipment status, or pending tests'}. I'll speak the answers too!
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
                    <Typography variant="body2">
                      Analyzing {activeSection === 'pharmacy' ? 'pharmacy' : 'laboratory'} data...
                    </Typography>
                  </Box>
                </Card>
              </Box>
            )}
          </Box>

          {/* Quick Commands */}
          <Grid container spacing={1} sx={{ mb: 2 }}>
            {activeSection === 'pharmacy' ? (
              <>
                <Grid item xs={6}>
                  <Chip
                    label="Low stock meds"
                    onClick={() => handleTextCommand('low stock medications')}
                    variant="outlined"
                    sx={{ 
                      width: '100%',
                      cursor: 'pointer',
                      '&:hover': { background: 'rgba(102, 126, 234, 0.1)' }
                    }}
                  />
                </Grid>
                <Grid item xs={6}>
                  <Chip
                    label="Expiring items"
                    onClick={() => handleTextCommand('expiring medications')}
                    variant="outlined"
                    sx={{ 
                      width: '100%',
                      cursor: 'pointer',
                      '&:hover': { background: 'rgba(102, 126, 234, 0.1)' }
                    }}
                  />
                </Grid>
              </>
            ) : (
              <>
                <Grid item xs={6}>
                  <Chip
                    label="Equipment status"
                    onClick={() => handleTextCommand('laboratory equipment')}
                    variant="outlined"
                    sx={{ 
                      width: '100%',
                      cursor: 'pointer',
                      '&:hover': { background: 'rgba(102, 126, 234, 0.1)' }
                    }}
                  />
                </Grid>
                <Grid item xs={6}>
                  <Chip
                    label="Pending tests"
                    onClick={() => handleTextCommand('pending laboratory tests')}
                    variant="outlined"
                    sx={{ 
                      width: '100%',
                      cursor: 'pointer',
                      '&:hover': { background: 'rgba(102, 126, 234, 0.1)' }
                    }}
                  />
                </Grid>
              </>
            )}
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
            Try: "{activeSection === 'pharmacy' ? 'What medications are low stock?' : 'Show me equipment status'}"
          </Typography>
        </DialogActions>
      </Dialog>
    </>
  );
};

const PharmacyLaboratory = () => {
  const [data, setData] = useState(initialData);
  const [selectedItem, setSelectedItem] = useState(null);
  const [detailModalOpen, setDetailModalOpen] = useState(false);
  const [addModalOpen, setAddModalOpen] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('All');
  const [statusFilter, setStatusFilter] = useState('All');
  const [activeSection, setActiveSection] = useState('pharmacy');
  const [newItem, setNewItem] = useState({
    name: '',
    category: '',
    stock: '',
    minStock: '',
    expiryDate: '',
    batch: '',
    supplier: '',
    unitCost: ''
  });

  useEffect(() => {
    const timer = setTimeout(() => setLoaded(true), 400);
    return () => clearTimeout(timer);
  }, []);

  // NEW: AI Voice Command Handler
  const handleVoiceCommand = (command) => {
    if (command.action === 'show_low_stock') {
      setStatusFilter('Low Stock');
    } else if (command.action === 'show_expiring') {
      // Could implement expiring filter here
      console.log("Showing expiring items");
    } else if (command.action === 'show_equipment') {
      setActiveSection('laboratory');
    } else if (command.action === 'show_pending_tests') {
      setActiveSection('laboratory');
    }
  };

  // ALL ORIGINAL FUNCTIONS REMAIN UNCHANGED
  const handleItemClick = (item, type) => {
    setSelectedItem({ ...item, type });
    setDetailModalOpen(true);
  };

  const handleAddItem = () => {
    const newItemData = {
      id: data[activeSection].medications ? data[activeSection].medications.length + 1 : data[activeSection].reagents.length + 1,
      ...newItem,
      stock: parseInt(newItem.stock),
      minStock: parseInt(newItem.minStock),
      unitCost: parseFloat(newItem.unitCost),
      status: parseInt(newItem.stock) <= parseInt(newItem.minStock) ? 'Low Stock' : 'In Stock',
      lastRestocked: new Date().toISOString().split('T')[0],
      usageRate: 'Medium'
    };

    const sectionData = activeSection === 'pharmacy' ? 'medications' : 'reagents';
    setData(prev => ({
      ...prev,
      [activeSection]: {
        ...prev[activeSection],
        [sectionData]: [...prev[activeSection][sectionData], newItemData]
      }
    }));

    setAddModalOpen(false);
    setNewItem({
      name: '',
      category: '',
      stock: '',
      minStock: '',
      expiryDate: '',
      batch: '',
      supplier: '',
      unitCost: ''
    });
  };

  const getStockStatus = (stock, minStock) => {
    if (stock === 0) return { status: 'Out of Stock', color: '#EF4444' };
    if (stock <= minStock * 0.3) return { status: 'Critical', color: '#EF4444' };
    if (stock <= minStock * 0.6) return { status: 'Low Stock', color: '#F59E0B' };
    return { status: 'In Stock', color: '#10B981' };
  };

  const getDaysUntilExpiry = (expiryDate) => {
    const today = new Date();
    const expiry = new Date(expiryDate);
    const diffTime = expiry - today;
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  };

  const getExpiryStatus = (days) => {
    if (days < 0) return { status: 'Expired', color: '#EF4444' };
    if (days <= 30) return { status: 'Expiring Soon', color: '#F59E0B' };
    if (days <= 90) return { status: 'Near Expiry', color: '#3B82F6' };
    return { status: 'Valid', color: '#10B981' };
  };

  const StatCard = ({ title, value, subtitle, icon, color, gradient, delay = 0 }) => (
    <Grow in={loaded} timeout={500 + delay}>
      <Card sx={{ 
        background: gradient,
        color: 'black',
        borderRadius: 3,
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
          <AIIcon sx={{ fontSize: 14, opacity: 0.8 }} />
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
              color: 'black',
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

  const InventoryCard = ({ item, index, type }) => {
    const stockStatus = getStockStatus(item.stock, item.minStock);
    const daysUntilExpiry = getDaysUntilExpiry(item.expiryDate);
    const expiryStatus = getExpiryStatus(daysUntilExpiry);

    return (
      <Grow in={loaded} timeout={500 + index * 100}>
        <Card
          sx={{
            cursor: 'pointer',
            transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
            '&:hover': {
              transform: 'translateY(-8px)',
              boxShadow: `0 16px 32px ${alpha(stockStatus.color, 0.2)}`,
              border: `2px solid ${alpha(stockStatus.color, 0.3)}`
            },
            border: `1px solid ${alpha(stockStatus.color, 0.2)}`,
            borderRadius: 3,
            overflow: 'hidden',
            position: 'relative'
          }}
          onClick={() => handleItemClick(item, type)}
        >
          {/* NEW: AI Quick Action */}
          <Tooltip title={`Ask AI about ${item.name}`}>
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
                <Avatar sx={{ 
                  bgcolor: alpha(stockStatus.color, 0.1), 
                  color: stockStatus.color 
                }}>
                  {type === 'pharmacy' ? <MedicationIcon /> : <TestTubeIcon />}
                </Avatar>
                <Box>
                  <Typography variant="h6" fontWeight="700" color="#1E293B">
                    {item.name}
                  </Typography>
                  <Typography variant="body2" color="#64748B" sx={{ fontWeight: 500 }}>
                    {item.category} • {item.batch}
                  </Typography>
                </Box>
              </Box>
              <Chip
                label={stockStatus.status}
                size="small"
                sx={{
                  backgroundColor: alpha(stockStatus.color, 0.1),
                  color: stockStatus.color,
                  fontWeight: 600,
                  border: `1px solid ${stockStatus.color}`
                }}
              />
            </Box>

            {/* Stock Information */}
            <Box sx={{ mb: 2 }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                <Typography variant="body2" fontWeight="600" color="#64748B">
                  Stock Level
                </Typography>
                <Typography variant="body2" fontWeight="700" color={stockStatus.color}>
                  {item.stock} / {item.minStock}
                </Typography>
              </Box>
              <LinearProgress 
                variant="determinate" 
                value={Math.min((item.stock / item.minStock) * 100, 100)} 
                sx={{ 
                  height: 6, 
                  borderRadius: 3,
                  backgroundColor: alpha(stockStatus.color, 0.2),
                  '& .MuiLinearProgress-bar': {
                    backgroundColor: stockStatus.color
                  }
                }}
              />
            </Box>

            {/* Expiry & Supplier */}
            <Grid container spacing={2} sx={{ mb: 2 }}>
              <Grid item xs={6}>
                <Box>
                  <Typography variant="caption" color="#64748B">
                    Expiry
                  </Typography>
                  <Typography variant="body2" fontWeight="600" color={expiryStatus.color}>
                    {new Date(item.expiryDate).toLocaleDateString()}
                  </Typography>
                </Box>
              </Grid>
              <Grid item xs={6}>
                <Box>
                  <Typography variant="caption" color="#64748B">
                    Supplier
                  </Typography>
                  <Typography variant="body2" fontWeight="600" color="#1E293B">
                    {item.supplier}
                  </Typography>
                </Box>
              </Grid>
            </Grid>

            {/* Cost & Usage */}
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Box>
                <Typography variant="caption" color="#64748B">
                  Unit Cost
                </Typography>
                <Typography variant="body2" fontWeight="700" color="#10B981">
                  ${item.unitCost}
                </Typography>
              </Box>
              <Box sx={{ textAlign: 'right' }}>
                <Typography variant="caption" color="#64748B">
                  Usage
                </Typography>
                <Typography variant="body2" fontWeight="700" color="#3B82F6">
                  {item.usageRate}
                </Typography>
              </Box>
            </Box>
          </CardContent>

          {/* Expiry Warning Badge */}
          {daysUntilExpiry <= 30 && (
            <Box
              sx={{
                position: 'absolute',
                top: 12,
                right: 40, // Adjusted for AI button
                width: 8,
                height: 8,
                borderRadius: '50%',
                backgroundColor: expiryStatus.color,
                animation: 'pulse 2s infinite'
              }}
            />
          )}
        </Card>
      </Grow>
    );
  };

  const renderPharmacySection = () => (
    <Box>
      {/* Alert Cards */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} md={6}>
          <Card sx={{ 
            border: '2px solid #F59E0B', 
            background: alpha('#F59E0B', 0.05),
            position: 'relative',
            overflow: 'hidden'
          }}>
            {/* NEW: AI Alert Badge */}
            <Box
              sx={{
                position: 'absolute',
                top: 8,
                right: 8,
                background: 'rgba(102, 126, 234, 0.1)',
                borderRadius: 2,
                px: 1,
                py: 0.5
              }}
            >
              <AIIcon sx={{ fontSize: 14, color: '#667eea' }} />
            </Box>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
                <WarningIcon sx={{ color: '#F59E0B', fontSize: 32 }} />
                <Typography variant="h6" fontWeight="700">
                  Low Stock Alerts
                </Typography>
              </Box>
              <List>
                {data.pharmacy.lowStock.map((item, index) => (
                  <ListItem key={item.id} sx={{ px: 0 }}>
                    <ListItemIcon>
                      <InventoryIcon sx={{ color: '#F59E0B' }} />
                    </ListItemIcon>
                    <ListItemText 
                      primary={item.name}
                      secondary={`Stock: ${item.currentStock} (Min: ${item.minStock}) - ${item.daysToStockout} days remaining`}
                      primaryTypographyProps={{ fontWeight: 600 }}
                    />
                    <Chip 
                      label={item.urgency} 
                      size="small" 
                      color="warning"
                      sx={{ fontWeight: 600 }}
                    />
                  </ListItem>
                ))}
              </List>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={6}>
          <Card sx={{ 
            border: '2px solid #EF4444', 
            background: alpha('#EF4444', 0.05),
            position: 'relative',
            overflow: 'hidden'
          }}>
            {/* NEW: AI Alert Badge */}
            <Box
              sx={{
                position: 'absolute',
                top: 8,
                right: 8,
                background: 'rgba(102, 126, 234, 0.1)',
                borderRadius: 2,
                px: 1,
                py: 0.5
              }}
            >
              <AIIcon sx={{ fontSize: 14, color: '#667eea' }} />
            </Box>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
                <ErrorIcon sx={{ color: '#EF4444', fontSize: 32 }} />
                <Typography variant="h6" fontWeight="700">
                  Expired Items
                </Typography>
              </Box>
              <List>
                {data.pharmacy.expired.map((item) => (
                  <ListItem key={item.id} sx={{ px: 0 }}>
                    <ListItemIcon>
                      <CalendarIcon sx={{ color: '#EF4444' }} />
                    </ListItemIcon>
                    <ListItemText 
                      primary={item.name}
                      secondary={`Expired ${item.daysAgo} days ago - Batch: ${item.batch}`}
                      primaryTypographyProps={{ fontWeight: 600 }}
                    />
                    <Typography variant="body2" color="#EF4444" fontWeight="600">
                      ${item.value}
                    </Typography>
                  </ListItem>
                ))}
              </List>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Medications Grid */}
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 3 }}>
        <Typography variant="h5" fontWeight="800" color="#1E293B">
          Medications Inventory
        </Typography>
        <Tooltip title="AI Inventory Analysis">
          <Button
            startIcon={<AutoAwesomeIcon />}
            variant="outlined"
            size="small"
            sx={{
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
      <Grid container spacing={3}>
        {data.pharmacy.medications.map((item, index) => (
          <Grid item xs={12} sm={6} md={4} key={item.id}>
            <InventoryCard item={item} index={index} type="pharmacy" />
          </Grid>
        ))}
      </Grid>
    </Box>
  );

  const renderLaboratorySection = () => (
    <Box>
      <Grid container spacing={4}>
        {/* Reagents Inventory */}
        <Grid item xs={12} lg={8}>
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 3 }}>
            <Typography variant="h5" fontWeight="800" color="#1E293B">
              Laboratory Reagents
            </Typography>
            <Tooltip title="AI Reagent Analysis">
              <Button
                startIcon={<AutoAwesomeIcon />}
                variant="outlined"
                size="small"
                sx={{
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
          <Grid container spacing={3}>
            {data.laboratory.reagents.map((item, index) => (
              <Grid item xs={12} sm={6} md={4} key={item.id}>
                <InventoryCard item={item} index={index} type="laboratory" />
              </Grid>
            ))}
          </Grid>
        </Grid>

        {/* Lab Equipment & Tests */}
        <Grid item xs={12} lg={4}>
          {/* Equipment Status */}
          <Card sx={{ mb: 3, position: 'relative' }}>
            {/* NEW: AI Monitoring Badge */}
            <Box
              sx={{
                position: 'absolute',
                top: 8,
                right: 8,
                background: 'rgba(102, 126, 234, 0.1)',
                borderRadius: 2,
                px: 1,
                py: 0.5
              }}
            >
              <AIIcon sx={{ fontSize: 14, color: '#667eea' }} />
            </Box>
            <CardContent>
              <Typography variant="h6" fontWeight="700" color="#1E293B" gutterBottom>
                Lab Equipment Status
              </Typography>
              <List>
                {data.laboratory.equipment.map((equipment) => (
                  <ListItem key={equipment.id} sx={{ px: 0 }}>
                    <ListItemIcon>
                      <BiotechIcon color={equipment.status === 'Operational' ? 'success' : 'warning'} />
                    </ListItemIcon>
                    <ListItemText 
                      primary={equipment.name}
                      secondary={`${equipment.department} • ${equipment.usage} usage`}
                      primaryTypographyProps={{ fontWeight: 600 }}
                    />
                    <Chip 
                      label={equipment.status} 
                      size="small"
                      color={equipment.status === 'Operational' ? 'success' : 'warning'}
                    />
                  </ListItem>
                ))}
              </List>
            </CardContent>
          </Card>

          {/* Pending Tests */}
          <Card sx={{ position: 'relative' }}>
            {/* NEW: AI Monitoring Badge */}
            <Box
              sx={{
                position: 'absolute',
                top: 8,
                right: 8,
                background: 'rgba(102, 126, 234, 0.1)',
                borderRadius: 2,
                px: 1,
                py: 0.5
              }}
            >
              <AIIcon sx={{ fontSize: 14, color: '#667eea' }} />
            </Box>
            <CardContent>
              <Typography variant="h6" fontWeight="700" color="#1E293B" gutterBottom>
                Pending Tests
              </Typography>
              <List>
                {data.laboratory.pendingTests.map((test) => (
                  <ListItem key={test.id} sx={{ px: 0 }}>
                    <ListItemIcon>
                      <BloodtypeIcon color="primary" />
                    </ListItemIcon>
                    <ListItemText 
                      primary={test.test}
                      secondary={`Patient: ${test.patient}`}
                      primaryTypographyProps={{ fontWeight: 600 }}
                    />
                    <Chip 
                      label={test.status} 
                      size="small"
                      color={test.status === 'Completed' ? 'success' : test.priority === 'Urgent' ? 'error' : 'default'}
                    />
                  </ListItem>
                ))}
              </List>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );

  const renderDetailModal = () => (
    <Modal open={detailModalOpen} onClose={() => setDetailModalOpen(false)}>
      <Fade in={detailModalOpen}>
        <Box
          sx={{
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
            border: '1px solid rgba(255, 255, 255, 0.2)'
          }}
        >
          {selectedItem && (
            <Box>
              <Box sx={{ p: 3, borderBottom: '1px solid #e0e0e0' }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    <Avatar sx={{ 
                      bgcolor: alpha(getStockStatus(selectedItem.stock, selectedItem.minStock).color, 0.1), 
                      color: getStockStatus(selectedItem.stock, selectedItem.minStock).color,
                      width: 60,
                      height: 60
                    }}>
                      {selectedItem.type === 'pharmacy' ? <MedicationIcon /> : <TestTubeIcon />}
                    </Avatar>
                    <Box>
                      <Typography variant="h4" fontWeight="800" color="#1E293B">
                        {selectedItem.name}
                      </Typography>
                      <Typography variant="body1" color="#64748B" sx={{ fontWeight: 500 }}>
                        {selectedItem.category} • {selectedItem.batch}
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
                    <IconButton onClick={() => setDetailModalOpen(false)}>
                      <CloseIcon />
                    </IconButton>
                  </Box>
                </Box>

                {/* NEW: AI Monitoring Chip */}
                <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                  <Chip
                    label={getStockStatus(selectedItem.stock, selectedItem.minStock).status}
                    sx={{
                      backgroundColor: alpha(getStockStatus(selectedItem.stock, selectedItem.minStock).color, 0.1),
                      color: getStockStatus(selectedItem.stock, selectedItem.minStock).color,
                      fontWeight: 700
                    }}
                  />
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

              <Box sx={{ p: 3 }}>
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
                            primary="Minimum Stock" 
                            secondary={selectedItem.minStock}
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
                  <Grid item xs={12} sm={6}>
                    <Paper sx={{ p: 2, background: '#f8f9fa', borderRadius: 2 }}>
                      <Typography variant="h6" fontWeight="700" color="#1E293B" gutterBottom>
                        Product Details
                      </Typography>
                      <List>
                        <ListItem>
                          <ListItemText 
                            primary="Supplier" 
                            secondary={selectedItem.supplier}
                            primaryTypographyProps={{ fontWeight: 600 }}
                          />
                        </ListItem>
                        <ListItem>
                          <ListItemText 
                            primary="Unit Cost" 
                            secondary={`$${selectedItem.unitCost}`}
                            primaryTypographyProps={{ fontWeight: 600 }}
                          />
                        </ListItem>
                        <ListItem>
                          <ListItemText 
                            primary="Last Restocked" 
                            secondary={new Date(selectedItem.lastRestocked).toLocaleDateString()}
                            primaryTypographyProps={{ fontWeight: 600 }}
                          />
                        </ListItem>
                      </List>
                    </Paper>
                  </Grid>
                </Grid>

                {/* Expiry Status */}
                <Paper sx={{ 
                  p: 2, 
                  mt: 2, 
                  background: alpha(getExpiryStatus(getDaysUntilExpiry(selectedItem.expiryDate)).color, 0.1),
                  border: `1px solid ${getExpiryStatus(getDaysUntilExpiry(selectedItem.expiryDate)).color}20`
                }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    <CalendarIcon sx={{ color: getExpiryStatus(getDaysUntilExpiry(selectedItem.expiryDate)).color }} />
                    <Box>
                      <Typography variant="h6" fontWeight="700" color={getExpiryStatus(getDaysUntilExpiry(selectedItem.expiryDate)).color}>
                        {getExpiryStatus(getDaysUntilExpiry(selectedItem.expiryDate)).status}
                      </Typography>
                      <Typography variant="body2" color="#64748B">
                        Expiry: {new Date(selectedItem.expiryDate).toLocaleDateString()} 
                        ({getDaysUntilExpiry(selectedItem.expiryDate)} days remaining)
                      </Typography>
                    </Box>
                  </Box>
                </Paper>

                {/* NEW: AI Recommendations */}
                <Paper sx={{ 
                  p: 2, 
                  mt: 2,
                  background: 'linear-gradient(135deg, rgba(102,126,234,0.08), rgba(118,75,162,0.08))',
                  border: '1px solid rgba(102,126,234,0.2)'
                }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                    <AIIcon sx={{ color: '#667eea' }} />
                    <Typography variant="h6" fontWeight="800" color="#667eea">
                      AI Recommendations
                    </Typography>
                  </Box>
                  <Typography variant="body2" color="text.secondary">
                    {selectedItem.stock <= selectedItem.minStock 
                      ? `Consider reordering ${selectedItem.name} soon. Current stock (${selectedItem.stock}) is at or below reorder level.`
                      : `Stock levels for ${selectedItem.name} are adequate. Next reorder suggested when quantity reaches ${selectedItem.minStock} units.`
                    }
                  </Typography>
                </Paper>
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
        data={data}
        activeSection={activeSection}
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
              AI-Powered Pharmacy & Laboratory
            </Typography>
            <Typography variant="body1" color="text.secondary" sx={{ fontWeight: 600, mb: 1 }}>
              Voice-enabled medication management and laboratory operations
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
                label="Smart Inventory" 
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
            Add {activeSection === 'pharmacy' ? 'Medication' : 'Reagent'}
          </Button>
        </Box>

        {/* Stats Cards */}
        <Grid container spacing={3} sx={{ mb: 4 }}>
          <Grid item xs={12} sm={6} md={3}>
            <StatCard  
              title={activeSection === 'pharmacy' ? 'Medications' : 'Reagents'}
              value={activeSection === 'pharmacy' ? data.stats.pharmacy.totalMedications : data.stats.laboratory.totalReagents}
              subtitle="Total items"
              icon={activeSection === 'pharmacy' ? <PharmacyIcon sx={{ color: 'black', fontSize: 28 }} /> : <LabIcon sx={{ color: 'black', fontSize: 28 }} />}
              color="#667eea"
              gradient="linear-gradient(135deg, #667eea 0%, #764ba2 100%)"
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <StatCard
              title="Low Stock"
              value={activeSection === 'pharmacy' ? data.stats.pharmacy.lowStock : data.stats.laboratory.lowStock}
              subtitle="Need reordering"
              icon={<WarningIcon sx={{ color: 'black', fontSize: 28 }} />}
              color="#F59E0B"
              gradient="linear-gradient(135deg, #F59E0B 0%, #D97706 100%)"
              delay={200}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <StatCard
              title={activeSection === 'pharmacy' ? 'Expired' : 'Equipment'}
              value={activeSection === 'pharmacy' ? data.stats.pharmacy.expired : data.stats.laboratory.equipmentOperational}
              subtitle={activeSection === 'pharmacy' ? 'Items expired' : 'Operational devices'}
              icon={activeSection === 'pharmacy' ? <ErrorIcon sx={{ color: 'black', fontSize: 28 }} /> : <BiotechIcon sx={{ color: 'black', fontSize: 28 }} />}
              color={activeSection === 'pharmacy' ? '#EF4444' : '#10B981'}
              gradient={activeSection === 'pharmacy' ? 'linear-gradient(135deg, #EF4444 0%, #DC2626 100%)' : 'linear-gradient(135deg, #10B981 0%, #059669 100%)'}
              delay={400}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <StatCard
              title={activeSection === 'pharmacy' ? 'Total Value' : 'Pending Tests'}
              value={activeSection === 'pharmacy' ? `$${(data.stats.pharmacy.totalValue / 1000).toFixed(0)}K` : data.stats.laboratory.pendingTests}
              subtitle={activeSection === 'pharmacy' ? 'Inventory worth' : 'Awaiting results'}
              icon={<TrendingUpIcon sx={{ color: 'black', fontSize: 28 }} />}
              color="#8B5CF6"
              gradient="linear-gradient(135deg, #8B5CF6 0%, #7C3AED 100%)"
              delay={600}
            />
          </Grid>
        </Grid>

        {/* Section Tabs */}
        <Paper sx={{ 
          mb: 3, 
          background: 'rgba(255, 255, 255, 0.9)',
          borderRadius: 3,
          border: '1px solid #e9edf3',
          boxShadow: '0 10px 28px rgba(31,45,61,0.06)'
        }}>
          <Tabs 
            value={activeSection} 
            onChange={(e, newValue) => setActiveSection(newValue)}
            sx={{
              '& .MuiTab-root': {
                fontWeight: 600,
                fontSize: '1rem'
              }
            }}
          >
            <Tab 
              icon={<PharmacyIcon />} 
              iconPosition="start" 
              label="Pharmacy" 
              value="pharmacy" 
            />
            <Tab 
              icon={<LabIcon />} 
              iconPosition="start" 
              label="Laboratory" 
              value="laboratory" 
            />
          </Tabs>
        </Paper>

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
            <Grid item xs={12} sm={4}>
              <TextField
                fullWidth
                placeholder={`Search ${activeSection === 'pharmacy' ? 'medications' : 'reagents'}...`}
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
                label="Status"
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                size="small"
              >
                <MenuItem value="All">All Status</MenuItem>
                <MenuItem value="In Stock">In Stock</MenuItem>
                <MenuItem value="Low Stock">Low Stock</MenuItem>
                <MenuItem value="Critical">Critical</MenuItem>
              </TextField>
            </Grid>
            <Grid item xs={12} sm={4}>
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

      {/* Content Sections */}
      {activeSection === 'pharmacy' ? renderPharmacySection() : renderLaboratorySection()}

      {/* Detail Modal */}
      {renderDetailModal()}

      {/* Add Item Modal (Enhanced with AI) */}
      <Modal open={addModalOpen} onClose={() => setAddModalOpen(false)}>
        <Fade in={addModalOpen}>
          <Box sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: { xs: '95%', sm: 500 },
            bgcolor: 'background.paper',
            borderRadius: 3,
            boxShadow: 24,
            p: 4
          }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
              <AIIcon sx={{ color: '#667eea' }} />
              <Typography variant="h4" fontWeight="800">
                Add New {activeSection === 'pharmacy' ? 'Medication' : 'Reagent'}
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
                  Set appropriate minimum stock levels based on usage patterns to avoid shortages.
                </Typography>
              </CardContent>
            </Card>

            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Name"
                  value={newItem.name}
                  onChange={(e) => setNewItem({...newItem, name: e.target.value})}
                  size="small"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Category"
                  value={newItem.category}
                  onChange={(e) => setNewItem({...newItem, category: e.target.value})}
                  size="small"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Batch Number"
                  value={newItem.batch}
                  onChange={(e) => setNewItem({...newItem, batch: e.target.value})}
                  size="small"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Current Stock"
                  type="number"
                  value={newItem.stock}
                  onChange={(e) => setNewItem({...newItem, stock: e.target.value})}
                  size="small"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Minimum Stock"
                  type="number"
                  value={newItem.minStock}
                  onChange={(e) => setNewItem({...newItem, minStock: e.target.value})}
                  size="small"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Unit Cost ($)"
                  type="number"
                  value={newItem.unitCost}
                  onChange={(e) => setNewItem({...newItem, unitCost: e.target.value})}
                  size="small"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Expiry Date"
                  type="date"
                  InputLabelProps={{ shrink: true }}
                  value={newItem.expiryDate}
                  onChange={(e) => setNewItem({...newItem, expiryDate: e.target.value})}
                  size="small"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Supplier"
                  value={newItem.supplier}
                  onChange={(e) => setNewItem({...newItem, supplier: e.target.value})}
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
                    fontWeight: 700
                  }}
                >
                  Add {activeSection === 'pharmacy' ? 'Medication' : 'Reagent'}
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

export default PharmacyLaboratory;