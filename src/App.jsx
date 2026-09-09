import React, { useState, useEffect } from "react";
import {
  ArrowUpRight,
  Leaf,
  Shield,
  FileCheck,
  Lock,
  Database,
  ClipboardCheck,
  Factory,
  Activity,
  Landmark,
  Sparkles,
  FlaskConical,
  Users,
  Send,
  Globe,
} from "lucide-react";
import HeroTree from "./components/HeroTree.jsx";
import QualityTreeViz from "./components/QualityTreeViz.jsx";
import { COPY, detectLang } from "./copy.js";

// Platform routes are served under the same www domain via vercel.json rewrites (proxy to app.qualy-tree.com)
const APP_URL = "";
const CONTACT = "contact@qualytree.co.kr";

const PILLAR_ICONS = [
  <Landmark size={18} strokeWidth={1.6} />,
  <ClipboardCheck size={18} strokeWidth={1.6} />,
  <Factory size={18} strokeWidth={1.6} />,
  <Activity size={18} strokeWidth={1.6} />,
];
const SUPPORT_ICONS = [
  <Sparkles size={18} strokeWidth={1.7} />,
  <FlaskConical size={18} strokeWidth={1.7} />,
  <Users size={18} strokeWidth={1.7} />,
  <Send size={18} strokeWidth={1.7} />,
];
const TRUST_ICONS = [
  <FileCheck size={18} strokeWidth={1.7} />,
  <Database size={18} strokeWidth={1.7} />,
  <Shield size={18} strokeWidth={1.7} />,
  <Lock size={18} strokeWidth={1.7} />,
];

