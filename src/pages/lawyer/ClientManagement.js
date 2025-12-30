// src/components/lawyer/ClientManagement.js
import React, { useState } from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Button,
  Grid,
  Avatar,
  Chip,
  IconButton,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Tab,
  Tabs,
  Menu,
  MenuItem,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  ListItemSecondaryAction,
  Divider,
  Paper,
  Fade,
  Grow,
  Slide,
  Zoom,
  alpha,
  useTheme,
  InputAdornment,
  Badge,
  Tooltip,
  CircularProgress,
  LinearProgress,
  FormControl,
  InputLabel,
  Select
} from '@mui/material';
import {
  Add as AddIcon,
  Edit as EditIcon,
  Email as EmailIcon,
  Phone as PhoneIcon,
  Business as BusinessIcon,
  MoreVert as MoreIcon,
  Search as SearchIcon,
  FilterList as FilterIcon,
  CalendarToday as CalendarIcon,
  Assignment as CaseIcon,
  Payment as PaymentIcon,
  Star as StarIcon,
  StarBorder as StarBorderIcon,
  LocationOn as LocationIcon,
  Language as LanguageIcon,
  Note as NoteIcon,
  Timeline as TimelineIcon,
  AttachMoney as MoneyIcon,
  Warning as WarningIcon,
  CheckCircle as CheckIcon,
  Cancel as CancelIcon,
  Archive as ArchiveIcon,
  RestoreFromTrash as RestoreIcon,
  Delete as DeleteIcon,
  Share as ShareIcon,
  Download as DownloadIcon,
  Print as PrintIcon,
  AutoAwesome as AutoAwesomeIcon
} from '@mui/icons-material';

const AnimatedCard = ({ children, delay = 0, ...props }) => (
  <Grow in={true} timeout={800} style={{ transitionDelay: `${delay}ms` }}>
    <Card {...props}>
      {children}
    </Card>
  </Grow>
);

