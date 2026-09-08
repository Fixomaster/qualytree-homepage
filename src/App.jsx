import React, { useState, useEffect, useRef } from "react";
import {
  ArrowUpRight,
  ArrowDown,
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
} from "lucide-react";

const APP_URL = "https://qualytree-app.vercel.app";

export default function App() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

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
  }, []);

  return (
    <div
      style={{
        // Brand tokens — Botanical Precision palette
        "--ink": "#0F1A14",
        "--ink-soft": "#2C3A32",
        "--ink-mute": "#5C6B62",
        "--paper": "#F8F4EC",
        "--paper-deep": "#EFE7D4",
        "--paper-line": "#E2D9C2",
        "--moss": "#143A2C",
        "--moss-mid": "#2D5F47",
        "--leaf": "#4A7C59",
        "--amber": "#C8772D",
        "--amber-soft": "#E8B97D",
        "--rust": "#8B3A1F",
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

        /* Subtle paper grain — purely visual, transparent overlay */
        .grain::before {
          content: '';
          position: absolute; inset: 0;
          background-image: radial-gradient(rgba(15,26,20,0.045) 1px, transparent 1px);
          background-size: 3px 3px;
          mix-blend-mode: multiply;
          pointer-events: none;
          opacity: .6;
        }

        /* Hero entrance */
        @keyframes rise {
          from { opacity: 0; transform: translateY(14px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes drawLine {
          from { stroke-dashoffset: 1200; }
          to   { stroke-dashoffset: 0; }
        }
        @keyframes leafIn {
          from { opacity: 0; transform: scale(0.6); }
          to   { opacity: 1; transform: scale(1); }
        }
        @keyframes pulse-soft {
          0%, 100% { opacity: 1; }
          50%      { opacity: 0.55; }
        }

        .rise        { animation: rise .9s cubic-bezier(.2,.7,.2,1) both; }
        .draw-line   { stroke-dasharray: 1200; animation: drawLine 2.4s ease-out forwards; }
        .leaf-in     { animation: leafIn .8s cubic-bezier(.2,.8,.2,1) both; }
        .pulse-soft  { animation: pulse-soft 2.4s ease-in-out infinite; }

        /* Reveal on scroll */
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

        /* Nice link underline */
        .uline { background-image: linear-gradient(to right, currentColor, currentColor);
                 background-size: 100% 1px; background-repeat: no-repeat;
                 background-position: 0 100%; padding-bottom: 2px; }

        /* Selection */
        ::selection { background: var(--amber); color: var(--paper); }

        /* Card hover */
        .card { transition: transform .35s ease, box-shadow .35s ease, background-color .35s ease, border-color .35s ease; }
        .card:hover { transform: translateY(-2px); }

        /* Hairline rule with amber tick */
        .rule { position: relative; height: 1px; background: rgba(20,58,44,0.14); }
        .rule::after { content: ''; position: absolute; left: 0; top: -1px; width: 48px; height: 3px; background: var(--amber); }

        html { scroll-behavior: smooth; }
        body { background: var(--paper); }
      `}</style>

      {/* ===================== NAV ===================== */}
      <nav
        className="fixed top-0 left-0 right-0 z-50 transition-all"
        style={{
          backgroundColor: scrolled ? "rgba(248,244,236,0.92)" : "transparent",
          backdropFilter: scrolled ? "saturate(140%) blur(14px)" : "none",
          borderBottom: scrolled
            ? "1px solid rgba(20,58,44,0.10)"
            : "1px solid transparent",
        }}
      >
        <div className="max-w-[1280px] mx-auto px-6 lg:px-10 h-[68px] flex items-center justify-between">
          <a href="#top" className="flex items-center gap-2.5 group">
            <LogoMark size={28} />
            <span
              className="font-display text-[22px] font-medium tracking-tight"
              style={{ color: "var(--ink)" }}
            >
              Qualytree
            </span>
            <span
              className="font-mono text-[10px] uppercase tracking-[0.18em] ml-1 mt-1 hidden sm:inline"
              style={{ color: "var(--ink-mute)" }}
            >
              퀄리트리
            </span>
          </a>

          <div
            className="hidden md:flex items-center gap-9 text-[14px]"
            style={{ color: "var(--ink-soft)" }}
          >
            <a className="hover:opacity-70 transition" href="#platform">
              플랫폼
            </a>
            <a className="hover:opacity-70 transition" href="#compliance">
              인증 체계
            </a>
            <a className="hover:opacity-70 transition" href="#trust">
              데이터·보안
            </a>
            <a className="hover:opacity-70 transition" href="#people">
              사람
            </a>
            <a className="hover:opacity-70 transition" href="#about">
              회사
            </a>
            <a className="hover:opacity-70 transition" href="#grant">
              정부지원사업
            </a>
          </div>

          <div className="flex items-center gap-2">
            <a
              href={`${APP_URL}/login`}
              rel="noopener noreferrer"
              className="hidden sm:inline-flex items-center text-[14px] px-3.5 py-2 rounded-full hover:bg-black/5 transition"
              style={{ color: "var(--ink)" }}
            >
              로그인
            </a>
            <a
              href={`${APP_URL}/signup`}
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-[14px] px-4 py-2 rounded-full transition hover:opacity-90"
              style={{ backgroundColor: "var(--moss)", color: "var(--paper)" }}
            >
              도입 신청
              <ArrowUpRight size={14} strokeWidth={2} />
            </a>
          </div>
        </div>
      </nav>

      {/* ===================== HERO ===================== */}
      <section
        id="top"
        className="relative grain"
        style={{ paddingTop: "132px", paddingBottom: "72px" }}
      >
        <div
          className="absolute inset-0 -z-10"
          style={{
            background:
              "radial-gradient(900px 480px at 12% -10%, rgba(74,124,89,0.18), transparent 60%), radial-gradient(700px 400px at 95% 10%, rgba(200,119,45,0.10), transparent 60%)",
          }}
        />

        <div className="max-w-[1280px] mx-auto px-6 lg:px-10 grid lg:grid-cols-12 gap-10 items-end">
          <div className="lg:col-span-7 rise">
            <div
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-[12px] font-mono tracking-[0.16em] uppercase"
              style={{
                backgroundColor: "rgba(20,58,44,0.06)",
                border: "1px solid rgba(20,58,44,0.12)",
                color: "var(--moss)",
              }}
            >
              <span
                className="w-1.5 h-1.5 rounded-full pulse-soft"
                style={{ backgroundColor: "var(--leaf)" }}
              />
              MEDICAL DEVICE · RA + eQMS · 제조사 · 수입업체 · OEM
            </div>

            <h1
              className="font-display mt-6 leading-[0.98]"
              style={{
                color: "var(--ink)",
                fontSize: "clamp(44px, 6.6vw, 88px)",
                fontWeight: 380,
                wordBreak: "keep-all",
              }}
            >
              품질은
              <br />
              <span style={{ fontStyle: "italic", fontWeight: 320 }}>
                나무처럼
              </span>{" "}
              자랍니다.
            </h1>
            <p
              className="font-display mt-3 italic tracking-tight"
              style={{
                color: "var(--moss-mid)",
                fontSize: "clamp(20px, 2.4vw, 28px)",
                fontWeight: 300,
              }}
            >
              Quality grows like a tree.
            </p>

            <p
              className="mt-8 max-w-[600px] text-[17px] leading-[1.7]"
              style={{ color: "var(--ink-soft)" }}
            >
              의료기기 인허가와 품질경영시스템을 하나의 체계로.{" "}
              <span style={{ color: "var(--ink)", fontWeight: 500 }}>
                어떤 인증 체계든, 누가 담당하든, 같은 기준과 같은 기록으로
                관리됩니다.
              </span>{" "}
              규제가 요구하는 수준의 데이터 무결성 위에서.
            </p>

            <div className="mt-9 flex flex-wrap items-center gap-3">
              <a
                href={`${APP_URL}/signup`}
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-3 rounded-full text-[15px] font-medium hover:opacity-90 transition"
                style={{ backgroundColor: "var(--moss)", color: "var(--paper)" }}
              >
                도입 신청하기
                <ArrowUpRight size={16} />
              </a>
              <a
                href="#platform"
                className="inline-flex items-center gap-2 px-5 py-3 rounded-full text-[15px] hover:bg-black/5 transition"
                style={{
                  color: "var(--ink)",
                  border: "1px solid rgba(20,58,44,0.18)",
                }}
              >
                플랫폼 소개
                <ArrowDown size={15} />
              </a>
            </div>

            <div
              className="mt-12 flex flex-wrap items-center gap-x-6 gap-y-2 font-mono text-[11px] tracking-[0.14em] uppercase"
              style={{ color: "var(--ink-mute)" }}
            >
              <span>ISO 13485 : 2016</span>
              <span>·</span>
              <span>KGMP</span>
              <span>·</span>
              <span>FDA QMSR</span>
              <span>·</span>
              <span>EU MDR</span>
              <span>·</span>
              <span>MDSAP</span>
              <span>·</span>
              <span>21 CFR PART 11</span>
            </div>
          </div>

          <div className="lg:col-span-5 relative">
            <HeroTree />
          </div>
        </div>

        {/* Principles strip */}
        <div className="max-w-[1280px] mx-auto px-6 lg:px-10 mt-24">
          <div
            className="relative grid md:grid-cols-3 border-t border-b py-8"
            style={{ borderColor: "rgba(20,58,44,0.18)" }}
          >
            {[
              {
                k: "One.",
                t: "하나의 체계",
                s: "인허가 준비부터 일상적인 품질경영까지, 흩어진 파일과 시스템을 한 자리에 모읍니다.",
              },
              {
                k: "Every.",
                t: "모든 인증",
                s: "국내 KGMP에서 ISO 13485, FDA, EU MDR까지 — 목표 시장이 늘어나도 기준은 한 벌입니다.",
              },
              {
                k: "Whole.",
                t: "완전한 기록",
                s: "누가, 언제, 무엇을, 왜 바꿨는지가 남습니다. 심사 앞에서 설명할 필요 없이 보여주면 됩니다.",
              },
            ].map((m, i) => (
              <div
                key={i}
                className="px-6 py-3 md:border-r last:border-r-0"
                style={{ borderColor: "rgba(20,58,44,0.10)" }}
                data-reveal={String(i)}
              >
                <div
                  className="font-display italic"
                  style={{
                    color: "var(--moss)",
                    fontSize: "42px",
                    fontWeight: 340,
                    lineHeight: 1,
                  }}
                >
                  {m.k}
                </div>
                <div
                  className="mt-3 font-mono text-[11px] uppercase tracking-[0.18em]"
                  style={{ color: "var(--amber)" }}
                >
                  {m.t}
                </div>
                <div
                  className="mt-2 text-[14.5px] leading-[1.6]"
                  style={{ color: "var(--ink-soft)" }}
                >
                  {m.s}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===================== 01 · PLATFORM ===================== */}
      <section
        id="platform"
        className="relative py-24 lg:py-32"
        style={{ backgroundColor: "var(--paper-deep)" }}
      >
        <div className="max-w-[1280px] mx-auto px-6 lg:px-10">
          <div data-reveal>
            <SectionHeader
              number="01"
              kicker="THE PLATFORM"
              title={
                <>
                  인허가와 품질경영,
                  <br />
                  <em className="font-display italic">한 체계</em> 안에서.
                </>
              }
              sub="인허가 서류는 여기, 품질기록은 저기, 현장 기록은 또 다른 곳 — 의료기기 제조사의 품질 정보는 늘 흩어져 있었습니다. Qualytree는 인허가(RA)와 전자 품질경영시스템(eQMS)을 처음부터 하나의 체계로 설계했습니다."
            />
          </div>

          <div className="mt-16 grid md:grid-cols-2 gap-px rounded-[24px] overflow-hidden" style={{ backgroundColor: "rgba(20,58,44,0.12)", border: "1px solid rgba(20,58,44,0.12)" }}>
            {pillars.map((p, i) => (
              <div key={i} data-reveal={String(i)}>
                <PillarCell {...p} idx={i + 1} />
              </div>
            ))}
          </div>

          {/* Who it's for */}
          <div
            className="mt-6 grid md:grid-cols-3 gap-4"
            data-reveal
          >
            {audiences.map((a, i) => (
              <div
                key={i}
                className="card p-7 rounded-[20px]"
                style={{ backgroundColor: "var(--paper)", border: "1px solid rgba(20,58,44,0.14)" }}
              >
                <div className="font-mono text-[10px] tracking-[0.2em] uppercase" style={{ color: "var(--amber)" }}>
                  {a.tag}
                </div>
                <div className="mt-3 font-display text-[22px] leading-tight" style={{ fontWeight: 460 }}>
                  {a.t}
                </div>
                <div className="mt-2 text-[13.5px] leading-[1.6]" style={{ color: "var(--ink-soft)" }}>
                  {a.s}
                </div>
              </div>
            ))}
          </div>

          <p
            className="mt-10 max-w-[720px] text-[14.5px] leading-[1.7]"
            style={{ color: "var(--ink-mute)" }}
            data-reveal
          >
            각 영역은 별개의 모듈이 아니라 같은 기록 위에서 움직입니다. 한 곳에서
            남긴 기록이 필요한 자리에 그대로 인용되므로, 같은 내용을 두 번 쓰거나
            서로 다른 버전이 생길 이유가 없습니다.
          </p>
        </div>
      </section>

      {/* ===================== 02 · COMPLIANCE ===================== */}
      <section id="compliance" className="relative py-24 lg:py-32">
        <div className="max-w-[1280px] mx-auto px-6 lg:px-10">
          <div data-reveal>
            <SectionHeader
              number="02"
              kicker="COMPLIANCE FRAMEWORKS"
              title={
                <>
                  어떤 인증 체계든,
                  <br />
                  <em className="font-display italic">같은 자리</em>에서.
                </>
              }
              sub="국내 허가와 해외 진출은 서로 다른 언어로 같은 것을 요구합니다. 인증마다 별도의 파일 더미를 만드는 대신, 회사의 품질 체계를 한 번 세우고 목표 시장의 요구사항으로 바라봅니다."
            />
          </div>

          <div className="mt-16 grid lg:grid-cols-12 gap-10">
            <div className="lg:col-span-7" data-reveal>
              <div className="rule" />
              {frameworks.map((f, i) => (
                <div
                  key={i}
                  className="grid grid-cols-12 gap-4 py-5 items-baseline"
                  style={{ borderBottom: "1px solid rgba(20,58,44,0.12)" }}
                >
                  <div
                    className="col-span-5 sm:col-span-3 font-mono text-[12px] tracking-[0.06em]"
                    style={{ color: "var(--amber)" }}
                  >
                    {f.code}
                  </div>
                  <div className="col-span-7 sm:col-span-4 font-display text-[19px] leading-tight" style={{ fontWeight: 460 }}>
                    {f.name}
                  </div>
                  <div
                    className="col-span-12 sm:col-span-5 text-[13.5px] leading-[1.55]"
                    style={{ color: "var(--ink-soft)" }}
                  >
                    {f.scope}
                  </div>
                </div>
              ))}
            </div>

            <div className="lg:col-span-5" data-reveal="1">
              <div
                className="rounded-[24px] p-8 lg:p-10 h-full flex flex-col justify-between"
                style={{
                  backgroundColor: "var(--moss)",
                  color: "var(--paper)",
                }}
              >
                <div>
                  <div
                    className="font-mono text-[10px] tracking-[0.22em] uppercase"
                    style={{ color: "var(--amber-soft)" }}
                  >
                    Multi-market, one baseline
                  </div>
                  <div
                    className="mt-4 font-display leading-[1.08]"
                    style={{ fontSize: "clamp(26px, 2.6vw, 34px)", fontWeight: 380 }}
                  >
                    시장이 하나 늘어나도,
                    <br />
                    <em style={{ fontWeight: 320 }}>체계는 그대로.</em>
                  </div>
                  <p
                    className="mt-5 text-[14.5px] leading-[1.7]"
                    style={{ color: "rgba(248,244,236,0.82)" }}
                  >
                    ISO 13485를 뿌리로 두고 KGMP, QMSR, MDR의 차이를 그 위에
                    얹습니다. 새 인증을 준비할 때 처음부터 다시 시작하는 것이
                    아니라, 이미 있는 체계에 부족한 부분만 더합니다.
                  </p>
                </div>
                <ul
                  className="mt-8 space-y-3 text-[14px]"
                  style={{ color: "rgba(248,244,236,0.92)" }}
                >
                  {[
                    "제·개정되는 규제 요구사항을 지속 반영",
                    "인증별 심사 관점에 맞춘 기록 구성",
                    "국내 허가에서 해외 인증까지 같은 데이터로",
                  ].map((t, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <Leaf size={16} style={{ color: "var(--amber-soft)", marginTop: 4, flex: "none" }} />
                      <span>{t}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Certification landscape — typographic cloud */}
          <div className="mt-20" data-reveal>
            <div className="flex items-baseline justify-between flex-wrap gap-3">
              <div className="font-mono text-[11px] tracking-[0.22em] uppercase" style={{ color: "var(--amber)" }}>
                Certification landscape
              </div>
              <div className="font-mono text-[10px] tracking-[0.14em] uppercase" style={{ color: "var(--ink-mute)" }}>
                글자 크기 = 글로벌 수요 빈도 (상대)
              </div>
            </div>
            <div
              className="mt-6 rounded-[24px] px-6 py-10 lg:px-12 lg:py-14 flex flex-wrap items-baseline justify-center gap-x-6 gap-y-3 lg:gap-x-9"
              style={{ backgroundColor: "rgba(20,58,44,0.04)", border: "1px solid rgba(20,58,44,0.10)" }}
            >
              {certCloud.map((c, i) => (
                <span
                  key={i}
                  className="font-display leading-none"
                  style={{
                    fontSize: CLOUD_SIZE[c.w],
                    fontWeight: c.w === 3 ? 480 : c.w === 2 ? 440 : 380,
                    color: c.w === 3 ? "var(--moss)" : c.w === 2 ? "var(--ink)" : "var(--ink-mute)",
                    fontStyle: c.w === 0 ? "italic" : "normal",
                    whiteSpace: "nowrap",
                  }}
                  title={c.d}
                >
                  {c.n}
                </span>
              ))}
            </div>
            <div className="mt-4 flex flex-wrap gap-x-6 gap-y-2 font-mono text-[10.5px] tracking-[0.14em] uppercase" style={{ color: "var(--ink-mute)" }}>
              <span><b style={{ color: "var(--moss)" }}>■</b> 사실상 필수 (QMS · 주요 시장 허가)</span>
              <span><b style={{ color: "var(--ink)" }}>■</b> 진출 시장에 따라 필요</span>
              <span>■ 제품 특성별 시험·표준</span>
            </div>
          </div>
        </div>
      </section>

      {/* ===================== 03 · SUPPORT ===================== */}
      <section
        id="support"
        className="relative py-24 lg:py-32"
        style={{ backgroundColor: "var(--paper-deep)" }}
      >
        <div className="max-w-[1280px] mx-auto px-6 lg:px-10">
          <div data-reveal>
            <SectionHeader
              number="03"
              kicker="BEYOND THE SOFTWARE"
              title={
                <>
                  소프트웨어 너머,
                  <br />
                  <em className="font-display italic">사람과 연결</em>까지.
                </>
              }
              sub="플랫폼 안에서 정리된 기록은 초안 작성, 시험 의뢰, 인증 심사, 당국 제출로 자연스럽게 이어져야 합니다. Qualytree는 소프트웨어 바깥의 그 연결까지 함께 준비합니다."
            />
          </div>

          <div className="mt-14 grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            {supportItems.map((t, i) => (
              <div
                key={i}
                className="card relative p-7 rounded-[18px]"
                style={{ backgroundColor: "var(--paper)", border: "1px solid rgba(20,58,44,0.12)" }}
                data-reveal={String(i)}
              >
                <div className="flex items-start justify-between">
                  <div
                    className="w-10 h-10 rounded-full flex items-center justify-center"
                    style={{ backgroundColor: "var(--moss)", color: "var(--paper)" }}
                  >
                    {t.icon}
                  </div>
                  {t.soon && (
                    <span
                      className="font-mono text-[9.5px] tracking-[0.16em] uppercase px-2 py-1 rounded-full"
                      style={{ border: "1px solid rgba(200,119,45,0.5)", color: "var(--amber)" }}
                    >
                      준비 중
                    </span>
                  )}
                </div>
                <div className="mt-5 font-display text-[20px] leading-tight" style={{ fontWeight: 460 }}>
                  {t.title}
                </div>
                <div className="mt-2 text-[13.5px] leading-[1.6]" style={{ color: "var(--ink-soft)" }}>
                  {t.body}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===================== 04 · QUALITY TREE ===================== */}
      <section
        className="relative py-24 lg:py-32 grain"
        style={{ backgroundColor: "var(--moss)", color: "var(--paper)" }}
      >
        <div className="max-w-[1280px] mx-auto px-6 lg:px-10 grid lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-5" data-reveal>
            <div
              className="font-mono text-[11px] tracking-[0.22em] uppercase"
              style={{ color: "var(--amber-soft)" }}
            >
              04 · QUALITY TREE
            </div>
            <h2
              className="font-display mt-4 leading-[1.02]"
              style={{ fontSize: "clamp(36px, 4.4vw, 60px)", fontWeight: 380 }}
            >
              품질 체계는 본래
              <br />
              <em style={{ fontWeight: 320 }}>나무의 구조입니다.</em>
            </h2>
            <p
              className="mt-6 text-[15.5px] leading-[1.7]"
              style={{ color: "rgba(248,244,236,0.82)" }}
            >
              설계 이력, 제품 기준서, 위험관리, 시정·예방조치 — 모두 한 제품이라는
              뿌리에서 갈라져 나옵니다. Qualytree는 이 구조를 그대로 시스템에
              옮겨, 어느 기록이 어디에서 비롯되었는지를 언제나 따라갈 수 있게
              합니다.
            </p>
            <ul className="mt-8 space-y-3 text-[14px]" style={{ color: "rgba(248,244,236,0.92)" }}>
              {[
                "제품 단위로 정리되는 설계·제조·품질 기록",
                "변경이 닿는 범위를 구조로 파악",
                "심사 시 요구 문서를 그 자리에서 제시",
              ].map((t, i) => (
                <li key={i} className="flex items-start gap-3">
                  <Leaf size={16} style={{ color: "var(--amber-soft)", marginTop: 4, flex: "none" }} />
                  <span>{t}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-7" data-reveal="1">
            <QualityTreeViz />
          </div>
        </div>
      </section>

      {/* ===================== 05 · DATA & SECURITY ===================== */}
      <section
        id="trust"
        className="relative py-24 lg:py-32"
        style={{ backgroundColor: "var(--paper)" }}
      >
        <div className="max-w-[1280px] mx-auto px-6 lg:px-10">
          <div data-reveal>
            <SectionHeader
              number="05"
              kicker="DATA INTEGRITY · SECURITY"
              title={
                <>
                  데이터는 남고,
                  <br />
                  기록은 <em className="font-display italic">증명</em>됩니다.
                </>
              }
              sub="품질 시스템을 디지털로 옮길 때 가장 먼저 물어야 할 것은 기능이 아니라 기록의 신뢰성입니다. Qualytree는 전자기록·전자서명 규정과 컴퓨터화 시스템 검증 원칙을 설계의 전제로 두었습니다."
            />
          </div>

          <div className="mt-14 grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            {trustItems.map((t, i) => (
              <div
                key={i}
                className="card relative p-7 rounded-[18px]"
                style={{
                  backgroundColor: "rgba(20,58,44,0.04)",
                  border: "1px solid rgba(20,58,44,0.10)",
                }}
                data-reveal={String(i)}
              >
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center"
                  style={{ backgroundColor: "var(--moss)", color: "var(--paper)" }}
                >
                  {t.icon}
                </div>
                <div className="mt-5 font-display text-[20px] leading-tight" style={{ fontWeight: 460 }}>
                  {t.title}
                </div>
                <div className="mt-2 text-[13.5px] leading-[1.6]" style={{ color: "var(--ink-soft)" }}>
                  {t.body}
                </div>
                <div
                  className="mt-5 font-mono text-[10px] uppercase tracking-[0.18em]"
                  style={{ color: "var(--amber)" }}
                >
                  {t.tag}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-14" data-reveal>
            <div
              className="font-mono text-[10px] tracking-[0.2em] uppercase mb-3"
              style={{ color: "var(--ink-mute)" }}
            >
              Designed to
            </div>
            <div className="flex flex-wrap gap-2">
              {[
                "21 CFR Part 11",
                "EU Annex 11",
                "GAMP 5",
                "ALCOA+",
                "ISO/IEC 27001",
                "ISMS-P",
                "SOC 2",
                "GDPR",
                "개인정보보호법",
              ].map((p) => (
                <span
                  key={p}
                  className="font-mono text-[11px] tracking-[0.08em] px-3 py-1.5 rounded-full"
                  style={{ border: "1px solid rgba(20,58,44,0.18)", color: "var(--ink-soft)" }}
                >
                  {p}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ===================== 06 · PEOPLE ===================== */}
      <section
        id="people"
        className="relative py-24 lg:py-32"
        style={{ backgroundColor: "var(--paper-deep)" }}
      >
        <div className="max-w-[1280px] mx-auto px-6 lg:px-10">
          <div data-reveal>
            <SectionHeader
              number="06"
              kicker="PEOPLE · CONTINUITY"
              title={
                <>
                  담당자의 역량에
                  <br />
                  <em className="font-display italic">갇히지 않는</em> 품질.
                </>
              }
              sub="RA·QA 담당자가 필요 없다는 뜻이 아닙니다. 담당자가 누구든, 경력이 얼마든, 회사의 품질 수준이 한 사람의 역량과 기억에 좌우되지 않도록 — 기준과 절차와 이력이 시스템 안에 남아 있게 합니다."
            />
          </div>

          <div className="mt-14 grid md:grid-cols-3 gap-4">
            {[
              {
                tag: "CONTINUITY",
                t: "담당자가 바뀌어도\n체계는 이어집니다.",
                s: "결정의 근거와 진행 상태가 개인의 메일함이 아니라 회사의 기록으로 남습니다. 인수인계는 기억이 아닌 기록으로 이루어집니다.",
              },
              {
                tag: "CONSISTENCY",
                t: "경력에 상관없이\n같은 기준으로.",
                s: "무엇을, 왜, 어떤 순서로 해야 하는지가 체계 안에 있습니다. 새로 합류한 담당자도 회사가 세운 기준 그대로 일을 이어갑니다.",
              },
              {
                tag: "FOCUS",
                t: "전문가는\n판단에 집중합니다.",
                s: "반복되는 정리와 대조에 쓰던 시간을 줄이고, 경험 있는 담당자는 정말 판단이 필요한 자리에 역량을 씁니다.",
              },
            ].map((b, i) => (
              <div
                key={i}
                className="card p-8 rounded-[20px]"
                style={{ backgroundColor: "var(--paper)", border: "1px solid rgba(20,58,44,0.14)" }}
                data-reveal={String(i)}
              >
                <div className="font-mono text-[10px] tracking-[0.2em] uppercase" style={{ color: "var(--amber)" }}>
                  {b.tag}
                </div>
                <div
                  className="mt-4 font-display text-[24px] leading-[1.18] whitespace-pre-line"
                  style={{ fontWeight: 460 }}
                >
                  {b.t}
                </div>
                <div className="mt-4 text-[14px] leading-[1.65]" style={{ color: "var(--ink-soft)" }}>
                  {b.s}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===================== 07 · ABOUT ===================== */}
      <section id="about" className="relative py-24 lg:py-32">
        <div className="max-w-[1280px] mx-auto px-6 lg:px-10 grid lg:grid-cols-12 gap-12">
          <div className="lg:col-span-5" data-reveal>
            <div className="font-mono text-[11px] tracking-[0.22em] uppercase" style={{ color: "var(--amber)" }}>
              07 · WHO BUILDS QUALYTREE
            </div>
            <h2
              className="font-display mt-4 leading-[1.02]"
              style={{ fontSize: "clamp(36px, 4.2vw, 56px)", fontWeight: 380 }}
            >
              현장에서 만들고,
              <br />
              <em className="italic">심사를 받아본</em> 사람들.
            </h2>
            <p className="mt-6 text-[15px] leading-[1.7]" style={{ color: "var(--ink-soft)" }}>
              정형외과 의료기기 제조 현장의 ISO 13485 · KGMP 운영 경험, 해외
              인허가 실무, 그리고 외자기업과 인증기관 심사 배경. 관념적인 도구가
              아니라 — 직접 서류를 만들고, 공장을 돌리고, 심사를 받아본 사람들이
              만드는 플랫폼입니다.
            </p>
          </div>

          <div className="lg:col-span-7 grid sm:grid-cols-3 gap-4 content-start">
            {[
              { tag: "FOUNDATION", t: "의료기기 제조", s: "정형외과 임플란트 · ISO 13485 / KGMP 운영" },
              { tag: "GLOBAL", t: "해외 인허가", s: "미국 진출 실무 · 유럽 진출 준비 중" },
              { tag: "AUDIT", t: "심사·인증", s: "외자기업 · Notified Body 심사 경험" },
            ].map((b, i) => (
              <div
                key={i}
                className="p-7 rounded-[18px]"
                style={{ backgroundColor: "var(--paper-deep)", border: "1px solid rgba(20,58,44,0.12)" }}
                data-reveal={String(i)}
              >
                <div className="font-mono text-[10px] tracking-[0.2em] uppercase" style={{ color: "var(--amber)" }}>
                  {b.tag}
                </div>
                <div className="mt-3 font-display text-[22px] leading-tight" style={{ fontWeight: 460 }}>
                  {b.t}
                </div>
                <div className="mt-2 text-[13px] leading-[1.55]" style={{ color: "var(--ink-soft)" }}>
                  {b.s}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===================== CTA ===================== */}
      <section
        id="cta"
        className="relative py-28 lg:py-36 grain"
        style={{ backgroundColor: "var(--ink)", color: "var(--paper)" }}
      >
        <div
          className="absolute inset-0 -z-0 opacity-[0.18]"
          style={{
            background:
              "radial-gradient(700px 380px at 80% 30%, var(--leaf), transparent 60%), radial-gradient(700px 380px at 10% 80%, var(--amber), transparent 60%)",
          }}
        />
        <div className="max-w-[1180px] mx-auto px-6 lg:px-10 relative">
          <div className="font-mono text-[11px] tracking-[0.22em] uppercase" style={{ color: "var(--amber-soft)" }}>
            GET STARTED
          </div>
          <h2
            id="grant"
            className="font-display mt-4 leading-[0.98]"
            style={{ fontSize: "clamp(44px, 7vw, 96px)", fontWeight: 360 }}
          >
            첫 인증부터
            <br />
            <em className="italic">글로벌 진출까지.</em>
          </h2>

          <div className="mt-12 grid lg:grid-cols-3 gap-4">
            {[
              {
                t: "도입 신청",
                s: "회사 정보를 남겨 주시면 운영진 검토를 거쳐 계정을 안내해 드립니다.",
                b: "신청하기",
                href: `${APP_URL}/signup`,
                primary: true,
              },
              {
                t: "정부지원사업 문의",
                s: "K-스타트업, TIPS, 규제자유특구 등 정부지원사업과 연계한 도입 패키지를 안내합니다.",
                b: "문의하기",
                href: "mailto:contact@qualytree.co.kr?subject=%5BQualytree%5D%20%EC%A0%95%EB%B6%80%EC%A7%80%EC%9B%90%EC%82%AC%EC%97%85%20%EB%AC%B8%EC%9D%98",
              },
              {
                t: "도입 상담",
                s: "현재 품질 체계와 목표 인증을 알려 주시면 적합한 도입 범위를 함께 검토합니다.",
                b: "메일 보내기",
                href: "mailto:contact@qualytree.co.kr",
              },
            ].map((b, i) => (
              <div
                key={i}
                className="p-7 rounded-[20px] flex flex-col justify-between"
                style={{
                  backgroundColor: b.primary ? "var(--paper)" : "rgba(248,244,236,0.06)",
                  border: b.primary ? "none" : "1px solid rgba(248,244,236,0.20)",
                  color: b.primary ? "var(--ink)" : "var(--paper)",
                  minHeight: 210,
                }}
              >
                <div>
                  <div className="font-display text-[26px] leading-tight" style={{ fontWeight: 460 }}>
                    {b.t}
                  </div>
                  <div
                    className="mt-2 text-[14px] leading-[1.6]"
                    style={{ color: b.primary ? "var(--ink-soft)" : "rgba(248,244,236,0.72)" }}
                  >
                    {b.s}
                  </div>
                </div>
                <a
                  href={b.href}
                  rel={b.primary ? "noopener noreferrer" : undefined}
                  className="mt-6 inline-flex items-center gap-2 text-[14px]"
                  style={{ color: b.primary ? "var(--moss)" : "var(--amber-soft)" }}
                >
                  <span className="uline">{b.b}</span>
                  <ArrowUpRight size={14} />
                </a>
              </div>
            ))}
          </div>

          <div
            className="mt-16 pt-8 border-t flex flex-wrap gap-x-10 gap-y-4 text-[13px]"
            style={{ borderColor: "rgba(248,244,236,0.18)", color: "rgba(248,244,236,0.72)" }}
          >
            <div>
              <div className="font-mono text-[10px] tracking-[0.2em] uppercase" style={{ color: "var(--amber-soft)" }}>
                CONTACT
              </div>
              <div className="mt-1">contact@qualytree.co.kr</div>
            </div>
            <div>
              <div className="font-mono text-[10px] tracking-[0.2em] uppercase" style={{ color: "var(--amber-soft)" }}>
                LOCATION
              </div>
              <div className="mt-1">대한민국</div>
            </div>
            <div>
              <div className="font-mono text-[10px] tracking-[0.2em] uppercase" style={{ color: "var(--amber-soft)" }}>
                EXPERTISE
              </div>
              <div className="mt-1">정형외과 · 해외인증 · 외자기업</div>
            </div>
          </div>
        </div>
      </section>

      {/* ===================== FOOTER ===================== */}
      <footer
        className="py-10 px-6 lg:px-10"
        style={{ backgroundColor: "var(--paper)", borderTop: "1px solid rgba(20,58,44,0.14)" }}
      >
        <div className="max-w-[1280px] mx-auto flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-2.5 font-display text-[18px]" style={{ color: "var(--ink)" }}>
            <LogoMark size={22} />
            Qualytree
          </div>
          <div className="font-mono text-[11px] tracking-[0.14em]" style={{ color: "var(--ink-mute)" }}>
            © 2026 QUALYTREE CO., LTD. — QUALITY GROWS LIKE A TREE.
          </div>
        </div>
      </footer>
    </div>
  );
}

/* ============================================================
   SUBCOMPONENTS
   ============================================================ */

function LogoMark({ size = 28 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 28 28" fill="none">
      <path d="M14 24 V8" stroke="var(--moss)" strokeWidth="1.6" strokeLinecap="round" />
      <path d="M14 13 C14 13 9 12 7 9" stroke="var(--moss)" strokeWidth="1.4" strokeLinecap="round" />
      <path d="M14 11 C14 11 19 10 21 7" stroke="var(--moss)" strokeWidth="1.4" strokeLinecap="round" />
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
        <div
          className="flex items-baseline gap-4 font-mono text-[11px] tracking-[0.22em] uppercase"
          style={{ color: "var(--amber)" }}
        >
          <span>{number}</span>
          <span style={{ color: "var(--ink-mute)" }}>—</span>
          <span style={{ color: "var(--ink-soft)" }}>{kicker}</span>
        </div>
        <h2
          className="font-display mt-5 leading-[1.05]"
          style={{ fontSize: "clamp(34px, 4.8vw, 60px)", fontWeight: 380, color: "var(--ink)" }}
        >
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
        <div className="font-mono text-[11px] tracking-[0.22em] uppercase" style={{ color: "var(--amber)" }}>
          0{idx}
        </div>
        <div style={{ color: "var(--moss)", opacity: 0.6 }}>{icon}</div>
      </div>
      <div className="mt-8 font-display text-[26px] leading-[1.12]" style={{ color: "var(--ink)", fontWeight: 460 }}>
        {title}
      </div>
      <div className="mt-1.5 font-display italic text-[14px]" style={{ color: "var(--moss-mid)", fontWeight: 320 }}>
        {en}
      </div>
      <div className="mt-4 text-[14.5px] leading-[1.65]" style={{ color: "var(--ink-soft)" }}>
        {body}
      </div>
    </div>
  );
}

/* ============================================================
   DATA
   ============================================================ */

const pillars = [
  {
    title: "인허가",
    en: "Regulatory Affairs",
    body: "국내 허가부터 해외 인증까지, 준비·제출·변경·갱신을 한 흐름으로 관리합니다. 인허가 서류가 품질기록과 같은 뿌리에서 나오므로, 심사 때 서로 다른 버전을 맞추는 일이 사라집니다.",
    icon: <Landmark size={18} strokeWidth={1.6} />,
  },
  {
    title: "품질경영시스템",
    en: "Electronic QMS",
    body: "문서·기록 관리, 변경관리, 시정·예방조치, 교육·자격, 공급자 관리, 내부심사, 경영검토 — 표준 품질경영시스템이 요구하는 전 영역을 기본으로 갖추었습니다.",
    icon: <ClipboardCheck size={18} strokeWidth={1.6} />,
  },
  {
    title: "제조·검사",
    en: "Production & Inspection",
    body: "공정 기록과 검사 결과가 별도의 대장이 아니라 품질기록 그 자체로 남습니다. 현장에서 발생하는 부적합은 그 자리에서 품질 체계로 이어집니다.",
    icon: <Factory size={18} strokeWidth={1.6} />,
  },
  {
    title: "시판 후 관리",
    en: "Post-Market",
    body: "불만·이상사례 접수와 보고, 추적관리, 정기 안전성 검토까지. 시판 이후의 정보가 위험관리와 개선 활동으로 되돌아옵니다.",
    icon: <Activity size={18} strokeWidth={1.6} />,
  },
];

const frameworks = [
  { code: "ISO 13485:2016", name: "품질경영시스템", scope: "모든 인증의 공통 뿌리. 체계의 기본 골격이 됩니다." },
  { code: "KGMP", name: "국내 제조·품질관리기준", scope: "식약처 허가·심사 대응, 국내 제조사의 출발점." },
  { code: "FDA QMSR", name: "21 CFR Part 820", scope: "미국 진출. 2026년 QMSR 전환 요구사항 반영." },
  { code: "EU MDR 2017/745", name: "유럽 의료기기 규정", scope: "기술문서, 임상평가, 시판 후 감시 요구사항." },
  { code: "MDSAP", name: "단일 심사 프로그램", scope: "미국·캐나다·호주·브라질·일본 동시 대응." },
  { code: "ISO 14971:2019", name: "위험관리", scope: "설계부터 시판 후까지 이어지는 위험관리 파일." },
];

const audiences = [
  {
    tag: "MANUFACTURER",
    t: "제조사",
    s: "설계·제조·검사·출하까지, 국내 허가와 해외 인증을 한 체계에서.",
  },
  {
    tag: "IMPORTER",
    t: "수입업체",
    s: "수입관리기준서, 외국제조소 GMP, 품목 허가 현황, 통관 기록까지 수입업 요건에 맞춘 구성.",
  },
  {
    tag: "OEM · ODM",
    t: "위탁 제조·개발",
    s: "전부 위탁·일부 위탁 구조에서 위·수탁 간 책임과 기록의 경계를 명확히.",
  },
];

const CLOUD_SIZE = {
  3: "clamp(34px, 4.6vw, 64px)",
  2: "clamp(22px, 2.6vw, 36px)",
  1: "clamp(15px, 1.5vw, 21px)",
  0: "clamp(13px, 1.1vw, 15px)",
};

// w: 3 = 사실상 필수, 2 = 진출 시장에 따라 필요, 1 = 제품 특성별 시험·표준, 0 = 특수·보조
const certCloud = [
  { n: "ISO 13485", w: 3, d: "품질경영시스템 — 모든 인증의 뿌리" },
  { n: "CE MDR", w: 3, d: "EU 의료기기 규정 (2017/745)" },
  { n: "FDA 510(k)", w: 3, d: "미국 시판 전 신고" },
  { n: "KGMP", w: 3, d: "한국 제조·품질관리기준 (MFDS)" },
  { n: "ISO 14971", w: 2, d: "위험관리" },
  { n: "MDSAP", w: 2, d: "단일 심사 프로그램 — 미국·캐나다·호주·브라질·일본" },
  { n: "FDA QMSR", w: 2, d: "21 CFR Part 820 (2026)" },
  { n: "UKCA", w: 2, d: "영국" },
  { n: "Health Canada MDL", w: 2, d: "캐나다" },
  { n: "TGA", w: 2, d: "호주" },
  { n: "PMDA · J-GMP", w: 2, d: "일본" },
  { n: "NMPA", w: 2, d: "중국" },
  { n: "ANVISA", w: 1, d: "브라질" },
  { n: "ISO 10993", w: 1, d: "생체적합성" },
  { n: "IEC 60601", w: 1, d: "전기 의료기기 안전" },
  { n: "IEC 62304", w: 1, d: "의료기기 소프트웨어" },
  { n: "IEC 62366", w: 1, d: "사용적합성" },
  { n: "ISO 11135 · 11137", w: 1, d: "멸균 밸리데이션" },
  { n: "ISO 11607", w: 1, d: "멸균 포장" },
  { n: "ISO 14155", w: 1, d: "임상시험" },
  { n: "UDI", w: 1, d: "GUDID · EUDAMED · MFDS" },
  { n: "FDA PMA", w: 1, d: "미국 시판 전 승인 (Class III)" },
  { n: "De Novo", w: 0, d: "미국 신규 분류" },
  { n: "IEC 81001-5-1", w: 0, d: "사이버보안" },
  { n: "ISO 7206 · ASTM F1717", w: 0, d: "정형·척추 임플란트 성능시험" },
  { n: "MFDS 수입허가", w: 0, d: "수입업체" },
  { n: "ISO/IEC 27001", w: 0, d: "정보보안" },
];

const supportItems = [
  {
    title: "AI 초안 지원",
    body: "정리된 기록을 바탕으로 문서 초안을 먼저 제안합니다. 검토와 최종 승인은 언제나 담당자의 몫입니다.",
    icon: <Sparkles size={18} strokeWidth={1.7} />,
  },
  {
    title: "인증시험·시험소 연계",
    body: "생체적합성, 전기안전, 성능시험 등 필요한 시험을 파악하고 시험소·인증기관과의 진행을 이어 줍니다.",
    icon: <FlaskConical size={18} strokeWidth={1.7} />,
  },
  {
    title: "전문가 인증 지원",
    body: "구축·심사 대응이 필요할 때, 현장 경험이 있는 전문가가 플랫폼의 기록 위에서 함께 진행합니다.",
    icon: <Users size={18} strokeWidth={1.7} />,
  },
  {
    title: "당국 신청·통지 연계",
    body: "식약처·FDA·인증기관 신청 패키지 준비와 보완·통지 수신을 한 흐름으로 잇는 기능을 준비하고 있습니다.",
    icon: <Send size={18} strokeWidth={1.7} />,
    soon: true,
  },
];

const trustItems = [
  {
    title: "전자기록·전자서명",
    body: "21 CFR Part 11과 EU Annex 11이 요구하는 전자기록·전자서명 요건을 기본 구조로 갖추었습니다.",
    tag: "Part 11 · Annex 11",
    icon: <FileCheck size={18} strokeWidth={1.7} />,
  },
  {
    title: "감사 추적",
    body: "누가, 언제, 무엇을, 왜 변경했는지가 변경 불가능한 이력으로 남습니다. 기록은 지워지지 않고 버전으로 쌓입니다.",
    tag: "Audit Trail · ALCOA+",
    icon: <Database size={18} strokeWidth={1.7} />,
  },
  {
    title: "시스템 검증",
    body: "컴퓨터화 시스템 검증 원칙에 따라 검증 문서를 갖추고 있으며, 고객사 자체 검증용 자료 제공을 준비하고 있습니다.",
    tag: "GAMP 5 · CSV",
    icon: <Shield size={18} strokeWidth={1.7} />,
  },
  {
    title: "보관·보안·백업",
    body: "법정 보관 기간에 맞춘 기록 보존, 전 구간 암호화, 정기 백업과 복구 절차. 데이터는 고객의 것으로 남습니다.",
    tag: "Retention · Encryption",
    icon: <Lock size={18} strokeWidth={1.7} />,
  },
];

/* ---------- Hero Tree ---------- */
function HeroTree() {
  return (
    <div className="relative w-full max-w-[520px] ml-auto">
      <svg
        viewBox="0 0 520 560"
        fill="none"
        className="w-full h-auto"
        style={{ display: "block" }}
      >
        {/* ground line */}
        <line
          x1="40"
          y1="510"
          x2="480"
          y2="510"
          stroke="rgba(20,58,44,0.25)"
          strokeWidth="1"
          strokeDasharray="2 4"
        />

        {/* trunk */}
        <path
          d="M260 510 C 256 460, 256 410, 260 360 S 264 240, 260 130"
          stroke="var(--moss)"
          strokeWidth="2.2"
          strokeLinecap="round"
          className="draw-line"
        />

        {/* branches L */}
        <path
          d="M260 380 C 220 372, 180 362, 140 340"
          stroke="var(--moss)"
          strokeWidth="1.7"
          strokeLinecap="round"
          className="draw-line"
          style={{ animationDelay: "0.2s" }}
        />
        <path
          d="M260 310 C 215 304, 170 296, 130 280"
          stroke="var(--moss)"
          strokeWidth="1.6"
          strokeLinecap="round"
          className="draw-line"
          style={{ animationDelay: "0.4s" }}
        />
        <path
          d="M260 240 C 220 232, 180 220, 145 198"
          stroke="var(--moss)"
          strokeWidth="1.5"
          strokeLinecap="round"
          className="draw-line"
          style={{ animationDelay: "0.6s" }}
        />
        <path
          d="M260 175 C 230 165, 200 155, 175 140"
          stroke="var(--moss)"
          strokeWidth="1.4"
          strokeLinecap="round"
          className="draw-line"
          style={{ animationDelay: "0.8s" }}
        />

        {/* branches R */}
        <path
          d="M260 360 C 305 352, 350 340, 390 318"
          stroke="var(--moss)"
          strokeWidth="1.7"
          strokeLinecap="round"
          className="draw-line"
          style={{ animationDelay: "0.3s" }}
        />
        <path
          d="M260 285 C 305 280, 350 270, 395 252"
          stroke="var(--moss)"
          strokeWidth="1.6"
          strokeLinecap="round"
          className="draw-line"
          style={{ animationDelay: "0.5s" }}
        />
        <path
          d="M260 215 C 300 205, 345 192, 380 170"
          stroke="var(--moss)"
          strokeWidth="1.5"
          strokeLinecap="round"
          className="draw-line"
          style={{ animationDelay: "0.7s" }}
        />
        <path
          d="M260 150 C 295 140, 330 132, 360 122"
          stroke="var(--moss)"
          strokeWidth="1.4"
          strokeLinecap="round"
          className="draw-line"
          style={{ animationDelay: "0.9s" }}
        />

        {/* nodes (leaves) */}
        {[
          { x: 140, y: 340, label: "DHF", c: "var(--leaf)", d: 1.0 },
          { x: 130, y: 280, label: "DMR", c: "var(--moss-mid)", d: 1.1 },
          { x: 145, y: 198, label: "CAPA", c: "var(--amber)", d: 1.2 },
          { x: 175, y: 140, label: "510(k)", c: "var(--leaf)", d: 1.3 },
          { x: 390, y: 318, label: "SOP", c: "var(--moss-mid)", d: 1.05 },
          { x: 395, y: 252, label: "Risk", c: "var(--amber)", d: 1.15 },
          { x: 380, y: 170, label: "MDR", c: "var(--leaf)", d: 1.25 },
          { x: 360, y: 122, label: "KGMP", c: "var(--moss-mid)", d: 1.35 },
          { x: 260, y: 130, label: "QMS", c: "var(--amber)", d: 0.9 },
        ].map((n, i) => (
          <g key={i} className="leaf-in" style={{ animationDelay: `${n.d}s` }}>
            <circle cx={n.x} cy={n.y} r="14" fill="var(--paper)" />
            <circle
              cx={n.x}
              cy={n.y}
              r="13"
              fill="none"
              stroke={n.c}
              strokeWidth="1.4"
            />
            <text
              x={n.x}
              y={n.y + 3.5}
              textAnchor="middle"
              fontFamily="JetBrains Mono, monospace"
              fontSize="9"
              fill="var(--ink)"
              fontWeight="500"
            >
              {n.label}
            </text>
          </g>
        ))}

        {/* root hint */}
        <path
          d="M260 510 C 240 530, 215 542, 195 548"
          stroke="rgba(20,58,44,0.35)"
          strokeWidth="1.2"
          strokeLinecap="round"
          fill="none"
          strokeDasharray="2 3"
        />
        <path
          d="M260 510 C 280 530, 305 542, 325 548"
          stroke="rgba(20,58,44,0.35)"
          strokeWidth="1.2"
          strokeLinecap="round"
          fill="none"
          strokeDasharray="2 3"
        />

        {/* annotation */}
        <g
          className="leaf-in"
          style={{ animationDelay: "1.5s", transformOrigin: "center" }}
        >
          <line
            x1="416"
            y1="252"
            x2="478"
            y2="252"
            stroke="rgba(20,58,44,0.4)"
            strokeWidth="1"
          />
          <text
            x="482"
            y="248"
            fontFamily="JetBrains Mono, monospace"
            fontSize="9"
            fill="var(--ink-soft)"
            letterSpacing="1"
          >
            ISO 14971
          </text>
          <text
            x="482"
            y="260"
            fontFamily="JetBrains Mono, monospace"
            fontSize="9"
            fill="var(--ink-soft)"
            letterSpacing="1"
          >
            risk node
          </text>
        </g>

        <g className="leaf-in" style={{ animationDelay: "1.7s" }}>
          <line
            x1="42"
            y1="340"
            x2="125"
            y2="340"
            stroke="rgba(20,58,44,0.4)"
            strokeWidth="1"
          />
          <text
            x="42"
            y="334"
            fontFamily="JetBrains Mono, monospace"
            fontSize="9"
            fill="var(--ink-soft)"
            letterSpacing="1"
          >
            DESIGN HISTORY
          </text>
          <text
            x="42"
            y="346"
            fontFamily="JetBrains Mono, monospace"
            fontSize="9"
            fill="var(--ink-soft)"
            letterSpacing="1"
          >
            21 CFR 820.30
          </text>
        </g>
      </svg>
    </div>
  );
}

/* ---------- Quality Tree visualization ---------- */
function QualityTreeViz() {
  return (
    <div
      className="relative rounded-[24px] p-8 lg:p-10"
      style={{
        backgroundColor: "rgba(248,244,236,0.06)",
        border: "1px solid rgba(248,244,236,0.16)",
      }}
    >
      <svg viewBox="0 0 640 400" fill="none" className="w-full h-auto">
        {/* central spine */}
        <line
          x1="320"
          y1="40"
          x2="320"
          y2="360"
          stroke="rgba(248,244,236,0.30)"
          strokeWidth="1"
          strokeDasharray="3 4"
        />

        {/* root */}
        <g>
          <rect
            x="270"
            y="20"
            width="100"
            height="34"
            rx="17"
            fill="var(--amber)"
          />
          <text
            x="320"
            y="42"
            textAnchor="middle"
            fontFamily="Fraunces, serif"
            fontSize="14"
            fill="var(--ink)"
            fontWeight="500"
          >
            Product Master
          </text>
        </g>

        {/* level 1 — branches */}
        {[
          { x: 110, label: "DHF" },
          { x: 250, label: "DMR" },
          { x: 390, label: "Risk" },
          { x: 530, label: "CAPA" },
        ].map((b, i) => (
          <g key={i}>
            <path
              d={`M 320 54 Q ${320} 110 ${b.x} 150`}
              stroke="rgba(248,244,236,0.45)"
              strokeWidth="1.2"
              fill="none"
            />
            <rect
              x={b.x - 50}
              y="150"
              width="100"
              height="32"
              rx="16"
              fill="rgba(248,244,236,0.10)"
              stroke="rgba(248,244,236,0.35)"
            />
            <text
              x={b.x}
              y="170"
              textAnchor="middle"
              fontFamily="Fraunces, serif"
              fontSize="13"
              fill="var(--paper)"
              fontWeight="500"
            >
              {b.label}
            </text>
          </g>
        ))}

        {/* level 2 — leaves */}
        {[
          { px: 110, items: ["설계 입력", "검증 보고", "이력"] },
          { px: 250, items: ["BOM", "도면", "공정"] },
          { px: 390, items: ["FMEA", "잔존", "통제"] },
          { px: 530, items: ["NCR", "RCA", "효과성"] },
        ].map((g, gi) =>
          g.items.map((t, ti) => {
            const ix = g.px - 60 + ti * 60;
            return (
              <g key={`${gi}-${ti}`}>
                <path
                  d={`M ${g.px} 182 L ${ix} 230`}
                  stroke="rgba(248,244,236,0.30)"
                  strokeWidth="1"
                  fill="none"
                />
                <rect
                  x={ix - 24}
                  y="232"
                  width="48"
                  height="22"
                  rx="11"
                  fill="rgba(74,124,89,0.18)"
                  stroke="rgba(74,124,89,0.45)"
                />
                <text
                  x={ix}
                  y="247"
                  textAnchor="middle"
                  fontFamily="JetBrains Mono, monospace"
                  fontSize="9"
                  fill="var(--paper)"
                  fontWeight="500"
                >
                  {t}
                </text>
              </g>
            );
          })
        )}

        {/* footnote */}
        <text
          x="320"
          y="328"
          textAnchor="middle"
          fontFamily="JetBrains Mono, monospace"
          fontSize="10"
          fill="rgba(248,244,236,0.55)"
          letterSpacing="2"
        >
          ONE PRODUCT · ONE ROOT · EVERY RECORD
        </text>
        <text
          x="320"
          y="346"
          textAnchor="middle"
          fontFamily="JetBrains Mono, monospace"
          fontSize="10"
          fill="rgba(248,244,236,0.45)"
          letterSpacing="2"
        >
          QUALITY GROWS LIKE A TREE
        </text>
      </svg>

      {/* legend */}
      <div
        className="mt-4 flex flex-wrap gap-4 font-mono text-[10.5px] tracking-[0.16em] uppercase"
        style={{ color: "rgba(248,244,236,0.66)" }}
      >
        <span className="flex items-center gap-2">
          <span
            className="w-2.5 h-2.5 rounded-full"
            style={{ backgroundColor: "var(--amber)" }}
          />
          Root
        </span>
        <span className="flex items-center gap-2">
          <span
            className="w-2.5 h-2.5 rounded-full"
            style={{ backgroundColor: "rgba(248,244,236,0.6)" }}
          />
          Branch
        </span>
        <span className="flex items-center gap-2">
          <span
            className="w-2.5 h-2.5 rounded-full"
            style={{ backgroundColor: "var(--leaf)" }}
          />
          Leaf
        </span>
      </div>
    </div>
  );
}

