import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useNavigate } from 'react-router-dom';
import styles from '@/styles/SignIn.module.css';
// Figma asset URLs
const imgIcon = 'https://www.figma.com/api/mcp/asset/a1b721a8-adf4-4b61-bc35-3fa5826f85c6';
const imgIcon1 = 'https://www.figma.com/api/mcp/asset/98005cb1-3fe2-4a4f-8957-f6938bb069b0';
const imgIcon2 = 'https://www.figma.com/api/mcp/asset/4c89452b-d8c6-45dd-95d0-d6ddb878735d';
const imgIcon3 = 'https://www.figma.com/api/mcp/asset/8d97958d-3273-4be6-985a-6d7a48b9af8e';
const imgLogin = 'https://www.figma.com/api/mcp/asset/3e732446-b509-4ced-abb1-407371b173cc';
const demoAccounts = [
    {
        name: 'John Reyes',
        email: 'john.reyes@example.com',
        role: 'User',
        initials: 'JR',
        icon: imgIcon1,
    },
    {
        name: 'Admin Cruz',
        email: 'admin.cruz@example.com',
        role: 'Admin',
        initials: 'AC',
        icon: imgIcon2,
    },
];
export default function SignIn() {
    const navigate = useNavigate();
    const handleDemoAccountClick = (account) => {
        // Simulate login and route based on role
        setTimeout(() => {
            if (account.role === 'Admin') {
                navigate('/admin');
            }
            else {
                navigate('/dashboard');
            }
        }, 500);
    };
    return (_jsxs("div", { className: styles.container, "data-node-id": "3:5355", children: [_jsx("div", { className: `${styles.backgroundBlur} ${styles.blur1}`, "data-node-id": "3:5440" }), _jsx("div", { className: `${styles.backgroundBlur} ${styles.blur2}`, "data-node-id": "3:5441" }), _jsx("div", { className: `${styles.backgroundBlur} ${styles.blur3}`, "data-node-id": "3:5442" }), _jsxs("div", { className: styles.mainContent, children: [_jsxs("div", { className: styles.headerSection, "data-node-id": "3:5358", children: [_jsx("div", { className: styles.iconContainer, "data-node-id": "3:5359", children: _jsx("img", { alt: "TaskFlow icon", className: styles.icon, src: imgIcon, "data-node-id": "3:5360" }) }), _jsx("h1", { className: styles.headerTitle, "data-node-id": "3:5362", children: "Welcome to TaskFlow" }), _jsx("p", { className: styles.headerSubtitle, "data-node-id": "3:5364", children: "Your intelligent task management companion" })] }), _jsxs("div", { className: styles.card, "data-node-id": "3:5366", children: [_jsxs("div", { className: styles.cardHeader, "data-node-id": "3:5367", children: [_jsx("h2", { className: styles.cardTitle, "data-node-id": "3:5368", children: "Sign In" }), _jsx("p", { className: styles.cardDescription, "data-node-id": "3:5370", children: "Continue with your Google account to access your tasks" })] }), _jsxs("div", { className: styles.cardContent, "data-node-id": "3:5372", children: [_jsx("div", { className: styles.googleButtonContainer, "data-node-id": "3:5426", children: _jsxs("button", { className: styles.googleButton, children: [_jsx("img", { alt: "Google logo", className: styles.googleIcon, src: imgLogin, "data-node-id": "3:5427" }), _jsx("span", { children: "Continue with Google" })] }) }), _jsxs("div", { className: styles.divider, "data-node-id": "3:5433", children: [_jsx("div", { className: styles.dividerLine, "data-node-id": "3:5434" }), _jsx("div", { className: styles.dividerText, "data-node-id": "3:5435", children: "Demo Accounts" }), _jsx("div", { className: styles.dividerLine })] }), _jsx("div", { className: styles.demoAccountsList, "data-node-id": "3:5373", children: demoAccounts.map((account, index) => (_jsxs("div", { className: styles.demoAccount, onClick: () => handleDemoAccountClick(account), "data-node-id": index === 0 ? '3:5374' : '3:5388', children: [_jsxs("div", { className: styles.accountLeft, children: [_jsx("div", { className: `${styles.accountAvatar} ${account.role === 'User' ? styles.johnAvatar : styles.adminAvatar}`, "data-node-id": index === 0 ? '3:5377' : '3:5391', children: _jsx("img", { alt: account.name, className: styles.icon, src: account.icon, style: { width: '20px', height: '20px' }, "data-node-id": index === 0 ? '3:5378' : '3:5392' }) }), _jsxs("div", { className: styles.accountInfo, "data-node-id": index === 0 ? '3:5381' : '3:5394', children: [_jsx("div", { className: styles.accountName, "data-node-id": index === 0 ? '3:5382' : '3:5395', children: account.name }), _jsx("div", { className: styles.accountEmail, "data-node-id": index === 0 ? '3:5384' : '3:5397', children: account.email })] })] }), _jsx("div", { className: `${styles.accountRole} ${account.role === 'User' ? styles.userRole : styles.adminRole}`, "data-node-id": index === 0 ? '3:5386' : '3:5399', children: account.role })] }, index))) }), _jsxs("div", { className: styles.securityBox, "data-node-id": "3:5401", children: [_jsxs("div", { className: styles.securityTitle, "data-node-id": "3:5402", children: [_jsx("img", { alt: "Security icon", className: styles.securityIcon, src: imgIcon3, "data-node-id": "3:5403" }), _jsx("span", { children: "Secure OAuth Authentication" })] }), _jsxs("div", { className: styles.securityItems, "data-node-id": "3:5409", children: [_jsx("div", { className: styles.securityItem, "data-node-id": "3:5410", children: "\u2022 Encrypted session management" }), _jsx("div", { className: styles.securityItem, "data-node-id": "3:5412", children: "\u2022 Audit logging enabled" }), _jsx("div", { className: styles.securityItem, "data-node-id": "3:5414", children: "\u2022 Token-based security" })] })] }), _jsxs("div", { className: styles.footer, "data-node-id": "3:5416", children: [_jsxs("div", { className: styles.divider, "data-node-id": "3:5417", children: [_jsx("div", { className: styles.dividerLine, "data-node-id": "3:5418" }), _jsx("div", { className: styles.dividerText, "data-node-id": "3:5419", children: "New to TaskFlow?" }), _jsx("div", { className: styles.dividerLine })] }), _jsx("button", { className: styles.createAccountButton, onClick: () => navigate('/register'), "data-node-id": "3:5421", children: "Create Free Account" }), _jsx("p", { className: styles.footerText, "data-node-id": "3:5424", children: "Join TaskFlow and start managing tasks efficiently" })] })] })] }), _jsx("p", { className: styles.bottomText, "data-node-id": "3:5437", children: "Demo mode \u2022 Production-ready OAuth flow" })] })] }));
}
