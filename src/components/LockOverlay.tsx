/**
 * LockOverlay — 잠금 오버레이 (공유 컴포넌트)
 * 유료 콘텐츠 접근 시 표시되는 구매 유도 오버레이
 */
import { useLicense } from './LicenseGuard';
import { SITE_SLUG } from '../config/license';

const SHOP_URL = 'https://ai-hub.dreamitbiz.com/shop';

export default function LockOverlay() {
  const { currentRouteIsLocked } = useLicense();

  if (!currentRouteIsLocked) return null;

  return (
    <div className="license-lock-overlay">
      <div className="license-lock-card">
        <div className="license-lock-icon">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="48" height="48">
            <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
            <path d="M7 11V7a5 5 0 0 1 10 0v4" />
          </svg>
        </div>
        <h2 className="license-lock-title">유료 콘텐츠</h2>
        <p className="license-lock-desc">
          이 콘텐츠는 이용권 구매 후 이용할 수 있습니다.
        </p>
        <div className="license-lock-pricing">
          <div className="license-lock-price-item">
            <span className="license-lock-price-label">개별 사이트</span>
            <span className="license-lock-price-value">30,000원</span>
          </div>
          <div className="license-lock-price-divider">|</div>
          <div className="license-lock-price-item">
            <span className="license-lock-price-label">전체 11개 사이트</span>
            <span className="license-lock-price-value highlight">150,000원</span>
            <span className="license-lock-price-discount">~55% 할인</span>
          </div>
        </div>
        <div className="license-lock-actions">
          <a href={SHOP_URL} className="license-lock-btn primary" target="_blank" rel="noopener noreferrer">
            이용권 구매하기
          </a>
          <a href={`${SHOP_URL}?site=${SITE_SLUG}`} className="license-lock-btn secondary" target="_blank" rel="noopener noreferrer">
            개별 구매
          </a>
        </div>
        <p className="license-lock-footer">
          1회 결제로 평생 무제한 이용
        </p>
      </div>
    </div>
  );
}
