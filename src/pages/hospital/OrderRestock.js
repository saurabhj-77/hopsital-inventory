import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Card,
  CardContent,
  Grid,
  Chip,
  Button,
  Modal,
  Fade,
  Slide,
  Grow,
  TextField,
  Divider,
  Avatar,
  Tooltip,
  Paper,
  alpha,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  IconButton,
  LinearProgress,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Badge
} from '@mui/material';
import {
  Add as AddIcon,
  SmartToy as AiIcon,
  LocalShipping as ShippingIcon,
  Inventory as InventoryIcon,
  Warning as WarningIcon,
  Error as ErrorIcon,
  CheckCircle as CheckCircleIcon,
  CalendarToday as CalendarIcon,
  TrendingUp as TrendingUpIcon,
  TrendingDown as TrendingDownIcon,
  RocketLaunch as RocketIcon,
  Analytics as AnalyticsIcon,
  Schedule as ScheduleIcon,
  Schedule as EmergencyIcon,
  LocalHospital as MedicalIcon,
  Science as ScienceIcon,
  ArrowForward as ArrowForwardIcon,
  Close as CloseIcon,
  PlayArrow as PlayIcon,
  Download as DownloadIcon,
  Share as ShareIcon
} from '@mui/icons-material';

// Sample data for orders and restock
const initialOrdersData = {
  pendingOrders: [
    {
      id: 1,
      product: 'Paracetamol 500mg',
      quantity: 200,
      supplier: 'MedSupply Pvt Ltd',
      orderDate: '2024-01-15',
      expectedDelivery: '2024-01-22',
      status: 'Processing',
      priority: 'High',
      value: 2400
    },
    {
      id: 2,
      product: 'Insulin Vials',
      quantity: 50,
      supplier: 'Diabetic Care Inc',
      orderDate: '2024-01-14',
      expectedDelivery: '2024-01-25',
      status: 'Shipped',
      priority: 'Critical',
      value: 1500
    },
    {
      id: 3,
      product: 'Surgical Gloves',
      quantity: 500,
      supplier: 'SafeTouch Medical',
      orderDate: '2024-01-16',
      expectedDelivery: '2024-01-23',
      status: 'Processing',
      priority: 'Medium',
      value: 750
    }
  ],
  loanStock: [
    {
      id: 1,
      product: 'Ventilator Circuits',
      quantity: 5,
      fromDepartment: 'ICU',
      toDepartment: 'Emergency',
      loanDate: '2024-01-10',
      expectedReturn: '2024-01-24',
      status: 'Active'
    },
    {
      id: 2,
      product: 'Patient Monitors',
      quantity: 2,
      fromDepartment: 'Surgery',
      toDepartment: 'Pediatrics',
      loanDate: '2024-01-12',
      expectedReturn: '2024-01-26',
      status: 'Active'
    }
  ],
  aiRecommendations: [
    {
      id: 1,
      name: 'Paracetamol 500mg',
      currentStock: 100,
      recommendedOrder: 200,
      urgency: 'Critical',
      daysToStockout: 7,
      lastOrder: '2024-06-16',
      reason: 'High consumption rate',
      supplier: 'MedSupply Pvt Ltd',
      deliveryTime: '3-5 days',
      cost: 2400
    },
    {
      id: 2,
      name: 'Insulin Vials',
      currentStock: 8,
      recommendedOrder: 50,
      urgency: 'Critical',
      daysToStockout: 3,
      lastOrder: '2024-08-10',
      reason: 'Critical low stock',
      supplier: 'Diabetic Care Inc',
      deliveryTime: '5-7 days',
      cost: 1500
    },
    {
      id: 3,
      name: 'Amoxicillin 250mg',
      currentStock: 6,
      recommendedOrder: 100,
      urgency: 'High',
      daysToStockout: 5,
      lastOrder: '2024-07-26',
      reason: 'Seasonal demand increase',
      supplier: 'PharmaCorp',
      deliveryTime: '2-4 days',
      cost: 1200
    },
    {
      id: 4,
      name: 'Surgical Masks',
      currentStock: 200,
      recommendedOrder: 1000,
      urgency: 'Medium',
      daysToStockout: 14,
      lastOrder: '2024-11-20',
      reason: 'Below safety stock level',
      supplier: 'SafeTouch Medical',
      deliveryTime: '1-3 days',
      cost: 500
    }
  ],
  stats: {
    totalOrders: 12,
    pendingOrders: 3,
    completedThisMonth: 9,
    totalValue: 15200,
    aiAccuracy: '94%'
  }
};

