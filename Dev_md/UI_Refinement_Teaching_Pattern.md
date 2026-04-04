# UI Refinement - Teaching 디자인 패턴 적용

**작업일**: 2026-04-04
**목적**: Teaching 프로젝트의 세련된 디자인 패턴을 FineTuning 사이트에 적용하여 UI 품질 향상

## 변경 배경

사용자 피드백: 파인튜닝 사이트가 Teaching 대비 "촌스럽다"
- 폰트 사이즈가 전반적으로 과대
- 패딩/간격이 너무 넓어 "빈 느낌"
- 시각적 구조 부족 (구분선, 배경색 없이 밋밋함)
- 호버 효과가 약함
- 네비게이션 링크가 작고 좁음

## 수정 파일 (6개 CSS 파일, JSX 변경 없음)

### 1. `src/styles/base.css` - 타이포그래피 기반

| 속성 | Before | After |
|------|--------|-------|
| body line-height | 1.7 | 1.75 |
| h1 letter-spacing | (없음) | -0.025em |
| h2 letter-spacing | (없음) | -0.02em |
| .section-header margin-bottom | 72px | 64px |
| .section-title font-size | 42px | 36px |
| .section-title font-weight | 700 | 800 |
| .section-title letter-spacing | -0.02em | -0.025em |
| .section-subtitle font-size | 18px | 17px |
| .section-subtitle max-width | 700px | 640px |
| .section-subtitle line-height | 1.7 | 1.75 |
| .btn-sm padding | 10px 20px | 8px 20px |
| .btn-sm min-height | 40px | (제거) |

### 2. `src/styles/navbar.css` - 네비 링크 확대

| 속성 | Before | After |
|------|--------|-------|
| .nav-link padding | 10px 12px | 10px 16px |
| .nav-link font-size | 14px | 15px |
| 모바일 전환 breakpoint | 1200px | 1100px |

### 3. `src/styles/dashboard.css` - 가장 큰 변경

#### Welcome 영역
| 속성 | Before | After |
|------|--------|-------|
| .dashboard-page padding-top | nav + 32px | nav + 40px |
| .dashboard-welcome margin-bottom | 40px | 36px |
| .dashboard-welcome | - | padding-bottom: 24px, border-bottom 추가 |
| h1 font-size | 28px | 26px |
| h1 margin-bottom | 8px | 6px |
| h1 letter-spacing | - | -0.02em 추가 |
| p font-size | 15px | 14px |

#### Quick Access
| 속성 | Before | After |
|------|--------|-------|
| h2 font-size | 20px | 16px |
| h2 color | --text-primary | --text-secondary |
| h2 | - | uppercase + letter-spacing: 0.05em |
| grid columns | repeat(4, 1fr) | repeat(5, 1fr) |
| grid gap | 16px | 14px |
| card padding | 24px 16px | 20px 14px |
| card gap | 12px | 10px |
| card border-radius | --radius-lg | --radius-md |
| card hover transform | translateY(-2px) | translateY(-3px) |
| card hover border-color | primary-blue-light | primary-blue |
| icon size | 48px | 44px |
| icon font-size | 24px | 22px |
| icon border-radius | --radius-md | --radius-sm |
| icon | - | transition 추가 |
| label font-size | 14px | 13px |

#### Dashboard Grid
| 속성 | Before | After |
|------|--------|-------|
| grid columns | 2fr 1fr | 5fr 3fr |
| grid gap | 24px | 20px |
| card border-radius | --radius-lg | --radius-md |
| h3 font-size | 18px | 15px |
| h3 margin-bottom | 20px | 16px |
| h3 | - | padding-bottom: 12px, border-bottom 추가 |

#### Recent Items
| 속성 | Before | After |
|------|--------|-------|
| item padding | 12px 0 | 10px 0 |
| info gap | 12px | 10px |
| icon font-size | 20px | 18px |
| type | 단순 텍스트 | pill 뱃지 (11px, 배경색, rounded) |

#### Usage Stats
| 속성 | Before | After |
|------|--------|-------|
| list gap | 16px | 14px |
| stat-item | - | padding: 10px 14px, background, border-radius 추가 |
| label font-size | 14px | 13px |
| value font-size | 16px | 20px |
| value font-weight | 700 | 800 |

### 4. `src/styles/settings.css` - h1 스타일 정제

| 속성 | Before | After |
|------|--------|-------|
| padding-top | nav + 32px | nav + 40px |
| h1 font-size | 28px | 26px |
| h1 margin-bottom | 32px | 24px |
| h1 letter-spacing | - | -0.02em 추가 |
| h1 | - | padding-bottom: 16px, border-bottom 추가 |

### 5. `src/styles/community.css` - 카드 정제

| 속성 | Before | After |
|------|--------|-------|
| padding-top | nav + 32px | nav + 40px |
| h1 font-size | 28px | 26px |
| h1 margin-bottom | 8px | 6px |
| h1 letter-spacing | - | -0.02em 추가 |
| .page-desc font-size | 15px | 14px |
| .page-desc | - | padding-bottom: 20px, border-bottom 추가 |
| .board-card-title font-weight | 500 | 600 |
| .board-card-title margin-bottom | 4px | 6px |
| .board-card-title line-height | - | 1.5 추가 |
| .board-card-meta font-size | 13px | 12px |
| .board-card-meta gap | 12px | 10px |
| .board-card-stats font-size | 13px | 12px |
| .board-write-form h1 font-size | 28px | 24px |
| .board-write-form h1 font-weight | 800 | 700 |

### 6. `src/styles/responsive.css` - 브레이크포인트 조정

#### 주요 변경
- **1200px -> 1100px**: 모바일 전환 시점 변경 (footer grid 포함)
- **1024px**: section-title 30px -> 34px, dashboard-grid/settings-layout 삭제 (768px로 이동)
- **768px**: section-title 26px -> 28px, section-subtitle 14px -> 15px, quick-access 2열, dashboard-grid/settings-layout 1fr 추가
- **480px**: quick-access 1열, 불필요한 개별 오버라이드 삭제

## 디자인 원칙 (Teaching 패턴)

1. **컴팩트한 타이포그래피**: 큰 제목은 더 작게, 무게감은 더 강하게 (700->800)
2. **시각적 구분**: 섹션 간 border-bottom으로 명확한 영역 구분
3. **더 강한 인터랙션**: hover 시 더 큰 lift (-3px), 더 진한 테두리 색상
4. **통계 강조**: 숫자는 더 크고 굵게 (20px/800), 배경색으로 강조
5. **밀도 높은 레이아웃**: 5열 그리드, 좁은 gap, 컴팩트한 패딩
6. **pill 뱃지 스타일**: 타입 표시에 배경색 + 라운드 처리

## 영향 범위

- **홈페이지**: hero.css가 별도 오버라이드하므로 base.css 변경 영향 없음
- **다크모드**: 구분선/배경색이 CSS 변수 기반이므로 자동 대응
- **5가지 색상 테마**: CSS 변수 기반이므로 자동 대응
- **반응형**: 1100px/768px/480px 3단계 반응형 정상 작동
