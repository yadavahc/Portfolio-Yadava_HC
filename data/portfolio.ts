// Central content source for the portfolio — all data extracted from RESUME_INFO_PORTFOLIO.

export const profile = {
  name: "Yadava H C",
  firstName: "Yadava",
  roles: [
    "Full Stack Developer",
    "AI Application Builder",
    "Problem Solver",
  ],
  tagline:
    "Full Stack Developer crafting AI-powered products — turning ambitious ideas into shipped, award-winning experiences.",
  location: "Bengaluru, India",
  email: "yadavahc333@gmail.com",
  phone: "8904030441",
  image: "/images/YadavaProfilePhoto.png",
  resumeHighlights: [
    { value: "9.0", label: "CGPA" },
    { value: "10+", label: "Hackathon Wins & Finals" },
    { value: "150+", label: "DSA Problems Solved" },
    { value: "1000+", label: "Students Impacted" },
  ],
};

export const socials = {
  github: "https://github.com/yadavahc",
  linkedin:
    "https://www.linkedin.com/in/yadava-hc-907067287?utm_source=share_via&utm_content=profile&utm_medium=member_android",
  leetcode: "https://leetcode.com/u/uDbVJTA37J/",
  gfg: "https://www.geeksforgeeks.org/profile/yadavahc",
  tuf: "https://takeuforward.org/profile/yadava_h_c",
  email: "mailto:yadavahc333@gmail.com",
};

export const about = {
  intro:
    "I'm Yadava H C, an Information Science engineering student and Full Stack Developer based in Bengaluru. I build AI-powered, production-grade web applications — from multilingual legal assistants to smart-campus energy platforms — and I love translating real problems into clean, scalable products. My work has been recognized at national hackathons and India's first AI Agent Builders Award.",
  education: [
    {
      school: "The Oxford College of Engineering, Bengaluru",
      degree: "B.E. — Information Science & Engineering",
      score: "CGPA: 9.0",
      duration: "2023 – 2027",
    },
    {
      school: "Kumarans PU College, Bengaluru",
      degree: "Pre-University Course (PUC)",
      score: "Percentage: 95%",
      duration: "2021 – 2023",
    },
    {
      school: "MMVS High School, Bengaluru",
      degree: "Secondary School Leaving Certificate (SSLC)",
      score: "Percentage: 97.12%",
      duration: "2011 – 2021",
    },
  ],
};

export type SkillGroup = {
  category: string;
  skills: { name: string; icon: string }[];
};

// icon = react-icons key (resolved in component). Using simple-icons (si) + a few fa fallbacks.
export const skillGroups: SkillGroup[] = [
  {
    category: "Languages",
    skills: [
      { name: "C++", icon: "SiCplusplus" },
      { name: "Java", icon: "FaJava" },
      { name: "Python", icon: "SiPython" },
      { name: "JavaScript", icon: "SiJavascript" },
    ],
  },
  {
    category: "Frontend",
    skills: [
      { name: "HTML", icon: "SiHtml5" },
      { name: "CSS", icon: "SiCss3" },
      { name: "Bootstrap", icon: "SiBootstrap" },
      { name: "Tailwind CSS", icon: "SiTailwindcss" },
      { name: "React.js", icon: "SiReact" },
      { name: "Next.js", icon: "SiNextdotjs" },
    ],
  },
  {
    category: "Backend & Data",
    skills: [
      { name: "Node.js", icon: "SiNodedotjs" },
      { name: "Express.js", icon: "SiExpress" },
      { name: "MySQL", icon: "SiMysql" },
      { name: "MongoDB", icon: "SiMongodb" },
      { name: "Firebase", icon: "SiFirebase" },
      { name: "Supabase", icon: "SiSupabase" },
      { name: "Convex", icon: "SiConvex" },
      { name: "Inngest", icon: "SiInngest" },
      { name: "REST APIs", icon: "TbApi" },
      { name: "JWT", icon: "SiJsonwebtokens" },
    ],
  },
  {
    category: "Tools & Cloud",
    skills: [
      { name: "Git", icon: "SiGit" },
      { name: "GitHub", icon: "SiGithub" },
      { name: "Docker", icon: "SiDocker" },
      { name: "VS Code", icon: "TbBrandVscode" },
      { name: "Vercel", icon: "SiVercel" },
      { name: "Netlify", icon: "SiNetlify" },
      { name: "AWS", icon: "FaAws" },
      { name: "OCI Cloud", icon: "SiOracle" },
    ],
  },
  {
    category: "Core Concepts",
    skills: [
      { name: "DSA", icon: "TbBinaryTree" },
      { name: "OOP", icon: "TbBox" },
      { name: "DBMS", icon: "TbDatabase" },
      { name: "Operating Systems", icon: "TbCpu" },
      { name: "Computer Networks", icon: "TbNetwork" },
      { name: "System Design", icon: "TbTopologyStar3" },
    ],
  },
];

