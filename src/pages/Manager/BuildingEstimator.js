// Updated BuildingEstimator.jsx (with bulk discounts, transportation & enhanced summary)
import React, { useState } from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  TextField,
  Button,
  Grid,
  Stepper,
  Step,
  StepLabel,
  Paper,
  Chip,
  Slider,
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
  Zoom,
  Fade,
  Grow,
  Slide,
  Collapse,
  CardMedia,
} from '@mui/material';
import {
  Add,
  Calculate,
  Save,
  Print,
  Download,
  AttachMoney,
  Timeline,
  ShowChart,
  Description,
  Build,
  People,
  Assessment,
  LocalShipping,
} from '@mui/icons-material';

const steps = ['Project Details', 'Material Costs', 'Transportation', 'Labor Costs', 'Summary'];

// const materialOptions = [
//   { id: 1, name: 'Concrete', unit: 'cubic yards', costRange: [120, 200] },
//   { id: 2, name: 'Steel Rebar', unit: 'tons', costRange: [800, 1200] },
//   { id: 3, name: 'Bricks', unit: 'thousand units', costRange: [450, 650] },
//   { id: 4, name: 'Lumber', unit: 'board feet', costRange: [2, 5] },
//   { id: 5, name: 'Electrical Wiring', unit: 'linear feet', costRange: [3, 8] },
//   { id: 6, name: 'Plumbing Pipes', unit: 'linear feet', costRange: [4, 12] },
// ];

const materialOptions = [
  {
    id: 1,
    name: 'Concrete',
    unit: 'cubic yards',
    costRange: [120, 200],
    image: 'https://www.cement.org/wp-content/uploads/2024/07/AdobeStock_123745217-e1721140501481.png'
  },
  {
    id: 2,
    name: 'Steel Rebar',
    unit: 'tons',
    costRange: [800, 1200],
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQwpmRpm8RSTXmzxXW9ZGsMngaWrZ8yBeuFHQ&s'
  },
  {
    id: 3,
    name: 'Bricks',
    unit: 'thousand units',
    costRange: [450, 650],
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRpx06RI1NmvUSfL-GSa5gsIQYi2mT9FRtrLQ&s'
  },
  {
    id: 4,
    name: 'Lumber',
    unit: 'board feet',
    costRange: [2, 5],
    image: 'https://media.istockphoto.com/id/527072689/photo/wooden-logs-with-forest-on-background.jpg?s=612x612&w=0&k=20&c=ws7VoKKpYq4qJi-1DemwpI9xxHOSR4Wfds_mVlm41OY='
  },
  {
    id: 5,
    name: 'Electrical Wiring',
    unit: 'linear feet',
    costRange: [3, 8],
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRIRJ4qZChX7ppCx1otAHxp-BPrG9RlPBuY9A&s'
  },
  {
    id: 6,
    name: 'Plumbing Pipes',
    unit: 'linear feet',
    costRange: [4, 12],
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTAFzAOJej67hP6F74mLj35Thurrw4bzbztqQ&s'
  },
];


