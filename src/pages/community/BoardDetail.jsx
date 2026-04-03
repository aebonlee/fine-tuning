import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { useLanguage } from '../../contexts/LanguageContext';
import { useToast } from '../../contexts/ToastContext';
import { supabase } from '../../utils/supabase';
import SEO from '../../components/SEO';

const CATEGORY_CLASSES = {
  notice: 'board-category-notice',
  tip: 'board-category-resource',
  question: 'board-category-question',
  free: 'board-category-free',
  showcase: 'board-category-resource',
};

export default function BoardDetail() {
  const { id } = useParams();
  const { user } = useAuth();
  const { language, t } = useLanguage();
  const toast = useToast();
  const navigate = useNavigate();
  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [loading, setLoading] = useState(true);
  const [confirmDelete, setConfirmDelete] = useState(null);
  const [prevPost, setPrevPost] = useState(null);
  const [nextPost, setNextPost] = useState(null);

  useEffect(() => { loadPost(); }, [id]);

  async function loadPost() {
    setLoading(true);
    try {
      const { data } = await supabase
        .from('finetuning_board_posts')
        .select('*')
        .eq('id', id)
        .single();
      setPost(data);

      if (data) {
        try {
          await supabase.rpc('increment_finetuning_post_views', { post_uuid: id });
        } catch {
          await supabase.from('finetuning_board_posts').update({ views: (data.views || 0) + 1 }).eq('id', id);
        }

        const { data: prev } = await supabase
          .from('finetuning_board_posts')
          .select('id, title, category')
          .lt('created_at', data.created_at)
          .order('created_at', { ascending: false })
          .limit(1)
          .single();
        setPrevPost(prev || null);

        const { data: next } = await supabase
          .from('finetuning_board_posts')
          .select('id, title, category')
          .gt('created_at', data.created_at)
          .order('created_at', { ascending: true })
          .limit(1)
          .single();
        setNextPost(next || null);
      }

      const { data: commentsData } = await supabase
        .from('finetuning_board_comments')
        .select('*')
        .eq('post_id', id)
        .order('created_at', { ascending: true });
      setComments(commentsData || []);
    } catch {
      // fail silently
    } finally {
      setLoading(false);
    }
  }

  async function handleComment(e) {
    e.preventDefault();
    if (!newComment.trim() || !user) return;

    await supabase.from('finetuning_board_comments').insert({
      post_id: id,
      user_id: user.id,
      author_name: user.user_metadata?.full_name || user.email?.split('@')[0],
      content: newComment,
    });
    setNewComment('');
    loadPost();
  }

  async function handleDeletePost() {
    const { error } = await supabase.from('finetuning_board_posts').delete().eq('id', id);
    if (error) { toast.error(error.message); return; }
    toast.success(language === 'ko' ? '게시글이 삭제되었습니다.' : 'Post deleted.');
    navigate('/community/board');
  }

  async function handleDeleteComment(commentId) {
    const { error } = await supabase.from('finetuning_board_comments').delete().eq('id', commentId);
    if (error) { toast.error(error.message); return; }
    setConfirmDelete(null);
    loadPost();
  }

  if (loading) return <div className="loading-page"><div className="loading-spinner" /></div>;
  if (!post) return <div style={{ padding: '100px 20px', textAlign: 'center' }}>Post not found</div>;

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
      <div className="container">
        <Link to="/community/board" className="btn-link" style={{ marginBottom: '20px', display: 'inline-flex' }}>
          &larr; {language === 'ko' ? '목록으로' : 'Back to list'}
        </Link>
        <div className="board-detail">
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
              <span>{post.author_name || 'Anonymous'}</span>
              <span>{new Date(post.created_at).toLocaleDateString()}</span>
              <span><i className="fa-solid fa-eye" />{post.views || 0}</span>
            </div>
          </div>
          <div className="board-detail-body" dangerouslySetInnerHTML={{ __html: post.content?.replace(/\n/g, '<br/>') }} />

          {isOwner && (
            <div className="board-actions">
              <Link to={`/community/board/write?edit=${id}`} className="btn-edit">
                <i className="fa-solid fa-pen" />{t('community.edit')}
              </Link>
              <button className="btn-delete" onClick={() => setConfirmDelete('post')}>
                <i className="fa-solid fa-trash" />{t('community.delete')}
              </button>
            </div>
          )}

          <div className="board-nav-posts">
            {nextPost ? (
              <Link to={`/community/board/${nextPost.id}`} className="board-nav-item">
                <span className="board-nav-label">{'\u25B2'} {language === 'ko' ? '다음 글' : 'Next'}</span>
                <span className="board-nav-title">{nextPost.title}</span>
              </Link>
            ) : (
              <div className="board-nav-item board-nav-empty">
                <span className="board-nav-label">{'\u25B2'} {language === 'ko' ? '다음 글' : 'Next'}</span>
                <span className="board-nav-title-empty">{language === 'ko' ? '다음 글이 없습니다.' : 'No next post.'}</span>
              </div>
            )}
            {prevPost ? (
              <Link to={`/community/board/${prevPost.id}`} className="board-nav-item">
                <span className="board-nav-label">{'\u25BC'} {language === 'ko' ? '이전 글' : 'Prev'}</span>
                <span className="board-nav-title">{prevPost.title}</span>
              </Link>
            ) : (
              <div className="board-nav-item board-nav-empty">
                <span className="board-nav-label">{'\u25BC'} {language === 'ko' ? '이전 글' : 'Prev'}</span>
                <span className="board-nav-title-empty">{language === 'ko' ? '이전 글이 없습니다.' : 'No previous post.'}</span>
              </div>
            )}
          </div>

          <div className="comments-section">
            <h3>{language === 'ko' ? '댓글' : 'Comments'} ({comments.length})</h3>
            {comments.map(c => (
              <div key={c.id} className="comment-item">
                <div className="comment-avatar">{(c.author_name || 'A').charAt(0).toUpperCase()}</div>
                <div className="comment-content">
                  <span className="comment-author">{c.author_name}</span>
                  <span className="comment-date">{new Date(c.created_at).toLocaleDateString()}</span>
                  {user && c.user_id === user.id && (
                    <button className="comment-delete-btn" onClick={() => setConfirmDelete(c.id)}>
                      {t('community.delete')}
                    </button>
                  )}
                  <p className="comment-text">{c.content}</p>
                </div>
              </div>
            ))}
            {user && (
              <form className="comment-form" onSubmit={handleComment}>
                <textarea
                  value={newComment}
                  onChange={e => setNewComment(e.target.value)}
                  placeholder={language === 'ko' ? '댓글을 입력하세요.' : 'Write a comment...'}
                />
                <button type="submit" className="btn btn-primary btn-sm">{language === 'ko' ? '작성' : 'Post'}</button>
              </form>
            )}
          </div>
        </div>
      </div>

      {confirmDelete && (
        <div className="board-confirm-overlay" onClick={() => setConfirmDelete(null)}>
          <div className="board-confirm-modal" onClick={e => e.stopPropagation()}>
            <p>{confirmDelete === 'post' ? t('community.deleteConfirm') : t('community.deleteCommentConfirm')}</p>
            <div className="board-confirm-actions">
              <button className="board-confirm-cancel" onClick={() => setConfirmDelete(null)}>
                {language === 'ko' ? '취소' : 'Cancel'}
              </button>
              <button
                className="board-confirm-delete"
                onClick={() => confirmDelete === 'post' ? handleDeletePost() : handleDeleteComment(confirmDelete)}
              >
                {t('community.delete')}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
