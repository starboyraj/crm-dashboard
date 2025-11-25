import { useParams } from "react-router-dom";
import API from "../api/axios";
import { useEffect, useState } from "react";

export default function LeadDetails() {
  const { id } = useParams();
  const [lead, setLead] = useState(null);

  useEffect(() => {
    API.get(`/lead/${id}`).then((res) => {
      setLead(res.data);
    });
  }, [id]);

  if (!lead) return null;

  return (
    <div style={{ padding: "50px" }}>
      <h2>{lead.name}</h2>

      <p><b>Email:</b> {lead.email}</p>
      <p><b>Phone:</b> {lead.phone}</p>
      <p><b>Status:</b> {lead.status}</p>

      <button
        style={{
          padding: "10px 15px",
          background: "black",
          color: "white",
          borderRadius: "6px",
          marginTop: "20px"
        }}
        onClick={() => window.history.back()}
      >
        ← Back
      </button>
    </div>
  );
}
