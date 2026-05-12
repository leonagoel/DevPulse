// DevPulse Data — sourced from intern_assignment_support_pack_dev_only_v3.xlsx
// Metrics computed per assignment spec: lead time, cycle time, PR throughput,
// deployment frequency, and bug rate.

export const developers = [
  { id: 'DEV-001', name: 'Ava Chen',     managerId: 'MGR-01', manager: 'Rina Kapoor', team: 'Payments API',  service: 'backend',  level: 'SDE2', avatar: 'AC' },
  { id: 'DEV-002', name: 'Noah Patel',   managerId: 'MGR-01', manager: 'Rina Kapoor', team: 'Payments API',  service: 'backend',  level: 'SDE1', avatar: 'NP' },
  { id: 'DEV-006', name: 'Ishan Mehta',  managerId: 'MGR-01', manager: 'Rina Kapoor', team: 'Payments API',  service: 'backend',  level: 'SDE3', avatar: 'IM' },
  { id: 'DEV-003', name: 'Mia Lopez',    managerId: 'MGR-02', manager: 'Samir Gupta', team: 'Checkout Web',  service: 'frontend', level: 'SDE1', avatar: 'ML' },
  { id: 'DEV-004', name: 'Lucas Reed',   managerId: 'MGR-02', manager: 'Samir Gupta', team: 'Checkout Web',  service: 'frontend', level: 'SDE2', avatar: 'LR' },
  { id: 'DEV-008', name: 'Zara Khan',    managerId: 'MGR-02', manager: 'Samir Gupta', team: 'Checkout Web',  service: 'frontend', level: 'SDE1', avatar: 'ZK' },
  { id: 'DEV-005', name: 'Emma Roy',     managerId: 'MGR-03', manager: 'Priya Nair',  team: 'Mobile Growth', service: 'mobile',   level: 'SDE1', avatar: 'ER' },
  { id: 'DEV-007', name: 'Owen Brooks',  managerId: 'MGR-03', manager: 'Priya Nair',  team: 'Mobile Growth', service: 'mobile',   level: 'SDE2', avatar: 'OB' },
];

