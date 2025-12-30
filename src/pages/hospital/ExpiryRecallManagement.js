import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Paper,
  Chip,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  TextField,
  MenuItem,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Alert,
  LinearProgress,
  Card,
  CardContent,
  Tabs,
  Tab,
  Badge,
  Tooltip,
  Drawer,
  InputAdornment,
  FormControl,
  InputLabel,
  Select,
  Avatar,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  ListItemSecondaryAction,
  Fab,
  useTheme,
  useMediaQuery,
  Grow,
  Fade,
  Slide,
  Zoom,
  alpha
} from '@mui/material';
import {
  Warning as WarningIcon,
  CheckCircle as CheckCircleIcon,
  Error as ErrorIcon,
  Inventory as InventoryIcon,
  Delete as DeleteIcon,
  Visibility as VisibilityIcon,
  Add as AddIcon,
  CalendarToday as CalendarIcon,
  LocalHospital as HospitalIcon,
  AssignmentTurnedIn as ResolvedIcon,
  HourglassEmpty as PendingIcon,
  MedicalServices as MedicalIcon,
  LocalPharmacy as PharmacyIcon,
  Science as ScienceIcon,
  LocalOffer as OfferIcon,
  Devices as DevicesIcon,
  AccessTime as ClockIcon,
  Timeline as TimelineIcon,
  BarChart as ChartIcon,
  Notifications as NotificationIcon,
  Download as DownloadIcon,
  FilterList as FilterIcon,
  Search as SearchIcon,
  DateRange as DateRangeIcon,
  Inventory2 as Inventory2Icon,
  History as HistoryIcon
} from '@mui/icons-material';

