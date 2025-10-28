/**
 * Enhanced SEO Analysis Utilities
 * 
 * This file demonstrates the comprehensive SEO analysis capabilities
 * of the AegisIndex agent system.
 */

export interface SEOAnalysisResult {
  domain: string;
  timestamp: string;
  scores: {
    seo: number;
    indexability: number;
    overall: number;
    technical: number;
    content: number;
    performance: number;
    accessibility: number;
    aiOptimization: number;
  };
  issues: {
    critical: string[];
    warnings: string[];
    total: number;
  };
  recommendations: {
    high: number;
    medium: number;
    low: number;
    total: number;
  };
  trends: {
    seoTrend: 'improving' | 'stable' | 'declining';
    indexTrend: 'improving' | 'stable' | 'declining';
    improvement: number;
  };
  categories: {
    technical: CategoryAnalysis;
    content: CategoryAnalysis;
    performance: CategoryAnalysis;
    accessibility: CategoryAnalysis;
    aiOptimization: CategoryAnalysis;
  };
}

export interface CategoryAnalysis {
  score: number;
  issues: string[];
  recommendations: string[];
  weight: number;
  description: string;
}

/**
 * SEO Analysis Categories with detailed descriptions
 */
export const SEO_CATEGORIES = {
  technical: {
    weight: 0.3,
    description: "Technical SEO fundamentals like meta tags, sitemaps, robots.txt, and site structure",
    keyFactors: [
      "Meta descriptions and title tags",
      "XML sitemap presence and quality",
      "Robots.txt configuration",
      "Canonical URL structure",
      "Site architecture and internal linking",
      "HTTPS implementation",
      "Mobile responsiveness"
    ]
  },
  content: {
    weight: 0.25,
    description: "Content quality, relevance, and optimization for search engines",
    keyFactors: [
      "Content depth and quality",
      "Keyword optimization",
      "Internal linking strategy",
      "Content freshness",
      "Duplicate content issues",
      "Content-to-code ratio",
      "User engagement signals"
    ]
  },
  performance: {
    weight: 0.2,
    description: "Site speed, loading times, and Core Web Vitals",
    keyFactors: [
      "Page load speed",
      "Core Web Vitals (LCP, FID, CLS)",
      "Image optimization",
      "CSS and JavaScript optimization",
      "Server response times",
      "Caching implementation",
      "CDN usage"
    ]
  },
  accessibility: {
    weight: 0.15,
    description: "Web accessibility compliance and user experience",
    keyFactors: [
      "Alt text for images",
      "Color contrast ratios",
      "Keyboard navigation",
      "Screen reader compatibility",
      "ARIA labels and descriptions",
      "Heading hierarchy",
      "Form accessibility"
    ]
  },
  aiOptimization: {
    weight: 0.1,
    description: "Optimization for AI systems like ChatGPT and future search engines",
    keyFactors: [
      "Structured data markup",
      "Semantic HTML structure",
      "Entity recognition",
      "Content categorization",
      "AI-friendly content summaries",
      "Conversational content",
      "Topic clustering"
    ]
  }
};

/**
 * Common SEO Issues Database
 */
export const SEO_ISSUES_DATABASE = {
  critical: [
    "404 errors on important pages",
    "Missing homepage meta description",
    "No sitemap.xml found",
    "Broken internal links",
    "Mixed content (HTTP/HTTPS) issues",
    "Missing robots.txt file",
    "Duplicate title tags",
    "Missing canonical URLs",
    "Site not mobile-responsive",
    "SSL certificate issues"
  ],
  warnings: [
    "Missing Open Graph tags",
    "No structured data markup",
    "Missing alt text on images",
    "Poor internal linking",
    "Slow page load times",
    "Missing favicon",
    "No breadcrumb navigation",
    "Missing language declaration",
    "Insufficient content depth",
    "Missing contact information",
    "No FAQ section",
    "Missing privacy policy",
    "No customer testimonials",
    "Poor color contrast ratios",
    "Missing heading hierarchy"
  ],
  performance: [
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
    "Missing compression (gzip/brotli)"
  ],
  accessibility: [
    "Missing alt text on images",
    "Poor color contrast ratios",
    "Missing heading hierarchy (h1, h2, h3)",
    "No skip navigation links",
    "Missing form labels",
    "Non-descriptive link text",
    "Missing focus indicators",
    "No keyboard navigation support",
    "Missing ARIA labels",
    "Inaccessible PDF documents"
  ],
  aiOptimization: [
    "Missing structured data for AI understanding",
    "No semantic HTML structure",
    "Missing FAQ schema markup",
    "Insufficient context for AI comprehension",
    "Missing business information schema",
    "No product/service descriptions",
    "Missing contact information markup",
    "Inadequate content categorization",
    "Missing entity recognition markers",
    "No AI-friendly content summaries"
  ]
};

/**
 * SEO Recommendations Database
 */
