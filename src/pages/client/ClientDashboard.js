// src/components/client/ClientDashboard.js
import React from 'react';
import {
  Box,
  Grid,
  Card,
  CardContent,
  Typography,
  Button,
  Chip,
  LinearProgress,
  List,
  ListItem,
  ListItemText,
  ListItemIcon
} from '@mui/material';
import {
  Description as DocumentIcon,
  Schedule as ScheduleIcon,
  CheckCircle as CompletedIcon,
  Pending as PendingIcon
} from '@mui/icons-material';
import { motion } from "framer-motion";
import DescriptionIcon from "@mui/icons-material/Description";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import RateReviewIcon from "@mui/icons-material/RateReview";
import BorderColorIcon from "@mui/icons-material/BorderColor";


const stats = [
  {
    title: "Active Documents",
    value: 3,
    icon: <DescriptionIcon sx={{ fontSize: 40, color: "#1565c0" }} />,
    gradient: "linear-gradient(135deg, #E3F2FD 0%, #BBDEFB 100%)",
  },
  {
    title: "Completed",
    value: 5,
    icon: <CheckCircleIcon sx={{ fontSize: 40, color: "#2e7d32" }} />,
    gradient: "linear-gradient(135deg, #E8F5E9 0%, #C8E6C9 100%)",
  },
  {
    title: "Under Review",
    value: 2,
    icon: <RateReviewIcon sx={{ fontSize: 40, color: "#f57c00" }} />,
    gradient: "linear-gradient(135deg, #FFF3E0 0%, #FFE0B2 100%)",
  },
  {
    title: "Awaiting Signature",
    value: 1,
    icon: <BorderColorIcon sx={{ fontSize: 40, color: "#6a1b9a" }} />,
    gradient: "linear-gradient(135deg, #F3E5F5 0%, #E1BEE7 100%)",
  },
];

const ClientDashboard = () => {
  const documents = [
    { name: 'Partnership Agreement with Dasion', status: 'under_review', date: '2024-01-15' },
    { name: 'Telemedicine Platform License', status: 'completed', date: '2024-01-10' },
    { name: 'Data Compliance Agreement', status: 'draft', date: '2024-01-08' }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed': return 'success';
      case 'under_review': return 'warning';
      case 'draft': return 'default';
      default: return 'default';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'completed': return <CompletedIcon color="success" />;
      case 'under_review': return <PendingIcon color="warning" />;
      default: return <PendingIcon />;
    }
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom sx={{ fontWeight: 600, mb: 4 }}>
        Client Dashboard
      </Typography>

      <Grid container spacing={3}>
        {/* Statistics */}
        <Grid container spacing={3}>
      {stats.map((stat, index) => (
        <Grid item xs={12} sm={6} md={3} key={index}>
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            whileHover={{ scale: 1.05, y: -4 }}
          >
            <Card
              sx={{
                height: 150,
                borderRadius: 4,
                background: stat.gradient,
                boxShadow: "0 6px 18px rgba(0,0,0,0.08)",
                transition: "all 0.3s ease",
                "&:hover": {
                  boxShadow: "0 12px 25px rgba(0,0,0,0.15)",
                },
              }}
            >
              <CardContent>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  <Box>
                    <Typography
                      variant="overline"
                      sx={{ color: "text.secondary", fontWeight: 600 }}
                    >
                      {stat.title}
                    </Typography>
                    <Typography
                      variant="h4"
                      sx={{
                        fontWeight: 700,
                        mt: 0.5,
                        color: "text.primary",
                      }}
                    >
                      {stat.value}
                    </Typography>
                  </Box>
                  {stat.icon}
                </Box>
              </CardContent>
            </Card>
          </motion.div>
        </Grid>
      ))}
    </Grid>

        {/* Recent Documents */}
        <Grid item xs={12} md={8}>
          <Card>
            <CardContent>
              <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
                <Typography variant="h5" sx={{ fontWeight: 600 }}>
                  Recent Documents
                </Typography>
                <Button variant="outlined">
                  View All
                </Button>
              </Box>

              <List>
                {documents.map((doc, index) => (
                  <ListItem key={index} divider={index < documents.length - 1}>
                    <ListItemIcon>
                      {getStatusIcon(doc.status)}
                    </ListItemIcon>
                    <ListItemText
                      primary={doc.name}
                      secondary={`Last updated: ${doc.date}`}
                    />
                    <Chip
                      label={doc.status.replace('_', ' ')}
                      color={getStatusColor(doc.status)}
                      size="small"
                    />
                  </ListItem>
                ))}
              </List>
            </CardContent>
          </Card>
        </Grid>

        {/* Quick Actions & Progress */}
        <Grid item xs={12} md={4}>
          <Card sx={{ mb: 3 }}>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Quick Actions
              </Typography>
              <Box sx={{ '& > *': { mb: 1 } }}>
                <Button variant="outlined" fullWidth startIcon={<DocumentIcon />}>
                  Request New Document
                </Button>
                <Button variant="outlined" fullWidth startIcon={<ScheduleIcon />}>
                  Schedule Consultation
                </Button>
              </Box>
            </CardContent>
          </Card>

          {/* Current Document Progress */}
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Current Progress
              </Typography>
              <Typography variant="body2" gutterBottom>
                Partnership Agreement with Dasion
              </Typography>
              <LinearProgress 
                variant="determinate" 
                value={65} 
                sx={{ height: 8, borderRadius: 4, my: 2 }}
              />
              <Typography variant="body2" color="textSecondary">
                65% Complete - Under Legal Review
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default ClientDashboard;