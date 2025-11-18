# 📊 Database Schema Diagram

## Entity Relationship Diagram (ERD)

```
┌─────────────────────────────────────────────┐
│                   USERS                      │
│─────────────────────────────────────────────│
│ 🔑 id           : UUID (PK)                  │
│ 📧 email        : TEXT (UNIQUE, NOT NULL)    │
│ 👤 name         : TEXT (NOT NULL)            │
│ 🎭 role         : TEXT (student/mentor)      │
│ ✅ status       : TEXT (pending/approved)    │
│ 📱 phone        : TEXT (nullable)            │
│ 📅 created_at   : TIMESTAMPTZ                │
│ 🔄 updated_at   : TIMESTAMPTZ                │
└─────────────────────────────────────────────┘
         │                          │
         │                          │
         ▼                          ▼
┌─────────────────────┐    ┌─────────────────────┐
│     STUDENTS        │    │      MENTORS        │
│─────────────────────│    │─────────────────────│
│ 🔑 id               │    │ 🔑 id               │
│ 🔗 user_id (FK)     │    │ 🔗 user_id (FK)     │
│ 👨 parent_name      │    │ 👤 mentor_name      │
│ 📧 parent_email     │    │ 📧 mentor_email     │
│ 📱 phone            │    │ 📱 mentor_phone     │
│ 👶 child_name       │    │ 💼 expertise        │
│ 🎂 child_age (5-13) │    │ 📚 experience       │
│ 📚 class_name       │    │ 📜 certificates[]   │
│ 📅 created_at       │    │ 📅 created_at       │
└─────────────────────┘    └─────────────────────┘
```

## Table Relationships

### 1. users → students (One-to-One)
- **Relationship**: Satu user dengan role 'student' memiliki satu student profile
- **Foreign Key**: `students.user_id` → `users.id`
- **Cascade**: ON DELETE CASCADE (hapus student profile jika user dihapus)

### 2. users → mentors (One-to-One)
- **Relationship**: Satu user dengan role 'mentor' memiliki satu mentor profile
- **Foreign Key**: `mentors.user_id` → `users.id`
- **Cascade**: ON DELETE CASCADE (hapus mentor profile jika user dihapus)

## Storage Buckets

```
📦 STORAGE
└── 📁 certificates/ (public bucket)
    ├── mentor1_cert1.pdf
    ├── mentor1_cert2.pdf
    └── mentor2_cert1.jpg
```

## Field Details

### Users Table

| Field | Type | Constraints | Description |
|-------|------|-------------|-------------|
| `id` | UUID | PRIMARY KEY, DEFAULT uuid_generate_v4() | Unique identifier |
| `email` | TEXT | UNIQUE, NOT NULL | User email (login) |
| `name` | TEXT | NOT NULL | Full name |
| `role` | TEXT | CHECK IN ('student', 'mentor') | User role |
| `status` | TEXT | DEFAULT 'pending', CHECK IN ('pending', 'approved', 'rejected') | Approval status |
| `phone` | TEXT | nullable | Contact number |
| `created_at` | TIMESTAMPTZ | DEFAULT NOW() | Registration date |
| `updated_at` | TIMESTAMPTZ | DEFAULT NOW(), auto-updated | Last update |

### Students Table

| Field | Type | Constraints | Description |
|-------|------|-------------|-------------|
| `id` | UUID | PRIMARY KEY | Unique identifier |
| `user_id` | UUID | FK → users.id, NOT NULL | Reference to users |
| `parent_name` | TEXT | NOT NULL | Parent/guardian name |
| `parent_email` | TEXT | NOT NULL | Parent email |
| `phone` | TEXT | NOT NULL | Contact number |
| `child_name` | TEXT | NOT NULL | Student name |
| `child_age` | INTEGER | CHECK (5-13), NOT NULL | Student age |
| `class_name` | TEXT | NOT NULL | Class selection |
| `created_at` | TIMESTAMPTZ | DEFAULT NOW() | Profile creation |

### Mentors Table

| Field | Type | Constraints | Description |
|-------|------|-------------|-------------|
| `id` | UUID | PRIMARY KEY | Unique identifier |
| `user_id` | UUID | FK → users.id, NOT NULL | Reference to users |
| `mentor_name` | TEXT | NOT NULL | Mentor full name |
| `mentor_email` | TEXT | NOT NULL | Mentor email |
| `mentor_phone` | TEXT | NOT NULL | Contact number |
| `expertise` | TEXT | NOT NULL | Area of expertise |
| `experience` | TEXT | NOT NULL | Work experience |
| `certificates` | TEXT[] | Array, nullable | Certificate URLs |
| `created_at` | TIMESTAMPTZ | DEFAULT NOW() | Profile creation |

## Indexes

### Users
- `idx_users_email` ON `email` - Fast email lookup untuk login
- `idx_users_status` ON `status` - Filter by approval status
- `idx_users_role` ON `role` - Filter by user role

### Students
- `idx_students_user_id` ON `user_id` - Fast join dengan users table

### Mentors
- `idx_mentors_user_id` ON `user_id` - Fast join dengan users table

## Row Level Security (RLS) Policies

### Users Table

| Policy Name | Operation | Rule |
|-------------|-----------|------|
| Anyone can register | INSERT | true (semua bisa register) |
| Users can view own data | SELECT | auth.uid() = id |
| Admins can view all users | SELECT | user has role 'admin' |
| Admins can update users | UPDATE | user has role 'admin' |

### Students Table

| Policy Name | Operation | Rule |
|-------------|-----------|------|
| Anyone can register as student | INSERT | true |
| Students can view own data | SELECT | user_id matches auth user |
| Admins can view all students | SELECT | user has role 'admin' |

### Mentors Table

| Policy Name | Operation | Rule |
|-------------|-----------|------|
| Anyone can register as mentor | INSERT | true |
| Mentors can view own data | SELECT | user_id matches auth user |
| Admins can view all mentors | SELECT | user has role 'admin' |

## Database Functions

### `update_updated_at_column()`
- **Type**: Trigger Function
- **Purpose**: Automatically update `updated_at` field
- **Trigger**: BEFORE UPDATE on users table

## Workflow Diagram

```
┌──────────────┐
│  Registration │
└───────┬──────┘
        │
        ▼
┌──────────────────┐
│   Create User    │
│  (status=pending)│
└───────┬──────────┘
        │
        ├─────────────┬─────────────┐
        │             │             │
        ▼             ▼             ▼
┌────────────┐  ┌──────────┐  ┌──────────┐
│   Student  │  │  Mentor  │  │  Admin   │
│   Profile  │  │  Profile │  │  Review  │
└────────────┘  └──────────┘  └────┬─────┘
                                    │
                    ┌───────────────┼───────────────┐
                    │               │               │
                    ▼               ▼               ▼
              ┌──────────┐    ┌─────────┐    ┌─────────┐
              │ Approved │    │ Pending │    │Rejected │
              └──────────┘    └─────────┘    └─────────┘
```

## Sample Queries

### Get all pending registrations
```sql
SELECT u.*, s.child_name, s.class_name
FROM users u
LEFT JOIN students s ON u.id = s.user_id
WHERE u.status = 'pending' AND u.role = 'student';
```

### Get mentor with certificates
```sql
SELECT u.name, m.expertise, m.experience, m.certificates
FROM users u
JOIN mentors m ON u.id = m.user_id
WHERE u.status = 'approved' AND u.role = 'mentor';
```

### Count registrations by status
```sql
SELECT status, COUNT(*) as total
FROM users
GROUP BY status;
```
