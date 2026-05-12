import { useState } from 'react';
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer,
  ScatterChart, Scatter, CartesianGrid, Cell
} from 'recharts';
import { Users, TrendingUp, TrendingDown, AlertTriangle, CheckCircle, Eye } from 'lucide-react';

const TEAM_COLORS = {
  'Payments API':  '#8b5cf6',
  'Checkout Web':  '#06b6d4',
  'Mobile Growth': '#f59e0b',
};

function TeamBadge({ team }) {
  return (
    <span className="px-2 py-0.5 rounded-md text-xs font-medium"
      style={{ background: `${TEAM_COLORS[team]}20`, color: TEAM_COLORS[team] }}>
      {team}
    </span>
  );
}

function StatPill({ label, value, good }) {
  return (
    <div className={`px-3 py-1.5 rounded-lg border text-xs flex items-center gap-2 ${
      good === true  ? 'bg-green-500/10 border-green-500/20 text-green-300' :
      good === false ? 'bg-red-500/10 border-red-500/20 text-red-300' :
                       'bg-white/5 border-white/8 text-white/50'
    }`}>
      <span className="text-white/40">{label}</span>
      <span className="font-mono font-medium">{value}</span>
    </div>
  );
}

function DevRow({ dev, m, rank, onDrillDown, PATTERNS }) {
  const pattern = PATTERNS[m.pattern];
  return (
    <div className="flex items-center gap-4 p-4 bg-white/[0.02] border border-white/6 rounded-xl hover:bg-white/[0.04] hover:border-white/10 transition-all group">
      <span className="text-white/20 font-mono text-xs w-4 shrink-0">{rank}</span>
      <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-violet-500/50 to-cyan-500/50 flex items-center justify-center text-xs font-display font-700 shrink-0">
        {dev.avatar}
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-1">
          <span className="text-sm font-medium truncate">{dev.name}</span>
          <span className="text-white/30 text-xs">{dev.level}</span>
          <TeamBadge team={dev.team} />
        </div>
        <div className="flex items-center gap-2 flex-wrap">
          <StatPill label="Cycle" value={`${m.avgCycleTime.toFixed(1)}d`} good={m.avgCycleTime < 4.5} />
          <StatPill label="Lead" value={`${m.avgLeadTime.toFixed(1)}d`} good={m.avgLeadTime < 4} />
          <StatPill label="Bug%" value={`${(m.bugRate * 100).toFixed(0)}%`} good={m.bugRate === 0} />
          <StatPill label="PRs" value={m.mergedPRs} good={null} />
          <StatPill label="Deploys" value={m.prodDeployments} good={null} />
        </div>
      </div>
      <div className="flex items-center gap-3 shrink-0">
        <span className={`px-2.5 py-1 rounded-full text-xs font-medium border ${pattern.bg} ${pattern.border} ${pattern.text}`}>
          {pattern.label}
        </span>
        <button
          onClick={() => onDrillDown(dev.id)}
          className="opacity-0 group-hover:opacity-100 transition-opacity text-white/40 hover:text-white/80 p-1.5 rounded-lg hover:bg-white/5"
          title="Open IC view"
        >
          <Eye size={14} />
        </button>
      </div>
    </div>
  );
}

