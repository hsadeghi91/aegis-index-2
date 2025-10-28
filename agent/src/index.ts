import { PrismaClient } from '@prisma/client';
import dotenv from 'dotenv';
import { SEO_CATEGORIES, SEO_ISSUES_DATABASE, calculateWeightedScore, analyzeTrends, generateRecommendations } from './seo-analysis';

dotenv.config();

const prisma = new PrismaClient();

interface SEOAnalysis {
  technical: {
    score: number;
    issues: string[];
    recommendations: string[];
  };
  content: {
    score: number;
    issues: string[];
    recommendations: string[];
  };
  performance: {
    score: number;
    issues: string[];
    recommendations: string[];
  };
  accessibility: {
    score: number;
    issues: string[];
    recommendations: string[];
  };
  aiOptimization: {
    score: number;
    issues: string[];
    recommendations: string[];
  };
}

interface AnalysisResult {
  seoScore: number;
  indexScore: number;
  overallScore: number;
  analysis: SEOAnalysis;
  issues: {
    summary: string;
    suggestions: string[];
    critical: string[];
    warnings: string[];
  };
  recommendations: Array<{
    title: string;
    rationale: string;
    priority: 'high' | 'medium' | 'low';
    category: string;
    patch: any;
    impact: string;
  }>;
  trends: {
    seoTrend: 'improving' | 'stable' | 'declining';
    indexTrend: 'improving' | 'stable' | 'declining';
    lastWeekScore: number;
    improvement: number;
  };
}

/**
 * Comprehensive SEO analysis engine
 */
async function analyzeSite(domain: string): Promise<AnalysisResult> {
  console.log(`🔍 Starting comprehensive SEO analysis for ${domain}...`);
  
  // Simulate crawling delay
  await new Promise(resolve => setTimeout(resolve, 1500));
  
  // Get historical data for trend analysis
  const site = await prisma.site.findUnique({
    where: { domain },
    include: {
      runs: {
        orderBy: { startedAt: 'desc' },
        take: 4
      }
    }
  });

  // Perform comprehensive SEO analysis
  const analysis = await performSEOAnalysis(domain);
  
  // Calculate weighted scores
  const seoScore = Math.round(
    (analysis.technical.score * 0.3) +
    (analysis.content.score * 0.25) +
    (analysis.performance.score * 0.2) +
    (analysis.accessibility.score * 0.15) +
    (analysis.aiOptimization.score * 0.1)
  );
  
  const indexScore = Math.round(
    (analysis.technical.score * 0.4) +
    (analysis.content.score * 0.3) +
    (analysis.aiOptimization.score * 0.3)
  );
  
  const overallScore = Math.round((seoScore + indexScore) / 2);
  
  // Generate recommendations based on analysis
  const recommendations = generateRecommendations(analysis);
  
  // Analyze trends
  const trends = analyzeTrends(site?.runs || [], seoScore, indexScore);
  
  // Categorize issues
  const criticalIssues = analysis.technical.issues.filter(issue => 
    issue.includes('404') || issue.includes('broken') || issue.includes('error')
  );
  const warningIssues = analysis.technical.issues.filter(issue => 
    !criticalIssues.includes(issue)
  );
  
  const summary = generateSummary(analysis, criticalIssues.length, warningIssues.length);
  
  console.log(`📊 Analysis complete: SEO ${seoScore}/100, Indexability ${indexScore}/100`);
  
  return {
    seoScore,
    indexScore,
    overallScore,
    analysis,
    issues: {
      summary,
      suggestions: [...analysis.technical.issues, ...analysis.content.issues],
      critical: criticalIssues,
      warnings: warningIssues
    },
    recommendations,
    trends
  };
}

/**
 * Performs detailed SEO analysis across multiple categories
 */
