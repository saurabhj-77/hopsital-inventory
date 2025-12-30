import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Paper,
  Chip,
  Button,
  IconButton,
  TextField,
  InputAdornment,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Tabs,
  Tab,
  Card,
  CardContent,
  Alert,
  Tooltip,
  Badge,
  Switch,
  FormControlLabel,
  Fade,
  Zoom,
  Slide,
  Grow,
  CircularProgress,
  alpha
} from '@mui/material';
import {
  Add as AddIcon,
  Search as SearchIcon,
  FilterList as FilterIcon,
  CalendarToday as CalendarIcon,
  Warning as WarningIcon,
  CheckCircle as CheckCircleIcon,
  Schedule as ScheduleIcon,
  Build as BuildIcon,
  LocalHospital as HospitalIcon,
  Person as PersonIcon,
  Phone as PhoneIcon,
  Email as EmailIcon,
  History as HistoryIcon,
  Download as DownloadIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Notifications as NotificationsIcon,
  Refresh as RefreshIcon,
  Speed as SpeedIcon,
  Verified as VerifiedIcon,
  ErrorOutline as ErrorOutlineIcon,
  Timeline as TimelineIcon,
  Assignment as AssignmentIcon,
  MedicalServices as MedicalServicesIcon,
  Biotech as BiotechIcon,
  Healing as HealingIcon,
  MonitorHeart as MonitorHeartIcon,
  Devices as DevicesIcon,
  Science as ScienceIcon,
  AutoAwesome as AIIcon,
  Inventory as InventoryIcon,
  Rocket as RocketIcon
} from '@mui/icons-material';
import { keyframes } from '@mui/system';

// Animation keyframes
const pulseAnimation = keyframes`
  0% { transform: scale(1); }
  50% { transform: scale(1.05); }
  100% { transform: scale(1); }
`;

