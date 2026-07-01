import { useState, useEffect } from "react";
import { useReveal } from "./useReveal";
import {
  Facial,
  Hand,
  Eye,
  Hair,
  Leaf,
  Stone,
  Phone,
  Pin,
  Clock,
  Instagram,
  Whatsapp,
  Facebook,
  TikTok,
  ArrowUR,
  Sparkle,
} from "./Icons";

const PHONE = "936928052";
const WA =
  "https://wa.me/51936928052?text=Hola%20Mafille%20Belleza%2C%20quisiera%20reservar%20una%20cita%20%E2%9C%A8";
const ADDRESS = "Recuay 424, Urb. Los Pinares, Los Olivos — Lima, Perú";
const MAP_Q = encodeURIComponent("Recuay 424, Urb. Los Pinares, Los Olivos, Lima, Perú");
// Coordenadas aproximadas (calle Recuay, Los Olivos) — ajustar al punto exacto del local.
const MAP_LAT = -11.9930077;
const MAP_LON = -77.0777497;
const MAP_EMBED = `https://www.openstreetmap.org/export/embed.html?bbox=${MAP_LON - 0.008}%2C${MAP_LAT - 0.005}%2C${MAP_LON + 0.008}%2C${MAP_LAT + 0.005}&layer=mapnik&marker=${MAP_LAT}%2C${MAP_LON}`;
const MAP_DIR = `https://www.google.com/maps/dir/?api=1&destination=${MAP_Q}`;

