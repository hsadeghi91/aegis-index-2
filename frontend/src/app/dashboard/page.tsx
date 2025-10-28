'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts'
import { RefreshCw, ExternalLink, AlertCircle, CheckCircle, Clock } from 'lucide-react'

const API_BASE = process.env.NEXT_PUBLIC_API_BASE || 'http://localhost:4000'

interface SiteSummary {
  domain: string
  lastScoreSEO: number | null
  lastScoreIndex: number | null
  lastAuditAt: string | null
  lastIssues: {
    summary: string
    suggestions: string[]
    critical: string[]
    warnings: string[]
    trends: {
      seoTrend: 'improving' | 'stable' | 'declining'
      indexTrend: 'improving' | 'stable' | 'declining'
      lastWeekScore: number
      improvement: number
    }
    overallScore: number
    detailedAnalysis: {
      technical: { score: number; issues: string[]; recommendations: string[] }
      content: { score: number; issues: string[]; recommendations: string[] }
      performance: { score: number; issues: string[]; recommendations: string[] }
      accessibility: { score: number; issues: string[]; recommendations: string[] }
      aiOptimization: { score: number; issues: string[]; recommendations: string[] }
    }
  }
  verified: boolean
  lastRun: any
}

interface AgentRun {
  id: string
  status: string
  summary: string | null
  startedAt: string
  finishedAt: string | null
}

