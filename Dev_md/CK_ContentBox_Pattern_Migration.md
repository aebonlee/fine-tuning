# ck-content-box 패턴 전체 페이지 마이그레이션

**작업일**: 2026-04-04
**목적**: About(IntroPage)의 `ck-content-box` 디자인 패턴을 모든 페이지에 통일 적용

## 변경 배경

About 페이지는 `ck-*` CSS 패턴(카드 기반 UI)을 사용하여 세련된 디자인을 구현하고 있었으나, 나머지 페이지(Dashboard, Settings, Community, Lessons)는 각자 독립적인 CSS 클래스를 사용하여 디자인 일관성이 부족했음.

## ck-content-box 패턴 구조

```
.ck-page                          ← 페이지 래퍼 (padding: 100px 0 60px)
  .container
    .ck-content-box               ← 흰색 카드 (border, border-radius)
      .ck-content-header          ← 컬러 섹션 헤더
        .ck-ch--blue              ← 파란 계열 배경
        .ck-ch--green             ← 녹색 계열 배경
        .ck-ch--purple            ← 보라 계열 배경
        .ck-ch--primary           ← 그라데이션 배경
        i.fa-solid                ← 아이콘
        .ck-ch-text > h2 + p     ← 제목 + 설명
      .ck-content-body            ← 콘텐츠 영역 (padding: 28px)
```

## 수정 파일 (7 JSX + 4 CSS = 11개)

### JSX 페이지 변경

| 파일 | 이전 래퍼 | 변경 내용 |
|------|-----------|-----------|
| `Dashboard.jsx` | `.dashboard-page` | `.ck-page` + 3개 ck-content-box (welcome+quick-access, recent, progress) |
| `Settings.jsx` | `.settings-page` | `.ck-page` + 1개 ck-content-box (header + settings-layout) |
| `Board.jsx` | `.community-page` | `.ck-page` + 1개 ck-content-box (header + filters/list) |
| `BoardDetail.jsx` | `.board-detail-page` | `.ck-page` + 1개 ck-content-box (header + content/comments) |
| `BoardWrite.jsx` | `.ck-page` (이미 사용) | ck-content-header에 ck-ch-text 구조 적용 |
| `LessonCategories.jsx` | PageHeader 컴포넌트 | PageHeader 제거 → ck-content-header ck-ch--blue |
| `LessonList.jsx` | PageHeader 컴포넌트 | PageHeader 제거 → ck-content-header ck-ch--primary |

### CSS 파일 변경

| 파일 | 제거된 클래스 | 유지/수정된 클래스 |
|------|---------------|-------------------|
| `dashboard.css` | `.dashboard-page`, `.dashboard-welcome`, `.dashboard-card`, `.dashboard-card h3` | quick-access (icon bg→white), usage-stats, recent-items |
| `settings.css` | `.settings-page`, `.settings-page h1` | settings-card (bg→light-gray), nav-item.active (bg→light-gray) |
| `community.css` | `.community-page`, `.page-desc`, `.board-detail-page`, `.board-detail`, `.board-detail-header/title/meta/body`, `.board-write-page`, `.board-write-form h1/bg/padding` | board-write-form (max-width만), board-detail-content (font/line-height) |
| `responsive.css` | 구 클래스 참조 제거 | 1100px footer, 768px grid 축소, 480px 1열 유지 |

## 주요 디자인 결정

1. **Dashboard**: 3개 ck-content-box로 분리 (welcome+categories / recent / progress)
2. **Settings**: 단일 ck-content-box 안에 settings-layout 포함
3. **LessonList**: `ck-ch--primary` (그라데이션) 사용 → LessonDetail과 시각적 일관성
4. **LessonCategories**: `ck-ch--blue` 사용 → 일반 카테고리 목록 느낌
5. **배경색 반전**: ck-content-body가 흰색이므로 내부 카드는 `--bg-light-gray`로 변경

## 빌드 결과

```
✓ 433 modules transformed
dist/assets/index-DWjEBay5.css   77.60 kB │ gzip: 14.37 kB
dist/assets/index-Cj5a1e25.js  215.99 kB │ gzip: 70.17 kB
✓ built in 2.59s
Published (gh-pages deploy 완료)
```

## 삭감된 CSS 코드량

- **총 변경**: 333 insertions, 428 deletions (**순 95줄 감소**)
- 불필요한 페이지별 독립 스타일 제거 → 공통 ck-* 패턴으로 통일
