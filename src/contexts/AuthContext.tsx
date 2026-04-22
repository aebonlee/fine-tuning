import {createContext, useContext, useState, useEffect, ReactNode, useCallback} from 'react';
import { supabase, setSharedSession, getSharedSession, clearSharedSession } from '../utils/supabase';
import { isAdmin } from '../config/admin';
import { useIdleTimeout } from '../hooks/useIdleTimeout';
import ProfileCompleteModal from '../components/ProfileCompleteModal';

import PaymentNudgePopup from '../components/PaymentNudgePopup';
interface AuthContextType {
  user: any;
  profile: any;
  loading: boolean;
  isLoggedIn: boolean;
  isAdmin: boolean;
  signOut: () => Promise<void>;
  updateProfile: (updates: Record<string, any>) => Promise<{ data: any; error: any }>;
  refreshProfile: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<any>(null);
  const [profile, setProfile] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase.auth.getSession().then(async ({ data: { session }, error }) => {
      if (error) console.error('Failed to get session:', error.message);
      setUser(session?.user ?? null);
      if (session?.user) loadProfile(session.user.id);
      if (!session?.user) {
        const rt = getSharedSession();
        if (rt) {
          try {
            const { data } = await supabase.auth.refreshSession({ refresh_token: rt });
            if (!data.session) clearSharedSession();
          } catch { clearSharedSession(); }
        }
      }
      setLoading(false);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      const u = session?.user ?? null;
      setUser(u);
      if (session?.refresh_token) setSharedSession(session.refresh_token);
      if (event === 'SIGNED_OUT') clearSharedSession();
      if (u) {
        loadProfile(u.id);
        if (event === 'SIGNED_IN') {
          supabase.from('user_profiles')
            .update({ last_sign_in_at: new Date().toISOString() })
            .eq('id', u.id)
            .then(({ error }) => {
              if (error) console.error('Failed to update sign-in time:', error.message);
            });
        }
      } else {
        setProfile(null);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  async function loadProfile(userId: string) {
    try {
      const { data: profileData, error } = await supabase
        .from('user_profiles')
        .select('*')
        .eq('id', userId)
        .single();
      if (error) {
        console.error('Failed to load profile:', error.message);
        setProfile(null);
        return;
      }
      if (profileData) {
        setProfile(profileData);
        const currentDomain = window.location.hostname;
        const updates: Record<string, any> = {};
        if (!profileData.signup_domain) updates.signup_domain = currentDomain;
        const sites = Array.isArray(profileData.visited_sites) ? profileData.visited_sites : [];
        if (!sites.includes(currentDomain)) {
          updates.visited_sites = [...sites, currentDomain];
        }
        if (Object.keys(updates).length > 0) {
          supabase.from('user_profiles').update(updates).eq('id', userId)
            .then(({ error: updateError }) => {
              if (updateError) console.error('Failed to update profile domain:', updateError.message);
            });
        }
      } else {
        setProfile(null);
      }
    } catch (err: any) {
      console.error('Unexpected error loading profile:', err);
      setProfile(null);
    }
  }

  async function updateProfile(updates: Record<string, any>) {
    if (!user) return { error: 'Not authenticated', data: null };
    const { data, error } = await supabase
      .from('user_profiles')
      .upsert({ id: user.id, ...updates }, { onConflict: 'id' })
      .select()
      .single();
    if (data) setProfile(data);
    return { data, error };
  }

  async function signOut() {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) console.error('Sign out error:', error.message);
    } catch (err: any) {
      console.error('Unexpected sign out error:', err);
    } finally {
      setUser(null);
      setProfile(null);
    }
  }

  const value: AuthContextType = {
    user,
    profile,
    loading,
    isLoggedIn: !!user,
    isAdmin: isAdmin(user?.email),
    signOut,
    updateProfile,
    refreshProfile: () => user && loadProfile(user.id),
  };


  // 10분 무동작 세션 타임아웃
  useIdleTimeout({
  enabled: !!user,
  onTimeout: () => {
  clearSharedSession();
  },
  });
  const refreshProfile = useCallback(async () => { if (user) await loadProfile(user); }, [user, loadProfile]);
  const needsProfileCompletion = !!user && !!profile && !profile.name;


  return (
    <AuthContext.Provider value={value}>
      {children}
      {needsProfileCompletion && user && (
        <ProfileCompleteModal user={user} onComplete={refreshProfile} />
      )}
    {isLoggedIn && user && !needsProfileCompletion && (
      <PaymentNudgePopup user={user} siteSlug="fine-tuning" />
    )}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
}
