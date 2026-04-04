import { useState, useEffect, useCallback } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { useLanguage } from '../../contexts/LanguageContext';
import { useToast } from '../../contexts/ToastContext';
import { supabase } from '../../utils/supabase';

const CATEGORIES = ['notice', 'tip', 'question', 'free', 'showcase'];

export default function BoardWrite() {
  const { user } = useAuth();
  const { t } = useLanguage();
  const toast = useToast();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const editId = searchParams.get('edit');

  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [category, setCategory] = useState('free');
  const [loading, setLoading] = useState(false);
  const [loadingPost, setLoadingPost] = useState(false);
  const [isDirty, setIsDirty] = useState(false);

  useEffect(() => {
    if (!editId) return;
    setLoadingPost(true);
    supabase
      .from('finetuning_board_posts')
      .select('*')
      .eq('id', editId)
      .single()
      .then(({ data }) => {
        if (data) {
          setTitle(data.title);
          setContent(data.content);
          setCategory(data.category || 'free');
        }
        setLoadingPost(false);
      });
  }, [editId]);

  // Track unsaved changes
  const handleTitleChange = useCallback((e) => { setTitle(e.target.value); setIsDirty(true); }, []);
  const handleContentChange = useCallback((e) => { setContent(e.target.value); setIsDirty(true); }, []);

  // Warn on page leave with unsaved changes
  useEffect(() => {
    if (!isDirty) return;
    const handleBeforeUnload = (e) => {
      e.preventDefault();
      e.returnValue = '';
    };
    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => window.removeEventListener('beforeunload', handleBeforeUnload);
  }, [isDirty]);

  async function handleSubmit(e) {
    e.preventDefault();
    if (!title.trim() || !content.trim()) {
      toast.warning(t('community.enterTitleContent'));
      return;
    }

    setLoading(true);

    if (editId) {
      const { error } = await supabase
        .from('finetuning_board_posts')
        .update({ title, content, category })
        .eq('id', editId);
      setLoading(false);
      if (error) { toast.error(error.message); return; }
      setIsDirty(false);
      toast.success(t('community.postUpdated'));
      navigate(`/community/board/${editId}`);
    } else {
      const { error } = await supabase.from('finetuning_board_posts').insert({
        title,
        content,
        category,
        user_id: user.id,
        author_name: user.user_metadata?.full_name || user.email?.split('@')[0],
      });
      setLoading(false);
      if (error) { toast.error(error.message); return; }
      setIsDirty(false);
      toast.success(t('community.postCreated'));
      navigate('/community/board');
    }
  }

  function handleCancel() {
    if (isDirty && !window.confirm(t('community.unsavedWarning'))) return;
    navigate(-1);
  }

  if (loadingPost) return <div className="loading-page" role="status" aria-label="Loading"><div className="loading-spinner" /></div>;

  return (
    <div className="ck-page">
      <div className="container">
        <div className="ck-content-box board-write-form">
          <div className="ck-content-header ck-ch--blue">
            <i className="fa-solid fa-pen" />
            <h2>{editId ? t('community.editPost') : t('community.writeTitle')}</h2>
          </div>
          <div className="ck-content-body">
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="post-category" className="form-label">{t('community.category')}</label>
                <select
                  id="post-category"
                  className="board-category-select"
                  value={category}
                  onChange={e => setCategory(e.target.value)}
                >
                  {CATEGORIES.map(cat => (
                    <option key={cat} value={cat}>
                      {t(`community.category${cat.charAt(0).toUpperCase() + cat.slice(1)}`)}
                    </option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="post-title" className="form-label">{t('community.titleLabel')}</label>
                <input id="post-title" className="form-input" value={title} onChange={handleTitleChange} required />
              </div>
              <div className="form-group">
                <label htmlFor="post-content" className="form-label">{t('community.contentLabel')}</label>
                <textarea id="post-content" className="form-textarea" rows={12} value={content} onChange={handleContentChange} required />
              </div>

              <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end' }}>
                <button type="button" className="btn btn-secondary btn-sm" onClick={handleCancel}>
                  {t('community.cancel')}
                </button>
                <button type="submit" className="btn btn-primary btn-sm" disabled={loading}>
                  {loading ? <span className="loading-spinner" style={{ width: 20, height: 20, borderWidth: 2 }} /> : editId ? t('community.edit') : t('community.submit')}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
