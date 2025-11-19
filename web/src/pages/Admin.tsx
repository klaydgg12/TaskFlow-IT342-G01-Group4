import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import styles from '@/styles/Admin.module.css'
import { API_BASE } from '@/config/api'

// Figma asset URLs
const imgIcon = 'https://www.figma.com/api/mcp/asset/a05f1d0d-f6f3-4c5b-af8f-b74b58e6cf8d'
const imgIcon1 = 'https://www.figma.com/api/mcp/asset/a694181b-fe5a-44d8-b9a9-2b7014b1f335'
const imgIcon2 = 'https://www.figma.com/api/mcp/asset/01572186-5370-4500-b1b0-3ff68665429c'
const imgIcon3 = 'https://www.figma.com/api/mcp/asset/7c7abb1e-618c-46cb-85af-4fade944cd27'
const imgIcon4 = 'https://www.figma.com/api/mcp/asset/6ae02a5b-ae1f-40ef-b168-6a8ef47d8332'
const imgIcon5 = 'https://www.figma.com/api/mcp/asset/1fb7e266-cd5a-44ae-8317-0f2bfca22903'
const imgIcon6 = 'https://www.figma.com/api/mcp/asset/81f4ffe1-c0b3-424f-9ac0-ae3de46c2fb7'
const imgIcon7 = 'https://www.figma.com/api/mcp/asset/4b454096-cc20-4b6b-b49a-1da4e43b8533'

interface User {
  id: number
  fullName: string
  email: string
  role: string
  isActive: boolean
  createdAt: string
}

type TabType = 'users' | 'audit' | 'history'

