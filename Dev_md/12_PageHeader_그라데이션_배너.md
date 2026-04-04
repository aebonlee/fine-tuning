# PageHeader 히어로 스타일 배너 구현

## 개요
각 메뉴 페이지에 통일된 상단 히어로 스타일 배너 타이틀을 추가하여 시각적 일관성을 확보했다.
기존 각 페이지마다 제각각이던 `<h1>` + `<p>` 헤더를 재사용 가능한 `PageHeader` 컴포넌트로 교체했다.

## 디자인 특징 (v2 - 히어로 스타일)
- **중앙 정렬 레이아웃**: 제목, 설명, 아이콘 모두 센터 배치
- **hero-bg 그라데이션**: `var(--hero-bg)` 사용 (홈 히어로와 동일한 배경)
- **글래스모피즘 아이콘**: 72px 둥근 사각형, `backdrop-filter: blur(8px)`, 반투명 보더
- **Pill 브레드크럼**: 반투명 배경 + 보더의 뱃지 형태 (히어로의 hero-badge 스타일)
- **애니메이션 Orb**: 3개의 radial-gradient 원형이 부드럽게 떠다니는 효과
- **그리드 라인 패턴**: 미세한 격자 배경 (mask-image로 중앙 집중)
- **다크모드**: `var(--hero-bg-dark)` 사용

## 파일 구조

### `src/components/PageHeader.jsx`
- Props: `icon`, `title`, `description`, `breadcrumbs` (배열: `{label, to?}`), `children` (선택)
- 장식 요소: `.page-header-deco` > 3개 orb + grid-lines
- 브레드크럼: chevron-right 아이콘 구분자 사용

### `src/styles/page-header.css`
- `.page-header-bg`: `background: var(--hero-bg)`, 넉넉한 패딩
- `.page-header-inner`: 중앙 정렬, max-width 720px
- `.page-header-icon`: 72px, border-radius 20px, backdrop-filter blur
- `.page-header-title`: 36px, font-weight 700
- `.page-header-desc`: 17px, `rgba(255,255,255,0.8)`, max-width 540px
- `.page-header-breadcrumb`: pill 스타일, backdrop-filter blur
- `.page-header-orb`: `@keyframes ph-float` 애니메이션
- `.page-header-grid-lines`: CSS 그리드 패턴 + mask-image
- 반응형: 768px/480px 브레이크포인트
- `prefers-reduced-motion`: 애니메이션 비활성화

## 적용 페이지 (7개)

| 페이지 | 아이콘 | 제목 | 설명 |
|--------|--------|------|------|
| Dashboard | `fa-gauge-high` | 환영 메시지 | AI 파인튜닝 학습 시작 |
| Settings | `fa-gear` | 설정 | 프로필 설명 |
| Board | `fa-comments` | 커뮤니티 | 커뮤니티 설명 |
| BoardWrite | `fa-pen-to-square` | 수정/작성 | - |
| BoardDetail | `fa-file-alt` | 게시글 제목 | - |
| LessonCategories | `fa-graduation-cap` | 학습 카테고리 | 카테고리 설명 |
| LessonList | 카테고리 아이콘 | 카테고리명 | 카테고리 설명 + 레벨 뱃지 |

## 커뮤니티 사이트 점검 수정사항

### BoardDetail 중복 제목 수정
- 기존: PageHeader에 제목 + article 내부 `<h1>`에도 동일 제목 → 중복
- 수정: article 내부에서 `<h1>` 제거, 메타 정보(카테고리 뱃지, 작성자, 날짜, 조회수)만 유지

### 잔존 CSS 셀렉터 정리
- `responsive.css`: 삭제된 `.dashboard-welcome h1`, `.community-page h1`, `.board-write-form h1`, 중복 `padding-top: calc(var(--nav-height))` 제거
- `dark-mode.css`: 삭제된 `.lesson-list-header` 참조 제거

## 수정 파일 목록

### v1 초기 구현 (14개)
| # | 파일 | 작업 |
|---|------|------|
| 1 | `src/components/PageHeader.jsx` | **신규** |
| 2 | `src/styles/page-header.css` | **신규** |
| 3 | `src/styles/index.css` | `@import` 추가 |
| 4-10 | 7개 페이지 JSX | PageHeader 적용 |
| 11-14 | 4개 CSS 파일 | 중복 스타일 제거, padding 조정 |

### v2 히어로 재설계 + 커뮤니티 점검 (6개)
| # | 파일 | 작업 |
|---|------|------|
| 1 | `src/components/PageHeader.jsx` | 히어로 스타일 재설계 |
| 2 | `src/styles/page-header.css` | 전면 재작성 |
| 3 | `src/pages/community/BoardDetail.jsx` | 중복 제목 제거 |
| 4 | `src/pages/lessons/LessonList.jsx` | 레벨 뱃지 스타일 조정 |
| 5 | `src/styles/responsive.css` | 잔존 셀렉터 제거 |
| 6 | `src/styles/dark-mode.css` | 잔존 셀렉터 제거 |

## 테마/다크모드 호환성
- 5가지 색상 테마 모두 `var(--hero-bg)` / `var(--hero-bg-dark)` CSS 변수 사용하여 자동 호환
- 다크모드: `var(--hero-bg-dark)` 배경으로 전환
