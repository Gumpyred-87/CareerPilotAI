# CareerPilot AI - System Architecture

## Overview

CareerPilot AI is a personal AI-powered job search and application platform built with a modern microservices architecture. The system consists of a Next.js frontend, FastAPI backend, PostgreSQL database, Redis for caching/queues, and a Chrome extension for browser automation.

---

## High-Level Architecture

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                           CAREERPILOT AI SYSTEM                              │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                              │
│  ┌──────────────┐     ┌──────────────┐     ┌──────────────┐                │
│  │   Frontend   │────▶│    Backend   │────▶│  Database    │                │
│  │  (Next.js)   │     │  (FastAPI)   │     │ (PostgreSQL) │                │
│  └──────────────┘     └──────┬───────┘     └──────────────┘                │
│                              │                                              │
│              ┌───────────────┼───────────────┐                             │
│              ▼               ▼               ▼                             │
│       ┌────────────┐ ┌────────────┐ ┌────────────┐                        │
│       │   Redis    │ │  Celery    │ │  Ollama/   │                        │
│       │  (Cache/   │ │  Workers   │ │  External  │                        │
│       │   Queue)   │ │            │ │   LLMs     │                        │
│       └────────────┘ └────────────┘ └────────────┘                        │
│                              │                                              │
│              ┌───────────────┴───────────────┐                             │
│              ▼                               ▼                             │
│       ┌────────────┐                 ┌────────────┐                        │
│       │  Chrome    │                 │  Job       │                        │
│       │  Extension │                 │  Sources   │                        │
│       │  (MV3)     │                 │  (APIs)    │                        │
│       └────────────┘                 └────────────┘                        │
│                                                                              │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## Component Details

### 1. Frontend (Next.js 14+ with App Router)

**Technology Stack:**
- Next.js 14+ (App Router)
- React 18+
- TypeScript 5+
- Tailwind CSS 3+
- Radix UI / shadcn/ui for components
- React Query (TanStack Query) for server state
- Zustand for client state
- Framer Motion for animations
- Chart.js / Recharts for analytics
- next-themes for dark/light mode

**Structure:**
```
frontend/
├── src/
│   ├── app/                    # App Router pages
│   │   ├── (dashboard)/        # Dashboard route group
│   │   │   ├── overview/
│   │   │   ├── ai-job-search/
│   │   │   ├── recommended-jobs/
│   │   │   ├── application-agent/
│   │   │   ├── resume-studio/
│   │   │   ├── cover-letter-studio/
│   │   │   ├── chrome-assistant/
│   │   │   ├── application-tracker/
│   │   │   ├── company-intelligence/
│   │   │   ├── referral-finder/
│   │   │   ├── interview-preparation/
│   │   │   ├── ai-career-coach/
│   │   │   ├── job-alerts/
│   │   │   ├── analytics/
│   │   │   └── settings/
│   │   ├── api/                # API routes (if needed)
│   │   ├── layout.tsx
│   │   ├── page.tsx
│   │   └── globals.css
│   ├── components/
│   │   ├── ui/                 # Base UI components
│   │   ├── layout/             # Layout components (Sidebar, Header)
│   │   ├── dashboard/          # Dashboard-specific components
│   │   ├── job-search/         # Job search components
│   │   ├── application/        # Application components
│   │   ├── resume/             # Resume components
│   │   ├── analytics/          # Analytics components
│   │   └── common/             # Shared components
│   ├── lib/
│   │   ├── api.ts              # API client
│   │   ├── auth.ts             # Authentication utilities
│   │   ├── utils.ts            # Utility functions
│   │   └── validations.ts      # Zod schemas
│   ├── hooks/                  # Custom React hooks
│   ├── stores/                 # Zustand stores
│   ├── types/                  # TypeScript types
│   └── styles/                 # Global styles
├── public/
├── package.json
├── tsconfig.json
├── tailwind.config.ts
├── next.config.js
└── Dockerfile
```

### 2. Backend (FastAPI)

**Technology Stack:**
- FastAPI 0.100+
- Python 3.10+
- SQLAlchemy 2.0+ (async)
- Alembic for migrations
- Pydantic v2 for validation
- Redis-py for caching
- Celery for background tasks
- Playwright for browser automation
- python-jose for JWT
- passlib for password hashing
- python-multipart for file uploads
- PyMuPDF / python-docx for resume parsing
- httpx for HTTP requests

