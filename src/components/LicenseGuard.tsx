/**
 * LicenseGuard — 콘텐츠 접근 제어 (공유 컴포넌트)
 * 첫 방문: 모든 콘텐츠 무료 / 재방문: 무료 페이지만 접근 / 유료 회원: 전체 접근
 */
import { createContext, useContext, useState, useEffect, useCallback, ReactNode } from 'react';
import { useLocation } from 'react-router-dom';
import { supabase } from '../utils/supabase';
import { SITE_SLUG, FREE_ROUTES } from '../config/license';

interface LicenseContextType {
  isFirstVisit: boolean;
  hasLicense: boolean;
  licenseLoading: boolean;
  currentRouteIsLocked: boolean;
}

const LicenseContext = createContext<LicenseContextType>({
  isFirstVisit: true,
  hasLicense: false,
  licenseLoading: true,
  currentRouteIsLocked: false,
});

const FIRST_VISIT_KEY = `dreamit_first_visit_${SITE_SLUG}`;
const LICENSE_CACHE_KEY = `dreamit_license_${SITE_SLUG}`;
const CACHE_TTL = 10 * 60 * 1000; // 10분

function isRouteMatch(pathname: string, pattern: string): boolean {
  if (pattern.endsWith('/*')) {
    return pathname.startsWith(pattern.slice(0, -2));
  }
  if (pattern.includes(':')) {
    const patternParts = pattern.split('/');
    const pathParts = pathname.split('/');
    if (patternParts.length !== pathParts.length) return false;
    return patternParts.every((p, i) => p.startsWith(':') || p === pathParts[i]);
  }
  return pathname === pattern;
}

function isFreePage(pathname: string): boolean {
  return FREE_ROUTES.some(pattern => isRouteMatch(pathname, pattern));
}

export function LicenseProvider({ children }: { children: ReactNode }) {
  const [isFirstVisit, setIsFirstVisit] = useState(true);
  const [hasLicense, setHasLicense] = useState(false);
  const [licenseLoading, setLicenseLoading] = useState(true);
  const location = useLocation();

  // 첫 방문 체크
  useEffect(() => {
    const visited = localStorage.getItem(FIRST_VISIT_KEY);
    if (visited) {
      setIsFirstVisit(false);
    } else {
      localStorage.setItem(FIRST_VISIT_KEY, new Date().toISOString());
      setIsFirstVisit(true);
    }
  }, []);

  // 라이선스 체크
  const checkLicense = useCallback(async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        setHasLicense(false);
        setLicenseLoading(false);
        return;
      }

      // 캐시 확인 (true=10분, false=2분 캐시)
      try {
        const cached = localStorage.getItem(LICENSE_CACHE_KEY);
        if (cached) {
          const { value, timestamp } = JSON.parse(cached);
          const ttl = value ? CACHE_TTL : 2 * 60 * 1000;
          if (Date.now() - timestamp < ttl) {
            setHasLicense(value);
            setLicenseLoading(false);
            return;
          }
        }
      } catch { /* ignore cache errors */ }

      // RPC 호출
      const { data, error } = await supabase.rpc('check_user_license', {
        p_user_id: user.id,
        p_site_slug: SITE_SLUG,
      });

      let result = error ? false : !!data;

      // 쿠폰 직접 체크 (RPC가 false일 때 fallback)
      if (!result) {
        try {
          const today = new Date().toISOString().split('T')[0];
          const { data: cData } = await supabase
            .from('ah_coupon_uses')
            .select('id, coupon:ah_coupons!coupon_id(is_active, expires_at)')
            .eq('user_id', user.id);
          if ((cData || []).some((r: Record<string, unknown>) => {
            const c = r.coupon as Record<string, unknown> | null;
            return c?.is_active && (c?.expires_at as string) >= today;
          })) {
            result = true;
          }
        } catch { /* coupon fallback failed */ }
      }

      setHasLicense(result);

      // 캐시 저장
      localStorage.setItem(LICENSE_CACHE_KEY, JSON.stringify({
        value: result,
        timestamp: Date.now(),
      }));
    } catch {
      setHasLicense(false);
    } finally {
      setLicenseLoading(false);
    }
  }, []);

  useEffect(() => {
    checkLicense();

    const { data: { subscription } } = supabase.auth.onAuthStateChange(() => {
      // 로그인/로그아웃 시 캐시 초기화 후 재확인
      localStorage.removeItem(LICENSE_CACHE_KEY);
      setLicenseLoading(true);
      checkLicense();
    });

    return () => subscription.unsubscribe();
  }, [checkLicense]);

  // 잠금 판단
  const currentRouteIsLocked = (() => {
    if (isFreePage(location.pathname)) return false;
    if (isFirstVisit) return false;
    if (hasLicense) return false;
    if (licenseLoading) return false;
    return true;
  })();

  return (
    <LicenseContext.Provider value={{ isFirstVisit, hasLicense, licenseLoading, currentRouteIsLocked }}>
      {children}
    </LicenseContext.Provider>
  );
}

export function useLicense() {
  return useContext(LicenseContext);
}
