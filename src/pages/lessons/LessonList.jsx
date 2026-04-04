import { Link, useParams } from 'react-router-dom';
import { useLanguage } from '../../contexts/LanguageContext';
import { getCategoryBySlug } from '../../config/lessons';
import SEO from '../../components/SEO';
import PageHeader from '../../components/PageHeader';

const levelColors = {
  beginner: '#00855A',
  intermediate: '#C87200',
  advanced: '#C8102E',
};

export default function LessonList() {
  const { categorySlug } = useParams();
  const { language, t } = useLanguage();
  const category = getCategoryBySlug(categorySlug);

  if (!category) {
    return (
      <div className="lessons-page">
        <div className="container" style={{ textAlign: 'center', padding: '100px 20px' }}>
          <h2>{language === 'ko' ? '카테고리를 찾을 수 없습니다' : 'Category not found'}</h2>
          <Link to="/lessons" className="btn btn-primary btn-sm" style={{ marginTop: '20px' }}>
            {t('lessons.backToCategories')}
          </Link>
        </div>
      </div>
    );
  }

  const catName = language === 'ko' ? category.nameKo : category.nameEn;
  const catDesc = language === 'ko' ? category.descKo : category.descEn;

  return (
    <div className="lessons-page">
      <SEO
        title={catName}
        description={catDesc}
        path={`/lessons/${categorySlug}`}
      />
      <PageHeader
        icon={category.icon}
        title={catName}
        description={catDesc}
        breadcrumbs={[
          { label: t('nav.home'), to: '/' },
          { label: t('nav.lessons'), to: '/lessons' },
          { label: catName },
        ]}
      >
        <span
          className="lesson-level-badge"
          style={{ background: 'rgba(255,255,255,0.15)', color: '#fff', border: '1px solid rgba(255,255,255,0.2)' }}
        >
          {t(`lessons.${category.level}`)}
        </span>
      </PageHeader>
      <div className="container">
        <div className="lesson-list">
          {category.lessons.map((lesson, i) => (
            <Link
              key={lesson.slug}
              to={`/lessons/${categorySlug}/${lesson.slug}`}
              className="lesson-list-item"
            >
              <div className="lesson-list-number">{String(i + 1).padStart(2, '0')}</div>
              <div className="lesson-list-info">
                <h3>{language === 'ko' ? lesson.titleKo : lesson.titleEn}</h3>
                <span className="lesson-list-desc">{language === 'ko' ? lesson.descKo : lesson.descEn}</span>
              </div>
              <i className="fa-solid fa-chevron-right lesson-list-arrow" />
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
