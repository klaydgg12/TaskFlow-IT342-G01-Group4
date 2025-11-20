import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import SignIn from '@/pages/SignIn'
import CreateAccount from '@/pages/CreateAccount'
import Dashboard from '@/pages/Dashboard'
import AdminPage from '@/pages/Admin'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/signin" element={<SignIn />} />
        <Route path="/register" element={<CreateAccount />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/admin" element={<AdminPage />} />
        <Route path="/" element={<Navigate to="/signin" replace />} />
      </Routes>
    </Router>
  )
}

export default App