const OrdersRestock = () => {
  const [ordersData, setOrdersData] = useState(initialOrdersData);
  const [showAIRecommendations, setShowAIRecommendations] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [orderModalOpen, setOrderModalOpen] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [aiLoading, setAiLoading] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setLoaded(true), 400);
    return () => clearTimeout(timer);
  }, []);

  const handleGetAIRecommendations = () => {
    setAiLoading(true);
    // Simulate AI processing delay
    setTimeout(() => {
      setShowAIRecommendations(true);
      setAiLoading(false);
    }, 2000);
  };

  const handlePlaceOrder = (recommendation) => {
    const newOrder = {
      id: ordersData.pendingOrders.length + 1,
      product: recommendation.name,
      quantity: recommendation.recommendedOrder,
      supplier: recommendation.supplier,
      orderDate: new Date().toISOString().split('T')[0],
      expectedDelivery: new Date(Date.now() + recommendation.deliveryTime.split('-')[0] * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      status: 'Processing',
      priority: recommendation.urgency,
      value: recommendation.cost
    };
    
    setOrdersData(prev => ({
      ...prev,
      pendingOrders: [...prev.pendingOrders, newOrder]
    }));
  };

  const getUrgencyColor = (urgency) => {
    switch (urgency) {
      case 'Critical': return '#ff4757';
      case 'High': return '#ffa502';
      case 'Medium': return '#ffc107';
      case 'Low': return '#2ed573';
      default: return '#a4b0be';
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Processing': return '#ffa502';
      case 'Shipped': return '#2e86de';
      case 'Delivered': return '#2ed573';
      case 'Cancelled': return '#ff4757';
      default: return '#a4b0be';
    }
  };

  const StatCard = ({ title, value, subtitle, icon, color, gradient, delay = 0 }) => (
    <Grow in={loaded} timeout={500 + delay}>
      <Card sx={{ 
        background: gradient,
        color: 'black',
        height: '100%', 
        borderRadius: 3,
        transition: 'all 0.3s ease',
        '&:hover': {
          transform: 'translateY(-4px)',
          boxShadow: `0 12px 24px ${alpha(color, 0.3)}`
        }
      }}>
        <CardContent sx={{ p: 3 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <Box>
              <Typography variant="h4" fontWeight="800" sx={{ mb: 0.5 }}>
                {value}
              </Typography>
              <Typography variant="h5" sx={{ opacity: 0.9, fontWeight: 600 }}>
                {title}
              </Typography>
              <Typography variant="h6" sx={{ opacity: 0.8, mt: 1 }}>
                {subtitle}
              </Typography>
            </Box>
            <Box sx={{ 
              background: 'rgba(255,255,255,0.2)', 
              borderRadius: 2, 
              p: 1,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              {icon}
            </Box>
          </Box>
        </CardContent>
      </Card>
    </Grow>
  );

  const AIRecommendationCard = ({ recommendation, index }) => (
    <Slide in={showAIRecommendations} direction="up" timeout={500 + index * 200}>
      <Card sx={{ 
        mb: 2, 
        border: `2px solid ${getUrgencyColor(recommendation.urgency)}`,
        background: `linear-gradient(135deg, ${alpha(getUrgencyColor(recommendation.urgency), 0.1)} 0%, ${alpha(getUrgencyColor(recommendation.urgency), 0.05)} 100%)`,
        borderRadius: 3,
        transition: 'all 0.3s ease',
        '&:hover': {
          transform: 'translateX(8px)',
          boxShadow: `0 8px 24px ${alpha(getUrgencyColor(recommendation.urgency), 0.2)}`
        }
      }}>
        <CardContent sx={{ p: 3 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
            <Box>
              <Typography variant="h6" fontWeight="700" color="#2c3e50" gutterBottom>
                {recommendation.name}
              </Typography>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, flexWrap: 'wrap' }}>
                <Chip 
                  label={recommendation.urgency} 
                  size="small"
                  sx={{
                    backgroundColor: getUrgencyColor(recommendation.urgency),
                    color: 'white',
                    fontWeight: 700
                  }}
                />
                <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 600 }}>
                  Stockout in {recommendation.daysToStockout} days
                </Typography>
              </Box>
            </Box>
            <Avatar sx={{ bgcolor: alpha(getUrgencyColor(recommendation.urgency), 0.2), color: getUrgencyColor(recommendation.urgency) }}>
              <AiIcon />
            </Avatar>
          </Box>

          <Grid container spacing={2} sx={{ mb: 2 }}>
            <Grid item xs={12} sm={6}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Typography variant="body2" color="text.secondary" fontWeight="600">
                  Current Stock:
                </Typography>
                <Typography variant="body2" fontWeight="700" color={recommendation.currentStock < 20 ? '#ff4757' : '#2ed573'}>
                  {recommendation.currentStock} units
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Typography variant="body2" color="text.secondary" fontWeight="600">
                  Recommended:
                </Typography>
                <Typography variant="body2" fontWeight="700" color="#667eea">
                  {recommendation.recommendedOrder} units
                </Typography>
              </Box>
            </Grid>
          </Grid>

          <LinearProgress 
            variant="determinate" 
            value={(recommendation.currentStock / (recommendation.currentStock + recommendation.recommendedOrder)) * 100} 
            sx={{ 
              height: 6, 
              borderRadius: 3, 
              mb: 2,
              backgroundColor: alpha(getUrgencyColor(recommendation.urgency), 0.2),
              '& .MuiLinearProgress-bar': {
                backgroundColor: getUrgencyColor(recommendation.urgency)
              }
            }}
          />

          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
            <Typography variant="caption" color="text.secondary">
              📦 {recommendation.supplier}
            </Typography>
            <Typography variant="caption" color="text.secondary" fontWeight="600">
              🚚 {recommendation.deliveryTime}
            </Typography>
            <Typography variant="caption" color="text.secondary" fontWeight="600">
              💰 ${recommendation.cost}
            </Typography>
          </Box>

          <Typography variant="body2" color="text.secondary" sx={{ mb: 2, fontStyle: 'italic' }}>
            💡 {recommendation.reason}
          </Typography>

          <Box sx={{ display: 'flex', gap: 1 }}>
            <Button
              variant="contained"
              size="small"
              onClick={() => handlePlaceOrder(recommendation)}
              sx={{
                background: `linear-gradient(135deg, ${getUrgencyColor(recommendation.urgency)} 0%, ${alpha(getUrgencyColor(recommendation.urgency), 0.8)} 100%)`,
                fontWeight: 700
              }}
            >
              Place Order
            </Button>
            <Button
              variant="outlined"
              size="small"
              sx={{
                borderColor: getUrgencyColor(recommendation.urgency),
                color: getUrgencyColor(recommendation.urgency),
                fontWeight: 600
              }}
            >
              View Details
            </Button>
          </Box>
        </CardContent>
      </Card>
    </Slide>
  );

  const OrderTableRow = ({ order, index }) => (
    <Grow in={loaded} timeout={500 + index * 100}>
      <TableRow 
        sx={{ 
          cursor: 'pointer',
          transition: 'all 0.2s ease',
          '&:hover': {
            backgroundColor: alpha('#667eea', 0.05),
            transform: 'translateX(4px)'
          }
        }}
        onClick={() => {
          setSelectedOrder(order);
          setOrderModalOpen(true);
        }}
      >
        <TableCell>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
            <Avatar sx={{ bgcolor: alpha(getUrgencyColor(order.priority), 0.2), color: getUrgencyColor(order.priority), width: 32, height: 32 }}>
              <InventoryIcon fontSize="small" />
            </Avatar>
            <Box>
              <Typography variant="body2" fontWeight="600">
                {order.product}
              </Typography>
              <Typography variant="caption" color="text.secondary">
                {order.supplier}
              </Typography>
            </Box>
          </Box>
        </TableCell>
        <TableCell>
          <Typography variant="body2" fontWeight="700" color="#667eea">
            {order.quantity} units
          </Typography>
        </TableCell>
        <TableCell>
          <Chip 
            label={order.status} 
            size="small"
            sx={{
              backgroundColor: alpha(getStatusColor(order.status), 0.1),
              color: getStatusColor(order.status),
              fontWeight: 600,
              border: `1px solid ${getStatusColor(order.status)}`
            }}
          />
        </TableCell>
        <TableCell>
          <Chip 
            label={order.priority} 
            size="small"
            sx={{
              backgroundColor: getUrgencyColor(order.priority),
              color: 'white',
              fontWeight: 600
            }}
          />
        </TableCell>
        <TableCell>
          <Typography variant="body2" fontWeight="600">
            {new Date(order.expectedDelivery).toLocaleDateString()}
          </Typography>
        </TableCell>
        <TableCell>
          <Typography variant="body2" fontWeight="700" color="#2ed573">
            ${order.value}
          </Typography>
        </TableCell>
      </TableRow>
    </Grow>
  );

  return (
    <Box sx={{ p: 4, minHeight: '100vh', background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)' }}>
      {/* Header */}
      <Box sx={{ mb: 4 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 3 }}>
          <Box>
            <Typography variant="h4"
                sx={{
                  fontWeight: 900,
                  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  mb: 1,
                  letterSpacing: 0.4,
                }}>
               Orders & Restock
            </Typography>
            <Typography variant="body1" color="text.secondary" sx={{ fontWeight: 600, mb: 1 }}>
              Trace supply levels and optimize inventory with AI-powered recommendations
            </Typography>
          </Box>
          <Button
            variant="contained"
            startIcon={<AiIcon />}
            onClick={handleGetAIRecommendations}
            disabled={aiLoading}
             sx={{
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                boxShadow: '0 10px 24px rgba(102, 126, 234, 0.35)',
                '&:hover': {
                  boxShadow: '0 16px 32px rgba(102, 126, 234, 0.45)',
                  transform: 'translateY(-2px)'
                },
                transition: 'all 0.3s ease',
                borderRadius: 2,
                px: 3,
                py: 1.5,
                fontWeight: 800,
                fontSize: '1rem'
              }}
          >
            {aiLoading ? (
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Box sx={{
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                boxShadow: '0 10px 24px rgba(102, 126, 234, 0.35)',
                '&:hover': {
                  boxShadow: '0 16px 32px rgba(102, 126, 234, 0.45)',
                  transform: 'translateY(-2px)'
                },
                transition: 'all 0.3s ease',
                borderRadius: 2,
                px: 3,
                py: 1.5,
                fontWeight: 800,
                fontSize: '1rem'
              }}/>
                AI Processing...
              </Box>
            ) : (
              'Get AI Restock Recommendations'
            )}
          </Button>
        </Box>

        {/* Stats Cards */}
        <Grid container spacing={3} sx={{ mb: 4 }}>
          <Grid item xs={12} sm={6} md={3}>
            <StatCard
              title="Total Orders"
              value={ordersData.stats.totalOrders}
              subtitle="This month"
              icon={<InventoryIcon sx={{ color: 'black', fontSize: 28 }} />}
              color="#667eea"
              gradient="linear-gradient(135deg, #667eea 0%, #764ba2 100%)"
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <StatCard
              title="Pending"
              value={ordersData.stats.pendingOrders}
              subtitle="Awaiting delivery"
              icon={<ScheduleIcon sx={{ color: 'black', fontSize: 28 }} />}
              color="#ffa502"
              gradient="linear-gradient(135deg, #ffa502 0%, #ff7e00 100%)"
              delay={200}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <StatCard
              title="Completed"
              value={ordersData.stats.completedThisMonth}
              subtitle="This month"
              icon={<CheckCircleIcon sx={{ color: 'black', fontSize: 28 }} />}
              color="#2ed573"
              gradient="linear-gradient(135deg, #2ed573 0%, #1dd1a1 100%)"
              delay={400}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <StatCard
              title="AI Accuracy"
              value={ordersData.stats.aiAccuracy}
              subtitle="Recommendation accuracy"
              icon={<RocketIcon sx={{ color: 'black', fontSize: 28 }} />}
              color="#9c27b0"
              gradient="linear-gradient(135deg, #9c27b0 0%, #673ab7 100%)"
              delay={600}
            />
          </Grid>
        </Grid>
      </Box>

      <Grid container spacing={4}>
        {/* Left Column - AI Recommendations & Pending Orders */}
        <Grid item xs={12} lg={8}>
          {/* AI Recommendations Section */}
          {showAIRecommendations && (
            <Box sx={{ mb: 4 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 3 }}>
                <AiIcon sx={{ fontSize: 32, color: '#667eea' }} />
                <Box>
                  <Typography variant="h4" fontWeight="800" color="#2c3e50">
                    AI Restock Recommendations
                  </Typography>
                  <Typography variant="body1" color="text.secondary" sx={{ fontWeight: 500 }}>
                    Smart inventory optimization based on usage patterns and trends
                  </Typography>
                </Box>
              </Box>

              <Paper sx={{ p: 3, background: 'rgba(255, 255, 255, 0.9)', borderRadius: 3 }}>
                {ordersData.aiRecommendations.map((recommendation, index) => (
                  <AIRecommendationCard 
                    key={recommendation.id} 
                    recommendation={recommendation} 
                    index={index}
                  />
                ))}
              </Paper>
            </Box>
          )}

          {/* Pending Orders Section */}
          <Box>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 3 }}>
              <ShippingIcon sx={{ fontSize: 32, color: '#ffa502' }} />
              <Box>
                <Typography variant="h4" fontWeight="800" color="#2c3e50">
                  Pending Orders
                </Typography>
                <Typography variant="body1" color="text.secondary" sx={{ fontWeight: 500 }}>
                  Active orders and their delivery status
                </Typography>
              </Box>
            </Box>

            <Paper sx={{ background: 'rgba(255, 255, 255, 0.9)', borderRadius: 3, overflow: 'hidden' }}>
              <TableContainer>
                <Table>
                  <TableHead>
                    <TableRow sx={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' }}>
                      <TableCell sx={{ color: 'white', fontWeight: 700 }}>Product</TableCell>
                      <TableCell sx={{ color: 'white', fontWeight: 700 }}>Quantity</TableCell>
                      <TableCell sx={{ color: 'white', fontWeight: 700 }}>Status</TableCell>
                      <TableCell sx={{ color: 'white', fontWeight: 700 }}>Priority</TableCell>
                      <TableCell sx={{ color: 'white', fontWeight: 700 }}>Expected Delivery</TableCell>
                      <TableCell sx={{ color: 'white', fontWeight: 700 }}>Value</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {ordersData.pendingOrders.map((order, index) => (
                      <OrderTableRow key={order.id} order={order} index={index} />
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Paper>
          </Box>
        </Grid>

        {/* Right Column - Loan Stock & Quick Actions */}
        <Grid item xs={12} lg={4}>
          {/* Loan Stock Section */}
          <Box sx={{ mb: 4 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 3 }}>
              <EmergencyIcon sx={{ fontSize: 28, color: '#ff4757' }} />
              <Box>
                <Typography variant="h5" fontWeight="800" color="#2c3e50">
                  Loan Stock
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 500 }}>
                  Inter-department equipment loans
                </Typography>
              </Box>
            </Box>

            <Paper sx={{ p: 3, background: 'rgba(255, 255, 255, 0.9)', borderRadius: 3 }}>
              {ordersData.loanStock.map((loan, index) => (
                <Grow in={loaded} timeout={700 + index * 200} key={loan.id}>
                  <Card sx={{ mb: 2, border: '1px solid #e0e0e0', borderRadius: 2 }}>
                    <CardContent sx={{ p: 2 }}>
                      <Typography variant="body1" fontWeight="700" gutterBottom>
                        {loan.product}
                      </Typography>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                        <Typography variant="body2" color="text.secondary">
                          {loan.fromDepartment} → {loan.toDepartment}
                        </Typography>
                        <Chip 
                          label={loan.status} 
                          size="small"
                          color="primary"
                          variant="outlined"
                        />
                      </Box>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Typography variant="caption" color="text.secondary">
                          Due: {new Date(loan.expectedReturn).toLocaleDateString()}
                        </Typography>
                        <Typography variant="caption" fontWeight="600" color="#667eea">
                          {loan.quantity} units
                        </Typography>
                      </Box>
                    </CardContent>
                  </Card>
                </Grow>
              ))}
            </Paper>
          </Box>

          {/* Quick Actions */}
          <Box>
            <Typography variant="h5" fontWeight="800" color="#2c3e50" gutterBottom>
              Quick Actions
            </Typography>
            <Paper sx={{ p: 2, background: 'rgba(255, 255, 255, 0.9)', borderRadius: 3 }}>
              <Grid container spacing={1}>
                {[
                  { label: 'New Manual Order', icon: <AddIcon />, color: '#667eea' },
                  { label: 'Stock Report', icon: <AnalyticsIcon />, color: '#2ed573' },
                  { label: 'Supplier Portal', icon: <InventoryIcon />, color: '#ffa502' },
                  { label: 'Export Data', icon: <DownloadIcon />, color: '#9c27b0' }
                ].map((action, index) => (
                  <Grid item xs={6} key={action.label}>
                    <Button
                      fullWidth
                      startIcon={action.icon}
                      sx={{
                        justifyContent: 'flex-start',
                        p: 1.5,
                        background: alpha(action.color, 0.1),
                        color: action.color,
                        border: `1px solid ${alpha(action.color, 0.3)}`,
                        fontWeight: 600,
                        '&:hover': {
                          background: alpha(action.color, 0.2),
                          transform: 'translateY(-2px)'
                        },
                        transition: 'all 0.3s ease'
                      }}
                    >
                      {action.label}
                    </Button>
                  </Grid>
                ))}
              </Grid>
            </Paper>
          </Box>
        </Grid>
      </Grid>

      {/* Order Detail Modal */}
      <Modal open={orderModalOpen} onClose={() => setOrderModalOpen(false)}>
        <Fade in={orderModalOpen}>
          <Box sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: { xs: '95%', sm: 600 },
            bgcolor: 'background.paper',
            borderRadius: 4,
            boxShadow: 24,
            p: 4
          }}>
            {selectedOrder && (
              <Box>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 3 }}>
                  <Typography variant="h4" fontWeight="800" color="#2c3e50">
                    Order Details
                  </Typography>
                  <IconButton onClick={() => setOrderModalOpen(false)}>
                    <CloseIcon />
                  </IconButton>
                </Box>
                {/* Order details content */}
              </Box>
            )}
          </Box>
        </Fade>
      </Modal>

      <style jsx>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </Box>
  );
};

export default OrdersRestock;