export default function App() {
  const [scrolled, setScrolled] = useState(false);
  const [lang, setLang] = useState(detectLang);
  const c = COPY[lang];

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Language: persist + reflect in <html lang>, <title>, meta description
  useEffect(() => {
    try { window.localStorage.setItem("qt.lang", lang); } catch (e) { /* ignore */ }
    document.documentElement.lang = c.htmlLang;
    document.title = c.title;
    const m = document.querySelector('meta[name="description"]');
    if (m) m.setAttribute("content", c.meta);
  }, [lang, c]);

  // Reveal-on-scroll (restrained, once)
  useEffect(() => {
    const els = document.querySelectorAll("[data-reveal]");
    if (!("IntersectionObserver" in window)) {
      els.forEach((el) => el.classList.add("is-in"));
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("is-in");
            io.unobserve(e.target);
          }
        });
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.08 }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [lang]);

  const toggleLang = () => setLang((l) => (l === "en" ? "ko" : "en"));

  return (
    <div
      style={{
        // Brand tokens — Option D: white + emerald, charcoal nav
        "--ink": "#111517",
        "--ink-soft": "#2B3235",
        "--ink-mute": "#5F6A6E",
        "--paper": "#FFFFFF",
        "--paper-deep": "#F1F3F2",
        "--paper-line": "#E1E5E3",
        "--moss": "#0E7A4F",
        "--moss-mid": "#159A62",
        "--leaf": "#2FB47A",
        "--amber": "#E0891F",
        "--amber-soft": "#F5C57A",
        "--rust": "#8B3A1F",
        "--deep": "#16201B",
        backgroundColor: "var(--paper)",
        color: "var(--ink)",
        fontFamily:
          "'Pretendard', 'Pretendard Variable', -apple-system, system-ui, sans-serif",
        fontFeatureSettings: "'ss01', 'ss02', 'cv11'",
        minHeight: "100vh",
      }}
      className="relative overflow-x-hidden"
    >
      {/* Fonts + base */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght,SOFT@9..144,300..900,30..100&display=swap');
        @import url('https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;600&display=swap');
        @import url('https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/variable/pretendardvariable.min.css');

        .font-display { font-family: 'Fraunces', 'Pretendard Variable', serif; font-feature-settings: 'ss01','ss02','onum'; letter-spacing: -0.02em; word-break: keep-all; }
        .font-mono    { font-family: 'JetBrains Mono', ui-monospace, monospace; }
        .font-body    { font-family: 'Pretendard Variable', 'Pretendard', sans-serif; }

        .grain::before {
          content: '';
          position: absolute; inset: 0;
          background-image: radial-gradient(rgba(17,21,23,0.05) 1px, transparent 1px);
          background-size: 3px 3px;
          mix-blend-mode: multiply;
          pointer-events: none;
          opacity: .5;
        }

        @keyframes rise { from { opacity: 0; transform: translateY(14px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes drawLine { from { stroke-dashoffset: 1200; } to { stroke-dashoffset: 0; } }
        @keyframes leafIn { from { opacity: 0; transform: scale(0.6); } to { opacity: 1; transform: scale(1); } }
        @keyframes pulse-soft { 0%, 100% { opacity: 1; } 50% { opacity: 0.55; } }

        .rise        { animation: rise .9s cubic-bezier(.2,.7,.2,1) both; }
        .draw-line   { stroke-dasharray: 1200; animation: drawLine 2.4s ease-out forwards; }
        .leaf-in     { animation: leafIn .8s cubic-bezier(.2,.8,.2,1) both; }
        .pulse-soft  { animation: pulse-soft 2.4s ease-in-out infinite; }

        [data-reveal] { opacity: 0; transform: translateY(18px); transition: opacity .9s cubic-bezier(.2,.7,.2,1), transform .9s cubic-bezier(.2,.7,.2,1); }
        [data-reveal].is-in { opacity: 1; transform: none; }
        [data-reveal="1"] { transition-delay: .08s }
        [data-reveal="2"] { transition-delay: .16s }
        [data-reveal="3"] { transition-delay: .24s }
        [data-reveal="4"] { transition-delay: .32s }
        @media (prefers-reduced-motion: reduce) {
          [data-reveal] { opacity: 1; transform: none; transition: none; }
          .rise, .leaf-in, .draw-line, .pulse-soft { animation: none; }
        }

        .uline { background-image: linear-gradient(to right, currentColor, currentColor);
                 background-size: 100% 1px; background-repeat: no-repeat;
                 background-position: 0 100%; padding-bottom: 2px; }
        ::selection { background: var(--amber); color: var(--paper); }
        .card { transition: transform .35s ease, box-shadow .35s ease, background-color .35s ease, border-color .35s ease; }
        .card:hover { transform: translateY(-2px); box-shadow: 0 10px 30px rgba(17,21,23,0.06); }
        .rule { position: relative; height: 1px; background: rgba(17,21,23,0.12); }
        .rule::after { content: ''; position: absolute; left: 0; top: -1px; width: 48px; height: 3px; background: var(--amber); }

        .nav-link { color: rgba(255,255,255,0.78); transition: color .2s; }
        .nav-link:hover { color: #fff; }
        .lang-btn { border: 1px solid rgba(255,255,255,0.28); color: rgba(255,255,255,0.9); transition: background-color .2s, border-color .2s; }
        .lang-btn:hover { background: rgba(255,255,255,0.08); border-color: rgba(255,255,255,0.5); }

        .certmap img { min-width: 960px; }
        @media (min-width: 1024px) { .certmap img { min-width: 0; } }

        html { scroll-behavior: smooth; }
        body { background: var(--paper); }
      `}</style>

      {/* ===================== NAV ===================== */}
      <nav
        className="fixed top-0 left-0 right-0 z-50 transition-all"
        style={{
          backgroundColor: scrolled ? "rgba(22,32,27,0.94)" : "var(--deep)",
          backdropFilter: scrolled ? "saturate(140%) blur(14px)" : "none",
          borderBottom: "1px solid rgba(255,255,255,0.06)",
        }}
      >
        <div className="max-w-[1280px] mx-auto px-6 lg:px-10 h-[68px] flex items-center justify-between">
          <a href="#top" className="flex items-center gap-2.5 group">
            <LogoMark size={28} dark />
            <span className="font-display text-[19px] sm:text-[22px] font-medium tracking-tight" style={{ color: "#fff" }}>
              Qualytree
            </span>
            <span
              className="font-mono text-[10px] uppercase tracking-[0.18em] ml-1 mt-1 hidden sm:inline"
              style={{ color: "rgba(255,255,255,0.5)" }}
            >
              {lang === "en" ? "퀄리트리" : "Qualytree"}
            </span>
          </a>

          <div className="hidden lg:flex items-center gap-8 text-[14px]">
            <a className="nav-link" href="#platform">{c.nav.platform}</a>
            <a className="nav-link" href="#compliance">{c.nav.compliance}</a>
            <a className="nav-link" href="#trust">{c.nav.trust}</a>
            <a className="nav-link" href="#people">{c.nav.people}</a>
            <a className="nav-link" href="#about">{c.nav.about}</a>
            <a className="nav-link" href="#grant">{c.nav.grant}</a>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={toggleLang}
              className="lang-btn inline-flex items-center gap-1.5 text-[12.5px] px-3 py-1.5 rounded-full font-mono tracking-[0.06em] whitespace-nowrap"
              aria-label={c.nav.langLabel}
              title={c.nav.langLabel}
            >
              <Globe size={13} strokeWidth={1.8} />
              <span className="hidden sm:inline">{c.nav.langSwitch}</span>
              <span className="sm:hidden">{lang === "en" ? "KO" : "EN"}</span>
            </button>
            <a
              href={`${APP_URL}/login`}
              rel="noopener noreferrer"
              className="hidden sm:inline-flex items-center text-[14px] px-3.5 py-2 rounded-full transition"
              style={{ color: "#fff", border: "1px solid rgba(255,255,255,0.28)" }}
            >
              {c.nav.login}
            </a>
            <a
              href={`${APP_URL}/signup`}
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-[14px] px-4 py-2 rounded-full transition hover:opacity-90 whitespace-nowrap"
              style={{ backgroundColor: "var(--leaf)", color: "var(--ink)", fontWeight: 500 }}
            >
              <span className="hidden sm:inline">{c.nav.signup}</span>
              <span className="sm:hidden">{c.nav.signupShort}</span>
              <ArrowUpRight size={14} strokeWidth={2} />
            </a>
          </div>
        </div>
      </nav>

      {/* ===================== HERO ===================== */}
      <section id="top" className="relative grain" style={{ paddingTop: "148px", paddingBottom: "64px" }}>
        <div
          className="absolute inset-0 -z-10"
          style={{
            background:
              "radial-gradient(900px 480px at 12% -10%, rgba(47,180,122,0.14), transparent 60%), radial-gradient(700px 400px at 95% 10%, rgba(224,137,31,0.08), transparent 60%)",
          }}
        />

        <div className="max-w-[1280px] mx-auto px-6 lg:px-10 grid lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-7 rise">
            <h1
              className="font-display leading-[0.98]"
              style={{ color: "var(--ink)", fontSize: "clamp(44px, 6.6vw, 88px)", fontWeight: 380, wordBreak: "keep-all" }}
            >
              {c.hero.h1a}
              <br />
              <span style={{ fontStyle: "italic", fontWeight: 320 }}>{c.hero.h1b}</span>
            </h1>
            <p
              className="font-display mt-3 italic tracking-tight"
              style={{ color: "var(--moss)", fontSize: "clamp(20px, 2.4vw, 28px)", fontWeight: 300 }}
            >
              {c.hero.tagline}
            </p>

            <p className="mt-8 max-w-[600px] text-[17px] leading-[1.7]" style={{ color: "var(--ink-soft)" }}>
              {c.hero.p1}{" "}
              <span style={{ color: "var(--ink)", fontWeight: 500 }}>{c.hero.p2}</span>{" "}
              {c.hero.p3}
            </p>
          </div>

          <div className="lg:col-span-5 relative">
            <HeroTree />
          </div>
        </div>

        {/* Principles strip */}
        <div className="max-w-[1280px] mx-auto px-6 lg:px-10 mt-20">
          <div className="relative grid md:grid-cols-3 border-t border-b py-8" style={{ borderColor: "rgba(17,21,23,0.14)" }}>
            {c.principles.map((m, i) => (
              <div
                key={i}
                className="px-6 py-3 md:border-r last:border-r-0"
                style={{ borderColor: "rgba(17,21,23,0.08)" }}
                data-reveal={String(i)}
              >
                <div className="font-display italic" style={{ color: "var(--moss)", fontSize: "42px", fontWeight: 340, lineHeight: 1 }}>
                  {m.k}
                </div>
                <div className="mt-3 font-mono text-[11px] uppercase tracking-[0.18em]" style={{ color: "var(--amber)" }}>
                  {m.t}
                </div>
                <div className="mt-2 text-[14.5px] leading-[1.6]" style={{ color: "var(--ink-soft)" }}>
                  {m.s}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===================== 01 · PLATFORM ===================== */}
      <section id="platform" className="relative py-24 lg:py-32" style={{ backgroundColor: "var(--paper-deep)" }}>
        <div className="max-w-[1280px] mx-auto px-6 lg:px-10">
          <div data-reveal>
            <SectionHeader
              number={c.platform.number}
              kicker={c.platform.kicker}
              title={<Title a={c.platform.titleA} em={c.platform.titleEm} b={c.platform.titleB} />}
              sub={c.platform.sub}
            />
          </div>

          <div
            className="mt-16 grid md:grid-cols-2 gap-px rounded-[24px] overflow-hidden"
            style={{ backgroundColor: "rgba(17,21,23,0.10)", border: "1px solid rgba(17,21,23,0.10)" }}
          >
            {c.platform.pillars.map((p, i) => (
              <div key={i} data-reveal={String(i)}>
                <PillarCell {...p} icon={PILLAR_ICONS[i]} idx={i + 1} />
              </div>
            ))}
          </div>

          <div className="mt-6 grid md:grid-cols-3 gap-4" data-reveal>
            {c.platform.audiences.map((a, i) => (
              <div key={i} className="card p-7 rounded-[20px]" style={{ backgroundColor: "var(--paper)", border: "1px solid rgba(17,21,23,0.10)" }}>
                <div className="font-mono text-[10px] tracking-[0.2em] uppercase" style={{ color: "var(--amber)" }}>{a.tag}</div>
                <div className="mt-3 font-display text-[22px] leading-tight" style={{ fontWeight: 460 }}>{a.t}</div>
                <div className="mt-2 text-[13.5px] leading-[1.6]" style={{ color: "var(--ink-soft)" }}>{a.s}</div>
              </div>
            ))}
          </div>

          <p className="mt-10 max-w-[720px] text-[14.5px] leading-[1.7]" style={{ color: "var(--ink-mute)" }} data-reveal>
            {c.platform.note}
          </p>
        </div>
      </section>

      {/* ===================== 02 · COMPLIANCE ===================== */}
      <section id="compliance" className="relative py-24 lg:py-32">
        <div className="max-w-[1280px] mx-auto px-6 lg:px-10">
          <div data-reveal>
            <SectionHeader
              number={c.compliance.number}
              kicker={c.compliance.kicker}
              title={<Title a={c.compliance.titleA} em={c.compliance.titleEm} b={c.compliance.titleB} />}
              sub={c.compliance.sub}
            />
          </div>

          <div className="mt-16 grid lg:grid-cols-12 gap-10">
            <div className="lg:col-span-7" data-reveal>
              <div className="rule" />
              {c.compliance.frameworks.map((f, i) => (
                <div key={i} className="grid grid-cols-12 gap-4 py-5 items-baseline" style={{ borderBottom: "1px solid rgba(17,21,23,0.10)" }}>
                  <div className="col-span-5 sm:col-span-3 font-mono text-[12px] tracking-[0.06em]" style={{ color: "var(--amber)" }}>{f.code}</div>
                  <div className="col-span-7 sm:col-span-4 font-display text-[19px] leading-tight" style={{ fontWeight: 460 }}>{f.name}</div>
                  <div className="col-span-12 sm:col-span-5 text-[13.5px] leading-[1.55]" style={{ color: "var(--ink-soft)" }}>{f.scope}</div>
                </div>
              ))}
            </div>

            <div className="lg:col-span-5" data-reveal="1">
              <div className="rounded-[24px] p-8 lg:p-10 h-full flex flex-col justify-between" style={{ backgroundColor: "var(--deep)", color: "#fff" }}>
                <div>
                  <div className="font-mono text-[10px] tracking-[0.22em] uppercase" style={{ color: "var(--leaf)" }}>{c.compliance.cardKicker}</div>
                  <div className="mt-4 font-display leading-[1.08]" style={{ fontSize: "clamp(26px, 2.6vw, 34px)", fontWeight: 380 }}>
                    {c.compliance.cardTitleA}
                    <br />
                    <em style={{ fontWeight: 320, color: "var(--leaf)" }}>{c.compliance.cardTitleEm}</em>
                  </div>
                  <p className="mt-5 text-[14.5px] leading-[1.7]" style={{ color: "rgba(255,255,255,0.8)" }}>{c.compliance.cardBody}</p>
                </div>
                <ul className="mt-8 space-y-3 text-[14px]" style={{ color: "rgba(255,255,255,0.92)" }}>
                  {c.compliance.cardBullets.map((t, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <Leaf size={16} style={{ color: "var(--amber-soft)", marginTop: 4, flex: "none" }} />
                      <span>{t}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Certification landscape — world map */}
          <div className="mt-20" data-reveal>
            <div className="flex items-baseline justify-between flex-wrap gap-3">
              <div className="font-mono text-[11px] tracking-[0.22em] uppercase" style={{ color: "var(--amber)" }}>{c.compliance.mapKicker}</div>
              <div className="font-mono text-[10px] tracking-[0.14em] uppercase" style={{ color: "var(--ink-mute)" }}>{c.compliance.mapNote}</div>
            </div>
            <div className="mt-6 rounded-[24px] overflow-x-auto certmap" style={{ border: "1px solid rgba(17,21,23,0.10)", backgroundColor: "#FFFFFF" }}>
              <picture>
                <source srcSet="/cert-landscape.webp" type="image/webp" />
                <img
                  src="/cert-landscape.png"
                  alt={c.compliance.mapAlt}
                  width="2600"
                  height="1180"
                  loading="lazy"
                  style={{ display: "block", width: "100%", height: "auto", minWidth: 960 }}
                />
              </picture>
            </div>
            <div className="mt-4 flex flex-wrap gap-x-6 gap-y-2 font-mono text-[10.5px] tracking-[0.14em] uppercase" style={{ color: "var(--ink-mute)" }}>
              <span><b style={{ color: "var(--moss)" }}>■</b> {c.compliance.legend[0]}</span>
              <span><b style={{ color: "var(--ink)" }}>■</b> {c.compliance.legend[1]}</span>
              <span>■ {c.compliance.legend[2]}</span>
            </div>
          </div>
        </div>
      </section>

      {/* ===================== 03 · SUPPORT ===================== */}
      <section id="support" className="relative py-24 lg:py-32" style={{ backgroundColor: "var(--paper-deep)" }}>
        <div className="max-w-[1280px] mx-auto px-6 lg:px-10">
          <div data-reveal>
            <SectionHeader
              number={c.support.number}
              kicker={c.support.kicker}
              title={<Title a={c.support.titleA} em={c.support.titleEm} b={c.support.titleB} />}
              sub={c.support.sub}
            />
          </div>

          <div className="mt-14 grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            {c.support.items.map((t, i) => (
              <div key={i} className="card relative p-7 rounded-[18px]" style={{ backgroundColor: "var(--paper)", border: "1px solid rgba(17,21,23,0.10)" }} data-reveal={String(i)}>
                <div className="flex items-start justify-between">
                  <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ backgroundColor: "var(--moss)", color: "#fff" }}>
                    {SUPPORT_ICONS[i]}
                  </div>
                  {t.soon && (
                    <span className="font-mono text-[9.5px] tracking-[0.16em] uppercase px-2 py-1 rounded-full" style={{ border: "1px solid rgba(224,137,31,0.5)", color: "var(--amber)" }}>
                      {c.support.soon}
                    </span>
                  )}
                </div>
                <div className="mt-5 font-display text-[20px] leading-tight" style={{ fontWeight: 460 }}>{t.title}</div>
                <div className="mt-2 text-[13.5px] leading-[1.6]" style={{ color: "var(--ink-soft)" }}>{t.body}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===================== 04 · QUALITY TREE ===================== */}
      <section className="relative py-24 lg:py-32 grain" style={{ backgroundColor: "var(--deep)", color: "#fff" }}>
        <div className="max-w-[1280px] mx-auto px-6 lg:px-10 grid lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-5" data-reveal>
            <div className="font-mono text-[11px] tracking-[0.22em] uppercase" style={{ color: "var(--leaf)" }}>{c.tree.kicker}</div>
            <h2 className="font-display mt-4 leading-[1.02]" style={{ fontSize: "clamp(36px, 4.4vw, 60px)", fontWeight: 380 }}>
              {c.tree.titleA}
              <br />
              <em style={{ fontWeight: 320, color: "var(--leaf)" }}>{c.tree.titleEm}</em>
            </h2>
            <p className="mt-6 text-[15.5px] leading-[1.7]" style={{ color: "rgba(255,255,255,0.8)" }}>{c.tree.body}</p>
            <ul className="mt-8 space-y-3 text-[14px]" style={{ color: "rgba(255,255,255,0.92)" }}>
              {c.tree.bullets.map((t, i) => (
                <li key={i} className="flex items-start gap-3">
                  <Leaf size={16} style={{ color: "var(--amber-soft)", marginTop: 4, flex: "none" }} />
                  <span>{t}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="lg:col-span-7" data-reveal="1">
            <QualityTreeViz leaves={c.tree.leaves} caption1={c.tree.caption1} caption2={c.tree.caption2} legend={c.tree.legend} />
          </div>
        </div>
      </section>

      {/* ===================== 05 · DATA & SECURITY ===================== */}
      <section id="trust" className="relative py-24 lg:py-32" style={{ backgroundColor: "var(--paper)" }}>
        <div className="max-w-[1280px] mx-auto px-6 lg:px-10">
          <div data-reveal>
            <SectionHeader
              number={c.trust.number}
              kicker={c.trust.kicker}
              title={<Title a={c.trust.titleA} em={c.trust.titleEm} b={c.trust.titleB} />}
              sub={c.trust.sub}
            />
          </div>

          <div className="mt-14 grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            {c.trust.items.map((t, i) => (
              <div key={i} className="card relative p-7 rounded-[18px]" style={{ backgroundColor: "var(--paper-deep)", border: "1px solid rgba(17,21,23,0.08)" }} data-reveal={String(i)}>
                <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ backgroundColor: "var(--moss)", color: "#fff" }}>
                  {TRUST_ICONS[i]}
                </div>
                <div className="mt-5 font-display text-[20px] leading-tight" style={{ fontWeight: 460 }}>{t.title}</div>
                <div className="mt-2 text-[13.5px] leading-[1.6]" style={{ color: "var(--ink-soft)" }}>{t.body}</div>
                <div className="mt-5 font-mono text-[10px] uppercase tracking-[0.18em]" style={{ color: "var(--amber)" }}>{t.tag}</div>
              </div>
            ))}
          </div>

          <div className="mt-14" data-reveal>
            <div className="font-mono text-[10px] tracking-[0.2em] uppercase mb-3" style={{ color: "var(--ink-mute)" }}>{c.trust.designedTo}</div>
            <div className="flex flex-wrap gap-2">
              {c.trust.pills.map((p) => (
                <span key={p} className="font-mono text-[11px] tracking-[0.08em] px-3 py-1.5 rounded-full" style={{ border: "1px solid rgba(17,21,23,0.16)", color: "var(--ink-soft)" }}>
                  {p}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ===================== 06 · PEOPLE ===================== */}
      <section id="people" className="relative py-24 lg:py-32" style={{ backgroundColor: "var(--paper-deep)" }}>
        <div className="max-w-[1280px] mx-auto px-6 lg:px-10">
          <div data-reveal>
            <SectionHeader
              number={c.people.number}
              kicker={c.people.kicker}
              title={<Title a={c.people.titleA} em={c.people.titleEm} b={c.people.titleB} />}
              sub={c.people.sub}
            />
          </div>

          <div className="mt-14 grid md:grid-cols-3 gap-4">
            {c.people.cards.map((b, i) => (
              <div key={i} className="card p-8 rounded-[20px]" style={{ backgroundColor: "var(--paper)", border: "1px solid rgba(17,21,23,0.10)" }} data-reveal={String(i)}>
                <div className="font-mono text-[10px] tracking-[0.2em] uppercase" style={{ color: "var(--amber)" }}>{b.tag}</div>
                <div className="mt-4 font-display text-[24px] leading-[1.18] whitespace-pre-line" style={{ fontWeight: 460 }}>{b.t}</div>
                <div className="mt-4 text-[14px] leading-[1.65]" style={{ color: "var(--ink-soft)" }}>{b.s}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===================== 07 · ABOUT ===================== */}
      <section id="about" className="relative py-24 lg:py-32">
        <div className="max-w-[1280px] mx-auto px-6 lg:px-10 grid lg:grid-cols-12 gap-12">
          <div className="lg:col-span-5" data-reveal>
            <div className="font-mono text-[11px] tracking-[0.22em] uppercase" style={{ color: "var(--amber)" }}>{c.about.kicker}</div>
            <h2 className="font-display mt-4 leading-[1.02]" style={{ fontSize: "clamp(36px, 4.2vw, 56px)", fontWeight: 380 }}>
              {c.about.titleA}
              <br />
              <em className="italic">{c.about.titleEm}</em>{c.about.titleB}
            </h2>
            <p className="mt-6 text-[15px] leading-[1.7]" style={{ color: "var(--ink-soft)" }}>{c.about.body}</p>
          </div>

          <div className="lg:col-span-7 grid sm:grid-cols-3 gap-4 content-start">
            {c.about.cards.map((b, i) => (
              <div key={i} className="p-7 rounded-[18px]" style={{ backgroundColor: "var(--paper-deep)", border: "1px solid rgba(17,21,23,0.08)" }} data-reveal={String(i)}>
                <div className="font-mono text-[10px] tracking-[0.2em] uppercase" style={{ color: "var(--amber)" }}>{b.tag}</div>
                <div className="mt-3 font-display text-[22px] leading-tight" style={{ fontWeight: 460 }}>{b.t}</div>
                <div className="mt-2 text-[13px] leading-[1.55]" style={{ color: "var(--ink-soft)" }}>{b.s}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===================== CTA ===================== */}
      <section id="cta" className="relative py-28 lg:py-36 grain" style={{ backgroundColor: "var(--ink)", color: "#fff" }}>
        <div
          className="absolute inset-0 -z-0 opacity-[0.22]"
          style={{ background: "radial-gradient(700px 380px at 80% 30%, var(--leaf), transparent 60%), radial-gradient(700px 380px at 10% 80%, var(--amber), transparent 60%)" }}
        />
        <div className="max-w-[1180px] mx-auto px-6 lg:px-10 relative">
          <div className="font-mono text-[11px] tracking-[0.22em] uppercase" style={{ color: "var(--leaf)" }}>{c.cta.kicker}</div>
          <h2 id="grant" className="font-display mt-4 leading-[0.98]" style={{ fontSize: "clamp(44px, 7vw, 96px)", fontWeight: 360 }}>
            {c.cta.titleA}
            <br />
            <em className="italic">{c.cta.titleEm}</em>
          </h2>

          <div className="mt-12 grid lg:grid-cols-3 gap-4">
            {c.cta.cards.map((b, i) => {
              const primary = i === 0;
              const href = i === 0 ? `${APP_URL}/signup` : i === 1 ? `mailto:${CONTACT}?subject=${encodeURIComponent("[Qualytree] " + b.t)}` : `mailto:${CONTACT}`;
              return (
                <div
                  key={i}
                  className="p-7 rounded-[20px] flex flex-col justify-between"
                  style={{
                    backgroundColor: primary ? "#fff" : "rgba(255,255,255,0.06)",
                    border: primary ? "none" : "1px solid rgba(255,255,255,0.18)",
                    color: primary ? "var(--ink)" : "#fff",
                    minHeight: 210,
                  }}
                >
                  <div>
                    <div className="font-display text-[26px] leading-tight" style={{ fontWeight: 460 }}>{b.t}</div>
                    <div className="mt-2 text-[14px] leading-[1.6]" style={{ color: primary ? "var(--ink-soft)" : "rgba(255,255,255,0.72)" }}>{b.s}</div>
                  </div>
                  <a
                    href={href}
                    rel={primary ? "noopener noreferrer" : undefined}
                    className="mt-6 inline-flex items-center gap-2 text-[14px]"
                    style={{ color: primary ? "var(--moss)" : "var(--amber-soft)" }}
                  >
                    <span className="uline">{b.b}</span>
                    <ArrowUpRight size={14} />
                  </a>
                </div>
              );
            })}
          </div>

          <div className="mt-16 pt-8 border-t flex flex-wrap gap-x-10 gap-y-4 text-[13px]" style={{ borderColor: "rgba(255,255,255,0.16)", color: "rgba(255,255,255,0.72)" }}>
            <div>
              <div className="font-mono text-[10px] tracking-[0.2em] uppercase" style={{ color: "var(--leaf)" }}>{c.cta.contact}</div>
              <div className="mt-1">{CONTACT}</div>
            </div>
            <div>
              <div className="font-mono text-[10px] tracking-[0.2em] uppercase" style={{ color: "var(--leaf)" }}>{c.cta.location}</div>
              <div className="mt-1">{c.cta.locationV}</div>
            </div>
            <div>
              <div className="font-mono text-[10px] tracking-[0.2em] uppercase" style={{ color: "var(--leaf)" }}>{c.cta.expertise}</div>
              <div className="mt-1">{c.cta.expertiseV}</div>
            </div>
          </div>
        </div>
      </section>

      {/* ===================== FOOTER ===================== */}
      <footer className="py-10 px-6 lg:px-10" style={{ backgroundColor: "var(--paper)", borderTop: "1px solid rgba(17,21,23,0.10)" }}>
        <div className="max-w-[1280px] mx-auto flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-2.5 font-display text-[18px]" style={{ color: "var(--ink)" }}>
            <LogoMark size={22} />
            Qualytree
          </div>
          <div className="flex items-center gap-5">
            <button type="button" onClick={toggleLang} className="font-mono text-[11px] tracking-[0.14em] uline" style={{ color: "var(--ink-mute)" }}>
              {c.nav.langSwitch}
            </button>
            <div className="font-mono text-[11px] tracking-[0.14em]" style={{ color: "var(--ink-mute)" }}>{c.footer}</div>
          </div>
        </div>
      </footer>
    </div>
  );
}

/* ============================================================
   SUBCOMPONENTS
   ============================================================ */

function Title({ a, em, b }) {
  return (
    <>
      {a}
      <br />
      <em className="font-display italic">{em}</em>
      {b}
    </>
  );
}

function LogoMark({ size = 28, dark = false }) {
  const trunk = dark ? "#FFFFFF" : "var(--moss)";
  return (
    <svg width={size} height={size} viewBox="0 0 28 28" fill="none">
      <path d="M14 24 V8" stroke={trunk} strokeWidth="1.6" strokeLinecap="round" />
      <path d="M14 13 C14 13 9 12 7 9" stroke={trunk} strokeWidth="1.4" strokeLinecap="round" />
      <path d="M14 11 C14 11 19 10 21 7" stroke={trunk} strokeWidth="1.4" strokeLinecap="round" />
      <path d="M14 16 C14 16 10 16 8 14" stroke="var(--leaf)" strokeWidth="1.4" strokeLinecap="round" />
      <path d="M14 18 C14 18 18 18 20 16" stroke="var(--leaf)" strokeWidth="1.4" strokeLinecap="round" />
      <circle cx="7" cy="9" r="1.6" fill="var(--amber)" />
      <circle cx="21" cy="7" r="1.6" fill="var(--leaf)" />
      <circle cx="20" cy="16" r="1.4" fill="var(--moss-mid)" />
    </svg>
  );
}

function SectionHeader({ number, kicker, title, sub }) {
  return (
    <div className="grid lg:grid-cols-12 gap-8 lg:items-end">
      <div className="lg:col-span-7">
        <div className="flex items-baseline gap-4 font-mono text-[11px] tracking-[0.22em] uppercase" style={{ color: "var(--amber)" }}>
          <span>{number}</span>
          <span style={{ color: "var(--ink-mute)" }}>—</span>
          <span style={{ color: "var(--ink-soft)" }}>{kicker}</span>
        </div>
        <h2 className="font-display mt-5 leading-[1.05]" style={{ fontSize: "clamp(34px, 4.8vw, 60px)", fontWeight: 380, color: "var(--ink)" }}>
          {title}
        </h2>
      </div>
      {sub && (
        <p className="lg:col-span-5 text-[15px] leading-[1.7]" style={{ color: "var(--ink-soft)" }}>
          {sub}
        </p>
      )}
    </div>
  );
}

function PillarCell({ idx, title, en, body, icon }) {
  return (
    <div className="card relative p-8 lg:p-10 h-full" style={{ backgroundColor: "var(--paper)" }}>
      <div className="flex items-start justify-between">
        <div className="font-mono text-[11px] tracking-[0.22em] uppercase" style={{ color: "var(--amber)" }}>0{idx}</div>
        <div style={{ color: "var(--moss)", opacity: 0.7 }}>{icon}</div>
      </div>
      <div className="mt-8 font-display text-[26px] leading-[1.12]" style={{ color: "var(--ink)", fontWeight: 460 }}>{title}</div>
      <div className="mt-1.5 font-display italic text-[14px]" style={{ color: "var(--moss)", fontWeight: 320 }}>{en}</div>
      <div className="mt-4 text-[14.5px] leading-[1.65]" style={{ color: "var(--ink-soft)" }}>{body}</div>
    </div>
  );
}