**Structure:**
```
backend/
├── app/
│   ├── api/
│   │   ├── v1/
│   │   │   ├── endpoints/
│   │   │   │   ├── auth.py
│   │   │   │   ├── jobs.py
│   │   │   │   ├── applications.py
│   │   │   │   ├── resume.py
│   │   │   │   ├── cover_letter.py
│   │   │   │   ├── matching.py
│   │   │   │   ├── alerts.py
│   │   │   │   ├── interview.py
│   │   │   │   ├── referral.py
│   │   │   │   ├── analytics.py
│   │   │   │   ├── settings.py
│   │   │   │   └── chrome_extension.py
│   │   │   └── router.py
│   │   └── deps.py
│   ├── core/
│   │   ├── config.py
│   │   ├── security.py
│   │   ├── database.py
│   │   ├── redis.py
│   │   └── celery_app.py
│   ├── models/
│   │   ├── user.py
│   │   ├── job.py
│   │   ├── application.py
│   │   ├── resume.py
│   │   ├── cover_letter.py
│   │   ├── alert.py
│   │   ├── interview.py
│   │   ├── referral.py
│   │   └── base.py
│   ├── schemas/
│   │   ├── user.py
│   │   ├── job.py
│   │   ├── application.py
│   │   ├── resume.py
│   │   ├── cover_letter.py
│   │   ├── matching.py
│   │   ├── alert.py
│   │   ├── interview.py
│   │   ├── referral.py
│   │   └── analytics.py
│   ├── services/
│   │   ├── job_discovery.py
│   │   ├── job_matching.py
│   │   ├── resume_parser.py
│   │   ├── resume_tailor.py
│   │   ├── cover_letter_generator.py
│   │   ├── application_agent.py
│   │   ├── interview_prep.py
│   │   ├── referral_finder.py
│   │   ├── alert_service.py
│   │   ├── ai_provider.py
│   │   └── chrome_extension_service.py
│   ├── tasks/
│   │   ├── job_discovery_tasks.py
│   │   ├── alert_tasks.py
│   │   ├── application_tasks.py
│   │   └── maintenance_tasks.py
│   ├── utils/
│   │   ├── parsers.py
│   │   ├── validators.py
│   │   └── helpers.py
│   └── main.py
├── alembic/
├── tests/
├── requirements.txt
├── pyproject.toml
├── Dockerfile
└── .env.example
```

### 3. Database Schema (PostgreSQL)

**Core Tables:**

