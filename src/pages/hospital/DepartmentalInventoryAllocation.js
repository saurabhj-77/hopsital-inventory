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
  LinearProgress,
  FormControl,
  InputLabel,
  Select,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  ListItemSecondaryAction,
  Switch,
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
  LocalHospital as HospitalIcon,
  Healing as HealingIcon,
  MedicalServices as MedicalIcon,
  TransferWithinAStation as TransferIcon,
  TrendingUp as TrendingUpIcon,
  TrendingDown as TrendingDownIcon,
  Warning as WarningIcon,
  CheckCircle as CheckCircleIcon,
  Error as ErrorIcon,
  Inventory as InventoryIcon,
  Add as AddIcon,
  Remove as RemoveIcon,
  Search as SearchIcon,
  FilterList as FilterIcon,
  Download as DownloadIcon,
  CalendarToday as CalendarIcon,
  Person as PersonIcon,
  Science as ScienceIcon,
  Pharmacy as PharmacyIcon,
  Devices as DevicesIcon,
  Timeline as TimelineIcon,
  BarChart as ChartIcon,
  Refresh as RefreshIcon,
  Check as CheckIcon,
  Close as CloseIcon,
  ArrowForward as ArrowForwardIcon,
  ArrowBack as ArrowBackIcon,
  Settings as SettingsIcon,
  Notifications as NotificationIcon
} from '@mui/icons-material';

