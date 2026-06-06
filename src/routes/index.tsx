import { createFileRoute } from "@tanstack/react-router";
import { useState, useEffect, useMemo } from "react";
import {
  Phone, Clock, Truck, MapPin, ChevronRight, Sparkles, ShieldCheck,
  Wrench, Lightbulb, Droplet, Hammer, Zap, ArrowRight, MessageCircle,
  Star, Package, Award, TrendingUp, Search, X,
} from "lucide-react";
import ALL_PRODUCTS from "@/lib/products.json";


export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Comercial Los Todos C.A. — Ferretería e Insumos de Calidad" },
      { name: "description", content: "Herramientas, iluminación, plomería y más. Comercial Los Todos: marcas propias XCORT, HERRA-VEN, ILUM-VEN, SALUD-VEN y TODO-VEN." },
      { property: "og:title", content: "Comercial Los Todos C.A." },
      { property: "og:description", content: "Productos de calidad para tu hogar, obra o negocio ferretero." },
      { property: "og:image", content: "https://comlostodos.com/img/01.webp" },
    ],
  }),
  component: Index,
});

const PHONES = [
  { num: "(0424) 4345091", raw: "584244345091" },
  { num: "(0424) 4503375", raw: "584244503375" },
  { num: "(0424) 4248914", raw: "584244248914" },
];

const waLink = (raw: string) =>
  `https://api.whatsapp.com/send/?phone=${raw}&text=${encodeURIComponent(
    "Hola *Comercial LOS TODOS, C.A*. Necesito más información."
  )}&type=phone_number&app_absent=0`;

const BRANDS = [
  {
    id: "xcort", name: "XCORT", tag: "Discover Your Power",
    icon: Wrench, color: "from-yellow-500/20 to-green-700/20",
    desc: "Herramientas eléctricas, inalámbricas, manuales y consumibles para carpintería, herrería, jardinería, reparación y bricolaje.",
    img: "https://comlostodos.com/img/01.webp",
    logo: "https://comlostodos.com/img/XCORT.png",
  },
  {
    id: "herraven", name: "HERRA-VEN", tag: "Calidad Profesional",
    icon: Hammer, color: "from-green-600/20 to-emerald-500/20",
    desc: "Línea completa de herramientas y materiales para el profesional ferretero. Hasta 20% de descuento en mercancía seleccionada.",
    img: "https://comlostodos.com/img/02.webp",
    logo: "https://comlostodos.com/img/Logo-H-1024x529.png",
  },
  {
    id: "ilumven", name: "ILUM-VEN", tag: "Luz que Inspira",
    icon: Lightbulb, color: "from-amber-400/20 to-green-600/20",
    desc: "Soluciones lumínicas: lámparas colgantes, paneles LED y sistemas decorativos para interiores y exteriores.",
    img: "https://comlostodos.com/img/04.webp",
    logo: "https://comlostodos.com/img/Logo-I-1024x529.png",
  },
  {
    id: "saludven", name: "SALUD-VEN PF", tag: "Bienestar en Casa",
    icon: Droplet, color: "from-cyan-500/20 to-green-600/20",
    desc: "Equipos de limpieza, filtros purificadores, griferías, fregaderos y lavamanos. Salud y confort para tu hogar.",
    img: "https://comlostodos.com/img/03.webp",
    logo: "https://comlostodos.com/img/Logo-S-1024x529.png",
  },
  {
    id: "todoven", name: "TODO-VEN", tag: "Lujo y Elegancia",
    icon: Sparkles, color: "from-yellow-600/20 to-green-700/20",
    desc: "Línea premium de griferías y duchas con acabados cromado, satinado, gunmetal y dorado.",
    img: "https://comlostodos.com/img/05.webp",
    logo: "https://comlostodos.com/img/Logo-T-480x480.png",
  },
  {
    id: "pvc", name: "PVC", tag: "Tuberías y Conexiones",
    icon: Zap, color: "from-emerald-500/20 to-green-700/20",
    desc: "Sistemas de tubería PPR, PVC, accesorios y conexiones de la mejor calidad para tus proyectos.",
    img: "https://comlostodos.com/img/06.webp",
    logo: "https://comlostodos.com/img/Logo-Los-Todos.png",
  },
];


