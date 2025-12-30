// src/components/lawyer/Consultation.js
import React, { useState, useRef, useEffect } from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Button,
  Chip,
  Grid,
  TextField,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Stepper,
  Step,
  StepLabel,
  StepContent,
  Paper,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Divider,
  Alert,
  Badge,
  CircularProgress,
  Tab,
  Tabs
} from '@mui/material';
import {
  PlayArrow as StartIcon,
  Stop as StopIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Add as AddIcon,
  Mic as MicIcon,
  Send as SendIcon,
  CheckCircle as VerifyIcon,
  Description as TranscriptIcon,
  Email as EmailIcon,
  Schedule as ScheduleIcon,
  Person as PersonIcon,
  VideoCall as VideoIcon,
  Phone as PhoneIcon,
  ContentCopy as CopyIcon,
  Warning as WarningIcon
} from '@mui/icons-material';

// Real speech recognition implementation
const useSpeechRecognition = () => {
  const [transcript, setTranscript] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [isSupported, setIsSupported] = useState(true);
  const recognitionRef = useRef(null);

  useEffect(() => {
    // Check if browser supports speech recognition
    if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
      setIsSupported(false);
      return;
    }

    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    recognitionRef.current = new SpeechRecognition();

    recognitionRef.current.continuous = true;
    recognitionRef.current.interimResults = true;
    recognitionRef.current.lang = 'en-US';

    recognitionRef.current.onresult = (event) => {
      let interimTranscript = '';
      let finalTranscript = '';

      for (let i = event.resultIndex; i < event.results.length; i++) {
        const transcript = event.results[i][0].transcript;
        if (event.results[i].isFinal) {
          finalTranscript += transcript + ' ';
        } else {
          interimTranscript += transcript;
        }
      }

      setTranscript(prev => prev + finalTranscript + interimTranscript);
    };

    recognitionRef.current.onerror = (event) => {
      console.error('Speech recognition error:', event.error);
      if (event.error === 'not-allowed') {
        alert('Microphone access denied. Please allow microphone access to use speech recognition.');
      }
      setIsListening(false);
    };

    recognitionRef.current.onend = () => {
      if (isListening) {
        // Restart recognition if it ended unexpectedly but we're still listening
        recognitionRef.current.start();
      }
    };

    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
    };
  }, []);

  const startListening = () => {
    if (recognitionRef.current && isSupported) {
      setTranscript('');
      setIsListening(true);
      try {
        recognitionRef.current.start();
      } catch (error) {
        console.error('Error starting speech recognition:', error);
        setIsListening(false);
      }
    }
  };

  const stopListening = () => {
    if (recognitionRef.current) {
      setIsListening(false);
      recognitionRef.current.stop();
    }
  };

  return {
    transcript,
    isListening,
    isSupported,
    startListening,
    stopListening,
    setTranscript
  };
};

