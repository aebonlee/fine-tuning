import { Link } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';
import SEO from '../components/SEO';

export default function NotFound() {
  const { language } = useLanguage();

  return (
    <div className="not-found-page">
      <SEO title="404" noindex />
      <div className="not-found-content">
        <div className="not-found-code">404</div>
        <div className="not-found-title">
          {language === 'ko' ? '페이지를 찾을 수 없습니다' : 'Page Not Found'}
        </div>
        <div className="not-found-desc">
          {language === 'ko'
            ? '요청하신 페이지가 존재하지 않거나 이동되었습니다.'
            : 'The page you requested does not exist or has been moved.'}
        </div>
        <div className="not-found-actions">
          <Link to="/" className="btn btn-primary btn-sm">
            {language === 'ko' ? '홈으로 이동' : 'Go Home'}
          </Link>
        </div>
      </div>
    </div>
  );
}
