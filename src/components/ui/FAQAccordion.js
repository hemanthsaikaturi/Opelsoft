"use client";
import { useState } from "react";
import Reveal from "@/components/ui/Reveal";

export default function FAQAccordion({ faqs }) {
  const [openIndex, setOpenIndex] = useState(0);

  const toggle = (index) => {
    setOpenIndex(openIndex === index ? -1 : index);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      {faqs.map((f, i) => {
        const isOpen = openIndex === i;
        return (
          <Reveal key={i} delay={i * 0.1}>
            <div 
              onClick={() => toggle(i)}
              style={{ 
                background: isOpen ? '#fff' : 'rgba(255,255,255,0.4)',
                border: '1px solid',
                borderColor: isOpen ? 'var(--op-indigo)' : 'var(--border-color)',
                borderRadius: '16px',
                padding: '24px',
                cursor: 'pointer',
                transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
                boxShadow: isOpen ? '0 10px 30px -10px rgba(79,70,229,0.15)' : 'none',
                overflow: 'hidden'
              }}
              className="hover-lift"
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '16px' }}>
                <h3 style={{ fontSize: '1.1rem', fontWeight: '700', color: isOpen ? 'var(--op-indigo)' : 'var(--text-primary)', margin: 0, transition: 'color 0.3s' }}>
                  {f.q}
                </h3>
                <div style={{ 
                  width: '32px', height: '32px', borderRadius: '50%', 
                  background: isOpen ? 'var(--op-indigo)' : 'rgba(9,9,11,0.04)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  flexShrink: 0, transition: 'all 0.3s'
                }}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={isOpen ? '#fff' : 'currentColor'} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.4s cubic-bezier(0.16, 1, 0.3, 1)' }}>
                    <polyline points="6 9 12 15 18 9" />
                  </svg>
                </div>
              </div>
              <div style={{ 
                maxHeight: isOpen ? '500px' : '0px', 
                opacity: isOpen ? 1 : 0, 
                transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
                marginTop: isOpen ? '16px' : '0px'
              }}>
                <p style={{ color: 'var(--text-secondary)', fontSize: '1rem', lineHeight: '1.6', margin: 0 }}>
                  {f.a}
                </p>
              </div>
            </div>
          </Reveal>
        );
      })}
    </div>
  );
}
