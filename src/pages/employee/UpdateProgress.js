import React, { useState, useEffect } from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Grid,
  LinearProgress,
  Chip,
  Button,
  TextField,
  Slider,
  Avatar,
  Paper,
  Fab,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Tabs,
  Tab,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  IconButton,
  Fade,
  Zoom,
} from '@mui/material';
import {
  Add,
  Update,
  PhotoCamera,
  Description,
  CheckCircle,
  Schedule,
  Warning,
  CalendarToday,
  AccessTime,
  AttachFile,
} from '@mui/icons-material';
import { getDummyData, updateDummyData } from '../../data/DummyData';
import { STORAGE_KEYS } from '../../utils/LocalStorage';
import { auth } from '../../utils/Auth';

const TabPanel = ({ children, value, index, ...other }) => (
  <div hidden={value !== index} {...other}>
    {value === index && <Box sx={{ p: 0 }}>{children}</Box>}
  </div>
);

export const UpdateProgress = () => {
  const [tabValue, setTabValue] = useState(0);
  const [openUpdate, setOpenUpdate] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);
  const [progressData, setProgressData] = useState({
    progress: 0,
    hoursWorked: 0,
    status: 'in-progress',
    notes: '',
    challenges: '',
    nextSteps: '',
    attachments: [],
  });
  const [tasks, setTasks] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const user = auth.getCurrentUser();
    setCurrentUser(user);
    
    const allTasks = getDummyData(STORAGE_KEYS.TASKS);
    const userTasks = allTasks.filter(task => task.assignedTo === user?.id);
    setTasks(userTasks);
  }, []);

  const handleOpenUpdate = (task) => {
    setSelectedTask(task);
    setProgressData({
      progress: task.progress,
      hoursWorked: task.actualHours || 0,
      status: task.status,
      notes: '',
      challenges: '',
      nextSteps: '',
      attachments: [],
    });
    setOpenUpdate(true);
  };

  const handleSaveProgress = () => {
    if (selectedTask) {
      const tasksData = getDummyData(STORAGE_KEYS.TASKS);
      const updatedTasks = tasksData.map(task =>
        task.id === selectedTask.id
          ? {
              ...task,
              progress: progressData.progress,
              actualHours: (task.actualHours || 0) + progressData.hoursWorked,
              status: progressData.progress === 100 ? 'completed' : progressData.status,
              lastUpdated: new Date().toISOString(),
              updates: [
                ...(task.updates || []),
                {
                  id: Date.now().toString(),
                  date: new Date().toISOString(),
                  progress: progressData.progress,
                  hours: progressData.hoursWorked,
                  notes: progressData.notes,
                  challenges: progressData.challenges,
                  nextSteps: progressData.nextSteps,
                }
              ]
            }
          : task
      );
      
      updateDummyData(STORAGE_KEYS.TASKS, updatedTasks);
      setTasks(updatedTasks.filter(t => t.assignedTo === currentUser?.id));
      setOpenUpdate(false);
    }
  };

  const getProgressColor = (progress) => {
    if (progress === 100) return 'success';
    if (progress >= 75) return 'info';
    if (progress >= 50) return 'primary';
    if (progress >= 25) return 'warning';
    return 'error';
  };

  const ProgressCard = ({ task }) => (
    <Zoom in={true}>
      <Card 
        sx={{ 
          mb: 2,
          transition: 'all 0.3s ease',
          '&:hover': { 
            transform: 'translateY(-2px)',
            boxShadow: 4
          }
        }}
      >
        <CardContent>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
            <Box sx={{ flexGrow: 1 }}>
              <Typography variant="h6" sx={{ fontWeight: 600 }}>
                {task.title}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {task.description}
              </Typography>
            </Box>
            <Chip
              label={task.status}
              color={
                task.status === 'completed' ? 'success' :
                task.status === 'in-progress' ? 'primary' : 'default'
              }
              size="small"
            />
          </Box>

          <Box sx={{ mb: 2 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
              <Typography variant="body2">Current Progress</Typography>
              <Typography variant="body2" sx={{ fontWeight: 600 }}>
                {task.progress}%
              </Typography>
            </Box>
            <LinearProgress
              variant="determinate"
              value={task.progress}
              sx={{ height: 8, borderRadius: 4 }}
              color={getProgressColor(task.progress)}
            />
          </Box>

          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 1, mb: 2 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <CalendarToday sx={{ fontSize: 16, color: 'text.secondary' }} />
              <Typography variant="body2" color="text.secondary">
                Due: {new Date(task.dueDate).toLocaleDateString()}
              </Typography>
            </Box>

            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <AccessTime sx={{ fontSize: 16, color: 'text.secondary' }} />
              <Typography variant="body2" color="text.secondary">
                {task.actualHours || 0}h / {task.estimatedHours}h
              </Typography>
            </Box>
          </Box>

          <Button
            variant="contained"
            fullWidth
            startIcon={<Update />}
            onClick={() => handleOpenUpdate(task)}
          >
            Update Progress
          </Button>

          {task.updates && task.updates.length > 0 && (
            <Box sx={{ mt: 2 }}>
              <Typography variant="caption" color="text.secondary">
                Last update: {new Date(task.updates[task.updates.length - 1].date).toLocaleDateString()}
              </Typography>
            </Box>
          )}
        </CardContent>
      </Card>
    </Zoom>
  );

  const RecentUpdates = () => {
    const allUpdates = tasks.flatMap(task => 
      (task.updates || []).map(update => ({ ...update, taskTitle: task.title }))
    ).sort((a, b) => new Date(b.date) - new Date(a.date)).slice(0, 5);

    return (
      <Card>
        <CardContent>
          <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
            Recent Updates
          </Typography>
          {allUpdates.length > 0 ? (
            <List dense>
              {allUpdates.map((update, index) => (
                <ListItem key={update.id} sx={{ borderBottom: index < allUpdates.length - 1 ? 1 : 0, borderColor: 'divider', py: 1.5 }}>
                  <ListItemIcon>
                    <Update sx={{ color: 'primary.main' }} />
                  </ListItemIcon>
                  <ListItemText
                    primary={
                      <Box>
                        <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
                          {update.taskTitle}
                        </Typography>
                        <Typography variant="body2">
                          Progress: {update.progress}% • Hours: {update.hours}h
                        </Typography>
                      </Box>
                    }
                    secondary={
                      <Typography variant="caption" color="text.secondary">
                        {new Date(update.date).toLocaleString()}
                      </Typography>
                    }
                  />
                </ListItem>
              ))}
            </List>
          ) : (
            <Typography variant="body2" color="text.secondary" sx={{ textAlign: 'center', py: 2 }}>
              No recent updates
            </Typography>
          )}
        </CardContent>
      </Card>
    );
  };

  const filteredTasks = {
    0: tasks, // All
    1: tasks.filter(t => t.status === 'pending' || t.status === 'in-progress'),
    2: tasks.filter(t => t.status === 'completed'),
  };

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
        <Typography variant="h4" sx={{ fontWeight: 700 }}>
          Update Progress
        </Typography>
        <Button
          startIcon={<Description />}
          variant="outlined"
        >
          Progress Report
        </Button>
      </Box>

      <Grid container spacing={3}>
        <Grid item xs={12} md={8}>
          <Paper sx={{ mb: 3 }}>
            <Tabs value={tabValue} onChange={(e, newValue) => setTabValue(newValue)}>
              <Tab label={`All Tasks (${tasks.length})`} />
              <Tab label={`Active (${filteredTasks[1].length})`} />
              <Tab label={`Completed (${filteredTasks[2].length})`} />
            </Tabs>
          </Paper>

          {[0, 1, 2].map((index) => (
            <TabPanel key={index} value={tabValue} index={index}>
              {filteredTasks[index].length === 0 ? (
                <Card>
                  <CardContent sx={{ textAlign: 'center', py: 6 }}>
                    <Update sx={{ fontSize: 48, color: 'text.secondary', mb: 2 }} />
                    <Typography variant="h6" color="text.secondary">
                      No tasks to display
                    </Typography>
                  </CardContent>
                </Card>
              ) : (
                filteredTasks[index].map((task) => (
                  <ProgressCard key={task.id} task={task} />
                ))
              )}
            </TabPanel>
          ))}
        </Grid>

        <Grid item xs={12} md={4}>
          <RecentUpdates />
          
          {/* Quick Stats */}
          <Card sx={{ mt: 3 }}>
            <CardContent>
              <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
                Progress Overview
              </Typography>
              <Box sx={{ textAlign: 'center', mb: 2 }}>
                <Typography variant="h3" sx={{ fontWeight: 700, color: 'primary.main' }}>
                  {tasks.length > 0 ? Math.round(tasks.reduce((sum, task) => sum + task.progress, 0) / tasks.length) : 0}%
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Average Completion
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                <Typography variant="body2">Total Hours Logged</Typography>
                <Typography variant="body2" sx={{ fontWeight: 600 }}>
                  {tasks.reduce((sum, task) => sum + (task.actualHours || 0), 0)}h
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Typography variant="body2">Tasks Completed</Typography>
                <Typography variant="body2" sx={{ fontWeight: 600 }}>
                  {tasks.filter(t => t.status === 'completed').length}
                </Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Progress Update Dialog */}
      <Dialog 
        open={openUpdate} 
        onClose={() => setOpenUpdate(false)}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>
          <Typography variant="h6" sx={{ fontWeight: 600 }}>
            Update Task Progress
          </Typography>
        </DialogTitle>
        
        <DialogContent>
          {selectedTask && (
            <Fade in={openUpdate}>
              <Grid container spacing={3} sx={{ mt: 1 }}>
                <Grid item xs={12}>
                  <Typography variant="h6" gutterBottom>
                    {selectedTask.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Current Progress: {selectedTask.progress}%
                  </Typography>
                </Grid>

                <Grid item xs={12}>
                  <Typography gutterBottom>
                    Update Progress: {progressData.progress}%
                  </Typography>
                  <Slider
                    value={progressData.progress}
                    onChange={(e, newValue) => setProgressData({...progressData, progress: newValue})}
                    min={0}
                    max={100}
                    step={5}
                    valueLabelDisplay="auto"
                    valueLabelFormat={(value) => `${value}%`}
                    sx={{ mb: 2 }}
                  />
                </Grid>

                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Hours Worked"
                    type="number"
                    value={progressData.hoursWorked}
                    onChange={(e) => setProgressData({...progressData, hoursWorked: parseFloat(e.target.value)})}
                    InputProps={{ endAdornment: 'hours' }}
                  />
                </Grid>

                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth>
                    <InputLabel>Status</InputLabel>
                    <Select
                      value={progressData.status}
                      label="Status"
                      onChange={(e) => setProgressData({...progressData, status: e.target.value})}
                    >
                      <MenuItem value="in-progress">In Progress</MenuItem>
                      <MenuItem value="on-hold">On Hold</MenuItem>
                      <MenuItem value="completed">Completed</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>

                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    multiline
                    rows={2}
                    label="Work Completed"
                    value={progressData.notes}
                    onChange={(e) => setProgressData({...progressData, notes: e.target.value})}
                    placeholder="Describe what you've accomplished in this update..."
                  />
                </Grid>

                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    multiline
                    rows={2}
                    label="Challenges Faced"
                    value={progressData.challenges}
                    onChange={(e) => setProgressData({...progressData, challenges: e.target.value})}
                    placeholder="Describe any challenges or obstacles encountered..."
                  />
                </Grid>

                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    multiline
                    rows={2}
                    label="Next Steps"
                    value={progressData.nextSteps}
                    onChange={(e) => setProgressData({...progressData, nextSteps: e.target.value})}
                    placeholder="Outline the next steps and planned work..."
                  />
                </Grid>

                <Grid item xs={12}>
                  <Button startIcon={<AttachFile />} variant="outlined" component="label">
                    Attach Files
                    <input type="file" hidden multiple />
                  </Button>
                </Grid>
              </Grid>
            </Fade>
          )}
        </DialogContent>
        
        <DialogActions sx={{ p: 3 }}>
          <Button onClick={() => setOpenUpdate(false)}>
            Cancel
          </Button>
          <Button
            variant="contained"
            onClick={handleSaveProgress}
          >
            Save Progress Update
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};