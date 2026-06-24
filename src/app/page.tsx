"use client";

import { useState } from "react";
import Image from "next/image";

/* ---------------- Types ---------------- */
type PhotoVariant = "" | "green" | "sand";

interface NavItem {
  label: string;
  href: string;
}

interface Service {
  tab: string;
  title: string;
  body: string;
  photoLabel: string;
  photoAlt: string;
  variant: PhotoVariant;
  pills: string[];
  detail?: string;
  src?: string;
}

interface PriceRow {
  name: string;
  note: string;
  amount: string;
  time?: string;
}
interface PriceGroup {
  label: string;
  rows: PriceRow[];
}

interface Step {
  title: string;
  body: string;
}
interface Faq {
  q: string;
  a: React.ReactNode;
}
interface Treat {
  label: string;
  note: string;
}

/* ---------------- Site data (edit here) ---------------- */
const CONTACT = {
  address1: "777 Main Ave, Ste. 213A",
  address2: "Durango, CO 81301",
  phone: "(303) 323-5773",
  email: "speechtherapy@shelteredstrategies.com",
  asha: "14229302",
  region: "CO & CA",
};

const NAV: NavItem[] = [
  { label: "Services", href: "#services" },
  { label: "What I Treat", href: "#treats" },
  { label: "Pricing", href: "#pricing" },
  { label: "FAQ", href: "#faq" },
  { label: "About", href: "#about" },
];

const CREDS: { badge?: string; imgSrc?: string; label: string }[] = [
  { imgSrc: "/assets/asha-ccc.png", badge: `#${CONTACT.asha}`, label: "ASHA Certified · CCC-SLP" },
  { badge: "CO Lic.", label: "Colorado Licensed" },
  { badge: "CA Lic.", label: "California Licensed" },
];

const TREATS: Treat[] = [
  {
    label: "Articulation and Phonological Disorders",
    note: "Helping individuals who struggle with producing specific speech sounds (such as a frontal/lateral lisp or difficulties with the /r/ sound).",
  },
  {
    label: "Receptive Language Delays/Disorders",
    note: "Helping individuals understand the language and information they receive.",
  },
  {
    label: "Expressive Language Delays/Disorders",
    note: "Assisting individuals with sharing their thoughts, ideas, and words effectively with others.",
  },
  {
    label: "Fluency",
    note: "Addressing stuttering or other disruptions in the natural flow of speech.",
  },
  {
    label: "Childhood Apraxia of Speech (CAS)",
    note: "A motor speech disorder where the brain struggles to plan and coordinate the movements necessary for speech.",
  },
  {
    label: "Executive Functioning & Cognitive Skills",
    note: "Support for cognitive-communication needs including working memory, flexible thinking, and self-regulation.",
  },
  {
    label: "Pragmatics / Social Language",
    note: "Skills like sharing, turn-taking, expressing wants and needs safely, and understanding social rules of communication.",
  },
  {
    label: "Augmentative and Alternative Communication (AAC)",
    note: "Supporting the use of communication devices, signs, or tools for individuals who cannot rely entirely on verbal speech.",
  },
];

