import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import styles from '@/styles/Dashboard.module.css'
import { API_BASE } from '@/config/api'

interface Task {
  id: number
  title: string
  description: string
  status: 'TODO' | 'IN_PROGRESS' | 'COMPLETED'
  priority: 'LOW' | 'MEDIUM' | 'HIGH'
  dueDate: string
  assignedUserId: number
  createdById: number
  createdAt: string
  updatedAt: string
}

type TabType = 'all' | 'TODO' | 'IN_PROGRESS' | 'COMPLETED'

export default function Dashboard() {
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState<TabType>('all')
  const [tasks, setTasks] = useState<Task[]>([])
  const [currentUser, setCurrentUser] = useState({ name: '', role: 'User', id: 0 })
  const [showCreateModal, setShowCreateModal] = useState(false)
  const [editingTaskId, setEditingTaskId] = useState<number | null>(null)
  const [loading, setLoading] = useState(true)
  const [newTask, setNewTask] = useState({
    title: '',
    description: '',
    priority: 'MEDIUM' as 'LOW' | 'MEDIUM' | 'HIGH',
    dueDate: new Date().toISOString().split('T')[0],
  })

  // Load user info and tasks on mount
  useEffect(() => {
    const userStr = localStorage.getItem('user')
    const userId = localStorage.getItem('userId')
    
    if (!userStr || !userId) {
      navigate('/signin')
      return
    }

    const user = JSON.parse(userStr)
    setCurrentUser({ name: user.fullName, role: user.role, id: parseInt(userId) })

    // Fetch user's assigned tasks
    const parsedUserId = parseInt(userId)
    fetchTasks(parsedUserId)

    // Set up auto-refresh every 5 seconds
    const refreshInterval = setInterval(() => {
      fetchTasks(parsedUserId)
    }, 5000)

    return () => clearInterval(refreshInterval)
  }, [navigate])

  const fetchTasks = async (userId: number) => {
    try {
      const response = await fetch(`${API_BASE}/api/tasks/user/${userId}`, {
        headers: { 'Cache-Control': 'no-cache' },
      })
      const data = await response.json()
      if (data.success && Array.isArray(data.tasks)) {
        setTasks(data.tasks)
      }
    } catch (error) {
      console.error('Failed to fetch tasks:', error)
    } finally {
      setLoading(false)
    }
  }

  const getFilteredTasks = () => {
    switch (activeTab) {
      case 'TODO':
        return tasks.filter((t) => t.status === 'TODO')
      case 'IN_PROGRESS':
        return tasks.filter((t) => t.status === 'IN_PROGRESS')
      case 'COMPLETED':
        return tasks.filter((t) => t.status === 'COMPLETED')
      default:
        return tasks
    }
  }

  const stats = {
    total: tasks.length,
    completed: tasks.filter((t) => t.status === 'COMPLETED').length,
    inProgress: tasks.filter((t) => t.status === 'IN_PROGRESS').length,
    pending: tasks.filter((t) => t.status === 'TODO').length,
  }

  const getTabLabel = (tab: TabType) => {
    if (tab === 'all') {
      return `All Tasks (${stats.total})`
    }
    switch (tab) {
      case 'TODO':
        return `Pending (${stats.pending})`
      case 'IN_PROGRESS':
        return `In Progress (${stats.inProgress})`
      case 'COMPLETED':
        return `Completed (${stats.completed})`
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'LOW':
        return { bg: '#e0e7ff', text: '#372aac' }
      case 'MEDIUM':
        return { bg: '#e9d5ff', text: '#6e11b0' }
      case 'HIGH':
        return { bg: '#fce7f3', text: '#a3004c' }
      default:
        return { bg: '#f3f4f6', text: '#4b5563' }
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'TODO':
        return { bg: '#fef9c2', border: '#fff085', text: '#894b00' }
      case 'IN_PROGRESS':
        return { bg: '#bfdbfe', border: '#bedbff', text: '#1e40af' }
      case 'COMPLETED':
        return { bg: '#d1fae5', border: '#b9f8cf', text: '#016630' }
      default:
        return { bg: '#f3f4f6', border: '#e5e7eb', text: '#4b5563' }
    }
  }

  const handleCreateTask = async () => {
    if (!newTask.title.trim()) {
      return
    }

    try {
      if (editingTaskId) {
        // Update existing task
        const response = await fetch(`${API_BASE}/api/tasks/update/${editingTaskId}`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            title: newTask.title,
            description: newTask.description,
            priority: newTask.priority,
            dueDate: newTask.dueDate,
          }),
        })
        const data = await response.json()
        if (data.success) {
          setTasks((prevTasks) =>
            prevTasks.map((task) =>
              task.id === editingTaskId ? data.task : task
            )
          )
          setEditingTaskId(null)
        }
      } else {
        // Create new task
        const response = await fetch(`${API_BASE}/api/tasks/create`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            title: newTask.title,
            description: newTask.description,
            priority: newTask.priority,
            dueDate: newTask.dueDate,
            status: 'TODO',
            assignedUserId: currentUser.id,
            createdById: currentUser.id,
          }),
        })
        const data = await response.json()
        if (data.success) {
          setTasks([...tasks, data.task])
        }
      }
      setNewTask({ title: '', description: '', priority: 'MEDIUM', dueDate: new Date().toISOString().split('T')[0] })
      setShowCreateModal(false)
    } catch (error) {
      console.error('Failed to save task:', error)
    }
  }

  const handleEditTask = (task: Task) => {
    setEditingTaskId(task.id)
    setNewTask({
      title: task.title,
      description: task.description,
      priority: task.priority,
      dueDate: task.dueDate,
    })
    setShowCreateModal(true)
  }

  const handleDeleteTask = async (taskId: number) => {
    try {
      const response = await fetch(`${API_BASE}/api/tasks/${taskId}`, {
        method: 'DELETE',
      })
      const data = await response.json()
      if (data.success) {
        setTasks((prevTasks) => prevTasks.filter((task) => task.id !== taskId))
      }
    } catch (error) {
      console.error('Failed to delete task:', error)
    }
  }

  const handleStatusChange = async (taskId: number, newStatus: string) => {
    try {
      const task = tasks.find(t => t.id === taskId)
      if (!task) return

      const response = await fetch(`${API_BASE}/api/tasks/update/${taskId}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...task,
          status: newStatus,
        }),
      })
      const data = await response.json()
      if (data.success) {
        setTasks((prevTasks) =>
          prevTasks.map((t) =>
            t.id === taskId ? { ...t, status: newStatus as Task['status'] } : t
          )
        )
      }
    } catch (error) {
      console.error('Failed to update task status:', error)
    }
  }

  const handleLogout = () => {
    localStorage.removeItem('user')
    localStorage.removeItem('userId')
    localStorage.removeItem('userRole')
    navigate('/signin')
  }

  const filteredTasks = getFilteredTasks()

  if (loading) {
    return <div className={styles.container}><div style={{ padding: '40px', textAlign: 'center' }}>Loading...</div></div>
  }

  return (
    <div className={styles.container}>
      {/* Header */}
      <div className={styles.header}>
        <div className={styles.headerLeft}>
          <div className={styles.logo}>
            <div className={styles.logoIcon}>📋</div>
            <div>
              <div className={styles.logoText}>TaskFlow</div>
              <div className={styles.logoSubtext}>Task Management System</div>
            </div>
          </div>
        </div>
        <div className={styles.headerRight}>
          <div className={styles.userInfo}>
            <div className={styles.userName}>{currentUser.name}</div>
            <div className={styles.userRole}>
              <span className={styles.userRoleIcon}>👤</span>
              {currentUser.role}
            </div>
          </div>
          <div className={styles.avatar}></div>
          <button className={styles.logoutButton} onClick={handleLogout}>
            <span className={styles.logoutIcon}>🚪</span>
            Logout
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className={styles.mainContent}>
        {/* Title Section */}
        <div className={styles.titleSection}>
          <h1 className={styles.pageTitle}>My Tasks</h1>
          <p className={styles.pageSubtitle}>Manage your personal tasks and track your progress</p>
        </div>

        {/* Stats Grid */}
        <div className={styles.statsGrid}>
          <div className={styles.statCard}>
            <div className={styles.statContent}>
              <div className={styles.statLabel}>Total Tasks</div>
              <div className={styles.statValue}>{stats.total}</div>
            </div>
            <div className={styles.statIcon} style={{ backgroundColor: '#e0e7ff' }}>📋</div>
          </div>
          <div className={styles.statCard}>
            <div className={styles.statContent}>
              <div className={styles.statLabel}>Completed</div>
              <div className={styles.statValue}>{stats.completed}</div>
            </div>
            <div className={styles.statIcon} style={{ backgroundColor: '#dcfce7' }}>✓</div>
          </div>
          <div className={styles.statCard}>
            <div className={styles.statContent}>
              <div className={styles.statLabel}>In Progress</div>
              <div className={styles.statValue}>{stats.inProgress}</div>
            </div>
            <div className={styles.statIcon} style={{ backgroundColor: '#bfdbfe' }}>⏱</div>
          </div>
          <div className={styles.statCard}>
            <div className={styles.statContent}>
              <div className={styles.statLabel}>Pending</div>
              <div className={styles.statValue}>{stats.pending}</div>
            </div>
            <div className={styles.statIcon} style={{ backgroundColor: '#fef9c2' }}>⏳</div>
          </div>
        </div>

        {/* Create Task Button */}
        <button className={styles.createTaskButtonMain} onClick={() => setShowCreateModal(true)}>
          <span>+</span>
          Create Task
        </button>

        <div className={styles.contentWrapper}>
          {/* Tasks Section */}
          <div className={styles.tasksSection}>
            <div className={styles.tasksHeader}>
              <div className={styles.tabsContainer}>
                {(['all', 'TODO', 'IN_PROGRESS', 'COMPLETED'] as TabType[]).map((tab) => (
                  <button
                    key={tab}
                    className={`${styles.tab} ${activeTab === tab ? styles.active : ''}`}
                    onClick={() => setActiveTab(tab)}
                  >
                    {getTabLabel(tab)}
                  </button>
                ))}
              </div>
            </div>

            <div className={styles.tasksList}>
              {filteredTasks.length > 0 ? (
                filteredTasks.map((task) => {
                  const priorityColor = getPriorityColor(task.priority)
                  const statusColor = getStatusColor(task.status)
                  return (
                    <div key={task.id} className={styles.taskCard} style={{
                      backgroundColor: task.status === 'COMPLETED' ? '#f9fafb' : '#ffffff'
                    }}>
                      <div className={styles.taskContent}>
                        <div className={styles.taskTop}>
                          <h3 className={styles.taskTitle} style={{
                            textDecoration: task.status === 'COMPLETED' ? 'line-through' : 'none',
                            color: task.status === 'COMPLETED' ? '#9ca3af' : '#101828'
                          }}>
                            {task.title}
                          </h3>
                          <span className={styles.statusBadge} style={{
                            backgroundColor: statusColor.bg,
                            borderColor: statusColor.border,
                            color: statusColor.text
                          }}>
                            {task.status.replace('_', ' ')}
                          </span>
                        </div>
                        <p className={styles.taskDescription}>{task.description}</p>
                        <div className={styles.taskMeta}>
                          <div className={styles.metaItem}>
                            <span className={styles.metaIcon}>🏷</span>
                            <span className={styles.categoryBadge} style={{
                              backgroundColor: priorityColor.bg,
                              color: priorityColor.text
                            }}>
                              {task.priority}
                            </span>
                          </div>
                          <div className={styles.metaItem}>
                            <span className={styles.metaIcon}>📅</span>
                            <span className={styles.dateText}>{task.dueDate || 'No deadline'}</span>
                          </div>
                        </div>
                      </div>
                      <div className={styles.taskActions}>
                        <select
                          className={styles.statusDropdown}
                          value={task.status}
                          onChange={(e) => handleStatusChange(task.id, e.target.value)}
                        >
                          <option value="TODO">Pending</option>
                          <option value="IN_PROGRESS">In Progress</option>
                          <option value="COMPLETED">Completed</option>
                        </select>
                        <button className={styles.actionButton} onClick={() => handleEditTask(task)}>✎</button>
                        <button className={styles.actionButton} onClick={() => handleDeleteTask(task.id)}>🗑</button>
                      </div>
                    </div>
                  )
                })
              ) : (
                <div className={styles.emptyState}>
                  <p>No tasks found</p>
                </div>
              )}
            </div>
          </div>

          {/* Sidebar */}
          <div className={styles.sidebar}>
            <div className={styles.sidebarHeader}>
              <h3 className={styles.sidebarTitle}>Recent Activity</h3>
              <p className={styles.sidebarSubtitle}>Track your task management actions</p>
            </div>

            <div className={styles.activityList}>
              {tasks.slice(0, 4).map((task, idx) => (
                <div key={task.id} className={styles.activityItem}>
                  <div className={styles.activityIcon}>🔔</div>
                  <div className={styles.activityContent}>
                    <div className={styles.activityText}>Created task "{task.title}"</div>
                    <div className={styles.activityTime}>{new Date(task.createdAt).toLocaleDateString()}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Create Task Modal */}
      {showCreateModal && (
        <div className={styles.modal}>
          <div className={styles.modalContent}>
            <div className={styles.modalHeader}>
              <h2>{editingTaskId ? 'Edit Task' : 'Create New Task'}</h2>
              <button
                className={styles.modalClose}
                onClick={() => {
                  setShowCreateModal(false)
                  setEditingTaskId(null)
                  setNewTask({ title: '', description: '', priority: 'MEDIUM', dueDate: new Date().toISOString().split('T')[0] })
                }}
              >
                ✕
              </button>
            </div>
            <div className={styles.modalBody}>
              <div className={styles.formGroup}>
                <label>Task Title</label>
                <input
                  type="text"
                  placeholder="Enter task title..."
                  value={newTask.title}
                  onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
                  className={styles.input}
                />
              </div>
              <div className={styles.formGroup}>
                <label>Description</label>
                <textarea
                  placeholder="Enter task description..."
                  value={newTask.description}
                  onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
                  className={styles.textarea}
                  rows={3}
                />
              </div>
              <div className={styles.formGroup}>
                <label>Priority</label>
                <select
                  value={newTask.priority}
                  onChange={(e) => setNewTask({ ...newTask, priority: e.target.value as 'LOW' | 'MEDIUM' | 'HIGH' })}
                  className={styles.select}
                >
                  <option value="LOW">Low</option>
                  <option value="MEDIUM">Medium</option>
                  <option value="HIGH">High</option>
                </select>
              </div>
              <div className={styles.formGroup}>
                <label>Deadline</label>
                <input
                  type="date"
                  value={newTask.dueDate}
                  onChange={(e) => setNewTask({ ...newTask, dueDate: e.target.value })}
                  className={styles.input}
                />
              </div>
            </div>
            <div className={styles.modalFooter}>
              <button
                className={styles.cancelButton}
                onClick={() => {
                  setShowCreateModal(false)
                  setEditingTaskId(null)
                  setNewTask({ title: '', description: '', priority: 'MEDIUM', dueDate: new Date().toISOString().split('T')[0] })
                }}
              >
                Cancel
              </button>
              <button
                className={styles.submitButton}
                onClick={handleCreateTask}
              >
                {editingTaskId ? 'Update Task' : 'Create Task'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
