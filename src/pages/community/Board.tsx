import { useState, useEffect, useRef, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { useLanguage } from '../../contexts/LanguageContext';
import { supabase } from '../../utils/supabase';
import SEO from '../../components/SEO';

const PER_PAGE = 15;
const CATEGORIES = ['all', 'notice', 'tip', 'question', 'free', 'showcase'];

const CATEGORY_CLASSES = {
  notice: 'board-category-notice',
  tip: 'board-category-tip',
  question: 'board-category-question',
  free: 'board-category-free',
  showcase: 'board-category-showcase',
};

function useDebouncedValue(value, delay = 400) {
  const [debounced, setDebounced] = useState(value);
  useEffect(() => {
    const timer = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(timer);
  }, [value, delay]);
  return debounced;
}

function Pagination({ page, total, onPageChange }) {
  if (total <= 1) return null;

  const pages = [];
  const maxVisible = 5;

  if (total <= maxVisible + 2) {
    for (let i = 1; i <= total; i++) pages.push(i);
  } else {
    pages.push(1);
    let start = Math.max(2, page - 1);
    let end = Math.min(total - 1, page + 1);
    if (page <= 3) { start = 2; end = maxVisible; }
    if (page >= total - 2) { start = total - maxVisible + 1; end = total - 1; }
    if (start > 2) pages.push('...');
    for (let i = start; i <= end; i++) pages.push(i);
    if (end < total - 1) pages.push('...');
    pages.push(total);
  }

  return (
    <div className="board-pagination">
      <button className="page-btn" disabled={page === 1} onClick={() => onPageChange(page - 1)}>&lsaquo;</button>
      {pages.map((p, i) =>
        p === '...' ? (
          <span key={`e${i}`} className="page-ellipsis">...</span>
        ) : (
          <button key={p} className={`page-btn${page === p ? ' active' : ''}`} onClick={() => onPageChange(p)}>{p}</button>
        )
      )}
      <button className="page-btn" disabled={page === total} onClick={() => onPageChange(page + 1)}>&rsaquo;</button>
    </div>
  );
}

export default function Board() {
  const { isLoggedIn } = useAuth();
  const { language, t } = useLanguage();
  const [posts, setPosts] = useState([]);
  const [search, setSearch] = useState('');
  const debouncedSearch = useDebouncedValue(search);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [categoryFilter, setCategoryFilter] = useState('all');

  useEffect(() => { loadPosts(); }, [page, debouncedSearch, categoryFilter]);

  async function loadPosts() {
    setLoading(true);
    try {
      let query = supabase
        .from('finetuning_board_posts')
        .select('*', { count: 'exact' })
        .order('created_at', { ascending: false })
        .range((page - 1) * PER_PAGE, page * PER_PAGE - 1);

      if (debouncedSearch.trim()) {
        query = query.ilike('title', `%${debouncedSearch}%`);
      }
      if (categoryFilter !== 'all') {
        query = query.eq('category', categoryFilter);
      }

      const { data, count } = await query;
      setPosts(data || []);
      setTotal(Math.ceil((count || 0) / PER_PAGE));
    } catch {
      setPosts([]);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="ck-page">
      <SEO
        title={language === 'ko' ? '커뮤니티' : 'Community'}
        description={language === 'ko'
          ? 'AI 파인튜닝 학습자 커뮤니티에서 질문하고 경험을 공유하세요.'
          : 'Ask questions and share experiences in the AI fine-tuning learning community.'}
        path="/community/board"
      />
      <div className="container">
        <div className="ck-content-box">
          <div className="ck-content-header ck-ch--blue">
            <i className="fa-solid fa-users" />
            <div className="ck-ch-text">
              <h2>{t('community.title')}</h2>
              <p>{t('community.desc')}</p>
            </div>
          </div>
          <div className="ck-content-body">
            <div className="board-category-filters">
              {CATEGORIES.map(cat => (
                <button
                  key={cat}
                  className={`board-category-filter-btn${categoryFilter === cat ? ' active' : ''}`}
                  onClick={() => { setCategoryFilter(cat); setPage(1); }}
                >
                  {t(`community.category${cat.charAt(0).toUpperCase() + cat.slice(1)}`)}
                </button>
              ))}
            </div>

            <div className="board-filters">
              <div className="board-search">
                <span className="search-icon"><i className="fa-solid fa-search" /></span>
                <input
                  type="text"
                  placeholder={t('community.search')}
                  value={search}
                  onChange={e => { setSearch(e.target.value); setPage(1); }}
                />
              </div>
              {isLoggedIn && (
                <Link to="/community/board/write" className="board-write-btn">
                  <i className="fa-solid fa-pen" /> {t('community.write')}
                </Link>
              )}
            </div>

            {loading ? (
              <div className="loading-page"><div className="loading-spinner" /></div>
            ) : posts.length > 0 ? (
              <div className="board-list">
                {posts.map(post => {
                  const cat = post.category || '';
                  const catLabel = cat ? t(`community.category${cat.charAt(0).toUpperCase() + cat.slice(1)}`) : '';
                  return (
                    <Link key={post.id} to={`/community/board/${post.id}`} className="board-card">
                      <div>
                        <div className="board-card-title">
                          {cat && (
                            <span className={`board-category-badge ${CATEGORY_CLASSES[cat] || ''}`}>
                              {catLabel}
                            </span>
                          )}
                          {post.title}
                        </div>
                        <div className="board-card-meta">
                          <span>{post.author_name || 'Anonymous'}</span>
                          <span>{new Date(post.created_at).toLocaleDateString()}</span>
                        </div>
                      </div>
                      <div className="board-card-stats">
                        <span><i className="fa-solid fa-eye" /> {post.views || 0}</span>
                        <span><i className="fa-solid fa-comment" /> {post.comment_count || 0}</span>
                      </div>
                    </Link>
                  );
                })}
              </div>
            ) : (
              <div className="board-empty">
                <div className="board-empty-icon"><i className="fa-solid fa-comments" /></div>
                <p>{language === 'ko' ? '게시글이 없습니다.' : 'No posts yet.'}</p>
              </div>
            )}

            <Pagination page={page} total={total} onPageChange={setPage} />
          </div>
        </div>
      </div>
    </div>
  );
}