```sql
-- Users & Authentication
CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    email VARCHAR(255) UNIQUE NOT NULL,
    hashed_password VARCHAR(255) NOT NULL,
    full_name VARCHAR(255),
    is_active BOOLEAN DEFAULT true,
    is_superuser BOOLEAN DEFAULT false,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Candidate Profile
CREATE TABLE candidate_profiles (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    designation VARCHAR(255),
    years_experience INTEGER,
    technical_skills JSONB,
    target_countries JSONB,
    target_locations JSONB,
    employment_types JSONB,
    work_arrangements JSONB,
    salary_expectations JSONB,
    visa_requirements JSONB,
    languages JSONB,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Resumes
CREATE TABLE resumes (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    original_filename VARCHAR(255),
    original_file_path VARCHAR(500),
    parsed_content JSONB,
    structured_data JSONB,
    version INTEGER DEFAULT 1,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Resume Versions (tailored)
CREATE TABLE resume_versions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    resume_id UUID REFERENCES resumes(id) ON DELETE CASCADE,
    job_id UUID REFERENCES jobs(id) ON DELETE SET NULL,
    tailored_content JSONB,
    changes_summary JSONB,
    ats_score INTEGER,
    export_path VARCHAR(500),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Jobs
CREATE TABLE jobs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    external_id VARCHAR(255),
    source VARCHAR(100),
    source_url VARCHAR(500),
    title VARCHAR(500),
    company VARCHAR(255),
    company_domain VARCHAR(255),
    location VARCHAR(255),
    location_type VARCHAR(50), -- remote, hybrid, onsite
    country VARCHAR(100),
    description TEXT,
    requirements TEXT,
    responsibilities TEXT,
    salary_min INTEGER,
    salary_max INTEGER,
    salary_currency VARCHAR(10),
    salary_period VARCHAR(20), -- yearly, monthly, hourly
    employment_type VARCHAR(50), -- full-time, contract, contract-to-hire
    experience_level VARCHAR(50), -- entry, mid, senior, lead, principal
    visa_sponsorship BOOLEAN DEFAULT false,
    posted_date TIMESTAMP WITH TIME ZONE,
    closing_date TIMESTAMP WITH TIME ZONE,
    is_active BOOLEAN DEFAULT true,
    is_duplicate BOOLEAN DEFAULT false,
    duplicate_of_id UUID REFERENCES jobs(id),
    raw_data JSONB,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Job Matches
CREATE TABLE job_matches (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    job_id UUID REFERENCES jobs(id) ON DELETE CASCADE,
    overall_score INTEGER, -- 0-100
    skills_matched JSONB,
    skills_missing JSONB,
    experience_compatibility JSONB,
    location_compatibility JSONB,
    eligibility_warnings JSONB,
    reasons_to_apply JSONB,
    reasons_not_to_apply JSONB,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(user_id, job_id)
);

-- Applications
CREATE TABLE applications (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    job_id UUID REFERENCES jobs(id) ON DELETE CASCADE,
    resume_version_id UUID REFERENCES resume_versions(id),
    cover_letter_id UUID REFERENCES cover_letters(id),
    status VARCHAR(50) DEFAULT 'discovered', -- discovered, shortlisted, resume_prepared, ready_for_review, awaiting_approval, submitted, confirmation_received, interview, rejected, withdrawn, offer
    application_url VARCHAR(500),
    application_reference VARCHAR(255),
    submitted_at TIMESTAMP WITH TIME ZONE,
    confirmed_at TIMESTAMP WITH TIME ZONE,
    interview_date TIMESTAMP WITH TIME ZONE,
    recruiter_name VARCHAR(255),
    recruiter_email VARCHAR(255),
    recruiter_linkedin VARCHAR(500),
    notes TEXT,
    follow_up_date TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Cover Letters
CREATE TABLE cover_letters (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    job_id UUID REFERENCES jobs(id) ON DELETE CASCADE,
    professional_version TEXT,
    concise_version TEXT,
    personalized_version TEXT,
    selected_version VARCHAR(50),
    generated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    export_path VARCHAR(500)
);

-- Job Alerts
CREATE TABLE job_alerts (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    name VARCHAR(255),
    search_criteria JSONB,
    min_match_score INTEGER DEFAULT 70,
    frequency VARCHAR(50), -- immediate, daily, weekly
    notification_channels JSONB, -- dashboard, email, browser
    is_active BOOLEAN DEFAULT true,
    last_run_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Interview Preparation
CREATE TABLE interview_sessions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    job_id UUID REFERENCES jobs(id) ON DELETE SET NULL,
    session_type VARCHAR(50), -- technical, hr, scenario, simulation
    questions JSONB,
    answers JSONB,
    evaluation JSONB,
    weak_areas JSONB,
    improvement_plan JSONB,
    score INTEGER,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Referrals
CREATE TABLE referrals (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    company VARCHAR(255),
    contact_name VARCHAR(255),
    contact_title VARCHAR(255),
    contact_profile_url VARCHAR(500),
    contact_source VARCHAR(100),
    relevance_score INTEGER,
    suggested_message TEXT,
    status VARCHAR(50) DEFAULT 'identified', -- identified, contacted, responded, referred
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- AI Providers Configuration
CREATE TABLE ai_providers (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    provider_type VARCHAR(50), -- ollama, openai, gemini, anthropic
    model_name VARCHAR(255),
    api_key_encrypted TEXT,
    base_url VARCHAR(500),
    is_default BOOLEAN DEFAULT false,
    use_for JSONB, -- job_matching, resume_analysis, cover_letter, screening, interview
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Audit Logs
CREATE TABLE audit_logs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(id) ON DELETE SET NULL,
    action VARCHAR(100),
    resource_type VARCHAR(50),
    resource_id UUID,
    details JSONB,
    ip_address INET,
    user_agent TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Indexes
CREATE INDEX idx_jobs_source ON jobs(source);
CREATE INDEX idx_jobs_active ON jobs(is_active) WHERE is_active = true;
CREATE INDEX idx_jobs_location ON jobs(location);
CREATE INDEX idx_jobs_posted_date ON jobs(posted_date DESC);
CREATE INDEX idx_job_matches_user ON job_matches(user_id);
CREATE INDEX idx_job_matches_score ON job_matches(overall_score DESC);
CREATE INDEX idx_applications_user ON applications(user_id);
CREATE INDEX idx_applications_status ON applications(status);
CREATE INDEX idx_applications_job ON applications(job_id);
CREATE INDEX idx_alerts_user ON job_alerts(user_id);
```

### 4. Chrome Extension (Manifest V3)