const fadeInUp = keyframes`
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

// Enhanced dummy data (same as before)
const enhancedMaintenanceData = [
  // Overdue items
  {
    id: 1,
    equipmentId: 'VENT-001',
    equipmentName: 'Ventilator - VentiMax Pro',
    model: 'VMX-3000',
    manufacturer: 'MedTech Solutions',
    department: 'ICU',
    location: 'ICU Room 3, Bed 2',
    dueDate: '2024-12-01',
    priority: 'High',
    status: 'overdue',
    type: 'Preventive Maintenance',
    technician: 'John Smith',
    lastService: '2024-11-01',
    serviceInterval: '30 days',
    estimatedDuration: '2 hours',
    costEstimate: '$850',
    criticalEquipment: true,
    calibrationDue: '2024-12-10',
    notes: 'High-priority equipment for critical care'
  },
  {
    id: 2,
    equipmentId: 'DEF-002',
    equipmentName: 'Defibrillator - LifeSave 3000',
    model: 'LS-3000',
    manufacturer: 'CardioCare Systems',
    department: 'Emergency',
    location: 'ER Bay 1',
    dueDate: '2024-12-03',
    priority: 'High',
    status: 'overdue',
    type: 'Calibration',
    technician: 'Sarah Johnson',
    lastService: '2024-11-03',
    serviceInterval: '30 days',
    estimatedDuration: '1.5 hours',
    costEstimate: '$450',
    criticalEquipment: true,
    calibrationDue: '2024-12-03',
    notes: 'Weekly calibration required for accuracy'
  },
  {
    id: 5,
    equipmentId: 'ANES-005',
    equipmentName: 'Anesthesia Machine - AeroCare 5000',
    model: 'AC-5000',
    manufacturer: 'AnesTech Corp',
    department: 'Operation Theater',
    location: 'OT 3, Main Theater',
    dueDate: '2024-12-05',
    priority: 'High',
    status: 'overdue',
    type: 'Calibration',
    technician: 'Robert Chen',
    lastService: '2024-11-05',
    serviceInterval: '45 days',
    estimatedDuration: '2.5 hours',
    costEstimate: '$750',
    criticalEquipment: true,
    calibrationDue: '2024-12-05',
    notes: 'Critical equipment for surgery - requires immediate attention'
  },
  // Upcoming items
  {
    id: 3,
    equipmentId: 'INF-003',
    equipmentName: 'Infusion Pump - MedFlow Pro',
    model: 'MFP-200',
    manufacturer: 'InfuTech Inc',
    department: 'Oncology',
    location: 'Chemotherapy Suite 2',
    dueDate: '2024-12-28',
    priority: 'High',
    status: 'upcoming',
    type: 'Corrective Maintenance',
    technician: 'Mike Wilson',
    lastService: '2024-11-28',
    serviceInterval: '60 days',
    estimatedDuration: '3 hours',
    costEstimate: '$1,200',
    criticalEquipment: true,
    calibrationDue: '2024-12-25',
    notes: 'Replaced motor assembly and recalibrated flow rates'
  },
  {
    id: 4,
    equipmentId: 'MRI-004',
    equipmentName: 'MRI Scanner - 3T MagnaView',
    model: 'MV-3T',
    manufacturer: 'Imaging Solutions',
    department: 'Radiology',
    location: 'Imaging Center, Room A',
    dueDate: '2024-12-25',
    priority: 'Medium',
    status: 'upcoming',
    type: 'Scheduled Maintenance',
    technician: 'External Vendor',
    lastService: '2024-10-15',
    serviceInterval: '90 days',
    estimatedDuration: '8 hours',
    costEstimate: '$5,000',
    criticalEquipment: false,
    calibrationDue: '2024-12-28',
    notes: 'Annual comprehensive maintenance with vendor support'
  },
  {
    id: 6,
    equipmentId: 'ECG-006',
    equipmentName: 'ECG Monitor - CardioView Pro',
    model: 'CVP-120',
    manufacturer: 'CardioMetrics',
    department: 'Cardiology',
    location: 'CCU Room 4',
    dueDate: '2024-12-30',
    priority: 'Medium',
    status: 'upcoming',
    type: 'Preventive Maintenance',
    technician: 'Lisa Rodriguez',
    lastService: '2024-11-30',
    serviceInterval: '30 days',
    estimatedDuration: '1 hour',
    costEstimate: '$300',
    criticalEquipment: false,
    calibrationDue: '2024-12-15',
    notes: 'Routine maintenance and software update'
  },
  {
    id: 7,
    equipmentId: 'ULS-007',
    equipmentName: 'Ultrasound Machine - SonoView HD',
    model: 'SV-HD4',
    manufacturer: 'ImagingTech',
    department: 'Radiology',
    location: 'Ultrasound Room 2',
    dueDate: '2024-12-22',
    priority: 'Medium',
    status: 'upcoming',
    type: 'Calibration',
    technician: 'External Vendor',
    lastService: '2024-11-22',
    serviceInterval: '60 days',
    estimatedDuration: '4 hours',
    costEstimate: '$1,500',
    criticalEquipment: false,
    calibrationDue: '2024-12-22',
    notes: 'Image quality calibration and transducer testing'
  },
  {
    id: 8,
    equipmentId: 'INC-008',
    equipmentName: 'Incubator - NeoCare 360',
    model: 'NC-360',
    manufacturer: 'NICU Solutions',
    department: 'NICU',
    location: 'NICU Pod A, Station 3',
    dueDate: '2024-12-31',
    priority: 'High',
    status: 'upcoming',
    type: 'Corrective Maintenance',
    technician: 'David Park',
    lastService: '2024-11-30',
    serviceInterval: '30 days',
    estimatedDuration: '2 hours',
    costEstimate: '$600',
    criticalEquipment: true,
    calibrationDue: '2024-12-12',
    notes: 'Temperature regulation issue - critical for infant care'
  },
  // Completed items
  {
    id: 9,
    equipmentId: 'BED-009',
    equipmentName: 'ICU Bed - CareComfort Pro',
    model: 'CCP-200',
    manufacturer: 'Hospital Systems',
    department: 'ICU',
    location: 'ICU Room 5, Bed 1',
    dueDate: '2024-11-30',
    priority: 'Low',
    status: 'completed',
    type: 'Preventive Maintenance',
    technician: 'James Miller',
    lastService: '2024-10-30',
    serviceInterval: '60 days',
    estimatedDuration: '1.5 hours',
    costEstimate: '$250',
    criticalEquipment: false,
    calibrationDue: '2024-12-28',
    notes: 'Routine mechanical maintenance'
  },
  {
    id: 10,
    equipmentId: 'LAB-010',
    equipmentName: 'Blood Analyzer - Hematology Pro',
    model: 'HP-500',
    manufacturer: 'LabTech Systems',
    department: 'Pathology',
    location: 'Main Lab, Station 2',
    dueDate: '2024-12-01',
    priority: 'High',
    status: 'completed',
    type: 'Calibration',
    technician: 'Emma Wilson',
    lastService: '2024-11-01',
    serviceInterval: '30 days',
    estimatedDuration: '3 hours',
    costEstimate: '$900',
    criticalEquipment: true,
    calibrationDue: '2024-12-01',
    notes: 'Quarterly precision calibration completed'
  },
  {
    id: 11,
    equipmentId: 'CT-011',
    equipmentName: 'CT Scanner - QuantumView 128',
    model: 'QV-128',
    manufacturer: 'Imaging Systems Inc',
    department: 'Radiology',
    location: 'CT Room 1',
    dueDate: '2024-11-25',
    priority: 'High',
    status: 'completed',
    type: 'Preventive Maintenance',
    technician: 'External Vendor',
    lastService: '2024-10-25',
    serviceInterval: '90 days',
    estimatedDuration: '6 hours',
    costEstimate: '$3,500',
    criticalEquipment: true,
    calibrationDue: '2024-12-20',
    notes: 'Routine maintenance and detector calibration'
  },
  {
    id: 12,
    equipmentId: 'MON-012',
    equipmentName: 'Patient Monitor - VitalSign Pro',
    model: 'VSP-400',
    manufacturer: 'MonitorTech',
    department: 'ICU',
    location: 'ICU Room 2, Bed 3',
    dueDate: '2024-11-28',
    priority: 'Medium',
    status: 'completed',
    type: 'Calibration',
    technician: 'John Smith',
    lastService: '2024-10-28',
    serviceInterval: '30 days',
    estimatedDuration: '1 hour',
    costEstimate: '$350',
    criticalEquipment: true,
    calibrationDue: '2024-11-28',
    notes: 'Weekly calibration and sensor testing'
  }
];

const enhancedServiceHistory = [
  {
    id: 1,
    equipmentId: 'VENT-001',
    equipmentName: 'Ventilator - VentiMax Pro',
    serviceDate: '2024-11-15',
    serviceType: 'Preventive Maintenance',
    technician: 'John Smith',
    vendor: 'MedTech Solutions',
    cost: '$850',
    notes: 'Replaced HEPA filters, calibrated oxygen sensors, updated firmware to v2.3.1',
    nextDue: '2024-12-15',
    partsReplaced: ['HEPA Filter x2', 'O2 Sensor'],
    serviceDuration: '2 hours',
    qualityCheck: 'Passed',
    downtime: '30 minutes'
  },
  {
    id: 2,
    equipmentId: 'DEF-002',
    equipmentName: 'Defibrillator - LifeSave 3000',
    serviceDate: '2024-11-20',
    serviceType: 'Calibration',
    technician: 'Sarah Johnson',
    vendor: 'CardioCare Systems',
    cost: '$450',
    notes: 'Battery calibration, electrode pad testing, shock energy verification',
    nextDue: '2024-12-20',
    partsReplaced: ['Battery Pack'],
    serviceDuration: '1.5 hours',
    qualityCheck: 'Passed',
    downtime: '15 minutes'
  },
  {
    id: 3,
    equipmentId: 'MRI-004',
    equipmentName: 'MRI Scanner - 3T MagnaView',
    serviceDate: '2024-10-15',
    serviceType: 'Comprehensive Maintenance',
    technician: 'Imaging Solutions Team',
    vendor: 'Imaging Solutions',
    cost: '$5,000',
    notes: 'Annual full-system maintenance, cryogen refill, gradient coil testing, RF system calibration',
    nextDue: '2024-12-25',
    partsReplaced: ['RF Coil', 'Coolant Filters'],
    serviceDuration: '8 hours',
    qualityCheck: 'Passed',
    downtime: '4 hours'
  },
  {
    id: 4,
    equipmentId: 'INF-003',
    equipmentName: 'Infusion Pump - MedFlow Pro',
    serviceDate: '2024-11-25',
    serviceType: 'Emergency Repair',
    technician: 'Mike Wilson',
    vendor: 'InfuTech Support',
    cost: '$1,200',
    notes: 'Motor replacement, flow sensor recalibration, software reset',
    nextDue: '2024-12-10',
    partsReplaced: ['Stepper Motor', 'Flow Sensor'],
    serviceDuration: '3 hours',
    qualityCheck: 'Passed',
    downtime: '1 hour'
  },
  {
    id: 5,
    equipmentId: 'ANES-005',
    equipmentName: 'Anesthesia Machine - AeroCare 5000',
    serviceDate: '2024-11-05',
    serviceType: 'Routine Calibration',
    technician: 'Robert Chen',
    vendor: 'AnesTech Service',
    cost: '$750',
    notes: 'Gas mixture calibration, vaporizer testing, pressure sensor validation',
    nextDue: '2024-12-05',
    partsReplaced: [],
    serviceDuration: '2.5 hours',
    qualityCheck: 'Passed',
    downtime: '45 minutes'
  },
  {
    id: 6,
    equipmentId: 'ECG-006',
    equipmentName: 'ECG Monitor - CardioView Pro',
    serviceDate: '2024-11-18',
    serviceType: 'Software Update',
    technician: 'Lisa Rodriguez',
    vendor: 'CardioMetrics',
    cost: '$300',
    notes: 'Firmware update to v3.1.2, lead wire testing, display calibration',
    nextDue: '2024-12-18',
    partsReplaced: ['Display Cable'],
    serviceDuration: '1 hour',
    qualityCheck: 'Passed',
    downtime: '20 minutes'
  },
  {
    id: 7,
    equipmentId: 'CT-011',
    equipmentName: 'CT Scanner - QuantumView 128',
    serviceDate: '2024-10-25',
    serviceType: 'Preventive Maintenance',
    technician: 'Imaging Systems Team',
    vendor: 'Imaging Systems Inc',
    cost: '$3,500',
    notes: 'X-ray tube calibration, detector array testing, cooling system check',
    nextDue: '2024-01-25',
    partsReplaced: ['Cooling Fan', 'Detector Array'],
    serviceDuration: '6 hours',
    qualityCheck: 'Passed',
    downtime: '3 hours'
  },
  {
    id: 8,
    equipmentId: 'LAB-010',
    equipmentName: 'Blood Analyzer - Hematology Pro',
    serviceDate: '2024-11-01',
    serviceType: 'Calibration',
    technician: 'Emma Wilson',
    vendor: 'LabTech Systems',
    cost: '$900',
    notes: 'Precision calibration, reagent system check, sample handler testing',
    nextDue: '2024-12-01',
    partsReplaced: ['Reagent Pump'],
    serviceDuration: '3 hours',
    qualityCheck: 'Passed',
    downtime: '1.5 hours'
  }
];

const enhancedServiceProviders = [
  {
    id: 1,
    name: 'MedTech Solutions Inc.',
    contact: 'John Davis',
    phone: '+1 (555) 123-4567',
    email: 'john.davis@medtech.com',
    serviceType: 'Full Service & Calibration',
    contractExpiry: '2025-06-30',
    responseTime: '4 hours',
    rating: 4.8,
    activeContracts: 12,
    specialization: ['Ventilators', 'Monitors', 'Infusion Pumps'],
    serviceLevel: 'Platinum',
    coverage: '24/7',
    equipmentCount: 45
  },
  {
    id: 2,
    name: 'BioCal Laboratories',
    contact: 'Sarah Miller',
    phone: '+1 (555) 987-6543',
    email: 'sarah.m@biocal.com',
    serviceType: 'Precision Calibration',
    contractExpiry: '2024-12-31',
    responseTime: '24 hours',
    rating: 4.5,
    activeContracts: 8,
    specialization: ['Diagnostic Equipment', 'Lab Analyzers', 'Imaging Systems'],
    serviceLevel: 'Gold',
    coverage: 'Business Hours',
    equipmentCount: 28
  },
  {
    id: 3,
    name: 'Hospital Equipment Services',
    contact: 'Michael Brown',
    phone: '+1 (555) 456-7890',
    email: 'm.brown@hes.com',
    serviceType: 'Emergency Repair',
    contractExpiry: '2025-03-15',
    responseTime: '2 hours',
    rating: 4.9,
    activeContracts: 15,
    specialization: ['Critical Care', 'Surgical', 'Imaging', 'Life Support'],
    serviceLevel: 'Platinum',
    coverage: '24/7',
    equipmentCount: 62
  },
  {
    id: 4,
    name: 'Imaging Solutions Group',
    contact: 'Dr. Emily Carter',
    phone: '+1 (555) 234-5678',
    email: 'ecarter@imaging.com',
    serviceType: 'Imaging Equipment',
    contractExpiry: '2025-08-20',
    responseTime: '6 hours',
    rating: 4.7,
    activeContracts: 6,
    specialization: ['MRI', 'CT', 'Ultrasound', 'X-Ray'],
    serviceLevel: 'Gold',
    coverage: '24/7',
    equipmentCount: 18
  },
  {
    id: 5,
    name: 'Anesthesia Care Specialists',
    contact: 'Robert Kim',
    phone: '+1 (555) 345-6789',
    email: 'r.kim@anesthesiacare.com',
    serviceType: 'Anesthesia Equipment',
    contractExpiry: '2025-01-31',
    responseTime: '3 hours',
    rating: 4.6,
    activeContracts: 10,
    specialization: ['Anesthesia Machines', 'Vaporizers', 'Gas Delivery'],
    serviceLevel: 'Silver',
    coverage: 'Business Hours',
    equipmentCount: 22
  },
  {
    id: 6,
    name: 'Critical Care Equipment Services',
    contact: 'Dr. Lisa Wong',
    phone: '+1 (555) 678-9012',
    email: 'l.wong@cces.com',
    serviceType: 'Critical Care Maintenance',
    contractExpiry: '2025-05-15',
    responseTime: '1 hour',
    rating: 4.9,
    activeContracts: 20,
    specialization: ['ICU Equipment', 'Ventilators', 'Monitors', 'Defibrillators'],
    serviceLevel: 'Platinum',
    coverage: '24/7',
    equipmentCount: 75
  }
];

// Standardized Card Component matching your reference design
const StatCard = ({ title, value, subtitle, icon, color, gradient, delay = 0, loaded }) => (
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
      overflow: 'hidden',
      flex: 1,
      minWidth: { xs: '100%', sm: 200 }
    }}>
      {/* AI Indicator */}
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

const MaintenanceCalibrationTracker = () => {
  // State management
  const [maintenanceData, setMaintenanceData] = useState([]);
  const [serviceProviders, setServiceProviders] = useState([]);
  const [serviceHistory, setServiceHistory] = useState([]);
  const [activeTab, setActiveTab] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterPriority, setFilterPriority] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterDepartment, setFilterDepartment] = useState('all');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(8);
  const [openDialog, setOpenDialog] = useState(false);
  const [newMaintenance, setNewMaintenance] = useState({
    equipmentName: '',
    department: '',
    dueDate: '',
    priority: 'Medium',
    type: 'Preventive Maintenance',
    technician: ''
  });
  const [showAlerts, setShowAlerts] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const [loaded, setLoaded] = useState(false);

  // Animation state
  const [animateCards, setAnimateCards] = useState(false);

  // Get unique departments for filter
  const departments = Array.from(new Set(maintenanceData.map(item => item.department)));

  // Initialize all data from localStorage
  useEffect(() => {
    // Simulate loading delay for animation
    setTimeout(() => {
      // Load maintenance data
      const storedMaintenance = localStorage.getItem('maintenanceData');
      if (storedMaintenance) {
        setMaintenanceData(JSON.parse(storedMaintenance));
      } else {
        setMaintenanceData(enhancedMaintenanceData);
        localStorage.setItem('maintenanceData', JSON.stringify(enhancedMaintenanceData));
      }

      // Load service providers data
      const storedProviders = localStorage.getItem('serviceProviders');
      if (storedProviders) {
        setServiceProviders(JSON.parse(storedProviders));
      } else {
        setServiceProviders(enhancedServiceProviders);
        localStorage.setItem('serviceProviders', JSON.stringify(enhancedServiceProviders));
      }

      // Load service history data
      const storedHistory = localStorage.getItem('serviceHistory');
      if (storedHistory) {
        setServiceHistory(JSON.parse(storedHistory));
      } else {
        setServiceHistory(enhancedServiceHistory);
        localStorage.setItem('serviceHistory', JSON.stringify(enhancedServiceHistory));
      }

      setIsLoading(false);
      setLoaded(true);
      setAnimateCards(true);
    }, 800);
  }, []);

  // Save to localStorage whenever data changes
  useEffect(() => {
    if (maintenanceData.length > 0) {
      localStorage.setItem('maintenanceData', JSON.stringify(maintenanceData));
    }
  }, [maintenanceData]);

  useEffect(() => {
    if (serviceProviders.length > 0) {
      localStorage.setItem('serviceProviders', JSON.stringify(serviceProviders));
    }
  }, [serviceProviders]);

  useEffect(() => {
    if (serviceHistory.length > 0) {
      localStorage.setItem('serviceHistory', JSON.stringify(serviceHistory));
    }
  }, [serviceHistory]);

  // Filter data based on search and filters
  const filteredData = maintenanceData.filter(item => {
    const matchesSearch = searchQuery === '' || 
      item.equipmentName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.department.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.equipmentId.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesPriority = filterPriority === 'all' || item.priority === filterPriority;
    const matchesStatus = filterStatus === 'all' || item.status === filterStatus;
    const matchesDepartment = filterDepartment === 'all' || item.department === filterDepartment;
    
    return matchesSearch && matchesPriority && matchesStatus && matchesDepartment;
  });

  // Calculate enhanced statistics
  const stats = {
    total: maintenanceData.length,
    overdue: maintenanceData.filter(item => item.status === 'overdue').length,
    upcoming: maintenanceData.filter(item => item.status === 'upcoming').length,
    completed: maintenanceData.filter(item => item.status === 'completed').length,
    highPriority: maintenanceData.filter(item => item.priority === 'High').length,
    mediumPriority: maintenanceData.filter(item => item.priority === 'Medium').length,
    lowPriority: maintenanceData.filter(item => item.priority === 'Low').length,
    calibrationsDue: maintenanceData.filter(item => item.type === 'Calibration' && 
      (item.status === 'overdue' || item.status === 'upcoming')).length,
    criticalEquipment: maintenanceData.filter(item => item.criticalEquipment).length,
    totalServiceProviders: serviceProviders.length,
    activeServiceProviders: serviceProviders.filter(p => new Date(p.contractExpiry) > new Date()).length
  };

  // Get calibration items for calibration tab
  const calibrationItems = maintenanceData.filter(item => 
    item.type === 'Calibration' || item.calibrationDue
  );

  // Calculate completion percentage
  const completionPercentage = maintenanceData.length > 0 
    ? Math.round((stats.completed / maintenanceData.length) * 100)
    : 0;

  // Handle dialog operations
  const handleOpenDialog = () => setOpenDialog(true);
  const handleCloseDialog = () => {
    setOpenDialog(false);
    setNewMaintenance({
      equipmentName: '',
      department: '',
      dueDate: '',
      priority: 'Medium',
      type: 'Preventive Maintenance',
      technician: ''
    });
  };

  const handleAddMaintenance = () => {
    if (newMaintenance.equipmentName && newMaintenance.department && newMaintenance.dueDate) {
      const newItem = {
        id: maintenanceData.length + 1,
        equipmentId: `EQP-${String(maintenanceData.length + 1).padStart(3, '0')}`,
        model: 'Default',
        manufacturer: 'Manufacturer',
        location: 'To be assigned',
        serviceInterval: '30 days',
        estimatedDuration: '2 hours',
        costEstimate: '$500',
        criticalEquipment: newMaintenance.priority === 'High',
        calibrationDue: newMaintenance.dueDate,
        notes: 'New maintenance scheduled',
        lastService: new Date().toISOString().split('T')[0],
        ...newMaintenance,
        status: 'upcoming'
      };
      setMaintenanceData([newItem, ...maintenanceData]);
      handleCloseDialog();
    }
  };

  const handleStatusChange = (id, newStatus) => {
    setMaintenanceData(maintenanceData.map(item => 
      item.id === id ? { ...item, status: newStatus } : item
    ));
  };

  const handleDelete = (id) => {
    setMaintenanceData(maintenanceData.filter(item => item.id !== id));
  };

  // Status color mapping
  const getStatusColor = (status) => {
    switch (status) {
      case 'overdue': return 'error';
      case 'upcoming': return 'warning';
      case 'completed': return 'success';
      default: return 'default';
    }
  };

  // Priority color mapping
  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'High': return 'error';
      case 'Medium': return 'warning';
      case 'Low': return 'success';
      default: return 'default';
    }
  };

  // Format date
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  // Calculate days until due
  const getDaysUntilDue = (dueDate) => {
    const today = new Date();
    const due = new Date(dueDate);
    const diffTime = due - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  // Get department icon
  const getDepartmentIcon = (department) => {
    switch (department) {
      case 'ICU': return <MonitorHeartIcon />;
      case 'Emergency': return <HealingIcon />;
      case 'Radiology': return <DevicesIcon />;
      case 'Oncology': return <MedicalServicesIcon />;
      case 'Pathology': return <ScienceIcon />;
      case 'Cardiology': return <MonitorHeartIcon />;
      case 'NICU': return <MedicalServicesIcon />;
      case 'Operation Theater': return <HealingIcon />;
      default: return <HospitalIcon />;
    }
  };

  if (isLoading) {
    return (
      <Box sx={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        height: '80vh',
        animation: `${fadeInUp} 0.5s ease-out`
      }}>
        <Box sx={{ textAlign: 'center' }}>
          <CircularProgress size={60} thickness={4} sx={{ mb: 3, color: 'primary.main' }} />
          <Typography variant="h6" color="text.secondary">
            Loading Maintenance & Calibration Data...
          </Typography>
        </Box>
      </Box>
    );
  }

  return (
    <Box sx={{ p: { xs: 2, md: 3 } }}>
      {/* Header Section */}
      <Slide direction="down" in={!isLoading} timeout={500}>
        <Box sx={{ mb: 4 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 3 }}>
            <Box sx={{ animation: `${fadeInUp} 0.6s ease-out` }}>
              <Typography variant="h4" fontWeight="bold" gutterBottom sx={{ color: 'primary.main' }}>
                Maintenance & Calibration Tracker
              </Typography>
              <Typography variant="body1" color="text.secondary">
                Schedule, monitor, and track equipment maintenance for operational reliability
              </Typography>
            </Box>
            <Box sx={{ display: 'flex', gap: 2, animation: `${fadeInUp} 0.8s ease-out` }}>
              <Button
                variant="contained"
                startIcon={<AddIcon />}
                onClick={handleOpenDialog}
                sx={{ 
                  borderRadius: 2,
                  px: 3,
                  py: 1,
                  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                  '&:hover': {
                    background: 'linear-gradient(135deg, #5a67d8 0%, #6b46c1 100%)',
                    transform: 'translateY(-2px)',
                    transition: 'all 0.3s ease'
                  }
                }}
              >
                Schedule Maintenance
              </Button>
            </Box>
          </Box>

          {/* Standardized Statistics Cards */}
          <Box sx={{ 
            display: 'flex', 
            gap: 2, 
            mb: 3, 
            flexWrap: 'wrap',
            animation: `${fadeInUp} 0.8s ease-out`
          }}>
            <StatCard
              title="Overdue Tasks"
              value={stats.overdue}
              subtitle="Require immediate attention"
              icon={<WarningIcon sx={{ color: 'black', fontSize: 28 }} />}
              color="#EF4444"
              gradient="linear-gradient(135deg, #EF4444 0%, #DC2626 100%)"
              loaded={loaded}
              delay={0}
            />
            
            <StatCard
              title="Upcoming Tasks"
              value={stats.upcoming}
              subtitle="Next 30 days"
              icon={<ScheduleIcon sx={{ color: 'black', fontSize: 28 }} />}
              color="#F59E0B"
              gradient="linear-gradient(135deg, #F59E0B 0%, #D97706 100%)"
              loaded={loaded}
              delay={200}
            />
            
            <StatCard
              title="Completed Tasks"
              value={stats.completed}
              subtitle={`${completionPercentage}% completion rate`}
              icon={<CheckCircleIcon sx={{ color: 'black', fontSize: 28 }} />}
              color="#10B981"
              gradient="linear-gradient(135deg, #10B981 0%, #059669 100%)"
              loaded={loaded}
              delay={400}
            />
            
            <StatCard
              title="Calibrations Due"
              value={stats.calibrationsDue}
              subtitle="Equipment requiring calibration"
              icon={<SpeedIcon sx={{ color: 'black', fontSize: 28 }} />}
              color="#8B5CF6"
              gradient="linear-gradient(135deg, #8B5CF6 0%, #7C3AED 100%)"
              loaded={loaded}
              delay={600}
            />
          </Box>

          {/* Additional Stats Cards - Standardized Design */}
          <Box sx={{ display: 'flex', gap: 2, mb: 3, flexWrap: 'wrap' }}>
            <StatCard
              title="Critical Equipment"
              value={stats.criticalEquipment}
              subtitle="Life-support systems"
              icon={<MonitorHeartIcon sx={{ color: 'black', fontSize: 28 }} />}
              color="#EC4899"
              gradient="linear-gradient(135deg, #EC4899 0%, #DB2777 100%)"
              loaded={loaded}
              delay={0}
            />

            <StatCard
              title="Service Providers"
              value={stats.totalServiceProviders}
              subtitle={`${stats.activeServiceProviders} active contracts`}
              icon={<AssignmentIcon sx={{ color: 'black', fontSize: 28 }} />}
              color="#3B82F6"
              gradient="linear-gradient(135deg, #3B82F6 0%, #1D4ED8 100%)"
              loaded={loaded}
              delay={200}
            />

            <StatCard
              title="Total Equipment"
              value={stats.total}
              subtitle="Under maintenance tracking"
              icon={<DevicesIcon sx={{ color: 'black', fontSize: 28 }} />}
              color="#06B6D4"
              gradient="linear-gradient(135deg, #06B6D4 0%, #0891B2 100%)"
              loaded={loaded}
              delay={400}
            />
          </Box>

          {/* Alerts Toggle */}
          <Fade in={animateCards} timeout={1000}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
              <FormControlLabel
                control={
                  <Switch
                    checked={showAlerts}
                    onChange={(e) => setShowAlerts(e.target.checked)}
                    color="primary"
                  />
                }
                label="Show Alerts & Notifications"
              />
              <Button
                startIcon={<RefreshIcon />}
                onClick={() => window.location.reload()}
                variant="outlined"
                size="small"
              >
                Refresh Data
              </Button>
            </Box>
          </Fade>

          {/* Alerts Section */}
          {showAlerts && (
            <Fade in={showAlerts} timeout={600}>
              <Box>
                {stats.overdue > 0 && (
                  <Alert 
                    severity="error" 
                    icon={<WarningIcon />}
                    sx={{ 
                      mb: 2, 
                      borderRadius: 2,
                      animation: stats.overdue > 0 ? `${pulseAnimation} 2s infinite` : 'none'
                    }}
                    action={
                      <Button color="inherit" size="small">
                        VIEW ALL
                      </Button>
                    }
                  >
                    <strong>Critical Alert:</strong> {stats.overdue} maintenance tasks are overdue. Please address immediately.
                  </Alert>
                )}
                {stats.upcoming > 0 && (
                  <Alert 
                    severity="warning" 
                    icon={<ScheduleIcon />}
                    sx={{ mb: 2, borderRadius: 2 }}
                  >
                    <strong>Upcoming Tasks:</strong> {stats.upcoming} maintenance tasks scheduled in the next 30 days.
                  </Alert>
                )}
                {stats.calibrationsDue > 0 && (
                  <Alert 
                    severity="info" 
                    icon={<SpeedIcon />}
                    sx={{ mb: 2, borderRadius: 2 }}
                  >
                    <strong>Calibration Required:</strong> {stats.calibrationsDue} equipment items require calibration.
                  </Alert>
                )}
              </Box>
            </Fade>
          )}
        </Box>
      </Slide>

      {/* Tabs Section */}
      <Slide direction="up" in={!isLoading} timeout={700}>
        <Box>
          <Paper elevation={0} sx={{ borderRadius: 3, mb: 3, overflow: 'hidden' }}>
            <Tabs 
              value={activeTab} 
              onChange={(e, newValue) => setActiveTab(newValue)}
              variant="scrollable"
              scrollButtons="auto"
              sx={{
                '& .MuiTab-root': {
                  fontSize: '0.95rem',
                  fontWeight: 500,
                  py: 2,
                  minHeight: 'auto',
                  '&.Mui-selected': {
                    color: 'primary.main',
                    fontWeight: 600
                  }
                },
                '& .MuiTabs-indicator': {
                  height: 3,
                  borderRadius: '3px 3px 0 0'
                }
              }}
            >
              <Tab 
                label={
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <ScheduleIcon fontSize="small" />
                    Upcoming Schedule
                    <Badge 
                      badgeContent={stats.upcoming + stats.overdue} 
                      color="error" 
                      sx={{ ml: 1 }}
                    />
                  </Box>
                } 
              />
              <Tab 
                label={
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <HistoryIcon fontSize="small" />
                    Service History
                    <Badge 
                      badgeContent={serviceHistory.length} 
                      color="info" 
                      sx={{ ml: 1 }}
                    />
                  </Box>
                } 
              />
              <Tab 
                label={
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <AssignmentIcon fontSize="small" />
                    Service Providers
                    <Badge 
                      badgeContent={stats.activeServiceProviders} 
                      color="success" 
                      sx={{ ml: 1 }}
                    />
                  </Box>
                } 
              />
              <Tab 
                label={
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <SpeedIcon fontSize="small" />
                    Calibration Tracking
                    <Badge 
                      badgeContent={stats.calibrationsDue} 
                      color="warning" 
                      sx={{ ml: 1 }}
                    />
                  </Box>
                } 
              />
            </Tabs>
          </Paper>

          {/* Search and Filter Bar */}
          <Box sx={{ 
            display: 'flex', 
            gap: 2, 
            mb: 3, 
            flexWrap: 'wrap',
            animation: `${fadeInUp} 0.8s ease-out`
          }}>
            <TextField
              placeholder="Search equipment, ID, department or location..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon />
                  </InputAdornment>
                ),
                sx: { borderRadius: 2 }
              }}
              sx={{ flex: 1, minWidth: 300 }}
              size="small"
            />
            
            <FormControl size="small" sx={{ minWidth: 150 }}>
              <InputLabel>Priority</InputLabel>
              <Select
                value={filterPriority}
                label="Priority"
                onChange={(e) => setFilterPriority(e.target.value)}
                sx={{ borderRadius: 2 }}
              >
                <MenuItem value="all">All Priorities</MenuItem>
                <MenuItem value="High">High</MenuItem>
                <MenuItem value="Medium">Medium</MenuItem>
                <MenuItem value="Low">Low</MenuItem>
              </Select>
            </FormControl>
            
            <FormControl size="small" sx={{ minWidth: 150 }}>
              <InputLabel>Status</InputLabel>
              <Select
                value={filterStatus}
                label="Status"
                onChange={(e) => setFilterStatus(e.target.value)}
                sx={{ borderRadius: 2 }}
              >
                <MenuItem value="all">All Status</MenuItem>
                <MenuItem value="overdue">Overdue</MenuItem>
                <MenuItem value="upcoming">Upcoming</MenuItem>
                <MenuItem value="completed">Completed</MenuItem>
              </Select>
            </FormControl>
            
            <FormControl size="small" sx={{ minWidth: 150 }}>
              <InputLabel>Department</InputLabel>
              <Select
                value={filterDepartment}
                label="Department"
                onChange={(e) => setFilterDepartment(e.target.value)}
                sx={{ borderRadius: 2 }}
              >
                <MenuItem value="all">All Departments</MenuItem>
                {departments.map(dept => (
                  <MenuItem key={dept} value={dept}>{dept}</MenuItem>
                ))}
              </Select>
            </FormControl>
            
            <Button
              variant="outlined"
              startIcon={<FilterIcon />}
              onClick={() => {
                setFilterPriority('all');
                setFilterStatus('all');
                setFilterDepartment('all');
                setSearchQuery('');
              }}
              sx={{ borderRadius: 2 }}
            >
              Clear Filters
            </Button>
          </Box>

          {/* Main Content based on active tab */}
          <Grow in={!isLoading} timeout={800}>
            <Box>
              {activeTab === 0 && (
                <Paper elevation={0} sx={{ borderRadius: 3, overflow: 'hidden', animation: `${fadeInUp} 0.6s ease-out` }}>
                  <TableContainer>
                    <Table>
                      <TableHead>
                        <TableRow sx={{ bgcolor: 'action.hover' }}>
                          <TableCell sx={{ fontWeight: 600 }}>Equipment Details</TableCell>
                          <TableCell sx={{ fontWeight: 600 }}>Department</TableCell>
                          <TableCell sx={{ fontWeight: 600 }}>Due Date</TableCell>
                          <TableCell sx={{ fontWeight: 600 }}>Priority</TableCell>
                          <TableCell sx={{ fontWeight: 600 }}>Status</TableCell>
                          <TableCell sx={{ fontWeight: 600 }}>Type</TableCell>
                          <TableCell sx={{ fontWeight: 600 }}>Actions</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {filteredData.length > 0 ? (
                          filteredData
                            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                            .map((item, index) => {
                              const daysUntilDue = getDaysUntilDue(item.dueDate);
                              return (
                                <TableRow 
                                  key={item.id} 
                                  hover
                                  sx={{ 
                                    animation: `${fadeInUp} ${0.3 + (index * 0.1)}s ease-out`,
                                    transition: 'all 0.3s ease',
                                    '&:hover': {
                                      bgcolor: 'action.hover'
                                    }
                                  }}
                                >
                                  <TableCell>
                                    <Box>
                                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 0.5 }}>
                                        <Typography fontWeight="medium">
                                          {item.equipmentName}
                                        </Typography>
                                        {item.criticalEquipment && (
                                          <Tooltip title="Critical Equipment">
                                            <WarningIcon fontSize="small" color="error" />
                                          </Tooltip>
                                        )}
                                      </Box>
                                      <Typography variant="body2" color="text.secondary">
                                        ID: {item.equipmentId} • Last: {formatDate(item.lastService)}
                                      </Typography>
                                      <Typography variant="body2" color="text.secondary">
                                        Location: {item.location}
                                      </Typography>
                                    </Box>
                                  </TableCell>
                                  <TableCell>
                                    <Chip
                                      label={item.department}
                                      size="small"
                                      icon={getDepartmentIcon(item.department)}
                                      sx={{ borderRadius: 1 }}
                                    />
                                  </TableCell>
                                  <TableCell>
                                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                      <CalendarIcon fontSize="small" color="action" />
                                      <Box>
                                        <Typography>
                                          {formatDate(item.dueDate)}
                                        </Typography>
                                        {daysUntilDue < 0 ? (
                                          <Chip
                                            label={`${Math.abs(daysUntilDue)} days overdue`}
                                            size="small"
                                            color="error"
                                            variant="outlined"
                                            sx={{ mt: 0.5 }}
                                          />
                                        ) : (
                                          <Typography variant="caption" color="text.secondary">
                                            {daysUntilDue} days remaining
                                          </Typography>
                                        )}
                                      </Box>
                                    </Box>
                                  </TableCell>
                                  <TableCell>
                                    <Chip
                                      label={item.priority}
                                      color={getPriorityColor(item.priority)}
                                      size="small"
                                      sx={{ borderRadius: 1 }}
                                    />
                                  </TableCell>
                                  <TableCell>
                                    <Chip
                                      label={item.status.charAt(0).toUpperCase() + item.status.slice(1)}
                                      color={getStatusColor(item.status)}
                                      size="small"
                                      sx={{ borderRadius: 1 }}
                                    />
                                  </TableCell>
                                  <TableCell>
                                    <Typography>{item.type}</Typography>
                                    <Typography variant="body2" color="text.secondary">
                                      {item.technician}
                                    </Typography>
                                  </TableCell>
                                  <TableCell>
                                    <Box sx={{ display: 'flex', gap: 1 }}>
                                      <Tooltip title="Mark as Complete">
                                        <IconButton
                                          size="small"
                                          onClick={() => handleStatusChange(item.id, 'completed')}
                                          color="success"
                                          sx={{ 
                                            transition: 'all 0.2s ease',
                                            '&:hover': { transform: 'scale(1.1)' }
                                          }}
                                        >
                                          <CheckCircleIcon />
                                        </IconButton>
                                      </Tooltip>
                                      <Tooltip title="Edit">
                                        <IconButton 
                                          size="small" 
                                          color="primary"
                                          sx={{ 
                                            transition: 'all 0.2s ease',
                                            '&:hover': { transform: 'scale(1.1)' }
                                          }}
                                        >
                                          <EditIcon />
                                        </IconButton>
                                      </Tooltip>
                                      <Tooltip title="Delete">
                                        <IconButton
                                          size="small"
                                          onClick={() => handleDelete(item.id)}
                                          color="error"
                                          sx={{ 
                                            transition: 'all 0.2s ease',
                                            '&:hover': { transform: 'scale(1.1)' }
                                          }}
                                        >
                                          <DeleteIcon />
                                        </IconButton>
                                      </Tooltip>
                                    </Box>
                                  </TableCell>
                                </TableRow>
                              );
                            })
                        ) : (
                          <TableRow>
                            <TableCell colSpan={7} align="center" sx={{ py: 4 }}>
                              <Typography color="text.secondary">
                                No maintenance tasks found matching your filters.
                              </Typography>
                            </TableCell>
                          </TableRow>
                        )}
                      </TableBody>
                    </Table>
                  </TableContainer>
                  <TablePagination
                    rowsPerPageOptions={[5, 8, 15, 25]}
                    component="div"
                    count={filteredData.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={(e, newPage) => setPage(newPage)}
                    onRowsPerPageChange={(e) => {
                      setRowsPerPage(parseInt(e.target.value, 10));
                      setPage(0);
                    }}
                  />
                </Paper>
              )}

              {activeTab === 1 && (
                <Box sx={{ animation: `${fadeInUp} 0.6s ease-out` }}>
                  <Paper elevation={0} sx={{ borderRadius: 3, p: 3, mb: 3 }}>
                    <Typography variant="h6" gutterBottom sx={{ mb: 3, display: 'flex', alignItems: 'center', gap: 1 }}>
                      <HistoryIcon /> Service History Logs ({serviceHistory.length} records)
                    </Typography>
                    {serviceHistory.length > 0 ? (
                      serviceHistory.map((history, index) => (
                        <Zoom in={true} timeout={500 + (index * 100)} key={history.id}>
                          <Box sx={{ 
                            mb: 3, 
                            pb: 2, 
                            borderBottom: 1, 
                            borderColor: 'divider',
                            '&:last-child': { borderBottom: 0 }
                          }}>
                            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
                              <Box>
                                <Typography fontWeight="medium" variant="h6">
                                  {history.equipmentName}
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                  Equipment ID: {history.equipmentId}
                                </Typography>
                              </Box>
                              <Chip
                                label={history.serviceType}
                                size="small"
                                color="primary"
                                variant="outlined"
                                sx={{ borderRadius: 1 }}
                              />
                            </Box>
                            <Box sx={{ 
                              display: 'flex', 
                              gap: 4, 
                              flexWrap: 'wrap',
                              bgcolor: 'action.hover',
                              p: 2,
                              borderRadius: 2,
                              mb: 2
                            }}>
                              <Box>
                                <Typography variant="body2" color="text.secondary">Service Date</Typography>
                                <Typography fontWeight="medium">{formatDate(history.serviceDate)}</Typography>
                              </Box>
                              <Box>
                                <Typography variant="body2" color="text.secondary">Technician</Typography>
                                <Typography fontWeight="medium">{history.technician}</Typography>
                              </Box>
                              <Box>
                                <Typography variant="body2" color="text.secondary">Cost</Typography>
                                <Typography fontWeight="medium" color="success.main">{history.cost}</Typography>
                              </Box>
                              <Box>
                                <Typography variant="body2" color="text.secondary">Duration</Typography>
                                <Typography fontWeight="medium">{history.serviceDuration}</Typography>
                              </Box>
                              <Box>
                                <Typography variant="body2" color="text.secondary">Next Due</Typography>
                                <Typography fontWeight="medium">{formatDate(history.nextDue)}</Typography>
                              </Box>
                            </Box>
                            <Box sx={{ mb: 1 }}>
                              <Typography variant="body2" color="text.secondary">Parts Replaced:</Typography>
                              <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap', mt: 0.5 }}>
                                {history.partsReplaced.map((part, idx) => (
                                  <Chip key={idx} label={part} size="small" variant="outlined" />
                                ))}
                                {history.partsReplaced.length === 0 && (
                                  <Typography variant="body2" color="text.secondary">No parts replaced</Typography>
                                )}
                              </Box>
                            </Box>
                            <Typography variant="body2" sx={{ fontStyle: 'italic', color: 'text.primary' }}>
                              <strong>Notes:</strong> {history.notes}
                            </Typography>
                          </Box>
                        </Zoom>
                      ))
                    ) : (
                      <Typography color="text.secondary" align="center" sx={{ py: 4 }}>
                        No service history records available.
                      </Typography>
                    )}
                  </Paper>
                </Box>
              )}

              {activeTab === 2 && (
                <Box sx={{ animation: `${fadeInUp} 0.6s ease-out` }}>
                  <Typography variant="h6" gutterBottom sx={{ mb: 3, display: 'flex', alignItems: 'center', gap: 1 }}>
                    <AssignmentIcon /> Service Provider Management ({stats.activeServiceProviders} Active Providers)
                  </Typography>
                  {serviceProviders.length > 0 ? (
                    <Box sx={{ display: 'flex', gap: 3, flexWrap: 'wrap' }}>
                      {serviceProviders.map((provider, index) => (
                        <Zoom in={true} timeout={500 + (index * 100)} key={provider.id}>
                          <Card sx={{ 
                            minWidth: { xs: '100%', md: 300 }, 
                            flex: 1,
                            borderRadius: 3,
                            transition: 'all 0.3s ease',
                            '&:hover': {
                              transform: 'translateY(-6px)',
                              boxShadow: '0 12px 30px rgba(0,0,0,0.15)'
                            }
                          }}>
                            <CardContent sx={{ p: 3 }}>
                              <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 2, mb: 2 }}>
                                <Box sx={{ 
                                  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', 
                                  borderRadius: 2, 
                                  p: 1.5,
                                  color: 'white',
                                  display: 'flex',
                                  alignItems: 'center',
                                  justifyContent: 'center',
                                  width: 50,
                                  height: 50
                                }}>
                                  <Typography variant="h6" fontWeight="bold">
                                    {provider.name.charAt(0)}
                                  </Typography>
                                </Box>
                                <Box sx={{ flex: 1 }}>
                                  <Typography variant="h6">{provider.name}</Typography>
                                  <Typography variant="body2" color="text.secondary">
                                    {provider.serviceType}
                                  </Typography>
                                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mt: 0.5 }}>
                                    <Chip 
                                      label={provider.serviceLevel} 
                                      size="small" 
                                      color="primary" 
                                      variant="outlined"
                                      sx={{ borderRadius: 1 }}
                                    />
                                    <Chip 
                                      label={provider.coverage} 
                                      size="small" 
                                      color="success"
                                      variant="outlined"
                                      sx={{ borderRadius: 1 }}
                                    />
                                  </Box>
                                </Box>
                              </Box>
                              
                              <Box sx={{ mb: 2 }}>
                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                                  <PersonIcon fontSize="small" color="action" />
                                  <Typography variant="body2">{provider.contact}</Typography>
                                </Box>
                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                                  <PhoneIcon fontSize="small" color="action" />
                                  <Typography variant="body2">{provider.phone}</Typography>
                                </Box>
                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
                                  <EmailIcon fontSize="small" color="action" />
                                  <Typography variant="body2">{provider.email}</Typography>
                                </Box>
                              </Box>
                              
                              <Box sx={{ mb: 2 }}>
                                <Typography variant="caption" color="text.secondary">
                                  Specialization
                                </Typography>
                                <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap', mt: 0.5 }}>
                                  {provider.specialization.map((spec, idx) => (
                                    <Chip key={idx} label={spec} size="small" />
                                  ))}
                                </Box>
                              </Box>
                              
                              <Box sx={{ bgcolor: 'action.hover', p: 2, borderRadius: 2 }}>
                                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                                  <Typography variant="body2" color="text.secondary">
                                    Contract Expires
                                  </Typography>
                                  <Typography variant="body2" fontWeight="medium">
                                    {formatDate(provider.contractExpiry)}
                                  </Typography>
                                </Box>
                                <Box sx={{ 
                                  height: 6, 
                                  borderRadius: 3,
                                  bgcolor: 'action.disabledBackground',
                                  position: 'relative',
                                  overflow: 'hidden'
                                }}>
                                  <Box 
                                    sx={{ 
                                      position: 'absolute',
                                      top: 0,
                                      left: 0,
                                      height: '100%',
                                      width: '70%',
                                      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                                      borderRadius: 3
                                    }}
                                  />
                                </Box>
                                <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 1 }}>
                                  <Typography variant="caption" color="text.secondary">
                                    Rating: {provider.rating}/5
                                  </Typography>
                                  <Typography variant="caption" color="text.secondary">
                                    Equipment: {provider.equipmentCount}
                                  </Typography>
                                </Box>
                              </Box>
                            </CardContent>
                          </Card>
                        </Zoom>
                      ))}
                    </Box>
                  ) : (
                    <Typography color="text.secondary" align="center" sx={{ py: 4 }}>
                      No service providers available.
                    </Typography>
                  )}
                </Box>
              )}

              {activeTab === 3 && (
                <Box sx={{ animation: `${fadeInUp} 0.6s ease-out` }}>
                  <Typography variant="h6" gutterBottom sx={{ mb: 3, display: 'flex', alignItems: 'center', gap: 1 }}>
                    <SpeedIcon /> Calibration Tracking ({calibrationItems.length} Items)
                  </Typography>
                  {calibrationItems.length > 0 ? (
                    <>
                      <Paper elevation={0} sx={{ borderRadius: 3, p: 3, mb: 3 }}>
                        <Box sx={{ mb: 3 }}>
                          {calibrationItems.map((item, index) => {
                            const daysUntilDue = getDaysUntilDue(item.calibrationDue || item.dueDate);
                            return (
                              <Fade in={true} timeout={500 + (index * 100)} key={item.id}>
                                <Box
                                  sx={{
                                    p: 2.5,
                                    mb: 2,
                                    borderRadius: 2,
                                    border: 1,
                                    borderColor: daysUntilDue < 0 ? 'error.main' : 
                                               daysUntilDue < 7 ? 'warning.main' : 'divider',
                                    bgcolor: daysUntilDue < 0 ? 'error.lighter' : 
                                            daysUntilDue < 7 ? 'warning.lighter' : 'background.paper',
                                    transition: 'all 0.3s ease',
                                    '&:hover': {
                                      transform: 'translateX(4px)',
                                      boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
                                    }
                                  }}
                                >
                                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                    <Box sx={{ flex: 1 }}>
                                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 1 }}>
                                        <Typography fontWeight="medium" variant="h6">
                                          {item.equipmentName}
                                        </Typography>
                                        <Chip
                                          label={item.department}
                                          size="small"
                                          icon={getDepartmentIcon(item.department)}
                                          sx={{ borderRadius: 1 }}
                                        />
                                        {item.criticalEquipment && (
                                          <Chip
                                            label="Critical"
                                            size="small"
                                            color="error"
                                            sx={{ borderRadius: 1 }}
                                          />
                                        )}
                                      </Box>
                                      <Typography variant="body2" color="text.secondary">
                                        ID: {item.equipmentId} • Location: {item.location}
                                      </Typography>
                                      <Typography variant="body2" color="text.secondary">
                                        Last Calibration: {formatDate(item.lastService)}
                                      </Typography>
                                    </Box>
                                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 3 }}>
                                      <Box sx={{ textAlign: 'right' }}>
                                        <Typography variant="body2" color="text.secondary">
                                          Due Date
                                        </Typography>
                                        <Typography fontWeight="medium" variant="h6">
                                          {formatDate(item.calibrationDue || item.dueDate)}
                                        </Typography>
                                      </Box>
                                      <Chip
                                        label={daysUntilDue < 0 ? 'OVERDUE' : 
                                               daysUntilDue === 0 ? 'DUE TODAY' : 
                                               `${daysUntilDue} days left`}
                                        color={daysUntilDue < 0 ? 'error' : 
                                               daysUntilDue < 7 ? 'warning' : 'primary'}
                                        size="medium"
                                        sx={{ borderRadius: 1, minWidth: 120 }}
                                      />
                                      <Tooltip title="Set Reminder">
                                        <IconButton 
                                          size="small"
                                          sx={{ 
                                            bgcolor: 'primary.main',
                                            color: 'white',
                                            '&:hover': { bgcolor: 'primary.dark' }
                                          }}
                                        >
                                          <NotificationsIcon />
                                        </IconButton>
                                      </Tooltip>
                                    </Box>
                                  </Box>
                                </Box>
                              </Fade>
                            );
                          })}
                        </Box>
                      </Paper>
                      
                      {/* Calibration Statistics */}
                      <Box sx={{ display: 'flex', gap: 3, flexWrap: 'wrap', mb: 3 }}>
                        <StatCard
                          title="Overdue"
                          value={calibrationItems.filter(item => getDaysUntilDue(item.calibrationDue || item.dueDate) < 0).length}
                          subtitle="Calibrations overdue"
                          icon={<ErrorOutlineIcon sx={{ color: 'black', fontSize: 28 }} />}
                          color="#EF4444"
                          gradient="linear-gradient(135deg, #EF4444 0%, #DC2626 100%)"
                          loaded={loaded}
                          delay={0}
                        />
                        <StatCard
                          title="Due This Week"
                          value={calibrationItems.filter(item => {
                            const days = getDaysUntilDue(item.calibrationDue || item.dueDate);
                            return days >= 0 && days < 7;
                          }).length}
                          subtitle="7-day timeframe"
                          icon={<WarningIcon sx={{ color: 'black', fontSize: 28 }} />}
                          color="#F59E0B"
                          gradient="linear-gradient(135deg, #F59E0B 0%, #D97706 100%)"
                          loaded={loaded}
                          delay={200}
                        />
                        <StatCard
                          title="Upcoming"
                          value={calibrationItems.filter(item => getDaysUntilDue(item.calibrationDue || item.dueDate) >= 7).length}
                          subtitle="Future calibrations"
                          icon={<ScheduleIcon sx={{ color: 'black', fontSize: 28 }} />}
                          color="#3B82F6"
                          gradient="linear-gradient(135deg, #3B82F6 0%, #1D4ED8 100%)"
                          loaded={loaded}
                          delay={400}
                        />
                        <StatCard
                          title="Critical"
                          value={calibrationItems.filter(item => item.criticalEquipment).length}
                          subtitle="Life-support equipment"
                          icon={<MonitorHeartIcon sx={{ color: 'black', fontSize: 28 }} />}
                          color="#EC4899"
                          gradient="linear-gradient(135deg, #EC4899 0%, #DB2777 100%)"
                          loaded={loaded}
                          delay={600}
                        />
                      </Box>
                    </>
                  ) : (
                    <Typography color="text.secondary" align="center" sx={{ py: 4 }}>
                      No calibration items available.
                    </Typography>
                  )}
                </Box>
              )}
            </Box>
          </Grow>
        </Box>
      </Slide>

      {/* Add Maintenance Dialog */}
      <Dialog 
        open={openDialog} 
        onClose={handleCloseDialog} 
        maxWidth="sm" 
        fullWidth
        TransitionComponent={Fade}
        transitionDuration={300}
      >
        <DialogTitle sx={{ pb: 2 }}>
          <Typography variant="h6" fontWeight="bold">
            Schedule New Maintenance
          </Typography>
        </DialogTitle>
        <DialogContent>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 2 }}>
            <TextField
              label="Equipment Name"
              value={newMaintenance.equipmentName}
              onChange={(e) => setNewMaintenance({...newMaintenance, equipmentName: e.target.value})}
              fullWidth
              size="small"
            />
            <TextField
              label="Department"
              value={newMaintenance.department}
              onChange={(e) => setNewMaintenance({...newMaintenance, department: e.target.value})}
              fullWidth
              size="small"
            />
            <TextField
              label="Due Date"
              type="date"
              value={newMaintenance.dueDate}
              onChange={(e) => setNewMaintenance({...newMaintenance, dueDate: e.target.value})}
              fullWidth
              size="small"
              InputLabelProps={{ shrink: true }}
            />
            <FormControl fullWidth size="small">
              <InputLabel>Priority</InputLabel>
              <Select
                value={newMaintenance.priority}
                label="Priority"
                onChange={(e) => setNewMaintenance({...newMaintenance, priority: e.target.value})}
              >
                <MenuItem value="High">High</MenuItem>
                <MenuItem value="Medium">Medium</MenuItem>
                <MenuItem value="Low">Low</MenuItem>
              </Select>
            </FormControl>
            <FormControl fullWidth size="small">
              <InputLabel>Maintenance Type</InputLabel>
              <Select
                value={newMaintenance.type}
                label="Maintenance Type"
                onChange={(e) => setNewMaintenance({...newMaintenance, type: e.target.value})}
              >
                <MenuItem value="Preventive Maintenance">Preventive Maintenance</MenuItem>
                <MenuItem value="Corrective Maintenance">Corrective Maintenance</MenuItem>
                <MenuItem value="Calibration">Calibration</MenuItem>
                <MenuItem value="Scheduled Maintenance">Scheduled Maintenance</MenuItem>
              </Select>
            </FormControl>
            <TextField
              label="Assigned Technician"
              value={newMaintenance.technician}
              onChange={(e) => setNewMaintenance({...newMaintenance, technician: e.target.value})}
              fullWidth
              size="small"
            />
          </Box>
        </DialogContent>
        <DialogActions sx={{ p: 2, pt: 0 }}>
          <Button onClick={handleCloseDialog} variant="outlined">
            Cancel
          </Button>
          <Button 
            onClick={handleAddMaintenance} 
            variant="contained"
            sx={{
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              '&:hover': {
                background: 'linear-gradient(135deg, #5a67d8 0%, #6b46c1 100%)'
              }
            }}
          >
            Schedule Maintenance
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default MaintenanceCalibrationTracker;