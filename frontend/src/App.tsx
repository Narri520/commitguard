import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { ThemeProvider } from './context/ThemeContext';
import { ProtectedRoute } from './components/ProtectedRoute';
import { AppLayout } from './layouts/AppLayout';

import { LandingPage } from './pages/LandingPage';
import { LoginPage } from './pages/LoginPage';
import { RegisterPage } from './pages/RegisterPage';
import { DashboardPage } from './pages/DashboardPage';
import { CommitmentsPage } from './pages/CommitmentsPage';
import { CreateCommitmentPage } from './pages/CreateCommitmentPage';
import { CommitmentDetailPage } from './pages/CommitmentDetailPage';
import { ProofSubmissionPage } from './pages/ProofSubmissionPage';
import { AnalyticsPage } from './pages/AnalyticsPage';
import { StreaksPage } from './pages/StreaksPage';
import { TransactionsPage } from './pages/TransactionsPage';
import { NotificationsPage } from './pages/NotificationsPage';
import { AccountabilityPage } from './pages/AccountabilityPage';
import { CharitiesPage } from './pages/CharitiesPage';
import { ProfilePage } from './pages/ProfilePage';
import { SettingsPage } from './pages/SettingsPage';

export const App: React.FC = () => {
  return (
    <ThemeProvider>
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<LandingPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />

            {/* Protected Dashboard App Routes */}
            <Route element={<ProtectedRoute />}>
              <Route element={<AppLayout />}>
                <Route path="/dashboard" element={<DashboardPage />} />
                <Route path="/commitments" element={<CommitmentsPage />} />
                <Route path="/commitments/create" element={<CreateCommitmentPage />} />
                <Route path="/commitments/:id" element={<CommitmentDetailPage />} />
                <Route path="/commitments/:id/proof" element={<ProofSubmissionPage />} />
                <Route path="/analytics" element={<AnalyticsPage />} />
                <Route path="/streaks" element={<StreaksPage />} />
                <Route path="/transactions" element={<TransactionsPage />} />
                <Route path="/notifications" element={<NotificationsPage />} />
                <Route path="/accountability" element={<AccountabilityPage />} />
                <Route path="/charities" element={<CharitiesPage />} />
                <Route path="/profile" element={<ProfilePage />} />
                <Route path="/settings" element={<SettingsPage />} />
              </Route>
            </Route>

            {/* Fallback Catch-all */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </ThemeProvider>
  );
};

export default App;