function SummaryCard({ icon: Icon, label, value, sub, color }) {
  return (
    <div className="bg-white/[0.03] border border-white/8 rounded-2xl p-5 flex items-center gap-4">
      <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${color}`}>
        <Icon size={18} />
      </div>
      <div>
        <div className="text-2xl font-display font-700 tracking-tight">{value}</div>
        <div className="text-xs text-white/40 mt-0.5">{label}</div>
        {sub && <div className="text-xs text-white/25 mt-0.5">{sub}</div>}
      </div>
    </div>
  );
}

export default function ManagerView({
  developers, metrics, selectedMonth, setSelectedMonth,
  MONTHS, MONTH_LABELS, PATTERNS, teamBenchmarks, setView, setSelectedDev
}) {
  const [filterTeam, setFilterTeam] = useState('All');
  const [sortBy, setSortBy] = useState('cycleTime');

  const monthData = metrics.filter(m => m.month === selectedMonth);

  const withDev = monthData.map(m => ({
    ...m,
    dev: developers.find(d => d.id === m.devId),
  })).filter(m => m.dev);

  const teams = ['All', ...Array.from(new Set(developers.map(d => d.team)))];
  const filtered = filterTeam === 'All' ? withDev : withDev.filter(m => m.dev.team === filterTeam);

  const sorted = [...filtered].sort((a, b) => {
    if (sortBy === 'cycleTime')   return a.avgCycleTime - b.avgCycleTime;
    if (sortBy === 'leadTime')    return a.avgLeadTime - b.avgLeadTime;
    if (sortBy === 'bugRate')     return a.bugRate - b.bugRate;
    if (sortBy === 'deployFreq')  return b.prodDeployments - a.prodDeployments;
    return 0;
  });

  // Summary stats
  const healthy = withDev.filter(m => m.pattern === 'healthy').length;
  const watch   = withDev.filter(m => m.pattern === 'quality_watch').length;
  const review  = withDev.filter(m => m.pattern === 'needs_review').length;
  const avgCycle = (withDev.reduce((s, m) => s + m.avgCycleTime, 0) / withDev.length).toFixed(1);
  const avgBugRate = ((withDev.reduce((s, m) => s + m.bugRate, 0) / withDev.length) * 100).toFixed(0);

  // Bar chart: cycle time by developer
  const barData = [...withDev]
    .sort((a, b) => a.avgCycleTime - b.avgCycleTime)
    .map(m => ({
      name: m.dev.name.split(' ')[0],
      cycleTime: m.avgCycleTime,
      leadTime: m.avgLeadTime,
      team: m.dev.team,
    }));

  // Scatter: cycle time vs lead time
  const scatterData = withDev.map(m => ({
    x: m.avgCycleTime,
    y: m.avgLeadTime,
    name: m.dev.name,
    pattern: m.pattern,
    team: m.dev.team,
  }));

  // Team rollup
  const teamRollup = Array.from(new Set(developers.map(d => d.team))).map(team => {
    const teamMetrics = withDev.filter(m => m.dev.team === team);
    return {
      team,
      avgCycle: (teamMetrics.reduce((s, m) => s + m.avgCycleTime, 0) / teamMetrics.length).toFixed(1),
      avgLead: (teamMetrics.reduce((s, m) => s + m.avgLeadTime, 0) / teamMetrics.length).toFixed(1),
      bugs: teamMetrics.reduce((s, m) => s + m.escapedBugs, 0),
      members: teamMetrics.length,
    };
  });

  const handleDrillDown = (devId) => {
    setSelectedDev(devId);
    setView('ic');
  };

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const d = payload[0]?.payload;
      return (
        <div className="bg-[#13141a] border border-white/10 rounded-xl p-3 text-xs shadow-2xl">
          <div className="font-medium text-white mb-1">{d?.name}</div>
          <div className="text-white/50">Cycle: {d?.x?.toFixed(1)}d · Lead: {d?.y?.toFixed(1)}d</div>
          <div className="mt-1" style={{ color: TEAM_COLORS[d?.team] }}>{d?.team}</div>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="space-y-6">
      {/* Header row */}
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div>
          <h1 className="font-display text-2xl font-700 tracking-tight">Manager Overview</h1>
          <p className="text-white/40 text-sm mt-0.5">Team health · {MONTH_LABELS[selectedMonth]}</p>
        </div>
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

      {/* Summary cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <SummaryCard icon={CheckCircle} label="Healthy flow" value={healthy} sub={`of ${withDev.length} devs`} color="bg-green-500/15 text-green-400" />
        <SummaryCard icon={AlertTriangle} label="Need attention" value={watch + review} sub={`quality watch + review`} color="bg-amber-500/15 text-amber-400" />
        <SummaryCard icon={TrendingUp} label="Avg cycle time" value={`${avgCycle}d`} sub={`team benchmark ${teamBenchmarks.avgCycleTime}d`} color="bg-violet-500/15 text-violet-400" />
        <SummaryCard icon={TrendingDown} label="Avg bug rate" value={`${avgBugRate}%`} sub="escaped to production" color="bg-red-500/15 text-red-400" />
      </div>

      {/* Charts row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Bar chart */}
        <div className="bg-white/[0.03] border border-white/8 rounded-2xl p-6">
          <h3 className="font-display font-600 text-sm text-white/70 uppercase tracking-wider mb-4">Cycle & Lead Time by Developer</h3>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={barData} margin={{ top: 0, right: 10, left: -20, bottom: 0 }}>
              <CartesianGrid stroke="rgba(255,255,255,0.04)" vertical={false} />
              <XAxis dataKey="name" tick={{ fill: 'rgba(255,255,255,0.4)', fontSize: 11 }} />
              <YAxis tick={{ fill: 'rgba(255,255,255,0.4)', fontSize: 11 }} />
              <Tooltip
                contentStyle={{ background: '#13141a', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 8 }}
                labelStyle={{ color: 'rgba(255,255,255,0.6)' }}
                itemStyle={{ color: 'rgba(255,255,255,0.8)' }}
              />
              <Bar dataKey="cycleTime" name="Cycle Time (d)" fill="#8b5cf6" radius={[4, 4, 0, 0]} opacity={0.8} />
              <Bar dataKey="leadTime"  name="Lead Time (d)"  fill="#06b6d4" radius={[4, 4, 0, 0]} opacity={0.8} />
            </BarChart>
          </ResponsiveContainer>
          <div className="flex items-center gap-4 mt-2 justify-center">
            <div className="flex items-center gap-1.5 text-xs text-white/40"><div className="w-3 h-2 rounded bg-violet-500 opacity-80" />Cycle Time</div>
            <div className="flex items-center gap-1.5 text-xs text-white/40"><div className="w-3 h-2 rounded bg-cyan-500 opacity-80" />Lead Time</div>
          </div>
        </div>

        {/* Scatter: cycle vs lead */}
        <div className="bg-white/[0.03] border border-white/8 rounded-2xl p-6">
          <h3 className="font-display font-600 text-sm text-white/70 uppercase tracking-wider mb-1">Cycle vs Lead Time Scatter</h3>
          <p className="text-white/30 text-xs mb-4">Bottom-left quadrant = best performers</p>
          <ResponsiveContainer width="100%" height={210}>
            <ScatterChart margin={{ top: 5, right: 10, left: -20, bottom: 5 }}>
              <CartesianGrid stroke="rgba(255,255,255,0.04)" />
              <XAxis dataKey="x" name="Cycle Time" type="number" domain={[3, 7]} tick={{ fill: 'rgba(255,255,255,0.4)', fontSize: 11 }} label={{ value: 'Cycle (d)', position: 'insideBottom', fill: 'rgba(255,255,255,0.3)', fontSize: 10, offset: -2 }} />
              <YAxis dataKey="y" name="Lead Time"  type="number" domain={[2, 6]} tick={{ fill: 'rgba(255,255,255,0.4)', fontSize: 11 }} label={{ value: 'Lead (d)', angle: -90, position: 'insideLeft', fill: 'rgba(255,255,255,0.3)', fontSize: 10 }} />
              <Tooltip content={<CustomTooltip />} />
              <Scatter data={scatterData}>
                {scatterData.map((entry, i) => (
                  <Cell key={i} fill={TEAM_COLORS[entry.team] || '#8b5cf6'} opacity={0.85} />
                ))}
              </Scatter>
            </ScatterChart>
          </ResponsiveContainer>
          <div className="flex items-center gap-4 mt-1 justify-center flex-wrap">
            {Object.entries(TEAM_COLORS).map(([t, c]) => (
              <div key={t} className="flex items-center gap-1.5 text-xs text-white/40">
                <div className="w-2 h-2 rounded-full" style={{ background: c }} />
                {t}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Team rollup */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {teamRollup.map(t => (
          <div key={t.team} className="bg-white/[0.03] border border-white/8 rounded-2xl p-5">
            <div className="flex items-center justify-between mb-3">
              <TeamBadge team={t.team} />
              <span className="text-white/30 text-xs">{t.members} members</span>
            </div>
            <div className="grid grid-cols-3 gap-3 text-center">
              <div>
                <div className="text-xl font-display font-700">{t.avgCycle}d</div>
                <div className="text-xs text-white/30 mt-0.5">Avg Cycle</div>
              </div>
              <div>
                <div className="text-xl font-display font-700">{t.avgLead}d</div>
                <div className="text-xs text-white/30 mt-0.5">Avg Lead</div>
              </div>
              <div>
                <div className={`text-xl font-display font-700 ${t.bugs > 0 ? 'text-amber-400' : 'text-green-400'}`}>{t.bugs}</div>
                <div className="text-xs text-white/30 mt-0.5">Bugs</div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Dev table */}
      <div className="bg-white/[0.03] border border-white/8 rounded-2xl p-6">
        <div className="flex items-center justify-between mb-4 flex-wrap gap-3">
          <h3 className="font-display font-600 text-sm text-white/70 uppercase tracking-wider">Developer Breakdown</h3>
          <div className="flex items-center gap-2 flex-wrap">
            {/* Team filter */}
            <div className="flex items-center gap-1 bg-white/5 rounded-lg p-0.5">
              {teams.map(t => (
                <button
                  key={t}
                  onClick={() => setFilterTeam(t)}
                  className={`px-2.5 py-1 rounded-md text-xs transition-all ${
                    filterTeam === t ? 'bg-white/10 text-white' : 'text-white/40 hover:text-white/70'
                  }`}
                >
                  {t === 'All' ? 'All teams' : t.split(' ')[0]}
                </button>
              ))}
            </div>
            {/* Sort */}
            <select
              value={sortBy}
              onChange={e => setSortBy(e.target.value)}
              className="bg-white/5 border border-white/10 rounded-lg px-3 py-1.5 text-xs text-white/70 outline-none cursor-pointer"
            >
              <option value="cycleTime">Sort: Cycle Time ↑</option>
              <option value="leadTime">Sort: Lead Time ↑</option>
              <option value="bugRate">Sort: Bug Rate ↑</option>
              <option value="deployFreq">Sort: Deploy Freq ↓</option>
            </select>
          </div>
        </div>

        <div className="space-y-2">
          {sorted.map((m, i) => (
            <DevRow
              key={m.devId}
              dev={m.dev}
              m={m}
              rank={i + 1}
              onDrillDown={handleDrillDown}
              PATTERNS={PATTERNS}
            />
          ))}
        </div>

        <div className="mt-4 p-3 bg-amber-500/5 border border-amber-500/15 rounded-xl">
          <p className="text-xs text-amber-300/60 leading-relaxed">
            <span className="font-medium text-amber-300/80">Manager note:</span> Rankings are for trend-spotting only — not performance judgement. Context always matters: team complexity, on-call load, and scope differ across individuals.
          </p>
        </div>
      </div>
    </div>
  );
}
