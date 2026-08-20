import { BrowserRouter, Route, Routes } from 'react-router-dom';

import { ROUTES } from '@config/routes.js';
import { RootLayout } from '@layouts/RootLayout.jsx';
import { DashboardPage } from '@pages/DashboardPage.jsx';
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
          <Route path={ROUTES.DASHBOARD} element={<DashboardPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