// Monthly metrics per developer — computed from source tables per assignment spec
export const metrics = [
  // Ava Chen — consistently healthy
  { devId: 'DEV-001', month: '2026-03', issuesDone: 2, mergedPRs: 2, prodDeployments: 2, escapedBugs: 0, avgCycleTime: 3.95, avgLeadTime: 2.40, bugRate: 0.00, pattern: 'healthy' },
  { devId: 'DEV-001', month: '2026-04', issuesDone: 2, mergedPRs: 2, prodDeployments: 2, escapedBugs: 0, avgCycleTime: 3.90, avgLeadTime: 3.35, bugRate: 0.00, pattern: 'healthy' },
  // Noah Patel — quality watch in April
  { devId: 'DEV-002', month: '2026-03', issuesDone: 2, mergedPRs: 2, prodDeployments: 2, escapedBugs: 0, avgCycleTime: 5.90, avgLeadTime: 4.30, bugRate: 0.00, pattern: 'healthy' },
  { devId: 'DEV-002', month: '2026-04', issuesDone: 2, mergedPRs: 2, prodDeployments: 2, escapedBugs: 1, avgCycleTime: 5.40, avgLeadTime: 3.75, bugRate: 0.50, pattern: 'quality_watch' },
  // Ishan Mehta — quality watch in April
  { devId: 'DEV-006', month: '2026-03', issuesDone: 2, mergedPRs: 2, prodDeployments: 2, escapedBugs: 0, avgCycleTime: 3.75, avgLeadTime: 2.35, bugRate: 0.00, pattern: 'healthy' },
  { devId: 'DEV-006', month: '2026-04', issuesDone: 2, mergedPRs: 2, prodDeployments: 2, escapedBugs: 1, avgCycleTime: 3.70, avgLeadTime: 2.35, bugRate: 0.50, pattern: 'quality_watch' },
  // Mia Lopez — improved in April
  { devId: 'DEV-003', month: '2026-03', issuesDone: 2, mergedPRs: 2, prodDeployments: 2, escapedBugs: 1, avgCycleTime: 4.05, avgLeadTime: 3.85, bugRate: 0.50, pattern: 'quality_watch' },
  { devId: 'DEV-003', month: '2026-04', issuesDone: 2, mergedPRs: 2, prodDeployments: 2, escapedBugs: 0, avgCycleTime: 3.05, avgLeadTime: 3.55, bugRate: 0.00, pattern: 'healthy' },
  // Lucas Reed — consistently healthy
  { devId: 'DEV-004', month: '2026-03', issuesDone: 2, mergedPRs: 2, prodDeployments: 2, escapedBugs: 0, avgCycleTime: 3.85, avgLeadTime: 2.10, bugRate: 0.00, pattern: 'healthy' },
  { devId: 'DEV-004', month: '2026-04', issuesDone: 2, mergedPRs: 2, prodDeployments: 2, escapedBugs: 0, avgCycleTime: 3.55, avgLeadTime: 2.90, bugRate: 0.00, pattern: 'healthy' },
  // Zara Khan — quality watch in April
  { devId: 'DEV-008', month: '2026-03', issuesDone: 2, mergedPRs: 2, prodDeployments: 2, escapedBugs: 0, avgCycleTime: 3.80, avgLeadTime: 3.15, bugRate: 0.00, pattern: 'healthy' },
  { devId: 'DEV-008', month: '2026-04', issuesDone: 2, mergedPRs: 2, prodDeployments: 2, escapedBugs: 1, avgCycleTime: 3.85, avgLeadTime: 3.40, bugRate: 0.50, pattern: 'quality_watch' },
  // Emma Roy — needs review (slow cycle, escaped bugs)
  { devId: 'DEV-005', month: '2026-03', issuesDone: 2, mergedPRs: 2, prodDeployments: 2, escapedBugs: 1, avgCycleTime: 5.95, avgLeadTime: 4.95, bugRate: 0.50, pattern: 'quality_watch' },
  { devId: 'DEV-005', month: '2026-04', issuesDone: 2, mergedPRs: 2, prodDeployments: 2, escapedBugs: 0, avgCycleTime: 6.50, avgLeadTime: 4.70, bugRate: 0.00, pattern: 'needs_review' },
  // Owen Brooks — improved to healthy
  { devId: 'DEV-007', month: '2026-03', issuesDone: 2, mergedPRs: 2, prodDeployments: 2, escapedBugs: 1, avgCycleTime: 4.55, avgLeadTime: 4.30, bugRate: 0.50, pattern: 'quality_watch' },
  { devId: 'DEV-007', month: '2026-04', issuesDone: 2, mergedPRs: 2, prodDeployments: 2, escapedBugs: 0, avgCycleTime: 4.80, avgLeadTime: 3.65, bugRate: 0.00, pattern: 'healthy' },
];

