import { Link } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';
import { LESSON_CATEGORIES, MENU_GROUPS, getCategoriesByGroup, getTotalLessonCount } from '../config/lessons';
import HeroCarousel from '../components/HeroCarousel';
import SEO from '../components/SEO';

const levelColors = {
  beginner: '#00855A',
  intermediate: '#C87200',
  advanced: '#C8102E',
};

const HIGHLIGHTS = [
  {
    icon: 'fa-layer-group',
    titleKo: '체계적 커리큘럼',
    titleEn: 'Structured Curriculum',
    descKo: '기초 이론부터 LoRA, RLHF, 모델 배포까지 단계별로 설계된 학습 경로를 제공합니다.',
    descEn: 'Step-by-step learning paths from fundamentals to LoRA, RLHF, and model deployment.',
  },
  {
    icon: 'fa-code',
    titleKo: '실전 중심 학습',
    titleEn: 'Practice-Oriented',
    descKo: '이론과 함께 실습 코드와 예제를 통해 바로 파인튜닝을 적용할 수 있습니다.',
    descEn: 'Apply fine-tuning directly with hands-on code examples alongside theory.',
  },
  {
    icon: 'fa-microchip',
    titleKo: '최신 AI 기술',
    titleEn: 'Latest AI Technology',
    descKo: 'HuggingFace, Unsloth, QLoRA 등 최신 파인튜닝 기술을 학습합니다.',
    descEn: 'Learn HuggingFace, Unsloth, QLoRA and the latest fine-tuning technologies.',
  },
];

const PATH_STEPS = [
  { icon: 'fa-brain', labelKo: 'AI/ML 기초', labelEn: 'AI/ML Fundamentals', descKo: '머신러닝, 딥러닝, 트랜스포머', descEn: 'ML, Deep Learning, Transformers' },
  { icon: 'fa-database', labelKo: '데이터 준비', labelEn: 'Data Preparation', descKo: '수집, 정제, 토크나이제이션', descEn: 'Collection, Cleaning, Tokenization' },
  { icon: 'fa-sliders', labelKo: '파인튜닝 기법', labelEn: 'Fine-tuning Techniques', descKo: 'LoRA, QLoRA, RLHF, DPO', descEn: 'LoRA, QLoRA, RLHF, DPO' },
  { icon: 'fa-rocket', labelKo: '평가 & 배포', labelEn: 'Evaluation & Deployment', descKo: '벤치마크, vLLM, API 서버', descEn: 'Benchmarks, vLLM, API Server' },
];

