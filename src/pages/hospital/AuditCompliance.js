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
  Card,
  CardContent,
  Tabs,
  Tab,
  Badge,
  Tooltip,
  Avatar,
  InputAdornment,
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  LinearProgress,
  useTheme,
  useMediaQuery,
  Grow,
  Fade,
  Slide,
  Zoom,
  alpha,
  CircularProgress
} from '@mui/material';
import {
  History as HistoryIcon,
  VerifiedUser as VerifiedIcon,
  Warning as WarningIcon,
  CheckCircle as CheckCircleIcon,
  Error as ErrorIcon,
  Search as SearchIcon,
  FilterList as FilterIcon,
  Download as DownloadIcon,
  PictureAsPdf as PdfIcon,
  InsertChart as ChartIcon,
  Timeline as TimelineIcon,
  CalendarToday as CalendarIcon,
  Person as PersonIcon,
  Inventory as InventoryIcon,
  LocalShipping as ShippingIcon,
  Delete as DeleteIcon,
  Add as AddIcon,
  Remove as RemoveIcon,
  CompareArrows as TransferIcon,
  LocalHospital as HospitalIcon,
  Assignment as AssignmentIcon,
  Description as DescriptionIcon,
  Lock as LockIcon,
  Visibility as VisibilityIcon,
  Refresh as RefreshIcon,
  TrendingUp as TrendingUpIcon,
  TrendingDown as TrendingDownIcon,
  Security as SecurityIcon,
  AccountCircle as AccountIcon,
  DateRange as DateRangeIcon,
  FolderOpen as FolderIcon
} from '@mui/icons-material';

