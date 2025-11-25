import { Outlet, useNavigate } from "react-router-dom";
import {
  Box,
  Typography,
  Button,
  IconButton,
  Drawer,
  List,
  ListItemButton,
  ListItemText,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { useState } from "react";

export default function AppLayout() {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const NavItem = ({ title, path, icon }) => (
    <ListItemButton
      onClick={() => {
        navigate(path);
        setOpen(false);
      }}
    >
      <ListItemText primary={`${icon} ${title}`} />
    </ListItemButton>
  );

  const sidebarItems = (
    <List>
      <NavItem title="Dashboard" icon="🏠" path="/dashboard" />
      <NavItem title="Leads" icon="📒" path="/leads" />
      <NavItem title="Add Lead" icon="➕" path="/add" />

      <Box sx={{ mt: 2, px: 2 }}>
        <Button
          fullWidth
          variant="contained"
          color="error"
          onClick={() => {
            localStorage.removeItem("token");
            navigate("/login");
          }}
        >
          Logout
        </Button>
      </Box>
    </List>
  );

  return (
    <Box display="flex" height="100vh" bgcolor="#f6f9fc">
      {/* DESKTOP SIDEBAR */}
      <Box
        sx={{
          width: 220, // 👈 thinner sidebar
          bgcolor: "#0b1628",
          color: "white",
          display: { xs: "none", md: "flex" },
          flexDirection: "column",
          p: 2,
          gap: 1,
        }}
      >
        <Typography
          variant="h6"
          fontWeight={700}
          mb={1.5}
          sx={{ opacity: 0.9, textAlign: "center" }}
        >
          CRM Panel
        </Typography>

        {sidebarItems}
      </Box>

      {/* MOBILE TOP BAR */}
      <Box
        sx={{
          display: { xs: "flex", md: "none" },
          justifyContent: "space-between",
          alignItems: "center",
          bgcolor: "#0b1628",
          color: "white",
          p: 2,
        }}
      >
        <Typography variant="h6">CRM Panel</Typography>
        <IconButton onClick={() => setOpen(true)}>
          <MenuIcon sx={{ color: "white" }} />
        </IconButton>
      </Box>

      {/* MOBILE DRAWER */}
      <Drawer
        open={open}
        onClose={() => setOpen(false)}
        sx={{
          "& .MuiDrawer-paper": {
            width: 180, // 👈 mobile drawer smaller
            bgcolor: "#0b1628",
            color: "white",
          },
        }}
      >
        {sidebarItems}
      </Drawer>

      {/* PAGE CONTENT */}
      <Box flex={1} p={{ xs: 2, md: 4 }} overflow="auto">
        <Outlet />
      </Box>
    </Box>
  );
}