export type Project = {
  title: string;
  stack: string;
  description: string;
  highlights: string[];
  image: string;
  github?: string;
  live?: string;
  accent: string;
};

export const projects: Project[] = [
  {
    title: "Legal Saathi",
    stack: "Next.js · TypeScript · Firebase · OpenAI · Qdrant · Sarvam AI",
    description:
      "AI-powered multilingual legal assistance platform for legal document analysis, AI chat, OCR, voice interaction, and legal form generation.",
    highlights: [
      "RAG pipeline with Qdrant, OpenAI, Tesseract.js, Sarvam AI & Vapi for document-grounded answers",
      "Finalist at HackBLR 2026",
      "Winner — AI Agent Builders Award 2026 (Most Impactful Use Case)",
    ],
    image: "/images/Legal_Saathi_Project.jpeg",
    github: "https://github.com/yadavahc/Hack-Blr",
    live: "https://hack-blr-seven.vercel.app/",
    accent: "#bcbcc6",
  },
  {
    title: "WattWatch",
    stack: "Next.js · Firebase · TensorFlow.js · OpenAI",
    description:
      "AI-powered smart campus energy monitoring platform that optimizes energy consumption and classroom management.",
    highlights: [
      "Occupancy detection, appliance monitoring & room confirmation",
      "Energy analytics with AI-generated insights via TensorFlow.js & Firebase",
      "Secured 2nd Place at OxyHack 2026",
    ],
    image: "/images/Wattwatch_Oxyhack_Project.jpeg",
    github: "https://github.com/yadavahc/wattwatch",
    live: "https://wattwatch-lemon.vercel.app/",
    accent: "#c6c2bc",
  },
  {
    title: "Sense-AI",
    stack: "Next.js · Gemini AI · Clerk · PostgreSQL",
    description:
      "AI-powered career assistant for resume generation, cover-letter creation, interview prep, and personalized career guidance.",
    highlights: [
      "Gemini AI integrated with a scalable frontend architecture",
      "Automates career workflows to improve user productivity",
    ],
    image: "/images/Sense_Ai_Project.jpeg",
    github: "https://github.com/yadavahc/sense-ai",
    live: "https://sense-ai-silk.vercel.app/",
    accent: "#bcc6c2",
  },
  {
    title: "OxyVerse-VTU",
    stack: "HTML · CSS · JavaScript · Firebase",
    description:
      "Centralized academic platform delivering VTU notes, model papers, scholarship updates, and CGPA/SGPA calculators.",
    highlights: [
      "Served 1,000+ students across 15+ colleges",
      "Responsive resource & scholarship hub",
    ],
    image: "/images/Oxyverse-Project.png",
    live: "https://oxyverse-vtu-notes.netlify.app/",
    accent: "#c2bcc6",
  },
];

export type Experience = {
  company: string;
  role: string;
  period: string;
  website?: string;
  points: string[];
};

