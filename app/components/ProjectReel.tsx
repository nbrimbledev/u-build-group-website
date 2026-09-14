"use client";

import { useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import { projects } from "../site-data";

const reelTransition = {
  duration: 72,
  ease: "linear" as const,
  repeat: Infinity,
};

export function ProjectReel() {
  const reduceMotion = useReducedMotion();
  const [running, setRunning] = useState(true);
  const shouldRun = running && !reduceMotion;
  const tiles = shouldRun ? [...projects, ...projects] : projects;

  return (
    <div className={`project-reel-shell ${shouldRun ? "is-running" : "is-static"}`}>
      <button className="reel-control" type="button" onClick={() => setRunning((value) => !value)}>
        {shouldRun ? "Pause project reel" : "Run project reel"}
      </button>
      <div className="project-reel-viewport">
        <motion.div
          className="project-reel"
          animate={shouldRun ? { x: ["0%", "-50%"] } : { x: "0%" }}
          transition={shouldRun ? reelTransition : { duration: 0 }}
        >
          {tiles.map((project, index) => (
            <article className="project-card" key={`${project.name}-${index}`}>
              <i className="corner tl" /><i className="corner tr" />
              <i className="corner bl" /><i className="corner br" />
              <div className="project-placeholder">
                <span>Photograph to come</span>
              </div>
              <div className="project-caption">
                <span className={`division-dot is-${project.division}`} />
                <small>{project.category}</small>
                <h3>{project.name}</h3>
                <p>{project.location}</p>
              </div>
            </article>
          ))}
        </motion.div>
      </div>
    </div>
  );
}
