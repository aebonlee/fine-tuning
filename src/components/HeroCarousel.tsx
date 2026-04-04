import { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';
import HeroBackground from './HeroBackground';

const SLIDES = [
  { bgType: 'particles' },
  { bgType: 'particles' },
  { bgType: 'network' },
  { bgType: 'orbs' },
  { bgType: 'geometric' },
];

export default function HeroCarousel() {
  const { t } = useLanguage();
  const [current, setCurrent] = useState(0);

  const next = useCallback(() => {
    setCurrent(prev => (prev + 1) % SLIDES.length);
  }, []);

  const prev = useCallback(() => {
    setCurrent(prev => (prev - 1 + SLIDES.length) % SLIDES.length);
  }, []);

  useEffect(() => {
    const timer = setInterval(next, 6000);
    return () => clearInterval(timer);
  }, [next]);

  return (
    <section className="hero">
      <div className="carousel-viewport">
        <div className="carousel-track" style={{ transform: `translateX(-${current * 100}%)` }}>
          {SLIDES.map((slide, i) => (
            <div key={i} className="carousel-slide">
              <HeroBackground type={slide.bgType} />
            </div>
          ))}
        </div>
      </div>

      <div className="container">
        <div className="hero-content">
          <div className="hero-badge">
            {t('hero.badge')}
          </div>
          <h1 className="hero-title">
            {t('hero.title')}{' '}
            <span className="highlight">{t('hero.titleHighlight')}</span>
            {t('hero.titleSuffix')}
          </h1>
          <p className="hero-description">
            {t('hero.description')}
          </p>
          <div className="hero-buttons">
            <Link to="/lessons" className="btn btn-primary">{t('hero.cta')}</Link>
            <Link to="/intro" className="btn btn-secondary">{t('hero.ctaSecondary')}</Link>
          </div>
        </div>
      </div>

      <button className="carousel-arrow carousel-arrow-left" onClick={prev}>&lsaquo;</button>
      <button className="carousel-arrow carousel-arrow-right" onClick={next}>&rsaquo;</button>

      <div className="carousel-dots">
        {SLIDES.map((_, i) => (
          <button
            key={i}
            className={`carousel-dot ${i === current ? 'active' : ''}`}
            onClick={() => setCurrent(i)}
          />
        ))}
      </div>

      <div className="scroll-indicator">
        <div className="mouse"><div className="wheel" /></div>
        <span className="scroll-text">Scroll</span>
      </div>
    </section>
  );
}
