# Yadava H C — Developer Portfolio

A premium, dark-themed personal portfolio for **Yadava H C** — Full Stack Developer & AI application builder. Built with **Next.js 14 (App Router)** and **TypeScript**, featuring an immersive, animated, fully responsive single-page experience with a consistent black / white / silver-metallic theme.

🔗 **Repository:** https://github.com/yadavahc/Portfolio-Yadava_HC

---

## ✨ Features

- **Immersive hero** — an animated *developer-at-a-laptop* scene where the screen **types live code** character-by-character, with floating tech-stack icons and a lightweight **canvas node-network** background that reacts to the cursor.
- **A unique animation per section:**
  - **About & Education** — scroll-progress timeline with animated stat cards.
  - **Technical Skills** — dual auto-scrolling marquees + an interactive category explorer.
  - **Projects** — an **auto-playing featured carousel** with sliding transitions, Ken-Burns image zoom, and an auto-progress bar.
  - **Experience** — a 3D "unfold" timeline with gently floating cards and a pulsing node.
  - **Achievements** — an infinite, continuously-scrolling image marquee.
  - **DSA Journey** — an interactive roadmap with animated count-ups and progress bars.
  - **Certificates** — a 3D **coverflow carousel** that auto-rotates through credentials.
  - **Volunteering** — split image/content cards.
  - **Contact** — a working contact form + an animated footer "terminal" scene (typewriter, paper plane, code tokens, twinkling stars).
- **Working contact form** — sends messages straight to email via [Web3Forms](https://web3forms.com) (no backend required), with validation, spam honeypot, and loading/success/error states.
- **Smooth scrolling** via Lenis, scroll-progress bar, active-section nav highlighting, and a mobile menu.
- **Fully responsive** (mobile → desktop) and respects `prefers-reduced-motion`.
- **SEO & metadata** — Open Graph tags, theme color, and semantic markup.

---

## 🛠 Tech Stack

| Area | Technologies |
|------|--------------|
| Framework | Next.js 14 (App Router), React 18, TypeScript |
| Styling | Tailwind CSS, custom design tokens |
| Animation | Framer Motion, HTML Canvas, CSS keyframes |
| Smooth scroll | Lenis |
| Icons | react-icons (Feather, Simple Icons, Tabler) |
| Forms | Web3Forms |
| Fonts | Inter + Space Grotesk (`next/font`) |

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18.17+ (Node 20/22 recommended)
- npm

### Install & run

```bash
# install dependencies
npm install

# start the dev server
npm run dev
# → http://localhost:3000

# production build & start
npm run build
npm start
```

---

## 🔑 Environment Variables

The contact form needs a free **Web3Forms** access key (linked to your email).

1. Create an account at https://web3forms.com and copy your **Access Key**.
2. Create a `.env.local` file in the project root:

```env
NEXT_PUBLIC_WEB3FORMS_KEY=your-web3forms-access-key
```

3. Restart the dev server.

> Without a key, the form gracefully shows a "not configured" message and asks visitors to email directly. `.env.local` is git-ignored; set the same variable in your hosting provider's dashboard for production.

---

## 📁 Project Structure

```
.
├── app/
│   ├── layout.tsx          # root layout, fonts, metadata, smooth scroll
│   ├── page.tsx            # assembles all sections
│   └── globals.css         # theme tokens & global styles
├── components/
│   ├── Navbar.tsx          # sticky nav + mobile menu + scroll progress
│   ├── SmoothScroll.tsx    # Lenis integration
│   ├── hero/               # Hero, CodingScene (laptop), TechBackground
│   ├── sections/           # About, Skills, Projects, Experience,
│   │                       # Achievements, DsaJourney, Certificates,
│   │                       # Volunteering, Contact, ContactForm, FooterScene
│   └── ui/                 # Reveal, SectionHeading, SkillIcon
├── data/
│   └── portfolio.ts        # single source of truth for all content
├── public/images/          # profile, project, achievement & certificate images
└── tailwind.config.ts
```

---

## ✏️ Editing Content

All text, links, projects, experience, certificates, achievements, skills, and DSA stats live in **`data/portfolio.ts`** — update that one file to change site content. Images go in `public/images/`.

---

## ☁️ Deployment

Optimized for **Vercel**:

1. Push to GitHub.
2. Import the repo on [Vercel](https://vercel.com).
3. Add the `NEXT_PUBLIC_WEB3FORMS_KEY` environment variable.
4. Deploy.

Also deployable to Netlify or any Node host that supports Next.js.

---

## 📬 Contact

**Yadava H C** — Full Stack Developer
- Email: yadavahc333@gmail.com
- GitHub: [@yadavahc](https://github.com/yadavahc)
- LinkedIn: [Yadava H C](https://www.linkedin.com/in/yadava-hc-907067287)

---

© Yadava H C. All rights reserved.
