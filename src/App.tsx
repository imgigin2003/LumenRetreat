import { lazy, Suspense } from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { AppLayout } from '@/layout/AppLayout';
import { ProtectedRoute } from '@/features/auth/ProtectedRoute';
import { FullPageSpinner } from '@/ui/Spinner';

// Public auth page
import Login from '@/pages/Login';

// App pages (lazy so 3D / chart libs load on demand)
const Dashboard = lazy(() => import('@/pages/Dashboard'));
const Bookings = lazy(() => import('@/pages/Bookings'));
const Booking = lazy(() => import('@/pages/Booking'));
const Cabins = lazy(() => import('@/pages/Cabins'));
const Guests = lazy(() => import('@/pages/Guests'));
const Settings = lazy(() => import('@/pages/Settings'));
const Account = lazy(() => import('@/pages/Account'));
const NotFound = lazy(() => import('@/pages/NotFound'));

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public */}
        <Route path="/login" element={<Login />} />

        {/* Protected app shell */}
        <Route
          element={
            <ProtectedRoute>
              <AppLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<Navigate to="/dashboard" replace />} />
          <Route
            path="/dashboard"
            element={
              <Suspense fallback={<FullPageSpinner />}>
                <Dashboard />
              </Suspense>
            }
          />
          <Route
            path="/bookings"
            element={
              <Suspense fallback={<FullPageSpinner />}>
                <Bookings />
              </Suspense>
            }
          />
          <Route
            path="/bookings/:bookingId"
            element={
              <Suspense fallback={<FullPageSpinner />}>
                <Booking />
              </Suspense>
            }
          />
          <Route
            path="/cabins"
            element={
              <Suspense fallback={<FullPageSpinner />}>
                <Cabins />
              </Suspense>
            }
          />
          <Route
            path="/guests"
            element={
              <Suspense fallback={<FullPageSpinner />}>
                <Guests />
              </Suspense>
            }
          />
          <Route
            path="/settings"
            element={
              <Suspense fallback={<FullPageSpinner />}>
                <Settings />
              </Suspense>
            }
          />
          <Route
            path="/account"
            element={
              <Suspense fallback={<FullPageSpinner />}>
                <Account />
              </Suspense>
            }
          />
        </Route>

        <Route
          path="*"
          element={
            <Suspense fallback={<FullPageSpinner />}>
              <NotFound />
            </Suspense>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}
