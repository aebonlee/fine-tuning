import { useState } from 'react';
import { Link, useNavigate, Navigate } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';
import { useAuth } from '../contexts/AuthContext';
import { useToast } from '../contexts/ToastContext';
import { signUpWithEmail, signInWithGoogle, signInWithKakao } from '../utils/auth';

export default function Register() {
  const { t } = useLanguage();
  const { isLoggedIn } = useAuth();
  const toast = useToast();
  const navigate = useNavigate();

  const [form, setForm] = useState({ name: '', email: '', password: '', confirmPassword: '' });
  const [loading, setLoading] = useState(false);

  // Redirect if already authenticated
  if (isLoggedIn) return <Navigate to="/dashboard" replace />;

  const update = (field, value) => setForm(prev => ({ ...prev, [field]: value }));

  async function handleSubmit(e) {
    e.preventDefault();
    if (form.password !== form.confirmPassword) {
      toast.error(t('auth.passwordMismatch'));
      return;
    }
    if (form.password.length < 6) {
      toast.error(t('auth.passwordTooShort'));
      return;
    }
    setLoading(true);
    const { error } = await signUpWithEmail(form.email, form.password, { full_name: form.name.trim().slice(0, 50) });
    setLoading(false);
    if (error) { toast.error(error.message); return; }
    toast.success(t('auth.checkEmail'));
    navigate('/login');
  }

  return (
    <div className="auth-page">
      <div className="auth-container">
        <div className="auth-card">
          <div className="auth-header">
            <div className="auth-logo"><span style={{ color: 'var(--primary-blue)' }}>Fine</span>Tuning</div>
            <h1 className="auth-title">{t('auth.registerTitle')}</h1>
            <p className="auth-subtitle">{t('auth.registerSubtitle')}</p>
          </div>

          <div className="social-login-group">
            <button className="social-btn social-btn-google" onClick={signInWithGoogle}>
              <svg width="20" height="20" viewBox="0 0 24 24" aria-hidden="true"><path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z"/><path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/><path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/><path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/></svg>
              {t('auth.google')}
            </button>
            <button className="social-btn social-btn-kakao" onClick={signInWithKakao}><i className="fa-solid fa-comment" aria-hidden="true" />{t('auth.kakao')}</button>
          </div>

          <div className="auth-divider">{t('auth.orContinueWith')}</div>

          <form className="auth-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="register-name" className="sr-only">{t('auth.name')}</label>
              <input id="register-name" className="form-input" type="text" placeholder={t('auth.name')} value={form.name} onChange={e => update('name', e.target.value)} required maxLength={50} autoComplete="name" />
            </div>
            <div className="form-group">
              <label htmlFor="register-email" className="sr-only">{t('auth.email')}</label>
              <input id="register-email" className="form-input" type="email" placeholder={t('auth.email')} value={form.email} onChange={e => update('email', e.target.value)} required autoComplete="email" />
            </div>
            <div className="form-group">
              <label htmlFor="register-password" className="sr-only">{t('auth.password')}</label>
              <input id="register-password" className="form-input" type="password" placeholder={t('auth.password')} value={form.password} onChange={e => update('password', e.target.value)} required minLength={6} autoComplete="new-password" />
            </div>
            <div className="form-group">
              <label htmlFor="register-confirm" className="sr-only">{t('auth.confirmPassword')}</label>
              <input id="register-confirm" className="form-input" type="password" placeholder={t('auth.confirmPassword')} value={form.confirmPassword} onChange={e => update('confirmPassword', e.target.value)} required autoComplete="new-password" />
            </div>
            <button type="submit" className="auth-submit-btn" disabled={loading}>
              {loading ? <span className="loading-spinner" style={{ width: 20, height: 20, borderWidth: 2 }} /> : t('auth.registerBtn')}
            </button>
          </form>

          <div className="auth-footer">
            {t('auth.hasAccount')} <Link to="/login">{t('auth.loginBtn')}</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
