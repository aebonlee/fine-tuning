import { useState, useEffect, useRef, useCallback } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useTheme } from '../../contexts/ThemeContext';
import { useLanguage } from '../../contexts/LanguageContext';
import { useAuth } from '../../contexts/AuthContext';
import { MENU_GROUPS, getCategoriesByGroup } from '../../config/lessons';

export default function Navbar() {
  const { mode, toggleTheme, colorTheme, setColorTheme, COLOR_OPTIONS } = useTheme();
  const { language, toggleLanguage, t } = useLanguage();
  const { isLoggedIn, isAdmin, user, profile, signOut } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showColorPicker, setShowColorPicker] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [mobileAccordion, setMobileAccordion] = useState(null);
  const colorPickerRef = useRef(null);
  const userMenuRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
    setMobileAccordion(null);
  }, [location.pathname]);

  useEffect(() => {
    document.body.style.overflow = isMobileMenuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [isMobileMenuOpen]);

  useEffect(() => {
    function handleClickOutside(e) {
      if (colorPickerRef.current && !colorPickerRef.current.contains(e.target)) setShowColorPicker(false);
      if (userMenuRef.current && !userMenuRef.current.contains(e.target)) setShowUserMenu(false);
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Keyboard: Escape closes dropdowns and mobile menu
  const handleKeyDown = useCallback((e) => {
    if (e.key === 'Escape') {
      if (showColorPicker) setShowColorPicker(false);
      else if (showUserMenu) setShowUserMenu(false);
      else if (isMobileMenuOpen) setIsMobileMenuOpen(false);
    }
  }, [showColorPicker, showUserMenu, isMobileMenuOpen]);

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  const themeLabel = mode === 'auto' ? (language === 'ko' ? '자동 테마' : 'Auto theme') : mode === 'light' ? (language === 'ko' ? '라이트 모드' : 'Light mode') : (language === 'ko' ? '다크 모드' : 'Dark mode');
  const themeIcon = mode === 'auto' ? '\u25D1' : mode === 'light' ? '\u2600' : '\uD83C\uDF19';
  const displayName = profile?.display_name || user?.user_metadata?.full_name || user?.email?.split('@')[0] || '';
  const avatarLetter = displayName.charAt(0).toUpperCase();

  async function handleSignOut() {
    await signOut();
    navigate('/');
  }

  function isGroupActive(groupId) {
    const categories = getCategoriesByGroup(groupId);
    return categories.some(cat => location.pathname === `/lessons/${cat.slug}` || location.pathname.startsWith(`/lessons/${cat.slug}/`));
  }

  function toggleMobileAccordion(id) {
    setMobileAccordion(prev => prev === id ? null : id);
  }

  const menuItems = [
    { to: '/intro', label: t('nav.intro'), isActive: location.pathname === '/intro' },
    { to: '/lessons/fundamentals', label: t('nav.fundamentals'), isActive: isGroupActive('basics') },
    { to: '/lessons/data-preparation', label: t('nav.data'), isActive: isGroupActive('data') },
    { to: '/lessons/sft', label: t('nav.techniques'), isActive: isGroupActive('techniques') },
    { to: '/lessons/huggingface', label: t('nav.tools'), isActive: isGroupActive('tools') },
    { to: '/lessons/models', label: t('nav.models'), isActive: isGroupActive('models') },
    { to: '/community/board', label: t('nav.community'), isActive: location.pathname.startsWith('/community') },
  ];

  return (
    <>
      {/* Skip to content link */}
      <a href="#main-content" className="skip-to-content">
        {language === 'ko' ? '본문으로 건너뛰기' : 'Skip to content'}
      </a>

      <nav className={`navbar ${isScrolled ? 'scrolled' : ''}`} role="navigation" aria-label={language === 'ko' ? '메인 네비게이션' : 'Main navigation'}>
        <div className="navbar-inner">
          <Link to="/" className="navbar-logo" aria-label="FineTuning Home">
            <span className="logo-fine">Fine</span>
            <span className="logo-tuning">Tuning</span>
          </Link>

          <ul className="nav-links" role="menubar">
            {menuItems.map(item => (
              <li key={item.to} className="nav-item" role="none">
                <Link to={item.to} className={`nav-link ${item.isActive ? 'active' : ''}`} role="menuitem">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>

          <div className="navbar-actions">
            <div className="color-picker-wrapper" ref={colorPickerRef}>
              <button
                className="color-picker-btn"
                onClick={() => setShowColorPicker(!showColorPicker)}
                aria-label={language === 'ko' ? '색상 테마 선택' : 'Color theme picker'}
                aria-expanded={showColorPicker}
                aria-haspopup="true"
              >
                <div className="color-dot-preview" style={{ background: COLOR_OPTIONS.find(c => c.name === colorTheme)?.color }} />
              </button>
              <div className={`color-picker-dropdown ${showColorPicker ? 'show' : ''}`} role="listbox" aria-label={language === 'ko' ? '색상 테마' : 'Color themes'}>
                {COLOR_OPTIONS.map(opt => (
                  <button
                    key={opt.name}
                    className={`color-option ${colorTheme === opt.name ? 'active' : ''}`}
                    style={{ background: opt.color }}
                    onClick={() => { setColorTheme(opt.name); setShowColorPicker(false); }}
                    role="option"
                    aria-selected={colorTheme === opt.name}
                    aria-label={opt.name}
                  />
                ))}
              </div>
            </div>

            <button className="theme-toggle" onClick={toggleTheme} aria-label={themeLabel}>
              {themeIcon}
            </button>

            <button className="lang-toggle" onClick={toggleLanguage} aria-label={language === 'ko' ? 'Switch to English' : '한국어로 전환'}>
              {language === 'ko' ? 'EN' : 'KO'}
            </button>

            {isLoggedIn ? (
              <div className="user-menu-wrapper" ref={userMenuRef}>
                <button
                  className="user-avatar-btn"
                  onClick={() => setShowUserMenu(!showUserMenu)}
                  aria-label={language === 'ko' ? '사용자 메뉴' : 'User menu'}
                  aria-expanded={showUserMenu}
                  aria-haspopup="true"
                >
                  {profile?.avatar_url ? <img src={profile.avatar_url} alt={displayName} loading="lazy" /> : avatarLetter}
                </button>
                <div className={`user-menu-dropdown ${showUserMenu ? 'show' : ''}`} role="menu">
                  <div className="user-menu-header">
                    <div className="user-menu-name">{displayName}</div>
                    <div className="user-menu-email">{user?.email}</div>
                  </div>
                  <Link to="/dashboard" className="user-menu-item" role="menuitem" onClick={() => setShowUserMenu(false)}>
                    <i className="fa-solid fa-chart-pie" aria-hidden="true" /> {t('nav.dashboard')}
                  </Link>
                  <Link to="/settings" className="user-menu-item" role="menuitem" onClick={() => setShowUserMenu(false)}>
                    <i className="fa-solid fa-gear" aria-hidden="true" /> {t('nav.settings')}
                  </Link>
                  {isAdmin && (
                    <Link to="/admin" className="user-menu-item" role="menuitem" onClick={() => setShowUserMenu(false)}>
                      <i className="fa-solid fa-shield-halved" aria-hidden="true" /> {t('nav.admin')}
                    </Link>
                  )}
                  <button className="user-menu-item danger" role="menuitem" onClick={handleSignOut}>
                    <i className="fa-solid fa-right-from-bracket" aria-hidden="true" /> {t('nav.logout')}
                  </button>
                </div>
              </div>
            ) : (
              <Link to="/login" className="nav-auth-btn nav-login-btn">
                {t('nav.login')}
              </Link>
            )}

            <button
              className={`mobile-menu-toggle ${isMobileMenuOpen ? 'open' : ''}`}
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label={isMobileMenuOpen ? (language === 'ko' ? '메뉴 닫기' : 'Close menu') : (language === 'ko' ? '메뉴 열기' : 'Open menu')}
              aria-expanded={isMobileMenuOpen}
              aria-controls="mobile-menu"
            >
              <span /><span /><span />
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div id="mobile-menu" className={`mobile-menu ${isMobileMenuOpen ? 'open' : ''}`} role="dialog" aria-modal="true" aria-label={language === 'ko' ? '모바일 메뉴' : 'Mobile menu'}>
        <ul className="mobile-nav-links" role="menu">
          <li role="none">
            <Link
              to="/intro"
              className={`mobile-nav-link ${location.pathname === '/intro' ? 'active' : ''}`}
              role="menuitem"
            >
              <i className="fa-solid fa-info-circle mobile-nav-icon" aria-hidden="true" />
              <span>{t('nav.intro')}</span>
            </Link>
          </li>

          {MENU_GROUPS.map(group => {
            const categories = getCategoriesByGroup(group.id);
            const isOpen = mobileAccordion === group.id;
            const isActive = isGroupActive(group.id);

            return (
              <li key={group.id} role="none">
                <button
                  className={`mobile-nav-link mobile-accordion-btn ${isActive ? 'active' : ''}`}
                  onClick={() => toggleMobileAccordion(group.id)}
                  role="menuitem"
                  aria-expanded={isOpen}
                >
                  <i className={`fa-solid ${group.icon} mobile-nav-icon`} aria-hidden="true" />
                  <span>{language === 'ko' ? group.nameKo : group.nameEn}</span>
                  <i className={`fa-solid fa-chevron-down mobile-accordion-arrow ${isOpen ? 'open' : ''}`} aria-hidden="true" />
                </button>
                {isOpen && (
                  <ul className="mobile-sub-menu" role="menu">
                    {categories.map(cat => (
                      <li key={cat.slug} role="none">
                        <Link
                          to={`/lessons/${cat.slug}`}
                          className={`mobile-sub-link ${(location.pathname === `/lessons/${cat.slug}` || location.pathname.startsWith(`/lessons/${cat.slug}/`)) ? 'active' : ''}`}
                          role="menuitem"
                        >
                          <i className={`fa-solid ${cat.icon}`} aria-hidden="true" />
                          <span>{language === 'ko' ? cat.nameKo : cat.nameEn}</span>
                          <span className="mobile-sub-count">{cat.lessons.length}</span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            );
          })}

          <li role="none">
            <Link
              to="/community/board"
              className={`mobile-nav-link ${location.pathname.startsWith('/community') ? 'active' : ''}`}
              role="menuitem"
            >
              <i className="fa-solid fa-users mobile-nav-icon" aria-hidden="true" />
              <span>{t('nav.community')}</span>
            </Link>
          </li>

          {isLoggedIn && (
            <>
              <li className="mobile-nav-divider" role="separator" />
              <li role="none">
                <Link to="/dashboard" className="mobile-nav-link" role="menuitem">
                  <i className="fa-solid fa-chart-pie mobile-nav-icon" aria-hidden="true" />
                  <span>{t('nav.dashboard')}</span>
                </Link>
              </li>
              <li role="none">
                <Link to="/settings" className="mobile-nav-link" role="menuitem">
                  <i className="fa-solid fa-gear mobile-nav-icon" aria-hidden="true" />
                  <span>{t('nav.settings')}</span>
                </Link>
              </li>
            </>
          )}
        </ul>

        <div className="mobile-menu-controls">
          <button className="mobile-ctrl-btn" onClick={toggleTheme} aria-label={themeLabel}>
            {themeIcon}
          </button>
          <button className="mobile-ctrl-btn" onClick={toggleLanguage} aria-label={language === 'ko' ? 'Switch to English' : '한국어로 전환'}>
            {language === 'ko' ? 'EN' : 'KO'}
          </button>
          <div className="mobile-color-row" role="radiogroup" aria-label={language === 'ko' ? '색상 테마' : 'Color theme'}>
            {COLOR_OPTIONS.map(opt => (
              <button
                key={opt.name}
                className={`mobile-color-dot ${colorTheme === opt.name ? 'active' : ''}`}
                style={{ background: opt.color }}
                onClick={() => setColorTheme(opt.name)}
                role="radio"
                aria-checked={colorTheme === opt.name}
                aria-label={opt.name}
              />
            ))}
          </div>
        </div>

        <div className="mobile-menu-actions">
          {isLoggedIn ? (
            <button className="btn btn-primary btn-sm" style={{ width: '100%' }} onClick={handleSignOut}>
              {t('nav.logout')}
            </button>
          ) : (
            <>
              <Link to="/login" className="btn btn-primary btn-sm" style={{ width: '100%', textAlign: 'center' }}>
                {t('nav.login')}
              </Link>
              <Link to="/register" className="btn btn-secondary btn-sm" style={{ width: '100%', textAlign: 'center' }}>
                {t('nav.register')}
              </Link>
            </>
          )}
        </div>
      </div>
    </>
  );
}
