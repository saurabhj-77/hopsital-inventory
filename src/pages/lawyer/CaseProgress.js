import React, { useState } from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Grid,
  Chip,
  LinearProgress,
  Stepper,
  Step,
  StepLabel,
  StepContent,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  FormControl,
  InputLabel,
  Select,
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
  Avatar,
  Badge,
  Tooltip,
  IconButton,
  Tabs,
  Tab,
  InputAdornment,
  AvatarGroup,
  CircularProgress,
  Alert,
  CardActionArea
} from '@mui/material';
import {
  PlayArrow as StartIcon,
  CheckCircle as CompleteIcon,
  Edit as EditIcon,
  Add as AddIcon,
  Timeline as TimelineIcon,
  Description as DocumentIcon,
  Person as PersonIcon,
  CalendarToday as CalendarIcon,
  AttachMoney as MoneyIcon,
  Warning as WarningIcon,
  AutoAwesome as AutoAwesomeIcon,
  MoreVert as MoreIcon,
  Download as DownloadIcon,
  Share as ShareIcon,
  Chat as ChatIcon,
  Email as EmailIcon,
  Phone as PhoneIcon,
  Business as BusinessIcon,
  Speed as SpeedIcon,
  Analytics as AnalyticsIcon,
  TaskAlt as TaskIcon,
  PendingActions as PendingIcon,
  Schedule as ScheduleIcon,
  Flag as FlagIcon,
  Update as UpdateIcon,
  NavigateNext as NextIcon,
  NavigateBefore as PreviousIcon,
  CheckCircle
} from '@mui/icons-material';

const AnimatedCard = ({ children, delay = 0, ...props }) => (
  <Grow in={true} timeout={800} style={{ transitionDelay: `${delay}ms` }}>
    <Card {...props}>
      {children}
    </Card>
  </Grow>
);