const ExpiryRecallManagement = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  
  const [activeTab, setActiveTab] = useState(0);
  const [expiryItems, setExpiryItems] = useState([]);
  const [recallItems, setRecallItems] = useState([]);
  const [disposalLogs, setDisposalLogs] = useState([]);
  const [openDisposalDialog, setOpenDisposalDialog] = useState(false);
  const [openAddItemDrawer, setOpenAddItemDrawer] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [disposalForm, setDisposalForm] = useState({
    quantity: '',
    reason: '',
    disposalMethod: ''
  });
  const [newItemForm, setNewItemForm] = useState({
    name: '',
    batch: '',
    expiryDate: '',
    quantity: '',
    category: 'Pharmacy',
    location: 'Main Pharmacy'
  });
  const [filterDays, setFilterDays] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [loaded, setLoaded] = useState(false);

  // Initialize with dummy data
  useEffect(() => {
    const loadData = () => {
      // Check if data exists in localStorage
      const savedExpiryData = localStorage.getItem('expiryRecallData');
      const savedRecallData = localStorage.getItem('recallAlerts');
      const savedDisposalData = localStorage.getItem('disposalLogs');

      if (savedExpiryData) {
        setExpiryItems(JSON.parse(savedExpiryData));
      } else {
        // Generate dummy expiry data
        const dummyExpiryData = [
          {
            id: 1,
            name: 'Paracetamol 500mg',
            batch: 'BATCH-001',
            expiryDate: '2024-03-15',
            quantity: 25,
            category: 'Pharmacy',
            location: 'Main Pharmacy',
            daysToExpiry: 15,
            status: 'critical',
            value: '$1250'
          },
          {
            id: 2,
            name: 'Insulin Vials',
            batch: 'BATCH-003',
            expiryDate: '2024-04-10',
            quantity: 50,
            category: 'Pharmacy',
            location: 'ER Storage',
            daysToExpiry: 45,
            status: 'warning',
            value: '$4500'
          },
          {
            id: 3,
            name: 'Saline Solution 500ml',
            batch: 'BATCH-005',
            expiryDate: '2024-05-01',
            quantity: 120,
            category: 'Consumable',
            location: 'ICU Storage',
            daysToExpiry: 65,
            status: 'warning',
            value: '$1200'
          },
          {
            id: 4,
            name: 'Surgical Gloves',
            batch: 'BATCH-004',
            expiryDate: '2024-02-28',
            quantity: 45,
            category: 'Consumable',
            location: 'OR Storage',
            daysToExpiry: -2,
            status: 'expired',
            value: '$450'
          },
          {
            id: 5,
            name: 'Epinephrine 1mg',
            batch: 'BATCH-006',
            expiryDate: '2024-03-05',
            quantity: 30,
            category: 'Pharmacy',
            location: 'Emergency Cart',
            daysToExpiry: 8,
            status: 'critical',
            value: '$9000'
          },
          {
            id: 6,
            name: 'Antiseptic Solution',
            batch: 'BATCH-007',
            expiryDate: '2024-06-15',
            quantity: 80,
            category: 'Consumable',
            location: 'Ward Storage',
            daysToExpiry: 100,
            status: 'safe',
            value: '$800'
          },
          {
            id: 7,
            name: 'Vitamin D3',
            batch: 'BATCH-VD001',
            expiryDate: '2024-02-20',
            quantity: 15,
            category: 'Pharmacy',
            location: 'Main Pharmacy',
            daysToExpiry: -8,
            status: 'expired',
            value: '$150'
          },
          {
            id: 8,
            name: 'Bandages',
            batch: 'BATCH-008',
            expiryDate: '2024-07-01',
            quantity: 200,
            category: 'Consumable',
            location: 'Central Storage',
            daysToExpiry: 115,
            status: 'safe',
            value: '$1000'
          }
        ];
        setExpiryItems(dummyExpiryData);
        localStorage.setItem('expiryRecallData', JSON.stringify(dummyExpiryData));
      }

      if (savedRecallData) {
        setRecallItems(JSON.parse(savedRecallData));
      } else {
        const dummyRecallData = [
          {
            id: 1,
            product: 'Blood Pressure Cuff',
            manufacturer: 'MediCare Devices Inc.',
            batch: 'BP-2023-09',
            recallDate: '2024-01-15',
            severity: 'high',
            reason: 'Potential calibration inaccuracies',
            status: 'pending',
            affectedQuantity: 12,
            urgency: 'Critical'
          },
          {
            id: 2,
            product: 'Sterile Gauze Pads',
            manufacturer: 'SteriHealth Supplies',
            batch: 'SG-2023-11',
            recallDate: '2024-01-20',
            severity: 'medium',
            reason: 'Possible sterilization failure',
            status: 'in-progress',
            affectedQuantity: 200,
            urgency: 'High'
          },
          {
            id: 3,
            product: 'IV Catheter Set',
            manufacturer: 'Vascular Care Inc.',
            batch: 'IV-2023-08',
            recallDate: '2024-01-10',
            severity: 'high',
            reason: 'Risk of leakage',
            status: 'resolved',
            affectedQuantity: 45,
            urgency: 'Critical'
          },
          {
            id: 4,
            product: 'Thermometer Probe Covers',
            manufacturer: 'TempSafe Medical',
            batch: 'TP-2023-12',
            recallDate: '2024-01-25',
            severity: 'low',
            reason: 'Packaging defect',
            status: 'pending',
            affectedQuantity: 150,
            urgency: 'Medium'
          }
        ];
        setRecallItems(dummyRecallData);
        localStorage.setItem('recallAlerts', JSON.stringify(dummyRecallData));
      }

      if (savedDisposalData) {
        setDisposalLogs(JSON.parse(savedDisposalData));
      } else {
        const dummyDisposalData = [
          {
            id: 1,
            itemName: 'Expired Vaccine',
            batch: 'VAC-2022-01',
            disposalDate: '2024-01-10',
            quantity: 25,
            disposedBy: 'Dr. Smith',
            reason: 'Past expiry date',
            method: 'Medical Waste',
            cost: '$1250'
          },
          {
            id: 2,
            itemName: 'Damaged Syringes',
            batch: 'SYR-2023-05',
            disposalDate: '2024-01-12',
            quantity: 100,
            disposedBy: 'Nurse Johnson',
            reason: 'Damaged packaging',
            method: 'Sharps Container',
            cost: '$500'
          },
          {
            id: 3,
            itemName: 'Contaminated Gloves',
            batch: 'GLV-2023-09',
            disposalDate: '2024-01-15',
            quantity: 50,
            disposedBy: 'Pharmacist Lee',
            reason: 'Recall - Sterilization issue',
            method: 'Biohazard Waste',
            cost: '$250'
          }
        ];
        setDisposalLogs(dummyDisposalData);
        localStorage.setItem('disposalLogs', JSON.stringify(dummyDisposalData));
      }
      
      setLoaded(true);
    };

    loadData();
  }, []);

  const getStatusColor = (status) => {
    switch (status) {
      case 'critical':
        return '#ff4444';
      case 'warning':
        return '#ff9800';
      case 'expired':
        return '#f44336';
      case 'safe':
        return '#4caf50';
      default:
        return '#757575';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'critical':
        return <ErrorIcon />;
      case 'warning':
        return <WarningIcon />;
      case 'expired':
        return <ErrorIcon />;
      case 'safe':
        return <CheckCircleIcon />;
      default:
        return <WarningIcon />;
    }
  };

  const getSeverityColor = (severity) => {
    switch (severity) {
      case 'high':
        return '#f44336';
      case 'medium':
        return '#ff9800';
      case 'low':
        return '#2196f3';
      default:
        return '#757575';
    }
  };

  const getCategoryIcon = (category) => {
    switch (category) {
      case 'Pharmacy':
        return <PharmacyIcon />;
      case 'Equipment':
        return <MedicalIcon />;
      case 'Laboratory':
        return <ScienceIcon />;
      case 'Consumable':
        return <InventoryIcon />;
      default:
        return <MedicalIcon />;
    }
  };

  const getCategoryColor = (category) => {
    switch (category) {
      case 'Pharmacy':
        return '#2196f3';
      case 'Equipment':
        return '#4caf50';
      case 'Laboratory':
        return '#9c27b0';
      case 'Consumable':
        return '#ff9800';
      default:
        return '#757575';
    }
  };

  const getRecallStatusColor = (status) => {
    switch (status) {
      case 'pending':
        return '#ff9800';
      case 'in-progress':
        return '#2196f3';
      case 'resolved':
        return '#4caf50';
      default:
        return '#757575';
    }
  };

  const handleOpenDisposalDialog = (item) => {
    setSelectedItem(item);
    setDisposalForm({
      quantity: item.quantity.toString(),
      reason: '',
      disposalMethod: 'Medical Waste'
    });
    setOpenDisposalDialog(true);
  };

  const handleCloseDisposalDialog = () => {
    setOpenDisposalDialog(false);
    setSelectedItem(null);
    setDisposalForm({
      quantity: '',
      reason: '',
      disposalMethod: ''
    });
  };

  const handleOpenAddItemDrawer = () => {
    setNewItemForm({
      name: '',
      batch: '',
      expiryDate: '',
      quantity: '',
      category: 'Pharmacy',
      location: 'Main Pharmacy'
    });
    setOpenAddItemDrawer(true);
  };

  const handleCloseAddItemDrawer = () => {
    setOpenAddItemDrawer(false);
  };

  const handleDisposeItem = () => {
    if (selectedItem && disposalForm.quantity && disposalForm.reason) {
      const newDisposalLog = {
        id: disposalLogs.length + 1,
        itemName: selectedItem.name,
        batch: selectedItem.batch,
        disposalDate: new Date().toISOString().split('T')[0],
        quantity: parseInt(disposalForm.quantity),
        disposedBy: 'Current User',
        reason: disposalForm.reason,
        method: disposalForm.disposalMethod,
        cost: selectedItem.value
      };

      const updatedDisposalLogs = [newDisposalLog, ...disposalLogs];
      setDisposalLogs(updatedDisposalLogs);
      localStorage.setItem('disposalLogs', JSON.stringify(updatedDisposalLogs));

      // Remove disposed item from expiry list
      const updatedExpiryItems = expiryItems.filter(item => item.id !== selectedItem.id);
      setExpiryItems(updatedExpiryItems);
      localStorage.setItem('expiryRecallData', JSON.stringify(updatedExpiryItems));

      handleCloseDisposalDialog();
    }
  };

  const handleAddNewItem = () => {
    if (newItemForm.name && newItemForm.batch && newItemForm.expiryDate && newItemForm.quantity) {
      const expiryDate = new Date(newItemForm.expiryDate);
      const today = new Date();
      const daysToExpiry = Math.ceil((expiryDate - today) / (1000 * 60 * 60 * 24));
      
      let status = 'safe';
      if (daysToExpiry <= 0) status = 'expired';
      else if (daysToExpiry <= 30) status = 'critical';
      else if (daysToExpiry <= 60) status = 'warning';

      const newItem = {
        id: expiryItems.length + 1,
        name: newItemForm.name,
        batch: newItemForm.batch,
        expiryDate: newItemForm.expiryDate,
        quantity: parseInt(newItemForm.quantity),
        category: newItemForm.category,
        location: newItemForm.location,
        daysToExpiry: daysToExpiry,
        status: status,
        value: `$${parseInt(newItemForm.quantity) * 50}` // Mock value calculation
      };

      const updatedExpiryItems = [newItem, ...expiryItems];
      setExpiryItems(updatedExpiryItems);
      localStorage.setItem('expiryRecallData', JSON.stringify(updatedExpiryItems));

      handleCloseAddItemDrawer();
    }
  };

  const updateRecallStatus = (recallId, newStatus) => {
    const updatedRecalls = recallItems.map(recall => 
      recall.id === recallId ? { ...recall, status: newStatus } : recall
    );
    setRecallItems(updatedRecalls);
    localStorage.setItem('recallAlerts', JSON.stringify(updatedRecalls));
  };

  const filteredExpiryItems = expiryItems.filter(item => {
    if (filterDays === 'all') return true;
    if (filterDays === 'critical') return item.daysToExpiry <= 30;
    if (filterDays === 'warning') return item.daysToExpiry > 30 && item.daysToExpiry <= 60;
    if (filterDays === 'safe') return item.daysToExpiry > 60;
    return true;
  }).filter(item => 
    item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.batch.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getExpiryStats = () => {
    const critical = expiryItems.filter(item => item.daysToExpiry <= 30 && item.daysToExpiry > 0).length;
    const warning = expiryItems.filter(item => item.daysToExpiry > 30 && item.daysToExpiry <= 60).length;
    const expired = expiryItems.filter(item => item.daysToExpiry <= 0).length;
    const safe = expiryItems.filter(item => item.daysToExpiry > 60).length;

    return { critical, warning, expired, safe, total: expiryItems.length };
  };

  const stats = getExpiryStats();

const StatCard = ({
  value,
  label,
  subLabel,
  icon: Icon,
  color,
  gradient,
  delay = 0
}) => (
  <Grow in={loaded} timeout={500 + delay}>
    <Card
      sx={{
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
        minWidth: isMobile ? '100%' : 220
      }}
    >
      {/* AI Indicator (same as reference) */}
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
        <Icon sx={{ fontSize: 14, opacity: 0.8 }} />
      </Box>

      <CardContent sx={{ p: 3 }}>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-start'
          }}
        >
          {/* Text Section */}
          <Box>
            <Typography variant="h4" fontWeight={800} sx={{ mb: 0.5 }}>
              {value}
            </Typography>

            <Typography variant="h5" sx={{ opacity: 0.9, fontWeight: 600 }}>
              {label}
            </Typography>

            {subLabel && (
              <Typography variant="h6" sx={{ opacity: 0.8, mt: 1 }}>
                {subLabel}
              </Typography>
            )}
          </Box>

          {/* Icon Box */}
          <Box
            sx={{
              background: 'rgba(255,255,255,0.2)',
              borderRadius: 2,
              p: 1,
              color: 'black',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            <Icon sx={{ fontSize: 28 }} />
          </Box>
        </Box>
      </CardContent>
    </Card>
  </Grow>
);


  const QuickActionButton = ({ icon: Icon, label, color, onClick }) => (
    <Button
      variant="contained"
      startIcon={<Icon />}
      onClick={onClick}
      sx={{
        bgcolor: color,
        color: 'white',
        borderRadius: 2,
        px: 3,
        py: 1.5,
        textTransform: 'none',
        fontWeight: 600,
        boxShadow: `0 4px 12px ${alpha(color, 0.3)}`,
        transition: 'all 0.3s',
        '&:hover': {
          bgcolor: color,
          transform: 'translateY(-2px)',
          boxShadow: `0 6px 16px ${alpha(color, 0.4)}`
        }
      }}
    >
      {label}
    </Button>
  );

  return (
    <Fade in={loaded} timeout={500}>
      <Box sx={{ p: isMobile ? 1 : 3 }}>
        {/* Header with Actions */}
        <Slide in={loaded} direction="down" timeout={300}>
          <Box sx={{ mb: 4 }}>
            <Box sx={{ 
              display: 'flex', 
              justifyContent: 'space-between', 
              alignItems: 'flex-start',
              flexDirection: isMobile ? 'column' : 'row',
              gap: isMobile ? 2 : 0,
              mb: 2
            }}>
              <Box>
                <Typography variant="h4" component="h1" sx={{ 
                  fontWeight: 700, 
                  color: theme.palette.primary.main,
                  display: 'flex',
                  alignItems: 'center',
                  gap: 2
                }}>
                  <WarningIcon fontSize="large" />
                  Expiry & Recall Management
                </Typography>
                <Typography variant="body1" color="text.secondary">
                  Track expiring items and manage recalls to ensure patient safety and regulatory compliance
                </Typography>
              </Box>
              
              <Box sx={{ 
                display: 'flex', 
                gap: 2,
                flexDirection: isMobile ? 'column' : 'row',
                width: isMobile ? '100%' : 'auto'
              }}>
                <QuickActionButton
                  icon={AddIcon}
                  label="Add Expiry Item"
                  color={theme.palette.primary.main}
                  onClick={handleOpenAddItemDrawer}
                />
                <Button
                  variant="outlined"
                  startIcon={<DownloadIcon />}
                  sx={{ borderRadius: 2, textTransform: 'none' }}
                >
                  Export Report
                </Button>
              </Box>
            </Box>

            {/* Search and Filter Bar */}
            <Paper sx={{ 
              p: 2, 
              borderRadius: 2,
              bgcolor: alpha(theme.palette.primary.main, 0.03),
              border: `1px solid ${alpha(theme.palette.primary.main, 0.1)}`
            }}>
              <Box sx={{ 
                display: 'flex', 
                gap: 2,
                flexDirection: isMobile ? 'column' : 'row',
                alignItems: isMobile ? 'stretch' : 'center'
              }}>
                <TextField
                  placeholder="Search items or batches..."
                  variant="outlined"
                  size="small"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <SearchIcon color="action" />
                      </InputAdornment>
                    ),
                  }}
                  sx={{ 
                    flex: 1,
                    '& .MuiOutlinedInput-root': {
                      borderRadius: 2,
                      bgcolor: 'white'
                    }
                  }}
                />
                <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                  {['all', 'critical', 'warning', 'safe'].map((filter) => (
                    <Chip
                      key={filter}
                      label={
                        filter === 'all' ? 'All Items' :
                        filter === 'critical' ? 'Critical (≤30 days)' :
                        filter === 'warning' ? 'Warning (31-60 days)' :
                        'Safe (>60 days)'
                      }
                      onClick={() => setFilterDays(filter)}
                      color={filterDays === filter ? 
                        (filter === 'critical' ? 'error' : 
                         filter === 'warning' ? 'warning' : 
                         filter === 'safe' ? 'success' : 'primary') : 
                        'default'}
                      variant={filterDays === filter ? 'filled' : 'outlined'}
                      icon={filter === 'critical' ? <ErrorIcon /> : 
                            filter === 'warning' ? <WarningIcon /> : 
                            filter === 'safe' ? <CheckCircleIcon /> : <FilterIcon />}
                      sx={{ borderRadius: 2 }}
                    />
                  ))}
                </Box>
              </Box>
            </Paper>
          </Box>
        </Slide>

        {/* Stats Cards with Enhanced Design */}
