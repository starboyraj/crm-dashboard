import { BrowserRouter, Routes, Route } from "react-router-dom";

import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import AddLead from "./pages/AddLead";
import Leads from "./pages/Leads";
import LeadDetails from "./pages/LeadDetails";

import ProtectedRoute from "./components/ProtectedRoute";
import AppLayout from "./layout/AppLayout";

function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* ------------- PUBLIC ------------- */}
        <Route path="/" element={<Signup />} />
        <Route path="/login" element={<Login />} />

        {/* ------------- PROTECTED LAYOUT ------------- */}
        <Route
          element={
            <ProtectedRoute>
              <AppLayout />
            </ProtectedRoute>
          }
        >
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/leads" element={<Leads />} />
          <Route path="/add" element={<AddLead />} />
          <Route path="/lead/:id" element={<LeadDetails />} />
        </Route>

      </Routes>
    </BrowserRouter>
  );
}

export default App;




