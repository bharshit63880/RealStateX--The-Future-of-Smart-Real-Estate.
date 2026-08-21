import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { ROUTES } from '@config/routes.js';
import { useAuth } from './AuthContext.jsx';
export function ProtectedRoute(){const{user,loading}=useAuth();const location=useLocation();if(loading)return <div className="auth-loading" role="status">Restoring your secure session…</div>;return user?<Outlet/>:<Navigate to={ROUTES.LOGIN} replace state={{from:location}}/>;}
