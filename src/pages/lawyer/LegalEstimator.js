import React, { useState } from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  TextField,
  Slider,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
  Grid,
  Chip,
  Paper,
  Stepper,
  Step,
  StepLabel,
  StepContent,
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Alert,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Fade,
  Grow,
  Slide,
  Zoom,
  Collapse
} from '@mui/material';
import {
  Calculate as CalculateIcon,
  AttachMoney as MoneyIcon,
  Schedule as TimeIcon,
  Description as DocumentIcon,
  Save as SaveIcon,
  Share as ShareIcon,
  History as HistoryIcon,
  Info as InfoIcon,
  Add as AddIcon,
  Close as CloseIcon,
  CheckCircle as CheckIcon
} from '@mui/icons-material';

const LegalEstimator = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [documentType, setDocumentType] = useState('');
  const [complexity, setComplexity] = useState(3);
  const [urgency, setUrgency] = useState('standard');
  const [clientType, setClientType] = useState('new');
  const [additionalServices, setAdditionalServices] = useState([]);
  const [estimatedCost, setEstimatedCost] = useState(null);
  const [breakdown, setBreakdown] = useState({});
  const [savedEstimates, setSavedEstimates] = useState([]);
  const [openHistory, setOpenHistory] = useState(false);

  const documentTypes = [
    { value: 'Partnership Agreement', baseCost: 1500, category: 'Business', time: '5-7 days' },
    { value: 'Lease Agreement', baseCost: 800, category: 'Real Estate', time: '3-5 days' },
    { value: 'Employment Contract', baseCost: 600, category: 'Employment', time: '2-4 days' },
    { value: 'Purchase Agreement', baseCost: 1000, category: 'Business', time: '4-6 days' },
    { value: 'NDA', baseCost: 400, category: 'General', time: '1-2 days' },
    { value: 'Service Agreement', baseCost: 900, category: 'Business', time: '3-5 days' },
    { value: 'Shareholders Agreement', baseCost: 2000, category: 'Corporate', time: '7-10 days' },
    { value: 'Licensing Agreement', baseCost: 1200, category: 'Intellectual Property', time: '5-7 days' }
  ];

  const additionalServicesList = [
    { id: 'review', name: 'Document Review', cost: 200 },
    { id: 'negotiation', name: 'Contract Negotiation', cost: 300 },
    { id: 'filing', name: 'Legal Filing', cost: 150 },
    { id: 'consultation', name: 'Extended Consultation', cost: 250 },
    { id: 'compliance', name: 'Compliance Check', cost: 350 }
  ];

  const calculateCost = () => {
    const selectedDoc = documentTypes.find(doc => doc.value === documentType);
    if (!selectedDoc) return;

    const complexityMultiplier = 0.8 + (complexity * 0.2);
    
    const urgencyMultipliers = {
      'standard': 1.0,
      'express': 1.5,
      'urgent': 2.0
    };

    const clientMultipliers = {
      'new': 1.0,
      'returning': 0.9,
      'corporate': 0.85
    };

    const baseCost = selectedDoc.baseCost;
    const complexityCost = baseCost * complexityMultiplier;
    const urgencyCost = complexityCost * urgencyMultipliers[urgency];
    const clientAdjustedCost = urgencyCost * clientMultipliers[clientType];
    
    const additionalCost = additionalServices.reduce((total, serviceId) => {
      const service = additionalServicesList.find(s => s.id === serviceId);
      return total + (service ? service.cost : 0);
    }, 0);

    const totalCost = Math.round(clientAdjustedCost + additionalCost);

    setEstimatedCost(totalCost);
    setBreakdown({
      baseCost: Math.round(baseCost),
      complexityCost: Math.round(complexityCost - baseCost),
      urgencyCost: Math.round(urgencyCost - complexityCost),
      clientDiscount: Math.round(urgencyCost - clientAdjustedCost),
      additionalCost: additionalCost,
      totalCost: totalCost
    });
    setActiveStep(2);
  };

  const saveEstimate = () => {
    const newEstimate = {
      id: Date.now(),
      documentType,
      complexity,
      urgency,
      clientType,
      additionalServices,
      estimatedCost,
      breakdown,
      timestamp: new Date().toLocaleString()
    };
    setSavedEstimates(prev => [newEstimate, ...prev]);
  };

  const loadEstimate = (estimate) => {
    setDocumentType(estimate.documentType);
    setComplexity(estimate.complexity);
    setUrgency(estimate.urgency);
    setClientType(estimate.clientType);
    setAdditionalServices(estimate.additionalServices);
    setEstimatedCost(estimate.estimatedCost);
    setBreakdown(estimate.breakdown);
    setOpenHistory(false);
  };

  const steps = [
    'Document Details',
    'Additional Services',
    'Estimation Results'
  ];

  const getStepContent = (step) => {
    switch (step) {
      case 0:
        return (
          <Fade in={true} timeout={600}>
            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <Grow in={true} timeout={800}>
                  <FormControl fullWidth>
                    <InputLabel>Document Type</InputLabel>
                    <Select
                      value={documentType}
                      label="Document Type"
                      onChange={(e) => setDocumentType(e.target.value)}
                      sx={{
                        '& .MuiOutlinedInput-notchedOutline': {
                          transition: 'all 0.3s ease',
                        },
                        '&:hover .MuiOutlinedInput-notchedOutline': {
                          borderColor: 'primary.main',
                          borderWidth: 2,
                        }
                      }}
                    >
                      {documentTypes.map((type) => (
                        <MenuItem key={type.value} value={type.value}>
                          <Box>
                            <Typography variant="body1">{type.value}</Typography>
                            <Typography variant="caption" color="textSecondary">
                              {type.category} • ${type.baseCost} base
                            </Typography>
                          </Box>
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grow>
              </Grid>

              <Grid item xs={12} md={6}>
                <Grow in={true} timeout={900}>
                  <FormControl fullWidth>
                    <InputLabel>Client Type</InputLabel>
                    <Select
                      value={clientType}
                      label="Client Type"
                      onChange={(e) => setClientType(e.target.value)}
                      sx={{
                        '& .MuiOutlinedInput-notchedOutline': {
                          transition: 'all 0.3s ease',
                        },
                        '&:hover .MuiOutlinedInput-notchedOutline': {
                          borderColor: 'primary.main',
                          borderWidth: 2,
                        }
                      }}
                    >
                      <MenuItem value="new">New Client</MenuItem>
                      <MenuItem value="returning">Returning Client</MenuItem>
                      <MenuItem value="corporate">Corporate Client</MenuItem>
                    </Select>
                  </FormControl>
                </Grow>
              </Grid>

              <Grid item xs={12} md={6}>
                <Grow in={true} timeout={1000}>
                  <FormControl fullWidth>
                    <InputLabel>Urgency Level</InputLabel>
                    <Select
                      value={urgency}
                      label="Urgency Level"
                      onChange={(e) => setUrgency(e.target.value)}
                      sx={{
                        '& .MuiOutlinedInput-notchedOutline': {
                          transition: 'all 0.3s ease',
                        },
                        '&:hover .MuiOutlinedInput-notchedOutline': {
                          borderColor: 'primary.main',
                          borderWidth: 2,
                        }
                      }}
                    >
                      <MenuItem value="standard">
                        <Box>
                          <Typography>Standard</Typography>
                          <Typography variant="caption">5-7 business days</Typography>
                        </Box>
                      </MenuItem>
                      <MenuItem value="express">
                        <Box>
                          <Typography>Express</Typography>
                          <Typography variant="caption">2-3 business days</Typography>
                        </Box>
                      </MenuItem>
                      <MenuItem value="urgent">
                        <Box>
                          <Typography>Urgent</Typography>
                          <Typography variant="caption">24 hours</Typography>
                        </Box>
                      </MenuItem>
                    </Select>
                  </FormControl>
                </Grow>
              </Grid>

              <Grid item xs={12} md={6}>
                <Grow in={true} timeout={1100}>
                  <Box sx={{ px: 1 }}>
                    <Typography gutterBottom variant="body2" color="textSecondary">
                      Complexity Level: {complexity}/5
                    </Typography>
                    <Slider
                      value={complexity}
                      onChange={(e, newValue) => setComplexity(newValue)}
                      min={1}
                      max={5}
                      marks={[
                        { value: 1, label: 'Simple' },
                        { value: 3, label: 'Moderate' },
                        { value: 5, label: 'Complex' }
                      ]}
                      valueLabelDisplay="auto"
                      sx={{
                        '& .MuiSlider-thumb': {
                          transition: 'all 0.3s ease',
                          '&:hover': {
                            boxShadow: '0 0 0 8px rgba(25, 118, 210, 0.16)',
                          }
                        }
                      }}
                    />
                  </Box>
                </Grow>
              </Grid>
            </Grid>
          </Fade>
        );

      case 1:
        return (
          <Fade in={true} timeout={600}>
            <Box>
              <Typography variant="body1" gutterBottom color="textSecondary" sx={{ mb: 2 }}>
                Select additional services (optional)
              </Typography>
              <Grid container spacing={2}>
                {additionalServicesList.map((service, index) => (
                  <Grid item xs={12} sm={6} key={service.id}>
                    <Grow in={true} timeout={700 + (index * 100)}>
                      <Card 
                        variant={additionalServices.includes(service.id) ? "elevated" : "outlined"}
                        sx={{ 
                          cursor: 'pointer',
                          border: additionalServices.includes(service.id) ? 2 : 1,
                          borderColor: additionalServices.includes(service.id) ? 'primary.main' : 'divider',
                          transform: additionalServices.includes(service.id) ? 'scale(1.02)' : 'scale(1)',
                          transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                          '&:hover': {
                            transform: 'translateY(-4px)',
                            boxShadow: 6,
                          }
                        }}
                        onClick={() => {
                          setAdditionalServices(prev =>
                            prev.includes(service.id)
                              ? prev.filter(id => id !== service.id)
                              : [...prev, service.id]
                          );
                        }}
                      >
                        <CardContent sx={{ p: 2 }}>
                          <Box display="flex" justifyContent="space-between" alignItems="center">
                            <Box display="flex" alignItems="center" gap={1}>
                              <Zoom in={additionalServices.includes(service.id)}>
                                <CheckIcon color="primary" sx={{ fontSize: 20 }} />
                              </Zoom>
                              <Typography variant="body2" fontWeight="medium">
                                {service.name}
                              </Typography>
                            </Box>
                            <Chip 
                              label={`$${service.cost}`} 
                              size="small" 
                              color="primary"
                              sx={{
                                transition: 'all 0.3s ease',
                                transform: additionalServices.includes(service.id) ? 'scale(1.1)' : 'scale(1)',
                              }}
                            />
                          </Box>
                        </CardContent>
                      </Card>
                    </Grow>
                  </Grid>
                ))}
              </Grid>
            </Box>
          </Fade>
        );

      case 2:
        return (
          <Fade in={true} timeout={600}>
            <Box>
              <Grow in={true} timeout={800}>
                <Alert 
                  severity="info" 
                  sx={{ 
                    mb: 3,
                    '& .MuiAlert-icon': {
                      animation: 'pulse 2s ease-in-out infinite',
                    },
                    '@keyframes pulse': {
                      '0%, 100%': { opacity: 1 },
                      '50%': { opacity: 0.7 },
                    }
                  }}
                >
                  This is an estimate. Final costs may vary based on specific requirements.
                </Alert>
              </Grow>

              <Grid container spacing={3}>
                <Grid item xs={12} md={6}>
                  <Zoom in={true} timeout={900}>
                    <Card sx={{ 
                      boxShadow: 3,
                      transition: 'box-shadow 0.3s ease',
                      '&:hover': { boxShadow: 8 }
                    }}>
                      <CardContent>
                        <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
                          Cost Breakdown
                        </Typography>
                        <List dense>
                          <Fade in={true} timeout={1000}>
                            <ListItem>
                              <ListItemText primary="Base Document Cost" />
                              <Typography fontWeight="bold">${breakdown.baseCost}</Typography>
                            </ListItem>
                          </Fade>
                          <Fade in={true} timeout={1100}>
                            <ListItem>
                              <ListItemText primary="Complexity Adjustment" />
                              <Typography color={breakdown.complexityCost > 0 ? "success.main" : "text.secondary"}>
                                +${breakdown.complexityCost}
                              </Typography>
                            </ListItem>
                          </Fade>
                          <Fade in={true} timeout={1200}>
                            <ListItem>
                              <ListItemText primary="Urgency Fee" />
                              <Typography color="warning.main">
                                +${breakdown.urgencyCost}
                              </Typography>
                            </ListItem>
                          </Fade>
                          <Fade in={true} timeout={1300}>
                            <ListItem>
                              <ListItemText primary="Client Discount" />
                              <Typography color="success.main">
                                -${breakdown.clientDiscount}
                              </Typography>
                            </ListItem>
                          </Fade>
                          {breakdown.additionalCost > 0 && (
                            <Fade in={true} timeout={1400}>
                              <ListItem>
                                <ListItemText primary="Additional Services" />
                                <Typography color="info.main">
                                  +${breakdown.additionalCost}
                                </Typography>
                              </ListItem>
                            </Fade>
                          )}
                          <Divider sx={{ my: 1 }} />
                          <Fade in={true} timeout={1500}>
                            <ListItem>
                              <ListItemText primary="Total Estimated Cost" />
                              <Typography 
                                variant="h6" 
                                color="primary"
                                sx={{
                                  animation: 'slideIn 0.5s ease-out',
                                  '@keyframes slideIn': {
                                    '0%': { transform: 'translateX(20px)', opacity: 0 },
                                    '100%': { transform: 'translateX(0)', opacity: 1 },
                                  }
                                }}
                              >
                                ${breakdown.totalCost}
                              </Typography>
                            </ListItem>
                          </Fade>
                        </List>
                      </CardContent>
                    </Card>
                  </Zoom>
                </Grid>

                <Grid item xs={12} md={6}>
                  <Zoom in={true} timeout={1000}>
                    <Card sx={{ 
                      boxShadow: 3,
                      transition: 'box-shadow 0.3s ease',
                      '&:hover': { boxShadow: 8 }
                    }}>
                      <CardContent>
                        <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
                          Service Details
                        </Typography>
                        <List dense>
                          <Fade in={true} timeout={1100}>
                            <ListItem>
                              <ListItemIcon>
                                <DocumentIcon color="primary" />
                              </ListItemIcon>
                              <ListItemText primary="Document Type" secondary={documentType} />
                            </ListItem>
                          </Fade>
                          <Fade in={true} timeout={1200}>
                            <ListItem>
                              <ListItemIcon>
                                <TimeIcon color="primary" />
                              </ListItemIcon>
                              <ListItemText 
                                primary="Estimated Timeline" 
                                secondary={
                                  urgency === 'urgent' ? '24 hours' :
                                  urgency === 'express' ? '2-3 days' : '5-7 days'
                                } 
                              />
                            </ListItem>
                          </Fade>
                          <Fade in={true} timeout={1300}>
                            <ListItem>
                              <ListItemIcon>
                                <MoneyIcon color="primary" />
                              </ListItemIcon>
                              <ListItemText primary="Client Type" secondary={clientType} />
                            </ListItem>
                          </Fade>
                        </List>
                      </CardContent>
                    </Card>
                  </Zoom>
                </Grid>
              </Grid>

              <Fade in={true} timeout={1600}>
                <Box display="flex" gap={2} sx={{ mt: 3 }} flexWrap="wrap">
                  <Button
                    variant="outlined"
                    startIcon={<SaveIcon />}
                    onClick={saveEstimate}
                    sx={{
                      transition: 'all 0.3s ease',
                      '&:hover': {
                        transform: 'translateY(-2px)',
                        boxShadow: 3,
                      }
                    }}
                  >
                    Save Estimate
                  </Button>
                  <Button
                    variant="outlined"
                    startIcon={<ShareIcon />}
                    sx={{
                      transition: 'all 0.3s ease',
                      '&:hover': {
                        transform: 'translateY(-2px)',
                        boxShadow: 3,
                      }
                    }}
                  >
                    Share with Client
                  </Button>
                  <Button
                    variant="outlined"
                    onClick={() => setActiveStep(0)}
                    sx={{
                      transition: 'all 0.3s ease',
                      '&:hover': {
                        transform: 'translateY(-2px)',
                        boxShadow: 3,
                      }
                    }}
                  >
                    New Estimate
                  </Button>
                </Box>
              </Fade>
            </Box>
          </Fade>
        );

      default:
        return 'Unknown step';
    }
  };

  return (
    <Box sx={{ 
      p: 3,
      // background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',
      background: 'white',
      minHeight: '100vh',
    }}>
      <Fade in={true} timeout={800}>
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={4}>
          <Typography 
            variant="h3" 
            sx={{ 
              fontWeight: 900,
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              mb: 0.5,
            }}
          >
            Legal Service Estimator
          </Typography>
          <Button
            startIcon={<HistoryIcon />}
            onClick={() => setOpenHistory(true)}
            variant="contained"
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
            Saved Estimates
          </Button>
        </Box>
      </Fade>

      <Grid container spacing={3}>
        <Grid item xs={12} lg={8}>
          <Grow in={true} timeout={1000}>
            <Card sx={{ 
              boxShadow: 6,
              borderRadius: 3,
              background: 'rgba(255, 255, 255, 0.95)',
              backdropFilter: 'blur(10px)',
            }}>
              <CardContent sx={{ p: 3 }}>
                <Stepper activeStep={activeStep} orientation="vertical" sx={{ mb: 4 }}>
                  {steps.map((label, index) => (
                    <Step key={label}>
                      <StepLabel 
                        sx={{
                          '& .MuiStepLabel-iconContainer': {
                            transition: 'all 0.3s ease',
                          },
                          '& .Mui-active': {
                            animation: 'bounce 1s ease-in-out',
                          },
                          '@keyframes bounce': {
                            '0%, 100%': { transform: 'scale(1)' },
                            '50%': { transform: 'scale(1.1)' },
                          }
                        }}
                      >
                        {label}
                      </StepLabel>
                      <StepContent>
                        {getStepContent(index)}
                        <Box sx={{ mb: 2, mt: 2 }}>
                          <div>
                            {index === 0 && (
                              <Zoom in={true} timeout={600}>
                                <Button
                                  variant="contained"
                                  onClick={() => setActiveStep(1)}
                                  disabled={!documentType}
                                  sx={{ 
                                    mt: 1, 
                                    mr: 1,
                                    transition: 'all 0.3s ease',
                                    '&:hover': {
                                      transform: 'translateY(-2px)',
                                      boxShadow: 4,
                                    }
                                  }}
                                >
                                  Continue to Services
                                </Button>
                              </Zoom>
                            )}
                            {index === 1 && (
                              <>
                                <Zoom in={true} timeout={600}>
                                  <Button
                                    variant="contained"
                                    onClick={calculateCost}
                                    startIcon={<CalculateIcon />}
                                    sx={{ 
                                      mt: 1, 
                                      mr: 1,
                                      transition: 'all 0.3s ease',
                                      '&:hover': {
                                        transform: 'translateY(-2px)',
                                        boxShadow: 4,
                                      }
                                    }}
                                  >
                                    Calculate Cost
                                  </Button>
                                </Zoom>
                                <Zoom in={true} timeout={700}>
                                  <Button
                                    onClick={() => setActiveStep(0)}
                                    sx={{ mt: 1, mr: 1 }}
                                  >
                                    Back
                                  </Button>
                                </Zoom>
                              </>
                            )}
                            {index === 2 && (
                              <Zoom in={true} timeout={600}>
                                <Button
                                  variant="contained"
                                  onClick={() => {
                                    setActiveStep(0);
                                    setDocumentType('');
                                    setComplexity(3);
                                    setUrgency('standard');
                                    setClientType('new');
                                    setAdditionalServices([]);
                                    setEstimatedCost(null);
                                  }}
                                  sx={{ 
                                    mt: 1, 
                                    mr: 1,
                                    transition: 'all 0.3s ease',
                                    '&:hover': {
                                      transform: 'translateY(-2px)',
                                      boxShadow: 4,
                                    }
                                  }}
                                >
                                  Create New Estimate
                                </Button>
                              </Zoom>
                            )}
                          </div>
                        </Box>
                      </StepContent>
                    </Step>
                  ))}
                </Stepper>
              </CardContent>
            </Card>
          </Grow>
        </Grid>

        <Grid item xs={12} lg={4}>
          <Grow in={true} timeout={1200}>
            <Card sx={{ 
              position: 'sticky', 
              top: 100, 
              mb: 3,
              boxShadow: 6,
              borderRadius: 3,
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              color: 'white',
              overflow: 'hidden',
            }}>
              <CardContent sx={{ textAlign: 'center', p: 3, position: 'relative' }}>
                <Box
                  sx={{
                    position: 'absolute',
                    top: -50,
                    right: -50,
                    width: 150,
                    height: 150,
                    borderRadius: '50%',
                    background: 'rgba(255, 255, 255, 0.1)',
                  }}
                />
                <MoneyIcon 
                  sx={{ 
                    fontSize: 48, 
                    mb: 2,
                    filter: 'drop-shadow(0 4px 6px rgba(0,0,0,0.2))',
                    animation: estimatedCost ? 'float 3s ease-in-out infinite' : 'none',
                    '@keyframes float': {
                      '0%, 100%': { transform: 'translateY(0)' },
                      '50%': { transform: 'translateY(-10px)' },
                    }
                  }} 
                />
                
                {estimatedCost ? (
                  <>
                    <Typography variant="h6" gutterBottom sx={{ opacity: 0.9 }}>
                      Estimated Cost
                    </Typography>
                    <Typography 
                      variant="h3" 
                      sx={{ 
                        fontWeight: 700, 
                        my: 2,
                        textShadow: '2px 2px 4px rgba(0,0,0,0.3)',
                        animation: 'scaleIn 0.5s ease-out',
                        '@keyframes scaleIn': {
                          '0%': { transform: 'scale(0.5)', opacity: 0 },
                          '100%': { transform: 'scale(1)', opacity: 1 },
                        }
                      }}
                    >
                      ${estimatedCost}
                    </Typography>
                    <Typography variant="body2" gutterBottom sx={{ opacity: 0.9 }}>
                      For {documentType}
                    </Typography>
                    <Box sx={{ mt: 2 }}>
                      <Chip 
                        label={`${urgency.charAt(0).toUpperCase() + urgency.slice(1)} Delivery`} 
                        sx={{ 
                          mr: 0.5, 
                          mb: 0.5,
                          bgcolor: 'rgba(255,255,255,0.2)',
                          color: 'white',
                          backdropFilter: 'blur(10px)',
                        }}
                        size="small"
                      />
                      <Chip 
                        label={`Complexity: ${complexity}/5`} 
                        sx={{ 
                          mr: 0.5, 
                          mb: 0.5,
                          bgcolor: 'rgba(255,255,255,0.2)',
                          color: 'white',
                          backdropFilter: 'blur(10px)',
                        }}
                        size="small"
                      />
                      {additionalServices.length > 0 && (
                        <Chip 
                          label={`+${additionalServices.length} services`} 
                          sx={{ 
                            bgcolor: 'rgba(255,255,255,0.2)',
                            color: 'white',
                            backdropFilter: 'blur(10px)',
                          }}
                          size="small"
                        />
                      )}
                    </Box>
                  </>
                ) : (
                  <>
                    <Typography variant="h6" gutterBottom sx={{ opacity: 0.9 }}>
                      Quick Estimate
                    </Typography>
                    <Typography variant="body1" sx={{ mb: 2, opacity: 0.9 }}>
                      Fill in the details to get an accurate cost estimation for your legal services.
                    </Typography>
                    <Button
                      variant="contained"
                      startIcon={<InfoIcon />}
                      onClick={() => setActiveStep(0)}
                      sx={{
                        bgcolor: 'rgba(255,255,255,0.2)',
                        backdropFilter: 'blur(10px)',
                        color: 'white',
                        transition: 'all 0.3s ease',
                        '&:hover': {
                          bgcolor: 'rgba(255,255,255,0.3)',
                          transform: 'translateY(-2px)',
                          boxShadow: 4,
                        }
                      }}
                    >
                      Start Estimating
                    </Button>
                  </>
                )}
              </CardContent>
            </Card>
          </Grow>

          <Grow in={true} timeout={1400}>
            <Card sx={{ 
              boxShadow: 4,
              borderRadius: 3,
              background: 'rgba(255, 255, 255, 0.95)',
              backdropFilter: 'blur(10px)',
              transition: 'all 0.3s ease',
              '&:hover': {
                boxShadow: 8,
                transform: 'translateY(-4px)',
              }
            }}>
              <CardContent>
                <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
                  Pricing Guide
                </Typography>
                <List dense>
                  {[
                    { type: 'Simple Documents', range: '$400 - $800', examples: 'NDA, Basic Contracts' },
                    { type: 'Standard Agreements', range: '$800 - $2,000', examples: 'Lease, Employment' },
                    { type: 'Complex Contracts', range: '$1,500 - $5,000', examples: 'Partnership, Corporate' },
                  ].map((item, index) => (
                    <Fade in={true} timeout={1500 + (index * 100)} key={index}>
                      <ListItem divider={index < 2}>
                        <ListItemText
                          primary={
                            <Box display="flex" justifyContent="space-between">
                              <Typography variant="body2">{item.type}</Typography>
                              <Typography variant="body2" fontWeight="bold" color="primary">
                                {item.range}
                              </Typography>
                            </Box>
                          }
                          secondary={item.examples}
                        />
                      </ListItem>
                    </Fade>
                  ))}
                </List>
              </CardContent>
            </Card>
          </Grow>
        </Grid>
      </Grid>

      <Dialog 
        open={openHistory} 
        onClose={() => setOpenHistory(false)} 
        maxWidth="md" 
        fullWidth
        TransitionComponent={Slide}
        TransitionProps={{ direction: "up" }}
        PaperProps={{
          sx: {
            borderRadius: 3,
            boxShadow: 12,
          }
        }}
      >
        <DialogTitle>
          <Box display="flex" justifyContent="space-between" alignItems="center">
            <Typography variant="h6" sx={{ fontWeight: 600 }}>Saved Estimates</Typography>
            <IconButton 
              onClick={() => setOpenHistory(false)}
              sx={{
                transition: 'all 0.3s ease',
                '&:hover': {
                  transform: 'rotate(90deg)',
                  bgcolor: 'error.light',
                  color: 'white',
                }
              }}
            >
              <CloseIcon />
            </IconButton>
          </Box>
        </DialogTitle>
        <DialogContent>
          {savedEstimates.length === 0 ? (
            <Fade in={true} timeout={600}>
              <Box textAlign="center" py={4}>
                <Zoom in={true} timeout={800}>
                  <HistoryIcon 
                    sx={{ 
                      fontSize: 64, 
                      color: 'text.secondary', 
                      mb: 2,
                      opacity: 0.5,
                    }} 
                  />
                </Zoom>
                <Typography variant="body1" color="textSecondary">
                  No saved estimates yet
                </Typography>
              </Box>
            </Fade>
          ) : (
            <List>
              {savedEstimates.map((estimate, index) => (
                <Grow in={true} timeout={600 + (index * 100)} key={estimate.id}>
                  <ListItem 
                    divider
                    sx={{ 
                      cursor: 'pointer',
                      borderRadius: 2,
                      mb: 1,
                      transition: 'all 0.3s ease',
                      '&:hover': {
                        bgcolor: 'action.hover',
                        transform: 'translateX(8px)',
                        boxShadow: 2,
                      }
                    }}
                    onClick={() => loadEstimate(estimate)}
                  >
                    <ListItemIcon>
                      <DocumentIcon color="primary" />
                    </ListItemIcon>
                    <ListItemText
                      primary={estimate.documentType}
                      secondary={`${estimate.estimatedCost} • ${estimate.timestamp}`}
                    />
                    <Chip 
                      label={estimate.urgency} 
                      size="small" 
                      color={estimate.urgency === 'urgent' ? 'error' : 'primary'}
                      sx={{
                        transition: 'all 0.3s ease',
                        '&:hover': {
                          transform: 'scale(1.1)',
                        }
                      }}
                    />
                  </ListItem>
                </Grow>
              ))}
            </List>
          )}
        </DialogContent>
        <DialogActions sx={{ p: 2.5 }}>
          <Button 
            onClick={() => setOpenHistory(false)}
            sx={{
              transition: 'all 0.3s ease',
              '&:hover': {
                transform: 'translateY(-2px)',
              }
            }}
          >
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default LegalEstimator;