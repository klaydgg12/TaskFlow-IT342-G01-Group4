import React from 'react'
import ReactDOM from 'react-dom/client'
import { GoogleOAuthProvider } from '@react-oauth/google'
import App from './App'
import './styles/index.css'

const googleClientId = import.meta.env.VITE_GOOGLE_CLIENT_ID || ''

if (!googleClientId) {
  console.warn('VITE_GOOGLE_CLIENT_ID is not set. Google Sign-In will be disabled.')
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <GoogleOAuthProvider clientId={googleClientId}>
      <App />
    </GoogleOAuthProvider>
  </React.StrictMode>,
)
