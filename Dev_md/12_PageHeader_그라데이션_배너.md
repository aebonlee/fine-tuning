# PageHeader 그라데이션 배너 구현

## 개요
각 메뉴 페이지에 통일된 상단 그라데이션 배너 타이틀을 추가하여 시각적 일관성을 확보했다.
기존 각 페이지마다 제각각이던 `<h1>` + `<p>` 헤더를 재사용 가능한 `PageHeader` 컴포넌트로 교체했다.

## 신규 파일

### `src/components/PageHeader.jsx`
- Props: `icon`, `title`, `description`, `breadcrumbs` (배열: `{label, to?}`), `children` (선택)
- `var(--accent-gradient)` 배경 + 흰색 텍스트
- 브레드크럼: `홈 > 학습하기 > 카테고리명` 형태 (react-router-dom Link 연동)
- 장식적 원형 pseudo-element(::before, ::after)로 시각적 풍성함 추가

### `src/styles/page-header.css`
- `.page-header-bg`: `background: var(--accent-gradient)`, padding-top에 `var(--nav-height)` 포함
- `.page-header-content`: flex, align-items center, gap 20px
- `.page-header-icon`: 56px 원형, `rgba(255,255,255,0.15)` 배경, 24px 아이콘
- `.page-header-title`: 32px, font-weight 800
- `.page-header-desc`: 16px, `rgba(255,255,255,0.85)`
- `.page-header-breadcrumb`: 14px, `rgba(255,255,255,0.7)`, margin-bottom 16px
- 장식 `::before`, `::after`: 반투명 원형 (overflow hidden)
- 반응형: 768px에서 패딩/폰트 축소, 480px에서 추가 축소
- 다크모드: `[data-theme="dark"] .page-header-bg` 어두운 오버레이

## 적용 페이지 (7개)

| 페이지 | 아이콘 | 제목 | 설명 |
|--------|--------|------|------|
| Dashboard | `fa-gauge-high` | `{displayName}{t('dashboard.welcome')}` | AI 파인튜닝 학습 시작 |
| Settings | `fa-gear` | `t('settings.title')` | `t('settings.profileDesc')` |
| Board | `fa-comments` | `t('community.title')` | `t('community.desc')` |
| BoardWrite | `fa-pen-to-square` | 수정/작성 제목 | - |
| BoardDetail | `fa-file-alt` | 게시글 제목 | - |
| LessonCategories | `fa-graduation-cap` | `t('lessons.title')` | `t('lessons.desc')` |
| LessonList | 카테고리 아이콘 | 카테고리명 | 카테고리 설명 + 레벨 뱃지 |

## CSS 정리

### 제거된 스타일
- `dashboard.css`: `.dashboard-welcome` 블록 (h1, p 포함)
- `settings.css`: `.settings-page h1` 스타일
- `community.css`: `.community-page h1`, `.community-page .page-desc`, `.board-write-form h1`
- `lessons.css`: `.lessons-header` 관련 스타일, `.lesson-list-header` 관련 스타일

### padding-top 조정
- 기존: `padding: calc(var(--nav-height) + 32px) 0 60px` → `padding: 32px 0 60px`
- PageHeader 자체에 `padding-top: calc(var(--nav-height) + 32px)` 적용하여 nav 아래 위치
- 적용 대상: `.dashboard-page`, `.settings-page`, `.community-page`, `.board-detail-page`, `.board-write-page`, `.lessons-page`

## 수정 파일 목록 (14개)

| # | 파일 | 작업 |
|---|------|------|
| 1 | `src/components/PageHeader.jsx` | **신규** - 재사용 컴포넌트 |
| 2 | `src/styles/page-header.css` | **신규** - 배너 스타일 |
| 3 | `src/styles/index.css` | `@import './page-header.css'` 추가 |
| 4 | `src/pages/Dashboard.jsx` | PageHeader 적용, 기존 헤더 제거 |
| 5 | `src/pages/Settings.jsx` | PageHeader 적용, 기존 h1 제거 |
| 6 | `src/pages/community/Board.jsx` | PageHeader 적용, 기존 h1+desc 제거 |
| 7 | `src/pages/community/BoardWrite.jsx` | PageHeader 적용, 기존 h1 제거 |
| 8 | `src/pages/community/BoardDetail.jsx` | PageHeader 적용, 기존 백링크+제목 교체 |
| 9 | `src/pages/lessons/LessonCategories.jsx` | PageHeader 적용, 기존 lessons-header 제거 |
| 10 | `src/pages/lessons/LessonList.jsx` | PageHeader 적용, 기존 lesson-list-header 제거 |
| 11 | `src/styles/dashboard.css` | `.dashboard-welcome` 관련 스타일 제거, padding 조정 |
| 12 | `src/styles/settings.css` | `.settings-page h1` 제거, padding 조정 |
| 13 | `src/styles/community.css` | 헤더 스타일 제거, padding 조정 |
| 14 | `src/styles/lessons.css` | `.lessons-header`, `.lesson-list-header` 제거, padding 조정 |

## 테마/다크모드 호환성
- 5가지 색상 테마(blue, red, green, purple, orange) 모두 `var(--accent-gradient)` 사용하므로 자동 호환
- 다크모드: `box-shadow: inset 0 0 0 2000px rgba(0,0,0,0.2)` 오버레이 적용
