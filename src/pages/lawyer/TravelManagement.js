// src/components/lawyer/TravelManagement.js
import React, { useState } from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Grid,
  Chip,
  Button,
  IconButton,
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
  ListItemIcon
} from '@mui/material';
import {
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  LocationOn as LocationIcon,
  Schedule as ScheduleIcon,
  Business as BusinessIcon
} from '@mui/icons-material';

const TravelManagement = () => {
  const [travels, setTravels] = useState([
    {
      id: 1,
      client: 'Medical Clinic LLC',
      purpose: 'Contract Signing Meeting',
      date: '2024-01-20',
      time: '10:00 AM',
      location: '123 Medical Plaza, Suite 500',
      status: 'scheduled',
      duration: '2 hours',
      notes: 'Bring final partnership agreement documents'
    },
    {
      id: 2,
      client: 'Retail Corp',
      purpose: 'Site Inspection & Lease Review',
      date: '2024-01-22',
      time: '2:00 PM',
      location: '456 Commerce Street',
      status: 'completed',
      duration: '3 hours',
      notes: 'Completed - Lease terms agreed upon'
    }
  ]);

  const [openDialog, setOpenDialog] = useState(false);
  const [newTravel, setNewTravel] = useState({
    client: '',
    purpose: '',
    date: '',
    time: '',
    location: '',
    duration: '',
    notes: ''
  });

  const handleAddTravel = () => {
    // Add travel logic
    setOpenDialog(false);
    setNewTravel({ client: '', purpose: '', date: '', time: '', location: '', duration: '', notes: '' });
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'scheduled': return 'primary';
      case 'completed': return 'success';
      case 'cancelled': return 'error';
      default: return 'default';
    }
  };

  const TravelCard = ({ travel }) => (
    <Card sx={{ mb: 2 }}>
      <CardContent>
        <Box display="flex" justifyContent="space-between" alignItems="flex-start" mb={2}>
          <Box>
            <Typography variant="h6" gutterBottom>
              {travel.purpose}
            </Typography>
            <Typography variant="body2" color="textSecondary" gutterBottom>
              Client: {travel.client}
            </Typography>
          </Box>
          <Chip 
            label={travel.status} 
            color={getStatusColor(travel.status)}
            size="small"
          />
        </Box>

        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <Box display="flex" alignItems="center" mb={1}>
              <ScheduleIcon sx={{ fontSize: 16, mr: 1, color: 'text.secondary' }} />
              <Typography variant="body2">
                {travel.date} at {travel.time}
              </Typography>
            </Box>
            <Box display="flex" alignItems="center">
              <LocationIcon sx={{ fontSize: 16, mr: 1, color: 'text.secondary' }} />
              <Typography variant="body2">
                {travel.location}
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography variant="body2" gutterBottom>
              Duration: {travel.duration}
            </Typography>
            {travel.notes && (
              <Typography variant="body2" color="textSecondary">
                Notes: {travel.notes}
              </Typography>
            )}
          </Grid>
        </Grid>

        {travel.status === 'scheduled' && (
          <Box display="flex" gap={1} sx={{ mt: 2 }}>
            <Button size="small" variant="outlined" startIcon={<EditIcon />}>
              Edit
            </Button>
            <Button size="small" variant="outlined" color="success">
              Mark Complete
            </Button>
          </Box>
        )}
      </CardContent>
    </Card>
  );

  return (
    <Box sx={{ p: 3 }}>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={4}>
        <Typography variant="h4" sx={{ fontWeight: 600 }}>
          Travel Management
        </Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => setOpenDialog(true)}
        >
          Schedule Travel
        </Button>
      </Box>

      <Grid container spacing={3}>
        <Grid item xs={12} md={8}>
          {/* Upcoming Travels */}
          <Card sx={{ mb: 3 }}>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Upcoming Travel Schedule
              </Typography>
              {travels.filter(t => t.status === 'scheduled').map((travel) => (
                <TravelCard key={travel.id} travel={travel} />
              ))}
            </CardContent>
          </Card>

          {/* Travel History */}
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Travel History
              </Typography>
              {travels.filter(t => t.status === 'completed').map((travel) => (
                <TravelCard key={travel.id} travel={travel} />
              ))}
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={4}>
          {/* Travel Statistics */}
          <Card sx={{ mb: 3 }}>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Travel Statistics
              </Typography>
              <List dense>
                {[
                  { label: 'This Month', value: '3 trips' },
                  { label: 'Client Visits', value: '8 completed' },
                  { label: 'Total Travel Time', value: '24 hours' },
                ].map((stat, index) => (
                  <ListItem key={index} divider={index < 2}>
                    <ListItemText
                      primary={stat.label}
                      secondary={stat.value}
                    />
                  </ListItem>
                ))}
              </List>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Quick Actions
              </Typography>
              <Box sx={{ '& > *': { mb: 1 } }}>
                <Button variant="outlined" fullWidth>
                  View Travel Calendar
                </Button>
                <Button variant="outlined" fullWidth>
                  Export Travel Log
                </Button>
                <Button variant="outlined" fullWidth>
                  Set Travel Preferences
                </Button>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Add Travel Dialog */}
      <Dialog open={openDialog} onClose={() => setOpenDialog(false)} maxWidth="sm" fullWidth>
        <DialogTitle>Schedule New Travel</DialogTitle>
        <DialogContent>
          <Grid container spacing={2} sx={{ mt: 1 }}>
            <Grid item xs={12}>
              <FormControl fullWidth>
                <InputLabel>Client</InputLabel>
                <Select
                  value={newTravel.client}
                  label="Client"
                  onChange={(e) => setNewTravel({ ...newTravel, client: e.target.value })}
                >
                  <MenuItem value="Medical Clinic LLC">Medical Clinic LLC</MenuItem>
                  <MenuItem value="Retail Corp">Retail Corp</MenuItem>
                  <MenuItem value="Tech Startup Inc">Tech Startup Inc</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Purpose"
                value={newTravel.purpose}
                onChange={(e) => setNewTravel({ ...newTravel, purpose: e.target.value })}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Date"
                type="date"
                value={newTravel.date}
                onChange={(e) => setNewTravel({ ...newTravel, date: e.target.value })}
                InputLabelProps={{ shrink: true }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Time"
                type="time"
                value={newTravel.time}
                onChange={(e) => setNewTravel({ ...newTravel, time: e.target.value })}
                InputLabelProps={{ shrink: true }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Location"
                value={newTravel.location}
                onChange={(e) => setNewTravel({ ...newTravel, location: e.target.value })}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Estimated Duration"
                value={newTravel.duration}
                onChange={(e) => setNewTravel({ ...newTravel, duration: e.target.value })}
                placeholder="e.g., 2 hours"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                multiline
                rows={3}
                label="Notes"
                value={newTravel.notes}
                onChange={(e) => setNewTravel({ ...newTravel, notes: e.target.value })}
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)}>Cancel</Button>
          <Button onClick={handleAddTravel} variant="contained">
            Schedule Travel
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default TravelManagement;