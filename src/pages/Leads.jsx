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
  Chip,
  Button,
} from "@mui/material";

export default function Leads() {
  const { token } = useContext(AuthContext);

  const [leads, setLeads] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchLeads = async () => {
    try {
      const res = await API.get("/lead", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setLeads(res.data.leads || []);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLeads();
  }, []);

  return (
    <Box>
      <Typography variant="h4" fontWeight={700} mb={1}>
        All Leads
      </Typography>

      <Typography color="text.secondary" mb={4}>
        List of all your stored prospects & customers
      </Typography>

      {loading && <Typography>Loading...</Typography>}

      {!loading && leads.length === 0 && (
        <Typography color="text.secondary">No leads found.</Typography>
      )}

      <Grid container spacing={3}>
        {leads.map((lead) => (
          <Grid item xs={12} md={6} lg={4} key={lead._id}>
            <Card
              elevation={0}
              sx={{
                borderRadius: "12px",
                padding: 2,
                border: "1px solid #e5e7eb",
                ":hover": { boxShadow: "0 6px 20px rgba(0,0,0,0.1)" },
                transition: ".2s",
              }}
            >
              <CardContent>
                <Box display="flex" justifyContent="space-between" mb={1}>
                  <Typography variant="h6" fontWeight={600}>
                    {lead.name}
                  </Typography>

                  {lead.status === "hot" && <Chip color="error" label="🔥 Hot" />}
                  {lead.status === "warm" && <Chip color="warning" label="🌤 Warm" />}
                  {lead.status === "cold" && <Chip color="info" label="❄ Cold" />}
                </Box>

                <Typography color="text.secondary">{lead.email}</Typography>
                <Typography color="text.secondary">{lead.phone}</Typography>

                <Box mt={2}>
                  <Link
                    to={`/lead/${lead._id}`}
                    style={{ textDecoration: "none" }}
                  >
                    <Button variant="outlined" fullWidth>
                      View Details →
                    </Button>
                  </Link>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}

