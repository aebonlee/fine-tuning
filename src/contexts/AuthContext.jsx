import { createContext, useContext, useState, useEffect } from 'react';
import { supabase } from '../utils/supabase';
import { isAdmin } from '../config/admin';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session }, error }) => {
      if (error) console.error('Failed to get session:', error.message);
      setUser(session?.user ?? null);
      if (session?.user) loadProfile(session.user.id);
      setLoading(false);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      const u = session?.user ?? null;
      setUser(u);
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

  async function loadProfile(userId) {
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
        const updates = {};
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
    } catch (err) {
      console.error('Unexpected error loading profile:', err);
      setProfile(null);
    }
  }

  async function updateProfile(updates) {
    if (!user) return { error: 'Not authenticated' };
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
    } catch (err) {
      console.error('Unexpected sign out error:', err);
    } finally {
      setUser(null);
      setProfile(null);
    }
  }

  const value = {
    user,
    profile,
    loading,
    isLoggedIn: !!user,
    isAdmin: isAdmin(user?.email),
    signOut,
    updateProfile,
    refreshProfile: () => user && loadProfile(user.id),
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
}
