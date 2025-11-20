import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from '@/styles/Admin.module.css';
// Figma asset URLs
const imgIcon = 'https://www.figma.com/api/mcp/asset/a05f1d0d-f6f3-4c5b-af8f-b74b58e6cf8d';
const imgIcon1 = 'https://www.figma.com/api/mcp/asset/a694181b-fe5a-44d8-b9a9-2b7014b1f335';
const imgIcon2 = 'https://www.figma.com/api/mcp/asset/01572186-5370-4500-b1b0-3ff68665429c';
const imgIcon3 = 'https://www.figma.com/api/mcp/asset/7c7abb1e-618c-46cb-85af-4fade944cd27';
const imgIcon4 = 'https://www.figma.com/api/mcp/asset/6ae02a5b-ae1f-40ef-b168-6a8ef47d8332';
const imgIcon5 = 'https://www.figma.com/api/mcp/asset/1fb7e266-cd5a-44ae-8317-0f2bfca22903';
const imgIcon6 = 'https://www.figma.com/api/mcp/asset/81f4ffe1-c0b3-424f-9ac0-ae3de46c2fb7';
const imgIcon7 = 'https://www.figma.com/api/mcp/asset/4b454096-cc20-4b6b-b49a-1da4e43b8533';
const mockUsers = [
    {
        id: 1,
        name: 'John Reyes',
        email: 'john.reyes@example.com',
        role: 'user',
        status: 'active',
        joinDate: '10/1/2025',
    },
    {
        id: 2,
        name: 'Admin Cruz',
        email: 'admin.cruz@example.com',
        role: 'admin',
        status: 'active',
        joinDate: '9/15/2025',
    },
    {
        id: 3,
        name: 'Maria Santos',
        email: 'maria.santos@example.com',
        role: 'user',
        status: 'active',
        joinDate: '10/15/2025',
    },
    {
        id: 4,
        name: 'Carlos Mendoza',
        email: 'carlos.mendoza@example.com',
        role: 'user',
        status: 'active',
        joinDate: '11/1/2025',
    },
    {
        id: 5,
        name: 'Anna Garcia',
        email: 'anna.garcia@example.com',
        role: 'user',
        status: 'deactivated',
        joinDate: '10/20/2025',
    },
];
export default function AdminPage() {
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState('users');
    const [users, setUsers] = useState(mockUsers);
    const [currentUser] = useState({ name: 'Admin Cruz', role: 'Admin' });
    const stats = {
        totalUsers: users.length,
        activeUsers: users.filter((u) => u.status === 'active').length,
        admins: users.filter((u) => u.role === 'admin').length,
        events24h: 4,
    };
    const toggleUserStatus = (userId) => {
        setUsers((prevUsers) => prevUsers.map((user) => user.id === userId
            ? {
                ...user,
                status: user.status === 'active' ? 'deactivated' : 'active',
            }
            : user));
    };
    return (_jsxs("div", { className: styles.container, "data-node-id": "3:5638", children: [_jsxs("div", { className: styles.header, "data-node-id": "3:5641", children: [_jsxs("div", { className: styles.headerLeft, children: [_jsx("div", { className: styles.logoContainer, children: _jsx("img", { alt: "TaskFlow", src: imgIcon, className: styles.logo }) }), _jsxs("div", { className: styles.brandText, children: [_jsx("div", { className: styles.brandName, children: "TaskFlow" }), _jsx("div", { className: styles.brandSubtitle, children: "Task Management System" })] })] }), _jsxs("div", { className: styles.headerRight, children: [_jsxs("div", { className: styles.userInfo, children: [_jsx("div", { className: styles.userName, children: currentUser.name }), _jsxs("div", { className: styles.userRole, children: [_jsx("img", { alt: "Admin icon", src: imgIcon1, className: styles.roleIcon }), _jsx("span", { children: currentUser.role })] })] }), _jsxs("button", { className: styles.logoutBtn, onClick: () => navigate('/signin'), children: [_jsx("img", { alt: "Logout", src: imgIcon2 }), _jsx("span", { children: "Logout" })] })] })] }), _jsxs("div", { className: styles.mainContent, children: [_jsxs("div", { className: styles.pageHeader, children: [_jsx("h1", { className: styles.pageTitle, children: "Admin Dashboard" }), _jsx("p", { className: styles.pageSubtitle, children: "Manage users, monitor activity, and review system logs" })] }), _jsxs("div", { className: styles.statsGrid, children: [_jsxs("div", { className: styles.statCard, children: [_jsxs("div", { className: styles.statContent, children: [_jsx("div", { className: styles.statLabel, children: "Total Users" }), _jsx("div", { className: styles.statValue, children: stats.totalUsers })] }), _jsx("div", { className: `${styles.statIcon} ${styles.iconPurple}` })] }), _jsxs("div", { className: styles.statCard, children: [_jsxs("div", { className: styles.statContent, children: [_jsx("div", { className: styles.statLabel, children: "Active Users" }), _jsx("div", { className: styles.statValue, children: stats.activeUsers })] }), _jsx("div", { className: `${styles.statIcon} ${styles.iconGreen}` })] }), _jsxs("div", { className: styles.statCard, children: [_jsxs("div", { className: styles.statContent, children: [_jsx("div", { className: styles.statLabel, children: "Administrators" }), _jsx("div", { className: styles.statValue, children: stats.admins })] }), _jsx("div", { className: `${styles.statIcon} ${styles.iconPurple}` })] }), _jsxs("div", { className: styles.statCard, children: [_jsxs("div", { className: styles.statContent, children: [_jsx("div", { className: styles.statLabel, children: "Events (24h)" }), _jsx("div", { className: styles.statValue, children: stats.events24h })] }), _jsx("div", { className: `${styles.statIcon} ${styles.iconOrange}` })] })] }), _jsxs("div", { className: styles.tabContainer, children: [_jsx("button", { className: `${styles.tab} ${activeTab === 'users' ? styles.tabActive : ''}`, onClick: () => setActiveTab('users'), children: "User Management" }), _jsx("button", { className: `${styles.tab} ${activeTab === 'audit' ? styles.tabActive : ''}`, onClick: () => setActiveTab('audit'), children: "Audit Logs" }), _jsx("button", { className: `${styles.tab} ${activeTab === 'history' ? styles.tabActive : ''}`, onClick: () => setActiveTab('history'), children: "Role History" })] }), activeTab === 'users' && (_jsxs("div", { className: styles.panel, children: [_jsxs("div", { className: styles.panelHeader, children: [_jsx("h3", { className: styles.panelTitle, children: "User Management" }), _jsx("p", { className: styles.panelSubtitle, children: "Manage user accounts, roles, and permissions" })] }), _jsxs("div", { className: styles.table, children: [_jsxs("div", { className: styles.tableHeader, children: [_jsx("div", { className: styles.tableHeaderCell, style: { width: '222.55px' }, children: "User" }), _jsx("div", { className: styles.tableHeaderCell, style: { width: '277.212px' }, children: "Email" }), _jsx("div", { className: styles.tableHeaderCell, style: { width: '185.113px' }, children: "Role" }), _jsx("div", { className: styles.tableHeaderCell, style: { width: '133.75px' }, children: "Status" }), _jsx("div", { className: styles.tableHeaderCell, style: { width: '134.65px' }, children: "Joined" }), _jsx("div", { className: styles.tableHeaderCell, style: { width: '166.725px' }, children: "Actions" })] }), _jsx("div", { className: styles.tableBody, children: users.map((user) => (_jsxs("div", { className: styles.tableRow, children: [_jsx("div", { className: styles.tableCell, style: { width: '222.55px' }, children: _jsxs("div", { className: styles.userCell, children: [_jsx("div", { className: styles.userAvatar, children: user.name.charAt(0) }), _jsxs("div", { children: [_jsx("div", { className: styles.userName, children: user.name }), _jsxs("div", { className: styles.userId, children: ["ID: ", user.id] })] })] }) }), _jsx("div", { className: styles.tableCell, style: { width: '277.212px' }, children: _jsx("div", { className: styles.email, children: user.email }) }), _jsx("div", { className: styles.tableCell, style: { width: '185.113px' }, children: _jsxs("div", { className: styles.roleSelect, children: [_jsx("img", { alt: user.role, src: user.role === 'admin' ? imgIcon6 : imgIcon3 }), _jsx("span", { children: user.role }), _jsx("img", { alt: "Dropdown", src: imgIcon4 })] }) }), _jsx("div", { className: styles.tableCell, style: { width: '133.75px' }, children: _jsx("div", { className: `${styles.statusBadge} ${user.status === 'active' ? styles.statusActive : styles.statusDeactivated}`, children: user.status }) }), _jsx("div", { className: styles.tableCell, style: { width: '134.65px' }, children: _jsx("div", { className: styles.date, children: user.joinDate }) }), _jsx("div", { className: styles.tableCell, style: { width: '166.725px' }, children: _jsxs("button", { className: `${styles.actionButton} ${user.status === 'active' ? styles.deactivateBtn : styles.activateBtn}`, onClick: () => toggleUserStatus(user.id), children: [_jsx("img", { alt: "Action", src: user.status === 'active' ? imgIcon5 : imgIcon7 }), _jsx("span", { children: user.status === 'active' ? 'Deactivate' : 'Activate' })] }) })] }, user.id))) })] })] })), activeTab === 'audit' && (_jsxs("div", { className: styles.panel, children: [_jsxs("div", { className: styles.panelHeader, children: [_jsx("h3", { className: styles.panelTitle, children: "Audit Logs" }), _jsx("p", { className: styles.panelSubtitle, children: "System activity and user actions" })] }), _jsx("div", { className: styles.emptyState, children: _jsx("p", { children: "Audit logs will be displayed here" }) })] })), activeTab === 'history' && (_jsxs("div", { className: styles.panel, children: [_jsxs("div", { className: styles.panelHeader, children: [_jsx("h3", { className: styles.panelTitle, children: "Role History" }), _jsx("p", { className: styles.panelSubtitle, children: "Changes to user roles and permissions" })] }), _jsx("div", { className: styles.emptyState, children: _jsx("p", { children: "Role history will be displayed here" }) })] }))] })] }));
}