**Structure:**
```
chrome-extension/
├── src/
│   ├── background/
│   │   ├── service-worker.ts
│   │   ├── api-client.ts
│   │   └── message-handler.ts
│   ├── content/
│   │   ├── content-script.ts
│   │   ├── adapters/
│   │   │   ├── greenhouse.ts
│   │   │   ├── lever.ts
│   │   │   ├── workday.ts
│   │   │   ├── ashby.ts
│   │   │   ├── smartrecruiters.ts
│   │   │   └── base-adapter.ts
│   │   ├── form-detector.ts
│   │   ├── field-mapper.ts
│   │   └── autofill-engine.ts
│   ├── popup/
│   │   ├── popup.html
│   │   ├── popup.ts
│   │   └── popup.css
│   ├── options/
│   │   ├── options.html
│   │   ├── options.ts
│   │   └── options.css
│   ├── shared/
│   │   ├── types.ts
│   │   ├── utils.ts
│   │   └── constants.ts
│   └── styles/
├── manifest.json
├── package.json
├── tsconfig.json
├── webpack.config.js
└── Dockerfile
```

### 5. Background Processing (Celery + Redis)

**Task Categories:**

| Queue | Tasks | Schedule |
|-------|-------|----------|
| job_discovery | Fetch jobs from all sources | Every 30 min (configurable) |
| job_matching | Match new jobs against profile | After job discovery |
| alerts | Check alerts, send notifications | Every 15 min |
| applications | Process application queue | Continuous |
| maintenance | Cleanup, deduplication, health checks | Daily at 3 AM |
| interview_prep | Generate interview questions | On demand |

### 6. AI Provider Management

**Supported Providers:**
- Ollama (local) - Privacy-first, free
- OpenAI API (GPT-4, GPT-3.5-turbo)
- Anthropic API (Claude)
- Google Gemini API
- Custom OpenAI-compatible endpoints

**Model Assignment:**
```python
AI_TASK_MODELS = {
    "job_matching": "llama3.1:70b",           # Complex reasoning
    "resume_analysis": "llama3.1:8b",          # Fast parsing
    "resume_tailoring": "llama3.1:70b",        # Quality rewriting
    "cover_letter": "llama3.1:70b",            # Creative writing
    "screening_answers": "llama3.1:8b",        # Quick responses
    "interview_prep": "llama3.1:70b",          # Deep knowledge
    "career_coach": "llama3.1:70b",            # Conversational
}
```

---

## Data Flow

### Job Discovery Flow
```
1. Celery Beat triggers job_discovery task
2. JobDiscoveryService fetches from each configured source
3. Raw jobs normalized to common schema
4. Deduplication check against existing jobs
5. Valid jobs saved to database
6. JobMatchingService triggered for new jobs
7. Match scores calculated and stored
8. AlertService checks for matching alerts
9. Notifications sent via configured channels
```

### Application Flow
```
1. User reviews matched job in dashboard
2. Clicks "Prepare Application"
3. ResumeTailorService creates tailored resume
4. CoverLetterGenerator creates cover letter
5. ScreeningAnswerService prepares answers
6. Application queued with status "ready_for_review"
7. User reviews complete application package
8. User clicks "Submit" → status "awaiting_approval"
9. Chrome Extension opens application page
10. User reviews autofilled form
11. User confirms submission
12. Extension submits (where permitted) or guides manual submit
13. Application status updated to "submitted"
14. Confirmation tracked
```

### Chrome Extension Flow
```
1. User navigates to job application page
2. Content script detects supported ATS (Greenhouse, Lever, etc.)
3. Extracts job title, company, description
4. Sends to backend for matching/preparation
5. Backend returns candidate data + tailored docs
6. Extension maps fields to candidate profile
7. Autofills supported fields
8. Shows missing required fields
9. User reviews and submits
10. Status synced to dashboard
```

---

## Security Architecture

### Authentication
- JWT access tokens (15 min expiry)
- Refresh tokens (7 day expiry, rotating)
- HttpOnly secure cookies for token storage
- CSRF protection on state-changing operations

### Data Protection
- AES-256 encryption for API keys at rest
- bcrypt for password hashing (12 rounds)
- Row-level security on all user data
- Audit logging for all sensitive operations

### API Security
- Rate limiting (100 req/min default)
- Input validation with Pydantic
- SQL injection prevention via ORM
- CORS configured for frontend origin only
- Security headers (Helmet equivalent)

### Chrome Extension Security
- No credential storage in extension
- Secure messaging with backend via HTTPS
- Minimal permissions (activeTab, storage, host_permissions for job sites)
- Content Security Policy enforced

---

## Deployment Architecture

### Development
```
docker-compose.yml
├── frontend (Next.js dev server)
├── backend (FastAPI with uvicorn --reload)
├── postgres (PostgreSQL 16)
├── redis (Redis 7)
├── celery-worker (background tasks)
├── celery-beat (scheduler)
└── ollama (local LLM)
```