const SERVICES: Service[] = [
  {
    tab: "Free Screenings",
    title: "Free Screenings",
    body: "Not sure if a full evaluation is warranted? A no-cost screening is a brief, low-pressure opportunity to identify potential areas of concern in speech sound production, language, or fluency. I'll share my clinical impressions and clear recommendations for next steps — whether that's a formal evaluation or reassurance that development is on track.",
    photoLabel: "water bottle · sunscreen · chapstick · trail mix",
    photoAlt: "Backpack packed for a free speech and language screening visit",
    variant: "green",
    src: "/assets/backpack.png",
    pills: ["No cost", "No referral needed"],
    detail:
      "Screenings take approximately 20–30 minutes and include informal observation and brief standardized tasks. Families leave with clear, actionable guidance — no commitment required.",
  },
  {
    tab: "Evaluations",
    title: "Speech & Language Evaluations",
    body: "A thorough, individualized evaluation is the foundation of an effective therapy plan. Evaluations may focus on speech sound production, receptive and expressive language, fluency, or a comprehensive assessment covering structure, function, voice, and fluency. Using a combination of standardized testing and informal clinical observation, I build a complete picture of each client's strengths and areas of need. A formal written report — including test results, clinical observations, background history, and individualized recommendations — is provided with every evaluation.",
    photoLabel: "trail map",
    photoAlt: "Trail map illustrating the speech and language evaluation process",
    variant: "sand",
    src: "/assets/trailmap.png",
    pills: [
      "Written report included",
      "Formal + informal measures",
      "60–90 minutes",
    ],
    detail: undefined,
  },
  {
    tab: "Speech Sound Therapy",
    title: "Speech Sound Therapy",
    body: "For those who struggle to produce certain sounds clearly and consistently. Therapy builds from a strong phonetic foundation — targeting sounds in isolation and advancing to words, phrases, sentences, and natural conversation. Evidence-based approaches are selected based on the specific nature of each client's disorder: articulation-based, phonological, or motor-speech (including Childhood Apraxia of Speech). Sessions are engaging, goal-directed, and designed to support real-world communication.",
    photoLabel: "wildflowers along the way",
    photoAlt: "Wildflowers symbolizing steady progress in speech sound therapy",
    variant: "green",
    src: "/assets/wildflowers.jpg",
    pills: [
      "Articulation",
      "Phonological disorders",
      "Childhood Apraxia of Speech",
    ],
    detail: undefined,
  },
  {
    tab: "Language Therapy",
    title: "Language Therapy",
    body: "Language is broad, nuanced, and deeply individual. Receptive language is the language you know in your head but don't always share — understanding others and following directions. Expressive language is the language you use to communicate with others. There are three components of language — form, content, and use. Within that framework, therapy may address syntax, morphology, phonology, semantics, and pragmatics.",
    photoLabel: "lake at trail's end",
    photoAlt: "Calm lake representing clear communication as the goal of language therapy",
    variant: "sand",
    src: "/assets/lake+at+end.jpg",
    pills: [
      "Receptive language",
      "Expressive language",
      "Form · Content · Use",
    ],
    detail: undefined,
  },
];

const PRICE_GROUPS: PriceGroup[] = [
  {
    label: "Screenings",
    rows: [
      {
        name: "Speech and Language Screening",
        note: "Informal · no referral needed",
        amount: "Free",
        time: "20–30 min",
      },
    ],
  },
  {
    label: "Evaluations",
    rows: [
      {
        name: "Comprehensive Evaluation",
        note: "Speech, language, fluency & voice",
        amount: "$250",
        time: "60–90 min",
      },
      {
        name: "Speech Sound Evaluation",
        note: "Articulation & phonology",
        amount: "$150",
        time: "60 min",
      },
      {
        name: "Language Evaluation",
        note: "Receptive & expressive language",
        amount: "$200",
        time: "60–75 min",
      },
      {
        name: "Fluency Evaluation",
        note: "Stuttering & cluttering",
        amount: "$150",
        time: "60 min",
      },
    ],
  },
  {
    label: "Therapy",
    rows: [
      {
        name: "Individual Therapy Session",
        note: "Speech or language",
        amount: "$125",
        time: "45 min",
      },
      {
        name: "Free Consultation",
        note: "Is this the right fit? · no obligation",
        amount: "Free",
        time: "15 min",
      },
    ],
  },
];

const STEPS: Step[] = [
  {
    title: "Free consultation",
    body: "We talk through your concerns and goals — no cost, no pressure — and decide the right next step together.",
  },
  {
    title: "Screening or evaluation",
    body: "A brief screening clarifies whether a full evaluation is needed. If it is, a comprehensive assessment pinpoints strengths and areas of need.",
  },
  {
    title: "Results & goals",
    body: "We review the findings together and set clear, meaningful short- and long-term goals that guide therapy.",
  },
  {
    title: "Therapy plan",
    body: "Focused, evidence-based sessions that adapt as skills grow, always aimed at real-world communication.",
  },
];

