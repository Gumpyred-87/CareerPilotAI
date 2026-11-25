# CareerPilot AI

Personal AI Job Search & Application Agent - A production-quality platform for automated job discovery, intelligent matching, resume tailoring, and application management.

## 🚀 Features

- **AI Job Discovery** - Search across multiple sources (Adzuna, Remotive, Greenhouse, Lever, Ashby, SmartRecruiters, company career pages)
- **Intelligent Matching** - Explainable scoring (0-100) with skills breakdown, experience compatibility, location matching
- **Resume Studio** - Upload, parse, and tailor resumes with ATS optimization
- **Cover Letter Generator** - Professional, concise, and personalized versions
- **Application Agent** - End-to-end application preparation with approval workflow
- **Chrome Extension** - Manifest V3 extension for autofill on Greenhouse, Lever, Workday, Ashby, SmartRecruiters
- **Application Tracker** - Kanban board with 11 statuses, analytics dashboard
- **AI Career Coach** - Conversational assistant for career guidance
- **Interview Preparation** - Technical, HR, scenario questions with simulation mode
- **Job Alerts** - Real-time, daily, weekly notifications via dashboard, browser, email
- **Referral Finder** - Professional contact discovery with personalized outreach messages
- **Company Intelligence** - Hiring patterns, tech stack, culture insights
- **24/7 Operation** - Background workers with Celery, automatic recovery

## 🏗 Architecture

```
Frontend: Next.js 14 + React 18 + TypeScript + Tailwind CSS
Backend:  FastAPI + Python 3.10 + SQLAlchemy 2.0 + PostgreSQL
Queue:    Redis + Celery (workers + beat scheduler)
AI:       Ollama (local) + OpenAI/Anthropic/Gemini (cloud fallback)
Browser:  Playwright + Chrome Extension Manifest V3
Deploy:   Docker + Docker Compose
```

## 📋 Prerequisites

- **Node.js** 20+ (for frontend)
- **Python** 3.10+ (for backend)
- **Docker Desktop** (for containerized deployment)
- **PostgreSQL** 16+ (or use Docker)
- **Redis** 7+ (or use Docker)
- **Ollama** (for local AI models) - optional but recommended

## 🛠 Quick Start (Docker - Recommended)

### 1. Clone and Configure

```bash
# Navigate to project directory
cd careerpilot-ai

# Copy environment files
cp backend/.env.example backend/.env
cp frontend/.env.example frontend/.env.local

# Edit backend/.env with your settings
# Minimum required: SECRET_KEY, ENCRYPTION_KEY, DATABASE_URL, REDIS_URL
```

### 2. Generate Secrets

```bash
# Generate SECRET_KEY (32+ chars)
openssl rand -base64 32

# Generate ENCRYPTION_KEY (32 chars)
openssl rand -base64 32 | head -c 32
```

### 3. Start Services

```bash
# Start all services
docker-compose up -d

# View logs
docker-compose logs -f

# Check status
docker-compose ps
```

### 4. Access Application

- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:8000
- **API Docs**: http://localhost:8000/docs
- **Ollama**: http://localhost:11434

### 5. Pull AI Models (Optional)

```bash
# Pull recommended models
docker exec -it careerpilot-ollama ollama pull llama3.1:70b
docker exec -it careerpilot-ollama ollama pull llama3.1:8b
```

## 💻 Local Development (Without Docker)

### Backend Setup

```bash
cd backend

# Create virtual environment
python -m venv venv
source venv/bin/activate  # Windows: venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt

# Set up environment
cp .env.example .env
# Edit .env with your settings

# Run database migrations
alembic upgrade head

# Start backend
uvicorn app.main:app --reload --port 8000
```

### Frontend Setup

```bash
cd frontend

# Install dependencies
npm install

# Set up environment
cp .env.example .env.local
# Edit .env.local if needed

# Start development server
npm run dev
```

### Start Background Workers

```bash
# Terminal 1: Celery worker
cd backend
celery -A app.core.celery_app worker --loglevel=info --concurrency=4

# Terminal 2: Celery beat (scheduler)
cd backend
celery -A app.core.celery_app beat --loglevel=info
```

## 🔧 Configuration

### Backend Environment Variables

