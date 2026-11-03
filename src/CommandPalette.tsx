import { useEffect, useRef, useState } from "react";
import type { KeyboardEvent as RKeyboardEvent } from "react";
import { AnimatePresence, motion } from "motion/react";
import { CornerDownLeft, Search } from "lucide-react";

interface Cmd { label: string; hint: string; run: () => void }

const go = (id: string) => () => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
const open = (href: string) => () => { window.open(href, "_blank", "noreferrer"); };
const EMAIL = "kalpshah03@gmail.com";

const BASE: Cmd[] = [
  { label: "Go to Home", hint: "Navigate", run: go("home") },
  { label: "Go to About", hint: "Navigate", run: go("about") },
  { label: "Go to Toolkit", hint: "Navigate", run: go("toolkit") },
  { label: "Go to Projects", hint: "Navigate", run: go("projects") },
  { label: "Go to Experience", hint: "Navigate", run: go("experience") },
  { label: "Go to Engineering Focus", hint: "Navigate", run: go("focus") },
  { label: "Try the retrieval demo", hint: "Interactive", run: go("ask") },
  { label: "Go to Contact", hint: "Navigate", run: go("contact") },
  {
    label: "Download resume", hint: "Action",
    run: () => { const a = document.createElement("a"); a.href = "/resume.pdf"; a.download = ""; a.click(); },
  },
  { label: "Copy email address", hint: "Action", run: () => { navigator.clipboard?.writeText(EMAIL).catch(() => {}); } },
  { label: "Open GitHub", hint: "Link", run: open("https://github.com/coder1702") },
  { label: "Open LinkedIn", hint: "Link", run: open("https://www.linkedin.com/in/kalp-shah-0ab751356/") },
];

export default function CommandPalette() {
  const [isOpen, setOpen] = useState(false);
  const [q, setQ] = useState("");
  const [sel, setSel] = useState(0);
  const input = useRef<HTMLInputElement>(null);

  const term = q.trim().toLowerCase();
  const list: Cmd[] = BASE.filter((c) => c.label.toLowerCase().includes(term));
  if (term) {
    list.unshift({
      label: `Ask the portfolio: “${q.trim()}”`, hint: "Retrieval",
      run: () => {
        go("ask")();
        setTimeout(() => window.dispatchEvent(new CustomEvent("ask-portfolio", { detail: q.trim() })), 450);
      },
    });
  }

  const close = () => { setOpen(false); setQ(""); setSel(0); };
  const exec = (c?: Cmd) => { if (!c) return; close(); c.run(); };

  useEffect(() => {
    const key = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") { e.preventDefault(); setOpen((o) => !o); }
    };
    const openIt = () => setOpen(true);
    addEventListener("keydown", key);
    addEventListener("open-palette", openIt);
    return () => { removeEventListener("keydown", key); removeEventListener("open-palette", openIt); };
  }, []);

  useEffect(() => { if (isOpen) setTimeout(() => input.current?.focus(), 30); }, [isOpen]);

  const onKey = (e: RKeyboardEvent) => {
    if (e.key === "Escape") close();
    else if (e.key === "ArrowDown") { e.preventDefault(); setSel((s) => (s + 1) % list.length); }
    else if (e.key === "ArrowUp") { e.preventDefault(); setSel((s) => (s - 1 + list.length) % list.length); }
    else if (e.key === "Enter") exec(list[sel]);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div className="palette-backdrop" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
          transition={{ duration: 0.15 }} onMouseDown={close}>
          <motion.div className="palette" role="dialog" aria-modal="true" aria-label="Command palette"
            initial={{ opacity: 0, y: -12, scale: 0.98 }} animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.18 }} onMouseDown={(e) => e.stopPropagation()}>
            <div className="palette-input">
              <Search size={15} />
              <input ref={input} value={q} placeholder="Jump to a section, run an action, or ask a question…"
                onChange={(e) => { setQ(e.target.value); setSel(0); }} onKeyDown={onKey} aria-label="Search commands" />
              <kbd>esc</kbd>
            </div>
            <ul className="palette-list" role="listbox">
              {list.length === 0 && <li className="palette-empty">No matches.</li>}
              {list.map((c, i) => (
                <li key={c.label} role="option" aria-selected={i === sel} className={i === sel ? "active" : ""}
                  onMouseEnter={() => setSel(i)} onClick={() => exec(c)}>
                  <span>{c.label}</span>
                  <em>{c.hint}</em>
                </li>
              ))}
            </ul>
            <div className="palette-foot">
              <span>↑↓ move</span>
              <span><CornerDownLeft size={11} /> select</span>
              <span>type anything to ask</span>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
