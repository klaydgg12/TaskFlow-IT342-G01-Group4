import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { GoogleLogin, CredentialResponse } from '@react-oauth/google'
import styles from '../styles/SignIn.module.css'
import { API_BASE } from '../config/api'

// Figma asset URLs
const imgIcon = 'https://www.figma.com/api/mcp/asset/b9d9fdb3-ca10-42ee-bc7c-491dcf79baa3'
const imgIcon1 = 'https://www.figma.com/api/mcp/asset/d101073a-39db-4ab9-8108-dbbc1f25b377'
const imgIcon2 = 'https://www.figma.com/api/mcp/asset/e9ff9f16-0746-4d2a-8ead-c14220da875b'
const imgIcon3 = 'https://www.figma.com/api/mcp/asset/8d97958d-3273-4be6-985a-6d7a48b9af8e'
const imgLogin = 'https://www.figma.com/api/mcp/asset/3e732446-b509-4ced-abb1-407371b173cc'
const imgIcon4 = 'https://www.figma.com/api/mcp/asset/e055199e-2144-4ae5-acd3-017774e27a4e'

interface FormData {
  email: string
  password: string
}

export default function SignIn() {
  const navigate = useNavigate()
  const [formData, setFormData] = useState<FormData>({
    email: '',
    password: '',
  })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    setError('')
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!formData.email || !formData.password) {
      setError('Please enter email and password')
      return
    }

    setLoading(true)
    try {
      const response = await fetch(`${API_BASE}/api/users/authenticate`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: formData.email, password: formData.password }),
      })
      const data = await response.json()

      if (response.ok && data.success && data.user) {
        localStorage.setItem('user', JSON.stringify(data.user))
        localStorage.setItem('userId', String(data.user.id))
        localStorage.setItem('userRole', data.user.role)

        if (data.user.role === 'ADMIN') {
          navigate('/admin')
        } else {
          navigate('/dashboard')
        }
      } else {
        setError(data.message || 'Invalid email or password')
      }
    } catch (err) {
      setError('Login failed. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const handleGoogleSuccess = async (credentialResponse: CredentialResponse) => {
    const token = credentialResponse.credential
    if (!token) {
      setError('Unable to retrieve Google credentials.')
      return
    }

    setLoading(true)
    try {
      const response = await fetch(`${API_BASE}/api/users/google-signin`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ idToken: token }),
      })
      const data = await response.json()
      if (response.ok && data.success && data.user) {
        localStorage.setItem('user', JSON.stringify(data.user))
        localStorage.setItem('userId', String(data.user.id))
        localStorage.setItem('userRole', data.user.role)

        if (data.user.role === 'ADMIN') {
          navigate('/admin')
        } else {
          navigate('/dashboard')
        }
      } else {
        setError(data.message || 'Google sign-in failed.')
      }
    } catch (err) {
      setError('Google sign-in failed. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className={styles.container}>
      <div className={`${styles.backgroundBlur} ${styles.blur1}`}></div>
      <div className={`${styles.backgroundBlur} ${styles.blur2}`}></div>
      <div className={`${styles.backgroundBlur} ${styles.blur3}`}></div>

      <div className={styles.mainContent}>
        <div className={styles.headerSection}>
          <div className={styles.iconContainer}>
            <div className={styles.icon}>📋</div>
          </div>
          <p className={styles.headerTitle}>TaskFlow</p>
          <p className={styles.headerSubtitle}>Sign in to keep your tasks organized and your team aligned.</p>
        </div>

        <div className={styles.card}>
          <div className={styles.cardHeader}>
            <h2 className={styles.cardTitle}>Sign In</h2>
            <p className={styles.cardDescription}>Welcome back! Choose how you want to access your workspace.</p>
          </div>

          <div className={styles.cardContent}>
            <div className={styles.googleButtonContainer}>
              <GoogleLogin
                onSuccess={(credentialResponse) => handleGoogleSuccess(credentialResponse)}
                onError={() => setError('Google sign-in failed. Please try again.')}
                useOneTap
                width="100%"
                text="signin_with"
              />
            </div>

            <div className={styles.divider}>
              <div className={styles.dividerLine}></div>
              <div className={styles.dividerText}>Or sign in with email</div>
              <div className={styles.dividerLine}></div>
            </div>

            <form onSubmit={handleSubmit} className={styles.formFields}>
              <div className={styles.formGroup}>
                <label className={styles.label}>Email Address</label>
                <div className={styles.inputWrapper}>
                  <span className={styles.inputIcon}>📧</span>
                  <input
                    type="email"
                    name="email"
                    className={styles.input}
                    placeholder="you@example.com"
                    value={formData.email}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className={styles.formGroup}>
                <label className={styles.label}>Password</label>
                <div className={styles.inputWrapper}>
                  <span className={styles.inputIcon}>🔒</span>
                  <input
                    type="password"
                    name="password"
                    className={styles.input}
                    placeholder="Enter your password"
                    value={formData.password}
                    onChange={handleChange}
                  />
                </div>
              </div>

              {error && (
                <div className={styles.errorMessage}>
                  {error}
                </div>
              )}

              <button type="submit" className={styles.submitButton} disabled={loading}>
                <span>{loading ? 'Signing In...' : 'Sign In'}</span>
                {!loading && <span className={styles.submitIcon}>→</span>}
              </button>
            </form>

            <div className={styles.securityBox}>
              <div className={styles.securityTitle}>
                <span className={styles.securityIcon}>🛡️</span>
                <span>Secure authentication</span>
              </div>
              <div className={styles.securityItems}>
                <div className={styles.securityItem}>• Encrypted password storage</div>
                <div className={styles.securityItem}>• Secure session management</div>
                <div className={styles.securityItem}>• Data privacy protection</div>
              </div>
            </div>

            <div className={styles.signUpLink}>
              <span>Don&apos;t have an account?</span>
              <button type="button" className={styles.linkButton} onClick={() => navigate('/register')}>
                Create one
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}