const AuditComplianceLog = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  
  const [activeTab, setActiveTab] = useState(0);
  const [auditLogs, setAuditLogs] = useState([]);
  const [reconciliationData, setReconciliationData] = useState([]);
  const [complianceStats, setComplianceStats] = useState({});
  const [filters, setFilters] = useState({
    actionType: 'all',
    user: 'all',
    department: 'all',
    item: '',
    startDate: '',
    endDate: ''
  });
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedLog, setSelectedLog] = useState(null);
  const [openDetailsDialog, setOpenDetailsDialog] = useState(false);
  const [openExportDialog, setOpenExportDialog] = useState(false);
  const [loaded, setLoaded] = useState(false);

  // Initialize with dummy data
  useEffect(() => {
    const loadData = () => {
      // Check if data exists in localStorage
      const savedAuditLogs = localStorage.getItem('auditLogs');
      const savedReconciliation = localStorage.getItem('reconciliationData');
      const savedCompliance = localStorage.getItem('complianceStats');

      if (savedAuditLogs) {
        setAuditLogs(JSON.parse(savedAuditLogs));
      } else {
        // Generate dummy audit log data
        const dummyAuditLogs = [
          {
            id: 1001,
            timestamp: '2024-01-22 14:30:25',
            user: 'Dr. Sarah Chen',
            userId: 'DRSC001',
            role: 'Physician',
            actionType: 'issue',
            actionCategory: 'critical',
            item: 'Epinephrine 1mg',
            itemId: 'EPI-001',
            quantity: 5,
            previousQuantity: 35,
            newQuantity: 30,
            department: 'Emergency Room',
            location: 'ER Storage Unit A',
            referenceId: 'ER-ISSUE-2024-001',
            notes: 'Emergency patient treatment',
            ipAddress: '192.168.1.105',
            device: 'Tablet ER-03',
            verified: true
          },
          {
            id: 1002,
            timestamp: '2024-01-22 13:15:42',
            user: 'Nurse James Wilson',
            userId: 'NURJW001',
            role: 'Nurse',
            actionType: 'adjustment',
            actionCategory: 'warning',
            item: 'Surgical Gloves',
            itemId: 'SG-005',
            quantity: -50,
            previousQuantity: 500,
            newQuantity: 450,
            department: 'Operating Room',
            location: 'OR Storage',
            referenceId: 'ADJ-2024-022',
            notes: 'Damaged batch disposal',
            ipAddress: '192.168.1.108',
            device: 'Desktop OR-01',
            verified: true
          },
          {
            id: 1003,
            timestamp: '2024-01-22 11:45:18',
            user: 'Pharmacist Maria Garcia',
            userId: 'PHMG001',
            role: 'Pharmacist',
            actionType: 'receipt',
            actionCategory: 'normal',
            item: 'Insulin Vials',
            itemId: 'INS-003',
            quantity: 100,
            previousQuantity: 50,
            newQuantity: 150,
            department: 'Pharmacy',
            location: 'Main Pharmacy Cold Storage',
            referenceId: 'REC-2024-015',
            notes: 'Monthly restock from MediCare',
            ipAddress: '192.168.1.112',
            device: 'Laptop PH-02',
            verified: true
          },
          {
            id: 1004,
            timestamp: '2024-01-22 10:20:33',
            user: 'Dr. Michael Rodriguez',
            userId: 'DRMR001',
            role: 'Physician',
            actionType: 'transfer',
            actionCategory: 'normal',
            item: 'Patient Monitors',
            itemId: 'PM-012',
            quantity: 2,
            previousQuantity: 8,
            newQuantity: 6,
            department: 'ICU',
            location: 'ICU to ER Transfer',
            referenceId: 'TRF-2024-008',
            notes: 'Emergency equipment transfer',
            ipAddress: '192.168.1.106',
            device: 'Mobile Device',
            verified: true
          },
          {
            id: 1005,
            timestamp: '2024-01-22 09:05:47',
            user: 'Inventory Admin',
            userId: 'ADMIN001',
            role: 'Administrator',
            actionType: 'disposal',
            actionCategory: 'critical',
            item: 'Expired Vaccine',
            itemId: 'VAC-EXP-001',
            quantity: -25,
            previousQuantity: 25,
            newQuantity: 0,
            department: 'Pharmacy',
            location: 'Biohazard Disposal',
            referenceId: 'DSP-2024-003',
            notes: 'Expired COVID-19 vaccine batch',
            ipAddress: '192.168.1.100',
            device: 'Admin Console',
            verified: true
          },
          {
            id: 1006,
            timestamp: '2024-01-21 16:40:12',
            user: 'Nurse Lisa Thompson',
            userId: 'NURLT001',
            role: 'Nurse',
            actionType: 'issue',
            actionCategory: 'normal',
            item: 'IV Catheters',
            itemId: 'IVC-004',
            quantity: 20,
            previousQuantity: 120,
            newQuantity: 100,
            department: 'Ward 5B',
            location: 'Nursing Station 5',
            referenceId: 'ISSUE-2024-045',
            notes: 'Routine patient care',
            ipAddress: '192.168.1.115',
            device: 'Tablet WARD-05',
            verified: true
          },
          {
            id: 1007,
            timestamp: '2024-01-21 14:55:29',
            user: 'Dr. Robert Kim',
            userId: 'DRRK001',
            role: 'Physician',
            actionType: 'emergency_override',
            actionCategory: 'critical',
            item: 'Emergency Trauma Kit',
            itemId: 'ETK-001',
            quantity: 1,
            previousQuantity: 5,
            newQuantity: 4,
            department: 'Emergency Room',
            location: 'ER Crash Cart',
            referenceId: 'EMERG-2024-002',
            notes: 'Code Blue - Cardiac Arrest',
            ipAddress: '192.168.1.107',
            device: 'Emergency Override System',
            verified: false
          },
          {
            id: 1008,
            timestamp: '2024-01-21 11:30:44',
            user: 'Lab Technician',
            userId: 'LABT001',
            role: 'Technician',
            actionType: 'receipt',
            actionCategory: 'normal',
            item: 'Blood Test Kits',
            itemId: 'BTK-007',
            quantity: 200,
            previousQuantity: 50,
            newQuantity: 250,
            department: 'Laboratory',
            location: 'Lab Storage Room',
            referenceId: 'REC-2024-014',
            notes: 'Weekly supply delivery',
            ipAddress: '192.168.1.120',
            device: 'Desktop LAB-03',
            verified: true
          },
          {
            id: 1009,
            timestamp: '2024-01-21 09:15:18',
            user: 'Inventory Admin',
            userId: 'ADMIN001',
            role: 'Administrator',
            actionType: 'system_adjustment',
            actionCategory: 'warning',
            item: 'Bandages',
            itemId: 'BND-003',
            quantity: -30,
            previousQuantity: 230,
            newQuantity: 200,
            department: 'Central Storage',
            location: 'Main Inventory',
            referenceId: 'SYS-ADJ-2024-001',
            notes: 'System calibration adjustment',
            ipAddress: '192.168.1.100',
            device: 'Admin Console',
            verified: true
          },
          {
            id: 1010,
            timestamp: '2024-01-20 17:25:36',
            user: 'Pharmacist David Lee',
            userId: 'PHDL001',
            role: 'Pharmacist',
            actionType: 'return',
            actionCategory: 'normal',
            item: 'Unused Medication',
            itemId: 'MED-RET-001',
            quantity: 10,
            previousQuantity: 0,
            newQuantity: 10,
            department: 'Pharmacy',
            location: 'Return Shelf',
            referenceId: 'RET-2024-007',
            notes: 'Patient discharge return',
            ipAddress: '192.168.1.113',
            device: 'Laptop PH-01',
            verified: true
          }
        ];
        setAuditLogs(dummyAuditLogs);
        localStorage.setItem('auditLogs', JSON.stringify(dummyAuditLogs));
      }

      if (savedReconciliation) {
        setReconciliationData(JSON.parse(savedReconciliation));
      } else {
        const dummyReconciliation = [
          {
            id: 1,
            item: 'Paracetamol 500mg',
            category: 'Pharmacy',
            expected: 250,
            actual: 245,
            discrepancy: -5,
            variance: '2.0%',
            status: 'warning',
            lastAudit: '2024-01-22',
            department: 'Main Pharmacy'
          },
          {
            id: 2,
            item: 'Surgical Gloves',
            category: 'Consumable',
            expected: 1000,
            actual: 1000,
            discrepancy: 0,
            variance: '0.0%',
            status: 'good',
            lastAudit: '2024-01-22',
            department: 'Central Storage'
          },
          {
            id: 3,
            item: 'Insulin Vials',
            category: 'Pharmacy',
            expected: 150,
            actual: 145,
            discrepancy: -5,
            variance: '3.3%',
            status: 'warning',
            lastAudit: '2024-01-21',
            department: 'Pharmacy Cold Storage'
          },
          {
            id: 4,
            item: 'Patient Monitors',
            category: 'Equipment',
            expected: 25,
            actual: 23,
            discrepancy: -2,
            variance: '8.0%',
            status: 'critical',
            lastAudit: '2024-01-21',
            department: 'ICU'
          },
          {
            id: 5,
            item: 'IV Fluids',
            category: 'Consumable',
            expected: 500,
            actual: 495,
            discrepancy: -5,
            variance: '1.0%',
            status: 'good',
            lastAudit: '2024-01-20',
            department: 'ER Storage'
          }
        ];
        setReconciliationData(dummyReconciliation);
        localStorage.setItem('reconciliationData', JSON.stringify(dummyReconciliation));
      }

      if (savedCompliance) {
        setComplianceStats(JSON.parse(savedCompliance));
      } else {
        const dummyCompliance = {
          totalActions: 1250,
          verifiedActions: 1225,
          pendingVerification: 25,
          complianceRate: 98.0,
          criticalActions: 45,
          unauthorizedAttempts: 3,
          lastFullAudit: '2024-01-15',
          nextAuditDue: '2024-02-15',
          departments: 8,
          activeUsers: 42
        };
        setComplianceStats(dummyCompliance);
        localStorage.setItem('complianceStats', JSON.stringify(dummyCompliance));
      }
      
      setLoaded(true);
    };

    loadData();
  }, []);

  const getActionIcon = (actionType) => {
    switch (actionType) {
      case 'issue':
        return <RemoveIcon />;
      case 'receipt':
        return <AddIcon />;
      case 'adjustment':
        return <RefreshIcon />;
      case 'transfer':
        return <TransferIcon />;
      case 'disposal':
        return <DeleteIcon />;
      case 'emergency_override':
        return <WarningIcon />;
      case 'return':
        return <AssignmentIcon />;
      default:
        return <InventoryIcon />;
    }
  };

  const getActionColor = (actionType) => {
    switch (actionType) {
      case 'issue':
        return '#2196f3';
      case 'receipt':
        return '#4caf50';
      case 'adjustment':
        return '#ff9800';
      case 'transfer':
        return '#9c27b0';
      case 'disposal':
        return '#f44336';
      case 'emergency_override':
        return '#d32f2f';
      case 'return':
        return '#00bcd4';
      default:
        return '#757575';
    }
  };

  const getActionLabel = (actionType) => {
    const labels = {
      issue: 'Issue',
      receipt: 'Receipt',
      adjustment: 'Adjustment',
      transfer: 'Transfer',
      disposal: 'Disposal',
      emergency_override: 'Emergency Override',
      return: 'Return',
      system_adjustment: 'System Adjustment'
    };
    return labels[actionType] || actionType;
  };

  const getCategoryColor = (category) => {
    switch (category) {
      case 'critical':
        return '#f44336';
      case 'warning':
        return '#ff9800';
      case 'normal':
        return '#4caf50';
      default:
        return '#757575';
    }
  };

  const getCategoryIcon = (category) => {
    switch (category) {
      case 'critical':
        return <ErrorIcon />;
      case 'warning':
        return <WarningIcon />;
      case 'normal':
        return <CheckCircleIcon />;
      default:
        return <CheckCircleIcon />;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'good':
        return '#4caf50';
      case 'warning':
        return '#ff9800';
      case 'critical':
        return '#f44336';
      default:
        return '#757575';
    }
  };

  const handleOpenDetails = (log) => {
    setSelectedLog(log);
    setOpenDetailsDialog(true);
  };

  const handleCloseDetails = () => {
    setOpenDetailsDialog(false);
    setSelectedLog(null);
  };

  const handleOpenExport = () => {
    setOpenExportDialog(true);
  };

  const handleCloseExport = () => {
    setOpenExportDialog(false);
  };

  const handleExport = (format) => {
    // Mock export functionality
    alert(`Exporting audit data as ${format.toUpperCase()}...`);
    handleCloseExport();
  };

  const filteredLogs = auditLogs.filter(log => {
    if (filters.actionType !== 'all' && log.actionType !== filters.actionType) return false;
    if (filters.user !== 'all' && log.userId !== filters.user) return false;
    if (filters.department !== 'all' && log.department !== filters.department) return false;
    if (filters.item && !log.item.toLowerCase().includes(filters.item.toLowerCase())) return false;
    
    // Date filtering
    const logDate = new Date(log.timestamp.split(' ')[0]);
    
    if (filters.startDate) {
      const startDate = new Date(filters.startDate);
      if (logDate < startDate) return false;
    }
    
    if (filters.endDate) {
      const endDate = new Date(filters.endDate);
      endDate.setHours(23, 59, 59, 999);
      if (logDate > endDate) return false;
    }
    
    if (searchTerm) {
      const searchLower = searchTerm.toLowerCase();
      return (
        log.user.toLowerCase().includes(searchLower) ||
        log.item.toLowerCase().includes(searchLower) ||
        log.department.toLowerCase().includes(searchLower) ||
        log.referenceId.toLowerCase().includes(searchLower)
      );
    }
    return true;
  });

  const uniqueUsers = [...new Set(auditLogs.map(log => ({ id: log.userId, name: log.user })))];
  const uniqueDepartments = [...new Set(auditLogs.map(log => log.department))];
  const actionTypes = [...new Set(auditLogs.map(log => log.actionType))];

  const getComplianceColor = (rate) => {
    if (rate >= 98) return '#4caf50';
    if (rate >= 95) return '#ff9800';
    return '#f44336';
  };

