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
  Paper,
  Tabs,
  Tab,
  Avatar,
  AvatarGroup,
  IconButton,
  Fab,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Slider,
} from '@mui/material';
import {
  Add,
  PhotoCamera,
  Update,
  TrendingUp,
  Schedule,
  CheckCircle,
  Warning,
  CalendarToday,
} from '@mui/icons-material';
import { getDummyData, updateDummyData } from '../../data/DummyData';
import { STORAGE_KEYS } from '../../utils/LocalStorage';

const TabPanel = ({ children, value, index, ...other }) => (
  <div hidden={value !== index} {...other}>
    {value === index && <Box sx={{ p: 0 }}>{children}</Box>}
  </div>
);

const ProgressChart = ({ progress, size = 120, strokeWidth = 8 }) => {
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const offset = circumference - (progress / 100) * circumference;

  return (
    <Box sx={{ position: 'relative', display: 'inline-flex' }}>
      <svg width={size} height={size}>
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="#e0e0e0"
          strokeWidth={strokeWidth}
          fill="none"
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={progress === 100 ? '#4caf50' : '#2196f3'}
          strokeWidth={strokeWidth}
          fill="none"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          transform={`rotate(-90 ${size / 2} ${size / 2})`}
          style={{ transition: 'stroke-dashoffset 0.5s ease' }}
        />
      </svg>
      <Box
        sx={{
          top: 0,
          left: 0,
          bottom: 0,
          right: 0,
          position: 'absolute',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Typography variant="h6" component="div" sx={{ fontWeight: 600 }}>
          {progress}%
        </Typography>
      </Box>
    </Box>
  );
};

export const SiteProgress = () => {
  const [tabValue, setTabValue] = useState(0);
  const [openUpdate, setOpenUpdate] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);
  const [progressUpdate, setProgressUpdate] = useState({
    progress: 0,
    notes: '',
    images: [],
  });

  const projects = getDummyData(STORAGE_KEYS.PROJECTS);
  const tasks = getDummyData(STORAGE_KEYS.TASKS);

  useEffect(() => {
    // Initialize projects if empty
    if (projects.length === 0) {
      const initialProjects = [
        {
          id: '1',
          name: 'Commercial Tower A',
          location: 'Downtown District',
          client: 'ABC Developers',
          budget: 2500000,
          startDate: '2024-01-15',
          endDate: '2024-12-15',
          status: 'in-progress',
          progress: 45,
          managerId: '1',
          lastUpdated: '2024-02-20',
          milestones: [
            { name: 'Foundation', completed: true, date: '2024-02-15' },
            { name: 'Framing', completed: true, date: '2024-04-01' },
            { name: 'Electrical', completed: false, date: '2024-06-15' },
            { name: 'Finishing', completed: false, date: '2024-11-30' },
          ],
        },
        {
          id: '2',
          name: 'Residential Complex B',
          location: 'Northside Area',
          client: 'XYZ Builders',
          budget: 1800000,
          startDate: '2024-03-01',
          endDate: '2024-11-30',
          status: 'in-progress',
          progress: 25,
          managerId: '1',
          lastUpdated: '2024-02-18',
          milestones: [
            { name: 'Site Prep', completed: true, date: '2024-03-15' },
            { name: 'Foundation', completed: false, date: '2024-04-30' },
            { name: 'Framing', completed: false, date: '2024-07-15' },
            { name: 'Finishing', completed: false, date: '2024-10-31' },
          ],
        },
      ];
      updateDummyData(STORAGE_KEYS.PROJECTS, initialProjects);
    }
  }, []);

  const handleUpdateProgress = (project) => {
    setSelectedProject(project);
    setProgressUpdate({
      progress: project.progress,
      notes: '',
      images: [],
    });
    setOpenUpdate(true);
  };

  const saveProgressUpdate = () => {
    if (selectedProject) {
      const updatedProjects = projects.map(project =>
        project.id === selectedProject.id
          ? {
              ...project,
              progress: progressUpdate.progress,
              lastUpdated: new Date().toISOString(),
              status: progressUpdate.progress === 100 ? 'completed' : 'in-progress',
            }
          : project
      );
      updateDummyData(STORAGE_KEYS.PROJECTS, updatedProjects);
      setOpenUpdate(false);
    }
  };

  const getProjectHealth = (project) => {
    const today = new Date();
    const endDate = new Date(project.endDate);
    const totalDuration = endDate - new Date(project.startDate);
    const elapsedDuration = today - new Date(project.startDate);
    const expectedProgress = (elapsedDuration / totalDuration) * 100;

    if (project.progress >= expectedProgress) return 'good';
    if (project.progress >= expectedProgress - 10) return 'warning';
    return 'critical';
  };

  const ProjectCard = ({ project }) => {
    const health = getProjectHealth(project);
    const healthColors = {
      good: 'success',
      warning: 'warning',
      critical: 'error',
    };

    return (
      <Card sx={{ mb: 3, transition: 'all 0.3s ease', '&:hover': { transform: 'translateY(-2px)', boxShadow: 4 } }}>
        <CardContent>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
            <Box>
              <Typography variant="h6" sx={{ fontWeight: 600 }}>
                {project.name}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {project.client} • {project.location}
              </Typography>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Chip
                label={project.status}
                color={project.status === 'completed' ? 'success' : 'primary'}
                size="small"
              />
              <Chip
                label={health}
                color={healthColors[health]}
                variant="outlined"
                size="small"
              />
            </Box>
          </Box>

          <Grid container spacing={3} alignItems="center">
            <Grid item xs={12} md={3} sx={{ textAlign: 'center' }}>
              <ProgressChart progress={project.progress} />
            </Grid>

            <Grid item xs={12} md={6}>
              <Box sx={{ mb: 2 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                  <Typography variant="body2">Overall Progress</Typography>
                  <Typography variant="body2" sx={{ fontWeight: 600 }}>
                    {project.progress}%
                  </Typography>
                </Box>
                <LinearProgress
                  variant="determinate"
                  value={project.progress}
                  sx={{ height: 8, borderRadius: 4 }}
                  color={project.progress === 100 ? 'success' : 'primary'}
                />
              </Box>

              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 1 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                  <CalendarToday sx={{ fontSize: 16, color: 'text.secondary' }} />
                  <Typography variant="body2" color="text.secondary">
                    Due: {new Date(project.endDate).toLocaleDateString()}
                  </Typography>
                </Box>

                <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                  <Schedule sx={{ fontSize: 16, color: 'text.secondary' }} />
                  <Typography variant="body2" color="text.secondary">
                    Updated: {new Date(project.lastUpdated).toLocaleDateString()}
                  </Typography>
                </Box>
              </Box>
            </Grid>

            <Grid item xs={12} md={3} sx={{ textAlign: 'center' }}>
              <Button
                variant="contained"
                startIcon={<Update />}
                onClick={() => handleUpdateProgress(project)}
                fullWidth
              >
                Update
              </Button>
            </Grid>
          </Grid>

          {/* Milestones */}
          <Box sx={{ mt: 3 }}>
            <Typography variant="subtitle2" gutterBottom sx={{ fontWeight: 600 }}>
              Key Milestones
            </Typography>
            <Grid container spacing={1}>
              {project.milestones?.map((milestone, index) => (
                <Grid item xs={12} sm={6} key={index}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    {milestone.completed ? (
                      <CheckCircle sx={{ fontSize: 16, color: 'success.main' }} />
                    ) : (
                      <Warning sx={{ fontSize: 16, color: 'warning.main' }} />
                    )}
                    <Typography variant="body2" sx={{ flexGrow: 1 }}>
                      {milestone.name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {new Date(milestone.date).toLocaleDateString()}
                    </Typography>
                  </Box>
                </Grid>
              ))}
            </Grid>
          </Box>
        </CardContent>
      </Card>
    );
  };

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
        <Typography variant="h4" sx={{ fontWeight: 700 }}>
          Site Progress
        </Typography>
        <Box sx={{ display: 'flex', gap: 1 }}>
          <Button startIcon={<TrendingUp />} variant="outlined">
            Generate Report
          </Button>
        </Box>
      </Box>

      <Paper sx={{ mb: 3 }}>
        <Tabs value={tabValue} onChange={(e, newValue) => setTabValue(newValue)}>
          <Tab label={`All Projects (${projects.length})`} />
          <Tab label={`In Progress (${projects.filter(p => p.status === 'in-progress').length})`} />
          <Tab label={`Completed (${projects.filter(p => p.status === 'completed').length})`} />
          <Tab label={`Delayed (${projects.filter(p => getProjectHealth(p) === 'critical').length})`} />
        </Tabs>
      </Paper>

      <TabPanel value={tabValue} index={0}>
        {projects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </TabPanel>

      <TabPanel value={tabValue} index={1}>
        {projects.filter(p => p.status === 'in-progress').map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </TabPanel>

      <TabPanel value={tabValue} index={2}>
        {projects.filter(p => p.status === 'completed').map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </TabPanel>

      <TabPanel value={tabValue} index={3}>
        {projects.filter(p => getProjectHealth(p) === 'critical').map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </TabPanel>

      {/* Progress Update Dialog */}
      <Dialog open={openUpdate} onClose={() => setOpenUpdate(false)} maxWidth="sm" fullWidth>
        <DialogTitle>
          <Typography variant="h6" sx={{ fontWeight: 600 }}>
            Update Project Progress
          </Typography>
        </DialogTitle>
        
        <DialogContent>
          {selectedProject && (
            <Box>
              <Typography variant="h6" gutterBottom>
                {selectedProject.name}
              </Typography>
              
              <Box sx={{ mt: 3, mb: 2 }}>
                <Typography gutterBottom>
                  Current Progress: {progressUpdate.progress}%
                </Typography>
                <Slider
                  value={progressUpdate.progress}
                  onChange={(e, newValue) => setProgressUpdate({...progressUpdate, progress: newValue})}
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
                value={progressUpdate.notes}
                onChange={(e) => setProgressUpdate({...progressUpdate, notes: e.target.value})}
                placeholder="Describe the current progress, challenges, and next steps..."
                sx={{ mt: 2 }}
              />

              <Box sx={{ mt: 2 }}>
                <Button startIcon={<PhotoCamera />} variant="outlined" component="label">
                  Upload Site Photos
                  <input type="file" hidden accept="image/*" multiple />
                </Button>
              </Box>
            </Box>
          )}
        </DialogContent>
        
        <DialogActions sx={{ p: 3 }}>
          <Button onClick={() => setOpenUpdate(false)}>
            Cancel
          </Button>
          <Button variant="contained" onClick={saveProgressUpdate}>
            Save Progress
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};