const DepartmentalInventoryAllocation = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  
  const [activeTab, setActiveTab] = useState(0);
  const [departmentInventory, setDepartmentInventory] = useState([]);
  const [transferRequests, setTransferRequests] = useState([]);
  const [departmentStats, setDepartmentStats] = useState({});
  const [openTransferDialog, setOpenTransferDialog] = useState(false);
  const [openParLevelDialog, setOpenParLevelDialog] = useState(false);
  const [selectedDepartment, setSelectedDepartment] = useState(null);
  const [selectedItem, setSelectedItem] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterDepartment, setFilterDepartment] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');
  const [transferForm, setTransferForm] = useState({
    fromDepartment: '',
    toDepartment: '',
    item: '',
    quantity: '',
    reason: ''
  });
  const [parLevelForm, setParLevelForm] = useState({
    minQuantity: '',
    maxQuantity: '',
    reorderPoint: ''
  });
  const [loaded, setLoaded] = useState(false);

  // Department definitions with priorities
  const departments = [
    { id: 'er', name: 'Emergency Room', priority: 'critical', icon: HospitalIcon, color: '#f44336' },
    { id: 'icu', name: 'Intensive Care Unit', priority: 'critical', icon: HealingIcon, color: '#9c27b0' },
    { id: 'or', name: 'Operating Room', priority: 'high', icon: MedicalIcon, color: '#2196f3' },
    { id: 'pharmacy', name: 'Pharmacy', priority: 'medium', icon: HospitalIcon, color: '#4caf50' },
    { id: 'lab', name: 'Laboratory', priority: 'medium', icon: ScienceIcon, color: '#ff9800' },
    { id: 'ward1', name: 'Ward 1 (Surgical)', priority: 'medium', icon: HospitalIcon, color: '#795548' },
    { id: 'ward2', name: 'Ward 2 (Medical)', priority: 'medium', icon: HospitalIcon, color: '#607d8b' },
    { id: 'central', name: 'Central Storage', priority: 'low', icon: InventoryIcon, color: '#757575' }
  ];

  // Initialize with dummy data
  useEffect(() => {
    const loadData = () => {
      // Check if data exists in localStorage
      const savedInventory = localStorage.getItem('departmentInventory');
      const savedTransfers = localStorage.getItem('transferRequests');
      const savedStats = localStorage.getItem('departmentStats');

      if (savedInventory) {
        setDepartmentInventory(JSON.parse(savedInventory));
      } else {
        // Generate dummy department inventory data
        const dummyInventory = [];
        const items = [
          { id: 1, name: 'Epinephrine 1mg', category: 'Pharmacy', unit: 'vials' },
          { id: 2, name: 'Surgical Gloves', category: 'Consumable', unit: 'pairs' },
          { id: 3, name: 'Saline Solution 500ml', category: 'Consumable', unit: 'bags' },
          { id: 4, name: 'Patient Monitor', category: 'Equipment', unit: 'units' },
          { id: 5, name: 'IV Catheters', category: 'Consumable', unit: 'units' },
          { id: 6, name: 'Bandages', category: 'Consumable', unit: 'rolls' },
          { id: 7, name: 'Defibrillator', category: 'Equipment', unit: 'units' },
          { id: 8, name: 'Blood Test Kits', category: 'Laboratory', unit: 'kits' }
        ];

        departments.forEach(dept => {
          items.forEach(item => {
            // Generate random but realistic quantities based on department priority
            let minQty, maxQty, currentQty;
            switch (dept.priority) {
              case 'critical':
                minQty = 20;
                maxQty = 100;
                currentQty = Math.floor(Math.random() * (maxQty - minQty + 1)) + minQty;
                break;
              case 'high':
                minQty = 15;
                maxQty = 75;
                currentQty = Math.floor(Math.random() * (maxQty - minQty + 1)) + minQty;
                break;
              default:
                minQty = 10;
                maxQty = 50;
                currentQty = Math.floor(Math.random() * (maxQty - minQty + 1)) + minQty;
            }

            const parLevel = Math.floor(currentQty * 0.3);
            const status = currentQty <= parLevel ? 'low' : currentQty >= (parLevel * 3) ? 'excess' : 'optimal';
            
            dummyInventory.push({
              id: `${dept.id}-${item.id}`,
              departmentId: dept.id,
              departmentName: dept.name,
              itemId: item.id,
              itemName: item.name,
              category: item.category,
              currentQuantity: currentQty,
              parLevel: parLevel,
              maxLevel: Math.floor(currentQty * 1.5),
              unit: item.unit,
              status: status,
              lastUpdated: '2024-01-22 08:00:00',
              usageRate: Math.random() * 10 + 5, // items per day
              critical: item.category === 'Pharmacy' || dept.priority === 'critical'
            });
          });
        });

        setDepartmentInventory(dummyInventory);
        localStorage.setItem('departmentInventory', JSON.stringify(dummyInventory));
      }

      if (savedTransfers) {
        setTransferRequests(JSON.parse(savedTransfers));
      } else {
        const dummyTransfers = [
          {
            id: 1,
            itemName: 'Epinephrine 1mg',
            itemId: 'EPI-001',
            fromDepartment: 'Pharmacy',
            toDepartment: 'Emergency Room',
            quantity: 25,
            requestedBy: 'Dr. Sarah Chen',
            requestedDate: '2024-01-22 10:30:00',
            status: 'approved',
            approvedBy: 'Inventory Admin',
            approvedDate: '2024-01-22 11:00:00',
            reason: 'Emergency stock replenishment'
          },
          {
            id: 2,
            itemName: 'Patient Monitor',
            itemId: 'PM-012',
            fromDepartment: 'Central Storage',
            toDepartment: 'ICU',
            quantity: 2,
            requestedBy: 'Nurse James Wilson',
            requestedDate: '2024-01-22 09:15:00',
            status: 'pending',
            approvedBy: '',
            approvedDate: '',
            reason: 'New ICU bed setup'
          },
          {
            id: 3,
            itemName: 'Surgical Gloves',
            itemId: 'SG-005',
            fromDepartment: 'Central Storage',
            toDepartment: 'Operating Room',
            quantity: 100,
            requestedBy: 'Dr. Michael Rodriguez',
            requestedDate: '2024-01-21 14:45:00',
            status: 'rejected',
            approvedBy: 'Inventory Admin',
            approvedDate: '2024-01-21 15:30:00',
            reason: 'Insufficient stock in central storage'
          },
          {
            id: 4,
            itemName: 'IV Catheters',
            itemId: 'IVC-004',
            fromDepartment: 'Pharmacy',
            toDepartment: 'Ward 1 (Surgical)',
            quantity: 50,
            requestedBy: 'Nurse Lisa Thompson',
            requestedDate: '2024-01-21 11:20:00',
            status: 'approved',
            approvedBy: 'Inventory Admin',
            approvedDate: '2024-01-21 12:00:00',
            reason: 'Routine ward restock'
          },
          {
            id: 5,
            itemName: 'Blood Test Kits',
            itemId: 'BTK-007',
            fromDepartment: 'Laboratory',
            toDepartment: 'Emergency Room',
            quantity: 30,
            requestedBy: 'Lab Technician',
            requestedDate: '2024-01-20 16:30:00',
            status: 'pending',
            approvedBy: '',
            approvedDate: '',
            reason: 'Emergency department request'
          }
        ];
        setTransferRequests(dummyTransfers);
        localStorage.setItem('transferRequests', JSON.stringify(dummyTransfers));
      }

      if (savedStats) {
        setDepartmentStats(JSON.parse(savedStats));
      } else {
        // Calculate stats from inventory
        const totalItems = departmentInventory.length;
        const lowStockItems = departmentInventory.filter(item => item.status === 'low').length;
        const excessStockItems = departmentInventory.filter(item => item.status === 'excess').length;
        const pendingTransfers = transferRequests.filter(tr => tr.status === 'pending').length;
        
        const departmentUsage = {};
        departments.forEach(dept => {
          const deptItems = departmentInventory.filter(item => item.departmentId === dept.id);
          const totalQty = deptItems.reduce((sum, item) => sum + item.currentQuantity, 0);
          const lowStock = deptItems.filter(item => item.status === 'low').length;
          departmentUsage[dept.id] = {
            totalItems: deptItems.length,
            totalQuantity: totalQty,
            lowStockCount: lowStock,
            usageRate: deptItems.reduce((sum, item) => sum + item.usageRate, 0) / deptItems.length
          };
        });

        const dummyStats = {
          totalItems,
          lowStockItems,
          excessStockItems,
          pendingTransfers,
          departmentUsage,
          lastUpdated: '2024-01-22 14:30:00'
        };
        setDepartmentStats(dummyStats);
        localStorage.setItem('departmentStats', JSON.stringify(dummyStats));
      }
      
      setLoaded(true);
    };

    loadData();
  }, []);

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'critical':
        return '#f44336';
      case 'high':
        return '#ff9800';
      case 'medium':
        return '#2196f3';
      case 'low':
        return '#4caf50';
      default:
        return '#757575';
    }
  };

  const getPriorityIcon = (priority) => {
    switch (priority) {
      case 'critical':
        return <HospitalIcon />;
      case 'high':
        return <WarningIcon />;
      case 'medium':
        return <MedicalIcon />;
      case 'low':
        return <CheckCircleIcon />;
      default:
        return <HospitalIcon />;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'low':
        return '#f44336';
      case 'excess':
        return '#ff9800';
      case 'optimal':
        return '#4caf50';
      default:
        return '#757575';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'low':
        return <ErrorIcon />;
      case 'excess':
        return <WarningIcon />;
      case 'optimal':
        return <CheckCircleIcon />;
      default:
        return <CheckCircleIcon />;
    }
  };

  const getDepartmentIcon = (departmentId) => {
    const dept = departments.find(d => d.id === departmentId);
    return dept ? dept.icon : HospitalIcon;
  };

  const getDepartmentColor = (departmentId) => {
    const dept = departments.find(d => d.id === departmentId);
    return dept ? dept.color : '#757575';
  };

  const handleOpenTransferDialog = (fromDept = '', item = null) => {
    setTransferForm({
      fromDepartment: fromDept,
      toDepartment: '',
      item: item ? item.itemName : '',
      quantity: '',
      reason: ''
    });
    setSelectedItem(item);
    setOpenTransferDialog(true);
  };

  const handleCloseTransferDialog = () => {
    setOpenTransferDialog(false);
    setSelectedItem(null);
    setTransferForm({
      fromDepartment: '',
      toDepartment: '',
      item: '',
      quantity: '',
      reason: ''
    });
  };

  const handleOpenParLevelDialog = (department, item) => {
    setSelectedDepartment(department);
    setSelectedItem(item);
    setParLevelForm({
      minQuantity: item.parLevel || '',
      maxQuantity: item.maxLevel || '',
      reorderPoint: Math.floor(item.parLevel * 1.2) || ''
    });
    setOpenParLevelDialog(true);
  };

  const handleCloseParLevelDialog = () => {
    setOpenParLevelDialog(false);
    setSelectedDepartment(null);
    setSelectedItem(null);
    setParLevelForm({
      minQuantity: '',
      maxQuantity: '',
      reorderPoint: ''
    });
  };

  const handleSubmitTransfer = () => {
    if (transferForm.fromDepartment && transferForm.toDepartment && transferForm.item && transferForm.quantity && transferForm.reason) {
      const newTransfer = {
        id: transferRequests.length + 1,
        itemName: transferForm.item,
        itemId: selectedItem?.itemId || 'ITEM-' + Date.now(),
        fromDepartment: transferForm.fromDepartment,
        toDepartment: transferForm.toDepartment,
        quantity: parseInt(transferForm.quantity),
        requestedBy: 'Current User',
        requestedDate: new Date().toLocaleString('en-US', { 
          year: 'numeric', 
          month: '2-digit', 
          day: '2-digit', 
          hour: '2-digit', 
          minute: '2-digit', 
          second: '2-digit' 
        }),
        status: 'pending',
        approvedBy: '',
        approvedDate: '',
        reason: transferForm.reason
      };

      const updatedTransfers = [newTransfer, ...transferRequests];
      setTransferRequests(updatedTransfers);
      localStorage.setItem('transferRequests', JSON.stringify(updatedTransfers));

      handleCloseTransferDialog();
    }
  };

  const handleUpdateParLevel = () => {
    if (selectedItem && parLevelForm.minQuantity && parLevelForm.maxQuantity) {
      const updatedInventory = departmentInventory.map(item => {
        if (item.id === selectedItem.id) {
          const newParLevel = parseInt(parLevelForm.minQuantity);
          const newMaxLevel = parseInt(parLevelForm.maxQuantity);
          const newStatus = item.currentQuantity <= newParLevel ? 'low' : 
                           item.currentQuantity >= newMaxLevel ? 'excess' : 'optimal';
          
          return {
            ...item,
            parLevel: newParLevel,
            maxLevel: newMaxLevel,
            status: newStatus
          };
        }
        return item;
      });

      setDepartmentInventory(updatedInventory);
      localStorage.setItem('departmentInventory', JSON.stringify(updatedInventory));
      handleCloseParLevelDialog();
    }
  };

  const handleApproveTransfer = (transferId) => {
    const updatedTransfers = transferRequests.map(transfer => {
      if (transfer.id === transferId) {
        return {
          ...transfer,
          status: 'approved',
          approvedBy: 'Current User',
          approvedDate: new Date().toLocaleString('en-US', { 
            year: 'numeric', 
            month: '2-digit', 
            day: '2-digit', 
            hour: '2-digit', 
            minute: '2-digit', 
            second: '2-digit' 
          })
        };
      }
      return transfer;
    });

    setTransferRequests(updatedTransfers);
    localStorage.setItem('transferRequests', JSON.stringify(updatedTransfers));
  };

  const handleRejectTransfer = (transferId) => {
    const updatedTransfers = transferRequests.map(transfer => {
      if (transfer.id === transferId) {
        return {
          ...transfer,
          status: 'rejected',
          approvedBy: 'Current User',
          approvedDate: new Date().toLocaleString('en-US', { 
            year: 'numeric', 
            month: '2-digit', 
            day: '2-digit', 
            hour: '2-digit', 
            minute: '2-digit', 
            second: '2-digit' 
          })
        };
      }
      return transfer;
    });

    setTransferRequests(updatedTransfers);
    localStorage.setItem('transferRequests', JSON.stringify(updatedTransfers));
  };

  const filteredInventory = departmentInventory.filter(item => {
    if (filterDepartment !== 'all' && item.departmentId !== filterDepartment) return false;
    if (filterStatus !== 'all' && item.status !== filterStatus) return false;
    if (searchTerm && !item.itemName.toLowerCase().includes(searchTerm.toLowerCase()) && 
        !item.departmentName.toLowerCase().includes(searchTerm.toLowerCase())) return false;
    return true;
  });

  const filteredTransfers = transferRequests.filter(transfer => {
    if (filterDepartment !== 'all' && transfer.fromDepartment !== departments.find(d => d.id === filterDepartment)?.name) return false;
    if (filterStatus !== 'all' && transfer.status !== filterStatus) return false;
    return true;
  });

  const getDepartmentStats = (departmentId) => {
    const deptItems = departmentInventory.filter(item => item.departmentId === departmentId);
    const totalItems = deptItems.length;
    const lowStock = deptItems.filter(item => item.status === 'low').length;
    const optimalStock = deptItems.filter(item => item.status === 'optimal').length;
    const excessStock = deptItems.filter(item => item.status === 'excess').length;
    const totalQuantity = deptItems.reduce((sum, item) => sum + item.currentQuantity, 0);
    
    return { totalItems, lowStock, optimalStock, excessStock, totalQuantity };
  };

