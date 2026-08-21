import { AppRouter } from '@routes/AppRouter.jsx';
import { AuthProvider } from './auth/AuthContext.jsx';

export default function App() {
  return <AuthProvider><AppRouter /></AuthProvider>;
}
