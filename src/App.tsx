import { useEffect, useRef, useState, ReactNode } from 'react';
import {
  Wrench, Settings, ShoppingBag, CheckCircle, Target, Eye, Heart,
  Phone, Mail, MapPin, ChevronDown, Shield, Award, Users, Zap,
  Factory, ArrowRight, Star, Building2, Menu, X
} from 'lucide-react';

// ─── Intersection Observer hook ───────────────────────────────────────────────
function useReveal(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);

  return { ref, visible };
}

// ─── Reveal wrappers ──────────────────────────────────────────────────────────
function Reveal({ children, className = '', delay = '' }: { children: ReactNode; className?: string; delay?: string }) {
  const { ref, visible } = useReveal();
  return (
    <div ref={ref} className={`reveal ${visible ? 'visible' : ''} ${delay} ${className}`}>
      {children}
    </div>
  );
}

function RevealLeft({ children, className = '', delay = '' }: { children: ReactNode; className?: string; delay?: string }) {
  const { ref, visible } = useReveal();
  return (
    <div ref={ref} className={`reveal-left ${visible ? 'visible' : ''} ${delay} ${className}`}>
      {children}
    </div>
  );
}

function RevealRight({ children, className = '', delay = '' }: { children: ReactNode; className?: string; delay?: string }) {
  const { ref, visible } = useReveal();
  return (
    <div ref={ref} className={`reveal-right ${visible ? 'visible' : ''} ${delay} ${className}`}>
      {children}
    </div>
  );
}

function RevealScale({ children, className = '', delay = '' }: { children: ReactNode; className?: string; delay?: string }) {
  const { ref, visible } = useReveal();
  return (
    <div ref={ref} className={`reveal-scale ${visible ? 'visible' : ''} ${delay} ${className}`}>
      {children}
    </div>
  );
}

// ─── Animated counter ─────────────────────────────────────────────────────────
function Counter({ end, suffix = '', label }: { end: number; suffix?: string; label: string }) {
  const { ref, visible } = useReveal();
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!visible) return;
    let start = 0;
    const duration = 1800;
    const step = Math.ceil(end / (duration / 16));
    const timer = setInterval(() => {
      start += step;
      if (start >= end) { setCount(end); clearInterval(timer); }
      else setCount(start);
    }, 16);
    return () => clearInterval(timer);
  }, [visible, end]);

  return (
    <div ref={ref} className="text-center">
      <div className="counter-num text-4xl sm:text-5xl md:text-6xl gradient-text mb-2">
        {count}{suffix}
      </div>
      <div className="text-slate-400 text-sm uppercase tracking-widest font-medium">{label}</div>
    </div>
  );
}

// ─── Wave divider ─────────────────────────────────────────────────────────────
function WaveDivider({ flip = false, from = '#1a2332', to = '#111a27' }: { flip?: boolean; from?: string; to?: string }) {
  return (
    <div className={`flow-divider ${flip ? 'scale-y-[-1]' : ''}`} style={{ background: from }}>
      <svg viewBox="0 0 1440 60" preserveAspectRatio="none" style={{ height: 60, display: 'block', width: '100%' }}>
        <path
          d="M0,30 C240,60 480,0 720,30 C960,60 1200,0 1440,30 L1440,60 L0,60 Z"
          fill={to}
        />
      </svg>
    </div>
  );
}

// ─── Particles ────────────────────────────────────────────────────────────────
const PARTICLES = Array.from({ length: 18 }, (_, i) => ({
  id: i,
  size: (i * 1.7 % 5) + 2,
  x: (i * 5.5) % 100,
  y: (i * 7.3) % 100,
  duration: (i % 12) + 8,
  delay: (i * 0.3) % 5,
  color: i % 3 === 0 ? '#22c55e' : i % 3 === 1 ? '#0ea5e9' : '#64748b',
}));

function Particles() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {PARTICLES.map(p => (
        <div
          key={p.id}
          className="particle"
          style={{
            width: p.size,
            height: p.size,
            left: `${p.x}%`,
            top: `${p.y}%`,
            background: p.color,
            animationDuration: `${p.duration}s`,
            animationDelay: `${p.delay}s`,
          }}
        />
      ))}
    </div>
  );
}

