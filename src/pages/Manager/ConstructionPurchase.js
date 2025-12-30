import React, { useState, useEffect } from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Grid,
  Chip,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Stepper,
  Step,
  StepLabel,
  IconButton,
  Fab,
  Paper,
  Badge,
  Divider,
  Slide,
  Fade,
  Zoom,
  Grow,
  Container,
  useTheme,
  alpha,
  CardMedia,
} from '@mui/material';
import {
  AddShoppingCart,
  Remove,
  Add,
  LocalShipping,
  Warehouse,
  Discount,
  Close,
  CheckCircle,
  ShoppingCart as ShoppingCartIcon,
  ArrowBack,
  Delete,
  TrendingDown,
} from '@mui/icons-material';

const constructionItems = [
  {
    id: 1,
    name: 'Portland Cement',
    image: 'https://alephindia.in/images/isi/low-heat-portland-cement-is-12600.webp',
    category: 'Construction Materials',
    oldPrice: 8.50,
    newPrice: 6.80,
    discount: 20,
    transportationFee: 0.50,
    storageFee: 15,
    storagePeriod: 'monthly',
    description: 'High-quality Portland cement for construction projects',
    features: ['50kg bags', 'Water resistant', 'Fast setting'],
    bulkDiscount: 15,
    bulkThreshold: 100,
    auctionRate: 6.50
  },
  {
    id: 2,
    name: 'Clay Bricks',
    image: 'https://borotik.in/wp-content/uploads/2021/05/6-22-red-bricks-500x500_fdd63311-b4a2-40f4-9941-eaaf3ecaefd2.jpg',
    category: 'Masonry',
    oldPrice: 0.45,
    newPrice: 0.36,
    discount: 20,
    transportationFee: 0.08,
    storageFee: 8,
    storagePeriod: 'monthly',
    description: 'Premium clay bricks for durable construction',
    features: ['Standard size', 'Weather resistant', 'High strength'],
    bulkDiscount: 12,
    bulkThreshold: 5000,
    auctionRate: 0.34
  },
  {
    id: 3,
    name: 'Structural Lumber',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSNcls_XMyC9-kSlyplckEIl_wY9Nf5zSf-kQ&s',
    category: 'Wood & Timber',
    oldPrice: 3.20,
    newPrice: 2.56,
    discount: 20,
    transportationFee: 0.25,
    storageFee: 12,
    storagePeriod: 'monthly',
    description: 'Quality structural lumber for framing and construction',
    features: ['Pressure treated', 'Various sizes', 'Long lasting'],
    bulkDiscount: 18,
    bulkThreshold: 500,
    auctionRate: 2.45
  },
  {
    id: 4,
    name: 'Interior Paint',
    image: 'https://i.pinimg.com/736x/1f/20/f7/1f20f74a553b944f9b7b9051c3fd29ef.jpg',
    category: 'Finishing',
    oldPrice: 25.00,
    newPrice: 19.00,
    discount: 24,
    transportationFee: 2.50,
    storageFee: 5,
    storagePeriod: 'monthly',
    description: 'Premium interior paint with excellent coverage',
    features: ['Washable', 'Low VOC', 'Quick drying'],
    bulkDiscount: 10,
    bulkThreshold: 50,
    auctionRate: 18.50
  },
  {
    id: 5,
    name: 'Plumbing Works',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRzkyJ8OCHRN6LSD5Xi4M-kunJYN5mwPq05-A&s',
    category: 'Services',
    oldPrice: 85.00,
    newPrice: 68.00,
    discount: 20,
    transportationFee: 0,
    storageFee: 0,
    storagePeriod: 'N/A',
    description: 'Professional plumbing installation services',
    features: ['Licensed plumbers', 'Quality materials', 'Warranty included'],
    bulkDiscount: 15,
    bulkThreshold: 5,
    auctionRate: 65.00
  },
  {
    id: 6,
    name: 'Electrical Wiring',
    image: 'https://images.pexels.com/photos/257736/pexels-photo-257736.jpeg?cs=srgb&dl=pexels-pixabay-257736.jpg&fm=jpg',
    category: 'Electrical',
    oldPrice: 1.20,
    newPrice: 0.96,
    discount: 20,
    transportationFee: 0.15,
    storageFee: 8,
    storagePeriod: 'monthly',
    description: 'Copper electrical wiring for safe installations',
    features: ['Copper core', 'Various gauges', 'Safety certified'],
    bulkDiscount: 20,
    bulkThreshold: 1000,
    auctionRate: 0.90
  }
];

