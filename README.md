<div align="center">

<img src="./devpulse-logo.svg" alt="DevPulse" width="600"/>

### *Developer Productivity Intelligence · MVP*

> **From raw metrics to real insight — in one view.**

[![React](https://img.shields.io/badge/React_18-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://react.dev)
[![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev)
[![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com)
[![Recharts](https://img.shields.io/badge/Recharts-FF6B6B?style=for-the-badge&logo=chartdotjs&logoColor=white)](https://recharts.org)
[![Zero Backend](https://img.shields.io/badge/Zero_Backend_Required-orange?style=for-the-badge&logo=javascript&logoColor=white)](#getting-started)

</div>

---

## 🧠 What It Does

DevPulse ingests raw developer data — PRs, Jira issues, CI/CD deployments, bug reports — and moves users through a clear journey:

```
metrics  →  interpretation  →  action
```

No more staring at spreadsheets wondering what they mean.

---

## 🪟 Two Views. One Truth.

<table>
<tr>
<td width="50%" valign="top">

### 👤 IC View — Individual Contributor

Pick any developer + any month and get:

- 5 DORA-backed metrics at a glance
- Radar chart: multi-dimensional profile
- Month-over-month trend lines
- PR detail cards: wait time, merge time, lines, review rounds
- Bug log with severity & root cause
- Plain-English interpretation of your pattern
- 2–3 tailored, specific next steps

</td>
<td width="50%" valign="top">

### 📊 Manager View — Team Health

Your team's pulse from 30,000 ft:

- Summary cards: healthy / watch / avg cycle / avg bug rate
- Bar chart: cycle & lead time across all devs
- Scatter plot: spot outliers instantly
- Per-team rollup averages
- Sortable developer table + drill-down to IC view
- Responsible-use note baked in

</td>
</tr>
</table>

---

## 📐 The 5 Metrics

> Chosen based on DORA research. Each one tells a specific slice of the story.

| Metric | Definition |
|---|---|
| ⚡ **Lead Time** | Avg days from PR open → production deployment |
| 🔄 **Cycle Time** | Avg days from In Progress → Done in Jira |
| 🐛 **Bug Rate** | Escaped prod bugs ÷ issues completed |
| 🚀 **Deploy Frequency** | Count of successful prod deployments |
| 📬 **PR Throughput** | Count of merged pull requests in the month |

---

## 🤖 Interpretation Engine

The `interpretMetrics()` function reads each developer's data pattern and generates **human-readable stories** — not just numbers.

Three patterns are detected automatically:

```
✅  Healthy Flow     —  metrics within expected range
⚠️  Quality Watch   —  elevated bug rate or review churn
🔴  Needs Review    —  multiple signals outside healthy thresholds
```

**Threshold logic:**

```
Cycle Time  > 5.5d  →  Flags slow execution; suggests issue decomposition
Lead Time   > 4.5d  →  Flags pipeline delay; suggests proactive reviewer pings
Bug Rate    > 30%   →  Flags quality risk; suggests edge-case testing & pair review
Bug Rate    = 0%    →  Positive reinforcement; encourages stretch goals
```

---

## 🗄️ Data Source

All data is sourced from the provided workbook and pre-processed into a static JS module — functionally equivalent to a REST API. **One line change to go live.**

**Tables used:**

```
Dim_Developers      ·  Fact_Jira_Issues      ·  Fact_Pull_Requests
Fact_CI_Deployments ·  Fact_Bug_Reports
```

---

## 🛠 Tech Stack

| Layer | Choice | Why |
|---|---|---|
| **Frontend** | React 18 + Vite | Fast DX, component-based, hot reload |
| **Styling** | Tailwind CSS | Utility-first, consistent spacing system |
| **Charts** | Recharts | Composable, React-native, no canvas hacks |
| **Icons** | Lucide React | Clean, consistent, tree-shakeable |
| **Fonts** | Syne + DM Sans | Distinctive display + readable body |
| **Data** | Static JS module | Focused scope; trivially swappable to REST |

---

## 🚀 Getting Started

```bash
# Install dependencies
npm install

# Start dev server → localhost:3000
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

> 💡 **Zero-install option:** Open `standalone.html` directly in any browser. No npm, no build step. Drops in and works.

---

## 🗂 Project Structure

```
devpulse/
├── index.html              ← Entry HTML with Google Fonts
├── standalone.html         ← Zero-dependency single-file build
├── vite.config.js          ← Vite + React plugin
├── tailwind.config.js      ← Tailwind with custom fonts
├── package.json
└── src/
    ├── main.jsx            ← React entry point
    ├── App.jsx             ← Root + view routing
    ├── index.css           ← Global styles + Tailwind
    ├── data/
    │   └── metrics.js      ← All data + interpretation engine
    └── components/
        ├── ICView.jsx       ← Individual Contributor view
        └── ManagerView.jsx  ← Manager team overview
```

---

## ⚖️ Responsible Use

> DevPulse is built with an explicit responsible-use philosophy baked into both views.

- → Insights are **starting points for reflection**, not performance verdicts.
- → Rankings are for **trend-spotting**, not ranking humans.
- → Context — on-call load, team complexity, scope — **always matters.**

---

## 🗺️ Roadmap — *If I Had One More Week*

| | Feature | Description |
|---|---|---|
| 🔌 | **Real Backend** | Node/Express or FastAPI — swap mock import for `fetch('/api/metrics')`. One line. |
| 📅 | **6-Month Trends** | Historical arcs — see where a developer's been, not just where they are. |
| 🔔 | **Slack Digests** | Weekly pattern summaries pushed directly to each developer's DM. |
| 🚨 | **Anomaly Alerts** | Alert when any metric shifts >20% week-over-week. Catch drift early. |

---

<div align="center">

Built by **Leona Goel** · [The ProductWorks.in](https://theproductworks.in) · DevPulse MVP · May 2026

</div>
