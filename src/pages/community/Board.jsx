import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { useLanguage } from '../../contexts/LanguageContext';
import { supabase } from '../../utils/supabase';
import SEO from '../../components/SEO';

const PER_PAGE = 15;
const CATEGORIES = ['all', 'notice', 'tip', 'question', 'free', 'showcase'];

const CATEGORY_CLASSES = {
  notice: 'board-category-notice',
  tip: 'board-category-resource',
  question: 'board-category-question',
  free: 'board-category-free',
  showcase: 'board-category-resource',
};

export default function Board() {
  const { isLoggedIn } = useAuth();
  const { language, t } = useLanguage();
  const [posts, setPosts] = useState([]);
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [categoryFilter, setCategoryFilter] = useState('all');

  useEffect(() => { loadPosts(); }, [page, search, categoryFilter]);

  async function loadPosts() {
    setLoading(true);
    try {
      let query = supabase
        .from('finetuning_board_posts')
        .select('*', { count: 'exact' })
        .order('created_at', { ascending: false })
        .range((page - 1) * PER_PAGE, page * PER_PAGE - 1);

      if (search.trim()) {
        query = query.ilike('title', `%${search}%`);
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
    <div className="community-page">
      <SEO
        title={language === 'ko' ? '커뮤니티' : 'Community'}
        description={language === 'ko'
          ? 'AI 파인튜닝 학습자 커뮤니티에서 질문하고 경험을 공유하세요.'
          : 'Ask questions and share experiences in the AI fine-tuning learning community.'}
        path="/community/board"
      />
      <div className="container">
        <h1>{t('community.title')}</h1>
        <p className="page-desc">{t('community.desc')}</p>

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
              <i className="fa-solid fa-pen" />{t('community.write')}
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
                    <span><i className="fa-solid fa-eye" />{post.views || 0}</span>
                    <span><i className="fa-solid fa-comment" />{post.comment_count || 0}</span>
                  </div>
                </Link>
              );
            })}
          </div>
        ) : (
          <div style={{ textAlign: 'center', padding: '60px 20px', color: 'var(--text-light)' }}>
            <p style={{ fontSize: '48px', marginBottom: '12px', opacity: 0.3 }}><i className="fa-solid fa-comments" style={{ fontSize: '48px' }} /></p>
            <p>{language === 'ko' ? '게시글이 없습니다.' : 'No posts yet.'}</p>
          </div>
        )}

        {total > 1 && (
          <div style={{ display: 'flex', justifyContent: 'center', gap: '8px', marginTop: '24px' }}>
            {Array.from({ length: total }, (_, i) => (
              <button
                key={i}
                className={`btn btn-sm ${page === i + 1 ? 'btn-primary' : 'btn-secondary'}`}
                onClick={() => setPage(i + 1)}
              >
                {i + 1}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