const FAQS: Faq[] = [
  {
    q: "What is a free screening, and how is it different from an evaluation?",
    a: "A screening is a brief, informal check — typically 20–30 minutes — to identify whether there may be areas of concern worth examining more closely. It is not a diagnostic assessment. An evaluation is a comprehensive, standardized assessment that results in a formal written report with clinical findings and individualized recommendations. A screening is the right first step when you're unsure whether concerns are significant enough to warrant a full evaluation.",
  },
  {
    q: "How long are appointments?",
    a: "Evaluations run 60–90 minutes depending on the areas assessed. Therapy sessions are 45 minutes. The free initial consultation is a 15-minute conversation — no commitment required.",
  },
  {
    q: "Do you take insurance?",
    a: "Sheltered Strategies does not bill insurance directly. Superbills are available on request for submission to your insurance provider for possible out-of-network reimbursement.",
  },
  {
    q: "What is a superbill?",
    a: (
      <>
        A superbill is an itemized receipt you can submit to your insurance
        provider to request possible out-of-network reimbursement. I provide
        superbills on request — <a href="#contact">just ask</a>, or{" "}
        <a href="/assets/Superbill Example.pdf" target="_blank" rel="noopener noreferrer">
          see an example
        </a>.
      </>
    ),
  },
  {
    q: "What areas do you serve?",
    a: "In-person sessions are held at 777 Main Ave, Ste. 213A in Durango, CO. Teletherapy is available to clients across Colorado and California.",
  },
  {
    q: "What is your cancellation policy?",
    a: "Please contact Avery directly to discuss cancellation and rescheduling terms.",
  },
];

/* ---------------- Small inline icons ---------------- */
const IconPin = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
    <path d="M12 21s-7-6.3-7-11a7 7 0 0 1 14 0c0 4.7-7 11-7 11Z" />
    <circle cx="12" cy="10" r="2.4" />
  </svg>
);
const IconPhone = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
    <path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L20 13l1 5v1a1 1 0 0 1-1 1A16 16 0 0 1 4 5a1 1 0 0 1 1-1Z" />
  </svg>
);
const IconMail = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
    <path d="M4 6h16v12H4z" />
    <path d="m4 7 8 6 8-6" />
  </svg>
);
const IconInfo = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
    <circle cx="12" cy="12" r="9" />
    <path d="M12 11v5M12 8h.01" />
  </svg>
);
const IconCheck = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5}>
    <polyline points="20 6 9 17 4 12" />
  </svg>
);

