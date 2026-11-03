import { useEffect, useRef, useState } from "react";
import { motion } from "motion/react";

interface Chunk { src: string; t: string }
const KB: Chunk[] = [
  { src: "About / Overview", t: "Kalp Shah (Shah Kalp Akshatkumar) is a Computer Science undergraduate at JG University, Ahmedabad, seeking a software engineering internship or entry-level role. He has a strong foundation in full-stack development, REST APIs and machine learning, backed by hands-on projects and a passion for building scalable, real-world software." },
  { src: "Education / University", t: "Kalp is pursuing a B.Tech in Computer Science & Engineering at JG University, Ahmedabad, from August 2024 to May 2028, with a CGPA of 7.1 out of 10. Coursework includes Data Structures & Algorithms, DBMS, Python, Software Engineering and Machine Learning." },
  { src: "Education / School", t: "Kalp completed his Higher Secondary Certificate (Class XII, PCM) at Navkar Public School, Ahmedabad, in March 2024 under the GSEB board, with a result of 57%." },
  { src: "Experience / Amnex", t: "Kalp is an AI/ML intern at Amnex Infotechnologies Pvt. Ltd. (AIPL) in the Agriculture Business Unit, Ahmedabad, from August 2026 (full-time). He applies AI/ML to agri-tech problems, works on AI, API development and PostgreSQL databases, and collaborates with an engineering team on real-world projects following professional company processes." },
  { src: "Projects / What To Watch", t: "What To Watch is a full-stack AI movie recommendation web app built with React, Node.js, Express.js and JavaScript (November 2025). It suggests films by genre, region and language using real IMDb datasets processed server-side, with REST endpoints /search, /recommend/genre and /recommend/personal. Code: github.com/coder1702/What-To-Watch." },
  { src: "Projects / Project Management System API", t: "The Project Management System API is a RESTful backend built with Python, FastAPI, SQLAlchemy and Pydantic (2026). It exposes full CRUD endpoints with auto-generated Swagger docs, models data with the SQLAlchemy ORM, validates requests with Pydantic schemas, and uses dependency-injected database sessions. Code: github.com/coder1702/Project-Management-System-API." },
  { src: "Projects / MediQueue", t: "MediQueue is a healthcare queue management project that organizes patient flow, reduces intake bottlenecks and coordinates real-time queue states. It is built with Python and a relational database and is in development." },
  { src: "Projects / Jarvis", t: "Jarvis is an experimental AI assistant exploring voice interaction, OpenCV computer vision frame analysis and desktop automation, built in Python with an event-driven architecture." },
  { src: "Projects / Echo Runner", t: "Echo Runner is a 2D platformer in Unity and C# built around momentum, timing and an echo replay mechanic where recorded ghost runs solve puzzle barriers." },
  { src: "Skills / Overview", t: "Kalp's skills: Python, JavaScript and Dart; FastAPI, Flask, Node.js and Express; React and Flutter; PostgreSQL, MySQL, MongoDB and SQLite; PyTorch, TensorFlow, Pandas, NumPy, scikit-learn and Matplotlib; RAG, agentic AI, LangChain, LangGraph and MCP; Git, GitHub, Unity, Figma, Swagger, Apache and Canva." },
  { src: "Toolkit / AI systems", t: "The AI stack covers RAG, agentic AI, LangChain, LangGraph and MCP for orchestrating intelligent systems." },
  { src: "Toolkit / ML", t: "Machine learning tools are PyTorch, TensorFlow, Pandas, NumPy, scikit-learn and Matplotlib for data processing and model training." },
  { src: "Toolkit / Languages", t: "Programming languages are Python, JavaScript and Dart, used for backend, scripting and mobile work." },
  { src: "Toolkit / Backend", t: "Backend development uses FastAPI, Flask, Node.js and Express to build REST APIs, microservices and asynchronous servers." },
  { src: "Toolkit / Databases", t: "Databases include PostgreSQL, MySQL, MongoDB and SQLite, covering relational modeling, indexing and document storage." },
  { src: "Toolkit / Frontend", t: "Frontend and mobile work uses React for web interfaces and Flutter for cross-platform mobile apps." },
  { src: "Toolkit / Tools", t: "Tools and platforms include Git, GitHub, Unity, Figma, Swagger, Apache and Canva." },
  { src: "Focus / RAG", t: "The retrieval-augmented generation focus covers embedding models, vector search, context retrieval and LLM integration to ground models in real knowledge." },
  { src: "Focus / Agents", t: "The agentic focus covers stateful LangGraph workflows, Model Context Protocol, tool calling and multi-step workflow orchestration." },
  { src: "Certifications", t: "Kalp completed Claude 101 from Anthropic (certificate of completion) and took part in UDGAM 2025, a national-level technical fest hosted by IITRAM in 2025 focused on innovation and engineering problem-solving." },
  { src: "Extracurricular / Video editing", t: "Kalp is a video editor who creates short-form and long-form content in DaVinci Resolve, with experience in colour grading, transitions and audio sync." },
  { src: "Extracurricular / Badminton", t: "Kalp is an academy-level competitive badminton player who placed in the Top 4 at the Inter-University Badminton Championship in 2026." },
  { src: "Contact", t: "You can reach Kalp by email at kalpshah03@gmail.com, on GitHub as coder1702, on LinkedIn, or at his website kalp-shah.pages.dev. Ideas, opportunities and conversations about technology are welcome." },
];

