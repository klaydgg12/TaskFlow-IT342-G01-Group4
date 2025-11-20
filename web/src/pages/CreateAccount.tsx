import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import styles from '@/styles/CreateAccount.module.css'
import { API_BASE } from '@/config/api'
import { GoogleLogin, CredentialResponse } from '@react-oauth/google'

// Figma asset URLs
const imgIcon = 'https://www.figma.com/api/mcp/asset/b9d9fdb3-ca10-42ee-bc7c-491dcf79baa3'
const imgIcon1 = 'https://www.figma.com/api/mcp/asset/d101073a-39db-4ab9-8108-dbbc1f25b377'
const imgIcon2 = 'https://www.figma.com/api/mcp/asset/e9ff9f16-0746-4d2a-8ead-c14220da875b'
const imgIcon3 = 'https://www.figma.com/api/mcp/asset/7528bdca-b60f-4a4d-a7ca-8db2ba5899ff'
const imgIcon4 = 'https://www.figma.com/api/mcp/asset/e055199e-2144-4ae5-acd3-017774e27a4e'
const imgIcon5 = 'https://www.figma.com/api/mcp/asset/382d071d-70ec-4cbe-81e2-4354c1cc3a7b'

interface FormData {
  fullName: string
  email: string
  password: string
  confirmPassword: string
}

