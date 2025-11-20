#  TaskFlow

**TaskFlow** is a planned task management system designed to help users organize, monitor, and complete their tasks efficiently.  
This project will include a backend, web app, and mobile app as part of our IT342 final project.

---

##  Tech Stack (Planned)

- **Backend:** Spring Boot (Java) - v3.3.0
- **Web Application:** ReactJS - v18.3.1
- **Mobile Application:** Kotlin (Android) - v1.9.0
- **Database:** MySQL - v8.0
- **Authentication:** Google OAuth 2.0
- **Version Control:** Git & GitHub - Git v2.44.0

---

##  Setup Instructions

### 1. Prerequisites
- Java 17+
- Maven 3.8+
- Node.js 18+ (with npm)
- MySQL 8 (you can manage it with MySQL Workbench)

### 2. Database
```sql
CREATE DATABASE IF NOT EXISTS taskflowdb
  CHARACTER SET utf8mb4
  COLLATE utf8mb4_unicode_ci;
```
Update `backend/src/main/resources/application.properties` with your MySQL username/password if they differ from the defaults.

### 3. Backend (Spring Boot)
```bash
cd backend
mvn clean package
mvn spring-boot:run
```
The API will be available at `http://localhost:8080` and will automatically apply schema updates to `taskflowdb`.

> 🆕 **Google OAuth:** Set `google.oauth.client-id` in `backend/src/main/resources/application.properties` to your Google Client ID. This is required for Google sign-in to work.

### 4. Frontend (Vite + React)
Create a `.env` inside `web/`:
```
VITE_API_BASE=http://localhost:8080
VITE_GOOGLE_CLIENT_ID=your-google-client-id.apps.googleusercontent.com
```
Then install and run:
```bash
cd web
npm install
npm run dev
```
The web client expects the backend to be running and will call the configured `VITE_API_BASE`.

### 5. Admin Controls & Authentication
- Deactivating a user in the admin panel immediately prevents them from logging in (including Google sign-in).
- Admins can promote/demote roles directly from the dropdown in the admin panel.
- Google sign-in is available on the sign-in page and automatically provisions accounts for first-time Google users.

---

##  Team Members

| Name                       | Role                                                             | CIT-U Email                | GitHub                                     |
| -------------------------- | ---------------------------------------------------------------- | -------------------------- | ------------------------------------------ |
| **Clyde Nixon Jumawan**    | UI/UX - Frontend Developer / Backend Developer                   | clydenixon.jumawan@cit.edu | [@klaydgg12](https://github.com/klaydgg12) |
| **Eupena P. Felix**        | Project Manager - UI/UX - Frontend Developer / Backend Developer | eupena.felix@cit.edu       | [@saluspupuli-dotcom](https://github.com/saluspupuli-dotcom)           |
| **Jake Laurence Y. Zafra** | UI/UX - Frontend Developer / Backend Developer                   | jake.zafra@cit.edu         | [@username](https://github.com/)           |

---

📝 _This repository will be updated as the TaskFlow system development progresses._
