import React, { useState, useEffect } from "react";
import {
  ArrowUpRight,
  ChevronRight,
  Leaf,
  Shield,
  GitBranch,
  FileCheck,
  Users,
  Sparkles,
  Lock,
  Globe2,
  Workflow,
  Bell,
  Microscope,
  Building2,
} from "lucide-react";

export default function App() {
  const [scrolled, setScrolled] = useState(false);
  const [activeStep, setActiveStep] = useState(0);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Auto-cycle "How it works" steps
  useEffect(() => {
    const id = setInterval(() => {
      setActiveStep((s) => (s + 1) % 4);
    }, 3200);
    return () => clearInterval(id);
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

        .font-display { font-family: 'Fraunces', 'Pretendard Variable', serif; font-feature-settings: 'ss01','ss02','onum'; letter-spacing: -0.02em; }
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

        /* Faint engineering grid for surfaces */
        .grid-paper {
          background-image:
            linear-gradient(to right, rgba(20,58,44,0.06) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(20,58,44,0.06) 1px, transparent 1px);
          background-size: 32px 32px;
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

        /* Nice link underline */
        .uline { background-image: linear-gradient(to right, currentColor, currentColor);
                 background-size: 100% 1px; background-repeat: no-repeat;
                 background-position: 0 100%; padding-bottom: 2px; }

        /* Selection */
        ::selection { background: var(--amber); color: var(--paper); }

        /* Card hover */
        .card { transition: transform .35s ease, box-shadow .35s ease, background-color .35s ease; }
        .card:hover { transform: translateY(-2px); }

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
            {/* Logo mark — abstract tree */}
            <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
              <path
                d="M14 24 V8"
                stroke="var(--moss)"
                strokeWidth="1.6"
                strokeLinecap="round"
              />
              <path
                d="M14 13 C14 13 9 12 7 9"
                stroke="var(--moss)"
                strokeWidth="1.4"
                strokeLinecap="round"
              />
              <path
                d="M14 11 C14 11 19 10 21 7"
                stroke="var(--moss)"
                strokeWidth="1.4"
                strokeLinecap="round"
              />
              <path
                d="M14 16 C14 16 10 16 8 14"
                stroke="var(--leaf)"
                strokeWidth="1.4"
                strokeLinecap="round"
              />
              <path
                d="M14 18 C14 18 18 18 20 16"
                stroke="var(--leaf)"
                strokeWidth="1.4"
                strokeLinecap="round"
              />
              <circle cx="7" cy="9" r="1.6" fill="var(--amber)" />
              <circle cx="21" cy="7" r="1.6" fill="var(--leaf)" />
              <circle cx="20" cy="16" r="1.4" fill="var(--moss-mid)" />
            </svg>
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
            <a className="hover:opacity-70 transition" href="#how">
              작동 방식
            </a>
            <a className="hover:opacity-70 transition" href="#trust">
              보안·검증
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
              href="#login"
              className="hidden sm:inline-flex items-center text-[14px] px-3.5 py-2 rounded-full hover:bg-black/5 transition"
              style={{ color: "var(--ink)" }}
            >
              로그인
            </a>
            <a
              href="#cta"
              className="inline-flex items-center gap-1.5 text-[14px] px-4 py-2 rounded-full transition hover:opacity-90"
              style={{ backgroundColor: "var(--moss)", color: "var(--paper)" }}
            >
              데모 신청
              <ArrowUpRight size={14} strokeWidth={2} />
            </a>
          </div>
        </div>
      </nav>

      {/* ===================== HERO ===================== */}
      <section
        id="top"
        className="relative grain"
        style={{ paddingTop: "120px", paddingBottom: "80px" }}
      >
        {/* Soft botanical wash */}
        <div
          className="absolute inset-0 -z-10"
          style={{
            background:
              "radial-gradient(900px 480px at 12% -10%, rgba(74,124,89,0.18), transparent 60%), radial-gradient(700px 400px at 95% 10%, rgba(200,119,45,0.10), transparent 60%)",
          }}
        />

        <div className="max-w-[1280px] mx-auto px-6 lg:px-10 grid lg:grid-cols-12 gap-10 items-end">
          {/* Left: copy */}
          <div className="lg:col-span-7 rise">
            {/* Eyebrow */}
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
              MEDICAL DEVICE · RA / QMS / SaaS
            </div>

            {/* Headline */}
            <h1
              className="font-display mt-6 leading-[0.95]"
              style={{
                color: "var(--ink)",
                fontSize: "clamp(48px, 7.4vw, 96px)",
                fontWeight: 380,
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

            {/* Sub */}
            <p
              className="mt-7 max-w-[620px] text-[16.5px] leading-[1.65]"
              style={{ color: "var(--ink-soft)" }}
            >
              의료기기 인허가(RA), 품질관리(QMS), 인증시험, 정부 신청·통지를 한
              플랫폼에서.{" "}
              <span style={{ color: "var(--ink)", fontWeight: 500 }}>
                RA 교육을 받지 않은 직원도 화면 안내만 따라가면 인허가 서류가
                자동으로 완성되고, 담당자가 바뀌어도 인수인계가 5분 안에
                끝납니다 — 그러면서도 의료기기 규제급 보안이 보장되는
                플랫폼.
              </span>
            </p>

            {/* CTA */}
            <div className="mt-9 flex flex-wrap items-center gap-3">
              <a
                href="#cta"
                className="inline-flex items-center gap-2 px-5 py-3 rounded-full text-[15px] font-medium hover:opacity-90 transition"
                style={{
                  backgroundColor: "var(--moss)",
                  color: "var(--paper)",
                }}
              >
                데모 신청하기
                <ArrowUpRight size={16} />
              </a>
              <a
                href="#how"
                className="inline-flex items-center gap-2 px-5 py-3 rounded-full text-[15px] hover:bg-black/5 transition"
                style={{
                  color: "var(--ink)",
                  border: "1px solid rgba(20,58,44,0.18)",
                }}
              >
                작동 방식 보기
                <ChevronRight size={16} />
              </a>
            </div>

            {/* trust strip */}
            <div
              className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-2 font-mono text-[11px] tracking-[0.14em] uppercase"
              style={{ color: "var(--ink-mute)" }}
            >
              <span>ISO 13485 : 2016</span>
              <span>·</span>
              <span>FDA QMSR</span>
              <span>·</span>
              <span>EU MDR</span>
              <span>·</span>
              <span>KGMP</span>
              <span>·</span>
              <span>21 CFR PART 11</span>
              <span>·</span>
              <span>GAMP 5</span>
            </div>
          </div>

          {/* Right: tree illustration */}
          <div className="lg:col-span-5 relative">
            <HeroTree />
          </div>
        </div>

        {/* Manifesto strip */}
        <div className="max-w-[1280px] mx-auto px-6 lg:px-10 mt-24">
          <div
            className="relative grid md:grid-cols-3 gap-0 border-t border-b py-7"
            style={{ borderColor: "rgba(20,58,44,0.18)" }}
          >
            {[
              {
                k: "1 / 10",
                t: "학습 곡선",
                s: "글로벌 SaaS 대비 1/10 — RA 비전공자가 1주 내 입력 시작",
              },
              {
                k: "5 min",
                t: "무손실 인수인계",
                s: "결정 일지·진행 상태 자동 누적. 담당자 교체 시 5분 내 시작",
              },
              {
                k: "0",
                t: "구조적 누락",
                s: "양방향 연결 + 필수 연결 검사로 누락 자체가 발생 불가",
              },
            ].map((m, i) => (
              <div
                key={i}
                className="px-6 py-2 md:border-r last:border-r-0"
                style={{ borderColor: "rgba(20,58,44,0.10)" }}
              >
                <div
                  className="font-display"
                  style={{
                    color: "var(--moss)",
                    fontSize: "44px",
                    fontWeight: 400,
                    lineHeight: 1,
                  }}
                >
                  {m.k}
                </div>
                <div
                  className="mt-2 font-mono text-[11px] uppercase tracking-[0.18em]"
                  style={{ color: "var(--amber)" }}
                >
                  {m.t}
                </div>
                <div
                  className="mt-2 text-[14px] leading-[1.55]"
                  style={{ color: "var(--ink-soft)" }}
                >
                  {m.s}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===================== DIFFERENTIATORS ===================== */}
      <section
        id="platform"
        className="relative py-24 lg:py-32"
        style={{ backgroundColor: "var(--paper-deep)" }}
      >
        <div className="max-w-[1280px] mx-auto px-6 lg:px-10">
          <SectionHeader
            number="01"
            kicker="WHY Qualytree"
            title={
              <>
                글로벌 SaaS도 <em className="font-display italic">놓친</em>{" "}
                자리.<br />한국 영세·중소 제조사부터 글로벌 진출까지.
              </>
            }
            sub="Greenlight Guru · MasterControl · Qualio · Veeva가 공통적으로 RA 전문가를 사용 전제로 한다면, Qualytree는 RA 비전공자도 사용 가능한 가이드형 워크플로우를 핵심으로 둡니다."
          />

          {/* Highlight 6 */}
          <div className="mt-16 grid md:grid-cols-2 lg:grid-cols-3 gap-px" style={{ backgroundColor: "rgba(20,58,44,0.12)" }}>
            {coreSix.map((c, i) => (
              <FeatureCell key={i} {...c} idx={i + 1} />
            ))}
          </div>

          {/* Remaining 5 — slim list */}
          <div className="mt-12 grid md:grid-cols-5 gap-6">
            {restFive.map((c, i) => (
              <div key={i} className="card group">
                <div
                  className="font-mono text-[10px] tracking-[0.18em] uppercase"
                  style={{ color: "var(--amber)" }}
                >
                  0{i + 7}
                </div>
                <div
                  className="mt-2 font-display text-[18px] leading-tight"
                  style={{ color: "var(--ink)", fontWeight: 450 }}
                >
                  {c.title}
                </div>
                <div
                  className="mt-2 text-[13px] leading-[1.55]"
                  style={{ color: "var(--ink-soft)" }}
                >
                  {c.body}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===================== HOW IT WORKS ===================== */}
      <section id="how" className="relative py-24 lg:py-32">
        <div className="max-w-[1280px] mx-auto px-6 lg:px-10">
          <SectionHeader
            number="02"
            kicker="HOW IT WORKS"
            title={
              <>
                회사의 <em className="font-display italic">실제 공정</em>을 입력하면,<br />
                인증별 서류가 자동으로 따라옵니다.
              </>
            }
            sub="공정·검사·자격을 드래그·드롭으로 정의하고, 작업자가 측정값을 입력하는 순간 — SOP, eBR, 기술문서, 신청 패키지가 양식째 발행되며 자동으로 채워집니다."
          />

          <div className="mt-16 grid lg:grid-cols-12 gap-10">
            {/* Step list */}
            <div className="lg:col-span-5 space-y-3">
              {steps.map((s, i) => {
                const active = activeStep === i;
                return (
                  <button
                    key={i}
                    onClick={() => setActiveStep(i)}
                    className="w-full text-left group card"
                    style={{
                      backgroundColor: active
                        ? "var(--moss)"
                        : "rgba(20,58,44,0.04)",
                      color: active ? "var(--paper)" : "var(--ink)",
                      border: active
                        ? "1px solid var(--moss)"
                        : "1px solid rgba(20,58,44,0.10)",
                      borderRadius: 18,
                      padding: "22px 24px",
                    }}
                  >
                    <div className="flex items-baseline gap-4">
                      <span
                        className="font-mono text-[12px] tracking-[0.18em]"
                        style={{
                          color: active ? "var(--amber-soft)" : "var(--amber)",
                        }}
                      >
                        STEP {String(i + 1).padStart(2, "0")}
                      </span>
                      <span
                        className="font-display text-[22px] leading-tight"
                        style={{ fontWeight: 460 }}
                      >
                        {s.title}
                      </span>
                    </div>
                    <p
                      className="mt-3 text-[14px] leading-[1.6]"
                      style={{
                        color: active
                          ? "rgba(248,244,236,0.82)"
                          : "var(--ink-soft)",
                      }}
                    >
                      {s.body}
                    </p>
                  </button>
                );
              })}
            </div>

            {/* Step canvas */}
            <div className="lg:col-span-7">
              <div
                className="relative grid-paper rounded-[24px] p-8 lg:p-12 overflow-hidden"
                style={{
                  backgroundColor: "var(--paper)",
                  border: "1px solid rgba(20,58,44,0.14)",
                  minHeight: 460,
                }}
              >
                {/* Decorative tag */}
                <div
                  className="absolute top-6 right-6 font-mono text-[10px] tracking-[0.2em] uppercase"
                  style={{ color: "var(--ink-mute)" }}
                >
                  PREVIEW · {steps[activeStep].tag}
                </div>

                <StepPreview index={activeStep} />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===================== QUALITY TREE ===================== */}
      <section
        className="relative py-24 lg:py-32 grain"
        style={{ backgroundColor: "var(--moss)", color: "var(--paper)" }}
      >
        <div className="max-w-[1280px] mx-auto px-6 lg:px-10 grid lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-5">
            <div
              className="font-mono text-[11px] tracking-[0.22em] uppercase"
              style={{ color: "var(--amber-soft)" }}
            >
              03 · BRAND CORE UX
            </div>
            <h2
              className="font-display mt-4 leading-[1.02]"
              style={{ fontSize: "clamp(36px, 4.4vw, 60px)", fontWeight: 380 }}
            >
              Quality Tree.
              <br />
              <em style={{ fontWeight: 320 }}>품질의 뿌리부터 가지까지.</em>
            </h2>
            <p
              className="mt-6 text-[15.5px] leading-[1.65]"
              style={{ color: "rgba(248,244,236,0.82)" }}
            >
              DHF · DMR · CAPA · Risk를 한 그루의 트리로 시각화. 한 변경의 파급
              범위를, 한 인증의 진행률을, 한 부적합의 영향 구간을 — 현장
              담당자도 한눈에 본다.
            </p>
            <ul className="mt-8 space-y-3 text-[14px]" style={{ color: "rgba(248,244,236,0.92)" }}>
              {[
                "양방향 연결로 누락이 구조적으로 발생 불가",
                "변경 영향 분석 — 한 변경이 닿는 모든 노드 자동 추적",
                "결정 일지 해시 체인으로 21 CFR Part 11 무결성 보장",
              ].map((t, i) => (
                <li key={i} className="flex items-start gap-3">
                  <Leaf
                    size={16}
                    style={{ color: "var(--amber-soft)", marginTop: 4 }}
                  />
                  <span>{t}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-7">
            <QualityTreeViz />
          </div>
        </div>
      </section>

      {/* ===================== TRUST / SECURITY ===================== */}
      <section
        id="trust"
        className="relative py-24 lg:py-32"
        style={{ backgroundColor: "var(--paper)" }}
      >
        <div className="max-w-[1280px] mx-auto px-6 lg:px-10">
          <SectionHeader
            number="04"
            kicker="TRUST · SECURITY · VALIDATION"
            title={
              <>
                의료기기 <em className="font-display italic">규제급</em> 보안.<br />
                고객 자체 백업까지 선택.
              </>
            }
            sub="ISO 27001 / SOC 2 Type II / ISMS-P 기반에 21 CFR Part 11 · GAMP 5 검증, BYOK, 고객 HDD/클라우드 자체 백업 옵션까지. 데이터 주권을 고객에게 돌려드립니다."
          />

          <div className="mt-14 grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            {trustItems.map((t, i) => (
              <div
                key={i}
                className="card relative p-7 rounded-[18px]"
                style={{
                  backgroundColor: "rgba(20,58,44,0.04)",
                  border: "1px solid rgba(20,58,44,0.10)",
                }}
              >
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center"
                  style={{
                    backgroundColor: "var(--moss)",
                    color: "var(--paper)",
                  }}
                >
                  {t.icon}
                </div>
                <div
                  className="mt-5 font-display text-[20px] leading-tight"
                  style={{ fontWeight: 460 }}
                >
                  {t.title}
                </div>
                <div
                  className="mt-2 text-[13px] leading-[1.55]"
                  style={{ color: "var(--ink-soft)" }}
                >
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

          {/* Cert pill row */}
          <div className="mt-14 flex flex-wrap gap-2">
            {[
              "ISO 27001:2022",
              "ISO 27017",
              "ISO 27018",
              "ISO 27701",
              "SOC 2 Type II",
              "ISMS-P",
              "21 CFR Part 11",
              "EU Annex 11",
              "GAMP 5",
              "GDPR",
              "HIPAA",
              "개인정보보호법",
            ].map((p) => (
              <span
                key={p}
                className="font-mono text-[11px] tracking-[0.08em] px-3 py-1.5 rounded-full"
                style={{
                  border: "1px solid rgba(20,58,44,0.18)",
                  color: "var(--ink-soft)",
                }}
              >
                {p}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ===================== ABOUT / CREDS ===================== */}
      <section
        id="about"
        className="relative py-24 lg:py-32"
        style={{ backgroundColor: "var(--paper-deep)" }}
      >
        <div className="max-w-[1280px] mx-auto px-6 lg:px-10 grid lg:grid-cols-12 gap-12">
          <div className="lg:col-span-5">
            <div
              className="font-mono text-[11px] tracking-[0.22em] uppercase"
              style={{ color: "var(--amber)" }}
            >
              05 · WHO BUILDS Qualytree
            </div>
            <h2
              className="font-display mt-4 leading-[1.02]"
              style={{ fontSize: "clamp(36px, 4.2vw, 56px)", fontWeight: 380 }}
            >
              현장에서 <em className="italic">14년</em>,<br />
              제품을 직접 띄워본 사람들.
            </h2>
            <p
              className="mt-6 text-[15px] leading-[1.65]"
              style={{ color: "var(--ink-soft)" }}
            >
              ISO 13485 · KGMP 운영 노하우(Moreh Company), 미국 510(k) 진출 실무
              경험(SOLCO Biomedical USA), 그리고 NB 출신 컨설팅 백그라운드(TÜV).
              관념적인 RA 도구가 아니라 — 직접 서류를 만들고, 현장을 돌리고,
              심사를 받아본 사람들이 만드는 SaaS입니다.
            </p>
          </div>

          <div className="lg:col-span-7 grid sm:grid-cols-3 gap-4">
            {[
              {
                tag: "FOUNDATION",
                t: "Moreh Company",
                s: "ISO 13485 · KGMP 운영 노하우",
              },
              {
                tag: "GLOBAL",
                t: "SOLCO Biomedical USA",
                s: "미국 510(k) 진출 실무",
              },
              {
                tag: "AUDIT",
                t: "TÜV 출신 공동창업",
                s: "Notified Body 심사관 경험",
              },
            ].map((b, i) => (
              <div
                key={i}
                className="p-7 rounded-[18px]"
                style={{
                  backgroundColor: "var(--paper)",
                  border: "1px solid rgba(20,58,44,0.14)",
                }}
              >
                <div
                  className="font-mono text-[10px] tracking-[0.2em] uppercase"
                  style={{ color: "var(--amber)" }}
                >
                  {b.tag}
                </div>
                <div
                  className="mt-3 font-display text-[22px] leading-tight"
                  style={{ fontWeight: 460 }}
                >
                  {b.t}
                </div>
                <div
                  className="mt-2 text-[13px]"
                  style={{ color: "var(--ink-soft)" }}
                >
                  {b.s}
                </div>
              </div>
            ))}

            {/* Tier help */}
            <div
              className="sm:col-span-3 p-7 rounded-[18px] grid sm:grid-cols-3 gap-6"
              style={{
                backgroundColor: "rgba(74,124,89,0.08)",
                border: "1px solid rgba(74,124,89,0.30)",
              }}
            >
              <div className="sm:col-span-1">
                <div
                  className="font-mono text-[10px] tracking-[0.2em] uppercase"
                  style={{ color: "var(--leaf)" }}
                >
                  TIERED HELP · 단계적 도움
                </div>
                <div
                  className="mt-2 font-display text-[22px] leading-tight"
                  style={{ fontWeight: 460 }}
                >
                  도움이 필요할 때<br />컨텍스트가 함께 따라갑니다.
                </div>
              </div>
              <div className="sm:col-span-2 grid sm:grid-cols-3 gap-3 text-[13px]">
                {[
                  ["TIER 1", "인라인 AI 챗봇 · 무료"],
                  ["TIER 2", "외부 컨설턴트 마켓플레이스"],
                  ["TIER 3", "운영진 직속 프리미엄"],
                ].map((row, i) => (
                  <div
                    key={i}
                    className="p-4 rounded-[12px]"
                    style={{
                      backgroundColor: "var(--paper)",
                      border: "1px solid rgba(20,58,44,0.10)",
                    }}
                  >
                    <div
                      className="font-mono text-[10px] tracking-[0.18em] uppercase"
                      style={{ color: "var(--amber)" }}
                    >
                      {row[0]}
                    </div>
                    <div className="mt-1.5" style={{ color: "var(--ink)" }}>
                      {row[1]}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===================== BIG CTA / GRANT ===================== */}
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
          <div
            className="font-mono text-[11px] tracking-[0.22em] uppercase"
            style={{ color: "var(--amber-soft)" }}
          >
            06 · GET STARTED
          </div>
          <h2
            id="grant"
            className="font-display mt-4 leading-[0.98]"
            style={{ fontSize: "clamp(44px, 7vw, 96px)", fontWeight: 360 }}
          >
            첫 인증부터<br />
            <em className="italic">글로벌 진출까지.</em>
          </h2>

          <div className="mt-12 grid lg:grid-cols-3 gap-4">
            {[
              {
                t: "데모 신청",
                s: "30분 라이브 데모 — 회사 공정에 맞춰 시연",
                b: "신청하기",
                primary: true,
              },
              {
                t: "정부지원사업 문의",
                s: "K-스타트업, TIPS, 규제자유특구 연계 패키지",
                b: "문의하기",
              },
              {
                t: "백서·자료실",
                s: "MDR 전환 가이드, KGMP↔QMSR 매핑표 등",
                b: "다운로드",
              },
            ].map((b, i) => (
              <div
                key={i}
                className="p-7 rounded-[20px] flex flex-col justify-between"
                style={{
                  backgroundColor: b.primary ? "var(--paper)" : "rgba(248,244,236,0.06)",
                  border: b.primary ? "none" : "1px solid rgba(248,244,236,0.20)",
                  color: b.primary ? "var(--ink)" : "var(--paper)",
                  minHeight: 220,
                }}
              >
                <div>
                  <div
                    className="font-display text-[26px] leading-tight"
                    style={{ fontWeight: 460 }}
                  >
                    {b.t}
                  </div>
                  <div
                    className="mt-2 text-[14px] leading-[1.6]"
                    style={{
                      color: b.primary ? "var(--ink-soft)" : "rgba(248,244,236,0.72)",
                    }}
                  >
                    {b.s}
                  </div>
                </div>
                <a
                  href="#contact"
                  className="mt-6 inline-flex items-center gap-2 text-[14px]"
                  style={{
                    color: b.primary ? "var(--moss)" : "var(--amber-soft)",
                  }}
                >
                  <span className="uline">{b.b}</span>
                  <ArrowUpRight size={14} />
                </a>
              </div>
            ))}
          </div>

          <div
            className="mt-16 pt-8 border-t flex flex-wrap gap-x-10 gap-y-4 text-[13px]"
            style={{
              borderColor: "rgba(248,244,236,0.18)",
              color: "rgba(248,244,236,0.72)",
            }}
          >
            <div>
              <div
                className="font-mono text-[10px] tracking-[0.2em] uppercase"
                style={{ color: "var(--amber-soft)" }}
              >
                CONTACT
              </div>
              <div className="mt-1">contact@Qualytree.co.kr</div>
            </div>
            <div>
              <div
                className="font-mono text-[10px] tracking-[0.2em] uppercase"
                style={{ color: "var(--amber-soft)" }}
              >
                LOCATION
              </div>
              <div className="mt-1">대한민국 · 2026 설립 예정</div>
            </div>
            <div>
              <div
                className="font-mono text-[10px] tracking-[0.2em] uppercase"
                style={{ color: "var(--amber-soft)" }}
              >
                PARTNERS
              </div>
              <div className="mt-1">Moreh · SOLCO Biomedical · TÜV</div>
            </div>
          </div>
        </div>
      </section>

      {/* ===================== FOOTER ===================== */}
      <footer
        className="py-10 px-6 lg:px-10"
        style={{
          backgroundColor: "var(--paper)",
          borderTop: "1px solid rgba(20,58,44,0.14)",
        }}
      >
        <div className="max-w-[1280px] mx-auto flex flex-wrap items-center justify-between gap-4">
          <div
            className="flex items-center gap-2.5 font-display text-[18px]"
            style={{ color: "var(--ink)" }}
          >
            <svg width="22" height="22" viewBox="0 0 28 28" fill="none">
              <path d="M14 24 V8" stroke="var(--moss)" strokeWidth="1.6" strokeLinecap="round" />
              <path d="M14 13 C14 13 9 12 7 9" stroke="var(--moss)" strokeWidth="1.4" strokeLinecap="round" />
              <path d="M14 11 C14 11 19 10 21 7" stroke="var(--moss)" strokeWidth="1.4" strokeLinecap="round" />
              <circle cx="7" cy="9" r="1.6" fill="var(--amber)" />
              <circle cx="21" cy="7" r="1.6" fill="var(--leaf)" />
            </svg>
            Qualytree
          </div>
          <div
            className="font-mono text-[11px] tracking-[0.14em]"
            style={{ color: "var(--ink-mute)" }}
          >
            © 2026 Qualytree CO., LTD. — QUALITY GROWS LIKE A TREE.
          </div>
        </div>
      </footer>
    </div>
  );
}

/* ============================================================
   SUBCOMPONENTS
   ============================================================ */

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
          style={{
            fontSize: "clamp(34px, 4.8vw, 60px)",
            fontWeight: 380,
            color: "var(--ink)",
          }}
        >
          {title}
        </h2>
      </div>
      {sub && (
        <p
          className="lg:col-span-5 text-[15px] leading-[1.65]"
          style={{ color: "var(--ink-soft)" }}
        >
          {sub}
        </p>
      )}
    </div>
  );
}

function FeatureCell({ idx, title, body, en, icon }) {
  return (
    <div
      className="card relative p-8 lg:p-10"
      style={{ backgroundColor: "var(--paper)" }}
    >
      <div className="flex items-start justify-between">
        <div
          className="font-mono text-[11px] tracking-[0.22em] uppercase"
          style={{ color: "var(--amber)" }}
        >
          0{idx}
        </div>
        <div
          style={{
            color: "var(--moss)",
            opacity: 0.6,
          }}
        >
          {icon}
        </div>
      </div>
      <div
        className="mt-7 font-display text-[24px] leading-[1.15]"
        style={{ color: "var(--ink)", fontWeight: 460 }}
      >
        {title}
      </div>
      <div
        className="mt-1.5 font-display italic text-[14px]"
        style={{ color: "var(--moss-mid)", fontWeight: 320 }}
      >
        {en}
      </div>
      <div
        className="mt-4 text-[14px] leading-[1.6]"
        style={{ color: "var(--ink-soft)" }}
      >
        {body}
      </div>
    </div>
  );
}

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

/* ---------- Step preview canvases ---------- */
function StepPreview({ index }) {
  if (index === 0) return <PreviewInput />;
  if (index === 1) return <PreviewLink />;
  if (index === 2) return <PreviewDocs />;
  return <PreviewHandover />;
}

function PreviewInput() {
  return (
    <div className="relative">
      <div className="font-display text-[26px] leading-tight" style={{ fontWeight: 460 }}>
        “전기를 사용하나요?”
      </div>
      <div
        className="mt-1 font-display italic text-[15px]"
        style={{ color: "var(--moss-mid)", fontWeight: 300 }}
      >
        Does the device use electricity?
      </div>
      <div
        className="mt-2 text-[13px]"
        style={{ color: "var(--ink-mute)" }}
      >
        이 답변은 IEC 60601-1 적용 여부를 결정합니다.
      </div>

      <div className="mt-6 grid sm:grid-cols-2 gap-3">
        {[
          { v: "예 (배터리 또는 전원)", picked: true, hint: "→ IEC 60601-1 적용" },
          { v: "아니오", picked: false, hint: "→ ISO 14971 + 기계적 안전" },
          { v: "잘 모르겠어요", picked: false, hint: "→ Tier 1 도움 자동 제안" },
          { v: "해당 없음", picked: false, hint: "" },
        ].map((o, i) => (
          <div
            key={i}
            className="rounded-[14px] p-4"
            style={{
              border: o.picked
                ? "1.5px solid var(--moss)"
                : "1px solid rgba(20,58,44,0.18)",
              backgroundColor: o.picked
                ? "rgba(74,124,89,0.10)"
                : "var(--paper)",
            }}
          >
            <div className="flex items-center gap-2">
              <span
                className="w-4 h-4 rounded-full flex items-center justify-center"
                style={{
                  border: "1.5px solid var(--moss)",
                  backgroundColor: o.picked ? "var(--moss)" : "transparent",
                }}
              >
                {o.picked && (
                  <span
                    className="w-1.5 h-1.5 rounded-full"
                    style={{ backgroundColor: "var(--paper)" }}
                  />
                )}
              </span>
              <span className="text-[14px]" style={{ color: "var(--ink)" }}>
                {o.v}
              </span>
            </div>
            {o.hint && (
              <div
                className="mt-2 text-[12px]"
                style={{ color: "var(--ink-mute)" }}
              >
                {o.hint}
              </div>
            )}
          </div>
        ))}
      </div>

      <div
        className="mt-6 px-4 py-3 rounded-[12px] flex items-center gap-3 text-[12.5px]"
        style={{
          backgroundColor: "rgba(200,119,45,0.08)",
          border: "1px solid rgba(200,119,45,0.30)",
          color: "var(--ink-soft)",
        }}
      >
        <Sparkles size={14} style={{ color: "var(--amber)" }} />
        <span>
          이 항목은 <b>510(k) Section 4 · MDR Annex II §2.1</b>의 요구사항으로
          자동 인용됩니다.
        </span>
      </div>
    </div>
  );
}

function PreviewLink() {
  const links = [
    { from: "Risk #R-014", to: "SOP-PROD-007", note: "절차서 인용" },
    { from: "SOP-PROD-007", to: "Test Report TR-2034", note: "검증 시험" },
    { from: "Test Report TR-2034", to: "510(k) §6.4", note: "신청서 항목" },
    { from: "510(k) §6.4", to: "Risk #R-014", note: "닫힌 회로 — 구조적 누락 0" },
  ];
  return (
    <div className="relative">
      <div className="font-display text-[26px] leading-tight" style={{ fontWeight: 460 }}>
        한 번 입력 → 양방향으로 자동 연결
      </div>
      <div className="mt-2 text-[13px]" style={{ color: "var(--ink-mute)" }}>
        엔티티를 인용하면 (A→B), (B→A) 두 참조가 동시에 생성됩니다.
      </div>

      <div className="mt-6 space-y-2.5">
        {links.map((l, i) => (
          <div
            key={i}
            className="flex items-center gap-3 px-4 py-3 rounded-[12px]"
            style={{
              backgroundColor: i === links.length - 1 ? "rgba(74,124,89,0.10)" : "var(--paper)",
              border:
                i === links.length - 1
                  ? "1px solid rgba(74,124,89,0.40)"
                  : "1px solid rgba(20,58,44,0.10)",
            }}
          >
            <span
              className="font-mono text-[11px] px-2 py-1 rounded-md"
              style={{
                backgroundColor: "rgba(20,58,44,0.06)",
                color: "var(--ink)",
              }}
            >
              {l.from}
            </span>
            <ChevronRight size={14} style={{ color: "var(--ink-mute)" }} />
            <span
              className="font-mono text-[11px] px-2 py-1 rounded-md"
              style={{
                backgroundColor: "rgba(20,58,44,0.06)",
                color: "var(--ink)",
              }}
            >
              {l.to}
            </span>
            <span
              className="text-[12px] ml-auto"
              style={{ color: "var(--ink-soft)" }}
            >
              {l.note}
            </span>
          </div>
        ))}
      </div>

      <div
        className="mt-6 grid grid-cols-3 gap-2 text-[11px] font-mono uppercase tracking-[0.14em]"
        style={{ color: "var(--ink-mute)" }}
      >
        <div className="px-3 py-2 rounded-md" style={{ backgroundColor: "rgba(20,58,44,0.04)" }}>
          완성도 86%
        </div>
        <div className="px-3 py-2 rounded-md" style={{ backgroundColor: "rgba(20,58,44,0.04)" }}>
          고아 데이터 0
        </div>
        <div className="px-3 py-2 rounded-md" style={{ backgroundColor: "rgba(20,58,44,0.04)" }}>
          영향 노드 12
        </div>
      </div>
    </div>
  );
}

function PreviewDocs() {
  const docs = [
    { name: "DHF — Design History File", pct: 92, std: "21 CFR 820.30" },
    { name: "Technical Documentation", pct: 78, std: "MDR Annex II" },
    { name: "510(k) Submission Package", pct: 64, std: "FDA eSTAR" },
    { name: "KGMP 적합성 인증 신청", pct: 88, std: "MFDS" },
  ];
  return (
    <div className="relative">
      <div
        className="font-display text-[26px] leading-tight"
        style={{ fontWeight: 460 }}
      >
        하나의 데이터, 인증별 양식으로 동시 발행
      </div>
      <div className="mt-2 text-[13px]" style={{ color: "var(--ink-mute)" }}>
        SSoT 한 곳에 입력하면, 인증 어댑터가 양식·언어·구조로 자동 변환합니다.
      </div>

      <div className="mt-6 space-y-3">
        {docs.map((d, i) => (
          <div
            key={i}
            className="p-4 rounded-[14px]"
            style={{
              backgroundColor: "var(--paper)",
              border: "1px solid rgba(20,58,44,0.12)",
            }}
          >
            <div className="flex items-center justify-between">
              <div>
                <div
                  className="font-display text-[16px]"
                  style={{ fontWeight: 460, color: "var(--ink)" }}
                >
                  {d.name}
                </div>
                <div
                  className="font-mono text-[10.5px] uppercase tracking-[0.18em] mt-1"
                  style={{ color: "var(--ink-mute)" }}
                >
                  {d.std}
                </div>
              </div>
              <div
                className="font-mono text-[14px]"
                style={{ color: "var(--moss)" }}
              >
                {d.pct}%
              </div>
            </div>
            <div
              className="mt-3 h-1.5 rounded-full overflow-hidden"
              style={{ backgroundColor: "rgba(20,58,44,0.10)" }}
            >
              <div
                className="h-full rounded-full"
                style={{
                  width: `${d.pct}%`,
                  background:
                    "linear-gradient(90deg, var(--leaf), var(--moss-mid))",
                  transition: "width .8s ease",
                }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function PreviewHandover() {
  return (
    <div className="relative">
      <div
        className="font-display text-[26px] leading-tight"
        style={{ fontWeight: 460 }}
      >
        담당자가 바뀌어도, 5분 안에 시작.
      </div>
      <div className="mt-2 text-[13px]" style={{ color: "var(--ink-mute)" }}>
        결정 일지 · 진행 상태 · 외부 연락처가 한 패키지로 자동 누적됩니다.
      </div>

      <div className="mt-6 grid grid-cols-2 gap-3">
        {[
          { t: "1장 요약", s: "현재 상태 한 화면", n: "v 14" },
          { t: "결정 일지", s: "최근 20건 + 핵심 결정", n: "20" },
          { t: "미완료 작업", s: "임박 마감 5건", n: "5" },
          { t: "외부 연락처", s: "NB · 시험소 · 컨설턴트", n: "11" },
          { t: "임박 일정", s: "Top 5 마일스톤", n: "5" },
          { t: "튜토리얼", s: "RA 비전공자용 큐레이션", n: "8" },
        ].map((c, i) => (
          <div
            key={i}
            className="p-4 rounded-[12px]"
            style={{
              backgroundColor: "var(--paper)",
              border: "1px solid rgba(20,58,44,0.12)",
            }}
          >
            <div className="flex items-baseline justify-between">
              <div
                className="font-display text-[16px]"
                style={{ fontWeight: 460 }}
              >
                {c.t}
              </div>
              <div
                className="font-mono text-[12px]"
                style={{ color: "var(--amber)" }}
              >
                {c.n}
              </div>
            </div>
            <div
              className="mt-1 text-[12.5px]"
              style={{ color: "var(--ink-soft)" }}
            >
              {c.s}
            </div>
          </div>
        ))}
      </div>

      <div
        className="mt-5 px-4 py-3 rounded-[12px] flex items-center gap-3 text-[12.5px]"
        style={{
          backgroundColor: "rgba(20,58,44,0.06)",
          color: "var(--ink-soft)",
        }}
      >
        <Lock size={14} style={{ color: "var(--moss)" }} />
        모든 결정 레코드는 해시 체인으로 묶여 변조 불가능 (21 CFR Part 11).
      </div>
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
          ALL NODES ARE BIDIRECTIONALLY LINKED
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
          ZERO-GAP · STRUCTURAL INTEGRITY
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

/* ============================================================
   DATA
   ============================================================ */
const coreSix = [
  {
    title: "RA 비전공자도 사용 가능",
    en: "No-RA-Knowledge UX",
    body:
      "객관식 + 보조설명 중심의 가이드형 워크플로우. ‘왜 이걸 입력하는지’가 화면에서 즉시 보입니다.",
    icon: <Users size={18} strokeWidth={1.6} />,
  },
  {
    title: "구조적 무결한 연결성",
    en: "Zero-Gap Bidirectional Linking",
    body:
      "(A→B)와 (B→A)가 동시에 자동 생성. 누락이 시스템적으로 발생할 수 없는 양방향 참조.",
    icon: <GitBranch size={18} strokeWidth={1.6} />,
  },
  {
    title: "5분 무손실 인수인계",
    en: "Lossless Handover",
    body:
      "결정 일지·진행 상태·외부 연락처가 단일 패키지로 자동 누적. 담당자 교체에도 컨텍스트 유실 없음.",
    icon: <Workflow size={18} strokeWidth={1.6} />,
  },
  {
    title: "AI 자동 문서 생성",
    en: "Generative SOP & Tech Doc",
    body:
      "공정·검사 입력만으로 SOP, eBR, 기술문서, 검증 프로토콜 초안이 양식 그대로 발행됩니다.",
    icon: <Sparkles size={18} strokeWidth={1.6} />,
  },
  {
    title: "다중 규제 동시 매핑",
    en: "Multi-Regulation Simultaneous",
    body:
      "ISO 13485 + FDA QMSR + KGMP + EU MDR 공통·차이·충돌을 자동 식별. 한 데이터, N개 양식.",
    icon: <Globe2 size={18} strokeWidth={1.6} />,
  },
  {
    title: "규제 등급 보안 + 데이터 주권",
    en: "Regulatory-Grade Security + BYOK",
    body:
      "ISO 27001·SOC 2·21 CFR Part 11 + 고객 자체 HDD/클라우드 백업 옵션. 벤더 락인 회피.",
    icon: <Shield size={18} strokeWidth={1.6} />,
  },
];

const restFive = [
  {
    title: "Quality Tree 시각화",
    body: "DHF · DMR · CAPA · Risk를 한 트리로. 변경 영향 한눈에.",
  },
  {
    title: "인증시험 통합",
    body: "시험소·NB 매칭, 견적 비교, 성적서 디지털 인용.",
  },
  {
    title: "정부 신청·통지 통합",
    body: "MFDS · FDA · NB 신청 패키지 자동 + 보완·반려 통지 수신.",
  },
  {
    title: "공정 입력 → 서류 자동",
    body: "회사 실제 공정을 입력하면 SOP·기술문서가 자동 초안.",
  },
  {
    title: "규제 변경 영향 분석",
    body: "법령·고시 자동 수집 + 영향 받는 제품/문서 자동 식별.",
  },
];

const steps = [
  {
    title: "회사의 현실을 가이드로 입력",
    tag: "Onboarding · #ONB-003",
    body:
      "체내 체류 기간, 전기 사용 여부, 환자 접촉 방식 같은 자연어 질문에 객관식으로 답합니다. 등급·표준·검사 항목이 자동 결정됩니다.",
  },
  {
    title: "엔티티 간 양방향 자동 연결",
    tag: "SSoT · Bidirectional Linking",
    body:
      "공정·SOP·시험·위험·인증이 양방향 참조로 자동 결합. 완성도 점수와 누락 항목이 실시간으로 표시됩니다.",
  },
  {
    title: "인증별 양식이 동시에 발행",
    tag: "Auto Documents · #RA-003",
    body:
      "DHF, 기술문서, 510(k)/MDR/KGMP 신청 패키지가 양식 그대로 자동 채움. 회사가 결정해야 하는 항목만 객관식으로 남습니다.",
  },
  {
    title: "결정 일지로 5분 인수인계",
    tag: "Decision Log · 21 CFR Part 11",
    body:
      "모든 결정의 근거·외부 자문·생성 산출물이 해시 체인으로 누적. 담당자 교체에도 컨텍스트가 사라지지 않습니다.",
  },
];

const trustItems = [
  {
    title: "21 CFR Part 11 / Annex 11",
    body: "전자기록·전자서명 무결성. 결정 일지 해시 체인.",
    tag: "AUDIT TRAIL",
    icon: <FileCheck size={18} strokeWidth={1.7} />,
  },
  {
    title: "GAMP 5 시스템 검증",
    body: "URS · FS · DS · IQ/OQ/PQ · TM · VSR Vendor Audit Package.",
    tag: "CSV",
    icon: <Microscope size={18} strokeWidth={1.7} />,
  },
  {
    title: "BYOK · 고객 자체 백업",
    body: "로컬 HDD · 고객 클라우드 · 하이브리드. 벤더 락인 회피.",
    tag: "DATA SOVEREIGNTY",
    icon: <Lock size={18} strokeWidth={1.7} />,
  },
  {
    title: "사고 대응 자동 통지",
    body: "GDPR 72시간 / 개인정보보호법 24시간 법정 통지 자동 트리거.",
    tag: "INCIDENT",
    icon: <Bell size={18} strokeWidth={1.7} />,
  },
];
