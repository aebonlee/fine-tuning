import React, { useState, useMemo, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../../contexts/LanguageContext';
import { LESSON_CATEGORIES } from '../../config/lessons';
import SEO from '../../components/SEO';
import '../../styles/intro-page.css';

const MENU = [
  {
    id: 'info', icon: 'fa-compass', labelKo: '사이트 안내', labelEn: 'Site Info', color: 'blue',
    children: [
      { id: 'about', icon: 'fa-info-circle', labelKo: 'FineTuning 소개', labelEn: 'About FineTuning' },
      { id: 'guide', icon: 'fa-book-open', labelKo: '사용가이드', labelEn: 'User Guide' },
    ],
  },
  {
    id: 'roadmap', icon: 'fa-route', labelKo: '학습 로드맵', labelEn: 'Learning Roadmap', color: 'green',
    children: [],
  },
  {
    id: 'tools', icon: 'fa-wrench', labelKo: '도구 소개', labelEn: 'Tool Intro', color: 'purple',
    children: [],
  },
];

function AboutSection({ t }) {
  const features = [
    { icon: 'fa-layer-group', titleKey: 'feature1Title', descKey: 'feature1Desc', color: '#1B3A6B' },
    { icon: 'fa-book-open', titleKey: 'feature2Title', descKey: 'feature2Desc', color: '#00855A' },
    { icon: 'fa-toolbox', titleKey: 'feature3Title', descKey: 'feature3Desc', color: '#8B1AC8' },
    { icon: 'fa-globe', titleKey: 'feature4Title', descKey: 'feature4Desc', color: '#C87200' },
  ];

  return (
    <>
      <div className="ck-content-box">
        <div className="ck-content-header ck-ch--blue">
          <i className="fa-solid fa-info-circle" />
          <div className="ck-ch-text">
            <h2>{t('intro.aboutTitle')}</h2>
            <p>{t('intro.aboutSubtitle')}</p>
          </div>
        </div>
        <div className="ck-content-body">
          <div className="intro-features-grid">
            {features.map((f, i) => (
              <div key={i} className="intro-feature-card">
                <div className="intro-feature-icon" style={{ background: `${f.color}12`, color: f.color }}>
                  <i className={`fa-solid ${f.icon}`} />
                </div>
                <h3>{t(`intro.${f.titleKey}`)}</h3>
                <p>{t(`intro.${f.descKey}`)}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="ck-content-box">
        <div className="ck-content-header">
          <i className="fa-solid fa-link" />
          <h2>{t('intro.aboutTitle').includes('소개') ? '바로가기' : 'Quick Links'}</h2>
        </div>
        <div className="ck-content-body">
          <div className="intro-links-grid">
            <Link to="/lessons" className="intro-link-card">
              <i className="fa-solid fa-book" />
              <span>{t('nav.lessons')}</span>
            </Link>
            <Link to="/lessons/fundamentals" className="intro-link-card">
              <i className="fa-solid fa-brain" />
              <span>{t('nav.fundamentals')}</span>
            </Link>
            <Link to="/lessons/sft" className="intro-link-card">
              <i className="fa-solid fa-graduation-cap" />
              <span>{t('nav.techniques')}</span>
            </Link>
            <Link to="/lessons/huggingface" className="intro-link-card">
              <i className="fa-solid fa-face-smile" />
              <span>{t('nav.tools')}</span>
            </Link>
            <Link to="/community/board" className="intro-link-card">
              <i className="fa-solid fa-users" />
              <span>{t('nav.community')}</span>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}

function GuideSection({ language, t }) {
  const steps = language === 'ko' ? [
    { title: '회원가입 / 로그인', desc: 'Google 또는 카카오 계정으로 간편 로그인하세요.' },
    { title: '카테고리 선택', desc: '12개 학습 카테고리에서 관심 있는 분야를 선택하세요.' },
    { title: '레슨 학습', desc: '체계적인 레슨을 순서대로 학습하세요.' },
    { title: '코드 실습', desc: '예제 코드를 직접 실행하고 응용해 보세요.' },
    { title: '커뮤니티 참여', desc: '질문을 올리고 경험을 공유하세요.' },
    { title: '실전 프로젝트', desc: '실제 사용 사례 기반 프로젝트로 실력을 완성하세요.' },
  ] : [
    { title: 'Sign Up / Login', desc: 'Sign in easily with Google or Kakao.' },
    { title: 'Choose Category', desc: 'Select a topic from 12 learning categories.' },
    { title: 'Study Lessons', desc: 'Follow structured lessons step by step.' },
    { title: 'Practice Code', desc: 'Run example code and try variations.' },
    { title: 'Join Community', desc: 'Ask questions and share experiences.' },
    { title: 'Real Projects', desc: 'Build skills with real-world scenario projects.' },
  ];

  return (
    <div className="ck-content-box">
      <div className="ck-content-header ck-ch--green">
        <i className="fa-solid fa-book-open" />
        <div className="ck-ch-text">
          <h2>{t('intro.guide')}</h2>
          <p>{t('intro.guideDesc')}</p>
        </div>
      </div>
      <div className="ck-content-body">
        <div className="intro-guide-steps">
          {steps.map((step, i) => (
            <div key={i} className="intro-guide-step">
              <div className="intro-step-number">{i + 1}</div>
              <div className="intro-step-content">
                <h3>{step.title}</h3>
                <p>{step.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function RoadmapSection({ language }) {
  const levels = [
    {
      level: language === 'ko' ? '입문' : 'Beginner',
      color: '#00855A',
      desc: language === 'ko' ? 'AI/ML 기초와 파인튜닝 환경 설정을 학습합니다.' : 'Learn AI/ML fundamentals and set up the fine-tuning environment.',
      categories: LESSON_CATEGORIES.filter(c => c.level === 'beginner'),
    },
    {
      level: language === 'ko' ? '중급' : 'Intermediate',
      color: '#C87200',
      desc: language === 'ko' ? '데이터 준비, SFT, LoRA, HuggingFace 등 본격적인 파인튜닝을 학습합니다.' : 'Learn data preparation, SFT, LoRA, HuggingFace and serious fine-tuning.',
      categories: LESSON_CATEGORIES.filter(c => c.level === 'intermediate'),
    },
    {
      level: language === 'ko' ? '고급' : 'Advanced',
      color: '#C8102E',
      desc: language === 'ko' ? 'RLHF, 모델 평가, 배포, 실전 프로젝트를 완성합니다.' : 'Complete RLHF, model evaluation, deployment, and real projects.',
      categories: LESSON_CATEGORIES.filter(c => c.level === 'advanced'),
    },
  ];

  const totalLessons = LESSON_CATEGORIES.reduce((s, c) => s + c.lessons.length, 0);

  return (
    <div className="ck-content-box">
      <div className="ck-content-header ck-ch--green">
        <i className="fa-solid fa-route" />
        <div className="ck-ch-text">
          <h2>{language === 'ko' ? '학습 로드맵' : 'Learning Roadmap'}</h2>
          <p>{language === 'ko' ? '12개 카테고리, 총 ' + totalLessons + '개 레슨의 단계별 학습 경로' : '12 categories, ' + totalLessons + ' lessons — step-by-step learning path'}</p>
        </div>
      </div>
      <div className="ck-content-body">
        <div className="intro-roadmap-v2">
          {levels.map((lv, i) => (
            <div key={i} className="roadmap-stage">
              <div className="roadmap-stage-header">
                <div className="roadmap-stage-badge" style={{ background: lv.color }}>
                  <span className="roadmap-stage-step">STEP {i + 1}</span>
                  <span className="roadmap-stage-level">{lv.level}</span>
                </div>
                <p className="roadmap-stage-desc">{lv.desc}</p>
              </div>
              <div className="roadmap-cards">
                {lv.categories.map(cat => (
                  <Link key={cat.slug} to={`/lessons/${cat.slug}`} className="roadmap-card" style={{ '--roadmap-color': lv.color } as React.CSSProperties}>
                    <div className="roadmap-card-icon" style={{ background: `${lv.color}14`, color: lv.color }}>
                      <i className={`fa-solid ${cat.icon}`} />
                    </div>
                    <div className="roadmap-card-info">
                      <h4>{language === 'ko' ? cat.nameKo : cat.nameEn}</h4>
                      <span className="roadmap-card-count">{cat.lessons.length} {language === 'ko' ? '레슨' : 'lessons'}</span>
                    </div>
                    <i className="fa-solid fa-chevron-right roadmap-card-arrow" />
                  </Link>
                ))}
              </div>
              {i < levels.length - 1 && (
                <div className="roadmap-connector">
                  <div className="roadmap-connector-line" />
                  <div className="roadmap-connector-icon">
                    <i className="fa-solid fa-arrow-down" />
                  </div>
                  <div className="roadmap-connector-line" />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function ToolsSection({ language }) {
  const tools = [
    { icon: 'fa-face-smile', name: 'HuggingFace', desc: language === 'ko' ? 'Transformers, PEFT, TRL 등 파인튜닝 생태계' : 'Transformers, PEFT, TRL fine-tuning ecosystem' },
    { icon: 'fa-bolt', name: 'Unsloth', desc: language === 'ko' ? '초고속 LoRA/QLoRA 파인튜닝 프레임워크' : 'Ultra-fast LoRA/QLoRA fine-tuning framework' },
    { icon: 'fa-toolbox', name: 'Axolotl / LLaMA-Factory', desc: language === 'ko' ? 'YAML/WebUI 기반 간편 파인튜닝 도구' : 'YAML/WebUI-based easy fine-tuning tools' },
    { icon: 'fa-server', name: 'DeepSpeed / FSDP', desc: language === 'ko' ? '대규모 분산 학습 최적화 프레임워크' : 'Large-scale distributed training optimization' },
    { icon: 'fa-rocket', name: 'vLLM / Ollama', desc: language === 'ko' ? '고성능 모델 서빙 및 로컬 배포 엔진' : 'High-performance model serving and local deployment' },
  ];

  return (
    <div className="ck-content-box">
      <div className="ck-content-header ck-ch--purple">
        <i className="fa-solid fa-wrench" />
        <div className="ck-ch-text">
          <h2>{language === 'ko' ? '파인튜닝 도구 소개' : 'Fine-tuning Tools Overview'}</h2>
          <p>{language === 'ko' ? '학습하게 될 다양한 파인튜닝 도구를 소개합니다.' : 'Overview of various fine-tuning tools you will learn.'}</p>
        </div>
      </div>
      <div className="ck-content-body">
        <div className="intro-features-grid">
          {tools.map((tool, i) => (
            <div key={i} className="intro-feature-card">
              <div className="intro-feature-icon" style={{ background: '#1B3A6B12', color: '#1B3A6B' }}>
                <i className={`fa-solid ${tool.icon}`} />
              </div>
              <h3>{tool.name}</h3>
              <p>{tool.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function IntroPage() {
  const { language, t } = useLanguage();
  const [activeSection, setActiveSection] = useState('about');
  const [openMenus, setOpenMenus] = useState({ info: true });
  const [mobileSidebar, setMobileSidebar] = useState(false);

  const navigate = useCallback((sectionId) => {
    setActiveSection(sectionId);
    for (const m of MENU) {
      if (m.id === sectionId || m.children.some(c => c.id === sectionId)) {
        setOpenMenus(prev => ({ ...prev, [m.id]: true }));
        break;
      }
    }
    setMobileSidebar(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const handleParentClick = useCallback((parentId) => {
    const isOpen = openMenus[parentId];
    setOpenMenus(prev => ({ ...prev, [parentId]: !isOpen }));
    const menu = MENU.find(m => m.id === parentId);
    if (!isOpen || !menu?.children.length) {
      setActiveSection(parentId);
      setMobileSidebar(false);
    }
  }, [openMenus]);

  const currentLabel = useMemo(() => {
    for (const m of MENU) {
      if (m.id === activeSection) return language === 'ko' ? m.labelKo : m.labelEn;
      for (const c of m.children) {
        if (c.id === activeSection) return language === 'ko' ? c.labelKo : c.labelEn;
      }
    }
    return '';
  }, [activeSection, language]);

  return (
    <div className="ck-page">
      <SEO
        title={language === 'ko' ? 'FineTuning 소개' : 'About FineTuning'}
        description={language === 'ko'
          ? 'FineTuning AI 파인튜닝 학습 플랫폼의 소개, 사용가이드, 학습 로드맵을 확인하세요.'
          : 'Learn about FineTuning, user guide, and learning roadmap for AI fine-tuning.'}
        path="/intro"
      />
      <div className="container">
        <div className="ck-layout">
          <button className="ck-sidebar-toggle" onClick={() => setMobileSidebar(!mobileSidebar)}>
            <i className="fa-solid fa-bars" /> {currentLabel}
          </button>

          <aside className={`ck-sidebar ${mobileSidebar ? 'ck-sidebar--open' : ''}`}>
            <div className="ck-sidebar-header">
              <h3><i className="fa-solid fa-compass" /> {t('intro.sidebarTitle')}</h3>
            </div>
            <nav className="ck-sidebar-nav">
              {MENU.map(parent => (
                <div key={parent.id} className="ck-nav-group">
                  <button
                    className={`ck-nav-parent ${activeSection === parent.id ? 'ck-nav--active' : ''}`}
                    onClick={() => handleParentClick(parent.id)}
                  >
                    <i className={`fa-solid ${parent.icon}`} />
                    <span>{language === 'ko' ? parent.labelKo : parent.labelEn}</span>
                    {parent.children.length > 0 && (
                      <i className={`fa-solid fa-chevron-${openMenus[parent.id] ? 'up' : 'down'} ck-nav-arrow`} />
                    )}
                  </button>
                  {parent.children.length > 0 && openMenus[parent.id] && (
                    <div className="ck-nav-children">
                      {parent.children.map(child => (
                        <button
                          key={child.id}
                          className={`ck-nav-child ${activeSection === child.id ? 'ck-nav--active' : ''}`}
                          onClick={() => navigate(child.id)}
                        >
                          <i className={`fa-solid ${child.icon}`} />
                          <span>{language === 'ko' ? child.labelKo : child.labelEn}</span>
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </nav>
          </aside>

          <div className="ck-main">
            {activeSection === 'about' && <AboutSection t={t} />}
            {activeSection === 'guide' && <GuideSection language={language} t={t} />}
            {activeSection === 'roadmap' && <RoadmapSection language={language} />}
            {activeSection === 'tools' && <ToolsSection language={language} />}
          </div>
        </div>
      </div>
    </div>
  );
}