const STOP = new Set("a an the is are was of in on at to for and or with what which who where how can do does did have has you your i my me his he s it this that tell kalp shah use used any".split(" "));
const SYN: Record<string, string[]> = {
  skill: ["toolkit"], stack: ["toolkit"], tech: ["toolkit"], technologie: ["toolkit"], tool: ["toolkit"], language: ["toolkit"],
  work: ["experience"], job: ["experience"], company: ["experience"], intern: ["experience"], internship: ["experience"],
  study: ["education"], college: ["education"], university: ["education"], degree: ["education"], school: ["education"],
  grade: ["education"], cgpa: ["education"], percentage: ["education"], mark: ["education"],
  project: ["projects"], built: ["projects"], build: ["projects"], app: ["projects"],
  hobby: ["extracurricular"], hobbie: ["extracurricular"], sport: ["extracurricular"], interest: ["extracurricular"], fun: ["extracurricular"],
  reach: ["contact"], email: ["contact"], touch: ["contact"], hire: ["contact"], phone: ["contact"],
  certificate: ["certifications"], certification: ["certifications"], course: ["certifications"],
};
const stem = (w: string) => (w.length > 3 && w.endsWith("s") ? w.slice(0, -1) : w);
const tok = (s: string) => (s.toLowerCase().match(/[a-z0-9#+]+/g) ?? []).filter((w) => !STOP.has(w)).map(stem);
const qtok = (s: string) => {
  const t = tok(s);
  if (!t.length) t.push("about");
  return t.flatMap((w) => [w, ...(SYN[w] ?? [])]);
};
const docs = KB.map((k) => tok(k.src + " " + k.t));
const df = new Map<string, number>();
docs.forEach((d) => new Set(d).forEach((w) => df.set(w, (df.get(w) ?? 0) + 1)));
const idf = (w: string) => Math.log(1 + KB.length / (1 + (df.get(w) ?? 0)));
const vec = (ws: string[]) => {
  const m = new Map<string, number>();
  ws.forEach((w) => m.set(w, (m.get(w) ?? 0) + idf(w)));
  return m;
};
const norm = (m: Map<string, number>) => Math.sqrt([...m.values()].reduce((s, v) => s + v * v, 0)) || 1;
const dvecs = docs.map((d) => { const v = vec(d); return { v, n: norm(v) }; });

function search(q: string) {
  const qv = vec(qtok(q)); const qn = norm(qv);
  return KB.map((k, i) => {
    let dot = 0;
    qv.forEach((val, w) => { dot += val * (dvecs[i].v.get(w) ?? 0); });
    return { ...k, score: dot / (qn * dvecs[i].n) };
  }).sort((a, b) => b.score - a.score).slice(0, 3);
}

const STAGES = ["EMBED", "SEARCH", "RANK", "COMPOSE"];
const SUGGEST = ["What skills does Kalp have?", "Tell me about his education", "What projects has he built?", "Where does Kalp work?", "Any hobbies?"];

export default function AskPortfolio() {
  const [q, setQ] = useState("");
  const [stage, setStage] = useState(-1);
  const [hits, setHits] = useState<ReturnType<typeof search>>([]);
  const [typed, setTyped] = useState("");
  const timers = useRef<number[]>([]);

  const run = (text: string) => {
    if (!text.trim()) return;
    timers.current.forEach(clearTimeout);
    setQ(text); setTyped(""); setHits([]); setStage(0);
    const r = search(text);
    [1, 2, 3].forEach((s) => timers.current.push(window.setTimeout(() => setStage(s), s * 260)));
    timers.current.push(window.setTimeout(() => {
      setHits(r);
      const more = r[1].score >= r[0].score * 0.6 && r[1].score > 0.1 ? " " + r[1].t : "";
      const ans = r[0].score > 0.08 ? r[0].t + more : "Nothing in the knowledge base matches that. Try asking about projects, the tech stack, experience or contact details.";
      let i = 0;
      const id = window.setInterval(() => {
        setTyped(ans.slice(0, ++i));
        if (i >= ans.length) clearInterval(id);
      }, 11);
      timers.current.push(id);
      setStage(4);
    }, 1050));
  };

  useEffect(() => {
    const h = (e: Event) => run((e as CustomEvent<string>).detail);
    addEventListener("ask-portfolio", h);
    return () => { removeEventListener("ask-portfolio", h); timers.current.forEach(clearTimeout); };
  }, []);

  return (
    <motion.div id="ask" className="ask" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }} transition={{ duration: 0.5 }}>
      <div className="ask-head">
        <h3>Ask this portfolio</h3>
        <span>Real TF-IDF retrieval over this site’s content. Runs in your browser, no LLM call.</span>
      </div>
      <form className="ask-form" onSubmit={(e) => { e.preventDefault(); run(q); }}>
        <span className="ask-prompt">&gt;</span>
        <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Ask about projects, stack, experience…" aria-label="Ask a question" />
        <button type="submit">Run</button>
      </form>
      <div className="ask-chips">
        {SUGGEST.map((s) => <button key={s} type="button" onClick={() => run(s)}>{s}</button>)}
      </div>
      <div className="ask-stages" aria-hidden="true">
        {STAGES.map((s, i) => <span key={s} className={stage >= i ? "on" : ""}>{s}</span>)}
      </div>
      <div className="ask-results" aria-live="polite">
        {hits.map((h, i) => (
          <motion.div key={h.src + q} className="ask-hit" initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.08 }}>
            <div className="ask-hit-top"><span>{h.src}</span><b>{h.score.toFixed(2)}</b></div>
            <div className="ask-bar"><motion.i initial={{ width: 0 }} animate={{ width: `${Math.min(100, h.score * 100)}%` }} transition={{ duration: 0.6, delay: i * 0.08 }} /></div>
          </motion.div>
        ))}
        {typed && <p className="ask-answer">{typed}</p>}
      </div>
    </motion.div>
  );
}
