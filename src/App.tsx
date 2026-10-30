import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import AIInterface from "./AIInterface";
import {
  ArrowDown,
  ArrowDownRight,
  ArrowUpRight,
  ChevronDown,
  ChevronUp,
  Menu,
  X,
  Sparkles,
  Bot,
  Database,
} from "lucide-react";
import "./App.css";

interface NavItem {
  label: string;
  href: string;
}

const navigation: NavItem[] = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Toolkit", href: "#toolkit" },
  { label: "Projects", href: "#projects" },
  { label: "Experience", href: "#experience" },
  { label: "Engineering Focus", href: "#focus" },
  { label: "Contact", href: "#contact" },
];

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <motion.header
      className="navbar"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, ease: "easeOut" }}
    >
      <a
        href="#home"
        className="brand"
        aria-label="Kalp Shah home"
        onClick={() => setMenuOpen(false)}
      >
        KS<span>.</span>
      </a>

      <nav className={`nav-links ${menuOpen ? "nav-open" : ""}`}>
        {navigation.map((item) => (
          <a
            key={item.label}
            href={item.href}
            onClick={() => setMenuOpen(false)}
          >
            {item.label}
          </a>
        ))}
      </nav>

      <a href="#contact" className="nav-cta">
        Let's Talk <ArrowUpRight size={15} />
      </a>

      <button
        className="menu-toggle"
        onClick={() => setMenuOpen(!menuOpen)}
        aria-label={menuOpen ? "Close navigation" : "Open navigation"}
        aria-expanded={menuOpen}
      >
        {menuOpen ? <X size={22} /> : <Menu size={22} />}
      </button>
    </motion.header>
  );
}

function Hero() {
  const heroRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const hero = heroRef.current;
    if (!hero) return;
    const handleMouseMove = (event: MouseEvent) => {
      const rect = hero.getBoundingClientRect();

      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;

      hero.style.setProperty("--mouse-x", `${x}px`);
      hero.style.setProperty("--mouse-y", `${y}px`);
    };

    const handleMouseLeave = () => {
      hero.style.setProperty("--mouse-x", "-1000px");
      hero.style.setProperty("--mouse-y", "-1000px");
    };

    hero.addEventListener("mousemove", handleMouseMove);
    hero.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      hero.removeEventListener("mousemove", handleMouseMove);
      hero.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  return (
    <section ref={heroRef} className="hero" id="home">
      <div className="hero-grid" aria-hidden="true" />
      <div className="hero-spotlight" aria-hidden="true" />
      <div className="hero-glow" aria-hidden="true" />

      <motion.div
        className="hero-content"
        initial="hidden"
        animate="visible"
        variants={{
          hidden: {},
          visible: {
            transition: {
              staggerChildren: 0.12,
              delayChildren: 0.25,
            },
          },
        }}
      >
        <motion.div
          className="availability"
          variants={{
            hidden: { opacity: 0, y: 15 },
            visible: { opacity: 1, y: 0 },
          }}
        >
          <span className="status-dot" />
          <span>AI ENGINEERING PORTFOLIO</span>
          <span className="availability-divider">/</span>
          <span className="availability-year">2026</span>
        </motion.div>

        <motion.p
          className="hero-intro"
          variants={{
            hidden: { opacity: 0, y: 20 },
            visible: { opacity: 1, y: 0 },
          }}
        >
          Hello, I'm Kalp Shah.
        </motion.p>

        <motion.h1
          className="hero-title"
          variants={{
            hidden: { opacity: 0, y: 35 },
            visible: { opacity: 1, y: 0 },
          }}
          transition={{ duration: 0.8 }}
        >
          BUILDING
          <br />
          <span className="title-outline">INTELLIGENT</span>
          <br />
          SYSTEMS<span className="title-period">.</span>
        </motion.h1>

        <motion.div
          className="hero-bottom"
          variants={{
            hidden: { opacity: 0, y: 20 },
            visible: { opacity: 1, y: 0 },
          }}
        >
          <p className="hero-description">
            Engineering software solutions and exploring intelligent AI systems.
            <br className="desktop-break" />
            Specializing in RAG pipelines, agentic workflows, and backend architectures.
          </p>

          <div className="hero-status-grid">
            <div className="hero-status-item">
              <span className="hero-status-label">SYSTEM STATUS</span>
              <span className="hero-status-value">ONLINE</span>
            </div>
            <div className="hero-status-item">
              <span className="hero-status-label">FOCUS</span>
              <span className="hero-status-value">AI ENGINEERING</span>
            </div>
            <div className="hero-status-item">
              <span className="hero-status-label">SPECIALIZATION</span>
              <span className="hero-status-value">RAG / AGENTIC AI</span>
            </div>
            <div className="hero-status-item">
              <span className="hero-status-label">ENVIRONMENT</span>
              <span className="hero-status-value">BUILDING &amp; EXPERIMENTING</span>
            </div>
          </div>

          <div className="hero-ai-row">
            <AIInterface />
          </div>

          <div className="hero-actions">
            <a href="#projects" className="button button-primary">
              Explore Projects
              <ArrowUpRight size={17} />
            </a>

            <a href="#focus" className="button button-secondary">
              Engineering Focus
              <ArrowDownRight size={17} />
            </a>

            <a
              href="/resume.pdf"
              download
              className="hero-button hero-button-secondary"
            >
              <span>Download Resume</span>
              <ArrowDownRight size={17} />
            </a>
          </div>
        </motion.div>
      </motion.div>

      <motion.div
        className="hero-coordinate"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 1 }}
      >
        <span>AI ENGINEER</span>
        <span>CONTINUOUS BUILDER</span>
      </motion.div>

      <motion.a
        href="#about"
        className="scroll-indicator"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.3 }}
      >
        <span>SCROLL TO EXPLORE</span>
        <motion.span
          animate={{ y: [0, 6, 0] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
        >
          <ArrowDown size={16} />
        </motion.span>
      </motion.a>

      <div className="hero-index" aria-hidden="true">
        01 — 06
      </div>
    </section>
  );
}

