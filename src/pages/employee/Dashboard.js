// import React from 'react';
// import {
//   Box,
//   Grid,
//   Card,
//   CardContent,
//   Typography,
//   LinearProgress,
//   Chip,
//   Button,
// } from '@mui/material';
// import {
//   Assignment,
//   Schedule,
//   CheckCircle,
//   TrendingUp,
// } from '@mui/icons-material';
// import { getDummyData } from '../../data/DummyData';
// import { STORAGE_KEYS } from '../../utils/LocalStorage';
// import { auth } from '../../utils/Auth';

// export const EmployeeDashboard = () => {
//   const currentUser = auth.getCurrentUser();
//   const tasks = getDummyData(STORAGE_KEYS.TASKS).filter(
//     task => task.assignedTo === currentUser?.id
//   );

//   const stats = {
//     totalTasks: tasks.length,
//     completedTasks: tasks.filter(t => t.status === 'completed').length,
//     inProgressTasks: tasks.filter(t => t.status === 'in-progress').length,
//     pendingTasks: tasks.filter(t => t.status === 'pending').length,
//   };

//   const StatCard = ({ title, value, subtitle, icon, color = 'primary' }) => (
//     <Card sx={{ height: '100%' }}>
//       <CardContent>
//         <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
//           <Box>
//             <Typography variant="h4" component="div" sx={{ fontWeight: 600, color: `${color}.main` }}>
//               {value}
//             </Typography>
//             <Typography variant="h6" sx={{ mb: 1 }}>
//               {title}
//             </Typography>
//             <Typography variant="body2" color="text.secondary">
//               {subtitle}
//             </Typography>
//           </Box>
//           <Box sx={{ color: `${color}.main` }}>
//             {icon}
//           </Box>
//         </Box>
//       </CardContent>
//     </Card>
//   );

//   return (
//     <Box>
//       <Typography variant="h4" gutterBottom sx={{ fontWeight: 600, mb: 4 }}>
//         My Work Dashboard
//       </Typography>

//       <Grid container spacing={3} sx={{ mb: 4 }}>
//         <Grid item xs={12} sm={6} md={3}>
//           <StatCard
//             title="Total Tasks"
//             value={stats.totalTasks}
//             subtitle="Assigned to me"
//             icon={<Assignment sx={{ fontSize: 40 }} />}
//           />
//         </Grid>
//         <Grid item xs={12} sm={6} md={3}>
//           <StatCard
//             title="Completed"
//             value={stats.completedTasks}
//             subtitle="Tasks done"
//             icon={<CheckCircle sx={{ fontSize: 40 }} />}
//             color="success"
//           />
//         </Grid>
//         <Grid item xs={12} sm={6} md={3}>
//           <StatCard
//             title="In Progress"
//             value={stats.inProgressTasks}
//             subtitle="Working on"
//             icon={<TrendingUp sx={{ fontSize: 40 }} />}
//             color="secondary"
//           />
//         </Grid>
//         <Grid item xs={12} sm={6} md={3}>
//           <StatCard
//             title="Pending"
//             value={stats.pendingTasks}
//             subtitle="To be started"
//             icon={<Schedule sx={{ fontSize: 40 }} />}
//             color="warning"
//           />
//         </Grid>
//       </Grid>

//       <Typography variant="h5" gutterBottom sx={{ fontWeight: 600, mb: 3 }}>
//         My Current Tasks
//       </Typography>

//       <Grid container spacing={3}>
//         {tasks.map((task) => (
//           <Grid item xs={12} md={6} key={task.id}>
//             <Card>
//               <CardContent>
//                 <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', mb: 2 }}>
//                   <Typography variant="h6" sx={{ fontWeight: 600 }}>
//                     {task.title}
//                   </Typography>
//                   <Chip
//                     label={task.status}
//                     color={
//                       task.status === 'completed' ? 'success' :
//                       task.status === 'in-progress' ? 'primary' : 'default'
//                     }
//                     size="small"
//                   />
//                 </Box>
                
//                 <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
//                   {task.description}
//                 </Typography>
                
//                 <Box sx={{ mb: 2 }}>
//                   <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
//                     <Typography variant="body2">Progress</Typography>
//                     <Typography variant="body2" sx={{ fontWeight: 600 }}>
//                       {task.progress}%
//                     </Typography>
//                   </Box>
//                   <LinearProgress
//                     variant="determinate"
//                     value={task.progress}
//                     sx={{ height: 8, borderRadius: 4 }}
//                   />
//                 </Box>
                
