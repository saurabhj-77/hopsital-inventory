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
} from '@mui/material';
import {
  Add,
  Edit,
  CheckCircle,
  Schedule,
  Warning,
  CalendarToday,
  AccessTime,
  PersonAdd,
} from '@mui/icons-material';
import { getDummyData, updateDummyData } from '../../data/DummyData';
import { STORAGE_KEYS } from '../../utils/LocalStorage';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';

const TabPanel = ({ children, value, index, ...other }) => (
  <div hidden={value !== index} {...other}>
    {value === index && <Box sx={{ p: 0 }}>{children}</Box>}
  </div>
);

const Attendance = () => {
  const [tabValue, setTabValue] = useState(0);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [attendanceRecords, setAttendanceRecords] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [newRecord, setNewRecord] = useState({
    employeeId: '',
    date: new Date().toISOString().split('T')[0],
    status: 'present',
    checkIn: '08:00',
    checkOut: '17:00',
    hoursWorked: 8,
    notes: '',
  });

  useEffect(() => {
    initializeAttendanceData();
  }, []);

  const initializeAttendanceData = () => {
    const employeesData = getDummyData(STORAGE_KEYS.USERS).filter(user => user.role === 'employee');
    setEmployees(employeesData);

    let attendanceData = getDummyData(STORAGE_KEYS.ATTENDANCE);
    if (attendanceData.length === 0) {
      attendanceData = [
        {
          id: '1',
          employeeId: '2',
          date: new Date().toISOString().split('T')[0],
          status: 'present',
          checkIn: '07:55',
          checkOut: '17:05',
          hoursWorked: 8.2,
          notes: '',
        },
        {
          id: '2',
          employeeId: '3',
          date: new Date().toISOString().split('T')[0],
          status: 'late',
          checkIn: '08:45',
          checkOut: '17:00',
          hoursWorked: 7.3,
          notes: 'Traffic delay',
        },
        {
          id: '3',
          employeeId: '2',
          date: new Date(Date.now() - 86400000).toISOString().split('T')[0],
          status: 'present',
          checkIn: '08:00',
          checkOut: '16:45',
          hoursWorked: 7.8,
          notes: '',
        },
      ];
      updateDummyData(STORAGE_KEYS.ATTENDANCE, attendanceData);
    }
    setAttendanceRecords(attendanceData);
  };

  const handleAddRecord = () => {
    const recordData = {
      id: Date.now().toString(),
      ...newRecord,
    };

    const updatedRecords = [...attendanceRecords, recordData];
    setAttendanceRecords(updatedRecords);
    updateDummyData(STORAGE_KEYS.ATTENDANCE, updatedRecords);
    setOpenDialog(false);
    resetForm();
  };

  const resetForm = () => {
    setNewRecord({
      employeeId: '',
      date: new Date().toISOString().split('T')[0],
      status: 'present',
      checkIn: '08:00',
      checkOut: '17:00',
      hoursWorked: 8,
      notes: '',
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

  const getEmployeeAttendance = (employeeId) => {
    return attendanceRecords.filter(record => record.employeeId === employeeId);
  };

  const getTodaysAttendance = () => {
    const today = new Date().toISOString().split('T')[0];
    return attendanceRecords.filter(record => record.date === today);
  };

  const calculateAttendanceStats = () => {
    const today = new Date().toISOString().split('T')[0];
    const todaysRecords = attendanceRecords.filter(record => record.date === today);
    
    return {
      present: todaysRecords.filter(r => r.status === 'present').length,
      late: todaysRecords.filter(r => r.status === 'late').length,
      absent: employees.length - todaysRecords.length,
      totalEmployees: employees.length,
    };
  };

  const stats = calculateAttendanceStats();

  const AttendanceRow = ({ record }) => {
    const employee = employees.find(emp => emp.id === record.employeeId);
    
    return (
      <TableRow hover>
        <TableCell>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Avatar src={employee?.avatar} sx={{ width: 40, height: 40 }}>
              {employee?.name?.charAt(0)}
            </Avatar>
            <Box>
              <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
                {employee?.name}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {employee?.department}
              </Typography>
            </Box>
          </Box>
        </TableCell>
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
          <Typography variant="body2" color="text.secondary">
            {record.notes}
          </Typography>
        </TableCell>
      </TableRow>
    );
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Box>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
          <Typography variant="h4" sx={{ fontWeight: 700 }}>
            Attendance Management
          </Typography>
          <Button
            variant="contained"
            startIcon={<PersonAdd />}
            onClick={() => setOpenDialog(true)}
          >
            Mark Attendance
          </Button>
        </Box>

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
                      Present Today
                    </Typography>
                  </Box>
                  <CheckCircle sx={{ fontSize: 40, color: 'success.main', opacity: 0.8 }} />
                </Box>
                <LinearProgress
                  variant="determinate"
                  value={(stats.present / stats.totalEmployees) * 100}
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
                  value={(stats.late / stats.totalEmployees) * 100}
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
                    <Typography variant="h4" sx={{ fontWeight: 600, color: 'error.main' }}>
                      {stats.absent}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Absent Today
                    </Typography>
                  </Box>
                  <Warning sx={{ fontSize: 40, color: 'error.main', opacity: 0.8 }} />
                </Box>
                <LinearProgress
                  variant="determinate"
                  value={(stats.absent / stats.totalEmployees) * 100}
                  color="error"
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
                      {stats.totalEmployees}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Total Employees
                    </Typography>
                  </Box>
                  <CalendarToday sx={{ fontSize: 40, color: 'primary.main', opacity: 0.8 }} />
                </Box>
                <LinearProgress
                  variant="determinate"
                  value={100}
                  color="primary"
                  sx={{ mt: 1, height: 6, borderRadius: 3 }}
                />
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        <Paper sx={{ mb: 3 }}>
          <Tabs value={tabValue} onChange={(e, newValue) => setTabValue(newValue)}>
            <Tab label={`Today's Attendance (${getTodaysAttendance().length})`} />
            <Tab label={`All Records (${attendanceRecords.length})`} />
            <Tab label={`Reports`} />
          </Tabs>
        </Paper>

        <TabPanel value={tabValue} index={0}>
          <TableContainer component={Paper} variant="outlined">
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Employee</TableCell>
                  <TableCell>Date</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell>Check In</TableCell>
                  <TableCell>Check Out</TableCell>
                  <TableCell>Hours</TableCell>
                  <TableCell>Notes</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {getTodaysAttendance().map((record) => (
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
                  <TableCell>Employee</TableCell>
                  <TableCell>Date</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell>Check In</TableCell>
                  <TableCell>Check Out</TableCell>
                  <TableCell>Hours</TableCell>
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

        {/* Add Attendance Dialog */}
        <Dialog open={openDialog} onClose={() => setOpenDialog(false)} maxWidth="sm" fullWidth>
          <DialogTitle>
            <Typography variant="h6" sx={{ fontWeight: 600 }}>
              Mark Attendance
            </Typography>
          </DialogTitle>
          
          <DialogContent>
            <Grid container spacing={2} sx={{ mt: 1 }}>
              <Grid item xs={12}>
                <FormControl fullWidth>
                  <InputLabel>Employee</InputLabel>
                  <Select
                    value={newRecord.employeeId}
                    label="Employee"
                    onChange={(e) => setNewRecord({...newRecord, employeeId: e.target.value})}
                  >
                    {employees.map((employee) => (
                      <MenuItem key={employee.id} value={employee.id}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                          <Avatar src={employee.avatar} sx={{ width: 24, height: 24 }}>
                            {employee.name.charAt(0)}
                          </Avatar>
                          {employee.name}
                        </Box>
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>

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
                    <MenuItem value="absent">Absent</MenuItem>
                    <MenuItem value="half-day">Half Day</MenuItem>
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
                <TextField
                  fullWidth
                  multiline
                  rows={2}
                  label="Notes"
                  value={newRecord.notes}
                  onChange={(e) => setNewRecord({...newRecord, notes: e.target.value})}
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
              disabled={!newRecord.employeeId}
            >
              Save Attendance
            </Button>
          </DialogActions>
        </Dialog>
      </Box>
    </LocalizationProvider>
  );
};

export default Attendance;