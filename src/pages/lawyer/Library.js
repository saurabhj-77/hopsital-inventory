// src/components/lawyer/Library.js
import React, { useState } from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Grid,
  TextField,
  Chip,
  Button,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Tabs,
  Tab,
  List,
  ListItem,
  ListItemText,
  ListItemIcon
} from '@mui/material';
import {
  Search as SearchIcon,
  Add as AddIcon,
  Description as DocumentIcon,
  Bookmark as BookmarkIcon,
  Share as ShareIcon,
  Download as DownloadIcon
} from '@mui/icons-material';

const Library = () => {
  const [selectedTab, setSelectedTab] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');
  const [openDialog, setOpenDialog] = useState(false);

  const templates = [
    {
      id: 1,
      title: 'Standard Partnership Agreement',
      category: 'Business',
      type: 'Template',
      lastUpdated: '2024-01-10',
      downloads: 45,
      tags: ['partnership', 'business', 'agreement']
    },
    {
      id: 2,
      title: 'Commercial Lease Agreement',
      category: 'Real Estate',
      type: 'Template',
      lastUpdated: '2024-01-08',
      downloads: 32,
      tags: ['lease', 'commercial', 'real-estate']
    },
    {
      id: 3,
      title: 'Employment Contract',
      category: 'Employment',
      type: 'Template',
      lastUpdated: '2024-01-05',
      downloads: 28,
      tags: ['employment', 'contract', 'hr']
    }
  ];

  const documents = [
    {
      id: 1,
      title: 'Dasion Partnership - Final',
      client: 'Medical Clinic LLC',
      type: 'Generated Document',
      date: '2024-01-15',
      status: 'approved'
    },
    {
      id: 2,
      title: 'Retail Corp Lease Agreement',
      client: 'Retail Corp',
      type: 'Generated Document',
      date: '2024-01-12',
      status: 'signed'
    }
  ];

  const categories = ['All', 'Business', 'Real Estate', 'Employment', 'Technology', 'Healthcare'];

  const TemplateCard = ({ template }) => (
    <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <CardContent sx={{ flex: 1 }}>
        <Box display="flex" justifyContent="space-between" alignItems="flex-start" mb={2}>
          <DocumentIcon color="primary" sx={{ fontSize: 40 }} />
          <Chip label={template.type} size="small" color="primary" variant="outlined" />
        </Box>
        
        <Typography variant="h6" gutterBottom>
          {template.title}
        </Typography>
        
        <Typography variant="body2" color="textSecondary" gutterBottom>
          Category: {template.category}
        </Typography>
        
        <Typography variant="caption" color="textSecondary" display="block" gutterBottom>
          Last updated: {template.lastUpdated} • {template.downloads} downloads
        </Typography>

        <Box sx={{ mt: 2 }}>
          {template.tags.map((tag, index) => (
            <Chip
              key={index}
              label={tag}
              size="small"
              sx={{ mr: 0.5, mb: 0.5 }}
              variant="outlined"
            />
          ))}
        </Box>
      </CardContent>
      
      <Box sx={{ p: 2, borderTop: 1, borderColor: 'divider' }}>
        <Button startIcon={<DownloadIcon />} size="small" sx={{ mr: 1 }}>
          Download
        </Button>
        <IconButton size="small">
          <BookmarkIcon />
        </IconButton>
        <IconButton size="small">
          <ShareIcon />
        </IconButton>
      </Box>
    </Card>
  );

  return (
    <Box sx={{ p: 3 }}>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={4}>
        <Typography variant="h4" sx={{ fontWeight: 600 }}>
          Document Library
        </Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => setOpenDialog(true)}
        >
          Upload Document
        </Button>
      </Box>

      {/* Search and Filter */}
      <Card sx={{ p: 2, mb: 3 }}>
        <Box display="flex" gap={2} alignItems="center">
          <TextField
            placeholder="Search documents, templates..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            InputProps={{
              startAdornment: <SearchIcon sx={{ color: 'text.secondary', mr: 1 }} />
            }}
            sx={{ flex: 1 }}
          />
          <Button variant="outlined">
            Filter
          </Button>
        </Box>
      </Card>

      {/* Categories */}
      <Box sx={{ mb: 3 }}>
        {categories.map((category) => (
          <Chip
            key={category}
            label={category}
            variant={category === 'All' ? 'filled' : 'outlined'}
            color={category === 'All' ? 'primary' : 'default'}
            sx={{ mr: 1, mb: 1 }}
            clickable
          />
        ))}
      </Box>

      {/* Tabs */}
      <Card sx={{ mb: 3 }}>
        <Tabs 
          value={selectedTab} 
          onChange={(e, newValue) => setSelectedTab(newValue)}
          sx={{ borderBottom: 1, borderColor: 'divider' }}
        >
          <Tab label="Templates" />
          <Tab label="My Documents" />
          <Tab label="Shared with Me" />
          <Tab label="Favorites" />
        </Tabs>
      </Card>

      {/* Content based on selected tab */}
      {selectedTab === 0 && (
        <Grid container spacing={3}>
          {templates.map((template) => (
            <Grid item xs={12} sm={6} md={4} key={template.id}>
              <TemplateCard template={template} />
            </Grid>
          ))}
        </Grid>
      )}

      {selectedTab === 1 && (
        <Card>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              Generated Documents
            </Typography>
            <List>
              {documents.map((doc) => (
                <ListItem key={doc.id} divider>
                  <ListItemIcon>
                    <DocumentIcon color="primary" />
                  </ListItemIcon>
                  <ListItemText
                    primary={doc.title}
                    secondary={`Client: ${doc.client} • ${doc.date} • ${doc.type}`}
                  />
                  <Chip 
                    label={doc.status} 
                    color={doc.status === 'approved' ? 'success' : 'primary'}
                    size="small"
                  />
                  <IconButton sx={{ ml: 1 }}>
                    <DownloadIcon />
                  </IconButton>
                </ListItem>
              ))}
            </List>
          </CardContent>
        </Card>
      )}

      {/* Upload Document Dialog */}
      <Dialog open={openDialog} onClose={() => setOpenDialog(false)} maxWidth="sm" fullWidth>
        <DialogTitle>Upload New Document</DialogTitle>
        <DialogContent>
          <Grid container spacing={2} sx={{ mt: 1 }}>
            <Grid item xs={12}>
              <TextField fullWidth label="Document Title" />
            </Grid>
            <Grid item xs={12}>
              <TextField fullWidth label="Description" multiline rows={3} />
            </Grid>
            <Grid item xs={12}>
              <Button variant="outlined" component="label" fullWidth>
                Choose File
                <input type="file" hidden />
              </Button>
            </Grid>
            <Grid item xs={12}>
              <TextField fullWidth label="Tags" placeholder="Separate tags with commas" />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)}>Cancel</Button>
          <Button variant="contained">Upload</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Library;