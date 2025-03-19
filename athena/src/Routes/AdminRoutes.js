import React from 'react';
import { Routes, Route } from 'react-router-dom';
import AdminDashboard from '../components/AdminDashboard';
import ReviewResults from '../components/ReviewResults'; // ✅ Import Correctly

const AdminRoutes = () => {
  return (
    <Routes>
      <Route path="/admin" element={<AdminDashboard />} />
      <Route path="/admin/review-results" element={<ReviewResults />} />
    </Routes>
  );
};

export default AdminRoutes;
