import { useState } from 'react';
import { RadarChart, Radar, PolarGrid, PolarAngleAxis, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, LineChart, Line, CartesianGrid } from 'recharts';
import { TrendingUp, TrendingDown, Minus, Clock, Zap, Bug, GitPullRequest, Rocket, ChevronDown, Info } from 'lucide-react';

function MetricCard({ label, value, unit, prev, benchmark, icon: Icon, colorClass, description }) {
  const delta = prev !== undefined ? value - prev : null;
  const vs = benchmark !== undefined ? value - benchmark : null;
  const isGoodDown = ['avgCycleTime', 'avgLeadTime', 'bugRate'].includes(label);

  const deltaGood = delta !== null ? (isGoodDown ? delta < 0 : delta > 0) : null;
  const vsGood = vs !== null ? (isGoodDown ? vs < 0 : vs > 0) : null;

  return (
    <div className="bg-white/[0.03] border border-white/8 rounded-2xl p-5 hover:bg-white/[0.05] hover:border-white/12 transition-all duration-300 group relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-white/[0.02] to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
      <div className="relative">
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-center gap-2">
            <div className={`w-8 h-8 rounded-lg ${colorClass} flex items-center justify-center`}>
              <Icon size={15} />
            </div>
            <span className="text-white/50 text-xs font-medium uppercase tracking-wider">{label}</span>
          </div>
          {delta !== null && (
            <div className={`flex items-center gap-1 text-xs px-2 py-1 rounded-full ${
              deltaGood ? 'bg-green-500/10 text-green-400' : delta === 0 ? 'bg-white/5 text-white/40' : 'bg-red-500/10 text-red-400'
            }`}>
              {delta === 0 ? <Minus size={10} /> : deltaGood ? <TrendingDown size={10} /> : <TrendingUp size={10} />}
              {delta === 0 ? 'same' : `${delta > 0 ? '+' : ''}${Math.abs(delta).toFixed(1)}`}
            </div>
          )}
        </div>
        <div className="flex items-baseline gap-1.5 mb-2">
          <span className="text-3xl font-display font-700 tracking-tight">
            {typeof value === 'number' && value % 1 !== 0 ? value.toFixed(1) : value}
          </span>
          <span className="text-white/40 text-sm">{unit}</span>
        </div>
        <p className="text-white/35 text-xs leading-relaxed">{description}</p>
        {vs !== null && (
          <div className={`mt-3 text-xs flex items-center gap-1.5 ${vsGood ? 'text-green-400/70' : vs === 0 ? 'text-white/30' : 'text-amber-400/70'}`}>
            <div className="w-1 h-1 rounded-full bg-current" />
            {vs === 0 ? 'At team avg' : `${vsGood ? '' : '+'}${vs.toFixed(1)} vs team avg`}
          </div>
        )}
      </div>
    </div>
  );
}

function InsightTag({ type, text }) {
  const styles = {
    positive: 'bg-green-500/10 border-green-500/20 text-green-300',
    warning:  'bg-amber-500/10 border-amber-500/20 text-amber-300',
    neutral:  'bg-white/5 border-white/10 text-white/60',
  };
  const icons = { positive: '✓', warning: '⚠', neutral: '→' };
  return (
    <div className={`flex items-start gap-3 p-4 rounded-xl border text-sm leading-relaxed ${styles[type]}`}>
      <span className="mt-0.5 shrink-0 font-mono text-xs">{icons[type]}</span>
      <span>{text}</span>
    </div>
  );
}

function PRCard({ pr }) {
  return (
    <div className="bg-white/[0.02] border border-white/6 rounded-xl p-4 hover:border-white/10 transition-colors">
      <div className="flex items-center justify-between mb-2">
        <span className="font-mono text-xs text-violet-400">{pr.id}</span>
        <span className="text-xs text-white/30">{pr.reviewRounds} review round{pr.reviewRounds > 1 ? 's' : ''}</span>
      </div>
      <div className="grid grid-cols-3 gap-3 text-xs">
        <div>
          <div className="text-white/30 mb-0.5">Review wait</div>
          <div className="font-mono text-white/80">{pr.reviewWaitHrs.toFixed(1)}h</div>
        </div>
        <div>
          <div className="text-white/30 mb-0.5">Merge time</div>
          <div className="font-mono text-white/80">{pr.mergeTimeHrs.toFixed(1)}h</div>
        </div>
        <div>
          <div className="text-white/30 mb-0.5">Lines changed</div>
          <div className={`font-mono ${pr.linesChanged > 400 ? 'text-amber-400' : 'text-white/80'}`}>{pr.linesChanged}</div>
        </div>
      </div>
    </div>
  );
}

