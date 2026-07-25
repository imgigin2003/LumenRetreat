# 🏔️ Lumen Retreat

> **Where every stay begins with a warm light in the pines.**

Lumen Retreat is a boutique resort management dashboard with a midnight-luxury aesthetic and hand-built 3D scenes. Manage cabins, bookings and guests through glassmorphic UI, animated charts and procedurally-generated low-poly cabins you can orbit in real time — no external 3D model files, every polygon written in code.

---

## ✨ Features

### 🌲 Procedural 3D Scenes

- **Login Hero** — A moonlit cabin turntable with pines, drifting stars and warm window glow
- **Interactive Cabin Viewer** — Orbit, zoom and inspect each cabin in 3D, materials shifting by tier
- **Ambient Header Orb** — A distorted glass sphere that leans toward your cursor
- **Zero Model Files** — Every mesh is primitive geometry authored in React Three Fiber
- **Performance-First** — Capped DPR, low poly counts, and render loops that pause when the tab hides

### 📊 The Dashboard

- **Animated KPIs** — Bookings, revenue, check-ins and occupancy counting up on load
- **Revenue Chart** — Gold/teal gradient area chart across 7, 30 or 90 days
- **Stay Duration Donut** — See at a glance how long guests linger
- **Today's Activity** — Live arrivals and departures with one-tap check-in / check-out

### 🛏️ Bookings & Cabins

- **Sortable Table** — Filter by status, sort any column, paginated results
- **Booking Detail** — Full stay breakdown with a visual status timeline
- **Breakfast at Check-In** — Add breakfast and watch the total recalculate
- **Cabin CRUD** — Create, edit, duplicate and delete cabins through validated modal forms
- **Category Theming** — Standard, Deluxe and Luxury each get their own 3D palette

### 🎨 Design System

- **Midnight Retreat Palette** — Deep ink backgrounds, warm amber accents, soft teal secondary
- **Light Mode** — A warm daylight theme one toggle away; dark is the showcase
- **Elegant Type** — Fraunces display serif paired with Inter for UI
- **Every State Covered** — Shimmer skeletons, empty states and error states on every data view
- **Toasts Everywhere** — Every mutation confirms itself

---

## 🛠️ Tech Stack

| Layer         | Technology                        |
| ------------- | --------------------------------- |
| Framework     | React 18, Vite, TypeScript        |
| Styling       | Tailwind CSS v3, CSS custom props |
| 3D            | React Three Fiber, drei, Three.js |
| Animation     | Framer Motion                     |
| Server State  | TanStack Query v5                 |
| Charts        | Recharts                          |
| Routing       | React Router v6                   |
| Forms         | React Hook Form                   |
| Icons         | Lucide React                      |
| Notifications | React Hot Toast                   |
| Data          | Local JSON seed + in-memory store |

---

## 📁 Project Structure

```
LumenRetreat/
└── src/
    ├── features/          # Feature-based modules
    │   ├── auth/          # Demo login, protected routes
    │   ├── dashboard/     # KPIs, charts, today's activity
    │   ├── bookings/      # Table, filters, detail, check-in/out
    │   ├── cabins/        # Cabin grid, 3D viewer, CRUD forms
    │   ├── guests/        # Guest directory
    │   └── settings/      # Retreat configuration
    ├── three/             # 3D scenes, cabin model, palettes
    ├── ui/                # Reusable primitives (Button, Modal, Skeleton…)
    ├── layout/            # Sidebar, top bar, mobile nav
    ├── pages/             # Route entry points
    ├── services/          # Data access layer (mock API)
    ├── lib/               # Mock DB, query client
    ├── data/              # seed.json — cabins, guests, settings
    ├── hooks/             # Shared custom hooks
    ├── context/           # Theme provider
    ├── types/             # Domain types
    └── utils/             # Helpers, constants
```

---

## ⚙️ Installation & Setup

1. **Clone the repository:**

```bash
git clone https://github.com/imgigin2003/LumenRetreat.git
cd LumenRetreat
```

2. **Install dependencies:**

```bash
npm install
```

3. **Start the dev server:**

```bash
npm run dev
```

> Runs on `http://localhost:5173` — no database, no environment variables, no backend required.

4. **Build for production:**

```bash
npm run build
npm run preview
```

---

## 🔑 Demo Access

The app ships with a pre-seeded demo account — the login fields are **already filled in**, just press **Sign in**.

| Field    | Value             |
| -------- | ----------------- |
| Email    | `admin@gmail.com` |
| Password | `adminpass`       |

> All data lives in memory, seeded from `src/data/seed.json` with ~50 bookings generated around *today* so the charts always look alive. Create, edit and delete freely — a refresh restores the original retreat.

---

## 🏡 Cabin Tiers

| Tier     | Palette                              |
| -------- | ------------------------------------ |
| Standard | Cool slate walls, pale glass windows |
| Deluxe   | Teal timber, mint window glow        |
| Luxury   | Warm timber, brass door, amber glow  |

---

## 🗺️ Roadmap

- [x] Design system — midnight palette, glass cards, light/dark themes
- [x] Procedural 3D cabin, login hero & ambient orb
- [x] Dashboard with animated KPIs and charts
- [x] Bookings table, detail view & check-in flow
- [x] Cabins grid with interactive 3D viewer & CRUD
- [x] Guests directory with nationality flags
- [x] Settings & account management
- [x] Fully responsive — sidebar collapses to bottom nav

---

## 🤝 Contributing

This project is a portfolio piece and a playground for 3D on the web. Fork it, spin the cabins, and open an issue or PR if you find something worth improving.

---

_Rest well. 🌙🏔️_
