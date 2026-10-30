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
} from "lucide-react";
import "./App.css";

interface NavItem {
  label: string;
  href: string;
}

const navigation: NavItem[] = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Architecture", href: "#architecture" },
  { label: "Experience", href: "#experience" },
  { label: "Projects", href: "#projects" },
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

            <a href="#architecture" className="button button-secondary">
              System Architecture
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
        01 — 05
      </div>
    </section>
  );
}

interface SkillCategory {
  category: string;
  items: string[];
  featured?: boolean;
}

function About() {
  const skills: SkillCategory[] = [
    {
      category: "LANGUAGES",
      items: ["Python", "JavaScript", "Dart"],
    },
    {
      category: "AI SYSTEMS & FRAMEWORKS",
      items: ["RAG", "Agentic AI", "LangChain", "LangGraph", "MCP"],
      featured: true,
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
    },
    {
      category: "BACKEND DEVELOPMENT",
      items: ["FastAPI", "Flask", "Node.js", "Express"],
    },
    {
      category: "FRONTEND / MOBILE",
      items: ["React", "Flutter"],
    },
    {
      category: "DATABASES",
      items: ["PostgreSQL", "MySQL", "MongoDB", "SQLite"],
    },
    {
      category: "TOOLS & PLATFORMS",
      items: ["Git", "GitHub", "Unity", "Figma", "Swagger", "Apache", "Canva"],
    },
  ];

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
            <span>Driven by intelligence.</span>
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

      <div className="skills-heading">
        <div>
          <span className="about-eyebrow">MY TOOLKIT</span>

          <h3>
            Technologies I <span>work with.</span>
          </h3>
        </div>

        <p>
          Tools, frameworks, and technologies I leverage across AI engineering,
          systems development, and data architecture.
        </p>
      </div>

      <div className="skills-grid">
        {skills.map((skill, index) => (
          <motion.div
            key={skill.category}
            className={`skill-card${skill.featured ? " skill-card-featured" : ""}`}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.5, delay: index * 0.08 }}
            whileHover={{ y: -4 }}
          >
            <div className="skill-card-top">
              <span className="skill-category">
                {skill.featured && <Sparkles size={11} style={{ marginRight: 6, display: "inline" }} />}
                {skill.category}
              </span>

              <span className="skill-index">0{index + 1}</span>
            </div>

            <div className="skill-items">
              {skill.items.map((item) => (
                <span key={item} className="skill-chip">
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

interface ArchNode {
  id: string;
  label: string;
  description: string;
  technicalRole: string;
}

const ragNodes: ArchNode[] = [
  {
    id: "rag-query",
    label: "USER QUERY",
    technicalRole: "INPUT INTERFACE",
    description:
      "Natural language prompt or query submitted by the user requiring factual or specialized context.",
  },
  {
    id: "rag-embedding",
    label: "EMBEDDING MODEL",
    technicalRole: "VECTOR ENCODER",
    description:
      "Translates semantic query text into high-dimensional vector representations capturing conceptual meaning.",
  },
  {
    id: "rag-vectordb",
    label: "VECTOR DATABASE",
    technicalRole: "INDEX & STORAGE",
    description:
      "Stores pre-indexed chunk embeddings and performs fast approximate nearest neighbor (ANN) similarity search.",
  },
  {
    id: "rag-retriever",
    label: "RETRIEVER",
    technicalRole: "CONTEXT EXTRACTION",
    description:
      "Selects top-k semantically relevant chunks, reranks results, and prepares contextual snippets.",
  },
  {
    id: "rag-llm",
    label: "LLM",
    technicalRole: "GENERATIVE ENGINE",
    description:
      "Synthesizes retrieved contextual evidence with original query to generate factual, grounded responses.",
  },
  {
    id: "rag-response",
    label: "GENERATED RESPONSE",
    technicalRole: "OUTPUT VERIFICATION",
    description:
      "Contextually grounded, hallucination-resistant answer returned to the end user with high precision.",
  },
];

const agentNodes: ArchNode[] = [
  {
    id: "agent-request",
    label: "USER REQUEST",
    technicalRole: "GOAL SPECIFICATION",
    description:
      "High-level goal or multi-step instruction specified by the user in natural language.",
  },
  {
    id: "agent-core",
    label: "AI AGENT",
    technicalRole: "ORCHESTRATOR",
    description:
      "Central reasoning controller managing state, memory, system instructions, and execution loop.",
  },
  {
    id: "agent-reasoning",
    label: "REASONING / PLANNING",
    technicalRole: "DECISION TREE",
    description:
      "Deconstructs goal into deterministic sub-tasks, evaluates current state, and plans the next logical action.",
  },
  {
    id: "agent-toolselect",
    label: "TOOL SELECTION",
    technicalRole: "FUNCTION MATCHING",
    description:
      "Selects appropriate tool schemas, functions, or external APIs required to fulfill the planned step.",
  },
  {
    id: "agent-execution",
    label: "MCP / TOOL EXECUTION",
    technicalRole: "EXTERNAL RUNTIME",
    description:
      "Executes tool call via Model Context Protocol or sandbox runtime and returns structured results.",
  },
  {
    id: "agent-result",
    label: "RESULT",
    technicalRole: "EVALUATION & SYNTHESIS",
    description:
      "Evaluates output, verifies task fulfillment, and returns final synthesized response to the user.",
  },
];

function ArchitectureFlow({
  nodes,
  title,
  subtitle,
}: {
  nodes: ArchNode[];
  title: string;
  subtitle: string;
}) {
  const [activeNode, setActiveNode] = useState<string | null>(null);
  const [activeStepIndex, setActiveStepIndex] = useState<number | null>(null);
  const [isSimulating, setIsSimulating] = useState(false);

  useEffect(() => {
    if (!isSimulating) return;

    let step = 0;
    const interval = setInterval(() => {
      step = (step + 1) % nodes.length;
      setActiveStepIndex(step);
    }, 1800);

    return () => clearInterval(interval);
  }, [isSimulating, nodes.length]);

  return (
    <div className="arch-flow">
      <div className="arch-flow-header">
        <div>
          <span className="arch-flow-label">{title}</span>
          <p className="arch-flow-sublabel">{subtitle}</p>
        </div>

        <button
          className={`arch-simulate-btn ${isSimulating ? "arch-simulate-active" : ""}`}
          onClick={() => {
            const nextSim = !isSimulating;
            setIsSimulating(nextSim);
            setActiveStepIndex(nextSim ? 0 : null);
          }}
          aria-label={isSimulating ? "Pause flow simulation" : "Start flow simulation"}
        >
          <span className="arch-btn-dot" />
          {isSimulating ? "PAUSE SIMULATION" : "SIMULATE FLOW"}
        </button>
      </div>

      <div className="arch-nodes">
        {nodes.map((node, index) => {
          const isSelected = activeNode === node.id;
          const isFlowActive = activeStepIndex === index;

          return (
            <div key={node.id} className="arch-node-wrapper">
              <motion.div
                className={`arch-node ${isSelected || isFlowActive ? "arch-node-active" : ""}`}
                onMouseEnter={() => setActiveNode(node.id)}
                onMouseLeave={() => setActiveNode(null)}
                onClick={() => setActiveNode(isSelected ? null : node.id)}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.4, delay: index * 0.08 }}
              >
                <div className="arch-node-top">
                  <span className="arch-node-index">0{index + 1}</span>
                  <span className="arch-node-role">{node.technicalRole}</span>
                </div>

                <div className="arch-node-title-row">
                  <span className="arch-node-label">{node.label}</span>
                  <span className="arch-node-hint">
                    {isSelected ? "TAP TO COLLAPSE" : "HOVER TO INSPECT"}
                  </span>
                </div>

                <AnimatePresence>
                  {(isSelected || isFlowActive) && (
                    <motion.div
                      className="arch-node-desc-wrapper"
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.25 }}
                    >
                      <p className="arch-node-desc">{node.description}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>

              {index < nodes.length - 1 && (
                <div className="arch-connector" aria-hidden="true">
                  <div className="arch-connector-line" />
                  <div
                    className={`arch-connector-dot ${
                      activeStepIndex === index ? "arch-connector-dot-active" : ""
                    }`}
                  />
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

function Architecture() {
  return (
    <section className="section architecture-section" id="architecture">
      <div className="section-heading">
        <span className="section-label">02 / ARCHITECTURE</span>
        <span className="section-line" />
      </div>

      <div className="architecture-header">
        <p className="architecture-eyebrow">HOW INTELLIGENT SYSTEMS WORK</p>

        <h2 className="section-title">
          System
          <br />
          <span>architectures.</span>
        </h2>

        <p className="architecture-caption">
          Interactive educational representations of core AI engineering patterns —
          illustrating how retrieval-augmented generation pipelines and autonomous
          agentic workflows process data step by step.
        </p>
      </div>

      <div className="architecture-grid">
        <ArchitectureFlow
          nodes={ragNodes}
          title="RAG PIPELINE"
          subtitle="RETRIEVAL-AUGMENTED GENERATION ARCHITECTURE"
        />

        <ArchitectureFlow
          nodes={agentNodes}
          title="AGENTIC AI WORKFLOW"
          subtitle="AUTONOMOUS REASONING &amp; TOOL EXECUTION"
        />
      </div>
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
        <span className="section-label">03 / EXPERIENCE</span>
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
    category: "SOFTWARE DEVELOPMENT",
    description:
      "A healthcare queue management project focused on organizing patient flow and making the experience more efficient.",
    technologies: ["Python", "Database", "Backend"],
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
    name: "Jarvis AI",
    category: "AI & AUTOMATION",
    description:
      "A personal assistant project exploring voice interaction, computer vision, and desktop automation.",
    technologies: ["Python", "OpenCV", "AI"],
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
    category: "GAME DEVELOPMENT",
    description:
      "A 2D platformer built around movement, timing, and an echo mechanic used to solve puzzles.",
    technologies: ["Unity", "C#", "2D"],
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
        <span className="section-label">04 / SELECTED WORK</span>
        <span className="section-line" />
      </div>

      <div className="projects-header">
        <h2 className="section-title">
          Things I've
          <br />
          <span>been building.</span>
        </h2>

        <p className="projects-caption">
          A selection of experiments, ideas, and projects that reflect my
          journey as a developer.
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
              whileHover={{ y: -6 }}
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

function Contact() {
  return (
    <section className="section contact-section" id="contact">
      <div className="section-heading">
        <span className="section-label">05 / GET IN TOUCH</span>
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
          Have an idea, a project opportunity, or want to discuss AI engineering and system development? Feel free to reach out.
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
        <Architecture />
        <Experience />
        <Projects />
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