const LogoMark = () => (
  <svg
    width="36"
    height="36"
    viewBox="0 0 36 36"
    fill="none"
    className="logomark"
  >
    <rect
      x="1.5"
      y="1.5"
      width="22"
      height="18"
      rx="5.5"
      stroke="currentColor"
      strokeWidth="1.9"
    />
    <path
      d="M5 19.5l-2.5 7L11 22"
      stroke="currentColor"
      strokeWidth="1.9"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <rect
      x="12"
      y="9"
      width="22"
      height="18"
      rx="5.5"
      stroke="currentColor"
      strokeWidth="1.9"
      fill="var(--paper)"
    />
    <path
      d="M31 27l2.5 6.5-7.5-3.5"
      stroke="currentColor"
      strokeWidth="1.9"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const LANG_RULES: { term: string; def: string }[] = [
  {
    term: "Form",
    def: "The rules that govern the structure of language — including syntax (word order and sentence structure), morphology (word-level meaning changes), and phonology (sound patterns and sequencing).",
  },
  {
    term: "Content",
    def: "The rules that govern meaning in language — primarily semantics, which addresses the meaning and context of words and grammatical units.",
  },
  {
    term: "Use",
    def: "The rules that govern language use across social communication contexts — including pragmatics, which addresses how language functions in real-world interactions.",
  },
];

function LangRules() {
  const [open, setOpen] = useState<number | null>(null);
  return (
    <div className="lang-rules">
      <p></p>
      {LANG_RULES.map((r, i) => (
        <button
          key={r.term}
          className={`lang-rule${open === i ? " open" : ""}`}
          onClick={() => setOpen(open === i ? null : i)}
        >
          <span className="lang-rule__term">{r.term}</span>
          {open === i && <span className="lang-rule__def">{r.def}</span>}
        </button>
      ))}
    </div>
  );
}

/* ---------------- Reusable photo placeholder ---------------- */
function Photo({
  label,
  alt,
  variant = "",
  className = "",
  src,
  priority = false,
}: {
  label: string;
  alt?: string;
  variant?: PhotoVariant;
  className?: string;
  src?: string;
  priority?: boolean;
}) {
  const cls = ["ph", variant, className].filter(Boolean).join(" ");
  return (
    <div className={cls}>
      {src ? (
        <Image
          src={src}
          alt={alt ?? label}
          fill
          sizes="(max-width: 720px) 100vw, 560px"
          style={{ objectFit: "cover" }}
          priority={priority}
        />
      ) : (
        label
      )}
    </div>
  );
}

function SvcPanelContent({ s, isLang }: { s: Service; isLang: boolean }) {
  return (
    <>
      <Photo variant={s.variant} label={s.photoLabel} alt={s.photoAlt} src={s.src} />
      <h3>{s.title}</h3>
      <p>{s.body}</p>
      <div className="svc__meta">
        {s.pills.map((p) => <span className="pill" key={p}>{p}</span>)}
      </div>
      {s.detail && <p className="svc__detail">{s.detail}</p>}
      {isLang && <LangRules />}
    </>
  );
}

/* ---------------- Page ---------------- */
export default function ShelteredStrategiesHome() {
  const [activeSvc, setActiveSvc] = useState(0);
  const [openSvcIdx, setOpenSvcIdx] = useState<number | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const svc = SERVICES[activeSvc];

  return (
    <div className="ss" id="top">
      {/* utility bar */}
      <div className="utility">
        <div className="wrap">
          <div className="u-left">
            <span className="u-item">
              <IconPin />
              {CONTACT.address1} · Durango, CO
            </span>
            <a
              className="u-item"
              href={`tel:${CONTACT.phone.replace(/\D/g, "")}`}
            >
              <IconPhone />
              {CONTACT.phone}
            </a>
          </div>
          <div className="u-right">CO &amp; CA · Speech-Language Pathology</div>
        </div>
      </div>

      {/* header */}
      <header className="head">
        <div className="wrap nav">
          <a
            className="brand"
            href="#top"
            aria-label="Sheltered Strategies home"
          >
            <LogoMark />
            <span className="name">
              Sheltered Strategies<small>Guided Communication Strategies</small>
            </span>
          </a>
          <nav className="nav-links">
            {NAV.map((n) => (
              <a key={n.label} href={n.href}>
                {n.label}
              </a>
            ))}
          </nav>
          <div className="nav-cta">
            <a className="btn" href="#contact">
              Schedule a consult
            </a>
            <button className="menu-btn" aria-label="Menu" onClick={() => setMenuOpen(true)}>
              <span />
              <span />
              <span />
            </button>
          </div>
        </div>
      </header>

      {menuOpen && (
        <div className="mobile-menu">
          <div className="mobile-menu__overlay" onClick={() => setMenuOpen(false)} />
          <div className="mobile-menu__drawer">
            <button className="mobile-menu__close" aria-label="Close menu" onClick={() => setMenuOpen(false)}>✕</button>
            {NAV.map((n) => (
              <a key={n.label} href={n.href} onClick={() => setMenuOpen(false)}>{n.label}</a>
            ))}
            <a className="btn" href="#contact" onClick={() => setMenuOpen(false)}>Schedule a consult</a>
          </div>
        </div>
      )}

      <main>
        {/* hero */}
        <section className="hero">
          <div className="wrap hero__grid">
            <div>
              <p className="eyebrow">Speech-Language Pathology · Durango, CO</p>
              <h1>
                Providing a sheltered space for guided speech <em>and</em>{" "}
                language strategies.
              </h1>
              <p className="lead">
                Individualized speech and language therapy in a calm,
                professional setting — built around your goals, at a pace that
                fits.
              </p>
              <div className="hero__cta">
                <a className="btn" href="#contact">
                  Book a free consultation
                </a>
                <a className="btn btn--taupe" href="#services">
                  Explore services
                </a>
              </div>
              <div className="hero__cred">
                <span>
                  <b>ASHA-certified</b> SLP (CCC-SLP)
                </span>
                <span>
                  <b>Birth–15</b> · primarily
                </span>
                <span>
                  <b>In-person</b>
                </span>
              </div>
            </div>
            <div className="hero__media">
              <Photo
                variant="green"
                label="Lions Den"
                alt="Lions Den trail near Durango, Colorado — the setting for Sheltered Strategies speech-language therapy"
                src="/assets/Lions Den.jpg"
                priority
              />
            </div>
          </div>
        </section>

        {/* credential strip */}
        <div className="creds">
          <div className="wrap">
            {CREDS.map((c) => (
              <span className="cred" key={c.label}>
                {c.imgSrc
                  ? (
                    <Image
                      src="/assets/ashacert.avif"
                      alt="ASHA Certificate of Clinical Competence (CCC-SLP) seal"
                      width={38}
                      height={40}
                      className="asha-badge"
                    />
                  )
                  : <span className="badge">{c.badge}</span>
                }
                {c.label}
              </span>
            ))}
          </div>
        </div>

        {/* two ways */}
        <section className="block" id="approach">
          <div className="wrap">
            <div className="ways__top">
              <div className="sectionhead">
                <p className="eyebrow">How we work together</p>
                <h2>Two ways to work.</h2>
              </div>
              <p className="lead" style={{ margin: 0 }}>
                Everythings begins with a free consultation — to understand your concerns and decide the right
                next step together.
              </p>
            </div>
            <div className="ways__grid">
              <div className="way">
                <span className="way__n">01 — Evaluation</span>
                <h3>Comprehensive assessment</h3>
                <p>
                  An evaluation that pinpoints exactly what&apos;s going on —
                  focused on speech sounds, language, fluency, or a complete
                  look at structure, function, and voice.
                </p>
                <a className="textlink" href="#pricing">
                  See evaluation options &amp; pricing →
                </a>
              </div>
              <div className="way">
                <span className="way__n">02 — Treatment</span>
                <h3>Individualized therapy</h3>
                <p>
                  Focused 45-minute sessions built on your evaluation —
                  evidence-based, engaging, and paced to your progress. We
                  adjust the plan as skills grow, always working toward
                  real-world communication.
                </p>
                <a className="textlink" href="#pricing">
                  See therapy pricing →
                </a>
              </div>
            </div>
            <p className="ways__note">
              Not sure where to start? <b>A free screening</b> is always an
              option — no referral or commitment needed.
            </p>
          </div>
        </section>

        {/* what i treat */}
        <section className="block block--alt" id="treats">
          <div className="wrap">
            <div className="sectionhead" style={{ marginBottom: 36 }}>
              <p className="eyebrow">Areas of expertise</p>
              <h2>What I treat</h2>
            </div>
            <div className="treats">
              {TREATS.map((t) => (
                <div className="treat" key={t.label}>
                  <span className="treat__icon">
                    <IconCheck />
                  </span>
                  <div>
                    <div className="treat__label">{t.label}</div>
                    <p className="treat__note">{t.note}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* services dash tabs */}
        <section className="block" id="services">
          <div className="wrap">
            <div className="sectionhead" style={{ marginBottom: 36 }}>
              <p className="eyebrow">What I offer</p>
              <h2>Services</h2>
            </div>
            {/* desktop: tab + panel */}
            <div className="svc svc--desktop">
              <div className="svc__list" role="tablist">
                {SERVICES.map((s, i) => (
                  <button
                    key={s.tab}
                    role="tab"
                    aria-selected={i === activeSvc}
                    className={`svc__tab${i === activeSvc ? " active" : ""}`}
                    onClick={() => setActiveSvc(i)}
                  >
                    <span className="plus">+</span>
                    {s.tab}
                  </button>
                ))}
              </div>
              <div className="svc__panels">
                <div className="svc__panel" key={activeSvc}>
                  <SvcPanelContent s={svc} isLang={activeSvc === 3} />
                </div>
              </div>
            </div>

            {/* mobile: FAQ-style details/summary */}
            <div className="svc--mobile">
              {SERVICES.map((s, i) => (
                <details key={s.tab} className="svc__details" open={openSvcIdx === i}>
                  <summary
                    onClick={(e) => {
                      e.preventDefault();
                      setOpenSvcIdx(openSvcIdx === i ? null : i);
                    }}
                  >
                    {s.tab}
                    <span className="ic" />
                  </summary>
                  <div className="svc__details__panel svc__panel">
                    <SvcPanelContent s={s} isLang={i === 3} />
                  </div>
                </details>
              ))}
            </div>
          </div>
        </section>

        {/* pricing */}
        <section className="block block--alt" id="pricing">
          <div className="wrap">
            <div className="price__top">
              <p className="eyebrow">Simple &amp; transparent</p>
              <h2>Pricing menu</h2>
              <p>
                Every service is clearly priced, with the time you
                can expect to spend together.
              </p>
            </div>
            <div className="menu">
              {PRICE_GROUPS.map((g) => (
                <div className="menu__group" key={g.label}>
                  <div className="menu__label">{g.label}</div>
                  {g.rows.map((r) => (
                    <div className="menu__row" key={r.name}>
                      <div className="info">
                        <b>{r.name}</b>
                      </div>
                      <span className="dotfill" />
                      <span className="amt">
                        {r.amount}
                        {r.time && <small>{r.time}</small>}
                      </span>
                    </div>
                  ))}
                </div>
              ))}
              <div className="menu__foot">
                <IconInfo />
                <span>
                  A superbill is available on request for submission to your
                  insurance for possible out-of-network reimbursement. See the
                  FAQ for details.
                </span>
              </div>
            </div>

            <div className="screen">
              <p>
                <b>Free screenings available.</b> A quick, no-cost check to see
                if a full evaluation is the right next step.
              </p>
              <a className="btn btn--light" href="#contact">
                Request a screening
              </a>
            </div>
          </div>
        </section>

        {/* process */}
        <section className="block" id="process">
          <div className="wrap">
            <div className="sectionhead" style={{ marginBottom: 40 }}>
              <p className="eyebrow">What to expect</p>
              <h2>A clear, simple process</h2>
            </div>
            <div className="proc">
              {STEPS.map((s, i) => (
                <div className="proc__step" key={s.title}>
                  <div className="num">{i + 1}</div>
                  <h4>{s.title}</h4>
                  <p>{s.body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* faq */}
        <section className="block block--alt" id="faq">
          <div className="wrap">
            <div
              className="sectionhead"
              style={{
                margin: "0 auto 34px",
                textAlign: "center",
                maxWidth: "none",
              }}
            >
              <p className="eyebrow">Common questions</p>
              <h2 style={{ marginTop: 12 }}>Good to know</h2>
            </div>
            <div className="faq">
              {FAQS.map((f, i) => (
                <details key={f.q} open={i === 0}>
                  <summary>
                    {f.q}
                    <span className="ic" />
                  </summary>
                  <div className="ans">{f.a}</div>
                </details>
              ))}
            </div>
          </div>
        </section>

        {/* about */}
        <section className="block" id="about">
          <div className="wrap about__grid">
            <div className="about__media">
              <Photo
                variant="green"
                label="Avery Sheldon, M.S., CCC-SLP"
                alt="Avery Sheldon, M.S., CCC-SLP, speech-language pathologist at Sheltered Strategies"
                src="/assets/ss+photo+2.webp"
              />
              <div className="about__lic">
                <div className="lic">
                  <span className="lic__badge">CCC-SLP</span>
                  <div>
                    <b>Certificate of Clinical Competence</b>
                    <small>American Speech-Language-Hearing Association (ASHA)</small>
                  </div>
                </div>
                <div className="lic">
                  <span className="lic__badge">CO</span>
                  <div>
                    <b>CO Licensed SLP</b>
                  </div>
                </div>
                <div className="lic">
                  <span className="lic__badge">CA</span>
                  <div>
                    <b>CA Licensed SLP</b>
                  </div>
                </div>
              </div>
            </div>
            <div className="about">
              <p className="eyebrow">About</p>
              <h2>Meet Avery Sheldon, M.S., CCC-SLP</h2>
              <p>
                Avery holds a Master of Science in Communication Sciences and
                Disorders from Appalachian State University. She earned her
                undergraduate degree from Fort Lewis College and her
                post-baccalaureate from the University of Colorado, Boulder.
                She has worked across Early Intervention, public school, home
                health, hospital, and skilled nursing settings, bringing broad
                clinical experience to every evaluation and therapy program.
              </p>
              <p style={{ marginTop: "1em" }}>
                She began her speech career as a Speech-Language Pathology
                Assistant with San Juan BOCES before heading to graduate school.
                After graduate school, she worked on the Front Range at a Title
                I school where the majority of clients were English Language
                Learners. The duality of Spanish and English scaffolding
                instruction is where the name Sheltered Strategies was born.
                Sheltered Instruction Strategies are strategies that adapt
                speech, teach vocabulary through context, and use background
                knowledge to aid in the understanding of new material. That,
                infused with her last name Sheldon — or &ldquo;protected hill&rdquo; — serves
                as the inspiration to give clients an opportunity to learn
                communication strategies in a sheltered, protected environment.
              </p>
              <p style={{ marginTop: "1em" }}>
                In addition to holding her Certificate of Clinical Competence
                (CCC) from ASHA, Avery is licensed through Colorado Department
                of Education (CDE) and Department of Regulatory Agencies (DORA).
                She is trained in teletherapy and is cross-licensed in the State
                of California through the Department of Consumer Affairs (DCA)
                Speech-Language Pathology &amp; Audiology &amp; Hearing Aide
                Dispensers Board.
              </p>
              <p style={{ marginTop: "1em" }}>
                When not with clients, she enjoys spending time with her husband
                and their four-year-old twins, practicing yoga, running, and
                riding bikes.
              </p>
              <div className="about__sig">
                <div>
                  <b>CCC-SLP</b>
                  <span>ASHA Certified</span>
                </div>
                <div>
                  <b>#{CONTACT.asha}</b>
                  <span>ASHA Number</span>
                </div>
                <div>
                  <b>{CONTACT.region}</b>
                  <span>Service region</span>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* contact / cta */}
      <section className="cta" id="contact">
        <div className="wrap">
          <div>
            <p className="eyebrow" style={{ color: "#f0c4b0" }}>
              Let&apos;s begin
            </p>
            <h2>Ready to take the first step?</h2>
            <p>
              Book a consultation. We&apos;ll talk through your
              concerns and figure out the best path forward.
            </p>
          </div>
          <div className="cta__box">
            <div className="row">
              <IconPin />
              <span>
                {CONTACT.address1}
                <br />
                {CONTACT.address2}
              </span>
            </div>
            <div className="row">
              <IconPhone />
              <a href={`tel:${CONTACT.phone.replace(/\D/g, "")}`}>
                {CONTACT.phone}
              </a>
            </div>
            <div className="row">
              <IconMail />
              <a href={`mailto:${CONTACT.email}`}>{CONTACT.email}</a>
            </div>
            <a className="btn btn--light" href="https://calendar.google.com/calendar/u/0/appointments/schedules/AcZssZ3UkUkf0_Cme6prmyEtw31C958BueCNPEChfSEbQ1mHN89nh88OpeEBfB4lml60W8hFnl1RdlQm" target="_blank" rel="noopener noreferrer">
              Schedule a free consultation
            </a>
          </div>
        </div>
      </section>

      <footer className="foot">
        <div className="wrap">
          <span>
            © 2026 Sheltered Strategies · Speech &amp; Language Therapy
          </span>
          <span>
            Durango, CO · Serving {CONTACT.region}
          </span>
        </div>
      </footer>
    </div>
  );
}
