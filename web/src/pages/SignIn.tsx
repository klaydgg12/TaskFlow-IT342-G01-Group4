import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import styles from '@/styles/SignIn.module.css'
import { API_BASE } from '@/config/api'

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

  return (
    <div className={styles.container} data-node-id="3:5355">
      {/* Background blur effects */}
      <div className={`${styles.backgroundBlur} ${styles.blur1}`} data-node-id="3:5440"></div>
      <div className={`${styles.backgroundBlur} ${styles.blur2}`} data-node-id="3:5441"></div>
      <div className={`${styles.backgroundBlur} ${styles.blur3}`} data-node-id="3:5442"></div>

      {/* Main Content */}
      <div className={styles.mainContent}>
        {/* Header Section */}
        <div className={styles.headerSection} data-node-id="3:5358">
          <div className={styles.iconContainer} data-node-id="3:5359">
            <img alt="TaskFlow icon" className={styles.icon} src={imgIcon} data-node-id="3:5360" />
          </div>
          <h1 className={styles.headerTitle} data-node-id="3:5362">
            Welcome to TaskFlow
          </h1>
          <p className={styles.headerSubtitle} data-node-id="3:5364">
            Your intelligent task management companion
          </p>
        </div>

        {/* Card */}
        <div className={styles.card} data-node-id="3:5366">
          {/* Card Header */}
          <div className={styles.cardHeader} data-node-id="3:5367">
            <h2 className={styles.cardTitle} data-node-id="3:5368">
              Sign In
            </h2>
            <p className={styles.cardDescription} data-node-id="3:5370">
              Sign in with your email to access your tasks
            </p>
          </div>

          {/* Card Content */}
          <div className={styles.cardContent} data-node-id="3:5372">
            {/* Email Login Form */}
            <form onSubmit={handleSubmit} className={styles.formFields} style={{ width: '100%' }}>
              {/* Email */}
              <div className={styles.formGroup} style={{ marginBottom: '16px' }}>
                <label style={{ fontSize: '14px', fontWeight: '500', marginBottom: '8px', display: 'block' }}>
                  Email Address
                </label>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <img alt="Email icon" style={{ width: '16px', height: '16px' }} src={imgIcon1} />
                  <input
                    type="email"
                    name="email"
                    className={styles.input}
                    placeholder="you@example.com"
                    value={formData.email}
                    onChange={handleChange}
                    style={{ flex: 1 }}
                  />
                </div>
              </div>

              {/* Password */}
              <div className={styles.formGroup} style={{ marginBottom: '16px' }}>
                <label style={{ fontSize: '14px', fontWeight: '500', marginBottom: '8px', display: 'block' }}>
                  Password
                </label>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <img alt="Password icon" style={{ width: '16px', height: '16px' }} src={imgIcon2} />
                  <input
                    type="password"
                    name="password"
                    className={styles.input}
                    placeholder="Enter your password"
                    value={formData.password}
                    onChange={handleChange}
                    style={{ flex: 1 }}
                  />
                </div>
              </div>

              {error && (
                <div style={{ color: '#ef4444', fontSize: '14px', marginBottom: '16px' }}>
                  {error}
                </div>
              )}

              {/* Sign In Button */}
              <button 
                type="submit" 
                className={styles.submitButton} 
                disabled={loading}
                style={{ width: '100%', marginBottom: '16px' }}
              >
                <span>{loading ? 'Signing In...' : 'Sign In'}</span>
                {!loading && <img alt="Arrow" style={{ width: '16px', height: '16px' }} src={imgIcon4} />}
              </button>
            </form>

            {/* Divider */}
            <div className={styles.divider} data-node-id="3:5433">
              <div className={styles.dividerLine} data-node-id="3:5434"></div>
              <div className={styles.dividerText} data-node-id="3:5435">
                Or continue with
              </div>
              <div className={styles.dividerLine}></div>
            </div>

            {/* Google Button */}
            <div className={styles.googleButtonContainer} data-node-id="3:5426">
              <button className={styles.googleButton}>
                <img alt="Google logo" className={styles.googleIcon} src={imgLogin} data-node-id="3:5427" />
                <span>Continue with Google</span>
              </button>
            </div>

            {/* Security Box */}
            <div className={styles.securityBox} data-node-id="3:5401">
              <div className={styles.securityTitle} data-node-id="3:5402">
                <img
                  alt="Security icon"
                  className={styles.securityIcon}
                  src={imgIcon3}
                  data-node-id="3:5403"
                />
                <span>Secure Authentication</span>
              </div>
              <div className={styles.securityItems} data-node-id="3:5409">
                <div className={styles.securityItem} data-node-id="3:5410">
                  • Encrypted password storage
                </div>
                <div className={styles.securityItem} data-node-id="3:5412">
                  • Secure session management
                </div>
                <div className={styles.securityItem} data-node-id="3:5414">
                  • Data privacy protection
                </div>
              </div>
            </div>

            {/* Create Account Section */}
            <div className={styles.footer} data-node-id="3:5416">
              <div className={styles.divider} data-node-id="3:5417">
                <div className={styles.dividerLine} data-node-id="3:5418"></div>
                <div className={styles.dividerText} data-node-id="3:5419">
                  New to TaskFlow?
                </div>
                <div className={styles.dividerLine}></div>
              </div>

              <button
                className={styles.createAccountButton}
                onClick={() => navigate('/register')}
                data-node-id="3:5421"
              >
                Create Free Account
              </button>

              <p className={styles.footerText} data-node-id="3:5424">
                Join TaskFlow and start managing tasks efficiently
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Text */}
        <p className={styles.bottomText} data-node-id="3:5437">
          Production-ready authentication system
        </p>
      </div>
    </div>
  )
}