// ─── Navbar ───────────────────────────────────────────────────────────────────
function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  const links = [
    { label: 'About', id: 'about' },
    { label: 'Services', id: 'services' },
    { label: 'Why Us', id: 'why-us' },
    { label: 'Vision', id: 'vision' },
    { label: 'Scope', id: 'scope' },
    { label: 'Contact', id: 'contact' },
  ];

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    setMenuOpen(false);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 nav-blur bg-[#0f1923]/95 border-b border-amber-400/20 shadow-2xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-amber-400 rounded-lg flex items-center justify-center font-bold text-white text-sm" style={{ fontFamily: 'Rajdhani, sans-serif' }}>TE</div>
          <div>
            <div className="font-bold text-white text-sm" style={{ fontFamily: 'Rajdhani, sans-serif', letterSpacing: '0.08em' }}>TEKTON</div>
            <div className="text-amber-400/80 text-[10px] uppercase tracking-widest leading-none">Engineering</div>
          </div>
        </div>

        <div className="hidden lg:flex items-center gap-7">
          {links.map(link => (
            <button
              key={link.id}
              onClick={() => scrollTo(link.id)}
              className="text-slate-300 hover:text-amber-400 text-sm font-medium transition-colors duration-200 relative group"
            >
              {link.label}
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-amber-400 group-hover:w-full transition-all duration-300" />
            </button>
          ))}
        </div>

        <button
          className="lg:hidden text-slate-300 hover:text-amber-400 transition-colors"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {menuOpen && (
        <div className="lg:hidden border-t border-amber-400/20 px-4 sm:px-6 py-4 flex flex-col gap-1" style={{ background: 'rgba(15,25,35,0.98)' }}>
          {links.map(link => (
            <button key={link.id} onClick={() => scrollTo(link.id)} className="text-slate-300 hover:text-amber-400 text-sm font-medium text-left py-2.5 border-b border-slate-800/60 last:border-0 w-full transition-colors">
              {link.label}
            </button>
          ))}
        </div>
      )}
    </nav>
  );
}

