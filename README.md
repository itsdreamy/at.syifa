# at.syifa — Personal Interactive Portfolio & Digital Studio

An interactive, responsive personal portfolio and digital studio designed with a sophisticated monochrome editorial aesthetic (inspired by [Möbius Studio](https://mobius.framer.website/)) combined with playful interactive features: a floating 3D Capybara Assistant and an interactive Capybara Swimming Pool with water ripple physics.

---

## ✦ Key Highlights & Features

- **Monochrome Editorial Visual System**:
  - Warm neutral canvas (`#F7F7F5`), near-black typography (`#171717`), hairline borders (`#E5E5E5`), and subtle accents.
  - Expressive headlines powered by **Instrument Serif** paired with clean, accessible **Inter** body typography.
  - **Möbius-inspired Architectural Grid**: Press <kbd>Ctrl</kbd> + <kbd>G</kbd> (or <kbd>Cmd</kbd> + <kbd>G</kbd>) anywhere on the site to toggle the visual grid alignment overlay.

- **Signature Interactive Elements**:
  - **Floating Capybara Assistant**: Recurring mascot with event-driven speech bubbles introducing the creator's background, achievements (GPA 3.97), published npm package, and swimming pool invitation. Clickable, draggable, dismissible, and responsive.
  - **Interactive Capybara Pool**: A tranquil pool positioned directly before the Contact section. Touch or drag across the water surface to create animated ripples; the capybara on its donut float smoothly tracks touch/mouse coordinates with spring-interpolated physics, with contextual dialogue states and reduced-motion mode.

- **Content & Showcase Sections**:
  1. **Hero**: Immediate personal identity, status indicator (*Open to opportunities*), quick metrics (GPA 3.97, <1.8 KB npm package, 100% QC compliance).
  2. **About Me**: Design philosophy, frontend engineering craft, quality control standards, and technical writing.
  3. **Selected Work**: Organic 3-column floating project cards with staggered vertical rhythms, hover micro-interactions, category filters, and full case study pages (`/work/:slug`).
  4. **Experience & Contributions**: Published npm package, Quality Control (QC) validation, and SaaS technical writing.
  5. **Achievements & Academic Highlights**: GPA 3.97 (Summa Cum Laude), institutional merit scholarship, national competition achievements, and interactive photo lightbox previews.
  6. **Volunteer Experience**: Community mentoring and digital accessibility initiatives with photographic evidence.
  7. **Editorial Feed (Optional)**: In-depth technical articles and design insights with reading times and markdown formatting.
  8. **The Capybara Pool**: Signature relaxing interaction.
  9. **Contact & Footer**: Direct email links, LinkedIn, GitHub, smooth back-to-top interaction.

- **Full-Stack REST Architecture**:
  - Clean monorepo separating React client from Express backend.
  - Express.js delivers structured JSON for all portfolio entities (`/api/projects`, `/api/experiences`, `/api/achievements`, `/api/volunteer`, `/api/articles`, `/api/health`).
  - Seamless fallback data layer ensures zero broken views even during server cold starts or standalone static previews.

---

## 🛠 Tech Stack

### Frontend (`client/`)
- **Framework**: React 18 + Vite
- **Styling**: Tailwind CSS + Custom CSS Variables
- **Animations**: Framer Motion + CSS keyframes
- **Icons**: Lucide React
- **Routing**: React Router v6

### Backend (`server/`)
- **Runtime**: Node.js
- **Server**: Express.js
- **CORS**: Configurable origin middleware
- **Architecture**: Modular routes, controllers, and centralized error handling

---

## 📂 Project Architecture

```
at-syifa/
├── client/
│   ├── public/
│   │   ├── assets/
│   │   │   ├── capybara/       # Capybara mascot and pool graphics
│   │   │   ├── projects/       # Architectural preview diagrams & covers
│   │   │   └── achievements/   # Academic, competition, and volunteer photos
│   │   ├── robots.txt
│   │   └── sitemap.xml
│   ├── src/
│   │   ├── components/
│   │   │   ├── capybara/       # CapybaraAssistant.jsx & CapybaraPool.jsx
│   │   │   ├── common/         # GridOverlay.jsx & ImageModal.jsx
│   │   │   ├── navigation/     # Navbar.jsx & Footer.jsx
│   │   │   └── projects/       # ProjectCard.jsx & ProjectGallery.jsx
│   │   ├── pages/              # HomePage, WorkPage, ProjectDetailPage, FeedPage, ArticleDetailPage
│   │   ├── services/           # api.js (REST API client)
│   │   ├── data/               # portfolioData.js (fallback & dialogue constants)
│   │   ├── styles/             # index.css (custom ripples, bobbing, scrollbars)
│   │   ├── App.jsx             # Animated routes & global shell
│   │   └── main.jsx
│   ├── tailwind.config.js
│   └── vite.config.js
│
├── server/
│   ├── controllers/            # portfolioController.js
│   ├── routes/                 # api.js
│   ├── middleware/             # errorHandler.js
│   ├── data/                   # projects.json, experiences.json, achievements.json, volunteer.json, articles.json
│   └── server.js               # Express application entrypoint
│
├── portfolio-assets/           # Source authentic images and mascots
├── package.json                # Root scripts and workspace orchestration
└── README.md
```

---

## 🚀 Getting Started

### 1. Prerequisites
- Node.js (v18.0.0 or higher recommended)
- npm (v9.0.0 or higher)

### 2. Installation
Install all dependencies across root, server, and client:
```bash
npm run install:all
```

### 3. Running in Development
Start both the Express backend (`http://localhost:5000`) and the Vite client (`http://localhost:5173`) simultaneously:
```bash
npm run dev
```

Or run them individually in separate terminal sessions:
```bash
# Terminal 1: Backend API
npm run dev:server

# Terminal 2: Vite Client
npm run dev:client
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

---

## 📡 Backend API Reference

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/api/health` | Health check endpoint returning status and timestamp |
| `GET` | `/api/projects` | List all portfolio projects |
| `GET` | `/api/projects/:slug` | Retrieve single project case study by slug or id |
| `GET` | `/api/experiences` | Retrieve professional experiences (QC, npm, Technical Writing) |
| `GET` | `/api/achievements` | Retrieve academic honors, GPA 3.97, and competition awards |
| `GET` | `/api/volunteer` | Retrieve community volunteer records and contributions |
| `GET` | `/api/articles` | Retrieve editorial articles and research notes |
| `GET` | `/api/articles/:slug` | Retrieve article content by slug |

All endpoints return standardized JSON:
```json
{
  "success": true,
  "data": [ ... ],
  "message": "Projects retrieved successfully"
}
```

---

## 🌐 Deployment Instructions

### Deploying the Frontend (Cloudflare Pages or Vercel)
1. Push this repository to **GitHub**.
2. Go to **Vercel** or **Cloudflare Pages** dashboard.
3. Select your repository.
4. Set the build settings:
   - **Framework Preset**: Vite
   - **Root Directory**: `client`
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
5. Set Environment Variable:
   - `VITE_API_URL`: Your deployed Express backend URL (e.g., `https://at-syifa-api.onrender.com`).

### Deploying the Backend (Render Free Web Service)
1. In the **Render Dashboard**, click **New + > Web Service**.
2. Connect your GitHub repository.
3. Configure the service settings:
   - **Root Directory**: `server`
   - **Environment**: `Node`
   - **Build Command**: `npm install`
   - **Start Command**: `node server.js`
4. Set Environment Variables:
   - `PORT`: `5000` (or leave default, Render sets `PORT` automatically)
   - `CLIENT_URL`: `https://your-frontend.pages.dev` or `*`
   - `NODE_ENV`: `production`

---

## 🎨 Design System Tokens

```css
:root {
  --background: #F7F7F5;   /* Warm off-white canvas */
  --surface: #FFFFFF;      /* Elevated cards & sheets */
  --foreground: #171717;   /* Near-black primary text */
  --secondary: #777777;    /* Neutral grey supporting copy */
  --muted: #A1A1A1;        /* Subtle timestamps & metadata */
  --border: #E5E5E5;       /* Hairline structural dividers */
  --dark: #171717;         /* High-contrast footer & hero accents */
  --capybara-brown: #B88A62;
  --donut-pink: #E9A6B7;
  --pool-blue: #B8DDE8;
}
```

---

## 📄 License & Attribution
Designed and built for **at.syifa**. All rights reserved.
