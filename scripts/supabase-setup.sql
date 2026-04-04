-- ============================================
-- FineTuning - Supabase Database Setup
-- 접두사: finetuning_
-- ============================================

-- ============================================
-- 1. user_profiles (Family Site 공용)
--    이미 존재하면 SKIP
-- ============================================
CREATE TABLE IF NOT EXISTS public.user_profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name TEXT,
  avatar_url TEXT,
  bio TEXT,
  signup_domain TEXT,
  visited_sites TEXT[] DEFAULT '{}',
  last_sign_in_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- user_profiles: 본인만 읽기/수정
ALTER TABLE public.user_profiles ENABLE ROW LEVEL SECURITY;

DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'user_profiles_select_own') THEN
    CREATE POLICY user_profiles_select_own ON public.user_profiles
      FOR SELECT USING (auth.uid() = id);
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'user_profiles_insert_own') THEN
    CREATE POLICY user_profiles_insert_own ON public.user_profiles
      FOR INSERT WITH CHECK (auth.uid() = id);
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'user_profiles_update_own') THEN
    CREATE POLICY user_profiles_update_own ON public.user_profiles
      FOR UPDATE USING (auth.uid() = id);
  END IF;
END $$;

-- user_profiles: 신규 가입 시 자동 생성 트리거
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.user_profiles (id, full_name, avatar_url)
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data->>'full_name', NEW.raw_user_meta_data->>'name', ''),
    COALESCE(NEW.raw_user_meta_data->>'avatar_url', NEW.raw_user_meta_data->>'picture', '')
  )
  ON CONFLICT (id) DO NOTHING;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- ============================================
-- 2. finetuning_board_posts (게시판 글)
-- ============================================
CREATE TABLE IF NOT EXISTS public.finetuning_board_posts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  author_name TEXT NOT NULL DEFAULT '',
  title TEXT NOT NULL,
  content TEXT NOT NULL DEFAULT '',
  category TEXT NOT NULL DEFAULT 'free'
    CHECK (category IN ('notice', 'tip', 'question', 'free', 'showcase')),
  views INTEGER NOT NULL DEFAULT 0,
  comment_count INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 인덱스
CREATE INDEX IF NOT EXISTS idx_finetuning_posts_created
  ON public.finetuning_board_posts(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_finetuning_posts_category
  ON public.finetuning_board_posts(category);
CREATE INDEX IF NOT EXISTS idx_finetuning_posts_user
  ON public.finetuning_board_posts(user_id);

-- RLS: 누구나 읽기, 로그인 사용자 쓰기, 작성자만 수정/삭제
ALTER TABLE public.finetuning_board_posts ENABLE ROW LEVEL SECURITY;

CREATE POLICY finetuning_posts_select_all ON public.finetuning_board_posts
  FOR SELECT USING (true);

CREATE POLICY finetuning_posts_insert_auth ON public.finetuning_board_posts
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY finetuning_posts_update_own ON public.finetuning_board_posts
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY finetuning_posts_delete_own ON public.finetuning_board_posts
  FOR DELETE USING (auth.uid() = user_id);

-- ============================================
-- 3. finetuning_board_comments (댓글)
-- ============================================
CREATE TABLE IF NOT EXISTS public.finetuning_board_comments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  post_id UUID NOT NULL REFERENCES public.finetuning_board_posts(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  author_name TEXT NOT NULL DEFAULT '',
  content TEXT NOT NULL DEFAULT '',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 인덱스
CREATE INDEX IF NOT EXISTS idx_finetuning_comments_post
  ON public.finetuning_board_comments(post_id, created_at ASC);

-- RLS: 누구나 읽기, 로그인 사용자 쓰기, 작성자만 삭제
ALTER TABLE public.finetuning_board_comments ENABLE ROW LEVEL SECURITY;

CREATE POLICY finetuning_comments_select_all ON public.finetuning_board_comments
  FOR SELECT USING (true);

CREATE POLICY finetuning_comments_insert_auth ON public.finetuning_board_comments
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY finetuning_comments_delete_own ON public.finetuning_board_comments
  FOR DELETE USING (auth.uid() = user_id);

-- ============================================
-- 4. 조회수 증가 RPC 함수
-- ============================================
CREATE OR REPLACE FUNCTION public.increment_finetuning_post_views(post_uuid UUID)
RETURNS VOID AS $$
BEGIN
  UPDATE public.finetuning_board_posts
  SET views = views + 1
  WHERE id = post_uuid;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- ============================================
-- 5. 댓글 수 자동 업데이트 트리거
-- ============================================
CREATE OR REPLACE FUNCTION public.update_finetuning_comment_count()
RETURNS TRIGGER AS $$
BEGIN
  IF TG_OP = 'INSERT' THEN
    UPDATE public.finetuning_board_posts
    SET comment_count = (
      SELECT COUNT(*) FROM public.finetuning_board_comments WHERE post_id = NEW.post_id
    )
    WHERE id = NEW.post_id;
  ELSIF TG_OP = 'DELETE' THEN
    UPDATE public.finetuning_board_posts
    SET comment_count = (
      SELECT COUNT(*) FROM public.finetuning_board_comments WHERE post_id = OLD.post_id
    )
    WHERE id = OLD.post_id;
  END IF;
  RETURN NULL;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

DROP TRIGGER IF EXISTS trg_finetuning_comment_count ON public.finetuning_board_comments;
CREATE TRIGGER trg_finetuning_comment_count
  AFTER INSERT OR DELETE ON public.finetuning_board_comments
  FOR EACH ROW EXECUTE FUNCTION public.update_finetuning_comment_count();

-- ============================================
-- 6. updated_at 자동 갱신 트리거
-- ============================================
CREATE OR REPLACE FUNCTION public.set_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS trg_finetuning_posts_updated ON public.finetuning_board_posts;
CREATE TRIGGER trg_finetuning_posts_updated
  BEFORE UPDATE ON public.finetuning_board_posts
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

DROP TRIGGER IF EXISTS trg_user_profiles_updated ON public.user_profiles;
CREATE TRIGGER trg_user_profiles_updated
  BEFORE UPDATE ON public.user_profiles
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();
