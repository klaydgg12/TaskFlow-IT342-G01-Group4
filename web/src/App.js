import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import SignIn from '@/pages/SignIn';
import CreateAccount from '@/pages/CreateAccount';
import Dashboard from '@/pages/Dashboard';
import AdminPage from '@/pages/Admin';
function App() {
    return (_jsx(Router, { children: _jsxs(Routes, { children: [_jsx(Route, { path: "/signin", element: _jsx(SignIn, {}) }), _jsx(Route, { path: "/register", element: _jsx(CreateAccount, {}) }), _jsx(Route, { path: "/dashboard", element: _jsx(Dashboard, {}) }), _jsx(Route, { path: "/admin", element: _jsx(AdminPage, {}) }), _jsx(Route, { path: "/", element: _jsx(Navigate, { to: "/signin", replace: true }) })] }) }));
}
export default App;
