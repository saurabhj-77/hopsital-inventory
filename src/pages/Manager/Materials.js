import React, { useState } from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Grid,
  Chip,
  Button,
  Paper,
  Tabs,
  Tab,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  Fab,
  Alert,
  LinearProgress,
} from '@mui/material';
import {
  Add,
  Edit,
  Delete,
  Inventory,
  Warning,
  CheckCircle,
  LocalShipping,
  AttachMoney,
} from '@mui/icons-material';
import { getDummyData, updateDummyData } from '../../data/DummyData';
import { STORAGE_KEYS } from '../../utils/LocalStorage';

const TabPanel = ({ children, value, index, ...other }) => (
  <div hidden={value !== index} {...other}>
    {value === index && <Box sx={{ p: 0 }}>{children}</Box>}
  </div>
);

const materialCategories = [
  'Construction',
  'Structural',
  'Electrical',
  'Plumbing',
  'Finishing',
  'Safety',
];

const suppliers = [
  'BuildMart Supplies',
  'Construction Depot',
  'ProBuild Materials',
  'Home Improvement Co',
  'Quality Builders Supply',
];

export const Materials = () => {
  const [tabValue, setTabValue] = useState(0);
  const [openDialog, setOpenDialog] = useState(false);
  const [editingMaterial, setEditingMaterial] = useState(null);
  const [materials, setMaterials] = useState(getDummyData(STORAGE_KEYS.MATERIALS));
  const [newMaterial, setNewMaterial] = useState({
    name: '',
    category: '',
    quantity: 0,
    unit: '',
    unitPrice: 0,
    supplier: '',
    minStock: 10,
    projectId: '1',
  });

  const initializeMaterials = () => {
    if (materials.length === 0) {
      const initialMaterials = [
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
        },
        {
          id: '4',
          name: 'PVC Pipes',
          category: 'Plumbing',
          quantity: 8,
          unit: 'bundles',
          unitPrice: 45,
          supplier: 'Home Improvement Co',
          projectId: '1',
          status: 'out-of-stock',
          lastOrdered: '2024-01-25',
          minStock: 15,
        },
      ];
      updateDummyData(STORAGE_KEYS.MATERIALS, initialMaterials);
      setMaterials(initialMaterials);
    }
  };

  React.useEffect(() => {
    initializeMaterials();
  }, []);

  const handleAddMaterial = () => {
    const materialData = {
      id: Date.now().toString(),
      ...newMaterial,
      status: newMaterial.quantity > newMaterial.minStock ? 'in-stock' : 
              newMaterial.quantity > 0 ? 'low-stock' : 'out-of-stock',
      lastOrdered: new Date().toISOString().split('T')[0],
    };

    const updatedMaterials = [...materials, materialData];
    updateDummyData(STORAGE_KEYS.MATERIALS, updatedMaterials);
    setMaterials(updatedMaterials);
    setOpenDialog(false);
    resetForm();
  };

  const handleEditMaterial = (material) => {
    setEditingMaterial(material);
    setNewMaterial({
      name: material.name,
      category: material.category,
      quantity: material.quantity,
      unit: material.unit,
      unitPrice: material.unitPrice,
      supplier: material.supplier,
      minStock: material.minStock,
      projectId: material.projectId,
    });
    setOpenDialog(true);
  };

  const handleUpdateMaterial = () => {
    const updatedMaterials = materials.map(material =>
      material.id === editingMaterial.id
        ? {
            ...material,
            ...newMaterial,
            status: newMaterial.quantity > newMaterial.minStock ? 'in-stock' : 
                    newMaterial.quantity > 0 ? 'low-stock' : 'out-of-stock',
          }
        : material
    );
    updateDummyData(STORAGE_KEYS.MATERIALS, updatedMaterials);
    setMaterials(updatedMaterials);
    setOpenDialog(false);
    resetForm();
    setEditingMaterial(null);
  };

  const handleDeleteMaterial = (id) => {
    const updatedMaterials = materials.filter(material => material.id !== id);
    updateDummyData(STORAGE_KEYS.MATERIALS, updatedMaterials);
    setMaterials(updatedMaterials);
  };

  const resetForm = () => {
    setNewMaterial({
      name: '',
      category: '',
      quantity: 0,
      unit: '',
      unitPrice: 0,
      supplier: '',
      minStock: 10,
      projectId: '1',
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

  const lowStockItems = materials.filter(m => m.status === 'low-stock' || m.status === 'out-of-stock');
  const totalInventoryValue = materials.reduce((sum, m) => sum + (m.quantity * m.unitPrice), 0);

  const MaterialRow = ({ material }) => (
    <TableRow hover>
      <TableCell>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <Inventory sx={{ color: 'primary.main' }} />
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
        <Typography variant="body2">
          ${material.unitPrice}
        </Typography>
      </TableCell>
      <TableCell>
        <Typography variant="body2" sx={{ fontWeight: 600 }}>
          ${(material.quantity * material.unitPrice).toLocaleString()}
        </Typography>
      </TableCell>
      <TableCell>
        <Typography variant="body2">
          {material.supplier}
        </Typography>
      </TableCell>
      <TableCell>
        <Box sx={{ display: 'flex', gap: 1 }}>
          <IconButton size="small" onClick={() => handleEditMaterial(material)}>
            <Edit />
          </IconButton>
          <IconButton size="small" color="error" onClick={() => handleDeleteMaterial(material.id)}>
            <Delete />
          </IconButton>
        </Box>
      </TableCell>
    </TableRow>
  );

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
        <Typography variant="h4" sx={{ fontWeight: 700 }}>
          Materials Management
        </Typography>
        <Button
          variant="contained"
          startIcon={<Add />}
          onClick={() => setOpenDialog(true)}
        >
          Add Material
        </Button>
      </Box>

      {lowStockItems.length > 0 && (
        <Alert severity="warning" sx={{ mb: 3 }}>
          {lowStockItems.length} items are running low on stock and need reordering.
        </Alert>
      )}

      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent sx={{ textAlign: 'center' }}>
              <Inventory sx={{ fontSize: 40, color: 'primary.main', mb: 1 }} />
              <Typography variant="h4" sx={{ fontWeight: 600 }}>
                {materials.length}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Total Items
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent sx={{ textAlign: 'center' }}>
              <AttachMoney sx={{ fontSize: 40, color: 'success.main', mb: 1 }} />
              <Typography variant="h4" sx={{ fontWeight: 600 }}>
                ${(totalInventoryValue / 1000).toFixed(1)}K
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Inventory Value
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
                Low Stock Items
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent sx={{ textAlign: 'center' }}>
              <LocalShipping sx={{ fontSize: 40, color: 'info.main', mb: 1 }} />
              <Typography variant="h4" sx={{ fontWeight: 600 }}>
                {suppliers.length}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Active Suppliers
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Paper sx={{ mb: 3 }}>
        <Tabs value={tabValue} onChange={(e, newValue) => setTabValue(newValue)}>
          <Tab label={`All Materials (${materials.length})`} />
          <Tab label={`In Stock (${materials.filter(m => m.status === 'in-stock').length})`} />
          <Tab label={`Low Stock (${materials.filter(m => m.status === 'low-stock').length})`} />
          <Tab label={`Out of Stock (${materials.filter(m => m.status === 'out-of-stock').length})`} />
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
                <TableCell>Unit Price</TableCell>
                <TableCell>Total Value</TableCell>
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

      {/* Other tab panels */}
      {[1, 2, 3].map((index) => (
        <TabPanel key={index} value={tabValue} index={index}>
          <TableContainer component={Paper} variant="outlined">
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Material</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell>Quantity</TableCell>
                  <TableCell>Unit Price</TableCell>
                  <TableCell>Total Value</TableCell>
                  <TableCell>Supplier</TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {materials
                  .filter(material => 
                    (index === 1 && material.status === 'in-stock') ||
                    (index === 2 && material.status === 'low-stock') ||
                    (index === 3 && material.status === 'out-of-stock')
                  )
                  .map((material) => (
                    <MaterialRow key={material.id} material={material} />
                  ))
                }
              </TableBody>
            </Table>
          </TableContainer>
        </TabPanel>
      ))}

      {/* Add/Edit Material Dialog */}
      <Dialog open={openDialog} onClose={() => setOpenDialog(false)} maxWidth="sm" fullWidth>
        <DialogTitle>
          <Typography variant="h6" sx={{ fontWeight: 600 }}>
            {editingMaterial ? 'Edit Material' : 'Add New Material'}
          </Typography>
        </DialogTitle>
        
        <DialogContent>
          <Grid container spacing={2} sx={{ mt: 1 }}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Material Name"
                value={newMaterial.name}
                onChange={(e) => setNewMaterial({...newMaterial, name: e.target.value})}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel>Category</InputLabel>
                <Select
                  value={newMaterial.category}
                  label="Category"
                  onChange={(e) => setNewMaterial({...newMaterial, category: e.target.value})}
                >
                  {materialCategories.map((category) => (
                    <MenuItem key={category} value={category}>{category}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Unit"
                value={newMaterial.unit}
                onChange={(e) => setNewMaterial({...newMaterial, unit: e.target.value})}
                placeholder="e.g., bags, tons, meters"
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Quantity"
                type="number"
                value={newMaterial.quantity}
                onChange={(e) => setNewMaterial({...newMaterial, quantity: parseFloat(e.target.value)})}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Minimum Stock"
                type="number"
                value={newMaterial.minStock}
                onChange={(e) => setNewMaterial({...newMaterial, minStock: parseFloat(e.target.value)})}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Unit Price"
                type="number"
                value={newMaterial.unitPrice}
                onChange={(e) => setNewMaterial({...newMaterial, unitPrice: parseFloat(e.target.value)})}
                InputProps={{ startAdornment: '$' }}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel>Supplier</InputLabel>
                <Select
                  value={newMaterial.supplier}
                  label="Supplier"
                  onChange={(e) => setNewMaterial({...newMaterial, supplier: e.target.value})}
                >
                  {suppliers.map((supplier) => (
                    <MenuItem key={supplier} value={supplier}>{supplier}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
          </Grid>
        </DialogContent>
        
        <DialogActions sx={{ p: 3 }}>
          <Button onClick={() => setOpenDialog(false)}>
            Cancel
          </Button>
          <Button
            variant="contained"
            onClick={editingMaterial ? handleUpdateMaterial : handleAddMaterial}
            disabled={!newMaterial.name || !newMaterial.category}
          >
            {editingMaterial ? 'Update Material' : 'Add Material'}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};