export default function Dashboard() {
  const [siteSummary, setSiteSummary] = useState<SiteSummary | null>(null)
  const [runs, setRuns] = useState<AgentRun[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [isRunningAudit, setIsRunningAudit] = useState(false)

  // Mock data for demo
  const mockSiteSummary: SiteSummary = {
    domain: 'example.com',
    lastScoreSEO: 87,
    lastScoreIndex: 92,
    lastAuditAt: new Date().toISOString(),
    lastIssues: {
      summary: "Your site is mostly optimized! We found 3 minor improvements that will help boost your search visibility.",
      suggestions: [
        "Missing robots.txt file",
        "Duplicate title tags detected", 
        "Missing Open Graph tags"
      ],
      critical: [],
      warnings: [
        "Missing robots.txt file",
        "Duplicate title tags detected",
        "Missing Open Graph tags"
      ],
      trends: {
        seoTrend: 'improving',
        indexTrend: 'stable',
        lastWeekScore: 82,
        improvement: 5
      },
      overallScore: 89,
      detailedAnalysis: {
        technical: { score: 85, issues: ["Missing robots.txt file"], recommendations: [] },
        content: { score: 90, issues: ["Duplicate title tags detected"], recommendations: [] },
        performance: { score: 88, issues: [], recommendations: [] },
        accessibility: { score: 92, issues: [], recommendations: [] },
        aiOptimization: { score: 75, issues: ["Missing Open Graph tags"], recommendations: [] }
      }
    },
    verified: true,
    lastRun: {
      id: 'run-1',
      status: 'succeeded',
      summary: 'SEO Score: 87/100, Indexability: 92/100'
    }
  }

  const mockRuns: AgentRun[] = [
    {
      id: 'run-1',
      status: 'succeeded',
      summary: 'SEO Score: 87/100, Indexability: 92/100',
      startedAt: new Date().toISOString(),
      finishedAt: new Date().toISOString()
    },
    {
      id: 'run-2', 
      status: 'succeeded',
      summary: 'SEO Score: 82/100, Indexability: 89/100',
      startedAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
      finishedAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString()
    },
    {
      id: 'run-3',
      status: 'succeeded', 
      summary: 'SEO Score: 78/100, Indexability: 85/100',
      startedAt: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000).toISOString(),
      finishedAt: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000).toISOString()
    }
  ]

  // Mock chart data
  const chartData = [
    { week: 'Week 1', seo: 78, index: 85 },
    { week: 'Week 2', seo: 82, index: 89 },
    { week: 'Week 3', seo: 87, index: 92 }
  ]

  useEffect(() => {
    // For demo purposes, use mock data
    setSiteSummary(mockSiteSummary)
    setRuns(mockRuns)
    setIsLoading(false)
  }, [])

  const runAudit = async () => {
    setIsRunningAudit(true)
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      // Update mock data with new scores
      const newSeoScore = Math.floor(Math.random() * 10) + 85
      const newIndexScore = Math.floor(Math.random() * 5) + 90
      
      setSiteSummary(prev => prev ? {
        ...prev,
        lastScoreSEO: newSeoScore,
        lastScoreIndex: newIndexScore,
        lastAuditAt: new Date().toISOString()
      } : null)
      
      // Add new run
      const newRun: AgentRun = {
        id: `run-${Date.now()}`,
        status: 'succeeded',
        summary: `SEO Score: ${newSeoScore}/100, Indexability: ${newIndexScore}/100`,
        startedAt: new Date().toISOString(),
        finishedAt: new Date().toISOString()
      }
      setRuns(prev => [newRun, ...prev])
      
    } catch (error) {
      console.error('Failed to run audit:', error)
    } finally {
      setIsRunningAudit(false)
    }
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-900 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading dashboard...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <Link href="/" className="text-2xl font-bold text-blue-900">
                AegisIndex
              </Link>
              <span className="ml-4 text-gray-500">Dashboard</span>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-600">demo@aegisindex.com</span>
              <Link href="/" className="text-gray-600 hover:text-gray-900">
                Back to Home
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <nav className="space-y-2">
              <a href="#site-status" className="block px-4 py-2 bg-blue-900 text-white rounded-lg">
                Site Status
              </a>
              <a href="#reports" className="block px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg">
                Reports
              </a>
              <Link href="/billing" className="block px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg">
                Billing
              </Link>
            </nav>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3 space-y-8">
            {/* Site Health Scores */}
            <div id="site-status" className="bg-white rounded-2xl shadow-lg p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-900">Site Health Score</h2>
                <button
                  onClick={runAudit}
                  disabled={isRunningAudit}
                  className="bg-blue-900 text-white px-4 py-2 rounded-lg hover:bg-blue-800 disabled:opacity-50 flex items-center space-x-2"
                >
                  <RefreshCw className={`w-4 h-4 ${isRunningAudit ? 'animate-spin' : ''}`} />
                  <span>{isRunningAudit ? 'Running...' : 'Run Audit Now'}</span>
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                <div className="bg-green-50 p-6 rounded-xl">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-lg font-semibold text-green-800">SEO Score</h3>
                    <CheckCircle className="w-6 h-6 text-green-600" />
                  </div>
                  <div className="text-4xl font-bold text-green-600 mb-2">
                    {siteSummary?.lastScoreSEO || 0}
                  </div>
                  <div className="text-sm text-green-700">out of 100</div>
                  {siteSummary?.lastIssues?.trends && (
                    <div className="text-xs text-green-600 mt-1">
                      {siteSummary.lastIssues.trends.improvement > 0 ? '+' : ''}{siteSummary.lastIssues.trends.improvement} from last week
                    </div>
                  )}
                </div>

                <div className="bg-blue-50 p-6 rounded-xl">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-lg font-semibold text-blue-800">Indexability Score</h3>
                    <CheckCircle className="w-6 h-6 text-blue-600" />
                  </div>
                  <div className="text-4xl font-bold text-blue-600 mb-2">
                    {siteSummary?.lastScoreIndex || 0}
                  </div>
                  <div className="text-sm text-blue-700">out of 100</div>
                  {siteSummary?.lastIssues?.trends && (
                    <div className="text-xs text-blue-600 mt-1">
                      {siteSummary.lastIssues.trends.indexTrend === 'improving' ? '↗ Improving' : 
                       siteSummary.lastIssues.trends.indexTrend === 'declining' ? '↘ Declining' : '→ Stable'}
                    </div>
                  )}
                </div>

                <div className="bg-purple-50 p-6 rounded-xl">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-lg font-semibold text-purple-800">Overall Score</h3>
                    <CheckCircle className="w-6 h-6 text-purple-600" />
                  </div>
                  <div className="text-4xl font-bold text-purple-600 mb-2">
                    {siteSummary?.lastIssues?.overallScore || 0}
                  </div>
                  <div className="text-sm text-purple-700">composite score</div>
                  {siteSummary?.lastIssues?.trends && (
                    <div className="text-xs text-purple-600 mt-1">
                      {siteSummary.lastIssues.trends.seoTrend === 'improving' ? '📈 Trending up' : '📊 Stable'}
                    </div>
                  )}
                </div>
              </div>

              {/* Detailed Analysis Breakdown */}
              {siteSummary?.lastIssues?.detailedAnalysis && (
                <div className="mb-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Detailed Analysis Breakdown</h3>
                  <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                    {Object.entries(siteSummary.lastIssues.detailedAnalysis).map(([category, data]) => (
                      <div key={category} className="bg-gray-50 p-4 rounded-xl">
                        <h4 className="font-medium text-gray-900 capitalize mb-2">{category}</h4>
                        <div className="text-2xl font-bold text-gray-800 mb-1">{data.score}</div>
                        <div className="text-xs text-gray-600">out of 100</div>
                        {data.issues.length > 0 && (
                          <div className="text-xs text-red-600 mt-2">
                            {data.issues.length} issue{data.issues.length > 1 ? 's' : ''}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Progress Chart */}
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Weekly Progress</h3>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={chartData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="week" />
                      <YAxis domain={[0, 100]} />
                      <Tooltip />
                      <Line type="monotone" dataKey="seo" stroke="#10b981" strokeWidth={3} name="SEO Score" />
                      <Line type="monotone" dataKey="index" stroke="#3b82f6" strokeWidth={3} name="Indexability" />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* Last Audit Info */}
              <div className="bg-gray-50 p-4 rounded-xl">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-semibold text-gray-900">Last Audit</h4>
                    <p className="text-sm text-gray-600">
                      {siteSummary?.lastAuditAt 
                        ? new Date(siteSummary.lastAuditAt).toLocaleDateString()
                        : 'Never'
                      }
                    </p>
                  </div>
                  <div className="text-right">
                    <div className="text-sm text-gray-600">Status</div>
                    <div className="flex items-center space-x-1">
                      <CheckCircle className="w-4 h-4 text-green-600" />
                      <span className="text-sm text-green-600">Completed</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Top Issues */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Issues Analysis</h2>
              
              {/* Critical Issues */}
              {siteSummary?.lastIssues?.critical && siteSummary.lastIssues.critical.length > 0 && (
                <div className="mb-6">
                  <h3 className="text-lg font-semibold text-red-800 mb-3">🚨 Critical Issues ({siteSummary.lastIssues.critical.length})</h3>
                  {siteSummary.lastIssues.critical.map((issue: string, index: number) => (
                    <div key={index} className="flex items-start space-x-3 p-4 bg-red-50 rounded-xl mb-3 border border-red-200">
                      <AlertCircle className="w-5 h-5 text-red-600 mt-0.5" />
                      <div>
                        <p className="text-red-900 font-medium">{issue}</p>
                        <p className="text-sm text-red-700 mt-1">
                          This is preventing proper indexing and needs immediate attention
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Warning Issues */}
              {siteSummary?.lastIssues?.warnings && siteSummary.lastIssues.warnings.length > 0 && (
                <div className="mb-6">
                  <h3 className="text-lg font-semibold text-yellow-800 mb-3">⚠️ Warning Issues ({siteSummary.lastIssues.warnings.length})</h3>
                  {siteSummary.lastIssues.warnings.map((issue: string, index: number) => (
                    <div key={index} className="flex items-start space-x-3 p-4 bg-yellow-50 rounded-xl mb-3 border border-yellow-200">
                      <AlertCircle className="w-5 h-5 text-yellow-600 mt-0.5" />
                      <div>
                        <p className="text-yellow-900 font-medium">{issue}</p>
                        <p className="text-sm text-yellow-700 mt-1">
                          This affects search rankings and should be addressed soon
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* No Issues */}
              {(!siteSummary?.lastIssues?.critical?.length && !siteSummary?.lastIssues?.warnings?.length) && (
                <div className="text-center py-8 text-gray-500">
                  <CheckCircle className="w-12 h-12 text-green-500 mx-auto mb-4" />
                  <p className="text-lg font-medium text-green-600">Excellent!</p>
                  <p>No issues found! Your site is well-optimized.</p>
                </div>
              )}

              {/* Summary */}
              {siteSummary?.lastIssues?.summary && (
                <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 mt-4">
                  <h4 className="font-semibold text-blue-900 mb-2">Analysis Summary</h4>
                  <p className="text-blue-800">{siteSummary.lastIssues.summary}</p>
                </div>
              )}
            </div>

            {/* Recent Runs */}
            <div id="reports" className="bg-white rounded-2xl shadow-lg p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Recent Audit Reports</h2>
              
              <div className="space-y-4">
                {runs.map((run) => (
                  <div key={run.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center space-x-2">
                        {run.status === 'succeeded' ? (
                          <CheckCircle className="w-5 h-5 text-green-600" />
                        ) : run.status === 'running' ? (
                          <Clock className="w-5 h-5 text-blue-600" />
                        ) : (
                          <AlertCircle className="w-5 h-5 text-red-600" />
                        )}
                        <span className="font-medium text-gray-900">
                          {new Date(run.startedAt).toLocaleDateString()}
                        </span>
                      </div>
                      <div className="text-sm text-gray-600">
                        {run.summary || 'Audit completed'}
                      </div>
                    </div>
                    <ExternalLink className="w-4 h-4 text-gray-400" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

