import { Link } from 'react-router-dom';
import { useLanguage } from '../../contexts/LanguageContext';

export default function Footer() {
  const { language, t } = useLanguage();

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-brand">
            <div className="footer-logo">
              <span className="brand-fine">Fine</span>
              <span className="brand-tuning">Tuning</span>
            </div>
            <p className="footer-description">{t('footer.description')}</p>
          </div>

          <div className="footer-links">
            <h4>{t('footer.quickLinks')}</h4>
            <ul className="footer-link-list">
              <li><Link to="/">{t('nav.home')}</Link></li>
              <li><Link to="/intro">{t('nav.intro')}</Link></li>
              <li><Link to="/lessons">{t('nav.lessons')}</Link></li>
              <li><Link to="/lessons/fundamentals">{t('nav.fundamentals')}</Link></li>
              <li><Link to="/lessons/sft">{t('nav.techniques')}</Link></li>
              <li><Link to="/lessons/huggingface">{t('nav.tools')}</Link></li>
              <li><Link to="/lessons/models">{t('nav.models')}</Link></li>
              <li><Link to="/lessons/projects">{t('nav.projects')}</Link></li>
              <li><Link to="/community/board">{t('nav.community')}</Link></li>
            </ul>
          </div>

          <div className="footer-contact">
            <h4>{language === 'ko' ? '연락처' : 'Contact'}</h4>
            <p className="footer-email">
              <i className="fa-solid fa-envelope" style={{ marginRight: '6px' }} />
              <a href="mailto:aebon@dreamitbiz.com">aebon@dreamitbiz.com</a>
            </p>
            <p>010-3700-0629</p>
            <p>{language === 'ko' ? '카카오톡' : 'KakaoTalk'}: aebon</p>
            <p className="business-hours">{language === 'ko' ? '평일 09:00 ~ 18:00' : 'Weekdays 09:00 ~ 18:00'}</p>

            <div className="footer-family">
              <select
                defaultValue=""
                onChange={(e) => {
                  if (e.target.value) window.open(e.target.value, '_blank');
                  e.target.value = '';
                }}
              >
                <option value="" disabled>Family Site</option>
                <option value="https://www.dreamitbiz.com">DreamIT Biz</option>
                <option value="https://edu-hub.dreamitbiz.com">Edu-Hub</option>
                <option value="https://teaching.dreamitbiz.com">Teaching AI</option>
                <option value="https://autowork.dreamitbiz.com">AutoWork</option>
              </select>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <p>&copy; {new Date().getFullYear()} {language === 'ko' ? '드림아이티비즈' : ''}(DreamIT Biz). All rights reserved.</p>
          <p className="footer-bottom-info">
            Designed by Ph.D Aebon Lee | {language === 'ko' ? '대표이사: 이애본 | 사업자등록번호: 601-45-20154 | 통신판매신고번호: 제2024-수원팔달-0584호 | 출판사 신고번호: 제2026-000026호' : 'CEO: Aebon Lee | Business Registration: 601-45-20154'}
          </p>
        </div>
      </div>
    </footer>
  );
}