const ConstructionPurchase = () => {
  const theme = useTheme();
  const [selectedItem, setSelectedItem] = useState(null);
  const [cart, setCart] = useState([]);
  const [quantity, setQuantity] = useState(1);
  const [activeStep, setActiveStep] = useState(0);
  const [showCart, setShowCart] = useState(false);
  const [hoveredCard, setHoveredCard] = useState(null);

  const handleOpenDialog = (item) => {
    setSelectedItem(item);
    setQuantity(1);
    setActiveStep(0);
  };

  const handleCloseDialog = () => {
    setSelectedItem(null);
    setActiveStep(0);
  };

  const handleAddToCart = () => {
    if (selectedItem && quantity > 0) {
      const bulkDiscount = quantity >= selectedItem.bulkThreshold ? selectedItem.bulkDiscount : 0;
      const materialCost = selectedItem.newPrice * quantity;
      const discountedMaterialCost = materialCost * (1 - bulkDiscount / 100);
      const transportationCost = selectedItem.transportationFee * quantity;
      const storageCost = selectedItem.storageFee;
      const finalCost = discountedMaterialCost + transportationCost + storageCost;

      const cartItem = {
        ...selectedItem,
        quantity,
        bulkDiscount,
        materialCost: discountedMaterialCost,
        transportationCost,
        storageCost,
        finalCost,
        addedAt: new Date().toISOString()
      };

      setCart([...cart, cartItem]);
      setActiveStep(1);
    }
  };

  const handleRemoveFromCart = (index) => {
    const newCart = cart.filter((_, i) => i !== index);
    setCart(newCart);
  };

  const calculateTotals = () => {
    const subtotal = cart.reduce((sum, item) => sum + item.finalCost, 0);
    const totalDiscount = cart.reduce((sum, item) => {
      const originalCost = item.oldPrice * item.quantity;
      const discountedCost = item.materialCost;
      return sum + (originalCost - discountedCost);
    }, 0);
    const totalTransportation = cart.reduce((sum, item) => sum + item.transportationCost, 0);
    const totalStorage = cart.reduce((sum, item) => sum + item.storageCost, 0);

    return {
      subtotal,
      totalDiscount,
      totalTransportation,
      totalStorage,
      finalTotal: subtotal
    };
  };

  const getStepContent = (step) => {
    if (!selectedItem) return null;

    switch (step) {
      case 0:
        return (
          <Fade in={true} timeout={600}>
            <Box>
              <Grid container spacing={4}>
                <Grid item xs={12} md={6}>
                  <Zoom in={true} timeout={800}>
                    <Box
                      sx={{
                        height: 220,
                        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                        borderRadius: 3,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: 'white',
                        mb: 3,
                        position: 'relative',
                        overflow: 'hidden',
                        boxShadow: '0 10px 30px rgba(102, 126, 234, 0.3)',
                        '&::before': {
                          content: '""',
                          position: 'absolute',
                          top: 0,
                          left: 0,
                          right: 0,
                          bottom: 0,
                          background: 'radial-gradient(circle at 30% 50%, rgba(255,255,255,0.2) 0%, transparent 60%)',
                        }
                      }}
                    >
                      <Typography variant="h4" sx={{ fontWeight: 700, textAlign: 'center', px: 3, position: 'relative', zIndex: 1 }}>
                        {selectedItem.name}
                      </Typography>
                    </Box>
                  </Zoom>
                  
                  <Slide direction="right" in={true} timeout={700}>
                    <Box sx={{ mb: 3 }}>
                      <Typography variant="h6" gutterBottom sx={{ fontWeight: 600, mb: 2 }}>
                        Key Features
                      </Typography>
                      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1.5 }}>
                        {selectedItem.features.map((feature, index) => (
                          <Zoom in={true} timeout={800 + index * 100} key={index}>
                            <Chip
                              label={feature}
                              size="medium"
                              sx={{
                                background: alpha(theme.palette.primary.main, 0.1),
                                border: `2px solid ${alpha(theme.palette.primary.main, 0.3)}`,
                                fontWeight: 600,
                                transition: 'all 0.3s ease',
                                '&:hover': {
                                  transform: 'translateY(-2px)',
                                  background: alpha(theme.palette.primary.main, 0.2),
                                  borderColor: theme.palette.primary.main,
                                }
                              }}
                            />
                          </Zoom>
                        ))}
                      </Box>
                    </Box>
                  </Slide>
                </Grid>

                <Grid item xs={12} md={6}>
                  <Slide direction="left" in={true} timeout={600}>
                    <Card sx={{ 
                      mb: 3, 
                      background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)', 
                      color: 'white',
                      borderRadius: 3,
                      boxShadow: '0 10px 30px rgba(245, 87, 108, 0.3)',
                      overflow: 'hidden',
                      position: 'relative',
                      '&::before': {
                        content: '""',
                        position: 'absolute',
                        top: 0,
                        right: 0,
                        width: '150px',
                        height: '150px',
                        background: 'radial-gradient(circle, rgba(255,255,255,0.2) 0%, transparent 70%)',
                      }
                    }}>
                      <CardContent sx={{ position: 'relative', zIndex: 1, py: 3 }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 1 }}>
                          <Discount sx={{ fontSize: 40 }} />
                          <Typography variant="h3" sx={{ fontWeight: 800 }}>
                            {selectedItem.discount}% OFF
                          </Typography>
                        </Box>
                        <Typography variant="body1" sx={{ fontWeight: 500 }}>
                          Limited time offer - Save big today!
                        </Typography>
                      </CardContent>
                    </Card>
                  </Slide>

                  <Fade in={true} timeout={900}>
                    <Box sx={{ mb: 3 }}>
                      <Typography variant="h6" gutterBottom sx={{ fontWeight: 600, mb: 2 }}>
                        Price Comparison
                      </Typography>
                      <Grid container spacing={2}>
                        {[
                          { label: 'Old Price', value: selectedItem.oldPrice, color: 'error', icon: TrendingDown, strike: true },
                          { label: 'Current', value: selectedItem.newPrice, color: 'success', highlight: true },
                          { label: 'Auction Rate', value: selectedItem.auctionRate, color: 'warning' }
                        ].map((price, index) => (
                          <Grid item xs={4} key={index}>
                            <Zoom in={true} timeout={1000 + index * 100}>
                              <Paper 
                                elevation={price.highlight ? 8 : 2}
                                sx={{ 
                                  p: 2.5, 
                                  textAlign: 'center',
                                  background: price.highlight 
                                    ? `linear-gradient(135deg, ${alpha(theme.palette.success.main, 0.1)} 0%, ${alpha(theme.palette.success.main, 0.2)} 100%)`
                                    : alpha(theme.palette[price.color].main, 0.05),
                                  border: `2px solid ${price.highlight ? theme.palette.success.main : alpha(theme.palette[price.color].main, 0.3)}`,
                                  borderRadius: 2,
                                  transition: 'all 0.3s ease',
                                  transform: price.highlight ? 'scale(1.05)' : 'scale(1)',
                                  '&:hover': {
                                    transform: 'scale(1.08)',
                                    boxShadow: `0 8px 24px ${alpha(theme.palette[price.color].main, 0.3)}`,
                                  }
                                }}
                              >
                                <Typography variant="caption" color="text.secondary" sx={{ fontWeight: 600, textTransform: 'uppercase', letterSpacing: 1 }}>
                                  {price.label}
                                </Typography>
                                <Typography 
                                  variant="h6" 
                                  sx={{ 
                                    textDecoration: price.strike ? 'line-through' : 'none',
                                    color: `${price.color}.main`, 
                                    fontWeight: 800,
                                    mt: 0.5
                                  }}
                                >
                                  ${price.value}
                                </Typography>
                              </Paper>
                            </Zoom>
                          </Grid>
                        ))}
                      </Grid>
                    </Box>
                  </Fade>

                  <Slide direction="up" in={true} timeout={1000}>
                    <Box sx={{ mb: 3 }}>
                      <Typography variant="h6" gutterBottom sx={{ fontWeight: 600, mb: 2 }}>
                        Additional Costs
                      </Typography>
                      <Grid container spacing={2}>
                        <Grid item xs={6}>
                          <Paper 
                            elevation={0}
                            sx={{ 
                              p: 2.5, 
                              background: alpha(theme.palette.primary.main, 0.05),
                              border: `1px solid ${alpha(theme.palette.primary.main, 0.2)}`,
                              borderRadius: 2,
                              transition: 'all 0.3s ease',
                              '&:hover': {
                                transform: 'translateY(-4px)',
                                boxShadow: `0 8px 20px ${alpha(theme.palette.primary.main, 0.15)}`,
                              }
                            }}
                          >
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 1 }}>
                              <LocalShipping sx={{ color: 'primary.main', fontSize: 28 }} />
                              <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 600 }}>
                                Transportation
                              </Typography>
                            </Box>
                            <Typography variant="h6" sx={{ fontWeight: 700, color: 'primary.main' }}>
                              ${selectedItem.transportationFee}/unit
                            </Typography>
                          </Paper>
                        </Grid>
                        <Grid item xs={6}>
                          <Paper 
                            elevation={0}
                            sx={{ 
                              p: 2.5, 
                              background: alpha(theme.palette.secondary.main, 0.05),
                              border: `1px solid ${alpha(theme.palette.secondary.main, 0.2)}`,
                              borderRadius: 2,
                              transition: 'all 0.3s ease',
                              '&:hover': {
                                transform: 'translateY(-4px)',
                                boxShadow: `0 8px 20px ${alpha(theme.palette.secondary.main, 0.15)}`,
                              }
                            }}
                          >
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 1 }}>
                              <Warehouse sx={{ color: 'secondary.main', fontSize: 28 }} />
                              <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 600 }}>
                                Storage ({selectedItem.storagePeriod})
                              </Typography>
                            </Box>
                            <Typography variant="h6" sx={{ fontWeight: 700, color: 'secondary.main' }}>
                              ${selectedItem.storageFee}
                            </Typography>
                          </Paper>
                        </Grid>
                      </Grid>
                    </Box>
                  </Slide>

                  <Zoom in={true} timeout={1100}>
                    <Box>
                      <Typography variant="h6" gutterBottom sx={{ fontWeight: 600, mb: 2 }}>
                        Select Quantity
                      </Typography>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                        <IconButton 
                          onClick={() => setQuantity(Math.max(1, quantity - 1))}
                          sx={{ 
                            border: 2, 
                            borderColor: 'primary.main',
                            background: alpha(theme.palette.primary.main, 0.1),
                            transition: 'all 0.3s ease',
                            '&:hover': { 
                              backgroundColor: 'primary.main',
                              color: 'white',
                              transform: 'scale(1.1)',
                            }
                          }}
                        >
                          <Remove />
                        </IconButton>
                        <TextField
                          type="number"
                          value={quantity}
                          onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                          sx={{ 
                            width: 120,
                            '& .MuiOutlinedInput-root': {
                              borderRadius: 2,
                              fontWeight: 700,
                              fontSize: '1.2rem',
                            }
                          }}
                          inputProps={{ min: 1, style: { textAlign: 'center' } }}
                        />
                        <IconButton 
                          onClick={() => setQuantity(quantity + 1)}
                          sx={{ 
                            border: 2, 
                            borderColor: 'primary.main',
                            background: alpha(theme.palette.primary.main, 0.1),
                            transition: 'all 0.3s ease',
                            '&:hover': { 
                              backgroundColor: 'primary.main',
                              color: 'white',
                              transform: 'scale(1.1)',
                            }
                          }}
                        >
                          <Add />
                        </IconButton>
                      </Box>
                      {quantity >= selectedItem.bulkThreshold && (
                        <Slide direction="up" in={true}>
                          <Box sx={{ 
                            mt: 2, 
                            p: 2, 
                            background: alpha(theme.palette.success.main, 0.1),
                            border: `2px solid ${theme.palette.success.main}`,
                            borderRadius: 2,
                          }}>
                            <Typography variant="body2" sx={{ color: 'success.main', fontWeight: 600, display: 'flex', alignItems: 'center', gap: 1 }}>
                              <Discount /> Bulk discount of {selectedItem.bulkDiscount}% will be applied!
                            </Typography>
                          </Box>
                        </Slide>
                      )}
                    </Box>
                  </Zoom>
                </Grid>
              </Grid>
            </Box>
          </Fade>
        );

      case 1:
        const bulkDiscount = quantity >= selectedItem.bulkThreshold ? selectedItem.bulkDiscount : 0;
        const materialCost = selectedItem.newPrice * quantity;
        const discountedMaterialCost = materialCost * (1 - bulkDiscount / 100);
        const transportationCost = selectedItem.transportationFee * quantity;
        const storageCost = selectedItem.storageFee;
        const finalCost = discountedMaterialCost + transportationCost + storageCost;

        return (
          <Fade in={true} timeout={600}>
            <Box>
              <Zoom in={true} timeout={400}>
                <Box sx={{ textAlign: 'center', mb: 4 }}>
                  <CheckCircle sx={{ fontSize: 80, color: 'success.main', mb: 2 }} />
                  <Typography variant="h4" sx={{ fontWeight: 800, color: 'success.main', mb: 1 }}>
                    Successfully Added!
                  </Typography>
                  <Typography variant="body1" color="text.secondary">
                    Item has been added to your cart
                  </Typography>
                </Box>
              </Zoom>

              <Grid container spacing={4}>
                <Grid item xs={12} md={6}>
                  <Slide direction="right" in={true} timeout={700}>
                    <Card sx={{ 
                      background: `linear-gradient(135deg, ${alpha(theme.palette.primary.main, 0.1)} 0%, ${alpha(theme.palette.primary.main, 0.05)} 100%)`,
                      border: `2px solid ${alpha(theme.palette.primary.main, 0.3)}`,
                      borderRadius: 3,
                      p: 2,
                      boxShadow: '0 8px 24px rgba(0,0,0,0.08)',
                    }}>
                      <Typography variant="h6" gutterBottom sx={{ fontWeight: 700, mb: 3 }}>
                        Order Summary
                      </Typography>
                      
                      <Box sx={{ mb: 3, p: 2, background: 'white', borderRadius: 2 }}>
                        <Typography variant="body1" sx={{ fontWeight: 600, mb: 1 }}>
                          {selectedItem.name}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          Quantity: <strong>{quantity} units</strong>
                        </Typography>
                      </Box>

                      {bulkDiscount > 0 && (
                        <Zoom in={true} timeout={900}>
                          <Box sx={{ 
                            mb: 3, 
                            p: 3, 
                            background: `linear-gradient(135deg, ${alpha(theme.palette.success.main, 0.15)} 0%, ${alpha(theme.palette.success.main, 0.05)} 100%)`,
                            border: `2px solid ${theme.palette.success.main}`,
                            borderRadius: 2,
                          }}>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 1 }}>
                              <Discount sx={{ color: 'success.main', fontSize: 32 }} />
                              <Typography variant="h6" sx={{ fontWeight: 700, color: 'success.main' }}>
                                Bulk Discount Applied!
                              </Typography>
                            </Box>
                            <Typography variant="body1" sx={{ fontWeight: 600, color: 'success.dark' }}>
                              You saved ${(materialCost - discountedMaterialCost).toFixed(2)} ({bulkDiscount}% off)
                            </Typography>
                          </Box>
                        </Zoom>
                      )}

                      <Box sx={{ space: 2 }}>
                        {[
                          { label: 'Material Cost', value: discountedMaterialCost },
                          { label: 'Transportation', value: transportationCost },
                          { label: `Storage (${selectedItem.storagePeriod})`, value: storageCost }
                        ].map((item, index) => (
                          <Slide direction="left" in={true} timeout={800 + index * 100} key={index}>
                            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2, p: 1.5, background: 'white', borderRadius: 1 }}>
                              <Typography variant="body1">{item.label}:</Typography>
                              <Typography variant="body1" sx={{ fontWeight: 700 }}>${item.value.toFixed(2)}</Typography>
                            </Box>
                          </Slide>
                        ))}
                        <Divider sx={{ my: 2 }} />
                        <Zoom in={true} timeout={1200}>
                          <Box sx={{ 
                            display: 'flex', 
                            justifyContent: 'space-between',
                            p: 2,
                            background: `linear-gradient(135deg, ${alpha(theme.palette.primary.main, 0.2)} 0%, ${alpha(theme.palette.primary.main, 0.1)} 100%)`,
                            borderRadius: 2,
                          }}>
                            <Typography variant="h6" sx={{ fontWeight: 700 }}>Final Cost:</Typography>
                            <Typography variant="h5" sx={{ fontWeight: 900, color: 'primary.main' }}>
                              ${finalCost.toFixed(2)}
                            </Typography>
                          </Box>
                        </Zoom>
                      </Box>
                    </Card>
                  </Slide>
                </Grid>

                <Grid item xs={12} md={6}>
                  <Slide direction="left" in={true} timeout={700}>
                    <Box sx={{ textAlign: 'center', py: 4 }}>
                      <Typography variant="h6" gutterBottom sx={{ fontWeight: 600, mb: 1 }}>
                        What's Next?
                      </Typography>
                      <Typography variant="body2" color="text.secondary" sx={{ mb: 4 }}>
                        Continue shopping or proceed to checkout
                      </Typography>
                      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                        <Zoom in={true} timeout={1000}>
                          <Button
                            variant="outlined"
                            size="large"
                            onClick={handleCloseDialog}
                            sx={{
                              py: 1.5,
                              borderWidth: 2,
                              borderRadius: 2,
                              fontWeight: 600,
                              '&:hover': {
                                borderWidth: 2,
                                transform: 'translateY(-2px)',
                              }
                            }}
                          >
                            Continue Shopping
                          </Button>
                        </Zoom>
                        <Zoom in={true} timeout={1100}>
                          <Button
                            variant="contained"
                            size="large"
                            onClick={() => {
                              setShowCart(true);
                              handleCloseDialog();
                            }}
                            sx={{
                              py: 1.5,
                              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                              borderRadius: 2,
                              fontWeight: 700,
                              boxShadow: '0 8px 20px rgba(102, 126, 234, 0.4)',
                              '&:hover': {
                                transform: 'translateY(-2px)',
                                boxShadow: '0 12px 28px rgba(102, 126, 234, 0.5)',
                              }
                            }}
                          >
                            View Cart
                          </Button>
                        </Zoom>
                      </Box>
                    </Box>
                  </Slide>
                </Grid>
              </Grid>
            </Box>
          </Fade>
        );

      default:
        return 'Unknown step';
    }
  };

  const ConstructionItemCard = ({ item, index }) => (
    <Grow in={true} timeout={300 + index * 100}>
      <Card
        onMouseEnter={() => setHoveredCard(item.id)}
        onMouseLeave={() => setHoveredCard(null)}
        sx={{
          height: "100%",
          cursor: "pointer",
          transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
          borderRadius: 3,
          overflow: "hidden",
          position: "relative",
          transform:
            hoveredCard === item.id
              ? "translateY(-10px) scale(1.02)"
              : "translateY(0) scale(1)",
          boxShadow:
            hoveredCard === item.id
              ? "0 20px 40px rgba(0,0,0,0.2)"
              : "0 4px 12px rgba(0,0,0,0.08)",
        }}
        onClick={() => handleOpenDialog(item)}
      >
        {/* Discount Badge */}
        <Zoom in={true} timeout={500 + index * 50}>
          <Box
            sx={{
              position: "absolute",
              top: 12,
              right: 12,
              background: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
              color: "white",
              borderRadius: "50%",
              width: 58,
              height: 58,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              fontWeight: 700,
              boxShadow: "0 4px 12px rgba(245, 87, 108, 0.4)",
              transform:
                hoveredCard === item.id ? "rotate(360deg) scale(1.1)" : "scale(1)",
              transition: "all 0.6s cubic-bezier(0.4, 0, 0.2, 1)",
              zIndex: 2,
            }}
          >
            <Typography variant="h6" sx={{ fontWeight: 800, lineHeight: 1 }}>
              {item.discount}%
            </Typography>
            <Typography variant="caption" sx={{ fontSize: 10, fontWeight: 600 }}>
              OFF
            </Typography>
          </Box>
        </Zoom>
  
        <CardContent sx={{ p: 2.5, textAlign: "center", position: "relative" }}>
          {/* Material Name */}
          <Typography
            variant="h6"
            sx={{
              fontWeight: 700,
              mb: 1.5,
              color: "#2d3748",
              textTransform: "capitalize",
            }}
          >
            {item.name}
          </Typography>
  
          {/* Item Image */}
          <Box
            sx={{
              position: "relative",
              overflow: "hidden",
              borderRadius: 2,
              mb: 2,
              height: 180,
            }}
          >
            <CardMedia
              component="img"
              image={item.image}
              alt={item.name}
              sx={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                transition: "transform 0.6s ease",
                transform:
                  hoveredCard === item.id ? "scale(1.08)" : "scale(1.0)",
              }}
            />
          </Box>
  
          {/* Category */}
          <Chip
            label={item.category}
            size="small"
            sx={{
              mb: 2,
              background: alpha(theme.palette.primary.main, 0.1),
              color: "primary.main",
              fontWeight: 600,
              border: `1px solid ${alpha(theme.palette.primary.main, 0.3)}`,
            }}
          />
  
          {/* Price Comparison */}
          <Box sx={{ mb: 2.5 }}>
            <Box sx={{ display: "flex", justifyContent: "center", gap: 1 }}>
              <Typography
                variant="body2"
                sx={{
                  textDecoration: "line-through",
                  color: "error.main",
                  fontWeight: 600,
                }}
              >
                ${item.oldPrice}
              </Typography>
              <Typography variant="h6" sx={{ color: "success.main", fontWeight: 800 }}>
                ${item.newPrice}
              </Typography>
            </Box>
            <Typography variant="caption" color="text.secondary">
              Price per {item.unit}
            </Typography>
          </Box>
  
          {/* Fees Section */}
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              mb: 2.5,
              p: 1.2,
              background: alpha(theme.palette.grey[500], 0.05),
              borderRadius: 1.5,
            }}
          >
            <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
              <LocalShipping sx={{ fontSize: 18, color: "primary.main" }} />
              <Typography variant="caption" sx={{ fontWeight: 600 }}>
                ${item.transportationFee}
              </Typography>
            </Box>
            <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
              <Warehouse sx={{ fontSize: 18, color: "secondary.main" }} />
              <Typography variant="caption" sx={{ fontWeight: 600 }}>
                ${item.storageFee}/{item.storagePeriod}
              </Typography>
            </Box>
          </Box>
  
          {/* Add to Cart Button */}
          <Button
            fullWidth
            variant="contained"
            startIcon={<AddShoppingCart />}
            sx={{
              background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
              fontWeight: 700,
              py: 1.1,
              borderRadius: 2,
              transition: "all 0.3s ease",
              "&:hover": {
                background: "linear-gradient(135deg, #764ba2 0%, #667eea 100%)",
                transform: "scale(1.03)",
              },
            }}
          >
            Add to Cart
          </Button>
        </CardContent>
      </Card>
    </Grow>
  );
  

  const CartItem = ({ item, index }) => (
    <Slide direction="right" in={true} timeout={200 + index * 100}>
      <Card sx={{ 
        mb: 2.5,
        borderRadius: 3,
        overflow: 'hidden',
        transition: 'all 0.3s ease',
        '&:hover': {
          boxShadow: '0 8px 24px rgba(0,0,0,0.12)',
          transform: 'translateX(4px)',
        }
      }}>
        <CardContent sx={{ p: 3 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <Box sx={{ flexGrow: 1 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
                <Typography variant="h6" gutterBottom sx={{ fontWeight: 700, mb: 0 }}>
                  {item.name}
                </Typography>
                <Chip 
                  label={item.category} 
                  size="small" 
                  sx={{ 
                    background: alpha(theme.palette.primary.main, 0.1),
                    color: 'primary.main',
                    fontWeight: 600,
                  }} 
                />
              </Box>
              
              <Grid container spacing={2} sx={{ mb: 2 }}>
                {[
                  { label: 'Quantity', value: item.quantity },
                  { label: 'Unit Price', value: `${item.newPrice}` },
                  ...(item.bulkDiscount > 0 ? [{ label: 'Bulk Discount', value: `${item.bulkDiscount}%`, color: 'success' }] : [])
                ].map((detail, idx) => (
                  <Grid item xs={4} key={idx}>
                    <Fade in={true} timeout={400 + idx * 100}>
                      <Paper 
                        elevation={0}
                        sx={{ 
                          p: 1.5, 
                          background: alpha(theme.palette[detail.color || 'grey'][500], 0.08),
                          borderRadius: 1.5,
                          textAlign: 'center',
                        }}
                      >
                        <Typography variant="caption" color="text.secondary" sx={{ fontWeight: 600 }}>
                          {detail.label}
                        </Typography>
                        <Typography variant="body1" sx={{ fontWeight: 700, color: detail.color ? `${detail.color}.main` : 'inherit' }}>
                          {detail.value}
                        </Typography>
                      </Paper>
                    </Fade>
                  </Grid>
                ))}
              </Grid>

              <Grid container spacing={2}>
                {[
                  { label: 'Material Cost', value: item.materialCost },
                  { label: 'Transportation', value: item.transportationCost },
                  { label: 'Storage', value: item.storageCost },
                  { label: 'Final Cost', value: item.finalCost, highlight: true }
                ].map((cost, idx) => (
                  <Grid item xs={3} key={idx}>
                    <Zoom in={true} timeout={500 + idx * 100}>
                      <Box>
                        <Typography variant="caption" color="text.secondary" sx={{ fontWeight: 600 }}>
                          {cost.label}
                        </Typography>
                        <Typography 
                          variant="body1" 
                          sx={{ 
                            fontWeight: cost.highlight ? 800 : 700, 
                            color: cost.highlight ? 'primary.main' : 'inherit',
                            fontSize: cost.highlight ? '1.1rem' : 'inherit',
                          }}
                        >
                          ${cost.value.toFixed(2)}
                        </Typography>
                      </Box>
                    </Zoom>
                  </Grid>
                ))}
              </Grid>
            </Box>

            <Zoom in={true} timeout={600}>
              <IconButton 
                onClick={() => handleRemoveFromCart(index)}
                sx={{ 
                  color: 'error.main',
                  background: alpha(theme.palette.error.main, 0.1),
                  transition: 'all 0.3s ease',
                  '&:hover': { 
                    backgroundColor: 'error.main',
                    color: 'white',
                    transform: 'rotate(90deg) scale(1.1)',
                  }
                }}
              >
                <Delete />
              </IconButton>
            </Zoom>
          </Box>
        </CardContent>
      </Card>
    </Slide>
  );

  const totals = calculateTotals();

  return (
    <Box sx={{ 
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',
      py: 5,
    }}>
      <Container maxWidth="xl">
        <Slide direction="down" in={true} timeout={600}>
          <Box sx={{ mb: 5 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
              <Box>
                <Typography 
                  variant="h3" 
                  sx={{ 
                    fontWeight: 900,
                    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    mb: 1,
                  }}
                >
                  Construction Materials
                </Typography>
                <Typography variant="h6" color="text.secondary" sx={{ fontWeight: 500 }}>
                  Compare prices • Get bulk discounts • Build your dream
                </Typography>
              </Box>
              
              <Zoom in={true} timeout={800}>
                <Badge 
                  badgeContent={cart.length} 
                  color="error" 
                  overlap="circular"
                  sx={{
                    '& .MuiBadge-badge': {
                      fontSize: '1rem',
                      fontWeight: 700,
                      minWidth: 28,
                      height: 28,
                      borderRadius: '50%',
                    }
                  }}
                >
                  <Fab
                    color="primary"
                    onClick={() => setShowCart(true)}
                    sx={{
                      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                      width: 70,
                      height: 70,
                      boxShadow: '0 8px 24px rgba(102, 126, 234, 0.4)',
                      transition: 'all 0.3s ease',
                      '&:hover': {
                        transform: 'scale(1.1) rotate(15deg)',
                        boxShadow: '0 12px 32px rgba(102, 126, 234, 0.5)',
                      },
                    }}
                  >
                    <ShoppingCartIcon sx={{ fontSize: 32 }} />
                  </Fab>
                </Badge>
              </Zoom>
            </Box>
          </Box>
        </Slide>

        {!showCart ? (
          <Grid container spacing={3}>
            {constructionItems.map((item, index) => (
              <Grid item xs={12} sm={6} md={4} key={item.id}>
                <ConstructionItemCard item={item} index={index} />
              </Grid>
            ))}
          </Grid>
        ) : (
          <Fade in={showCart} timeout={500}>
            <Box>
              <Slide direction="down" in={true} timeout={400}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
                  <Box>
                    <Typography variant="h4" sx={{ fontWeight: 800, mb: 0.5 }}>
                      Shopping Cart
                    </Typography>
                    <Typography variant="body1" color="text.secondary">
                      {cart.length} {cart.length === 1 ? 'item' : 'items'} in your cart
                    </Typography>
                  </Box>
                  <Button
                    variant="outlined"
                    startIcon={<ArrowBack />}
                    onClick={() => setShowCart(false)}
                    sx={{
                      borderWidth: 2,
                      borderRadius: 2,
                      fontWeight: 600,
                      px: 3,
                      py: 1,
                      '&:hover': {
                        borderWidth: 2,
                        transform: 'translateX(-4px)',
                      }
                    }}
                  >
                    Continue Shopping
                  </Button>
                </Box>
              </Slide>

              {cart.length === 0 ? (
                <Zoom in={true} timeout={600}>
                  <Box sx={{ 
                    textAlign: 'center', 
                    py: 10,
                    background: 'white',
                    borderRadius: 3,
                    boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
                  }}>
                    <ShoppingCartIcon sx={{ fontSize: 100, color: alpha(theme.palette.primary.main, 0.3), mb: 3 }} />
                    <Typography variant="h5" sx={{ fontWeight: 700, mb: 1 }}>
                      Your cart is empty
                    </Typography>
                    <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
                      Add some construction materials to get started
                    </Typography>
                    <Button
                      variant="contained"
                      size="large"
                      onClick={() => setShowCart(false)}
                      sx={{
                        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                        px: 4,
                        py: 1.5,
                        borderRadius: 2,
                        fontWeight: 700,
                        fontSize: '1.1rem',
                      }}
                    >
                      Browse Materials
                    </Button>
                  </Box>
                </Zoom>
              ) : (
                <Grid container spacing={3}>
                  <Grid item xs={12} md={8}>
                    {cart.map((item, index) => (
                      <CartItem key={index} item={item} index={index} />
                    ))}
                  </Grid>

                  <Grid item xs={12} md={4}>
                    <Slide direction="left" in={true} timeout={800}>
                      <Card sx={{ 
                        position: 'sticky', 
                        top: 20,
                        borderRadius: 3,
                        overflow: 'hidden',
                        boxShadow: '0 8px 24px rgba(0,0,0,0.12)',
                      }}>
                        <Box sx={{ 
                          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                          color: 'white',
                          p: 3,
                        }}>
                          <Typography variant="h5" sx={{ fontWeight: 800 }}>
                            Order Summary
                          </Typography>
                        </Box>
                        <CardContent sx={{ p: 3 }}>
                          <Box sx={{ space: 2, mb: 3 }}>
                            {[
                              { label: 'Subtotal', value: totals.subtotal },
                              { label: 'Total Discount', value: -totals.totalDiscount, color: 'success' },
                              { label: 'Transportation', value: totals.totalTransportation },
                              { label: 'Storage', value: totals.totalStorage }
                            ].map((item, index) => (
                              <Fade in={true} timeout={400 + index * 100} key={index}>
                                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                                  <Typography variant="body1" sx={{ fontWeight: 500 }}>
                                    {item.label}:
                                  </Typography>
                                  <Typography 
                                    variant="body1" 
                                    sx={{ 
                                      fontWeight: 700,
                                      color: item.color ? `${item.color}.main` : 'inherit'
                                    }}
                                  >
                                    ${Math.abs(item.value).toFixed(2)}
                                  </Typography>
                                </Box>
                              </Fade>
                            ))}
                            <Divider sx={{ my: 2 }} />
                            <Zoom in={true} timeout={900}>
                              <Box sx={{ 
                                display: 'flex', 
                                justifyContent: 'space-between',
                                p: 2,
                                background: alpha(theme.palette.primary.main, 0.1),
                                borderRadius: 2,
                              }}>
                                <Typography variant="h6" sx={{ fontWeight: 700 }}>
                                  Final Total:
                                </Typography>
                                <Typography variant="h5" sx={{ fontWeight: 900, color: 'primary.main' }}>
                                  ${totals.finalTotal.toFixed(2)}
                                </Typography>
                              </Box>
                            </Zoom>
                          </Box>

                          <Zoom in={true} timeout={1000}>
                            <Button
                              fullWidth
                              variant="contained"
                              size="large"
                              sx={{
                                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                                py: 2,
                                borderRadius: 2,
                                fontWeight: 800,
                                fontSize: '1.1rem',
                                boxShadow: '0 8px 20px rgba(102, 126, 234, 0.4)',
                                transition: 'all 0.3s ease',
                                '&:hover': {
                                  transform: 'translateY(-2px)',
                                  boxShadow: '0 12px 28px rgba(102, 126, 234, 0.5)',
                                }
                              }}
                            >
                              Proceed to Payment
                            </Button>
                          </Zoom>
                        </CardContent>
                      </Card>
                    </Slide>
                  </Grid>
                </Grid>
              )}
            </Box>
          </Fade>
        )}

        <Dialog 
          open={Boolean(selectedItem)} 
          onClose={handleCloseDialog}
          maxWidth="md"
          fullWidth
          TransitionComponent={Zoom}
          transitionDuration={400}
          PaperProps={{
            sx: {
              borderRadius: 3,
              boxShadow: '0 20px 60px rgba(0,0,0,0.3)',
            }
          }}
        >
          <DialogTitle sx={{ 
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            color: 'white',
            py: 2.5,
          }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Typography variant="h5" sx={{ fontWeight: 800 }}>
                {selectedItem?.name}
              </Typography>
              <Stepper activeStep={activeStep} sx={{ flexGrow: 1, mx: 4 }}>
                <Step>
                  <StepLabel 
                    StepIconProps={{
                      sx: { color: 'white', '&.Mui-active': { color: 'white' }, '&.Mui-completed': { color: 'white' } }
                    }}
                  >
                    <Typography sx={{ color: 'white', fontWeight: 600 }}>Details</Typography>
                  </StepLabel>
                </Step>
                <Step>
                  <StepLabel
                    StepIconProps={{
                      sx: { color: 'white', '&.Mui-active': { color: 'white' }, '&.Mui-completed': { color: 'white' } }
                    }}
                  >
                    <Typography sx={{ color: 'white', fontWeight: 600 }}>Summary</Typography>
                  </StepLabel>
                </Step>
              </Stepper>
              <IconButton 
                onClick={handleCloseDialog}
                sx={{ 
                  color: 'white',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    transform: 'rotate(90deg)',
                    background: alpha('#fff', 0.2),
                  }
                }}
              >
                <Close />
              </IconButton>
            </Box>
          </DialogTitle>

          <DialogContent sx={{ p: 4, mt: 2 }}>
            {getStepContent(activeStep)}
          </DialogContent>

          {activeStep === 0 && (
            <DialogActions sx={{ p: 3, background: alpha(theme.palette.grey[500], 0.05) }}>
              <Button 
                onClick={handleCloseDialog}
                sx={{ 
                  fontWeight: 600,
                  px: 3,
                }}
              >
                Cancel
              </Button>
              <Button
                variant="contained"
                onClick={handleAddToCart}
                disabled={quantity < 1}
                sx={{
                  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                  px: 4,
                  py: 1,
                  borderRadius: 2,
                  fontWeight: 700,
                  boxShadow: '0 4px 12px rgba(102, 126, 234, 0.4)',
                  '&:hover': {
                    transform: 'translateY(-2px)',
                    boxShadow: '0 6px 16px rgba(102, 126, 234, 0.5)',
                  },
                  '&:disabled': {
                    background: alpha(theme.palette.grey[500], 0.3),
                  }
                }}
              >
                Add to Cart
              </Button>
            </DialogActions>
          )}
        </Dialog>
      </Container>
    </Box>
  );
};

export default ConstructionPurchase;