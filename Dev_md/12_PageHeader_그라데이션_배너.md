# PageHeader 배너 구현

## 개요
각 메뉴 페이지에 통일된 상단 배너 타이틀을 추가하여 시각적 일관성을 확보했다.
기존 각 페이지마다 제각각이던 `<h1>` + `<p>` 헤더를 재사용 가능한 `PageHeader` 컴포넌트로 교체했다.

## 디자인 변경 이력

### v1 - 초기 구현 (accent-gradient)
- `var(--accent-gradient)` 배경 + 좌측 정렬
- 56px 원형 아이콘, `::before/::after` 장식 원형

### v2 - 히어로 스타일 재설계
- 중앙 정렬 레이아웃, `var(--hero-bg)` 배경
- 72px 글래스모피즘 아이콘, pill 브레드크럼
- 애니메이션 orb 장식 + 그리드 라인 패턴

### v3 - EIP 스타일
- **`d:\dreamit-web\eip` 프로젝트 디자인 패턴 적용**
- 좌측 정렬 flex row 레이아웃 (아이콘 + 텍스트)
- 컴팩트 패딩: `calc(var(--nav-height) + 36px) 0 32px`
- 장식 요소 없음 (orb, grid-lines, 애니메이션 모두 제거)
- `var(--hero-bg)` 배경 유지

### v4 - Teaching 스타일 (현재)
- **`d:\dreamit-web\teaching` 프로젝트 디자인 패턴 적용**
- **일반 페이지(Dashboard, Settings, Board, BoardWrite, BoardDetail)에서 그라데이션 PageHeader 제거**
- Teaching 프로젝트 분석 결과: 일반 페이지는 단순 텍스트 헤더(`<h1>` 28px + `<p>` 설명), AI 도구 페이지만 그라데이션 헤더 사용
- **학습 페이지(LessonCategories, LessonList)만 그라데이션 PageHeader 유지** (Teaching의 AI 도구 페이지에 해당)
- 각 페이지에 `padding: calc(var(--nav-height) + 32px) 0 60px` 복원

## 디자인 특징 (v4 - Teaching Style)

### 일반 페이지 (그라데이션 헤더 없음)
- **Dashboard**: `.dashboard-welcome` div 내 `<h1>` 28px + `<p>` 설명
- **Settings**: 단순 `<h1>` 28px, font-weight 800
- **Board**: `<h1>` + `.page-desc` 설명
- **BoardWrite**: `.board-write-form` 내부 `<h1>` 28px
- **BoardDetail**: `.board-detail-header` 내부 제목 + 메타 정보, 목록으로 돌아가기 링크

### 학습 페이지 (그라데이션 PageHeader 유지)
- **좌측 정렬 Flex 레이아웃**: 아이콘 + 제목/설명 가로 배치
- **hero-bg 그라데이션**: `var(--hero-bg)` 사용
- **글래스모피즘 아이콘**: 64px, border-radius 16px, `backdrop-filter: blur(8px)`, box-shadow
- **심플 브레드크럼**: `/` 구분자, 13px 텍스트
- **다크모드**: `var(--hero-bg-dark)` 사용

## 파일 구조

### `src/components/PageHeader.jsx`
- Props: `icon`, `title`, `description`, `breadcrumbs` (배열: `{label, to?}`), `children` (선택)
- 단순한 구조: breadcrumb → flex(icon + text)
- 장식 요소 없음

### `src/styles/page-header.css`
- `.page-header`: `background: var(--hero-bg)`, 컴팩트 패딩
- `.page-header-inner`: `display: flex`, `align-items: center`, `gap: 20px`
- `.page-header-icon`: 64px, border-radius 16px, glassmorphism + box-shadow
- `.page-header h1`: 32px, font-weight 800
- `.page-header p`: 15px, `rgba(255,255,255,0.75)`
- `.page-header-breadcrumb`: 13px, `rgba(255,255,255,0.5)`, `/` 구분자
- 반응형: 768px/480px 브레이크포인트
- 다크모드: `[data-theme="dark"] .page-header` → `var(--hero-bg-dark)`

## 적용 페이지

### 그라데이션 PageHeader 적용 (2개 - 학습 페이지만)

| 페이지 | 아이콘 | 제목 | 설명 |
|--------|--------|------|------|
| LessonCategories | `fa-graduation-cap` | 학습 카테고리 | 카테고리 설명 |
| LessonList | 카테고리 아이콘 | 카테고리명 | 카테고리 설명 + 레벨 뱃지 |

### 단순 텍스트 헤더 (5개 - 일반 페이지)

| 페이지 | 헤더 스타일 |
|--------|------------|
| Dashboard | `.dashboard-welcome` div: h1 환영 메시지 + p 설명 |
| Settings | 단순 h1 "설정" |
| Board | h1 "커뮤니티" + `.page-desc` 설명 |
| BoardWrite | `.board-write-form` 내부 h1 "글쓰기/수정" |
| BoardDetail | `.board-detail-header` 내부 제목 + 메타 |

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

### v3 EIP 스타일 재설계 (2개)
| # | 파일 | 작업 |
|---|------|------|
| 1 | `src/components/PageHeader.jsx` | EIP 스타일 좌측정렬 재설계 |
| 2 | `src/styles/page-header.css` | 전면 재작성 (컴팩트, 장식 제거) |

### v4 Teaching 스타일 적용 (8개)
| # | 파일 | 작업 |
|---|------|------|
| 1 | `src/pages/Dashboard.jsx` | PageHeader 제거 → `.dashboard-welcome` 복원 |
| 2 | `src/pages/Settings.jsx` | PageHeader 제거 → 단순 `<h1>` 복원 |
| 3 | `src/pages/community/Board.jsx` | PageHeader 제거 → `<h1>` + `.page-desc` 복원 |
| 4 | `src/pages/community/BoardWrite.jsx` | PageHeader 제거 → form 내부 `<h1>` 복원 |
| 5 | `src/pages/community/BoardDetail.jsx` | PageHeader 제거 → 제목/메타 `.board-detail-header` 복원, 뒤로가기 링크 추가 |
| 6 | `src/styles/dashboard.css` | nav-height padding 복원, `.dashboard-welcome` 스타일 복원 |
| 7 | `src/styles/settings.css` | nav-height padding 복원, h1 스타일 복원 |
| 8 | `src/styles/community.css` | nav-height padding 복원, h1/page-desc 스타일 복원 |

**변경하지 않은 파일**:
- `src/pages/lessons/LessonCategories.jsx` - 그라데이션 PageHeader 유지
- `src/pages/lessons/LessonList.jsx` - 그라데이션 PageHeader 유지
- `src/styles/page-header.css` - EIP 스타일 유지 (학습 페이지용)
- `src/components/PageHeader.jsx` - 변경 없음 (학습 페이지용)

## 테마/다크모드 호환성
- 5가지 색상 테마 모두 `var(--hero-bg)` / `var(--hero-bg-dark)` CSS 변수 사용하여 자동 호환
- 다크모드: `var(--hero-bg-dark)` 배경으로 전환
