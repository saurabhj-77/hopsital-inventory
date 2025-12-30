import React, { useState } from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  TextField,
  Button,
  Grid,
  Avatar,
  Paper,
  Chip,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Divider,
  IconButton,
  Fade,
  Slide,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from '@mui/material';
import {
  AddPhotoAlternate,
  Save,
  Add,
  Engineering,
//   Electrician,
  Plumbing,
  Carpenter,
} from '@mui/icons-material';
import { getDummyData, updateDummyData } from '../../data/DummyData';
import { STORAGE_KEYS } from '../../utils/LocalStorage';

const departments = [
  { value: 'construction', label: 'Construction', icon: <Engineering /> },
  { value: 'electrical', label: 'Electrical', icon: <Engineering /> },
  { value: 'plumbing', label: 'Plumbing', icon: <Plumbing /> },
  { value: 'carpentry', label: 'Carpentry', icon: <Carpenter /> },
];

const skills = [
  'Project Management', 'Blueprint Reading', 'Equipment Operation', 
  'Safety Compliance', 'Concrete Work', 'Framing', 'Electrical Installation',
  'Plumbing', 'Finishing Work', 'Quality Control'
];

export const AddEmployee = () => {
  const [employees, setEmployees] = useState(getDummyData(STORAGE_KEYS.USERS).filter(u => u.role === 'employee'));
  const [newEmployee, setNewEmployee] = useState({
    name: '',
    email: '',
    phone: '',
    department: '',
    position: '',
    salary: '',
    joinDate: new Date().toISOString().split('T')[0],
  });
  const [selectedSkills, setSelectedSkills] = useState([]);
  const [avatarPreview, setAvatarPreview] = useState('');
  const [openDialog, setOpenDialog] = useState(false);

  const handleAddEmployee = () => {
    const employeesData = getDummyData(STORAGE_KEYS.USERS);
    const newEmployeeData = {
      id: Date.now().toString(),
      ...newEmployee,
      role: 'employee',
      password: 'password123',
      skills: selectedSkills,
      avatar: avatarPreview || `/static/images/avatar/${employees.length + 1}.jpg`,
      status: 'active',
    };

    const updatedEmployees = [...employeesData, newEmployeeData];
    updateDummyData(STORAGE_KEYS.USERS, updatedEmployees);
    setEmployees(updatedEmployees.filter(u => u.role === 'employee'));
    
    setNewEmployee({
      name: '',
      email: '',
      phone: '',
      department: '',
      position: '',
      salary: '',
      joinDate: new Date().toISOString().split('T')[0],
    });
    setSelectedSkills([]);
    setAvatarPreview('');
    setOpenDialog(false);
  };

  const handleSkillToggle = (skill) => {
    setSelectedSkills(prev =>
      prev.includes(skill)
        ? prev.filter(s => s !== skill)
        : [...prev, skill]
    );
  };

  const handleAvatarUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => setAvatarPreview(e.target.result);
      reader.readAsDataURL(file);
    }
  };

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
        <Typography variant="h4" sx={{ fontWeight: 700 }}>
          Team Management
        </Typography>
        <Button
          variant="contained"
          startIcon={<Add />}
          onClick={() => setOpenDialog(true)}
          sx={{ borderRadius: 2 }}
        >
          Add New Employee
        </Button>
      </Box>

      <Grid container spacing={3}>
        <Grid item xs={12} md={8}>
          <Typography variant="h6" gutterBottom sx={{ fontWeight: 600, mb: 3 }}>
            Current Team Members
          </Typography>
          
          <Grid container spacing={2}>
            {employees.map((employee, index) => (
              <Grid item xs={12} sm={6} key={employee.id}>
                <Slide in={true} direction="up" timeout={index * 100}>
                  <Card 
                    sx={{ 
                      transition: 'all 0.3s ease',
                      '&:hover': { 
                        transform: 'translateY(-4px)',
                        boxShadow: 4 
                      }
                    }}
                  >
                    <CardContent>
                      <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                        <Avatar
                          src={employee.avatar}
                          sx={{ width: 56, height: 56, mr: 2 }}
                        >
                          {employee.name.charAt(0)}
                        </Avatar>
                        <Box>
                          <Typography variant="h6" sx={{ fontWeight: 600 }}>
                            {employee.name}
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            {employee.position}
                          </Typography>
                        </Box>
                      </Box>
                      
                      <Box sx={{ mb: 2 }}>
                        <Chip
                          label={employee.department}
                          size="small"
                          color="primary"
                          variant="outlined"
                          sx={{ mr: 1, mb: 1 }}
                        />
                        <Chip
                          label={employee.status}
                          size="small"
                          color={employee.status === 'active' ? 'success' : 'default'}
                        />
                      </Box>
                      
                      <Typography variant="body2" color="text.secondary">
                        {employee.email}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {employee.phone}
                      </Typography>
                    </CardContent>
                  </Card>
                </Slide>
              </Grid>
            ))}
          </Grid>
        </Grid>

        <Grid item xs={12} md={4}>
          <Card sx={{ position: 'sticky', top: 100 }}>
            <CardContent>
              <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
                Team Overview
              </Typography>
              
              {departments.map((dept) => {
                const count = employees.filter(e => e.department === dept.value).length;
                return (
                  <Box key={dept.value} sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <Box sx={{ color: 'primary.main', mr: 2 }}>
                      {dept.icon}
                    </Box>
                    <Box sx={{ flexGrow: 1 }}>
                      <Typography variant="body2" sx={{ fontWeight: 600 }}>
                        {dept.label}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {count} employees
                      </Typography>
                    </Box>
                    <Chip label={count} size="small" />
                  </Box>
                );
              })}
              
              <Divider sx={{ my: 2 }} />
              
              <Box sx={{ textAlign: 'center' }}>
                <Typography variant="h4" sx={{ fontWeight: 700, color: 'primary.main' }}>
                  {employees.length}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Total Employees
                </Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Add Employee Dialog */}
      <Dialog 
        open={openDialog} 
        onClose={() => setOpenDialog(false)}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>
          <Typography variant="h5" sx={{ fontWeight: 600 }}>
            Add New Employee
          </Typography>
        </DialogTitle>
        
        <DialogContent>
          <Fade in={openDialog}>
            <Grid container spacing={3} sx={{ mt: 1 }}>
              <Grid item xs={12} sx={{ textAlign: 'center' }}>
                <Box sx={{ position: 'relative', display: 'inline-block' }}>
                  <Avatar
                    src={avatarPreview}
                    sx={{ width: 100, height: 100, mb: 2 }}
                  >
                    <AddPhotoAlternate />
                  </Avatar>
                  <IconButton
                    component="label"
                    sx={{
                      position: 'absolute',
                      bottom: 8,
                      right: 8,
                      backgroundColor: 'primary.main',
                      color: 'white',
                      '&:hover': { backgroundColor: 'primary.dark' }
                    }}
                  >
                    <AddPhotoAlternate />
                    <input
                      type="file"
                      hidden
                      accept="image/*"
                      onChange={handleAvatarUpload}
                    />
                  </IconButton>
                </Box>
              </Grid>

              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Full Name"
                  value={newEmployee.name}
                  onChange={(e) => setNewEmployee({...newEmployee, name: e.target.value})}
                />
              </Grid>

              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Email"
                  type="email"
                  value={newEmployee.email}
                  onChange={(e) => setNewEmployee({...newEmployee, email: e.target.value})}
                />
              </Grid>

              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Phone"
                  value={newEmployee.phone}
                  onChange={(e) => setNewEmployee({...newEmployee, phone: e.target.value})}
                />
              </Grid>

              <Grid item xs={12} md={6}>
                <FormControl fullWidth>
                  <InputLabel>Department</InputLabel>
                  <Select
                    value={newEmployee.department}
                    label="Department"
                    onChange={(e) => setNewEmployee({...newEmployee, department: e.target.value})}
                  >
                    {departments.map((dept) => (
                      <MenuItem key={dept.value} value={dept.value}>
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                          <Box sx={{ mr: 1 }}>{dept.icon}</Box>
                          {dept.label}
                        </Box>
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>

              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Position"
                  value={newEmployee.position}
                  onChange={(e) => setNewEmployee({...newEmployee, position: e.target.value})}
                />
              </Grid>

              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Salary"
                  type="number"
                  value={newEmployee.salary}
                  onChange={(e) => setNewEmployee({...newEmployee, salary: e.target.value})}
                  InputProps={{ startAdornment: '$' }}
                />
              </Grid>

              <Grid item xs={12}>
                <Typography variant="subtitle1" gutterBottom sx={{ fontWeight: 600 }}>
                  Skills & Qualifications
                </Typography>
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                  {skills.map((skill) => (
                    <Chip
                      key={skill}
                      label={skill}
                      clickable
                      color={selectedSkills.includes(skill) ? 'primary' : 'default'}
                      onClick={() => handleSkillToggle(skill)}
                      variant={selectedSkills.includes(skill) ? 'filled' : 'outlined'}
                    />
                  ))}
                </Box>
              </Grid>
            </Grid>
          </Fade>
        </DialogContent>
        
        <DialogActions sx={{ p: 3 }}>
          <Button onClick={() => setOpenDialog(false)}>
            Cancel
          </Button>
          <Button
            variant="contained"
            startIcon={<Save />}
            onClick={handleAddEmployee}
            disabled={!newEmployee.name || !newEmployee.email}
          >
            Add Employee
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};