const DepartmentStatCard = ({ department, color, icon: Icon }) => {
  const stats = getDepartmentStats(department.id);
  const deptPriority =
    departments.find(d => d.id === department.id)?.priority || 'medium';

  // ✅ FIX: gradient derived from color
  const gradient = `linear-gradient(135deg, ${alpha(color, 0.9)} 0%, ${color} 100%)`;

  return (
    <Grow in={loaded} timeout={500}>
      <Card
        sx={{
          background: gradient, // ✅ now always defined
          color: 'black',
          borderRadius: 3,
          transition: 'all 0.3s ease',
          '&:hover': {
            transform: 'translateY(-4px)',
            boxShadow: `0 12px 24px ${alpha(color, 0.35)}`
          },
          position: 'relative',
          overflow: 'hidden'
        }}
      >
        {/* AI Indicator */}
        <Box
          sx={{
            position: 'absolute',
            top: 8,
            right: 8,
            background: 'rgba(255,255,255,0.25)',
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
          {/* Header */}
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'flex-start',
              mb: 2
            }}
          >
            <Box>
              <Typography variant="h5" fontWeight={700}>
                {department.name}
              </Typography>

              <Chip
                label={deptPriority.toUpperCase()}
                size="small"
                sx={{
                  mt: 0.5,
                  bgcolor: 'rgba(255,255,255,0.3)',
                  color: 'black',
                  fontWeight: 600,
                  height: 20,
                  fontSize: '0.65rem'
                }}
              />

              <Typography variant="h6" sx={{ opacity: 0.85, mt: 1 }}>
                {stats.totalItems} items • {stats.totalQuantity} units
              </Typography>
            </Box>

            {/* Icon */}
            <Box
              sx={{
                background: 'rgba(255,255,255,0.25)',
                borderRadius: 2,
                p: 1,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              <Icon sx={{ fontSize: 28 }} />
            </Box>
          </Box>

          {/* Stock Progress */}
          <Box sx={{ mb: 2 }}>
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                mb: 0.5
              }}
            >
              <Typography variant="caption" sx={{ opacity: 0.8 }}>
                Stock Status
              </Typography>
              <Typography variant="caption" fontWeight={600}>
                {stats.lowStock > 0
                  ? `${stats.lowStock} low`
                  : 'All optimal'}
              </Typography>
            </Box>

            <LinearProgress
              variant="determinate"
              value={(stats.optimalStock / stats.totalItems) * 100}
              sx={{
                height: 6,
                borderRadius: 3,
                bgcolor: 'rgba(255,255,255,0.35)',
                '& .MuiLinearProgress-bar': {
                  bgcolor:
                    stats.lowStock > 0 ? '#f44336' : '#4caf50',
                  borderRadius: 3
                }
              }}
            />
          </Box>

          {/* Breakdown */}
          <Box sx={{ display: 'flex', gap: 3, mb: 2 }}>
            <Box textAlign="center">
              <Typography variant="caption" sx={{ opacity: 0.8 }}>
                Low
              </Typography>
              <Typography variant="h6" fontWeight={700} color="error">
                {stats.lowStock}
              </Typography>
            </Box>

            <Box textAlign="center">
              <Typography variant="caption" sx={{ opacity: 0.8 }}>
                Optimal
              </Typography>
              <Typography variant="h6" fontWeight={700} color="success.main">
                {stats.optimalStock}
              </Typography>
            </Box>

            <Box textAlign="center">
              <Typography variant="caption" sx={{ opacity: 0.8 }}>
                Excess
              </Typography>
              <Typography variant="h6" fontWeight={700} color="warning.main">
                {stats.excessStock}
              </Typography>
            </Box>
          </Box>

          {/* Action */}
          <Button
            fullWidth
            variant="outlined"
            size="small"
            startIcon={<TransferIcon />}
            onClick={() => handleOpenTransferDialog(department.name)}
            sx={{
              borderRadius: 1.5,
              textTransform: 'none',
              bgcolor: 'rgba(255,255,255,0.25)',
              color: 'black',
              borderColor: 'rgba(0,0,0,0.2)',
              '&:hover': {
                bgcolor: 'rgba(255,255,255,0.4)'
              }
            }}
          >
            Request Transfer
          </Button>
        </CardContent>
      </Card>
    </Grow>
  );
};




  const InventoryItemRow = ({ item, index }) => {
    const DepartmentIcon = getDepartmentIcon(item.departmentId);
    const departmentColor = getDepartmentColor(item.departmentId);
    const progress = (item.currentQuantity / (item.maxLevel || 100)) * 100;
    
    return (
      <Grow in={true} timeout={300} style={{ transitionDelay: `${index * 30}ms` }}>
        <TableRow
          sx={{
            '&:hover': { 
              backgroundColor: alpha(departmentColor, 0.04),
              transition: 'background-color 0.3s'
            },
            borderLeft: item.critical ? `4px solid ${departmentColor}` : 'none'
          }}
        >
          <TableCell>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <Avatar sx={{ 
                bgcolor: alpha(departmentColor, 0.1),
                color: departmentColor,
                width: 32,
                height: 32
              }}>
                <DepartmentIcon fontSize="small" />
              </Avatar>
              <Box>
                <Typography variant="body2" fontWeight={600}>
                  {item.departmentName}
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  {departments.find(d => d.id === item.departmentId)?.priority.toUpperCase()} Priority
                </Typography>
              </Box>
            </Box>
          </TableCell>
          <TableCell>
            <Box>
              <Typography variant="body2" fontWeight={600}>
                {item.itemName}
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
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <Box sx={{ flex: 1 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
                  <Typography variant="caption" color="text.secondary">
                    Current: {item.currentQuantity} {item.unit}
                  </Typography>
                  <Typography variant="caption" fontWeight={600} color={
                    item.status === 'low' ? 'error' : 
                    item.status === 'excess' ? 'warning' : 'success'
                  }>
                    {item.status.toUpperCase()}
                  </Typography>
                </Box>
                <LinearProgress 
                  variant="determinate" 
                  value={progress > 100 ? 100 : progress}
                  sx={{ 
                    height: 6,
                    borderRadius: 3,
                    bgcolor: alpha(departmentColor, 0.1),
                    '& .MuiLinearProgress-bar': {
                      bgcolor: getStatusColor(item.status),
                      borderRadius: 3
                    }
                  }}
                />
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 0.5 }}>
                  <Typography variant="caption" color="text.secondary">
                    Min: {item.parLevel}
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    Max: {item.maxLevel}
                  </Typography>
                </Box>
              </Box>
            </Box>
          </TableCell>
          <TableCell>
            <Box>
              <Typography variant="body2" color="text.secondary">
                {item.usageRate.toFixed(1)} {item.unit}/day
              </Typography>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                {item.usageRate > 7 ? (
                  <TrendingUpIcon fontSize="small" color="error" />
                ) : (
                  <TrendingDownIcon fontSize="small" color="success" />
                )}
                <Typography variant="caption" color={item.usageRate > 7 ? 'error' : 'success'}>
                  {item.usageRate > 7 ? 'High' : 'Normal'} usage
                </Typography>
              </Box>
            </Box>
          </TableCell>
          <TableCell>
            <Typography variant="caption" color="text.secondary">
              {item.lastUpdated.split(' ')[0]}
            </Typography>
            <Typography variant="caption" display="block" color="text.secondary">
              {item.lastUpdated.split(' ')[1]}
            </Typography>
          </TableCell>
          <TableCell>
            <Box sx={{ display: 'flex', gap: 1 }}>
              <Tooltip title="Request Transfer">
                <IconButton 
                  size="small"
                  onClick={() => handleOpenTransferDialog(item.departmentName, item)}
                  sx={{ color: '#2196f3' }}
                >
                  <TransferIcon fontSize="small" />
                </IconButton>
              </Tooltip>
              <Tooltip title="Adjust Par Levels">
                <IconButton 
                  size="small"
                  onClick={() => handleOpenParLevelDialog(item.departmentName, item)}
                  sx={{ color: '#ff9800' }}
                >
                  <SettingsIcon fontSize="small" />
                </IconButton>
              </Tooltip>
              {item.critical && (
                <Chip 
                  label="Critical"
                  size="small"
                  sx={{ 
                    bgcolor: alpha('#f44336', 0.1),
                    color: '#f44336',
                    fontSize: '0.65rem',
                    height: 20
                  }}
                />
              )}
            </Box>
          </TableCell>
        </TableRow>
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
                  <HospitalIcon fontSize="large" />
                  Departmental Inventory Allocation
                </Typography>
                <Typography variant="body1" color="text.secondary">
                  Track and manage inventory across hospital departments with real-time allocation
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
                  startIcon={<TransferIcon />}
                  onClick={() => handleOpenTransferDialog()}
                  sx={{ 
                    borderRadius: 2,
                    textTransform: 'none',
                    fontWeight: 600,
                    px: 3
                  }}
                >
                  New Transfer
                </Button>
                <Button
                  variant="outlined"
                  startIcon={<DownloadIcon />}
                  sx={{ 
                    borderRadius: 2,
                    textTransform: 'none'
                  }}
                >
                  Export Allocation
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
                  placeholder="Search items or departments..."
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
                    label="Department"
                    value={filterDepartment}
                    onChange={(e) => setFilterDepartment(e.target.value)}
                    sx={{ minWidth: 160 }}
                  >
                    <MenuItem value="all">All Departments</MenuItem>
                    {departments.map(dept => (
                      <MenuItem key={dept.id} value={dept.id}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                          <dept.icon fontSize="small" />
                          {dept.name}
                        </Box>
                      </MenuItem>
                    ))}
                  </TextField>
                  <TextField
                    select
                    size="small"
                    label="Status"
                    value={filterStatus}
                    onChange={(e) => setFilterStatus(e.target.value)}
                    sx={{ minWidth: 120 }}
                  >
                    <MenuItem value="all">All Status</MenuItem>
                    <MenuItem value="low">Low Stock</MenuItem>
                    <MenuItem value="optimal">Optimal</MenuItem>
                    <MenuItem value="excess">Excess</MenuItem>
                  </TextField>
                </Box>
              </Box>
            </Paper>
          </Box>
        </Slide>

        {/* Department Stats Cards */}
<Box sx={{ mb: 4 }}>
  <Typography variant="h6" gutterBottom>
    Department Overview
  </Typography>

  <Box
    sx={{
      display: 'flex',
      gap: 2,
      overflowX: 'auto',
      pb: 2
    }}
  >
    {departments.map(dept => (
      <Box key={dept.id} sx={{ minWidth: isMobile ? 280 : 320 }}>
        <DepartmentStatCard
          department={dept}
          color={dept.color}
          icon={dept.icon}
        />
      </Box>
    ))}
  </Box>
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
                icon={<Badge badgeContent={filteredInventory.filter(i => i.status === 'low').length} color="error" />}
                iconPosition="start"
                label="Inventory Allocation" 
              />
              <Tab 
                icon={<Badge badgeContent={filteredTransfers.filter(t => t.status === 'pending').length} color="warning" />}
                iconPosition="start"
                label="Transfer Requests" 
              />
              <Tab 
                icon={<TimelineIcon />}
                label="Usage Analytics" 
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
                    Department-wise Inventory
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {filteredInventory.length} items across {new Set(filteredInventory.map(i => i.departmentId)).size} departments
                  </Typography>
                </Box>

                <TableContainer component={Paper} sx={{ borderRadius: 2 }}>
                  <Table>
                    <TableHead sx={{ bgcolor: alpha('#2196f3', 0.05) }}>
                      <TableRow>
                        <TableCell sx={{ fontWeight: 600 }}>Department</TableCell>
                        <TableCell sx={{ fontWeight: 600 }}>Item Details</TableCell>
                        <TableCell sx={{ fontWeight: 600 }}>Stock Levels</TableCell>
                        <TableCell sx={{ fontWeight: 600 }}>Usage Rate</TableCell>
                        <TableCell sx={{ fontWeight: 600 }}>Last Updated</TableCell>
                        <TableCell sx={{ fontWeight: 600 }}>Actions</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {filteredInventory.map((item, index) => (
                        <InventoryItemRow key={item.id} item={item} index={index} />
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>

                {filteredInventory.length === 0 && (
                  <Paper sx={{ 
                    p: 8, 
                    mt: 2,
                    textAlign: 'center',
                    borderRadius: 2,
                    bgcolor: alpha(theme.palette.primary.main, 0.02)
                  }}>
                    <InventoryIcon sx={{ fontSize: 64, color: 'text.disabled', mb: 2 }} />
                    <Typography variant="h6" color="text.secondary" gutterBottom>
                      No inventory items found
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
                        Inter-Department Transfer Requests
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        Manage inventory transfers between departments
                      </Typography>
                    </Box>
                    <Button
                      variant="contained"
                      startIcon={<AddIcon />}
                      onClick={() => handleOpenTransferDialog()}
                      sx={{ borderRadius: 2 }}
                    >
                      New Transfer Request
                    </Button>
                  </Box>

                  <Alert 
                    severity="info" 
                    icon={<TransferIcon />}
                    sx={{ 
                      mb: 2,
                      borderRadius: 2
                    }}
                  >
                    <Typography variant="body2">
                      {filteredTransfers.filter(t => t.status === 'pending').length} pending transfers require approval
                    </Typography>
                  </Alert>
                </Box>

                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                  {filteredTransfers.map((transfer, index) => (
                    <Grow in={true} timeout={400} key={transfer.id} style={{ transitionDelay: `${index * 100}ms` }}>
                      <Paper sx={{ 
                        p: 3, 
                        borderRadius: 2,
                        borderLeft: `4px solid ${
                          transfer.status === 'approved' ? '#4caf50' : 
                          transfer.status === 'rejected' ? '#f44336' : '#ff9800'
                        }`,
                        boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
                        transition: 'transform 0.3s',
                        '&:hover': {
                          transform: 'translateY(-2px)',
                          boxShadow: '0 6px 16px rgba(0,0,0,0.1)'
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
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
                              <Avatar sx={{ 
                                bgcolor: transfer.status === 'approved' ? alpha('#4caf50', 0.1) : 
                                         transfer.status === 'rejected' ? alpha('#f44336', 0.1) : 
                                         alpha('#ff9800', 0.1),
                                color: transfer.status === 'approved' ? '#4caf50' : 
                                       transfer.status === 'rejected' ? '#f44336' : '#ff9800'
                              }}>
                                <TransferIcon />
                              </Avatar>
                              <Box>
                                <Typography variant="h6" sx={{ fontWeight: 600 }}>
                                  {transfer.itemName}
                                </Typography>
                                <Chip 
                                  label={transfer.status.toUpperCase()}
                                  size="small"
                                  sx={{ 
                                    bgcolor: transfer.status === 'approved' ? alpha('#4caf50', 0.1) : 
                                             transfer.status === 'rejected' ? alpha('#f44336', 0.1) : 
                                             alpha('#ff9800', 0.1),
                                    color: transfer.status === 'approved' ? '#4caf50' : 
                                           transfer.status === 'rejected' ? '#f44336' : '#ff9800',
                                    fontWeight: 600
                                  }}
                                />
                              </Box>
                            </Box>

                            <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 2, mb: 2 }}>
                              <Box>
                                <Typography variant="caption" color="text.secondary" display="block">
                                  Transfer Details
                                </Typography>
                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mt: 0.5 }}>
                                  <ArrowBackIcon fontSize="small" color="action" />
                                  <Typography variant="body2" fontWeight={500}>
                                    {transfer.fromDepartment}
                                  </Typography>
                                  <ArrowForwardIcon fontSize="small" color="action" />
                                  <Typography variant="body2" fontWeight={500}>
                                    {transfer.toDepartment}
                                  </Typography>
                                </Box>
                              </Box>
                              <Box>
                                <Typography variant="caption" color="text.secondary" display="block">
                                  Quantity
                                </Typography>
                                <Typography variant="body1" fontWeight={600}>
                                  {transfer.quantity} units
                                </Typography>
                              </Box>
                              <Box>
                                <Typography variant="caption" color="text.secondary" display="block">
                                  Requested By
                                </Typography>
                                <Typography variant="body2" fontWeight={500}>
                                  {transfer.requestedBy}
                                </Typography>
                              </Box>
                              <Box>
                                <Typography variant="caption" color="text.secondary" display="block">
                                  Request Date
                                </Typography>
                                <Typography variant="body2">
                                  {transfer.requestedDate}
                                </Typography>
                              </Box>
                            </Box>

                            <Box sx={{ 
                              p: 2, 
                              borderRadius: 1.5,
                              bgcolor: alpha('#2196f3', 0.05),
                              border: `1px solid ${alpha('#2196f3', 0.1)}`
                            }}>
                              <Typography variant="caption" color="text.secondary" display="block">
                                Reason for Transfer
                              </Typography>
                              <Typography variant="body2">
                                {transfer.reason}
                              </Typography>
                            </Box>

                            {transfer.status !== 'pending' && (
                              <Box sx={{ mt: 2 }}>
                                <Typography variant="caption" color="text.secondary">
                                  {transfer.status === 'approved' ? 'Approved' : 'Rejected'} by {transfer.approvedBy} on {transfer.approvedDate}
                                </Typography>
                              </Box>
                            )}
                          </Box>

                          {transfer.status === 'pending' && (
                            <Box sx={{ 
                              display: 'flex', 
                              flexDirection: 'column', 
                              gap: 1,
                              minWidth: isMobile ? '100%' : 120
                            }}>
                              <Button
                                fullWidth={isMobile}
                                variant="contained"
                                color="success"
                                startIcon={<CheckIcon />}
                                onClick={() => handleApproveTransfer(transfer.id)}
                                sx={{ 
                                  borderRadius: 1.5,
                                  textTransform: 'none',
                                  fontWeight: 600
                                }}
                              >
                                Approve
                              </Button>
                              <Button
                                fullWidth={isMobile}
                                variant="contained"
                                color="error"
                                startIcon={<CloseIcon />}
                                onClick={() => handleRejectTransfer(transfer.id)}
                                sx={{ 
                                  borderRadius: 1.5,
                                  textTransform: 'none',
                                  fontWeight: 600
                                }}
                              >
                                Reject
                              </Button>
                            </Box>
                          )}
                        </Box>
                      </Paper>
                    </Grow>
                  ))}
                </Box>

                {filteredTransfers.length === 0 && (
                  <Paper sx={{ 
                    p: 8, 
                    mt: 2,
                    textAlign: 'center',
                    borderRadius: 2,
                    bgcolor: alpha(theme.palette.primary.main, 0.02)
                  }}>
                    <TransferIcon sx={{ fontSize: 64, color: 'text.disabled', mb: 2 }} />
                    <Typography variant="h6" color="text.secondary" gutterBottom>
                      No transfer requests found
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Create a new transfer request to move inventory between departments
                    </Typography>
                  </Paper>
                )}
              </Box>
            )}

            {activeTab === 2 && (
              <Box>
                <Box sx={{ mb: 3 }}>
                  <Typography variant="h6" gutterBottom>
                    Department Usage Analytics
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Analyze consumption patterns and optimize inventory allocation
                  </Typography>
                </Box>

                <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 3 }}>
                  <Card sx={{ borderRadius: 2 }}>
                    <CardContent>
                      <Typography variant="subtitle1" fontWeight={600} gutterBottom>
                        Top Consuming Departments
                      </Typography>
                      <List>
                        {departments.map((dept, index) => {
                          const stats = getDepartmentStats(dept.id);
                          const usageRate = stats.totalQuantity * (Math.random() * 0.1 + 0.05); // Simulated usage
                          
                          return (
                            <ListItem key={dept.id}>
                              <ListItemIcon>
                                <Avatar sx={{ 
                                  bgcolor: alpha(dept.color, 0.1), 
                                  color: dept.color,
                                  width: 32,
                                  height: 32
                                }}>
                                  <dept.icon fontSize="small" />
                                </Avatar>
                              </ListItemIcon>
                              <ListItemText 
                                primary={dept.name}
                                secondary={`${usageRate.toFixed(1)} units/day • ${stats.totalQuantity} in stock`}
                              />
                              <ListItemSecondaryAction>
                                <Chip 
                                  label={dept.priority}
                                  size="small"
                                  sx={{ 
                                    bgcolor: alpha(getPriorityColor(dept.priority), 0.1),
                                    color: getPriorityColor(dept.priority)
                                  }}
                                />
                              </ListItemSecondaryAction>
                            </ListItem>
                          );
                        })}
                      </List>
                    </CardContent>
                  </Card>

                  <Card sx={{ borderRadius: 2 }}>
                    <CardContent>
                      <Typography variant="subtitle1" fontWeight={600} gutterBottom>
                        Critical Items Alert
                      </Typography>
                      <List>
                        {departmentInventory
                          .filter(item => item.status === 'low' && item.critical)
                          .slice(0, 5)
                          .map((item, index) => (
                            <ListItem key={item.id}>
                              <ListItemIcon>
                                <ErrorIcon color="error" />
                              </ListItemIcon>
                              <ListItemText 
                                primary={item.itemName}
                                secondary={`${item.departmentName} • ${item.currentQuantity} left (Min: ${item.parLevel})`}
                              />
                              <ListItemSecondaryAction>
                                <Typography variant="caption" color="error">
                                  {item.usageRate.toFixed(1)}/day
                                </Typography>
                              </ListItemSecondaryAction>
                            </ListItem>
                          ))}
                      </List>
                      {departmentInventory.filter(item => item.status === 'low' && item.critical).length === 0 && (
                        <Box sx={{ textAlign: 'center', py: 4 }}>
                          <CheckCircleIcon sx={{ fontSize: 48, color: '#4caf50', mb: 2 }} />
                          <Typography variant="body2" color="text.secondary">
                            No critical items below par levels
                          </Typography>
                        </Box>
                      )}
                    </CardContent>
                  </Card>
                </Box>

                <Alert 
                  severity="info" 
                  icon={<TimelineIcon />}
                  sx={{ mt: 3, borderRadius: 2 }}
                >
                  <Typography variant="body2">
                    Usage analytics help optimize inventory allocation and prevent stockouts in critical departments.
                    Review these metrics weekly to adjust par levels and transfer schedules.
                  </Typography>
                </Alert>
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
            bgcolor: alpha('#2196f3', 0.05),
            border: `1px solid ${alpha('#2196f3', 0.2)}`
          }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <Box>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                  <HospitalIcon color="primary" />
                  <Typography variant="h6" sx={{ fontWeight: 600 }}>
                    AI Allocation Recommendations
                  </Typography>
                </Box>
                <Typography variant="body2" paragraph>
                  {departmentInventory.filter(i => i.status === 'low').length > 0 ? 
                    `⚠️ **Optimization Needed**: ${departmentInventory.filter(i => i.status === 'low').length} items below par levels. Consider transferring excess stock from Central Storage (${getDepartmentStats('central').excessStock} excess items) to Emergency Room and ICU.` :
                    '✅ **Optimal Allocation**: All departments maintain stock within par levels. Continue monitoring critical departments daily.'
                  }
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Next allocation review: Tomorrow, 08:00 • Priority: Balance stock in Emergency Room
                </Typography>
              </Box>
              <Box sx={{ textAlign: 'right' }}>
                <Chip 
                  label="96% Accuracy" 
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

        {/* Transfer Dialog */}
        <Dialog 
          open={openTransferDialog} 
          onClose={handleCloseTransferDialog}
          maxWidth="sm"
          fullWidth
          PaperProps={{
            sx: { borderRadius: 2 }
          }}
        >
          <DialogTitle sx={{ 
            bgcolor: alpha('#2196f3', 0.05),
            borderBottom: `1px solid ${alpha('#2196f3', 0.1)}`
          }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <Avatar sx={{ bgcolor: '#2196f3', color: 'white' }}>
                <TransferIcon />
              </Avatar>
              <Typography variant="h6" sx={{ fontWeight: 600 }}>
                New Transfer Request
              </Typography>
            </Box>
          </DialogTitle>
          <DialogContent sx={{ pt: 3 }}>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              <TextField
                select
                fullWidth
                label="From Department"
                value={transferForm.fromDepartment}
                onChange={(e) => setTransferForm({...transferForm, fromDepartment: e.target.value})}
                required
              >
                <MenuItem value="">Select Source Department</MenuItem>
                {departments.map(dept => (
                  <MenuItem key={dept.id} value={dept.name}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <dept.icon fontSize="small" />
                      {dept.name}
                    </Box>
                  </MenuItem>
                ))}
              </TextField>

              <TextField
                select
                fullWidth
                label="To Department"
                value={transferForm.toDepartment}
                onChange={(e) => setTransferForm({...transferForm, toDepartment: e.target.value})}
                required
              >
                <MenuItem value="">Select Destination Department</MenuItem>
                {departments
                  .filter(dept => dept.name !== transferForm.fromDepartment)
                  .map(dept => (
                    <MenuItem key={dept.id} value={dept.name}>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <dept.icon fontSize="small" />
                        {dept.name}
                      </Box>
                    </MenuItem>
                  ))}
              </TextField>

              <TextField
                fullWidth
                label="Item"
                value={transferForm.item}
                onChange={(e) => setTransferForm({...transferForm, item: e.target.value})}
                required
                placeholder="Enter item name"
              />

              <TextField
                fullWidth
                label="Quantity"
                type="number"
                value={transferForm.quantity}
                onChange={(e) => setTransferForm({...transferForm, quantity: e.target.value})}
                required
                InputProps={{
                  endAdornment: <InputAdornment position="end">units</InputAdornment>,
                }}
              />

              <TextField
                fullWidth
                label="Reason for Transfer"
                value={transferForm.reason}
                onChange={(e) => setTransferForm({...transferForm, reason: e.target.value})}
                multiline
                rows={3}
                required
                placeholder="Explain why this transfer is needed..."
              />
            </Box>
          </DialogContent>
          <DialogActions sx={{ p: 2, borderTop: `1px solid ${theme.palette.divider}` }}>
            <Button onClick={handleCloseTransferDialog}>
              Cancel
            </Button>
            <Button 
              variant="contained" 
              onClick={handleSubmitTransfer}
              disabled={!transferForm.fromDepartment || !transferForm.toDepartment || !transferForm.item || !transferForm.quantity || !transferForm.reason}
              sx={{ 
                borderRadius: 1.5,
                px: 3,
                fontWeight: 600
              }}
            >
              Submit Request
            </Button>
          </DialogActions>
        </Dialog>

        {/* Par Level Dialog */}
        <Dialog 
          open={openParLevelDialog} 
          onClose={handleCloseParLevelDialog}
          maxWidth="sm"
          fullWidth
          PaperProps={{
            sx: { borderRadius: 2 }
          }}
        >
          <DialogTitle sx={{ 
            bgcolor: alpha('#ff9800', 0.05),
            borderBottom: `1px solid ${alpha('#ff9800', 0.1)}`
          }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <Avatar sx={{ bgcolor: '#ff9800', color: 'white' }}>
                <SettingsIcon />
              </Avatar>
              <Box>
                <Typography variant="h6" sx={{ fontWeight: 600 }}>
                  Adjust Par Levels
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  {selectedItem?.itemName} • {selectedDepartment}
                </Typography>
              </Box>
            </Box>
          </DialogTitle>
          <DialogContent sx={{ pt: 3 }}>
            {selectedItem && (
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                <Paper sx={{ p: 2, borderRadius: 2, bgcolor: alpha('#ff9800', 0.05) }}>
                  <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                    Current Status
                  </Typography>
                  <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: 2 }}>
                    <Box>
                      <Typography variant="caption" color="text.secondary">Current Stock</Typography>
                      <Typography variant="body1" fontWeight={600}>
                        {selectedItem.currentQuantity} {selectedItem.unit}
                      </Typography>
                    </Box>
                    <Box>
                      <Typography variant="caption" color="text.secondary">Current Min</Typography>
                      <Typography variant="body1">{selectedItem.parLevel} {selectedItem.unit}</Typography>
                    </Box>
                    <Box>
                      <Typography variant="caption" color="text.secondary">Current Max</Typography>
                      <Typography variant="body1">{selectedItem.maxLevel} {selectedItem.unit}</Typography>
                    </Box>
                    <Box>
                      <Typography variant="caption" color="text.secondary">Status</Typography>
                      <Chip 
                        label={selectedItem.status.toUpperCase()}
                        size="small"
                        sx={{ 
                          bgcolor: alpha(getStatusColor(selectedItem.status), 0.1),
                          color: getStatusColor(selectedItem.status)
                        }}
                      />
                    </Box>
                  </Box>
                </Paper>

                <Box>
                  <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                    Set New Par Levels
                  </Typography>
                  <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                    <TextField
                      fullWidth
                      label="Minimum Quantity (Par Level)"
                      type="number"
                      value={parLevelForm.minQuantity}
                      onChange={(e) => setParLevelForm({...parLevelForm, minQuantity: e.target.value})}
                      required
                      helperText="Trigger point for low stock alerts"
                    />
                    
                    <TextField
                      fullWidth
                      label="Maximum Quantity"
                      type="number"
                      value={parLevelForm.maxQuantity}
                      onChange={(e) => setParLevelForm({...parLevelForm, maxQuantity: e.target.value})}
                      required
                      helperText="Prevent overstocking"
                    />
                    
                    <TextField
                      fullWidth
                      label="Reorder Point"
                      type="number"
                      value={parLevelForm.reorderPoint}
                      onChange={(e) => setParLevelForm({...parLevelForm, reorderPoint: e.target.value})}
                      helperText="Suggested order quantity (auto-calculated)"
                    />
                  </Box>
                </Box>

                <Alert severity="info">
                  <Typography variant="body2">
                    Par levels should be based on historical usage patterns and department priority.
                    Critical departments like ER and ICU may require higher minimums.
                  </Typography>
                </Alert>
              </Box>
            )}
          </DialogContent>
          <DialogActions sx={{ p: 2, borderTop: `1px solid ${theme.palette.divider}` }}>
            <Button onClick={handleCloseParLevelDialog}>
              Cancel
            </Button>
            <Button 
              variant="contained" 
              color="warning"
              onClick={handleUpdateParLevel}
              disabled={!parLevelForm.minQuantity || !parLevelForm.maxQuantity}
              sx={{ 
                borderRadius: 1.5,
                px: 3,
                fontWeight: 600
              }}
            >
              Update Par Levels
            </Button>
          </DialogActions>
        </Dialog>
      </Box>
    </Fade>
  );
};

export default DepartmentalInventoryAllocation;