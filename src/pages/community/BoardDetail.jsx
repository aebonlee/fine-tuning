import { useState, useEffect, useCallback } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { useLanguage } from '../../contexts/LanguageContext';
import { useToast } from '../../contexts/ToastContext';
import { supabase } from '../../utils/supabase';
import SEO from '../../components/SEO';
import PageHeader from '../../components/PageHeader';

const CATEGORY_CLASSES = {
  notice: 'board-category-notice',
  tip: 'board-category-tip',
  question: 'board-category-question',
  free: 'board-category-free',
  showcase: 'board-category-showcase',
};

export default function BoardDetail() {
  const { id } = useParams();
  const { user } = useAuth();
  const { t } = useLanguage();
  const toast = useToast();
  const navigate = useNavigate();
  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [loading, setLoading] = useState(true);
  const [confirmDelete, setConfirmDelete] = useState(null);
  const [prevPost, setPrevPost] = useState(null);
  const [nextPost, setNextPost] = useState(null);

  const loadPost = useCallback(async () => {
    setLoading(true);
    try {
      const { data } = await supabase
        .from('finetuning_board_posts')
        .select('*')
        .eq('id', id)
        .single();
      setPost(data);

      if (data) {
        // View count increment (fire-and-forget with error logging)
        supabase.rpc('increment_finetuning_post_views', { post_uuid: id })
          .then(({ error }) => {
            if (error) {
              supabase.from('finetuning_board_posts')
                .update({ views: (data.views || 0) + 1 })
                .eq('id', id)
                .then(({ error: e2 }) => { if (e2) console.error('View count update failed:', e2.message); });
            }
          });

        // Parallel fetch: prev/next posts + comments
        const [prevRes, nextRes, commentsRes] = await Promise.all([
          supabase
            .from('finetuning_board_posts')
            .select('id, title, category')
            .lt('created_at', data.created_at)
            .order('created_at', { ascending: false })
            .limit(1)
            .single(),
          supabase
            .from('finetuning_board_posts')
            .select('id, title, category')
            .gt('created_at', data.created_at)
            .order('created_at', { ascending: true })
            .limit(1)
            .single(),
          supabase
            .from('finetuning_board_comments')
            .select('*')
            .eq('post_id', id)
            .order('created_at', { ascending: true }),
        ]);

        setPrevPost(prevRes.data || null);
        setNextPost(nextRes.data || null);
        setComments(commentsRes.data || []);
      }
    } catch (err) {
      console.error('Failed to load post:', err);
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => { loadPost(); }, [loadPost]);

  async function handleComment(e) {
    e.preventDefault();
    if (!newComment.trim() || !user) return;

    const { error } = await supabase.from('finetuning_board_comments').insert({
      post_id: id,
      user_id: user.id,
      author_name: user.user_metadata?.full_name || user.email?.split('@')[0],
      content: newComment,
    });
    if (error) { toast.error(error.message); return; }
    setNewComment('');
    loadPost();
  }

  async function handleDeletePost() {
    const { error } = await supabase.from('finetuning_board_posts').delete().eq('id', id);
    if (error) { toast.error(error.message); return; }
    toast.success(t('community.postDeleted'));
    navigate('/community/board');
  }

  async function handleDeleteComment(commentId) {
    const { error } = await supabase.from('finetuning_board_comments').delete().eq('id', commentId);
    if (error) { toast.error(error.message); return; }
    setConfirmDelete(null);
    loadPost();
  }

  // Close modal on Escape
  useEffect(() => {
    if (!confirmDelete) return;
    const handleEsc = (e) => { if (e.key === 'Escape') setConfirmDelete(null); };
    document.addEventListener('keydown', handleEsc);
    return () => document.removeEventListener('keydown', handleEsc);
  }, [confirmDelete]);

  if (loading) return <div className="loading-page" role="status" aria-label="Loading"><div className="loading-spinner" /></div>;
  if (!post) return (
    <div className="board-detail-page">
      <div className="container">
        <div className="board-empty" role="alert">
          <div className="board-empty-icon">📄</div>
          <p>{t('community.postNotFound')}</p>
          <Link to="/community/board" className="btn btn-primary btn-sm" style={{ marginTop: '16px' }}>
            {t('community.backToList')}
          </Link>
        </div>
      </div>
    </div>
  );

  const isOwner = user && post.user_id === user.id;
  const categoryKey = post.category || '';
  const categoryLabel = categoryKey ? t(`community.category${categoryKey.charAt(0).toUpperCase() + categoryKey.slice(1)}`) : '';

  return (
    <div className="board-detail-page">
      <SEO
        title={post.title}
        description={post.content?.replace(/<[^>]*>/g, '').slice(0, 160)}
        path={`/community/board/${id}`}
        type="article"
        noindex
      />
      <PageHeader
        icon="fa-file-alt"
        title={post.title}
        breadcrumbs={[
          { label: t('nav.home'), to: '/' },
          { label: t('nav.community'), to: '/community/board' },
          { label: post.title },
        ]}
      />
      <div className="container">
        <article className="board-detail">
          <div className="board-detail-header">
            <h1 className="board-detail-title">
              {categoryKey && (
                <span className={`board-category-badge ${CATEGORY_CLASSES[categoryKey] || ''}`}>
                  {categoryLabel}
                </span>
              )}
              {post.title}
            </h1>
            <div className="board-detail-meta">
              <span>{post.author_name || t('community.anonymous')}</span>
              <span>{new Date(post.created_at).toLocaleDateString()}</span>
              <span><i className="fa-solid fa-eye" aria-hidden="true" /> {post.views || 0}</span>
            </div>
          </div>
          <div className="board-detail-body board-detail-content">{post.content}</div>

          {isOwner && (
            <div className="board-actions">
              <Link to={`/community/board/write?edit=${id}`} className="btn-edit">
                <i className="fa-solid fa-pen" aria-hidden="true" />{t('community.edit')}
              </Link>
              <button className="btn-delete" onClick={() => setConfirmDelete('post')}>
                <i className="fa-solid fa-trash" aria-hidden="true" />{t('community.delete')}
              </button>
            </div>
          )}

          <nav className="board-nav-posts" aria-label={t('community.prevPost') + ' / ' + t('community.nextPost')}>
            {nextPost ? (
              <Link to={`/community/board/${nextPost.id}`} className="board-nav-item">
                <span className="board-nav-label">{'\u25B2'} {t('community.nextPost')}</span>
                <span className="board-nav-title">{nextPost.title}</span>
              </Link>
            ) : (
              <div className="board-nav-item board-nav-empty">
                <span className="board-nav-label">{'\u25B2'} {t('community.nextPost')}</span>
                <span className="board-nav-title-empty">{t('community.noNextPost')}</span>
              </div>
            )}
            {prevPost ? (
              <Link to={`/community/board/${prevPost.id}`} className="board-nav-item">
                <span className="board-nav-label">{'\u25BC'} {t('community.prevPost')}</span>
                <span className="board-nav-title">{prevPost.title}</span>
              </Link>
            ) : (
              <div className="board-nav-item board-nav-empty">
                <span className="board-nav-label">{'\u25BC'} {t('community.prevPost')}</span>
                <span className="board-nav-title-empty">{t('community.noPrevPost')}</span>
              </div>
            )}
          </nav>

          <section className="comments-section" aria-label={t('community.comments')}>
            <h3>{t('community.comments')} ({comments.length})</h3>
            {comments.map(c => (
              <div key={c.id} className="comment-item">
                <div className="comment-avatar" aria-hidden="true">{(c.author_name || 'A').charAt(0).toUpperCase()}</div>
                <div className="comment-content">
                  <span className="comment-author">{c.author_name}</span>
                  <span className="comment-date">{new Date(c.created_at).toLocaleDateString()}</span>
                  {user && c.user_id === user.id && (
                    <button className="comment-delete-btn" onClick={() => setConfirmDelete(c.id)} aria-label={t('community.delete')}>
                      {t('community.delete')}
                    </button>
                  )}
                  <p className="comment-text">{c.content}</p>
                </div>
              </div>
            ))}
            {user && (
              <form className="comment-form" onSubmit={handleComment}>
                <label htmlFor="comment-input" className="sr-only">{t('community.commentPlaceholder')}</label>
                <textarea
                  id="comment-input"
                  value={newComment}
                  onChange={e => setNewComment(e.target.value)}
                  placeholder={t('community.commentPlaceholder')}
                />
                <button type="submit" className="btn btn-primary btn-sm">{t('community.commentSubmit')}</button>
              </form>
            )}
          </section>
        </article>
      </div>

      {confirmDelete && (
        <div className="board-confirm-overlay" onClick={() => setConfirmDelete(null)} role="presentation">
          <div className="board-confirm-modal" role="dialog" aria-modal="true" aria-labelledby="confirm-dialog-text" onClick={e => e.stopPropagation()}>
            <p id="confirm-dialog-text">{confirmDelete === 'post' ? t('community.deleteConfirm') : t('community.deleteCommentConfirm')}</p>
            <div className="board-confirm-actions">
              <button className="board-confirm-cancel" onClick={() => setConfirmDelete(null)}>
                {t('common.cancel')}
              </button>
              <button
                className="board-confirm-delete"
                onClick={() => confirmDelete === 'post' ? handleDeletePost() : handleDeleteComment(confirmDelete)}
                autoFocus
              >
                {t('common.delete')}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
