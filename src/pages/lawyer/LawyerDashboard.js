import React, { useState } from 'react';
import {
  Box,
  Grid,
  Card,
  CardContent,
  Typography,
  Chip,
  LinearProgress,
  IconButton,
  Button,
  Menu,
  MenuItem,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Badge,
  Avatar,
  Fade,
  Slide,
  Grow,
  Zoom,
  Paper,
} from '@mui/material';
import {
  People as PeopleIcon,
  Description as DocumentIcon,
  Schedule as ScheduleIcon,
  TrendingUp as TrendingIcon,
  Notifications as NotificationsIcon,
  Add as AddIcon,
  PlayArrow as StartIcon,
  Email as EmailIcon,
  Warning as WarningIcon,
  CheckCircle as CheckIcon,
  VideoCameraFront,
  Person,
} from '@mui/icons-material';
import { keyframes } from '@mui/system';

// Enhanced Animations
const pulse = keyframes`
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.05); }
`;

const shimmer = keyframes`
  0% { background-position: -1000px 0; }
  100% { background-position: 1000px 0; }
`;

const float = keyframes`
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-8px); }
`;

const slideInUp = keyframes`
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const bounceIn = keyframes`
  0% {
    opacity: 0;
    transform: scale(0.3);
  }
  50% {
    opacity: 1;
    transform: scale(1.05);
  }
  70% {
    transform: scale(0.9);
  }
  100% {
    transform: scale(1);
  }