<Box
  sx={{
    display: 'flex',
    flexDirection: isMobile ? 'column' : 'row',
    gap: 2,
    mb: 4,
    flexWrap: 'wrap'
  }}
>
  <StatCard
    value={stats.critical}
    label="Critical Items"
    subLabel="≤ 30 days to expiry"
    icon={ErrorIcon}
    color="#667eea"
    gradient="linear-gradient(135deg, #667eea 0%, #764ba2 100%)"
  />

  <StatCard
    value={stats.warning}
    label="Warning Items"
    subLabel="31–60 days to expiry"
    icon={WarningIcon}
    color="#F59E0B"
    gradient="linear-gradient(135deg, #F59E0B 0%, #D97706 100%)"
    delay={200}
  />

  <StatCard
    value={stats.expired}
    label="Expired Items"
    subLabel="Require immediate action"
    icon={HistoryIcon}
    color="#EF4444"
    gradient="linear-gradient(135deg, #EF4444 0%, #DC2626 100%)"
    delay={400}
  />

  <StatCard
    value={stats.safe}
    label="Safe Items"
    subLabel="> 60 days to expiry"
    icon={CheckCircleIcon}
    color="#8B5CF6"
    gradient="linear-gradient(135deg, #8B5CF6 0%, #7C3AED 100%)"
    delay={600}
  />