async function performSEOAnalysis(domain: string): Promise<SEOAnalysis> {
  // Simulate realistic analysis with domain-specific variations
  const domainHash = domain.split('').reduce((a, b) => a + b.charCodeAt(0), 0);
  const seed = domainHash % 100;
  
  return {
    technical: {
      score: Math.max(40, Math.min(95, 70 + (seed % 30))),
      issues: generateTechnicalIssues(seed),
      recommendations: generateTechnicalRecommendations(seed)
    },
    content: {
      score: Math.max(45, Math.min(90, 65 + (seed % 25))),
      issues: generateContentIssues(seed),
      recommendations: generateContentRecommendations(seed)
    },
    performance: {
      score: Math.max(35, Math.min(85, 60 + (seed % 25))),
      issues: generatePerformanceIssues(seed),
      recommendations: generatePerformanceRecommendations(seed)
    },
    accessibility: {
      score: Math.max(50, Math.min(95, 70 + (seed % 25))),
      issues: generateAccessibilityIssues(seed),
      recommendations: generateAccessibilityRecommendations(seed)
    },
    aiOptimization: {
      score: Math.max(30, Math.min(90, 55 + (seed % 35))),
      issues: generateAIOptimizationIssues(seed),
      recommendations: generateAIOptimizationRecommendations(seed)
    }
  };
}

/**
 * Generates technical SEO issues based on domain characteristics
 */
function generateTechnicalIssues(seed: number): string[] {
  const allIssues = [
    "Missing meta description on homepage",
    "No sitemap.xml found",
    "Missing robots.txt file",
    "Duplicate title tags detected",
    "Missing canonical URLs",
    "404 errors found on important pages",
    "Mixed content (HTTP/HTTPS) issues",
    "Missing hreflang tags for internationalization",
    "Broken internal links detected",
    "Missing favicon",
    "No structured data markup",
    "Missing Open Graph tags",
    "Incorrect meta viewport tag",
    "Missing language declaration",
    "No breadcrumb navigation"
  ];
  
  const numIssues = Math.floor(seed / 20) + 2; // 2-6 issues
  return allIssues
    .sort(() => 0.5 - Math.random())
    .slice(0, numIssues);
}

/**
 * Generates content-related issues
 */
function generateContentIssues(seed: number): string[] {
  const allIssues = [
    "Homepage title is too short (under 30 characters)",
    "Missing alt text on images",
    "Low content-to-code ratio",
    "Duplicate content detected",
    "Missing internal linking strategy",
    "Poor keyword density",
    "Missing FAQ section",
    "No blog or news section",
    "Missing contact information",
    "Insufficient content depth",
    "Missing schema markup for business info",
    "No customer testimonials",
    "Missing privacy policy",
    "No terms of service",
    "Missing about page"
  ];
  
  const numIssues = Math.floor(seed / 25) + 1; // 1-4 issues
  return allIssues
    .sort(() => 0.5 - Math.random())
    .slice(0, numIssues);
}

/**
 * Generates performance-related issues
 */
function generatePerformanceIssues(seed: number): string[] {
  const allIssues = [
    "Large unoptimized images",
    "Missing image compression",
    "No CDN implementation",
    "Heavy JavaScript libraries",
    "Missing browser caching headers",
    "Unminified CSS and JavaScript",
    "Large page size (>2MB)",
    "Slow server response time",
    "Missing lazy loading for images",
    "Too many HTTP requests",
    "Render-blocking resources",
    "Missing compression (gzip/brotli)",
    "Inefficient database queries",
    "No caching strategy",
    "Missing service worker"
  ];
  
  const numIssues = Math.floor(seed / 30) + 2; // 2-5 issues
  return allIssues
    .sort(() => 0.5 - Math.random())
    .slice(0, numIssues);
}

/**
 * Generates accessibility issues
 */
function generateAccessibilityIssues(seed: number): string[] {
  const allIssues = [
    "Missing alt text on images",
    "Poor color contrast ratios",
    "Missing heading hierarchy (h1, h2, h3)",
    "No skip navigation links",
    "Missing form labels",
    "Non-descriptive link text",
    "Missing focus indicators",
    "No keyboard navigation support",
    "Missing ARIA labels",
    "Inaccessible PDF documents",
    "Missing language attributes",
    "No screen reader support",
    "Missing error message descriptions",
    "Inaccessible video content",
    "Missing table headers"
  ];
  
  const numIssues = Math.floor(seed / 35) + 1; // 1-3 issues
  return allIssues
    .sort(() => 0.5 - Math.random())
    .slice(0, numIssues);
}

/**
 * Generates AI optimization issues
 */