export const experiences: Experience[] = [
  {
    company: "Appsetz",
    role: "Full Stack Developer",
    period: "Oct 2025 – Present",
    website: "https://www.appsetz.pro/",
    points: [
      "Developed responsive web applications using React.js, Next.js, Node.js, Express.js, MongoDB & Tailwind CSS.",
      "Built Vriddhi Psychological Services — improving service module organization, UI accessibility & UX.",
      "Contributed to Implanto 365, a clinic management system with patient records, appointment scheduling, treatment tracking & analytics.",
      "Designed an SEO-optimized corporate website for Sunwin Power Solutions, improving visibility & lead generation.",
      "Built OxyVerse, a VTU student resource platform with study materials, CGPA calculators & scholarship updates.",
    ],
  },
  {
    company: "Kiran Foundation",
    role: "Web Developer Intern",
    period: "Jan 2024 – Apr 2024",
    website: "https://kiran.foundation/",
    points: [
      "Developed and optimized the organization's website using Astro, improving performance & responsiveness.",
      "Implemented a dynamic blog module and customized the Around theme from Figma designs.",
      "Improved accessibility, UI consistency & overall UX while collaborating with the development team.",
    ],
  },
];

export type Achievement = {
  title: string;
  detail: string;
  image: string;
};

export const achievements: Achievement[] = [
  {
    title: "AI Agent Builders Award 2026",
    detail:
      "2nd Place — India's First AI Agent Builders Award, Most Impactful Use Case for Legal Saathi.",
    image: "/images/AI_Agent_Builder_Award_2026.jpg",
  },
  {
    title: "OxyHack 2026",
    detail: "2nd Place — OxyHack 2026 Hackathon; competed among 150+ teams.",
    image: "/images/OXY-HACK_winning_moment.jpeg",
  },
  {
    title: "Devkreeda 2026",
    detail:
      "2nd Place — Devkreeda 2026 Game Development Competition, Anokha 2026, TOCE.",
    image: "/images/Anokha_Devkreeda_Winning_Moment.jpeg",
  },
  {
    title: "Google Gemini Arena",
    detail:
      "Winner — Top Prompt Creator, Pitch Night Edition; selected for the national dashboard by Google Student Ambassador Network.",
    image: "/images/Google_Prompt_Edition_Certificate.jpeg",
  },
  {
    title: "Cypher Quest 2026",
    detail:
      "Finalist — National-Level Hackathon; Top 8 of 200+ teams from 20+ colleges.",
    image: "/images/Cypher_Quest_Finale.jpeg",
  },
  {
    title: "CSI Web Hackathon",
    detail: "3rd Place — CSI Web Hackathon.",
    image: "/images/CSI_WEB_Hackathon_Certificate.jpg",
  },
  {
    title: "Devkreeda Finale Moment",
    detail: "On-stage at Anokha 2026, The Oxford College of Engineering.",
    image: "/images/Anokha_Devkreeda_Certficate.jpeg",
  },
];

// Achievements that have no image but still matter (rendered as text badges).
export const achievementBadges = [
  "Finalist — HackBLR National Hackathon · Top 30 of 2,000+ participants",
  "2nd Place — InnovateX Ideathon 2024, BMS College of Engineering",
];

export type Cert = {
  title: string;
  issuer: string;
  skills: string;
  image: string;
  link?: string;
};

export const certificates: Cert[] = [
  {
    title: "OCI AI Foundations Associate",
    issuer: "Oracle",
    skills:
      "OCI · Generative AI · LLMs · Prompt Engineering · AI Services · Responsible AI",
    image: "/images/Oracle_AI_Foundation_Associate_CERTIFICATE.png",
    link: "https://catalog-education.oracle.com/ords/certview/sharebadge?id=0AAC00EEBB74D2A49548CEA6A5D1A11B5758BFF1BA8E5A6DB31AF0DB7C83A308",
  },
  {
    title: "AI Agent Architect",
    issuer: "IBM",
    skills:
      "AI Agents · Agentic AI · Multi-Agent Systems · LLM Apps · AI Workflows",
    image: "/images/IBM_AI_Agent_Certificate.png",
    link: "https://skills.yourlearning.ibm.com/certificate/share/81b6e8271aewogICJvYmplY3RJZCIgOiAiUExBTi0zQjczNDdFNkQzQzAiLAogICJsZWFybmVyQ05VTSIgOiAiNTAyNzY5OVJFRyIsCiAgIm9iamVjdFR5cGUiIDogIkFDVElWSVRZIgp905df7be00d-10",
  },
  {
    title: "Introduction to Generative AI",
    issuer: "Google",
    skills:
      "Generative AI · Foundation Models · LLMs · AI Applications · Responsible AI",
    image: "/images/Introduction_to_genai_google.png",
    link: "https://www.skills.google/profile/badges",
  },
  {
    title: "SQL (Basic)",
    issuer: "HackerRank",
    skills: "SQL · Joins · Aggregate Functions · Query Optimization",
    image: "/images/Hacker_Rank_SQL_Certificate.png",
    link: "https://www.hackerrank.com/certificates/d44427be88ec",
  },
  {
    title: "CSS",
    issuer: "HackerRank",
    skills: "CSS3 · Flexbox · Responsive Design · Box Model · Selectors",
    image: "/images/Hacker_Rank_CSS_Certficate.png",
    link: "https://www.hackerrank.com/certificates/4f85306f4633",
  },
  {
    title: "Getting Started with AI",
    issuer: "IBM",
    skills: "AI · ML Fundamentals · LLMs · AI Ethics · AI Use Cases",
    image: "/images/Getting_Started_with_AI_IBM.png",
    link: "https://www.credly.com/badges/773f7127-3396-423b-9a04-73edb458fd0a/public_url",
  },
];

