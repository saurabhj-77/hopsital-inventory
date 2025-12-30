// src/components/client/ConsultationScheduling.js
import React, { useState } from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Grid,
  Button,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Chip,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Paper
} from '@mui/material';
import {
  Schedule as ScheduleIcon,
  VideoCall as VideoIcon,
  Person as InPersonIcon,
  CheckCircle as ConfirmedIcon
} from '@mui/icons-material';

const ConsultationScheduling = () => {
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [consultationType, setConsultationType] = useState('video');
  const [purpose, setPurpose] = useState('');
  const [openConfirm, setOpenConfirm] = useState(false);

  const availableSlots = [
    { date: '2024-01-18', times: ['09:00', '11:00', '14:00', '16:00'] },
    { date: '2024-01-19', times: ['10:00', '13:00', '15:00', '17:00'] },
    { date: '2024-01-22', times: ['09:30', '11:30', '14:30', '16:30'] }
  ];

  const upcomingConsultations = [
    {
      id: 1,
      date: '2024-01-18',
      time: '14:00',
      type: 'video',
      purpose: 'Partnership Agreement Review',
      status: 'confirmed'
    },
    {
      id: 2,
      date: '2024-01-25',
      time: '11:00',
      type: 'in_person',
      purpose: 'Contract Signing',
      status: 'pending'
    }
  ];

  const handleScheduleConsultation = () => {
    // Schedule consultation logic
    setOpenConfirm(true);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'confirmed': return 'success';
      case 'pending': return 'warning';
      case 'cancelled': return 'error';
      default: return 'default';
    }
  };

  const getTypeIcon = (type) => {
    return type === 'video' ? <VideoIcon /> : <InPersonIcon />;
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom sx={{ fontWeight: 600, mb: 4 }}>
        Schedule Consultation
      </Typography>

      <Grid container spacing={4}>
        {/* Scheduling Form */}
        <Grid item xs={12} md={8}>
          <Card>
            <CardContent sx={{ p: 3 }}>
              <Typography variant="h6" gutterBottom sx={{ mb: 3 }}>
                Book a Consultation
              </Typography>

              <Grid container spacing={3}>
                {/* Consultation Type */}
                <Grid item xs={12}>
                  <FormControl fullWidth>
                    <InputLabel>Consultation Type</InputLabel>
                    <Select
                      value={consultationType}
                      label="Consultation Type"
                      onChange={(e) => setConsultationType(e.target.value)}
                    >
                      <MenuItem value="video">
                        <Box display="flex" alignItems="center">
                          <VideoIcon sx={{ mr: 1 }} />
                          Video Call
                        </Box>
                      </MenuItem>
                      <MenuItem value="in_person">
                        <Box display="flex" alignItems="center">
                          <InPersonIcon sx={{ mr: 1 }} />
                          In-Person Meeting
                        </Box>
                      </MenuItem>
                    </Select>
                  </FormControl>
                </Grid>

                {/* Purpose */}
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    multiline
                    rows={3}
                    label="Consultation Purpose"
                    value={purpose}
                    onChange={(e) => setPurpose(e.target.value)}
                    placeholder="Please describe what you'd like to discuss during the consultation..."
                  />
                </Grid>

                {/* Available Dates */}
                <Grid item xs={12}>
                  <Typography variant="subtitle1" gutterBottom>
                    Available Dates
                  </Typography>
                  <Grid container spacing={1}>
                    {availableSlots.map((slot, index) => (
                      <Grid item xs={12} sm={6} md={4} key={index}>
                        <Paper
                          variant={selectedDate === slot.date ? "elevation" : "outlined"}
                          elevation={selectedDate === slot.date ? 2 : 0}
                          sx={{
                            p: 2,
                            cursor: 'pointer',
                            borderColor: selectedDate === slot.date ? 'primary.main' : 'divider',
                            backgroundColor: selectedDate === slot.date ? 'primary.light' : 'background.paper',
                            '&:hover': {
                              borderColor: 'primary.main'
                            }
                          }}
                          onClick={() => setSelectedDate(slot.date)}
                        >
                          <Typography variant="body2" fontWeight="medium">
                            {new Date(slot.date).toLocaleDateString('en-US', { 
                              weekday: 'short', 
                              month: 'short', 
                              day: 'numeric' 
                            })}
                          </Typography>
                        </Paper>
                      </Grid>
                    ))}
                  </Grid>
                </Grid>

                {/* Available Times */}
                {selectedDate && (
                  <Grid item xs={12}>
                    <Typography variant="subtitle1" gutterBottom>
                      Available Times for {new Date(selectedDate).toLocaleDateString()}
                    </Typography>
                    <Grid container spacing={1}>
                      {availableSlots
                        .find(slot => slot.date === selectedDate)
                        ?.times.map((time, index) => (
                          <Grid item key={index}>
                            <Chip
                              label={time}
                              variant={selectedTime === time ? "filled" : "outlined"}
                              color={selectedTime === time ? "primary" : "default"}
                              onClick={() => setSelectedTime(time)}
                              clickable
                            />
                          </Grid>
                        ))
                      }
                    </Grid>
                  </Grid>
                )}
              </Grid>

              <Button
                variant="contained"
                size="large"
                startIcon={<ScheduleIcon />}
                onClick={handleScheduleConsultation}
                disabled={!selectedDate || !selectedTime || !purpose}
                fullWidth
                sx={{ mt: 3 }}
              >
                Schedule Consultation
              </Button>
            </CardContent>
          </Card>
        </Grid>

        {/* Upcoming Consultations & Info */}
        <Grid item xs={12} md={4}>
          {/* Upcoming Consultations */}
          <Card sx={{ mb: 3 }}>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Upcoming Consultations
              </Typography>
              <List dense>
                {upcomingConsultations.map((consultation) => (
                  <ListItem key={consultation.id} divider>
                    <ListItemIcon>
                      {getTypeIcon(consultation.type)}
                    </ListItemIcon>
                    <ListItemText
                      primary={consultation.purpose}
                      secondary={`${consultation.date} at ${consultation.time}`}
                    />
                    <Chip
                      label={consultation.status}
                      color={getStatusColor(consultation.status)}
                      size="small"
                    />
                  </ListItem>
                ))}
              </List>
            </CardContent>
          </Card>

          {/* Consultation Info */}
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Consultation Details
              </Typography>
              {[
                { label: 'Duration', value: '60 minutes' },
                { label: 'Preparation', value: 'Have your documents ready' },
                { label: 'Recording', value: 'All sessions are recorded for document generation' },
                { label: 'Cancellation', value: '24 hours notice required' }
              ].map((item, index) => (
                <Box key={index} display="flex" justifyContent="space-between" mb={1}>
                  <Typography variant="body2" color="textSecondary">
                    {item.label}:
                  </Typography>
                  <Typography variant="body2" fontWeight="medium">
                    {item.value}
                  </Typography>
                </Box>
              ))}
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Confirmation Dialog */}
      <Dialog open={openConfirm} onClose={() => setOpenConfirm(false)} maxWidth="sm" fullWidth>
        <DialogTitle sx={{ textAlign: 'center' }}>
          <ConfirmedIcon color="success" sx={{ fontSize: 48, mb: 2 }} />
          <Typography variant="h5" gutterBottom>
            Consultation Scheduled!
          </Typography>
        </DialogTitle>
        <DialogContent>
          <Typography variant="body1" align="center" gutterBottom>
            Your consultation has been scheduled successfully.
          </Typography>
          <Paper sx={{ p: 2, mt: 2, backgroundColor: 'success.light' }}>
            <Typography variant="body1" fontWeight="medium" align="center">
              {new Date(selectedDate).toLocaleDateString('en-US', { 
                weekday: 'long', 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
              })} at {selectedTime}
            </Typography>
            <Typography variant="body2" align="center">
              {consultationType === 'video' ? 'Video Call' : 'In-Person Meeting'}
            </Typography>
          </Paper>
        </DialogContent>
        <DialogActions sx={{ justifyContent: 'center', pb: 3 }}>
          <Button variant="contained" onClick={() => setOpenConfirm(false)}>
            Done
          </Button>
          <Button variant="outlined">
            Add to Calendar
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default ConsultationScheduling;