# TaskFlow API Testing Guide

## Base URL

```
http://localhost:8080
```

---

## USER MANAGEMENT ENDPOINTS

### 1. CREATE USER (Admin or Regular User)

**POST** `/api/users/create`

**Request Body:**

```json
{
  "email": "admin@taskflow.com",
  "password": "admin123",
  "fullName": "Admin User",
  "role": "ADMIN"
}
```

**Response:**

```json
{
  "success": true,
  "message": "User created successfully",
  "user": {
    "id": 1,
    "email": "admin@taskflow.com",
    "password": "admin123",
    "fullName": "Admin User",
    "role": "ADMIN",
    "createdAt": "2025-11-18T16:55:00",
    "isActive": true
  }
}
```

### 2. CREATE REGULAR USER

**POST** `/api/users/create`

```json
{
  "email": "user1@taskflow.com",
  "password": "user123",
  "fullName": "John Doe",
  "role": "USER"
}
```

### 3. GET ALL USERS

**GET** `/api/users/all`

**Response:**

```json
{
  "success": true,
  "total": 2,
  "users": [...]
}
```

### 4. GET ALL ADMINS

**GET** `/api/users/admins`

### 5. GET ALL REGULAR USERS

**GET** `/api/users/regular-users`

### 6. GET USER BY EMAIL

**GET** `/api/users/email/{email}`

Example: `/api/users/email/admin@taskflow.com`

### 7. UPDATE USER

**POST** `/api/users/update/{id}`

**Request Body:**

```json
{
  "fullName": "Updated Name",
  "email": "newemail@taskflow.com"
}
```

### 8. DELETE USER

**DELETE** `/api/users/{id}`

---

## TASK MANAGEMENT ENDPOINTS

### 1. CREATE TASK

**POST** `/api/tasks/create`

**Request Body:**

```json
{
  "title": "Complete Dashboard",
  "description": "Build the main dashboard UI",
  "priority": "HIGH",
  "assignedUserId": 2,
  "createdById": 1
}
```

**Response:**

```json
{
  "success": true,
  "message": "Task created successfully",
  "task": {
    "id": 1,
    "title": "Complete Dashboard",
    "description": "Build the main dashboard UI",
    "status": "TODO",
    "priority": "HIGH",
    "assignedUserId": 2,
    "createdById": 1,
    "createdAt": "2025-11-18T16:55:00",
    "updatedAt": "2025-11-18T16:55:00"
  }
}
```

### 2. GET ALL TASKS

**GET** `/api/tasks/all`

### 3. GET TASK BY ID

**GET** `/api/tasks/{id}`

Example: `/api/tasks/1`

### 4. GET TASKS BY USER

**GET** `/api/tasks/user/{userId}`

Example: `/api/tasks/user/2`

### 5. GET TASKS BY STATUS

**GET** `/api/tasks/status/{status}`

Example: `/api/tasks/status/TODO`

Valid statuses: `TODO`, `IN_PROGRESS`, `COMPLETED`

### 6. GET TASKS BY USER AND STATUS

**GET** `/api/tasks/user/{userId}/status/{status}`

Example: `/api/tasks/user/2/status/IN_PROGRESS`

### 7. UPDATE TASK

**POST** `/api/tasks/update/{id}`

**Request Body:**

```json
{
  "title": "Complete Dashboard - Updated",
  "description": "Build and style the main dashboard UI",
  "status": "IN_PROGRESS",
  "priority": "HIGH"
}
```

### 8. DELETE TASK

**DELETE** `/api/tasks/{id}`

---

## TEST WORKFLOW

### Step 1: Create Admin Account

```
POST http://localhost:8080/api/users/create
{
  "email": "admin@test.com",
  "password": "admin123",
  "fullName": "Admin User",
  "role": "ADMIN"
}
```

### Step 2: Create Regular User Account

```
POST http://localhost:8080/api/users/create
{
  "email": "user@test.com",
  "password": "user123",
  "fullName": "Regular User",
  "role": "USER"
}
```

### Step 3: Create a Task (Admin creates task for User)

```
POST http://localhost:8080/api/tasks/create
{
  "title": "Setup Database",
  "description": "Configure MySQL database connection",
  "priority": "HIGH",
  "assignedUserId": 2,
  "createdById": 1
}
```

### Step 4: Get User's Tasks

```
GET http://localhost:8080/api/tasks/user/2
```

### Step 5: Update Task Status

```
POST http://localhost:8080/api/tasks/update/1
{
  "title": "Setup Database",
  "description": "Configure MySQL database connection",
  "status": "IN_PROGRESS",
  "priority": "HIGH"
}
```

### Step 6: Verify in MySQL

```sql
-- Connect to taskflow_db
USE taskflow_db;

-- Check users
SELECT * FROM users;

-- Check tasks
SELECT * FROM tasks;

-- Get tasks assigned to a user
SELECT * FROM tasks WHERE assigned_user_id = 2;

-- Get tasks by status
SELECT * FROM tasks WHERE status = 'IN_PROGRESS';
```

---

## USING POSTMAN

1. **Create Collection**: TaskFlow API
2. **Add Requests**:
   - POST /api/users/create
   - GET /api/users/all
   - POST /api/tasks/create
   - GET /api/tasks/all
3. **Set Variables**: `{{base_url}}` = `http://localhost:8080`
4. **Test Each Endpoint**

---

## DATABASE VERIFICATION

The created users and tasks will be automatically stored in MySQL:

- Database: `taskflow_db`
- Tables: `users`, `tasks`
- Timestamps are automatically set

You can verify data in MySQL Workbench or command line.
