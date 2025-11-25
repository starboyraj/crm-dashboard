import { useState, useContext } from "react";
import API from "../api/axios";
import { AuthContext } from "../context/AuthContext";

import {
  Box,
  Card,
  CardContent,
  Typography,
  TextField,
  Button,
  MenuItem,
  Alert,
} from "@mui/material";

export default function AddLead() {
  const { token } = useContext(AuthContext);

  const [lead, setLead] = useState({
    name: "",
    email: "",
    phone: "",
    status: "hot",
  });

  const [msg, setMsg] = useState("");

  const handleSubmit = async () => {
    try {
      setMsg("");

      const res = await API.post(
        "/lead",
        lead,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      setMsg("Lead added successfully ✔");
      setLead({ name: "", email: "", phone: "", status: "hot" });
    } catch (err) {
      setMsg(err.response?.data?.message || "Failed to add lead ❌");
    }
  };

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      height="100%"
    >
      <Card
        elevation={0}
        sx={{
          width: 450,
          borderRadius: "14px",
          padding: 4,
          border: "1px solid #e5e7eb",
        }}
      >
        <CardContent>
          <Typography
            variant="h4"
            fontWeight={700}
            textAlign="center"
            mb={3}
          >
            Add Lead
          </Typography>

          <Box display="flex" flexDirection="column" gap={2}>
            <TextField
              label="Full Name"
              value={lead.name}
              onChange={(e) => setLead({ ...lead, name: e.target.value })}
              fullWidth
            />

            <TextField
              label="Email"
              value={lead.email}
              onChange={(e) => setLead({ ...lead, email: e.target.value })}
              fullWidth
            />

            <TextField
              label="Phone"
              value={lead.phone}
              onChange={(e) => setLead({ ...lead, phone: e.target.value })}
              fullWidth
            />

            <TextField
              select
              label="Lead Status"
              value={lead.status}
              onChange={(e) => setLead({ ...lead, status: e.target.value })}
              fullWidth
            >
              <MenuItem value="hot">🔥 Hot</MenuItem>
              <MenuItem value="warm">🌤 Warm</MenuItem>
              <MenuItem value="cold">❄ Cold</MenuItem>
            </TextField>

            <Button
              variant="contained"
              size="large"
              sx={{ mt: 2, py: 1.4, fontSize: "16px" }}
              onClick={handleSubmit}
            >
              Add Lead
            </Button>

            {msg && (
              <Alert severity={msg.includes("✔") ? "success" : "error"}>
                {msg}
              </Alert>
            )}
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
}
