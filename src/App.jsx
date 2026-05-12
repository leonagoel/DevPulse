import { useState, useEffect } from 'react';
import { developers, metrics, MONTHS, MONTH_LABELS, PATTERNS, interpretMetrics, teamBenchmarks, pullRequests, bugs } from './data/metrics';
import ICView from './components/ICView';
import ManagerView from './components/ManagerView';
import { Users, User, Activity } from 'lucide-react';

export default function App() {
  const [view, setView] = useState('ic'); // 'ic' | 'manager'
  const [selectedDev, setSelectedDev] = useState('DEV-001');
  const [selectedMonth, setSelectedMonth] = useState('2026-04');
  const [mounted, setMounted] = useState(false);

  useEffect(() => { setMounted(true); }, []);

  const dev = developers.find(d => d.id === selectedDev);
  const monthMetrics = metrics.find(m => m.devId === selectedDev && m.month === selectedMonth);
  const prevMonthMetrics = metrics.find(m => m.devId === selectedDev && m.month !== selectedMonth);
  const interpretation = monthMetrics ? interpretMetrics(monthMetrics, dev) : null;
  const devPRs = pullRequests.filter(p => p.devId === selectedDev && p.month === selectedMonth);
  const devBugs = bugs.filter(b => b.devId === selectedDev && b.month === selectedMonth);

  return (
    <div className={`min-h-screen bg-[#0a0b0f] text-white font-body transition-opacity duration-700 ${mounted ? 'opacity-100' : 'opacity-0'}`}>
      {/* Ambient background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-violet-600/8 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-cyan-500/6 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-0 w-64 h-64 bg-indigo-600/5 rounded-full blur-3xl" />
      </div>

      {/* Header */}
      <header className="relative z-10 border-b border-white/5 bg-[#0a0b0f]/80 backdrop-blur-xl sticky top-0">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-violet-500 to-cyan-500 flex items-center justify-center">
              <Activity size={16} className="text-white" />
            </div>
            <span className="font-display font-800 text-lg tracking-tight">DevPulse</span>
            <span className="text-white/30 text-sm font-mono ml-1">v1.0</span>
          </div>

          {/* View Toggle */}
          <div className="flex items-center gap-1 bg-white/5 rounded-xl p-1">
            <button
              onClick={() => setView('ic')}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                view === 'ic' ? 'bg-white/10 text-white shadow-sm' : 'text-white/40 hover:text-white/70'
              }`}
            >
              <User size={14} />
              IC View
            </button>
            <button
              onClick={() => setView('manager')}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                view === 'manager' ? 'bg-white/10 text-white shadow-sm' : 'text-white/40 hover:text-white/70'
              }`}
            >
              <Users size={14} />
              Manager View
            </button>
          </div>

          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
            <span className="text-white/40 text-xs font-mono">LIVE DATA</span>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="relative z-10 max-w-7xl mx-auto px-6 py-8">
        {view === 'ic' ? (
          <ICView
            developers={developers}
            selectedDev={selectedDev}
            setSelectedDev={setSelectedDev}
            selectedMonth={selectedMonth}
            setSelectedMonth={setSelectedMonth}
            dev={dev}
            monthMetrics={monthMetrics}
            prevMonthMetrics={prevMonthMetrics}
            interpretation={interpretation}
            devPRs={devPRs}
            devBugs={devBugs}
            MONTHS={MONTHS}
            MONTH_LABELS={MONTH_LABELS}
            PATTERNS={PATTERNS}
            teamBenchmarks={teamBenchmarks}
          />
        ) : (
          <ManagerView
            developers={developers}
            metrics={metrics}
            selectedMonth={selectedMonth}
            setSelectedMonth={setSelectedMonth}
            MONTHS={MONTHS}
            MONTH_LABELS={MONTH_LABELS}
            PATTERNS={PATTERNS}
            teamBenchmarks={teamBenchmarks}
            setView={setView}
            setSelectedDev={setSelectedDev}
          />
        )}
      </main>
    </div>
  );
}
