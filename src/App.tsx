import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import UserAuthForm from "./pages/Volunteer-Auth";
import AdminPendingVerifications from "./pages/admin-approvals";
import ActivateAccount from "./pages/activateToken";
import CheckAssignedComplaint from "./pages/volunteer-dashboard";
import CreateComplaintForm from "./pages/create-complaint";
import ComplaintDetailsPage from "./pages/complain-status";
import HomePage from "./pages/homepage";

export default function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/volunteer-auth" element={<UserAuthForm />} />
          <Route path="/admin/pendingRequests" element={<AdminPendingVerifications />} />
          <Route path="/activate/:token" element={<ActivateAccount />} />
          <Route path="/dashboard" element={<CheckAssignedComplaint />} />
          <Route path="/complain" element={<CreateComplaintForm />} />
          <Route path="/complaint/:id" element={<ComplaintDetailsPage />} />
        </Routes>
      </Router>
    </>
  )
}