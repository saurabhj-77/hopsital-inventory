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
  Avatar,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  ListItemSecondaryAction,
  Fab,
  Switch,
  FormControlLabel,
  Rating,
  Divider,
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
  Business as BusinessIcon,
  Person as PersonIcon,
  Phone as PhoneIcon,
  Email as EmailIcon,
  LocationOn as LocationIcon,
  Star as StarIcon,
  StarBorder as StarBorderIcon,
  TrendingUp as TrendingUpIcon,
  TrendingDown as TrendingDownIcon,
  Schedule as ScheduleIcon,
  CheckCircle as CheckCircleIcon,
  Error as ErrorIcon,
  Warning as WarningIcon,
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Visibility as VisibilityIcon,
  Download as DownloadIcon,
  FilterList as FilterIcon,
  Search as SearchIcon,
  DateRange as DateRangeIcon,
  AttachMoney as MoneyIcon,
  LocalShipping as ShippingIcon,
  Assignment as ContractIcon,
  Timeline as TimelineIcon,
  Chat as ChatIcon,
  InsertChart as ChartIcon,
  VerifiedUser as VerifiedIcon,
  Refresh as RefreshIcon,
  MoreVert as MoreVertIcon
} from '@mui/icons-material';

const SupplierVendorManagement = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  
  const [activeTab, setActiveTab] = useState(0);
  const [suppliers, setSuppliers] = useState([]);
  const [contracts, setContracts] = useState([]);
  const [performanceData, setPerformanceData] = useState([]);
  const [openSupplierDialog, setOpenSupplierDialog] = useState(false);
  const [openContractDialog, setOpenContractDialog] = useState(false);
  const [selectedSupplier, setSelectedSupplier] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [sortBy, setSortBy] = useState('name');
  const [loaded, setLoaded] = useState(false);

  // Initialize with dummy data
  useEffect(() => {
    const loadData = () => {
      // Check if data exists in localStorage
      const savedSuppliers = localStorage.getItem('supplierData');
      const savedContracts = localStorage.getItem('contractData');
      const savedPerformance = localStorage.getItem('performanceData');

      if (savedSuppliers) {
        setSuppliers(JSON.parse(savedSuppliers));
      } else {
        // Generate dummy supplier data
        const dummySuppliers = [
          {
            id: 1,
            companyName: 'MediCare Pharmaceuticals Inc.',
            contactPerson: 'Dr. Sarah Johnson',
            phone: '+1 (555) 123-4567',
            email: 'sarah.j@medicarepharma.com',
            address: '123 Medical Drive, Boston, MA 02115',
            category: 'Pharmaceuticals',
            status: 'active',
            preferred: true,
            rating: 4.8,
            contracts: 3,
            lastDelivery: '2024-01-15',
            totalSpend: '$245,000',
            reliability: 98
          },
          {
            id: 2,
            companyName: 'Surgical Supplies Co.',
            contactPerson: 'Michael Rodriguez',
            phone: '+1 (555) 987-6543',
            email: 'm.rodriguez@surgicalsupplies.com',
            address: '456 Hospital Ave, Chicago, IL 60601',
            category: 'Surgical Equipment',
            status: 'active',
            preferred: true,
            rating: 4.5,
            contracts: 2,
            lastDelivery: '2024-01-18',
            totalSpend: '$189,500',
            reliability: 95
          },
          {
            id: 3,
            companyName: 'BioSafe Medical',
            contactPerson: 'Jennifer Lee',
            phone: '+1 (555) 456-7890',
            email: 'j.lee@biosafe.com',
            address: '789 Health St, San Francisco, CA 94107',
            category: 'Medical Devices',
            status: 'active',
            preferred: false,
            rating: 4.2,
            contracts: 1,
            lastDelivery: '2024-01-10',
            totalSpend: '$89,300',
            reliability: 92
          },
          {
            id: 4,
            companyName: 'CleanRoom Solutions',
            contactPerson: 'Robert Chen',
            phone: '+1 (555) 234-5678',
            email: 'r.chen@cleanrooms.com',
            address: '101 Sterile Way, Houston, TX 77002',
            category: 'Consumables',
            status: 'active',
            preferred: false,
            rating: 4.0,
            contracts: 4,
            lastDelivery: '2024-01-20',
            totalSpend: '$67,800',
            reliability: 88
          },
          {
            id: 5,
            companyName: 'Precision Lab Systems',
            contactPerson: 'Amanda Wilson',
            phone: '+1 (555) 345-6789',
            email: 'a.wilson@precisionlabs.com',
            address: '202 Research Blvd, Seattle, WA 98101',
            category: 'Laboratory',
            status: 'pending',
            preferred: false,
            rating: 4.6,
            contracts: 2,
            lastDelivery: '2024-01-05',
            totalSpend: '$156,200',
            reliability: 96
          },
          {
            id: 6,
            companyName: 'PharmaDistributors LLC',
            contactPerson: 'David Miller',
            phone: '+1 (555) 567-8901',
            email: 'd.miller@pharmadist.com',
            address: '303 Pharmacy Lane, Miami, FL 33101',
            category: 'Pharmaceuticals',
            status: 'inactive',
            preferred: false,
            rating: 3.5,
            contracts: 0,
            lastDelivery: '2023-12-15',
            totalSpend: '$45,600',
            reliability: 75
          },
          {
            id: 7,
            companyName: 'Emergency Medical Equipment',
            contactPerson: 'Karen Thompson',
            phone: '+1 (555) 678-9012',
            email: 'k.thompson@emergencymed.com',
            address: '404 Critical Care Rd, Atlanta, GA 30301',
            category: 'Emergency Equipment',
            status: 'active',
            preferred: true,
            rating: 4.9,
            contracts: 5,
            lastDelivery: '2024-01-22',
            totalSpend: '$312,400',
            reliability: 99
          },
          {
            id: 8,
            companyName: 'Ortho Specialists Inc.',
            contactPerson: 'Dr. James Wilson',
            phone: '+1 (555) 789-0123',
            email: 'j.wilson@orthospecialists.com',
            address: '505 Bone St, Denver, CO 80202',
            category: 'Orthopedic',
            status: 'active',
            preferred: false,
            rating: 4.3,
            contracts: 2,
            lastDelivery: '2024-01-12',
            totalSpend: '$78,900',
            reliability: 90
          }
        ];
        setSuppliers(dummySuppliers);
        localStorage.setItem('supplierData', JSON.stringify(dummySuppliers));
      }

      if (savedContracts) {
        setContracts(JSON.parse(savedContracts));
      } else {
        const dummyContracts = [
          {
            id: 1,
            supplierId: 1,
            contractNumber: 'CT-2024-001',
            productCategory: 'Pharmaceuticals',
            startDate: '2024-01-01',
            endDate: '2024-12-31',
            status: 'active',
            value: '$85,000',
            renewalDate: '2024-11-30',
            contactPerson: 'Dr. Sarah Johnson',
            terms: 'Net 30, 2% discount for early payment'
          },
          {
            id: 2,
            supplierId: 2,
            contractNumber: 'CT-2024-002',
            productCategory: 'Surgical Equipment',
            startDate: '2024-01-15',
            endDate: '2024-07-14',
            status: 'active',
            value: '$45,000',
            renewalDate: '2024-06-30',
            contactPerson: 'Michael Rodriguez',
            terms: 'Net 45, free shipping on orders over $5000'
          },
          {
            id: 3,
            supplierId: 7,
            contractNumber: 'CT-2024-003',
            productCategory: 'Emergency Equipment',
            startDate: '2023-12-01',
            endDate: '2024-11-30',
            status: 'active',
            value: '$120,000',
            renewalDate: '2024-10-31',
            contactPerson: 'Karen Thompson',
            terms: 'Net 60, priority support included'
          },
          {
            id: 4,
            supplierId: 3,
            contractNumber: 'CT-2023-045',
            productCategory: 'Medical Devices',
            startDate: '2023-06-01',
            endDate: '2024-05-31',
            status: 'expiring',
            value: '$65,000',
            renewalDate: '2024-04-30',
            contactPerson: 'Jennifer Lee',
            terms: 'Net 30, bulk discount over $25,000'
          },
          {
            id: 5,
            supplierId: 5,
            contractNumber: 'CT-2024-004',
            productCategory: 'Laboratory',
            startDate: '2024-02-01',
            endDate: '2025-01-31',
            status: 'pending',
            value: '$55,000',
            renewalDate: '2024-12-31',
            contactPerson: 'Amanda Wilson',
            terms: 'Net 45, quarterly performance review'
          },
          {
            id: 6,
            supplierId: 4,
            contractNumber: 'CT-2023-088',
            productCategory: 'Consumables',
            startDate: '2023-03-01',
            endDate: '2024-02-29',
            status: 'expired',
            value: '$35,000',
            renewalDate: '2024-01-31',
            contactPerson: 'Robert Chen',
            terms: 'Net 30, automatic quarterly orders'
          }
        ];
        setContracts(dummyContracts);
        localStorage.setItem('contractData', JSON.stringify(dummyContracts));
      }

      if (savedPerformance) {
        setPerformanceData(JSON.parse(savedPerformance));
      } else {
        const dummyPerformance = [
          {
            supplierId: 1,
            onTimeDelivery: 98,
            qualityScore: 96,
            leadTimeDays: 2,
            returnRate: 0.5,
            communication: 95,
            lastUpdated: '2024-01-20'
          },
          {
            supplierId: 2,
            onTimeDelivery: 95,
            qualityScore: 94,
            leadTimeDays: 3,
            returnRate: 1.2,
            communication: 92,
            lastUpdated: '2024-01-19'
          },
          {
            supplierId: 7,
            onTimeDelivery: 99,
            qualityScore: 98,
            leadTimeDays: 1,
            returnRate: 0.2,
            communication: 97,
            lastUpdated: '2024-01-22'
          },
          {
            supplierId: 3,
            onTimeDelivery: 92,
            qualityScore: 90,
            leadTimeDays: 4,
            returnRate: 2.5,
            communication: 88,
            lastUpdated: '2024-01-18'
          },
          {
            supplierId: 5,
            onTimeDelivery: 96,
            qualityScore: 95,
            leadTimeDays: 2,
            returnRate: 0.8,
            communication: 94,
            lastUpdated: '2024-01-15'
          }
        ];
        setPerformanceData(dummyPerformance);
        localStorage.setItem('performanceData', JSON.stringify(dummyPerformance));
      }
      
      setLoaded(true);
    };

    loadData();
  }, []);

  const getStatusColor = (status) => {
    switch (status) {
      case 'active':
        return '#4caf50';
      case 'pending':
        return '#ff9800';
      case 'inactive':
        return '#f44336';
      case 'expiring':
        return '#ff9800';
      case 'expired':
        return '#f44336';
      default:
        return '#757575';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'active':
        return <CheckCircleIcon />;
      case 'pending':
        return <ScheduleIcon />;
      case 'inactive':
        return <ErrorIcon />;
      case 'expiring':
        return <WarningIcon />;
      case 'expired':
        return <ErrorIcon />;
      default:
        return <WarningIcon />;
    }
  };

  const getCategoryColor = (category) => {
    switch (category) {
      case 'Pharmaceuticals':
        return '#2196f3';
      case 'Surgical Equipment':
        return '#4caf50';
      case 'Medical Devices':
        return '#9c27b0';
      case 'Consumables':
        return '#ff9800';
      case 'Laboratory':
        return '#00bcd4';
      case 'Emergency Equipment':
        return '#f44336';
      case 'Orthopedic':
        return '#795548';
      default:
        return '#757575';
    }
  };

  const getPerformanceColor = (score) => {
    if (score >= 95) return '#4caf50';
    if (score >= 85) return '#ff9800';
    return '#f44336';
  };

  const getSupplierPerformance = (supplierId) => {
    return performanceData.find(p => p.supplierId === supplierId);
  };

  const getSupplierContracts = (supplierId) => {
    return contracts.filter(c => c.supplierId === supplierId);
  };

  const getContractStatus = (endDate) => {
    const end = new Date(endDate);
    const today = new Date();
    const daysToExpiry = Math.ceil((end - today) / (1000 * 60 * 60 * 24));
    
    if (daysToExpiry < 0) return 'expired';
    if (daysToExpiry <= 30) return 'expiring';
    return 'active';
  };

  const handleOpenSupplierDialog = (supplier = null) => {
    setSelectedSupplier(supplier);
    setEditMode(!!supplier);
    setOpenSupplierDialog(true);
  };

  const handleCloseSupplierDialog = () => {
    setOpenSupplierDialog(false);
    setSelectedSupplier(null);
    setEditMode(false);
  };

  const handleOpenContractDialog = () => {
    setOpenContractDialog(true);
  };

  const handleCloseContractDialog = () => {
    setOpenContractDialog(false);
  };

  const handleTogglePreferred = (supplierId) => {
    const updatedSuppliers = suppliers.map(supplier => 
      supplier.id === supplierId 
        ? { ...supplier, preferred: !supplier.preferred }
        : supplier
    );
    setSuppliers(updatedSuppliers);
    localStorage.setItem('supplierData', JSON.stringify(updatedSuppliers));
  };

  const handleUpdateStatus = (supplierId, newStatus) => {
    const updatedSuppliers = suppliers.map(supplier => 
      supplier.id === supplierId 
        ? { ...supplier, status: newStatus }
        : supplier
    );
    setSuppliers(updatedSuppliers);
    localStorage.setItem('supplierData', JSON.stringify(updatedSuppliers));
  };

  const filteredSuppliers = suppliers.filter(supplier => {
    if (filterStatus !== 'all' && supplier.status !== filterStatus) return false;
    if (searchTerm && !supplier.companyName.toLowerCase().includes(searchTerm.toLowerCase()) && 
        !supplier.contactPerson.toLowerCase().includes(searchTerm.toLowerCase())) return false;
    return true;
  }).sort((a, b) => {
    if (sortBy === 'name') return a.companyName.localeCompare(b.companyName);
    if (sortBy === 'rating') return b.rating - a.rating;
    if (sortBy === 'reliability') {
      const perfA = getSupplierPerformance(a.id)?.onTimeDelivery || 0;
      const perfB = getSupplierPerformance(b.id)?.onTimeDelivery || 0;
      return perfB - perfA;
    }
    if (sortBy === 'spend') {
      const spendA = parseFloat(a.totalSpend.replace(/[^0-9.-]+/g, ''));
      const spendB = parseFloat(b.totalSpend.replace(/[^0-9.-]+/g, ''));
      return spendB - spendA;
    }
    return 0;
  });

  const getStats = () => {
    const total = suppliers.length;
    const active = suppliers.filter(s => s.status === 'active').length;
    const preferred = suppliers.filter(s => s.preferred).length;
    const expiring = contracts.filter(c => getContractStatus(c.endDate) === 'expiring').length;
    
    return { total, active, preferred, expiring };
  };

  const stats = getStats();