export default function AdminPage() {
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState<TabType>('users')
  const [users, setUsers] = useState<User[]>([])
  const [currentUser, setCurrentUser] = useState({ name: '', role: 'Admin' })
  const [loading, setLoading] = useState(true)

  // Load admin user and fetch all users
  useEffect(() => {
    const userStr = localStorage.getItem('user')
    
    if (!userStr) {
      navigate('/signin')
      return
    }

    const user = JSON.parse(userStr)
    if (user.role !== 'ADMIN') {
      navigate('/dashboard')
      return
    }

    setCurrentUser({ name: user.fullName, role: 'Admin' })
    
    // Fetch all users
    fetchUsers()

    // Set up auto-refresh every 5 seconds
    const refreshInterval = setInterval(() => {
      fetchUsers()
    }, 5000)

    return () => clearInterval(refreshInterval)
  }, [navigate])

  const fetchUsers = async () => {
    try {
      const response = await fetch(`${API_BASE}/api/users/all`, {
        headers: { 'Cache-Control': 'no-cache' },
      })
      const data = await response.json()
      if (data.success && Array.isArray(data.users)) {
        setUsers(data.users)
      }
    } catch (error) {
      console.error('Failed to fetch users:', error)
    } finally {
      setLoading(false)
    }
  }

  const stats = {
    totalUsers: users.length,
    activeUsers: users.filter((u) => u.isActive).length,
    admins: users.filter((u) => u.role === 'ADMIN').length,
    events24h: 4,
  }

  const toggleUserStatus = async (userId: number) => {
    const user = users.find(u => u.id === userId)
    if (!user) return

    try {
      await fetch(`${API_BASE}/api/users/update/${userId}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...user,
          isActive: !user.isActive,
        }),
      })
      fetchUsers()
    } catch (error) {
      console.error('Failed to toggle user status:', error)
    }
  }

  const handleLogout = () => {
    localStorage.removeItem('user')
    localStorage.removeItem('userId')
    localStorage.removeItem('userRole')
    navigate('/signin')
  }

  if (loading) {
    return <div className={styles.container}><div style={{ padding: '40px', textAlign: 'center' }}>Loading...</div></div>
  }

  return (
    <div className={styles.container} data-node-id="3:5638">
      {/* Header */}
      <div className={styles.header} data-node-id="3:5641">
        <div className={styles.headerLeft}>
          <div className={styles.logoContainer}>
            <img alt="TaskFlow" src={imgIcon} className={styles.logo} />
          </div>
          <div className={styles.brandText}>
            <div className={styles.brandName}>TaskFlow</div>
            <div className={styles.brandSubtitle}>Task Management System</div>
          </div>
        </div>
        <div className={styles.headerRight}>
          <button 
            onClick={() => fetchUsers()}
            style={{
              padding: '8px 16px',
              backgroundColor: '#f3f4f6',
              border: '1px solid #e5e7eb',
              borderRadius: '6px',
              cursor: 'pointer',
              marginRight: '16px',
              fontSize: '14px',
              fontWeight: '500'
            }}
            title="Refresh users from database"
          >
            🔄 Refresh
          </button>
          <div className={styles.userInfo}>
            <div className={styles.userName}>{currentUser.name}</div>
            <div className={styles.userRole}>
              <img alt="Admin icon" src={imgIcon1} className={styles.roleIcon} />
              <span>{currentUser.role}</span>
            </div>
          </div>
          <button className={styles.logoutBtn} onClick={handleLogout}>
            <img alt="Logout" src={imgIcon2} />
            <span>Logout</span>
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className={styles.mainContent}>
        {/* Page Header */}
        <div className={styles.pageHeader}>
          <h1 className={styles.pageTitle}>Admin Dashboard</h1>
          <p className={styles.pageSubtitle}>Manage users, monitor activity, and review system logs</p>
        </div>

        {/* Stats Grid */}
        <div className={styles.statsGrid}>
          <div className={styles.statCard}>
            <div className={styles.statContent}>
              <div className={styles.statLabel}>Total Users</div>
              <div className={styles.statValue}>{stats.totalUsers}</div>
            </div>
            <div className={`${styles.statIcon} ${styles.iconPurple}`} />
          </div>

          <div className={styles.statCard}>
            <div className={styles.statContent}>
              <div className={styles.statLabel}>Active Users</div>
              <div className={styles.statValue}>{stats.activeUsers}</div>
            </div>
            <div className={`${styles.statIcon} ${styles.iconGreen}`} />
          </div>

          <div className={styles.statCard}>
            <div className={styles.statContent}>
              <div className={styles.statLabel}>Administrators</div>
              <div className={styles.statValue}>{stats.admins}</div>
            </div>
            <div className={`${styles.statIcon} ${styles.iconPurple}`} />
          </div>

          <div className={styles.statCard}>
            <div className={styles.statContent}>
              <div className={styles.statLabel}>Events (24h)</div>
              <div className={styles.statValue}>{stats.events24h}</div>
            </div>
            <div className={`${styles.statIcon} ${styles.iconOrange}`} />
          </div>
        </div>

        {/* Tabs */}
        <div className={styles.tabContainer}>
          <button
            className={`${styles.tab} ${activeTab === 'users' ? styles.tabActive : ''}`}
            onClick={() => setActiveTab('users')}
          >
            Users
          </button>
          <button
            className={`${styles.tab} ${activeTab === 'audit' ? styles.tabActive : ''}`}
            onClick={() => setActiveTab('audit')}
          >
            Audit Logs
          </button>
          <button
            className={`${styles.tab} ${activeTab === 'history' ? styles.tabActive : ''}`}
            onClick={() => setActiveTab('history')}
          >
            Role History
          </button>
        </div>

        {/* User Management Panel */}
        {activeTab === 'users' && (
          <div className={styles.panel}>
            <div className={styles.panelHeader}>
              <h3 className={styles.panelTitle}>User Management</h3>
              <p className={styles.panelSubtitle}>Manage user accounts, roles, and permissions</p>
            </div>

            {/* Users Table */}
            <div className={styles.table}>
              <div className={styles.tableHeader}>
                <div className={styles.tableHeaderCell} style={{ width: '222.55px' }}>User</div>
                <div className={styles.tableHeaderCell} style={{ width: '277.212px' }}>Email</div>
                <div className={styles.tableHeaderCell} style={{ width: '185.113px' }}>Role</div>
                <div className={styles.tableHeaderCell} style={{ width: '133.75px' }}>Status</div>
                <div className={styles.tableHeaderCell} style={{ width: '134.65px' }}>Joined</div>
                <div className={styles.tableHeaderCell} style={{ width: '166.725px' }}>Actions</div>
              </div>

              <div className={styles.tableBody}>
                {users.map((user) => (
                  <div key={user.id} className={styles.tableRow}>
                    <div className={styles.tableCell} style={{ width: '222.55px' }}>
                      <div className={styles.userCell}>
                        <div className={styles.userAvatar}>{user.fullName.charAt(0)}</div>
                        <div>
                          <div className={styles.userName}>{user.fullName}</div>
                          <div className={styles.userId}>ID: {user.id}</div>
                        </div>
                      </div>
                    </div>
                    <div className={styles.tableCell} style={{ width: '277.212px' }}>
                      <div className={styles.email}>{user.email}</div>
                    </div>
                    <div className={styles.tableCell} style={{ width: '185.113px' }}>
                      <div className={styles.roleSelect}>
                        <img alt={user.role} src={user.role === 'ADMIN' ? imgIcon6 : imgIcon3} />
                        <span>{user.role}</span>
                        <img alt="Dropdown" src={imgIcon4} />
                      </div>
                    </div>
                    <div className={styles.tableCell} style={{ width: '133.75px' }}>
                      <div
                        className={`${styles.statusBadge} ${
                          user.isActive ? styles.statusActive : styles.statusDeactivated
                        }`}
                      >
                        {user.isActive ? 'active' : 'deactivated'}
                      </div>
                    </div>
                    <div className={styles.tableCell} style={{ width: '134.65px' }}>
                      <div className={styles.date}>{new Date(user.createdAt).toLocaleDateString()}</div>
                    </div>
                    <div className={styles.tableCell} style={{ width: '166.725px' }}>
                      <button
                        className={`${styles.actionButton} ${
                          user.isActive ? styles.deactivateBtn : styles.activateBtn
                        }`}
                        onClick={() => toggleUserStatus(user.id)}
                      >
                        <img
                          alt="Action"
                          src={user.isActive ? imgIcon5 : imgIcon7}
                        />
                        <span>{user.isActive ? 'Deactivate' : 'Activate'}</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Audit Logs Panel */}
        {activeTab === 'audit' && (
          <div className={styles.panel}>
            <div className={styles.panelHeader}>
              <h3 className={styles.panelTitle}>Audit Logs</h3>
              <p className={styles.panelSubtitle}>System activity and user actions</p>
            </div>
            <div className={styles.emptyState}>
              <p>Audit logs will be displayed here</p>
            </div>
          </div>
        )}

        {/* Role History Panel */}
        {activeTab === 'history' && (
          <div className={styles.panel}>
            <div className={styles.panelHeader}>
              <h3 className={styles.panelTitle}>Role History</h3>
              <p className={styles.panelSubtitle}>Changes to user roles and permissions</p>
            </div>
            <div className={styles.emptyState}>
              <p>Role history will be displayed here</p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
