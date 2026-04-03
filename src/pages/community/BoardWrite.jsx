import { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { useLanguage } from '../../contexts/LanguageContext';
import { useToast } from '../../contexts/ToastContext';
import { supabase } from '../../utils/supabase';

const CATEGORIES = ['notice', 'tip', 'question', 'free', 'showcase'];

export default function BoardWrite() {
  const { user } = useAuth();
  const { language, t } = useLanguage();
  const toast = useToast();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const editId = searchParams.get('edit');

  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [category, setCategory] = useState('free');
  const [loading, setLoading] = useState(false);
  const [loadingPost, setLoadingPost] = useState(false);

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

  async function handleSubmit(e) {
    e.preventDefault();
    if (!title.trim() || !content.trim()) {
      toast.warning(language === 'ko' ? '제목과 내용을 입력해주세요.' : 'Please enter title and content.');
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
      toast.success(language === 'ko' ? '게시글이 수정되었습니다.' : 'Post updated.');
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
      toast.success(language === 'ko' ? '게시글이 작성되었습니다.' : 'Post created.');
      navigate('/community/board');
    }
  }

  if (loadingPost) return <div className="loading-page"><div className="loading-spinner" /></div>;

  return (
    <div className="board-write-page">
      <div className="container">
        <form className="board-write-form" onSubmit={handleSubmit}>
          <h1>{editId ? t('community.editPost') : (language === 'ko' ? '글쓰기' : 'Write a Post')}</h1>

          <div className="form-group">
            <label className="form-label">{t('community.category')}</label>
            <select
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
            <label className="form-label">{language === 'ko' ? '제목' : 'Title'}</label>
            <input className="form-input" value={title} onChange={e => setTitle(e.target.value)} required />
          </div>
          <div className="form-group">
            <label className="form-label">{language === 'ko' ? '내용' : 'Content'}</label>
            <textarea className="form-textarea" rows="12" value={content} onChange={e => setContent(e.target.value)} required />
          </div>

          <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end' }}>
            <button type="button" className="btn btn-secondary btn-sm" onClick={() => navigate(-1)}>
              {language === 'ko' ? '취소' : 'Cancel'}
            </button>
            <button type="submit" className="btn btn-primary btn-sm" disabled={loading}>
              {loading ? '...' : editId ? t('community.edit') : (language === 'ko' ? '작성' : 'Submit')}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