export default function CreateAccount() {
  const navigate = useNavigate()
  const [formData, setFormData] = useState<FormData>({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
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

    if (!formData.fullName || !formData.email || !formData.password || !formData.confirmPassword) {
      setError('Please fill in all fields')
      return
    }

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match')
      return
    }

    if (formData.password.length < 8) {
      setError('Password must be at least 8 characters')
      return
    }

    setLoading(true)
    try {
      const response = await fetch(`${API_BASE}/api/users/create`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password,
          fullName: formData.fullName,
          role: 'USER',
        }),
      })

      const data = await response.json()

      if (data.success) {
        // Store user info
        localStorage.setItem('user', JSON.stringify(data.user))
        localStorage.setItem('userId', String(data.user.id))
        localStorage.setItem('userRole', data.user.role)
        
        // Navigate to sign in so user can log in
        navigate('/signin')
      } else {
        setError(data.message || 'Registration failed')
      }
    } catch (err) {
      setError('Registration failed. Please try again.')
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
        navigate(data.user.role === 'ADMIN' ? '/admin' : '/dashboard')
      } else {
        setError(data.message || 'Google sign-in failed. Please try again.')
      }
    } catch (err) {
      setError('Google sign-in failed. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className={styles.container} data-node-id="3:5533">
      {/* Background blur effects */}
      <div className={`${styles.backgroundBlur} ${styles.blur1}`} data-node-id="3:5634"></div>
      <div className={`${styles.backgroundBlur} ${styles.blur2}`} data-node-id="3:5635"></div>
      <div className={`${styles.backgroundBlur} ${styles.blur3}`} data-node-id="3:5636"></div>

      {/* Main Content */}
      <div className={styles.mainContent}>
        {/* Card */}
        <div className={styles.card} data-node-id="3:5545">
          {/* Card Header */}
          <div className={styles.cardHeader} data-node-id="3:5546">
            <h2 className={styles.cardTitle} data-node-id="3:5547">
              Sign Up
            </h2>
            <p className={styles.cardDescription} data-node-id="3:5549">
              Choose your preferred registration method
            </p>
          </div>

          {/* Card Content */}
          <div className={styles.cardContent} data-node-id="3:5551">
            {/* Google Button */}
            <div className={styles.googleButtonContainer} data-node-id="3:5552">
              <GoogleLogin
                onSuccess={(credentialResponse) => handleGoogleSuccess(credentialResponse)}
                onError={() => setError('Google sign-in failed. Please try again.')}
                width="100%"
                text="signup_with"
              />
            </div>

            {/* Email Registration Divider */}
            <div className={styles.divider} data-node-id="3:5622">
              <div className={styles.dividerLine} data-node-id="3:5623"></div>
              <div className={styles.dividerText} data-node-id="3:5624">
                Or register with email
              </div>
              <div className={styles.dividerLine}></div>
            </div>

            {/* Form Fields */}
            <form onSubmit={handleSubmit} className={styles.formFields} data-node-id="3:5559">
              {/* Full Name */}
              <div className={styles.formGroup} data-node-id="3:5560">
                <label className={styles.label} data-node-id="3:5561">
                  Full Name
                </label>
                <div className={styles.inputWrapper}>
                  <img alt="Name icon" className={styles.inputIcon} src={imgIcon1} data-node-id="3:5566" />
                  <input
                    type="text"
                    name="fullName"
                    className={styles.input}
                    placeholder="John Doe"
                    value={formData.fullName}
                    onChange={handleChange}
                    data-node-id="3:5564"
                  />
                </div>
              </div>

              {/* Email */}
              <div className={styles.formGroup} data-node-id="3:5569">
                <label className={styles.label} data-node-id="3:5570">
                  Email Address
                </label>
                <div className={styles.inputWrapper}>
                  <img alt="Email icon" className={styles.inputIcon} src={imgIcon2} data-node-id="3:5575" />
                  <input
                    type="email"
                    name="email"
                    className={styles.input}
                    placeholder="you@example.com"
                    value={formData.email}
                    onChange={handleChange}
                    data-node-id="3:5573"
                  />
                </div>
              </div>

              {/* Password */}
              <div className={styles.formGroup} data-node-id="3:5578">
                <label className={styles.label} data-node-id="3:5579">
                  Password
                </label>
                <div className={styles.inputWrapper}>
                  <img alt="Password icon" className={styles.inputIcon} src={imgIcon3} data-node-id="3:5584" />
                  <input
                    type="password"
                    name="password"
                    className={styles.input}
                    placeholder="Min. 8 characters"
                    value={formData.password}
                    onChange={handleChange}
                    data-node-id="3:5582"
                  />
                </div>
              </div>

              {/* Confirm Password */}
              <div className={styles.formGroup} data-node-id="3:5587">
                <label className={styles.label} data-node-id="3:5588">
                  Confirm Password
                </label>
                <div className={styles.inputWrapper}>
                  <img alt="Password icon" className={styles.inputIcon} src={imgIcon3} data-node-id="3:5593" />
                  <input
                    type="password"
                    name="confirmPassword"
                    className={styles.input}
                    placeholder="Re-enter password"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    data-node-id="3:5591"
                  />
                </div>
              </div>

              {error && (
                <div style={{ color: '#ef4444', fontSize: '14px', marginBottom: '8px' }}>
                  {error}
                </div>
              )}

              {/* Submit Button */}
              <button type="submit" className={styles.submitButton} disabled={loading} data-node-id="3:5596">
                <span>{loading ? 'Creating Account...' : 'Create Account'}</span>
                {!loading && <img alt="Arrow" className={styles.submitIcon} src={imgIcon4} data-node-id="3:5598" />}
              </button>
            </form>

            {/* Features Box */}
            <div className={styles.featuresBox} data-node-id="3:5601">
              <div className={styles.featuresTitle} data-node-id="3:5602">
                <img
                  alt="Features icon"
                  className={styles.featuresIcon}
                  src={imgIcon5}
                  data-node-id="3:5603"
                />
                <span>What you get with TaskFlow</span>
              </div>
              <div className={styles.featuresList} data-node-id="3:5609">
                <div className={styles.featureItem} data-node-id="3:5610">
                  • Unlimited task creation
                </div>
                <div className={styles.featureItem} data-node-id="3:5612">
                  • Activity tracking & analytics
                </div>
                <div className={styles.featureItem} data-node-id="3:5614">
                  • Secure cloud storage
                </div>
                <div className={styles.featureItem} data-node-id="3:5616">
                  • Cross-device synchronization
                </div>
              </div>
            </div>

            {/* Sign In Link */}
            <div className={styles.signInLink} data-node-id="3:5618">
              <span>Already have an account?</span>
              <span
                className={styles.link}
                onClick={() => navigate('/signin')}
                data-node-id="3:5620"
              >
                Sign in here
              </span>
            </div>
          </div>
        </div>

        {/* Terms and Privacy */}
        <div className={styles.termsText} data-node-id="3:5626">
          By creating an account, you agree to our{' '}
          <span className={styles.termsLink} data-node-id="3:5628">
            Terms of Service
          </span>
          {' '}and{' '}
          <span className={styles.termsLink} data-node-id="3:5631">
            Privacy Policy
          </span>
        </div>
      </div>
    </div>
  )
}