const ComplianceStatCard = ({
  title,
  value,
  color,
  icon: Icon,
  subtitle,
  progress,
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
          {/* Text */}
          <Box>
            <Typography variant="h4" fontWeight={800} sx={{ mb: 0.5 }}>
              {value}
            </Typography>

            <Typography variant="h5" sx={{ opacity: 0.9, fontWeight: 600 }}>
              {title}
            </Typography>

            {subtitle && (
              <Typography variant="h6" sx={{ opacity: 0.8, mt: 1 }}>
                {subtitle}
              </Typography>
            )}
          </Box>

          {/* Icon */}
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

        {/* Progress Bar (unchanged behavior) */}
        {progress !== undefined && (
          <Box sx={{ mt: 2 }}>
            <LinearProgress
              variant="determinate"
              value={progress}
              sx={{
                height: 6,
                borderRadius: 3,
                bgcolor: 'rgba(255,255,255,0.3)',
                '& .MuiLinearProgress-bar': {
                  bgcolor: 'rgba(0,0,0,0.6)',
                  borderRadius: 3
                }
              }}
            />
          </Box>
        )}
      </CardContent>
    </Card>
  </Grow>
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
                  <VerifiedIcon fontSize="large" />
                  Audit & Compliance Log
                </Typography>
                <Typography variant="body1" color="text.secondary">
                  Tamper-resistant audit trail for all inventory transactions and user actions
                </Typography>
              </Box>
              
              <Box sx={{ 
                display: 'flex', 
                gap: 2,
                flexDirection: isMobile ? 'column' : 'row',
                width: isMobile ? '100%' : 'auto'
              }}>
                <Button
                  variant="contained"
                  startIcon={<DownloadIcon />}
                  onClick={handleOpenExport}
                  sx={{ 
                    borderRadius: 2,
                    textTransform: 'none',
                    fontWeight: 600,
                    px: 3,
                    bgcolor: '#4caf50'
                  }}
                >
                  Export Report
                </Button>
                <Button
                  variant="outlined"
                  startIcon={<RefreshIcon />}
                  sx={{ 
                    borderRadius: 2,
                    textTransform: 'none'
                  }}
                >
                  Run Compliance Check
                </Button>
              </Box>
            </Box>

            {/* Search Bar */}
            <Paper sx={{ 
              p: 2, 
              mb: 2,
              borderRadius: 2,
              bgcolor: alpha(theme.palette.primary.main, 0.03),
              border: `1px solid ${alpha(theme.palette.primary.main, 0.1)}`
            }}>
              <TextField
                fullWidth
                placeholder="Search audit logs by user, item, department, or reference ID..."
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
                  endAdornment: searchTerm && (
                    <InputAdornment position="end">
                      <IconButton size="small" onClick={() => setSearchTerm('')}>
                        <ErrorIcon fontSize="small" />
                      </IconButton>
                    </InputAdornment>
                  )
                }}
                sx={{ 
                  '& .MuiOutlinedInput-root': {
                    borderRadius: 2,
                    bgcolor: 'white'
                  }
                }}
              />
            </Paper>

            {/* Quick Filter Chips */}
            <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap', mb: 2 }}>
              <Chip
                icon={<FilterIcon />}
                label="Quick Filters"
                variant="outlined"
                sx={{ fontWeight: 600 }}
              />
              <Chip
                label="Critical Actions"
                onClick={() => setFilters({...filters, actionType: 'emergency_override'})}
                color={filters.actionType === 'emergency_override' ? 'error' : 'default'}
                variant={filters.actionType === 'emergency_override' ? 'filled' : 'outlined'}
              />
              <Chip
                label="Today"
                onClick={() => {
                  const today = new Date().toISOString().split('T')[0];
                  setFilters({...filters, startDate: today, endDate: today});
                }}
                variant="outlined"
              />
              <Chip
                label="Emergency Room"
                onClick={() => setFilters({...filters, department: 'Emergency Room'})}
                color={filters.department === 'Emergency Room' ? 'primary' : 'default'}
                variant={filters.department === 'Emergency Room' ? 'filled' : 'outlined'}
              />
              <Chip
                label="Clear Filters"
                onClick={() => setFilters({
                  actionType: 'all',
                  user: 'all',
                  department: 'all',
                  item: '',
                  startDate: '',
                  endDate: ''
                })}
                variant="outlined"
                color="default"
              />
            </Box>
          </Box>
        </Slide>

        {/* Stats Cards */}
