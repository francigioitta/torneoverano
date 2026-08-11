import React, { useEffect, useRef, useState } from "react";

/* ============================================================
   👉 CAMBIA SOLO QUESTA RIGA quando hai il link Formspree/Google Form
   ============================================================ */
const FORM_URL = "https://formspree.io/f/INSERISCI-IL-TUO-ID";

const EVENTS = [
  {
    id: "volley",
    kind: "BEACH VOLLEY",
    ball: "🏐",
    date: "Mercoledì 12 Agosto",
    time: "Orario da confermare",
    place: "Spiaggia 59 — Misano Adriatico",
    quota: "5€ a persona",
    prize: "Il montepremi nasce dalle quote raccolte e va alla squadra vincitrice.",
    accent: "coral",
  },
  {
    id: "foot",
    kind: "TORNEO FOOT",
    ball: "⚽",
    date: "Mercoledì 12 Agosto",
    time: "Orario da confermare",
    place: "Luogo comunicato in chat",
    quota: "5€ a persona",
    prize: "Il montepremi nasce dalle quote raccolte e va alla squadra vincitrice.",
    accent: "pink",
  },
];

function useReveal() {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          obs.disconnect();
        }
      },
      { threshold: 0.2 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return [ref, visible];
}

function EventTicket({ ev, index }) {
  const [ref, visible] = useReveal();
  const accentVar = ev.accent === "coral" ? "var(--coral)" : "var(--pink)";

  return (
    <div
      ref={ref}
      className="ticket"
      style={{
        transitionDelay: `${index * 120}ms`,
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(28px)",
      }}
    >
      <div className="ticket-top">
        <span className="ticket-ball" aria-hidden="true">
          {ev.ball}
        </span>
        <div>
          <p className="ticket-eyebrow" style={{ color: accentVar }}>
            {ev.kind}
          </p>
          <h3 className="ticket-title">{ev.date}</h3>
        </div>
      </div>

      <div className="ticket-perf" aria-hidden="true" />

      <dl className="ticket-details">
        <div>
          <dt>Orario</dt>
          <dd>{ev.time}</dd>
        </div>
        <div>
          <dt>Luogo</dt>
          <dd>{ev.place}</dd>
        </div>
        <div>
          <dt>Quota</dt>
          <dd>{ev.quota} · in contanti</dd>
        </div>
        <div>
          <dt>Montepremi</dt>
          <dd>{ev.prize}</dd>
        </div>
      </dl>

      <a
        className="ticket-cta"
        href={FORM_URL}
        target="_blank"
        rel="noopener noreferrer"
        style={{ background: accentVar }}
      >
        Iscrivi la tua squadra →
      </a>
    </div>
  );
}