| Variable | Required | Description |
|----------|----------|-------------|
| `SECRET_KEY` | Yes | JWT signing key (32+ chars) |
| `ENCRYPTION_KEY` | Yes | AES encryption key (32 chars) |
| `DATABASE_URL` | Yes | PostgreSQL async connection string |
| `REDIS_URL` | Yes | Redis connection string |
| `OLLAMA_BASE_URL` | No | Local Ollama URL (default: http://localhost:11434) |
| `OPENAI_API_KEY` | No | OpenAI API key for cloud fallback |
| `ANTHROPIC_API_KEY` | No | Anthropic API key |
| `GEMINI_API_KEY` | No | Google Gemini API key |
| `ADZUNA_APP_ID` | No | Adzuna API credentials |
| `ADZUNA_API_KEY` | No | Adzuna API credentials |
| `SMTP_*` | No | Email configuration for alerts |

### Frontend Environment Variables

| Variable | Required | Description |
|----------|----------|-------------|
| `NEXT_PUBLIC_API_URL` | Yes | Backend API URL |
| `NEXT_PUBLIC_WS_URL` | No | WebSocket URL for real-time updates |

## 🧪 Testing

```bash
# Backend tests
cd backend
pytest -v --cov=app

# Frontend tests
cd frontend
npm test

# E2E tests
cd frontend
npm run test:e2e
```

## 📦 Project Structure

```
careerpilot-ai/
├── frontend/                 # Next.js application
│   ├── src/
│   │   ├── app/             # App Router pages
│   │   │   └── dashboard/   # Dashboard pages (15 sections)
│   │   ├── components/      # React components
│   │   │   ├── ui/          # Base UI components
│   │   │   └── layout/      # Layout components
│   │   ├── lib/             # Utilities, API client
│   │   ├── hooks/           # Custom React hooks
│   │   ├── stores/          # Zustand stores
│   │   └── types/           # TypeScript types
│   └── package.json
│
├── backend/                  # FastAPI application
│   ├── app/
│   │   ├── api/v1/          # API endpoints
│   │   ├── core/            # Config, DB, Redis, Celery, Security
│   │   ├── models/          # SQLAlchemy models
│   │   ├── schemas/         # Pydantic schemas
│   │   ├── services/        # Business logic
│   │   ├── tasks/           # Celery tasks
│   │   └── utils/           # Helpers
│   ├── requirements.txt
│   └── alembic/             # Database migrations
│
├── chrome-extension/         # Chrome Extension (Manifest V3)
│   ├── src/
│   │   ├── background/      # Service worker
│   │   ├── content/         # Content scripts + ATS adapters
│   │   ├── popup/           # Extension popup
│   │   └── options/         # Options page
│   └── manifest.json
│
├── docker-compose.yml        # Development stack
├── docker-compose.prod.yml   # Production stack
└── README.md
```

## 🎯 Default Candidate Profile

The platform comes pre-configured for:

- **Role**: SAP Security & GRC Consultant
- **Experience**: 6+ years
- **Skills**: SAP ECC, S/4HANA, SAP Security, GRC AC 12.0, ARA, ARM, BRM, EAM, FFID, SoD, PFCG, SU01, SU24, SU25, SUIM, SU53, STAUTHTRACE, Fiori Security, BTP Security, IAS, IPS, IAG, SAML, OAuth, OData, Authorization Troubleshooting
- **Locations**: India (Hyderabad, Bangalore, Pune), UAE
- **Salary**: AED 5,000+/month (UAE)
- **Work**: Remote, Hybrid, Onsite | Permanent, Contract, Contract-to-hire

All profile data is fully editable in Settings → Candidate Profile.

## 🔒 Security

- JWT authentication with access/refresh tokens
- AES-256 encryption for API keys
- bcrypt password hashing (12 rounds)
- Rate limiting (100 req/min default)
- CORS configured for frontend origin only
- No credential storage in Chrome extension
- Audit logging for all sensitive operations

## 📚 API Documentation

Once running, visit:
- **Swagger UI**: http://localhost:8000/docs
- **ReDoc**: http://localhost:8000/redoc

## 🚢 Production Deployment

```bash
# Use production compose file
docker-compose -f docker-compose.prod.yml up -d

# Configure reverse proxy (Nginx)
# Set up SSL with Let's Encrypt
# Configure environment variables for production
# Set up database backups
# Configure monitoring/alerting
```

## 🐛 Troubleshooting

### Database Connection Issues
```bash
# Check PostgreSQL is running
docker-compose logs postgres

# Verify connection string in .env
```

### Redis Connection Issues
```bash
# Check Redis is running
docker-compose logs redis

# Test connection
docker exec -it careerpilot-redis redis-cli ping
```

### Ollama Not Available
```bash
# Check Ollama container
docker-compose logs ollama

# Pull models manually
docker exec -it careerpilot-ollama ollama pull llama3.1:70b
```

### Frontend Build Errors
```bash
cd frontend
rm -rf node_modules .next
npm install
npm run build
```

## 📝 Development Phases

| Phase | Status | Description |
|-------|--------|-------------|
| 1 | ✅ | Project Foundation, Frontend Dashboard, Database |
| 2 | 🔄 | Candidate Profile & Resume Parser |
| 3 | ⏳ | Job Source Integrations & Discovery Engine |
| 4 | ⏳ | Job Matching & Scoring Engine |
| 5 | ⏳ | Resume Tailoring & Cover Letter Generator |
| 6 | ⏳ | Application Tracker & Analytics |
| 7 | ⏳ | Chrome Extension & Autofill Adapters |
| 8 | ⏳ | Application Review & Approval Workflow |
| 9 | ⏳ | AI Career Copilot & Interview Preparation |
| 10 | ⏳ | Job Alerts, Background Scheduling & Notifications |
| 11 | ⏳ | Referral Finder & Company Intelligence |
| 12 | ⏳ | Security, Testing, Docker Deployment & 24/7 Monitoring |

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Run tests and linting
5. Submit a pull request

## 📄 License

Private personal-use platform. All rights reserved.

## 🆘 Support

For issues and questions:
- Check the troubleshooting section
- Review API documentation at `/docs`
- Check logs with `docker-compose logs -f [service]`

---

**CareerPilot AI** - Your AI-Powered Job Search & Application Agent