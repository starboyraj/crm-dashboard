import { useState } from "react";
import {
  Drawer,
  List,
  ListItemButton,
  ListItemText,
  Toolbar,
  IconButton,
  Box,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { Link } from "react-router-dom";

const drawerWidth = 240;

export default function Sidebar() {
  const [open, setOpen] = useState(false);

  const menuItems = (
    <List>
      <ListItemButton component={Link} to="/dashboard">
        <ListItemText primary="Dashboard" />
      </ListItemButton>

      <ListItemButton component={Link} to="/leads">
        <ListItemText primary="Leads" />
      </ListItemButton>

      <ListItemButton component={Link} to="/add">
        <ListItemText primary="Add Lead" />
      </ListItemButton>
    </List>
  );

  return (
    <>
      {/* 🔥 MOBILE TOP MENU BUTTON */}
      <Box sx={{ display: { xs: "block", md: "none" }, p: 1 }}>
        <IconButton onClick={() => setOpen(true)}>
          <MenuIcon sx={{ color: "#0f172a" }} />
        </IconButton>
      </Box>

      {/* 🔥 DESKTOP SIDEBAR (LEFT FIXED) */}
      <Drawer
        variant="permanent"
        sx={{
          display: { xs: "none", md: "block" },
          width: drawerWidth,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
            background: "#0f172a",
            color: "#e2e8f0",
            borderRight: "none",
          },
        }}
        open
      >
        <Toolbar />
        {menuItems}
      </Drawer>

      {/* 🔥 MOBILE DRAWER (SLIDE) */}
      <Drawer
        variant="temporary"
        open={open}
        onClose={() => setOpen(false)}
        sx={{
          display: { xs: "block", md: "none" },
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            background: "#0f172a",
            color: "#e2e8f0",
          },
        }}
      >
        <Toolbar />
        {menuItems}
      </Drawer>
    </>
  );
}
