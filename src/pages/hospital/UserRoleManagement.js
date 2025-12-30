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
  Checkbox,
  FormGroup,
  FormControlLabel,
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
  People as PeopleIcon,
  Security as SecurityIcon,
  Person as PersonIcon,
  PersonAdd as PersonAddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Visibility as VisibilityIcon,
  Search as SearchIcon,
  FilterList as FilterIcon,
  Download as DownloadIcon,
  CalendarToday as CalendarIcon,
  CheckCircle as CheckCircleIcon,
  Error as ErrorIcon,
  Warning as WarningIcon,
  Lock as LockIcon,
  LockOpen as LockOpenIcon,
  History as HistoryIcon,
  Assignment as AssignmentIcon,
  LocalHospital as HospitalIcon,
  Science as ScienceIcon,
  Devices as DevicesIcon,
  Inventory as InventoryIcon,
  Notifications as NotificationIcon,
  Refresh as RefreshIcon,
  MoreVert as MoreVertIcon,
  Star as StarIcon,
  StarBorder as StarBorderIcon,
  ArrowForward as ArrowForwardIcon,
  Pending as PendingIcon,
  HourglassEmpty as HourglassEmptyIcon,
  AccessTime as AccessTimeIcon,
  AdminPanelSettings as AdminIcon
} from '@mui/icons-material';