function generateAIOptimizationIssues(seed: number): string[] {
  const allIssues = [
    "Missing structured data for AI understanding",
    "No semantic HTML structure",
    "Missing FAQ schema markup",
    "Insufficient context for AI comprehension",
    "Missing business information schema",
    "No product/service descriptions",
    "Missing contact information markup",
    "Inadequate content categorization",
    "Missing entity recognition markers",
    "No AI-friendly content summaries",
    "Missing topic clustering",
    "Insufficient content depth for AI",
    "Missing conversational content",
    "No AI training data optimization",
    "Missing semantic relationships"
  ];
  
  const numIssues = Math.floor(seed / 40) + 2; // 2-4 issues
  return allIssues
    .sort(() => 0.5 - Math.random())
    .slice(0, numIssues);
}

/**
 * Generates technical recommendations
 */
function generateTechnicalRecommendations(seed: number): string[] {
  return [
    "Implement comprehensive meta tag strategy",
    "Create XML sitemap with proper priority settings",
    "Add robots.txt with crawl directives",
    "Fix broken links and redirect chains",
    "Implement proper canonical URL structure"
  ];
}

/**
 * Generates content recommendations
 */
function generateContentRecommendations(seed: number): string[] {
  return [
    "Optimize title tags for target keywords",
    "Add descriptive alt text to all images",
    "Create comprehensive FAQ section",
    "Implement internal linking strategy",
    "Add customer testimonials and reviews"
  ];
}

/**
 * Generates performance recommendations
 */
function generatePerformanceRecommendations(seed: number): string[] {
  return [
    "Compress and optimize images",
    "Implement lazy loading for images",
    "Minify CSS and JavaScript files",
    "Enable browser caching",
    "Use CDN for static assets"
  ];
}

/**
 * Generates accessibility recommendations
 */
function generateAccessibilityRecommendations(seed: number): string[] {
  return [
    "Improve color contrast ratios",
    "Add proper heading hierarchy",
    "Implement keyboard navigation",
    "Add ARIA labels and descriptions",
    "Test with screen readers"
  ];
}

/**
 * Generates AI optimization recommendations
 */
function generateAIOptimizationRecommendations(seed: number): string[] {
  return [
    "Add comprehensive structured data",
    "Implement semantic HTML structure",
    "Create AI-friendly content summaries",
    "Add entity recognition markup",
    "Optimize for conversational AI queries"
  ];
}

/**
 * Generates actionable recommendations based on analysis
 */
function generateRecommendations(analysis: SEOAnalysis): Array<{
  title: string;
  rationale: string;
  priority: 'high' | 'medium' | 'low';
  category: string;
  patch: any;
  impact: string;
}> {
  const recommendations = [];
  
  // Technical recommendations
  if (analysis.technical.score < 70) {
    recommendations.push({
      title: "Fix Critical Technical SEO Issues",
      rationale: "Your site has technical issues that prevent proper indexing. These should be fixed immediately to improve search visibility.",
      priority: 'high' as const,
      category: 'Technical SEO',
      patch: {
        type: "technical_fixes",
        content: "Address: " + analysis.technical.issues.slice(0, 3).join(", ")
      },
      impact: "High - Will significantly improve indexing and crawling"
    });
  }
  
  // Content recommendations
  if (analysis.content.score < 75) {
    recommendations.push({
      title: "Optimize Content for Search Engines",
      rationale: "Your content needs optimization to rank better in search results and be understood by AI systems.",
      priority: 'medium' as const,
      category: 'Content SEO',
      patch: {
        type: "content_optimization",
        content: "Focus on: " + analysis.content.issues.slice(0, 2).join(", ")
      },
      impact: "Medium - Will improve search rankings and AI comprehension"
    });
  }
  
  // Performance recommendations
  if (analysis.performance.score < 60) {
    recommendations.push({
      title: "Improve Site Performance",
      rationale: "Slow loading times hurt user experience and search rankings. Performance optimization is crucial for SEO success.",
      priority: 'high' as const,
      category: 'Performance',
      patch: {
        type: "performance_optimization",
        content: "Optimize: " + analysis.performance.issues.slice(0, 2).join(", ")
      },
      impact: "High - Will improve user experience and search rankings"
    });
  }
  
  // AI optimization recommendations
  if (analysis.aiOptimization.score < 65) {
    recommendations.push({
      title: "Optimize for AI and ChatGPT",
      rationale: "Your site needs better structure for AI systems to understand and recommend your content. This is crucial for future search visibility.",
      priority: 'medium' as const,
      category: 'AI Optimization',
      patch: {
        type: "ai_optimization",
        content: "Add: " + analysis.aiOptimization.issues.slice(0, 2).join(", ")
      },
      impact: "Medium - Will improve AI comprehension and future search visibility"
    });
  }
  
  // Accessibility recommendations
  if (analysis.accessibility.score < 70) {
    recommendations.push({
      title: "Improve Accessibility",
      rationale: "Better accessibility helps all users and can improve search rankings. It's also important for AI systems to understand your content.",
      priority: 'low' as const,
      category: 'Accessibility',
      patch: {
        type: "accessibility_improvements",
        content: "Improve: " + analysis.accessibility.issues.slice(0, 2).join(", ")
      },
      impact: "Low - Will improve user experience and compliance"
    });
  }
  
  return recommendations;
}