function About() {
  return (
    <section className="section about-section" id="about">
      <div className="section-heading">
        <span className="section-label">01 / ABOUT ME</span>
        <span className="section-line" />
      </div>

      <div className="about-intro-grid">
        <motion.div
          className="about-main-copy"
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7 }}
        >
          <span className="about-eyebrow">AI &amp; SOFTWARE DEVELOPER</span>

          <h2 className="about-title">
            Curious by nature.
            <br />
            <span>Driven by code &amp; intelligence.</span>
          </h2>

          <p className="about-lead">
            I build software solutions and explore intelligent AI systems —
            from retrieval-augmented generation to autonomous agent architectures.
          </p>

          <p className="about-body">
            My technical focus encompasses AI and machine learning, RAG pipelines,
            agentic workflows, and LLM application development. In parallel, I engineer
            scalable backend APIs, design efficient database schemas, and experiment
            with computer vision.
          </p>

          <p className="about-body">
            My development philosophy is grounded in continuous learning: analyze
            architectural fundamentals, experiment methodically, and build practical
            software with every iteration.
          </p>

          <div className="about-principles">
            <span>01 / EXPLORE</span>
            <span>02 / ARCHITECT</span>
            <span>03 / DEPLOY</span>
          </div>
        </motion.div>

        <motion.div
          className="developer-terminal"
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7, delay: 0.15 }}
        >
          <div className="terminal-header">
            <div className="window-dots">
              <span />
              <span />
              <span />
            </div>

            <span>kalp@portfolio ~ </span>

            <span className="terminal-header-status">AI_CORE</span>
          </div>

          <div className="terminal-body">
            <div className="terminal-comment"># Developer profile</div>

            <div className="code-line">
              <span className="code-purple">class</span>{" "}
              <span className="code-white">AIEngineer</span>:
            </div>

            <div className="code-line code-indent">
              <span className="code-purple">def</span>{" "}
              <span className="code-blue">__init__</span>
              (self):
            </div>

            <div className="code-line code-indent-2">
              self.name = <span className="code-green">"Kalp Shah"</span>
            </div>

            <div className="code-line code-indent-2">
              self.focus = <span className="code-green">"AI Engineering"</span>
            </div>

            <div className="code-line code-indent-2">
              self.specialization = <span className="code-green">"RAG · Agentic AI · LLMs"</span>
            </div>

            <div className="terminal-spacer" />

            <div className="terminal-comment"># Core technical exploration</div>

            <div className="code-line">interests = [</div>

            <div className="code-line code-indent">
              <span className="code-green">"Retrieval-Augmented Generation"</span>,
            </div>

            <div className="code-line code-indent">
              <span className="code-green">"Agentic AI Workflows"</span>,
            </div>

            <div className="code-line code-indent">
              <span className="code-green">"Backend Architecture"</span>,
            </div>

            <div className="code-line code-indent">
              <span className="code-green">"Computer Vision"</span>
            </div>

            <div className="code-line">]</div>

            <div className="terminal-footer-line">
              <span className="terminal-prompt">&gt;</span>
              <span>Ready to build intelligent systems.</span>
              <span className="terminal-cursor" />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

