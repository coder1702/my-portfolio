import { useEffect, useState } from "react";
import { motion } from "motion/react";
import "./AIInterface.css";

const messages = [
  "INITIALIZING DEVELOPER PROFILE...",
  "AI / ML MODULE ........ READY",
  "API SERVICES .......... READY",
  "DATABASE SYSTEM ....... READY",
  "STATUS: EXPLORING & BUILDING",
];

export default function AIInterface() {
  const [messageIndex, setMessageIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState("");

  useEffect(() => {
    const currentMessage = messages[messageIndex];
    let characterIndex = 0;

    setDisplayedText("");

    const typingTimer = window.setInterval(() => {
      characterIndex++;

      setDisplayedText(currentMessage.slice(0, characterIndex));

      if (characterIndex >= currentMessage.length) {
        window.clearInterval(typingTimer);

        window.setTimeout(() => {
          setMessageIndex((previous) => (previous + 1) % messages.length);
        }, 1800);
      }
    }, 35);

    return () => window.clearInterval(typingTimer);
  }, [messageIndex]);

  return (
    <motion.div
      className="ai-interface"
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.5 }}
      aria-label="Animated developer system interface"
    >
      <div className="ai-terminal">
        <div className="ai-terminal-header">
          <div className="ai-terminal-lights">
            <span />
            <span />
            <span />
          </div>

          <span className="ai-terminal-title">SYSTEM INTERFACE</span>

          <div className="ai-online">
            <span className="ai-online-dot" />
            ONLINE
          </div>
        </div>

        <div className="ai-terminal-body">
          <div className="ai-terminal-prompt">
            <span className="ai-prompt-symbol">&gt;</span>

            <span className="ai-terminal-text" aria-live="polite">
              {displayedText}
              <span className="ai-cursor">_</span>
            </span>
          </div>

          <div className="ai-terminal-footer">
            <span>DEVELOPER ENVIRONMENT</span>
            <span>INTERACTIVE DISPLAY</span>
          </div>
        </div>
      </div>

      <div className="ai-orbit" aria-hidden="true">
        <div className="ai-orbit-ring ai-orbit-ring-one">
          <span className="ai-orbit-point" />
        </div>

        <div className="ai-orbit-ring ai-orbit-ring-two">
          <span className="ai-orbit-point" />
        </div>

        <div className="ai-orbit-ring ai-orbit-ring-three">
          <span className="ai-orbit-point" />
        </div>

        <motion.div
          className="ai-core"
          animate={{
            scale: [1, 1.08, 1],
            opacity: [0.75, 1, 0.75],
          }}
          transition={{
            duration: 2.5,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <span />
        </motion.div>
      </div>
    </motion.div>
  );
}
