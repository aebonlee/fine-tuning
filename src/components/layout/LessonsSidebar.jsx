import { useState, useEffect, useMemo } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useLanguage } from '../../contexts/LanguageContext';
import { MENU_GROUPS, getCategoriesByGroup } from '../../config/lessons';

export default function LessonsSidebar({ isOpen, onClose, toc = [] }) {
  const location = useLocation();
  const { language } = useLanguage();

  const match = location.pathname.match(/^\/lessons\/([^/]+)(?:\/([^/]+))?/);
  const activeCategorySlug = match?.[1];
  const activeLessonSlug = match?.[2];

  const activeGroup = useMemo(() => {
    if (activeCategorySlug) {
      return MENU_GROUPS.find(g => g.categorySlugs.includes(activeCategorySlug)) || MENU_GROUPS[0];
    }
    return MENU_GROUPS[0];
  }, [activeCategorySlug]);

  const categories = useMemo(() => {
    return getCategoriesByGroup(activeGroup.id);
  }, [activeGroup]);

  const [expanded, setExpanded] = useState({});
  const [tocExpanded, setTocExpanded] = useState(true);

  useEffect(() => {
    const newExpanded = {};
    if (activeCategorySlug && activeGroup.categorySlugs.includes(activeCategorySlug)) {
      newExpanded[activeCategorySlug] = true;
    } else if (categories.length > 0) {
      newExpanded[categories[0].slug] = true;
    }
    setExpanded(newExpanded);
  }, [activeGroup, activeCategorySlug, categories]);

  function toggleCategory(slug) {
    setExpanded(prev => ({ ...prev, [slug]: !prev[slug] }));
  }

  return (
    <aside className={`ck-sidebar ${isOpen ? 'ck-sidebar--open' : ''}`}>
      <div className="ck-sidebar-header">
        <h3>
          <i className={`fa-solid ${activeGroup.icon}`} />
          {language === 'ko' ? activeGroup.nameKo : activeGroup.nameEn}
        </h3>
      </div>
      <nav className="ck-sidebar-nav">
        {categories.map(cat => {
          const isExpanded = expanded[cat.slug];
          const isCatActive = activeCategorySlug === cat.slug;

          return (
            <div key={cat.slug} className="ck-nav-group">
              <button
                className={`ck-nav-parent ${isCatActive && !activeLessonSlug ? 'ck-nav--active' : ''}`}
                onClick={() => toggleCategory(cat.slug)}
              >
                <i className={`fa-solid ${cat.icon}`} />
                <span>{language === 'ko' ? cat.nameKo : cat.nameEn}</span>
                <i className={`fa-solid fa-chevron-${isExpanded ? 'up' : 'down'} ck-nav-arrow`} />
              </button>
              {isExpanded && (
                <div className="ck-nav-children">
                  {cat.lessons.map(lesson => {
                    const isActive = isCatActive && activeLessonSlug === lesson.slug;
                    return (
                      <div key={lesson.slug}>
                        <Link
                          to={`/lessons/${cat.slug}/${lesson.slug}`}
                          className={`ck-nav-child ${isActive ? 'ck-nav--active' : ''}`}
                          onClick={onClose}
                        >
                          <span>{language === 'ko' ? lesson.titleKo : lesson.titleEn}</span>
                        </Link>
                        {isActive && toc.length > 0 && (
                          <div className="ck-toc-section">
                            <button className="ck-toc-toggle" onClick={() => setTocExpanded(prev => !prev)}>
                              <i className="fa-solid fa-list-ul" />
                              <span>{language === 'ko' ? '목차' : 'Contents'}</span>
                              <i className={`fa-solid fa-chevron-${tocExpanded ? 'up' : 'down'} ck-nav-arrow`} />
                            </button>
                            {tocExpanded && (
                              <div className="ck-toc-items">
                                {toc.map((h, i) => (
                                  <a
                                    key={i}
                                    href={`#${h.id}`}
                                    className={`ck-toc-item ck-toc-level-${h.level}`}
                                    onClick={onClose}
                                  >
                                    {h.text}
                                  </a>
                                ))}
                              </div>
                            )}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </nav>
    </aside>
  );
}