const CaseProgress = () => {
  const theme = useTheme();
  const [cases, setCases] = useState([
    {
      id: 1,
      title: 'Dasion Partnership Agreement',
      client: 'Medical Clinic LLC',
      clientEmail: 'contact@medicalclinic.com',
      clientPhone: '+1 (555) 123-4567',
      progress: 75,
      status: 'in_progress',
      priority: 'high',
      currentStep: 3,
      revenue: 12500,
      deadline: '2024-01-20',
      startDate: '2024-01-10',
      estimatedCompletion: '2024-01-25',
      documents: 8,
      team: ['You', 'Sarah', 'Mike'],
      timeline: [
        { 
          step: 'Initial Consultation', 
          date: '2024-01-10', 
          completed: true,
          description: 'Discussed partnership terms and telemedicine platform integration',
          documents: ['Consultation_Notes.pdf'],
          duration: '2 days',
          notes: 'Client was very clear about data ownership requirements'
        },
        { 
          step: 'Document Drafting', 
          date: '2024-01-12', 
          completed: true,
          description: 'AI-generated initial draft based on consultation transcription',
          documents: ['Draft_Agreement_v1.docx', 'Terms_Conditions.pdf'],
          duration: '3 days',
          notes: 'Used NeuroScript transcription for accurate requirements capture'
        },
        { 
          step: 'Client Review', 
          date: '2024-01-15', 
          completed: true,
          description: 'Client provided feedback on data ownership clauses',
          documents: ['Client_Feedback.pdf'],
          duration: '2 days',
          notes: 'Client requested additional clauses for data security'
        },
        { 
          step: 'Legal Review', 
          date: '2024-01-16', 
          completed: false,
          description: 'Incorporating client feedback and compliance review',
          documents: [],
          duration: '3 days',
          notes: 'Need to verify HIPAA compliance requirements'
        },
        { 
          step: 'Final Approval', 
          date: '2024-01-18', 
          completed: false,
          description: 'Final document preparation and signing ceremony',
          documents: [],
          duration: '2 days',
          notes: 'Schedule virtual signing session with both parties'
        }
      ],
      nextAction: 'Review updated draft by Jan 17, 2024',
      riskLevel: 'medium'
    },
    {
      id: 2,
      title: 'Commercial Lease Agreement',
      client: 'Retail Corp',
      clientEmail: 'legal@retailcorp.com',
      clientPhone: '+1 (555) 987-6543',
      progress: 100,
      status: 'completed',
      priority: 'medium',
      currentStep: 5,
      revenue: 8400,
      deadline: '2024-01-12',
      startDate: '2024-01-05',
      completionDate: '2024-01-12',
      documents: 12,
      team: ['You', 'Emily'],
      timeline: [
        { 
          step: 'Initial Consultation', 
          date: '2024-01-05', 
          completed: true,
          description: 'Discussed lease terms and property requirements',
          documents: ['Lease_Requirements.pdf'],
          duration: '1 day',
          notes: 'Client needs space for retail expansion'
        },
        { 
          step: 'Document Drafting', 
          date: '2024-01-07', 
          completed: true,
          description: 'Prepared commercial lease agreement draft',
          documents: ['Lease_Draft_v1.docx'],
          duration: '2 days',
          notes: 'Included standard commercial lease clauses'
        },
        { 
          step: 'Client Review', 
          date: '2024-01-09', 
          completed: true,
          description: 'Client reviewed and approved terms',
          documents: ['Client_Approval.pdf'],
          duration: '1 day',
          notes: 'Minor adjustments requested for maintenance clauses'
        },
        { 
          step: 'Legal Review', 
          date: '2024-01-10', 
          completed: true,
          description: 'Final legal compliance check completed',
          documents: ['Compliance_Check.pdf'],
          duration: '1 day',
          notes: 'All compliance requirements met'
        },
        { 
          step: 'Final Approval', 
          date: '2024-01-12', 
          completed: true,
          description: 'Document signed and executed successfully',
          documents: ['Signed_Lease_Agreement.pdf'],
          duration: '1 day',
          notes: 'Client very satisfied with the process'
        }
      ],
      riskLevel: 'low'
    },
    {
      id: 3,
      title: 'Employment Contract - Senior Developer',
      client: 'Tech Startup Inc',
      clientEmail: 'founder@techstartup.com',
      clientPhone: '+1 (555) 456-7890',
      progress: 30,
      status: 'in_progress',
      priority: 'high',
      currentStep: 2,
      revenue: 5200,
      deadline: '2024-01-25',
      startDate: '2024-01-14',
      estimatedCompletion: '2024-01-28',
      documents: 4,
      team: ['You', 'David'],
      timeline: [
        { 
          step: 'Initial Consultation', 
          date: '2024-01-14', 
          completed: true,
          description: 'Discussed employment terms and equity package',
          documents: ['Employment_Terms.pdf'],
          duration: '2 days',
          notes: 'Candidate has specific equity vesting requirements'
        },
        { 
          step: 'Document Drafting', 
          date: '2024-01-16', 
          completed: false,
          description: 'Preparing employment contract with equity clauses',
          documents: [],
          duration: '4 days',
          notes: 'Need to include specific IP assignment provisions'
        },
        { 
          step: 'Client Review', 
          date: '2024-01-20', 
          completed: false,
          description: 'Client and candidate review phase',
          documents: [],
          duration: '3 days',
          notes: 'Schedule review session with both parties'
        },
        { 
          step: 'Legal Review', 
          date: '2024-01-23', 
          completed: false,
          description: 'Final legal adjustments and compliance',
          documents: [],
          duration: '2 days',
          notes: 'Verify non-compete clause enforceability'
        },
        { 
          step: 'Final Approval', 
          date: '2024-01-25', 
          completed: false,
          description: 'Contract execution and onboarding',
          documents: [],
          duration: '2 days',
          notes: 'Coordinate with HR for onboarding process'
        }
      ],
      nextAction: 'Complete initial draft by Jan 18, 2024',
      riskLevel: 'high'
    }
  ]);

  const [openDialog, setOpenDialog] = useState(false);
  const [openProgressDialog, setOpenProgressDialog] = useState(false);
  const [selectedCase, setSelectedCase] = useState(null);
  const [selectedTab, setSelectedTab] = useState(0);
  const [newCase, setNewCase] = useState({
    title: '',
    client: '',
    type: '',
    description: '',
    priority: 'medium',
    deadline: '',
    estimatedRevenue: ''
  });
  const [progressNotes, setProgressNotes] = useState('');

  const clients = [
    { name: 'Medical Clinic LLC', email: 'contact@medicalclinic.com', type: 'Healthcare' },
    { name: 'Retail Corp', email: 'legal@retailcorp.com', type: 'Retail' },
    { name: 'Tech Startup Inc', email: 'founder@techstartup.com', type: 'Technology' }
  ];

  const caseTypes = [
    'Partnership Agreement',
    'Lease Agreement',
    'Employment Contract',
    'Purchase Agreement',
    'Merger Agreement',
    'Intellectual Property',
    'Compliance Review',
    'Litigation Support'
  ];

  const handleUpdateProgress = (caseId, newStep, notes = '') => {
    setCases(cases.map(c => {
      if (c.id === caseId) {
        const updatedTimeline = c.timeline.map((step, index) => ({
          ...step,
          completed: index < newStep,
          date: index < newStep ? step.date || new Date().toISOString().split('T')[0] : step.date,
          notes: index === newStep - 1 ? notes : step.notes
        }));

        const progress = (newStep / c.timeline.length) * 100;
        const status = newStep === c.timeline.length ? 'completed' : 'in_progress';
        
        return {
          ...c,
          currentStep: newStep,
          progress,
          status,
          timeline: updatedTimeline,
          nextAction: status === 'completed' ? null : `Complete ${c.timeline[newStep]?.step} by ${new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toLocaleDateString()}`
        };
      }
      return c;
    }));
    
    setOpenProgressDialog(false);
    setProgressNotes('');
  };

  const handleMarkStepComplete = (caseId, stepIndex) => {
    handleUpdateProgress(caseId, stepIndex + 1, progressNotes);
  };

  const handleOpenProgressDialog = (caseItem) => {
    setSelectedCase(caseItem);
    setOpenProgressDialog(true);
    setProgressNotes(caseItem.timeline[caseItem.currentStep - 1]?.notes || '');
  };

  const handleAddCase = () => {
    const newCaseObj = {
      id: cases.length + 1,
      ...newCase,
      progress: 0,
      status: 'not_started',
      currentStep: 1,
      revenue: parseInt(newCase.estimatedRevenue) || 0,
      startDate: new Date().toISOString().split('T')[0],
      documents: 0,
      team: ['You'],
      timeline: [
        { step: 'Case Setup', date: new Date().toISOString().split('T')[0], completed: true, description: 'Case initialized', documents: [], duration: '1 day', notes: '' },
        { step: 'Initial Research', date: '', completed: false, description: 'Background research and analysis', documents: [], duration: '2 days', notes: '' },
        { step: 'Document Preparation', date: '', completed: false, description: 'Drafting legal documents', documents: [], duration: '3 days', notes: '' },
        { step: 'Client Review', date: '', completed: false, description: 'Client feedback and revisions', documents: [], duration: '2 days', notes: '' },
        { step: 'Finalization', date: '', completed: false, description: 'Final approval and signing', documents: [], duration: '2 days', notes: '' }
      ]
    };
    
    setCases(prev => [...prev, newCaseObj]);
    setOpenDialog(false);
    setNewCase({ title: '', client: '', type: '', description: '', priority: 'medium', deadline: '', estimatedRevenue: '' });
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed': return 'success';
      case 'in_progress': return 'primary';
      case 'not_started': return 'default';
      default: return 'default';
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

  const getRiskColor = (risk) => {
    switch (risk) {
      case 'high': return 'error';
      case 'medium': return 'warning';
      case 'low': return 'success';
      default: return 'default';
    }
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  };

  const filteredCases = cases.filter(caseItem => {
    switch (selectedTab) {
      case 0: return true; // All
      case 1: return caseItem.status === 'in_progress'; // Active
      case 2: return caseItem.status === 'completed'; // Completed
      case 3: return caseItem.priority === 'high'; // High Priority
      default: return true;
    }
  });

  const stats = {
    total: cases.length,
    active: cases.filter(c => c.status === 'in_progress').length,
    completed: cases.filter(c => c.status === 'completed').length,
    totalRevenue: cases.reduce((sum, c) => sum + c.revenue, 0),
    avgProgress: cases.reduce((sum, c) => sum + c.progress, 0) / cases.length,
    overdue: cases.filter(c => new Date(c.deadline) < new Date() && c.status !== 'completed').length
  };

  const CaseCard = ({ caseItem, index }) => (
    <AnimatedCard 
      delay={index * 100}
      sx={{ 
        mb: 3,
        background: `linear-gradient(135deg, ${alpha(theme.palette.background.paper, 0.9)} 0%, ${alpha(theme.palette.background.default, 0.7)} 100%)`,
        backdropFilter: 'blur(10px)',
        border: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
        transition: 'all 0.3s ease-in-out',
        '&:hover': {
          transform: 'translateY(-8px)',
          boxShadow: `0 20px 40px ${alpha(theme.palette.primary.main, 0.15)}`,
          borderColor: alpha(theme.palette.primary.main, 0.3)
        }
      }}
    >
      <CardActionArea onClick={() => handleOpenProgressDialog(caseItem)}>
        <CardContent>
          {/* Header */}
          <Box display="flex" justifyContent="space-between" alignItems="flex-start" mb={2}>
            <Box flex={1}>
              <Typography variant="h6" gutterBottom sx={{ 
                fontWeight: 600,
                background: `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                color: 'transparent'
              }}>
                {caseItem.title}
              </Typography>
              <Box display="flex" alignItems="center" gap={2} flexWrap="wrap" mb={1}>
                <Box display="flex" alignItems="center">
                  <BusinessIcon sx={{ fontSize: 16, mr: 0.5, color: 'text.secondary' }} />
                  <Typography variant="body2" color="textSecondary">
                    {caseItem.client}
                  </Typography>
                </Box>
                <Chip 
                  label={caseItem.priority} 
                  color={getPriorityColor(caseItem.priority)}
                  size="small"
                  icon={<FlagIcon />}
                />
                {caseItem.riskLevel && (
                  <Chip 
                    label={`Risk: ${caseItem.riskLevel}`} 
                    color={getRiskColor(caseItem.riskLevel)}
                    size="small"
                    variant="outlined"
                  />
                )}
              </Box>
            </Box>
            <Box display="flex" flexDirection="column" alignItems="flex-end" gap={1}>
              <Chip 
                label={caseItem.status.replace('_', ' ')} 
                color={getStatusColor(caseItem.status)}
                size="small"
                sx={{ fontWeight: 600 }}
              />
              <Typography variant="h6" color="success.main" fontWeight={700}>
                {formatCurrency(caseItem.revenue)}
              </Typography>
            </Box>
          </Box>

          {/* Progress Section */}
          <Box sx={{ mb: 3 }}>
            <Box display="flex" justifyContent="space-between" alignItems="center" mb={1}>
              <Typography variant="body2" color="textSecondary">
                Progress: {caseItem.progress}%
              </Typography>
              <Typography variant="body2" color="textSecondary">
                Step {caseItem.currentStep} of {caseItem.timeline.length}
              </Typography>
            </Box>
            <LinearProgress 
              variant="determinate" 
              value={caseItem.progress} 
              sx={{ 
                height: 8, 
                borderRadius: 4,
                backgroundColor: alpha(theme.palette.primary.main, 0.1),
                '& .MuiLinearProgress-bar': {
                  background: `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
                  borderRadius: 4
                }
              }}
            />
          </Box>

          {/* Timeline Preview */}
          <Box sx={{ mb: 3 }}>
            <Stepper activeStep={caseItem.currentStep - 1} alternativeLabel>
              {caseItem.timeline.slice(0, 3).map((step, index) => (
                <Step key={step.step} completed={step.completed}>
                  <StepLabel
                    StepIconProps={{
                      sx: {
                        color: step.completed ? theme.palette.success.main : 
                              index === caseItem.currentStep - 1 ? theme.palette.primary.main : 
                              alpha(theme.palette.text.secondary, 0.3)
                      }
                    }}
                  >
                    <Typography variant="caption" fontWeight={500}>
                      {step.step}
                    </Typography>
                  </StepLabel>
                </Step>
              ))}
              {caseItem.timeline.length > 3 && (
                <Step>
                  <StepLabel
                    StepIconProps={{
                      sx: {
                        color: alpha(theme.palette.text.secondary, 0.3)
                      }
                    }}
                  >
                    <Typography variant="caption" fontWeight={500}>
                      +{caseItem.timeline.length - 3} more
                    </Typography>
                  </StepLabel>
                </Step>
              )}
            </Stepper>
          </Box>

          {/* Footer */}
          <Box display="flex" justifyContent="space-between" alignItems="center">
            <Box display="flex" alignItems="center" gap={2}>
              <Box display="flex" alignItems="center">
                <CalendarIcon sx={{ fontSize: 16, mr: 0.5, color: 'text.secondary' }} />
                <Typography variant="caption" color="textSecondary">
                  Due: {new Date(caseItem.deadline).toLocaleDateString()}
                </Typography>
              </Box>
              <Box display="flex" alignItems="center">
                <DocumentIcon sx={{ fontSize: 16, mr: 0.5, color: 'text.secondary' }} />
                <Typography variant="caption" color="textSecondary">
                  {caseItem.documents} docs
                </Typography>
              </Box>
            </Box>
            
            <AvatarGroup max={3} sx={{ '& .MuiAvatar-root': { width: 28, height: 28, fontSize: '0.8rem' } }}>
              {caseItem.team.map((member, idx) => (
                <Tooltip key={idx} title={member}>
                  <Avatar sx={{ bgcolor: theme.palette.primary.main }}>
                    {member.charAt(0)}
                  </Avatar>
                </Tooltip>
              ))}
            </AvatarGroup>
          </Box>

          {/* Next Action */}
          {caseItem.nextAction && (
            <Paper 
              variant="outlined" 
              sx={{ 
                mt: 2, 
                p: 1.5, 
                backgroundColor: alpha(theme.palette.warning.main, 0.05),
                borderColor: alpha(theme.palette.warning.main, 0.2),
                borderRadius: 2
              }}
            >
              <Box display="flex" alignItems="center" gap={1}>
                <PendingIcon color="warning" sx={{ fontSize: 16 }} />
                <Typography variant="caption" fontWeight={500} color="warning.dark">
                  {caseItem.nextAction}
                </Typography>
              </Box>
            </Paper>
          )}

          {/* Update Progress Button */}
          <Box sx={{ mt: 2, display: 'flex', justifyContent: 'center' }}>
            <Button
              variant="contained"
              startIcon={<UpdateIcon />}
              onClick={(e) => {
                e.stopPropagation();
                handleOpenProgressDialog(caseItem);
              }}
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
              Update Progress
            </Button>
          </Box>
        </CardContent>
      </CardActionArea>
    </AnimatedCard>
  );

  const GradientMiniCard = ({ title, value, color, delay, progress }) => {
    const [isHovered, setIsHovered] = useState(false);
  
    // Gradient backgrounds by theme color
    const gradient =
      color === "primary"
        ? "linear-gradient(135deg, #667eea 0%, #764ba2 100%)"
        : color === "success"
        ? "linear-gradient(135deg, #66bb6a 0%, #81c784 100%)"
        : color === "warning"
        ? "linear-gradient(135deg, #ffa726 0%, #ffb74d 100%)"
        : color === "error"
        ? "linear-gradient(135deg, #ff5858 0%, #f857a6 100%)"
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
            textAlign: "center",
            borderRadius: "16px",
            overflow: "hidden",
            boxShadow: isHovered
              ? "0 16px 40px rgba(0,0,0,0.25)"
              : "0 4px 14px rgba(0,0,0,0.1)",
            transform: isHovered ? "translateY(-10px) scale(1.05)" : "translateY(0) scale(1)",
            transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
            cursor: "pointer",
          }}
        >
          <CardContent>
            {progress !== undefined ? (
              <Box display="flex" alignItems="center" justifyContent="center">
                <CircularProgress
                  variant="determinate"
                  value={progress}
                  size={48}
                  thickness={4}
                  sx={{
                    color: "rgba(255,255,255,0.9)",
                    mr: 1,
                    transition: "all 0.4s ease",
                    transform: isHovered ? "scale(1.15)" : "scale(1)",
                  }}
                />
                <Box>
                  <Typography variant="h6" sx={{ fontWeight: 800, color: "#fff" }}>
                    {Math.round(progress)}%
                  </Typography>
                  <Typography variant="caption" sx={{ opacity: 0.85 }}>
                    {title}
                  </Typography>
                </Box>
              </Box>
            ) : (
              <>
                <Typography
                  variant="h4"
                  sx={{
                    fontWeight: 800,
                    mb: 0.5,
                    color: "white",
                    transition: "transform 0.3s ease",
                    transform: isHovered ? "scale(1.1)" : "scale(1)",
                  }}
                >
                  {value}
                </Typography>
                <Typography variant="body2" sx={{ opacity: 0.9 }}>
                  {title}
                </Typography>
              </>
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
              Case Progress Tracking
            </Typography>
            <Typography variant="h6" color="textSecondary" sx={{ fontWeight: 400 }}>
              Monitor and manage all your legal cases in one place
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
              New Case
            </Button>
          </Zoom>
        </Box>
      </Fade>

      {/* Statistics Cards */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
      <Grid item xs={12} sm={6} md={2}>
        <GradientMiniCard
          delay={100}
          title="Total Cases"
          value={stats.total}
          color="primary"
        />
      </Grid>

      <Grid item xs={12} sm={6} md={2}>
        <GradientMiniCard
          delay={200}
          title="Active"
          value={stats.active}
          color="warning"
        />
      </Grid>

      <Grid item xs={12} sm={6} md={2}>
        <GradientMiniCard
          delay={300}
          title="Completed"
          value={stats.completed}
          color="success"
        />
      </Grid>

      <Grid item xs={12} sm={6} md={2}>
        <GradientMiniCard
          delay={400}
          title="Overdue"
          value={stats.overdue}
          color="error"
        />
      </Grid>

      <Grid item xs={12} sm={6} md={2}>
        <GradientMiniCard
          delay={500}
          title="Total Revenue"
          value={formatCurrency(stats.totalRevenue)}
          color="info"
        />
      </Grid>

      <Grid item xs={12} sm={6} md={2}>
        <GradientMiniCard
          delay={600}
          title="Avg Progress"
          progress={stats.avgProgress}
          color="primary"
        />
      </Grid>
    </Grid>

      {/* Tabs */}
      <AnimatedCard delay={700} sx={{ mb: 3, borderRadius: 2 }}>
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
          <Tab label={`All Cases (${cases.length})`} />
          <Tab label={`Active (${cases.filter(c => c.status === 'in_progress').length})`} />
          <Tab label={`Completed (${cases.filter(c => c.status === 'completed').length})`} />
          <Tab label={`High Priority (${cases.filter(c => c.priority === 'high').length})`} />
        </Tabs>
      </AnimatedCard>

      <Grid container spacing={3}>
        <Grid item xs={12} lg={8}>
          {filteredCases.map((caseItem, index) => (
            <CaseCard key={caseItem.id} caseItem={caseItem} index={index} />
          ))}
        </Grid>

        <Grid item xs={12} lg={4}>
          {/* Quick Actions */}
          <AnimatedCard delay={800} sx={{ mb: 3 }}>
            <CardContent>
              <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
                Quick Actions
              </Typography>
              <Box sx={{ '& > *': { mb: 1 } }}>
                <Button fullWidth variant="outlined" startIcon={<DownloadIcon />}>
                  Export Reports
                </Button>
                <Button fullWidth variant="outlined" startIcon={<ShareIcon />}>
                  Share Progress
                </Button>
                <Button fullWidth variant="outlined" startIcon={<EmailIcon />}>
                  Email Updates
                </Button>
              </Box>
            </CardContent>
          </AnimatedCard>

          {/* Recent Activity */}
          <AnimatedCard delay={900}>
            <CardContent>
              <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
                Recent Activity
              </Typography>
              <List dense>
                {[
                  { action: 'Document reviewed', case: 'Dasion Partnership', time: '2 hours ago', type: 'review' },
                  { action: 'Client feedback received', case: 'Employment Contract', time: '1 day ago', type: 'feedback' },
                  { action: 'Consultation scheduled', case: 'New Client LLC', time: '2 days ago', type: 'schedule' },
                  { action: 'Milestone completed', case: 'Retail Corp Lease', time: '3 days ago', type: 'complete' },
                ].map((activity, index) => (
                  <ListItem key={index} divider={index < 3} sx={{ 
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      backgroundColor: alpha(theme.palette.primary.main, 0.04),
                      transform: 'translateX(4px)'
                    }
                  }}>
                    <ListItemIcon>
                      {activity.type === 'review' && <DocumentIcon color="primary" />}
                      {activity.type === 'feedback' && <ChatIcon color="success" />}
                      {activity.type === 'schedule' && <CalendarIcon color="warning" />}
                      {activity.type === 'complete' && <CheckCircle color="success" />}
                    </ListItemIcon>
                    <ListItemText
                      primary={activity.action}
                      secondary={`${activity.case} • ${activity.time}`}
                    />
                  </ListItem>
                ))}
              </List>
            </CardContent>
          </AnimatedCard>
        </Grid>
      </Grid>

      <Dialog 
        open={openProgressDialog} 
        onClose={() => setOpenProgressDialog(false)} 
        maxWidth="lg" 
        fullWidth
        PaperProps={{
          sx: {
            borderRadius: 3,
            background: `linear-gradient(135deg, ${theme.palette.background.paper} 0%, ${alpha(theme.palette.background.default, 0.9)} 100%)`,
            maxHeight: '90vh'
          }
        }}
      >
        <DialogTitle sx={{ 
          fontWeight: 700,
          background: `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
          backgroundClip: 'text',
          WebkitBackgroundClip: 'text',
          color: 'transparent',
          borderBottom: `1px solid ${alpha(theme.palette.divider, 0.1)}`
        }}>
          Update Case Progress - {selectedCase?.title}
        </DialogTitle>
        <DialogContent sx={{ p: 0 }}>
          {selectedCase && (
            <Grid container>
              {/* Case Overview Sidebar */}
              <Grid item xs={12} md={4} sx={{ borderRight: `1px solid ${alpha(theme.palette.divider, 0.1)}` }}>
                <Box sx={{ p: 3 }}>
                  <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
                    Case Overview
                  </Typography>
                  
                  <Box sx={{ mb: 3 }}>
                    <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
                      <Typography variant="body2" color="textSecondary">Progress</Typography>
                      <Typography variant="body2" fontWeight={600}>{selectedCase.progress}%</Typography>
                    </Box>
                    <LinearProgress 
                      variant="determinate" 
                      value={selectedCase.progress} 
                      sx={{ 
                        height: 8, 
                        borderRadius: 4,
                        backgroundColor: alpha(theme.palette.primary.main, 0.1),
                        '& .MuiLinearProgress-bar': {
                          background: `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
                          borderRadius: 4
                        }
                      }}
                    />
                  </Box>

                  <Box sx={{ mb: 3 }}>
                    <Typography variant="body2" color="textSecondary" gutterBottom>
                      Current Step
                    </Typography>
                    <Chip 
                      label={selectedCase.timeline[selectedCase.currentStep - 1]?.step} 
                      color="primary"
                      sx={{ fontWeight: 600 }}
                    />
                  </Box>

                  <Box sx={{ mb: 3 }}>
                    <Typography variant="body2" color="textSecondary" gutterBottom>
                      Client
                    </Typography>
                    <Typography variant="body1" fontWeight={500}>
                      {selectedCase.client}
                    </Typography>
                    <Typography variant="caption" color="textSecondary">
                      {selectedCase.clientEmail}
                    </Typography>
                  </Box>

                  <Box sx={{ mb: 3 }}>
                    <Typography variant="body2" color="textSecondary" gutterBottom>
                      Deadline
                    </Typography>
                    <Box display="flex" alignItems="center" gap={1}>
                      <CalendarIcon sx={{ fontSize: 16, color: 'text.secondary' }} />
                      <Typography variant="body1" fontWeight={500}>
                        {new Date(selectedCase.deadline).toLocaleDateString()}
                      </Typography>
                    </Box>
                  </Box>

                  {selectedCase.nextAction && (
                    <Alert severity="info" sx={{ borderRadius: 2 }}>
                      <Typography variant="body2" fontWeight={500}>
                        Next Action: {selectedCase.nextAction}
                      </Typography>
                    </Alert>
                  )}
                </Box>
              </Grid>

              {/* Progress Management Main Content */}
              <Grid item xs={12} md={8}>
                <Box sx={{ p: 3 }}>
                  <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
                    Case Timeline & Progress
                  </Typography>

                  <Stepper activeStep={selectedCase.currentStep - 1} orientation="vertical" sx={{ mb: 3 }}>
                    {selectedCase.timeline.map((step, index) => (
                      <Step key={step.step} completed={step.completed}>
                        <StepLabel
                          StepIconProps={{
                            sx: {
                              color: step.completed ? theme.palette.success.main : 
                                    index === selectedCase.currentStep - 1 ? theme.palette.primary.main : 
                                    alpha(theme.palette.text.secondary, 0.3)
                            }
                          }}
                        >
                          <Box>
                            <Typography variant="subtitle1" fontWeight={600}>
                              {step.step}
                            </Typography>
                            <Typography variant="body2" color="textSecondary">
                              {step.date && new Date(step.date).toLocaleDateString()} • {step.duration}
                            </Typography>
                            {step.description && (
                              <Typography variant="body2" sx={{ mt: 0.5 }}>
                                {step.description}
                              </Typography>
                            )}
                            {step.notes && (
                              <Paper variant="outlined" sx={{ p: 1, mt: 1, backgroundColor: alpha(theme.palette.info.main, 0.05) }}>
                                <Typography variant="caption" color="textSecondary">
                                  <strong>Notes:</strong> {step.notes}
                                </Typography>
                              </Paper>
                            )}
                          </Box>
                        </StepLabel>
                        <StepContent>
                          {index === selectedCase.currentStep - 1 && (
                            <Box sx={{ mt: 2 }}>
                              <Typography variant="body2" gutterBottom color="textSecondary">
                                Add notes for this step:
                              </Typography>
                              <TextField
                                fullWidth
                                multiline
                                rows={3}
                                value={progressNotes}
                                onChange={(e) => setProgressNotes(e.target.value)}
                                placeholder="Enter progress notes, updates, or next steps..."
                                sx={{ mb: 2 }}
                              />
                              <Button
                                variant="contained"
                                startIcon={<CompleteIcon />}
                                onClick={() => handleMarkStepComplete(selectedCase.id, index)}
                                sx={{
                                  background: `linear-gradient(45deg, ${theme.palette.success.main}, ${theme.palette.success.dark})`,
                                  color: 'white',
                                  fontWeight: 600
                                }}
                              >
                                Mark {step.step} Complete
                              </Button>
                            </Box>
                          )}
                        </StepContent>
                      </Step>
                    ))}
                  </Stepper>

                  {/* Quick Progress Actions */}
                  <Paper variant="outlined" sx={{ p: 2, borderRadius: 2 }}>
                    <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
                      Quick Actions
                    </Typography>
                    <Grid container spacing={2}>
                      <Grid item xs={12} sm={6}>
                        <Button
                          fullWidth
                          variant="outlined"
                          startIcon={<PreviousIcon />}
                          disabled={selectedCase.currentStep <= 1}
                          onClick={() => handleUpdateProgress(selectedCase.id, selectedCase.currentStep - 1, progressNotes)}
                        >
                          Previous Step
                        </Button>
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <Button
                          fullWidth
                          variant="outlined"
                          startIcon={<NextIcon />}
                          disabled={selectedCase.currentStep >= selectedCase.timeline.length}
                          onClick={() => handleUpdateProgress(selectedCase.id, selectedCase.currentStep + 1, progressNotes)}
                        >
                          Next Step
                        </Button>
                      </Grid>
                    </Grid>
                  </Paper>
                </Box>
              </Grid>
            </Grid>
          )}
        </DialogContent>
        <DialogActions sx={{ p: 3, borderTop: `1px solid ${alpha(theme.palette.divider, 0.1)}` }}>
          <Button onClick={() => setOpenProgressDialog(false)}>Close</Button>
          <Button 
            onClick={() => {
              if (selectedCase) {
                handleUpdateProgress(selectedCase.id, selectedCase.currentStep, progressNotes);
              }
            }}
            variant="outlined"
          >
            Save Notes
          </Button>
        </DialogActions>
      </Dialog>

      {/* Add Case Dialog */}
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
          Create New Case
        </DialogTitle>
        <DialogContent>
          <Grid container spacing={3} sx={{ mt: 1 }}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Case Title"
                value={newCase.title}
                onChange={(e) => setNewCase({ ...newCase, title: e.target.value })}
                required
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <FormControl fullWidth>
                <InputLabel>Client</InputLabel>
                <Select
                  value={newCase.client}
                  label="Client"
                  onChange={(e) => setNewCase({ ...newCase, client: e.target.value })}
                >
                  {clients.map((client) => (
                    <MenuItem key={client.name} value={client.name}>
                      <Box>
                        <Typography>{client.name}</Typography>
                        <Typography variant="caption" color="textSecondary">
                          {client.type}
                        </Typography>
                      </Box>
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} md={6}>
              <FormControl fullWidth>
                <InputLabel>Case Type</InputLabel>
                <Select
                  value={newCase.type}
                  label="Case Type"
                  onChange={(e) => setNewCase({ ...newCase, type: e.target.value })}
                >
                  {caseTypes.map((type) => (
                    <MenuItem key={type} value={type}>{type}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} md={6}>
              <FormControl fullWidth>
                <InputLabel>Priority</InputLabel>
                <Select
                  value={newCase.priority}
                  label="Priority"
                  onChange={(e) => setNewCase({ ...newCase, priority: e.target.value })}
                >
                  <MenuItem value="low">Low</MenuItem>
                  <MenuItem value="medium">Medium</MenuItem>
                  <MenuItem value="high">High</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Deadline"
                type="date"
                value={newCase.deadline}
                onChange={(e) => setNewCase({ ...newCase, deadline: e.target.value })}
                InputLabelProps={{ shrink: true }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Estimated Revenue"
                type="number"
                value={newCase.estimatedRevenue}
                onChange={(e) => setNewCase({ ...newCase, estimatedRevenue: e.target.value })}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <MoneyIcon color="primary" />
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                multiline
                rows={3}
                label="Case Description"
                value={newCase.description}
                onChange={(e) => setNewCase({ ...newCase, description: e.target.value })}
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions sx={{ p: 3 }}>
          <Button onClick={() => setOpenDialog(false)}>Cancel</Button>
          <Button 
            onClick={handleAddCase} 
            variant="contained"
            disabled={!newCase.title || !newCase.client || !newCase.type}
            sx={{
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              fontWeight: 700,
              px: 3,
              py: 1.5,
              color: 'white',
              boxShadow: '0 8px 24px rgba(102, 126, 234, 0.4)',
              transition: 'all 0.3s ease',
              '&:hover': {
                transform: 'translateY(-2px)',
                boxShadow: '0 12px 32px rgba(102, 126, 234, 0.5)',
              }
            }}
          >
            Create Case
          </Button>
        </DialogActions>
      </Dialog>

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

export default CaseProgress;