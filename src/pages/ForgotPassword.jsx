import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';
import { useToast } from '../contexts/ToastContext';
import { resetPassword } from '../utils/auth';

export default function ForgotPassword() {
  const { t, language } = useLanguage();
  const toast = useToast();
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    const { error } = await resetPassword(email);
    setLoading(false);
    if (error) { toast.error(error.message); return; }
    setSent(true);
    toast.success('Reset link sent to your email.');
  }

  return (
    <div className="auth-page">
      <div className="auth-container">
        <div className="auth-card">
          <div className="auth-header">
            <div className="auth-logo"><span style={{ color: 'var(--primary-blue)' }}>Fine</span>Tuning</div>
            <h1 className="auth-title">{t('auth.forgotTitle')}</h1>
            <p className="auth-subtitle">{t('auth.forgotSubtitle')}</p>
          </div>

          {sent ? (
            <div style={{ textAlign: 'center', padding: '20px 0' }}>
              <p style={{ fontSize: '48px', marginBottom: '16px' }}><i className="fa-solid fa-envelope" /></p>
              <p style={{ color: 'var(--text-secondary)', marginBottom: '24px' }}>
                {language === 'ko' ? `${email} 으로 재설정 링크를 발송했습니다.` : `Reset link sent to ${email}.`}
              </p>
              <Link to="/login" className="btn btn-primary" style={{ width: '100%' }}>
                {t('auth.loginBtn')}
              </Link>
            </div>
          ) : (
            <form className="auth-form" onSubmit={handleSubmit}>
              <input className="form-input" type="email" placeholder={t('auth.email')} value={email} onChange={e => setEmail(e.target.value)} required />
              <button type="submit" className="auth-submit-btn" disabled={loading}>
                {loading ? '...' : t('auth.resetBtn')}
              </button>
            </form>
          )}

          <div className="auth-footer">
            <Link to="/login">{t('auth.loginBtn')}</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
