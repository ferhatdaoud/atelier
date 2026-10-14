import {lazy, Suspense} from 'react';
import {createRoot} from 'react-dom/client';
import {BrowserRouter, Route, Routes} from 'react-router';
import App from './App.tsx';
import './index.css';

// Admin dashboard is code-split so visitors never download it.
const AdminApp = lazy(() => import('./admin/AdminApp.tsx'));

createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
    <Routes>
      <Route
        path="/admin/*"
        element={
          <Suspense fallback={<div className="min-h-screen bg-[#080808]" />}>
            <AdminApp />
          </Suspense>
        }
      />
      <Route path="*" element={<App />} />
    </Routes>
  </BrowserRouter>,
);
