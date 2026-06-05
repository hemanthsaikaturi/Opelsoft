'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const TALENT_NAV = { name: 'Talent & Staffing', path: '/talent-staffing' };
const CANDIDATE_NAV = { name: 'For Candidates', path: '/dashboard/candidate' };
const EMPLOYER_NAV = {
  name: 'For Employers',
  dropdown: [
    { name: 'Employer Dashboard', path: '/dashboard/employer' },
    { name: 'Post a Job', path: '/dashboard/employer?tab=post-job' },
  ],
};

function buildNav(user) {
  return [
    { name: 'Home', path: '/' },
    { name: 'About Us', path: '/about-us' },
    TALENT_NAV,
    CANDIDATE_NAV,
    { name: 'Find Jobs', path: '/jobs' },
    ...(user && user.role === 'employer' ? [EMPLOYER_NAV] : []),
    { name: 'Contact', path: '/contact-us' },
  ];
}

export default function Header() {
  const [user, setUser] = useState(null);
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(null);     // open desktop dropdown name
  const [mobile, setMobile] = useState(false); // mobile drawer open
  const pathname = usePathname();
  const ref = useRef(null);
  const timer = useRef(null);

  // Session
  useEffect(() => {
    fetch('/api/auth/me')
      .then((r) => r.json())
      .then((d) => setUser(d.success ? d.user : null))
      .catch(() => setUser(null));
  }, [pathname]);

  // Frosted shadow on scroll
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Close menus on route change
  useEffect(() => { setMobile(false); setOpen(null); }, [pathname]);

  // Close dropdown on outside click
  useEffect(() => {
    const onClick = (e) => { if (ref.current && !ref.current.contains(e.target)) setOpen(null); };
    document.addEventListener('mousedown', onClick);
    return () => document.removeEventListener('mousedown', onClick);
  }, []);

  const openMenu = useCallback((name) => { if (timer.current) clearTimeout(timer.current); setOpen(name); }, []);
  const closeMenu = useCallback(() => { timer.current = setTimeout(() => setOpen(null), 140); }, []);

  const signOut = async () => {
    try {
      const r = await fetch('/api/auth/logout', { method: 'POST' });
      const d = await r.json();
      if (d.success) { setUser(null); window.location.href = '/login'; }
    } catch (e) { console.error('Sign out error:', e); }
  };

  const nav = buildNav(user);
  const isActive = (item) => (item.path ? pathname === item.path : item.dropdown?.some((d) => pathname === d.path));

  const actions = (
    user ? (
      <>
        <Link href={user.role === 'candidate' ? '/dashboard/candidate' : '/dashboard/employer'} className="nv-user">👤 {user.username}</Link>
        <button onClick={signOut} className="nv-cta">Sign Out</button>
      </>
    ) : (
      <>
        <Link href="/login" className="nv-ghost">Login</Link>
        <Link href="/register" className="nv-cta">Join Us</Link>
      </>
    )
  );

  return (
    <>
      <header className={`nv${scrolled ? ' scrolled' : ''}`} ref={ref}>
        <div className="nv-inner">
          <Link href="/" className="nv-logo" aria-label="OpelSoft home">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/logo.svg" alt="OpelSoft" />
          </Link>

          <nav className="nv-links">
            {nav.map((item) => item.dropdown ? (
              <div key={item.name} className={`nv-item${open === item.name ? ' open' : ''}`} onMouseEnter={() => openMenu(item.name)} onMouseLeave={closeMenu}>
                <button className={`nv-link${isActive(item) ? ' active' : ''}`} aria-expanded={open === item.name} onClick={() => setOpen(open === item.name ? null : item.name)}>
                  {item.name}
                  <svg className="nv-chevron" width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M2.5 4.5 6 8l3.5-3.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
                </button>
                {open === item.name && (
                  <div className="nv-dropdown" onMouseEnter={() => openMenu(item.name)} onMouseLeave={closeMenu}>
                    {item.dropdown.map((s) => <Link key={s.path} href={s.path}>{s.name}</Link>)}
                  </div>
                )}
              </div>
            ) : (
              <Link key={item.name} href={item.path} className={`nv-link${isActive(item) ? ' active' : ''}`}>{item.name}</Link>
            ))}
          </nav>

          <div className="nv-actions">{actions}</div>

          <button className={`nv-burger${mobile ? ' open' : ''}`} aria-label="Toggle menu" aria-expanded={mobile} onClick={() => setMobile(!mobile)}>
            <span /><span /><span />
          </button>
        </div>
      </header>

      <div className={`nv-scrim${mobile ? ' open' : ''}`} onClick={() => setMobile(false)} />
      <div className={`nv-drawer${mobile ? ' open' : ''}`}>
        {nav.map((item) => item.dropdown ? (
          <div key={item.name}>
            <div className="nv-msection">{item.name}</div>
            {item.dropdown.map((s) => <Link key={s.path} href={s.path} className="sub">{s.name}</Link>)}
          </div>
        ) : (
          <Link key={item.name} href={item.path} className={isActive(item) ? 'active' : ''}>{item.name}</Link>
        ))}
        <div className="nv-drawer-actions">{actions}</div>
      </div>
    </>
  );
}