const PRODUCTS = [
  { code: "HR-M5613", name: "Persiana Tipo Cebra Gris 180x180cm", img: "https://comlostodos.com/catalogo/upload/main/image_3887.png" },
  { code: "GB-422", name: "Desagüe Lavamanos Sin Rebosadero", img: "https://comlostodos.com/catalogo/upload/main/image_2095.png" },
  { code: "TDV-232", name: "Tee PPR Rosca NPT Macho Ø32mm 3/4″", img: "https://comlostodos.com/catalogo/upload/main/image_4423.png" },
  { code: "CART-3", name: "Cartel Rectangular 4 Cabezales", img: "https://comlostodos.com/catalogo/upload/main/image_3584.png" },
  { code: "EX-ILUMVEN-4", name: "Exhibidor ILUM-VEN Lámparas", img: "https://comlostodos.com/catalogo/upload/main/image_3574.png" },
  { code: "EXXCORT-1", name: "Exhibidor XCORT Modelo Grande", img: "https://comlostodos.com/catalogo/upload/main/image_3562.png" },
];

const STATS = [
  { icon: Package, value: "5000+", label: "Productos" },
  { icon: Award, value: "6", label: "Marcas Propias" },
  { icon: TrendingUp, value: "Nacional", label: "Cobertura" },
  { icon: Star, value: "20+", label: "Años de Trayectoria" },
];

type Product = { code: string; name: string; img: string };
const CATALOG = ALL_PRODUCTS as Product[];

