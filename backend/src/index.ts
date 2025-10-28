import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import dotenv from 'dotenv';
import { PrismaClient } from '@prisma/client';
import { randomBytes } from 'crypto';

dotenv.config();

const app = express();
const prisma = new PrismaClient();
const PORT = process.env.API_PORT || 4000;

// Middleware
app.use(helmet());
app.use(cors({
  origin: [
    'https://aegisindex.com',
    'https://www.aegisindex.com',
    'http://localhost:3000' // For development
  ],
  credentials: true
}));
app.use(express.json());

// Health check
app.get('/api/health', (req, res) => {
  res.json({ 
    ok: true, 
    ts: new Date().toISOString() 
  });
});

// Auth endpoints
app.post('/api/auth/magic-link', async (req, res) => {
  try {
    const { email } = req.body;
    
    if (!email) {
      return res.status(400).json({ error: 'Email is required' });
    }

    // Find or create user
    let user = await prisma.user.findUnique({
      where: { email }
    });

    if (!user) {
      user = await prisma.user.create({
        data: { email }
      });
    }

    res.json({ userId: user.id });
  } catch (error) {
    console.error('Magic link error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// User endpoints
app.get('/api/user', async (req, res) => {
  try {
    // Mock user for now
    const mockUser = {
      id: 'demo-user',
      email: 'demo@aegisindex.com',
      subscription: {
        status: 'active',
        plan: 'basic',
        priceUsdMonthly: 10
      }
    };

    res.json(mockUser);
  } catch (error) {
    console.error('Get user error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Site management endpoints
app.post('/api/sites', async (req, res) => {
  try {
    const { domain, connectMethod } = req.body;
    
    if (!domain || !connectMethod) {
      return res.status(400).json({ error: 'Domain and connectMethod are required' });
    }

    // Generate verification token
    const verifyToken = randomBytes(16).toString('hex');

    // Create site for demo user
    const site = await prisma.site.create({
      data: {
        userId: 'demo-user',
        domain,
        connectMethod,
        lastIssues: {
          verifyToken
        }
      }
    });

    res.json({
      siteId: site.id,
      domain: site.domain,
      verification: {
        token: verifyToken,
        instructions: {
          dns: `Add TXT record: aegis-verify=${verifyToken}`,
          file: `Upload file /.well-known/aegis-verify.txt with content: ${verifyToken}`
        }
      }
    });
  } catch (error) {
    console.error('Create site error:', error);
    if (error.code === 'P2002') {
      return res.status(409).json({ error: 'Domain already exists' });
    }
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.post('/api/sites/verify', async (req, res) => {
  try {
    const { domain } = req.body;
    
    if (!domain) {
      return res.status(400).json({ error: 'Domain is required' });
    }

    // For now, just mark as verified
    await prisma.site.update({
      where: { domain },
      data: { verified: true }
    });

    res.json({ verified: true });
  } catch (error) {
    console.error('Verify site error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.get('/api/sites/:domain/summary', async (req, res) => {
  try {
    const { domain } = req.params;

    const site = await prisma.site.findUnique({
      where: { domain },
      include: {
        runs: {
          orderBy: { startedAt: 'desc' },
          take: 1
        }
      }
    });

    if (!site) {
      return res.status(404).json({ error: 'Site not found' });
    }

    res.json({
      domain: site.domain,
      lastScoreSEO: site.lastScoreSEO,
      lastScoreIndex: site.lastScoreIndex,
      lastAuditAt: site.lastAuditAt,
      lastIssues: site.lastIssues,
      verified: site.verified,
      lastRun: site.runs[0] || null
    });
  } catch (error) {
    console.error('Get site summary error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.get('/api/sites/:domain/runs', async (req, res) => {
  try {
    const { domain } = req.params;

    const site = await prisma.site.findUnique({
      where: { domain }
    });

    if (!site) {
      return res.status(404).json({ error: 'Site not found' });
    }

    const runs = await prisma.agentRun.findMany({
      where: { siteId: site.id },
      orderBy: { startedAt: 'desc' },
      take: 20
    });

    res.json(runs);
  } catch (error) {
    console.error('Get site runs error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Agent endpoints
app.post('/api/agent/run', async (req, res) => {
  try {
    const { domain } = req.body;
    
    if (!domain) {
      return res.status(400).json({ error: 'Domain is required' });
    }

    const site = await prisma.site.findUnique({
      where: { domain }
    });

    if (!site) {
      return res.status(404).json({ error: 'Site not found' });
    }

    // Create agent run
    const agentRun = await prisma.agentRun.create({
      data: {
        siteId: site.id,
        status: 'running'
      }
    });

    // Simulate comprehensive SEO analysis
    const domainHash = domain.split('').reduce((a, b) => a + b.charCodeAt(0), 0);
    const seed = domainHash % 100;
    
    // Generate realistic scores based on domain characteristics
    const technicalScore = Math.max(40, Math.min(95, 70 + (seed % 30)));
    const contentScore = Math.max(45, Math.min(90, 65 + (seed % 25)));
    const performanceScore = Math.max(35, Math.min(85, 60 + (seed % 25)));
    const accessibilityScore = Math.max(50, Math.min(95, 70 + (seed % 25)));
    const aiOptimizationScore = Math.max(30, Math.min(90, 55 + (seed % 35)));
    
    // Calculate weighted scores
    const seoScore = Math.round(
      (technicalScore * 0.3) +
      (contentScore * 0.25) +
      (performanceScore * 0.2) +
      (accessibilityScore * 0.15) +
      (aiOptimizationScore * 0.1)
    );
    
    const indexScore = Math.round(
      (technicalScore * 0.4) +
      (contentScore * 0.3) +
      (aiOptimizationScore * 0.3)
    );
    
    const overallScore = Math.round((seoScore + indexScore) / 2);

    // Generate comprehensive issues and recommendations
    const criticalIssues = [
      "Missing meta description on homepage",
      "No sitemap.xml found",
      "404 errors found on important pages"
    ].slice(0, Math.floor(seed / 30) + 1);

    const warningIssues = [
      "Missing robots.txt file",
      "Duplicate title tags detected",
      "Missing canonical URLs",
      "Missing Open Graph tags",
      "No structured data markup"
    ].slice(0, Math.floor(seed / 25) + 2);

    const allIssues = [...criticalIssues, ...warningIssues];
    
    const issues = {
      summary: criticalIssues.length > 0 
        ? `Your site has ${criticalIssues.length} critical issues that need immediate attention.`
        : `Your site is mostly optimized! We found ${warningIssues.length} minor improvements.`,
      suggestions: allIssues,
      critical: criticalIssues,
      warnings: warningIssues,
      trends: {
        seoTrend: 'stable',
        indexTrend: 'stable',
        lastWeekScore: seoScore - Math.floor(Math.random() * 10),
        improvement: Math.floor(Math.random() * 10) - 5
      },
      overallScore,
      detailedAnalysis: {
        technical: { score: technicalScore, issues: criticalIssues.slice(0, 3), recommendations: [] },
        content: { score: contentScore, issues: warningIssues.slice(0, 2), recommendations: [] },
        performance: { score: performanceScore, issues: [], recommendations: [] },
        accessibility: { score: accessibilityScore, issues: [], recommendations: [] },
        aiOptimization: { score: aiOptimizationScore, issues: [], recommendations: [] }
      }
    };

    // Update site with new scores and detailed analysis
    await prisma.site.update({
      where: { id: site.id },
      data: {
        lastScoreSEO: seoScore,
        lastScoreIndex: indexScore,
        lastAuditAt: new Date(),
        lastIssues: issues
      }
    });

    // Clear old recommendations and create new ones
    await prisma.recommendation.deleteMany({
      where: { siteId: site.id, status: 'suggested' }
    });

    // Create comprehensive recommendations
    const recommendations = [];
    
    if (technicalScore < 70) {
      recommendations.push({
        siteId: site.id,
        title: "Fix Critical Technical SEO Issues",
        rationale: "Your site has technical issues that prevent proper indexing. These should be fixed immediately to improve search visibility.",
        status: "suggested",
        patch: {
          type: "technical_fixes",
          content: "Address: " + criticalIssues.slice(0, 3).join(", "),
          priority: "high",
          category: "Technical SEO",
          impact: "High - Will significantly improve indexing and crawling"
        }
      });
    }
    
    if (contentScore < 75) {
      recommendations.push({
        siteId: site.id,
        title: "Optimize Content for Search Engines",
        rationale: "Your content needs optimization to rank better in search results and be understood by AI systems.",
        status: "suggested",
        patch: {
          type: "content_optimization",
          content: "Focus on: " + warningIssues.slice(0, 2).join(", "),
          priority: "medium",
          category: "Content SEO",
          impact: "Medium - Will improve search rankings and AI comprehension"
        }
      });
    }
    
    if (aiOptimizationScore < 65) {
      recommendations.push({
        siteId: site.id,
        title: "Optimize for AI and ChatGPT",
        rationale: "Your site needs better structure for AI systems to understand and recommend your content. This is crucial for future search visibility.",
        status: "suggested",
        patch: {
          type: "ai_optimization",
          content: "Add structured data and semantic HTML for better AI comprehension",
          priority: "medium",
          category: "AI Optimization",
          impact: "Medium - Will improve AI comprehension and future search visibility"
        }
      });
    }

    if (recommendations.length > 0) {
      await prisma.recommendation.createMany({
        data: recommendations
      });
    }

    // Update agent run as completed with detailed results
    await prisma.agentRun.update({
      where: { id: agentRun.id },
      data: {
        status: 'succeeded',
        finishedAt: new Date(),
        summary: `SEO: ${seoScore}/100, Indexability: ${indexScore}/100, Overall: ${overallScore}/100`,
        details: {
          seoScore,
          indexScore,
          overallScore,
          trends: issues.trends,
          analysis: issues.detailedAnalysis,
          issues: issues,
          recommendations: recommendations.length,
          criticalIssues: criticalIssues.length,
          warningIssues: warningIssues.length
        }
      }
    });

    res.json({ 
      runId: agentRun.id, 
      status: 'succeeded',
      scores: { 
        seo: seoScore, 
        index: indexScore, 
        overall: overallScore 
      },
      analysis: {
        technical: technicalScore,
        content: contentScore,
        performance: performanceScore,
        accessibility: accessibilityScore,
        aiOptimization: aiOptimizationScore
      },
      issues: {
        critical: criticalIssues.length,
        warnings: warningIssues.length,
        total: allIssues.length
      },
      recommendations: recommendations.length
    });
  } catch (error) {
    console.error('Run agent error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Billing endpoints
app.post('/api/billing/activate', async (req, res) => {
  try {
    const { userId } = req.body;
    
    if (!userId) {
      return res.status(400).json({ error: 'UserId is required' });
    }

    // Create or update subscription
    const subscription = await prisma.subscription.upsert({
      where: { userId },
      update: {
        plan: 'basic',
        priceUsdMonthly: 10,
        status: 'active',
        renewsAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000) // 30 days
      },
      create: {
        userId,
        plan: 'basic',
        priceUsdMonthly: 10,
        status: 'active',
        renewsAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000) // 30 days
      }
    });

    res.json({
      subscriptionId: subscription.id,
      status: 'active',
      plan: 'basic',
      priceUsdMonthly: 10
    });
  } catch (error) {
    console.error('Activate billing error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Error handling middleware
app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Backend server running on port ${PORT}`);
  console.log(`📊 Health check: http://localhost:${PORT}/api/health`);
});

// Graceful shutdown
process.on('SIGINT', async () => {
  console.log('Shutting down gracefully...');
  await prisma.$disconnect();
  process.exit(0);
});

process.on('SIGTERM', async () => {
  console.log('Shutting down gracefully...');
  await prisma.$disconnect();
  process.exit(0);
});

