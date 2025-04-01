"use client";

import {
  Box,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography,
} from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import EventIcon from "@mui/icons-material/Event";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";

const Sidebar = () => {
  return (
    <>
      {/* Drawer cho Sidebar */}
      <Drawer
        sx={{
          width: 250,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: 250,
            boxSizing: "border-box",

            padding: "20px",
          },
        }}
        variant="permanent" // Để sidebar luôn hiển thị
        anchor="left" // Đặt sidebar nằm ở bên trái
      >
        <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
          {/* Logo và tên */}
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              gap: 1,
            }}
          >
            <Typography
              sx={{
                color: "#1F2B6C",
                fontSize: "32px",
                fontWeight: "medium",
                textShadow: "2px 2px 5px rgba(0, 0, 0, 0.3)",
              }}
            >
              Hospital
            </Typography>
            <Typography
              sx={{
                color: "#404040",
                fontSize: "32px",
                textShadow: "2px 2px 5px rgba(0, 0, 0, 0.3)",
              }}
            >
              logo
            </Typography>
          </Box>

          {/* Mục menu */}
          <List>
            <ListItem button>
              <ListItemIcon>
                <HomeIcon />
              </ListItemIcon>
              <ListItemText primary="Home" />
            </ListItem>
            <ListItem button>
              <ListItemIcon>
                <EventIcon />
              </ListItemIcon>
              <ListItemText primary="Events" />
            </ListItem>
            <ListItem button>
              <ListItemIcon>
                <AccountCircleIcon />
              </ListItemIcon>
              <ListItemText primary="Profile" />
            </ListItem>
            <ListItem button>
              <ListItemIcon>
                <ExitToAppIcon />
              </ListItemIcon>
              <ListItemText primary="Logout" />
            </ListItem>
          </List>
        </Box>
      </Drawer>
    </>
  );
};

export default Sidebar;