function Index() {
  const [activeBrand, setActiveBrand] = useState(BRANDS[0].id);
  const [scrolled, setScrolled] = useState(false);
  const [query, setQuery] = useState("");
  const [visibleCount, setVisibleCount] = useState(12);
  const brand = BRANDS.find((b) => b.id === activeBrand)!;

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return CATALOG;
    return CATALOG.filter(
      (p) => p.name.toLowerCase().includes(q) || p.code.toLowerCase().includes(q),
    );
  }, [query]);

  useEffect(() => { setVisibleCount(12); }, [query]);


  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css2?family=Poppins:wght@500;600;700;800&family=Inter:wght@400;500;600&display=swap"
      />

      {/* NAV */}
      <nav className={`fixed top-0 inset-x-0 z-50 transition-all ${scrolled ? "bg-background/90 backdrop-blur-md shadow-card" : "bg-transparent"}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <a href="#top" className="flex items-center gap-2 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-hero flex items-center justify-center shadow-glow">
              <Wrench className="w-5 h-5 text-primary-foreground" />
            </div>
            <div className="leading-tight">
              <div className="font-display font-bold text-sm text-primary">COMERCIAL</div>
              <div className="font-display font-extrabold text-base text-accent -mt-1">LOS TODOS</div>
            </div>
          </a>
          <div className="hidden md:flex items-center gap-1">
            {["Productos", "Marcas", "Exhibidores", "Blog", "Contacto"].map((l) => (
              <a key={l} href={`#${l.toLowerCase()}`}
                className="px-4 py-2 text-sm font-medium text-foreground/70 hover:text-primary hover:bg-secondary rounded-lg transition">
                {l}
              </a>
            ))}
          </div>
          <a href={waLink(PHONES[0].raw)} target="_blank" rel="noopener"
            className="hidden sm:inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-hero text-primary-foreground text-sm font-semibold shadow-elegant hover:scale-105 transition">
            <MessageCircle className="w-4 h-4" /> Cotizar
          </a>
        </div>
      </nav>

      {/* HERO */}
      <section id="top" className="relative pt-24 pb-20 overflow-hidden bg-gradient-hero">
        <div className="absolute inset-0 opacity-20" style={{
          backgroundImage: "radial-gradient(circle at 20% 20%, white 1px, transparent 1px), radial-gradient(circle at 80% 60%, white 1px, transparent 1px)",
          backgroundSize: "40px 40px, 60px 60px",
        }} />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 grid lg:grid-cols-2 gap-12 items-center">
          <div className="text-primary-foreground animate-fade-up">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur border border-white/20 text-xs font-medium mb-6">
              <Sparkles className="w-3 h-3" /> J-40498513-1 · Productos de Calidad
            </div>
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-extrabold leading-[0.95] mb-6">
              Todo lo que <br />
              <span className="text-gradient">necesitas</span>, <br />
              en un solo lugar.
            </h1>
            <p className="text-lg text-primary-foreground/80 max-w-md mb-8">
              Ferretería, iluminación, plomería y herramientas profesionales. Pasión, dedicación y servicio desde hace más de dos décadas.
            </p>
            <div className="flex flex-wrap gap-3">
              <a href="#productos"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white text-primary font-semibold shadow-elegant hover:scale-105 transition">
                Ver Productos <ArrowRight className="w-4 h-4" />
              </a>
              <a href={waLink(PHONES[0].raw)} target="_blank" rel="noopener"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full border-2 border-white/30 text-primary-foreground font-semibold hover:bg-white/10 transition">
                <MessageCircle className="w-4 h-4" /> Hablar con un asesor
              </a>
            </div>
          </div>

          <div className="relative animate-fade-up" style={{ animationDelay: "0.2s" }}>
            <div className="relative aspect-square rounded-3xl overflow-hidden shadow-elegant animate-float">
              <img src={brand.img} alt={brand.name} className="w-full h-full object-cover transition-all duration-700" />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/60 to-transparent" />
              <div className="absolute bottom-6 left-6 right-6 text-primary-foreground">
                <div className="text-xs uppercase tracking-widest opacity-80">{brand.tag}</div>
                <div className="text-3xl font-extrabold">{brand.name}</div>
              </div>
            </div>
            <div className="absolute -top-4 -right-4 px-4 py-2 rounded-full bg-accent text-accent-foreground text-sm font-bold shadow-glow rotate-6">
              ⚡ Hasta 20% OFF
            </div>
          </div>
        </div>
      </section>

      {/* MARQUEE STATS */}
      <section className="bg-foreground py-6 overflow-hidden">
        <div className="flex animate-marquee whitespace-nowrap">
          {[...STATS, ...STATS, ...STATS].map((s, i) => (
            <div key={i} className="inline-flex items-center gap-3 mx-8 text-primary-foreground/90">
              <s.icon className="w-5 h-5 text-accent" />
              <span className="font-display font-bold text-xl">{s.value}</span>
              <span className="text-sm text-primary-foreground/60">{s.label}</span>
              <span className="ml-8 text-primary-foreground/30">●</span>
            </div>
          ))}
        </div>
      </section>

      {/* BRANDS interactive */}
      <section id="marcas" className="py-20 max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-12">
          <div className="text-sm font-semibold text-accent uppercase tracking-widest mb-2">Nuestras Marcas</div>
          <h2 className="text-4xl sm:text-5xl font-extrabold text-foreground">Calidad que reconoces</h2>
        </div>

        <div className="grid lg:grid-cols-[1fr_2fr] gap-8">
          <div className="flex lg:flex-col gap-2 overflow-x-auto lg:overflow-visible pb-2">
            {BRANDS.map((b) => {
              const Icon = b.icon;
              const active = b.id === activeBrand;
              return (
                <button key={b.id} onClick={() => setActiveBrand(b.id)}
                  className={`flex items-center gap-3 px-5 py-4 rounded-2xl text-left transition-all whitespace-nowrap lg:whitespace-normal flex-shrink-0 ${
                    active ? "bg-gradient-hero text-primary-foreground shadow-elegant scale-[1.02]" : "bg-card hover:bg-secondary text-foreground shadow-card"
                  }`}>
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${active ? "bg-white/20" : "bg-primary/10"}`}>
                    <Icon className={`w-5 h-5 ${active ? "text-primary-foreground" : "text-primary"}`} />
                  </div>
                  <div>
                    <div className="font-display font-bold">{b.name}</div>
                    <div className={`text-xs ${active ? "text-primary-foreground/70" : "text-muted-foreground"}`}>{b.tag}</div>
                  </div>
                </button>
              );
            })}
          </div>

          <div className="relative rounded-3xl overflow-hidden shadow-elegant min-h-[400px] bg-card">
            <img key={brand.id} src={brand.img} alt={brand.name}
              className="absolute inset-0 w-full h-full object-cover animate-fade-up" />
            <div className="absolute inset-0 bg-gradient-to-t from-primary via-primary/60 to-transparent" />
            <div className="relative h-full flex flex-col justify-end p-8 sm:p-10 text-primary-foreground">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/15 backdrop-blur border border-white/20 text-xs font-medium mb-3 w-fit">
                <brand.icon className="w-3 h-3" /> {brand.tag}
              </div>
              <h3 className="text-4xl sm:text-5xl font-extrabold mb-3">{brand.name}</h3>
              <p className="text-primary-foreground/90 max-w-xl mb-5">{brand.desc}</p>
              <a href="https://comlostodos.com/catalogo" target="_blank" rel="noopener"
                className="inline-flex items-center gap-2 text-sm font-semibold w-fit hover:gap-3 transition-all">
                Explorar catálogo <ChevronRight className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* PRODUCTS */}
      <section id="productos" className="py-20 bg-secondary/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex items-end justify-between mb-8 flex-wrap gap-4">
            <div>
              <div className="text-sm font-semibold text-accent uppercase tracking-widest mb-2">Catálogo</div>
              <h2 className="text-4xl sm:text-5xl font-extrabold text-foreground">Buscar productos</h2>
              <p className="text-muted-foreground mt-2">{CATALOG.length}+ productos disponibles · busca por nombre o código</p>
            </div>
            <a href="https://comlostodos.com/catalogo" target="_blank" rel="noopener"
              className="inline-flex items-center gap-2 text-primary font-semibold hover:gap-3 transition-all">
              Ver catálogo completo <ArrowRight className="w-4 h-4" />
            </a>
          </div>

          {/* SEARCH BAR */}
          <div className="relative max-w-2xl mb-10">
            <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground pointer-events-none" />
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Ej: taladro, abrazadera, HR-180…"
              className="w-full pl-14 pr-14 py-4 rounded-full bg-card border-2 border-border focus:border-primary focus:outline-none shadow-card text-foreground placeholder:text-muted-foreground transition"
              aria-label="Buscar productos"
            />
            {query && (
              <button
                onClick={() => setQuery("")}
                className="absolute right-4 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-secondary hover:bg-primary hover:text-primary-foreground flex items-center justify-center transition"
                aria-label="Limpiar búsqueda"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {filtered.length === 0 ? (
            <div className="text-center py-16 bg-card rounded-3xl shadow-card">
              <Package className="w-12 h-12 mx-auto text-muted-foreground mb-3" />
              <p className="text-foreground font-semibold">Sin resultados para "{query}"</p>
              <p className="text-muted-foreground text-sm mt-1">Prueba con otra palabra o consulta por WhatsApp.</p>
            </div>
          ) : (
            <>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
                {filtered.slice(0, visibleCount).map((p, i) => (
                  <article key={p.code}
                    className="group relative bg-gradient-card rounded-2xl p-5 shadow-card hover:shadow-elegant transition-all hover:-translate-y-1 animate-fade-up"
                    style={{ animationDelay: `${(i % 12) * 0.04}s` }}>
                    <div className="aspect-square rounded-xl bg-white flex items-center justify-center mb-4 overflow-hidden">
                      <img src={p.img} alt={p.name} loading="lazy"
                        className="max-w-[85%] max-h-[85%] object-contain group-hover:scale-110 transition-transform duration-500" />
                    </div>
                    <div className="text-xs font-mono text-accent font-bold mb-1">{p.code}</div>
                    <h3 className="font-display font-semibold text-foreground text-sm leading-snug mb-3 line-clamp-2 min-h-[2.5rem]">{p.name}</h3>
                    <a href={waLink(PHONES[0].raw)} target="_blank" rel="noopener"
                      className="inline-flex items-center gap-1 text-sm font-semibold text-primary group-hover:text-accent transition">
                      Consultar <ChevronRight className="w-3 h-3 group-hover:translate-x-1 transition" />
                    </a>
                  </article>
                ))}
              </div>
              {visibleCount < filtered.length && (
                <div className="text-center mt-10">
                  <button
                    onClick={() => setVisibleCount((v) => v + 12)}
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-hero text-primary-foreground font-semibold shadow-elegant hover:scale-105 transition"
                  >
                    Cargar más ({filtered.length - visibleCount} restantes) <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              )}
            </>
          )}
        </div>

      </section>

      {/* HISTORY */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <div className="text-sm font-semibold text-accent uppercase tracking-widest mb-2">Nuestra Historia</div>
            <h2 className="text-4xl sm:text-5xl font-extrabold text-foreground mb-6">
              Pasión, dedicación <br /> y servicio.
            </h2>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              Desde el humilde inicio hasta su posición actual como líder vanguardista en innovación del mercado, esta empresa ha demostrado que, cuando se trabaja con amor por lo que se hace, los resultados son incomparables.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              Hoy en día, nuestro nombre es sinónimo de excelencia en el mundo de la ferretería, brindando una opción factible para todo buen emprendedor ferretero. <strong className="text-foreground">Comercial Los Todos tiene TODO lo que necesitas 🛠️</strong>
            </p>
          </div>
          <div className="space-y-4">
            <div className="relative rounded-3xl overflow-hidden shadow-elegant aspect-[4/3]">
              <img src="https://comlostodos.com/img/exhibidor.png" alt="Exhibidores Comercial Los Todos"
                className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/70 via-transparent to-transparent" />
              <div className="absolute bottom-4 left-5 right-5 text-primary-foreground">
                <div className="text-xs uppercase tracking-widest opacity-90">Nuestra tienda</div>
                <div className="text-xl font-display font-bold">Exhibidores en punto de venta</div>
              </div>
            </div>
            <div className="grid grid-cols-3 gap-3">
              {BRANDS.slice(0, 3).map((b) => (
                <div key={b.id}
                  className="bg-white rounded-2xl p-3 shadow-card hover:shadow-elegant hover:-translate-y-1 transition-all flex items-center justify-center aspect-square">
                  <img src={b.logo} alt={b.name} className="max-w-[85%] max-h-[85%] object-contain" />
                </div>
              ))}
            </div>
          </div>

        </div>
      </section>

      {/* EXHIBIDORES */}
      <section id="exhibidores" className="py-20 bg-gradient-hero text-primary-foreground">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 text-center">
          <div className="text-sm font-semibold text-accent uppercase tracking-widest mb-2">Exhibidores</div>
          <h2 className="text-4xl sm:text-5xl font-extrabold mb-4">Para tu punto de venta</h2>
          <p className="text-primary-foreground/80 max-w-2xl mx-auto mb-12">
            Soluciones diseñadas para que tu ferretería destaque y venda más.
          </p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {PRODUCTS.slice(3).map((p) => (
              <div key={p.code} className="bg-white/10 backdrop-blur border border-white/20 rounded-2xl p-6 hover:bg-white/20 transition group">
                <div className="aspect-square bg-white rounded-xl flex items-center justify-center mb-4 overflow-hidden">
                  <img src={p.img} alt={p.name} className="max-w-[75%] max-h-[75%] object-contain group-hover:scale-110 transition" />
                </div>
                <div className="text-xs font-mono text-accent font-bold mb-1">{p.code}</div>
                <div className="font-display font-semibold text-sm">{p.name}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* BLOG */}
      <section id="blog" className="py-20 max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-12">
          <div className="text-sm font-semibold text-accent uppercase tracking-widest mb-2">Blog</div>
          <h2 className="text-4xl sm:text-5xl font-extrabold text-foreground">Últimas publicaciones</h2>
        </div>
        <div className="grid md:grid-cols-2 gap-8">
          {[
            { img: "https://comlostodos.com/img/1.jpg", title: "¿Cuándo utilizar los bombillos de emergencia recargables?", excerpt: "Los bombillos de emergencia recargables se han convertido en una herramienta esencial...", url: "https://comlostodos.com/blog1" },
            { img: "https://comlostodos.com/img/2.jpg", title: "Beneficios, ventajas y desventajas de usar taladros eléctricos", excerpt: "Los taladros eléctricos han sido una herramienta fundamental...", url: "https://comlostodos.com/blog2" },
          ].map((b) => (
            <a key={b.url} href={b.url} target="_blank" rel="noopener"
              className="group bg-card rounded-3xl overflow-hidden shadow-card hover:shadow-elegant hover:-translate-y-1 transition-all">
              <div className="aspect-[16/9] overflow-hidden">
                <img src={b.img} alt={b.title} className="w-full h-full object-cover group-hover:scale-105 transition duration-700" />
              </div>
              <div className="p-6">
                <h3 className="font-display font-bold text-xl text-foreground mb-2 group-hover:text-accent transition">{b.title}</h3>
                <p className="text-muted-foreground text-sm mb-4">{b.excerpt}</p>
                <span className="inline-flex items-center gap-1 text-sm font-semibold text-primary group-hover:gap-2 transition-all">
                  Leer más <ChevronRight className="w-4 h-4" />
                </span>
              </div>
            </a>
          ))}
        </div>
      </section>

      {/* PROMO */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6">
        <div className="relative rounded-3xl overflow-hidden bg-gradient-hero p-8 sm:p-16 shadow-elegant">
          <div className="absolute -right-20 -bottom-20 w-80 h-80 rounded-full bg-accent/30 blur-3xl" />
          <div className="relative grid md:grid-cols-2 gap-8 items-center text-primary-foreground">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/15 backdrop-blur text-xs font-bold uppercase tracking-widest mb-4">
                HERRA-VEN
              </div>
              <h2 className="text-4xl sm:text-5xl font-extrabold mb-4">
                Hasta <span className="text-gradient">20%</span> de descuento
              </h2>
              <p className="text-primary-foreground/80 mb-6">En mercancía seleccionada. Aprovecha esta promoción exclusiva contactándonos directamente.</p>
              <a href={waLink(PHONES[0].raw)} target="_blank" rel="noopener"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white text-primary font-semibold shadow-elegant hover:scale-105 transition">
                <MessageCircle className="w-4 h-4" /> Aprovechar oferta
              </a>
            </div>
            <img src="https://comlostodos.com/img/herra.jpg" alt="Herramientas"
              className="rounded-2xl shadow-elegant w-full h-64 object-cover" />
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <section id="contacto" className="py-20 bg-secondary/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <div className="text-sm font-semibold text-accent uppercase tracking-widest mb-2">Contacto</div>
            <h2 className="text-4xl sm:text-5xl font-extrabold text-foreground">Estamos para ti</h2>
            <p className="text-muted-foreground mt-3">Si tienes alguna pregunta, comunícate con nuestro servicio de atención al cliente.</p>
          </div>

          <div className="grid lg:grid-cols-3 gap-6">
            <div className="bg-card rounded-2xl p-6 shadow-card hover:shadow-elegant transition">
              <Clock className="w-8 h-8 text-accent mb-3" />
              <h3 className="font-display font-bold text-lg mb-2">Horario de Atención</h3>
              <p className="text-muted-foreground text-sm">Lunes - Sábados<br />08:00AM a 05:00PM</p>
            </div>

            <div className="bg-card rounded-2xl p-6 shadow-card hover:shadow-elegant transition">
              <Truck className="w-8 h-8 text-accent mb-3" />
              <h3 className="font-display font-bold text-lg mb-2">Despachos Céntrico y Foráneos</h3>
              <p className="text-muted-foreground text-sm">Lunes - Sábados<br />08:00AM a 05:00PM</p>
            </div>

            <div className="bg-gradient-hero text-primary-foreground rounded-2xl p-6 shadow-elegant">
              <ShieldCheck className="w-8 h-8 text-accent mb-3" />
              <h3 className="font-display font-bold text-lg mb-2">Garantía & Calidad</h3>
              <p className="text-primary-foreground/80 text-sm">Respaldo y soporte en cada producto que comercializamos.</p>
            </div>
          </div>

          <div className="mt-8 bg-card rounded-3xl p-8 shadow-card">
            <div className="flex items-center gap-3 mb-6">
              <Phone className="w-6 h-6 text-accent" />
              <h3 className="font-display font-bold text-2xl text-foreground">Atención al Cliente</h3>
            </div>
            <div className="grid sm:grid-cols-3 gap-4">
              {PHONES.map((p) => (
                <a key={p.raw} href={waLink(p.raw)} target="_blank" rel="noopener"
                  className="group flex items-center gap-3 p-4 rounded-2xl bg-secondary hover:bg-gradient-hero hover:text-primary-foreground transition-all">
                  <div className="w-10 h-10 rounded-xl bg-whatsapp/20 group-hover:bg-white/20 flex items-center justify-center">
                    <MessageCircle className="w-5 h-5 text-whatsapp group-hover:text-primary-foreground" />
                  </div>
                  <div>
                    <div className="text-xs opacity-70">WhatsApp</div>
                    <div className="font-display font-bold">{p.num}</div>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-foreground text-primary-foreground py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid md:grid-cols-3 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-10 h-10 rounded-xl bg-gradient-hero flex items-center justify-center">
                  <Wrench className="w-5 h-5 text-primary-foreground" />
                </div>
                <div className="leading-tight">
                  <div className="font-display font-bold text-sm">COMERCIAL</div>
                  <div className="font-display font-extrabold text-base text-accent -mt-1">LOS TODOS</div>
                </div>
              </div>
              <p className="text-sm text-primary-foreground/60">J-40498513-1<br />Comercial Los Todos, C.A.</p>
            </div>
            <div>
              <h4 className="font-display font-bold mb-3 text-accent">Marcas</h4>
              <ul className="space-y-1 text-sm text-primary-foreground/70">
                {BRANDS.map((b) => <li key={b.id}>{b.name}</li>)}
              </ul>
            </div>
            <div>
              <h4 className="font-display font-bold mb-3 text-accent">Contacto</h4>
              <ul className="space-y-1 text-sm text-primary-foreground/70">
                {PHONES.map((p) => (
                  <li key={p.raw}>
                    <a href={waLink(p.raw)} target="_blank" rel="noopener" className="hover:text-accent inline-flex items-center gap-1">
                      <Phone className="w-3 h-3" /> {p.num}
                    </a>
                  </li>
                ))}
                <li className="flex items-center gap-1 pt-2"><MapPin className="w-3 h-3" /> Venezuela · Cobertura Nacional</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-white/10 pt-6 text-center text-xs text-primary-foreground/50">
            © {new Date().getFullYear()} Comercial Los Todos, C.A. — Todos los derechos reservados.
          </div>
        </div>
      </footer>

      {/* Floating WhatsApp */}
      <a href={waLink(PHONES[0].raw)} target="_blank" rel="noopener"
        className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-whatsapp text-white flex items-center justify-center shadow-elegant animate-pulse-ring hover:scale-110 transition">
        <MessageCircle className="w-6 h-6" />
      </a>
    </div>
  );
}
