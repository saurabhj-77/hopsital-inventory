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
  Slider,
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
  CloseIcon
} from '@mui/material';
import {
  Timeline as TimelineIcon,
  TrendingUp as TrendingUpIcon,
  TrendingDown as TrendingDownIcon,
  Warning as WarningIcon,
  CheckCircle as CheckCircleIcon,
  Error as ErrorIcon,
  CalendarToday as CalendarIcon,
  ShowChart as ChartIcon,
  AutoGraph as AutoGraphIcon,
  Analytics as AnalyticsIcon,
  FilterList as FilterIcon,
  Search as SearchIcon,
  Download as DownloadIcon,
  Refresh as RefreshIcon,
  Event as EventIcon,
  LocalHospital as HospitalIcon,
  Inventory as InventoryIcon,
  Pharmacy as PharmacyIcon,
  Science as ScienceIcon,
  Devices as DevicesIcon,
  Settings as SettingsIcon,
  Add as AddIcon,
  Remove as RemoveIcon,
  Info as InfoIcon,
  CompareArrows as CompareIcon,
  TimelineOutlined as TimelineOutlinedIcon,
  BarChart as BarChartIcon,
  PieChart as PieChartIcon,
  Dataset as DatasetIcon
} from '@mui/icons-material';

const ForecastingDemandPlanning = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  
  const [activeTab, setActiveTab] = useState(0);
  const [forecastData, setForecastData] = useState([]);
  const [seasonalTrends, setSeasonalTrends] = useState([]);
  const [hospitalEvents, setHospitalEvents] = useState([]);
  const [parLevelRecommendations, setParLevelRecommendations] = useState([]);
  const [openScenarioDialog, setOpenScenarioDialog] = useState(false);
  const [openEventDialog, setOpenEventDialog] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('all');
  const [filterCriticality, setFilterCriticality] = useState('all');
  const [timeRange, setTimeRange] = useState('monthly');
  const [confidenceLevel, setConfidenceLevel] = useState(92);
  const [scenarioForm, setScenarioForm] = useState({
    scenarioName: '',
    demandIncrease: 20,
    duration: 30,
    description: ''
  });
  const [loaded, setLoaded] = useState(false);

  // Initialize with dummy data
  useEffect(() => {
    const loadData = () => {
      // Check if data exists in localStorage
      const savedForecast = localStorage.getItem('forecastData');
      const savedTrends = localStorage.getItem('seasonalTrends');
      const savedEvents = localStorage.getItem('hospitalEvents');
      const savedRecommendations = localStorage.getItem('parLevelRecommendations');

      if (savedForecast) {
        setForecastData(JSON.parse(savedForecast));
      } else {
        // Generate dummy forecast data
        const items = [
          { id: 1, name: 'Paracetamol 500mg', category: 'Pharmacy', criticality: 'high', currentStock: 245, unit: 'tablets' },
          { id: 2, name: 'Insulin Vials', category: 'Pharmacy', criticality: 'critical', currentStock: 145, unit: 'vials' },
          { id: 3, name: 'Surgical Gloves', category: 'Consumable', criticality: 'medium', currentStock: 1200, unit: 'pairs' },
          { id: 4, name: 'Saline Solution 500ml', category: 'Consumable', criticality: 'high', currentStock: 350, unit: 'bags' },
          { id: 5, name: 'Epinephrine 1mg', category: 'Pharmacy', criticality: 'critical', currentStock: 85, unit: 'vials' },
          { id: 6, name: 'IV Catheters', category: 'Consumable', criticality: 'medium', currentStock: 450, unit: 'units' },
          { id: 7, name: 'Blood Test Kits', category: 'Laboratory', criticality: 'medium', currentStock: 220, unit: 'kits' },
          { id: 8, name: 'Patient Monitors', category: 'Equipment', criticality: 'high', currentStock: 18, unit: 'units' }
        ];

        const dummyForecast = items.map(item => {
          const baseDemand = item.criticality === 'critical' ? 25 : 
                           item.criticality === 'high' ? 15 : 10;
          
          // Generate forecast for next 30 days
          const dailyForecast = [];
          for (let i = 1; i <= 30; i++) {
            let dailyDemand = baseDemand * (1 + Math.sin(i * 0.2) * 0.3); // Add some variation
            if (i > 20 && i < 25) dailyDemand *= 1.5; // Simulate peak period
            dailyForecast.push({
              day: i,
              date: `2024-02-${i.toString().padStart(2, '0')}`,
              predicted: Math.round(dailyDemand),
              actual: null,
              confidence: 85 + Math.random() * 15
            });
          }

          const totalPredicted = dailyForecast.reduce((sum, day) => sum + day.predicted, 0);
          const weeklyAvg = totalPredicted / 4;
          const monthlyAvg = totalPredicted;
          const stockoutRisk = item.currentStock < totalPredicted * 0.3 ? 'high' : 
                              item.currentStock < totalPredicted * 0.5 ? 'medium' : 'low';

          return {
            ...item,
            dailyForecast,
            weeklyAverage: Math.round(weeklyAvg),
            monthlyAverage: Math.round(monthlyAvg),
            quarterlyProjection: Math.round(monthlyAvg * 3),
            stockoutRisk,
            forecastAccuracy: Math.round(85 + Math.random() * 12),
            lastUpdated: '2024-01-22 14:30:00'
          };
        });

        setForecastData(dummyForecast);
        localStorage.setItem('forecastData', JSON.stringify(dummyForecast));
      }

      if (savedTrends) {
        setSeasonalTrends(JSON.parse(savedTrends));
      } else {
        const dummyTrends = [
          {
            id: 1,
            name: 'Flu Season Impact',
            period: 'Jan-Mar',
            impact: '+45%',
            affectedCategories: ['Pharmacy', 'Consumable'],
            description: 'Increased demand for antiviral medications and PPE',
            confidence: 88
          },
          {
            id: 2,
            name: 'Elective Surgery Peaks',
            period: 'Apr-Jun',
            impact: '+30%',
            affectedCategories: ['Surgical Equipment', 'Anesthesia'],
            description: 'Post-winter surgery backlog clearance',
            confidence: 92
          },
          {
            id: 3,
            name: 'Summer Trauma Season',
            period: 'Jun-Aug',
            impact: '+25%',
            affectedCategories: ['Emergency', 'Trauma'],
            description: 'Increased outdoor activities and trauma cases',
            confidence: 85
          },
          {
            id: 4,
            name: 'Respiratory Season',
            period: 'Oct-Dec',
            impact: '+40%',
            affectedCategories: ['Pharmacy', 'Respiratory'],
            description: 'Cold weather increases respiratory illnesses',
            confidence: 90
          }
        ];
        setSeasonalTrends(dummyTrends);
        localStorage.setItem('seasonalTrends', JSON.stringify(dummyTrends));
      }

      if (savedEvents) {
        setHospitalEvents(JSON.parse(savedEvents));
      } else {
        const dummyEvents = [
          {
            id: 1,
            name: 'Annual Cardiac Conference',
            date: '2024-03-15',
            duration: 3,
            impact: 'high',
            description: 'Increased demand for cardiac medications and equipment',
            affectedItems: ['Epinephrine', 'Defibrillators', 'ECG Machines'],
            predictedIncrease: '+35%'
          },
          {
            id: 2,
            name: 'Mass Vaccination Drive',
            date: '2024-02-10',
            duration: 5,
            impact: 'medium',
            description: 'Large-scale COVID-19 vaccination campaign',
            affectedItems: ['Vaccines', 'Syringes', 'PPE Kits'],
            predictedIncrease: '+50%'
          },
          {
            id: 3,
            name: 'Hospital Expansion Opening',
            date: '2024-04-01',
            duration: 30,
            impact: 'high',
            description: 'New wing opening increases bed capacity by 25%',
            affectedItems: ['All consumables', 'Patient Monitors', 'Bed Linens'],
            predictedIncrease: '+25%'
          },
          {
            id: 4,
            name: 'Emergency Drill',
            date: '2024-01-30',
            duration: 1,
            impact: 'low',
            description: 'Hospital-wide emergency preparedness exercise',
            affectedItems: ['Emergency Kits', 'Trauma Supplies'],
            predictedIncrease: '+15%'
          }
        ];
        setHospitalEvents(dummyEvents);
        localStorage.setItem('hospitalEvents', JSON.stringify(dummyEvents));
      }

      if (savedRecommendations) {
        setParLevelRecommendations(JSON.parse(savedRecommendations));
      } else {
        const dummyRecommendations = [
          {
            id: 1,
            itemName: 'Epinephrine 1mg',
            currentPar: 50,
            recommendedPar: 75,
            change: '+50%',
            reason: 'Increased emergency cases forecast',
            priority: 'high',
            implementationDate: '2024-02-01'
          },
          {
            id: 2,
            itemName: 'Insulin Vials',
            currentPar: 100,
            recommendedPar: 120,
            change: '+20%',
            reason: 'Seasonal diabetes management increase',
            priority: 'medium',
            implementationDate: '2024-02-15'
          },
          {
            id: 3,
            itemName: 'Surgical Gloves',
            currentPar: 800,
            recommendedPar: 600,
            change: '-25%',
            reason: 'Excess inventory detected, reduce waste',
            priority: 'low',
            implementationDate: '2024-03-01'
          },
          {
            id: 4,
            itemName: 'Blood Test Kits',
            currentPar: 200,
            recommendedPar: 250,
            change: '+25%',
            reason: 'Increased lab testing anticipated',
            priority: 'high',
            implementationDate: '2024-02-10'
          }
        ];
        setParLevelRecommendations(dummyRecommendations);
        localStorage.setItem('parLevelRecommendations', JSON.stringify(dummyRecommendations));
      }
      
      setLoaded(true);
    };

    loadData();
  }, []);

  const getCriticalityColor = (criticality) => {
    switch (criticality) {
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

  const getCriticalityIcon = (criticality) => {
    switch (criticality) {
      case 'critical':
        return <ErrorIcon />;
      case 'high':
        return <WarningIcon />;
      case 'medium':
        return <InfoIcon />;
      case 'low':
        return <CheckCircleIcon />;
      default:
        return <InfoIcon />;
    }
  };

  const getImpactColor = (impact) => {
    switch (impact) {
      case 'high':
        return '#f44336';
      case 'medium':
        return '#ff9800';
      case 'low':
        return '#4caf50';
      default:
        return '#757575';
    }
  };

  const getRiskColor = (risk) => {
    switch (risk) {
      case 'high':
        return '#f44336';
      case 'medium':
        return '#ff9800';
      case 'low':
        return '#4caf50';
      default:
        return '#757575';
    }
  };

  const getCategoryIcon = (category) => {
    switch (category) {
      case 'Pharmacy':
        return <InventoryIcon />;
      case 'Consumable':
        return <InventoryIcon />;
      case 'Equipment':
        return <DevicesIcon />;
      case 'Laboratory':
        return <ScienceIcon />;
      default:
        return <InventoryIcon />;
    }
  };

  const getCategoryColor = (category) => {
    switch (category) {
      case 'Pharmacy':
        return '#2196f3';
      case 'Consumable':
        return '#4caf50';
      case 'Equipment':
        return '#9c27b0';
      case 'Laboratory':
        return '#ff9800';
      default:
        return '#757575';
    }
  };

  const getForecastValue = (item, range) => {
    switch (range) {
      case 'weekly':
        return item.weeklyAverage;
      case 'monthly':
        return item.monthlyAverage;
      case 'quarterly':
        return item.quarterlyProjection;
      default:
        return item.monthlyAverage;
    }
  };

  const getForecastUnit = (range) => {
    switch (range) {
      case 'weekly':
        return 'per week';
      case 'monthly':
        return 'per month';
      case 'quarterly':
        return 'per quarter';
      default:
        return '';
    }
  };

  const handleOpenScenarioDialog = (item = null) => {
    setSelectedItem(item);
    setScenarioForm({
      scenarioName: item ? `What-if: ${item.name}` : 'New Scenario',
      demandIncrease: 20,
      duration: 30,
      description: item ? `Simulating demand changes for ${item.name}` : ''
    });
    setOpenScenarioDialog(true);
  };

  const handleCloseScenarioDialog = () => {
    setOpenScenarioDialog(false);
    setSelectedItem(null);
    setScenarioForm({
      scenarioName: '',
      demandIncrease: 20,
      duration: 30,
      description: ''
    });
  };

  const handleOpenEventDialog = () => {
    setOpenEventDialog(true);
  };

  const handleCloseEventDialog = () => {
    setOpenEventDialog(false);
  };

  const handleRunScenario = () => {
    // Mock scenario execution
    alert(`Running scenario: ${scenarioForm.scenarioName}\nDemand Increase: ${scenarioForm.demandIncrease}%\nDuration: ${scenarioForm.duration} days`);
    handleCloseScenarioDialog();
  };

  const filteredForecast = forecastData.filter(item => {
    if (filterCategory !== 'all' && item.category !== filterCategory) return false;
    if (filterCriticality !== 'all' && item.criticality !== filterCriticality) return false;
    if (searchTerm && !item.name.toLowerCase().includes(searchTerm.toLowerCase())) return false;
    return true;
  });

  const ForecastCard = ({ item }) => {
    const forecastValue = getForecastValue(item, timeRange);
    const coverageDays = Math.round(item.currentStock / (forecastValue / (timeRange === 'weekly' ? 7 : timeRange === 'monthly' ? 30 : 90)));
    const isCritical = coverageDays < 7;
    
    return (
      <Grow in={loaded} timeout={500}>
        <Card sx={{ 
          borderRadius: 2,
          boxShadow: `0 4px 12px ${alpha(getCriticalityColor(item.criticality), 0.1)}`,
          borderLeft: `4px solid ${getCriticalityColor(item.criticality)}`,
          transition: 'transform 0.3s',
          '&:hover': {
            transform: 'translateY(-4px)',
            boxShadow: `0 8px 24px ${alpha(getCriticalityColor(item.criticality), 0.2)}`
          }
        }}>
          <CardContent>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
              <Box>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                  <Avatar sx={{ 
                    bgcolor: alpha(getCategoryColor(item.category), 0.1),
                    color: getCategoryColor(item.category)
                  }}>
                    {getCategoryIcon(item.category)}
                  </Avatar>
                  <Box>
                    <Typography variant="h6" sx={{ fontWeight: 600 }}>
                      {item.name}
                    </Typography>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <Chip 
                        label={item.category}
                        size="small"
                        sx={{ 
                          bgcolor: alpha(getCategoryColor(item.category), 0.1),
                          color: getCategoryColor(item.category)
                        }}
                      />
                      <Chip 
                        icon={getCriticalityIcon(item.criticality)}
                        label={item.criticality.toUpperCase()}
                        size="small"
                        sx={{ 
                          bgcolor: alpha(getCriticalityColor(item.criticality), 0.1),
                          color: getCriticalityColor(item.criticality)
                        }}
                      />
                    </Box>
                  </Box>
                </Box>
                
                <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 2, mt: 2 }}>
                  <Box>
                    <Typography variant="caption" color="text.secondary" display="block">
                      Current Stock
                    </Typography>
                    <Typography variant="h5" fontWeight={700} color="primary">
                      {item.currentStock}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      {item.unit}
                    </Typography>
                  </Box>
                  <Box>
                    <Typography variant="caption" color="text.secondary" display="block">
                      Forecasted Demand
                    </Typography>
                    <Typography variant="h5" fontWeight={700} color={
                      coverageDays < 14 ? 'error' : coverageDays < 30 ? 'warning' : 'success'
                    }>
                      {forecastValue}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      {getForecastUnit(timeRange)}
                    </Typography>
                  </Box>
                </Box>
              </Box>
            </Box>

            {/* Stock Coverage Indicator */}
            <Box sx={{ mb: 2 }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
                <Typography variant="caption" color="text.secondary">
                  Stock Coverage
                </Typography>
                <Typography variant="caption" fontWeight={600} color={
                  coverageDays < 7 ? 'error' : coverageDays < 14 ? 'warning' : 'success'
                }>
                  {coverageDays} days
                </Typography>
              </Box>
              <LinearProgress 
                variant="determinate" 
                value={Math.min(coverageDays * 3, 100)} 
                sx={{ 
                  height: 8,
                  borderRadius: 4,
                  bgcolor: alpha('#4caf50', 0.1),
                  '& .MuiLinearProgress-bar': {
                    bgcolor: coverageDays < 7 ? '#f44336' : coverageDays < 14 ? '#ff9800' : '#4caf50',
                    borderRadius: 4
                  }
                }}
              />
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 0.5 }}>
                <Typography variant="caption" color="text.secondary">
                  Low Risk
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  Critical
                </Typography>
              </Box>
            </Box>

            {/* Stockout Risk */}
            <Box sx={{ 
              p: 1.5, 
              mb: 2,
              borderRadius: 1.5,
              bgcolor: alpha(getRiskColor(item.stockoutRisk), 0.05),
              border: `1px solid ${alpha(getRiskColor(item.stockoutRisk), 0.1)}`
            }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                {item.stockoutRisk === 'high' ? <ErrorIcon color="error" /> : 
                 item.stockoutRisk === 'medium' ? <WarningIcon color="warning" /> : 
                 <CheckCircleIcon color="success" />}
                <Typography variant="body2" fontWeight={600} color={getRiskColor(item.stockoutRisk)}>
                  {item.stockoutRisk === 'high' ? 'HIGH RISK OF STOCKOUT' : 
                   item.stockoutRisk === 'medium' ? 'MEDIUM RISK' : 'LOW RISK'}
                </Typography>
              </Box>
              <Typography variant="caption" color="text.secondary">
                Based on {timeRange} forecast and current inventory levels
              </Typography>
            </Box>

            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Box>
                <Typography variant="caption" color="text.secondary" display="block">
                  Forecast Accuracy
                </Typography>
                <Typography variant="body2" fontWeight={600}>
                  {item.forecastAccuracy}%
                </Typography>
              </Box>
              <Button
                size="small"
                variant="outlined"
                startIcon={<ChartIcon />}
                onClick={() => handleOpenScenarioDialog(item)}
                sx={{ borderRadius: 1.5, textTransform: 'none' }}
              >
                Run Scenario
              </Button>
            </Box>
          </CardContent>
        </Card>
      </Grow>
    );
  };

  const SeasonalTrendCard = ({ trend }) => (
    <Grow in={loaded} timeout={500}>
      <Paper sx={{ 
        p: 2.5, 
        borderRadius: 2,
        border: `1px solid ${alpha('#2196f3', 0.2)}`,
        bgcolor: alpha('#2196f3', 0.03),
        transition: 'transform 0.3s',
        '&:hover': {
          transform: 'translateY(-2px)',
          boxShadow: '0 6px 16px rgba(0,0,0,0.1)'
        }
      }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
          <Box>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
              <CalendarIcon color="primary" />
              <Typography variant="h6" sx={{ fontWeight: 600 }}>
                {trend.name}
              </Typography>
            </Box>
            <Chip 
              label={trend.period}
              size="small"
              sx={{ 
                bgcolor: alpha('#2196f3', 0.1),
                color: '#2196f3',
                mb: 1
              }}
            />
            <Typography variant="body2" color="text.secondary">
              {trend.description}
            </Typography>
          </Box>
          <Box sx={{ textAlign: 'right' }}>
            <Typography variant="h4" color="error" fontWeight={700}>
              {trend.impact}
            </Typography>
            <Typography variant="caption" color="text.secondary">
              Demand Impact
            </Typography>
          </Box>
        </Box>

        <Box sx={{ mb: 2 }}>
          <Typography variant="caption" color="text.secondary" display="block" gutterBottom>
            Affected Categories
          </Typography>
          <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
            {trend.affectedCategories.map((category, index) => (
              <Chip 
                key={index}
                label={category}
                size="small"
                sx={{ 
                  bgcolor: alpha(getCategoryColor(category), 0.1),
                  color: getCategoryColor(category)
                }}
              />
            ))}
          </Box>
        </Box>

        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <TimelineIcon fontSize="small" color="action" />
            <Typography variant="caption" color="text.secondary">
              AI Confidence: {trend.confidence}%
            </Typography>
          </Box>
          <Button
            size="small"
            variant="outlined"
            sx={{ borderRadius: 1.5 }}
          >
            View Details
          </Button>
        </Box>
      </Paper>
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
                  <AutoGraphIcon fontSize="large" />
                  Forecasting & Demand Planning
                </Typography>
                <Typography variant="body1" color="text.secondary">
                  AI-powered predictions and proactive inventory optimization
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
                  startIcon={<RefreshIcon />}
                  onClick={() => setLoaded(false)}
                  sx={{ 
                    borderRadius: 2,
                    textTransform: 'none',
                    fontWeight: 600,
                    px: 3,
                    bgcolor: '#4caf50'
                  }}
                >
                  Refresh Forecasts
                </Button>
                <Button
                  variant="outlined"
                  startIcon={<DownloadIcon />}
                  sx={{ 
                    borderRadius: 2,
                    textTransform: 'none'
                  }}
                >
                  Export Report
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
                  placeholder="Search forecast items..."
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
                    label="Category"
                    value={filterCategory}
                    onChange={(e) => setFilterCategory(e.target.value)}
                    sx={{ minWidth: 140 }}
                  >
                    <MenuItem value="all">All Categories</MenuItem>
                    <MenuItem value="Pharmacy">Pharmacy</MenuItem>
                    <MenuItem value="Consumable">Consumable</MenuItem>
                    <MenuItem value="Equipment">Equipment</MenuItem>
                    <MenuItem value="Laboratory">Laboratory</MenuItem>
                  </TextField>
                  <TextField
                    select
                    size="small"
                    label="Criticality"
                    value={filterCriticality}
                    onChange={(e) => setFilterCriticality(e.target.value)}
                    sx={{ minWidth: 140 }}
                  >
                    <MenuItem value="all">All Criticality</MenuItem>
                    <MenuItem value="critical">Critical</MenuItem>
                    <MenuItem value="high">High</MenuItem>
                    <MenuItem value="medium">Medium</MenuItem>
                    <MenuItem value="low">Low</MenuItem>
                  </TextField>
                  <TextField
                    select
                    size="small"
                    label="Time Range"
                    value={timeRange}
                    onChange={(e) => setTimeRange(e.target.value)}
                    sx={{ minWidth: 140 }}
                  >
                    <MenuItem value="weekly">Weekly</MenuItem>
                    <MenuItem value="monthly">Monthly</MenuItem>
                    <MenuItem value="quarterly">Quarterly</MenuItem>
                  </TextField>
                </Box>
              </Box>
            </Paper>
          </Box>
        </Slide>

        {/* AI Confidence Indicator */}
        <Grow in={loaded} timeout={400}>
          <Paper sx={{ 
            p: 2, 
            mb: 4,
            borderRadius: 2,
            bgcolor: alpha('#4caf50', 0.05),
            border: `1px solid ${alpha('#4caf50', 0.2)}`
          }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <Avatar sx={{ bgcolor: '#4caf50', color: 'white' }}>
                  <AnalyticsIcon />
                </Avatar>
                <Box>
                  <Typography variant="h6" sx={{ fontWeight: 600 }}>
                    AI Forecast Confidence
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Overall prediction accuracy based on historical data
                  </Typography>
                </Box>
              </Box>
              <Box sx={{ textAlign: 'right' }}>
                <Typography variant="h3" sx={{ fontWeight: 700, color: '#4caf50' }}>
                  {confidenceLevel}%
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  Confidence Score
                </Typography>
              </Box>
            </Box>
            <LinearProgress 
              variant="determinate" 
              value={confidenceLevel} 
              sx={{ 
                mt: 2,
                height: 8,
                borderRadius: 4,
                bgcolor: alpha('#4caf50', 0.1),
                '& .MuiLinearProgress-bar': {
                  bgcolor: '#4caf50',
                  borderRadius: 4
                }
              }}
            />
          </Paper>
        </Grow>

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
                icon={<Badge badgeContent={filteredForecast.filter(f => f.stockoutRisk === 'high').length} color="error" />}
                iconPosition="start"
                label="Demand Forecasts" 
              />
              <Tab 
                icon={<Badge badgeContent={seasonalTrends.length} color="warning" />}
                iconPosition="start"
                label="Seasonal Trends" 
              />
              <Tab 
                icon={<Badge badgeContent={hospitalEvents.length} color="info" />}
                iconPosition="start"
                label="Event Impact" 
              />
              <Tab 
                icon={<Badge badgeContent={parLevelRecommendations.filter(r => r.priority === 'high').length} color="primary" />}
                iconPosition="start"
                label="Par Level Recommendations" 
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
                    Forecasted Demand by Item
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {filteredForecast.length} items analyzed • {filteredForecast.filter(f => f.stockoutRisk === 'high').length} high-risk items
                  </Typography>
                </Box>

                <Box sx={{ 
                  display: 'grid', 
                  gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))', 
                  gap: 3,
                  mb: 4
                }}>
                  {filteredForecast.map((item) => (
                    <ForecastCard key={item.id} item={item} />
                  ))}
                </Box>

                {filteredForecast.length === 0 && (
                  <Paper sx={{ 
                    p: 8, 
                    textAlign: 'center',
                    borderRadius: 2,
                    bgcolor: alpha(theme.palette.primary.main, 0.02)
                  }}>
                    <AutoGraphIcon sx={{ fontSize: 64, color: 'text.disabled', mb: 2 }} />
                    <Typography variant="h6" color="text.secondary" gutterBottom>
                      No forecast data found
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
                <Box sx={{ mb: 4 }}>
                  <Typography variant="h6" gutterBottom>
                    Seasonal Trends & Patterns
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    AI-identified seasonal patterns affecting inventory demand
                  </Typography>
                </Box>

                <Box sx={{ 
                  display: 'grid', 
                  gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', 
                  gap: 3,
                  mb: 4
                }}>
                  {seasonalTrends.map((trend) => (
                    <SeasonalTrendCard key={trend.id} trend={trend} />
                  ))}
                </Box>

                <Alert 
                  severity="info" 
                  icon={<TimelineIcon />}
                  sx={{ borderRadius: 2 }}
                >
                  <Typography variant="body2">
                    Seasonal trends are analyzed using 5+ years of historical data. 
                    These patterns help anticipate demand spikes and optimize inventory levels proactively.
                  </Typography>
                </Alert>
              </Box>
            )}

            {activeTab === 2 && (
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
                        Hospital Event Impact Analysis
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        Forecasted demand changes due to upcoming hospital events
                      </Typography>
                    </Box>
                    <Button
                      variant="contained"
                      startIcon={<EventIcon />}
                      onClick={handleOpenEventDialog}
                      sx={{ borderRadius: 2 }}
                    >
                      Add New Event
                    </Button>
                  </Box>
                </Box>

                <TableContainer component={Paper} sx={{ borderRadius: 2, mb: 4 }}>
                  <Table>
                    <TableHead sx={{ bgcolor: alpha('#9c27b0', 0.05) }}>
                      <TableRow>
                        <TableCell sx={{ fontWeight: 600 }}>Event Details</TableCell>
                        <TableCell sx={{ fontWeight: 600 }}>Timeline</TableCell>
                        <TableCell sx={{ fontWeight: 600 }}>Impact Level</TableCell>
                        <TableCell sx={{ fontWeight: 600 }}>Affected Items</TableCell>
                        <TableCell sx={{ fontWeight: 600 }}>Demand Increase</TableCell>
                        <TableCell sx={{ fontWeight: 600 }}>Actions</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {hospitalEvents.map((event, index) => (
                        <Grow in={true} timeout={300} key={event.id} style={{ transitionDelay: `${index * 50}ms` }}>
                          <TableRow
                            sx={{
                              '&:hover': { 
                                backgroundColor: alpha(getImpactColor(event.impact), 0.04),
                                transition: 'background-color 0.3s'
                              }
                            }}
                          >
                            <TableCell>
                              <Box>
                                <Typography variant="body2" fontWeight={600}>
                                  {event.name}
                                </Typography>
                                <Typography variant="caption" color="text.secondary">
                                  {event.description}
                                </Typography>
                              </Box>
                            </TableCell>
                            <TableCell>
                              <Box>
                                <Typography variant="body2">
                                  {event.date}
                                </Typography>
                                <Typography variant="caption" color="text.secondary">
                                  {event.duration} day(s)
                                </Typography>
                              </Box>
                            </TableCell>
                            <TableCell>
                              <Chip 
                                icon={event.impact === 'high' ? <ErrorIcon /> : 
                                      event.impact === 'medium' ? <WarningIcon /> : <CheckCircleIcon />}
                                label={event.impact.toUpperCase()}
                                size="small"
                                sx={{ 
                                  bgcolor: alpha(getImpactColor(event.impact), 0.1),
                                  color: getImpactColor(event.impact)
                                }}
                              />
                            </TableCell>
                            <TableCell>
                              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                                {event.affectedItems.slice(0, 2).map((item, idx) => (
                                  <Chip 
                                    key={idx}
                                    label={item}
                                    size="small"
                                    sx={{ fontSize: '0.7rem' }}
                                  />
                                ))}
                                {event.affectedItems.length > 2 && (
                                  <Chip 
                                    label={`+${event.affectedItems.length - 2}`}
                                    size="small"
                                    sx={{ fontSize: '0.7rem' }}
                                  />
                                )}
                              </Box>
                            </TableCell>
                            <TableCell>
                              <Typography variant="body2" fontWeight={600} color="error">
                                {event.predictedIncrease}
                              </Typography>
                            </TableCell>
                            <TableCell>
                              <Tooltip title="Run Impact Analysis">
                                <IconButton size="small" color="primary">
                                  <AnalyticsIcon />
                                </IconButton>
                              </Tooltip>
                              <Tooltip title="View Details">
                                <IconButton size="small">
                                  <InfoIcon />
                                </IconButton>
                              </Tooltip>
                            </TableCell>
                          </TableRow>
                        </Grow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>

                <Alert 
                  severity="warning" 
                  icon={<WarningIcon />}
                  sx={{ borderRadius: 2 }}
                >
                  <Typography variant="body2">
                    Upcoming events may significantly impact inventory demand. 
                    Review these forecasts and adjust orders accordingly.
                  </Typography>
                </Alert>
              </Box>
            )}

            {activeTab === 3 && (
              <Box>
                <Box sx={{ mb: 3 }}>
                  <Typography variant="h6" gutterBottom>
                    AI-Powered Par Level Recommendations
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Smart suggestions to optimize inventory levels based on forecasted demand
                  </Typography>
                </Box>

                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mb: 4 }}>
                  {parLevelRecommendations.map((recommendation, index) => (
                    <Grow in={true} timeout={400} key={recommendation.id} style={{ transitionDelay: `${index * 100}ms` }}>
                      <Paper sx={{ 
                        p: 3, 
                        borderRadius: 2,
                        borderLeft: `4px solid ${getCriticalityColor(recommendation.priority)}`,
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
                                bgcolor: alpha(getCriticalityColor(recommendation.priority), 0.1),
                                color: getCriticalityColor(recommendation.priority)
                              }}>
                                <CompareIcon />
                              </Avatar>
                              <Box>
                                <Typography variant="h6" sx={{ fontWeight: 600 }}>
                                  {recommendation.itemName}
                                </Typography>
                                <Chip 
                                  label={`Priority: ${recommendation.priority.toUpperCase()}`}
                                  size="small"
                                  sx={{ 
                                    bgcolor: alpha(getCriticalityColor(recommendation.priority), 0.1),
                                    color: getCriticalityColor(recommendation.priority)
                                  }}
                                />
                              </Box>
                            </Box>

                            <Box sx={{ 
                              p: 2, 
                              mb: 2,
                              borderRadius: 1.5,
                              bgcolor: alpha('#4caf50', 0.05),
                              border: `1px solid ${alpha('#4caf50', 0.1)}`
                            }}>
                              <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                                Recommended Change
                              </Typography>
                              <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 2 }}>
                                <Box>
                                  <Typography variant="caption" color="text.secondary">Current Par Level</Typography>
                                  <Typography variant="body1" fontWeight={600}>
                                    {recommendation.currentPar}
                                  </Typography>
                                </Box>
                                <Box>
                                  <Typography variant="caption" color="text.secondary">Recommended Par</Typography>
                                  <Typography variant="body1" fontWeight={600} color={
                                    recommendation.change.startsWith('+') ? 'success.main' : 'warning.main'
                                  }>
                                    {recommendation.recommendedPar}
                                  </Typography>
                                </Box>
                                <Box>
                                  <Typography variant="caption" color="text.secondary">Change</Typography>
                                  <Typography variant="body1" fontWeight={600} color={
                                    recommendation.change.startsWith('+') ? 'success.main' : 'warning.main'
                                  }>
                                    {recommendation.change}
                                  </Typography>
                                </Box>
                              </Box>
                            </Box>

                            <Box>
                              <Typography variant="caption" color="text.secondary" display="block">
                                Reasoning
                              </Typography>
                              <Typography variant="body2">
                                {recommendation.reason}
                              </Typography>
                            </Box>

                            <Box sx={{ mt: 2 }}>
                              <Typography variant="caption" color="text.secondary">
                                Suggested Implementation: {recommendation.implementationDate}
                              </Typography>
                            </Box>
                          </Box>

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
                              sx={{ 
                                borderRadius: 1.5,
                                textTransform: 'none',
                                fontWeight: 600
                              }}
                            >
                              Apply
                            </Button>
                            <Button
                              fullWidth={isMobile}
                              variant="outlined"
                              startIcon={<InfoIcon />}
                              sx={{ 
                                borderRadius: 1.5,
                                textTransform: 'none'
                              }}
                            >
                              Details
                            </Button>
                            <Button
                              fullWidth={isMobile}
                              variant="outlined"
                              color="error"
                              startIcon={<InfoIcon />}
                              sx={{ 
                                borderRadius: 1.5,
                                textTransform: 'none'
                              }}
                            >
                              Dismiss
                            </Button>
                          </Box>
                        </Box>
                      </Paper>
                    </Grow>
                  ))}
                </Box>

                <Alert 
                  severity="info" 
                  icon={<AutoGraphIcon />}
                  sx={{ borderRadius: 2 }}
                >
                  <Typography variant="body2">
                    These recommendations are generated using machine learning algorithms 
                    analyzing historical usage, forecasted demand, and seasonal patterns. 
                    Applying these changes can reduce stockouts by up to 65%.
                  </Typography>
                </Alert>
              </Box>
            )}
          </Box>
        </Grow>

        {/* AI Insights */}
        <Grow in={loaded} timeout={800}>
          <Paper sx={{ 
            p: 3, 
            mt: 4, 
            borderRadius: 2,
            bgcolor: alpha('#9c27b0', 0.05),
            border: `1px solid ${alpha('#9c27b0', 0.2)}`
          }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <Box>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                  <AutoGraphIcon color="secondary" />
                  <Typography variant="h6" sx={{ fontWeight: 600 }}>
                    AI Forecasting Insights
                  </Typography>
                </Box>
                <Typography variant="body2" paragraph>
                  {filteredForecast.filter(f => f.stockoutRisk === 'high').length > 0 ? 
                    `⚠️ **Critical Alert**: ${filteredForecast.filter(f => f.stockoutRisk === 'high').length} items at high risk of stockout within 7 days. Immediate action recommended for Epinephrine 1mg (+50% par level) and Insulin Vials (+20% par level).` :
                    '✅ **Stable Forecast**: All critical items maintain sufficient coverage. Focus on optimizing par levels for cost efficiency.'
                  }
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Next forecast update: 4 hours • Model trained on 3+ years of historical data
                </Typography>
              </Box>
              <Box sx={{ textAlign: 'right' }}>
                <Chip 
                  label="94% Accuracy" 
                  color="secondary" 
                  sx={{ fontWeight: 600, mb: 1 }}
                />
                <Typography variant="caption" color="text.secondary" display="block">
                  ML Model Confidence
                </Typography>
              </Box>
            </Box>
          </Paper>
        </Grow>

        {/* Scenario Simulation Dialog */}
        <Dialog 
          open={openScenarioDialog} 
          onClose={handleCloseScenarioDialog}
          maxWidth="md"
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
                <ChartIcon />
              </Avatar>
              <Box>
                <Typography variant="h6" sx={{ fontWeight: 600 }}>
                  What-if Scenario Simulation
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  {selectedItem ? `Simulating demand changes for ${selectedItem.name}` : 'Create custom forecast scenario'}
                </Typography>
              </Box>
            </Box>
          </DialogTitle>
          <DialogContent sx={{ pt: 3 }}>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
              <TextField
                fullWidth
                label="Scenario Name"
                value={scenarioForm.scenarioName}
                onChange={(e) => setScenarioForm({...scenarioForm, scenarioName: e.target.value})}
                required
              />

              <Box>
                <Typography gutterBottom>
                  Demand Increase: {scenarioForm.demandIncrease}%
                </Typography>
                <Slider
                  value={scenarioForm.demandIncrease}
                  onChange={(e, newValue) => setScenarioForm({...scenarioForm, demandIncrease: newValue})}
                  aria-labelledby="demand-increase-slider"
                  valueLabelDisplay="auto"
                  step={5}
                  marks
                  min={0}
                  max={100}
                />
              </Box>

              <Box>
                <Typography gutterBottom>
                  Duration: {scenarioForm.duration} days
                </Typography>
                <Slider
                  value={scenarioForm.duration}
                  onChange={(e, newValue) => setScenarioForm({...scenarioForm, duration: newValue})}
                  aria-labelledby="duration-slider"
                  valueLabelDisplay="auto"
                  step={7}
                  marks
                  min={7}
                  max={90}
                />
              </Box>

              <TextField
                fullWidth
                label="Scenario Description"
                value={scenarioForm.description}
                onChange={(e) => setScenarioForm({...scenarioForm, description: e.target.value})}
                multiline
                rows={3}
                placeholder="Describe the scenario and expected impact..."
              />

              {selectedItem && (
                <Paper sx={{ p: 2, borderRadius: 2, bgcolor: alpha('#ff9800', 0.05) }}>
                  <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                    Current Forecast vs. Scenario
                  </Typography>
                  <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 2 }}>
                    <Box>
                      <Typography variant="caption" color="text.secondary">Current Monthly Forecast</Typography>
                      <Typography variant="body1" fontWeight={600}>
                        {selectedItem.monthlyAverage} {selectedItem.unit}
                      </Typography>
                    </Box>
                    <Box>
                      <Typography variant="caption" color="text.secondary">Scenario Forecast</Typography>
                      <Typography variant="body1" fontWeight={600} color="error">
                        {Math.round(selectedItem.monthlyAverage * (1 + scenarioForm.demandIncrease / 100))} {selectedItem.unit}
                      </Typography>
                    </Box>
                    <Box>
                      <Typography variant="caption" color="text.secondary">Stock Coverage Impact</Typography>
                      <Typography variant="body1" fontWeight={600} color="error">
                        -{Math.round((scenarioForm.demandIncrease / 100) * 50)} days
                      </Typography>
                    </Box>
                  </Box>
                </Paper>
              )}

              <Alert severity="info">
                <Typography variant="body2">
                  Scenario simulations help anticipate demand changes and prepare contingency plans.
                  Results are based on historical patterns and may vary in real-world conditions.
                </Typography>
              </Alert>
            </Box>
          </DialogContent>
          <DialogActions sx={{ p: 2, borderTop: `1px solid ${theme.palette.divider}` }}>
            <Button onClick={handleCloseScenarioDialog}>
              Cancel
            </Button>
            <Button 
              variant="contained" 
              color="warning"
              onClick={handleRunScenario}
              sx={{ 
                borderRadius: 1.5,
                px: 3,
                fontWeight: 600
              }}
            >
              Run Simulation
            </Button>
          </DialogActions>
        </Dialog>

        {/* Event Dialog */}
        <Dialog 
          open={openEventDialog} 
          onClose={handleCloseEventDialog}
          maxWidth="sm"
          fullWidth
          PaperProps={{
            sx: { borderRadius: 2 }
          }}
        >
          <DialogTitle>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <EventIcon color="primary" />
              <Typography variant="h6" sx={{ fontWeight: 600 }}>
                Add Hospital Event
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
                Add upcoming hospital events to forecast their impact on inventory demand.
                The AI will analyze similar past events to predict demand changes.
              </Typography>
              <Alert severity="info">
                Full event management functionality will be available in the next update.
              </Alert>
            </Paper>
          </DialogContent>
          <DialogActions sx={{ p: 2, borderTop: `1px solid ${theme.palette.divider}` }}>
            <Button onClick={handleCloseEventDialog}>
              Close
            </Button>
          </DialogActions>
        </Dialog>
      </Box>
    </Fade>
  );
};

export default ForecastingDemandPlanning;