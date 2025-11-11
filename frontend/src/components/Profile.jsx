import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

export default function Profile() {
  const { user, logout, loading } = useAuth();
  const navigate = useNavigate();

  async function handleLogout() {
    await logout();
    navigate('/login');
  }

  if (loading || !user) {
    return (
      <div style={styles.container}>
        <div style={styles.card}>
          <p>Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <div style={styles.header}>
          <div style={styles.avatar}>
            {user.full_name ? user.full_name[0].toUpperCase() : user.email[0].toUpperCase()}
          </div>
          <h1 style={styles.name}>{user.full_name || 'Dutch Learner'}</h1>
          <p style={styles.email}>{user.email}</p>
        </div>

        <div style={styles.stats}>
          <div style={styles.statItem}>
            <div style={styles.statLabel}>Member Since</div>
            <div style={styles.statValue}>
              {new Date(user.created_at).toLocaleDateString('en-US', {
                month: 'short',
                year: 'numeric',
              })}
            </div>
          </div>
          <div style={styles.statItem}>
            <div style={styles.statLabel}>Auth Method</div>
            <div style={styles.statValue}>{user.auth_provider}</div>
          </div>
          <div style={styles.statItem}>
            <div style={styles.statLabel}>Status</div>
            <div style={styles.statValue}>
              {user.is_verified ? '✓ Verified' : 'Not verified'}
            </div>
          </div>
        </div>

        <div style={styles.section}>
          <h2 style={styles.sectionTitle}>Account Information</h2>
          <div style={styles.infoGrid}>
            <div style={styles.infoItem}>
              <span style={styles.infoLabel}>Email:</span>
              <span style={styles.infoValue}>{user.email}</span>
            </div>
            <div style={styles.infoItem}>
              <span style={styles.infoLabel}>Account ID:</span>
              <span style={styles.infoValue}>{user.id.slice(0, 8)}...</span>
            </div>
            {user.last_login_at && (
              <div style={styles.infoItem}>
                <span style={styles.infoLabel}>Last Login:</span>
                <span style={styles.infoValue}>
                  {new Date(user.last_login_at).toLocaleString()}
                </span>
              </div>
            )}
          </div>
        </div>

        <div style={styles.actions}>
          <button onClick={() => navigate('/')} style={styles.secondaryButton}>
            Back to Learning
          </button>
          <button onClick={handleLogout} style={styles.logoutButton}>
            Sign Out
          </button>
        </div>
      </div>
    </div>
  );
}

const styles = {
  container: {
    minHeight: '100vh',
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    padding: '40px 20px',
  },
  card: {
    maxWidth: '600px',
    margin: '0 auto',
    background: 'white',
    borderRadius: '16px',
    padding: '40px',
    boxShadow: '0 20px 60px rgba(0,0,0,0.3)',
  },
  header: {
    textAlign: 'center',
    marginBottom: '40px',
  },
  avatar: {
    width: '80px',
    height: '80px',
    borderRadius: '50%',
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    color: 'white',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '32px',
    fontWeight: 'bold',
    margin: '0 auto 16px',
  },
  name: {
    fontSize: '24px',
    fontWeight: 'bold',
    color: '#1a202c',
    marginBottom: '4px',
  },
  email: {
    fontSize: '14px',
    color: '#718096',
  },
  stats: {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    gap: '20px',
    marginBottom: '40px',
    padding: '20px',
    background: '#f7fafc',
    borderRadius: '12px',
  },
  statItem: {
    textAlign: 'center',
  },
  statLabel: {
    fontSize: '12px',
    color: '#718096',
    marginBottom: '4px',
  },
  statValue: {
    fontSize: '16px',
    fontWeight: '600',
    color: '#2d3748',
  },
  section: {
    marginBottom: '30px',
  },
  sectionTitle: {
    fontSize: '18px',
    fontWeight: '600',
    color: '#2d3748',
    marginBottom: '16px',
  },
  infoGrid: {
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
  },
  infoItem: {
    display: 'flex',
    justifyContent: 'space-between',
    padding: '12px',
    background: '#f7fafc',
    borderRadius: '8px',
  },
  infoLabel: {
    fontSize: '14px',
    fontWeight: '500',
    color: '#4a5568',
  },
  infoValue: {
    fontSize: '14px',
    color: '#2d3748',
  },
  actions: {
    display: 'flex',
    gap: '12px',
    marginTop: '30px',
  },
  secondaryButton: {
    flex: 1,
    padding: '14px',
    background: 'white',
    border: '2px solid #667eea',
    color: '#667eea',
    borderRadius: '8px',
    fontSize: '16px',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'all 0.2s',
  },
  logoutButton: {
    flex: 1,
    padding: '14px',
    background: '#e53e3e',
    border: 'none',
    color: 'white',
    borderRadius: '8px',
    fontSize: '16px',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'all 0.2s',
  },
};