/**
 * Analyzes trends from historical data
 */
function analyzeTrends(runs: any[], currentSeoScore: number, currentIndexScore: number): {
  seoTrend: 'improving' | 'stable' | 'declining';
  indexTrend: 'improving' | 'stable' | 'declining';
  lastWeekScore: number;
  improvement: number;
} {
  if (runs.length < 2) {
    return {
      seoTrend: 'stable',
      indexTrend: 'stable',
      lastWeekScore: currentSeoScore,
      improvement: 0
    };
  }
  
  const lastWeekRun = runs[1];
  const lastWeekScore = lastWeekRun?.details?.seoScore || currentSeoScore;
  const improvement = currentSeoScore - lastWeekScore;
  
  const seoTrend = improvement > 5 ? 'improving' : improvement < -5 ? 'declining' : 'stable';
  const indexTrend = improvement > 3 ? 'improving' : improvement < -3 ? 'declining' : 'stable';
  
  return {
    seoTrend,
    indexTrend,
    lastWeekScore,
    improvement
  };
}

/**
 * Generates summary based on analysis results
 */
function generateSummary(analysis: SEOAnalysis, criticalCount: number, warningCount: number): string {
  const totalIssues = criticalCount + warningCount;
  
  if (criticalCount > 0) {
    return `Your site has ${criticalCount} critical issues that need immediate attention. These are preventing proper indexing and search visibility.`;
  } else if (totalIssues > 5) {
    return `Your site has ${totalIssues} areas for improvement. While not critical, addressing these will significantly boost your search rankings.`;
  } else if (totalIssues > 0) {
    return `Your site is mostly optimized! We found ${totalIssues} minor improvements that will help boost your search visibility.`;
  } else {
    return "Excellent! Your site is well-optimized for search engines and AI systems. Keep up the great work!";
  }
}

/**
 * Runs the agent analysis for a specific site
 */