//                 <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
//                   <Typography variant="body2">
//                     Due: {new Date(task.dueDate).toLocaleDateString()}
//                   </Typography>
//                   <Button variant="outlined" size="small">
//                     Update Progress
//                   </Button>
//                 </Box>
//               </CardContent>
//             </Card>
//           </Grid>
//         ))}
//       </Grid>
//     </Box>
//   );
// };



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
  Avatar,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Paper,
  Fab,
  Zoom,
  Fade,
} from '@mui/material';
import {
  Assignment,
  Schedule,
  CheckCircle,
  TrendingUp,
  Warning,
  Notifications,
  CalendarToday,
  AccessTime,
} from '@mui/icons-material';
import { getDummyData,  } from '../../data/DummyData';
import { STORAGE_KEYS } from '../../utils/LocalStorage';
import { auth } from '../../utils/Auth';

export const EmployeeDashboard = () => {
  const [tasks, setTasks] = useState([]);
  const [upcomingDeadlines, setUpcomingDeadlines] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const user = auth.getCurrentUser();
    setCurrentUser(user);

    const allTasks = getDummyData(STORAGE_KEYS.TASKS);
    const userTasks = allTasks.filter(task => task.assignedTo === user?.id);
    setTasks(userTasks);

    // Get upcoming deadlines (within 3 days)
    const today = new Date();
    const threeDaysFromNow = new Date(today.getTime() + 3 * 24 * 60 * 60 * 1000);
    const deadlines = userTasks.filter(task => {
      const dueDate = new Date(task.dueDate);
      return dueDate <= threeDaysFromNow && dueDate >= today && task.status !== 'completed';
    });
    setUpcomingDeadlines(deadlines);
  }, []);

  const stats = {
    totalTasks: tasks.length,
    completedTasks: tasks.filter(t => t.status === 'completed').length,
    inProgressTasks: tasks.filter(t => t.status === 'in-progress').length,
    pendingTasks: tasks.filter(t => t.status === 'pending').length,
    overdueTasks: tasks.filter(t => new Date(t.dueDate) < new Date() && t.status !== 'completed').length,
  };

  const completionRate = stats.totalTasks > 0 ? (stats.completedTasks / stats.totalTasks) * 100 : 0;

  const StatCard = ({ title, value, subtitle, icon, color = 'primary', progress }) => (
    <Card sx={{ height: '100%', transition: 'all 0.3s ease', '&:hover': { transform: 'translateY(-4px)', boxShadow: 4 } }}>
      <CardContent>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Box>
            <Typography variant="h4" component="div" sx={{ fontWeight: 600, color: `${color}.main` }}>
              {value}
            </Typography>
            <Typography variant="h6" sx={{ mb: 1 }}>
              {title}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {subtitle}
            </Typography>
          </Box>
          <Box sx={{ color: `${color}.main` }}>
            {icon}
          </Box>
        </Box>
        {progress !== undefined && (
          <LinearProgress
            variant="determinate"
            value={progress}
            color={color}
            sx={{ mt: 2, height: 6, borderRadius: 3 }}
          />
        )}
      </CardContent>
    </Card>
  );

  const TaskCard = ({ task }) => (
    <Fade in={true}>
      <Card sx={{ mb: 2, transition: 'all 0.3s ease', '&:hover': { transform: 'translateY(-2px)', boxShadow: 3 } }}>
        <CardContent>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
            <Typography variant="h6" sx={{ fontWeight: 600, flexGrow: 1 }}>
              {task.title}
            </Typography>
            <Chip
              label={task.status}
              color={
                task.status === 'completed' ? 'success' :
                task.status === 'in-progress' ? 'primary' : 'default'
              }
              size="small"
            />
          </Box>
          
          <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
            {task.description}
          </Typography>
          
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
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
              <CalendarToday sx={{ fontSize: 16, color: 'text.secondary' }} />
              <Typography variant="body2" color="text.secondary">
                Due: {new Date(task.dueDate).toLocaleDateString()}
              </Typography>
            </Box>

            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
              <AccessTime sx={{ fontSize: 16, color: 'text.secondary' }} />
              <Typography variant="body2" color="text.secondary">
                {task.estimatedHours}h
              </Typography>
            </Box>

            <Button variant="outlined" size="small">
              Update Progress
            </Button>
          </Box>
        </CardContent>
      </Card>
    </Fade>
  );

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
        <Box>
          <Typography variant="h4" sx={{ fontWeight: 700 }}>
            Welcome back, {currentUser?.name}!
          </Typography>
          <Typography variant="h6" color="text.secondary">
            Here's your work overview for today
          </Typography>
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <Chip
            icon={<Notifications />}
            label="2 New Notifications"
            color="primary"
            variant="outlined"
          />
          <Avatar src={currentUser?.avatar} sx={{ width: 48, height: 48 }}>
            {currentUser?.name?.charAt(0)}
          </Avatar>
        </Box>
      </Box>

      {/* Statistics Cards */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="Total Tasks"
            value={stats.totalTasks}
            subtitle="Assigned to you"
            icon={<Assignment sx={{ fontSize: 40 }} />}
            progress={(stats.totalTasks / Math.max(stats.totalTasks, 1)) * 100}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="Completed"
            value={stats.completedTasks}
            subtitle="Tasks done"
            icon={<CheckCircle sx={{ fontSize: 40 }} />}
            color="success"
            progress={completionRate}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="In Progress"
            value={stats.inProgressTasks}
            subtitle="Working on"
            icon={<TrendingUp sx={{ fontSize: 40 }} />}
            color="secondary"
            progress={(stats.inProgressTasks / Math.max(stats.totalTasks, 1)) * 100}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="Overdue"
            value={stats.overdueTasks}
            subtitle="Need attention"
            icon={<Warning sx={{ fontSize: 40 }} />}
            color="warning"
            progress={(stats.overdueTasks / Math.max(stats.totalTasks, 1)) * 100}
          />
        </Grid>
      </Grid>

      <Grid container spacing={3}>
        {/* Current Tasks */}
        <Grid item xs={12} md={8}>
          <Typography variant="h5" gutterBottom sx={{ fontWeight: 600, mb: 3 }}>
            My Current Tasks
          </Typography>
          
          {tasks.slice(0, 3).map((task) => (
            <TaskCard key={task.id} task={task} />
          ))}
          
          {tasks.length === 0 && (
            <Card>
              <CardContent sx={{ textAlign: 'center', py: 6 }}>
                <Assignment sx={{ fontSize: 48, color: 'text.secondary', mb: 2 }} />
                <Typography variant="h6" color="text.secondary">
                  No tasks assigned yet
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  You'll see your assigned tasks here once they're created.
                </Typography>
              </CardContent>
            </Card>
          )}
        </Grid>

        {/* Sidebar */}
        <Grid item xs={12} md={4}>
          {/* Upcoming Deadlines */}
          <Card sx={{ mb: 3 }}>
            <CardContent>
              <Typography variant="h6" gutterBottom sx={{ fontWeight: 600, display: 'flex', alignItems: 'center', gap: 1 }}>
                <Schedule />
                Upcoming Deadlines
              </Typography>
              
              {upcomingDeadlines.length > 0 ? (
                <List dense>
                  {upcomingDeadlines.map((task) => (
                    <ListItem key={task.id} sx={{ borderBottom: 1, borderColor: 'divider', py: 1.5 }}>
                      <ListItemIcon>
                        <Warning sx={{ color: 'warning.main' }} />
                      </ListItemIcon>
                      <ListItemText
                        primary={task.title}
                        secondary={`Due: ${new Date(task.dueDate).toLocaleDateString()}`}
                      />
                    </ListItem>
                  ))}
                </List>
              ) : (
                <Typography variant="body2" color="text.secondary" sx={{ textAlign: 'center', py: 2 }}>
                  No upcoming deadlines
                </Typography>
              )}
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
                Quick Actions
              </Typography>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                <Button variant="contained" fullWidth startIcon={<Assignment />}>
                  View All Tasks
                </Button>
                <Button variant="outlined" fullWidth startIcon={<TrendingUp />}>
                  Update Progress
                </Button>
                <Button variant="outlined" fullWidth startIcon={<AccessTime />}>
                  Log Hours
                </Button>
              </Box>
            </CardContent>
          </Card>

          {/* Performance Metrics */}
          <Card sx={{ mt: 3 }}>
            <CardContent>
              <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
                Performance
              </Typography>
              <Box sx={{ textAlign: 'center' }}>
                <Typography variant="h3" sx={{ fontWeight: 700, color: 'primary.main' }}>
                  {completionRate.toFixed(0)}%
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Task Completion Rate
                </Typography>
                <LinearProgress
                  variant="determinate"
                  value={completionRate}
                  color="primary"
                  sx={{ mt: 2, height: 8, borderRadius: 4 }}
                />
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Zoom in={true}>
        <Fab
          color="primary"
          sx={{ position: 'fixed', bottom: 24, right: 24 }}
          onClick={() => {/* Navigate to tasks */}}
        >
          <Assignment />
        </Fab>
      </Zoom>
    </Box>
  );
};