export type DsaNode = {
  platform: string;
  solved: string;
  count: number;
  note: string;
  image: string;
  link: string;
  icon: string;
};

export const dsaJourney: DsaNode[] = [
  {
    platform: "Take U Forward (TUF)",
    solved: "125+",
    count: 125,
    note: "Solved across Easy, Medium & Hard difficulty levels.",
    image: "/images/Tuf_Profile.png",
    link: "https://takeuforward.org/profile/yadava_h_c",
    icon: "TbCode",
  },
  {
    platform: "GeeksforGeeks",
    solved: "100+",
    count: 100,
    note: "Strengthened core Data Structures & Algorithms concepts.",
    image: "/images/GFG_Profile_DSA.png",
    link: "https://www.geeksforgeeks.org/profile/yadavahc",
    icon: "SiGeeksforgeeks",
  },
  {
    platform: "LeetCode",
    solved: "70+",
    count: 70,
    note: "Earned the 50 Days Badge for consistent coding practice.",
    image: "/images/Leetcode_Profile.png",
    link: "https://leetcode.com/u/uDbVJTA37J/",
    icon: "SiLeetcode",
  },
];

export const dsaTotal = 150;

export type Volunteering = {
  org: string;
  role: string;
  image: string;
  points: string[];
};

export const volunteering: Volunteering[] = [
  {
    org: "Youth For Seva (YFS)",
    role: "Volunteer",
    image: "/images/YFS_Chiguru_Event.jpeg",
    points: [
      "Volunteered at CHIGURU, supporting government school children across Karnataka.",
      "Mentored students, painted & renovated schools, and joined community service initiatives.",
    ],
  },
  {
    org: "Kiran Foundation",
    role: "Scholar & Volunteer",
    image: "/images/Kiran_Foundation_Volunteering.jpeg",
    points: [
      "Assisted in selection & evaluation of Kiran Pratibha Scholarship applicants (Karnataka chapter).",
      "Contributed to building & maintaining the Kiran Foundation website.",
      "Took part in scholarship outreach & student mentoring.",
    ],
  },
  {
    org: "E-Cell IIT Bombay, TOCE Chapter",
    role: "Core Member",
    image: "/images/ECELL_EVENT_TOCE.jpeg",
    points: [
      "Managed & optimized social media campaigns to promote entrepreneurship.",
      "Supported planning & execution of events with data-driven marketing.",
    ],
  },
  {
    org: "VP Culture Club",
    role: "Event Coordinator",
    image: "/images/VP_Culture_Club_Badge.png",
    points: [
      "Organized cultural events, workshops & student engagement activities.",
      "Collaborated with student teams to execute campus programs.",
    ],
  },
];

export const navLinks = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#projects" },
  { label: "Experience", href: "#experience" },
  { label: "Achievements", href: "#achievements" },
  { label: "DSA", href: "#dsa" },
  { label: "Certificates", href: "#certificates" },
  { label: "Contact", href: "#contact" },
];
