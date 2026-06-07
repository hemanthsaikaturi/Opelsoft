"use client";
import { useEffect, useState } from "react";

export default function Preloader() {
  const [visible, setVisible] = useState(true);
  const [fading, setFading] = useState(false);

  useEffect(() => {
    const fadeTimer = setTimeout(() => {
      setFading(true);
    }, 1500); 
    const removeTimer = setTimeout(() => {
      setVisible(false);
    }, 2100);

    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(removeTimer);
    };
  }, []);

  if (!visible) return null;

  return (
    <div style={{
      position: "fixed", inset: 0, 
      backgroundColor: "#ffffff", zIndex: 99999, display: "flex", 
      justifyContent: "center", alignItems: "center",
      transition: "opacity 0.6s cubic-bezier(0.16, 1, 0.3, 1)",
      opacity: fading ? 0 : 1,
      pointerEvents: fading ? "none" : "all"
    }}>
      <div className="op-preloader-wrapper">
        <div className="op-ring op-ring-1"></div>
        <div className="op-ring op-ring-2"></div>
        <div className="op-ring op-ring-3"></div>
        <img src="/logo.svg" alt="OpelSoft" className="op-preloader-img" />
      </div>
      <style>{`
        .op-preloader-wrapper {
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
          width: 320px;
          height: 320px;
        }
        .op-preloader-img {
          height: 55px;
          width: auto;
          position: relative;
          z-index: 10;
          animation: logo-entrance 1.2s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
        .op-ring {
          position: absolute;
          border-radius: 50%;
          border: 2px solid transparent;
        }
        .op-ring-1 {
          inset: 0;
          border-top-color: var(--op-indigo, #4F46E5);
          border-left-color: rgba(79,70,229, 0.15);
          animation: spin-1 2s cubic-bezier(0.68, -0.55, 0.265, 1.55) infinite;
        }
        .op-ring-2 {
          inset: 16px;
          border-bottom-color: var(--op-indigo, #4F46E5);
          border-right-color: rgba(79,70,229, 0.15);
          animation: spin-2 2.5s cubic-bezier(0.68, -0.55, 0.265, 1.55) infinite;
        }
        .op-ring-3 {
          inset: 32px;
          border-top-color: rgba(79,70,229, 0.5);
          border-left-color: rgba(79,70,229, 0.05);
          animation: spin-1 1.5s linear infinite reverse;
        }
        @keyframes spin-1 {
          0% { transform: rotate(0deg); border-width: 2px; }
          50% { transform: rotate(180deg); border-width: 4px; }
          100% { transform: rotate(360deg); border-width: 2px; }
        }
        @keyframes spin-2 {
          0% { transform: rotate(360deg); border-width: 2px; }
          50% { transform: rotate(180deg); border-width: 4px; }
          100% { transform: rotate(0deg); border-width: 2px; }
        }
        @keyframes logo-entrance {
          0% { transform: scale(0.85); opacity: 0; filter: blur(8px); }
          100% { transform: scale(1); opacity: 1; filter: blur(0px); }
        }
      `}</style>
    </div>
  );
}
