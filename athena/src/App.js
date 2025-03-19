import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
import About from './pages/About';
import AdminDashboard from './pages/AdminDashboard';
import Login from './pages/Login';
import AdminHome from './pages/AdminHome';
import Exams from './components/Exams';
import UserHome from './pages/UserHome';
import ManageExams from './pages/ManageExams';
import ManageUsers from './pages/ManageUsers';
import ReviewResult from './pages/ReviewResults';
import StartExam from './pages/StartExam';

const App = () => {
  return (
    <Router>
      <Routes>
        {/* Routes with Layout */}
        <Route
          path="/dashboard"
          element={
            <Layout>
              <Dashboard />
            </Layout>
          }
        />
        <Route
          path="/about"
          element={
            <Layout>
              <About />
            </Layout>
          }
        />
        {/* Admin Dashboard Route */}
        <Route
          path="/admin-dashboard"
          element={
            <Layout>
              <AdminDashboard />
            </Layout>
          }
        />
        
        {/* Route without Layout */}
        <Route path="/" element={<Login />} />
        <Route path="admin-home" element={<AdminHome />} />
        <Route path="/exams" element={<Exams />} />
        <Route path='User-Home'element={<UserHome/>} />
        <Route path='manage-exams' element={<ManageExams/>} />
        <Route path='manage-users' element={<ManageUsers/>} />
        <Route path='Review-result' element= {<ReviewResult/>} />
        <Route path="/start-exam/:id" element={<StartExam />} />
        <Route path="/review-result/:id" element={<ReviewResult />} />
      </Routes>
    </Router>
  );
};

export default App;