// Detailed PR data
export const pullRequests = [
  { id: 'PR-001', devId: 'DEV-001', issueId: 'JIRA-001', month: '2026-03', reviewWaitHrs: 10.5, mergeTimeHrs: 34.5, linesChanged: 209, reviewRounds: 3 },
  { id: 'PR-002', devId: 'DEV-001', issueId: 'JIRA-002', month: '2026-03', reviewWaitHrs: 14.6, mergeTimeHrs: 27.6, linesChanged: 468, reviewRounds: 2 },
  { id: 'PR-003', devId: 'DEV-001', issueId: 'JIRA-003', month: '2026-04', reviewWaitHrs: 11.0, mergeTimeHrs: 31.0, linesChanged: 247, reviewRounds: 2 },
  { id: 'PR-004', devId: 'DEV-001', issueId: 'JIRA-004', month: '2026-04', reviewWaitHrs:  9.6, mergeTimeHrs: 18.6, linesChanged: 509, reviewRounds: 2 },
  { id: 'PR-005', devId: 'DEV-002', issueId: 'JIRA-005', month: '2026-03', reviewWaitHrs: 26.7, mergeTimeHrs: 45.7, linesChanged: 287, reviewRounds: 2 },
  { id: 'PR-006', devId: 'DEV-002', issueId: 'JIRA-006', month: '2026-03', reviewWaitHrs: 13.2, mergeTimeHrs: 22.2, linesChanged: 154, reviewRounds: 2 },
  { id: 'PR-007', devId: 'DEV-002', issueId: 'JIRA-007', month: '2026-04', reviewWaitHrs: 28.4, mergeTimeHrs: 52.4, linesChanged: 341, reviewRounds: 3 },
  { id: 'PR-008', devId: 'DEV-002', issueId: 'JIRA-008', month: '2026-04', reviewWaitHrs: 19.1, mergeTimeHrs: 38.1, linesChanged: 198, reviewRounds: 2 },
  { id: 'PR-009', devId: 'DEV-006', issueId: 'JIRA-011', month: '2026-03', reviewWaitHrs:  8.3, mergeTimeHrs: 20.3, linesChanged: 187, reviewRounds: 1 },
  { id: 'PR-010', devId: 'DEV-006', issueId: 'JIRA-012', month: '2026-04', reviewWaitHrs:  7.9, mergeTimeHrs: 17.9, linesChanged: 223, reviewRounds: 2 },
  { id: 'PR-011', devId: 'DEV-003', issueId: 'JIRA-013', month: '2026-03', reviewWaitHrs: 15.4, mergeTimeHrs: 40.4, linesChanged: 312, reviewRounds: 3 },
  { id: 'PR-012', devId: 'DEV-003', issueId: 'JIRA-014', month: '2026-04', reviewWaitHrs: 12.2, mergeTimeHrs: 29.2, linesChanged: 178, reviewRounds: 2 },
  { id: 'PR-013', devId: 'DEV-004', issueId: 'JIRA-019', month: '2026-03', reviewWaitHrs:  9.1, mergeTimeHrs: 21.1, linesChanged: 156, reviewRounds: 1 },
  { id: 'PR-014', devId: 'DEV-004', issueId: 'JIRA-020', month: '2026-04', reviewWaitHrs: 11.3, mergeTimeHrs: 25.3, linesChanged: 289, reviewRounds: 2 },
  { id: 'PR-015', devId: 'DEV-008', issueId: 'JIRA-023', month: '2026-03', reviewWaitHrs: 13.7, mergeTimeHrs: 33.7, linesChanged: 201, reviewRounds: 2 },
  { id: 'PR-016', devId: 'DEV-008', issueId: 'JIRA-024', month: '2026-04', reviewWaitHrs: 16.8, mergeTimeHrs: 41.8, linesChanged: 377, reviewRounds: 3 },
  { id: 'PR-017', devId: 'DEV-005', issueId: 'JIRA-025', month: '2026-03', reviewWaitHrs: 22.4, mergeTimeHrs: 58.4, linesChanged: 421, reviewRounds: 3 },
  { id: 'PR-018', devId: 'DEV-005', issueId: 'JIRA-026', month: '2026-04', reviewWaitHrs: 19.6, mergeTimeHrs: 62.6, linesChanged: 387, reviewRounds: 4 },
  { id: 'PR-019', devId: 'DEV-007', issueId: 'JIRA-029', month: '2026-03', reviewWaitHrs: 17.9, mergeTimeHrs: 44.9, linesChanged: 263, reviewRounds: 3 },
  { id: 'PR-020', devId: 'DEV-007', issueId: 'JIRA-030', month: '2026-04', reviewWaitHrs: 14.1, mergeTimeHrs: 37.1, linesChanged: 198, reviewRounds: 2 },
];

// Bugs data
export const bugs = [
  { id: 'BUG-001', devId: 'DEV-002', month: '2026-04', severity: 'medium', rootCause: 'test gap',       escapedToProd: true },
  { id: 'BUG-002', devId: 'DEV-006', month: '2026-04', severity: 'low',    rootCause: 'release config',  escapedToProd: true },
  { id: 'BUG-003', devId: 'DEV-008', month: '2026-04', severity: 'high',   rootCause: 'edge case',       escapedToProd: true },
  { id: 'BUG-004', devId: 'DEV-003', month: '2026-03', severity: 'medium', rootCause: 'edge case',       escapedToProd: true },
  { id: 'BUG-005', devId: 'DEV-005', month: '2026-03', severity: 'medium', rootCause: 'test gap',        escapedToProd: true },
  { id: 'BUG-006', devId: 'DEV-007', month: '2026-03', severity: 'low',    rootCause: 'release config',  escapedToProd: true },
];

