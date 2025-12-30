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
} from '@mui/material';
import {
  Add,
  Edit,
  Delete,
  Build,
  DirectionsCar,
  Warning,
  CheckCircle,
  Schedule,
  LocalShipping,
} from '@mui/icons-material';
import { getDummyData, updateDummyData } from '../../data/DummyData';
import { STORAGE_KEYS } from '../../utils/LocalStorage';

const TabPanel = ({ children, value, index, ...other }) => (
  <div hidden={value !== index} {...other}>
    {value === index && <Box sx={{ p: 0 }}>{children}</Box>}
  </div>
);

const equipmentTypes = [
  'Excavator',
  'Bulldozer',
  'Crane',
  'Concrete Mixer',
  'Forklift',
  'Generator',
  'Compressor',
  'Welding Machine',
];

const maintenanceStatus = ['Operational', 'Maintenance', 'Repair', 'Out of Service'];

const Equipment = () => {
  const [tabValue, setTabValue] = useState(0);
  const [openDialog, setOpenDialog] = useState(false);
  const [editingEquipment, setEditingEquipment] = useState(null);
  const [equipment, setEquipment] = useState([]);
  const [newEquipment, setNewEquipment] = useState({
    name: '',
    type: '',
    model: '',
    serialNumber: '',
    status: 'Operational',
    location: '',
    assignedTo: '',
    lastMaintenance: new Date().toISOString().split('T')[0],
    nextMaintenance: new Date(Date.now() + 30 * 86400000).toISOString().split('T')[0],
    hoursUsed: 0,
    fuelLevel: 100,
  });

  useEffect(() => {
    initializeEquipmentData();
  }, []);

  const initializeEquipmentData = () => {
    let equipmentData = getDummyData(STORAGE_KEYS.EQUIPMENT);
    if (equipmentData.length === 0) {
      equipmentData = [
        {
          id: '1',
          name: 'Caterpillar Excavator',
          type: 'Excavator',
          model: 'CAT 320',
          serialNumber: 'EXC-2023-001',
          status: 'Operational',
          location: 'Site A',
          assignedTo: '2',
          lastMaintenance: '2024-01-15',
          nextMaintenance: '2024-03-15',
          hoursUsed: 245,
          fuelLevel: 85,
        },
        {
          id: '2',
          name: 'Komatsu Bulldozer',
          type: 'Bulldozer',
          model: 'D65',
          serialNumber: 'BD-2023-002',
          status: 'Maintenance',
          location: 'Maintenance Yard',
          assignedTo: '',
          lastMaintenance: '2024-02-01',
          nextMaintenance: '2024-02-28',
          hoursUsed: 189,
          fuelLevel: 0,
        },
        {
          id: '3',
          name: 'Tower Crane',
          type: 'Crane',
          model: 'Liebherr 200',
          serialNumber: 'CRN-2023-003',
          status: 'Operational',
          location: 'Site B',
          assignedTo: '3',
          lastMaintenance: '2024-01-20',
          nextMaintenance: '2024-03-20',
          hoursUsed: 312,
          fuelLevel: 100,
        },
      ];
      updateDummyData(STORAGE_KEYS.EQUIPMENT, equipmentData);
    }
    setEquipment(equipmentData);
  };

  const handleAddEquipment = () => {
    const equipmentData = {
      id: Date.now().toString(),
      ...newEquipment,
    };

    const updatedEquipment = [...equipment, equipmentData];
    setEquipment(updatedEquipment);
    updateDummyData(STORAGE_KEYS.EQUIPMENT, updatedEquipment);
    setOpenDialog(false);
    resetForm();
  };

  const handleEditEquipment = (item) => {
    setEditingEquipment(item);
    setNewEquipment({
      name: item.name,
      type: item.type,
      model: item.model,
      serialNumber: item.serialNumber,
      status: item.status,
      location: item.location,
      assignedTo: item.assignedTo,
      lastMaintenance: item.lastMaintenance,
      nextMaintenance: item.nextMaintenance,
      hoursUsed: item.hoursUsed,
      fuelLevel: item.fuelLevel,
    });
    setOpenDialog(true);
  };

  const handleUpdateEquipment = () => {
    const updatedEquipment = equipment.map(item =>
      item.id === editingEquipment.id
        ? { ...item, ...newEquipment }
        : item
    );
    setEquipment(updatedEquipment);
    updateDummyData(STORAGE_KEYS.EQUIPMENT, updatedEquipment);
    setOpenDialog(false);
    resetForm();
    setEditingEquipment(null);
  };

  const handleDeleteEquipment = (id) => {
    const updatedEquipment = equipment.filter(item => item.id !== id);
    setEquipment(updatedEquipment);
    updateDummyData(STORAGE_KEYS.EQUIPMENT, updatedEquipment);
  };

  const resetForm = () => {
    setNewEquipment({
      name: '',
      type: '',
      model: '',
      serialNumber: '',
      status: 'Operational',
      location: '',
      assignedTo: '',
      lastMaintenance: new Date().toISOString().split('T')[0],
      nextMaintenance: new Date(Date.now() + 30 * 86400000).toISOString().split('T')[0],
      hoursUsed: 0,
      fuelLevel: 100,
    });
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Operational': return 'success';
      case 'Maintenance': return 'warning';
      case 'Repair': return 'error';
      case 'Out of Service': return 'default';
      default: return 'default';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'Operational': return <CheckCircle />;
      case 'Maintenance': return <Build />;
      case 'Repair': return <Warning />;
      default: return <Schedule />;
    }
  };

  const needsMaintenance = equipment.filter(
    item => new Date(item.nextMaintenance) <= new Date(Date.now() + 7 * 86400000)
  ).length;

  const operationalCount = equipment.filter(item => item.status === 'Operational').length;
  const underMaintenance = equipment.filter(item => item.status === 'Maintenance' || item.status === 'Repair').length;

  const EquipmentRow = ({ item }) => {
    const employees = getDummyData(STORAGE_KEYS.USERS);
    const assignedEmployee = employees.find(emp => emp.id === item.assignedTo);
    
    return (
      <TableRow hover>
        <TableCell>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Avatar sx={{ backgroundColor: 'primary.main' }}>
              <DirectionsCar />
            </Avatar>
            <Box>
              <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
                {item.name}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {item.model} • {item.serialNumber}
              </Typography>
            </Box>
          </Box>
        </TableCell>
        <TableCell>
          <Chip label={item.type} size="small" variant="outlined" />
        </TableCell>
        <TableCell>
          <Chip
            icon={getStatusIcon(item.status)}
            label={item.status}
            color={getStatusColor(item.status)}
            size="small"
          />
        </TableCell>
        <TableCell>
          <Typography variant="body2">{item.location}</Typography>
        </TableCell>
        <TableCell>
          {assignedEmployee ? (
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Avatar src={assignedEmployee.avatar} sx={{ width: 24, height: 24 }}>
                {assignedEmployee.name.charAt(0)}
              </Avatar>
              <Typography variant="body2">{assignedEmployee.name}</Typography>
            </Box>
          ) : (
            <Typography variant="body2" color="text.secondary">
              Unassigned
            </Typography>
          )}
        </TableCell>
        <TableCell>
          <Box>
            <Typography variant="body2" sx={{ fontWeight: 600 }}>
              {item.hoursUsed}h
            </Typography>
            <LinearProgress
              variant="determinate"
              value={Math.min((item.hoursUsed / 1000) * 100, 100)}
              color={item.hoursUsed > 800 ? 'warning' : 'primary'}
              sx={{ height: 4, borderRadius: 2, mt: 0.5 }}
            />
          </Box>
        </TableCell>
        <TableCell>
          <Box>
            <Typography variant="body2" sx={{ fontWeight: 600 }}>
              {item.fuelLevel}%
            </Typography>
            <LinearProgress
              variant="determinate"
              value={item.fuelLevel}
              color={item.fuelLevel > 20 ? 'success' : 'error'}
              sx={{ height: 4, borderRadius: 2, mt: 0.5 }}
            />
          </Box>
        </TableCell>
        <TableCell>
          <Box sx={{ display: 'flex', gap: 1 }}>
            <IconButton size="small" onClick={() => handleEditEquipment(item)}>
              <Edit />
            </IconButton>
            <IconButton size="small" color="error" onClick={() => handleDeleteEquipment(item.id)}>
              <Delete />
            </IconButton>
          </Box>
        </TableCell>
      </TableRow>
    );
  };

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
        <Typography variant="h4" sx={{ fontWeight: 700 }}>
          Equipment Management
        </Typography>
        <Button
          variant="contained"
          startIcon={<Add />}
          onClick={() => setOpenDialog(true)}
        >
          Add Equipment
        </Button>
      </Box>

      {needsMaintenance > 0 && (
        <Alert severity="warning" sx={{ mb: 3 }}>
          {needsMaintenance} equipment items require maintenance within the next 7 days.
        </Alert>
      )}

      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent sx={{ textAlign: 'center' }}>
              <DirectionsCar sx={{ fontSize: 40, color: 'primary.main', mb: 1 }} />
              <Typography variant="h4" sx={{ fontWeight: 600 }}>
                {equipment.length}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Total Equipment
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent sx={{ textAlign: 'center' }}>
              <CheckCircle sx={{ fontSize: 40, color: 'success.main', mb: 1 }} />
              <Typography variant="h4" sx={{ fontWeight: 600 }}>
                {operationalCount}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Operational
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent sx={{ textAlign: 'center' }}>
              <Build sx={{ fontSize: 40, color: 'warning.main', mb: 1 }} />
              <Typography variant="h4" sx={{ fontWeight: 600 }}>
                {underMaintenance}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Under Maintenance
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent sx={{ textAlign: 'center' }}>
              <LocalShipping sx={{ fontSize: 40, color: 'info.main', mb: 1 }} />
              <Typography variant="h4" sx={{ fontWeight: 600 }}>
                {needsMaintenance}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Needs Maintenance
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Paper sx={{ mb: 3 }}>
        <Tabs value={tabValue} onChange={(e, newValue) => setTabValue(newValue)}>
          <Tab label={`All Equipment (${equipment.length})`} />
          <Tab label={`Operational (${operationalCount})`} />
          <Tab label={`Maintenance (${underMaintenance})`} />
          <Tab label={`Needs Service (${needsMaintenance})`} />
        </Tabs>
      </Paper>

      <TabPanel value={tabValue} index={0}>
        <TableContainer component={Paper} variant="outlined">
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Equipment</TableCell>
                <TableCell>Type</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Location</TableCell>
                <TableCell>Assigned To</TableCell>
                <TableCell>Hours Used</TableCell>
                <TableCell>Fuel Level</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {equipment.map((item) => (
                <EquipmentRow key={item.id} item={item} />
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </TabPanel>

      {/* Add/Edit Equipment Dialog */}
      <Dialog open={openDialog} onClose={() => setOpenDialog(false)} maxWidth="md" fullWidth>
        <DialogTitle>
          <Typography variant="h6" sx={{ fontWeight: 600 }}>
            {editingEquipment ? 'Edit Equipment' : 'Add New Equipment'}
          </Typography>
        </DialogTitle>
        
        <DialogContent>
          <Grid container spacing={2} sx={{ mt: 1 }}>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Equipment Name"
                value={newEquipment.name}
                onChange={(e) => setNewEquipment({...newEquipment, name: e.target.value})}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel>Type</InputLabel>
                <Select
                  value={newEquipment.type}
                  label="Type"
                  onChange={(e) => setNewEquipment({...newEquipment, type: e.target.value})}
                >
                  {equipmentTypes.map((type) => (
                    <MenuItem key={type} value={type}>{type}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Model"
                value={newEquipment.model}
                onChange={(e) => setNewEquipment({...newEquipment, model: e.target.value})}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Serial Number"
                value={newEquipment.serialNumber}
                onChange={(e) => setNewEquipment({...newEquipment, serialNumber: e.target.value})}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel>Status</InputLabel>
                <Select
                  value={newEquipment.status}
                  label="Status"
                  onChange={(e) => setNewEquipment({...newEquipment, status: e.target.value})}
                >
                  {maintenanceStatus.map((status) => (
                    <MenuItem key={status} value={status}>{status}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Location"
                value={newEquipment.location}
                onChange={(e) => setNewEquipment({...newEquipment, location: e.target.value})}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Last Maintenance"
                type="date"
                value={newEquipment.lastMaintenance}
                onChange={(e) => setNewEquipment({...newEquipment, lastMaintenance: e.target.value})}
                InputLabelProps={{ shrink: true }}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Next Maintenance"
                type="date"
                value={newEquipment.nextMaintenance}
                onChange={(e) => setNewEquipment({...newEquipment, nextMaintenance: e.target.value})}
                InputLabelProps={{ shrink: true }}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Hours Used"
                type="number"
                value={newEquipment.hoursUsed}
                onChange={(e) => setNewEquipment({...newEquipment, hoursUsed: parseFloat(e.target.value)})}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Fuel Level (%)"
                type="number"
                value={newEquipment.fuelLevel}
                onChange={(e) => setNewEquipment({...newEquipment, fuelLevel: parseFloat(e.target.value)})}
                InputProps={{ endAdornment: '%' }}
              />
            </Grid>
          </Grid>
        </DialogContent>
        
        <DialogActions sx={{ p: 3 }}>
          <Button onClick={() => setOpenDialog(false)}>
            Cancel
          </Button>
          <Button
            variant="contained"
            onClick={editingEquipment ? handleUpdateEquipment : handleAddEquipment}
            disabled={!newEquipment.name || !newEquipment.type}
          >
            {editingEquipment ? 'Update Equipment' : 'Add Equipment'}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Equipment;