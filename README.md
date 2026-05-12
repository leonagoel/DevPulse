# DevPulse — Developer Productivity Intelligence MVP

A full-stack MVP that transforms raw engineering metrics into actionable insights for individual contributors and engineering managers.

---

## What It Does

DevPulse takes raw developer data (PRs, Jira issues, CI/CD deployments, bug reports) and helps users move from **metrics → interpretation → action**.

### Two Views

**IC View (Individual Contributor)**
- Select any developer and any month
- See all 5 metrics: Cycle Time, Lead Time, Bug Rate, PR Throughput, Deployment Frequency
- Radar chart showing multi-dimensional performance profile
- Month-over-month trend line for cycle & lead time
- PR detail cards (review wait, merge time, lines changed, review rounds)
- Bug log with severity and root cause
- AI-style interpretation: "what the data is saying" in plain English
- 2–3 suggested next steps tailored to the pattern detected

**Manager View**
- Team-level summary cards (healthy / attention / avg cycle / avg bug rate)
- Bar chart: cycle & lead time across all developers
- Scatter plot: cycle time vs lead time — identify outliers at a glance
- Team rollup: per-team averages for cycle, lead, and escaped bugs
- Sortable, filterable developer table with drill-down to IC view
- Responsible-use note reminding managers that rankings are for trend-spotting, not judgement

---

## Metrics (per assignment spec)

| Metric | Definition |
|--------|-----------|
| **Lead Time for Changes** | Average `lead_time_days` from successful prod deployments in the month |
| **Cycle Time** | Average `cycle_time_days` from Jira issues completed in the month |
| **Bug Rate** | Escaped prod bugs found in month ÷ issues completed in month |
| **Deployment Frequency** | Count of successful prod deployments in the month |
| **PR Throughput** | Count of merged pull requests in the month |

---

## Data Source

All data is sourced directly from the provided workbook:  
`intern_assignment_support_pack_dev_only_v3.xlsx`

Tables used:
- `Dim_Developers` — developer dimension (name, team, manager, level)
- `Fact_Jira_Issues` — cycle time, issue types, story points
- `Fact_Pull_Requests` — PR timing, review rounds, lines changed
- `Fact_CI_Deployments` — lead time, deployment status
- `Fact_Bug_Reports` — escaped bugs, severity, root cause

Data is pre-processed into `src/data/metrics.js` which acts as the mock API layer.

---

## Tech Stack

| Layer | Choice | Why |
|-------|--------|-----|
| Frontend | React 18 + Vite | Fast DX, component-based |
| Styling | Tailwind CSS | Utility-first, consistent spacing |
| Charts | Recharts | Composable, React-native charts |
| Icons | Lucide React | Clean, consistent icon set |
| Fonts | Syne (display) + DM Sans (body) | Distinctive, readable |
| Data | Static JS module (mock API) | Keeps scope focused; easy to swap to REST |

---

## Getting Started

```bash
# Install dependencies
npm install

# Start dev server (localhost:3000)
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

---

## Project Structure

```
devpulse/
├── index.html               # Entry HTML with Google Fonts
├── vite.config.js           # Vite + React plugin config
├── tailwind.config.js       # Tailwind with custom fonts
├── postcss.config.js        # PostCSS config
├── package.json
└── src/
    ├── main.jsx             # React entry point
    ├── App.jsx              # Root component + view routing
    ├── index.css            # Global styles + Tailwind directives
    ├── data/
    │   └── metrics.js       # All data + interpretation engine
    └── components/
        ├── ICView.jsx       # Individual Contributor view
        └── ManagerView.jsx  # Manager / team overview
```

---

## Interpretation Logic

The `interpretMetrics()` function in `src/data/metrics.js` maps metric values to human-readable stories:

- **Cycle Time > 5.5d** → flags slow execution, suggests issue decomposition
- **Lead Time > 4.5d** → flags pipeline delay, suggests proactive reviewer pings
- **Bug Rate > 30%** → flags quality risk, suggests edge-case testing + pair review
- **Bug Rate = 0** → positive reinforcement
- **Pattern = healthy** → encourages stretch goals or mentoring

Each developer is tagged with a pattern: `healthy`, `quality_watch`, or `needs_review` — derived from the workbook's `pattern_hint` column.

---

## Responsible AI Use

This MVP includes explicit responsible-use notes in both IC and Manager views:
- Insights are starting points for reflection, not performance verdicts
- Rankings are for trend-spotting, not ranking humans
- Context (on-call load, team complexity, scope) always matters

---

## Interview Talking Points

**Why this scope?**  
One focused IC journey + lightweight manager summary covers the core user problem without sprawl. Each view has a clear job: IC = self-awareness + action; Manager = team health + early spotting.

**Why static data layer?**  
A `metrics.js` module is functionally equivalent to a REST `/api/metrics` endpoint. It's trivially replaceable — just swap `import` for `fetch`. This keeps the demo reliable and the focus on product thinking.

**Biggest trade-off?**  
With more time: real backend (Node/Express or FastAPI), live data via WebSocket, and a proper auth layer so each IC only sees their own data by default.

**What I'd add next:**  
- `/api/metrics` REST endpoint (Express or FastAPI)
- Historical trend beyond 2 months
- Slack/email digest integration (weekly pattern summary)
- Anomaly detection: alert when any metric shifts >20% week-over-week