// Team-level benchmark averages (used for comparison)
export const teamBenchmarks = {
  avgCycleTime: 4.3,
  avgLeadTime: 3.4,
  bugRate: 0.19,
  deployFreq: 2,
  prThroughput: 2,
};

export const MONTHS = ['2026-03', '2026-04'];
export const MONTH_LABELS = { '2026-03': 'March 2026', '2026-04': 'April 2026' };

// Pattern definitions
export const PATTERNS = {
  healthy:       { label: 'Healthy Flow',    color: '#22c55e', bg: 'bg-green-500/10',  border: 'border-green-500/30',  text: 'text-green-400' },
  quality_watch: { label: 'Quality Watch',   color: '#f59e0b', bg: 'bg-amber-500/10',  border: 'border-amber-500/30',  text: 'text-amber-400' },
  needs_review:  { label: 'Needs Review',    color: '#ef4444', bg: 'bg-red-500/10',    border: 'border-red-500/30',    text: 'text-red-400' },
};

// Interpretation engine — maps metric combinations to stories + next steps
export function interpretMetrics(m, dev) {
  const insights = [];
  const actions = [];

  // Cycle time
  if (m.avgCycleTime > 5.5) {
    insights.push({ type: 'warning', text: `Cycle time of ${m.avgCycleTime.toFixed(1)}d is above team average (${teamBenchmarks.avgCycleTime}d). Work is taking longer from start to done.` });
    actions.push({ icon: '🔍', text: 'Break down next issues into smaller, more focused tasks. Aim for <3d scope per issue.' });
  } else if (m.avgCycleTime < 3.5) {
    insights.push({ type: 'positive', text: `Cycle time of ${m.avgCycleTime.toFixed(1)}d is well below team average. Fast, focused delivery.` });
  } else {
    insights.push({ type: 'neutral', text: `Cycle time of ${m.avgCycleTime.toFixed(1)}d is close to team average — steady execution.` });
  }

  // Lead time
  if (m.avgLeadTime > 4.5) {
    insights.push({ type: 'warning', text: `Lead time of ${m.avgLeadTime.toFixed(1)}d suggests PRs are waiting in review or CI/CD pipeline before reaching prod.` });
    actions.push({ icon: '⚡', text: 'Ping reviewers proactively after 8h of no review. Keep PRs focused (<300 lines) to speed up review cycles.' });
  } else {
    insights.push({ type: 'positive', text: `Lead time of ${m.avgLeadTime.toFixed(1)}d indicates a healthy PR-to-production pipeline.` });
  }

  // Bug rate
  if (m.bugRate > 0.3) {
    insights.push({ type: 'warning', text: `Bug rate of ${(m.bugRate * 100).toFixed(0)}% means roughly 1 in 2 shipped features escaped a defect to production this month.` });
    actions.push({ icon: '🧪', text: 'Add edge case tests before merging. Consider a quick pre-merge checklist for common failure modes (config, null inputs, race conditions).' });
    actions.push({ icon: '🤝', text: 'Pair with a senior reviewer on your next PR to catch blind spots early.' });
  } else if (m.bugRate === 0) {
    insights.push({ type: 'positive', text: 'Zero escaped bugs this month — great quality discipline.' });
  }

  // Deployment frequency
  if (m.prodDeployments >= 2) {
    insights.push({ type: 'neutral', text: `${m.prodDeployments} production deployment${m.prodDeployments > 1 ? 's' : ''} — consistent shipping cadence.` });
  }

  // PR throughput
  insights.push({ type: 'neutral', text: `${m.mergedPRs} PR${m.mergedPRs > 1 ? 's' : ''} merged — ${m.mergedPRs >= 2 ? 'on track with' : 'below'} team baseline.` });

  // Pattern-based actions
  if (actions.length === 0) {
    actions.push({ icon: '🎯', text: 'Keep the momentum — maintain PR size and test coverage to stay in healthy flow.' });
    actions.push({ icon: '📈', text: `Consider taking on a stretch goal or mentoring a teammate this month.` });
  }

  return { insights, actions };
}