export default function Home() {
  const { language, t } = useLanguage();
  const totalLessons = getTotalLessonCount();
  const totalCategories = LESSON_CATEGORIES.length;

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'FineTuning',
    url: 'https://finetuning.dreamitbiz.com',
    description: language === 'ko'
      ? '데이터 준비부터 LoRA, RLHF, 모델 배포까지 AI 파인튜닝을 위한 체계적인 학습 플랫폼'
      : 'Structured learning platform for AI fine-tuning from data preparation to LoRA, RLHF, and model deployment',
    publisher: {
      '@type': 'Organization',
      name: 'DreamIT Biz',
      url: 'https://finetuning.dreamitbiz.com',
    },
  };

  return (
    <>
      <SEO
        path="/"
        description={language === 'ko'
          ? '데이터 준비부터 LoRA, RLHF, 모델 배포까지 AI 파인튜닝을 위한 체계적인 학습 플랫폼'
          : 'Structured learning platform for AI fine-tuning from data preparation to LoRA, RLHF, and model deployment'}
        jsonLd={jsonLd}
      />
      <HeroCarousel />

      {/* Highlights */}
      <section className="home-highlights">
        <div className="container">
          <div className="section-header">
            <span className="section-badge">
              <i className="fa-solid fa-sparkles" />
              FineTuning
            </span>
            <h2 className="section-title">
              {language === 'ko' ? '왜 FineTuning인가요?' : 'Why Choose FineTuning?'}
            </h2>
            <p className="section-subtitle">
              {language === 'ko'
                ? 'AI 파인튜닝을 위한 가장 체계적인 학습 플랫폼'
                : 'The most structured learning platform for AI fine-tuning'}
            </p>
          </div>
          <div className="home-highlights-grid">
            {HIGHLIGHTS.map((h, i) => (
              <div key={i} className="home-hl-card">
                <div className="home-hl-icon">
                  <i className={`fa-solid ${h.icon}`} />
                </div>
                <h3>{language === 'ko' ? h.titleKo : h.titleEn}</h3>
                <p>{language === 'ko' ? h.descKo : h.descEn}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Learning Path */}
      <section className="home-path">
        <div className="container">
          <div className="section-header">
            <span className="section-badge">
              <i className="fa-solid fa-route" />
              {language === 'ko' ? '학습 경로' : 'Learning Path'}
            </span>
            <h2 className="section-title">
              {language === 'ko' ? '단계별 학습 로드맵' : 'Step-by-Step Roadmap'}
            </h2>
          </div>
          <div className="home-path-flow">
            {PATH_STEPS.map((step, i) => (
              <div key={i} className="home-path-step">
                <div className="home-path-num">{String(i + 1).padStart(2, '0')}</div>
                <div className="home-path-icon">
                  <i className={`fa-solid ${step.icon}`} />
                </div>
                <h4>{language === 'ko' ? step.labelKo : step.labelEn}</h4>
                <p>{language === 'ko' ? step.descKo : step.descEn}</p>
                {i < PATH_STEPS.length - 1 && <div className="home-path-connector" />}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Curriculum */}
      <section className="home-curriculum">
        <div className="container">
          <div className="section-header">
            <span className="section-badge">
              <i className="fa-solid fa-book-open" />
              {language === 'ko' ? '커리큘럼' : 'Curriculum'}
            </span>
            <h2 className="section-title">{t('features.title')}</h2>
            <p className="section-subtitle">{t('features.subtitle')}</p>
          </div>

          {MENU_GROUPS.map(group => {
            const categories = getCategoriesByGroup(group.id);
            const lessonCount = categories.reduce((s, c) => s + c.lessons.length, 0);
            return (
              <div key={group.id} className="home-cur-group">
                <h3 className="home-cur-group-title">
                  <i className={`fa-solid ${group.icon}`} />
                  <span>{language === 'ko' ? group.nameKo : group.nameEn}</span>
                  <span className="home-cur-group-count">{lessonCount} {t('lessons.lessonsCount')}</span>
                </h3>
                <div className="home-cur-grid">
                  {categories.map(cat => (
                    <Link key={cat.slug} to={`/lessons/${cat.slug}`} className="home-cur-card">
                      <div className="home-cur-card-icon">
                        <i className={`fa-solid ${cat.icon}`} />
                      </div>
                      <div className="home-cur-card-body">
                        <h4>{language === 'ko' ? cat.nameKo : cat.nameEn}</h4>
                        <p>{language === 'ko' ? cat.descKo : cat.descEn}</p>
                        <div className="home-cur-card-meta">
                          <span className="home-cur-level" style={{ background: `${levelColors[cat.level]}14`, color: levelColors[cat.level] }}>
                            {t(`lessons.${cat.level}`)}
                          </span>
                          <span className="home-cur-count">{cat.lessons.length} {t('lessons.lessonsCount')}</span>
                        </div>
                      </div>
                      <i className="fa-solid fa-arrow-right home-cur-arrow" />
                    </Link>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Stats */}
      <section className="home-stats">
        <div className="container">
          <div className="home-stats-grid">
            <div className="home-stat">
              <div className="home-stat-num">{totalCategories}</div>
              <div className="home-stat-label">{t('stats.categories')}</div>
            </div>
            <div className="home-stat">
              <div className="home-stat-num">{totalLessons}</div>
              <div className="home-stat-label">{t('stats.lessons')}</div>
            </div>
            <div className="home-stat">
              <div className="home-stat-num">5</div>
              <div className="home-stat-label">{t('stats.themes')}</div>
            </div>
            <div className="home-stat">
              <div className="home-stat-num">2</div>
              <div className="home-stat-label">{t('stats.languages')}</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="home-cta">
        <div className="container">
          <div className="home-cta-inner">
            <div className="home-cta-deco home-cta-deco-1" />
            <div className="home-cta-deco home-cta-deco-2" />
            <h2>{t('cta.title')}</h2>
            <p>{t('cta.description')}</p>
            <div className="home-cta-buttons">
              <Link to="/lessons" className="btn btn-primary btn-lg">{t('cta.button')}</Link>
              <Link to="/intro" className="btn btn-secondary btn-lg">{t('hero.ctaSecondary')}</Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
