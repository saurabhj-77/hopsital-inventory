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
  Tabs,
  Tab,
  Fab,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Slider,
  Avatar,
  Paper,
  Fade,
  Zoom,
  IconButton,
  Menu,
  MenuItem,
} from '@mui/material';
import {
  Add,
  Update,
  Flag,
  CalendarToday,
  AccessTime,
  Person,
  MoreVert,
  FilterList,
  Sort,
} from '@mui/icons-material';
import { getDummyData, updateDummyData } from '../../data/DummyData';
import { STORAGE_KEYS } from '../../utils/LocalStorage';
import { auth } from '../../utils/Auth';

const TabPanel = ({ children, value, index, ...other }) => (
  <div hidden={value !== index} {...other}>
    {value === index && <Box sx={{ p: 0 }}>{children}</Box>}
  </div>
);

export const MyTasks = () => {
  const [tabValue, setTabValue] = useState(0);
  const [openUpdate, setOpenUpdate] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);
  const [progress, setProgress] = useState(0);
  const [notes, setNotes] = useState('');
  const [tasks, setTasks] = useState([]);
  const [filterAnchor, setFilterAnchor] = useState(null);
  const [sortAnchor, setSortAnchor] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const user = auth.getCurrentUser();
    setCurrentUser(user);
    
    const allTasks = getDummyData(STORAGE_KEYS.TASKS);
    const userTasks = allTasks.filter(task => task.assignedTo === user?.id);
    setTasks(userTasks);
  }, []);

  const handleUpdateProgress = (task) => {
    setSelectedTask(task);
    setProgress(task.progress);
    setNotes('');
    setOpenUpdate(true);
  };

  const saveProgressUpdate = () => {
    if (selectedTask) {
      const tasksData = getDummyData(STORAGE_KEYS.TASKS);
      const updatedTasks = tasksData.map(task =>
        task.id === selectedTask.id
          ? { 
              ...task, 
              progress: progress,
              status: progress === 100 ? 'completed' : progress > 0 ? 'in-progress' : 'pending',
              lastUpdated: new Date().toISOString()
            }
          : task
      );
      updateDummyData(STORAGE_KEYS.TASKS, updatedTasks);
      setTasks(updatedTasks.filter(t => t.assignedTo === currentUser?.id));
      setOpenUpdate(false);
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

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed': return 'success';
      case 'in-progress': return 'primary';
      case 'pending': return 'default';
      default: return 'default';
    }
  };

  const TaskCard = ({ task }) => (
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
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Chip
                label={task.priority}
                color={getPriorityColor(task.priority)}
                size="small"
              />
              <Chip
                label={task.status}
                color={getStatusColor(task.status)}
                size="small"
                variant="outlined"
              />
            </Box>
          </Box>

          <Box sx={{ mb: 2 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
              <Typography variant="body2">Progress</Typography>
              <Typography variant="body2" sx={{ fontWeight: 600 }}>
                {task.progress}%
              </Typography>
            </Box>
            <LinearProgress
              variant="determinate"
              value={task.progress}
              sx={{ height: 8, borderRadius: 4 }}
              color={task.progress === 100 ? 'success' : 'primary'}
            />
          </Box>

          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 1 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <CalendarToday sx={{ fontSize: 16, color: 'text.secondary' }} />
              <Typography variant="body2" color="text.secondary">
                Due: {new Date(task.dueDate).toLocaleDateString()}
              </Typography>
            </Box>

            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <AccessTime sx={{ fontSize: 16, color: 'text.secondary' }} />
              <Typography variant="body2" color="text.secondary">
                {task.estimatedHours}h estimated
              </Typography>
            </Box>

            <Box sx={{ display: 'flex', gap: 1 }}>
              <Button
                variant="outlined"
                size="small"
                startIcon={<Update />}
                onClick={() => handleUpdateProgress(task)}
              >
                Update
              </Button>
              <IconButton size="small">
                <MoreVert />
              </IconButton>
            </Box>
          </Box>

          {task.lastUpdated && (
            <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mt: 1 }}>
              Last updated: {new Date(task.lastUpdated).toLocaleDateString()}
            </Typography>
          )}
        </CardContent>
      </Card>
    </Zoom>
  );

  const filteredTasks = {
    0: tasks, // All
    1: tasks.filter(t => t.status === 'pending'),
    2: tasks.filter(t => t.status === 'in-progress'),
    3: tasks.filter(t => t.status === 'completed'),
  };

  const stats = {
    total: tasks.length,
    pending: filteredTasks[1].length,
    inProgress: filteredTasks[2].length,
    completed: filteredTasks[3].length,
  };

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
        <Typography variant="h4" sx={{ fontWeight: 700 }}>
          My Tasks
        </Typography>
        <Box sx={{ display: 'flex', gap: 1 }}>
          <Button
            startIcon={<FilterList />}
            variant="outlined"
            onClick={(e) => setFilterAnchor(e.currentTarget)}
          >
            Filter
          </Button>
          <Button
            startIcon={<Sort />}
            variant="outlined"
            onClick={(e) => setSortAnchor(e.currentTarget)}
          >
            Sort
          </Button>
        </Box>
      </Box>

      {/* Statistics Overview */}
      <Grid container spacing={2} sx={{ mb: 3 }}>
        <Grid item xs={12} sm={3}>
          <Card sx={{ textAlign: 'center', backgroundColor: 'primary.light', color: 'white' }}>
            <CardContent>
              <Typography variant="h4" sx={{ fontWeight: 700 }}>
                {stats.total}
              </Typography>
              <Typography variant="body2">Total Tasks</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={3}>
          <Card sx={{ textAlign: 'center', backgroundColor: 'warning.light', color: 'white' }}>
            <CardContent>
              <Typography variant="h4" sx={{ fontWeight: 700 }}>
                {stats.pending}
              </Typography>
              <Typography variant="body2">Pending</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={3}>
          <Card sx={{ textAlign: 'center', backgroundColor: 'info.light', color: 'white' }}>
            <CardContent>
              <Typography variant="h4" sx={{ fontWeight: 700 }}>
                {stats.inProgress}
              </Typography>
              <Typography variant="body2">In Progress</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={3}>
          <Card sx={{ textAlign: 'center', backgroundColor: 'success.light', color: 'white' }}>
            <CardContent>
              <Typography variant="h4" sx={{ fontWeight: 700 }}>
                {stats.completed}
              </Typography>
              <Typography variant="body2">Completed</Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Paper sx={{ mb: 3 }}>
        <Tabs
          value={tabValue}
          onChange={(e, newValue) => setTabValue(newValue)}
          sx={{ borderBottom: 1, borderColor: 'divider' }}
        >
          <Tab label={`All (${stats.total})`} />
          <Tab label={`Pending (${stats.pending})`} />
          <Tab label={`In Progress (${stats.inProgress})`} />
          <Tab label={`Completed (${stats.completed})`} />
        </Tabs>
      </Paper>

      {[0, 1, 2, 3].map((index) => (
        <TabPanel key={index} value={tabValue} index={index}>
          {filteredTasks[index].length === 0 ? (
            <Card>
              <CardContent sx={{ textAlign: 'center', py: 6 }}>
                <Typography variant="h6" color="text.secondary">
                  No tasks found
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {index === 0 ? 'You have no tasks assigned.' : 
                   index === 1 ? 'No pending tasks.' :
                   index === 2 ? 'No tasks in progress.' : 'No completed tasks.'}
                </Typography>
              </CardContent>
            </Card>
          ) : (
            filteredTasks[index].map((task) => (
              <TaskCard key={task.id} task={task} />
            ))
          )}
        </TabPanel>
      ))}

      {/* Progress Update Dialog */}
      <Dialog 
        open={openUpdate} 
        onClose={() => setOpenUpdate(false)}
        maxWidth="sm"
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
              <Box>
                <Typography variant="h6" gutterBottom>
                  {selectedTask.title}
                </Typography>
                
                <Typography variant="body2" color="text.secondary" gutterBottom>
                  Current Progress: {selectedTask.progress}%
                </Typography>
                
                <Box sx={{ mt: 3, mb: 2 }}>
                  <Typography gutterBottom>
                    Update Progress: {progress}%
                  </Typography>
                  <Slider
                    value={progress}
                    onChange={(e, newValue) => setProgress(newValue)}
                    min={0}
                    max={100}
                    step={5}
                    valueLabelDisplay="auto"
                    valueLabelFormat={(value) => `${value}%`}
                  />
                </Box>
                
                <TextField
                  fullWidth
                  multiline
                  rows={3}
                  label="Progress Notes"
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Describe what you've completed, any challenges faced, and next steps..."
                  sx={{ mt: 2 }}
                />
              </Box>
            </Fade>
          )}
        </DialogContent>
        
        <DialogActions sx={{ p: 3 }}>
          <Button onClick={() => setOpenUpdate(false)}>
            Cancel
          </Button>
          <Button
            variant="contained"
            onClick={saveProgressUpdate}
          >
            Save Progress
          </Button>
        </DialogActions>
      </Dialog>

      {/* Filter Menu */}
      <Menu
        anchorEl={filterAnchor}
        open={Boolean(filterAnchor)}
        onClose={() => setFilterAnchor(null)}
      >
        <MenuItem>All Priorities</MenuItem>
        <MenuItem>High Priority</MenuItem>
        <MenuItem>Medium Priority</MenuItem>
        <MenuItem>Low Priority</MenuItem>
        <MenuItem>Overdue Tasks</MenuItem>
      </Menu>

      {/* Sort Menu */}
      <Menu
        anchorEl={sortAnchor}
        open={Boolean(sortAnchor)}
        onClose={() => setSortAnchor(null)}
      >
        <MenuItem>Due Date (Earliest First)</MenuItem>
        <MenuItem>Due Date (Latest First)</MenuItem>
        <MenuItem>Priority (High to Low)</MenuItem>
        <MenuItem>Priority (Low to High)</MenuItem>
        <MenuItem>Recently Updated</MenuItem>
      </Menu>

      <Zoom in={true}>
        <Fab
          color="primary"
          sx={{ position: 'fixed', bottom: 24, right: 24 }}
          onClick={() => {/* Add quick task or other action */}}
        >
          <Add />
        </Fab>
      </Zoom>
    </Box>
  );
};