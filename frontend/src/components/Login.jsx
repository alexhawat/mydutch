import { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showRegister, setShowRegister] = useState(false);
  const [fullName, setFullName] = useState('');

  const { login, register, loading, error } = useAuth();
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();

    let success;
    if (showRegister) {
      success = await register(email, password, fullName);
    } else {
      success = await login(email, password);
    }

    if (success) {
      navigate('/');
    }
  }

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h1 style={styles.title}>
          {showRegister ? 'Create Account' : 'Welcome Back'}
        </h1>
        <p style={styles.subtitle}>
          {showRegister
            ? 'Start your Dutch learning journey'
            : 'Continue learning Dutch'}
        </p>

        <form onSubmit={handleSubmit} style={styles.form}>
          {showRegister && (
            <div style={styles.inputGroup}>
              <label style={styles.label}>Full Name</label>
              <input
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                style={styles.input}
                required={showRegister}
                placeholder="Your name"
              />
            </div>
          )}

          <div style={styles.inputGroup}>
            <label style={styles.label}>Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={styles.input}
              required
              placeholder="you@example.com"
            />
          </div>

          <div style={styles.inputGroup}>
            <label style={styles.label}>Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={styles.input}
              required
              minLength={8}
              placeholder={showRegister ? 'At least 8 characters' : 'Your password'}
            />
          </div>

          {error && <div style={styles.error}>{error}</div>}

          <button type="submit" style={styles.button} disabled={loading}>
            {loading
              ? 'Please wait...'
              : showRegister
              ? 'Create Account'
              : 'Sign In'}
          </button>
        </form>

        <div style={styles.footer}>
          <button
            onClick={() => setShowRegister(!showRegister)}
            style={styles.switchButton}
            type="button"
          >
            {showRegister
              ? 'Already have an account? Sign in'
              : "Don't have an account? Sign up"}
          </button>
        </div>

        <div style={styles.oauthSection}>
          <div style={styles.divider}>
            <span>Or continue with</span>
          </div>
          <div style={styles.oauthButtons}>
            <button style={styles.oauthButton} type="button">
              Google (Coming Soon)
            </button>
            <button style={styles.oauthButton} type="button">
              GitHub (Coming Soon)
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

const styles = {
  container: {
    minHeight: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    padding: '20px',
  },
  card: {
    background: 'white',
    borderRadius: '12px',
    padding: '40px',
    maxWidth: '450px',
    width: '100%',
    boxShadow: '0 20px 60px rgba(0,0,0,0.3)',
  },
  title: {
    fontSize: '28px',
    fontWeight: 'bold',
    marginBottom: '8px',
    color: '#1a202c',
    textAlign: 'center',
  },
  subtitle: {
    fontSize: '14px',
    color: '#718096',
    marginBottom: '30px',
    textAlign: 'center',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',
  },
  inputGroup: {
    display: 'flex',
    flexDirection: 'column',
    gap: '6px',
  },
  label: {
    fontSize: '14px',
    fontWeight: '500',
    color: '#2d3748',
  },
  input: {
    padding: '12px',
    border: '2px solid #e2e8f0',
    borderRadius: '8px',
    fontSize: '15px',
    transition: 'border-color 0.2s',
    outline: 'none',
  },
  button: {
    padding: '14px',
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    color: 'white',
    border: 'none',
    borderRadius: '8px',
    fontSize: '16px',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'transform 0.2s, box-shadow 0.2s',
    marginTop: '10px',
  },
  error: {
    padding: '12px',
    background: '#fed7d7',
    color: '#c53030',
    borderRadius: '8px',
    fontSize: '14px',
  },
  footer: {
    marginTop: '24px',
    textAlign: 'center',
  },
  switchButton: {
    background: 'none',
    border: 'none',
    color: '#667eea',
    fontSize: '14px',
    cursor: 'pointer',
    textDecoration: 'underline',
  },
  oauthSection: {
    marginTop: '30px',
  },
  divider: {
    textAlign: 'center',
    marginBottom: '16px',
    color: '#a0aec0',
    fontSize: '14px',
  },
  oauthButtons: {
    display: 'flex',
    gap: '12px',
  },
  oauthButton: {
    flex: 1,
    padding: '12px',
    background: 'white',
    border: '2px solid #e2e8f0',
    borderRadius: '8px',
    fontSize: '14px',
    cursor: 'not-allowed',
    opacity: 0.6,
  },
};
