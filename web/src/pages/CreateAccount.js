import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from '@/styles/CreateAccount.module.css';
// Figma asset URLs
const imgIcon = 'https://www.figma.com/api/mcp/asset/b9d9fdb3-ca10-42ee-bc7c-491dcf79baa3';
const imgRegisterPage = 'https://www.figma.com/api/mcp/asset/27b60b35-a90a-412d-8338-7dc763e346b1';
const imgIcon1 = 'https://www.figma.com/api/mcp/asset/d101073a-39db-4ab9-8108-dbbc1f25b377';
const imgIcon2 = 'https://www.figma.com/api/mcp/asset/e9ff9f16-0746-4d2a-8ead-c14220da875b';
const imgIcon3 = 'https://www.figma.com/api/mcp/asset/7528bdca-b60f-4a4d-a7ca-8db2ba5899ff';
const imgIcon4 = 'https://www.figma.com/api/mcp/asset/e055199e-2144-4ae5-acd3-017774e27a4e';
const imgIcon5 = 'https://www.figma.com/api/mcp/asset/382d071d-70ec-4cbe-81e2-4354c1cc3a7b';
export default function CreateAccount() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        password: '',
        confirmPassword: '',
    });
    const [error, setError] = useState('');
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
        setError('');
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        if (!formData.fullName || !formData.email || !formData.password || !formData.confirmPassword) {
            setError('Please fill in all fields');
            return;
        }
        if (formData.password !== formData.confirmPassword) {
            setError('Passwords do not match');
            return;
        }
        if (formData.password.length < 8) {
            setError('Password must be at least 8 characters');
            return;
        }
        // Simulate successful account creation
        navigate('/signin');
    };
    return (_jsxs("div", { className: styles.container, "data-node-id": "3:5533", children: [_jsx("div", { className: `${styles.backgroundBlur} ${styles.blur1}`, "data-node-id": "3:5634" }), _jsx("div", { className: `${styles.backgroundBlur} ${styles.blur2}`, "data-node-id": "3:5635" }), _jsx("div", { className: `${styles.backgroundBlur} ${styles.blur3}`, "data-node-id": "3:5636" }), _jsxs("div", { className: styles.mainContent, children: [_jsxs("div", { className: styles.card, "data-node-id": "3:5545", children: [_jsxs("div", { className: styles.cardHeader, "data-node-id": "3:5546", children: [_jsx("h2", { className: styles.cardTitle, "data-node-id": "3:5547", children: "Sign Up" }), _jsx("p", { className: styles.cardDescription, "data-node-id": "3:5549", children: "Choose your preferred registration method" })] }), _jsxs("div", { className: styles.cardContent, "data-node-id": "3:5551", children: [_jsxs("button", { className: styles.googleButton, "data-node-id": "3:5552", children: [_jsx("img", { alt: "Google logo", className: styles.googleIcon, src: imgRegisterPage, "data-node-id": "3:5553" }), _jsx("span", { children: "Sign up with Google" })] }), _jsxs("div", { className: styles.divider, "data-node-id": "3:5622", children: [_jsx("div", { className: styles.dividerLine, "data-node-id": "3:5623" }), _jsx("div", { className: styles.dividerText, "data-node-id": "3:5624", children: "Or register with email" }), _jsx("div", { className: styles.dividerLine })] }), _jsxs("form", { onSubmit: handleSubmit, className: styles.formFields, "data-node-id": "3:5559", children: [_jsxs("div", { className: styles.formGroup, "data-node-id": "3:5560", children: [_jsx("label", { className: styles.label, "data-node-id": "3:5561", children: "Full Name" }), _jsxs("div", { className: styles.inputWrapper, children: [_jsx("img", { alt: "Name icon", className: styles.inputIcon, src: imgIcon1, "data-node-id": "3:5566" }), _jsx("input", { type: "text", name: "fullName", className: styles.input, placeholder: "John Doe", value: formData.fullName, onChange: handleChange, "data-node-id": "3:5564" })] })] }), _jsxs("div", { className: styles.formGroup, "data-node-id": "3:5569", children: [_jsx("label", { className: styles.label, "data-node-id": "3:5570", children: "Email Address" }), _jsxs("div", { className: styles.inputWrapper, children: [_jsx("img", { alt: "Email icon", className: styles.inputIcon, src: imgIcon2, "data-node-id": "3:5575" }), _jsx("input", { type: "email", name: "email", className: styles.input, placeholder: "you@example.com", value: formData.email, onChange: handleChange, "data-node-id": "3:5573" })] })] }), _jsxs("div", { className: styles.formGroup, "data-node-id": "3:5578", children: [_jsx("label", { className: styles.label, "data-node-id": "3:5579", children: "Password" }), _jsxs("div", { className: styles.inputWrapper, children: [_jsx("img", { alt: "Password icon", className: styles.inputIcon, src: imgIcon3, "data-node-id": "3:5584" }), _jsx("input", { type: "password", name: "password", className: styles.input, placeholder: "Min. 8 characters", value: formData.password, onChange: handleChange, "data-node-id": "3:5582" })] })] }), _jsxs("div", { className: styles.formGroup, "data-node-id": "3:5587", children: [_jsx("label", { className: styles.label, "data-node-id": "3:5588", children: "Confirm Password" }), _jsxs("div", { className: styles.inputWrapper, children: [_jsx("img", { alt: "Password icon", className: styles.inputIcon, src: imgIcon3, "data-node-id": "3:5593" }), _jsx("input", { type: "password", name: "confirmPassword", className: styles.input, placeholder: "Re-enter password", value: formData.confirmPassword, onChange: handleChange, "data-node-id": "3:5591" })] })] }), error && (_jsx("div", { style: { color: '#ef4444', fontSize: '14px', marginBottom: '8px' }, children: error })), _jsxs("button", { type: "submit", className: styles.submitButton, "data-node-id": "3:5596", children: [_jsx("span", { children: "Create Account" }), _jsx("img", { alt: "Arrow", className: styles.submitIcon, src: imgIcon4, "data-node-id": "3:5598" })] })] }), _jsxs("div", { className: styles.featuresBox, "data-node-id": "3:5601", children: [_jsxs("div", { className: styles.featuresTitle, "data-node-id": "3:5602", children: [_jsx("img", { alt: "Features icon", className: styles.featuresIcon, src: imgIcon5, "data-node-id": "3:5603" }), _jsx("span", { children: "What you get with TaskFlow" })] }), _jsxs("div", { className: styles.featuresList, "data-node-id": "3:5609", children: [_jsx("div", { className: styles.featureItem, "data-node-id": "3:5610", children: "\u2022 Unlimited task creation" }), _jsx("div", { className: styles.featureItem, "data-node-id": "3:5612", children: "\u2022 Activity tracking & analytics" }), _jsx("div", { className: styles.featureItem, "data-node-id": "3:5614", children: "\u2022 Secure cloud storage" }), _jsx("div", { className: styles.featureItem, "data-node-id": "3:5616", children: "\u2022 Cross-device synchronization" })] })] }), _jsxs("div", { className: styles.signInLink, "data-node-id": "3:5618", children: [_jsx("span", { children: "Already have an account?" }), _jsx("span", { className: styles.link, onClick: () => navigate('/signin'), "data-node-id": "3:5620", children: "Sign in here" })] })] })] }), _jsxs("div", { className: styles.termsText, "data-node-id": "3:5626", children: ["By creating an account, you agree to our", ' ', _jsx("span", { className: styles.termsLink, "data-node-id": "3:5628", children: "Terms of Service" }), ' ', "and", ' ', _jsx("span", { className: styles.termsLink, "data-node-id": "3:5631", children: "Privacy Policy" })] })] })] }));
}