</Box>


        {/* Tabs */}
        <Grow in={loaded} timeout={600}>
          <Paper sx={{ 
            mb: 3, 
            borderRadius: 2,
            overflow: 'hidden',
            boxShadow: '0 4px 12px rgba(0,0,0,0.05)'
          }}>
            <Tabs 
              value={activeTab} 
              onChange={(e, newValue) => setActiveTab(newValue)}
              variant={isMobile ? "scrollable" : "fullWidth"}
              scrollButtons={isMobile ? "auto" : false}
              sx={{
                '& .MuiTab-root': {
                  textTransform: 'none',
                  fontWeight: 600,
                  fontSize: '0.95rem',
                  minHeight: 60
                },
                '& .Mui-selected': {
                  color: theme.palette.primary.main + '!important'
                }
              }}
              TabIndicatorProps={{
                style: {
                  backgroundColor: theme.palette.primary.main,
                  height: 3
                }
              }}
            >
              <Tab 
                icon={<Badge badgeContent={stats.critical + stats.warning} color="error" />}
                iconPosition="start"
                label="Upcoming Expiries" 
              />
              <Tab 
                icon={<Badge badgeContent={recallItems.filter(r => r.status !== 'resolved').length} color="error" />}
                iconPosition="start"
                label="Recall Alerts" 
              />
              <Tab 
                icon={<InventoryIcon />}
                label="Disposal Log" 
              />
              <Tab 
                icon={<TimelineIcon />}
                label="Trends & Analytics" 
              />
            </Tabs>
          </Paper>
        </Grow>

        {/* Tab Content */}
        <Grow in={loaded} timeout={700}>
          <Box>
            {activeTab === 0 && (
              <Box>
                <TableContainer component={Paper} sx={{ 
                  borderRadius: 2,
                  boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
                  overflow: 'hidden'
                }}>
                  <Table>
                    <TableHead sx={{ bgcolor: alpha(theme.palette.primary.main, 0.05) }}>
                      <TableRow>
                        <TableCell sx={{ fontWeight: 600 }}>Item Details</TableCell>
                        <TableCell sx={{ fontWeight: 600 }}>Batch & Expiry</TableCell>
                        <TableCell sx={{ fontWeight: 600 }}>Status</TableCell>
                        <TableCell sx={{ fontWeight: 600 }}>Category</TableCell>
                        <TableCell sx={{ fontWeight: 600 }}>Quantity</TableCell>
                        <TableCell sx={{ fontWeight: 600 }}>Location</TableCell>
                        <TableCell sx={{ fontWeight: 600 }}>Value</TableCell>
                        <TableCell sx={{ fontWeight: 600 }}>Actions</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {filteredExpiryItems.map((item, index) => (
                        <Grow in={true} timeout={300} key={item.id} style={{ transitionDelay: `${index * 50}ms` }}>
                          <TableRow 
                            sx={{
                              backgroundColor: item.status === 'expired' ? alpha('#f44336', 0.05) : 'transparent',
                              '&:hover': { 
                                backgroundColor: alpha(theme.palette.primary.main, 0.04),
                                transition: 'background-color 0.3s'
                              },
                              borderLeft: `4px solid ${getStatusColor(item.status)}`
                            }}
                          >
                            <TableCell>
                              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                                <Avatar sx={{ 
                                  bgcolor: alpha(getCategoryColor(item.category), 0.1),
                                  color: getCategoryColor(item.category)
                                }}>
                                  {getCategoryIcon(item.category)}
                                </Avatar>
                                <Box>
                                  <Typography variant="body1" fontWeight={500}>
                                    {item.name}
                                  </Typography>
                                  <Typography variant="caption" color="text.secondary">
                                    ID: {item.id.toString().padStart(4, '0')}
                                  </Typography>
                                </Box>
                              </Box>
                            </TableCell>
                            <TableCell>
                              <Box>
                                <Chip 
                                  label={item.batch} 
                                  size="small" 
                                  variant="outlined" 
                                  sx={{ mb: 0.5 }}
                                />
                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, mt: 0.5 }}>
                                  <CalendarIcon fontSize="small" color="action" />
                                  <Typography variant="body2">
                                    {item.expiryDate}
                                  </Typography>
                                </Box>
                              </Box>
                            </TableCell>
                            <TableCell>
                              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                <Box sx={{ 
                                  width: 8, 
                                  height: 8, 
                                  borderRadius: '50%', 
                                  bgcolor: getStatusColor(item.status) 
                                }} />
                                <Chip 
                                  icon={getStatusIcon(item.status)}
                                  label={
                                    item.daysToExpiry <= 0 ? 
                                    `Expired ${Math.abs(item.daysToExpiry)}d ago` : 
                                    `${item.daysToExpiry}d left`
                                  }
                                  color={item.status === 'critical' || item.status === 'expired' ? 'error' : 
                                         item.status === 'warning' ? 'warning' : 'success'}
                                  size="small"
                                  sx={{ fontWeight: 500 }}
                                />
                              </Box>
                            </TableCell>
                            <TableCell>
                              <Chip 
                                label={item.category}
                                size="small"
                                sx={{ 
                                  bgcolor: alpha(getCategoryColor(item.category), 0.1),
                                  color: getCategoryColor(item.category),
                                  fontWeight: 500
                                }}
                              />
                            </TableCell>
                            <TableCell>
                              <Typography variant="body1" fontWeight={500}>
                                {item.quantity}
                                <Typography component="span" variant="caption" color="text.secondary" sx={{ ml: 1 }}>
                                  units
                                </Typography>
                              </Typography>
                            </TableCell>
                            <TableCell>
                              <Typography variant="body2">
                                {item.location}
                              </Typography>
                            </TableCell>
                            <TableCell>
                              <Typography variant="body1" fontWeight={600} color="primary">
                                {item.value}
                              </Typography>
                            </TableCell>
                            <TableCell>
                              <Box sx={{ display: 'flex', gap: 1 }}>
                                {item.status === 'expired' && (
                                  <Tooltip title="Dispose Item">
                                    <IconButton 
                                      color="error"
                                      onClick={() => handleOpenDisposalDialog(item)}
                                      size="small"
                                      sx={{
                                        '&:hover': {
                                          bgcolor: alpha('#f44336', 0.1)
                                        }
                                      }}
                                    >
                                      <DeleteIcon />
                                    </IconButton>
                                  </Tooltip>
                                )}
                                <Tooltip title="View Details">
                                  <IconButton 
                                    size="small"
                                    sx={{
                                      '&:hover': {
                                        bgcolor: alpha(theme.palette.primary.main, 0.1)
                                      }
                                    }}
                                  >
                                    <VisibilityIcon />
                                  </IconButton>
                                </Tooltip>
                                <Tooltip title="Transfer">
                                  <IconButton 
                                    size="small"
                                    sx={{
                                      '&:hover': {
                                        bgcolor: alpha(theme.palette.secondary.main, 0.1)
                                      }
                                    }}
                                  >
                                    <Inventory2Icon />
                                  </IconButton>
                                </Tooltip>
                              </Box>
                            </TableCell>
                          </TableRow>
                        </Grow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
                
                {filteredExpiryItems.length === 0 && (
                  <Paper sx={{ 
                    p: 8, 
                    textAlign: 'center',
                    borderRadius: 2,
                    bgcolor: alpha(theme.palette.primary.main, 0.02)
                  }}>
                    <InventoryIcon sx={{ fontSize: 64, color: 'text.disabled', mb: 2 }} />
                    <Typography variant="h6" color="text.secondary" gutterBottom>
                      No items found
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {searchTerm ? 'Try adjusting your search criteria' : 'Add new items to start tracking'}
                    </Typography>
                  </Paper>
                )}
              </Box>
            )}

            {activeTab === 1 && (
              <Box>
                <Box sx={{ mb: 3 }}>
                  <Alert 
                    severity="warning" 
                    icon={<NotificationIcon />}
                    sx={{ 
                      mb: 2,
                      borderRadius: 2,
                      alignItems: 'center'
                    }}
                  >
                    <Typography variant="body1" fontWeight={600}>
                      Active recall alerts require immediate attention to ensure patient safety
                    </Typography>
                  </Alert>
                </Box>

                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                  {recallItems.map((recall, index) => (
                    <Grow in={true} timeout={400} key={recall.id} style={{ transitionDelay: `${index * 100}ms` }}>
                      <Paper sx={{ 
                        p: 3, 
                        borderRadius: 2,
                        borderLeft: `4px solid ${getSeverityColor(recall.severity)}`,
                        boxShadow: `0 4px 12px ${alpha(getSeverityColor(recall.severity), 0.1)}`,
                        transition: 'transform 0.3s, box-shadow 0.3s',
                        '&:hover': {
                          transform: 'translateY(-2px)',
                          boxShadow: `0 6px 16px ${alpha(getSeverityColor(recall.severity), 0.15)}`
                        }
                      }}>
                        <Box sx={{ 
                          display: 'flex', 
                          justifyContent: 'space-between',
                          alignItems: 'flex-start',
                          flexDirection: isMobile ? 'column' : 'row',
                          gap: isMobile ? 2 : 0
                        }}>
                          <Box sx={{ flex: 1 }}>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 1.5 }}>
                              <Chip 
                                label={`${recall.severity.toUpperCase()} PRIORITY`} 
                                color={recall.severity === 'high' ? 'error' : 
                                       recall.severity === 'medium' ? 'warning' : 'info'}
                                size="small"
                                sx={{ fontWeight: 700 }}
                              />
                              <Typography variant="h6" sx={{ fontWeight: 600 }}>
                                {recall.product}
                              </Typography>
                            </Box>
                            
                            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2, mb: 2 }}>
                              <Box>
                                <Typography variant="caption" color="text.secondary" display="block">
                                  Manufacturer
                                </Typography>
                                <Typography variant="body2" fontWeight={500}>
                                  {recall.manufacturer}
                                </Typography>
                              </Box>
                              <Box>
                                <Typography variant="caption" color="text.secondary" display="block">
                                  Batch Number
                                </Typography>
                                <Chip 
                                  label={recall.batch} 
                                  size="small" 
                                  variant="outlined"
                                  sx={{ mt: 0.5 }}
                                />
                              </Box>
                              <Box>
                                <Typography variant="caption" color="text.secondary" display="block">
                                  Recall Date
                                </Typography>
                                <Typography variant="body2" fontWeight={500}>
                                  {recall.recallDate}
                                </Typography>
                              </Box>
                              <Box>
                                <Typography variant="caption" color="text.secondary" display="block">
                                  Affected Quantity
                                </Typography>
                                <Typography variant="body2" fontWeight={500} color="error">
                                  {recall.affectedQuantity} units
                                </Typography>
                              </Box>
                            </Box>

                            <Alert 
                              severity="info" 
                              sx={{ 
                                borderRadius: 1,
                                bgcolor: alpha('#2196f3', 0.05)
                              }}
                            >
                              <Typography variant="body2">
                                {recall.reason}
                              </Typography>
                            </Alert>
                          </Box>
                          
                          <Box sx={{ 
                            display: 'flex', 
                            flexDirection: 'column', 
                            alignItems: 'flex-end',
                            gap: 2,
                            minWidth: isMobile ? '100%' : 180
                          }}>
                            <Box sx={{ textAlign: 'right' }}>
                              <Chip 
                                icon={recall.status === 'resolved' ? <ResolvedIcon /> : <PendingIcon />}
                                label={recall.status.replace('-', ' ').toUpperCase()}
                                sx={{ 
                                  bgcolor: alpha(getRecallStatusColor(recall.status), 0.1),
                                  color: getRecallStatusColor(recall.status),
                                  fontWeight: 600,
                                  mb: 1
                                }}
                              />
                              <Typography variant="caption" color="text.secondary">
                                Urgency: {recall.urgency}
                              </Typography>
                            </Box>
                            
                            <Box sx={{ display: 'flex', gap: 1, flexDirection: isMobile ? 'row' : 'column', width: '100%' }}>
                              {recall.status !== 'resolved' && (
                                <>
                                  <Button
                                    fullWidth={isMobile}
                                    size="small"
                                    variant="contained"
                                    onClick={() => updateRecallStatus(recall.id, 'in-progress')}
                                    disabled={recall.status === 'in-progress'}
                                    sx={{ 
                                      borderRadius: 1.5,
                                      textTransform: 'none',
                                      fontWeight: 600
                                    }}
                                  >
                                    {recall.status === 'pending' ? 'Start Process' : 'In Progress'}
                                  </Button>
                                  <Button
                                    fullWidth={isMobile}
                                    size="small"
                                    variant="contained"
                                    color="success"
                                    onClick={() => updateRecallStatus(recall.id, 'resolved')}
                                    sx={{ 
                                      borderRadius: 1.5,
                                      textTransform: 'none',
                                      fontWeight: 600
                                    }}
                                  >
                                    Mark Resolved
                                  </Button>
                                </>
                              )}
                              <Button
                                fullWidth={isMobile}
                                size="small"
                                variant="outlined"
                                sx={{ 
                                  borderRadius: 1.5,
                                  textTransform: 'none'
                                }}
                              >
                                View Details
                              </Button>
                            </Box>
                          </Box>
                        </Box>
                      </Paper>
                    </Grow>
                  ))}
                </Box>
              </Box>
            )}

            {activeTab === 2 && (
              <Box>
                <Box sx={{ mb: 3 }}>
                  <Box sx={{ 
                    display: 'flex', 
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    flexDirection: isMobile ? 'column' : 'row',
                    gap: isMobile ? 2 : 0,
                    mb: 2
                  }}>
                    <Typography variant="h6">
                      Disposal History & Audit Trail
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Total Disposal Value: ${disposalLogs.reduce((sum, log) => sum + parseInt(log.cost?.replace('$', '') || 0), 0).toLocaleString()}
                    </Typography>
                  </Box>
                </Box>

                <TableContainer component={Paper} sx={{ borderRadius: 2 }}>
                  <Table>
                    <TableHead sx={{ bgcolor: alpha('#9c27b0', 0.05) }}>
                      <TableRow>
                        <TableCell sx={{ fontWeight: 600 }}>Item Details</TableCell>
                        <TableCell sx={{ fontWeight: 600 }}>Disposal Info</TableCell>
                        <TableCell sx={{ fontWeight: 600 }}>Reason & Method</TableCell>
                        <TableCell sx={{ fontWeight: 600 }}>Cost Impact</TableCell>
                        <TableCell sx={{ fontWeight: 600 }}>Disposed By</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {disposalLogs.map((log, index) => (
                        <Grow in={true} timeout={300} key={log.id} style={{ transitionDelay: `${index * 50}ms` }}>
                          <TableRow
                            sx={{
                              '&:hover': { 
                                backgroundColor: alpha('#9c27b0', 0.04),
                                transition: 'background-color 0.3s'
                              }
                            }}
                          >
                            <TableCell>
                              <Box>
                                <Typography variant="body1" fontWeight={500}>
                                  {log.itemName}
                                </Typography>
                                <Chip 
                                  label={log.batch} 
                                  size="small" 
                                  variant="outlined"
                                  sx={{ mt: 0.5 }}
                                />
                              </Box>
                            </TableCell>
                            <TableCell>
                              <Box>
                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 0.5 }}>
                                  <DateRangeIcon fontSize="small" color="action" />
                                  <Typography variant="body2">
                                    {log.disposalDate}
                                  </Typography>
                                </Box>
                                <Typography variant="body1" fontWeight={500}>
                                  {log.quantity} units
                                </Typography>
                              </Box>
                            </TableCell>
                            <TableCell>
                              <Box>
                                <Typography variant="body2" sx={{ mb: 0.5 }}>
                                  {log.reason}
                                </Typography>
                                <Chip 
                                  label={log.method}
                                  size="small"
                                  sx={{ 
                                    bgcolor: alpha('#9c27b0', 0.1),
                                    color: '#9c27b0',
                                    fontWeight: 500
                                  }}
                                />
                              </Box>
                            </TableCell>
                            <TableCell>
                              <Typography variant="body1" fontWeight={600} color="error">
                                {log.cost}
                              </Typography>
                              <Typography variant="caption" color="text.secondary">
                                Financial loss
                              </Typography>
                            </TableCell>
                            <TableCell>
                              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                <Avatar sx={{ width: 32, height: 32, fontSize: '0.875rem' }}>
                                  {log.disposedBy.split(' ').map(n => n[0]).join('')}
                                </Avatar>
                                <Typography variant="body2">
                                  {log.disposedBy}
                                </Typography>
                              </Box>
                            </TableCell>
                          </TableRow>
                        </Grow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </Box>
            )}

            {activeTab === 3 && (
              <Box>
                <Paper sx={{ 
                  p: 4, 
                  borderRadius: 2,
                  textAlign: 'center',
                  bgcolor: alpha(theme.palette.primary.main, 0.02)
                }}>
                  <TimelineIcon sx={{ fontSize: 64, color: theme.palette.primary.main, mb: 2 }} />
                  <Typography variant="h6" color="text.primary" gutterBottom>
                    Trends & Analytics Coming Soon
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ maxWidth: 400, mx: 'auto' }}>
                    Advanced analytics and trend visualization for expiry patterns, cost analysis, 
                    and predictive insights will be available in the next update.
                  </Typography>
                </Paper>
              </Box>
            )}
          </Box>
        </Grow>

        {/* AI Recommendations */}
        <Grow in={loaded} timeout={800}>
          <Paper sx={{ 
            p: 3, 
            mt: 4, 
            borderRadius: 2,
            bgcolor: alpha(theme.palette.primary.main, 0.05),
            border: `1px solid ${alpha(theme.palette.primary.main, 0.2)}`,
            boxShadow: '0 4px 12px rgba(0,0,0,0.05)'
          }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <Box>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                  <HospitalIcon color="primary" />
                  <Typography variant="h6" sx={{ fontWeight: 600 }}>
                    AI-Powered Recommendations
                  </Typography>
                </Box>
                <Typography variant="body2" paragraph>
                  {stats.critical > 0 ? 
                    `🔴 **Priority Action Required**: Dispose of ${stats.critical} critical items expiring within 30 days. ` +
                    `Consider transferring excess stock of ${expiryItems.filter(i => i.daysToExpiry > 60 && i.quantity > 50).length} items to departments with higher consumption rates.` :
                    '✅ **All Systems Optimal**: No critical items requiring immediate attention. Maintain regular monitoring schedule.'
                  }
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Next scheduled audit: March 15, 2024 • Estimated cost savings from timely disposal: $12,500
                </Typography>
              </Box>
              <Box sx={{ textAlign: 'right' }}>
                <Chip 
                  label="94% Accuracy" 
                  color="primary" 
                  sx={{ 
                    fontWeight: 600,
                    mb: 1
                  }}
                />
                <Typography variant="caption" color="text.secondary" display="block">
                  AI Confidence Score
                </Typography>
              </Box>
            </Box>
          </Paper>
        </Grow>

        {/* Add Item FAB for Mobile */}
        {isMobile && (
          <Fab
            color="primary"
            aria-label="add"
            onClick={handleOpenAddItemDrawer}
            sx={{
              position: 'fixed',
              bottom: 16,
              right: 16,
              zIndex: 1000,
              boxShadow: `0 4px 12px ${alpha(theme.palette.primary.main, 0.3)}`
            }}
          >
            <AddIcon />
          </Fab>
        )}

        {/* Disposal Dialog */}
        <Dialog 
          open={openDisposalDialog} 
          onClose={handleCloseDisposalDialog}
          TransitionComponent={Slide}
          TransitionProps={{ direction: 'up' }}
          PaperProps={{
            sx: { borderRadius: 2 }
          }}
        >
          <DialogTitle sx={{ 
            bgcolor: alpha('#f44336', 0.05),
            borderBottom: `1px solid ${alpha('#f44336', 0.1)}`
          }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <Avatar sx={{ bgcolor: '#f44336', color: 'white' }}>
                <DeleteIcon />
              </Avatar>
              <Box>
                <Typography variant="h6" sx={{ fontWeight: 600 }}>
                  Dispose Inventory Item
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  {selectedItem?.name} • Batch: {selectedItem?.batch}
                </Typography>
              </Box>
            </Box>
          </DialogTitle>
          <DialogContent sx={{ pt: 3 }}>
            {selectedItem && (
              <Box>
                <Alert 
                  severity="error" 
                  icon={<WarningIcon />}
                  sx={{ mb: 3, borderRadius: 1.5 }}
                >
                  <Typography variant="body2" fontWeight={600}>
                    This action cannot be undone. All disposal records are permanently logged in the audit trail.
                  </Typography>
                </Alert>
                
                <Box sx={{ 
                  p: 2, 
                  mb: 3, 
                  borderRadius: 1.5,
                  bgcolor: alpha('#f44336', 0.03),
                  border: `1px solid ${alpha('#f44336', 0.1)}`
                }}>
                  <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                    Item Details
                  </Typography>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                    <Typography variant="body2">Current Stock:</Typography>
                    <Typography variant="body2" fontWeight={600}>{selectedItem.quantity} units</Typography>
                  </Box>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                    <Typography variant="body2">Expiry Status:</Typography>
                    <Chip 
                      label={selectedItem.status === 'expired' ? 'EXPIRED' : 'CRITICAL'}
                      color="error"
                      size="small"
                    />
                  </Box>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Typography variant="body2">Inventory Value:</Typography>
                    <Typography variant="body2" fontWeight={600} color="error">{selectedItem.value}</Typography>
                  </Box>
                </Box>
                
                <TextField
                  fullWidth
                  label="Quantity to Dispose"
                  value={disposalForm.quantity}
                  onChange={(e) => setDisposalForm({...disposalForm, quantity: e.target.value})}
                  type="number"
                  sx={{ mb: 2 }}
                  helperText={`Maximum: ${selectedItem.quantity} units available`}
                  InputProps={{
                    endAdornment: <InputAdornment position="end">units</InputAdornment>,
                  }}
                />
                
                <TextField
                  select
                  fullWidth
                  label="Disposal Method"
                  value={disposalForm.disposalMethod}
                  onChange={(e) => setDisposalForm({...disposalForm, disposalMethod: e.target.value})}
                  sx={{ mb: 2 }}
                >
                  <MenuItem value="Medical Waste">🏥 Medical Waste</MenuItem>
                  <MenuItem value="Sharps Container">💉 Sharps Container</MenuItem>
                  <MenuItem value="Biohazard Waste">⚠️ Biohazard Waste</MenuItem>
                  <MenuItem value="Pharmaceutical Waste">💊 Pharmaceutical Waste</MenuItem>
                  <MenuItem value="Return to Supplier">↪️ Return to Supplier</MenuItem>
                </TextField>
                
                <TextField
                  fullWidth
                  label="Reason for Disposal"
                  value={disposalForm.reason}
                  onChange={(e) => setDisposalForm({...disposalForm, reason: e.target.value})}
                  multiline
                  rows={3}
                  sx={{ mb: 2 }}
                  placeholder="Provide detailed reason for disposal..."
                />
              </Box>
            )}
          </DialogContent>
          <DialogActions sx={{ 
            p: 2,
            borderTop: `1px solid ${theme.palette.divider}`
          }}>
            <Button 
              onClick={handleCloseDisposalDialog}
              sx={{ 
                borderRadius: 1.5,
                textTransform: 'none',
                fontWeight: 600
              }}
            >
              Cancel
            </Button>
            <Button 
              onClick={handleDisposeItem} 
              variant="contained" 
              color="error"
              disabled={!disposalForm.quantity || !disposalForm.reason}
              sx={{ 
                borderRadius: 1.5,
                textTransform: 'none',
                fontWeight: 600,
                px: 3
              }}
            >
              Confirm Disposal
            </Button>
          </DialogActions>
        </Dialog>

        {/* Add Item Drawer */}
        <Drawer
          anchor="right"
          open={openAddItemDrawer}
          onClose={handleCloseAddItemDrawer}
          PaperProps={{
            sx: { 
              width: isMobile ? '100%' : 400,
              p: 3
            }
          }}
        >
          <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
            <Box sx={{ mb: 3 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 1 }}>
                <Avatar sx={{ bgcolor: theme.palette.primary.main, color: 'white' }}>
                  <AddIcon />
                </Avatar>
                <Typography variant="h6" sx={{ fontWeight: 600 }}>
                  Add New Expiry Item
                </Typography>
              </Box>
              <Typography variant="body2" color="text.secondary">
                Add new inventory items to track expiry dates
              </Typography>
            </Box>

            <Box sx={{ flex: 1, overflow: 'auto' }}>
              <TextField
                fullWidth
                label="Item Name"
                value={newItemForm.name}
                onChange={(e) => setNewItemForm({...newItemForm, name: e.target.value})}
                sx={{ mb: 2 }}
                required
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <MedicalIcon color="action" />
                    </InputAdornment>
                  ),
                }}
              />
              
              <TextField
                fullWidth
                label="Batch Number"
                value={newItemForm.batch}
                onChange={(e) => setNewItemForm({...newItemForm, batch: e.target.value})}
                sx={{ mb: 2 }}
                required
                placeholder="BATCH-XXXX"
              />
              
              <TextField
                fullWidth
                label="Expiry Date"
                type="date"
                value={newItemForm.expiryDate}
                onChange={(e) => setNewItemForm({...newItemForm, expiryDate: e.target.value})}
                sx={{ mb: 2 }}
                required
                InputLabelProps={{ shrink: true }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <CalendarIcon color="action" />
                    </InputAdornment>
                  ),
                }}
              />
              
              <TextField
                fullWidth
                label="Quantity"
                type="number"
                value={newItemForm.quantity}
                onChange={(e) => setNewItemForm({...newItemForm, quantity: e.target.value})}
                sx={{ mb: 2 }}
                required
                InputProps={{
                  endAdornment: <InputAdornment position="end">units</InputAdornment>,
                }}
              />
              
              <TextField
                select
                fullWidth
                label="Category"
                value={newItemForm.category}
                onChange={(e) => setNewItemForm({...newItemForm, category: e.target.value})}
                sx={{ mb: 2 }}
              >
                <MenuItem value="Pharmacy">💊 Pharmacy</MenuItem>
                <MenuItem value="Equipment">🏥 Equipment</MenuItem>
                <MenuItem value="Laboratory">🔬 Laboratory</MenuItem>
                <MenuItem value="Consumable">📦 Consumable</MenuItem>
              </TextField>
              
              <TextField
                select
                fullWidth
                label="Storage Location"
                value={newItemForm.location}
                onChange={(e) => setNewItemForm({...newItemForm, location: e.target.value})}
                sx={{ mb: 2 }}
              >
                <MenuItem value="Main Pharmacy">🏥 Main Pharmacy</MenuItem>
                <MenuItem value="ER Storage">🚑 ER Storage</MenuItem>
                <MenuItem value="ICU Storage">💙 ICU Storage</MenuItem>
                <MenuItem value="OR Storage">🔪 OR Storage</MenuItem>
                <MenuItem value="Central Storage">🏢 Central Storage</MenuItem>
                <MenuItem value="Ward Storage">🛏️ Ward Storage</MenuItem>
              </TextField>
            </Box>

            <Box sx={{ mt: 3, pt: 2, borderTop: `1px solid ${theme.palette.divider}` }}>
              <Button
                fullWidth
                variant="contained"
                onClick={handleAddNewItem}
                disabled={!newItemForm.name || !newItemForm.batch || !newItemForm.expiryDate || !newItemForm.quantity}
                sx={{ 
                  mb: 1,
                  borderRadius: 1.5,
                  py: 1.5,
                  textTransform: 'none',
                  fontWeight: 600
                }}
              >
                Add Item to Tracking
              </Button>
              <Button
                fullWidth
                onClick={handleCloseAddItemDrawer}
                sx={{ 
                  borderRadius: 1.5,
                  textTransform: 'none'
                }}
              >
                Cancel
              </Button>
            </Box>
          </Box>
        </Drawer>
      </Box>
    </Fade>
  );
};

export default ExpiryRecallManagement;