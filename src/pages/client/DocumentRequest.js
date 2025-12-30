// src/components/client/DocumentRequest.js
import React, { useState } from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Grid,
  TextField,
  Button,
  Stepper,
  Step,
  StepLabel,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Chip,
  Paper,
  List,
  ListItem,
  ListItemText,
  ListItemIcon
} from '@mui/material';
import {
  Description as DocumentIcon,
  CheckCircle as CompleteIcon,
  Schedule as ScheduleIcon
} from '@mui/icons-material';

const DocumentRequest = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [documentType, setDocumentType] = useState('');
  const [description, setDescription] = useState('');
  const [urgency, setUrgency] = useState('standard');

  const documentTypes = [
    'Partnership Agreement',
    'Lease Agreement',
    'Employment Contract',
    'Purchase Agreement',
    'Non-Disclosure Agreement',
    'Service Agreement',
    'License Agreement'
  ];

  const steps = [
    'Select Document Type',
    'Provide Details',
    'Review & Submit'
  ];

  const requests = [
    {
      id: 1,
      type: 'Partnership Agreement',
      status: 'in_progress',
      date: '2024-01-15',
      estimatedCompletion: '2024-01-20'
    },
    {
      id: 2,
      type: 'NDA',
      status: 'completed',
      date: '2024-01-10',
      completedDate: '2024-01-12'
    }
  ];

  const handleNext = () => {
    setActiveStep((prevStep) => prevStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevStep) => prevStep - 1);
  };

  const handleSubmit = () => {
    // Handle document request submission
    console.log('Document request submitted:', { documentType, description, urgency });
    handleNext();
  };

  const getStepContent = (step) => {
    switch (step) {
      case 0:
        return (
          <FormControl fullWidth>
            <InputLabel>Document Type</InputLabel>
            <Select
              value={documentType}
              label="Document Type"
              onChange={(e) => setDocumentType(e.target.value)}
            >
              {documentTypes.map((type) => (
                <MenuItem key={type} value={type}>
                  {type}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        );
      
      case 1:
        return (
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                multiline
                rows={4}
                label="Document Requirements & Details"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Please describe your specific requirements, any special clauses needed, parties involved, and any other relevant details..."
              />
            </Grid>
            <Grid item xs={12}>
              <FormControl fullWidth>
                <InputLabel>Urgency</InputLabel>
                <Select
                  value={urgency}
                  label="Urgency"
                  onChange={(e) => setUrgency(e.target.value)}
                >
                  <MenuItem value="standard">Standard (5-7 business days)</MenuItem>
                  <MenuItem value="express">Express (2-3 business days)</MenuItem>
                  <MenuItem value="urgent">Urgent (24 hours)</MenuItem>
                </Select>
              </FormControl>
            </Grid>
          </Grid>
        );
      
      case 2:
        return (
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              Review Your Request
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <Typography variant="body2" color="textSecondary">
                  Document Type:
                </Typography>
                <Typography variant="body1" gutterBottom>
                  {documentType}
                </Typography>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography variant="body2" color="textSecondary">
                  Urgency:
                </Typography>
                <Typography variant="body1" gutterBottom>
                  {urgency.charAt(0).toUpperCase() + urgency.slice(1)}
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography variant="body2" color="textSecondary">
                  Requirements:
                </Typography>
                <Typography variant="body1">
                  {description || 'No specific requirements provided'}
                </Typography>
              </Grid>
            </Grid>
          </Paper>
        );
      
      default:
        return 'Unknown step';
    }
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom sx={{ fontWeight: 600, mb: 4 }}>
        Request New Document
      </Typography>

      <Grid container spacing={4}>
        {/* Request Form */}
        <Grid item xs={12} md={8}>
          <Card>
            <CardContent sx={{ p: 3 }}>
              <Stepper activeStep={activeStep} sx={{ mb: 4 }}>
                {steps.map((label) => (
                  <Step key={label}>
                    <StepLabel>{label}</StepLabel>
                  </Step>
                ))}
              </Stepper>

              <Box sx={{ mt: 2 }}>
                {getStepContent(activeStep)}
              </Box>

              <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 4 }}>
                <Button
                  disabled={activeStep === 0}
                  onClick={handleBack}
                >
                  Back
                </Button>
                
                {activeStep === steps.length - 1 ? (
                  <Button variant="contained" onClick={handleSubmit}>
                    Submit Request
                  </Button>
                ) : (
                  <Button variant="contained" onClick={handleNext}>
                    Next
                  </Button>
                )}
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* Recent Requests & Info */}
        <Grid item xs={12} md={4}>
          {/* Recent Requests */}
          <Card sx={{ mb: 3 }}>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Recent Requests
              </Typography>
              <List dense>
                {requests.map((request) => (
                  <ListItem key={request.id} divider>
                    <ListItemIcon>
                      <DocumentIcon color="primary" />
                    </ListItemIcon>
                    <ListItemText
                      primary={request.type}
                      secondary={`Requested: ${request.date}`}
                    />
                    <Chip
                      label={request.status.replace('_', ' ')}
                      color={request.status === 'completed' ? 'success' : 'primary'}
                      size="small"
                    />
                  </ListItem>
                ))}
              </List>
            </CardContent>
          </Card>

          {/* Process Info */}
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                How It Works
              </Typography>
              {[
                'Submit your document requirements',
                'Lawyer reviews and may schedule consultation',
                'AI generates initial draft from consultation',
                'Review and provide feedback',
                'Receive final document for signature'
              ].map((step, index) => (
                <Box key={index} display="flex" alignItems="center" mb={1}>
                  <CompleteIcon color="primary" sx={{ fontSize: 16, mr: 1 }} />
                  <Typography variant="body2">{step}</Typography>
                </Box>
              ))}
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default DocumentRequest;