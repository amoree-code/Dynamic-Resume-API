# Dynamic Portfolio API — Implementation Plan

## Stack
| Layer | Technology |
|-------|-----------|
| Framework | NestJS (TypeScript) |
| ORM | Prisma |
| Database | PostgreSQL |
| Auth | JWT (access + refresh tokens) |
| Validation | class-validator + class-transformer |
| Docs | Swagger / OpenAPI |

---

## Project Structure

```
dynamic-portfolio-api/
├── prisma/
│   ├── schema.prisma          # Database schema
│   └── migrations/            # Auto-generated migrations
├── src/
│   ├── main.ts                # App entry point (Swagger setup)
│   ├── app.module.ts
│   ├── prisma/
│   │   ├── prisma.module.ts
│   │   └── prisma.service.ts  # Prisma client wrapper
│   ├── auth/
│   │   ├── auth.module.ts
│   │   ├── auth.controller.ts
│   │   ├── auth.service.ts
│   │   ├── strategies/
│   │   │   ├── jwt.strategy.ts
│   │   │   └── jwt-refresh.strategy.ts
│   │   ├── guards/
│   │   │   └── jwt-auth.guard.ts
│   │   └── dto/
│   │       ├── register.dto.ts
│   │       └── login.dto.ts
│   ├── users/
│   │   ├── users.module.ts
│   │   ├── users.controller.ts
│   │   ├── users.service.ts
│   │   └── dto/
│   │       └── update-user.dto.ts
│   ├── projects/
│   │   ├── projects.module.ts
│   │   ├── projects.controller.ts
│   │   ├── projects.service.ts
│   │   └── dto/
│   │       ├── create-project.dto.ts
│   │       └── update-project.dto.ts
│   ├── skills/
│   │   ├── skills.module.ts
│   │   ├── skills.controller.ts
│   │   ├── skills.service.ts
│   │   └── dto/
│   │       ├── create-skill.dto.ts
│   │       └── update-skill.dto.ts
│   ├── experience/
│   │   ├── experience.module.ts
│   │   ├── experience.controller.ts
│   │   ├── experience.service.ts
│   │   └── dto/
│   │       ├── create-experience.dto.ts
│   │       └── update-experience.dto.ts
│   ├── education/
│   │   ├── education.module.ts
│   │   ├── education.controller.ts
│   │   ├── education.service.ts
│   │   └── dto/
│   │       ├── create-education.dto.ts
│   │       └── update-education.dto.ts
│   └── contact/
│       ├── contact.module.ts
│       ├── contact.controller.ts
│       ├── contact.service.ts
│       └── dto/
│           └── create-contact.dto.ts
├── .env                       # Environment variables
├── .env.example
└── package.json
```

---

## Database Schema (Prisma)

### Models Overview

```
User            — Portfolio owner (admin account)
Project         — Portfolio projects
Skill           — Technical skills (grouped by category)
Experience      — Work experience / jobs
Education       — Academic background
Contact         — Contact form submissions (from visitors)
```

### Full Schema

```prisma
model User {
  id           Int          @id @default(autoincrement())
  email        String       @unique
  password     String       // bcrypt hashed
  name         String
  bio          String?
  avatar       String?      // URL
  location     String?
  website      String?
  github       String?
  linkedin     String?
  twitter      String?
  refreshToken String?
  createdAt    DateTime     @default(now())
  updatedAt    DateTime     @updatedAt
  projects     Project[]
  skills       Skill[]
  experiences  Experience[]
  educations   Education[]
}

model Project {
  id          Int       @id @default(autoincrement())
  title       String
  description String
  longDesc    String?
  techStack   String[]  // array of tech names
  liveUrl     String?
  repoUrl     String?
  imageUrl    String?
  featured    Boolean   @default(false)
  order       Int       @default(0)
  createdAt   DateTime  @default(now())
  updatedAt   DateTime  @updatedAt
  userId      Int
  user        User      @relation(fields: [userId], references: [id], onDelete: Cascade)
}

model Skill {
  id        Int       @id @default(autoincrement())
  name      String
  category  String    // e.g. "Frontend", "Backend", "DevOps"
  level     Int       // 1–100 proficiency
  iconUrl   String?
  order     Int       @default(0)
  createdAt DateTime  @default(now())
  updatedAt DateTime  @updatedAt
  userId    Int
  user      User      @relation(fields: [userId], references: [id], onDelete: Cascade)
}

model Experience {
  id          Int       @id @default(autoincrement())
  company     String
  role        String
  description String?
  startDate   DateTime
  endDate     DateTime? // null = current job
  current     Boolean   @default(false)
  location    String?
  order       Int       @default(0)
  createdAt   DateTime  @default(now())
  updatedAt   DateTime  @updatedAt
  userId      Int
  user        User      @relation(fields: [userId], references: [id], onDelete: Cascade)
}

model Education {
  id          Int       @id @default(autoincrement())
  institution String
  degree      String
  field       String
  startDate   DateTime
  endDate     DateTime?
  current     Boolean   @default(false)
  gpa         String?
  order       Int       @default(0)
  createdAt   DateTime  @default(now())
  updatedAt   DateTime  @updatedAt
  userId      Int
  user        User      @relation(fields: [userId], references: [id], onDelete: Cascade)
}

model Contact {
  id        Int       @id @default(autoincrement())
  name      String
  email     String
  subject   String?
  message   String
  read      Boolean   @default(false)
  createdAt DateTime  @default(now())
  userId    Int
  user      User      @relation(fields: [userId], references: [id], onDelete: Cascade)
}
```

