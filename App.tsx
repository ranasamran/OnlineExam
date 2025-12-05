import React from 'react';
import { HashRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Instructions from './pages/Instructions';
import ExamContainer from './pages/ExamContainer';
import Results from './pages/Results';

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/exam/:examId/instructions" element={<Instructions />} />
        {/* ExamContainer handles taking the exam and the review page */}
        <Route path="/exam/:examId/take" element={<ExamContainer />} />
        <Route path="/exam/:examId/results" element={<Results />} />
      </Routes>
    </Router>
  );
};

export default App;
