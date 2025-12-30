// src/components/client/ClientCaseProgress.js
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
  Tabs,
  Tab,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Avatar,
  Paper,
  IconButton
} from '@mui/material';
import {
  Timeline as TimelineIcon,
  Description as DocumentIcon,
  Person as LawyerIcon,
  CalendarToday as DateIcon,
  Download as DownloadIcon,
  Message as MessageIcon,
  CheckCircle as CompleteIcon,
  Pending as PendingIcon
} from '@mui/icons-material';
import { motion } from "framer-motion";
import WorkOutlineIcon from "@mui/icons-material/WorkOutline";
import HourglassBottomIcon from "@mui/icons-material/HourglassBottom";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";

const ClientCaseProgress = () => {
  const [selectedTab, setSelectedTab] = useState(0);
  const [selectedCase, setSelectedCase] = useState(null);
  const [openDetailDialog, setOpenDetailDialog] = useState(false);

  const cases = [
    {
      id: 1,
      title: 'Dasion Partnership Agreement',
      lawyer: 'John Smith, Esq.',
      progress: 75,
      status: 'in_progress',
      currentStep: 3,
      startDate: '2024-01-10',
      estimatedCompletion: '2024-01-20',
      type: 'Partnership Agreement',
      priority: 'high',
      timeline: [
        { 
          step: 'Initial Consultation', 
          date: '2024-01-10', 
          completed: true,
          description: 'Discussed partnership terms and requirements',
          documents: ['Consultation Notes.pdf']
        },
        { 
          step: 'Document Drafting', 
          date: '2024-01-12', 
          completed: true,
          description: 'AI generated initial draft based on consultation',
          documents: ['Draft_Agreement_v1.docx']
        },
        { 
          step: 'Client Review', 
          date: '2024-01-15', 
          completed: true,
          description: 'Document sent for client review and feedback',
          documents: ['Partnership_Agreement_Review.pdf']
        },
        { 
          step: 'Legal Review', 
          date: '2024-01-16', 
          completed: false,
          description: 'Incorporating client feedback and legal review',
          documents: []
        },
        { 
          step: 'Final Approval', 
          date: '2024-01-18', 
          completed: false,
          description: 'Final document preparation and signing',
          documents: []
        }
      ],
      nextAction: 'Review updated draft by Jan 17, 2024',
      assignedLawyer: {
        name: 'John Smith, Esq.',
        email: 'john.smith@lawfirm.com',
        phone: '+1 (555) 123-4567',
        specialization: 'Business & Partnership Law'
      }
    },
    {
      id: 2,
      title: 'Commercial Lease Agreement',
      lawyer: 'Sarah Johnson, Esq.',
      progress: 100,
      status: 'completed',
      currentStep: 5,
      startDate: '2024-01-05',
      completionDate: '2024-01-12',
      type: 'Lease Agreement',
      priority: 'medium',
      timeline: [
        { 
          step: 'Initial Consultation', 
          date: '2024-01-05', 
          completed: true,
          description: 'Discussed lease terms and property requirements'
        },
        { 
          step: 'Document Drafting', 
          date: '2024-01-07', 
          completed: true,
          description: 'Lease agreement draft prepared'
        },
        { 
          step: 'Client Review', 
          date: '2024-01-09', 
          completed: true,
          description: 'Client reviewed and provided feedback'
        },
        { 
          step: 'Legal Review', 
          date: '2024-01-10', 
          completed: true,
          description: 'Final legal review completed'
        },
        { 
          step: 'Final Approval', 
          date: '2024-01-12', 
          completed: true,
          description: 'Document signed and executed',
          documents: ['Signed_Lease_Agreement.pdf']
        }
      ]
    },
    {
      id: 3,
      title: 'Employment Contract',
      lawyer: 'Michael Chen, Esq.',
      progress: 30,
      status: 'in_progress',
      currentStep: 2,
      startDate: '2024-01-14',
      estimatedCompletion: '2024-01-25',
      type: 'Employment Agreement',
      priority: 'medium',
      timeline: [
        { 
          step: 'Initial Consultation', 
          date: '2024-01-14', 
          completed: true,
          description: 'Discussed employment terms and position details'
        },
        { 
          step: 'Document Drafting', 
          date: '2024-01-16', 
          completed: false,
          description: 'Preparing employment contract draft'
        },
        { 
          step: 'Client Review', 
          date: '2024-01-19', 
          completed: false,
          description: 'Client review phase'
        },
        { 
          step: 'Legal Review', 
          date: '2024-01-22', 
          completed: false,
          description: 'Final legal adjustments'
        },
        { 
          step: 'Final Approval', 
          date: '2024-01-25', 
          completed: false,
          description: 'Contract execution'
        }
      ],
      nextAction: 'Awaiting initial draft by Jan 18, 2024'
    }
  ];

  const stats = [
    {
      title: "Total Cases",
      value: cases.length,
      icon: <WorkOutlineIcon sx={{ fontSize: 40, color: "#1e88e5" }} />,
      gradient: "linear-gradient(135deg, #E3F2FD 0%, #BBDEFB 100%)",
    },
    {
      title: "In Progress",
      value: cases.filter((c) => c.status === "in_progress").length,
      icon: <HourglassBottomIcon sx={{ fontSize: 40, color: "#f9a825" }} />,
      gradient: "linear-gradient(135deg, #FFFDE7 0%, #FFF59D 100%)",
    },
    {
      title: "Completed",
      value: cases.filter((c) => c.status === "completed").length,
      icon: <CheckCircleIcon sx={{ fontSize: 40, color: "#43a047" }} />,
      gradient: "linear-gradient(135deg, #E8F5E9 0%, #C8E6C9 100%)",
    },
    {
      title: "Avg. Progress",
      value:
        cases.length > 0
          ? `${Math.round(
              cases.reduce((acc, c) => acc + c.progress, 0) / cases.length
            )}%`
          : "0%",
      icon: <TrendingUpIcon sx={{ fontSize: 40, color: "#8e24aa" }} />,
      gradient: "linear-gradient(135deg, #F3E5F5 0%, #E1BEE7 100%)",
    },
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed': return 'success';
      case 'in_progress': return 'primary';
      case 'not_started': return 'default';
      case 'on_hold': return 'warning';
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

  const filteredCases = cases.filter(caseItem => {
    switch (selectedTab) {
      case 0: return true; // All
      case 1: return caseItem.status === 'in_progress'; // Active
      case 2: return caseItem.status === 'completed'; // Completed
      case 3: return caseItem.priority === 'high'; // High Priority
      default: return true;
    }
  });

  const CaseCard = ({ caseItem }) => (
    <Card 
      sx={{ 
        mb: 3, 
        cursor: 'pointer',
        transition: 'all 0.2s',
        '&:hover': {
          transform: 'translateY(-2px)',
          boxShadow: 3
        }
      }}
      onClick={() => {
        setSelectedCase(caseItem);
        setOpenDetailDialog(true);
      }}
    >
      <CardContent>
        <Box display="flex" justifyContent="space-between" alignItems="flex-start" mb={2}>
          <Box flex={1}>
            <Typography variant="h6" gutterBottom>
              {caseItem.title}
            </Typography>
            <Box display="flex" alignItems="center" gap={2} flexWrap="wrap">
              <Chip 
                label={caseItem.type} 
                variant="outlined" 
                size="small" 
              />
              <Box display="flex" alignItems="center">
                <LawyerIcon sx={{ fontSize: 16, mr: 0.5, color: 'text.secondary' }} />
                <Typography variant="body2" color="textSecondary">
                  {caseItem.lawyer}
                </Typography>
              </Box>
              <Chip 
                label={caseItem.priority} 
                color={getPriorityColor(caseItem.priority)}
                size="small"
              />
            </Box>
          </Box>
          <Chip 
            label={caseItem.status.replace('_', ' ')} 
            color={getStatusColor(caseItem.status)}
          />
        </Box>

        {/* Progress Bar */}
        <LinearProgress 
          variant="determinate" 
          value={caseItem.progress} 
          sx={{ 
            height: 8, 
            borderRadius: 4, 
            mb: 2,
            backgroundColor: 'grey.200'
          }}
        />
        
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
          <Typography variant="body2" color="textSecondary">
            {caseItem.progress}% Complete
          </Typography>
          <Typography variant="body2" color="textSecondary">
            Started: {caseItem.startDate}
          </Typography>
        </Box>

        {/* Next Action */}
        {caseItem.nextAction && (
          <Paper 
            variant="outlined" 
            sx={{ 
              p: 2, 
              backgroundColor: 'info.light',
              borderColor: 'info.main'
            }}
          >
            <Box display="flex" alignItems="center">
              <PendingIcon color="info" sx={{ mr: 1 }} />
              <Box>
                <Typography variant="subtitle2" color="info.dark">
                  Next Action Required
                </Typography>
                <Typography variant="body2">
                  {caseItem.nextAction}
                </Typography>
              </Box>
            </Box>
          </Paper>
        )}

        {/* Quick Actions */}
        <Box display="flex" gap={1} sx={{ mt: 2 }}>
          <Button 
            size="small" 
            startIcon={<MessageIcon />}
            variant="outlined"
            onClick={(e) => {
              e.stopPropagation();
              // Open chat with lawyer
            }}
          >
            Message Lawyer
          </Button>
          {caseItem.status === 'completed' && (
            <Button 
              size="small" 
              startIcon={<DownloadIcon />}
              variant="outlined"
              onClick={(e) => {
                e.stopPropagation();
                // Download documents
              }}
            >
              Download Documents
            </Button>
          )}
        </Box>
      </CardContent>
    </Card>
  );

  const CaseDetailDialog = () => (
    <Dialog 
      open={openDetailDialog} 
      onClose={() => setOpenDetailDialog(false)} 
      maxWidth="md" 
      fullWidth
      scroll="paper"
    >
      <DialogTitle>
        <Typography variant="h5" component="div">
          {selectedCase?.title}
        </Typography>
        <Typography variant="body2" color="textSecondary">
          Case Progress Details
        </Typography>
      </DialogTitle>
      
      <DialogContent dividers>
        {selectedCase && (
          <Box>
            {/* Case Overview */}
            <Grid container spacing={3} sx={{ mb: 4 }}>
              <Grid item xs={12} sm={6}>
                <Paper variant="outlined" sx={{ p: 2 }}>
                  <Typography variant="subtitle2" color="textSecondary" gutterBottom>
                    Assigned Lawyer
                  </Typography>
                  <Box display="flex" alignItems="center">
                    <Avatar sx={{ mr: 2, bgcolor: 'primary.main' }}>
                      {selectedCase.lawyer.charAt(0)}
                    </Avatar>
                    <Box>
                      <Typography variant="body1" fontWeight="medium">
                        {selectedCase.lawyer}
                      </Typography>
                      <Typography variant="body2" color="textSecondary">
                        {selectedCase.assignedLawyer?.specialization}
                      </Typography>
                    </Box>
                  </Box>
                </Paper>
              </Grid>
              
              <Grid item xs={12} sm={6}>
                <Paper variant="outlined" sx={{ p: 2 }}>
                  <Typography variant="subtitle2" color="textSecondary" gutterBottom>
                    Case Information
                  </Typography>
                  <Box display="flex" justifyContent="space-between">
                    <Typography variant="body2">Status:</Typography>
                    <Chip 
                      label={selectedCase.status.replace('_', ' ')} 
                      color={getStatusColor(selectedCase.status)}
                      size="small"
                    />
                  </Box>
                  <Box display="flex" justifyContent="space-between">
                    <Typography variant="body2">Priority:</Typography>
                    <Chip 
                      label={selectedCase.priority} 
                      color={getPriorityColor(selectedCase.priority)}
                      size="small"
                    />
                  </Box>
                </Paper>
              </Grid>
            </Grid>

            {/* Progress Overview */}
            <Card sx={{ mb: 3 }}>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Overall Progress
                </Typography>
                <LinearProgress 
                  variant="determinate" 
                  value={selectedCase.progress} 
                  sx={{ 
                    height: 12, 
                    borderRadius: 6, 
                    mb: 2 
                  }}
                />
                <Box display="flex" justifyContent="space-between">
                  <Typography variant="body2" color="textSecondary">
                    {selectedCase.progress}% Complete
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    {selectedCase.estimatedCompletion && 
                      `Estimated Completion: ${selectedCase.estimatedCompletion}`
                    }
                    {selectedCase.completionDate && 
                      `Completed: ${selectedCase.completionDate}`
                    }
                  </Typography>
                </Box>
              </CardContent>
            </Card>

            {/* Timeline */}
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Case Timeline
                </Typography>
                <Stepper activeStep={selectedCase.currentStep - 1} orientation="vertical">
                  {selectedCase.timeline.map((step, index) => (
                    <Step key={step.step} completed={step.completed}>
                      <StepLabel
                        icon={
                          step.completed ? (
                            <CompleteIcon color="success" />
                          ) : (
                            <TimelineIcon color={index === selectedCase.currentStep - 1 ? "primary" : "disabled"} />
                          )
                        }
                      >
                        <Typography variant="subtitle1" fontWeight="medium">
                          {step.step}
                        </Typography>
                        <Typography variant="body2" color="textSecondary">
                          {step.date}
                        </Typography>
                      </StepLabel>
                      <StepContent>
                        <Typography variant="body2" paragraph>
                          {step.description}
                        </Typography>
                        {step.documents && step.documents.length > 0 && (
                          <Box>
                            <Typography variant="subtitle2" gutterBottom>
                              Documents:
                            </Typography>
                            {step.documents.map((doc, docIndex) => (
                              <Button
                                key={docIndex}
                                startIcon={<DownloadIcon />}
                                size="small"
                                sx={{ mr: 1, mb: 1 }}
                              >
                                {doc}
                              </Button>
                            ))}
                          </Box>
                        )}
                      </StepContent>
                    </Step>
                  ))}
                </Stepper>
              </CardContent>
            </Card>

            {/* Lawyer Contact Information */}
            {selectedCase.assignedLawyer && (
              <Card sx={{ mt: 3 }}>
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    Contact Your Lawyer
                  </Typography>
                  <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                      <Typography variant="body2" color="textSecondary">
                        Email
                      </Typography>
                      <Typography variant="body1">
                        {selectedCase.assignedLawyer.email}
                      </Typography>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <Typography variant="body2" color="textSecondary">
                        Phone
                      </Typography>
                      <Typography variant="body1">
                        {selectedCase.assignedLawyer.phone}
                      </Typography>
                    </Grid>
                  </Grid>
                  <Button 
                    variant="contained" 
                    startIcon={<MessageIcon />}
                    sx={{ mt: 2 }}
                  >
                    Send Message
                  </Button>
                </CardContent>
              </Card>
            )}
          </Box>
        )}
      </DialogContent>
      
      <DialogActions>
        <Button onClick={() => setOpenDetailDialog(false)}>
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom sx={{ fontWeight: 600, mb: 4 }}>
        My Cases Progress
      </Typography>

      {/* Statistics Cards */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
      {stats.map((stat, index) => (
        <Grid item xs={12} sm={6} md={3} key={index}>
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            whileHover={{ scale: 1.05, y: -4 }}
          >
            <Card
              sx={{
                height: 150,
                borderRadius: 4,
                background: stat.gradient,
                boxShadow: "0 6px 18px rgba(0,0,0,0.08)",
                transition: "all 0.3s ease",
                "&:hover": {
                  boxShadow: "0 12px 25px rgba(0,0,0,0.15)",
                },
              }}
            >
              <CardContent>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  <Box>
                    <Typography
                      variant="overline"
                      sx={{ color: "text.secondary", fontWeight: 600 }}
                    >
                      {stat.title}
                    </Typography>
                    <Typography
                      variant="h4"
                      sx={{
                        fontWeight: 700,
                        mt: 0.5,
                        color: "text.primary",
                      }}
                    >
                      {stat.value}
                    </Typography>
                  </Box>
                  {stat.icon}
                </Box>
              </CardContent>
            </Card>
          </motion.div>
        </Grid>
      ))}
    </Grid>

      {/* Tabs */}
      <Card sx={{ mb: 3 }}>
        <Tabs 
          value={selectedTab} 
          onChange={(e, newValue) => setSelectedTab(newValue)}
          sx={{ borderBottom: 1, borderColor: 'divider' }}
        >
          <Tab label="All Cases" />
          <Tab label="Active" />
          <Tab label="Completed" />
          <Tab label="High Priority" />
        </Tabs>
      </Card>

      {/* Cases List */}
      <Grid container spacing={3}>
        <Grid item xs={12} lg={8}>
          {filteredCases.length > 0 ? (
            filteredCases.map((caseItem) => (
              <CaseCard key={caseItem.id} caseItem={caseItem} />
            ))
          ) : (
            <Card>
              <CardContent sx={{ textAlign: 'center', py: 6 }}>
                <TimelineIcon sx={{ fontSize: 64, color: 'text.secondary', mb: 2 }} />
                <Typography variant="h6" color="textSecondary">
                  No cases found
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  {selectedTab === 1 ? "You don't have any active cases." : 
                   selectedTab === 2 ? "You don't have any completed cases." :
                   "You don't have any high priority cases."}
                </Typography>
              </CardContent>
            </Card>
          )}
        </Grid>

        {/* Sidebar - Quick Actions & Info */}
        <Grid item xs={12} lg={4}>
          {/* Quick Actions */}
          <Card sx={{ mb: 3 }}>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Quick Actions
              </Typography>
              <Box sx={{ '& > *': { mb: 1 } }}>
                <Button variant="outlined" fullWidth startIcon={<MessageIcon />}>
                  Contact Support
                </Button>
                <Button variant="outlined" fullWidth startIcon={<DocumentIcon />}>
                  Request Case Update
                </Button>
                <Button variant="outlined" fullWidth startIcon={<DownloadIcon />}>
                  Download All Documents
                </Button>
              </Box>
            </CardContent>
          </Card>

          {/* Case Status Legend */}
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Status Legend
              </Typography>
              <List dense>
                <ListItem>
                  <ListItemIcon>
                    <CompleteIcon color="success" />
                  </ListItemIcon>
                  <ListItemText primary="Completed - Case successfully finished" />
                </ListItem>
                <ListItem>
                  <ListItemIcon>
                    <TimelineIcon color="primary" />
                  </ListItemIcon>
                  <ListItemText primary="In Progress - Active work ongoing" />
                </ListItem>
                <ListItem>
                  <ListItemIcon>
                    <PendingIcon color="warning" />
                  </ListItemIcon>
                  <ListItemText primary="Pending - Awaiting action or review" />
                </ListItem>
              </List>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Case Detail Dialog */}
      {selectedCase && <CaseDetailDialog />}
    </Box>
  );
};

export default ClientCaseProgress;