interface SkillCategory {
  category: string;
  items: string[];
  featured?: boolean;
  description: string;
}

function Toolkit() {
  const skills: SkillCategory[] = [
    {
      category: "AI SYSTEMS & FRAMEWORKS",
      items: ["RAG", "Agentic AI", "LangChain", "LangGraph", "MCP"],
      featured: true,
      description: "Core architectures and orchestration frameworks for intelligent systems.",
    },
    {
      category: "LANGUAGES",
      items: ["Python", "JavaScript", "Dart"],
      description: "Primary programming languages for backend, scripting, and mobile.",
    },
    {
      category: "AI / MACHINE LEARNING",
      items: [
        "PyTorch",
        "TensorFlow",
        "Pandas",
        "NumPy",
        "scikit-learn",
        "Matplotlib",
      ],
      description: "Data processing, scientific computing, and model training pipelines.",
    },
    {
      category: "BACKEND DEVELOPMENT",
      items: ["FastAPI", "Flask", "Node.js", "Express"],
      description: "High-performance REST APIs, microservices, and asynchronous servers.",
    },
    {
      category: "FRONTEND / MOBILE",
      items: ["React", "Flutter"],
      description: "Responsive web interfaces and cross-platform mobile applications.",
    },
    {
      category: "DATABASES",
      items: ["PostgreSQL", "MySQL", "MongoDB", "SQLite"],
      description: "Relational data modeling, indexing, and document-oriented storage.",
    },
    {
      category: "TOOLS & PLATFORMS",
      items: ["Git", "GitHub", "Unity", "Figma", "Swagger", "Apache", "Canva"],
      description: "Version control, API documentation, game engines, and design tooling.",
    },
  ];

  return (
    <section className="section toolkit-section" id="toolkit">
      <div className="section-heading">
        <span className="section-label">02 / TOOLKIT</span>
        <span className="section-line" />
      </div>

      <div className="toolkit-header">
        <span className="toolkit-eyebrow">TECHNICAL STACK</span>

        <h2 className="section-title">
          Technologies I
          <br />
          <span>work with.</span>
        </h2>

        <p className="toolkit-caption">
          Tools, frameworks, and technologies I leverage across software development,
          AI systems, and data architecture.
        </p>
      </div>

      <div className="toolkit-grid">
        {skills.map((skill, index) => (
          <motion.div
            key={skill.category}
            className={`toolkit-card ${skill.featured ? "toolkit-card-featured" : ""}`}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.45, delay: index * 0.06 }}
          >
            <div className="toolkit-card-top">
              <span className="toolkit-category">
                {skill.featured && (
                  <Sparkles size={13} className="toolkit-featured-sparkle" />
                )}
                {skill.category}
              </span>

              <span className="toolkit-index">0{index + 1}</span>
            </div>

            <p className="toolkit-desc">{skill.description}</p>

            <div className="toolkit-chips">
              {skill.items.map((item) => (
                <span key={item} className="toolkit-chip">
                  {item}
                </span>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

interface ProjectData {
  number: string;
  name: string;
  category: string;
  description: string;
  technologies: string[];
  visual: string;
  status: string;
  link: string;
  breakdown: {
    focus: string;
    architecture: string;
  };
}

const projects: ProjectData[] = [
  {
    number: "01",
    name: "MediQueue",
    category: "HEALTHCARE ORCHESTRATION",
    description:
      "A healthcare queue management project focused on organizing patient flow, reducing intake bottlenecks, and coordinating real-time queue states.",
    technologies: ["Python", "Database", "Backend", "System Architecture"],
    visual: "mediqueue",
    status: "IN DEVELOPMENT",
    link: "https://github.com/coder1702",
    breakdown: {
      focus: "Patient flow orchestration and queue status management in healthcare environments.",
      architecture: "Relational database schema managing real-time queue states, ticket status, and service desk dispatching.",
    },
  },
  {
    number: "02",
    name: "Jarvis AI Assistant",
    category: "AI & AUTOMATION",
    description:
      "A personal assistant project exploring voice interaction, computer vision frame analysis, and desktop system automation routines.",
    technologies: ["Python", "OpenCV", "AI", "System Automation"],
    visual: "jarvis",
    status: "EXPERIMENTAL",
    link: "https://github.com/coder1702",
    breakdown: {
      focus: "Voice-driven multimodal interaction and automated desktop task execution.",
      architecture: "Event-driven architecture connecting speech recognition, frame-by-frame OpenCV vision analysis, and operating system automation.",
    },
  },
  {
    number: "03",
    name: "Echo Runner",
    category: "INTERACTIVE SYSTEMS",
    description:
      "A 2D platformer built around momentum, timing, and an echo replay mechanic where past ghost movements collaborate to solve puzzle barriers.",
    technologies: ["Unity", "C#", "2D", "Physics Simulation"],
    visual: "echo",
    status: "GAME PROJECT",
    link: "https://github.com/coder1702",
    breakdown: {
      focus: "Physics-based movement mechanics where recorded past runs solve environmental puzzles.",
      architecture: "State recording and synchronous playback system built in Unity C# simulating past player ghost runs.",
    },
  },
];

function ProjectVisual({ type }: { type: string }) {
  if (type === "mediqueue") {
    return (
      <div className="visual-window mediqueue-visual">
        <div className="visual-window-bar">
          <div className="window-dots">
            <span />
            <span />
            <span />
          </div>

          <span className="window-title">MEDIQUEUE / DASHBOARD</span>

          <span className="window-status">SYSTEM ONLINE</span>
        </div>

        <div className="dashboard-preview">
          <aside className="dashboard-sidebar">
            <div className="dashboard-logo">M.</div>

            <div className="sidebar-item active">Overview</div>
            <div className="sidebar-item">Patients</div>
            <div className="sidebar-item">Appointments</div>
            <div className="sidebar-item">Queue</div>
          </aside>

          <div className="dashboard-main">
            <div className="dashboard-heading">
              <div>
                <span className="preview-eyebrow">OVERVIEW</span>
                <h4>Dashboard</h4>
              </div>

              <span className="preview-date">TODAY / 2026</span>
            </div>

            <div className="dashboard-stats">
              <div>
                <span>Patients</span>
                <strong>128</strong>
                <small>Daily overview</small>
              </div>

              <div>
                <span>In Queue</span>
                <strong>014</strong>
                <small>Live snapshot</small>
              </div>

              <div>
                <span>Completed</span>
                <strong>086</strong>
                <small>Daily overview</small>
              </div>
            </div>

            <div className="queue-panel">
              <div className="queue-panel-heading">
                <span>QUEUE OVERVIEW</span>
                <span>STATUS</span>
              </div>

              <div className="queue-row">
                <span className="queue-avatar">P1</span>
                <span>Patient queue</span>
                <span className="queue-pill">WAITING</span>
              </div>

              <div className="queue-row">
                <span className="queue-avatar">P2</span>
                <span>Patient queue</span>
                <span className="queue-pill queue-pill-active">ACTIVE</span>
              </div>

              <div className="queue-row">
                <span className="queue-avatar">P3</span>
                <span>Patient queue</span>
                <span className="queue-pill">WAITING</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (type === "jarvis") {
    return (
      <div className="visual-window jarvis-visual">
        <div className="visual-window-bar">
          <div className="window-dots">
            <span />
            <span />
            <span />
          </div>

          <span className="window-title">JARVIS / ASSISTANT</span>

          <span className="window-status">READY</span>
        </div>

        <div className="jarvis-content">
          <div className="jarvis-orbit">
            <div className="orbit-ring orbit-ring-one" />
            <div className="orbit-ring orbit-ring-two" />
            <div className="orbit-ring orbit-ring-three" />

            <div className="jarvis-core">
              <span>J</span>
            </div>
          </div>

          <div className="jarvis-terminal">
            <div className="terminal-line">
              <span className="terminal-prompt">&gt;</span>
              INITIALIZING ASSISTANT
            </div>

            <div className="terminal-line terminal-muted">
              Loading vision module...
            </div>

            <div className="terminal-line terminal-muted">
              Checking audio interface...
            </div>

            <div className="terminal-line">
              <span className="terminal-success">[ READY ]</span>
              &nbsp; Awaiting input
            </div>

            <div className="terminal-cursor" />
          </div>
        </div>

        <div className="jarvis-footer">
          <span>VISION MODULE</span>
          <span>VOICE INTERFACE</span>
          <span>AUTOMATION</span>
        </div>
      </div>
    );
  }

  return (
    <div className="visual-window echo-visual">
      <div className="visual-window-bar">
        <div className="window-dots">
          <span />
          <span />
          <span />
        </div>

        <span className="window-title">ECHO RUNNER / LEVEL 01</span>

        <span className="window-status">PLAY</span>
      </div>

      <div className="echo-game">
        <div className="game-sun" />

        <div className="game-platform platform-one" />
        <div className="game-platform platform-two" />
        <div className="game-platform platform-three" />

        <div className="game-spike spike-one" />
        <div className="game-spike spike-two" />

        <div className="echo-player">
          <span />
        </div>

        <div className="echo-ghost">
          <span />
        </div>

        <div className="game-label">REPLAY YOUR MOVEMENT.</div>

        <div className="game-coordinate">X: 124 / Y: 042</div>

        <div className="game-bottom-line" />
      </div>
    </div>
  );
}

function Projects() {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  const toggleExpand = (index: number) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  return (
    <section className="section projects-section" id="projects">
      <div className="section-heading">
        <span className="section-label">03 / PROJECTS</span>
        <span className="section-line" />
      </div>

      <div className="projects-header">
        <div>
          <span className="projects-eyebrow">SELECTED BUILDS</span>
          <h2 className="section-title">
            Featured work &amp;
            <br />
            <span>software builds.</span>
          </h2>
        </div>

        <p className="projects-caption">
          A selection of projects and software implementations demonstrating practical
          engineering, architecture, and problem-solving.
        </p>
      </div>

      <div className="visual-project-grid">
        {projects.map((project, index) => {
          const isExpanded = expandedIndex === index;

          return (
            <motion.article
              key={project.number}
              className="visual-project-card"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <a
                href={project.link}
                target="_blank"
                rel="noreferrer"
                className="project-preview-link"
                aria-label={`View ${project.name} on GitHub`}
              >
                <ProjectVisual type={project.visual} />

                <span className="preview-open">↗</span>
              </a>

              <div className="visual-project-info">
                <div className="visual-project-topline">
                  <span>{project.category}</span>
                  <span>{project.number}</span>
                </div>

                <h3>{project.name}</h3>

                <p>{project.description}</p>

                <div className="project-tags">
                  {project.technologies.map((technology) => (
                    <span key={technology}>{technology}</span>
                  ))}
                </div>

                <div className="project-expand-area">
                  <button
                    className="project-expand-toggle"
                    onClick={() => toggleExpand(index)}
                    aria-expanded={isExpanded}
                  >
                    <span>TECHNICAL BREAKDOWN</span>
                    {isExpanded ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
                  </button>

                  <AnimatePresence>
                    {isExpanded && (
                      <motion.div
                        className="project-details-panel"
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.25 }}
                      >
                        <div className="project-detail-row">
                          <span className="project-detail-label">CORE FOCUS</span>
                          <p className="project-detail-content">{project.breakdown.focus}</p>
                        </div>

                        <div className="project-detail-row">
                          <span className="project-detail-label">SYSTEM ARCHITECTURE</span>
                          <p className="project-detail-content">{project.breakdown.architecture}</p>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                <div className="visual-project-bottom">
                  <span className="project-status">
                    <span className="status-dot" />
                    {project.status}
                  </span>

                  <a
                    href={project.link}
                    target="_blank"
                    rel="noreferrer"
                    className="project-github-link"
                  >
                    GitHub ↗
                  </a>
                </div>
              </div>
            </motion.article>
          );
        })}
      </div>

      <a
        href="https://github.com/coder1702"
        target="_blank"
        rel="noreferrer"
        className="github-link"
      >
        <span aria-hidden="true">GH</span>
        Explore more on GitHub
        <ArrowUpRight size={15} />
      </a>
    </section>
  );
}

function Experience() {
  const technologies = [
    "Artificial Intelligence",
    "API Development",
    "PostgreSQL",
  ];

  return (
    <section className="section experience-section" id="experience">
      <div className="section-heading">
        <span className="section-label">04 / EXPERIENCE</span>
        <span className="section-line" />
      </div>

      <div className="experience-header">
        <p className="experience-eyebrow">WHERE I'M GROWING</p>

        <h2 className="experience-title">
          Learning by
          <br />
          <span>building.</span>
        </h2>

        <p className="experience-intro">
          Gaining practical experience, exploring new technologies, and
          developing my skills in AI and software development.
        </p>
      </div>

      <motion.article
        className="experience-card"
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.6 }}
      >
        <div className="experience-card-top">
          <span className="experience-index">01</span>

          <span className="experience-status">
            <span className="experience-status-dot" />
            INTERNSHIP
          </span>
        </div>

        <div className="experience-main">
          <p className="experience-period">AUG 2026 — NOV 2026</p>

          <h3>AI/ML Intern</h3>

          <a
            href="https://amnex.com/"
            target="_blank"
            rel="noreferrer"
            className="experience-company"
          >
            Amnex Infotechnologies Pvt. Ltd.
            <ArrowUpRight size={16} />
          </a>

          <p className="experience-location">
            Ahmedabad, Gujarat, India · Full-time
          </p>

          <p className="experience-description">
            Currently learning and working with artificial intelligence, API
            development, and PostgreSQL databases. Gaining practical experience
            while strengthening my understanding of AI/ML concepts, backend
            integration, and database management.
          </p>

          <div className="experience-technologies">
            {technologies.map((technology) => (
              <span key={technology} className="experience-tag">
                {technology}
              </span>
            ))}
          </div>
        </div>
      </motion.article>
    </section>
  );
}

interface FocusNode {
  name: string;
  role: string;
  active?: boolean;
}

const aiSystemsNodes: FocusNode[] = [
  { name: "Retrieval-Augmented Generation", role: "GROUNDING ARCHITECTURE", active: true },
  { name: "Vector Search", role: "SIMILARITY INDEX" },
  { name: "Embedding Models", role: "SEMANTIC ENCODING" },
  { name: "LLM Integration", role: "SYNTHESIS & INFERENCE" },
  { name: "Context Retrieval", role: "KNOWLEDGE EXTRACTION" },
];

const agenticSystemsNodes: FocusNode[] = [
  { name: "Agentic AI", role: "REASONING CONTROLLER", active: true },
  { name: "LangChain", role: "FRAMEWORK INTEGRATION" },
  { name: "LangGraph", role: "STATEFUL GRAPH CYCLES" },
  { name: "MCP", role: "MODEL CONTEXT PROTOCOL" },
  { name: "Tool Calling", role: "FUNCTION EXECUTION" },
  { name: "Workflow Orchestration", role: "MULTI-STEP PLANNING" },
];

function EngineeringFocus() {
  return (
    <section className="section focus-section" id="focus">
      <div className="section-heading">
        <span className="section-label">05 / ENGINEERING FOCUS</span>
        <span className="section-line" />
      </div>

      <div className="focus-header">
        <span className="focus-eyebrow">SYSTEMS &amp; ARCHITECTURE</span>

        <h2 className="section-title">
          Engineering
          <br />
          <span>focus.</span>
        </h2>

        <p className="focus-caption">
          Exploring the systems and technologies behind intelligent applications.
        </p>
      </div>

      <div className="focus-grid">
        {/* Module A: AI Systems */}
        <motion.div
          className="focus-card"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.5 }}
        >
          <div className="focus-card-header">
            <div className="focus-card-title-group">
              <span className="focus-sys-tag">
                <Database size={11} className="focus-tag-icon" />
                SYSTEM 01 // KNOWLEDGE &amp; RETRIEVAL
              </span>
              <h3 className="focus-card-title">AI Systems</h3>
            </div>

            <div className="focus-status-badge">
              <span className="focus-status-dot" />
              <span>ACTIVE EXPLORATION</span>
            </div>
          </div>

          <p className="focus-card-intro">
            Architectures for grounding models with contextual knowledge, high-dimensional
            vector search, and semantic document retrieval.
          </p>

          <div className="focus-telemetry-panel">
            <div className="focus-telemetry-header">
              <span>SYSTEM TOPOLOGY</span>
              <span>5 CONNECTED NODES</span>
            </div>

            <div className="focus-network-visual">
              <svg className="focus-svg-canvas" viewBox="0 0 460 120" fill="none">
                {/* Circuit lines */}
                <path
                  d="M 60 60 H 400"
                  stroke="rgba(255, 255, 255, 0.12)"
                  strokeWidth="1.5"
                  strokeDasharray="4 4"
                />
                <path
                  d="M 60 60 L 140 25 L 320 25 L 400 60"
                  stroke="rgba(139, 92, 246, 0.28)"
                  strokeWidth="1.5"
                />
                <path
                  d="M 60 60 L 140 95 L 320 95 L 400 60"
                  stroke="rgba(139, 92, 246, 0.28)"
                  strokeWidth="1.5"
                />

                {/* Animated data pulse */}
                <circle cx="230" cy="25" r="3" fill="#a78bfa">
                  <animate
                    attributeName="cx"
                    values="140; 320; 140"
                    dur="4s"
                    repeatCount="indefinite"
                  />
                </circle>
                <circle cx="230" cy="95" r="3" fill="#a78bfa">
                  <animate
                    attributeName="cx"
                    values="320; 140; 320"
                    dur="4s"
                    repeatCount="indefinite"
                  />
                </circle>

                {/* Center Hub Indicator */}
                <circle cx="230" cy="60" r="18" fill="rgba(139, 92, 246, 0.1)" stroke="rgba(139, 92, 246, 0.4)" strokeWidth="1.5" />
                <circle cx="230" cy="60" r="6" fill="#a78bfa" />
              </svg>
            </div>

            <div className="focus-node-pills">
              {aiSystemsNodes.map((node) => (
                <div
                  key={node.name}
                  className={`focus-node-pill ${node.active ? "focus-node-pill-active" : ""}`}
                >
                  <div className="focus-node-pill-top">
                    <span className="focus-node-bullet" />
                    <span className="focus-node-role">{node.role}</span>
                  </div>
                  <span className="focus-node-title">{node.name}</span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Module B: Agentic Systems */}
        <motion.div
          className="focus-card focus-card-agentic"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <div className="focus-card-header">
            <div className="focus-card-title-group">
              <span className="focus-sys-tag">
                <Bot size={11} className="focus-tag-icon" />
                SYSTEM 02 // AUTONOMOUS REASONING
              </span>
              <h3 className="focus-card-title">Agentic Systems</h3>
            </div>

            <div className="focus-status-badge">
              <span className="focus-status-dot" />
              <span>ACTIVE EXPLORATION</span>
            </div>
          </div>

          <p className="focus-card-intro">
            Stateful multi-actor workflows, Model Context Protocol integration,
            deterministic planning graphs, and autonomous tool calling.
          </p>

          <div className="focus-telemetry-panel">
            <div className="focus-telemetry-header">
              <span>SYSTEM TOPOLOGY</span>
              <span>6 CONNECTED NODES</span>
            </div>

            <div className="focus-network-visual">
              <svg className="focus-svg-canvas" viewBox="0 0 460 120" fill="none">
                {/* Circuit lines */}
                <path
                  d="M 60 60 H 400"
                  stroke="rgba(255, 255, 255, 0.12)"
                  strokeWidth="1.5"
                  strokeDasharray="4 4"
                />
                <path
                  d="M 60 60 L 130 25 L 230 25 L 330 25 L 400 60"
                  stroke="rgba(139, 92, 246, 0.28)"
                  strokeWidth="1.5"
                />
                <path
                  d="M 60 60 L 130 95 L 230 95 L 330 95 L 400 60"
                  stroke="rgba(139, 92, 246, 0.28)"
                  strokeWidth="1.5"
                />

                {/* Animated data pulse */}
                <circle cx="230" cy="25" r="3" fill="#a78bfa">
                  <animate
                    attributeName="cx"
                    values="130; 330; 130"
                    dur="3.6s"
                    repeatCount="indefinite"
                  />
                </circle>
                <circle cx="230" cy="95" r="3" fill="#a78bfa">
                  <animate
                    attributeName="cx"
                    values="330; 130; 330"
                    dur="3.6s"
                    repeatCount="indefinite"
                  />
                </circle>

                {/* Center Controller Hub */}
                <circle cx="230" cy="60" r="18" fill="rgba(139, 92, 246, 0.12)" stroke="rgba(139, 92, 246, 0.45)" strokeWidth="1.5" />
                <circle cx="230" cy="60" r="6" fill="#a78bfa" />
              </svg>
            </div>

            <div className="focus-node-pills">
              {agenticSystemsNodes.map((node) => (
                <div
                  key={node.name}
                  className={`focus-node-pill ${node.active ? "focus-node-pill-active" : ""}`}
                >
                  <div className="focus-node-pill-top">
                    <span className="focus-node-bullet" />
                    <span className="focus-node-role">{node.role}</span>
                  </div>
                  <span className="focus-node-title">{node.name}</span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function Contact() {
  return (
    <section className="section contact-section" id="contact">
      <div className="section-heading">
        <span className="section-label">06 / GET IN TOUCH</span>
        <span className="section-line" />
      </div>

      <motion.div
        className="contact-content"
        initial={{ opacity: 0, y: 25 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.7 }}
      >
        <p className="contact-eyebrow">HAVE SOMETHING IN MIND?</p>

        <h2>
          Let's make
          <br />
          <span>it happen.</span>
        </h2>

        <p className="contact-description">
          Have an idea, an opportunity, or just want to talk technology? I'd love to hear from you.
        </p>

        {/* Email contact button */}
        <a
          href="mailto:kalpshah03@gmail.com?subject=Let's%20Connect"
          className="button button-primary contact-button"
        >
          Let's Connect <ArrowUpRight size={17} />
        </a>

        {/* Email contact */}
        <div className="contact-email-wrapper">
          <span className="contact-email-label">PREFER EMAIL?</span>

          <a href="mailto:kalpshah03@gmail.com" className="contact-email">
            kalpshah03@gmail.com
            <ArrowUpRight size={16} />
          </a>
        </div>

        {/* Social links */}
        <div className="social-links">
          <a
            href="https://github.com/coder1702"
            target="_blank"
            rel="noreferrer"
            aria-label="GitHub"
          >
            <span aria-hidden="true">GH</span>
          </a>

          <a
            href="https://www.linkedin.com/in/kalp-shah-0ab751356/"
            target="_blank"
            rel="noreferrer"
            aria-label="LinkedIn"
          >
            <span aria-hidden="true">in</span>
          </a>
        </div>
      </motion.div>
    </section>
  );
}

const currentYear = new Date().getFullYear();

function Footer() {
  return (
    <footer className="footer">
      <a href="#home" className="brand">
        KS<span>.</span>
      </a>

      <p>DESIGNED WITH INTENTION. BUILT FOR INTELLIGENT SYSTEMS.</p>

      <span>© {currentYear} KALP SHAH</span>
    </footer>
  );
}

function ScrollProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const updateProgress = () => {
      const scrollableHeight =
        document.documentElement.scrollHeight - window.innerHeight;

      const currentProgress =
        scrollableHeight > 0 ? (window.scrollY / scrollableHeight) * 100 : 0;

      setProgress(Math.min(100, Math.max(0, currentProgress)));
    };

    updateProgress();

    window.addEventListener("scroll", updateProgress, { passive: true });
    window.addEventListener("resize", updateProgress);

    return () => {
      window.removeEventListener("scroll", updateProgress);
      window.removeEventListener("resize", updateProgress);
    };
  }, []);

  return (
    <div className="scroll-progress-track" aria-hidden="true">
      <div className="scroll-progress-bar" style={{ width: `${progress}%` }} />
    </div>
  );
}

function App() {
  const [showTop, setShowTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowTop(window.scrollY > 500);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <ScrollProgress />
      <Navbar />

      <main>
        <Hero />
        <About />
        <Toolkit />
        <Projects />
        <Experience />
        <EngineeringFocus />
        <Contact />
      </main>

      <Footer />

      {showTop && (
        <motion.a
          href="#home"
          className="back-to-top"
          aria-label="Back to top"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
        >
          <ArrowDown size={18} />
        </motion.a>
      )}
    </>
  );
}

export default App;
