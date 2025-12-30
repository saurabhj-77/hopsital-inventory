import React, { useState, useEffect } from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Grid,
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Chip,
  Paper,
  Stepper,
  Step,
  StepLabel,
  Avatar,
  AvatarGroup,
  Divider,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Alert,
  LinearProgress,
  Fab,
  Zoom,
  Fade,
} from '@mui/material';
import {
  Add,
  Save,
  Schedule,
  Flag,
  Person,
  Description,
  AttachFile,
  CalendarToday,
  AccessTime,
  Group,
} from '@mui/icons-material';
import { getDummyData, updateDummyData } from '../../data/DummyData';
import { STORAGE_KEYS } from '../../utils/LocalStorage';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';

const steps = ['Task Details', 'Assignment', 'Review & Create'];

const priorityOptions = [
  { value: 'low', label: 'Low', color: 'success' },
  { value: 'medium', label: 'Medium', color: 'warning' },
  { value: 'high', label: 'High', color: 'error' },
  { value: 'critical', label: 'Critical', color: 'error' },
];

const taskCategories = [
  'Foundation Work',
  'Structural Framing',
  'Electrical',
  'Plumbing',
  'HVAC',
  'Finishing',
  'Landscaping',
  'Safety Inspection',
  'Quality Control',
];

const CreateTask = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [employees, setEmployees] = useState([]);
  const [projects, setProjects] = useState([]);
  const [taskData, setTaskData] = useState({
    title: '',
    description: '',
    category: '',
    priority: 'medium',
    projectId: '',
    assignedTo: [],
    startDate: new Date(),
    dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days from now
    estimatedHours: 8,
    dependencies: [],
    attachments: [],
    checklist: [],
  });
  const [newChecklistItem, setNewChecklistItem] = useState('');
  const [openSuccess, setOpenSuccess] = useState(false);

  useEffect(() => {
    initializeData();
  }, []);

  const initializeData = () => {
    const employeesData = getDummyData(STORAGE_KEYS.USERS).filter(user => user.role === 'employee');
    const projectsData = getDummyData(STORAGE_KEYS.PROJECTS);
    
    setEmployees(employeesData);
    setProjects(projectsData);

    // Set default project if available
    if (projectsData.length > 0 && !taskData.projectId) {
      setTaskData(prev => ({ ...prev, projectId: projectsData[0].id }));
    }
  };

  const handleNext = () => {
    setActiveStep((prev) => prev + 1);
  };

  const handleBack = () => {
    setActiveStep((prev) => prev - 1);
  };

  const handleTaskDataChange = (field, value) => {
    setTaskData(prev => ({ ...prev, [field]: value }));
  };

  const handleAddChecklistItem = () => {
    if (newChecklistItem.trim()) {
      const newItem = {
        id: Date.now().toString(),
        text: newChecklistItem.trim(),
        completed: false,
      };
      setTaskData(prev => ({
        ...prev,
        checklist: [...prev.checklist, newItem]
      }));
      setNewChecklistItem('');
    }
  };

  const handleRemoveChecklistItem = (id) => {
    setTaskData(prev => ({
      ...prev,
      checklist: prev.checklist.filter(item => item.id !== id)
    }));
  };

  const handleToggleChecklistItem = (id) => {
    setTaskData(prev => ({
      ...prev,
      checklist: prev.checklist.map(item =>
        item.id === id ? { ...item, completed: !item.completed } : item
      )
    }));
  };

  const handleAssignEmployee = (employeeId) => {
    setTaskData(prev => {
      const isAssigned = prev.assignedTo.includes(employeeId);
      if (isAssigned) {
        return {
          ...prev,
          assignedTo: prev.assignedTo.filter(id => id !== employeeId)
        };
      } else {
        return {
          ...prev,
          assignedTo: [...prev.assignedTo, employeeId]
        };
      }
    });
  };

  const handleCreateTask = () => {
    const tasksData = getDummyData(STORAGE_KEYS.TASKS);
    const newTask = {
      id: Date.now().toString(),
      ...taskData,
      status: 'pending',
      progress: 0,
      createdBy: getDummyData(STORAGE_KEYS.CURRENT_USER)?.id || '1',
      createdAt: new Date().toISOString(),
      lastUpdated: new Date().toISOString(),
    };

    const updatedTasks = [...tasksData, newTask];
    updateDummyData(STORAGE_KEYS.TASKS, updatedTasks);
    setOpenSuccess(true);
    
    // Reset form
    setTaskData({
      title: '',
      description: '',
      category: '',
      priority: 'medium',
      projectId: projects[0]?.id || '',
      assignedTo: [],
      startDate: new Date(),
      dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
      estimatedHours: 8,
      dependencies: [],
      attachments: [],
      checklist: [],
    });
    setActiveStep(0);
  };

  const getStepContent = (step) => {
    switch (step) {
      case 0:
        return (
          <Fade in={true} timeout={500}>
            <Box>
              <Typography variant="h6" gutterBottom sx={{ fontWeight: 600, mb: 3 }}>
                Task Information
              </Typography>
              
              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Task Title"
                    value={taskData.title}
                    onChange={(e) => handleTaskDataChange('title', e.target.value)}
                    placeholder="Enter a clear and descriptive task title"
                    variant="outlined"
                  />
                </Grid>

                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    multiline
                    rows={4}
                    label="Description"
                    value={taskData.description}
                    onChange={(e) => handleTaskDataChange('description', e.target.value)}
                    placeholder="Provide detailed instructions, requirements, and expectations for this task..."
                    variant="outlined"
                  />
                </Grid>

                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth>
                    <InputLabel>Category</InputLabel>
                    <Select
                      value={taskData.category}
                      label="Category"
                      onChange={(e) => handleTaskDataChange('category', e.target.value)}
                    >
                      {taskCategories.map((category) => (
                        <MenuItem key={category} value={category}>{category}</MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>

                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth>
                    <InputLabel>Priority</InputLabel>
                    <Select
                      value={taskData.priority}
                      label="Priority"
                      onChange={(e) => handleTaskDataChange('priority', e.target.value)}
                      renderValue={(value) => {
                        const option = priorityOptions.find(opt => opt.value === value);
                        return (
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                            <Flag sx={{ color: `${option?.color}.main` }} />
                            {option?.label}
                          </Box>
                        );
                      }}
                    >
                      {priorityOptions.map((option) => (
                        <MenuItem key={option.value} value={option.value}>
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                            <Flag sx={{ color: `${option.color}.main` }} />
                            {option.label}
                          </Box>
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>

                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth>
                    <InputLabel>Project</InputLabel>
                    <Select
                      value={taskData.projectId}
                      label="Project"
                      onChange={(e) => handleTaskDataChange('projectId', e.target.value)}
                    >
                      {projects.map((project) => (
                        <MenuItem key={project.id} value={project.id}>
                          {project.name}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>

                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Estimated Hours"
                    type="number"
                    value={taskData.estimatedHours}
                    onChange={(e) => handleTaskDataChange('estimatedHours', parseFloat(e.target.value))}
                    InputProps={{
                      endAdornment: <AccessTime sx={{ color: 'text.secondary', ml: 1 }} />,
                    }}
                  />
                </Grid>

                <Grid item xs={12}>
                  <Typography variant="subtitle1" gutterBottom sx={{ fontWeight: 600 }}>
                    Checklist Items
                  </Typography>
                  <Box sx={{ display: 'flex', gap: 1, mb: 2 }}>
                    <TextField
                      fullWidth
                      size="small"
                      placeholder="Add a checklist item..."
                      value={newChecklistItem}
                      onChange={(e) => setNewChecklistItem(e.target.value)}
                      onKeyPress={(e) => {
                        if (e.key === 'Enter') {
                          handleAddChecklistItem();
                        }
                      }}
                    />
                    <Button
                      variant="outlined"
                      onClick={handleAddChecklistItem}
                      disabled={!newChecklistItem.trim()}
                    >
                      Add
                    </Button>
                  </Box>
                  
                  {taskData.checklist.map((item) => (
                    <Box
                      key={item.id}
                      sx={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 1,
                        p: 1,
                        border: 1,
                        borderColor: 'divider',
                        borderRadius: 1,
                        mb: 1,
                        backgroundColor: item.completed ? 'success.light' : 'background.paper',
                      }}
                    >
                      <input
                        type="checkbox"
                        checked={item.completed}
                        onChange={() => handleToggleChecklistItem(item.id)}
                        style={{ marginRight: 8 }}
                      />
                      <Typography
                        variant="body2"
                        sx={{
                          flexGrow: 1,
                          textDecoration: item.completed ? 'line-through' : 'none',
                          color: item.completed ? 'text.secondary' : 'text.primary',
                        }}
                      >
                        {item.text}
                      </Typography>
                      <IconButton
                        size="small"
                        onClick={() => handleRemoveChecklistItem(item.id)}
                        color="error"
                      >
                        <Add sx={{ transform: 'rotate(45deg)' }} />
                      </IconButton>
                    </Box>
                  ))}
                </Grid>
              </Grid>
            </Box>
          </Fade>
        );

      case 1:
        return (
          <Fade in={true} timeout={500}>
            <Box>
              <Typography variant="h6" gutterBottom sx={{ fontWeight: 600, mb: 3 }}>
                Assign Team Members
              </Typography>

              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
                    <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                      Select Team Members
                    </Typography>
                    <Chip
                      label={`${taskData.assignedTo.length} selected`}
                      color="primary"
                      variant="outlined"
                    />
                  </Box>

                  <Grid container spacing={2}>
                    {employees.map((employee) => (
                      <Grid item xs={12} sm={6} md={4} key={employee.id}>
                        <Card
                          variant={taskData.assignedTo.includes(employee.id) ? "elevated" : "outlined"}
                          sx={{
                            cursor: 'pointer',
                            transition: 'all 0.3s ease',
                            borderColor: taskData.assignedTo.includes(employee.id) ? 'primary.main' : 'divider',
                            backgroundColor: taskData.assignedTo.includes(employee.id) ? 'primary.light' : 'background.paper',
                            '&:hover': {
                              transform: 'translateY(-2px)',
                              boxShadow: 4,
                            },
                          }}
                          onClick={() => handleAssignEmployee(employee.id)}
                        >
                          <CardContent sx={{ textAlign: 'center', p: 2 }}>
                            <Avatar
                              src={employee.avatar}
                              sx={{ width: 60, height: 60, mx: 'auto', mb: 1 }}
                            >
                              {employee.name.charAt(0)}
                            </Avatar>
                            <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                              {employee.name}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                              {employee.department}
                            </Typography>
                            {taskData.assignedTo.includes(employee.id) && (
                              <Chip
                                label="Assigned"
                                color="primary"
                                size="small"
                                sx={{ mt: 1 }}
                              />
                            )}
                          </CardContent>
                        </Card>
                      </Grid>
                    ))}
                  </Grid>
                </Grid>

                <Grid item xs={12} sm={6}>
                  <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <DatePicker
                      label="Start Date"
                      value={taskData.startDate}
                      onChange={(newValue) => handleTaskDataChange('startDate', newValue)}
                      renderInput={(params) => <TextField {...params} fullWidth />}
                    />
                  </LocalizationProvider>
                </Grid>

                <Grid item xs={12} sm={6}>
                  <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <DatePicker
                      label="Due Date"
                      value={taskData.dueDate}
                      onChange={(newValue) => handleTaskDataChange('dueDate', newValue)}
                      renderInput={(params) => <TextField {...params} fullWidth />}
                    />
                  </LocalizationProvider>
                </Grid>

                <Grid item xs={12}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
                    <AttachFile />
                    <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                      Attachments
                    </Typography>
                  </Box>
                  <Button
                    variant="outlined"
                    component="label"
                    startIcon={<Add />}
                  >
                    Upload Files
                    <input
                      type="file"
                      hidden
                      multiple
                      onChange={(e) => {
                        const files = Array.from(e.target.files);
                        handleTaskDataChange('attachments', [
                          ...taskData.attachments,
                          ...files.map(file => ({
                            id: Date.now().toString() + Math.random(),
                            name: file.name,
                            size: file.size,
                            type: file.type,
                          }))
                        ]);
                      }}
                    />
                  </Button>
                  
                  {taskData.attachments.length > 0 && (
                    <Box sx={{ mt: 2 }}>
                      {taskData.attachments.map((file, index) => (
                        <Chip
                          key={file.id}
                          label={file.name}
                          onDelete={() => {
                            const newAttachments = [...taskData.attachments];
                            newAttachments.splice(index, 1);
                            handleTaskDataChange('attachments', newAttachments);
                          }}
                          variant="outlined"
                          sx={{ m: 0.5 }}
                        />
                      ))}
                    </Box>
                  )}
                </Grid>
              </Grid>
            </Box>
          </Fade>
        );

      case 2:
        const selectedProject = projects.find(p => p.id === taskData.projectId);
        const assignedEmployees = employees.filter(e => taskData.assignedTo.includes(e.id));
        const priorityOption = priorityOptions.find(opt => opt.value === taskData.priority);

        return (
          <Fade in={true} timeout={500}>
            <Box>
              <Typography variant="h6" gutterBottom sx={{ fontWeight: 600, mb: 3 }}>
                Review Task Details
              </Typography>

              <Grid container spacing={3}>
                <Grid item xs={12} md={8}>
                  <Card>
                    <CardContent>
                      <Typography variant="h5" gutterBottom sx={{ fontWeight: 600 }}>
                        {taskData.title || 'Untitled Task'}
                      </Typography>
                      
                      <Box sx={{ mb: 3 }}>
                        <Typography variant="body2" color="text.secondary" paragraph>
                          {taskData.description || 'No description provided.'}
                        </Typography>
                      </Box>

                      <Grid container spacing={2}>
                        <Grid item xs={12} sm={6}>
                          <Typography variant="subtitle2" color="text.secondary">
                            Category
                          </Typography>
                          <Typography variant="body1" sx={{ fontWeight: 600 }}>
                            {taskData.category || 'Not specified'}
                          </Typography>
                        </Grid>

                        <Grid item xs={12} sm={6}>
                          <Typography variant="subtitle2" color="text.secondary">
                            Priority
                          </Typography>
                          <Chip
                            icon={<Flag />}
                            label={priorityOption?.label || 'Medium'}
                            color={priorityOption?.color || 'default'}
                            size="small"
                          />
                        </Grid>

                        <Grid item xs={12} sm={6}>
                          <Typography variant="subtitle2" color="text.secondary">
                            Project
                          </Typography>
                          <Typography variant="body1" sx={{ fontWeight: 600 }}>
                            {selectedProject?.name || 'Not assigned'}
                          </Typography>
                        </Grid>

                        <Grid item xs={12} sm={6}>
                          <Typography variant="subtitle2" color="text.secondary">
                            Estimated Hours
                          </Typography>
                          <Typography variant="body1" sx={{ fontWeight: 600 }}>
                            {taskData.estimatedHours} hours
                          </Typography>
                        </Grid>

                        <Grid item xs={12} sm={6}>
                          <Typography variant="subtitle2" color="text.secondary">
                            Start Date
                          </Typography>
                          <Typography variant="body1" sx={{ fontWeight: 600 }}>
                            {taskData.startDate.toLocaleDateString()}
                          </Typography>
                        </Grid>

                        <Grid item xs={12} sm={6}>
                          <Typography variant="subtitle2" color="text.secondary">
                            Due Date
                          </Typography>
                          <Typography variant="body1" sx={{ fontWeight: 600 }}>
                            {taskData.dueDate.toLocaleDateString()}
                          </Typography>
                        </Grid>
                      </Grid>
                    </CardContent>
                  </Card>

                  {taskData.checklist.length > 0 && (
                    <Card sx={{ mt: 3 }}>
                      <CardContent>
                        <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
                          Checklist Items
                        </Typography>
                        {taskData.checklist.map((item) => (
                          <Box
                            key={item.id}
                            sx={{
                              display: 'flex',
                              alignItems: 'center',
                              gap: 1,
                              p: 1,
                              border: 1,
                              borderColor: 'divider',
                              borderRadius: 1,
                              mb: 1,
                            }}
                          >
                            <input
                              type="checkbox"
                              checked={item.completed}
                              readOnly
                              style={{ marginRight: 8 }}
                            />
                            <Typography
                              variant="body2"
                              sx={{
                                textDecoration: item.completed ? 'line-through' : 'none',
                                color: item.completed ? 'text.secondary' : 'text.primary',
                              }}
                            >
                              {item.text}
                            </Typography>
                          </Box>
                        ))}
                      </CardContent>
                    </Card>
                  )}
                </Grid>

                <Grid item xs={12} md={4}>
                  <Card>
                    <CardContent>
                      <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
                        Assigned Team
                      </Typography>
                      
                      {assignedEmployees.length > 0 ? (
                        <AvatarGroup max={4} sx={{ justifyContent: 'flex-start', mb: 2 }}>
                          {assignedEmployees.map((employee) => (
                            <Avatar
                              key={employee.id}
                              src={employee.avatar}
                              alt={employee.name}
                              sx={{ width: 40, height: 40 }}
                            >
                              {employee.name.charAt(0)}
                            </Avatar>
                          ))}
                        </AvatarGroup>
                      ) : (
                        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                          No team members assigned
                        </Typography>
                      )}

                      <Divider sx={{ my: 2 }} />

                      <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                        Task Summary
                      </Typography>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                        <Typography variant="body2">Team Members:</Typography>
                        <Typography variant="body2" sx={{ fontWeight: 600 }}>
                          {assignedEmployees.length}
                        </Typography>
                      </Box>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                        <Typography variant="body2">Checklist Items:</Typography>
                        <Typography variant="body2" sx={{ fontWeight: 600 }}>
                          {taskData.checklist.length}
                        </Typography>
                      </Box>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                        <Typography variant="body2">Duration:</Typography>
                        <Typography variant="body2" sx={{ fontWeight: 600 }}>
                          {Math.ceil((taskData.dueDate - taskData.startDate) / (1000 * 60 * 60 * 24))} days
                        </Typography>
                      </Box>
                    </CardContent>
                  </Card>
                </Grid>
              </Grid>
            </Box>
          </Fade>
        );

      default:
        return 'Unknown step';
    }
  };

  const isStepValid = (step) => {
    switch (step) {
      case 0:
        return taskData.title.trim() !== '' && taskData.category !== '';
      case 1:
        return taskData.assignedTo.length > 0;
      case 2:
        return true;
      default:
        return false;
    }
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Box>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
          <Typography variant="h4" sx={{ fontWeight: 700 }}>
            Create New Task
          </Typography>
          <Button
            startIcon={<Save />}
            variant="outlined"
            onClick={() => {/* Save as draft functionality */}}
          >
            Save Draft
          </Button>
        </Box>

        <Stepper activeStep={activeStep} sx={{ mb: 4 }}>
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>

        <Paper sx={{ p: 3, mb: 3 }}>
          {getStepContent(activeStep)}
        </Paper>

        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Button
            disabled={activeStep === 0}
            onClick={handleBack}
            variant="outlined"
          >
            Back
          </Button>
          <Button
            variant="contained"
            onClick={activeStep === steps.length - 1 ? handleCreateTask : handleNext}
            disabled={!isStepValid(activeStep)}
            endIcon={activeStep === steps.length - 1 ? <Save /> : <Add />}
          >
            {activeStep === steps.length - 1 ? 'Create Task' : 'Next'}
          </Button>
        </Box>

        {/* Success Dialog */}
        <Dialog open={openSuccess} onClose={() => setOpenSuccess(false)} maxWidth="sm" fullWidth>
          <DialogTitle>
            <Typography variant="h6" sx={{ fontWeight: 600, color: 'success.main' }}>
              Task Created Successfully!
            </Typography>
          </DialogTitle>
          <DialogContent>
            <Typography variant="body1">
              The task "{taskData.title}" has been created and assigned to {taskData.assignedTo.length} team member(s).
            </Typography>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setOpenSuccess(false)}>Close</Button>
            <Button variant="contained" onClick={() => {
              setOpenSuccess(false);
              // Navigate to tasks list or create another task
            }}>
              View Tasks
            </Button>
          </DialogActions>
        </Dialog>

        <Zoom in={activeStep === steps.length - 1 && isStepValid(activeStep)}>
          <Fab
            color="secondary"
            sx={{ position: 'fixed', bottom: 24, right: 24 }}
            onClick={handleCreateTask}
          >
            <Save />
          </Fab>
        </Zoom>
      </Box>
    </LocalizationProvider>
  );
};

export default CreateTask;