`;

const StatCard = ({ title, value, subtitle, icon, color, onClick, delay = 0 }) => {
  const [isHovered, setIsHovered] = useState(false);

  // Define gradient backgrounds based on color prop
  const gradientBackground =
    color === 'primary'
      ? 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
      : color === 'success'
      ? 'linear-gradient(135deg, #66bb6a 0%, #81c784 100%)'
      : color === 'warning'
      ? 'linear-gradient(135deg, #ffa726 0%, #ffb74d 100%)'
      : 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)';

  return (
    <Grow in={true} timeout={600 + delay}>
      <Card
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        sx={{
          height: '100%',
          cursor: onClick ? 'pointer' : 'default',
          transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
          transform: isHovered ? 'translateY(-10px) scale(1.05)' : 'translateY(0) scale(1)',
          boxShadow: isHovered
            ? '0 16px 40px rgba(0,0,0,0.25)'
            : '0 4px 14px rgba(0,0,0,0.1)',
          background: gradientBackground,
          color: 'white',
          position: 'relative',
          overflow: 'hidden',
          borderRadius: '16px',
        }}
        onClick={onClick}
      >
        <CardContent>
          <Box display="flex" alignItems="center" justifyContent="space-between">
            {/* Text Section */}
            <Box>
              <Typography
                variant="overline"
                sx={{
                  fontWeight: 700,
                  letterSpacing: 1,
                  opacity: 0.9,
                }}
              >
                {title}
              </Typography>
              <Typography
                variant="h3"
                component="div"
                sx={{
                  fontWeight: 800,
                  my: 1,
                }}
              >
                {value}
              </Typography>
              <Typography
                variant="body2"
                sx={{
                  opacity: 0.9,
                  fontWeight: 500,
                }}
              >
                {subtitle}
              </Typography>
            </Box>

            {/* Icon Section */}
            <Box
              sx={{
                backgroundColor: 'rgba(255,255,255,0.2)',
                borderRadius: '50%',
                p: 2,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                backdropFilter: 'blur(10px)',
                transition: 'all 0.3s ease',
                transform: isHovered ? 'scale(1.15) rotate(8deg)' : 'scale(1) rotate(0deg)',
              }}
            >
              {React.cloneElement(icon, { sx: { fontSize: 32, color: '#fff' } })}
            </Box>
          </Box>
        </CardContent>
      </Card>
    </Grow>
  );
};


const CaseProgressCard = ({ title, progress, status, client, deadline, documents, onClick, delay = 0 }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <Slide direction="up" in={true} timeout={400 + delay}>
      <Card 
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        sx={{ 
          mb: 2.5,
          cursor: 'pointer',
          transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
          transform: isHovered ? 'translateX(8px)' : 'translateX(0)',
          boxShadow: isHovered ? '0 8px 24px rgba(0,0,0,0.12)' : '0 2px 8px rgba(0,0,0,0.06)',
          borderLeft: '4px solid',
          borderLeftColor: status === 'Completed' ? '#66bb6a' :
                          status === 'In Progress' ? '#667eea' :
                          status === 'Urgent' ? '#f5576c' : '#bdbdbd',
          position: 'relative',
          overflow: 'hidden',
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'linear-gradient(90deg, transparent, rgba(102, 126, 234, 0.05), transparent)',
            opacity: isHovered ? 1 : 0,
            animation: isHovered ? `${shimmer} 2s infinite` : 'none',
          }
        }}
        onClick={onClick}
      >
        <CardContent>
          <Box display="flex" justifyContent="space-between" alignItems="flex-start" mb={2}>
            <Box flex={1}>
              <Typography variant="h6" component="div" sx={{ fontWeight: 700, mb: 0.5 }}>
                {title}
              </Typography>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Person sx={{ fontSize: 16, color: 'text.secondary' }} />
                <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 500 }}>
                  {client}
                </Typography>
              </Box>
            </Box>
            <Chip 
              label={status} 
              size="small" 
              sx={{
                fontWeight: 700,
                background: status === 'Completed' ? 'linear-gradient(135deg, #66bb6a 0%, #81c784 100%)' :
                           status === 'In Progress' ? 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' :
                           status === 'Urgent' ? 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)' :
                           'linear-gradient(135deg, #bdbdbd 0%, #9e9e9e 100%)',
                color: 'white',
                animation: status === 'Urgent' ? `${pulse} 2s ease-in-out infinite` : 'none',
              }}
            />
          </Box>
          
          {deadline && (
            <Box 
              display="flex" 
              alignItems="center" 
              mb={2}
              sx={{
                p: 1,
                borderRadius: 1,
                background: 'rgba(255, 167, 38, 0.1)',
                border: '1px solid rgba(255, 167, 38, 0.3)',
              }}
            >
              <ScheduleIcon sx={{ fontSize: 18, mr: 1, color: 'warning.main' }} />
              <Typography variant="body2" sx={{ fontWeight: 600, color: 'warning.main' }}>
                Deadline: {deadline}
              </Typography>
            </Box>
          )}
          
          <Box mt={2}>
            <Box sx={{ position: 'relative' }}>
              <LinearProgress 
                variant="determinate" 
                value={progress} 
                sx={{ 
                  height: 10, 
                  borderRadius: 5,
                  backgroundColor: 'rgba(0,0,0,0.08)',
                  '& .MuiLinearProgress-bar': {
                    borderRadius: 5,
                    background: progress === 100 
                      ? 'linear-gradient(90deg, #66bb6a, #81c784)'
                      : progress >= 50
                      ? 'linear-gradient(90deg, #667eea, #764ba2)'
                      : 'linear-gradient(90deg, #ffa726, #ffb74d)',
                  }
                }}
              />
              {isHovered && (
                <Box
                  sx={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.5), transparent)',
                    animation: `${shimmer} 1.5s infinite`,
                    borderRadius: 5,
                  }}
                />
              )}
            </Box>
            <Box display="flex" justifyContent="space-between" alignItems="center" sx={{ mt: 1.5 }}>
              <Typography variant="body2" sx={{ fontWeight: 700, color: 'text.primary' }}>
                {progress}% Complete
              </Typography>
              {documents && (
                <Chip
                  icon={<DocumentIcon sx={{ fontSize: 16 }} />}
                  label={`${documents} documents`}
                  size="small"
                  sx={{ 
                    fontWeight: 600,
                    background: 'linear-gradient(135deg, rgba(102, 126, 234, 0.1), rgba(118, 75, 162, 0.1))',
                    border: '1px solid rgba(102, 126, 234, 0.3)',
                  }}
                />
              )}
            </Box>
          </Box>
        </CardContent>
      </Card>
    </Slide>
  );
};

const NotificationItem = ({ type, message, time, read }) => (
  <Fade in={true} timeout={400}>
    <ListItem 
      sx={{ 
        backgroundColor: read ? 'transparent' : 'rgba(102, 126, 234, 0.08)',
        borderRadius: 2,
        mb: 1,
        transition: 'all 0.3s ease',
        border: '1px solid',
        borderColor: read ? 'transparent' : 'rgba(102, 126, 234, 0.2)',
        '&:hover': {
          backgroundColor: 'rgba(102, 126, 234, 0.12)',
          transform: 'translateX(4px)',
        }
      }}
    >
      <ListItemIcon>
        <Box
          sx={{
            width: 40,
            height: 40,
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: type === 'document' ? 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' :
                       type === 'consultation' ? 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)' :
                       'linear-gradient(135deg, #fa709a 0%, #fee140 100%)',
            color: 'white',
          }}
        >
          {type === 'document' && <ScheduleIcon />}
          {type === 'consultation' && <ScheduleIcon />}
          {type === 'urgent' && <WarningIcon />}
        </Box>
      </ListItemIcon>
      <ListItemText
        primary={
          <Typography sx={{ fontWeight: read ? 400 : 700, fontSize: '0.95rem' }}>
            {message}
          </Typography>
        }
        secondary={
          <Typography sx={{ fontSize: '0.85rem', color: 'text.secondary' }}>
            {time}
          </Typography>
        }
      />
      {!read && (
        <Box 
          sx={{ 
            width: 12, 
            height: 12, 
            borderRadius: '50%', 
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            animation: `${pulse} 2s ease-in-out infinite`,
          }} 
        />
      )}
    </ListItem>
  </Fade>
);

const LawyerDashboard = () => {
  const [notificationsAnchor, setNotificationsAnchor] = useState(null);
  const [recentActivities, setRecentActivities] = useState([
    { type: 'document', message: 'New document review requested', time: '5 min ago', read: false },
    { type: 'consultation', message: 'Consultation scheduled for tomorrow', time: '1 hour ago', read: true },
    { type: 'urgent', message: 'Client requires urgent response', time: '2 hours ago', read: false },
  ]);

  const recentCases = [
    { 
      title: 'Dasion Partnership Agreement', 
      progress: 75, 
      status: 'In Progress', 
      client: 'Medical Clinic LLC',
      deadline: '2024-01-20',
      documents: 3
    },
    { 
      title: 'Commercial Lease Agreement', 
      progress: 100, 
      status: 'Completed', 
      client: 'Retail Corp',
      documents: 5
    },
    { 
      title: 'Employment Contract', 
      progress: 30, 
      status: 'Urgent', 
      client: 'Tech Startup Inc',
      deadline: '2024-01-18',
      documents: 2
    },
  ];

  const upcomingConsultations = [
    { 
      time: '10:00 AM', 
      client: 'Medical Clinic LLC', 
      type: 'Document Review',
      duration: '60 min',
      mode: 'Video Call'
    },
    { 
      time: '2:30 PM', 
      client: 'Retail Corp', 
      type: 'Initial Consultation',
      duration: '45 min',
      mode: 'In-Person'
    },
    { 
      time: '4:00 PM', 
      client: 'Tech Startup Inc', 
      type: 'Contract Signing',
      duration: '30 min',
      mode: 'Video Call'
    },
  ];

  const unreadNotifications = recentActivities.filter(activity => !activity.read).length;

  const handleStartConsultation = () => {
    console.log('Start new consultation');
  };

  const handleCaseClick = (caseItem) => {
    console.log('Case clicked:', caseItem);
  };

  const handleStatCardClick = (statType) => {
    console.log('Stat card clicked:', statType);
  };

  return (
    <Box sx={{ p: 4, background: 'white', minHeight: '100vh' }}>
      <Slide direction="down" in={true} timeout={600}>
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={5}>
          <Box>
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
              Lawyer Dashboard
            </Typography>
            <Typography variant="h6" color="textSecondary" sx={{ fontWeight: 400 }}>
              Welcome back! Here's your practice overview
            </Typography>
          </Box>
          <Box display="flex" alignItems="center" gap={2}>
            <Zoom in={true} timeout={800}>
              <Button
                variant="contained"
                size="large"
                startIcon={<StartIcon />}
                onClick={handleStartConsultation}
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
                Start Consultation
              </Button>
            </Zoom>
            <Zoom in={true} timeout={1000}>
              <IconButton 
                onClick={(e) => setNotificationsAnchor(e.currentTarget)}
                sx={{
                  background: 'white',
                  boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    transform: 'scale(1.1)',
                    boxShadow: '0 8px 20px rgba(0,0,0,0.12)',
                  }
                }}
              >
                <Badge 
                  badgeContent={unreadNotifications} 
                  sx={{
                    '& .MuiBadge-badge': {
                      background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
                      fontWeight: 700,
                      animation: unreadNotifications > 0 ? `${pulse} 2s ease-in-out infinite` : 'none',
                    }
                  }}
                >
                  <NotificationsIcon sx={{ color: 'text.primary' }} />
                </Badge>
              </IconButton>
            </Zoom>
          </Box>
        </Box>
      </Slide>

      <Menu
        anchorEl={notificationsAnchor}
        open={Boolean(notificationsAnchor)}
        onClose={() => setNotificationsAnchor(null)}
        TransitionComponent={Fade}
        PaperProps={{
          sx: { 
            width: 400, 
            maxHeight: 500,
            borderRadius: 2,
            boxShadow: '0 12px 40px rgba(0,0,0,0.15)',
          }
        }}
      >
        <Box sx={{ p: 3 }}>
          <Typography variant="h6" gutterBottom sx={{ fontWeight: 800, mb: 2 }}>
            Notifications
          </Typography>
          <List dense>
            {recentActivities.map((activity, index) => (
              <NotificationItem key={index} {...activity} />
            ))}
          </List>
        </Box>
      </Menu>
      
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="Active Cases"
            value="12"
            subtitle="+2 this month"
            icon={<PeopleIcon />}
            color="primary"
            onClick={() => handleStatCardClick('cases')}
            delay={0}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="Documents"
            value="47"
            subtitle="+8 generated"
            icon={<DocumentIcon />}
            color="success"
            onClick={() => handleStatCardClick('documents')}
            delay={100}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="Consultations"
            value="18"
            subtitle="This month"
            icon={<ScheduleIcon />}
            color="warning"
            onClick={() => handleStatCardClick('consultations')}
            delay={200}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="Success Rate"
            value="94%"
            subtitle="Document accuracy"
            icon={<TrendingIcon />}
            color="info"
            delay={300}
          />
        </Grid>
      </Grid>

      <Grid container spacing={3}>
        <Grid item xs={12} md={8}>
          <Grow in={true} timeout={800}>
            <Card sx={{ 
              boxShadow: '0 4px 16px rgba(0,0,0,0.08)',
              borderRadius: 2,
            }}>
              <CardContent sx={{ p: 3 }}>
                <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
                  <Box>
                    <Typography variant="h5" sx={{ fontWeight: 800, mb: 0.5 }}>
                      Recent Cases
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Track your active legal matters
                    </Typography>
                  </Box>
                  <Button 
                    startIcon={<AddIcon />} 
                    variant="outlined"
                    sx={{
                      borderWidth: 2,
                      fontWeight: 600,
                      transition: 'all 0.3s ease',
                      '&:hover': {
                        borderWidth: 2,
                        transform: 'translateY(-2px)',
                        boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
                      }
                    }}
                  >
                    New Case
                  </Button>
                </Box>
                {recentCases.map((caseItem, index) => (
                  <CaseProgressCard 
                    key={index} 
                    {...caseItem} 
                    onClick={() => handleCaseClick(caseItem)}
                    delay={index * 100}
                  />
                ))}
              </CardContent>
            </Card>
          </Grow>
        </Grid>

        <Grid item xs={12} md={4}>
          <Slide direction="left" in={true} timeout={800}>
            <Box>
              <Card sx={{ mb: 3, boxShadow: '0 4px 16px rgba(0,0,0,0.08)', borderRadius: 2 }}>
                <CardContent sx={{ p: 3 }}>
                  <Typography variant="h6" gutterBottom sx={{ fontWeight: 800, mb: 2 }}>
                    Quick Actions
                  </Typography>
                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                    {[
                      { label: 'Start New Consultation', action: handleStartConsultation },
                      { label: 'Create Document', action: () => console.log('Create document') },
                      { label: 'Review Draft', action: () => console.log('Review draft') },
                      { label: 'Schedule Meeting', action: () => console.log('Schedule meeting') },
                      { label: 'Generate Report', action: () => console.log('Generate report') },
                      { label: 'Client Onboarding', action: () => console.log('Client onboarding') },
                    ].map((action, index) => (
                      <Grow in={true} timeout={600 + index * 100} key={action.label}>
                        <Chip
                          label={action.label}
                          onClick={action.action}
                          sx={{
                            fontWeight: 600,
                            cursor: 'pointer',
                            background: 'linear-gradient(135deg, rgba(102, 126, 234, 0.1), rgba(118, 75, 162, 0.1))',
                            border: '1px solid rgba(102, 126, 234, 0.3)',
                            transition: 'all 0.3s ease',
                            '&:hover': {
                              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                              color: 'white',
                              transform: 'translateY(-2px)',
                              boxShadow: '0 4px 12px rgba(102, 126, 234, 0.3)',
                            }
                          }}
                        />
                      </Grow>
                    ))}
                  </Box>
                </CardContent>
              </Card>

              <Card sx={{ mb: 3, boxShadow: '0 4px 16px rgba(0,0,0,0.08)', borderRadius: 2 }}>
                <CardContent sx={{ p: 3 }}>
                  <Box display="flex" justifyContent="space-between" alignItems="center" mb={2.5}>
                    <Box>
                      <Typography variant="h6" sx={{ fontWeight: 800, mb: 0.5 }}>
                        Upcoming Consultations
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        Today's schedule
                      </Typography>
                    </Box>
                    <Button size="small" sx={{ fontWeight: 600 }}>View All</Button>
                  </Box>
                  {upcomingConsultations.map((event, index) => (
                    <Zoom in={true} timeout={600 + index * 150} key={index}>
                      <Paper 
                        sx={{ 
                          mb: 2, 
                          p: 2.5, 
                          background: 'linear-gradient(135deg, rgba(102, 126, 234, 0.05), rgba(118, 75, 162, 0.05))',
                          border: '2px solid',
                          borderColor: 'rgba(102, 126, 234, 0.15)',
                          borderRadius: 2,
                          transition: 'all 0.3s ease',
                          '&:hover': {
                            borderColor: 'rgba(102, 126, 234, 0.4)',
                            transform: 'translateX(4px)',
                            boxShadow: '0 4px 12px rgba(102, 126, 234, 0.15)',
                          }
                        }}
                      >
                        <Box display="flex" justifyContent="space-between" alignItems="flex-start" mb={1.5}>
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                            <Box sx={{
                              width: 40,
                              height: 40,
                              borderRadius: '50%',
                              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              color: 'white',
                              fontWeight: 800,
                              fontSize: '0.9rem',
                            }}>
                              {event.time.split(':')[0]}
                            </Box>
                            <Typography variant="subtitle2" fontWeight="bold">
                              {event.time}
                            </Typography>
                          </Box>
                          <Chip 
                            icon={event.mode === 'Video Call' ? <VideoCameraFront sx={{ fontSize: 16 }} /> : <Person sx={{ fontSize: 16 }} />}
                            label={event.mode} 
                            size="small" 
                            sx={{
                              fontWeight: 600,
                              background: event.mode === 'Video Call' 
                                ? 'linear-gradient(135deg, rgba(102, 126, 234, 0.2), rgba(118, 75, 162, 0.2))'
                                : 'linear-gradient(135deg, rgba(102, 187, 106, 0.2), rgba(129, 199, 132, 0.2))',
                              border: '1px solid',
                              borderColor: event.mode === 'Video Call' ? 'rgba(102, 126, 234, 0.4)' : 'rgba(102, 187, 106, 0.4)',
                            }}
                          />
                        </Box>
                        <Typography variant="body2" fontWeight="bold" gutterBottom sx={{ color: 'text.primary' }}>
                          {event.client}
                        </Typography>
                        <Typography variant="body2" color="text.secondary" gutterBottom>
                          {event.type} • {event.duration}
                        </Typography>
                        <Button 
                          size="small" 
                          startIcon={<EmailIcon />}
                          sx={{ 
                            mt: 1.5,
                            fontWeight: 600,
                            background: 'linear-gradient(135deg, rgba(102, 126, 234, 0.1), rgba(118, 75, 162, 0.1))',
                            color: 'primary.main',
                            border: '1px solid rgba(102, 126, 234, 0.3)',
                            transition: 'all 0.3s ease',
                            '&:hover': {
                              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                              color: 'white',
                              transform: 'translateY(-2px)',
                              boxShadow: '0 4px 12px rgba(102, 126, 234, 0.3)',
                            }
                          }}
                        >
                          Send Reminder
                        </Button>
                      </Paper>
                    </Zoom>
                  ))}
                </CardContent>
              </Card>

              <Card sx={{ boxShadow: '0 4px 16px rgba(0,0,0,0.08)', borderRadius: 2 }}>
                <CardContent sx={{ p: 3 }}>
                  <Typography variant="h6" gutterBottom sx={{ fontWeight: 800, mb: 2.5 }}>
                    Pending Actions
                  </Typography>
                  <List dense>
                    {[
                      { action: 'Review client feedback', case: 'Dasion Partnership', priority: 'high' },
                      { action: 'Approve document changes', case: 'Employment Contract', priority: 'medium' },
                      { action: 'Schedule follow-up', case: 'Retail Corp Lease', priority: 'low' },
                    ].map((item, index) => (
                      <Grow in={true} timeout={600 + index * 150} key={index}>
                        <ListItem 
                          divider={index < 2}
                          sx={{
                            borderRadius: 1.5,
                            mb: index < 2 ? 1.5 : 0,
                            p: 2,
                            transition: 'all 0.3s ease',
                            '&:hover': {
                              backgroundColor: 'rgba(102, 126, 234, 0.05)',
                              transform: 'translateX(4px)',
                            }
                          }}
                        >
                          <ListItemIcon>
                            <Box
                              sx={{
                                width: 36,
                                height: 36,
                                borderRadius: '50%',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                background: item.priority === 'high' 
                                  ? 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)'
                                  : item.priority === 'medium'
                                  ? 'linear-gradient(135deg, #ffa726 0%, #ffb74d 100%)'
                                  : 'linear-gradient(135deg, #66bb6a 0%, #81c784 100%)',
                                color: 'white',
                                animation: item.priority === 'high' ? `${pulse} 2s ease-in-out infinite` : 'none',
                              }}
                            >
                              <CheckIcon sx={{ fontSize: 20 }} />
                            </Box>
                          </ListItemIcon>
                          <ListItemText
                            primary={
                              <Typography sx={{ fontWeight: 700, mb: 0.5 }}>
                                {item.action}
                              </Typography>
                            }
                            secondary={
                              <Typography variant="body2" color="text.secondary">
                                {item.case}
                              </Typography>
                            }
                          />
                          <Chip 
                            label={item.priority} 
                            size="small"
                            sx={{
                              fontWeight: 700,
                              textTransform: 'uppercase',
                              fontSize: '0.7rem',
                              background: item.priority === 'high'
                                ? 'linear-gradient(135deg, rgba(245, 87, 108, 0.2), rgba(240, 147, 251, 0.2))'
                                : item.priority === 'medium'
                                ? 'linear-gradient(135deg, rgba(255, 167, 38, 0.2), rgba(255, 183, 77, 0.2))'
                                : 'linear-gradient(135deg, rgba(102, 187, 106, 0.2), rgba(129, 199, 132, 0.2))',
                              border: '1px solid',
                              borderColor: item.priority === 'high' ? 'rgba(245, 87, 108, 0.4)'
                                : item.priority === 'medium' ? 'rgba(255, 167, 38, 0.4)'
                                : 'rgba(102, 187, 106, 0.4)',
                              color: item.priority === 'high' ? '#f5576c'
                                : item.priority === 'medium' ? '#ffa726'
                                : '#66bb6a',
                            }}
                          />
                        </ListItem>
                      </Grow>
                    ))}
                  </List>
                </CardContent>
              </Card>
            </Box>
          </Slide>
        </Grid>
      </Grid>
    </Box>
  );
};

export default LawyerDashboard;