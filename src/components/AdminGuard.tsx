import { Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

export default function AdminGuard({ children }) {
  const { isLoggedIn, isAdmin, loading } = useAuth();

  if (loading) {
    return (
      <div className="loading-page">
        <div className="loading-spinner" />
      </div>
    );
  }

  if (!isLoggedIn) return <Navigate to="/login" replace />;
  if (!isAdmin) return <Navigate to="/" replace />;

  return children;
}