// ─── Hero ─────────────────────────────────────────────────────────────────────
function Hero() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => { const t = setTimeout(() => setMounted(true), 100); return () => clearTimeout(t); }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden section-dark grid-pattern pt-20">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full"
          style={{ background: 'radial-gradient(circle, rgba(34,197,94,0.12) 0%, transparent 70%)' }} />
        <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] rounded-full"
          style={{ background: 'radial-gradient(circle, rgba(14,165,233,0.10) 0%, transparent 70%)' }} />
      </div>

      <Particles />

      <div className="relative z-10 text-center px-4 sm:px-6 max-w-5xl mx-auto pb-12 sm:pb-0">
        <div className={`inline-flex items-center gap-2 border border-amber-400/40 rounded-full px-4 py-1.5 mb-8 transition-all duration-700 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
          style={{ background: 'rgba(34,197,94,0.08)' }}>
          <div className="w-1.5 h-1.5 rounded-full bg-amber-400 pulse-ring" />
          <span className="text-amber-300 text-xs uppercase tracking-widest font-medium text-center leading-snug">MSME Certified &nbsp;·&nbsp; 20 Years Experience</span>
        </div>

        <h1 className={`font-bold leading-none mb-6 transition-all duration-1000 delay-200 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
          style={{ fontFamily: 'Rajdhani, sans-serif' }}>
          <span className="block text-white" style={{ fontSize: 'clamp(2.5rem, 8vw, 6rem)', letterSpacing: '-0.02em' }}>TEKTON</span>
          <span className="block gradient-text" style={{ fontSize: 'clamp(2.5rem, 8vw, 6rem)', letterSpacing: '-0.02em' }}>ENGINEERING</span>
        </h1>

        <div className={`mx-auto mb-6 h-px w-64 shimmer-line transition-all duration-1000 delay-300 ${mounted ? 'opacity-100' : 'opacity-0'}`} />

        <p className={`text-slate-300 text-lg md:text-xl mb-3 font-light tracking-wider transition-all duration-1000 delay-400 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
          Manufacturing &nbsp;·&nbsp; Servicing &nbsp;·&nbsp; Trading
        </p>
        <p className={`text-slate-400 text-sm md:text-base max-w-2xl mx-auto mb-10 leading-relaxed transition-all duration-1000 delay-500 ${mounted ? 'opacity-100' : 'opacity-0'}`}>
          Precision fabrication, special purpose machines, and engineering solutions — delivered on time with uncompromising quality from Chennai, Tamil Nadu.
        </p>

        <div className={`flex flex-col sm:flex-row gap-4 justify-center transition-all duration-1000 delay-600 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
          <a
            href="mailto:tektonengineering321@gmail.com"
            className="px-8 py-3.5 bg-amber-400 hover:bg-amber-300 text-white font-semibold rounded-lg transition-all duration-300 hover:scale-105 glow-green flex items-center justify-center gap-2"
          >
            Get in Touch <ArrowRight size={16} />
          </a>
          <button
            onClick={() => document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' })}
            className="px-8 py-3.5 border border-slate-600 hover:border-amber-400/60 text-slate-300 hover:text-white font-medium rounded-lg transition-all duration-300 hover:bg-white/5"
          >
            Explore Services
          </button>
        </div>
      </div>

      <div className={`absolute bottom-8 left-1/2 -translate-x-1/2 transition-all duration-1000 delay-700 ${mounted ? 'opacity-100' : 'opacity-0'}`}>
        <div className="flex flex-col items-center gap-2 text-slate-500">
          <span className="text-xs uppercase tracking-widest">Scroll</span>
          <ChevronDown size={18} className="animate-bounce" />
        </div>
      </div>
    </section>
  );
}

// ─── Stats ────────────────────────────────────────────────────────────────────
function Stats() {
  return (
    <section className="py-14 md:py-20 px-6" style={{ background: 'linear-gradient(180deg, #1a2332 0%, #1e2c3d 100%)' }}>
      <div className="max-w-4xl mx-auto grid grid-cols-3 gap-6 md:gap-12">
        <Counter end={20} suffix="+" label="Years Experience" />
        <Counter end={3} suffix="" label="Core Services" />
        <Counter end={100} suffix="%" label="Quality Commitment" />
      </div>
    </section>
  );
}

// ─── About ────────────────────────────────────────────────────────────────────
function About() {
  return (
    <section id="about" className="py-16 md:py-24 px-4 sm:px-6" style={{ background: 'linear-gradient(180deg, #111a27 0%, #1a2332 100%)' }}>
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-2 gap-10 md:gap-16 items-center">
          <RevealLeft>
            <div className="border-l-2 border-amber-400 pl-6">
              <span className="text-amber-400 text-xs uppercase tracking-widest font-semibold mb-4 block">Who We Are</span>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-6" style={{ fontFamily: 'Rajdhani, sans-serif', lineHeight: 1.15 }}>
                Engineering<br />
                <span className="gradient-text">Excellence</span><br />
                Since Day One
              </h2>
              <p className="text-slate-400 leading-relaxed mb-5">
                TEKTON Engineering caters to manufacturing, quality testing, and supply of fabrication as per customer drawings or special purpose machines (SPM). Our professionals bring over 20 years of experience in fabrication, technical services and trading fields.
              </p>
              <p className="text-slate-400 leading-relaxed">
                Our plant is equipped with all necessary machines for fabricating, finishing, and testing equipment. We are committed to supplying deliverables on agreed timelines with tailor-made solutions for every client requirement.
              </p>
            </div>
          </RevealLeft>

          <RevealRight>
            <div className="grid grid-cols-2 gap-4">
              {[
                { icon: Shield, label: 'GST Certified', val: '33CMJPM1033J1Z8' },
                { icon: Award, label: 'MSME Certified', val: 'UDYAM-TN-24-0161631' },
                { icon: Factory, label: 'Major Activity', val: 'Manufacturing' },
                { icon: Star, label: 'Classification', val: 'Micro Enterprise' },
              ].map(({ icon: Icon, label, val }) => (
                <div key={label} className="border border-slate-700/60 rounded-xl p-5 card-hover hover:border-amber-400/40"
                  style={{ background: 'rgba(255,255,255,0.03)' }}>
                  <div className="w-9 h-9 bg-amber-400/15 rounded-lg flex items-center justify-center mb-3">
                    <Icon size={18} className="text-amber-400" />
                  </div>
                  <div className="text-slate-400 text-xs uppercase tracking-wider mb-1">{label}</div>
                  <div className="text-white text-sm font-semibold break-all leading-snug">{val}</div>
                </div>
              ))}
            </div>
          </RevealRight>
        </div>
      </div>
    </section>
  );
}

// ─── Services ─────────────────────────────────────────────────────────────────
function Services() {
  const services = [
    {
      icon: Factory,
      title: 'Manufacturing',
      color: '#22c55e',
      desc: 'Precision fabrication and assembly of custom components and special purpose machines (SPM) as per customer drawings. Equipped with TIG, MIG, and ARC welding capabilities.',
      items: ['Custom Fabrication', 'SPM Manufacturing', 'Assembly & Testing', 'Quality Inspection'],
    },
    {
      icon: Settings,
      title: 'Servicing',
      color: '#0ea5e9',
      desc: 'Expert technical services delivered by seasoned professionals. Periodic inspections, maintenance, and process optimization to keep your operations running flawlessly.',
      items: ['Technical Consulting', 'Periodic Inspections', 'Process Optimization', 'Maintenance Support'],
    },
    {
      icon: ShoppingBag,
      title: 'Trading',
      color: '#22c55e',
      desc: 'Supply of engineering products and materials including stainless steel, mild steel, and aluminium to meet your procurement needs with competitive pricing.',
      items: ['Stainless Steel SS304/SS316', 'Mild Steel IS 2062', 'Aluminium Products', 'Engineering Materials'],
    },
  ];

  return (
    <section id="services" className="py-16 md:py-24 px-4 sm:px-6" style={{ background: 'linear-gradient(180deg, #1a2332 0%, #1e2c3d 100%)' }}>
      <div className="max-w-6xl mx-auto">
        <Reveal className="text-center mb-12 md:mb-16">
          <span className="text-amber-400 text-xs uppercase tracking-widest font-semibold mb-3 block">What We Do</span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4" style={{ fontFamily: 'Rajdhani, sans-serif' }}>
            Core <span className="gradient-text">Services</span>
          </h2>
          <p className="text-slate-400 max-w-xl mx-auto">Comprehensive engineering support across three pillars — built to drive your business forward.</p>
        </Reveal>

        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-5 md:gap-6">
          {services.map(({ icon: Icon, title, color, desc, items }, i) => (
            <RevealScale key={title} delay={`delay-${(i + 1) * 100}`}>
              <div className="relative rounded-2xl overflow-hidden card-hover h-full border border-slate-700/50 group"
                style={{ background: 'linear-gradient(135deg, rgba(255,255,255,0.04) 0%, rgba(255,255,255,0.01) 100%)' }}>
                <div className="h-1 w-full" style={{ background: `linear-gradient(90deg, ${color}, transparent)` }} />
                <div className="p-6 md:p-8">
                  <div className="w-14 h-14 rounded-xl flex items-center justify-center mb-6 transition-transform duration-300 group-hover:scale-110"
                    style={{ background: `${color}18` }}>
                    <Icon size={26} style={{ color }} />
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-4" style={{ fontFamily: 'Rajdhani, sans-serif' }}>{title}</h3>
                  <p className="text-slate-400 text-sm leading-relaxed mb-6">{desc}</p>
                  <ul className="space-y-2">
                    {items.map(item => (
                      <li key={item} className="flex items-center gap-2 text-sm text-slate-300">
                        <div className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: color }} />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </RevealScale>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Why Choose Us ────────────────────────────────────────────────────────────
function WhyChooseUs() {
  const reasons = [
    { icon: CheckCircle, text: 'High Quality Products with stringent quality control' },
    { icon: Users, text: 'Professional Engineers with 20+ years of expertise' },
    { icon: Shield, text: 'Builds Trust and Credibility in every delivery' },
    { icon: Phone, text: 'One Point Contact — simplified communication' },
    { icon: Wrench, text: 'Comprehensive Manufacturing, Service & Trading support' },
    { icon: Heart, text: 'Strengthens long-term business relationships' },
    { icon: Star, text: 'Enhances customer confidence at every step' },
    { icon: Award, text: 'Compliance with international quality standards' },
    { icon: Zap, text: 'Low overhead cost reduces the final price for you' },
  ];

  return (
    <section id="why-us" className="py-16 md:py-24 px-4 sm:px-6 relative overflow-hidden" style={{ background: 'linear-gradient(180deg, #111a27 0%, #1a2332 100%)' }}>
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute right-0 top-1/2 -translate-y-1/2 w-64 md:w-96 h-64 md:h-96 rounded-full opacity-10"
          style={{ background: 'radial-gradient(circle, #0ea5e9 0%, transparent 70%)' }} />
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        <div className="grid md:grid-cols-2 gap-10 md:gap-16 items-start">
          <RevealLeft>
            <span className="text-amber-400 text-xs uppercase tracking-widest font-semibold mb-4 block">Our Advantage</span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-6" style={{ fontFamily: 'Rajdhani, sans-serif', lineHeight: 1.15 }}>
              Why Choose<br />
              <span className="gradient-text">Tekton</span> as Your<br />
              Engineering Partner
            </h2>
            <p className="text-slate-400 leading-relaxed mb-8">
              We deliver more than just products — we deliver confidence, reliability, and a partnership that grows with your business.
            </p>
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-amber-400/15 rounded-full flex items-center justify-center pulse-ring">
                <Building2 size={22} className="text-amber-400" />
              </div>
              <div>
                <div className="text-white font-semibold text-sm">GST Registered</div>
                <div className="text-slate-500 text-xs">Chennai, Tamil Nadu</div>
              </div>
            </div>
          </RevealLeft>

          <div className="space-y-3">
            {reasons.map(({ icon: Icon, text }, i) => (
              <Reveal key={text} delay={`delay-${Math.min((i + 1) * 100, 800)}`}>
                <div className="flex items-center gap-4 border border-slate-700/50 rounded-xl p-4 card-hover hover:border-teal-500/40 group"
                  style={{ background: 'rgba(255,255,255,0.02)' }}>
                  <div className="w-10 h-10 bg-teal-500/15 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:bg-teal-500/25 transition-colors">
                    <Icon size={18} className="text-teal-400" />
                  </div>
                  <span className="text-slate-300 text-sm font-medium group-hover:text-white transition-colors">{text}</span>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Vision Mission Values ────────────────────────────────────────────────────
function VisionMission() {
  const cards = [
    {
      icon: Eye,
      title: 'Vision',
      color: '#22c55e',
      text: 'To be the best in all deliverables — Manufacturing, Servicing and Trading — continuously improving our processes and technologies to meet the evolving needs of our clients.',
    },
    {
      icon: Target,
      title: 'Mission',
      color: '#0ea5e9',
      text: "To enhance our customers' success by delivering the highest quality products and solutions through continuous innovation, excellence, and uncompromising customer service to exceed expectations.",
    },
    {
      icon: Heart,
      title: 'Core Values',
      color: '#22c55e',
      items: ['Excellence — Highest standards in every product', 'Customer Centric — Prioritizing satisfaction', 'Integrity — Honesty and ethical practices', 'Continuous Improvement — Always evolving'],
    },
  ];

  return (
    <section id="vision" className="py-16 md:py-24 px-4 sm:px-6" style={{ background: 'linear-gradient(180deg, #1a2332 0%, #1e2c3d 100%)' }}>
      <div className="max-w-6xl mx-auto">
        <Reveal className="text-center mb-12 md:mb-16">
          <span className="text-amber-400 text-xs uppercase tracking-widest font-semibold mb-3 block">Our Foundation</span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4" style={{ fontFamily: 'Rajdhani, sans-serif' }}>
            Vision, Mission &amp; <span className="gradient-text">Values</span>
          </h2>
        </Reveal>

        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-5 md:gap-6">
          {cards.map(({ icon: Icon, title, color, text, items }, i) => (
            <RevealScale key={title} delay={`delay-${(i + 1) * 200}`}>
              <div className="rounded-2xl p-6 md:p-8 h-full card-hover border border-slate-700/50"
                style={{ background: `linear-gradient(135deg, ${color}10 0%, rgba(255,255,255,0.02) 100%)` }}>
                <div className="w-14 h-14 rounded-xl flex items-center justify-center mb-6"
                  style={{ background: `${color}20` }}>
                  <Icon size={26} style={{ color }} />
                </div>
                <h3 className="text-2xl font-bold text-white mb-4" style={{ fontFamily: 'Rajdhani, sans-serif' }}>{title}</h3>
                {text && <p className="text-slate-400 text-sm leading-relaxed">{text}</p>}
                {items && (
                  <ul className="space-y-3">
                    {items.map(item => (
                      <li key={item} className="flex items-start gap-2 text-sm text-slate-400">
                        <div className="w-1.5 h-1.5 rounded-full mt-1.5 flex-shrink-0" style={{ background: color }} />
                        {item}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </RevealScale>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Scope of Operation ───────────────────────────────────────────────────────
function Scope() {
  const materials = [
    { cat: 'Stainless Steel', spec: 'ASTM A 240 SS 304, SS 316, SS 400 Series' },
    { cat: 'Mild Steel', spec: 'IS 2062' },
    { cat: 'Aluminium', spec: 'Standard grades' },
  ];

  const welding = [
    { code: 'GTAW', full: 'TIG Welding', desc: 'Precision fusion for thin materials' },
    { code: 'GMAW', full: 'MIG Welding', desc: 'High-speed, versatile process' },
    { code: 'SMAW', full: 'ARC Welding', desc: 'Heavy-duty structural welding' },
  ];

  return (
    <section id="scope" className="py-16 md:py-24 px-4 sm:px-6 relative" style={{ background: 'linear-gradient(180deg, #111a27 0%, #1a2332 100%)' }}>
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute left-0 bottom-0 w-64 md:w-96 h-64 md:h-96 opacity-10"
          style={{ background: 'radial-gradient(circle, rgba(34,197,94,0.10) 0%, transparent 70%)' }} />
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        <Reveal className="text-center mb-12 md:mb-16">
          <span className="text-amber-400 text-xs uppercase tracking-widest font-semibold mb-3 block">Capabilities</span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4" style={{ fontFamily: 'Rajdhani, sans-serif' }}>
            Scope of <span className="gradient-text">Operation</span>
          </h2>
          <p className="text-slate-400 max-w-2xl mx-auto text-sm leading-relaxed">
            Committed to Manufacturing (Fabrication &amp; Assembly), Service &amp; Trading with engineering excellence — quality, timely delivery, at competitive cost.
          </p>
        </Reveal>

        <div className="grid md:grid-cols-2 gap-5 md:gap-8 mb-5 md:mb-8">
          <RevealLeft>
            <div className="rounded-2xl border border-slate-700/50 overflow-hidden" style={{ background: 'rgba(255,255,255,0.02)' }}>
              <div className="px-6 py-4 border-b border-slate-700/50 flex items-center gap-3">
                <div className="w-8 h-8 bg-amber-400/15 rounded-lg flex items-center justify-center">
                  <Wrench size={16} className="text-amber-400" />
                </div>
                <h3 className="text-white font-semibold" style={{ fontFamily: 'Rajdhani, sans-serif', fontSize: '1.1rem' }}>Materials Dealt</h3>
              </div>
              <div className="divide-y divide-slate-700/30">
                {materials.map(({ cat, spec }) => (
                  <div key={cat} className="px-6 py-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1">
                    <span className="text-amber-300 font-semibold text-sm">{cat}</span>

                    <span className="text-slate-400 text-sm">{spec}</span>
                  </div>
                ))}
              </div>
            </div>
          </RevealLeft>

          <RevealRight>
            <div className="rounded-2xl border border-slate-700/50 overflow-hidden" style={{ background: 'rgba(255,255,255,0.02)' }}>
              <div className="px-6 py-4 border-b border-slate-700/50 flex items-center gap-3">
                <div className="w-8 h-8 bg-teal-500/15 rounded-lg flex items-center justify-center">
                  <Zap size={16} className="text-teal-400" />
                </div>
                <h3 className="text-white font-semibold" style={{ fontFamily: 'Rajdhani, sans-serif', fontSize: '1.1rem' }}>Welding Processes</h3>
              </div>
              <div className="divide-y divide-slate-700/30">
                {welding.map(({ code, full, desc }) => (
                  <div key={code} className="px-6 py-4">
                    <div className="flex items-center gap-3 mb-1">
                      <span className="text-teal-400 font-bold text-sm font-mono">{code}</span>
                      <span className="text-white font-medium text-sm">{full}</span>
                    </div>
                    <span className="text-slate-500 text-xs">{desc}</span>
                  </div>
                ))}
              </div>
            </div>
          </RevealRight>
        </div>

        <Reveal>
          <div className="rounded-2xl border border-slate-700/50 p-5 md:p-8" style={{ background: 'rgba(255,255,255,0.02)' }}>
            <h3 className="text-white font-semibold text-lg mb-5" style={{ fontFamily: 'Rajdhani, sans-serif' }}>Key Initiatives</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
              {['Innovative Technology', 'Manufacturing Excellence', 'Legal Compliance', 'Stakeholder Fulfillment'].map(item => (
                <div key={item} className="flex items-start gap-2">
                  <CheckCircle size={16} className="text-amber-400 mt-0.5 flex-shrink-0" />
                  <span className="text-slate-300 text-sm">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

// ─── Contact ──────────────────────────────────────────────────────────────────
function Contact() {
  return (
    <section id="contact" className="py-16 md:py-24 px-4 sm:px-6 relative overflow-hidden" style={{ background: 'linear-gradient(180deg, #111a27 0%, #0a1117 100%)' }}>
      <div className="absolute inset-0 pointer-events-none grid-pattern opacity-40" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] md:w-[800px] h-[400px] md:h-[800px] rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(34,197,94,0.06) 0%, transparent 70%)' }} />

      <div className="max-w-6xl mx-auto relative z-10">
        <Reveal className="text-center mb-12 md:mb-16">
          <span className="text-amber-400 text-xs uppercase tracking-widest font-semibold mb-3 block">Reach Out</span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4" style={{ fontFamily: 'Rajdhani, sans-serif' }}>
            Get In <span className="gradient-text">Touch</span>
          </h2>
          <p className="text-slate-400 max-w-xl mx-auto text-sm">Ready to discuss your engineering requirements? Contact us today for a tailored solution.</p>
        </Reveal>

        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-5 md:gap-6">
          <RevealLeft>
            <div className="rounded-2xl border border-slate-700/50 p-5 md:p-6 card-hover hover:border-amber-400/40 h-full"
              style={{ background: 'rgba(255,255,255,0.02)' }}>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-9 h-9 bg-amber-400/15 rounded-lg flex items-center justify-center">
                  <Users size={18} className="text-amber-400" />
                </div>
                <h3 className="text-white font-semibold" style={{ fontFamily: 'Rajdhani, sans-serif' }}>Contacts</h3>
              </div>
              <div className="space-y-5">
                {[
                  { name: 'Prasanna S', phone: '9789983598' },
                  { name: 'Durairaj R', phone: '9884946382' },
                ].map(({ name, phone }) => (
                  <div key={name}>
                    <div className="text-white font-medium text-sm mb-1">{name}</div>
                    <a href={`tel:${phone}`} className="flex items-center gap-2 text-amber-400 hover:text-amber-300 transition-colors text-sm">
                      <Phone size={14} /> {phone}
                    </a>
                  </div>
                ))}
                <div>
                  <div className="text-slate-400 text-xs mb-1">Email</div>
                  <a href="mailto:tektonengineering321@gmail.com"
                    className="flex items-start gap-2 text-teal-400 hover:text-teal-300 transition-colors text-sm break-all">
                    <Mail size={14} className="flex-shrink-0 mt-0.5" />
                    tektonengineering321@gmail.com
                  </a>
                </div>
              </div>
            </div>
          </RevealLeft>

          <Reveal delay="delay-200">
            <div className="rounded-2xl border border-slate-700/50 p-5 md:p-6 card-hover hover:border-teal-500/40 h-full"
              style={{ background: 'rgba(255,255,255,0.02)' }}>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-9 h-9 bg-teal-500/15 rounded-lg flex items-center justify-center">
                  <MapPin size={18} className="text-teal-400" />
                </div>
                <h3 className="text-white font-semibold" style={{ fontFamily: 'Rajdhani, sans-serif' }}>Location</h3>
              </div>
              <p className="text-slate-300 text-sm leading-relaxed mb-5">
                177/1B3, School Road,<br />
                Palanthandalam,<br />
                Thirumudivakkam,<br />
                Chennai – 600 044<br />
                Tamil Nadu, India
              </p>
              <div className="pt-4 border-t border-slate-700/40 space-y-2">
                <div className="flex items-start gap-2 text-xs">
                  <span className="text-slate-500 flex-shrink-0 w-12">GST:</span>
                  <span className="text-slate-300 font-mono">33CMJPM1033J1Z8</span>
                </div>
                <div className="flex items-start gap-2 text-xs">
                  <span className="text-slate-500 flex-shrink-0 w-12">MSME:</span>
                  <span className="text-slate-300 font-mono">UDYAM-TN-24-0161631</span>
                </div>
              </div>
            </div>
          </Reveal>

          <RevealRight>
            <div className="rounded-2xl border border-slate-700/50 p-5 md:p-6 card-hover hover:border-green-500/40 h-full"
              style={{ background: 'rgba(255,255,255,0.02)' }}>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-9 h-9 bg-green-500/15 rounded-lg flex items-center justify-center">
                  <Building2 size={18} className="text-green-400" />
                </div>
                <h3 className="text-white font-semibold" style={{ fontFamily: 'Rajdhani, sans-serif' }}>Bank Details</h3>
              </div>
              <div className="space-y-3">
                {[
                  ['Bank', 'Union Bank of India'],
                  ['Branch', 'Sathyamurthy Nagar Branch'],
                  ['A/C Type', 'Current Account'],
                  ['A/C No.', '112911010000160'],
                  ['IFSC', 'UBIN0811297'],
                  ['Favour of', 'TEKTON ENGINEERING'],
                ].map(([label, val]) => (
                  <div key={label} className="flex justify-between gap-4 text-sm">
                    <span className="text-slate-500 flex-shrink-0">{label}</span>
                    <span className="text-slate-200 font-medium text-right">{val}</span>
                  </div>
                ))}
              </div>
            </div>
          </RevealRight>
        </div>
      </div>
    </section>
  );
}

// ─── Footer ───────────────────────────────────────────────────────────────────
function Footer() {
  return (
    <footer className="border-t border-slate-800 py-8 md:py-10 px-4 sm:px-6" style={{ background: '#060d14' }}>
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 text-center md:text-left">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-amber-400 rounded-lg flex items-center justify-center font-bold text-white text-xs"
            style={{ fontFamily: 'Rajdhani, sans-serif' }}>TE</div>
          <span className="text-slate-400 text-sm font-medium">TEKTON ENGINEERING</span>
          <span className="text-slate-600 text-sm hidden sm:inline">— Manufacturing, Servicing &amp; Trading</span>
        </div>
        <div className="text-slate-600 text-xs text-center flex flex-col sm:flex-row items-center gap-1 sm:gap-0">
          <span>Chennai 600 044</span>
          <span className="hidden sm:inline">&nbsp;&middot;&nbsp;</span>
          <span>tektonengineering321@gmail.com</span>
          <span className="hidden sm:inline">&nbsp;&middot;&nbsp;</span>
          <span>GST: 33CMJPM1033J1Z8</span>
        </div>
      </div>
    </footer>
  );
}

// ─── App ──────────────────────────────────────────────────────────────────────
export default function App() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <Hero />
      <WaveDivider from="#111a27" to="#1e2c3d" />
      <Stats />
      <WaveDivider from="#1e2c3d" to="#111a27" flip />
      <About />
      <WaveDivider from="#1a2332" to="#1e2c3d" />
      <Services />
      <WaveDivider from="#1e2c3d" to="#111a27" flip />
      <WhyChooseUs />
      <WaveDivider from="#1a2332" to="#1e2c3d" />
      <VisionMission />
      <WaveDivider from="#1e2c3d" to="#111a27" flip />
      <Scope />
      <WaveDivider from="#1a2332" to="#111a27" flip />
      <Contact />
      <Footer />
    </div>
  );
}