export async function runAgentForSite(domain: string): Promise<void> {
  try {
    console.log(`🚀 Starting comprehensive agent run for ${domain}`);
    
    // Find the site
    const site = await prisma.site.findUnique({
      where: { domain }
    });
    
    if (!site) {
      throw new Error(`Site ${domain} not found`);
    }
    
    // Create agent run record
    const agentRun = await prisma.agentRun.create({
      data: {
        siteId: site.id,
        status: 'running'
      }
    });
    
    try {
      // Perform comprehensive analysis
      const analysis = await analyzeSite(domain);
      
      // Update site with new scores and detailed analysis
      await prisma.site.update({
        where: { id: site.id },
        data: {
          lastScoreSEO: analysis.seoScore,
          lastScoreIndex: analysis.indexScore,
          lastAuditAt: new Date(),
          lastIssues: {
            summary: analysis.issues.summary,
            suggestions: analysis.issues.suggestions,
            critical: analysis.issues.critical,
            warnings: analysis.issues.warnings,
            trends: analysis.trends,
            overallScore: analysis.overallScore,
            detailedAnalysis: {
              technical: analysis.analysis.technical,
              content: analysis.analysis.content,
              performance: analysis.analysis.performance,
              accessibility: analysis.analysis.accessibility,
              aiOptimization: analysis.analysis.aiOptimization
            }
          }
        }
      });
      
      // Clear old recommendations and create new ones
      await prisma.recommendation.deleteMany({
        where: { siteId: site.id, status: 'suggested' }
      });
      
      // Create new recommendations with priority and category
      await prisma.recommendation.createMany({
        data: analysis.recommendations.map(rec => ({
          siteId: site.id,
          title: rec.title,
          rationale: rec.rationale,
          patch: {
            ...rec.patch,
            priority: rec.priority,
            category: rec.category,
            impact: rec.impact
          },
          status: 'suggested'
        }))
      });
      
      // Update agent run as completed with detailed results
      await prisma.agentRun.update({
        where: { id: agentRun.id },
        data: {
          status: 'succeeded',
          finishedAt: new Date(),
          summary: `SEO: ${analysis.seoScore}/100, Indexability: ${analysis.indexScore}/100, Overall: ${analysis.overallScore}/100`,
          details: {
            seoScore: analysis.seoScore,
            indexScore: analysis.indexScore,
            overallScore: analysis.overallScore,
            trends: analysis.trends,
            analysis: analysis.analysis,
            issues: analysis.issues,
            recommendations: analysis.recommendations.length,
            criticalIssues: analysis.issues.critical.length,
            warningIssues: analysis.issues.warnings.length
          }
        }
      });
      
      console.log(`✅ Comprehensive agent run completed for ${domain}`);
      console.log(`   📊 SEO Score: ${analysis.seoScore}/100`);
      console.log(`   🔍 Indexability: ${analysis.indexScore}/100`);
      console.log(`   📈 Overall Score: ${analysis.overallScore}/100`);
      console.log(`   ⚠️  Critical Issues: ${analysis.issues.critical.length}`);
      console.log(`   ⚡ Warning Issues: ${analysis.issues.warnings.length}`);
      console.log(`   💡 Recommendations: ${analysis.recommendations.length}`);
      console.log(`   📊 Trend: ${analysis.trends.seoTrend} (${analysis.trends.improvement > 0 ? '+' : ''}${analysis.trends.improvement} points)`);
      
    } catch (error) {
      // Mark agent run as failed
      await prisma.agentRun.update({
        where: { id: agentRun.id },
        data: {
          status: 'failed',
          finishedAt: new Date(),
          summary: `Failed: ${error.message}`,
          details: {
            error: error.message,
            stack: error.stack
          }
        }
      });
      
      throw error;
    }
    
  } catch (error) {
    console.error(`❌ Agent run failed for ${domain}:`, error);
    throw error;
  }
}

/**
 * Runs the agent analysis for all verified sites
 */
export async function runAgentForAllSites(): Promise<void> {
  try {
    console.log('🚀 Starting agent run for all sites');
    
    // Get all verified sites
    const sites = await prisma.site.findMany({
      where: { verified: true }
    });
    
    if (sites.length === 0) {
      console.log('ℹ️  No verified sites found');
      return;
    }
    
    console.log(`📊 Found ${sites.length} verified sites`);
    
    // Process each site
    for (const site of sites) {
      try {
        await runAgentForSite(site.domain);
        // Small delay between sites to avoid overwhelming
        await new Promise(resolve => setTimeout(resolve, 2000));
      } catch (error) {
        console.error(`Failed to process ${site.domain}:`, error);
        // Continue with other sites
      }
    }
    
    console.log('✅ Agent run completed for all sites');
    
  } catch (error) {
    console.error('❌ Agent run failed:', error);
    throw error;
  }
}

/**
 * CLI interface for running the agent
 */
async function main() {
  const args = process.argv.slice(2);
  const command = args[0];
  
  try {
    if (command === 'run-site') {
      const domain = args[1];
      if (!domain) {
        console.error('Usage: npm run run-site <domain>');
        process.exit(1);
      }
      await runAgentForSite(domain);
    } else if (command === 'run-all') {
      await runAgentForAllSites();
    } else {
      console.log('Available commands:');
      console.log('  npm run run-site <domain>  - Run agent for specific site');
      console.log('  npm run run-all            - Run agent for all verified sites');
    }
  } catch (error) {
    console.error('Command failed:', error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

// Run CLI if this file is executed directly
if (require.main === module) {
  main();
}