export default function App() {
  const [rulesRef, rulesVisible] = useReveal();

  return (
    <div className="page">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Anton&family=Work+Sans:wght@400;500;600;700&display=swap');

        :root{
          --navy-deep:#081C29;
          --navy:#0E2A3D;
          --sand:#F2C88F;
          --coral:#FF6B4E;
          --pink:#FF3E6C;
          --cream:#FDF3E4;
        }
        *{box-sizing:border-box;}
        @media (prefers-reduced-motion: reduce){
          *{animation-duration:0.001ms !important; animation-iteration-count:1 !important; transition-duration:0.001ms !important;}
        }
        html,body{margin:0;padding:0;}
        .page{
          min-height:100vh;
          background:
            radial-gradient(ellipse 120% 60% at 50% 0%, #16405A 0%, var(--navy) 45%, var(--navy-deep) 100%);
          font-family:'Work Sans', sans-serif;
          color:var(--cream);
          overflow-x:hidden;
          position:relative;
        }

        /* ---------- ambient drifting light specks ---------- */
        .specks{position:absolute; inset:0; overflow:hidden; pointer-events:none; z-index:0;}
        .speck{
          position:absolute; border-radius:50%; background:var(--sand); opacity:0.35;
          animation:drift linear infinite;
        }
        @keyframes drift{
          0%{transform:translateY(0px) translateX(0px); opacity:0;}
          10%{opacity:0.35;}
          90%{opacity:0.35;}
          100%{transform:translateY(-140px) translateX(30px); opacity:0;}
        }

        /* ---------- hero ---------- */
        .hero{
          position:relative; z-index:1;
          padding:72px 24px 40px;
          text-align:center;
          display:flex; flex-direction:column; align-items:center;
        }
        .eyebrow{
          font-size:13px; letter-spacing:0.32em; font-weight:600;
          color:var(--sand); text-transform:uppercase; margin:0 0 18px;
        }
        .title{
          font-family:'Anton', sans-serif;
          font-weight:400;
          line-height:0.92;
          font-size:clamp(48px, 12vw, 108px);
          margin:0;
          letter-spacing:0.01em;
          background:linear-gradient(180deg, var(--cream) 0%, var(--sand) 100%);
          -webkit-background-clip:text;
          background-clip:text;
          color:transparent;
        }
        .title span{display:block;}
        .subtitle{
          max-width:520px; margin:22px auto 0;
          font-size:16px; line-height:1.6; color:#D9E4EC;
        }
        .subtitle b{color:var(--sand);}

        /* ---------- bouncing ball + net ---------- */
        .court{
          position:relative; width:min(560px, 90%); height:90px; margin-top:46px;
        }
        .net-line{
          position:absolute; left:0; right:0; bottom:18px; height:2px;
          background:repeating-linear-gradient(90deg, var(--cream) 0 6px, transparent 6px 14px);
          opacity:0.55;
        }
        .net-post{
          position:absolute; bottom:0; width:2px; height:38px; background:var(--cream); opacity:0.55;
        }
        .net-post.left{left:0;}
        .net-post.right{right:0;}
        .bouncer{
          position:absolute; left:0; bottom:20px;
          width:34px; height:34px; border-radius:50%;
          background:radial-gradient(circle at 32% 28%, #fff 0%, var(--coral) 45%, #C7401F 100%);
          box-shadow:0 0 18px rgba(255,107,78,0.55);
          animation:bounce 2.4s cubic-bezier(.5,0,.7,.4) infinite;
        }
        @keyframes bounce{
          0%{ left:0%; transform:translateY(0) scale(1,1); }
          22%{ transform:translateY(-70px) scale(1,1); }
          45%{ left:38%; transform:translateY(0) scale(1.14,0.86); }
          50%{ transform:translateY(0) scale(1,1); }
          68%{ transform:translateY(-32px) scale(1,1); }
          90%{ left:82%; transform:translateY(0) scale(1.1,0.9);}
          100%{ left:100%; transform:translateY(0) scale(1,1); }
        }

        /* ---------- tickets ---------- */
        .tickets{
          position:relative; z-index:1;
          display:grid; grid-template-columns:repeat(auto-fit, minmax(300px, 1fr));
          gap:28px; max-width:920px; margin:64px auto 0; padding:0 24px 20px;
        }
        .ticket{
          background:linear-gradient(160deg, #F7EBD8 0%, var(--sand) 100%);
          color:#231607;
          border-radius:18px;
          padding:26px 26px 24px;
          box-shadow:0 18px 40px rgba(0,0,0,0.35);
          transition:opacity 0.6s ease, transform 0.6s ease;
        }
        .ticket-top{display:flex; align-items:center; gap:14px;}
        .ticket-ball{font-size:34px; line-height:1;}
        .ticket-eyebrow{
          margin:0; font-size:12px; font-weight:700; letter-spacing:0.16em;
        }
        .ticket-title{
          margin:2px 0 0; font-family:'Anton', sans-serif; font-weight:400;
          font-size:22px; letter-spacing:0.01em; color:#231607;
        }
        .ticket-perf{
          height:0; border-top:2px dashed rgba(35,22,7,0.28);
          margin:20px -26px;
        }
        .ticket-details{margin:0; display:grid; gap:12px;}
        .ticket-details > div{display:flex; justify-content:space-between; gap:14px; font-size:14px;}
        .ticket-details dt{font-weight:700; opacity:0.65; white-space:nowrap;}
        .ticket-details dd{margin:0; text-align:right;}
        .ticket-cta{
          display:block; text-align:center; margin-top:22px;
          padding:13px 18px; border-radius:999px;
          color:#1a1a1a; font-weight:700; text-decoration:none; font-size:15px;
          transition:transform 0.2s ease, filter 0.2s ease;
        }
        .ticket-cta:hover{transform:translateY(-2px); filter:brightness(1.06);}
        .ticket-cta:focus-visible{outline:3px solid var(--cream); outline-offset:3px;}

        /* ---------- rules ---------- */
        .rules{
          position:relative; z-index:1;
          max-width:720px; margin:70px auto 0; padding:0 24px;
          opacity:0; transform:translateY(20px);
          transition:opacity 0.6s ease, transform 0.6s ease;
        }
        .rules.visible{opacity:1; transform:translateY(0);}
        .rules-box{
          border:1.5px solid rgba(242,200,143,0.35);
          border-radius:16px; padding:26px 26px;
          background:rgba(253,243,228,0.04);
        }
        .rules-box h4{
          margin:0 0 12px; font-family:'Anton', sans-serif; font-weight:400;
          font-size:18px; letter-spacing:0.03em; color:var(--sand);
        }
        .rules-box ul{margin:0; padding-left:20px; display:grid; gap:9px;}
        .rules-box li{font-size:14.5px; line-height:1.55; color:#E7EEF3;}
        .rules-box li b{color:var(--pink);}

        footer{
          position:relative; z-index:1;
          text-align:center; padding:50px 24px 60px; font-size:13px; color:#9FB3C2;
        }
        footer a{color:var(--sand);}
      `}</style>

      <div className="specks" aria-hidden="true">
        {Array.from({ length: 18 }).map((_, i) => (
          <span
            key={i}
            className="speck"
            style={{
              left: `${(i * 53) % 100}%`,
              bottom: `${(i * 31) % 100}%`,
              width: `${3 + (i % 4)}px`,
              height: `${3 + (i % 4)}px`,
              animationDuration: `${8 + (i % 6)}s`,
              animationDelay: `${i * 0.4}s`,
            }}
          />
        ))}
      </div>

      <header className="hero">
        <p className="eyebrow">12 Agosto · Misano Adriatico</p>
        <h1 className="title">
          <span>TORNEO</span>
          <span>ESTATE</span>
        </h1>
        <p className="subtitle">
          Due tornei, un solo pomeriggio: <b>Beach Volley</b> e <b>Torneo Foot</b>.
          Iscrivi la tua squadra, porta i contanti e vediamoci in campo.
        </p>

        <div className="court" aria-hidden="true">
          <div className="net-post left" />
          <div className="net-post right" />
          <div className="net-line" />
          <div className="bouncer" />
        </div>
      </header>

      <main>
        <section className="tickets">
          {EVENTS.map((ev, i) => (
            <EventTicket ev={ev} index={i} key={ev.id} />
          ))}
        </section>

        <section ref={rulesRef} className={`rules ${rulesVisible ? "visible" : ""}`}>
          <div className="rules-box">
            <h4>Prima di iscriverti</h4>
            <ul>
              <li>
                <b>Iscrizione obbligatoria</b> con nome, cognome ed età di ogni
                partecipante tramite il modulo.
              </li>
              <li>
                Chi si iscrive e <b>non si presenta</b> senza avvisare per tempo
                viene segnato — i campi si organizzano in base al numero confermato.
              </li>
              <li>
                Quota di <b>5€ a persona</b>, da portare in <b>contanti</b> il
                giorno stesso.
              </li>
              <li>
                Ogni partecipante è responsabile di sé stesso: la partecipazione è
                volontaria e ogni responsabilità per infortuni o danni ricade
                sul singolo, come indicato nel modulo di iscrizione.
              </li>
            </ul>
          </div>
        </section>
      </main>

      <footer>
        Dubbi o domande sull'iscrizione? Scrivi in privato agli amministratori del
        gruppo.
      </footer>
    </div>
  );
}
