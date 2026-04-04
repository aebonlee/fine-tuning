import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

export default function AuthGuard({ children }) {
  const { isLoggedIn, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return (
      <div className="loading-page">
        <div className="loading-spinner" />
      </div>
    );
  }

  if (!isLoggedIn) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
}
