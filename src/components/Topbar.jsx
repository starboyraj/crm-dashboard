import { AppBar, Toolbar, Typography } from "@mui/material";

export default function Topbar() {
  return (
    <AppBar
      position="fixed"
      sx={{
        background: "#ffffff",
        color: "#0f172a",
        boxShadow: "0px 2px 4px rgba(0,0,0,0.06)",
      }}
    >
      <Toolbar>
        <Typography variant="h6" fontWeight={600}>
          CRM Panel
        </Typography>
      </Toolbar>
    </AppBar>
  );
}



