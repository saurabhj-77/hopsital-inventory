import React, { useState, useEffect } from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
  Button,
  Paper,
  Avatar,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Tabs,
  Tab,
  LinearProgress,
  Fab,
  Alert,
  Fade,
  Zoom,
} from '@mui/material';
import {
  Add,
  Build,
  Warning,
  CheckCircle,
  LocalShipping,
  Inventory,
  Search,
  FilterList,
  RequestQuote,
} from '@mui/icons-material';
import { getDummyData, updateDummyData } from '../../data/DummyData';
import { STORAGE_KEYS } from '../../utils/LocalStorage';
import { auth } from '../../utils/Auth';

const TabPanel = ({ children, value, index, ...other }) => (
  <div hidden={value !== index} {...other}>
    {value === index && <Box sx={{ p: 0 }}>{children}</Box>}
  </div>
);

const EmployeeMaterials = () => {
  const [tabValue, setTabValue] = useState(0);
  const [openRequest, setOpenRequest] = useState(false);
  const [materials, setMaterials] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);
  const [newRequest, setNewRequest] = useState({
    materialId: '',
    quantity: 1,
    priority: 'medium',
    project: '1',
    notes: '',
    requiredDate: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString().split('T')[0],
  });

  useEffect(() => {
    const user = auth.getCurrentUser();
    setCurrentUser(user);
    initializeMaterialsData();
  }, []);

  const initializeMaterialsData = () => {
    let materialsData = getDummyData(STORAGE_KEYS.MATERIALS);
    
    // Ensure we have some materials data
    if (materialsData.length === 0) {
      materialsData = [
        {
          id: '1',
          name: 'Portland Cement',
          category: 'Construction',
          quantity: 500,
          unit: 'bags',
          unitPrice: 8.5,
          supplier: 'BuildMart Supplies',
          projectId: '1',
          status: 'in-stock',
          lastOrdered: '2024-01-20',
          minStock: 100,
          location: 'Main Storage',
        },
        {
          id: '2',
          name: 'Steel Rebar',
          category: 'Structural',
          quantity: 45,
          unit: 'tons',
          unitPrice: 850,
          supplier: 'ProBuild Materials',
          projectId: '1',
          status: 'low-stock',
          lastOrdered: '2024-02-15',
          minStock: 50,
          location: 'Site A Storage',
        },
        {
          id: '3',
          name: 'Electrical Wire',
          category: 'Electrical',
          quantity: 2000,
          unit: 'meters',
          unitPrice: 1.2,
          supplier: 'Construction Depot',
          projectId: '1',
          status: 'in-stock',
          lastOrdered: '2024-02-10',
          minStock: 500,
          location: 'Electrical Room',
        },
      ];
      updateDummyData(STORAGE_KEYS.MATERIALS, materialsData);
    }
    
    setMaterials(materialsData);
  };

  const handleSubmitRequest = () => {
    const requests = getDummyData('material_requests') || [];
    const requestData = {
      id: Date.now().toString(),
      ...newRequest,
      requestedBy: currentUser?.id,
      status: 'pending',
      requestDate: new Date().toISOString(),
    };

    const updatedRequests = [...requests, requestData];
    updateDummyData('material_requests', updatedRequests);
    setOpenRequest(false);
    resetForm();
  };

  const resetForm = () => {
    setNewRequest({
      materialId: '',
      quantity: 1,
      priority: 'medium',
      project: '1',
      notes: '',
      requiredDate: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    });
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'in-stock': return 'success';
      case 'low-stock': return 'warning';
      case 'out-of-stock': return 'error';
      default: return 'default';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'in-stock': return <CheckCircle />;
      case 'low-stock': return <Warning />;
      case 'out-of-stock': return <Warning />;
      default: return <Inventory />;
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return 'error';
      case 'medium': return 'warning';
      case 'low': return 'success';
      default: return 'default';
    }
  };

  const lowStockItems = materials.filter(m => m.status === 'low-stock' || m.status === 'out-of-stock');
  const projects = getDummyData(STORAGE_KEYS.PROJECTS);

  const MaterialRow = ({ material }) => (
    <TableRow hover>
      <TableCell>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <Avatar sx={{ backgroundColor: 'primary.main' }}>
            <Build />
          </Avatar>
          <Box>
            <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
              {material.name}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {material.category}
            </Typography>
          </Box>
        </Box>
      </TableCell>
      <TableCell>
        <Chip
          icon={getStatusIcon(material.status)}
          label={material.status}
          color={getStatusColor(material.status)}
          size="small"
        />
      </TableCell>
      <TableCell>
        <Box>
          <Typography variant="body2" sx={{ fontWeight: 600 }}>
            {material.quantity} {material.unit}
          </Typography>
          <LinearProgress
            variant="determinate"
            value={Math.min((material.quantity / material.minStock) * 100, 100)}
            color={material.quantity > material.minStock ? 'success' : 'warning'}
            sx={{ height: 4, borderRadius: 2, mt: 0.5 }}
          />
        </Box>
      </TableCell>
      <TableCell>
        <Typography variant="body2">{material.location}</Typography>
      </TableCell>
      <TableCell>
        <Typography variant="body2">{material.supplier}</Typography>
      </TableCell>
      <TableCell>
        <Button
          variant="outlined"
          size="small"
          onClick={() => {
            setNewRequest({
              ...newRequest,
              materialId: material.id,
            });
            setOpenRequest(true);
          }}
        >
          Request
        </Button>
      </TableCell>
    </TableRow>
  );

  const QuickRequestCard = ({ material }) => (
    <Zoom in={true}>
      <Card sx={{ height: '100%', transition: 'all 0.3s ease', '&:hover': { transform: 'translateY(-2px)', boxShadow: 4 } }}>
        <CardContent sx={{ textAlign: 'center' }}>
          <Avatar sx={{ backgroundColor: 'primary.main', width: 60, height: 60, mx: 'auto', mb: 2 }}>
            <Build />
          </Avatar>
          <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
            {material.name}
          </Typography>
          <Chip
            label={`${material.quantity} ${material.unit} available`}
            color={getStatusColor(material.status)}
            size="small"
            sx={{ mb: 2 }}
          />
          <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
            {material.location}
          </Typography>
          <Button
            variant="contained"
            fullWidth
            onClick={() => {
              setNewRequest({
                ...newRequest,
                materialId: material.id,
              });
              setOpenRequest(true);
            }}
          >
            Request Material
          </Button>
        </CardContent>
      </Card>
    </Zoom>
  );

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
        <Typography variant="h4" sx={{ fontWeight: 700 }}>
          Materials & Inventory
        </Typography>
        <Button
          variant="contained"
          startIcon={<Add />}
          onClick={() => setOpenRequest(true)}
        >
          New Request
        </Button>
      </Box>

      {lowStockItems.length > 0 && (
        <Alert severity="warning" sx={{ mb: 3 }}>
          {lowStockItems.length} materials are running low and may need reordering soon.
        </Alert>
      )}

      {/* Quick Stats */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent sx={{ textAlign: 'center' }}>
              <Inventory sx={{ fontSize: 40, color: 'primary.main', mb: 1 }} />
              <Typography variant="h4" sx={{ fontWeight: 600 }}>
                {materials.length}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Total Materials
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent sx={{ textAlign: 'center' }}>
              <CheckCircle sx={{ fontSize: 40, color: 'success.main', mb: 1 }} />
              <Typography variant="h4" sx={{ fontWeight: 600 }}>
                {materials.filter(m => m.status === 'in-stock').length}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                In Stock
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent sx={{ textAlign: 'center' }}>
              <Warning sx={{ fontSize: 40, color: 'warning.main', mb: 1 }} />
              <Typography variant="h4" sx={{ fontWeight: 600 }}>
                {lowStockItems.length}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Low Stock
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent sx={{ textAlign: 'center' }}>
              <LocalShipping sx={{ fontSize: 40, color: 'info.main', mb: 1 }} />
              <Typography variant="h4" sx={{ fontWeight: 600 }}>
                12
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Active Requests
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Paper sx={{ mb: 3 }}>
        <Tabs value={tabValue} onChange={(e, newValue) => setTabValue(newValue)}>
          <Tab label={`All Materials (${materials.length})`} />
          <Tab label={`Quick Request`} />
          <Tab label={`My Requests`} />
        </Tabs>
      </Paper>

      <TabPanel value={tabValue} index={0}>
        <TableContainer component={Paper} variant="outlined">
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Material</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Quantity</TableCell>
                <TableCell>Location</TableCell>
                <TableCell>Supplier</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {materials.map((material) => (
                <MaterialRow key={material.id} material={material} />
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </TabPanel>

      <TabPanel value={tabValue} index={1}>
        <Typography variant="h6" gutterBottom sx={{ fontWeight: 600, mb: 3 }}>
          Quick Material Request
        </Typography>
        <Grid container spacing={3}>
          {materials.slice(0, 6).map((material) => (
            <Grid item xs={12} sm={6} md={4} key={material.id}>
              <QuickRequestCard material={material} />
            </Grid>
          ))}
        </Grid>
      </TabPanel>

      <TabPanel value={tabValue} index={2}>
        <Card>
          <CardContent sx={{ textAlign: 'center', py: 6 }}>
            <RequestQuote sx={{ fontSize: 64, color: 'text.secondary', mb: 2 }} />
            <Typography variant="h6" color="text.secondary">
              No material requests yet
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
              Your material requests will appear here once submitted.
            </Typography>
            <Button variant="contained" onClick={() => setOpenRequest(true)}>
              Create First Request
            </Button>
          </CardContent>
        </Card>
      </TabPanel>

      {/* Material Request Dialog */}
      <Dialog open={openRequest} onClose={() => setOpenRequest(false)} maxWidth="sm" fullWidth>
        <DialogTitle>
          <Typography variant="h6" sx={{ fontWeight: 600 }}>
            Request Materials
          </Typography>
        </DialogTitle>
        
        <DialogContent>
          <Grid container spacing={2} sx={{ mt: 1 }}>
            <Grid item xs={12}>
              <FormControl fullWidth>
                <InputLabel>Material</InputLabel>
                <Select
                  value={newRequest.materialId}
                  label="Material"
                  onChange={(e) => setNewRequest({...newRequest, materialId: e.target.value})}
                >
                  {materials.map((material) => (
                    <MenuItem key={material.id} value={material.id}>
                      {material.name} ({material.quantity} {material.unit} available)
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Quantity"
                type="number"
                value={newRequest.quantity}
                onChange={(e) => setNewRequest({...newRequest, quantity: parseFloat(e.target.value)})}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel>Priority</InputLabel>
                <Select
                  value={newRequest.priority}
                  label="Priority"
                  onChange={(e) => setNewRequest({...newRequest, priority: e.target.value})}
                >
                  <MenuItem value="low">Low</MenuItem>
                  <MenuItem value="medium">Medium</MenuItem>
                  <MenuItem value="high">High</MenuItem>
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12}>
              <FormControl fullWidth>
                <InputLabel>Project</InputLabel>
                <Select
                  value={newRequest.project}
                  label="Project"
                  onChange={(e) => setNewRequest({...newRequest, project: e.target.value})}
                >
                  {projects.map((project) => (
                    <MenuItem key={project.id} value={project.id}>{project.name}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Required Date"
                type="date"
                value={newRequest.requiredDate}
                onChange={(e) => setNewRequest({...newRequest, requiredDate: e.target.value})}
                InputLabelProps={{ shrink: true }}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                fullWidth
                multiline
                rows={3}
                label="Notes"
                value={newRequest.notes}
                onChange={(e) => setNewRequest({...newRequest, notes: e.target.value})}
                placeholder="Explain why you need these materials and how they will be used..."
              />
            </Grid>
          </Grid>
        </DialogContent>
        
        <DialogActions sx={{ p: 3 }}>
          <Button onClick={() => setOpenRequest(false)}>
            Cancel
          </Button>
          <Button
            variant="contained"
            onClick={handleSubmitRequest}
            disabled={!newRequest.materialId}
          >
            Submit Request
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default EmployeeMaterials;