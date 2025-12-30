import React, { useState, useEffect } from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
  Button,
  Paper,
  Avatar,
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
  Tabs,
  Tab,
  LinearProgress,
  Fab,
  Fade,
  Zoom,
} from '@mui/material';
import {
  Add,
  Edit,
  CheckCircle,
  Schedule,
  Warning,
  CalendarToday,
  AccessTime,
  Person,
  TrendingUp,
  Download,
} from '@mui/icons-material';
import { getDummyData, updateDummyData } from '../../data/DummyData';
import { STORAGE_KEYS } from '../../utils/LocalStorage';
import { auth } from '../../utils/Auth';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';

const TabPanel = ({ children, value, index, ...other }) => (
  <div hidden={value !== index} {...other}>
    {value === index && <Box sx={{ p: 0 }}>{children}</Box>}
  </div>
);

const EmployeeAttendance = () => {
  const [tabValue, setTabValue] = useState(0);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [attendanceRecords, setAttendanceRecords] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);
  const [newRecord, setNewRecord] = useState({
    date: new Date().toISOString().split('T')[0],
    checkIn: '08:00',
    checkOut: '17:00',
    status: 'present',
    hoursWorked: 8,
    notes: '',
    project: '1',
  });

  useEffect(() => {
    const user = auth.getCurrentUser();
    setCurrentUser(user);
    initializeAttendanceData(user);
  }, []);

  const initializeAttendanceData = (user) => {
    let attendanceData = getDummyData(STORAGE_KEYS.ATTENDANCE);
    
    // Filter records for current user
    const userRecords = attendanceData.filter(record => record.employeeId === user?.id);
    
    // Add some sample records if none exist
    if (userRecords.length === 0) {
      const sampleRecords = [
        {
          id: '1',
          employeeId: user?.id,
          date: new Date().toISOString().split('T')[0],
          status: 'present',
          checkIn: '07:55',
          checkOut: '17:05',
          hoursWorked: 8.2,
          notes: '',
          project: '1',
        },
        {
          id: '2',
          employeeId: user?.id,
          date: new Date(Date.now() - 86400000).toISOString().split('T')[0],
          status: 'present',
          checkIn: '08:00',
          checkOut: '16:45',
          hoursWorked: 7.8,
          notes: 'Left early for site visit',
          project: '1',
        },
        {
          id: '3',
          employeeId: user?.id,
          date: new Date(Date.now() - 2 * 86400000).toISOString().split('T')[0],
          status: 'late',
          checkIn: '09:15',
          checkOut: '17:30',
          hoursWorked: 7.3,
          notes: 'Traffic delay',
          project: '1',
        },
      ];
      
      const updatedAttendance = [...attendanceData, ...sampleRecords];
      updateDummyData(STORAGE_KEYS.ATTENDANCE, updatedAttendance);
      setAttendanceRecords(sampleRecords);
    } else {
      setAttendanceRecords(userRecords);
    }
  };

  const handleAddRecord = () => {
    const recordData = {
      id: Date.now().toString(),
      employeeId: currentUser?.id,
      ...newRecord,
    };

    const allRecords = getDummyData(STORAGE_KEYS.ATTENDANCE);
    const updatedRecords = [...allRecords, recordData];
    updateDummyData(STORAGE_KEYS.ATTENDANCE, updatedRecords);
    setAttendanceRecords(updatedRecords.filter(record => record.employeeId === currentUser?.id));
    setOpenDialog(false);
    resetForm();
  };

  const resetForm = () => {
    setNewRecord({
      date: new Date().toISOString().split('T')[0],
      checkIn: '08:00',
      checkOut: '17:00',
      status: 'present',
      hoursWorked: 8,
      notes: '',
      project: '1',
    });
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'present': return 'success';
      case 'late': return 'warning';
      case 'absent': return 'error';
      case 'half-day': return 'info';
      default: return 'default';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'present': return <CheckCircle />;
      case 'late': return <Schedule />;
      case 'absent': return <Warning />;
      default: return <AccessTime />;
    }
  };

  const calculateMonthlyStats = () => {
    const currentMonth = new Date().getMonth();
    const currentYear = new Date().getFullYear();
    
    const monthlyRecords = attendanceRecords.filter(record => {
      const recordDate = new Date(record.date);
      return recordDate.getMonth() === currentMonth && recordDate.getFullYear() === currentYear;
    });

    return {
      present: monthlyRecords.filter(r => r.status === 'present').length,
      late: monthlyRecords.filter(r => r.status === 'late').length,
      absent: monthlyRecords.filter(r => r.status === 'absent').length,
      totalHours: monthlyRecords.reduce((sum, record) => sum + record.hoursWorked, 0),
      workingDays: monthlyRecords.length,
    };
  };

  const stats = calculateMonthlyStats();
  const projects = getDummyData(STORAGE_KEYS.PROJECTS);

  const AttendanceRow = ({ record }) => {
    const project = projects.find(p => p.id === record.project);
    
    return (
      <TableRow hover>
        <TableCell>
          <Typography variant="body2">
            {new Date(record.date).toLocaleDateString()}
          </Typography>
        </TableCell>
        <TableCell>
          <Chip
            icon={getStatusIcon(record.status)}
            label={record.status}
            color={getStatusColor(record.status)}
            size="small"
          />
        </TableCell>
        <TableCell>
          <Typography variant="body2" sx={{ fontWeight: 600 }}>
            {record.checkIn}
          </Typography>
        </TableCell>
        <TableCell>
          <Typography variant="body2" sx={{ fontWeight: 600 }}>
            {record.checkOut}
          </Typography>
        </TableCell>
        <TableCell>
          <Typography variant="body2" sx={{ fontWeight: 600, color: 'primary.main' }}>
            {record.hoursWorked}h
          </Typography>
        </TableCell>
        <TableCell>
          <Typography variant="body2">
            {project?.name || 'General'}
          </Typography>
        </TableCell>
        <TableCell>
          <Typography variant="body2" color="text.secondary">
            {record.notes}
          </Typography>
        </TableCell>
      </TableRow>
    );
  };

  const getTodaysRecord = () => {
    const today = new Date().toISOString().split('T')[0];
    return attendanceRecords.find(record => record.date === today);
  };

  const todaysRecord = getTodaysRecord();

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Box>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
          <Typography variant="h4" sx={{ fontWeight: 700 }}>
            My Attendance
          </Typography>
          <Box sx={{ display: 'flex', gap: 1 }}>
            <Button startIcon={<Download />} variant="outlined">
              Export
            </Button>
            <Button
              variant="contained"
              startIcon={<Add />}
              onClick={() => setOpenDialog(true)}
            >
              Log Attendance
            </Button>
          </Box>
        </Box>

        {/* Today's Status */}
        <Card sx={{ mb: 4, backgroundColor: todaysRecord ? 'success.light' : 'warning.light', color: 'white' }}>
          <CardContent>
            <Grid container alignItems="center" spacing={3}>
              <Grid item xs={12} md={8}>
                <Typography variant="h5" gutterBottom sx={{ fontWeight: 600 }}>
                  {todaysRecord ? `Checked ${todaysRecord.status === 'present' ? 'In' : todaysRecord.status}` : 'Not Checked In Today'}
                </Typography>
                <Typography variant="body1">
                  {todaysRecord 
                    ? `You checked in at ${todaysRecord.checkIn} and worked ${todaysRecord.hoursWorked} hours`
                    : 'Remember to log your attendance for today'
                  }
                </Typography>
              </Grid>
              <Grid item xs={12} md={4} sx={{ textAlign: 'center' }}>
                <Avatar sx={{ width: 80, height: 80, mx: 'auto', mb: 2, backgroundColor: 'rgba(255,255,255,0.2)' }}>
                  {todaysRecord ? <CheckCircle sx={{ fontSize: 40 }} /> : <Schedule sx={{ fontSize: 40 }} />}
                </Avatar>
              </Grid>
            </Grid>
          </CardContent>
        </Card>

        {/* Statistics Cards */}
        <Grid container spacing={3} sx={{ mb: 4 }}>
          <Grid item xs={12} sm={6} md={3}>
            <Card>
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <Box>
                    <Typography variant="h4" sx={{ fontWeight: 600, color: 'success.main' }}>
                      {stats.present}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Present Days
                    </Typography>
                  </Box>
                  <CheckCircle sx={{ fontSize: 40, color: 'success.main', opacity: 0.8 }} />
                </Box>
                <LinearProgress
                  variant="determinate"
                  value={(stats.present / Math.max(stats.workingDays, 1)) * 100}
                  color="success"
                  sx={{ mt: 1, height: 6, borderRadius: 3 }}
                />
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <Card>
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <Box>
                    <Typography variant="h4" sx={{ fontWeight: 600, color: 'warning.main' }}>
                      {stats.late}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Late Arrivals
                    </Typography>
                  </Box>
                  <Schedule sx={{ fontSize: 40, color: 'warning.main', opacity: 0.8 }} />
                </Box>
                <LinearProgress
                  variant="determinate"
                  value={(stats.late / Math.max(stats.workingDays, 1)) * 100}
                  color="warning"
                  sx={{ mt: 1, height: 6, borderRadius: 3 }}
                />
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <Card>
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <Box>
                    <Typography variant="h4" sx={{ fontWeight: 600, color: 'primary.main' }}>
                      {stats.totalHours}h
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Total Hours
                    </Typography>
                  </Box>
                  <AccessTime sx={{ fontSize: 40, color: 'primary.main', opacity: 0.8 }} />
                </Box>
                <LinearProgress
                  variant="determinate"
                  value={Math.min((stats.totalHours / 160) * 100, 100)}
                  color="primary"
                  sx={{ mt: 1, height: 6, borderRadius: 3 }}
                />
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <Card>
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <Box>
                    <Typography variant="h4" sx={{ fontWeight: 600, color: 'info.main' }}>
                      {stats.workingDays}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Working Days
                    </Typography>
                  </Box>
                  <CalendarToday sx={{ fontSize: 40, color: 'info.main', opacity: 0.8 }} />
                </Box>
                <LinearProgress
                  variant="determinate"
                  value={100}
                  color="info"
                  sx={{ mt: 1, height: 6, borderRadius: 3 }}
                />
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        <Paper sx={{ mb: 3 }}>
          <Tabs value={tabValue} onChange={(e, newValue) => setTabValue(newValue)}>
            <Tab label={`All Records (${attendanceRecords.length})`} />
            <Tab label={`This Month (${stats.workingDays})`} />
            <Tab label={`Summary`} />
          </Tabs>
        </Paper>

        <TabPanel value={tabValue} index={0}>
          <TableContainer component={Paper} variant="outlined">
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Date</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell>Check In</TableCell>
                  <TableCell>Check Out</TableCell>
                  <TableCell>Hours</TableCell>
                  <TableCell>Project</TableCell>
                  <TableCell>Notes</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {attendanceRecords.map((record) => (
                  <AttendanceRow key={record.id} record={record} />
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </TabPanel>

        <TabPanel value={tabValue} index={1}>
          <TableContainer component={Paper} variant="outlined">
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Date</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell>Check In</TableCell>
                  <TableCell>Check Out</TableCell>
                  <TableCell>Hours</TableCell>
                  <TableCell>Project</TableCell>
                  <TableCell>Notes</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {attendanceRecords
                  .filter(record => {
                    const recordDate = new Date(record.date);
                    const currentMonth = new Date().getMonth();
                    const currentYear = new Date().getFullYear();
                    return recordDate.getMonth() === currentMonth && recordDate.getFullYear() === currentYear;
                  })
                  .map((record) => (
                    <AttendanceRow key={record.id} record={record} />
                  ))
                }
              </TableBody>
            </Table>
          </TableContainer>
        </TabPanel>

        <TabPanel value={tabValue} index={2}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <Card>
                <CardContent>
                  <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
                    Attendance Summary
                  </Typography>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                    <Typography>Attendance Rate</Typography>
                    <Typography sx={{ fontWeight: 600 }}>
                      {((stats.present / Math.max(stats.workingDays, 1)) * 100).toFixed(1)}%
                    </Typography>
                  </Box>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                    <Typography>Average Hours/Day</Typography>
                    <Typography sx={{ fontWeight: 600 }}>
                      {(stats.totalHours / Math.max(stats.workingDays, 1)).toFixed(1)}h
                    </Typography>
                  </Box>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                    <Typography>On-time Rate</Typography>
                    <Typography sx={{ fontWeight: 600 }}>
                      {(((stats.present - stats.late) / Math.max(stats.present, 1)) * 100).toFixed(1)}%
                    </Typography>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} md={6}>
              <Card>
                <CardContent>
                  <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
                    Performance Trend
                  </Typography>
                  <Box sx={{ textAlign: 'center', py: 4 }}>
                    <TrendingUp sx={{ fontSize: 64, color: 'success.main', mb: 2 }} />
                    <Typography variant="body1" color="text.secondary">
                      Your attendance performance is excellent!
                    </Typography>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </TabPanel>

        {/* Add Attendance Dialog */}
        <Dialog open={openDialog} onClose={() => setOpenDialog(false)} maxWidth="sm" fullWidth>
          <DialogTitle>
            <Typography variant="h6" sx={{ fontWeight: 600 }}>
              Log Attendance
            </Typography>
          </DialogTitle>
          
          <DialogContent>
            <Grid container spacing={2} sx={{ mt: 1 }}>
              <Grid item xs={12}>
                <DatePicker
                  label="Date"
                  value={selectedDate}
                  onChange={(newValue) => {
                    setSelectedDate(newValue);
                    setNewRecord({...newRecord, date: newValue.toISOString().split('T')[0]});
                  }}
                  renderInput={(params) => <TextField {...params} fullWidth />}
                />
              </Grid>

              <Grid item xs={12}>
                <FormControl fullWidth>
                  <InputLabel>Status</InputLabel>
                  <Select
                    value={newRecord.status}
                    label="Status"
                    onChange={(e) => setNewRecord({...newRecord, status: e.target.value})}
                  >
                    <MenuItem value="present">Present</MenuItem>
                    <MenuItem value="late">Late</MenuItem>
                    <MenuItem value="half-day">Half Day</MenuItem>
                    <MenuItem value="absent">Absent</MenuItem>
                  </Select>
                </FormControl>
              </Grid>

              <Grid item xs={6}>
                <TextField
                  fullWidth
                  label="Check In"
                  type="time"
                  value={newRecord.checkIn}
                  onChange={(e) => setNewRecord({...newRecord, checkIn: e.target.value})}
                  InputLabelProps={{ shrink: true }}
                />
              </Grid>

              <Grid item xs={6}>
                <TextField
                  fullWidth
                  label="Check Out"
                  type="time"
                  value={newRecord.checkOut}
                  onChange={(e) => setNewRecord({...newRecord, checkOut: e.target.value})}
                  InputLabelProps={{ shrink: true }}
                />
              </Grid>

              <Grid item xs={12}>
                <FormControl fullWidth>
                  <InputLabel>Project</InputLabel>
                  <Select
                    value={newRecord.project}
                    label="Project"
                    onChange={(e) => setNewRecord({...newRecord, project: e.target.value})}
                  >
                    {projects.map((project) => (
                      <MenuItem key={project.id} value={project.id}>{project.name}</MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>

              <Grid item xs={12}>
                <TextField
                  fullWidth
                  multiline
                  rows={2}
                  label="Notes"
                  value={newRecord.notes}
                  onChange={(e) => setNewRecord({...newRecord, notes: e.target.value})}
                  placeholder="Any notes about your work day..."
                />
              </Grid>
            </Grid>
          </DialogContent>
          
          <DialogActions sx={{ p: 3 }}>
            <Button onClick={() => setOpenDialog(false)}>
              Cancel
            </Button>
            <Button
              variant="contained"
              onClick={handleAddRecord}
            >
              Save Attendance
            </Button>
          </DialogActions>
        </Dialog>
      </Box>
    </LocalizationProvider>
  );
};

export default EmployeeAttendance;