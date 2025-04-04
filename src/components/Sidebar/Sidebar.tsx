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
import AssignmentIcon from "@mui/icons-material/Assignment";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import Link from "next/link";
import { usePathname } from "next/navigation";

const Sidebar = () => {
  const pathname = usePathname();

  // Item config for cleaner mapping
  const navItems = [
    { text: "Home", icon: <HomeIcon />, path: "/" },
    { text: "Appointment", icon: <AssignmentIcon />, path: "/appointment" },
    { text: "Profile", icon: <AccountCircleIcon />, path: "/profile" },
    { text: "Logout", icon: <ExitToAppIcon />, path: "/logout" },
  ];

  return (
    <Drawer
      sx={{
        width: 250,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: 250,
          padding: "25px",
        },
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
      }}
      variant="permanent"
      anchor="left"
    >
      <Box sx={{ display: "flex", flexDirection: "column", gap: 10 }}>
        {/* Logo */}
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            gap: 1,
            paddingTop: 4,
          }}
        >
          <Typography
            sx={{
              color: "#1F2B6C",
              fontSize: 28,
              fontWeight: "medium",
              textShadow: "2px 2px 5px rgba(0, 0, 0, 0.3)",
            }}
          >
            Hospital
          </Typography>
          <Typography
            sx={{
              color: "#404040",
              fontSize: 28,
              textShadow: "2px 2px 5px rgba(0, 0, 0, 0.3)",
            }}
          >
            logo
          </Typography>
        </Box>

        {/* Nav Menu */}
        <List>
          {navItems.map(({ text, icon, path }) => {
            const isActive = pathname === path;
            const activeColor = "#1F2B6C";

            return (
              <Link key={text} href={path} passHref legacyBehavior>
                <ListItem
                  sx={{
                    position: "relative",
                    cursor: "pointer",
                    color: isActive ? activeColor : "inherit",
                    transition: "all 0.3s ease",
                    "&::after": {
                      content: '""',
                      position: "absolute",
                      right: 0,
                      top: "25%",
                      height: "50%",
                      width: "4px",
                      backgroundColor: isActive ? activeColor : "transparent",
                      borderRadius: "4px",
                      transition: "all 0.3s ease",
                    },
                    "&:hover::after": {
                      backgroundColor: activeColor,
                    },
                    "&:hover": {
                      backgroundColor: "#f0f4ff",
                    },
                  }}
                >
                  <ListItemIcon
                    sx={{
                      color: isActive ? activeColor : "inherit",
                      minWidth: 40,
                      transition: "all 0.3s ease",
                    }}
                  >
                    {icon}
                  </ListItemIcon>
                  <ListItemText
                    primary={
                      <Typography
                        sx={{
                          fontWeight: isActive ? "bold" : "normal",
                          color: isActive ? activeColor : "inherit",
                          transition: "all 0.3s ease",
                        }}
                      >
                        {text}
                      </Typography>
                    }
                  />
                </ListItem>
              </Link>
            );
          })}
        </List>
      </Box>
    </Drawer>
  );
};

export default Sidebar;
