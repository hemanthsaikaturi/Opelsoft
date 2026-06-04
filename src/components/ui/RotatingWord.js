'use client';

import { useEffect, useState } from 'react';

/** Cycles through `words` with a fade/slide transition. */
export default function RotatingWord({ words = [], interval = 2200, className, style }) {
  const [i, setI] = useState(0);
  const [show, setShow] = useState(true);

  useEffect(() => {
    if (words.length < 2) return;
    const t = setInterval(() => {
      setShow(false);
      setTimeout(() => {
        setI((p) => (p + 1) % words.length);
        setShow(true);
      }, 280);
    }, interval);
    return () => clearInterval(t);
  }, [words.length, interval]);

  return (
    <span
      className={className}
      style={{
        ...style, display: 'inline-block', transition: 'opacity 0.28s ease, transform 0.28s ease', opacity: show ? 1 : 0, transform: show ? 'translateY(0)' : 'translateY(8px)', }}
    >
      {words[i] || ''}
    </span>
  );
}
