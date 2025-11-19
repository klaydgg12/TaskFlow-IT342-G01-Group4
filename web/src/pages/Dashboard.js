import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from '@/styles/Dashboard.module.css';
const mockTasks = [
    {
        id: '1',
        title: 'Finish Project',
        description: 'Complete the final deliverables for the client project',
        status: 'in-progress',
        category: 'Work',
        date: '11/20/2025',
    },
    {
        id: '2',
        title: 'Grocery Shopping',
        description: 'Buy groceries for the week',
        status: 'pending',
        category: 'Personal',
        date: '11/18/2025',
    },
    {
        id: '3',
        title: 'Submit Assignment',
        description: 'Submit the research paper for History class',
        status: 'completed',
        category: 'School',
        date: '11/15/2025',
    },
    {
        id: '4',
        title: 'Team Meeting Prep',
        description: 'Prepare presentation slides for team meeting',
        status: 'pending',
        category: 'Work',
        date: '11/19/2025',
    },
];
const mockActivity = [
    { id: '1', text: 'Created task "Finish Project"', time: '7 days ago' },
    { id: '2', text: 'Updated task "Finish Project" to in_progress', time: '3 days ago' },
    { id: '3', text: 'Completed task "Submit Assignment"', time: '2 days ago' },
    { id: '4', text: 'Created task "Team Meeting Prep"', time: '3 days ago' },
];
export default function Dashboard() {
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState('all');
    const [tasks, setTasks] = useState(mockTasks);
    const [currentUser] = useState({ name: 'John Reyes', role: 'User' });
    const [showCreateModal, setShowCreateModal] = useState(false);
    const [editingTaskId, setEditingTaskId] = useState(null);
    const [newTask, setNewTask] = useState({
        title: '',
        description: '',
        category: 'Work',
        date: new Date().toISOString().split('T')[0],
    });
    const getFilteredTasks = () => {
        switch (activeTab) {
            case 'pending':
                return tasks.filter((t) => t.status === 'pending');
            case 'in-progress':
                return tasks.filter((t) => t.status === 'in-progress');
            case 'completed':
                return tasks.filter((t) => t.status === 'completed');
            default:
                return tasks;
        }
    };
    const stats = {
        total: tasks.length,
        completed: tasks.filter((t) => t.status === 'completed').length,
        inProgress: tasks.filter((t) => t.status === 'in-progress').length,
        pending: tasks.filter((t) => t.status === 'pending').length,
    };
    const getTabLabel = (tab) => {
        if (tab === 'all') {
            return `All Tasks (${stats.total})`;
        }
        switch (tab) {
            case 'pending':
                return `Pending (${stats.pending})`;
            case 'in-progress':
                return `In Progress (${stats.inProgress})`;
            case 'completed':
                return `Completed (${stats.completed})`;
        }
    };
    const getCategoryColor = (category) => {
        switch (category) {
            case 'School':
                return { bg: '#e0e7ff', text: '#372aac' };
            case 'Work':
                return { bg: '#e9d5ff', text: '#6e11b0' };
            case 'Personal':
                return { bg: '#fce7f3', text: '#a3004c' };
            default:
                return { bg: '#f3f4f6', text: '#4b5563' };
        }
    };
    const getStatusColor = (status) => {
        switch (status) {
            case 'pending':
                return { bg: '#fef9c2', border: '#fff085', text: '#894b00' };
            case 'in-progress':
                return { bg: '#bfdbfe', border: '#bedbff', text: '#1e40af' };
            case 'completed':
                return { bg: '#d1fae5', border: '#b9f8cf', text: '#016630' };
            default:
                return { bg: '#f3f4f6', border: '#e5e7eb', text: '#4b5563' };
        }
    };
    const handleCreateTask = () => {
        if (newTask.title.trim()) {
            if (editingTaskId) {
                // Update existing task
                setTasks((prevTasks) => prevTasks.map((task) => task.id === editingTaskId
                    ? {
                        ...task,
                        title: newTask.title,
                        description: newTask.description,
                        category: newTask.category,
                        date: newTask.date,
                    }
                    : task));
                setEditingTaskId(null);
            }
            else {
                // Create new task
                const task = {
                    id: String(Date.now()),
                    title: newTask.title,
                    description: newTask.description,
                    status: 'pending',
                    category: newTask.category,
                    date: newTask.date,
                };
                setTasks([...tasks, task]);
            }
            setNewTask({ title: '', description: '', category: 'Work', date: new Date().toISOString().split('T')[0] });
            setShowCreateModal(false);
        }
    };
    const handleEditTask = (task) => {
        setEditingTaskId(task.id);
        setNewTask({
            title: task.title,
            description: task.description,
            category: task.category,
            date: task.date,
        });
        setShowCreateModal(true);
    };
    const handleDeleteTask = (taskId) => {
        setTasks((prevTasks) => prevTasks.filter((task) => task.id !== taskId));
    };
    const handleLogout = () => {
        navigate('/signin');
    };
    const filteredTasks = getFilteredTasks();
    return (_jsxs("div", { className: styles.container, children: [_jsxs("div", { className: styles.header, children: [_jsx("div", { className: styles.headerLeft, children: _jsxs("div", { className: styles.logo, children: [_jsx("div", { className: styles.logoIcon, children: "\uD83D\uDCCB" }), _jsxs("div", { children: [_jsx("div", { className: styles.logoText, children: "TaskFlow" }), _jsx("div", { className: styles.logoSubtext, children: "Task Management System" })] })] }) }), _jsxs("div", { className: styles.headerRight, children: [_jsxs("div", { className: styles.userInfo, children: [_jsx("div", { className: styles.userName, children: currentUser.name }), _jsxs("div", { className: styles.userRole, children: [_jsx("span", { className: styles.userRoleIcon, children: "\uD83D\uDC64" }), currentUser.role] })] }), _jsx("div", { className: styles.avatar }), _jsxs("button", { className: styles.logoutButton, onClick: handleLogout, children: [_jsx("span", { className: styles.logoutIcon, children: "\uD83D\uDEAA" }), "Logout"] })] })] }), _jsxs("div", { className: styles.mainContent, children: [_jsxs("div", { className: styles.titleSection, children: [_jsx("h1", { className: styles.pageTitle, children: "My Tasks" }), _jsx("p", { className: styles.pageSubtitle, children: "Manage your personal tasks and track your progress" })] }), _jsxs("div", { className: styles.statsGrid, children: [_jsxs("div", { className: styles.statCard, children: [_jsxs("div", { className: styles.statContent, children: [_jsx("div", { className: styles.statLabel, children: "Total Tasks" }), _jsx("div", { className: styles.statValue, children: stats.total })] }), _jsx("div", { className: styles.statIcon, style: { backgroundColor: '#e0e7ff' }, children: "\uD83D\uDCCB" })] }), _jsxs("div", { className: styles.statCard, children: [_jsxs("div", { className: styles.statContent, children: [_jsx("div", { className: styles.statLabel, children: "Completed" }), _jsx("div", { className: styles.statValue, children: stats.completed })] }), _jsx("div", { className: styles.statIcon, style: { backgroundColor: '#dcfce7' }, children: "\u2713" })] }), _jsxs("div", { className: styles.statCard, children: [_jsxs("div", { className: styles.statContent, children: [_jsx("div", { className: styles.statLabel, children: "In Progress" }), _jsx("div", { className: styles.statValue, children: stats.inProgress })] }), _jsx("div", { className: styles.statIcon, style: { backgroundColor: '#bfdbfe' }, children: "\u23F1" })] }), _jsxs("div", { className: styles.statCard, children: [_jsxs("div", { className: styles.statContent, children: [_jsx("div", { className: styles.statLabel, children: "Pending" }), _jsx("div", { className: styles.statValue, children: stats.pending })] }), _jsx("div", { className: styles.statIcon, style: { backgroundColor: '#fef9c2' }, children: "\u23F3" })] })] }), _jsxs("div", { className: styles.contentWrapper, children: [_jsxs("div", { className: styles.tasksSection, children: [_jsx("div", { className: styles.tasksHeader, children: _jsx("div", { className: styles.tabsContainer, children: ['all', 'pending', 'in-progress', 'completed'].map((tab) => (_jsx("button", { className: `${styles.tab} ${activeTab === tab ? styles.active : ''}`, onClick: () => setActiveTab(tab), children: getTabLabel(tab) }, tab))) }) }), _jsx("div", { className: styles.tasksList, children: filteredTasks.length > 0 ? (filteredTasks.map((task) => {
                                            const categoryColor = getCategoryColor(task.category);
                                            const statusColor = getStatusColor(task.status);
                                            return (_jsxs("div", { className: styles.taskCard, style: {
                                                    backgroundColor: task.status === 'completed' ? '#f9fafb' : '#ffffff'
                                                }, children: [_jsxs("div", { className: styles.taskContent, children: [_jsxs("div", { className: styles.taskTop, children: [_jsx("h3", { className: styles.taskTitle, style: {
                                                                            textDecoration: task.status === 'completed' ? 'line-through' : 'none',
                                                                            color: task.status === 'completed' ? '#9ca3af' : '#101828'
                                                                        }, children: task.title }), _jsx("span", { className: styles.statusBadge, style: {
                                                                            backgroundColor: statusColor.bg,
                                                                            borderColor: statusColor.border,
                                                                            color: statusColor.text
                                                                        }, children: task.status.replace('-', ' ') })] }), _jsx("p", { className: styles.taskDescription, children: task.description }), _jsxs("div", { className: styles.taskMeta, children: [_jsxs("div", { className: styles.metaItem, children: [_jsx("span", { className: styles.metaIcon, children: "\uD83C\uDFF7" }), _jsx("span", { className: styles.categoryBadge, style: {
                                                                                    backgroundColor: categoryColor.bg,
                                                                                    color: categoryColor.text
                                                                                }, children: task.category })] }), _jsxs("div", { className: styles.metaItem, children: [_jsx("span", { className: styles.metaIcon, children: "\uD83D\uDCC5" }), _jsx("span", { className: styles.dateText, children: task.date })] })] })] }), _jsxs("div", { className: styles.taskActions, children: [_jsxs("select", { className: styles.statusDropdown, value: task.status, onChange: (e) => setTasks((prevTasks) => prevTasks.map((t) => t.id === task.id ? { ...t, status: e.target.value } : t)), children: [_jsx("option", { value: "pending", children: "Pending" }), _jsx("option", { value: "in-progress", children: "In Progress" }), _jsx("option", { value: "completed", children: "Completed" })] }), _jsx("button", { className: styles.actionButton, onClick: () => handleEditTask(task), children: "\u270E" }), _jsx("button", { className: styles.actionButton, onClick: () => handleDeleteTask(task.id), children: "\uD83D\uDDD1" })] })] }, task.id));
                                        })) : (_jsx("div", { className: styles.emptyState, children: _jsx("p", { children: "No tasks found" }) })) })] }), _jsxs("div", { className: styles.sidebar, children: [_jsxs("div", { className: styles.sidebarHeader, children: [_jsx("h3", { className: styles.sidebarTitle, children: "Recent Activity" }), _jsx("p", { className: styles.sidebarSubtitle, children: "Track your task management actions" })] }), _jsx("div", { className: styles.activityList, children: mockActivity.map((activity) => (_jsxs("div", { className: styles.activityItem, children: [_jsx("div", { className: styles.activityIcon, children: "\uD83D\uDD14" }), _jsxs("div", { className: styles.activityContent, children: [_jsx("div", { className: styles.activityText, children: activity.text }), _jsx("div", { className: styles.activityTime, children: activity.time })] })] }, activity.id))) })] })] }), _jsxs("button", { className: styles.createTaskButton, onClick: () => setShowCreateModal(true), children: [_jsx("span", { children: "+" }), "Create Task"] })] }), showCreateModal && (_jsx("div", { className: styles.modal, children: _jsxs("div", { className: styles.modalContent, children: [_jsxs("div", { className: styles.modalHeader, children: [_jsx("h2", { children: editingTaskId ? 'Edit Task' : 'Create New Task' }), _jsx("button", { className: styles.modalClose, onClick: () => {
                                        setShowCreateModal(false);
                                        setEditingTaskId(null);
                                        setNewTask({ title: '', description: '', category: 'Work', date: new Date().toISOString().split('T')[0] });
                                    }, children: "\u2715" })] }), _jsxs("div", { className: styles.modalBody, children: [_jsxs("div", { className: styles.formGroup, children: [_jsx("label", { children: "Task Title" }), _jsx("input", { type: "text", placeholder: "Enter task title...", value: newTask.title, onChange: (e) => setNewTask({ ...newTask, title: e.target.value }), className: styles.input })] }), _jsxs("div", { className: styles.formGroup, children: [_jsx("label", { children: "Description" }), _jsx("textarea", { placeholder: "Enter task description...", value: newTask.description, onChange: (e) => setNewTask({ ...newTask, description: e.target.value }), className: styles.textarea, rows: 3 })] }), _jsxs("div", { className: styles.formGroup, children: [_jsx("label", { children: "Category" }), _jsxs("select", { value: newTask.category, onChange: (e) => setNewTask({ ...newTask, category: e.target.value }), className: styles.select, children: [_jsx("option", { value: "School", children: "School" }), _jsx("option", { value: "Work", children: "Work" }), _jsx("option", { value: "Personal", children: "Personal" })] })] }), _jsxs("div", { className: styles.formGroup, children: [_jsx("label", { children: "Deadline" }), _jsx("input", { type: "date", value: newTask.date, onChange: (e) => setNewTask({ ...newTask, date: e.target.value }), className: styles.input })] })] }), _jsxs("div", { className: styles.modalFooter, children: [_jsx("button", { className: styles.cancelButton, onClick: () => {
                                        setShowCreateModal(false);
                                        setEditingTaskId(null);
                                        setNewTask({ title: '', description: '', category: 'Work', date: new Date().toISOString().split('T')[0] });
                                    }, children: "Cancel" }), _jsx("button", { className: styles.submitButton, onClick: handleCreateTask, children: editingTaskId ? 'Update Task' : 'Create Task' })] })] }) }))] }));
}