const UserRoleManagement = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  
  const [activeTab, setActiveTab] = useState(0);
  const [users, setUsers] = useState([]);
  const [roles, setRoles] = useState([]);
  const [accessRequests, setAccessRequests] = useState([]);
  const [userActivities, setUserActivities] = useState([]);
  const [openUserDialog, setOpenUserDialog] = useState(false);
  const [openRoleDialog, setOpenRoleDialog] = useState(false);
  const [openRequestDialog, setOpenRequestDialog] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterRole, setFilterRole] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterDepartment, setFilterDepartment] = useState('all');
  const [newUserForm, setNewUserForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    role: 'viewer',
    departments: [],
    status: 'active',
    phone: ''
  });
  const [roleForm, setRoleForm] = useState({
    name: '',
    level: 'standard',
    permissions: {
      inventory: { view: true, edit: false, delete: false },
      pharmacy: { view: true, edit: false, delete: false },
      orders: { view: true, edit: false, delete: false },
      reports: { view: true, edit: false, delete: false },
      users: { view: false, edit: false, delete: false }
    }
  });
  const [loaded, setLoaded] = useState(false);

  // Define roles and permissions
  const roleDefinitions = [
    { id: 'admin', name: 'Administrator', level: 'high', color: '#f44336' },
    { id: 'store_manager', name: 'Store Manager', level: 'high', color: '#2196f3' },
    { id: 'pharmacist', name: 'Pharmacist', level: 'medium', color: '#4caf50' },
    { id: 'nurse', name: 'Nurse', level: 'medium', color: '#9c27b0' },
    { id: 'physician', name: 'Physician', level: 'medium', color: '#ff9800' },
    { id: 'lab_tech', name: 'Lab Technician', level: 'low', color: '#607d8b' },
    { id: 'viewer', name: 'Viewer', level: 'low', color: '#757575' }
  ];

  // Define departments
  const departments = [
    { id: 'er', name: 'Emergency Room', icon: HospitalIcon, color: '#f44336' },
    { id: 'icu', name: 'Intensive Care Unit', icon: HospitalIcon, color: '#9c27b0' },
    { id: 'pharmacy', name: 'Pharmacy', icon: HospitalIcon, color: '#4caf50' },
    { id: 'lab', name: 'Laboratory', icon: ScienceIcon, color: '#ff9800' },
    { id: 'or', name: 'Operating Room', icon: ScienceIcon, color: '#2196f3' },
    { id: 'ward', name: 'General Ward', icon: HospitalIcon, color: '#795548' },
    { id: 'central', name: 'Central Storage', icon: InventoryIcon, color: '#607d8b' },
    { id: 'admin', name: 'Administration', icon: AdminIcon, color: '#757575' }
  ];

  // Initialize with dummy data
  useEffect(() => {
    const loadData = () => {
      // Check if data exists in localStorage
      const savedUsers = localStorage.getItem('systemUsers');
      const savedRoles = localStorage.getItem('systemRoles');
      const savedRequests = localStorage.getItem('accessRequests');
      const savedActivities = localStorage.getItem('userActivities');

      if (savedUsers) {
        setUsers(JSON.parse(savedUsers));
      } else {
        // Generate dummy user data
        const dummyUsers = [
          {
            id: 1,
            firstName: 'Sarah',
            lastName: 'Chen',
            fullName: 'Dr. Sarah Chen',
            email: 'sarah.chen@hospital.com',
            role: 'admin',
            roleName: 'Administrator',
            departments: ['er', 'pharmacy', 'admin'],
            status: 'active',
            phone: '+1 (555) 123-4567',
            lastLogin: '2024-01-22 14:30:00',
            joinDate: '2023-01-15',
            avatarColor: '#f44336',
            permissions: ['all'],
            isSuperAdmin: true
          },
          {
            id: 2,
            firstName: 'Michael',
            lastName: 'Rodriguez',
            fullName: 'Michael Rodriguez',
            email: 'm.rodriguez@hospital.com',
            role: 'store_manager',
            roleName: 'Store Manager',
            departments: ['central', 'pharmacy'],
            status: 'active',
            phone: '+1 (555) 987-6543',
            lastLogin: '2024-01-22 13:45:00',
            joinDate: '2023-03-20',
            avatarColor: '#2196f3',
            permissions: ['inventory', 'orders', 'reports'],
            isSuperAdmin: false
          },
          {
            id: 3,
            firstName: 'Jennifer',
            lastName: 'Lee',
            fullName: 'Pharmacist Jennifer Lee',
            email: 'j.lee@hospital.com',
            role: 'pharmacist',
            roleName: 'Pharmacist',
            departments: ['pharmacy'],
            status: 'active',
            phone: '+1 (555) 456-7890',
            lastLogin: '2024-01-22 11:20:00',
            joinDate: '2023-06-10',
            avatarColor: '#4caf50',
            permissions: ['pharmacy', 'inventory'],
            isSuperAdmin: false
          },
          {
            id: 4,
            firstName: 'James',
            lastName: 'Wilson',
            fullName: 'Nurse James Wilson',
            email: 'j.wilson@hospital.com',
            role: 'nurse',
            roleName: 'Nurse',
            departments: ['er', 'icu'],
            status: 'active',
            phone: '+1 (555) 234-5678',
            lastLogin: '2024-01-22 10:15:00',
            joinDate: '2023-08-05',
            avatarColor: '#9c27b0',
            permissions: ['inventory', 'pharmacy'],
            isSuperAdmin: false
          },
          {
            id: 5,
            firstName: 'Robert',
            lastName: 'Kim',
            fullName: 'Dr. Robert Kim',
            email: 'r.kim@hospital.com',
            role: 'physician',
            roleName: 'Physician',
            departments: ['er', 'icu', 'or'],
            status: 'active',
            phone: '+1 (555) 345-6789',
            lastLogin: '2024-01-22 09:30:00',
            joinDate: '2023-11-15',
            avatarColor: '#ff9800',
            permissions: ['inventory'],
            isSuperAdmin: false
          },
          {
            id: 6,
            firstName: 'Lisa',
            lastName: 'Thompson',
            fullName: 'Lisa Thompson',
            email: 'l.thompson@hospital.com',
            role: 'lab_tech',
            roleName: 'Lab Technician',
            departments: ['lab'],
            status: 'active',
            phone: '+1 (555) 567-8901',
            lastLogin: '2024-01-21 16:45:00',
            joinDate: '2023-09-22',
            avatarColor: '#607d8b',
            permissions: ['lab'],
            isSuperAdmin: false
          },
          {
            id: 7,
            firstName: 'David',
            lastName: 'Miller',
            fullName: 'David Miller',
            email: 'd.miller@hospital.com',
            role: 'viewer',
            roleName: 'Viewer',
            departments: ['admin'],
            status: 'inactive',
            phone: '+1 (555) 678-9012',
            lastLogin: '2024-01-15 11:00:00',
            joinDate: '2023-12-01',
            avatarColor: '#757575',
            permissions: ['view'],
            isSuperAdmin: false
          },
          {
            id: 8,
            firstName: 'Amanda',
            lastName: 'Wilson',
            fullName: 'Amanda Wilson',
            email: 'a.wilson@hospital.com',
            role: 'nurse',
            roleName: 'Nurse',
            departments: ['ward'],
            status: 'pending',
            phone: '+1 (555) 789-0123',
            lastLogin: null,
            joinDate: '2024-01-20',
            avatarColor: '#9c27b0',
            permissions: [],
            isSuperAdmin: false
          }
        ];
        setUsers(dummyUsers);
        localStorage.setItem('systemUsers', JSON.stringify(dummyUsers));
      }

      if (savedRoles) {
        setRoles(JSON.parse(savedRoles));
      } else {
        const dummyRoles = [
          {
            id: 'admin',
            name: 'Administrator',
            description: 'Full system access including user management',
            permissions: { all: true },
            userCount: 1,
            createdAt: '2023-01-01'
          },
          {
            id: 'store_manager',
            name: 'Store Manager',
            description: 'Inventory and order management across departments',
            permissions: { inventory: true, orders: true, reports: true },
            userCount: 1,
            createdAt: '2023-01-01'
          },
          {
            id: 'pharmacist',
            name: 'Pharmacist',
            description: 'Pharmacy inventory and medication management',
            permissions: { pharmacy: true, inventory: true },
            userCount: 1,
            createdAt: '2023-01-01'
          },
          {
            id: 'nurse',
            name: 'Nurse',
            description: 'Patient care inventory access and medication dispensing',
            permissions: { inventory: true, pharmacy: true },
            userCount: 2,
            createdAt: '2023-01-01'
          },
          {
            id: 'physician',
            name: 'Physician',
            description: 'Medical equipment and supply access',
            permissions: { inventory: true },
            userCount: 1,
            createdAt: '2023-01-01'
          },
          {
            id: 'lab_tech',
            name: 'Lab Technician',
            description: 'Laboratory supplies and equipment access',
            permissions: { lab: true },
            userCount: 1,
            createdAt: '2023-01-01'
          },
          {
            id: 'viewer',
            name: 'Viewer',
            description: 'Read-only access to inventory data',
            permissions: { view: true },
            userCount: 1,
            createdAt: '2023-01-01'
          }
        ];
        setRoles(dummyRoles);
        localStorage.setItem('systemRoles', JSON.stringify(dummyRoles));
      }

      if (savedRequests) {
        setAccessRequests(JSON.parse(savedRequests));
      } else {
        const dummyRequests = [
          {
            id: 1,
            userId: 8,
            userName: 'Amanda Wilson',
            currentRole: 'nurse',
            requestedRole: 'store_manager',
            reason: 'Promotion to department supervisor',
            status: 'pending',
            submittedDate: '2024-01-22',
            reviewedBy: null,
            reviewedDate: null
          },
          {
            id: 2,
            userId: 6,
            userName: 'Lisa Thompson',
            currentRole: 'lab_tech',
            requestedRole: 'pharmacist',
            reason: 'Cross-training for pharmacy backup',
            status: 'approved',
            submittedDate: '2024-01-20',
            reviewedBy: 'Sarah Chen',
            reviewedDate: '2024-01-21'
          },
          {
            id: 3,
            userId: 7,
            userName: 'David Miller',
            currentRole: 'viewer',
            requestedRole: 'nurse',
            reason: 'New nursing position',
            status: 'rejected',
            submittedDate: '2024-01-18',
            reviewedBy: 'Michael Rodriguez',
            reviewedDate: '2024-01-19'
          },
          {
            id: 4,
            userId: 4,
            userName: 'James Wilson',
            currentRole: 'nurse',
            requestedRole: 'pharmacist',
            reason: 'Additional pharmacy access for ER',
            status: 'pending',
            submittedDate: '2024-01-22',
            reviewedBy: null,
            reviewedDate: null
          }
        ];
        setAccessRequests(dummyRequests);
        localStorage.setItem('accessRequests', JSON.stringify(dummyRequests));
      }

      if (savedActivities) {
        setUserActivities(JSON.parse(savedActivities));
      } else {
        const dummyActivities = [
          {
            id: 1,
            userId: 1,
            userName: 'Sarah Chen',
            action: 'user_created',
            target: 'New user account',
            details: 'Created account for Amanda Wilson',
            timestamp: '2024-01-22 10:30:00',
            ipAddress: '192.168.1.100'
          },
          {
            id: 2,
            userId: 2,
            userName: 'Michael Rodriguez',
            action: 'inventory_adjustment',
            target: 'Surgical Gloves',
            details: 'Adjusted stock levels in Central Storage',
            timestamp: '2024-01-22 09:45:00',
            ipAddress: '192.168.1.105'
          },
          {
            id: 3,
            userId: 3,
            userName: 'Jennifer Lee',
            action: 'medication_dispensed',
            target: 'Epinephrine 1mg',
            details: 'Dispensed emergency medication in ER',
            timestamp: '2024-01-22 11:20:00',
            ipAddress: '192.168.1.108'
          },
          {
            id: 4,
            userId: 1,
            userName: 'Sarah Chen',
            action: 'role_updated',
            target: 'Lisa Thompson',
            details: 'Approved role change request',
            timestamp: '2024-01-21 14:15:00',
            ipAddress: '192.168.1.100'
          },
          {
            id: 5,
            userId: 5,
            userName: 'Robert Kim',
            action: 'equipment_issued',
            target: 'Patient Monitor',
            details: 'Issued equipment to ICU',
            timestamp: '2024-01-21 16:30:00',
            ipAddress: '192.168.1.112'
          }
        ];
        setUserActivities(dummyActivities);
        localStorage.setItem('userActivities', JSON.stringify(dummyActivities));
      }
      
      setLoaded(true);
    };

    loadData();
  }, []);

  const getRoleColor = (roleId) => {
    const role = roleDefinitions.find(r => r.id === roleId);
    return role ? role.color : '#757575';
  };

  const getRoleIcon = (roleId) => {
    switch (roleId) {
      case 'admin':
        return <AdminIcon />;
      case 'store_manager':
        return <InventoryIcon />;
      case 'pharmacist':
        return <HospitalIcon />;
      case 'nurse':
        return <HospitalIcon />;
      case 'physician':
        return <ScienceIcon />;
      case 'lab_tech':
        return <ScienceIcon />;
      default:
        return <PersonIcon />;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'active':
        return '#4caf50';
      case 'inactive':
        return '#f44336';
      case 'pending':
        return '#ff9800';
      default:
        return '#757575';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'active':
        return <CheckCircleIcon />;
      case 'inactive':
        return <ErrorIcon />;
      case 'pending':
        return <HourglassEmptyIcon />;
      default:
        return <WarningIcon />;
    }
  };

  const getRequestStatusColor = (status) => {
    switch (status) {
      case 'approved':
        return '#4caf50';
      case 'rejected':
        return '#f44336';
      case 'pending':
        return '#ff9800';
      default:
        return '#757575';
    }
  };

  const getRequestStatusIcon = (status) => {
    switch (status) {
      case 'approved':
        return <CheckCircleIcon />;
      case 'rejected':
        return <ErrorIcon />;
      case 'pending':
        return <PendingIcon />;
      default:
        return <WarningIcon />;
    }
  };

  const getDepartmentIcon = (deptId) => {
    const dept = departments.find(d => d.id === deptId);
    return dept ? dept.icon : HospitalIcon;
  };

  const getDepartmentColor = (deptId) => {
    const dept = departments.find(d => d.id === deptId);
    return dept ? dept.color : '#757575';
  };

  const handleOpenUserDialog = (user = null) => {
    setSelectedUser(user);
    setEditMode(!!user);
    setNewUserForm(user ? {
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      role: user.role,
      departments: user.departments,
      status: user.status,
      phone: user.phone
    } : {
      firstName: '',
      lastName: '',
      email: '',
      role: 'viewer',
      departments: [],
      status: 'active',
      phone: ''
    });
    setOpenUserDialog(true);
  };

  const handleCloseUserDialog = () => {
    setOpenUserDialog(false);
    setSelectedUser(null);
    setEditMode(false);
  };

  const handleOpenRoleDialog = () => {
    setOpenRoleDialog(true);
  };

  const handleCloseRoleDialog = () => {
    setOpenRoleDialog(false);
    setRoleForm({
      name: '',
      level: 'standard',
      permissions: {
        inventory: { view: true, edit: false, delete: false },
        pharmacy: { view: true, edit: false, delete: false },
        orders: { view: true, edit: false, delete: false },
        reports: { view: true, edit: false, delete: false },
        users: { view: false, edit: false, delete: false }
      }
    });
  };

  const handleOpenRequestDialog = () => {
    setOpenRequestDialog(true);
  };

  const handleCloseRequestDialog = () => {
    setOpenRequestDialog(false);
  };

  const handleToggleUserStatus = (userId, newStatus) => {
    const updatedUsers = users.map(user => 
      user.id === userId ? { ...user, status: newStatus } : user
    );
    setUsers(updatedUsers);
    localStorage.setItem('systemUsers', JSON.stringify(updatedUsers));
  };

  const handleSubmitUser = () => {
    if (newUserForm.firstName && newUserForm.lastName && newUserForm.email && newUserForm.role) {
      const roleDef = roleDefinitions.find(r => r.id === newUserForm.role);
      
      if (editMode && selectedUser) {
        // Update existing user
        const updatedUsers = users.map(user => 
          user.id === selectedUser.id ? {
            ...user,
            firstName: newUserForm.firstName,
            lastName: newUserForm.lastName,
            fullName: `${newUserForm.firstName} ${newUserForm.lastName}`,
            email: newUserForm.email,
            role: newUserForm.role,
            roleName: roleDef?.name || 'Viewer',
            departments: newUserForm.departments,
            status: newUserForm.status,
            phone: newUserForm.phone
          } : user
        );
        setUsers(updatedUsers);
        localStorage.setItem('systemUsers', JSON.stringify(updatedUsers));
      } else {
        // Add new user
        const newUser = {
          id: users.length + 1,
          firstName: newUserForm.firstName,
          lastName: newUserForm.lastName,
          fullName: `${newUserForm.firstName} ${newUserForm.lastName}`,
          email: newUserForm.email,
          role: newUserForm.role,
          roleName: roleDef?.name || 'Viewer',
          departments: newUserForm.departments,
          status: newUserForm.status,
          phone: newUserForm.phone,
          lastLogin: null,
          joinDate: new Date().toISOString().split('T')[0],
          avatarColor: getRoleColor(newUserForm.role),
          permissions: [],
          isSuperAdmin: false
        };
        
        const updatedUsers = [newUser, ...users];
        setUsers(updatedUsers);
        localStorage.setItem('systemUsers', JSON.stringify(updatedUsers));
      }
      
      handleCloseUserDialog();
    }
  };

  const handleApproveRequest = (requestId) => {
    const updatedRequests = accessRequests.map(request => {
      if (request.id === requestId) {
        return {
          ...request,
          status: 'approved',
          reviewedBy: 'Current User',
          reviewedDate: new Date().toISOString().split('T')[0]
        };
      }
      return request;
    });
    
    setAccessRequests(updatedRequests);
    localStorage.setItem('accessRequests', JSON.stringify(updatedRequests));
  };

  const handleRejectRequest = (requestId) => {
    const updatedRequests = accessRequests.map(request => {
      if (request.id === requestId) {
        return {
          ...request,
          status: 'rejected',
          reviewedBy: 'Current User',
          reviewedDate: new Date().toISOString().split('T')[0]
        };
      }
      return request;
    });
    
    setAccessRequests(updatedRequests);
    localStorage.setItem('accessRequests', JSON.stringify(updatedRequests));
  };

  const filteredUsers = users.filter(user => {
    if (filterRole !== 'all' && user.role !== filterRole) return false;
    if (filterStatus !== 'all' && user.status !== filterStatus) return false;
    if (filterDepartment !== 'all' && !user.departments.includes(filterDepartment)) return false;
    if (searchTerm && !user.fullName.toLowerCase().includes(searchTerm.toLowerCase()) && 
        !user.email.toLowerCase().includes(searchTerm.toLowerCase())) return false;
    return true;
  });

  const filteredRequests = accessRequests.filter(request => 
    filterStatus === 'all' || request.status === filterStatus
  );

  const filteredActivities = userActivities.filter(activity => 
    !searchTerm || activity.userName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    activity.action.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStats = () => {
    return {
      totalUsers: users.length,
      activeUsers: users.filter(u => u.status === 'active').length,
      pendingUsers: users.filter(u => u.status === 'pending').length,
      adminUsers: users.filter(u => u.role === 'admin').length,
      departmentsCovered: new Set(users.flatMap(u => u.departments)).size
    };
  };

  const stats = getStats();

  const UserCard = ({ user }) => {
    const lastLoginDate = user.lastLogin ? user.lastLogin.split(' ')[0] : 'Never';
    const lastLoginTime = user.lastLogin ? user.lastLogin.split(' ')[1] : '';
    
    return (
      <Grow in={loaded} timeout={300}>
        <Paper sx={{ 
          p: 3, 
          mb: 2,
          borderRadius: 2,
          boxShadow: `0 4px 12px ${alpha(getRoleColor(user.role), 0.1)}`,
          border: `1px solid ${alpha(getRoleColor(user.role), 0.2)}`,
          transition: 'transform 0.3s',
          '&:hover': {
            transform: 'translateY(-2px)',
            boxShadow: `0 6px 16px ${alpha(getRoleColor(user.role), 0.2)}`
          }
        }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 3 }}>
              <Box>
                <Avatar sx={{ 
                  width: 64, 
                  height: 64, 
                  fontSize: '1.5rem',
                  bgcolor: user.avatarColor,
                  color: 'white'
                }}>
                  {user.firstName[0]}{user.lastName[0]}
                </Avatar>
                {user.isSuperAdmin && (
                  <Tooltip title="Super Administrator">
                    <StarIcon sx={{ 
                      position: 'relative',
                      top: -10,
                      left: -10,
                      color: '#ffd700',
                      fontSize: '1.2rem',
                      bgcolor: 'white',
                      borderRadius: '50%'
                    }} />
                  </Tooltip>
                )}
              </Box>
              
              <Box sx={{ flex: 1 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 1 }}>
                  <Typography variant="h6" sx={{ fontWeight: 600 }}>
                    {user.fullName}
                  </Typography>
                  <Box sx={{ display: 'flex', gap: 1 }}>
                    <Chip 
                      icon={getStatusIcon(user.status)}
                      label={user.status.toUpperCase()}
                      size="small"
                      sx={{ 
                        bgcolor: alpha(getStatusColor(user.status), 0.1),
                        color: getStatusColor(user.status),
                        fontWeight: 500
                      }}
                    />
                    <Chip 
                      icon={getRoleIcon(user.role)}
                      label={user.roleName}
                      size="small"
                      sx={{ 
                        bgcolor: alpha(getRoleColor(user.role), 0.1),
                        color: getRoleColor(user.role),
                        fontWeight: 500
                      }}
                    />
                  </Box>
                </Box>
                
                <Box sx={{ mb: 2 }}>
                  <Typography variant="body2" color="text.secondary">
                    {user.email}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {user.phone}
                  </Typography>
                </Box>
                
                <Box sx={{ mb: 2 }}>
                  <Typography variant="caption" color="text.secondary" display="block" gutterBottom>
                    Assigned Departments
                  </Typography>
                  <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                    {user.departments.map(deptId => {
                      const dept = departments.find(d => d.id === deptId);
                      return (
                        <Chip 
                          key={deptId}
                          icon={dept ? <dept.icon /> : <HospitalIcon />}
                          label={dept?.name || deptId}
                          size="small"
                          sx={{ 
                            bgcolor: alpha(getDepartmentColor(deptId), 0.1),
                            color: getDepartmentColor(deptId)
                          }}
                        />
                      );
                    })}
                  </Box>
                </Box>
                
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                  <Box>
                    <Typography variant="caption" color="text.secondary" display="block">
                      Last Login
                    </Typography>
                    <Typography variant="body2" fontWeight={500}>
                      {lastLoginDate} {lastLoginTime && `• ${lastLoginTime}`}
                    </Typography>
                  </Box>
                  <Box>
                    <Typography variant="caption" color="text.secondary" display="block">
                      Joined
                    </Typography>
                    <Typography variant="body2" fontWeight={500}>
                      {user.joinDate}
                    </Typography>
                  </Box>
                </Box>
              </Box>
            </Box>
            
            <Box sx={{ 
              display: 'flex', 
              flexDirection: 'column', 
              gap: 1,
              minWidth: 120
            }}>
              <Button
                size="small"
                variant="outlined"
                startIcon={<VisibilityIcon />}
                onClick={() => handleOpenUserDialog(user)}
                sx={{ borderRadius: 1.5, textTransform: 'none' }}
              >
                View Details
              </Button>
              <Button
                size="small"
                variant="outlined"
                startIcon={<EditIcon />}
                onClick={() => handleOpenUserDialog(user)}
                sx={{ borderRadius: 1.5, textTransform: 'none' }}
              >
                Edit User
              </Button>
              <Button
                size="small"
                variant="outlined"
                startIcon={<HistoryIcon />}
                sx={{ borderRadius: 1.5, textTransform: 'none' }}
              >
                Activity Log
              </Button>
              {user.status === 'active' ? (
                <Button
                  size="small"
                  variant="outlined"
                  color="error"
                  startIcon={<LockIcon />}
                  onClick={() => handleToggleUserStatus(user.id, 'inactive')}
                  sx={{ borderRadius: 1.5, textTransform: 'none' }}
                >
                  Deactivate
                </Button>
              ) : (
                <Button
                  size="small"
                  variant="outlined"
                  color="success"
                  startIcon={<LockOpenIcon />}
                  onClick={() => handleToggleUserStatus(user.id, 'active')}
                  sx={{ borderRadius: 1.5, textTransform: 'none' }}
                >
                  Activate
                </Button>
              )}
            </Box>
          </Box>
        </Paper>
      </Grow>
    );
  };

