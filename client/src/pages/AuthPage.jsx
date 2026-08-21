import { useState } from 'react';
import { Link, Navigate, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../auth/AuthContext.jsx';
import { ROUTES } from '@config/routes.js';

const ROLES = [['BUYER','Buyer'],['SELLER','Owner / Seller'],['AGENT','Agent'],['BUILDER','Builder'],['PROPERTY_MANAGER','Property manager']];

export function AuthPage({ mode = 'login' }) {
  const isRegister = mode === 'register';
  const { user, login, register } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);
  if (user) return <Navigate to={ROUTES.DASHBOARD} replace />;
  async function submit(event) {
    event.preventDefault(); setSubmitting(true); setError('');
    try {
      const values = Object.fromEntries(new FormData(event.currentTarget));
      if (isRegister) await register(values); else await login(values);
      navigate(location.state?.from?.pathname || ROUTES.DASHBOARD, { replace: true });
    } catch (requestError) { setError(requestError.message || 'Unable to continue.'); }
    finally { setSubmitting(false); }
  }
  return <main className="auth-page">
    <div className="auth-geometry" aria-hidden="true"><i /><i /><span>RX</span></div>
    <section className="auth-copy"><p className="arbor-label">Private real-estate workspace</p><h1>{isRegister ? 'Build your property journey.' : 'Welcome back.'}</h1><p>Secure access to visits, conversations, offers, documents and live portfolio intelligence.</p></section>
    <form className="auth-form" onSubmit={submit}>
      <div className="auth-form-head"><span>{isRegister ? 'Create account' : 'Sign in'}</span><small>Encrypted session</small></div>
      {isRegister && <label>Full name<input name="name" minLength="2" required autoComplete="name" /></label>}
      <label>Email address<input name="email" type="email" required autoComplete="email" /></label>
      <label>Password<input name="password" type="password" minLength="8" required autoComplete={isRegister ? 'new-password' : 'current-password'} /></label>
      {isRegister && <label>Your role<select name="role" defaultValue="BUYER">{ROLES.map(([value,label])=><option value={value} key={value}>{label}</option>)}</select></label>}
      {error && <p className="form-error" role="alert">{error}</p>}
      <button type="submit" disabled={submitting}>{submitting ? 'Securing access…' : isRegister ? 'Create workspace' : 'Enter workspace'} <span>↗</span></button>
      <p className="auth-switch">{isRegister ? 'Already a member?' : 'New to RealStateX?'} <Link to={isRegister ? ROUTES.LOGIN : ROUTES.REGISTER}>{isRegister ? 'Sign in' : 'Create an account'}</Link></p>
    </form>
  </main>;
}