export default function ICView({
  developers, selectedDev, setSelectedDev, selectedMonth, setSelectedMonth,
  dev, monthMetrics, prevMonthMetrics, interpretation, devPRs, devBugs,
  MONTHS, MONTH_LABELS, PATTERNS, teamBenchmarks
}) {
  const [showDevPicker, setShowDevPicker] = useState(false);

  if (!dev || !monthMetrics) return null;

  const pattern = PATTERNS[monthMetrics.pattern];

  // Build radar data
  const normalize = (val, max) => Math.max(0, Math.min(100, (1 - val / max) * 100));
  const radarData = [
    { metric: 'Cycle Time', score: normalize(monthMetrics.avgCycleTime, 8), fullMark: 100 },
    { metric: 'Lead Time',  score: normalize(monthMetrics.avgLeadTime, 7),  fullMark: 100 },
    { metric: 'Quality',    score: monthMetrics.bugRate === 0 ? 100 : monthMetrics.bugRate <= 0.25 ? 60 : 30, fullMark: 100 },
    { metric: 'Deploy Freq',score: Math.min(100, monthMetrics.prodDeployments * 50), fullMark: 100 },
    { metric: 'PR Output',  score: Math.min(100, monthMetrics.mergedPRs * 50),       fullMark: 100 },
  ];

  // Build trend data (both months)
  const allDev = [MONTHS[0], MONTHS[1]].map(m => {
    const d = [
      { devId: 'DEV-001', month: '2026-03', avgCycleTime: 3.95, avgLeadTime: 2.40, bugRate: 0.00 },
      { devId: 'DEV-001', month: '2026-04', avgCycleTime: 3.90, avgLeadTime: 3.35, bugRate: 0.00 },
      { devId: 'DEV-002', month: '2026-03', avgCycleTime: 5.90, avgLeadTime: 4.30, bugRate: 0.00 },
      { devId: 'DEV-002', month: '2026-04', avgCycleTime: 5.40, avgLeadTime: 3.75, bugRate: 0.50 },
      { devId: 'DEV-006', month: '2026-03', avgCycleTime: 3.75, avgLeadTime: 2.35, bugRate: 0.00 },
      { devId: 'DEV-006', month: '2026-04', avgCycleTime: 3.70, avgLeadTime: 2.35, bugRate: 0.50 },
      { devId: 'DEV-003', month: '2026-03', avgCycleTime: 4.05, avgLeadTime: 3.85, bugRate: 0.50 },
      { devId: 'DEV-003', month: '2026-04', avgCycleTime: 3.05, avgLeadTime: 3.55, bugRate: 0.00 },
      { devId: 'DEV-004', month: '2026-03', avgCycleTime: 3.85, avgLeadTime: 2.10, bugRate: 0.00 },
      { devId: 'DEV-004', month: '2026-04', avgCycleTime: 3.55, avgLeadTime: 2.90, bugRate: 0.00 },
      { devId: 'DEV-008', month: '2026-03', avgCycleTime: 3.80, avgLeadTime: 3.15, bugRate: 0.00 },
      { devId: 'DEV-008', month: '2026-04', avgCycleTime: 3.85, avgLeadTime: 3.40, bugRate: 0.50 },
      { devId: 'DEV-005', month: '2026-03', avgCycleTime: 5.95, avgLeadTime: 4.95, bugRate: 0.50 },
      { devId: 'DEV-005', month: '2026-04', avgCycleTime: 6.50, avgLeadTime: 4.70, bugRate: 0.00 },
      { devId: 'DEV-007', month: '2026-03', avgCycleTime: 4.55, avgLeadTime: 4.30, bugRate: 0.50 },
      { devId: 'DEV-007', month: '2026-04', avgCycleTime: 4.80, avgLeadTime: 3.65, bugRate: 0.00 },
    ].find(r => r.devId === selectedDev && r.month === m);
    return { month: MONTH_LABELS[m]?.slice(0, 3), cycleTime: d?.avgCycleTime, leadTime: d?.avgLeadTime };
  });

  return (
    <div className="space-y-6">
      {/* Top controls */}
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div>
          <h1 className="font-display text-2xl font-700 tracking-tight">Individual Contributor</h1>
          <p className="text-white/40 text-sm mt-0.5">Metrics • Interpretation • Next Steps</p>
        </div>
        <div className="flex items-center gap-3">
          {/* Dev selector */}
          <div className="relative">
            <button
              onClick={() => setShowDevPicker(!showDevPicker)}
              className="flex items-center gap-3 bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 hover:bg-white/8 transition-colors"
            >
              <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-violet-500 to-cyan-500 flex items-center justify-center text-xs font-display font-700">
                {dev.avatar}
              </div>
              <div className="text-left">
                <div className="text-sm font-medium">{dev.name}</div>
                <div className="text-xs text-white/40">{dev.level} · {dev.team}</div>
              </div>
              <ChevronDown size={14} className="text-white/40 ml-1" />
            </button>
            {showDevPicker && (
              <div className="absolute top-full mt-2 right-0 bg-[#13141a] border border-white/10 rounded-xl overflow-hidden shadow-2xl z-50 w-64">
                {developers.map(d => (
                  <button
                    key={d.id}
                    onClick={() => { setSelectedDev(d.id); setShowDevPicker(false); }}
                    className={`w-full flex items-center gap-3 px-4 py-3 hover:bg-white/5 transition-colors text-left ${d.id === selectedDev ? 'bg-white/5' : ''}`}
                  >
                    <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-violet-500/60 to-cyan-500/60 flex items-center justify-center text-xs font-display font-700 shrink-0">
                      {d.avatar}
                    </div>
                    <div>
                      <div className="text-sm font-medium">{d.name}</div>
                      <div className="text-xs text-white/40">{d.level} · {d.team}</div>
                    </div>
                    {d.id === selectedDev && <div className="ml-auto w-1.5 h-1.5 rounded-full bg-violet-400" />}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Month selector */}
          <div className="flex items-center gap-1 bg-white/5 border border-white/10 rounded-xl p-1">
            {MONTHS.map(m => (
              <button
                key={m}
                onClick={() => setSelectedMonth(m)}
                className={`px-3 py-1.5 rounded-lg text-sm transition-all ${
                  m === selectedMonth ? 'bg-white/10 text-white' : 'text-white/40 hover:text-white/70'
                }`}
              >
                {MONTH_LABELS[m]?.slice(0, 3)}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Pattern banner */}
      <div className={`flex items-center justify-between p-4 rounded-2xl border ${pattern.bg} ${pattern.border}`}>
        <div className="flex items-center gap-3">
          <div className={`w-2.5 h-2.5 rounded-full`} style={{ background: pattern.color }} />
          <span className={`font-display font-600 ${pattern.text}`}>{pattern.label}</span>
          <span className="text-white/30 text-sm">— {MONTH_LABELS[selectedMonth]}</span>
        </div>
        <div className="flex items-center gap-4 text-sm text-white/40">
          <span>{dev.team}</span>
          <span>·</span>
          <span>{dev.manager}</span>
        </div>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
        <MetricCard
          label="Cycle Time"
          value={monthMetrics.avgCycleTime}
          unit="days"
          prev={prevMonthMetrics?.avgCycleTime}
          benchmark={teamBenchmarks.avgCycleTime}
          icon={Clock}
          colorClass="bg-violet-500/15 text-violet-400"
          description="Avg time from In Progress → Done"
        />
        <MetricCard
          label="Lead Time"
          value={monthMetrics.avgLeadTime}
          unit="days"
          prev={prevMonthMetrics?.avgLeadTime}
          benchmark={teamBenchmarks.avgLeadTime}
          icon={Zap}
          colorClass="bg-cyan-500/15 text-cyan-400"
          description="Avg time from PR open → production"
        />
        <MetricCard
          label="Bug Rate"
          value={`${(monthMetrics.bugRate * 100).toFixed(0)}%`}
          unit=""
          prev={prevMonthMetrics?.bugRate}
          benchmark={teamBenchmarks.bugRate}
          icon={Bug}
          colorClass="bg-red-500/15 text-red-400"
          description="Escaped prod bugs / issues done"
        />
        <MetricCard
          label="PR Throughput"
          value={monthMetrics.mergedPRs}
          unit="merged"
          prev={prevMonthMetrics?.mergedPRs}
          icon={GitPullRequest}
          colorClass="bg-emerald-500/15 text-emerald-400"
          description="Pull requests merged this month"
        />
        <MetricCard
          label="Deploy Freq"
          value={monthMetrics.prodDeployments}
          unit="deploys"
          prev={prevMonthMetrics?.prodDeployments}
          icon={Rocket}
          colorClass="bg-amber-500/15 text-amber-400"
          description="Successful prod deployments"
        />
      </div>

      {/* Main 3-col layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Radar Chart */}
        <div className="bg-white/[0.03] border border-white/8 rounded-2xl p-6">
          <h3 className="font-display font-600 text-sm text-white/70 uppercase tracking-wider mb-4">Performance Radar</h3>
          <ResponsiveContainer width="100%" height={240}>
            <RadarChart data={radarData}>
              <PolarGrid stroke="rgba(255,255,255,0.06)" />
              <PolarAngleAxis dataKey="metric" tick={{ fill: 'rgba(255,255,255,0.4)', fontSize: 11, fontFamily: 'DM Sans' }} />
              <Radar
                name="Score"
                dataKey="score"
                stroke={pattern.color}
                fill={pattern.color}
                fillOpacity={0.15}
                strokeWidth={2}
              />
            </RadarChart>
          </ResponsiveContainer>
          <p className="text-white/30 text-xs text-center mt-2">Higher = better for each dimension</p>
        </div>

        {/* Trend Chart */}
        <div className="bg-white/[0.03] border border-white/8 rounded-2xl p-6">
          <h3 className="font-display font-600 text-sm text-white/70 uppercase tracking-wider mb-4">Time Trends</h3>
          <ResponsiveContainer width="100%" height={240}>
            <LineChart data={allDev} margin={{ top: 5, right: 10, left: -20, bottom: 5 }}>
              <CartesianGrid stroke="rgba(255,255,255,0.04)" />
              <XAxis dataKey="month" tick={{ fill: 'rgba(255,255,255,0.4)', fontSize: 11 }} />
              <YAxis tick={{ fill: 'rgba(255,255,255,0.4)', fontSize: 11 }} />
              <Tooltip
                contentStyle={{ background: '#13141a', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 8 }}
                labelStyle={{ color: 'rgba(255,255,255,0.6)' }}
                itemStyle={{ color: 'rgba(255,255,255,0.8)' }}
              />
              <Line type="monotone" dataKey="cycleTime" name="Cycle Time (d)" stroke="#8b5cf6" strokeWidth={2} dot={{ r: 4, fill: '#8b5cf6' }} />
              <Line type="monotone" dataKey="leadTime"  name="Lead Time (d)"  stroke="#06b6d4" strokeWidth={2} dot={{ r: 4, fill: '#06b6d4' }} />
            </LineChart>
          </ResponsiveContainer>
          <div className="flex items-center gap-4 mt-2 justify-center">
            <div className="flex items-center gap-1.5 text-xs text-white/40"><div className="w-3 h-0.5 bg-violet-500 rounded" />Cycle Time</div>
            <div className="flex items-center gap-1.5 text-xs text-white/40"><div className="w-3 h-0.5 bg-cyan-500 rounded" />Lead Time</div>
          </div>
        </div>

        {/* PR Details */}
        <div className="bg-white/[0.03] border border-white/8 rounded-2xl p-6">
          <h3 className="font-display font-600 text-sm text-white/70 uppercase tracking-wider mb-4">PR Activity</h3>
          <div className="space-y-3">
            {devPRs.length > 0 ? devPRs.map(pr => <PRCard key={pr.id} pr={pr} />) : (
              <p className="text-white/30 text-sm text-center py-8">No PRs in selected month</p>
            )}
          </div>
          {devBugs.length > 0 && (
            <div className="mt-4 pt-4 border-t border-white/6">
              <div className="text-xs text-white/40 mb-2">Escaped Bugs</div>
              {devBugs.map(b => (
                <div key={b.id} className="flex items-center justify-between text-xs py-1.5">
                  <span className="font-mono text-red-400/80">{b.id}</span>
                  <span className="text-white/40">{b.rootCause}</span>
                  <span className={`px-2 py-0.5 rounded-full text-xs ${
                    b.severity === 'high' ? 'bg-red-500/15 text-red-400' : b.severity === 'medium' ? 'bg-amber-500/15 text-amber-400' : 'bg-white/5 text-white/40'
                  }`}>{b.severity}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Interpretation + Next Steps */}
      {interpretation && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white/[0.03] border border-white/8 rounded-2xl p-6">
            <div className="flex items-center gap-2 mb-4">
              <Info size={14} className="text-violet-400" />
              <h3 className="font-display font-600 text-sm text-white/70 uppercase tracking-wider">What the data is saying</h3>
            </div>
            <div className="space-y-3">
              {interpretation.insights.map((ins, i) => (
                <InsightTag key={i} type={ins.type} text={ins.text} />
              ))}
            </div>
          </div>

          <div className="bg-white/[0.03] border border-white/8 rounded-2xl p-6">
            <div className="flex items-center gap-2 mb-4">
              <span className="text-sm">🎯</span>
              <h3 className="font-display font-600 text-sm text-white/70 uppercase tracking-wider">Suggested next steps</h3>
            </div>
            <div className="space-y-3">
              {interpretation.actions.map((act, i) => (
                <div key={i} className="flex items-start gap-3 p-4 bg-white/[0.03] border border-white/6 rounded-xl hover:border-white/10 transition-colors">
                  <span className="text-lg shrink-0 mt-0.5">{act.icon}</span>
                  <p className="text-sm text-white/70 leading-relaxed">{act.text}</p>
                </div>
              ))}
            </div>
            <div className="mt-4 p-3 bg-violet-500/5 border border-violet-500/15 rounded-xl">
              <p className="text-xs text-violet-300/60 leading-relaxed">
                <span className="font-medium text-violet-300/80">Responsible AI note:</span> These insights are generated from aggregated data. Use them as a starting point for reflection — not as a performance verdict.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
