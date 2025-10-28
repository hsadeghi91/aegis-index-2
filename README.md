# AegisIndex Monorepo

AI-powered SEO/indexing automation service that helps websites get indexed by Google and ChatGPT.

## Project Structure

- `/frontend` - Next.js marketing site and dashboard
- `/backend` - Express API server
- `/agent` - Background service for site analysis

## Quick Start

1. Install dependencies:
```bash
npm run install:all
```

2. Set up environment variables (see Environment Variables section)

3. Set up PostgreSQL database and run migrations:
```bash
cd backend
npx prisma migrate dev
```

4. Start development servers:
```bash
npm run dev
```

This will start:
- Frontend on http://localhost:3000
- Backend on http://localhost:4000

## Environment Variables

### Shared
- `DATABASE_URL` - PostgreSQL connection string (e.g., `postgresql://user:password@localhost:5432/aegisindex`)

### Backend
- `API_PORT` - Port for API server (default: 4000)
- `DASHBOARD_ORIGIN` - Allowed origin for CORS (default: https://aegisindex.com)

### Agent
- `AGENT_RUN_INTERVAL` - Interval for automatic runs (not enforced yet)
- `DATABASE_URL` - Same as shared

### Frontend
- `NEXT_PUBLIC_API_BASE` - Backend API URL (default: https://api.aegisindex.com)

## Production Deployment

The application is designed to run on a single Ubuntu VPS with Nginx reverse proxy:

- `aegisindex.com` → Frontend (port 3000)
- `api.aegisindex.com` → Backend (port 4000)

### Nginx Configuration Example

```nginx
# Frontend
server {
    listen 80;
    server_name aegisindex.com www.aegisindex.com;
    
    location / {
        proxy_pass http://localhost:3000;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
    }
}

# Backend API
server {
    listen 80;
    server_name api.aegisindex.com;
    
    location / {
        proxy_pass http://localhost:4000;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
    }
}
```

### PM2 Process Management

```bash
# Start all services
pm2 start ecosystem.config.js

# Monitor
pm2 monit

# Logs
pm2 logs
```

## Development

### Backend API
```bash
cd backend
npm run dev
```

### Frontend
```bash
cd frontend
npm run dev
```

### Agent Service
```bash
cd agent
npm run dev
```

## Database Schema

The application uses Prisma with PostgreSQL. Key models:

- `User` - User accounts with email authentication
- `Subscription` - Crypto-based subscription management
- `Site` - Connected websites with comprehensive audit scores and detailed analysis
- `AgentRun` - Audit execution history with detailed results and trends
- `Recommendation` - AI-generated improvement suggestions with priority and impact ratings

## Enhanced SEO Analysis Engine

The AegisIndex agent performs comprehensive SEO analysis across five key categories:

### 1. Technical SEO (30% weight)
- Meta tags and title optimization
- XML sitemap presence and quality
- Robots.txt configuration
- Canonical URL structure
- Site architecture and internal linking
- HTTPS implementation
- Mobile responsiveness

### 2. Content SEO (25% weight)
- Content depth and quality
- Keyword optimization
- Internal linking strategy
- Content freshness
- Duplicate content detection
- Content-to-code ratio
- User engagement signals

### 3. Performance (20% weight)
- Page load speed and Core Web Vitals
- Image optimization
- CSS and JavaScript optimization
- Server response times
- Caching implementation
- CDN usage

### 4. Accessibility (15% weight)
- Alt text for images
- Color contrast ratios
- Keyboard navigation
- Screen reader compatibility
- ARIA labels and descriptions
- Heading hierarchy
- Form accessibility

### 5. AI Optimization (10% weight)
- Structured data markup
- Semantic HTML structure
- Entity recognition
- Content categorization
- AI-friendly content summaries
- Conversational content
- Topic clustering

### Analysis Features

- **Comprehensive Scoring**: Weighted scores across all categories
- **Issue Categorization**: Critical vs warning issues with detailed explanations
- **Trend Analysis**: Track improvements over time with historical data
- **Priority Recommendations**: High/medium/low priority suggestions with impact ratings
- **Detailed Reporting**: Category-specific analysis with actionable insights

## API Endpoints

### Health
- `GET /api/health` - Service health check

### Authentication
- `POST /api/auth/magic-link` - Email-based auth (placeholder)

### User Management
- `GET /api/user` - Get current user info

### Site Management
- `POST /api/sites` - Connect a new site
- `POST /api/sites/verify` - Verify site ownership
- `GET /api/sites/:domain/summary` - Get site health summary
- `GET /api/sites/:domain/runs` - Get audit history

### Agent Operations
- `POST /api/agent/run` - Trigger manual audit

### Billing
- `POST /api/billing/activate` - Activate subscription

## License

© 2025 AegisIndex. All rights reserved.

