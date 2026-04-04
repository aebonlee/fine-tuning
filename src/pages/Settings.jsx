import { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useLanguage } from '../contexts/LanguageContext';
import { useToast } from '../contexts/ToastContext';
import PageHeader from '../components/PageHeader';

export default function Settings() {
  const { user, profile, updateProfile } = useAuth();
  const { language, t } = useLanguage();
  const toast = useToast();

  const [activeTab, setActiveTab] = useState('profile');
  const [displayName, setDisplayName] = useState(profile?.display_name || user?.user_metadata?.full_name || '');
  const [saving, setSaving] = useState(false);

  async function handleSaveProfile() {
    setSaving(true);
    const { error } = await updateProfile({ display_name: displayName });
    setSaving(false);
    if (error) { toast.error(error.message || 'Error saving profile'); return; }
    toast.success(t('settings.saved'));
  }

  const tabs = [
    { id: 'profile', label: t('settings.profile') },
  ];

  return (
    <div className="settings-page">
      <PageHeader
        icon="fa-gear"
        title={t('settings.title')}
        description={t('settings.profileDesc')}
        breadcrumbs={[
          { label: t('nav.home'), to: '/' },
          { label: t('settings.title') },
        ]}
      />
      <div className="container">
        <div className="settings-layout">
          <nav>
            <ul className="settings-nav">
              {tabs.map(tab => (
                <li key={tab.id}>
                  <button
                    className={`settings-nav-item ${activeTab === tab.id ? 'active' : ''}`}
                    onClick={() => setActiveTab(tab.id)}
                  >
                    {tab.label}
                  </button>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            {activeTab === 'profile' && (
              <div className="settings-card">
                <h2>{t('settings.profile')}</h2>
                <p className="settings-card-desc">{t('settings.profileDesc')}</p>
                <div className="profile-avatar-section">
                  <div className="profile-avatar">
                    {profile?.avatar_url ? <img src={profile.avatar_url} alt="" /> : (displayName || 'U').charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <div style={{ fontWeight: 600, marginBottom: '4px' }}>{displayName || 'User'}</div>
                    <div style={{ fontSize: '14px', color: 'var(--text-light)' }}>{user?.email}</div>
                  </div>
                </div>
                <div className="form-group">
                  <label className="form-label">{t('auth.name')}</label>
                  <input className="form-input" value={displayName} onChange={e => setDisplayName(e.target.value)} />
                </div>
                <div className="form-group">
                  <label className="form-label">{t('auth.email')}</label>
                  <input className="form-input" value={user?.email || ''} disabled />
                </div>
                <div className="settings-btn-group">
                  <button className="btn btn-primary btn-sm" onClick={handleSaveProfile} disabled={saving}>
                    {saving ? '...' : t('settings.save')}
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
