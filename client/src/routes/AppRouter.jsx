import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { ProtectedRoute } from '../auth/ProtectedRoute.jsx';

import { ROUTES } from '@config/routes.js';
import { RootLayout } from '@layouts/RootLayout.jsx';
import { DashboardPage } from '@pages/DashboardPage.jsx';
import { AuthPage } from '@pages/AuthPage.jsx';
import { WorkspacePage } from '@pages/WorkspacePage.jsx';
import { ExplorePage } from '@pages/ExplorePage.jsx';
import { HomePage } from '@pages/HomePage.jsx';
import { NotFoundPage } from '@pages/NotFoundPage.jsx';
import { PropertyPage } from '@pages/PropertyPage.jsx';

export function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<RootLayout />}>
          <Route index element={<HomePage />} />
          <Route path={ROUTES.EXPLORE} element={<ExplorePage />} />
          <Route path={ROUTES.PROPERTY} element={<PropertyPage />} />
          <Route path={ROUTES.LOGIN} element={<AuthPage />} />
          <Route path={ROUTES.REGISTER} element={<AuthPage mode="register" />} />
          <Route element={<ProtectedRoute />}>
            <Route path={ROUTES.DASHBOARD} element={<DashboardPage />} />
            <Route path={ROUTES.BOOKINGS} element={<WorkspacePage moduleKey="bookings" />} />
            <Route path={ROUTES.MESSAGES} element={<WorkspacePage moduleKey="messages" />} />
            <Route path={ROUTES.OFFERS} element={<WorkspacePage moduleKey="offers" />} />
            <Route path={ROUTES.DOCUMENTS} element={<WorkspacePage moduleKey="documents" />} />
            <Route path={ROUTES.NOTIFICATIONS} element={<WorkspacePage moduleKey="notifications" />} />
            <Route path={ROUTES.ADMIN} element={<WorkspacePage moduleKey="admin" />} />
            <Route path={ROUTES.PROJECTS} element={<WorkspacePage moduleKey="projects" />} />
            <Route path={ROUTES.LEADS} element={<WorkspacePage moduleKey="leads" />} />
            <Route path={ROUTES.LEASES} element={<WorkspacePage moduleKey="leases" />} />
            <Route path={ROUTES.MAINTENANCE} element={<WorkspacePage moduleKey="maintenance" />} />
            <Route path={ROUTES.LISTINGS} element={<WorkspacePage moduleKey="listings" />} />
            <Route path={ROUTES.MODERATION} element={<WorkspacePage moduleKey="moderation" />} />
            <Route path={ROUTES.USERS} element={<WorkspacePage moduleKey="users" />} />
          </Route>
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