### Production (Single Server)
```
┌─────────────────────────────────────────┐
│           Reverse Proxy (Nginx)         │
│  ├── / → Frontend (Next.js standalone)  │
│  ├── /api → Backend (FastAPI + Gunicorn)│
│  └── /ws → WebSocket (if needed)        │
├─────────────────────────────────────────┤
│  Backend Workers (systemd services)     │
│  ├── celery-worker@1                    │
│  ├── celery-worker@2                    │
│  └── celery-beat                        │
├─────────────────────────────────────────┤
│  Data Layer                             │
│  ├── PostgreSQL (local or managed)      │
│  └── Redis (local or managed)           │
├─────────────────────────────────────────┤
│  AI Layer                               │
│  └── Ollama (local GPU) or External APIs│
└─────────────────────────────────────────┘
```

---

## Configuration Management

### Environment Variables

**Backend (.env):**
```env
# Application
APP_NAME=CareerPilot AI
APP_ENV=development
DEBUG=true
SECRET_KEY=your-secret-key-min-32-chars
ALGORITHM=HS256
ACCESS_TOKEN_EXPIRE_MINUTES=15
REFRESH_TOKEN_EXPIRE_DAYS=7

# Database
DATABASE_URL=postgresql+asyncpg://user:pass@localhost:5432/careerpilot
DATABASE_POOL_SIZE=10
DATABASE_MAX_OVERFLOW=20

# Redis
REDIS_URL=redis://localhost:6379/0
CELERY_BROKER_URL=redis://localhost:6379/1
CELERY_RESULT_BACKEND=redis://localhost:6379/2

# Frontend
FRONTEND_URL=http://localhost:3000

# AI Providers
OLLAMA_BASE_URL=http://localhost:11434
OPENAI_API_KEY=
ANTHROPIC_API_KEY=
GEMINI_API_KEY=

# Job Sources
ADZUNA_APP_ID=
ADZUNA_API_KEY=
GITHUB_TOKEN=  # For some APIs

# Encryption
ENCRYPTION_KEY=your-32-char-encryption-key

# Email (for alerts)
SMTP_HOST=
SMTP_PORT=
SMTP_USER=
SMTP_PASSWORD=
EMAIL_FROM=
```

**Frontend (.env.local):**
```env
NEXT_PUBLIC_API_URL=http://localhost:8000
NEXT_PUBLIC_WS_URL=ws://localhost:8000
NEXT_PUBLIC_APP_NAME=CareerPilot AI
```

---

## Monitoring & Observability

### Health Checks
- `/health` - Basic liveness
- `/health/ready` - Readiness (DB, Redis, AI)
- `/health/deep` - Full dependency check

### Metrics (Prometheus)
- Request latency (p50, p95, p99)
- Error rates by endpoint
- Queue depths
- Job discovery success/failure
- Application submission rates
- AI provider latency/cost

### Logging
- Structured JSON logs
- Request ID correlation
- Error tracking (Sentry compatible)
- Audit trail for compliance

---

## Scalability Considerations

### Horizontal Scaling
- Stateless backend → multiple replicas
- Celery workers → scale by queue
- Read replicas for PostgreSQL
- Redis Cluster for caching

### Performance Optimization
- Database connection pooling
- Redis caching for frequent queries
- Background job processing
- CDN for static assets
- Database indexes on query patterns

---

## Disaster Recovery

### Backup Strategy
- PostgreSQL: Daily logical backup (pg_dump), WAL archiving
- Redis: RDB snapshots every 60 min
- Application config: Version controlled
- User uploads: Object storage with versioning

### Recovery Procedures
1. Restore PostgreSQL from latest backup
2. Replay WAL logs to target timestamp
3. Restore Redis from RDB
4. Restart services
5. Verify data integrity

---

## Development Workflow

### Git Strategy
- `main` - Production ready
- `develop` - Integration branch
- `feature/*` - Feature branches
- `hotfix/*` - Emergency fixes

### CI/CD Pipeline
1. Lint & type check
2. Unit tests
3. Integration tests
4. Build Docker images
5. Deploy to staging
6. E2E tests
7. Deploy to production

---

## Future Extensibility

### Plugin Architecture
- Job source plugins
- ATS adapter plugins
- AI provider plugins
- Notification channel plugins
- Export format plugins

### API Versioning
- URL versioning (/api/v1/, /api/v2/)
- Deprecation policy: 6 months
- Backward compatibility guaranteed

---

*Document Version: 1.0*
*Last Updated: 2026-11-26*
*Next Review: After Phase 1 completion*