export const SEO_RECOMMENDATIONS = {
  technical: [
    {
      title: "Implement Comprehensive Meta Tag Strategy",
      priority: "high",
      impact: "High - Essential for search engine understanding",
      action: "Add unique meta descriptions (150-160 chars) and title tags (50-60 chars) to all pages"
    },
    {
      title: "Create XML Sitemap",
      priority: "high", 
      impact: "High - Helps search engines discover all pages",
      action: "Generate and submit XML sitemap to Google Search Console"
    },
    {
      title: "Add Robots.txt File",
      priority: "medium",
      impact: "Medium - Controls search engine crawling",
      action: "Create robots.txt with proper crawl directives"
    },
    {
      title: "Fix Broken Links",
      priority: "high",
      impact: "High - Broken links hurt user experience and SEO",
      action: "Audit and fix all broken internal and external links"
    }
  ],
  content: [
    {
      title: "Optimize Content for Target Keywords",
      priority: "medium",
      impact: "Medium - Improves search rankings for target terms",
      action: "Research and optimize content for relevant keywords"
    },
    {
      title: "Add Descriptive Alt Text",
      priority: "medium",
      impact: "Medium - Improves accessibility and image SEO",
      action: "Add descriptive alt text to all images"
    },
    {
      title: "Create Comprehensive FAQ Section",
      priority: "low",
      impact: "Low - Helps with featured snippets and user experience",
      action: "Add FAQ section addressing common user questions"
    },
    {
      title: "Implement Internal Linking Strategy",
      priority: "medium",
      impact: "Medium - Distributes page authority and improves navigation",
      action: "Add strategic internal links between related pages"
    }
  ],
  performance: [
    {
      title: "Optimize Images",
      priority: "high",
      impact: "High - Significantly improves page load speed",
      action: "Compress images and use modern formats (WebP, AVIF)"
    },
    {
      title: "Implement Lazy Loading",
      priority: "medium",
      impact: "Medium - Reduces initial page load time",
      action: "Add lazy loading to images and videos"
    },
    {
      title: "Minify CSS and JavaScript",
      priority: "medium",
      impact: "Medium - Reduces file sizes and load times",
      action: "Remove unnecessary whitespace and comments from code"
    },
    {
      title: "Enable Browser Caching",
      priority: "medium",
      impact: "Medium - Improves repeat visitor experience",
      action: "Configure proper cache headers for static assets"
    }
  ],
  accessibility: [
    {
      title: "Improve Color Contrast",
      priority: "medium",
      impact: "Medium - Improves readability and accessibility",
      action: "Ensure text has sufficient contrast against backgrounds"
    },
    {
      title: "Add Proper Heading Hierarchy",
      priority: "medium",
      impact: "Medium - Improves structure and accessibility",
      action: "Use h1, h2, h3 tags in logical order"
    },
    {
      title: "Implement Keyboard Navigation",
      priority: "low",
      impact: "Low - Essential for accessibility compliance",
      action: "Ensure all interactive elements are keyboard accessible"
    }
  ],
  aiOptimization: [
    {
      title: "Add Structured Data Markup",
      priority: "medium",
      impact: "Medium - Helps AI systems understand content",
      action: "Implement JSON-LD structured data for key content"
    },
    {
      title: "Create AI-Friendly Content Summaries",
      priority: "low",
      impact: "Low - Improves AI comprehension",
      action: "Add clear summaries and descriptions for AI systems"
    },
    {
      title: "Implement Semantic HTML",
      priority: "low",
      impact: "Low - Provides better context for AI",
      action: "Use semantic HTML elements (article, section, nav, etc.)"
    }
  ]
};

/**
 * Calculate weighted SEO score based on category analysis
 */
export function calculateWeightedScore(categories: Record<string, CategoryAnalysis>): number {
  let totalScore = 0;
  let totalWeight = 0;

  Object.entries(categories).forEach(([key, category]) => {
    totalScore += category.score * category.weight;
    totalWeight += category.weight;
  });

  return Math.round(totalScore / totalWeight);
}

/**
 * Generate trend analysis based on historical data
 */
export function analyzeTrends(currentScore: number, historicalScores: number[]): {
  trend: 'improving' | 'stable' | 'declining';
  improvement: number;
  average: number;
} {
  if (historicalScores.length === 0) {
    return { trend: 'stable', improvement: 0, average: currentScore };
  }

  const average = historicalScores.reduce((sum, score) => sum + score, 0) / historicalScores.length;
  const improvement = currentScore - average;
  
  let trend: 'improving' | 'stable' | 'declining' = 'stable';
  if (improvement > 5) trend = 'improving';
  else if (improvement < -5) trend = 'declining';

  return { trend, improvement, average };
}

/**
 * Generate priority-based recommendations
 */
export function generateRecommendations(categories: Record<string, CategoryAnalysis>): Array<{
  title: string;
  priority: 'high' | 'medium' | 'low';
  category: string;
  impact: string;
  action: string;
}> {
  const recommendations = [];

  Object.entries(categories).forEach(([categoryKey, category]) => {
    if (category.score < 70) {
      const categoryRecs = SEO_RECOMMENDATIONS[categoryKey as keyof typeof SEO_RECOMMENDATIONS];
      if (categoryRecs) {
        const highPriorityRecs = categoryRecs.filter(rec => rec.priority === 'high');
        if (highPriorityRecs.length > 0) {
          recommendations.push({
            ...highPriorityRecs[0],
            category: categoryKey,
          });
        }
      }
    }
  });

  return recommendations.sort((a, b) => {
    const priorityOrder = { high: 3, medium: 2, low: 1 };
    return priorityOrder[b.priority] - priorityOrder[a.priority];
  });
}
