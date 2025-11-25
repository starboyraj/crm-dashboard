import { useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";
import API from "../api/axios";
import { AuthContext } from "../context/AuthContext";

import {
  Box,
  Grid,
  Card,
  CardContent,
  Typography,
  TextField,
  Button,
  Chip,
} from "@mui/material";

export default function Dashboard() {
  const { token } = useContext(AuthContext);

  const [leads, setLeads] = useState([]);
  const [stats, setStats] = useState({
    total: 0,
    hot: 0,
    warm: 0,
    cold: 0,
  });

  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("");

  // Fetch Leads
  const fetchLeads = async () => {
    try {
      setLoading(true);
      const res = await API.get(
        `/lead?search=${search}&status=${status}&page=1&limit=50`,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      const arr = res.data.leads || [];
      setLeads(arr);

      setStats({
        total: arr.length,
        hot: arr.filter((x) => x.status === "hot").length,
        warm: arr.filter((x) => x.status === "warm").length,
        cold: arr.filter((x) => x.status === "cold").length,
      });
    } catch (err) {
      console.log("FETCH ERROR:", err.response?.data);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLeads();
  }, []);

  useEffect(() => {
    fetchLeads();
  }, [search, status]);

  return (
    <Box p={{ xs: 2, md: 4 }}>
      {/* HEADER */}
      <Typography variant="h4" fontWeight={700} mb={1}>
        Dashboard
      </Typography>
      <Typography color="text.secondary" mb={3}>
        Track your leads, performance & opportunities
      </Typography>

      {/* 🔥 STATS CARDS */}
      <Grid container spacing={2} mb={4}>
        {[
          { title: "Total Leads", value: stats.total },
          { title: "🔥 Hot", value: stats.hot },
          { title: "🌤️ Warm", value: stats.warm },
          { title: "❄ Cold", value: stats.cold },
        ].map((item, i) => (
          <Grid item xs={12} sm={6} md={3} key={i}>
            <Card
              elevation={0}
              sx={{
                borderRadius: "14px",
                textAlign: "center",
                py: 2,
                border: "1px solid #e5e7eb",
              }}
            >
              <Typography color="text.secondary">{item.title}</Typography>
              <Typography variant="h4" fontWeight={700}>
                {item.value}
              </Typography>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* 🔎 SEARCH + FILTER + ADD BTN */}
      <Grid container spacing={2} alignItems="center" mb={4}>
        <Grid item xs={12} sm={4} md={3}>
          <TextField
            fullWidth
            label="Search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </Grid>

        <Grid item xs={12} sm={4} md={3}>
          <TextField
            fullWidth
            select
            label="Lead Status"
            SelectProps={{ native: true }}
            value={status}
            onChange={(e) => setStatus(e.target.value)}
          >
            <option value="">All</option>
            <option value="hot">Hot 🔥</option>
            <option value="warm">Warm 🌤️</option>
            <option value="cold">Cold ❄️</option>
          </TextField>
        </Grid>

        <Grid item xs={12} sm={4} md={3}>
          <Link to="/add" style={{ textDecoration: "none" }}>
            <Button fullWidth variant="contained" sx={{ height: 56 }}>
              + Add Lead
            </Button>
          </Link>
        </Grid>
      </Grid>

      {/* 🌀 LOADING */}
      {loading && <Typography>Loading...</Typography>}
      {!loading && leads.length === 0 && (
        <Typography color="text.secondary">No leads found.</Typography>
      )}

      {/* 🔥 LEADS LIST */}
      <Grid container spacing={3}>
        {leads.map((lead) => (
          <Grid item xs={12} sm={6} md={4} key={lead._id}>
            <Link to={`/lead/${lead._id}`} style={{ textDecoration: "none" }}>
              <Card
                elevation={0}
                sx={{
                  borderRadius: "14px",
                  p: 2,
                  cursor: "pointer",
                  border: "1px solid #e5e7eb",
                  ":hover": {
                    boxShadow: "0px 6px 20px rgba(0,0,0,0.12)",
                    transform: "translateY(-4px)",
                  },
                }}
              >
                <CardContent>
                  <Typography variant="h6" fontWeight={700} mb={1}>
                    {lead.name}
                  </Typography>

                  <Typography color="text.secondary">{lead.email}</Typography>
                  <Typography color="text.secondary">{lead.phone}</Typography>

                  <Box mt={2}>
                    {lead.status === "hot" && (
                      <Chip label="🔥 Hot" color="error" size="small" />
                    )}
                    {lead.status === "warm" && (
                      <Chip label="🌤️ Warm" color="warning" size="small" />
                    )}
                    {lead.status === "cold" && (
                      <Chip label="❄️ Cold" color="info" size="small" />
                    )}
                  </Box>
                </CardContent>
              </Card>
            </Link>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}