const ClientManagement = () => {
  const theme = useTheme();
  const [clients, setClients] = useState([
    {
      id: 1,
      name: 'Medical Clinic LLC',
      contact: 'Dr. Sarah Johnson',
      email: 's.johnson@medicalclinic.com',
      phone: '+1 (555) 123-4567',
      type: 'Healthcare',
      status: 'active',
      cases: 3,
      revenue: 12500,
      lastContact: '2024-01-15',
      joinDate: '2023-08-12',
      priority: 'high',
      notes: 'Specializes in telemedicine partnerships. Very responsive to communications.',
      address: '123 Medical Plaza, Suite 500, New York, NY 10001',
      website: 'www.medicalclinic.com',
      favorite: true,
      documents: 12
    },
    {
      id: 2,
      name: 'Retail Corp',
      contact: 'Michael Chen',
      email: 'm.chen@retailcorp.com',
      phone: '+1 (555) 987-6543',
      type: 'Retail',
      status: 'active',
      cases: 2,
      revenue: 8400,
      lastContact: '2024-01-10',
      joinDate: '2023-11-05',
      priority: 'medium',
      notes: 'Expanding to new locations. Needs lease agreement templates.',
      address: '456 Commerce Street, Chicago, IL 60601',
      website: 'www.retailcorp.com',
      favorite: false,
      documents: 8
    },
    {
      id: 3,
      name: 'Tech Startup Inc',
      contact: 'Alex Rodriguez',
      email: 'alex@techstartup.com',
      phone: '+1 (555) 456-7890',
      type: 'Technology',
      status: 'active',
      cases: 5,
      revenue: 21800,
      lastContact: '2024-01-14',
      joinDate: '2023-09-20',
      priority: 'high',
      notes: 'Series A funding completed. Multiple patent applications in progress.',
      address: '789 Innovation Drive, San Francisco, CA 94105',
      website: 'www.techstartup.com',
      favorite: true,
      documents: 15
    },
    {
      id: 4,
      name: 'Manufacturing Co',
      contact: 'Lisa Thompson',
      email: 'lisa@manufacturingco.com',
      phone: '+1 (555) 234-5678',
      type: 'Industrial',
      status: 'inactive',
      cases: 0,
      revenue: 0,
      lastContact: '2023-12-20',
      joinDate: '2023-10-15',
      priority: 'low',
      notes: 'Project completed. No current legal needs.',
      address: '321 Industrial Way, Detroit, MI 48201',
      website: 'www.manufacturingco.com',
      favorite: false,
      documents: 3
    }
  ]);

  const [openDialog, setOpenDialog] = useState(false);
  const [openDetailDialog, setOpenDetailDialog] = useState(false);
  const [selectedTab, setSelectedTab] = useState(0);
  const [selectedClient, setSelectedClient] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [menuAnchor, setMenuAnchor] = useState(null);
  const [selectedMenuClient, setSelectedMenuClient] = useState(null);
  const [newClient, setNewClient] = useState({
    name: '',
    contact: '',
    email: '',
    phone: '',
    type: '',
    address: '',
    website: '',
    notes: ''
  });

  const clientTypes = ['Healthcare', 'Retail', 'Technology', 'Industrial', 'Financial', 'Real Estate', 'Education', 'Other'];
  const priorityLevels = ['low', 'medium', 'high'];

  const handleAddClient = () => {
    const newClientObj = {
      id: clients.length + 1,
      ...newClient,
      status: 'active',
      cases: 0,
      revenue: 0,
      lastContact: new Date().toISOString().split('T')[0],
      joinDate: new Date().toISOString().split('T')[0],
      priority: 'medium',
      favorite: false,
      documents: 0
    };
    
    setClients(prev => [...prev, newClientObj]);
    setOpenDialog(false);
    setNewClient({ name: '', contact: '', email: '', phone: '', type: '', address: '', website: '', notes: '' });
  };

  const handleToggleFavorite = (clientId) => {
    setClients(prev => prev.map(client =>
      client.id === clientId ? { ...client, favorite: !client.favorite } : client
    ));
  };

  const handleMenuOpen = (event, client) => {
    setMenuAnchor(event.currentTarget);
    setSelectedMenuClient(client);
  };

  const handleMenuClose = () => {
    setMenuAnchor(null);
    setSelectedMenuClient(null);
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return 'error';
      case 'medium': return 'warning';
      case 'low': return 'success';
      default: return 'default';
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'active': return 'success';
      case 'inactive': return 'default';
      case 'pending': return 'warning';
      default: return 'default';
    }
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  };

  const filteredClients = clients.filter(client => {
    const matchesSearch = client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         client.contact.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         client.email.toLowerCase().includes(searchTerm.toLowerCase());
    
    switch (selectedTab) {
      case 0: return matchesSearch; // All
      case 1: return matchesSearch && client.status === 'active'; // Active
      case 2: return matchesSearch && client.favorite; // Favorites
      case 3: return matchesSearch && client.status === 'inactive'; // Archived
      default: return matchesSearch;
    }
  });

  const stats = {
    total: clients.length,
    active: clients.filter(c => c.status === 'active').length,
    revenue: clients.reduce((sum, client) => sum + client.revenue, 0),
    cases: clients.reduce((sum, client) => sum + client.cases, 0)
  };

  const ClientCard = ({ client, index }) => (
    <AnimatedCard 
      delay={index * 100}
      sx={{ 
        height: '100%',
        background: `linear-gradient(135deg, ${alpha(theme.palette.background.paper, 0.9)} 0%, ${alpha(theme.palette.background.default, 0.7)} 100%)`,
        backdropFilter: 'blur(10px)',
        border: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
        transition: 'all 0.3s ease-in-out',
        cursor: 'pointer',
        '&:hover': {
          transform: 'translateY(-8px)',
          boxShadow: `0 16px 40px ${alpha(theme.palette.primary.main, 0.15)}`,
          borderColor: alpha(theme.palette.primary.main, 0.3)
        }
      }}
      onClick={() => {
        setSelectedClient(client);
        setOpenDetailDialog(true);
      }}
    >
      <CardContent>
        {/* Header */}
        <Box display="flex" justifyContent="space-between" alignItems="flex-start" mb={2}>
          <Box display="flex" alignItems="flex-start" flex={1}>
            <Badge
              overlap="circular"
              anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
              badgeContent={
                <Tooltip title={client.favorite ? "Remove from favorites" : "Add to favorites"}>
                  <IconButton 
                    size="small" 
                    onClick={(e) => {
                      e.stopPropagation();
                      handleToggleFavorite(client.id);
                    }}
                    sx={{ 
                      backgroundColor: 'background.paper',
                      '&:hover': { backgroundColor: 'background.default' }
                    }}
                  >
                    {client.favorite ? (
                      <StarIcon sx={{ color: 'warning.main', fontSize: 16 }} />
                    ) : (
                      <StarBorderIcon sx={{ fontSize: 16 }} />
                    )}
                  </IconButton>
                </Tooltip>
              }
            >
              <Avatar 
                sx={{ 
                  bgcolor: theme.palette.primary.main, 
                  width: 56, 
                  height: 56,
                  fontSize: '1.5rem',
                  fontWeight: 600
                }}
              >
                {client.name.charAt(0)}
              </Avatar>
            </Badge>
            <Box ml={2} flex={1}>
              <Typography variant="h6" gutterBottom sx={{ 
                fontWeight: 600,
                background: `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                color: 'transparent'
              }}>
                {client.name}
              </Typography>
              <Typography variant="body2" color="textSecondary" gutterBottom>
                {client.contact}
              </Typography>
            </Box>
          </Box>
          <Box display="flex" flexDirection="column" alignItems="flex-end" gap={0.5}>
            <Chip 
              label={client.status} 
              color={getStatusColor(client.status)}
              size="small"
              sx={{ fontWeight: 600 }}
            />
            <Chip 
              label={client.priority} 
              color={getPriorityColor(client.priority)}
              size="small"
              variant="outlined"
            />
          </Box>
        </Box>

        {/* Contact Info */}
        <Box sx={{ mb: 2 }}>
          <Box display="flex" alignItems="center" mb={1}>
            <EmailIcon sx={{ fontSize: 16, mr: 1, color: 'primary.main' }} />
            <Typography variant="body2" noWrap>{client.email}</Typography>
          </Box>
          <Box display="flex" alignItems="center" mb={1}>
            <PhoneIcon sx={{ fontSize: 16, mr: 1, color: 'primary.main' }} />
            <Typography variant="body2">{client.phone}</Typography>
          </Box>
          <Box display="flex" alignItems="center">
            <BusinessIcon sx={{ fontSize: 16, mr: 1, color: 'primary.main' }} />
            <Typography variant="body2">{client.type}</Typography>
          </Box>
        </Box>

        {/* Stats */}
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
          <Tooltip title="Active Cases">
            <Box textAlign="center">
              <Typography variant="h6" color="primary" fontWeight={700}>
                {client.cases}
              </Typography>
              <Typography variant="caption" color="textSecondary">
                Cases
              </Typography>
            </Box>
          </Tooltip>
          <Tooltip title="Total Revenue">
            <Box textAlign="center">
              <Typography variant="h6" color="success.main" fontWeight={700}>
                {formatCurrency(client.revenue)}
              </Typography>
              <Typography variant="caption" color="textSecondary">
                Revenue
              </Typography>
            </Box>
          </Tooltip>
          <Tooltip title="Documents">
            <Box textAlign="center">
              <Typography variant="h6" color="info.main" fontWeight={700}>
                {client.documents}
              </Typography>
              <Typography variant="caption" color="textSecondary">
                Docs
              </Typography>
            </Box>
          </Tooltip>
        </Box>

        {/* Last Contact */}
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Box display="flex" alignItems="center">
            <CalendarIcon sx={{ fontSize: 14, mr: 0.5, color: 'text.secondary' }} />
            <Typography variant="caption" color="textSecondary">
              Last contact: {new Date(client.lastContact).toLocaleDateString()}
            </Typography>
          </Box>
          <Tooltip title="More actions">
            <IconButton 
              size="small" 
              onClick={(e) => {
                e.stopPropagation();
                handleMenuOpen(e, client);
              }}
              sx={{ 
                color: 'text.secondary',
                '&:hover': { 
                  color: 'primary.main',
                  transform: 'scale(1.1)'
                }
              }}
            >
              <MoreIcon />
            </IconButton>
          </Tooltip>
        </Box>
      </CardContent>
    </AnimatedCard>
  );

  const EnhancedStatCard = ({ title, value, subtitle, icon, color, delay, progress }) => {
    const [isHovered, setIsHovered] = useState(false);
    const theme = useTheme();
  
    // gradient background based on color
    const gradient =
      color === "primary"
        ? "linear-gradient(135deg, #667eea 0%, #764ba2 100%)"
        : color === "success"
        ? "linear-gradient(135deg, #66bb6a 0%, #81c784 100%)"
        : color === "warning"
        ? "linear-gradient(135deg, #ffa726 0%, #ffb74d 100%)"
        : color === "info"
        ? "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)"
        : "linear-gradient(135deg, #667eea 0%, #764ba2 100%)";
  
    return (
      <Slide in={true} direction="down" timeout={800 + delay}>
        <Card
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          sx={{
            background: gradient,
            color: "white",
            height: "100%",
            borderRadius: "16px",
            boxShadow: isHovered
              ? "0 16px 40px rgba(0,0,0,0.25)"
              : "0 4px 14px rgba(0,0,0,0.1)",
            transform: isHovered ? "translateY(-10px) scale(1.05)" : "translateY(0) scale(1)",
            transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
            overflow: "hidden",
            cursor: "pointer",
          }}
        >
          <CardContent>
            <Box display="flex" alignItems="center" justifyContent="space-between">
              <Box>
                <Typography
                  variant="overline"
                  sx={{ fontWeight: 700, letterSpacing: 1, opacity: 0.9 }}
                >
                  {title}
                </Typography>
                <Typography variant="h4" sx={{ fontWeight: 800, my: 1 }}>
                  {value}
                </Typography>
                {subtitle && (
                  <Typography variant="caption" sx={{ opacity: 0.9 }}>
                    {subtitle}
                  </Typography>
                )}
              </Box>
  
              <Box
                sx={{
                  backgroundColor: "rgba(255,255,255,0.2)",
                  borderRadius: "50%",
                  p: 2,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  transform: isHovered ? "scale(1.15) rotate(8deg)" : "scale(1) rotate(0deg)",
                  transition: "all 0.3s ease",
                  backdropFilter: "blur(10px)",
                }}
              >
                {React.cloneElement(icon, { sx: { fontSize: 32, color: "#fff" } })}
              </Box>
            </Box>
  
            {/* Optional Progress Bar */}
            {progress !== undefined && (
              <LinearProgress
                variant="determinate"
                value={progress}
                sx={{
                  mt: 2,
                  height: 6,
                  borderRadius: 3,
                  backgroundColor: "rgba(255,255,255,0.3)",
                  "& .MuiLinearProgress-bar": {
                    backgroundColor: "#fff",
                  },
                }}
              />
            )}
          </CardContent>
        </Card>
      </Slide>
    );
  };

  return (
    <Box sx={{ p: 3, background: `linear-gradient(135deg, ${theme.palette.background.default} 0%, ${alpha(theme.palette.background.paper, 0.8)} 100%)`, minHeight: '100vh' }}>
      <Fade in={true} timeout={1000}>
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={4}>
          <Box>
            <Typography variant="h3" sx={{ 
                fontWeight: 900,
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                mb: 0.5,
              
            }}>
              Client Management
            </Typography>
            <Typography variant="h6" color="textSecondary" sx={{ fontWeight: 400 }}>
              Manage your client relationships and track case progress
            </Typography>
          </Box>
          <Zoom in={true} timeout={1200}>
            <Button
              variant="contained"
              startIcon={<AddIcon />}
              onClick={() => setOpenDialog(true)}
              sx={{
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                fontWeight: 700,
                px: 3,
                py: 1.5,
                boxShadow: '0 8px 24px rgba(102, 126, 234, 0.4)',
                transition: 'all 0.3s ease',
                '&:hover': {
                  transform: 'translateY(-2px)',
                  boxShadow: '0 12px 32px rgba(102, 126, 234, 0.5)',
                }
              }}
            >
              Add New Client
            </Button>
          </Zoom>
        </Box>
      </Fade>

      {/* Statistics Cards */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
      <Grid item xs={12} sm={6} md={3}>
        <EnhancedStatCard
          title="Total Clients"
          value={stats.total}
          icon={<BusinessIcon />}
          color="primary"
          delay={100}
          progress={(stats.active / stats.total) * 100}
          subtitle={null}
        />
      </Grid>

      <Grid item xs={12} sm={6} md={3}>
        <EnhancedStatCard
          title="Active Clients"
          value={stats.active}
          icon={<CheckIcon />}
          color="success"
          delay={200}
          subtitle={`${((stats.active / stats.total) * 100).toFixed(1)}% of total`}
        />
      </Grid>

      <Grid item xs={12} sm={6} md={3}>
        <EnhancedStatCard
          title="Total Revenue"
          value={formatCurrency(stats.revenue)}
          icon={<MoneyIcon />}
          color="warning"
          delay={300}
          subtitle={`From ${stats.cases} active cases`}
        />
      </Grid>

      <Grid item xs={12} sm={6} md={3}>
        <EnhancedStatCard
          title="Avg. Revenue"
          value={formatCurrency(stats.active > 0 ? stats.revenue / stats.active : 0)}
          icon={<TimelineIcon />}
          color="info"
          delay={400}
          subtitle="Per active client"
        />
      </Grid>
    </Grid>

      {/* Tabs and Search */}
      <AnimatedCard delay={500} sx={{ mb: 3, borderRadius: 2 }}>
        <CardContent sx={{ p: 0 }}>
          <Tabs 
            value={selectedTab} 
            onChange={(e, newValue) => setSelectedTab(newValue)}
            sx={{ 
              borderBottom: 1, 
              borderColor: 'divider',
              px: 2,
              '& .MuiTab-root': {
                fontWeight: 600,
                fontSize: '0.9rem',
                textTransform: 'none',
                minHeight: 60,
                '&.Mui-selected': {
                  color: theme.palette.primary.main,
                }
              }
            }}
          >
            <Tab label={`All Clients (${clients.length})`} />
            <Tab label={`Active (${clients.filter(c => c.status === 'active').length})`} />
            <Tab label={`Favorites (${clients.filter(c => c.favorite).length})`} />
            <Tab label={`Archived (${clients.filter(c => c.status === 'inactive').length})`} />
          </Tabs>
          
          <Box sx={{ p: 2, borderTop: 1, borderColor: 'divider' }}>
            <Grid container spacing={2} alignItems="center">
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  placeholder="Search clients by name, contact, or email..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <SearchIcon color="primary" />
                      </InputAdornment>
                    ),
                  }}
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      borderRadius: 2,
                    }
                  }}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <Box display="flex" gap={1} justifyContent="flex-end">
                  <Button variant="outlined" startIcon={<FilterIcon />}>
                    Filter
                  </Button>
                  <Button variant="outlined" startIcon={<DownloadIcon />}>
                    Export
                  </Button>
                  <Button variant="outlined" startIcon={<PrintIcon />}>
                    Print
                  </Button>
                </Box>
              </Grid>
            </Grid>
          </Box>
        </CardContent>
      </AnimatedCard>

      {/* Clients Grid */}
      {filteredClients.length > 0 ? (
        <Grid container spacing={3}>
          {filteredClients.map((client, index) => (
            <Grid item xs={12} sm={6} md={4} key={client.id}>
              <ClientCard client={client} index={index} />
            </Grid>
          ))}
        </Grid>
      ) : (
        <AnimatedCard>
          <CardContent sx={{ textAlign: 'center', py: 8 }}>
            <BusinessIcon sx={{ fontSize: 64, color: 'text.secondary', mb: 2, opacity: 0.5 }} />
            <Typography variant="h6" color="textSecondary" gutterBottom>
              No clients found
            </Typography>
            <Typography variant="body2" color="textSecondary" sx={{ mb: 3 }}>
              {searchTerm ? 'Try adjusting your search terms' : 'Get started by adding your first client'}
            </Typography>
            <Button 
              variant="contained" 
              startIcon={<AddIcon />}
              onClick={() => setOpenDialog(true)}
            >
              Add New Client
            </Button>
          </CardContent>
        </AnimatedCard>
      )}

      {/* Add Client Dialog */}
      <Dialog 
        open={openDialog} 
        onClose={() => setOpenDialog(false)} 
        maxWidth="md" 
        fullWidth
        PaperProps={{
          sx: {
            borderRadius: 3,
            background: `linear-gradient(135deg, ${theme.palette.background.paper} 0%, ${alpha(theme.palette.background.default, 0.9)} 100%)`
          }
        }}
      >
        <DialogTitle sx={{ 
          fontWeight: 700,
          background: `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
          backgroundClip: 'text',
          WebkitBackgroundClip: 'text',
          color: 'transparent'
        }}>
          Add New Client
        </DialogTitle>
        <DialogContent>
          <Grid container spacing={3} sx={{ mt: 1 }}>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Company/Client Name"
                value={newClient.name}
                onChange={(e) => setNewClient({ ...newClient, name: e.target.value })}
                required
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Contact Person"
                value={newClient.contact}
                onChange={(e) => setNewClient({ ...newClient, contact: e.target.value })}
                required
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <FormControl fullWidth>
                <InputLabel>Client Type</InputLabel>
                <Select
                  value={newClient.type}
                  label="Client Type"
                  onChange={(e) => setNewClient({ ...newClient, type: e.target.value })}
                >
                  {clientTypes.map((type) => (
                    <MenuItem key={type} value={type}>{type}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Website"
                value={newClient.website}
                onChange={(e) => setNewClient({ ...newClient, website: e.target.value })}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <LanguageIcon color="primary" />
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Email"
                type="email"
                value={newClient.email}
                onChange={(e) => setNewClient({ ...newClient, email: e.target.value })}
                required
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <EmailIcon color="primary" />
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Phone"
                value={newClient.phone}
                onChange={(e) => setNewClient({ ...newClient, phone: e.target.value })}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <PhoneIcon color="primary" />
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Address"
                value={newClient.address}
                onChange={(e) => setNewClient({ ...newClient, address: e.target.value })}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <LocationIcon color="primary" />
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Notes"
                multiline
                rows={3}
                value={newClient.notes}
                onChange={(e) => setNewClient({ ...newClient, notes: e.target.value })}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <NoteIcon color="primary" />
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions sx={{ p: 3 }}>
          <Button onClick={() => setOpenDialog(false)}>Cancel</Button>
          <Button 
            onClick={handleAddClient} 
            variant="contained"
            disabled={!newClient.name || !newClient.contact || !newClient.email || !newClient.type}
            sx={{
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              fontWeight: 700,
              px: 3,
              py: 1.5,
              color: '#fff',
              boxShadow: '0 8px 24px rgba(102, 126, 234, 0.4)',
              transition: 'all 0.3s ease',
              '&:hover': {
                transform: 'translateY(-2px)',
                boxShadow: '0 12px 32px rgba(102, 126, 234, 0.5)',
              }
            }}
          >
            Add Client
          </Button>
        </DialogActions>
      </Dialog>

      {/* Client Actions Menu */}
      <Menu
        anchorEl={menuAnchor}
        open={Boolean(menuAnchor)}
        onClose={handleMenuClose}
        PaperProps={{
          sx: {
            borderRadius: 2,
            minWidth: 200,
            boxShadow: `0 8px 32px ${alpha(theme.palette.primary.main, 0.1)}`
          }
        }}
      >
        <MenuItem onClick={handleMenuClose}>
          <ListItemIcon><EditIcon fontSize="small" /></ListItemIcon>
          <ListItemText>Edit Client</ListItemText>
        </MenuItem>
        <MenuItem onClick={handleMenuClose}>
          <ListItemIcon><EmailIcon fontSize="small" /></ListItemIcon>
          <ListItemText>Send Email</ListItemText>
        </MenuItem>
        <MenuItem onClick={handleMenuClose}>
          <ListItemIcon><CaseIcon fontSize="small" /></ListItemIcon>
          <ListItemText>View Cases</ListItemText>
        </MenuItem>
        <Divider />
        <MenuItem onClick={handleMenuClose}>
          <ListItemIcon><ArchiveIcon fontSize="small" /></ListItemIcon>
          <ListItemText>Archive Client</ListItemText>
        </MenuItem>
        <MenuItem onClick={handleMenuClose} sx={{ color: 'error.main' }}>
          <ListItemIcon><DeleteIcon fontSize="small" /></ListItemIcon>
          <ListItemText>Delete Client</ListItemText>
        </MenuItem>
      </Menu>

      {/* Enhanced CSS Animations */}
      <style jsx>{`
        @keyframes fadeInUp {
          0% { opacity: 0; transform: translateY(20px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        @keyframes glow {
          0% { filter: drop-shadow(0 0 5px rgba(25, 118, 210, 0.3)); }
          100% { filter: drop-shadow(0 0 15px rgba(25, 118, 210, 0.6)); }
        }
      `}</style>
    </Box>
  );
};

export default ClientManagement;