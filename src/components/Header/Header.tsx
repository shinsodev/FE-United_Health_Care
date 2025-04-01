"use client"

import { AppBar, IconButton, Toolbar, Typography } from "@mui/material";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
const Header = () => {
  return (
    <AppBar position="static" sx={{ backgroundColor: '#ffffff', boxShadow: 1, color: '#000' }}>
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1, fontWeight: 'bold', color: '#192A56' }}>
          Hospital Logo
        </Typography>
        <IconButton>
          <AccountCircleIcon sx={{ color: '#192A56' }} />
        </IconButton>
      </Toolbar>
    </AppBar>
  );
}

export default Header