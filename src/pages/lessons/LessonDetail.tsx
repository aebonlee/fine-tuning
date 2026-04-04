import { useState, useEffect, useMemo } from 'react';
import { Link, useParams, useOutletContext } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { useLanguage } from '../../contexts/LanguageContext';
import { getCategoryBySlug } from '../../config/lessons';
import SEO from '../../components/SEO';

export default function LessonDetail() {
  const { categorySlug, lessonSlug } = useParams();
  const { language, t } = useLanguage();
  const { setToc } = useOutletContext<any>();
  const [lessonData, setLessonData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [copiedBlock, setCopiedBlock] = useState(null);

  const category = getCategoryBySlug(categorySlug);
  const lessonIndex = category?.lessons.findIndex(l => l.slug === lessonSlug) ?? -1;
  const lessonMeta = category?.lessons[lessonIndex];
  const prevLesson = lessonIndex > 0 ? category.lessons[lessonIndex - 1] : null;
  const nextLesson = lessonIndex < (category?.lessons.length || 0) - 1 ? category.lessons[lessonIndex + 1] : null;

  useEffect(() => {
    setLoading(true);
    setError(false);
    import(`../../content/${categorySlug}/${lessonSlug}.js`)
      .then(mod => {
        setLessonData(mod.default);
        setLoading(false);
      })
      .catch(() => {
        setError(true);
        setLoading(false);
      });
  }, [categorySlug, lessonSlug]);

  const content = useMemo(() => {
    if (!lessonData) return '';
    return language === 'ko' ? lessonData.contentKo : lessonData.contentEn;
  }, [lessonData, language]);

  const toc = useMemo(() => {
    if (!content) return [];
    const headings = [];
    const lines = content.split('\n');
    for (const line of lines) {
      const match = line.match(/^(#{2,3})\s+(.+)/);
      if (match) {
        const level = match[1].length;
        const text = match[2].trim();
        const id = text.toLowerCase().replace(/[^a-z0-9가-힣ㄱ-ㅎㅏ-ㅣ]+/g, '-').replace(/(^-|-$)/g, '');
        headings.push({ level, text, id });
      }
    }
    return headings;
  }, [content]);

  useEffect(() => {
    setToc(toc);
    return () => setToc([]);
  }, [toc, setToc]);

  async function handleCopyBlock(text) {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedBlock(text);
      setTimeout(() => setCopiedBlock(null), 2000);
    } catch { /* fallback */ }
  }

  if (!category || !lessonMeta) {
    return (
      <div className="lessons-page">
        <div style={{ textAlign: 'center', padding: '100px 20px' }}>
          <h2>{language === 'ko' ? '레슨을 찾을 수 없습니다' : 'Lesson not found'}</h2>
          <Link to="/lessons" className="btn btn-primary btn-sm" style={{ marginTop: '20px' }}>
            {t('lessons.backToCategories')}
          </Link>
        </div>
      </div>
    );
  }

  if (loading) {
    return <div className="loading-page"><div className="loading-spinner" /></div>;
  }

  const lessonTitle = language === 'ko' ? lessonMeta.titleKo : lessonMeta.titleEn;
  const lessonDesc = language === 'ko' ? lessonMeta.descKo : lessonMeta.descEn;
  const catName = language === 'ko' ? category.nameKo : category.nameEn;

  const breadcrumbLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: language === 'ko' ? '학습하기' : 'Lessons', item: 'https://fine-tuning.dreamitbiz.com/lessons' },
      { '@type': 'ListItem', position: 2, name: catName, item: `https://fine-tuning.dreamitbiz.com/lessons/${categorySlug}` },
      { '@type': 'ListItem', position: 3, name: lessonTitle },
    ],
  };

  return (
    <>
      <SEO
        title={`${lessonTitle} - ${catName}`}
        description={lessonDesc}
        path={`/lessons/${categorySlug}/${lessonSlug}`}
        type="article"
        jsonLd={breadcrumbLd}
      />
      <div className="lesson-detail-breadcrumb">
        <Link to="/lessons">{t('lessons.title')}</Link>
        <span> / </span>
        <Link to={`/lessons/${categorySlug}`}>{catName}</Link>
        <span> / </span>
        <span>{lessonTitle}</span>
      </div>

      <div className="ck-content-box">
        <div className="ck-content-header ck-ch--primary">
          <i className={`fa-solid ${category.icon}`} />
          <div className="ck-ch-text">
            <h2>{lessonTitle}</h2>
            <p>{catName}</p>
          </div>
        </div>

        <div className="ck-content-body">
          {error ? (
            <div style={{ textAlign: 'center', padding: '60px 20px' }}>
              <p style={{ fontSize: '48px', marginBottom: '12px', opacity: 0.3 }}><i className="fa-solid fa-file-lines" /></p>
              <p>{language === 'ko' ? '콘텐츠를 불러올 수 없습니다.' : 'Could not load content.'}</p>
            </div>
          ) : (
            <div className="markdown-body">
              <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                components={{
                  h2: ({ children, ...props }) => {
                    const text = String(children);
                    const id = text.toLowerCase().replace(/[^a-z0-9가-힣ㄱ-ㅎㅏ-ㅣ]+/g, '-').replace(/(^-|-$)/g, '');
                    return <h2 id={id} {...props}>{children}</h2>;
                  },
                  h3: ({ children, ...props }) => {
                    const text = String(children);
                    const id = text.toLowerCase().replace(/[^a-z0-9가-힣ㄱ-ㅎㅏ-ㅣ]+/g, '-').replace(/(^-|-$)/g, '');
                    return <h3 id={id} {...props}>{children}</h3>;
                  },
                  pre: ({ children, ...props }) => {
                    const codeText = (() => {
                      try {
                        const codeEl = (children as any)?.props;
                        return codeEl?.children || '';
                      } catch { return ''; }
                    })();
                    const isCopied = copiedBlock === codeText;
                    return (
                      <div className="prompt-code-wrapper">
                        <button className="lesson-copy-btn" onClick={() => handleCopyBlock(codeText)}>
                          <i className={`fa-solid ${isCopied ? 'fa-check' : 'fa-copy'}`} />
                          {isCopied ? (language === 'ko' ? '복사됨' : 'Copied') : (language === 'ko' ? '복사' : 'Copy')}
                        </button>
                        <pre {...props}>{children}</pre>
                      </div>
                    );
                  },
                }}
              >
                {content}
              </ReactMarkdown>
            </div>
          )}
        </div>
      </div>

      {/* Prev / Next Navigation */}
      <div className="lesson-nav">
        {prevLesson ? (
          <Link to={`/lessons/${categorySlug}/${prevLesson.slug}`} className="lesson-nav-btn lesson-nav-prev">
            <span className="lesson-nav-label">&larr; {t('lessons.prevLesson')}</span>
            <span className="lesson-nav-title">{language === 'ko' ? prevLesson.titleKo : prevLesson.titleEn}</span>
          </Link>
        ) : <div />}
        {nextLesson ? (
          <Link to={`/lessons/${categorySlug}/${nextLesson.slug}`} className="lesson-nav-btn lesson-nav-next">
            <span className="lesson-nav-label">{t('lessons.nextLesson')} &rarr;</span>
            <span className="lesson-nav-title">{language === 'ko' ? nextLesson.titleKo : nextLesson.titleEn}</span>
          </Link>
        ) : <div />}
      </div>
    </>
  );
}
