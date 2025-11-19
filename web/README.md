# TaskFlow Web Application

A modern, responsive task management web application built with React, TypeScript, and CSS Modules.

## Project Structure

```
web/
├── src/
│   ├── pages/
│   │   ├── SignIn.tsx           # Sign-in page
│   │   ├── CreateAccount.tsx    # Registration page
│   │   └── Dashboard.tsx         # Main task dashboard
│   ├── styles/
│   │   ├── index.css             # Global styles
│   │   ├── SignIn.module.css     # Sign-in styling
│   │   ├── CreateAccount.module.css # Registration styling
│   │   └── Dashboard.module.css   # Dashboard styling
│   ├── App.tsx                   # Main app component with routing
│   └── main.tsx                  # Entry point
├── index.html                    # HTML template
├── package.json                  # Dependencies
├── tsconfig.json                 # TypeScript config
├── vite.config.ts                # Vite config
└── README.md                     # This file
```

## Features

- ✅ **Sign-in Page**: Google OAuth and email/password authentication with demo accounts
- ✅ **Registration Page**: Account creation with email, password, and profile info
- ✅ **Dashboard**: Main interface with task management, statistics, and activity tracking
- ✅ **Task Management**: Create, view, and manage tasks with different statuses (Pending, In Progress, Completed)
- ✅ **Responsive Design**: Full viewport coverage with no scrolling, flex-based layouts
- ✅ **CSS Modules**: Scoped styling to avoid naming conflicts
- ✅ **TypeScript**: Fully typed React components

## Getting Started

### Prerequisites

- Node.js 16+ and npm/yarn

### Installation

1. Navigate to the web directory:

```bash
cd web
```

2. Install dependencies:

```bash
npm install
```

3. Start the development server:

```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173`

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build locally

## Styling System

The project uses **CSS Modules** for styling:

- Each component has its own `.module.css` file
- Scoped class names prevent naming conflicts
- Global styles defined in `styles/index.css`
- Uses flexbox for layout with full viewport coverage

## Key Design Decisions

1. **No Tailwind**: Uses CSS Modules instead for better maintainability
2. **Full Viewport**: All pages occupy 100vh/100vw with overflow hidden
3. **Flex Layouts**: Components use flex-direction: column as required
4. **Authentication Flow**: SignIn → Dashboard or CreateAccount for new users
5. **State Management**: React hooks for local state (ready for Redux/Context when needed)

## Color Scheme

- **Primary**: #4f39f6 (Indigo)
- **Secondary**: #3d2bd4 (Dark Indigo)
- **Dark Text**: #030213
- **Light Text**: #6c6c7d
- **Background**: #ffffff / #f9fafb
- **Success**: #10b981 (Green)
- **Warning**: #fbbf24 (Yellow)
- **Danger**: #ef4444 (Red)

## Next Steps

- [ ] Integrate with backend API
- [ ] Implement user authentication with Google OAuth
- [ ] Add task creation modal
- [ ] Implement task filtering and search
- [ ] Add task detail view
- [ ] Implement data persistence
- [ ] Add unit tests
- [ ] Set up CI/CD pipeline