export default function BuildingEstimator() {
  const [activeStep, setActiveStep] = useState(0);
  const [projectDetails, setProjectDetails] = useState({
    name: '',
    type: 'residential',
    area: '',
    floors: 1,
    location: '',
  });
  const [materials, setMaterials] = useState([]);
  const [laborCost, setLaborCost] = useState(50000);

  // Transportation state (new enhancement)
  const [transport, setTransport] = useState({
    vehicleType: 'Truck',
    trucks: 1,
    tripsPerTruck: 1,
    costPerTrip: 2000,
    distanceKm: 10,
  });

  const handleNext = () => {
    setActiveStep((prev) => Math.min(prev + 1, steps.length - 1));
  };

  const handleBack = () => {
    setActiveStep((prev) => Math.max(prev - 1, 0));
  };

  const addMaterial = (material) => {
    const newMaterial = {
      ...material,
      id: Date.now() + Math.floor(Math.random() * 1000),
      quantity: 1,
      unitCost: material.costRange[0],
    };
    setMaterials((s) => [...s, newMaterial]);
  };

  const updateMaterial = (id, field, value) => {
    setMaterials((s) =>
      s.map((m) =>
        m.id === id
          ? { ...m, [field]: value }
          : m
      )
    );
  };

  const removeMaterial = (id) => {
    setMaterials((s) => s.filter((m) => m.id !== id));
  };

  const calculateTotalCost = () => {
    const materialDiscountedSum = materials.reduce((sum, m) => {
      const actual = (m.quantity || 0) * (m.unitCost || 0);
      const discountPct = getBulkDiscount(m.quantity || 0);
      const discounted = actual * (1 - discountPct / 100);
      return sum + discounted;
    }, 0);
    const transportTotal = calcTransportTotal();
    return materialDiscountedSum + laborCost + transportTotal;
  };

  const getStepIcon = (step) => {
    const icons = [<Description />, <Build />, <LocalShipping />, <People />, <Assessment />];
    return icons[step];
  };

  // Bulk discount rule: tiered
  function getBulkDiscount(quantity) {
    const q = Number(quantity) || 0;
    if (q > 100) return 15; // 15% discount for very large bulk
    if (q > 50) return 10;  // 10% discount
    if (q > 20) return 5;   // 5% discount for >20 units
    return 0;
  }

  // Transportation total calc
  function calcTransportTotal() {
    const trucks = Number(transport.trucks) || 0;
    const trips = Number(transport.tripsPerTruck) || 0;
    const cost = Number(transport.costPerTrip) || 0;
    return trucks * trips * cost;
  }

  const getStepContent = (step) => {
    switch (step) {
      case 0:
        return (
          <Fade in={true} timeout={800}>
            <Box>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 4 }}>
                <Box
                  sx={{
                    p: 2,
                    borderRadius: 2,
                    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    animation: 'pulse 2s ease-in-out infinite',
                    '@keyframes pulse': {
                      '0%, 100%': { transform: 'scale(1)' },
                      '50%': { transform: 'scale(1.05)' },
                    },
                  }}
                >
                  <Description sx={{ color: 'white', fontSize: 32 }} />
                </Box>
                <Typography variant="h5" sx={{ fontWeight: 700, color: '#2d3748' }}>
                  Project Information
                </Typography>
              </Box>
              <Grid container spacing={3}>
                {[
                  { label: 'Project Name', field: 'name', type: 'text', md: 6 },
                  { label: 'Building Type', field: 'type', type: 'select', md: 6 },
                  { label: 'Total Area (sq ft)', field: 'area', type: 'number', md: 6 },
                  { label: 'Number of Floors', field: 'floors', type: 'number', md: 6 },
                  { label: 'Location', field: 'location', type: 'text', md: 12 },
                ].map((item, index) => (
                  <Grow
                    in={true}
                    timeout={800 + index * 200}
                    key={item.field}
                  >
                    <Grid item xs={12} md={item.md}>
                      {item.type === 'select' ? (
                        <FormControl fullWidth>
                          <InputLabel>{item.label}</InputLabel>
                          <Select
                            value={projectDetails[item.field]}
                            label={item.label}
                            onChange={(e) => setProjectDetails({ ...projectDetails, [item.field]: e.target.value })}
                            sx={{
                              '& .MuiOutlinedInput-notchedOutline': {
                                borderWidth: 2,
                                transition: 'all 0.3s ease',
                              },
                              '&:hover .MuiOutlinedInput-notchedOutline': {
                                borderColor: '#667eea',
                              },
                              '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                                borderColor: '#667eea',
                              },
                            }}
                          >
                            <MenuItem value="residential">Residential</MenuItem>
                            <MenuItem value="commercial">Commercial</MenuItem>
                            <MenuItem value="industrial">Industrial</MenuItem>
                          </Select>
                        </FormControl>
                      ) : (
                        <TextField
                          fullWidth
                          label={item.label}
                          type={item.type}
                          value={projectDetails[item.field]}
                          onChange={(e) => setProjectDetails({ ...projectDetails, [item.field]: e.target.value })}
                          variant="outlined"
                          sx={{
                            '& .MuiOutlinedInput-root': {
                              transition: 'all 0.3s ease',
                              '& fieldset': {
                                borderWidth: 2,
                              },
                              '&:hover fieldset': {
                                borderColor: '#667eea',
                              },
                              '&.Mui-focused fieldset': {
                                borderColor: '#667eea',
                              },
                            },
                          }}
                        />
                      )}
                    </Grid>
                  </Grow>
                ))}
              </Grid>
            </Box>
          </Fade>
        );

      case 1:
        return (
          <Fade in={true} timeout={800}>
            <Box>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                  <Box
                    sx={{
                      p: 2,
                      borderRadius: 2,
                      background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      animation: 'pulse 2s ease-in-out infinite',
                      '@keyframes pulse': {
                        '0%, 100%': { transform: 'scale(1)' },
                        '50%': { transform: 'scale(1.05)' },
                      },
                    }}
                  >
                    <Build sx={{ color: 'white', fontSize: 32 }} />
                  </Box>
                  <Typography variant="h5" sx={{ fontWeight: 700, color: '#2d3748' }}>
                    Material Costs
                  </Typography>
                </Box>
                <Button
                  startIcon={<Add />}
                  variant="contained"
                  onClick={() => setMaterials([...materials, {
                    id: Date.now(),
                    name: 'New Material',
                    unit: 'units',
                    quantity: 1,
                    unitCost: 0
                  }])}
                  sx={{
                    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                    px: 3,
                    py: 1.5,
                    borderRadius: 2,
                    textTransform: 'none',
                    fontWeight: 600,
                    boxShadow: '0 4px 14px 0 rgba(102, 126, 234, 0.4)',
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      transform: 'translateY(-2px)',
                      boxShadow: '0 6px 20px 0 rgba(102, 126, 234, 0.6)',
                    },
                  }}
                >
                  Add Custom
                </Button>
              </Box>

              <Grid container spacing={3} sx={{ mb: 4 }}>
                {materialOptions.map((material, index) => (
                  <Grid item xs={12} sm={6} md={4} key={material.id}>
                    <Grow in={true} timeout={600 + index * 100}>
                      <Card
                        variant="outlined"
                        sx={{
                          cursor: 'pointer',
                          position: 'relative',
                          overflow: 'hidden',
                          borderWidth: 2,
                          borderColor: 'transparent',
                          transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                          '&::before': {
                            content: '""',
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            right: 0,
                            bottom: 0,
                            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                            opacity: 0,
                            transition: 'opacity 0.4s ease',
                          },
                          '&:hover': {
                            transform: 'translateY(-8px) scale(1.02)',
                            boxShadow: '0 12px 24px rgba(102, 126, 234, 0.3)',
                            borderColor: '#667eea',
                            '&::before': {
                              opacity: 0.05,
                            },
                          },
                        }}
                        onClick={() => addMaterial(material)}
                      >
                        {/* Material Image */}
                        <CardMedia
                          component="img"
                          height="100"
                          width="90"
                          image={material.image}
                          alt={material.name}
                          sx={{
                            objectFit: 'cover',
                            transition: 'transform 0.6s ease',
                            '&:hover': { transform: 'scale(1.08)' },
                          }}
                        />

                        <CardContent sx={{ textAlign: 'center', p: 3, position: 'relative', zIndex: 1 }}>
                          <Typography
                            variant="h6"
                            sx={{ fontWeight: 700, mb: 1, color: '#2d3748' }}
                          >
                            {material.name}
                          </Typography>
                          <Chip
                            label={`$${material.costRange[0]} - $${material.costRange[1]}`}
                            size="small"
                            sx={{
                              fontWeight: 600,
                              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                              color: 'white',
                              mb: 0.5,
                            }}
                          />
                          <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                            per {material.unit}
                          </Typography>
                        </CardContent>
                      </Card>
                    </Grow>
                  </Grid>
                ))}
              </Grid>


              <Collapse in={materials.length > 0}>
                <Slide direction="up" in={materials.length > 0} timeout={500}>
                  <TableContainer
                    component={Paper}
                    variant="outlined"
                    sx={{
                      borderRadius: 3,
                      borderWidth: 2,
                      overflow: 'hidden',
                      boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
                    }}
                  >
                    <Table>
                      <TableHead>
                        <TableRow sx={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' }}>
                          <TableCell sx={{ color: 'white', fontWeight: 700, fontSize: 16 }}>Material</TableCell>
                          <TableCell sx={{ color: 'white', fontWeight: 700, fontSize: 16 }}>Quantity</TableCell>
                          <TableCell sx={{ color: 'white', fontWeight: 700, fontSize: 16 }}>Unit Cost</TableCell>
                          <TableCell sx={{ color: 'white', fontWeight: 700, fontSize: 16 }}>Actual Total</TableCell>
                          <TableCell sx={{ color: 'white', fontWeight: 700, fontSize: 16 }}>Discount %</TableCell>
                          <TableCell sx={{ color: 'white', fontWeight: 700, fontSize: 16 }}>Discounted Total</TableCell>
                          <TableCell sx={{ color: 'white', fontWeight: 700, fontSize: 16 }}>Actions</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {materials.map((material, index) => {
                          const qty = Number(material.quantity) || 0;
                          const unitCost = Number(material.unitCost) || 0;
                          const actualTotal = qty * unitCost;
                          const discountPct = getBulkDiscount(qty);
                          const discountedTotal = actualTotal * (1 - discountPct / 100);
                          const savings = actualTotal - discountedTotal;

                          return (
                            <Fade in={true} timeout={300 + index * 100} key={material.id}>
                              <TableRow
                                sx={{
                                  transition: 'all 0.3s ease',
                                  '&:hover': {
                                    backgroundColor: 'rgba(102, 126, 234, 0.05)',
                                    transform: 'scale(1.01)',
                                  },
                                }}
                              >
                                <TableCell>
                                  <TextField
                                    value={material.name}
                                    onChange={(e) => updateMaterial(material.id, 'name', e.target.value)}
                                    size="small"
                                    sx={{
                                      '& .MuiOutlinedInput-root': {
                                        transition: 'all 0.3s ease',
                                        '&:hover fieldset': {
                                          borderColor: '#667eea',
                                        },
                                      },
                                    }}
                                  />
                                </TableCell>
                                <TableCell>
                                  <TextField
                                    type="number"
                                    value={material.quantity}
                                    onChange={(e) => updateMaterial(material.id, 'quantity', Number(e.target.value))}
                                    size="small"
                                    sx={{
                                      width: 100,
                                      '& .MuiOutlinedInput-root': {
                                        transition: 'all 0.3s ease',
                                        '&:hover fieldset': {
                                          borderColor: '#667eea',
                                        },
                                      },
                                    }}
                                  />
                                </TableCell>
                                <TableCell>
                                  <TextField
                                    type="number"
                                    value={material.unitCost}
                                    onChange={(e) => updateMaterial(material.id, 'unitCost', Number(e.target.value))}
                                    size="small"
                                    sx={{
                                      width: 120,
                                      '& .MuiOutlinedInput-root': {
                                        transition: 'all 0.3s ease',
                                        '&:hover fieldset': {
                                          borderColor: '#667eea',
                                        },
                                      },
                                    }}
                                    InputProps={{
                                      startAdornment: <AttachMoney sx={{ fontSize: 16, mr: 0.5, color: '#667eea' }} />
                                    }}
                                  />
                                </TableCell>

                                {/* Actual Total */}
                                <TableCell>
                                  <Typography
                                    variant="body1"
                                    sx={{
                                      fontWeight: 700,
                                      color: '#667eea',
                                      fontSize: 16,
                                    }}
                                  >
                                    ${actualTotal.toLocaleString()}
                                  </Typography>
                                </TableCell>

                                {/* Discount % */}
                                <TableCell>
                                  <Typography variant="body2" sx={{ fontWeight: 700, color: discountPct > 0 ? '#16a34a' : 'text.secondary' }}>
                                    {discountPct}%
                                  </Typography>
                                  {savings > 0 && (
                                    <Typography variant="caption" color="text.secondary" display="block">
                                      save ${Math.round(savings).toLocaleString()}
                                    </Typography>
                                  )}
                                </TableCell>

                                {/* Discounted Total (final for this item) */}
                                <TableCell>
                                  <Typography variant="body1" sx={{ fontWeight: 800, color: '#059669' }}>
                                    ${Math.round(discountedTotal).toLocaleString()}
                                  </Typography>
                                </TableCell>

                                <TableCell>
                                  <IconButton
                                    size="small"
                                    onClick={() => removeMaterial(material.id)}
                                    sx={{
                                      color: '#f5576c',
                                      transition: 'all 0.3s ease',
                                      '&:hover': {
                                        transform: 'rotate(90deg) scale(1.2)',
                                        backgroundColor: 'rgba(245, 87, 108, 0.1)',
                                      },
                                    }}
                                  >
                                    <Add sx={{ transform: 'rotate(45deg)' }} />
                                  </IconButton>
                                </TableCell>
                              </TableRow>
                            </Fade>
                          );
                        })}
                      </TableBody>
                    </Table>
                  </TableContainer>
                </Slide>
              </Collapse>
            </Box>
          </Fade>
        );

      case 2:
        // Transportation step
        return (
          <Fade in={true} timeout={800}>
            <Box>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 4 }}>
                <Box
                  sx={{
                    p: 2,
                    borderRadius: 2,
                    background: 'linear-gradient(135deg, #ff9a9e 0%, #fecfef 100%)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    animation: 'pulse 2s ease-in-out infinite',
                  }}
                >
                  <LocalShipping sx={{ color: 'white', fontSize: 32 }} />
                </Box>
                <Typography variant="h5" sx={{ fontWeight: 700, color: '#2d3748' }}>
                  Transportation Costs
                </Typography>
              </Box>

              <Card sx={{ p: 3, mb: 3, borderRadius: 3 }}>
                <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
                  <FormControl sx={{ minWidth: 200 }}>
                    <InputLabel>Vehicle Type</InputLabel>
                    <Select
                      value={transport.vehicleType}
                      label="Vehicle Type"
                      onChange={(e) => setTransport((t) => ({ ...t, vehicleType: e.target.value }))}
                    >
                      <MenuItem value="Truck">Truck</MenuItem>
                      <MenuItem value="Trailer">Trailer</MenuItem>
                      <MenuItem value="Van">Van</MenuItem>
                    </Select>
                  </FormControl>

                  <TextField
                    label="Number of Trucks"
                    type="number"
                    value={transport.trucks}
                    onChange={(e) => setTransport((t) => ({ ...t, trucks: Number(e.target.value) }))}
                    sx={{ width: 160 }}
                  />
                  <TextField
                    label="Trips per Truck"
                    type="number"
                    value={transport.tripsPerTruck}
                    onChange={(e) => setTransport((t) => ({ ...t, tripsPerTruck: Number(e.target.value) }))}
                    sx={{ width: 160 }}
                  />
                  <TextField
                    label="Cost per Trip (INR)"
                    type="number"
                    value={transport.costPerTrip}
                    onChange={(e) => setTransport((t) => ({ ...t, costPerTrip: Number(e.target.value) }))}
                    sx={{ width: 200 }}
                    InputProps={{ startAdornment: <AttachMoney sx={{ ml: 1 }} /> }}
                  />
                  <TextField
                    label="Distance (km)"
                    type="number"
                    value={transport.distanceKm}
                    onChange={(e) => setTransport((t) => ({ ...t, distanceKm: Number(e.target.value) }))}
                    sx={{ width: 160 }}
                  />
                </Box>

                <Box sx={{ mt: 3, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <Box>
                    <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>Estimated Transport Total</Typography>
                    <Typography variant="h6" sx={{ fontWeight: 800, color: '#059669' }}>
                      ${calcTransportTotal().toLocaleString()}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">Includes trips × cost per trip</Typography>
                  </Box>

                  <Box>
                    <Button
                      variant="contained"
                      onClick={() => {
                        // small UX flourish: bump trips to simulate recalculation
                        setTransport((t) => ({ ...t, tripsPerTruck: Math.max(1, t.tripsPerTruck) }));
                      }}
                      sx={{ background: 'linear-gradient(135deg,#667eea 0%,#764ba2 100%)' }}
                    >
                      Recalculate
                    </Button>
                  </Box>
                </Box>
              </Card>
            </Box>
          </Fade>
        );

      case 3:
        return (
          <Fade in={true} timeout={800}>
            <Box>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 4 }}>
                <Box
                  sx={{
                    p: 2,
                    borderRadius: 2,
                    background: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    animation: 'pulse 2s ease-in-out infinite',
                  }}
                >
                  <People sx={{ color: 'white', fontSize: 32 }} />
                </Box>
                <Typography variant="h5" sx={{ fontWeight: 700, color: '#2d3748' }}>
                  Labor Costs
                </Typography>
              </Box>
              <Grow in={true} timeout={800}>
                <Card
                  sx={{
                    p: 4,
                    mb: 3,
                    borderRadius: 3,
                    boxShadow: '0 8px 32px rgba(0,0,0,0.1)',
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      boxShadow: '0 12px 48px rgba(0,0,0,0.15)',
                    },
                  }}
                >
                  <Box sx={{ mb: 4 }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                      <Typography variant="h6" sx={{ fontWeight: 700, color: '#2d3748' }}>
                        Estimated Labor Cost
                      </Typography>
                      <Chip
                        label={`$${laborCost.toLocaleString()}`}
                        sx={{
                          fontWeight: 700,
                          fontSize: 18,
                          px: 2,
                          py: 3,
                          background: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
                          color: 'white',
                        }}
                      />
                    </Box>
                    <Slider
                      value={laborCost}
                      onChange={(e, newValue) => setLaborCost(newValue)}
                      min={10000}
                      max={200000}
                      step={5000}
                      valueLabelDisplay="auto"
                      valueLabelFormat={(value) => `$${value.toLocaleString()}`}
                      sx={{
                        height: 8,
                        '& .MuiSlider-thumb': {
                          width: 24,
                          height: 24,
                          background: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
                          boxShadow: '0 4px 12px rgba(79, 172, 254, 0.4)',
                          transition: 'all 0.3s ease',
                        },
                        '& .MuiSlider-track': {
                          background: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
                          border: 'none',
                        },
                        '& .MuiSlider-rail': {
                          opacity: 0.2,
                        },
                      }}
                    />
                  </Box>
                  <Grid container spacing={3}>
                    {[
                      { label: 'Crew Size', defaultValue: 15 },
                      { label: 'Project Duration (months)', defaultValue: 12 },
                    ].map((item, index) => (
                      <Grow in={true} timeout={1000 + index * 200} key={item.label}>
                        <Grid item xs={12} sm={6}>
                          <TextField
                            fullWidth
                            label={item.label}
                            type="number"
                            defaultValue={item.defaultValue}
                            sx={{
                              '& .MuiOutlinedInput-root': {
                                transition: 'all 0.3s ease',
                                '& fieldset': {
                                  borderWidth: 2,
                                },
                                '&:hover fieldset': {
                                  borderColor: '#4facfe',
                                },
                                '&.Mui-focused fieldset': {
                                  borderColor: '#4facfe',
                                },
                              },
                            }}
                          />
                        </Grid>
                      </Grow>
                    ))}
                  </Grid>
                </Card>
              </Grow>
            </Box>
          </Fade>
        );

      case 4:
        // Cost Summary — updated to include discounted totals, transport, savings, cost per sqft, banner
        // compute material totals
        const materialTotals = materials.reduce((acc, m) => {
          const qty = Number(m.quantity) || 0;
          const unitCost = Number(m.unitCost) || 0;
          const actual = qty * unitCost;
          const discountPct = getBulkDiscount(qty);
          const discounted = actual * (1 - discountPct / 100);
          acc.actual += actual;
          acc.discounted += discounted;
          acc.savings += (actual - discounted);
          return acc;
        }, { actual: 0, discounted: 0, savings: 0 });

        const transportTotal = calcTransportTotal();
        const grandTotal = Math.round(materialTotals.discounted + Number(laborCost || 0) + transportTotal);
        const costPerSqFt = projectDetails.area ? (grandTotal / Number(projectDetails.area || 1)) : 0;

        return (
          <Fade in={true} timeout={800}>
            <Box>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 4 }}>
                <Box
                  sx={{
                    p: 2,
                    borderRadius: 2,
                    background: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    animation: 'pulse 2s ease-in-out infinite',
                  }}
                >
                  <Assessment sx={{ color: 'white', fontSize: 32 }} />
                </Box>
                <Typography variant="h5" sx={{ fontWeight: 700, color: '#2d3748' }}>
                  Cost Summary
                </Typography>
              </Box>

              <Grid container spacing={3}>
                <Grid item xs={12} md={8}>
                  <Grow in={true} timeout={800}>
                    <Card
                      sx={{
                        p: 4,
                        borderRadius: 3,
                        background: 'linear-gradient(135deg, rgba(102, 126, 234, 0.05) 0%, rgba(118, 75, 162, 0.05) 100%)',
                        boxShadow: '0 8px 32px rgba(0,0,0,0.1)',
                        transition: 'all 0.3s ease',
                        '&:hover': {
                          boxShadow: '0 12px 48px rgba(0,0,0,0.15)',
                          transform: 'translateY(-4px)',
                        },
                      }}
                    >
                      <Typography variant="h4" sx={{ fontWeight: 700, color: '#667eea', mb: 1 }}>
                        {projectDetails.name || 'Untitled Project'}
                      </Typography>
                      <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', mb: 3 }}>
                        <Chip label={projectDetails.type} sx={{ fontWeight: 600, textTransform: 'capitalize', background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', color: 'white' }} />
                        <Chip label={`${projectDetails.area} sq ft`} sx={{ fontWeight: 600, background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)', color: 'white' }} />
                        <Chip label={`${projectDetails.floors} floors`} sx={{ fontWeight: 600, background: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)', color: 'white' }} />
                      </Box>

                      <Box sx={{ mt: 4 }}>
                        {[
                          { label: 'Material Actual Total:', value: Math.round(materialTotals.actual), gradient: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)' },
                          { label: 'Material Discounted Total:', value: Math.round(materialTotals.discounted), gradient: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)' },
                          { label: 'Total Labor Costs:', value: Math.round(laborCost), gradient: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)' },
                          { label: 'Transportation Costs:', value: Math.round(transportTotal), gradient: 'linear-gradient(135deg, #ffd89b 0%, #19547b 100%)' },
                        ].map((item, index) => (
                          <Slide direction="right" in={true} timeout={800 + index * 200} key={item.label}>
                            <Box
                              sx={{
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                                mb: 2,
                                p: 2,
                                borderRadius: 2,
                                transition: 'all 0.3s ease',
                                '&:hover': {
                                  background: 'rgba(102, 126, 234, 0.05)',
                                  transform: 'translateX(8px)',
                                },
                              }}
                            >
                              <Typography variant="h6" sx={{ fontWeight: 600 }}>
                                {item.label}
                              </Typography>
                              <Typography
                                variant="h6"
                                sx={{
                                  fontWeight: 700,
                                  background: item.gradient,
                                  WebkitBackgroundClip: 'text',
                                  WebkitTextFillColor: 'transparent',
                                }}
                              >
                                ${item.value.toLocaleString()}
                              </Typography>
                            </Box>
                          </Slide>
                        ))}

                        <Zoom in={true} timeout={1200}>
                          <Box
                            sx={{
                              display: 'flex',
                              justifyContent: 'space-between',
                              alignItems: 'center',
                              pt: 3,
                              mt: 3,
                              borderTop: 3,
                              borderColor: '#667eea',
                              borderRadius: 1,
                              p: 3,
                              background: 'linear-gradient(135deg, rgba(102, 126, 234, 0.1) 0%, rgba(118, 75, 162, 0.1) 100%)',
                            }}
                          >
                            <Box>
                              <Typography variant="h6" sx={{ fontWeight: 700 }}>Total Estimated Cost:</Typography>
                              <Typography variant="body2" color="text.secondary">(Uses discounted material totals)</Typography>
                            </Box>
                            <Box textAlign="right">
                              <Typography variant="h4" sx={{ fontWeight: 800 }}>
                                ${grandTotal.toLocaleString()}
                              </Typography>
                              <Typography variant="caption" color="text.secondary">Cost per sq ft: {projectDetails.area ? `$${costPerSqFt.toFixed(2)}` : 'N/A'}</Typography>
                            </Box>
                          </Box>
                        </Zoom>

                        <Box sx={{ mt: 2, p: 2 }}>
                          <Typography variant="subtitle2" sx={{ fontWeight: 700 }}>Total Savings from Bulk Purchases</Typography>
                          <Typography variant="h6" sx={{ color: '#16a34a', fontWeight: 800 }}>${Math.round(materialTotals.savings).toLocaleString()}</Typography>
                        </Box>

                        {/* Highlighted green banner: Best Auction Price at this Range */}
                        <Box sx={{ mt: 3, p: 2, borderRadius: 2, background: 'linear-gradient(90deg, rgba(16,185,129,0.12), rgba(16,185,129,0.06))', border: '1px solid rgba(16,185,129,0.18)' }}>
                          <Typography variant="h6" sx={{ fontWeight: 800, color: '#059669' }}>
                            Best Auction Price at this Range
                          </Typography>
                          <Typography variant="body1" sx={{ fontWeight: 700, color: '#059669', mt: 1 }}>
                            ${Math.round(materialTotals.discounted).toLocaleString()} (total discounted material amount)
                          </Typography>
                        </Box>
                      </Box>
                    </Card>
                  </Grow>
                </Grid>

                <Grid item xs={12} md={4}>
                  <Grow in={true} timeout={1000}>
                    <Card
                      sx={{
                        p: 4,
                        textAlign: 'center',
                        borderRadius: 3,
                        boxShadow: '0 8px 32px rgba(0,0,0,0.1)',
                        transition: 'all 0.3s ease',
                        '&:hover': {
                          boxShadow: '0 12px 48px rgba(0,0,0,0.15)',
                          transform: 'translateY(-4px)',
                        },
                      }}
                    >
                      <Box
                        sx={{
                          width: 80,
                          height: 80,
                          margin: '0 auto',
                          mb: 3,
                          borderRadius: '50%',
                          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          animation: 'rotate 3s linear infinite',
                          '@keyframes rotate': {
                            '0%': { transform: 'rotate(0deg)' },
                            '100%': { transform: 'rotate(360deg)' },
                          },
                        }}
                      >
                        <ShowChart sx={{ fontSize: 48, color: 'white' }} />
                      </Box>
                      <Typography variant="h5" sx={{ fontWeight: 700, mb: 3 }}>
                        Cost Breakdown
                      </Typography>

                      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                        <Box sx={{ p: 2, borderRadius: 2, background: 'linear-gradient(135deg, rgba(240,147,251,0.1), rgba(245,87,108,0.1))', border: '2px solid #f093fb' }}>
                          <Typography variant="body2" color="text.secondary" sx={{ mb: 0.5 }}>Material (discounted)</Typography>
                          <Typography variant="h6" sx={{ fontWeight: 700, color: '#f5576c' }}>${Math.round(materialTotals.discounted).toLocaleString()}</Typography>
                        </Box>

                        <Box sx={{ p: 2, borderRadius: 2, background: 'linear-gradient(135deg, rgba(79,172,254,0.1), rgba(0,242,254,0.1))', border: '2px solid #4facfe' }}>
                          <Typography variant="body2" color="text.secondary" sx={{ mb: 0.5 }}>Labor</Typography>
                          <Typography variant="h6" sx={{ fontWeight: 700, color: '#4facfe' }}>${Math.round(laborCost).toLocaleString()}</Typography>
                        </Box>

                        <Box sx={{ p: 2, borderRadius: 2, background: 'linear-gradient(135deg, rgba(200,255,200,0.07), rgba(200,255,200,0.03))', border: '2px solid rgba(16,185,129,0.18)' }}>
                          <Typography variant="body2" color="text.secondary" sx={{ mb: 0.5 }}>Transportation</Typography>
                          <Typography variant="h6" sx={{ fontWeight: 700, color: '#059669' }}>${Math.round(transportTotal).toLocaleString()}</Typography>
                        </Box>

                        <Box sx={{ mt: 1 }}>
                          <Button startIcon={<Download />} variant="outlined" fullWidth>Export Summary</Button>
                          <Button startIcon={<Print />} variant="contained" fullWidth sx={{ mt: 1, background: 'linear-gradient(135deg,#667eea 0%,#764ba2 100%)' }}>Print</Button>
                        </Box>
                      </Box>
                    </Card>
                  </Grow>
                </Grid>
              </Grid>
            </Box>
          </Fade>
        );

      default:
        return 'Unknown step';
    }
  };

  return (
    <Box sx={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',
      p: 4,
    }}>
      <Box sx={{ maxWidth: 1400, margin: '0 auto' }}>
        <Slide direction="down" in={true} timeout={600}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
            <Box>
              <Typography
                variant="h3"
                sx={{
                  fontWeight: 800,
                  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  mb: 1,
                }}
              >
                Building Estimator
              </Typography>
              <Typography variant="body1" color="text.secondary" sx={{ fontWeight: 500 }}>
                Create detailed construction cost estimates with ease
              </Typography>
            </Box>
            <Box sx={{ display: 'flex', gap: 2 }}>
              {[
                { icon: <Save />, label: 'Save Estimate', gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' },
                { icon: <Print />, label: 'Print', gradient: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)' },
                { icon: <Download />, label: 'Export PDF', gradient: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)' },
              ].map((btn, index) => (
                <Zoom in={true} timeout={800 + index * 200} key={btn.label}>
                  <Button
                    startIcon={btn.icon}
                    variant="contained"
                    sx={{
                      background: btn.gradient,
                      px: 3,
                      py: 1.5,
                      borderRadius: 2,
                      textTransform: 'none',
                      fontWeight: 600,
                      boxShadow: '0 4px 14px 0 rgba(0,0,0,0.2)',
                      transition: 'all 0.3s ease',
                      '&:hover': {
                        transform: 'translateY(-2px)',
                        boxShadow: '0 6px 20px 0 rgba(0,0,0,0.3)',
                      },
                    }}
                  >
                    {btn.label}
                  </Button>
                </Zoom>
              ))}
            </Box>
          </Box>
        </Slide>

        <Fade in={true} timeout={800}>
          <Box sx={{ mb: 4 }}>
            <Stepper
              activeStep={activeStep}
              sx={{
                background: 'white',
                p: 3,
                borderRadius: 3,
                boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
                '& .MuiStepLabel-root .Mui-completed': {
                  color: '#667eea',
                },
                '& .MuiStepLabel-root .Mui-active': {
                  color: '#667eea',
                },
                '& .MuiStepConnector-line': {
                  borderTopWidth: 3,
                },
                '& .Mui-completed .MuiStepConnector-line': {
                  borderColor: '#667eea',
                },
              }}
            >
              {steps.map((label, index) => (
                <Step key={label}>
                  <StepLabel
                    StepIconComponent={() => (
                      <Box
                        sx={{
                          width: 40,
                          height: 40,
                          borderRadius: '50%',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          background: activeStep >= index
                            ? 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
                            : '#e2e8f0',
                          color: activeStep >= index ? 'white' : '#94a3b8',
                          transition: 'all 0.3s ease',
                          transform: activeStep === index ? 'scale(1.1)' : 'scale(1)',
                          boxShadow: activeStep === index ? '0 4px 12px rgba(102, 126, 234, 0.4)' : 'none',
                        }}
                      >
                        {getStepIcon(index)}
                      </Box>
                    )}
                  >
                    <Typography
                      sx={{
                        fontWeight: activeStep === index ? 700 : 500,
                        color: activeStep >= index ? '#2d3748' : '#94a3b8',
                        transition: 'all 0.3s ease',
                      }}
                    >
                      {label}
                    </Typography>
                  </StepLabel>
                </Step>
              ))}
            </Stepper>
          </Box>
        </Fade>

        <Slide direction="up" in={true} timeout={800}>
          <Paper
            sx={{
              p: 4,
              mb: 3,
              borderRadius: 3,
              boxShadow: '0 8px 32px rgba(0,0,0,0.12)',
              background: 'white',
            }}
          >
            {getStepContent(activeStep)}
          </Paper>
        </Slide>

        <Fade in={true} timeout={1000}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Button
              disabled={activeStep === 0}
              onClick={handleBack}
              variant="outlined"
              sx={{
                px: 4,
                py: 1.5,
                borderRadius: 2,
                borderWidth: 2,
                textTransform: 'none',
                fontWeight: 600,
                transition: 'all 0.3s ease',
                '&:hover': {
                  borderWidth: 2,
                  transform: 'translateX(-4px)',
                },
                '&:disabled': {
                  opacity: 0.5,
                },
              }}
            >
              Back
            </Button>
            <Button
              variant="contained"
              onClick={handleNext}
              endIcon={activeStep === steps.length - 1 ? <Calculate /> : <Add />}
              sx={{
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                px: 4,
                py: 1.5,
                borderRadius: 2,
                textTransform: 'none',
                fontWeight: 600,
                boxShadow: '0 4px 14px 0 rgba(102, 126, 234, 0.4)',
                transition: 'all 0.3s ease',
                '&:hover': {
                  transform: 'translateX(4px)',
                  boxShadow: '0 6px 20px 0 rgba(102, 126, 234, 0.6)',
                },
              }}
            >
              {activeStep === steps.length - 1 ? 'Calculate Total' : 'Next'}
            </Button>
          </Box>
        </Fade>

        <Zoom in={activeStep === steps.length - 1}>
          <Fab
            color="secondary"
            sx={{
              position: 'fixed',
              bottom: 32,
              right: 32,
              width: 64,
              height: 64,
              background: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)',
              boxShadow: '0 8px 24px rgba(250, 112, 154, 0.4)',
              transition: 'all 0.3s ease',
              '&:hover': {
                transform: 'scale(1.1) rotate(15deg)',
                boxShadow: '0 12px 32px rgba(250, 112, 154, 0.6)',
              },
            }}
            onClick={() => {/* Save estimate logic */ }}
          >
            <Save sx={{ fontSize: 28 }} />
          </Fab>
        </Zoom>
      </Box>
    </Box>
  );
}
