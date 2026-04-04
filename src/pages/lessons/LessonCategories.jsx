import { Link, useSearchParams } from 'react-router-dom';
import { useLanguage } from '../../contexts/LanguageContext';
import { LESSON_CATEGORIES, MENU_GROUPS, getCategoriesByGroup } from '../../config/lessons';
import SEO from '../../components/SEO';
import PageHeader from '../../components/PageHeader';

const levelColors = {
  beginner: '#00855A',
  intermediate: '#C87200',
  advanced: '#C8102E',
};

export default function LessonCategories() {
  const { language, t } = useLanguage();
  const [searchParams] = useSearchParams();
  const groupParam = searchParams.get('group');

  const groups = groupParam
    ? MENU_GROUPS.filter(g => g.id === groupParam)
    : MENU_GROUPS;

  return (
    <div className="lessons-page">
      <SEO
        title={language === 'ko' ? '학습 카테고리' : 'Learning Categories'}
        description={language === 'ko'
          ? '12개 카테고리의 AI 파인튜닝 학습 콘텐츠를 확인하세요.'
          : 'Browse 12 categories of AI fine-tuning learning content.'}
        path="/lessons"
      />
      <PageHeader
        icon="fa-graduation-cap"
        title={t('lessons.title')}
        description={t('lessons.desc')}
        breadcrumbs={[
          { label: t('nav.home'), to: '/' },
          { label: t('nav.lessons') },
        ]}
      />
      <div className="container">
        {groups.map(group => {
          const categories = getCategoriesByGroup(group.id);

          return (
            <div key={group.id} className="category-group">
              <h3 className="category-group-title">
                <i className={`fa-solid ${group.icon}`} />
                {language === 'ko' ? group.nameKo : group.nameEn}
              </h3>

              {categories.map(cat => (
                <div key={cat.slug} className="category-lesson-section">
                  <div className="category-section-header">
                    <Link to={`/lessons/${cat.slug}`} className="category-section-name">
                      <i className={`fa-solid ${cat.icon}`} />
                      <span>{language === 'ko' ? cat.nameKo : cat.nameEn}</span>
                      <span
                        className="lesson-level-badge"
                        style={{ background: `${levelColors[cat.level]}15`, color: levelColors[cat.level] }}
                      >
                        {t(`lessons.${cat.level}`)}
                      </span>
                    </Link>
                  </div>
                  <div className="category-lessons-list">
                    {cat.lessons.map((lesson, i) => (
                      <Link
                        key={lesson.slug}
                        to={`/lessons/${cat.slug}/${lesson.slug}`}
                        className="category-lesson-item"
                      >
                        <span className="category-lesson-num">{String(i + 1).padStart(2, '0')}</span>
                        <span className="category-lesson-title">{language === 'ko' ? lesson.titleKo : lesson.titleEn}</span>
                        <span className="category-lesson-desc">{language === 'ko' ? lesson.descKo : lesson.descEn}</span>
                      </Link>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          );
        })}
      </div>
    </div>
  );
}
