'use client';

import { useEffect, useRef, useState } from 'react';

/**
 * Scroll-reveal wrapper. Adds the `.in` class when the element enters the
 * viewport so CSS can fade/slide it up. `delay` 1-4 staggers grouped items.
 */
export default function Reveal({ children, delay = 0, className = '', style }) {
  const ref = useRef(null);
  const [seen, setSeen] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) { setSeen(true); io.disconnect(); }
        });
      }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const d = delay ? `d${delay}` : '';
  return (
    <div ref={ref} className={`reveal ${seen ? 'in' : ''} ${d} ${className}`} style={style}>
      {children}
    </div>
  );
}