---

## API Endpoints

### Auth
| Method | Endpoint              | Auth | Description              |
|--------|-----------------------|------|--------------------------|
| POST   | /auth/register        | ❌   | Register portfolio owner |
| POST   | /auth/login           | ❌   | Login, get tokens        |
| POST   | /auth/refresh         | ❌   | Refresh access token     |
| POST   | /auth/logout          | ✅   | Revoke refresh token     |

### User (Profile)
| Method | Endpoint   | Auth | Description           |
|--------|------------|------|-----------------------|
| GET    | /users/me  | ✅   | Get own profile       |
| PATCH  | /users/me  | ✅   | Update own profile    |
| GET    | /users/:id | ❌   | Public portfolio view |

### Projects
| Method | Endpoint          | Auth | Description      |
|--------|-------------------|------|------------------|
| GET    | /projects         | ❌   | List all projects |
| GET    | /projects/:id     | ❌   | Get project      |
| POST   | /projects         | ✅   | Create project   |
| PATCH  | /projects/:id     | ✅   | Update project   |
| DELETE | /projects/:id     | ✅   | Delete project   |

### Skills
| Method | Endpoint       | Auth | Description   |
|--------|----------------|------|---------------|
| GET    | /skills        | ❌   | List skills   |
| GET    | /skills/:id    | ❌   | Get skill     |
| POST   | /skills        | ✅   | Create skill  |
| PATCH  | /skills/:id    | ✅   | Update skill  |
| DELETE | /skills/:id    | ✅   | Delete skill  |

### Experience
| Method | Endpoint           | Auth | Description        |
|--------|--------------------|------|--------------------|
| GET    | /experience        | ❌   | List experiences   |
| GET    | /experience/:id    | ❌   | Get experience     |
| POST   | /experience        | ✅   | Create experience  |
| PATCH  | /experience/:id    | ✅   | Update experience  |
| DELETE | /experience/:id    | ✅   | Delete experience  |

### Education
| Method | Endpoint         | Auth | Description       |
|--------|------------------|------|-------------------|
| GET    | /education       | ❌   | List education    |
| GET    | /education/:id   | ❌   | Get education     |
| POST   | /education       | ✅   | Create education  |
| PATCH  | /education/:id   | ✅   | Update education  |
| DELETE | /education/:id   | ✅   | Delete education  |

### Contact
| Method | Endpoint          | Auth | Description             |
|--------|-------------------|------|-------------------------|
| POST   | /contact          | ❌   | Submit contact form     |
| GET    | /contact          | ✅   | View all messages       |
| PATCH  | /contact/:id/read | ✅   | Mark message as read    |
| DELETE | /contact/:id      | ✅   | Delete message          |

---

## Auth Flow

```
Register  →  POST /auth/register
              └─ hash password (bcrypt)
              └─ return { accessToken, refreshToken }

Login     →  POST /auth/login
              └─ validate credentials
              └─ sign JWT access token  (15 min)
              └─ sign JWT refresh token (7 days, stored hashed in DB)
              └─ return { accessToken, refreshToken }

Protected →  Bearer <accessToken> in Authorization header

Refresh   →  POST /auth/refresh
              └─ verify refreshToken against DB hash
              └─ issue new accessToken

Logout    →  POST /auth/logout
              └─ set refreshToken = null in DB
```

---

## Environment Variables (.env)

```env
DATABASE_URL="postgresql://USER:PASSWORD@localhost:5432/portfolio_db"

JWT_ACCESS_SECRET="your-access-secret"
JWT_ACCESS_EXPIRES_IN="15m"

JWT_REFRESH_SECRET="your-refresh-secret"
JWT_REFRESH_EXPIRES_IN="7d"

PORT=3000
```

---

## Implementation Steps

1. **Scaffold** — `nest new dynamic-portfolio-api`
2. **Install deps** — Prisma, JWT, bcrypt, Swagger, class-validator
3. **Prisma setup** — `prisma init`, write schema, run first migration
4. **PrismaService** — global module wrapping `PrismaClient`
5. **Auth module** — register, login, JWT strategy, refresh strategy, guards
6. **Users module** — profile CRUD, public portfolio endpoint
7. **Projects module** — full CRUD, ownership check
8. **Skills module** — full CRUD, ownership check
9. **Experience module** — full CRUD, ownership check
10. **Education module** — full CRUD, ownership check
11. **Contact module** — public submit, protected read/delete
12. **Swagger** — decorate all DTOs and controllers
13. **Validation pipe** — global `ValidationPipe` in `main.ts`

---

## Key Dependencies

```json
{
  "@nestjs/common": "^10",
  "@nestjs/core": "^10",
  "@nestjs/jwt": "^10",
  "@nestjs/passport": "^10",
  "@nestjs/swagger": "^7",
  "@prisma/client": "^5",
  "bcrypt": "^5",
  "class-transformer": "^0.5",
  "class-validator": "^0.14",
  "passport": "^0.7",
  "passport-jwt": "^4",
  "prisma": "^5"
}
```

---

> Once you approve this plan, I will scaffold the full project with all files.
