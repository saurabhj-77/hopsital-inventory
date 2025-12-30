import React from 'react';
import {
  Box,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
  Divider,
  Button,
  Avatar,
  Slide,
  alpha,
} from '@mui/material';
import { useNavigate, useLocation } from 'react-router-dom';
import lawLogo from "../../assets/img/lawLogo.jpeg";
import hospitalInventory from '../../assets/img/hospitalInventory.png';

export const Sidebar = ({ items, user, onLogout, onItemClick }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleNavigation = (path) => {
    navigate(path);
    if (onItemClick) onItemClick();
  };

  return (
    <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
    <Slide direction="down" in={true} timeout={600}>
      <Box sx={{ p: 3, pb: 2 }}>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 2,
            p: 2,
            borderRadius: 3,
            background:
              "linear-gradient(135deg, #1e3c72 0%, #2a5298 100%)", // deeper royal blue
            boxShadow: "0 8px 24px rgba(30, 60, 114, 0.35)",
            position: "relative",
            overflow: "hidden",
            cursor: "pointer",
            transition: "all 0.35s ease",
            "&:hover": {
              transform: "translateY(-3px)",
              boxShadow: "0 12px 32px rgba(30, 60, 114, 0.5)",
            },
            "&::before": {
              content: '""',
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background:
                "radial-gradient(circle at 25% 30%, rgba(255,255,255,0.15) 0%, transparent 70%)",
            },
          }}
          onClick={() => handleNavigation("/")}
        >
          {/* Logo */}
          <Avatar
            src={hospitalInventory}
            alt="hospitallogo"
            sx={{
              width: 56,
              height: 56,
              background: "rgba(255,255,255,0.9)", // light base for contrast
              border: "2px solid rgba(255,255,255,0.4)",
              boxShadow: "0 6px 16px rgba(0,0,0,0.15)",
              p: 0.5,
              backdropFilter: "blur(6px)",
              transition: "all 0.3s ease",
              "&:hover": {
                transform: "scale(1.05)",
              },
              zIndex: 1,
            }}
          />

          {/* Text */}
          <Box sx={{ flexGrow: 1, position: "relative", zIndex: 1 }}>
            <Typography
              variant="h6"
              sx={{
                fontWeight: 800,
                color: "#fff",
                lineHeight: 1.2,
                fontSize: "1.15rem",
                letterSpacing: "0.5px",
              }}
            >
              Hospital
            </Typography>
            <Typography
              variant="caption"
              sx={{
                color: alpha("#fff", 0.85),
                fontWeight: 600,
                fontSize: "0.75rem",
                letterSpacing: "0.3px",
              }}
            >
              Inventory Management
            </Typography>
          </Box>
        </Box>
      </Box>
    </Slide>

      {/* <Divider /> */}

      <List sx={{ flexGrow: 1, p: 1 }}>
        {items.map((item) => (
          <ListItem key={item.path} disablePadding sx={{ mb: 0.5 }}>
            <ListItemButton
              selected={location.pathname === item.path}
              onClick={() => handleNavigation(item.path)}
              sx={{
                borderRadius: 2,
                '&.Mui-selected': {
                  backgroundColor: 'primary.main',
                  color: 'white',
                  '& .MuiListItemIcon-root': {
                    color: 'white',
                  },
                },
                '&:hover': {
                  backgroundColor: 'primary.light',
                  color: 'white',
                  '& .MuiListItemIcon-root': {
                    color: 'white',
                  },
                },
              }}
            >
              <ListItemIcon sx={{ minWidth: 40 }}>
                {item.icon}
              </ListItemIcon>
              <ListItemText primary={item.title} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>

      <Box sx={{ p: 2 }}>
        <Button
          variant="outlined"
          fullWidth
          onClick={onLogout}
          sx={{ borderRadius: 2 }}
        >
          Logout
        </Button>
      </Box>
    </Box>
  );
};