// Imágenes (stock profesional Unsplash — reemplazar por fotos reales del salón).
const img = (id, w = 1100) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=80`;

const IMG = {
  masajePrincipal: "photo-1544161515-4ab6ce6db874",
  piedras: "photo-1600334089648-b0d9d3028eb2",
  masajeEspalda: "photo-1519823551278-64ac92734fb1",
  masajeMujer: "photo-1591343395082-e120087004b4",
  facial: "photo-1570172619644-dfd03ed5d881",
  manos: "photo-1540555700478-4be289fbecef",
  piel: "photo-1487412947147-5cebf100ffc2",
  spa: "photo-1512290923902-8a9f81dc236c",
};

const MASOTERAPIA = [
  "Masaje relajante",
  "Masaje descontracturante",
  "Masaje con piedras volcánicas",
  "Drenaje linfático",
  "Masaje facial holístico",
  "Masaje con rosas",
  "Masaje con hierbas",
  "Masaje con aceite",
  "Masaje con ventosas",
  "Manipulación, masaje de manos y brazos",
];

const GALLERY = [
  { id: IMG.masajeMujer, t: "Masoterapia", s: "Relaja cuerpo y mente", span: "md:col-span-2 md:row-span-2" },
  { id: IMG.facial, t: "Cuidado facial", s: "Luz y equilibrio", span: "" },
  { id: IMG.manos, t: "Manos & pies", s: "Acabado impecable", span: "" },
  { id: IMG.piedras, t: "Piedras volcánicas", s: "Calor mineral", span: "md:col-span-2" },
];

const NAV = [
  { label: "Masoterapia", href: "#masoterapia" },
  { label: "Servicios", href: "#servicios" },
  { label: "Filosofía", href: "#filosofia" },
  { label: "Contacto", href: "#contacto" },
];

const SERVICES = [
  {
    icon: Facial,
    tag: "Rostro",
    title: "Cuidado facial",
    desc: "Rituales que devuelven luz y equilibrio a la piel.",
    items: [
      "Limpieza facial profunda",
      "Mascarilla personalizada",
      "Masaje con piedras volcánicas",
    ],
    span: "lg:col-span-7",
  },
  {
    icon: Eye,
    tag: "Mirada",
    title: "Cejas & pestañas",
    desc: "Realza tu mirada con técnica milimétrica.",
    items: [
      "Laminado y diseño de cejas",
      "Lifting de pestañas con o sin tinte",
      "Extensiones clásicas, híbridas y volumen",
    ],
    span: "lg:col-span-5",
  },
  {
    icon: Hand,
    tag: "Manos & pies",
    title: "Manicure, pedicure & podología",
    desc: "Cuidado, salud y acabado impecable de pies a manos.",
    items: ["Manicure & pedicure", "Podología clínica", "Esmaltado de larga duración"],
    span: "lg:col-span-5",
  },
  {
    icon: Hair,
    tag: "Cabello",
    title: "Tratamientos capilares",
    desc: "Recupera fuerza, brillo y movimiento natural.",
    items: ["Botox capilar", "Alisado", "Tratamiento reconstructivo"],
    span: "lg:col-span-7",
  },
];

const STEPS = [
  { n: "01", t: "Diagnóstico", d: "Escuchamos tu piel, tu cabello y tu momento antes de empezar." },
  { n: "02", t: "Ritual a medida", d: "Diseñamos un protocolo único combinando técnica y descanso." },
  { n: "03", t: "Equilibrio", d: "Sales renovada: belleza por fuera, calma por dentro." },
];

function Eyebrow({ children }) {
  return (
    <span className="inline-flex items-center gap-2 rounded-full bg-mauve/8 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.22em] text-mauve ring-1 ring-mauve/15">
      <Sparkle className="h-3 w-3" />
      {children}
    </span>
  );
}

function CTA({ href, children, dark = false, className = "" }) {
  return (
    <a
      href={href}
      target={href?.startsWith("http") ? "_blank" : undefined}
      rel={href?.startsWith("http") ? "noreferrer" : undefined}
      className={`group inline-flex items-center gap-3 rounded-full pl-6 pr-2 py-2 text-sm font-semibold tracking-tight transition-[transform,background-color,color] duration-200 ease-[cubic-bezier(0.32,0.72,0,1)] active:scale-[0.97] ${
        dark
          ? "bg-ink text-ivory hover:bg-mauve"
          : "bg-rosedeep text-ink hover:bg-mauve hover:text-ivory"
      } ${className}`}
    >
      {children}
      <span
        className={`flex h-9 w-9 items-center justify-center rounded-full transition-transform duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:scale-105 ${
          dark ? "bg-ivory/15" : "bg-ink/10"
        }`}
      >
        <ArrowUR className="h-4 w-4" />
      </span>
    </a>
  );
}

function Nav() {
  const [open, setOpen] = useState(false);
  return (
    <>
      <header className="fixed inset-x-0 top-0 z-40 flex justify-center px-4">
        <nav className="mt-5 flex w-full max-w-3xl items-center justify-between gap-4 rounded-full border border-ink/8 bg-ivory/70 px-3 py-2 pl-6 shadow-[0_8px_40px_-12px_rgba(26,20,22,0.18)] backdrop-blur-xl">
          <a href="#top" className="flex items-baseline gap-1.5">
            <span className="font-display text-2xl font-semibold leading-none tracking-tight text-ink">
              Mafille
            </span>
            <span className="text-[10px] uppercase tracking-[0.25em] text-mauve">Belleza</span>
          </a>

          <div className="hidden items-center gap-7 md:flex">
            {NAV.map((n) => (
              <a
                key={n.href}
                href={n.href}
                className="text-sm font-medium text-soft transition-colors duration-300 hover:text-ink"
              >
                {n.label}
              </a>
            ))}
          </div>

          <div className="hidden md:block">
            <CTA href={WA} dark>
              Reservar
            </CTA>
          </div>

          <button
            aria-label="Menú"
            onClick={() => setOpen((v) => !v)}
            className="relative flex h-10 w-10 flex-col items-center justify-center gap-[5px] rounded-full bg-ink/5 md:hidden"
          >
            <span
              className={`block h-px w-5 bg-ink transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] ${
                open ? "translate-y-[3px] rotate-45" : ""
              }`}
            />
            <span
              className={`block h-px w-5 bg-ink transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] ${
                open ? "-translate-y-[3px] -rotate-45" : ""
              }`}
            />
          </button>
        </nav>
      </header>

      {/* Overlay móvil */}
      <div
        className={`fixed inset-0 z-30 flex flex-col items-center justify-center gap-2 bg-ivory/85 backdrop-blur-2xl transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] md:hidden ${
          open ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"
        }`}
      >
        {NAV.map((n, i) => (
          <a
            key={n.href}
            href={n.href}
            onClick={() => setOpen(false)}
            style={{ transitionDelay: open ? `${120 + i * 60}ms` : "0ms" }}
            className={`font-display text-4xl font-medium text-ink transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] ${
              open ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
            }`}
          >
            {n.label}
          </a>
        ))}
        <div
          style={{ transitionDelay: open ? "360ms" : "0ms" }}
          className={`mt-6 transition-all duration-500 ${open ? "opacity-100" : "opacity-0"}`}
        >
          <CTA href={WA} dark>
            Reservar cita
          </CTA>
        </div>
      </div>
    </>
  );
}

function Hero() {
  return (
    <section id="top" className="relative overflow-hidden px-4 pt-36 pb-20 md:pt-44 md:pb-28">
      {/* Orbes ambientales */}
      <div className="pointer-events-none absolute -left-32 top-10 h-96 w-96 rounded-full bg-rose/40 blur-[120px]" />
      <div className="pointer-events-none absolute -right-24 top-40 h-80 w-80 rounded-full bg-blush blur-[100px]" />

      <div className="relative mx-auto grid max-w-6xl items-end gap-12 lg:grid-cols-12">
        <div className="lg:col-span-7">
          <div className="reveal">
            <Eyebrow>Salón de belleza · Centro holístico</Eyebrow>
          </div>
          <h1 className="reveal reveal-d1 mt-6 font-display text-[3.4rem] font-medium leading-[0.95] tracking-tight text-ink sm:text-7xl lg:text-[5.5rem]">
            Belleza que
            <br />
            <span className="italic text-mauve">también</span> sana.
          </h1>
          <p className="reveal reveal-d2 mt-7 max-w-md text-lg leading-relaxed text-soft">
            En <strong className="font-semibold text-ink">Mafille Belleza</strong> unimos
            estética y bienestar holístico. Rituales de rostro, manos, mirada y cabello pensados
            para que te veas y te sientas en equilibrio.
          </p>
          <div className="reveal reveal-d3 mt-9 flex flex-wrap items-center gap-4">
            <CTA href={WA} dark>
              Reservar por WhatsApp
            </CTA>
            <a
              href="#servicios"
              className="text-sm font-semibold tracking-tight text-ink underline-offset-4 transition-colors hover:text-mauve hover:underline"
            >
              Ver servicios
            </a>
          </div>
          <div className="reveal reveal-d4 mt-10 flex items-center gap-3 text-xs text-soft">
            <Pin className="h-4 w-4 text-mauve" />
            <span>Los Olivos, Lima — Perú</span>
          </div>
        </div>

        {/* Tarjeta visual con doble-bisel + foto */}
        <div className="reveal reveal-d2 lg:col-span-5">
          <div className="rounded-[2.2rem] bg-white/50 p-2 ring-1 ring-ink/5 backdrop-blur-sm">
            <div className="relative overflow-hidden rounded-[calc(2.2rem-0.5rem)] shadow-[inset_0_1px_1px_rgba(255,255,255,0.4)]">
              <img
                src={img(IMG.masajePrincipal, 900)}
                alt="Sesión de masoterapia en Mafille Belleza"
                className="h-[460px] w-full object-cover"
                loading="eager"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink/85 via-ink/20 to-transparent" />
              <div className="absolute inset-0 flex flex-col justify-between p-7">
                <div className="flex items-center justify-between">
                  <span className="rounded-full bg-ivory/15 px-3 py-1 text-[10px] uppercase tracking-[0.25em] text-ivory backdrop-blur-sm">
                    Especialidad de la casa
                  </span>
                  <Leaf className="h-5 w-5 text-ivory/80" />
                </div>
                <div>
                  <p className="font-display text-3xl font-medium leading-tight text-ivory">
                    Masoterapia & piedras volcánicas
                  </p>
                  <div className="mt-5 grid grid-cols-3 gap-2.5">
                    {[
                      { k: "+1.2k", v: "clientas felices" },
                      { k: "12", v: "especialidades" },
                      { k: "100%", v: "personalizado" },
                    ].map((s) => (
                      <div
                        key={s.v}
                        className="rounded-2xl bg-ivory/10 px-2 py-3 text-center ring-1 ring-ivory/15 backdrop-blur-sm"
                      >
                        <div className="font-display text-2xl font-semibold text-ivory">
                          {s.k}
                        </div>
                        <div className="mt-0.5 text-[9px] leading-tight text-ivory/70">
                          {s.v}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Marquee() {
  const words = [
    "Masoterapia",
    "Limpieza facial",
    "Laminado de cejas",
    "Lifting de pestañas",
    "Podología",
    "Botox capilar",
    "Piedras volcánicas",
    "Manicure & pedicure",
    "Extensiones de volumen",
  ];
  const loop = [...words, ...words];
  return (
    <div className="border-y border-ink/8 bg-blush/40 py-5">
      <div className="relative flex overflow-hidden">
        <div className="marquee-track flex shrink-0 items-center gap-10 whitespace-nowrap pr-10">
          {loop.map((w, i) => (
            <span
              key={i}
              className="flex items-center gap-10 font-display text-2xl italic text-mauve"
            >
              {w}
              <Sparkle className="h-4 w-4 text-rosedeep" />
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

function Masoterapia() {
  return (
    <section id="masoterapia" className="relative overflow-hidden px-4 py-24 md:py-36">
      <div className="pointer-events-none absolute -right-32 top-20 h-96 w-96 rounded-full bg-rose/30 blur-[120px]" />
      <div className="relative mx-auto grid max-w-6xl items-center gap-12 lg:grid-cols-2">
        {/* Imágenes superpuestas (Z-Axis) */}
        <div className="reveal relative">
          <div className="rounded-[2.2rem] bg-white/50 p-2 ring-1 ring-ink/5">
            <img
              src={img(IMG.masajeEspalda, 900)}
              alt="Masaje descontracturante"
              className="h-[440px] w-full rounded-[calc(2.2rem-0.5rem)] object-cover md:h-[520px]"
              loading="lazy"
            />
          </div>
          <div className="absolute -bottom-8 -left-6 hidden w-44 rounded-[1.6rem] bg-white/60 p-2 ring-1 ring-ink/5 backdrop-blur-sm sm:block">
            <img
              src={img(IMG.piedras, 400)}
              alt="Masaje con piedras volcánicas"
              className="h-32 w-full rounded-[calc(1.6rem-0.5rem)] object-cover"
              loading="lazy"
            />
            <div className="px-2 py-2 text-center">
              <div className="font-display text-lg font-semibold text-ink">Piedras volcánicas</div>
              <div className="text-[10px] text-soft">Calor que libera tensión</div>
            </div>
          </div>
        </div>

        <div className="reveal">
          <Eyebrow>Nuestra especialidad</Eyebrow>
          <h2 className="mt-5 font-display text-5xl font-medium leading-[1.04] tracking-tight text-ink md:text-6xl">
            Masoterapia que
            <br />
            <span className="italic text-mauve">libera</span> y reconecta.
          </h2>
          <p className="mt-6 max-w-md text-lg leading-relaxed text-soft">
            El corazón de Mafille. Combinamos técnica terapéutica y un enfoque holístico para
            aliviar contracturas, activar la circulación y devolverte calma profunda. Cada masaje
            se adapta a tu cuerpo y a tu momento.
          </p>
          <ul className="mt-8 grid gap-2.5 sm:grid-cols-2">
            {MASOTERAPIA.map((m, i) => (
              <li
                key={m}
                style={{ transitionDelay: `${i * 45}ms` }}
                className="reveal flex items-center gap-3 rounded-2xl bg-white/60 px-4 py-3 text-sm font-medium text-ink ring-1 ring-ink/8"
              >
                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-blush text-mauve">
                  <Stone className="h-4 w-4" />
                </span>
                {m}
              </li>
            ))}
          </ul>
          <div className="mt-9">
            <CTA href={WA} dark>
              Reservar masaje
            </CTA>
          </div>
        </div>
      </div>
    </section>
  );
}

function Gallery() {
  return (
    <section className="px-4 py-12 md:py-20">
      <div className="mx-auto max-w-6xl">
        <div className="reveal mb-10 flex flex-col items-start justify-between gap-5 md:flex-row md:items-end">
          <div>
            <Eyebrow>Galería</Eyebrow>
            <h2 className="mt-5 font-display text-4xl font-medium leading-tight tracking-tight text-ink md:text-5xl">
              Un vistazo a nuestros tratamientos.
            </h2>
          </div>
          <p className="max-w-xs text-sm text-soft">
            Espacios pensados para tu descanso y resultados que se notan desde la primera sesión.
          </p>
        </div>

        <div className="grid auto-rows-[200px] grid-cols-2 gap-4 md:grid-cols-4 md:auto-rows-[230px]">
          {GALLERY.map((g) => (
            <figure
              key={g.t}
              className={`reveal group relative overflow-hidden rounded-[1.6rem] ring-1 ring-ink/5 ${g.span}`}
            >
              <img
                src={img(g.id, 900)}
                alt={g.t}
                loading="lazy"
                className="h-full w-full object-cover transition-transform duration-[400ms] ease-out group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink/75 via-ink/10 to-transparent" />
              <figcaption className="absolute inset-x-0 bottom-0 p-5">
                <div className="font-display text-xl font-medium text-ivory">{g.t}</div>
                <div className="text-xs text-ivory/70">{g.s}</div>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}

function Services() {
  return (
    <section id="servicios" className="px-4 py-24 md:py-36">
      <div className="mx-auto max-w-6xl">
        <div className="reveal max-w-2xl">
          <Eyebrow>Nuestros servicios</Eyebrow>
          <h2 className="mt-5 font-display text-5xl font-medium leading-tight tracking-tight text-ink md:text-6xl">
            Cuatro mundos para
            <br />
            cuidarte por completo.
          </h2>
        </div>

        <div className="mt-14 grid gap-5 lg:grid-cols-12">
          {SERVICES.map((s) => {
            const Icon = s.icon;
            return (
              <article
                key={s.title}
                className={`reveal group rounded-[2rem] bg-white/60 p-2 ring-1 ring-ink/5 transition-[transform,box-shadow] duration-[250ms] ease-out hover:-translate-y-1 hover:ring-mauve/25 ${s.span}`}
              >
                <div className="flex h-full flex-col rounded-[calc(2rem-0.5rem)] bg-ivory p-7 shadow-[inset_0_1px_1px_rgba(255,255,255,0.6)] md:p-9">
                  <div className="flex items-center justify-between">
                    <span className="flex h-12 w-12 items-center justify-center rounded-full bg-blush text-mauve transition-colors duration-500 group-hover:bg-rosedeep group-hover:text-ink">
                      <Icon className="h-6 w-6" />
                    </span>
                    <span className="text-[10px] uppercase tracking-[0.22em] text-soft">
                      {s.tag}
                    </span>
                  </div>
                  <h3 className="mt-7 font-display text-3xl font-medium tracking-tight text-ink">
                    {s.title}
                  </h3>
                  <p className="mt-2 text-sm text-soft">{s.desc}</p>
                  <ul className="mt-6 flex flex-col gap-2.5 border-t border-ink/8 pt-6">
                    {s.items.map((it) => (
                      <li key={it} className="flex items-center gap-3 text-sm text-ink">
                        <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-rosedeep" />
                        {it}
                      </li>
                    ))}
                  </ul>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function Philosophy() {
  return (
    <section id="filosofia" className="relative overflow-hidden px-4 py-24 md:py-36">
      <div className="pointer-events-none absolute left-1/2 top-0 h-72 w-72 -translate-x-1/2 rounded-full bg-rose/30 blur-[110px]" />
      <div className="relative mx-auto grid max-w-6xl items-center gap-14 lg:grid-cols-2">
        <div className="reveal">
          <Eyebrow>Filosofía holística</Eyebrow>
          <h2 className="mt-5 font-display text-5xl font-medium leading-[1.05] tracking-tight text-ink md:text-6xl">
            No es solo verse bien.
            <br />
            Es <span className="italic text-mauve">sentirse</span> bien.
          </h2>
          <p className="mt-6 max-w-md text-lg leading-relaxed text-soft">
            Creemos que la belleza nace del equilibrio. Por eso cada tratamiento es también un
            momento de pausa: aromas, calma y manos expertas que cuidan tu piel y tu energía.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            {[
              { Icon: Stone, t: "Piedras volcánicas" },
              { Icon: Leaf, t: "Productos conscientes" },
              { Icon: Sparkle, t: "Atención 1 a 1" },
            ].map(({ Icon, t }) => (
              <span
                key={t}
                className="inline-flex items-center gap-2 rounded-full bg-white/70 px-4 py-2 text-sm font-medium text-ink ring-1 ring-ink/8"
              >
                <Icon className="h-4 w-4 text-mauve" />
                {t}
              </span>
            ))}
          </div>
        </div>

        <div id="experiencia" className="reveal flex flex-col gap-4">
          {STEPS.map((st) => (
            <div
              key={st.n}
              className="group rounded-[1.6rem] bg-white/60 p-2 ring-1 ring-ink/5 transition-transform duration-200 ease-out hover:-translate-y-0.5"
            >
              <div className="flex w-full items-start gap-5 rounded-[1.3rem] bg-ivory p-6 shadow-[inset_0_1px_1px_rgba(255,255,255,0.6)]">
                <span className="font-display text-3xl font-semibold text-rosedeep">{st.n}</span>
                <div>
                  <h3 className="font-display text-2xl font-medium text-ink">{st.t}</h3>
                  <p className="mt-1 text-sm text-soft">{st.d}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Contact() {
  return (
    <section id="contacto" className="px-4 pb-24 md:pb-32">
      <div className="mx-auto max-w-6xl">
        <div className="reveal rounded-[2.4rem] bg-ink p-2 ring-1 ring-ink/5">
          <div className="relative overflow-hidden rounded-[calc(2.4rem-0.5rem)] bg-gradient-to-br from-ink via-ink to-mauve/40 px-7 py-14 md:px-16 md:py-20">
            <div className="pointer-events-none absolute -right-20 -top-20 h-72 w-72 rounded-full bg-rosedeep/30 blur-[100px]" />
            <div className="relative grid gap-12 lg:grid-cols-2">
              <div>
                <span className="inline-flex items-center gap-2 rounded-full bg-ivory/10 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.22em] text-rose ring-1 ring-ivory/15">
                  <Sparkle className="h-3 w-3" />
                  Reserva tu cita
                </span>
                <h2 className="mt-6 font-display text-5xl font-medium leading-[1.02] tracking-tight text-ivory md:text-6xl">
                  Tu momento de
                  <br />
                  belleza te espera.
                </h2>
                <p className="mt-6 max-w-sm text-base leading-relaxed text-ivory/70">
                  Escríbenos por WhatsApp y agenda en minutos. Te asesoramos para elegir el
                  ritual perfecto para ti.
                </p>
                <div className="mt-9">
                  <CTA href={WA}>Reservar por WhatsApp</CTA>
                </div>
              </div>

              <div className="flex flex-col gap-3">
                {[
                  { Icon: Pin, t: "Dónde estamos", v: ADDRESS, dir: MAP_DIR },
                  { Icon: Phone, t: "Llámanos o escríbenos", v: PHONE, href: `tel:+51${PHONE}` },
                  {
                    Icon: Clock,
                    t: "Horario de atención",
                    v: "Lun a Sáb · 9:00 a 20:00 h",
                  },
                ].map(({ Icon, t, v, href, dir }) => (
                  <div
                    key={t}
                    className="flex items-start gap-4 rounded-2xl bg-ivory/5 px-5 py-5 ring-1 ring-ivory/10"
                  >
                    <span className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-ivory/10 text-rose">
                      <Icon className="h-5 w-5" />
                    </span>
                    <div>
                      <div className="text-[10px] uppercase tracking-[0.2em] text-ivory/50">
                        {t}
                      </div>
                      {href ? (
                        <a
                          href={href}
                          className="mt-1 block text-base font-medium text-ivory transition-colors hover:text-rose"
                        >
                          {v}
                        </a>
                      ) : (
                        <div className="mt-1 text-base font-medium leading-snug text-ivory">
                          {v}
                        </div>
                      )}
                      {dir && (
                        <a
                          href={dir}
                          target="_blank"
                          rel="noreferrer"
                          className="group mt-2 inline-flex items-center gap-1.5 text-xs font-semibold text-rose transition-colors hover:text-ivory"
                        >
                          Cómo llegar
                          <ArrowUR className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                        </a>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Mapa embebido */}
            <div className="relative mt-8 overflow-hidden rounded-[1.4rem] ring-1 ring-ivory/15">
              <iframe
                title="Ubicación de Mafille Belleza en Los Olivos, Lima"
                src={MAP_EMBED}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="h-64 w-full md:h-72"
                style={{ border: 0 }}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer id="site-footer" className="border-t border-ink/8 px-4 py-12">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-6 md:flex-row">
        <a href="#top" className="flex items-baseline gap-1.5">
          <span className="font-display text-2xl font-semibold tracking-tight text-ink">
            Mafille
          </span>
          <span className="text-[10px] uppercase tracking-[0.25em] text-mauve">Belleza</span>
        </a>
        <p className="text-center text-xs text-soft">
          © {new Date().getFullYear()} Mafille Belleza · Salón & Centro Holístico · Los Olivos, Lima
        </p>
        <div className="flex items-center gap-3">
          <a
            href={WA}
            target="_blank"
            rel="noreferrer"
            aria-label="WhatsApp"
            className="flex h-10 w-10 items-center justify-center rounded-full bg-ink/5 text-ink transition-all duration-300 hover:bg-rosedeep hover:text-ivory"
          >
            <Whatsapp className="h-5 w-5" />
          </a>
          <a
            href="https://www.instagram.com/mafille.belleza/"
            target="_blank"
            rel="noreferrer"
            aria-label="Instagram"
            className="flex h-10 w-10 items-center justify-center rounded-full bg-ink/5 text-ink transition-all duration-300 hover:bg-rosedeep hover:text-ivory"
          >
            <Instagram className="h-5 w-5" />
          </a>
          <a
            href="https://www.facebook.com/profile.php?id=100064113102067"
            target="_blank"
            rel="noreferrer"
            aria-label="Facebook"
            className="flex h-10 w-10 items-center justify-center rounded-full bg-ink/5 text-ink transition-all duration-300 hover:bg-rosedeep hover:text-ivory"
          >
            <Facebook className="h-5 w-5" />
          </a>
          <a
            href="https://www.tiktok.com/@mafille.belleza"
            target="_blank"
            rel="noreferrer"
            aria-label="TikTok"
            className="flex h-10 w-10 items-center justify-center rounded-full bg-ink/5 text-ink transition-all duration-300 hover:bg-rosedeep hover:text-ivory"
          >
            <TikTok className="h-5 w-5" />
          </a>
        </div>
      </div>
    </footer>
  );
}

function FloatingWA() {
  const [hidden, setHidden] = useState(false);
  useEffect(() => {
    const footer = document.getElementById("site-footer");
    if (!footer || !("IntersectionObserver" in window)) return;
    const io = new IntersectionObserver(([e]) => setHidden(e.isIntersecting), {
      threshold: 0.15,
    });
    io.observe(footer);
    return () => io.disconnect();
  }, []);
  return (
    <a
      href={WA}
      target="_blank"
      rel="noreferrer"
      aria-label="Reservar por WhatsApp"
      tabIndex={hidden ? -1 : 0}
      aria-hidden={hidden}
      className={`group fixed bottom-5 right-5 z-40 flex items-center gap-3 rounded-full bg-ink py-2.5 pl-2.5 pr-3 text-ivory shadow-[0_12px_40px_-8px_rgba(26,20,22,0.5)] transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] hover:bg-mauve active:scale-[0.97] sm:pr-5 ${
        hidden ? "pointer-events-none translate-y-24 opacity-0" : "opacity-100"
      }`}
    >
      <span className="relative flex h-11 w-11 items-center justify-center rounded-full bg-ivory/15">
        <span className="absolute inset-0 rounded-full bg-rosedeep/40 motion-safe:animate-ping" />
        <Whatsapp className="relative h-6 w-6" />
      </span>
      <span className="hidden text-sm font-semibold tracking-tight sm:block">
        Reservar
      </span>
    </a>
  );
}

export default function App() {
  useReveal();
  return (
    <div className="grain min-h-[100dvh] bg-ivory">
      <FloatingWA />
      <Nav />
      <main>
        <Hero />
        <Marquee />
        <Masoterapia />
        <Services />
        <Gallery />
        <Philosophy />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