const PerformanceMetricCard = ({
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

        {/* Progress (unchanged logic, updated styling) */}
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


  const SupplierCard = ({ supplier }) => {
    const performance = getSupplierPerformance(supplier.id);
    const supplierContracts = getSupplierContracts(supplier.id);

    return (
      <Grow in={true} timeout={300}>
        <Paper sx={{ 
          p: 3, 
          mb: 2,
          borderRadius: 2,
          boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
          border: `1px solid ${supplier.preferred ? alpha('#ffd700', 0.3) : alpha('#000', 0.1)}`,
          bgcolor: supplier.preferred ? alpha('#ffd700', 0.03) : 'white',
          transition: 'all 0.3s',
          '&:hover': {
            boxShadow: '0 6px 16px rgba(0,0,0,0.1)',
            transform: 'translateY(-2px)'
          }
        }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <Box sx={{ flex: 1 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
                <Avatar sx={{ 
                  bgcolor: alpha(getCategoryColor(supplier.category), 0.1),
                  color: getCategoryColor(supplier.category)
                }}>
                  <BusinessIcon />
                </Avatar>
                <Box>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, flexWrap: 'wrap' }}>
                    <Typography variant="h6" sx={{ fontWeight: 600 }}>
                      {supplier.companyName}
                    </Typography>
                    {supplier.preferred && (
                      <Chip 
                        icon={<StarIcon />}
                        label="Preferred"
                        size="small"
                        sx={{ 
                          bgcolor: alpha('#ffd700', 0.2),
                          color: '#b8860b',
                          fontWeight: 600
                        }}
                      />
                    )}
                    <Chip 
                      icon={getStatusIcon(supplier.status)}
                      label={supplier.status.toUpperCase()}
                      size="small"
                      sx={{ 
                        bgcolor: alpha(getStatusColor(supplier.status), 0.1),
                        color: getStatusColor(supplier.status),
                        fontWeight: 500
                      }}
                    />
                  </Box>
                  <Chip 
                    label={supplier.category}
                    size="small"
                    sx={{ 
                      bgcolor: alpha(getCategoryColor(supplier.category), 0.1),
                      color: getCategoryColor(supplier.category),
                      mt: 0.5
                    }}
                  />
                </Box>
              </Box>

              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 3, mb: 2 }}>
                <Box>
                  <Typography variant="caption" color="text.secondary" display="block">
                    Contact Person
                  </Typography>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                    <PersonIcon fontSize="small" color="action" />
                    <Typography variant="body2" fontWeight={500}>
                      {supplier.contactPerson}
                    </Typography>
                  </Box>
                </Box>
                <Box>
                  <Typography variant="caption" color="text.secondary" display="block">
                    Contact
                  </Typography>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                    <PhoneIcon fontSize="small" color="action" />
                    <Typography variant="body2">
                      {supplier.phone}
                    </Typography>
                  </Box>
                </Box>
                <Box>
                  <Typography variant="caption" color="text.secondary" display="block">
                    Email
                  </Typography>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                    <EmailIcon fontSize="small" color="action" />
                    <Typography variant="body2">
                      {supplier.email}
                    </Typography>
                  </Box>
                </Box>
              </Box>

              <Box sx={{ mb: 2 }}>
                <Typography variant="caption" color="text.secondary" display="block">
                  Address
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 0.5 }}>
                  <LocationIcon fontSize="small" color="action" sx={{ mt: 0.25 }} />
                  <Typography variant="body2">
                    {supplier.address}
                  </Typography>
                </Box>
              </Box>

              {performance && (
                <Box sx={{ 
                  p: 2, 
                  borderRadius: 1.5,
                  bgcolor: alpha(theme.palette.primary.main, 0.03),
                  border: `1px solid ${alpha(theme.palette.primary.main, 0.1)}`
                }}>
                  <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                    Performance Metrics
                  </Typography>
                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2 }}>
                    <Box>
                      <Typography variant="caption" color="text.secondary">On-Time Delivery</Typography>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <CircularProgress 
                          variant="determinate" 
                          value={performance.onTimeDelivery} 
                          size={40}
                          thickness={4}
                          sx={{ color: getPerformanceColor(performance.onTimeDelivery) }}
                        />
                        <Typography variant="body1" fontWeight={600}>
                          {performance.onTimeDelivery}%
                        </Typography>
                      </Box>
                    </Box>
                    <Box>
                      <Typography variant="caption" color="text.secondary">Lead Time</Typography>
                      <Typography variant="body1" fontWeight={600}>
                        {performance.leadTimeDays} days
                      </Typography>
                    </Box>
                    <Box>
                      <Typography variant="caption" color="text.secondary">Quality Score</Typography>
                      <Typography variant="body1" fontWeight={600}>
                        {performance.qualityScore}/100
                      </Typography>
                    </Box>
                  </Box>
                </Box>
              )}

              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 2 }}>
                <Box>
                  <Rating 
                    value={supplier.rating} 
                    precision={0.1} 
                    readOnly 
                    size="small"
                    sx={{ color: '#ffd700' }}
                  />
                  <Typography variant="caption" color="text.secondary">
                    {supplier.rating}/5.0
                  </Typography>
                </Box>
                <Typography variant="body2" fontWeight={600} color="primary">
                  Total Spend: {supplier.totalSpend}
                </Typography>
              </Box>
            </Box>

            <Box sx={{ 
              display: 'flex', 
              flexDirection: 'column', 
              gap: 1,
              ml: 2,
              minWidth: 120
            }}>
              <Button
                size="small"
                variant="outlined"
                startIcon={<VisibilityIcon />}
                onClick={() => handleOpenSupplierDialog(supplier)}
                sx={{ borderRadius: 1.5, textTransform: 'none' }}
              >
                View
              </Button>
              <Button
                size="small"
                variant="outlined"
                startIcon={<EditIcon />}
                onClick={() => handleOpenSupplierDialog(supplier)}
                sx={{ borderRadius: 1.5, textTransform: 'none' }}
              >
                Edit
              </Button>
              <Button
                size="small"
                variant="outlined"
                startIcon={<ContractIcon />}
                onClick={handleOpenContractDialog}
                sx={{ borderRadius: 1.5, textTransform: 'none' }}
              >
                Contracts ({supplierContracts.length})
              </Button>
              <FormControlLabel
                control={
                  <Switch
                    checked={supplier.preferred}
                    onChange={() => handleTogglePreferred(supplier.id)}
                    color="warning"
                    size="small"
                  />
                }
                label={
                  <Typography variant="caption">
                    {supplier.preferred ? 'Preferred' : 'Mark Preferred'}
                  </Typography>
                }
              />
            </Box>
          </Box>
        </Paper>
      </Grow>
    );
  };

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
                  <BusinessIcon fontSize="large" />
                  Supplier & Vendor Management
                </Typography>
                <Typography variant="body1" color="text.secondary">
                  Manage supplier relationships, contracts, and performance metrics
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
                  startIcon={<AddIcon />}
                  onClick={() => handleOpenSupplierDialog()}
                  sx={{ 
                    borderRadius: 2,
                    textTransform: 'none',
                    fontWeight: 600,
                    px: 3
                  }}
                >
                  Add New Supplier
                </Button>
                <Button
                  variant="outlined"
                  startIcon={<ContractIcon />}
                  onClick={handleOpenContractDialog}
                  sx={{ 
                    borderRadius: 2,
                    textTransform: 'none'
                  }}
                >
                  Manage Contracts
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
                  placeholder="Search suppliers or contacts..."
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
                  <TextField
                    select
                    size="small"
                    value={filterStatus}
                    onChange={(e) => setFilterStatus(e.target.value)}
                    sx={{ minWidth: 120 }}
                  >
                    <MenuItem value="all">All Status</MenuItem>
                    <MenuItem value="active">Active</MenuItem>
                    <MenuItem value="pending">Pending</MenuItem>
                    <MenuItem value="inactive">Inactive</MenuItem>
                  </TextField>
                  <TextField
                    select
                    size="small"
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    sx={{ minWidth: 140 }}
                  >
                    <MenuItem value="name">Sort by Name</MenuItem>
                    <MenuItem value="rating">Sort by Rating</MenuItem>
                    <MenuItem value="reliability">Sort by Reliability</MenuItem>
                    <MenuItem value="spend">Sort by Spend</MenuItem>
                  </TextField>
                </Box>
              </Box>
            </Paper>
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
  <PerformanceMetricCard
    title="Total Suppliers"
    value={stats.total}
    color="#2196f3"
    gradient="linear-gradient(135deg, #2196f3 0%, #1e88e5 100%)"
    icon={BusinessIcon}
    subtitle="All registered vendors"
  />

  <PerformanceMetricCard
    title="Active Suppliers"
    value={stats.active}
    color="#4caf50"
    gradient="linear-gradient(135deg, #4caf50 0%, #43a047 100%)"
    icon={CheckCircleIcon}
    subtitle={`${Math.round((stats.active / stats.total) * 100)}% of total`}
    progress={(stats.active / stats.total) * 100}
    delay={200}
  />

  <PerformanceMetricCard
    title="Preferred Vendors"
    value={stats.preferred}
    color="#ffd700"
    gradient="linear-gradient(135deg, #FFD700 0%, #F59E0B 100%)"
    icon={StarIcon}
    subtitle="Priority suppliers"
    delay={400}
  />

  <PerformanceMetricCard
    title="Expiring Contracts"
    value={stats.expiring}
    color="#ff9800"
    gradient="linear-gradient(135deg, #ff9800 0%, #f57c00 100%)"
    icon={WarningIcon}
    subtitle="Require attention"
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
                icon={<Badge badgeContent={stats.active} color="primary" />}
                iconPosition="start"
                label="Supplier Directory" 
              />
              <Tab 
                icon={<Badge badgeContent={stats.expiring} color="warning" />}
                iconPosition="start"
                label="Contract Management" 
              />
              <Tab 
                icon={<ChartIcon />}
                label="Performance Analytics" 
              />
            </Tabs>
          </Paper>
        </Grow>

        {/* Tab Content */}
        <Grow in={loaded} timeout={700}>
          <Box>
            {activeTab === 0 && (
              <Box>
                <Box sx={{ mb: 3 }}>
                  <Typography variant="h6" gutterBottom>
                    Supplier Directory
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {filteredSuppliers.length} suppliers found
                  </Typography>
                </Box>

                {filteredSuppliers.length > 0 ? (
                  <Box>
                    {filteredSuppliers.map((supplier) => (
                      <SupplierCard key={supplier.id} supplier={supplier} />
                    ))}
                  </Box>
                ) : (
                  <Paper sx={{ 
                    p: 8, 
                    textAlign: 'center',
                    borderRadius: 2,
                    bgcolor: alpha(theme.palette.primary.main, 0.02)
                  }}>
                    <BusinessIcon sx={{ fontSize: 64, color: 'text.disabled', mb: 2 }} />
                    <Typography variant="h6" color="text.secondary" gutterBottom>
                      No suppliers found
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {searchTerm ? 'Try adjusting your search criteria' : 'Add new suppliers to get started'}
                    </Typography>
                    <Button
                      variant="contained"
                      startIcon={<AddIcon />}
                      onClick={() => handleOpenSupplierDialog()}
                      sx={{ mt: 2, borderRadius: 2 }}
                    >
                      Add First Supplier
                    </Button>
                  </Paper>
                )}
              </Box>
            )}

            {activeTab === 1 && (
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
                    <Box>
                      <Typography variant="h6" gutterBottom>
                        Contract Management
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        Track and manage supplier contracts
                      </Typography>
                    </Box>
                    <Button
                      variant="contained"
                      startIcon={<AddIcon />}
                      onClick={handleOpenContractDialog}
                      sx={{ borderRadius: 2 }}
                    >
                      New Contract
                    </Button>
                  </Box>

                  <Alert 
                    severity="warning" 
                    icon={<WarningIcon />}
                    sx={{ 
                      mb: 2,
                      borderRadius: 2,
                      alignItems: 'center'
                    }}
                  >
                    <Typography variant="body2" fontWeight={600}>
                      {stats.expiring} contracts expiring within 30 days require attention
                    </Typography>
                  </Alert>
                </Box>

                <TableContainer component={Paper} sx={{ borderRadius: 2 }}>
                  <Table>
                    <TableHead sx={{ bgcolor: alpha('#9c27b0', 0.05) }}>
                      <TableRow>
                        <TableCell sx={{ fontWeight: 600 }}>Contract Details</TableCell>
                        <TableCell sx={{ fontWeight: 600 }}>Supplier</TableCell>
                        <TableCell sx={{ fontWeight: 600 }}>Duration</TableCell>
                        <TableCell sx={{ fontWeight: 600 }}>Value</TableCell>
                        <TableCell sx={{ fontWeight: 600 }}>Status</TableCell>
                        <TableCell sx={{ fontWeight: 600 }}>Actions</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {contracts.map((contract, index) => {
                        const supplier = suppliers.find(s => s.id === contract.supplierId);
                        const status = getContractStatus(contract.endDate);
                        
                        return (
                          <Grow in={true} timeout={300} key={contract.id} style={{ transitionDelay: `${index * 50}ms` }}>
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
                                  <Typography variant="body1" fontWeight={600}>
                                    {contract.contractNumber}
                                  </Typography>
                                  <Typography variant="body2" color="text.secondary">
                                    {contract.productCategory}
                                  </Typography>
                                </Box>
                              </TableCell>
                              <TableCell>
                                <Typography variant="body2" fontWeight={500}>
                                  {supplier?.companyName || 'Unknown Supplier'}
                                </Typography>
                                <Typography variant="caption" color="text.secondary">
                                  {contract.contactPerson}
                                </Typography>
                              </TableCell>
                              <TableCell>
                                <Box>
                                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                    <DateRangeIcon fontSize="small" color="action" />
                                    <Typography variant="body2">
                                      {contract.startDate} to {contract.endDate}
                                    </Typography>
                                  </Box>
                                  <Typography variant="caption" color="text.secondary">
                                    Renewal: {contract.renewalDate}
                                  </Typography>
                                </Box>
                              </TableCell>
                              <TableCell>
                                <Typography variant="body1" fontWeight={600} color="primary">
                                  {contract.value}
                                </Typography>
                              </TableCell>
                              <TableCell>
                                <Chip 
                                  icon={getStatusIcon(status)}
                                  label={status.toUpperCase()}
                                  size="small"
                                  sx={{ 
                                    bgcolor: alpha(getStatusColor(status), 0.1),
                                    color: getStatusColor(status),
                                    fontWeight: 500
                                  }}
                                />
                              </TableCell>
                              <TableCell>
                                <Box sx={{ display: 'flex', gap: 1 }}>
                                  <Tooltip title="View Contract">
                                    <IconButton size="small">
                                      <VisibilityIcon />
                                    </IconButton>
                                  </Tooltip>
                                  <Tooltip title="Renew">
                                    <IconButton size="small" color="primary">
                                      <RefreshIcon />
                                    </IconButton>
                                  </Tooltip>
                                </Box>
                              </TableCell>
                            </TableRow>
                          </Grow>
                        );
                      })}
                    </TableBody>
                  </Table>
                </TableContainer>
              </Box>
            )}

            {activeTab === 2 && (
              <Box>
                <Box sx={{ mb: 4 }}>
                  <Typography variant="h6" gutterBottom>
                    Supplier Performance Analytics
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Monitor key performance indicators across all suppliers
                  </Typography>
                </Box>

                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                  {performanceData.map((performance, index) => {
                    const supplier = suppliers.find(s => s.id === performance.supplierId);
                    if (!supplier) return null;

                    return (
                      <Grow in={true} timeout={400} key={performance.supplierId} style={{ transitionDelay: `${index * 100}ms` }}>
                        <Paper sx={{ p: 3, borderRadius: 2 }}>
                          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                            <Box>
                              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
                                <Avatar sx={{ 
                                  bgcolor: alpha(getCategoryColor(supplier.category), 0.1),
                                  color: getCategoryColor(supplier.category)
                                }}>
                                  <BusinessIcon />
                                </Avatar>
                                <Box>
                                  <Typography variant="h6" sx={{ fontWeight: 600 }}>
                                    {supplier.companyName}
                                  </Typography>
                                  <Typography variant="body2" color="text.secondary">
                                    Last updated: {performance.lastUpdated}
                                  </Typography>
                                </Box>
                              </Box>

                              <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 2 }}>
                                <Box>
                                  <Typography variant="caption" color="text.secondary" display="block">
                                    On-Time Delivery
                                  </Typography>
                                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                    <LinearProgress 
                                      variant="determinate" 
                                      value={performance.onTimeDelivery} 
                                      sx={{ 
                                        flex: 1,
                                        height: 8,
                                        borderRadius: 4,
                                        bgcolor: alpha(getPerformanceColor(performance.onTimeDelivery), 0.1),
                                        '& .MuiLinearProgress-bar': {
                                          bgcolor: getPerformanceColor(performance.onTimeDelivery),
                                          borderRadius: 4
                                        }
                                      }}
                                    />
                                    <Typography variant="body1" fontWeight={600}>
                                      {performance.onTimeDelivery}%
                                    </Typography>
                                  </Box>
                                </Box>

                                <Box>
                                  <Typography variant="caption" color="text.secondary" display="block">
                                    Quality Score
                                  </Typography>
                                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                    <LinearProgress 
                                      variant="determinate" 
                                      value={performance.qualityScore} 
                                      sx={{ 
                                        flex: 1,
                                        height: 8,
                                        borderRadius: 4,
                                        bgcolor: alpha(getPerformanceColor(performance.qualityScore), 0.1),
                                        '& .MuiLinearProgress-bar': {
                                          bgcolor: getPerformanceColor(performance.qualityScore),
                                          borderRadius: 4
                                        }
                                      }}
                                    />
                                    <Typography variant="body1" fontWeight={600}>
                                      {performance.qualityScore}/100
                                    </Typography>
                                  </Box>
                                </Box>

                                <Box>
                                  <Typography variant="caption" color="text.secondary" display="block">
                                    Lead Time
                                  </Typography>
                                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                    <ScheduleIcon fontSize="small" color="action" />
                                    <Typography variant="body1" fontWeight={600}>
                                      {performance.leadTimeDays} days
                                    </Typography>
                                  </Box>
                                </Box>

                                <Box>
                                  <Typography variant="caption" color="text.secondary" display="block">
                                    Return Rate
                                  </Typography>
                                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                    {performance.returnRate <= 1 ? (
                                      <TrendingDownIcon color="success" />
                                    ) : (
                                      <TrendingUpIcon color="error" />
                                    )}
                                    <Typography variant="body1" fontWeight={600}>
                                      {performance.returnRate}%
                                    </Typography>
                                  </Box>
                                </Box>
                              </Box>
                            </Box>

                            <Box sx={{ textAlign: 'center', minWidth: 100 }}>
                              <CircularProgress 
                                variant="determinate" 
                                value={(performance.onTimeDelivery + performance.qualityScore + (100 - performance.returnRate)) / 3} 
                                size={80}
                                thickness={4}
                                sx={{ 
                                  color: getPerformanceColor((performance.onTimeDelivery + performance.qualityScore + (100 - performance.returnRate)) / 3),
                                  mb: 1
                                }}
                              />
                              <Typography variant="caption" color="text.secondary">
                                Overall Score
                              </Typography>
                              <Typography variant="h6" fontWeight={700}>
                                {Math.round((performance.onTimeDelivery + performance.qualityScore + (100 - performance.returnRate)) / 3)}%
                              </Typography>
                            </Box>
                          </Box>
                        </Paper>
                      </Grow>
                    );
                  })}
                </Box>
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
            border: `1px solid ${alpha(theme.palette.primary.main, 0.2)}`
          }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <Box>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                  <VerifiedIcon color="primary" />
                  <Typography variant="h6" sx={{ fontWeight: 600 }}>
                    AI Procurement Recommendations
                  </Typography>
                </Box>
                <Typography variant="body2" paragraph>
                  {stats.expiring > 0 ? 
                    `⚠️ **Action Required**: ${stats.expiring} contracts expiring soon. Prioritize renewal negotiations with Emergency Medical Equipment (99% reliability) and MediCare Pharmaceuticals (98% reliability) for critical supplies.` :
                    '✅ **Contracts Optimized**: All supplier contracts are current. Consider volume discounts with preferred vendors for upcoming quarterly orders.'
                  }
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Suggested action: Review performance scores quarterly • Next vendor evaluation: March 31, 2024
                </Typography>
              </Box>
              <Box sx={{ textAlign: 'right' }}>
                <Chip 
                  label="92% Accuracy" 
                  color="primary" 
                  sx={{ fontWeight: 600, mb: 1 }}
                />
                <Typography variant="caption" color="text.secondary" display="block">
                  AI Confidence Score
                </Typography>
              </Box>
            </Box>
          </Paper>
        </Grow>

        {/* Supplier Dialog */}
        <Dialog 
          open={openSupplierDialog} 
          onClose={handleCloseSupplierDialog}
          maxWidth="md"
          fullWidth
          PaperProps={{
            sx: { borderRadius: 2 }
          }}
        >
          <DialogTitle sx={{ 
            bgcolor: alpha(theme.palette.primary.main, 0.05),
            borderBottom: `1px solid ${alpha(theme.palette.primary.main, 0.1)}`
          }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <Avatar sx={{ bgcolor: theme.palette.primary.main, color: 'white' }}>
                {editMode ? <EditIcon /> : <AddIcon />}
              </Avatar>
              <Box>
                <Typography variant="h6" sx={{ fontWeight: 600 }}>
                  {editMode ? 'Edit Supplier' : 'Add New Supplier'}
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  {editMode ? 'Update supplier information' : 'Register a new vendor'}
                </Typography>
              </Box>
            </Box>
          </DialogTitle>
          <DialogContent sx={{ pt: 3 }}>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              <TextField
                fullWidth
                label="Company Name"
                defaultValue={selectedSupplier?.companyName || ''}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <BusinessIcon color="action" />
                    </InputAdornment>
                  ),
                }}
              />
              
              <TextField
                fullWidth
                label="Contact Person"
                defaultValue={selectedSupplier?.contactPerson || ''}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <PersonIcon color="action" />
                    </InputAdornment>
                  ),
                }}
              />
              
              <Box sx={{ display: 'flex', gap: 2, flexDirection: isMobile ? 'column' : 'row' }}>
                <TextField
                  fullWidth
                  label="Phone Number"
                  defaultValue={selectedSupplier?.phone || ''}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <PhoneIcon color="action" />
                      </InputAdornment>
                    ),
                  }}
                />
                <TextField
                  fullWidth
                  label="Email Address"
                  type="email"
                  defaultValue={selectedSupplier?.email || ''}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <EmailIcon color="action" />
                      </InputAdornment>
                    ),
                  }}
                />
              </Box>
              
              <TextField
                fullWidth
                label="Address"
                multiline
                rows={2}
                defaultValue={selectedSupplier?.address || ''}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <LocationIcon color="action" />
                    </InputAdornment>
                  ),
                }}
              />
              
              <Box sx={{ display: 'flex', gap: 2, flexDirection: isMobile ? 'column' : 'row' }}>
                <TextField
                  select
                  fullWidth
                  label="Category"
                  defaultValue={selectedSupplier?.category || 'Pharmaceuticals'}
                >
                  <MenuItem value="Pharmaceuticals">Pharmaceuticals</MenuItem>
                  <MenuItem value="Surgical Equipment">Surgical Equipment</MenuItem>
                  <MenuItem value="Medical Devices">Medical Devices</MenuItem>
                  <MenuItem value="Consumables">Consumables</MenuItem>
                  <MenuItem value="Laboratory">Laboratory</MenuItem>
                  <MenuItem value="Emergency Equipment">Emergency Equipment</MenuItem>
                  <MenuItem value="Orthopedic">Orthopedic</MenuItem>
                </TextField>
                
                <TextField
                  select
                  fullWidth
                  label="Status"
                  defaultValue={selectedSupplier?.status || 'active'}
                >
                  <MenuItem value="active">Active</MenuItem>
                  <MenuItem value="pending">Pending</MenuItem>
                  <MenuItem value="inactive">Inactive</MenuItem>
                </TextField>
              </Box>
              
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Switch defaultChecked={selectedSupplier?.preferred || false} />
                <Typography variant="body2">Mark as Preferred Vendor</Typography>
              </Box>
              
              <Box sx={{ mt: 2 }}>
                <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                  Additional Notes
                </Typography>
                <TextField
                  fullWidth
                  multiline
                  rows={3}
                  placeholder="Add any additional information about this supplier..."
                />
              </Box>
            </Box>
          </DialogContent>
          <DialogActions sx={{ p: 2, borderTop: `1px solid ${theme.palette.divider}` }}>
            <Button onClick={handleCloseSupplierDialog}>
              Cancel
            </Button>
            <Button 
              variant="contained" 
              onClick={handleCloseSupplierDialog}
              sx={{ 
                borderRadius: 1.5,
                px: 3,
                fontWeight: 600
              }}
            >
              {editMode ? 'Update Supplier' : 'Add Supplier'}
            </Button>
          </DialogActions>
        </Dialog>

        {/* Contract Dialog */}
        <Dialog 
          open={openContractDialog} 
          onClose={handleCloseContractDialog}
          maxWidth="md"
          fullWidth
          PaperProps={{
            sx: { borderRadius: 2 }
          }}
        >
          <DialogTitle sx={{ 
            bgcolor: alpha('#9c27b0', 0.05),
            borderBottom: `1px solid ${alpha('#9c27b0', 0.1)}`
          }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <Avatar sx={{ bgcolor: '#9c27b0', color: 'white' }}>
                <ContractIcon />
              </Avatar>
              <Typography variant="h6" sx={{ fontWeight: 600 }}>
                Contract Management
              </Typography>
            </Box>
          </DialogTitle>
          <DialogContent sx={{ pt: 3 }}>
            <Paper sx={{ 
              p: 3, 
              mb: 3,
              borderRadius: 2,
              bgcolor: alpha('#9c27b0', 0.03)
            }}>
              <Typography variant="body2" color="text.secondary" paragraph>
                Manage supplier contracts, track expiry dates, and set up automatic renewal notifications.
                This feature integrates with the Order & Restock workflow to ensure continuous supply.
              </Typography>
              <Alert severity="info">
                Full contract management functionality will be available in the next update.
              </Alert>
            </Paper>
          </DialogContent>
          <DialogActions sx={{ p: 2, borderTop: `1px solid ${theme.palette.divider}` }}>
            <Button onClick={handleCloseContractDialog}>
              Close
            </Button>
          </DialogActions>
        </Dialog>
      </Box>
    </Fade>
  );
};

export default SupplierVendorManagement;