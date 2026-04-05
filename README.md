# Task Manager (Fullstack)

##  Features
- User Authentication (JWT Access + Refresh Token)
- Secure Password Hashing (bcrypt)
- Task CRUD Operations
- Search & Filter Tasks
- Pagination Support
- Responsive UI (Next.js + Tailwind)

##  Tech Stack
- Frontend: Next.js, TypeScript, Tailwind CSS
- Backend: Node.js, Express, TypeScript
- Database: PostgreSQL + Prisma ORM

##  API Endpoints

### Auth
- POST /auth/register
- POST /auth/login
- POST /auth/refresh
- POST /auth/logout

### Tasks
- GET /tasks (with search, filter, pagination)
- POST /tasks
- PATCH /tasks/:id
- DELETE /tasks/:id
- PATCH /tasks/:id/toggle


### 1. Clone repo
```bash
git clone <your-repo-link>
```

### 2. Backend setup
```bash
cd backend
npm install
npx prisma migrate dev
npm run dev
```
### 3. Frontend setup
```bash
cd frontend
npm install
npm run dev
```