const Consultation = () => {
  const [consultations, setConsultations] = useState([
    {
      id: 1,
      client: 'Medical Clinic LLC',
      clientEmail: 'contact@medicalclinic.com',
      date: '2024-01-15',
      time: '10:00 AM',
      duration: '45 min',
      status: 'completed',
      type: 'Partnership Agreement',
      mode: 'video',
      recording: true,
      transcription: "Thank you for meeting with me today to discuss the partnership agreement. I understand you're looking to establish a telemedicine platform collaboration between Dasion and your medical clinic. Let's go over the key terms we need to include in the agreement.",
      verified: true,
      sentToClient: true
    },
    {
      id: 2,
      client: 'Retail Corp',
      clientEmail: 'legal@retailcorp.com',
      date: '2024-01-16',
      time: '2:30 PM',
      duration: '30 min',
      status: 'scheduled',
      type: 'Lease Agreement',
      mode: 'in_person',
      recording: false,
      transcription: "",
      verified: false,
      sentToClient: false
    }
  ]);

  const [activeTab, setActiveTab] = useState(0);
  const [openDialog, setOpenDialog] = useState(false);
  const [openSendDialog, setOpenSendDialog] = useState(false);
  const [recordingTime, setRecordingTime] = useState(0);
  const [selectedConsultation, setSelectedConsultation] = useState(null);
  const [activeStep, setActiveStep] = useState(0);
  const [newConsultation, setNewConsultation] = useState({
    client: '',
    date: '',
    time: '',
    type: '',
    mode: 'video',
    duration: '60',
    notes: ''
  });

  const {
    transcript,
    isListening,
    isSupported,
    startListening,
    stopListening,
    setTranscript
  } = useSpeechRecognition();

  const recordingTimerRef = useRef(null);

  const clients = [
    { name: 'Medical Clinic LLC', email: 'contact@medicalclinic.com', type: 'Healthcare' },
    { name: 'Retail Corp', email: 'legal@retailcorp.com', type: 'Retail' },
    { name: 'Tech Startup Inc', email: 'founder@techstartup.com', type: 'Technology' },
    { name: 'Manufacturing Co', email: 'ops@manufacturingco.com', type: 'Industrial' }
  ];

  const consultationTypes = [
    'Initial Consultation',
    'Document Review',
    'Contract Negotiation',
    'Follow-up Meeting',
    'Legal Advice Session',
    'Document Signing'
  ];

  const handleStartRecording = () => {
    if (!isSupported) {
      alert('Speech recognition is not supported in your browser. Please use Chrome, Edge, or Safari.');
      return;
    }
    
    startListening();
    setRecordingTime(0);
    
    // Start timer
    recordingTimerRef.current = setInterval(() => {
      setRecordingTime(prev => prev + 1);
    }, 2000);
  };

  const handleStopRecording = () => {
    stopListening();
    clearInterval(recordingTimerRef.current);
  };

  const handleVerifyTranscription = () => {
    if (selectedConsultation) {
      setConsultations(prev => prev.map(consultation =>
        consultation.id === selectedConsultation.id
          ? { ...consultation, transcription: transcript, verified: true }
          : consultation
      ));
    }
    setActiveStep(2);
  };

  const handleSendToClient = () => {
    if (selectedConsultation) {
      setConsultations(prev => prev.map(consultation =>
        consultation.id === selectedConsultation.id
          ? { ...consultation, sentToClient: true }
          : consultation
      ));
    }
    setOpenSendDialog(false);
    setActiveStep(0);
    setSelectedConsultation(null);
    setTranscript('');
  };

  const handleAddConsultation = () => {
    const newConsult = {
      id: consultations.length + 1,
      client: newConsultation.client,
      clientEmail: clients.find(c => c.name === newConsultation.client)?.email,
      date: newConsultation.date,
      time: newConsultation.time,
      duration: `${newConsultation.duration} min`,
      status: 'scheduled',
      type: newConsultation.type,
      mode: newConsultation.mode,
      recording: false,
      transcription: "",
      verified: false,
      sentToClient: false
    };
    
    setConsultations(prev => [...prev, newConsult]);
    setOpenDialog(false);
    setNewConsultation({ client: '', date: '', time: '', type: '', mode: 'video', duration: '60', notes: '' });
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const getModeIcon = (mode) => {
    switch (mode) {
      case 'video': return <VideoIcon />;
      case 'phone': return <PhoneIcon />;
      case 'in_person': return <PersonIcon />;
      default: return <VideoIcon />;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed': return 'success';
      case 'scheduled': return 'primary';
      case 'cancelled': return 'error';
      default: return 'default';
    }
  };

  const ConsultationCard = ({ consultation }) => (
    <Card sx={{ mb: 2 }}>
      <CardContent>
        <Box display="flex" justifyContent="space-between" alignItems="flex-start" mb={2}>
          <Box flex={1}>
            <Typography variant="h6" gutterBottom>
              {consultation.client}
            </Typography>
            <Box display="flex" alignItems="center" gap={2} flexWrap="wrap" mb={1}>
              <Box display="flex" alignItems="center">
                <ScheduleIcon sx={{ fontSize: 16, mr: 0.5, color: 'text.secondary' }} />
                <Typography variant="body2" color="textSecondary">
                  {consultation.date} at {consultation.time}
                </Typography>
              </Box>
              <Chip 
                icon={getModeIcon(consultation.mode)} 
                label={consultation.mode.replace('_', ' ')} 
                size="small" 
                variant="outlined" 
              />
              <Typography variant="body2" color="textSecondary">
                {consultation.duration}
              </Typography>
            </Box>
          </Box>
          <Chip
            label={consultation.status}
            color={getStatusColor(consultation.status)}
            size="small"
          />
        </Box>

        <Typography variant="body2" sx={{ mb: 2 }}>
          Type: {consultation.type}
        </Typography>

        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Box display="flex" gap={1}>
            {consultation.recording && (
              <Chip
                icon={<MicIcon />}
                label={consultation.verified ? "Verified" : "Recorded"}
                color={consultation.verified ? "success" : "default"}
                variant="outlined"
                size="small"
              />
            )}
            {consultation.sentToClient && (
              <Chip
                icon={<SendIcon />}
                label="Sent to Client"
                color="success"
                size="small"
              />
            )}
          </Box>
          
          <Box>
            {consultation.recording && !consultation.verified && (
              <Button
                size="small"
                startIcon={<VerifyIcon />}
                onClick={() => {
                  setSelectedConsultation(consultation);
                  setTranscript(consultation.transcription);
                  setActiveStep(1);
                }}
              >
                Verify Transcript
              </Button>
            )}
            <IconButton size="small">
              <EditIcon />
            </IconButton>
            <IconButton size="small">
              <DeleteIcon />
            </IconButton>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );

  const TranscriptionWorkflow = () => (
    <Card sx={{ mb: 3 }}>
      <CardContent>
        <Typography variant="h5" gutterBottom sx={{ fontWeight: 600 }}>
          Neural Script Dictation Tool
        </Typography>
        
        {!isSupported && (
          <Alert severity="warning" sx={{ mb: 2 }}>
            Speech recognition is not supported in your browser. Please use Chrome, Edge, or Safari for the best experience.
          </Alert>
        )}

        <Stepper activeStep={activeStep} sx={{ mb: 4 }}>
          <Step>
            <StepLabel>Record Consultation</StepLabel>
          </Step>
          <Step>
            <StepLabel>Verify Transcription</StepLabel>
          </Step>
          <Step>
            <StepLabel>Send to Client</StepLabel>
          </Step>
        </Stepper>

        {activeStep === 0 && (
          <Box>
            <Box sx={{ textAlign: 'center', py: 4 }}>
              <Badge
                badgeContent={isListening ? "LIVE" : null}
                color="error"
                overlap="circular"
                sx={{ mb: 3 }}
              >
                <MicIcon 
                  sx={{ 
                    fontSize: 64, 
                    color: isListening ? 'error.main' : 'primary.main',
                    animation: isListening ? 'pulse 1s infinite' : 'none'
                  }} 
                />
              </Badge>
              
              <Typography variant="h6" gutterBottom>
                {isListening ? 'Recording Live...' : 'Ready to Record'}
              </Typography>
              
              <Typography variant="body1" color="textSecondary" gutterBottom sx={{ mb: 3 }}>
                {isListening 
                  ? `Recording time: ${formatTime(recordingTime)} - Speak clearly into your microphone`
                  : 'Start recording to capture consultation details for AI document generation'
                }
              </Typography>

              {!isListening ? (
                <Button
                  variant="contained"
                  color="primary"
                  startIcon={<StartIcon />}
                  onClick={handleStartRecording}
                  size="large"
                  sx={{ minWidth: 200 }}
                  disabled={!isSupported}
                >
                  Start Recording
                </Button>
              ) : (
                <Button
                  variant="contained"
                  color="error"
                  startIcon={<StopIcon />}
                  onClick={handleStopRecording}
                  size="large"
                  sx={{ minWidth: 200 }}
                >
                  Stop Recording
                </Button>
              )}
            </Box>

            {/* Real-time Live Transcription Display */}
            <Box sx={{ mt: 3 }}>
              <Box display="flex" justifyContent="space-between" alignItems="center" mb={1}>
                <Typography variant="h6">
                  Live Transcription
                </Typography>
                {transcript && (
                  <Chip 
                    icon={<MicIcon />} 
                    label="Real-time Speech to Text" 
                    color="primary" 
                    variant="outlined" 
                    size="small" 
                  />
                )}
              </Box>
              
              <Paper 
                variant="outlined" 
                sx={{ 
                  p: 3, 
                  minHeight: 200, 
                  maxHeight: 400, 
                  overflow: 'auto',
                  backgroundColor: 'grey.50',
                  border: isListening ? '2px solid' : '1px solid',
                  borderColor: isListening ? 'primary.main' : 'divider'
                }}
              >
                {transcript ? (
                  <Typography 
                    variant="body1" 
                    style={{ 
                      whiteSpace: 'pre-wrap',
                      lineHeight: '1.6',
                      fontFamily: isListening ? 'inherit' : 'monospace'
                    }}
                  >
                    {transcript}
                    {isListening && (
                      <span style={{ 
                        animation: 'blink 1s infinite',
                        color: 'primary.main',
                        fontWeight: 'bold'
                      }}>
                        ▋
                      </span>
                    )}
                  </Typography>
                ) : (
                  <Box sx={{ textAlign: 'center', color: 'text.secondary' }}>
                    <MicIcon sx={{ fontSize: 48, mb: 2, opacity: 0.5 }} />
                    <Typography variant="body1" gutterBottom>
                      {isListening ? 'Listening... Start speaking now...' : 'No transcription yet'}
                    </Typography>
                    <Typography variant="body2">
                      {isListening 
                        ? 'Your speech will appear here in real-time as you talk'
                        : 'Click "Start Recording" and begin speaking to see live transcription'
                      }
                    </Typography>
                  </Box>
                )}
              </Paper>
              
              {transcript && (
                <Box sx={{ mt: 2, display: 'flex', gap: 1, alignItems: 'center', flexWrap: 'wrap' }}>
                  <Button
                    variant="contained"
                    onClick={() => setActiveStep(1)}
                    startIcon={<VerifyIcon />}
                    disabled={!transcript.trim()}
                  >
                    Verify & Continue
                  </Button>
                  <Button
                    variant="outlined"
                    startIcon={<CopyIcon />}
                    onClick={() => navigator.clipboard.writeText(transcript)}
                  >
                    Copy Text
                  </Button>
                  <Typography variant="body2" color="textSecondary" sx={{ ml: 'auto' }}>
                    {transcript.split(/\s+/).length} words • {transcript.length} characters
                  </Typography>
                </Box>
              )}

              {isListening && (
                <Alert severity="info" sx={{ mt: 2 }}>
                  <strong>Live Recording Active:</strong> Speak clearly into your microphone. Your words are being transcribed in real-time.
                </Alert>
              )}
            </Box>
          </Box>
        )}

        {activeStep === 1 && (
          <Box>
            <Typography variant="h6" gutterBottom>
              Verify Transcription
            </Typography>
            <Typography variant="body2" color="textSecondary" sx={{ mb: 3 }}>
              Review and edit the live transcription. Make any necessary corrections before sending to the client.
            </Typography>
            
            <TextField
              fullWidth
              multiline
              rows={12}
              value={transcript}
              onChange={(e) => setTranscript(e.target.value)}
              placeholder="Your live transcription will appear here..."
              sx={{ mb: 3 }}
              InputProps={{
                style: { 
                  fontFamily: 'monospace',
                  fontSize: '0.9rem',
                  lineHeight: '1.5'
                }
              }}
            />
            
            <Box display="flex" gap={2} alignItems="center" flexWrap="wrap">
              <Button
                variant="contained"
                startIcon={<VerifyIcon />}
                onClick={handleVerifyTranscription}
                disabled={!transcript.trim()}
              >
                Verify & Continue
              </Button>
              <Button
                variant="outlined"
                onClick={() => setActiveStep(0)}
              >
                Back to Recording
              </Button>
              <Button
                variant="outlined"
                startIcon={<CopyIcon />}
                onClick={() => navigator.clipboard.writeText(transcript)}
              >
                Copy Text
              </Button>
              <Typography variant="body2" color="textSecondary">
                {transcript.split(/\s+/).length} words • {transcript.length} characters
              </Typography>
            </Box>
          </Box>
        )}

        {activeStep === 2 && (
          <Box>
            <Typography variant="h6" gutterBottom>
              Send NeuroScript to Client
            </Typography>
            <Alert severity="success" sx={{ mb: 3 }}>
              Transcription verified! Ready to send NeuroScript to client.
            </Alert>
            
            <Paper variant="outlined" sx={{ p: 2, mb: 3, backgroundColor: 'success.light' }}>
              <Typography variant="body2" gutterBottom>
                <strong>NeuroScript Ready:</strong> Your live transcription has been processed and is ready for client review.
              </Typography>
              <Typography variant="caption" display="block">
                Final word count: {transcript.split(/\s+/).length} words
              </Typography>
            </Paper>
            
            <Box display="flex" gap={2}>
              <Button
                variant="contained"
                startIcon={<SendIcon />}
                onClick={() => setOpenSendDialog(true)}
                size="large"
              >
                Send NeuroScript to Client
              </Button>
              <Button
                variant="outlined"
                onClick={() => setActiveStep(1)}
              >
                Back to Editing
              </Button>
            </Box>
          </Box>
        )}
      </CardContent>
    </Card>
  );

  return (
    <Box sx={{ p: 3 }}>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={4}>
        <Typography variant="h3"  sx={{ 
                fontWeight: 900,
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                mb: 0.5,
              }}>
          Consultation Management
        </Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => setOpenDialog(true)}
          sx={{
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            fontWeight: 700,
            px: 3,
            py: 1.5,
            boxShadow: '0 8px 24px rgba(102, 126, 234, 0.4)',
            transition: 'all 0.3s ease',
            '&:hover': {
              transform: 'translateY(-2px)',
              boxShadow: '0 12px 32px rgba(102, 126, 234, 0.5)',
            }
          }}
        >
          Schedule Consultation
        </Button>
      </Box>

      {/* Tabs for different views */}
      <Card sx={{ mb: 3 }}>
        <Tabs 
          value={activeTab} 
          onChange={(e, newValue) => setActiveTab(newValue)}
          sx={{ borderBottom: 1, borderColor: 'divider' }}
        >
          <Tab label="NeuroScript Dictation" />
          <Tab label="Scheduled Consultations" />
          <Tab label="Completed Consultations" />
        </Tabs>
      </Card>

      {activeTab === 0 && <TranscriptionWorkflow />}

      {(activeTab === 1 || activeTab === 2) && (
        <Grid container spacing={3}>
          <Grid item xs={12} lg={8}>
            {consultations
              .filter(consultation => 
                activeTab === 1 ? consultation.status === 'scheduled' : consultation.status === 'completed'
              )
              .map((consultation) => (
                <ConsultationCard key={consultation.id} consultation={consultation} />
              ))}
          </Grid>

          <Grid item xs={12} lg={4}>
            {/* Quick Stats */}
            <Card sx={{ mb: 3 }}>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Consultation Stats
                </Typography>
                <List dense>
                  <ListItem>
                    <ListItemText primary="Total Scheduled" />
                    <Chip label={consultations.filter(c => c.status === 'scheduled').length} size="small" />
                  </ListItem>
                  <ListItem>
                    <ListItemText primary="Completed This Month" />
                    <Chip label={consultations.filter(c => c.status === 'completed').length} size="small" color="success" />
                  </ListItem>
                  <ListItem>
                    <ListItemText primary="Pending Transcription" />
                    <Chip label={consultations.filter(c => c.recording && !c.verified).length} size="small" color="warning" />
                  </ListItem>
                </List>
              </CardContent>
            </Card>

            {/* Recent NeuroScripts */}
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Recent NeuroScripts
                </Typography>
                <List dense>
                  {consultations
                    .filter(c => c.transcription && c.verified)
                    .slice(0, 3)
                    .map((consultation) => (
                      <ListItem key={consultation.id} divider>
                        <ListItemIcon>
                          <TranscriptIcon color="primary" />
                        </ListItemIcon>
                        <ListItemText
                          primary={consultation.client}
                          secondary={`${consultation.type} • ${consultation.date}`}
                        />
                        {consultation.sentToClient && (
                          <SendIcon color="success" fontSize="small" />
                        )}
                      </ListItem>
                    ))}
                </List>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      )}

      {/* Schedule Consultation Dialog */}
      <Dialog open={openDialog} onClose={() => setOpenDialog(false)} maxWidth="sm" fullWidth>
        <DialogTitle>Schedule New Consultation</DialogTitle>
        <DialogContent>
          <Grid container spacing={2} sx={{ mt: 1 }}>
            <Grid item xs={12}>
              <FormControl fullWidth>
                <InputLabel>Client</InputLabel>
                <Select
                  value={newConsultation.client}
                  label="Client"
                  onChange={(e) => setNewConsultation({ ...newConsultation, client: e.target.value })}
                >
                  {clients.map((client) => (
                    <MenuItem key={client.name} value={client.name}>
                      <Box>
                        <Typography>{client.name}</Typography>
                        <Typography variant="caption" color="textSecondary">
                          {client.type}
                        </Typography>
                      </Box>
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Date"
                type="date"
                value={newConsultation.date}
                onChange={(e) => setNewConsultation({ ...newConsultation, date: e.target.value })}
                InputLabelProps={{ shrink: true }}
              />
            </Grid>
            
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Time"
                type="time"
                value={newConsultation.time}
                onChange={(e) => setNewConsultation({ ...newConsultation, time: e.target.value })}
                InputLabelProps={{ shrink: true }}
              />
            </Grid>
            
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel>Consultation Type</InputLabel>
                <Select
                  value={newConsultation.type}
                  label="Consultation Type"
                  onChange={(e) => setNewConsultation({ ...newConsultation, type: e.target.value })}
                >
                  {consultationTypes.map((type) => (
                    <MenuItem key={type} value={type}>{type}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel>Mode</InputLabel>
                <Select
                  value={newConsultation.mode}
                  label="Mode"
                  onChange={(e) => setNewConsultation({ ...newConsultation, mode: e.target.value })}
                >
                  <MenuItem value="video">Video Call</MenuItem>
                  <MenuItem value="phone">Phone Call</MenuItem>
                  <MenuItem value="in_person">In Person</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Duration (minutes)"
                type="number"
                value={newConsultation.duration}
                onChange={(e) => setNewConsultation({ ...newConsultation, duration: e.target.value })}
              />
            </Grid>
            
            <Grid item xs={12}>
              <TextField
                fullWidth
                multiline
                rows={3}
                label="Notes"
                value={newConsultation.notes}
                onChange={(e) => setNewConsultation({ ...newConsultation, notes: e.target.value })}
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)}>Cancel</Button>
          <Button 
            onClick={handleAddConsultation} 
            variant="contained"
            disabled={!newConsultation.client || !newConsultation.date || !newConsultation.time || !newConsultation.type}
          >
            Schedule Consultation
          </Button>
        </DialogActions>
      </Dialog>

      {/* Send NeuroScript Dialog */}
      <Dialog open={openSendDialog} onClose={() => setOpenSendDialog(false)} maxWidth="sm" fullWidth>
        <DialogTitle>
          <Box display="flex" alignItems="center" gap={1}>
            <SendIcon color="primary" />
            <Typography>Send NeuroScript to Client</Typography>
          </Box>
        </DialogTitle>
        <DialogContent>
          <Typography variant="body1" gutterBottom>
            Send the verified NeuroScript transcription to the client for review and confirmation.
          </Typography>
          
          <FormControl fullWidth sx={{ mt: 2, mb: 2 }}>
            <InputLabel>Select Client</InputLabel>
            <Select
              label="Select Client"
              value={selectedConsultation?.client || ''}
              onChange={(e) => {
                const client = consultations.find(c => c.client === e.target.value);
                setSelectedConsultation(client || null);
              }}
            >
              {clients.map((client) => (
                <MenuItem key={client.name} value={client.name}>
                  <Box>
                    <Typography>{client.name}</Typography>
                    <Typography variant="caption" color="textSecondary">
                      {client.email}
                    </Typography>
                  </Box>
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          {selectedConsultation && (
            <Box sx={{ mb: 2, p: 2, backgroundColor: 'grey.50', borderRadius: 1 }}>
              <Typography variant="subtitle2" gutterBottom>
                Sending to: {selectedConsultation.client}
              </Typography>
              <Typography variant="body2" color="textSecondary">
                Email: {selectedConsultation.clientEmail}
              </Typography>
            </Box>
          )}

          <TextField
            fullWidth
            multiline
            rows={3}
            label="Additional Message to Client"
            placeholder="Add a personal message to accompany the NeuroScript..."
            defaultValue="Please review the attached NeuroScript transcript from our recent consultation. This will serve as the basis for drafting your legal documents. Let me know if any corrections are needed."
            sx={{ mt: 1 }}
          />

          <Alert severity="info" sx={{ mt: 2 }}>
            The NeuroScript transcript ({transcript.split(/\s+/).length} words) will be attached as a PDF document.
          </Alert>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenSendDialog(false)}>Cancel</Button>
          <Button 
            onClick={handleSendToClient} 
            variant="contained"
            startIcon={<SendIcon />}
            disabled={!selectedConsultation}
          >
            Send NeuroScript
          </Button>
        </DialogActions>
      </Dialog>

      {/* Add CSS for blinking cursor */}
      <style jsx>{`
        @keyframes blink {
          0%, 50% { opacity: 1; }
          51%, 100% { opacity: 0; }
        }
        @keyframes pulse {
          0% { transform: scale(1); }
          50% { transform: scale(1.05); }
          100% { transform: scale(1); }
        }
      `}</style>
    </Box>
  );
};

export default Consultation;