import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useLanguage } from '../contexts/LanguageContext';
import { LESSON_CATEGORIES } from '../config/lessons';
import SEO from '../components/SEO';

export default function Dashboard() {
  const { user, profile } = useAuth();
  const { language, t } = useLanguage();

  const displayName = profile?.display_name || user?.user_metadata?.full_name || user?.email?.split('@')[0] || '';

  return (
    <div className="dashboard-page">
      <SEO title={t('nav.dashboard')} path="/dashboard" noindex />
      <div className="container">
        <div className="dashboard-welcome">
          <h1>{displayName}{t('dashboard.welcome')}</h1>
          <p>{language === 'ko' ? 'AI 파인튜닝 학습을 시작하세요.' : 'Start learning AI fine-tuning.'}</p>
        </div>

        <div className="quick-access">
          <h2>{language === 'ko' ? '학습 카테고리' : 'Learning Categories'}</h2>
          <div className="quick-access-grid">
            {LESSON_CATEGORIES.map(cat => (
              <Link key={cat.slug} to={`/lessons/${cat.slug}`} className="quick-access-card">
                <div className="quick-access-icon"><i className={`fa-solid ${cat.icon}`} /></div>
                <span className="quick-access-label">{language === 'ko' ? cat.nameKo : cat.nameEn}</span>
              </Link>
            ))}
          </div>
        </div>

        <div className="dashboard-grid">
          <div className="dashboard-card">
            <h3><i className="fa-solid fa-book" />{t('dashboard.recentLessons')}</h3>
            <div className="dashboard-empty">
              <div className="dashboard-empty-icon"><i className="fa-solid fa-pen-to-square" /></div>
              <p>{t('dashboard.noRecent')}</p>
              <Link to="/lessons" className="btn btn-primary btn-sm" style={{ marginTop: '12px' }}>
                {t('nav.lessons')}
              </Link>
            </div>
          </div>

          <div className="dashboard-card">
            <h3><i className="fa-solid fa-chart-bar" />{t('dashboard.progress')}</h3>
            <div className="usage-stats-list">
              {LESSON_CATEGORIES.map(cat => (
                <div key={cat.slug} className="usage-stat-item">
                  <span className="usage-stat-label"><i className={`fa-solid ${cat.icon}`} /> {language === 'ko' ? cat.nameKo : cat.nameEn}</span>
                  <span className="usage-stat-value">0/{cat.lessons.length}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