<Box
  sx={{
    display: 'flex',
    flexDirection: isMobile ? 'column' : 'row',
    gap: 2,
    mb: 4,
    flexWrap: 'wrap'
  }}
>
  <ComplianceStatCard
    title="Compliance Rate"
    value={`${complianceStats.complianceRate || 0}%`}
    color={getComplianceColor(complianceStats.complianceRate || 0)}
    gradient="linear-gradient(135deg, #22c55e 0%, #16a34a 100%)"
    icon={VerifiedIcon}
    subtitle="JCI / HIPAA Standards"
    progress={complianceStats.complianceRate || 0}
  />

  <ComplianceStatCard
    title="Total Actions"
    value={complianceStats.totalActions || 0}
    color="#2196f3"
    gradient="linear-gradient(135deg, #2196f3 0%, #1e88e5 100%)"
    icon={HistoryIcon}
    subtitle="Last 30 days"
    delay={200}
  />

  <ComplianceStatCard
    title="Critical Actions"
    value={complianceStats.criticalActions || 0}
    color="#f44336"
    gradient="linear-gradient(135deg, #EF4444 0%, #DC2626 100%)"
    icon={WarningIcon}
    subtitle="Require review"
    delay={400}
  />

  <ComplianceStatCard
    title="Active Users"
    value={complianceStats.activeUsers || 0}
    color="#4caf50"
    gradient="linear-gradient(135deg, #4caf50 0%, #43a047 100%)"
    icon={AccountIcon}
    subtitle="With audit access"
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
                icon={<Badge badgeContent={filteredLogs.length} color="primary" />}
                iconPosition="start"
                label="Activity Audit Log" 
              />
              <Tab 
                icon={<Badge badgeContent={reconciliationData.filter(r => r.status !== 'good').length} color="warning" />}
                iconPosition="start"
                label="Reconciliation Reports" 
              />
              <Tab 
                icon={<SecurityIcon />}
                label="Compliance Dashboard" 
              />
            </Tabs>
          </Paper>
        </Grow>

        {/* Tab Content */}
        <Grow in={loaded} timeout={700}>
          <Box>
            {activeTab === 0 && (
              <Box>
                {/* Advanced Filters */}
                <Paper sx={{ 
                  p: 2, 
                  mb: 3,
                  borderRadius: 2,
                  bgcolor: alpha('#2196f3', 0.03),
                  border: `1px solid ${alpha('#2196f3', 0.1)}`
                }}>
                  <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                    Advanced Filters
                  </Typography>
                  <Box sx={{ 
                    display: 'flex', 
                    gap: 2,
                    flexDirection: isMobile ? 'column' : 'row',
                    alignItems: isMobile ? 'stretch' : 'center',
                    flexWrap: 'wrap'
                  }}>
                    <TextField
                      select
                      size="small"
                      label="Action Type"
                      value={filters.actionType}
                      onChange={(e) => setFilters({...filters, actionType: e.target.value})}
                      sx={{ minWidth: 140 }}
                    >
                      <MenuItem value="all">All Actions</MenuItem>
                      {actionTypes.map(type => (
                        <MenuItem key={type} value={type}>
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                            {getActionIcon(type)}
                            {getActionLabel(type)}
                          </Box>
                        </MenuItem>
                      ))}
                    </TextField>

                    <TextField
                      select
                      size="small"
                      label="User"
                      value={filters.user}
                      onChange={(e) => setFilters({...filters, user: e.target.value})}
                      sx={{ minWidth: 180 }}
                    >
                      <MenuItem value="all">All Users</MenuItem>
                      {uniqueUsers.map(user => (
                        <MenuItem key={user.id} value={user.id}>
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                            <PersonIcon fontSize="small" />
                            {user.name}
                          </Box>
                        </MenuItem>
                      ))}
                    </TextField>

                    <TextField
                      select
                      size="small"
                      label="Department"
                      value={filters.department}
                      onChange={(e) => setFilters({...filters, department: e.target.value})}
                      sx={{ minWidth: 160 }}
                    >
                      <MenuItem value="all">All Departments</MenuItem>
                      {uniqueDepartments.map(dept => (
                        <MenuItem key={dept} value={dept}>
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                            <HospitalIcon fontSize="small" />
                            {dept}
                          </Box>
                        </MenuItem>
                      ))}
                    </TextField>

                    <TextField
                      size="small"
                      label="Item Search"
                      value={filters.item}
                      onChange={(e) => setFilters({...filters, item: e.target.value})}
                      sx={{ minWidth: 180 }}
                      placeholder="Search by item..."
                    />

                    <TextField
                      size="small"
                      label="From Date"
                      type="date"
                      value={filters.startDate}
                      onChange={(e) => setFilters({...filters, startDate: e.target.value})}
                      InputLabelProps={{ shrink: true }}
                      sx={{ minWidth: 140 }}
                    />

                    <TextField
                      size="small"
                      label="To Date"
                      type="date"
                      value={filters.endDate}
                      onChange={(e) => setFilters({...filters, endDate: e.target.value})}
                      InputLabelProps={{ shrink: true }}
                      sx={{ minWidth: 140 }}
                    />
                  </Box>
                </Paper>

                {/* Audit Log Table */}
                <TableContainer component={Paper} sx={{ borderRadius: 2 }}>
                  <Table>
                    <TableHead sx={{ bgcolor: alpha('#2196f3', 0.05) }}>
                      <TableRow>
                        <TableCell sx={{ fontWeight: 600 }}>Timestamp</TableCell>
                        <TableCell sx={{ fontWeight: 600 }}>User & Action</TableCell>
                        <TableCell sx={{ fontWeight: 600 }}>Item Details</TableCell>
                        <TableCell sx={{ fontWeight: 600 }}>Quantity Change</TableCell>
                        <TableCell sx={{ fontWeight: 600 }}>Department</TableCell>
                        <TableCell sx={{ fontWeight: 600 }}>Verification</TableCell>
                        <TableCell sx={{ fontWeight: 600 }}>Actions</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {filteredLogs.map((log, index) => (
                        <Grow in={true} timeout={300} key={log.id} style={{ transitionDelay: `${index * 30}ms` }}>
                          <TableRow
                            sx={{
                              '&:hover': { 
                                backgroundColor: alpha(getActionColor(log.actionType), 0.04),
                                transition: 'background-color 0.3s'
                              },
                              borderLeft: log.actionCategory === 'critical' ? `4px solid ${getCategoryColor('critical')}` : 'none'
                            }}
                          >
                            <TableCell>
                              <Box>
                                <Typography variant="body2" fontWeight={500}>
                                  {log.timestamp.split(' ')[0]}
                                </Typography>
                                <Typography variant="caption" color="text.secondary">
                                  {log.timestamp.split(' ')[1]}
                                </Typography>
                              </Box>
                            </TableCell>
                            <TableCell>
                              <Box>
                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 0.5 }}>
                                  <Avatar sx={{ width: 24, height: 24, fontSize: '0.75rem', bgcolor: alpha('#2196f3', 0.1) }}>
                                    {log.user.split(' ').map(n => n[0]).join('')}
                                  </Avatar>
                                  <Typography variant="body2" fontWeight={500}>
                                    {log.user}
                                  </Typography>
                                </Box>
                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                  <Box sx={{ 
                                    display: 'flex', 
                                    alignItems: 'center', 
                                    gap: 0.5,
                                    color: getActionColor(log.actionType)
                                  }}>
                                    {getActionIcon(log.actionType)}
                                    <Typography variant="caption" fontWeight={500}>
                                      {getActionLabel(log.actionType)}
                                    </Typography>
                                  </Box>
                                  <Chip 
                                    icon={getCategoryIcon(log.actionCategory)}
                                    label={log.actionCategory.toUpperCase()}
                                    size="small"
                                    sx={{ 
                                      height: 20,
                                      fontSize: '0.65rem',
                                      bgcolor: alpha(getCategoryColor(log.actionCategory), 0.1),
                                      color: getCategoryColor(log.actionCategory)
                                    }}
                                  />
                                </Box>
                              </Box>
                            </TableCell>
                            <TableCell>
                              <Box>
                                <Typography variant="body2" fontWeight={500}>
                                  {log.item}
                                </Typography>
                                <Typography variant="caption" color="text.secondary">
                                  ID: {log.itemId} • {log.location}
                                </Typography>
                              </Box>
                            </TableCell>
                            <TableCell>
                              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                {log.quantity > 0 ? (
                                  <>
                                    <AddIcon fontSize="small" color="success" />
                                    <Typography variant="body2" color="success.main" fontWeight={600}>
                                      +{log.quantity}
                                    </Typography>
                                  </>
                                ) : (
                                  <>
                                    <RemoveIcon fontSize="small" color="error" />
                                    <Typography variant="body2" color="error.main" fontWeight={600}>
                                      {log.quantity}
                                    </Typography>
                                  </>
                                )}
                                <Typography variant="caption" color="text.secondary">
                                  ({log.previousQuantity} → {log.newQuantity})
                                </Typography>
                              </Box>
                            </TableCell>
                            <TableCell>
                              <Chip 
                                label={log.department}
                                size="small"
                                sx={{ 
                                  bgcolor: alpha('#9c27b0', 0.1),
                                  color: '#9c27b0',
                                  fontWeight: 500
                                }}
                              />
                            </TableCell>
                            <TableCell>
                              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                {log.verified ? (
                                  <>
                                    <CheckCircleIcon fontSize="small" color="success" />
                                    <Typography variant="caption" color="success.main">
                                      Verified
                                    </Typography>
                                  </>
                                ) : (
                                  <>
                                    <ErrorIcon fontSize="small" color="error" />
                                    <Typography variant="caption" color="error.main">
                                      Pending
                                    </Typography>
                                  </>
                                )}
                              </Box>
                            </TableCell>
                            <TableCell>
                              <Tooltip title="View Details">
                                <IconButton 
                                  size="small"
                                  onClick={() => handleOpenDetails(log)}
                                  sx={{ color: '#2196f3' }}
                                >
                                  <VisibilityIcon />
                                </IconButton>
                              </Tooltip>
                              <Tooltip title="Reference ID">
                                <Chip 
                                  label={log.referenceId}
                                  size="small"
                                  variant="outlined"
                                  sx={{ ml: 1 }}
                                />
                              </Tooltip>
                            </TableCell>
                          </TableRow>
                        </Grow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>

                {filteredLogs.length === 0 && (
                  <Paper sx={{ 
                    p: 8, 
                    mt: 2,
                    textAlign: 'center',
                    borderRadius: 2,
                    bgcolor: alpha(theme.palette.primary.main, 0.02)
                  }}>
                    <HistoryIcon sx={{ fontSize: 64, color: 'text.disabled', mb: 2 }} />
                    <Typography variant="h6" color="text.secondary" gutterBottom>
                      No audit records found
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Try adjusting your search criteria or filters
                    </Typography>
                  </Paper>
                )}
              </Box>
            )}

            {activeTab === 1 && (
              <Box>
                <Box sx={{ mb: 3 }}>
                  <Typography variant="h6" gutterBottom>
                    Inventory Reconciliation Reports
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Compare expected vs actual stock levels across departments
                  </Typography>
                </Box>

                <TableContainer component={Paper} sx={{ borderRadius: 2 }}>
                  <Table>
                    <TableHead sx={{ bgcolor: alpha('#4caf50', 0.05) }}>
                      <TableRow>
                        <TableCell sx={{ fontWeight: 600 }}>Item Details</TableCell>
                        <TableCell sx={{ fontWeight: 600 }}>Expected</TableCell>
                        <TableCell sx={{ fontWeight: 600 }}>Actual</TableCell>
                        <TableCell sx={{ fontWeight: 600 }}>Discrepancy</TableCell>
                        <TableCell sx={{ fontWeight: 600 }}>Variance</TableCell>
                        <TableCell sx={{ fontWeight: 600 }}>Status</TableCell>
                        <TableCell sx={{ fontWeight: 600 }}>Department</TableCell>
                        <TableCell sx={{ fontWeight: 600 }}>Last Audit</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {reconciliationData.map((item, index) => (
                        <Grow in={true} timeout={300} key={item.id} style={{ transitionDelay: `${index * 50}ms` }}>
                          <TableRow
                            sx={{
                              '&:hover': { 
                                backgroundColor: alpha(getStatusColor(item.status), 0.04),
                                transition: 'background-color 0.3s'
                              }
                            }}
                          >
                            <TableCell>
                              <Box>
                                <Typography variant="body2" fontWeight={500}>
                                  {item.item}
                                </Typography>
                                <Chip 
                                  label={item.category}
                                  size="small"
                                  sx={{ 
                                    mt: 0.5,
                                    bgcolor: alpha('#ff9800', 0.1),
                                    color: '#ff9800'
                                  }}
                                />
                              </Box>
                            </TableCell>
                            <TableCell>
                              <Typography variant="body1" fontWeight={600}>
                                {item.expected}
                              </Typography>
                            </TableCell>
                            <TableCell>
                              <Typography variant="body1" fontWeight={600}>
                                {item.actual}
                              </Typography>
                            </TableCell>
                            <TableCell>
                              <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                                {item.discrepancy > 0 ? (
                                  <>
                                    <TrendingUpIcon fontSize="small" color="success" />
                                    <Typography variant="body1" color="success.main" fontWeight={600}>
                                      +{item.discrepancy}
                                    </Typography>
                                  </>
                                ) : item.discrepancy < 0 ? (
                                  <>
                                    <TrendingDownIcon fontSize="small" color="error" />
                                    <Typography variant="body1" color="error.main" fontWeight={600}>
                                      {item.discrepancy}
                                    </Typography>
                                  </>
                                ) : (
                                  <>
                                    <CheckCircleIcon fontSize="small" color="success" />
                                    <Typography variant="body1" color="success.main" fontWeight={600}>
                                      {item.discrepancy}
                                    </Typography>
                                  </>
                                )}
                              </Box>
                            </TableCell>
                            <TableCell>
                              <Typography variant="body2" fontWeight={600} color={
                                Math.abs(parseFloat(item.variance)) > 5 ? 'error' : 
                                Math.abs(parseFloat(item.variance)) > 2 ? 'warning' : 'success'
                              }>
                                {item.variance}
                              </Typography>
                            </TableCell>
                            <TableCell>
                              <Chip 
                                icon={item.status === 'good' ? <CheckCircleIcon /> : 
                                      item.status === 'warning' ? <WarningIcon /> : <ErrorIcon />}
                                label={item.status.toUpperCase()}
                                size="small"
                                sx={{ 
                                  bgcolor: alpha(getStatusColor(item.status), 0.1),
                                  color: getStatusColor(item.status),
                                  fontWeight: 500
                                }}
                              />
                            </TableCell>
                            <TableCell>
                              <Typography variant="body2">
                                {item.department}
                              </Typography>
                            </TableCell>
                            <TableCell>
                              <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                                <CalendarIcon fontSize="small" color="action" />
                                <Typography variant="body2">
                                  {item.lastAudit}
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

            {activeTab === 2 && (
              <Box>
                <Paper sx={{ p: 4, borderRadius: 2, mb: 4 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 3 }}>
                    <SecurityIcon color="primary" fontSize="large" />
                    <Box>
                      <Typography variant="h6" sx={{ fontWeight: 600 }}>
                        Compliance Dashboard
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        Overview of regulatory compliance status
                      </Typography>
                    </Box>
                  </Box>

                  <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 3 }}>
                    <Card sx={{ borderRadius: 2 }}>
                      <CardContent>
                        <Typography variant="subtitle1" fontWeight={600} gutterBottom>
                          Compliance Standards
                        </Typography>
                        <List>
                          <ListItem>
                            <ListItemIcon>
                              <VerifiedIcon color="success" />
                            </ListItemIcon>
                            <ListItemText 
                              primary="JCI (Joint Commission International)" 
                              secondary="Fully compliant"
                            />
                          </ListItem>
                          <ListItem>
                            <ListItemIcon>
                              <VerifiedIcon color="success" />
                            </ListItemIcon>
                            <ListItemText 
                              primary="HIPAA Compliance" 
                              secondary="Audit-ready"
                            />
                          </ListItem>
                          <ListItem>
                            <ListItemIcon>
                              <WarningIcon color="warning" />
                            </ListItemIcon>
                            <ListItemText 
                              primary="FDA Drug Supply Chain" 
                              secondary="Review in progress"
                            />
                          </ListItem>
                        </List>
                      </CardContent>
                    </Card>

                    <Card sx={{ borderRadius: 2 }}>
                      <CardContent>
                        <Typography variant="subtitle1" fontWeight={600} gutterBottom>
                          Audit Schedule
                        </Typography>
                        <List>
                          <ListItem>
                            <ListItemIcon>
                              <CalendarIcon color="primary" />
                            </ListItemIcon>
                            <ListItemText 
                              primary="Last Full Audit" 
                              secondary={complianceStats.lastFullAudit || 'N/A'}
                            />
                          </ListItem>
                          <ListItem>
                            <ListItemIcon>
                              <CalendarIcon color="warning" />
                            </ListItemIcon>
                            <ListItemText 
                              primary="Next Audit Due" 
                              secondary={complianceStats.nextAuditDue || 'N/A'}
                            />
                          </ListItem>
                          <ListItem>
                            <ListItemIcon>
                              <WarningIcon color="error" />
                            </ListItemIcon>
                            <ListItemText 
                              primary="Pending Verification" 
                              secondary={`${complianceStats.pendingVerification || 0} actions`}
                            />
                          </ListItem>
                        </List>
                      </CardContent>
                    </Card>
                  </Box>

                  <Alert 
                    severity="info" 
                    icon={<LockIcon />}
                    sx={{ mt: 3, borderRadius: 2 }}
                  >
                    <Typography variant="body2">
                      <strong>Read-Only Access:</strong> This audit log is tamper-resistant. All actions are permanently recorded and cannot be modified or deleted.
                    </Typography>
                  </Alert>
                </Paper>
              </Box>
            )}
          </Box>
        </Grow>

        {/* AI Compliance Insights */}
        <Grow in={loaded} timeout={800}>
          <Paper sx={{ 
            p: 3, 
            mt: 4, 
            borderRadius: 2,
            bgcolor: alpha('#4caf50', 0.05),
            border: `1px solid ${alpha('#4caf50', 0.2)}`
          }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <Box>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                  <VerifiedIcon color="success" />
                  <Typography variant="h6" sx={{ fontWeight: 600 }}>
                    AI Compliance Insights
                  </Typography>
                </Box>
                <Typography variant="body2" paragraph>
                  {complianceStats.complianceRate >= 98 ? 
                    '✅ **Excellent Compliance**: System maintains 98%+ compliance rate. All critical actions properly logged and verified. Continue regular monitoring schedule.' :
                    '⚠️ **Attention Required**: Compliance rate below target. Review pending verifications and ensure all emergency overrides are properly documented.'
                  }
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Next automated compliance check: Today, 23:00 • Last anomaly detected: 7 days ago
                </Typography>
              </Box>
              <Box sx={{ textAlign: 'right' }}>
                <Chip 
                  label="99.8% Accuracy" 
                  color="success" 
                  sx={{ fontWeight: 600, mb: 1 }}
                />
                <Typography variant="caption" color="text.secondary" display="block">
                  AI Confidence Score
                </Typography>
              </Box>
            </Box>
          </Paper>
        </Grow>

        {/* Log Details Dialog */}
        <Dialog 
          open={openDetailsDialog} 
          onClose={handleCloseDetails}
          maxWidth="md"
          fullWidth
          PaperProps={{
            sx: { borderRadius: 2 }
          }}
        >
          {selectedLog && (
            <>
              <DialogTitle sx={{ 
                bgcolor: alpha(getActionColor(selectedLog.actionType), 0.05),
                borderBottom: `1px solid ${alpha(getActionColor(selectedLog.actionType), 0.1)}`
              }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                  <Avatar sx={{ 
                    bgcolor: getActionColor(selectedLog.actionType), 
                    color: 'white'
                  }}>
                    {getActionIcon(selectedLog.actionType)}
                  </Avatar>
                  <Box>
                    <Typography variant="h6" sx={{ fontWeight: 600 }}>
                      Audit Log Details
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      Reference ID: {selectedLog.referenceId}
                    </Typography>
                  </Box>
                </Box>
              </DialogTitle>
              <DialogContent sx={{ pt: 3 }}>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                  {/* Summary Card */}
                  <Paper sx={{ p: 2, borderRadius: 2, bgcolor: alpha('#f5f5f5', 0.5) }}>
                    <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 2 }}>
                      <Box>
                        <Typography variant="caption" color="text.secondary">Action Type</Typography>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                          {getActionIcon(selectedLog.actionType)}
                          <Typography variant="body1" fontWeight={600}>
                            {getActionLabel(selectedLog.actionType)}
                          </Typography>
                        </Box>
                      </Box>
                      <Box>
                        <Typography variant="caption" color="text.secondary">Risk Category</Typography>
                        <Chip 
                          icon={getCategoryIcon(selectedLog.actionCategory)}
                          label={selectedLog.actionCategory.toUpperCase()}
                          size="small"
                          sx={{ 
                            bgcolor: alpha(getCategoryColor(selectedLog.actionCategory), 0.1),
                            color: getCategoryColor(selectedLog.actionCategory)
                          }}
                        />
                      </Box>
                      <Box>
                        <Typography variant="caption" color="text.secondary">Timestamp</Typography>
                        <Typography variant="body1" fontWeight={600}>
                          {selectedLog.timestamp}
                        </Typography>
                      </Box>
                    </Box>
                  </Paper>

                  {/* User Information */}
                  <Box>
                    <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                      User Information
                    </Typography>
                    <Paper variant="outlined" sx={{ p: 2, borderRadius: 2 }}>
                      <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 2 }}>
                        <Box>
                          <Typography variant="caption" color="text.secondary">User</Typography>
                          <Typography variant="body1" fontWeight={600}>
                            {selectedLog.user}
                          </Typography>
                        </Box>
                        <Box>
                          <Typography variant="caption" color="text.secondary">Role</Typography>
                          <Typography variant="body1">{selectedLog.role}</Typography>
                        </Box>
                        <Box>
                          <Typography variant="caption" color="text.secondary">User ID</Typography>
                          <Typography variant="body1">{selectedLog.userId}</Typography>
                        </Box>
                      </Box>
                    </Paper>
                  </Box>

                  {/* Item Details */}
                  <Box>
                    <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                      Item Details
                    </Typography>
                    <Paper variant="outlined" sx={{ p: 2, borderRadius: 2 }}>
                      <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 2 }}>
                        <Box>
                          <Typography variant="caption" color="text.secondary">Item</Typography>
                          <Typography variant="body1" fontWeight={600}>
                            {selectedLog.item}
                          </Typography>
                        </Box>
                        <Box>
                          <Typography variant="caption" color="text.secondary">Item ID</Typography>
                          <Typography variant="body1">{selectedLog.itemId}</Typography>
                        </Box>
                        <Box>
                          <Typography variant="caption" color="text.secondary">Location</Typography>
                          <Typography variant="body1">{selectedLog.location}</Typography>
                        </Box>
                        <Box>
                          <Typography variant="caption" color="text.secondary">Department</Typography>
                          <Typography variant="body1">{selectedLog.department}</Typography>
                        </Box>
                      </Box>
                    </Paper>
                  </Box>

                  {/* Quantity Changes */}
                  <Box>
                    <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                      Quantity Changes
                    </Typography>
                    <Paper variant="outlined" sx={{ p: 2, borderRadius: 2 }}>
                      <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 2 }}>
                        <Box>
                          <Typography variant="caption" color="text.secondary">Previous Quantity</Typography>
                          <Typography variant="body1" fontWeight={600}>
                            {selectedLog.previousQuantity}
                          </Typography>
                        </Box>
                        <Box>
                          <Typography variant="caption" color="text.secondary">Change</Typography>
                          <Typography variant="body1" fontWeight={600} color={
                            selectedLog.quantity > 0 ? 'success.main' : 'error.main'
                          }>
                            {selectedLog.quantity > 0 ? '+' : ''}{selectedLog.quantity}
                          </Typography>
                        </Box>
                        <Box>
                          <Typography variant="caption" color="text.secondary">New Quantity</Typography>
                          <Typography variant="body1" fontWeight={600}>
                            {selectedLog.newQuantity}
                          </Typography>
                        </Box>
                      </Box>
                    </Paper>
                  </Box>

                  {/* Technical Details */}
                  <Box>
                    <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                      Technical Details
                    </Typography>
                    <Paper variant="outlined" sx={{ p: 2, borderRadius: 2 }}>
                      <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 2 }}>
                        <Box>
                          <Typography variant="caption" color="text.secondary">IP Address</Typography>
                          <Typography variant="body1">{selectedLog.ipAddress}</Typography>
                        </Box>
                        <Box>
                          <Typography variant="caption" color="text.secondary">Device</Typography>
                          <Typography variant="body1">{selectedLog.device}</Typography>
                        </Box>
                        <Box>
                          <Typography variant="caption" color="text.secondary">Verification</Typography>
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                            {selectedLog.verified ? (
                              <>
                                <CheckCircleIcon color="success" fontSize="small" />
                                <Typography variant="body2" color="success.main">Verified</Typography>
                              </>
                            ) : (
                              <>
                                <ErrorIcon color="error" fontSize="small" />
                                <Typography variant="body2" color="error.main">Pending Verification</Typography>
                              </>
                            )}
                          </Box>
                        </Box>
                      </Box>
                    </Paper>
                  </Box>

                  {/* Notes */}
                  {selectedLog.notes && (
                    <Box>
                      <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                        Notes
                      </Typography>
                      <Paper variant="outlined" sx={{ p: 2, borderRadius: 2 }}>
                        <Typography variant="body2">
                          {selectedLog.notes}
                        </Typography>
                      </Paper>
                    </Box>
                  )}
                </Box>
              </DialogContent>
              <DialogActions sx={{ p: 2, borderTop: `1px solid ${theme.palette.divider}` }}>
                <Button onClick={handleCloseDetails}>
                  Close
                </Button>
                <Button 
                  variant="contained" 
                  startIcon={<DownloadIcon />}
                  onClick={() => handleExport('pdf')}
                >
                  Export Details
                </Button>
              </DialogActions>
            </>
          )}
        </Dialog>

        {/* Export Dialog */}
        <Dialog 
          open={openExportDialog} 
          onClose={handleCloseExport}
          PaperProps={{
            sx: { borderRadius: 2 }
          }}
        >
          <DialogTitle>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <DownloadIcon color="primary" />
              <Typography variant="h6" sx={{ fontWeight: 600 }}>
                Export Audit Report
              </Typography>
            </Box>
          </DialogTitle>
          <DialogContent>
            <Typography variant="body2" color="text.secondary" paragraph>
              Export audit data for compliance reviews and external audits.
            </Typography>
            
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 2 }}>
              <Button
                fullWidth
                variant="outlined"
                startIcon={<DescriptionIcon />}
                onClick={() => handleExport('csv')}
                sx={{ 
                  justifyContent: 'flex-start',
                  py: 1.5,
                  borderRadius: 1.5
                }}
              >
                <Box sx={{ textAlign: 'left' }}>
                  <Typography variant="body1" fontWeight={600}>
                    CSV Export
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    Raw data for analysis ({filteredLogs.length} records)
                  </Typography>
                </Box>
              </Button>

              <Button
                fullWidth
                variant="outlined"
                startIcon={<PdfIcon />}
                onClick={() => handleExport('pdf')}
                sx={{ 
                  justifyContent: 'flex-start',
                  py: 1.5,
                  borderRadius: 1.5
                }}
              >
                <Box sx={{ textAlign: 'left' }}>
                  <Typography variant="body1" fontWeight={600}>
                    PDF Report
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    Formatted compliance report with filters
                  </Typography>
                </Box>
              </Button>

              <Button
                fullWidth
                variant="outlined"
                startIcon={<ChartIcon />}
                onClick={() => handleExport('excel')}
                sx={{ 
                  justifyContent: 'flex-start',
                  py: 1.5,
                  borderRadius: 1.5
                }}
              >
                <Box sx={{ textAlign: 'left' }}>
                  <Typography variant="body1" fontWeight={600}>
                    Excel with Charts
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    Data with visualizations and summary
                  </Typography>
                </Box>
              </Button>
            </Box>

            <Alert severity="info" sx={{ mt: 3, borderRadius: 2 }}>
              <Typography variant="caption">
                Exported data will include all currently applied filters and search criteria.
              </Typography>
            </Alert>
          </DialogContent>
          <DialogActions sx={{ p: 2, borderTop: `1px solid ${theme.palette.divider}` }}>
            <Button onClick={handleCloseExport}>
              Cancel
            </Button>
          </DialogActions>
        </Dialog>
      </Box>
    </Fade>
  );
};

export default AuditComplianceLog;