const StatCard = ({ title, value, color, icon: Icon, subtitle, delay = 0 }) => {
  // ✅ derive gradient safely from color
  const gradient = `linear-gradient(135deg, ${alpha(color, 0.9)} 0%, ${color} 100%)`;

  return (
    <Grow in={loaded} timeout={500 + delay}>
      <Card
        sx={{
          background: gradient,
          color: 'black',
          borderRadius: 3,
          transition: 'all 0.3s ease',
          '&:hover': {
            transform: 'translateY(-4px)',
            boxShadow: `0 12px 24px ${alpha(color, 0.35)}`
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
        </CardContent>
      </Card>
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
                  <SecurityIcon fontSize="large" />
                  User & Role Management
                </Typography>
                <Typography variant="body1" color="text.secondary">
                  Admin interface for managing system access and permissions
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
                  startIcon={<PersonAddIcon />}
                  onClick={() => handleOpenUserDialog()}
                  sx={{ 
                    borderRadius: 2,
                    textTransform: 'none',
                    fontWeight: 600,
                    px: 3
                  }}
                >
                  Add New User
                </Button>
                <Button
                  variant="outlined"
                  startIcon={<AssignmentIcon />}
                  onClick={handleOpenRoleDialog}
                  sx={{ 
                    borderRadius: 2,
                    textTransform: 'none'
                  }}
                >
                  Manage Roles
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
                  placeholder="Search users by name or email..."
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
                    label="Role"
                    value={filterRole}
                    onChange={(e) => setFilterRole(e.target.value)}
                    sx={{ minWidth: 140 }}
                  >
                    <MenuItem value="all">All Roles</MenuItem>
                    {roleDefinitions.map(role => (
                      <MenuItem key={role.id} value={role.id}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                          {getRoleIcon(role.id)}
                          {role.name}
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
                    <MenuItem value="active">Active</MenuItem>
                    <MenuItem value="inactive">Inactive</MenuItem>
                    <MenuItem value="pending">Pending</MenuItem>
                  </TextField>
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
                </Box>
              </Box>
            </Paper>
          </Box>
        </Slide>

        {/* Stats Cards */}
        <Box sx={{ 
          display: 'flex', 
          flexDirection: isMobile ? 'column' : 'row', 
          gap: 2, 
          mb: 4,
          flexWrap: 'wrap'
        }}>
          <StatCard
            title="Total Users"
            value={stats.totalUsers}
            color="#2196f3"
            icon={PeopleIcon}
            subtitle="Registered in system"
          />
          <StatCard
            title="Active Users"
            value={stats.activeUsers}
            color="#4caf50"
            icon={CheckCircleIcon}
            subtitle={`${Math.round((stats.activeUsers / stats.totalUsers) * 100)}% of total`}
          />
          <StatCard
            title="Pending Access"
            value={stats.pendingUsers}
            color="#ff9800"
            icon={HourglassEmptyIcon}
            subtitle="Awaiting approval"
          />
          <StatCard
            title="Admin Users"
            value={stats.adminUsers}
            color="#f44336"
            icon={AdminIcon}
            subtitle="High privilege access"
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
                icon={<Badge badgeContent={stats.totalUsers} color="primary" />}
                iconPosition="start"
                label="User Directory" 
              />
              <Tab 
                icon={<Badge badgeContent={filteredRequests.filter(r => r.status === 'pending').length} color="warning" />}
                iconPosition="start"
                label="Access Requests" 
              />
              <Tab 
                icon={<Badge badgeContent={roles.length} color="info" />}
                iconPosition="start"
                label="Role Management" 
              />
              <Tab 
                icon={<HistoryIcon />}
                label="User Activity Log" 
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
                    User Directory
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {filteredUsers.length} users found • {filteredUsers.filter(u => u.status === 'active').length} currently active
                  </Typography>
                </Box>

                {filteredUsers.length > 0 ? (
                  <Box>
                    {filteredUsers.map((user) => (
                      <UserCard key={user.id} user={user} />
                    ))}
                  </Box>
                ) : (
                  <Paper sx={{ 
                    p: 8, 
                    textAlign: 'center',
                    borderRadius: 2,
                    bgcolor: alpha(theme.palette.primary.main, 0.02)
                  }}>
                    <PeopleIcon sx={{ fontSize: 64, color: 'text.disabled', mb: 2 }} />
                    <Typography variant="h6" color="text.secondary" gutterBottom>
                      No users found
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
                        Access Requests
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        Manage role change and access requests from users
                      </Typography>
                    </Box>
                    <Button
                      variant="contained"
                      startIcon={<PersonAddIcon />}
                      onClick={handleOpenRequestDialog}
                      sx={{ borderRadius: 2 }}
                    >
                      New Request
                    </Button>
                  </Box>

                  {filteredRequests.filter(r => r.status === 'pending').length > 0 && (
                    <Alert 
                      severity="warning" 
                      icon={<NotificationIcon />}
                      sx={{ 
                        mb: 2,
                        borderRadius: 2
                      }}
                    >
                      <Typography variant="body2">
                        {filteredRequests.filter(r => r.status === 'pending').length} pending requests require review
                      </Typography>
                    </Alert>
                  )}
                </Box>

                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                  {filteredRequests.map((request, index) => (
                    <Grow in={true} timeout={400} key={request.id} style={{ transitionDelay: `${index * 100}ms` }}>
                      <Paper sx={{ 
                        p: 3, 
                        borderRadius: 2,
                        borderLeft: `4px solid ${getRequestStatusColor(request.status)}`,
                        boxShadow: '0 4px 12px rgba(0,0,0,0.05)'
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
                                bgcolor: alpha(getRequestStatusColor(request.status), 0.1),
                                color: getRequestStatusColor(request.status)
                              }}>
                                {getRequestStatusIcon(request.status)}
                              </Avatar>
                              <Box>
                                <Typography variant="h6" sx={{ fontWeight: 600 }}>
                                  {request.userName}
                                </Typography>
                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, flexWrap: 'wrap' }}>
                                  <Chip 
                                    icon={<ArrowForwardIcon />}
                                    label={`${request.currentRole.toUpperCase()} → ${request.requestedRole.toUpperCase()}`}
                                    size="small"
                                    sx={{ 
                                      bgcolor: alpha('#2196f3', 0.1),
                                      color: '#2196f3'
                                    }}
                                  />
                                  <Chip 
                                    icon={getRequestStatusIcon(request.status)}
                                    label={request.status.toUpperCase()}
                                    size="small"
                                    sx={{ 
                                      bgcolor: alpha(getRequestStatusColor(request.status), 0.1),
                                      color: getRequestStatusColor(request.status)
                                    }}
                                  />
                                </Box>
                              </Box>
                            </Box>

                            <Box sx={{ mb: 2 }}>
                              <Typography variant="caption" color="text.secondary" display="block" gutterBottom>
                                Reason for Request
                              </Typography>
                              <Typography variant="body2">
                                {request.reason}
                              </Typography>
                            </Box>

                            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2 }}>
                              <Box>
                                <Typography variant="caption" color="text.secondary" display="block">
                                  Submitted Date
                                </Typography>
                                <Typography variant="body2" fontWeight={500}>
                                  {request.submittedDate}
                                </Typography>
                              </Box>
                              {request.reviewedBy && (
                                <Box>
                                  <Typography variant="caption" color="text.secondary" display="block">
                                    Reviewed By
                                  </Typography>
                                  <Typography variant="body2" fontWeight={500}>
                                    {request.reviewedBy}
                                  </Typography>
                                </Box>
                              )}
                              {request.reviewedDate && (
                                <Box>
                                  <Typography variant="caption" color="text.secondary" display="block">
                                    Review Date
                                  </Typography>
                                  <Typography variant="body2" fontWeight={500}>
                                    {request.reviewedDate}
                                  </Typography>
                                </Box>
                              )}
                            </Box>
                          </Box>

                          {request.status === 'pending' && (
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
                                startIcon={<CheckCircleIcon />}
                                onClick={() => handleApproveRequest(request.id)}
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
                                startIcon={<ErrorIcon />}
                                onClick={() => handleRejectRequest(request.id)}
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

                {filteredRequests.length === 0 && (
                  <Paper sx={{ 
                    p: 8, 
                    mt: 2,
                    textAlign: 'center',
                    borderRadius: 2,
                    bgcolor: alpha(theme.palette.primary.main, 0.02)
                  }}>
                    <AssignmentIcon sx={{ fontSize: 64, color: 'text.disabled', mb: 2 }} />
                    <Typography variant="h6" color="text.secondary" gutterBottom>
                      No access requests found
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      All requests have been processed
                    </Typography>
                  </Paper>
                )}
              </Box>
            )}

            {activeTab === 2 && (
              <Box>
                <Box sx={{ mb: 3 }}>
                  <Typography variant="h6" gutterBottom>
                    Role & Permission Management
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Define access levels and permissions for different user roles
                  </Typography>
                </Box>

                <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: 3, mb: 4 }}>
                  {roles.map((role, index) => (
                    <Grow in={true} timeout={500} key={role.id} style={{ transitionDelay: `${index * 100}ms` }}>
                      <Card sx={{ 
                        borderRadius: 2,
                        boxShadow: `0 4px 12px ${alpha(getRoleColor(role.id), 0.1)}`,
                        borderLeft: `4px solid ${getRoleColor(role.id)}`,
                        transition: 'transform 0.3s',
                        '&:hover': {
                          transform: 'translateY(-4px)',
                          boxShadow: `0 8px 24px ${alpha(getRoleColor(role.id), 0.2)}`
                        }
                      }}>
                        <CardContent>
                          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
                            <Box>
                              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                                <Avatar sx={{ 
                                  bgcolor: alpha(getRoleColor(role.id), 0.1),
                                  color: getRoleColor(role.id)
                                }}>
                                  {getRoleIcon(role.id)}
                                </Avatar>
                                <Typography variant="h6" sx={{ fontWeight: 600 }}>
                                  {role.name}
                                </Typography>
                              </Box>
                              <Typography variant="body2" color="text.secondary" paragraph>
                                {role.description}
                              </Typography>
                            </Box>
                          </Box>

                          <Box sx={{ mb: 2 }}>
                            <Typography variant="caption" color="text.secondary" display="block" gutterBottom>
                              Assigned Users
                            </Typography>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                              <PeopleIcon fontSize="small" color="action" />
                              <Typography variant="body1" fontWeight={600}>
                                {role.userCount} users
                              </Typography>
                            </Box>
                          </Box>

                          <Box sx={{ mb: 2 }}>
                            <Typography variant="caption" color="text.secondary" display="block" gutterBottom>
                              Key Permissions
                            </Typography>
                            <Box sx={{ display: 'flex', gap: 0.5, flexWrap: 'wrap' }}>
                              {Object.entries(role.permissions).map(([key, value]) => (
                                value && (
                                  <Chip 
                                    key={key}
                                    label={key.charAt(0).toUpperCase() + key.slice(1)}
                                    size="small"
                                    sx={{ 
                                      bgcolor: alpha(getRoleColor(role.id), 0.1),
                                      color: getRoleColor(role.id),
                                      fontSize: '0.7rem'
                                    }}
                                  />
                                )
                              ))}
                            </Box>
                          </Box>

                          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <Typography variant="caption" color="text.secondary">
                              Created: {role.createdAt}
                            </Typography>
                            <Button
                              size="small"
                              variant="outlined"
                              startIcon={<EditIcon />}
                              onClick={handleOpenRoleDialog}
                              sx={{ borderRadius: 1.5, textTransform: 'none' }}
                            >
                              Edit Role
                            </Button>
                          </Box>
                        </CardContent>
                      </Card>
                    </Grow>
                  ))}
                </Box>

                <Alert 
                  severity="info" 
                  icon={<SecurityIcon />}
                  sx={{ borderRadius: 2 }}
                >
                  <Typography variant="body2">
                    Role-based access control ensures users only have access to the features 
                    and data necessary for their job functions, following the principle of least privilege.
                  </Typography>
                </Alert>
              </Box>
            )}

            {activeTab === 3 && (
              <Box>
                <Box sx={{ mb: 3 }}>
                  <Typography variant="h6" gutterBottom>
                    User Activity Log
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Track system actions and events by user
                  </Typography>
                </Box>

                <TableContainer component={Paper} sx={{ borderRadius: 2 }}>
                  <Table>
                    <TableHead sx={{ bgcolor: alpha('#607d8b', 0.05) }}>
                      <TableRow>
                        <TableCell sx={{ fontWeight: 600 }}>User</TableCell>
                        <TableCell sx={{ fontWeight: 600 }}>Action</TableCell>
                        <TableCell sx={{ fontWeight: 600 }}>Target</TableCell>
                        <TableCell sx={{ fontWeight: 600 }}>Details</TableCell>
                        <TableCell sx={{ fontWeight: 600 }}>Timestamp</TableCell>
                        <TableCell sx={{ fontWeight: 600 }}>IP Address</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {filteredActivities.map((activity, index) => (
                        <Grow in={true} timeout={300} key={activity.id} style={{ transitionDelay: `${index * 50}ms` }}>
                          <TableRow
                            sx={{
                              '&:hover': { 
                                backgroundColor: alpha('#607d8b', 0.04),
                                transition: 'background-color 0.3s'
                              }
                            }}
                          >
                            <TableCell>
                              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                <Avatar sx={{ width: 32, height: 32, fontSize: '0.875rem' }}>
                                  {activity.userName.split(' ').map(n => n[0]).join('')}
                                </Avatar>
                                <Typography variant="body2" fontWeight={500}>
                                  {activity.userName}
                                </Typography>
                              </Box>
                            </TableCell>
                            <TableCell>
                              <Chip 
                                label={activity.action.replace('_', ' ')}
                                size="small"
                                sx={{ 
                                  bgcolor: alpha('#2196f3', 0.1),
                                  color: '#2196f3',
                                  fontWeight: 500,
                                  textTransform: 'capitalize'
                                }}
                              />
                            </TableCell>
                            <TableCell>
                              <Typography variant="body2">
                                {activity.target}
                              </Typography>
                            </TableCell>
                            <TableCell>
                              <Typography variant="body2" color="text.secondary">
                                {activity.details}
                              </Typography>
                            </TableCell>
                            <TableCell>
                              <Typography variant="body2">
                                {activity.timestamp.split(' ')[0]}
                              </Typography>
                              <Typography variant="caption" color="text.secondary">
                                {activity.timestamp.split(' ')[1]}
                              </Typography>
                            </TableCell>
                            <TableCell>
                              <Typography variant="body2" color="text.secondary">
                                {activity.ipAddress}
                              </Typography>
                            </TableCell>
                          </TableRow>
                        </Grow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </Box>
            )}
          </Box>
        </Grow>

        {/* AI Security Insights */}
        <Grow in={loaded} timeout={800}>
          <Paper sx={{ 
            p: 3, 
            mt: 4, 
            borderRadius: 2,
            bgcolor: alpha('#f44336', 0.05),
            border: `1px solid ${alpha('#f44336', 0.2)}`
          }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <Box>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                  <SecurityIcon color="error" />
                  <Typography variant="h6" sx={{ fontWeight: 600 }}>
                    AI Security Insights
                  </Typography>
                </Box>
                <Typography variant="body2" paragraph>
                  {stats.pendingUsers > 0 ? 
                    `⚠️ **Access Control Alert**: ${stats.pendingUsers} pending user accounts require review. Ensure proper vetting before granting system access. Regular review of admin privileges recommended.` :
                    '✅ **Security Status Optimal**: All user accounts properly configured and reviewed. Continue regular access audits and role reviews.'
                  }
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Next security audit: February 15, 2024 • Last privilege review: 7 days ago
                </Typography>
              </Box>
              <Box sx={{ textAlign: 'right' }}>
                <Chip 
                  label="98% Secure" 
                  color="error" 
                  sx={{ fontWeight: 600, mb: 1 }}
                />
                <Typography variant="caption" color="text.secondary" display="block">
                  Security Score
                </Typography>
              </Box>
            </Box>
          </Paper>
        </Grow>

        {/* User Dialog */}
        <Dialog 
          open={openUserDialog} 
          onClose={handleCloseUserDialog}
          maxWidth="md"
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
                {editMode ? <EditIcon /> : <PersonAddIcon />}
              </Avatar>
              <Box>
                <Typography variant="h6" sx={{ fontWeight: 600 }}>
                  {editMode ? 'Edit User' : 'Add New User'}
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  {editMode ? 'Update user information and permissions' : 'Create a new system user account'}
                </Typography>
              </Box>
            </Box>
          </DialogTitle>
          <DialogContent sx={{ pt: 3 }}>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              <Box sx={{ display: 'flex', gap: 2, flexDirection: isMobile ? 'column' : 'row' }}>
                <TextField
                  fullWidth
                  label="First Name"
                  value={newUserForm.firstName}
                  onChange={(e) => setNewUserForm({...newUserForm, firstName: e.target.value})}
                  required
                />
                <TextField
                  fullWidth
                  label="Last Name"
                  value={newUserForm.lastName}
                  onChange={(e) => setNewUserForm({...newUserForm, lastName: e.target.value})}
                  required
                />
              </Box>

              <TextField
                fullWidth
                label="Email Address"
                type="email"
                value={newUserForm.email}
                onChange={(e) => setNewUserForm({...newUserForm, email: e.target.value})}
                required
              />

              <TextField
                fullWidth
                label="Phone Number"
                value={newUserForm.phone}
                onChange={(e) => setNewUserForm({...newUserForm, phone: e.target.value})}
              />

              <TextField
                select
                fullWidth
                label="Role"
                value={newUserForm.role}
                onChange={(e) => setNewUserForm({...newUserForm, role: e.target.value})}
                required
              >
                {roleDefinitions.map(role => (
                  <MenuItem key={role.id} value={role.id}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      {getRoleIcon(role.id)}
                      {role.name}
                    </Box>
                  </MenuItem>
                ))}
              </TextField>

              <FormControl fullWidth>
                <InputLabel>Departments</InputLabel>
                <Select
                  multiple
                  value={newUserForm.departments}
                  onChange={(e) => setNewUserForm({...newUserForm, departments: e.target.value})}
                  label="Departments"
                  renderValue={(selected) => (
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                      {selected.map((deptId) => {
                        const dept = departments.find(d => d.id === deptId);
                        return (
                          <Chip 
                            key={deptId}
                            label={dept?.name || deptId}
                            size="small"
                            sx={{ 
                              bgcolor: alpha(getDepartmentColor(deptId), 0.1),
                              color: getDepartmentColor(deptId)
                            }}
                          />
                        );
                      })}
                    </Box>
                  )}
                >
                  {departments.map((dept) => (
                    <MenuItem key={dept.id} value={dept.id}>
                      <Checkbox checked={newUserForm.departments.includes(dept.id)} />
                      <ListItemText primary={dept.name} />
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>

              <TextField
                select
                fullWidth
                label="Status"
                value={newUserForm.status}
                onChange={(e) => setNewUserForm({...newUserForm, status: e.target.value})}
              >
                <MenuItem value="active">Active</MenuItem>
                <MenuItem value="inactive">Inactive</MenuItem>
                <MenuItem value="pending">Pending</MenuItem>
              </TextField>

              {editMode && (
                <Box>
                  <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                    Password Management
                  </Typography>
                  <Button
                    variant="outlined"
                    startIcon={<LockIcon />}
                    sx={{ mr: 1 }}
                  >
                    Reset Password
                  </Button>
                  <Button
                    variant="outlined"
                    startIcon={<HistoryIcon />}
                  >
                    Login History
                  </Button>
                </Box>
              )}
            </Box>
          </DialogContent>
          <DialogActions sx={{ p: 2, borderTop: `1px solid ${theme.palette.divider}` }}>
            <Button onClick={handleCloseUserDialog}>
              Cancel
            </Button>
            <Button 
              variant="contained" 
              onClick={handleSubmitUser}
              disabled={!newUserForm.firstName || !newUserForm.lastName || !newUserForm.email || !newUserForm.role}
              sx={{ 
                borderRadius: 1.5,
                px: 3,
                fontWeight: 600
              }}
            >
              {editMode ? 'Update User' : 'Create User'}
            </Button>
          </DialogActions>
        </Dialog>

        {/* Role Dialog */}
        <Dialog 
          open={openRoleDialog} 
          onClose={handleCloseRoleDialog}
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
                <SecurityIcon />
              </Avatar>
              <Typography variant="h6" sx={{ fontWeight: 600 }}>
                Role & Permission Management
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
                Manage system roles and their permissions across different modules.
                Define access levels to ensure proper security and compliance.
              </Typography>
              <Alert severity="info">
                Full role management functionality will be available in the next update.
              </Alert>
            </Paper>
          </DialogContent>
          <DialogActions sx={{ p: 2, borderTop: `1px solid ${theme.palette.divider}` }}>
            <Button onClick={handleCloseRoleDialog}>
              Close
            </Button>
          </DialogActions>
        </Dialog>

        {/* Request Dialog */}
        <Dialog 
          open={openRequestDialog} 
          onClose={handleCloseRequestDialog}
          maxWidth="sm"
          fullWidth
          PaperProps={{
            sx: { borderRadius: 2 }
          }}
        >
          <DialogTitle>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <AssignmentIcon color="primary" />
              <Typography variant="h6" sx={{ fontWeight: 600 }}>
                New Access Request
              </Typography>
            </Box>
          </DialogTitle>
          <DialogContent sx={{ pt: 3 }}>
            <Paper sx={{ 
              p: 3, 
              mb: 3,
              borderRadius: 2,
              bgcolor: alpha('#2196f3', 0.03)
            }}>
              <Typography variant="body2" color="text.secondary" paragraph>
                Submit access or role change requests for approval.
                Requests will be reviewed by system administrators.
              </Typography>
              <Alert severity="info">
                Access request functionality will be available in the next update.
              </Alert>
            </Paper>
          </DialogContent>
          <DialogActions sx={{ p: 2, borderTop: `1px solid ${theme.palette.divider}` }}>
            <Button onClick={handleCloseRequestDialog}>
              Close
            </Button>
          </DialogActions>
        </Dialog>
      </Box>
    </Fade>
  );
};

export default UserRoleManagement;