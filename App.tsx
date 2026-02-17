
import React, { useState, useEffect, createContext, useContext, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useSpring, useInView, animate, useMotionValue, Variants } from 'framer-motion';
import Lenis from 'lenis';
import { 
  Phone, 
  MapPin, 
  Star, 
  Menu as MenuIcon, 
  X, 
  ChevronRight, 
  Plus, 
  Trophy, 
  CheckCircle, 
  ArrowRight, 
  ShieldCheck,
  Instagram,
  Facebook,
  ExternalLink,
  ChevronDown,
  Globe,
  Droplets,
  Zap,
  Coffee,
  Heart,
  Image as ImageIcon
} from 'lucide-react';
import { translations, Language } from './translations';

// --- Context & State Management ---
interface LanguageContextType {
  lang: Language;
  setLang: (l: Language) => void;
  t: any;
  lenis: Lenis | null;
}
const LanguageContext = createContext<LanguageContextType | null>(null);

const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) throw new Error("useLanguage must be used within LanguageProvider");
  return context;
};

// --- Animation Variants ---
const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.8, ease: [0.21, 0.47, 0.32, 0.98] }
  }
};

const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2
    }
  }
};

const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: { 
    opacity: 1, 
    scale: 1,
    transition: { duration: 1, ease: [0.21, 0.47, 0.32, 0.98] }
  }
};

// --- Helper Components ---

const CursorGlow = () => {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const [isHovering, setIsHovering] = useState(false);

  const springConfig = { damping: 30, stiffness: 200, mass: 0.5 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const isInteractive = 
        target.tagName.toLowerCase() === 'button' || 
        target.tagName.toLowerCase() === 'a' || 
        target.closest('button') || 
        target.closest('a') ||
        target.classList.contains('cursor-pointer');
      
      setIsHovering(!!isInteractive);
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseover', handleMouseOver);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseover', handleMouseOver);
    };
  }, [mouseX, mouseY]);

  return (
    <motion.div
      className="fixed top-0 left-0 w-8 h-8 rounded-full border border-amber-500/30 pointer-events-none z-[999] hidden lg:block"
      style={{
        x: smoothX,
        y: smoothY,
        translateX: "-50%",
        translateY: "-50%",
      }}
      animate={{
        scale: isHovering ? 2.5 : 1,
        backgroundColor: isHovering ? "rgba(245, 158, 11, 0.1)" : "rgba(245, 158, 11, 0)",
        borderColor: isHovering ? "rgba(245, 158, 11, 0.5)" : "rgba(245, 158, 11, 0.3)",
      }}
      transition={{ type: "spring", stiffness: 250, damping: 20 }}
    >
      <div className="absolute inset-0 bg-amber-500/10 blur-xl rounded-full scale-150 opacity-50" />
    </motion.div>
  );
};

const AnimatedCounter = ({ value, decimals = 0, suffix = "" }: { value: number; decimals?: number; suffix?: string }) => {
  const nodeRef = useRef<HTMLSpanElement>(null);
  const isInView = useInView(nodeRef, { once: true, margin: "-100px" });

  useEffect(() => {
    if (isInView && nodeRef.current) {
      const node = nodeRef.current;
      const controls = animate(0, value, {
        duration: 2,
        ease: "easeOut",
        onUpdate: (latest) => {
          node.textContent = latest.toFixed(decimals) + suffix;
        }
      });
      return () => controls.stop();
    }
  }, [isInView, value, decimals, suffix]);

  return <span ref={nodeRef}>0{suffix}</span>;
};

const ScrollProgress = () => {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-1 bg-amber-500 origin-left z-[210] shadow-[0_0_10px_rgba(245,158,11,0.8)]"
      style={{ scaleX }}
    />
  );
};

const LanguageSwitcher = () => {
  const { lang, setLang } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative z-50">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 bg-white/5 hover:bg-white/10 px-3 py-1.5 rounded-full border border-white/10 transition-all"
      >
        <Globe size={14} className="text-amber-500" />
        <span className="text-xs font-bold tracking-widest">{lang}</span>
        <ChevronDown size={14} className={`transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="absolute top-full right-0 mt-2 bg-[#1a1a1f] border border-white/10 rounded-xl overflow-hidden shadow-2xl min-w-[80px]"
          >
            {(['EN', 'ES', 'PT'] as Language[]).map(l => (
              <button
                key={l}
                onClick={() => { setLang(l); setIsOpen(false); }}
                className={`w-full px-4 py-2 text-xs font-bold hover:bg-amber-500/10 transition-colors ${lang === l ? 'text-amber-500 bg-amber-500/5' : 'text-white/60'}`}
              >
                {l}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const Navbar = () => {
  const { t, lenis } = useLanguage();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenu, setMobileMenu] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    if (lenis) {
      lenis.scrollTo(href, { duration: 1.5 });
    } else {
      const el = document.querySelector(href);
      el?.scrollIntoView({ behavior: 'smooth' });
    }
    setMobileMenu(false);
  };

  const navLinks = [
    { name: t.nav.menu, href: '#menu' },
    { name: t.nav.how, href: '#how' },
    { name: t.nav.story, href: '#story' },
    { name: t.nav.reviews, href: '#reviews' },
    { name: t.nav.gallery, href: '#gallery' },
    { name: t.nav.location, href: '#location' }
  ];

  return (
    <>
      <nav className={`fixed top-0 w-full z-[100] transition-all duration-500 ${scrolled ? 'bg-[#0b0b0f]/80 backdrop-blur-xl border-b border-white/5 py-4' : 'bg-transparent py-6'}`}>
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          <div className="flex flex-col cursor-pointer" onClick={() => lenis?.scrollTo(0)}>
            <span className="text-2xl font-serif font-bold tracking-tight text-white">Spoonz</span>
            <span className="text-[10px] uppercase tracking-[0.3em] text-amber-500 font-bold -mt-1">Rolled Ice Cream</span>
          </div>

          <div className="hidden lg:flex items-center gap-10">
            {navLinks.map(link => (
              <a 
                key={link.name} 
                href={link.href} 
                onClick={(e) => handleNavClick(e, link.href)}
                className="text-sm font-medium text-white/70 hover:text-amber-500 transition-colors uppercase tracking-widest"
              >
                {link.name}
              </a>
            ))}
          </div>

          <div className="hidden lg:flex items-center gap-6">
            <LanguageSwitcher />
            <a href="tel:+12567364021" className="text-sm font-bold border border-white/10 px-6 py-2.5 rounded-full hover:bg-white/5 transition-all flex items-center gap-2">
              <Phone size={14} className="text-amber-500" /> {t.nav.call}
            </a>
            <a href="https://maps.google.com/?q=1544+Gulf+Shores+Pkwy,+Gulf+Shores,+AL+36542" target="_blank" className="text-sm font-bold bg-amber-500 text-black px-6 py-2.5 rounded-full hover:bg-amber-400 transition-all shadow-lg shadow-amber-500/20">
              {t.nav.directions}
            </a>
          </div>

          <button className="lg:hidden text-white" onClick={() => setMobileMenu(true)}>
            <MenuIcon size={24} />
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {mobileMenu && (
          <motion.div 
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            className="fixed inset-0 z-[200] bg-[#0b0b0f] flex flex-col p-8"
          >
            <div className="flex justify-between items-center mb-12">
              <div className="flex flex-col">
                <span className="text-2xl font-serif font-bold tracking-tight text-white">Spoonz</span>
                <span className="text-[10px] uppercase tracking-[0.3em] text-amber-500 font-bold">Rolled Ice Cream</span>
              </div>
              <button onClick={() => setMobileMenu(false)} className="bg-white/5 p-2 rounded-full">
                <X size={24} />
              </button>
            </div>
            <div className="flex flex-col gap-8 mb-12 overflow-y-auto">
              {navLinks.map((link, idx) => (
                <motion.a 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  key={link.name} 
                  href={link.href} 
                  onClick={(e) => handleNavClick(e, link.href)}
                  className="text-4xl font-serif text-white hover:text-amber-500 transition-colors"
                >
                  {link.name}
                </motion.a>
              ))}
            </div>
            <div className="mt-auto flex flex-col gap-4">
              <div className="flex justify-between items-center border-b border-white/5 pb-4 mb-4">
                <span className="text-white/40 text-sm uppercase tracking-widest">Language</span>
                <LanguageSwitcher />
              </div>
              <a href="tel:+12567364021" className="w-full py-4 rounded-2xl bg-white/5 text-center font-bold flex items-center justify-center gap-3">
                <Phone size={18} className="text-amber-500" /> {t.nav.call}
              </a>
              <a href="https://maps.google.com/?q=1544+Gulf+Shores+Pkwy,+Gulf+Shores,+AL+36542" className="w-full py-4 rounded-2xl bg-amber-500 text-black text-center font-bold">
                {t.nav.directions}
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

const Hero = () => {
  const { t, lenis } = useLanguage();
  return (
    <section className="relative min-h-screen flex items-center pt-20 overflow-hidden">
      <div className="absolute inset-0 z-0">
        <motion.div 
          animate={{ scale: [1, 1.2, 1], rotate: [0, 45, 0], x: [0, 100, 0] }}
          transition={{ duration: 20, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute -top-[20%] -right-[10%] w-[60vw] h-[60vw] bg-rose-500/10 rounded-full blur-[120px]" 
        />
        <motion.div 
          animate={{ scale: [1.2, 1, 1.2], rotate: [0, -45, 0], y: [0, 50, 0] }}
          transition={{ duration: 15, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute -bottom-[10%] -left-[5%] w-[50vw] h-[50vw] bg-amber-500/10 rounded-full blur-[100px]" 
        />
      </div>

      <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-12 items-center relative z-10">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
        >
          <motion.div variants={fadeInUp} className="inline-flex items-center gap-2 bg-white/5 border border-amber-500/20 px-4 py-2 rounded-full mb-8 backdrop-blur-md">
            <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse" />
            <span className="text-xs font-bold uppercase tracking-widest text-amber-500">{t.hero.badge}</span>
          </motion.div>

          <motion.h1 variants={fadeInUp} className="text-6xl md:text-8xl font-serif font-bold leading-tight mb-8 text-white">
            {t.hero.headline}
          </motion.h1>
          <motion.p variants={fadeInUp} className="text-lg text-white/60 max-w-lg mb-12 leading-relaxed font-light">
            {t.hero.subheadline}
          </motion.p>

          <motion.div variants={fadeInUp} className="flex flex-wrap gap-4 mb-16">
            <button 
              onClick={() => lenis?.scrollTo('#builder')}
              className="bg-amber-500 text-black px-10 py-5 rounded-full font-bold text-lg hover:bg-amber-400 transition-all flex items-center gap-2 group shadow-xl shadow-amber-500/20"
            >
              {t.hero.cta1} <ArrowRight className="group-hover:translate-x-1 transition-transform" />
            </button>
            <button 
              onClick={() => lenis?.scrollTo('#location')}
              className="bg-white/5 border border-white/10 text-white px-10 py-5 rounded-full font-bold text-lg hover:bg-white/10 transition-all"
            >
              {t.hero.cta2}
            </button>
          </motion.div>

          <motion.div variants={fadeInUp} className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {t.hero.chips.map((text: string) => (
              <div key={text} className="bg-white/5 border border-white/10 p-4 rounded-2xl flex flex-col gap-2">
                <CheckCircle size={16} className="text-amber-500" />
                <span className="text-[10px] font-bold uppercase tracking-widest text-white/60 leading-tight">{text}</span>
              </div>
            ))}
          </motion.div>
        </motion.div>

        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={scaleIn}
          className="relative group"
        >
          <div className="absolute inset-0 bg-gradient-to-tr from-rose-500/20 to-amber-500/20 rounded-3xl blur-3xl opacity-50 group-hover:opacity-100 transition-opacity duration-700" />
          <div className="relative aspect-[4/5] overflow-hidden rounded-[2.5rem] border border-white/10 shadow-2xl">
            <img 
              src="https://images.unsplash.com/photo-1563805042-7684c019e1cb?auto=format&fit=crop&q=80&w=1200" 
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-[2s]" 
              alt="Rolled Ice Cream"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0b0b0f] via-transparent to-transparent" />
            
            <motion.div 
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
              className="absolute top-12 -left-8 bg-white/10 backdrop-blur-xl border border-white/20 p-6 rounded-3xl shadow-2xl"
            >
              <div className="flex items-center gap-3 mb-2">
                <div className="flex text-amber-500"><Star size={14} fill="currentColor" /><Star size={14} fill="currentColor" /><Star size={14} fill="currentColor" /><Star size={14} fill="currentColor" /><Star size={14} fill="currentColor" /></div>
                <span className="text-white font-bold text-sm"><AnimatedCounter value={4.9} decimals={1} />/5</span>
              </div>
              <p className="text-[10px] uppercase tracking-widest text-white/60 font-bold"><AnimatedCounter value={102} suffix="+" /> Verified Reviews</p>
            </motion.div>

            <motion.div 
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
              className="absolute bottom-12 -right-8 bg-amber-500 p-6 rounded-3xl shadow-2xl"
            >
              <Trophy size={32} className="text-black mb-2" />
              <p className="text-black font-serif font-bold text-xl leading-tight">Top 5 Best<br/>Ice Cream</p>
              <p className="text-black/60 text-[10px] font-bold uppercase tracking-widest mt-1">Baldwin County</p>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

const FeaturedMenu = () => {
  const { t } = useLanguage();
  return (
    <section id="menu" className="py-32 px-6">
      <div className="max-w-7xl mx-auto">
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeInUp}
          className="text-center mb-20"
        >
          <h2 className="text-5xl font-serif font-bold mb-6">
            {t.menu.title}
          </h2>
          <p className="text-white/50 max-w-2xl mx-auto leading-relaxed">{t.menu.subtitle}</p>
        </motion.div>

        <motion.div 
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {t.menu.items.map((item: any, idx: number) => (
            <motion.div 
              key={item.name}
              variants={fadeInUp}
              whileHover={{ y: -10 }}
              className="bg-white/5 border border-white/10 rounded-[2.5rem] overflow-hidden group"
            >
              <div className="aspect-[16/10] overflow-hidden relative">
                <img 
                  src={`https://images.unsplash.com/photo-${[
                    '1516559828984-fb3b92374751',
                    '1488477181946-6428a0291777',
                    '1572490122747-3968b75cc699',
                    '1497034825429-c343d7c6a68f',
                    '1505394033223-264f1c140451',
                    '1534706936160-d5ee67737249'
                  ][idx % 6]}?auto=format&fit=crop&q=80&w=600`} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
                  alt={item.name} 
                />
                <div className="absolute top-4 right-4 bg-amber-500 text-black text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-widest">Fan Favorite</div>
              </div>
              <div className="p-8">
                <h3 className="text-2xl font-serif font-bold mb-3">{item.name}</h3>
                <p className="text-white/50 text-sm mb-6 leading-relaxed">{item.desc}</p>
                <div className="flex justify-between items-center pt-6 border-t border-white/5">
                  <div className="flex gap-2">
                    <div className="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center"><Droplets size={14} className="text-amber-500" /></div>
                    <div className="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center"><Heart size={14} className="text-amber-500" /></div>
                  </div>
                  <span className="text-xs font-bold uppercase tracking-widest text-amber-500">View pairing</span>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

const HowItWorks = () => {
  const { t } = useLanguage();
  return (
    <section id="how" className="py-32 px-6 bg-white/[0.02] border-y border-white/5">
      <div className="max-w-7xl mx-auto">
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInUp}
          className="text-center mb-20"
        >
          <h2 className="text-5xl font-serif font-bold mb-6">{t.how.title}</h2>
          <p className="text-white/40 max-w-xl mx-auto uppercase tracking-[0.2em] text-[10px] font-bold">The craft behind the roll</p>
        </motion.div>

        <motion.div 
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid md:grid-cols-3 gap-16"
        >
          {t.how.steps.map((step: any, idx: number) => (
            <motion.div 
              key={step.title}
              variants={fadeInUp}
              className="relative"
            >
              <div className="text-[12rem] font-serif font-bold text-white/[0.03] absolute -top-24 -left-8 leading-none pointer-events-none">0{idx + 1}</div>
              <div className="relative z-10">
                <div className="w-16 h-16 bg-amber-500 rounded-3xl flex items-center justify-center mb-8 shadow-xl shadow-amber-500/20">
                  {idx === 0 ? <Droplets className="text-black" /> : idx === 1 ? <Zap className="text-black" /> : <CheckCircle className="text-black" />}
                </div>
                <h3 className="text-3xl font-serif font-bold mb-6">{step.title}</h3>
                <p className="text-white/50 leading-relaxed">{step.desc}</p>
              </div>
              {idx < 2 && (
                <div className="hidden lg:block absolute top-8 -right-8 text-white/10">
                  <ChevronRight size={48} strokeWidth={1} />
                </div>
              )}
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

const AllergySection = () => {
  const { t } = useLanguage();
  return (
    <section className="py-32 px-6 bg-[#0b0b0f]">
      <div className="max-w-7xl mx-auto">
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={scaleIn}
          className="bg-white/5 border border-white/10 rounded-[3rem] p-12 md:p-20 relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 p-12 opacity-5"><ShieldCheck size={200} /></div>
          
          <div className="grid lg:grid-cols-2 gap-16 items-center relative z-10">
            <div>
              <motion.div variants={fadeInUp} className="inline-flex items-center gap-3 text-amber-500 font-bold uppercase tracking-[0.2em] text-xs mb-6">
                <ShieldCheck size={20} /> Safety First
              </motion.div>
              <motion.h2 variants={fadeInUp} className="text-5xl font-serif font-bold mb-8">{t.allergy.title}</motion.h2>
              <motion.p variants={fadeInUp} className="text-white/50 mb-12 text-lg leading-relaxed">{t.allergy.subtitle}</motion.p>
              
              <motion.div variants={staggerContainer} className="grid sm:grid-cols-2 gap-6 mb-12">
                {t.allergy.items.map((item: string) => (
                  <motion.div key={item} variants={fadeInUp} className="flex items-center gap-4">
                    <CheckCircle className="text-amber-500" size={18} />
                    <span className="text-sm font-bold text-white/80">{item}</span>
                  </motion.div>
                ))}
              </motion.div>
              
              <motion.div variants={fadeInUp} className="p-6 bg-rose-500/5 border border-rose-500/20 rounded-2xl">
                <p className="text-rose-500/80 text-xs font-bold leading-relaxed">{t.allergy.disclaimer}</p>
              </motion.div>
            </div>
            
            <motion.div variants={scaleIn} className="relative aspect-square">
               <div className="absolute inset-0 bg-amber-500/20 blur-[100px] rounded-full" />
               <img 
                 src="https://images.unsplash.com/photo-1549416878-b9ca35c2d47a?auto=format&fit=crop&q=80&w=800" 
                 className="relative w-full h-full object-cover rounded-[2rem] border border-white/10" 
                 alt="Clean Environment" 
               />
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

const Gallery = () => {
  const { t } = useLanguage();
  const [selectedImg, setSelectedImg] = useState<string | null>(null);

  const images = [
    'https://images.unsplash.com/photo-1516559828984-fb3b92374751',
    'https://images.unsplash.com/photo-1488477181946-6428a0291777',
    'https://images.unsplash.com/photo-1572490122747-3968b75cc699',
    'https://images.unsplash.com/photo-1497034825429-c343d7c6a68f',
    'https://images.unsplash.com/photo-1505394033223-264f1c140451',
    'https://images.unsplash.com/photo-1534706936160-d5ee67737249',
    'https://images.unsplash.com/photo-1551024506-0bccd828d307',
    'https://images.unsplash.com/photo-1472555950005-75215169a501',
    'https://images.unsplash.com/photo-1481391319762-47dff72954d9',
    'https://images.unsplash.com/photo-1543662923-38096f92605f',
    'https://images.unsplash.com/photo-1515516089376-88db1e26e9c0',
    'https://images.unsplash.com/photo-1562967962-e2e1282f6333'
  ];

  return (
    <section id="gallery" className="py-32 px-6">
      <div className="max-w-7xl mx-auto">
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInUp}
          className="text-center mb-20"
        >
          <h2 className="text-5xl font-serif font-bold mb-6">The Spoonz Experience</h2>
          <div className="flex justify-center gap-4 flex-wrap">
            {['All', 'Rolled Ice Cream', 'Toppings', 'Vacation Vibes'].map(filter => (
              <button key={filter} className="text-xs font-bold uppercase tracking-widest px-6 py-2.5 rounded-full border border-white/10 hover:border-amber-500 transition-colors">
                {filter}
              </button>
            ))}
          </div>
        </motion.div>

        <motion.div 
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="columns-2 md:columns-3 lg:columns-4 gap-6 space-y-6"
        >
          {images.map((img, i) => (
            <motion.div 
              key={i}
              variants={fadeInUp}
              onClick={() => setSelectedImg(`${img}?auto=format&fit=crop&q=100&w=1200`)}
              className="relative group cursor-zoom-in rounded-[1.5rem] overflow-hidden"
            >
              <img src={`${img}?auto=format&fit=crop&q=80&w=600`} className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-500" alt="Gallery item" />
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <ImageIcon className="text-white" size={32} />
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      <AnimatePresence>
        {selectedImg && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedImg(null)}
            className="fixed inset-0 z-[300] bg-black/95 flex items-center justify-center p-6 md:p-20 cursor-zoom-out"
          >
            <button className="absolute top-10 right-10 text-white hover:text-amber-500 transition-colors"><X size={40} /></button>
            <motion.img 
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              src={selectedImg} 
              className="max-w-full max-h-full rounded-3xl object-contain shadow-2xl" 
            />
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

const ReviewsCarousel = () => {
  const { t } = useLanguage();
  const [index, setIndex] = useState(0);
  const reviews = [
    { name: "Amanda (Local Guide)", text: "The owners were so friendly and welcoming. We loved watching it being made fresh!" },
    { name: "John S.", text: "Best ice cream on our vacation. Endless customization options and a super clean environment." },
    { name: "Sarah Miller", text: "Loved the Key Lime Pie roll! Extremely allergy-friendly and helpful staff." },
    { name: "Vacation Mike", text: "A highlight of our Gulf Shores trip. Fresh, fun, and delicious!" }
  ];

  useEffect(() => {
    const timer = setInterval(() => setIndex(prev => (prev + 1) % reviews.length), 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section id="reviews" className="py-32 px-6 bg-white/[0.02] relative overflow-hidden">
      <div className="max-w-7xl mx-auto flex flex-col items-center">
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInUp}
          className="text-center mb-20"
        >
          <h2 className="text-5xl font-serif font-bold mb-6">{t.reviews.title}</h2>
          <div className="flex items-center justify-center gap-4 text-amber-500 mb-4">
             <div className="flex"><Star fill="currentColor" size={24}/><Star fill="currentColor" size={24}/><Star fill="currentColor" size={24}/><Star fill="currentColor" size={24}/><Star fill="currentColor" size={24}/></div>
             <span className="text-2xl font-bold text-white">4.9 / 5</span>
          </div>
          <p className="text-white/40 uppercase tracking-widest text-xs font-bold">102+ Real Customer Reviews</p>
        </motion.div>

        <div className="w-full max-w-4xl relative min-h-[300px] flex items-center justify-center">
          <AnimatePresence mode="wait">
            <motion.div 
              key={index}
              initial={{ opacity: 0, x: 50, filter: 'blur(10px)' }}
              animate={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
              exit={{ opacity: 0, x: -50, filter: 'blur(10px)' }}
              transition={{ duration: 0.6, ease: 'easeInOut' }}
              className="text-center px-8"
            >
              <div className="text-4xl md:text-6xl font-serif text-white/10 absolute top-0 left-0 leading-none">“</div>
              <p className="text-2xl md:text-4xl font-serif font-light leading-relaxed mb-8 italic">"{reviews[index].text}"</p>
              <div className="flex items-center justify-center gap-4">
                <div className="w-12 h-12 rounded-full bg-amber-500 flex items-center justify-center font-bold text-black">{reviews[index].name[0]}</div>
                <div className="text-left">
                  <p className="font-bold text-white">{reviews[index].name}</p>
                  <p className="text-xs uppercase tracking-widest text-white/40 font-bold">Verified Customer</p>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="flex gap-4 mt-12">
          {reviews.map((_, i) => (
            <button key={i} onClick={() => setIndex(i)} className={`w-3 h-3 rounded-full transition-all ${index === i ? 'bg-amber-500 w-8' : 'bg-white/10'}`} />
          ))}
        </div>
        
        <motion.a 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          href="https://www.google.com/search?q=Spoonz+Rolled+Ice+Cream+Gulf+Shores+reviews" 
          target="_blank" 
          className="mt-20 inline-flex items-center gap-3 text-amber-500 font-bold uppercase tracking-widest text-sm hover:translate-y-[-2px] transition-all"
        >
          Leave a review on Google <ExternalLink size={18} />
        </motion.a>
      </div>
    </section>
  );
};

const TrustStrip = () => {
  const reviews = [
    "Best ice cream ever",
    "Owners are the sweetest",
    "Extremely clean place",
    "Endless flavor combinations",
    "A vacation highlight",
    "Family-owned & friendly",
    "Fresh rolls made right in front of you"
  ];
  
  return (
    <div className="bg-amber-500 py-6 overflow-hidden flex whitespace-nowrap border-y border-black/5">
      <motion.div 
        animate={{ x: [0, -1000] }}
        transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
        className="flex items-center gap-20 pr-20"
      >
        {[...reviews, ...reviews].map((r, i) => (
          <div key={i} className="flex items-center gap-4">
            <span className="text-black font-bold uppercase tracking-[0.2em] text-sm">{r}</span>
            <div className="w-2 h-2 rounded-full bg-black/20" />
          </div>
        ))}
      </motion.div>
    </div>
  );
};

const Awards = () => {
  const { t } = useLanguage();
  return (
    <section className="py-32 px-6">
      <div className="max-w-7xl mx-auto">
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInUp}
          className="text-center mb-20"
        >
          <h2 className="text-5xl font-serif font-bold mb-6">
            {t.awards.title}
          </h2>
          <p className="text-white/50 max-w-2xl mx-auto">{t.awards.subtitle}</p>
        </motion.div>

        <motion.div 
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid md:grid-cols-3 gap-8"
        >
          {[2024, 2025, 2026].map((year, idx) => (
            <motion.div
              key={year}
              variants={fadeInUp}
              className="group relative p-12 rounded-[2rem] border border-white/5 bg-white/5 hover:bg-white/10 transition-all text-center overflow-hidden"
            >
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-amber-500 to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-700" />
              <div className="bg-amber-500/10 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-8 group-hover:scale-110 transition-transform">
                <Trophy className="text-amber-500" size={40} />
              </div>
              <h3 className="text-3xl font-serif font-bold mb-4">{year} Winner</h3>
              <p className="text-amber-500/80 uppercase tracking-widest text-xs font-bold mb-6">Best Ice Cream in Baldwin County</p>
              <div className="flex justify-center text-amber-500/40"><Star fill="currentColor" size={16}/><Star fill="currentColor" size={16}/><Star fill="currentColor" size={16}/><Star fill="currentColor" size={16}/><Star fill="currentColor" size={16}/></div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

const CustomBuilder = () => {
  const { t } = useLanguage();
  const [step, setStep] = useState(0);
  const [selection, setSelection] = useState({
    base: '',
    mixins: [] as string[],
    drizzle: '',
    toppings: [] as string[]
  });

  const options = {
    base: ['Vanilla', 'Chocolate', 'Strawberry', 'Matcha (Seasonal)'],
    mixins: ['Oreo', 'Cheesecake', 'Strawberry', 'Brownie', 'Cookie Dough', 'Pecans', 'PB Cups'],
    drizzle: ['Hot Fudge', 'Caramel', 'Strawberry Sauce', 'Condensed Milk'],
    toppings: ['Whipped Cream', 'Sprinkles', 'Extra Fruit', 'Marshmallows', 'Cherries']
  };

  const currentOptions = step === 0 ? options.base : step === 1 ? options.mixins : step === 2 ? options.drizzle : options.toppings;
  
  const toggleSelect = (val: string) => {
    if (step === 0) setSelection({ ...selection, base: val });
    else if (step === 1) {
      setSelection({
        ...selection,
        mixins: selection.mixins.includes(val) 
          ? selection.mixins.filter(i => i !== val) 
          : [...selection.mixins, val]
      });
    } else if (step === 2) setSelection({ ...selection, drizzle: val });
    else if (step === 3) {
      setSelection({
        ...selection,
        toppings: selection.toppings.includes(val) 
          ? selection.toppings.filter(i => i !== val) 
          : [...selection.toppings, val]
      });
    }
  };

  const calculateScore = () => {
    let score = 0;
    if (selection.base) score += 25;
    if (selection.mixins.length > 0) score += 25;
    if (selection.drizzle) score += 25;
    if (selection.toppings.length > 0) score += 25;
    return score;
  };

  return (
    <section id="builder" className="py-32 px-6 bg-[#0e0e14] relative overflow-hidden">
      <div className="absolute top-0 right-0 w-96 h-96 bg-amber-500/5 blur-[100px] rounded-full" />
      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInUp}
          className="text-center mb-20"
        >
          <h2 className="text-5xl font-serif font-bold mb-6">{t.builder.title}</h2>
          <p className="text-white/50 max-w-2xl mx-auto">{t.builder.subtitle}</p>
        </motion.div>

        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={scaleIn}
          className="grid lg:grid-cols-[1fr,400px] gap-12"
        >
          <div className="bg-white/5 border border-white/10 p-10 rounded-[3rem] backdrop-blur-sm">
            <div className="flex justify-between items-center mb-12 overflow-x-auto gap-4">
              {t.builder.steps.map((s: string, i: number) => (
                <div key={s} className="flex flex-col items-center gap-2 group cursor-pointer shrink-0" onClick={() => setStep(i)}>
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center border-2 transition-all ${step >= i ? 'bg-amber-500 border-amber-500 text-black' : 'border-white/20 text-white/40'}`}>
                    {step > i ? <CheckCircle size={20} /> : i + 1}
                  </div>
                  <span className={`text-[10px] uppercase tracking-widest font-bold ${step === i ? 'text-amber-500' : 'text-white/30'}`}>{s}</span>
                </div>
              ))}
            </div>

            <div className="min-h-[300px]">
              <h3 className="text-2xl font-serif mb-8">{t.builder.steps[step]}</h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                {currentOptions.map(opt => {
                  const isSelected = step === 0 ? selection.base === opt : step === 1 ? selection.mixins.includes(opt) : step === 2 ? selection.drizzle === opt : selection.toppings.includes(opt);
                  return (
                    <button 
                      key={opt}
                      onClick={() => toggleSelect(opt)}
                      className={`p-6 rounded-2xl border text-sm font-bold transition-all ${isSelected ? 'bg-amber-500 border-amber-500 text-black' : 'bg-white/5 border-white/10 text-white/60 hover:border-amber-500/50'}`}
                    >
                      {opt}
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="flex justify-between items-center mt-12 border-t border-white/5 pt-8">
              <button disabled={step === 0} onClick={() => setStep(step - 1)} className="px-8 py-3 rounded-full font-bold text-white/60 hover:text-white disabled:opacity-0 transition-opacity">Back</button>
              <button onClick={() => step === 3 ? null : setStep(step + 1)} className="px-10 py-4 rounded-full bg-amber-500 text-black font-bold hover:bg-amber-400 transition-all">
                {step === 3 ? 'Review Creation' : 'Next Step'}
              </button>
            </div>
          </div>

          <div className="flex flex-col gap-6">
            <div className="bg-[#1a1a1f] border border-white/10 p-8 rounded-[3rem] relative overflow-hidden h-full">
              <div className="absolute top-0 right-0 p-4 opacity-10"><Plus size={100} /></div>
              <h3 className="text-xl font-serif font-bold mb-8">Your Creation</h3>
              
              <div className="space-y-6 mb-12">
                <div className="flex justify-between items-center border-b border-white/5 pb-2">
                  <span className="text-xs uppercase tracking-widest text-white/40">Base</span>
                  <span className="font-bold text-amber-500">{selection.base || '---'}</span>
                </div>
                <div className="flex flex-col gap-2">
                  <span className="text-xs uppercase tracking-widest text-white/40">Mix-ins</span>
                  <div className="flex flex-wrap gap-2">
                    {selection.mixins.length > 0 ? selection.mixins.map(m => <span key={m} className="bg-white/5 px-3 py-1 rounded-full text-[10px] font-bold text-white">{m}</span>) : <span className="text-white/20 italic text-sm">None</span>}
                  </div>
                </div>
                <div className="flex justify-between items-center border-b border-white/5 pb-2">
                  <span className="text-xs uppercase tracking-widest text-white/40">Drizzle</span>
                  <span className="font-bold text-amber-500">{selection.drizzle || '---'}</span>
                </div>
                <div className="flex flex-col gap-2">
                  <span className="text-xs uppercase tracking-widest text-white/40">Toppings</span>
                  <div className="flex flex-wrap gap-2">
                    {selection.toppings.length > 0 ? selection.toppings.map(t => <span key={t} className="bg-white/5 px-3 py-1 rounded-full text-[10px] font-bold text-white">{t}</span>) : <span className="text-white/20 italic text-sm">None</span>}
                  </div>
                </div>
              </div>

              <div className="mt-auto">
                <div className="flex justify-between items-end mb-2">
                  <span className="text-xs uppercase tracking-widest text-white/40">{t.builder.score}</span>
                  <span className="text-3xl font-serif font-bold text-amber-500">{calculateScore()}%</span>
                </div>
                <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden">
                  <motion.div initial={{ width: 0 }} animate={{ width: `${calculateScore()}%` }} className="h-full bg-amber-500 shadow-[0_0_20px_rgba(245,158,11,0.5)]" />
                </div>
              </div>
            </div>

            <button 
              onClick={() => {
                const text = `${t.builder.shareMsg} ${selection.base} with ${selection.mixins.join(', ')}`;
                navigator.clipboard.writeText(text);
                alert('Combo copied to clipboard!');
              }}
              className="w-full py-5 rounded-3xl bg-white text-black font-bold hover:bg-amber-50 transition-all flex items-center justify-center gap-2"
            >
              <Instagram size={20} /> {t.builder.share}
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

const Location = () => {
  const { t } = useLanguage();
  return (
    <section id="location" className="py-32 px-6 bg-[#0b0b0f] relative">
      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInUp}
        >
          <div className="inline-flex items-center gap-2 bg-rose-500/10 border border-rose-500/20 px-4 py-2 rounded-full mb-8">
            <span className="w-2 h-2 rounded-full bg-rose-500" />
            <span className="text-[10px] font-bold uppercase tracking-widest text-rose-500">{t.hero.badge}</span>
          </div>
          <h2 className="text-5xl font-serif font-bold mb-8">Visit Us in Gulf Shores</h2>
          
          <div className="flex gap-12 mb-12 border-b border-white/5 pb-8">
            <div>
              <span className="block text-4xl font-serif font-bold text-amber-500">
                <AnimatedCounter value={4.9} decimals={1} />
              </span>
              <span className="text-[10px] uppercase tracking-widest text-white/40 font-bold">Google Rating</span>
            </div>
            <div>
              <span className="block text-4xl font-serif font-bold text-amber-500">
                <AnimatedCounter value={102} suffix="+" />
              </span>
              <span className="text-[10px] uppercase tracking-widest text-white/40 font-bold">Total Reviews</span>
            </div>
          </div>

          <div className="space-y-8 mb-12">
            <div className="flex gap-6">
              <div className="w-12 h-12 bg-white/5 rounded-2xl flex items-center justify-center border border-white/10"><MapPin className="text-amber-500" /></div>
              <div>
                <p className="text-white font-bold text-lg">1544 Gulf Shores Pkwy</p>
                <p className="text-white/50">Gulf Shores, AL 36542, USA</p>
              </div>
            </div>
            <div className="flex gap-6">
              <div className="w-12 h-12 bg-white/5 rounded-2xl flex items-center justify-center border border-white/10"><Phone className="text-amber-500" /></div>
              <div>
                <p className="text-white font-bold text-lg">+1 256-736-4021</p>
                <p className="text-white/50">Available for questions & catering</p>
              </div>
            </div>
          </div>
          <div className="flex flex-wrap gap-4">
            <a href="tel:+12567364021" className="bg-amber-500 text-black px-10 py-5 rounded-full font-bold text-lg flex items-center gap-3 hover:scale-105 transition-transform">
              <Phone size={20} /> {t.nav.call}
            </a>
            <a href="https://maps.google.com/?q=1544+Gulf+Shores+Pkwy,+Gulf+Shores,+AL+36542" target="_blank" className="bg-white/5 border border-white/10 text-white px-10 py-5 rounded-full font-bold text-lg flex items-center gap-3 hover:scale-105 transition-transform">
              <ExternalLink size={20} /> {t.nav.directions}
            </a>
          </div>
          <div className="mt-12 bg-amber-500/5 p-8 rounded-3xl border border-amber-500/10">
            <h4 className="font-serif font-bold text-xl mb-2 text-amber-500">Vacation Tip</h4>
            <p className="text-white/60 text-sm">The best time to visit is right after sunset. The shop vibes are amazing and it's the perfect treat after a day at the beach!</p>
          </div>
        </motion.div>

        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={scaleIn}
          className="relative group"
        >
          <div className="absolute -inset-1 bg-gradient-to-tr from-amber-500/20 to-transparent rounded-[2rem] blur opacity-50" />
          <div className="relative h-[600px] w-full bg-[#1a1a1f] rounded-[2rem] border border-white/10 shadow-2xl overflow-hidden">
            <iframe 
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3448.513337229987!2d-87.6888258!3d30.2508492!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x889a059728b79f67%3A0x7d6c54c0e6435f30!2s1544%20Gulf%20Shores%20Pkwy%2C%20Gulf%20Shores%2C%20AL%2036542%2C%20USA!5e0!3m2!1sen!2sbr!4v1700000000000!5m2!1sen!2sbr" 
              width="100%" 
              height="100%" 
              style={{ border: 0, filter: 'invert(90%) hue-rotate(180deg)' }} 
              allowFullScreen={true} 
              loading="lazy" 
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
};

const FAQ = () => {
  const { t } = useLanguage();
  const [open, setOpen] = useState(0);
  const questions = [
    { q: "What is rolled ice cream?", a: "It's a Thai-inspired dessert where liquid ice cream base is poured onto a freezing cold plate, mixed with your choice of ingredients, then scraped into beautiful rolls right in front of you." },
    { q: "Can I customize flavors?", a: "Absolutely! That's what we're known for. You can choose your base and mix in anything from fresh fruit to cookies and candy." },
    { q: "Are there dairy-free options?", a: "Yes, we regularly offer seasonal dairy-free bases. Please ask our staff about the current daily options!" },
    { q: "How do you handle allergies?", a: "We take allergies very seriously. We clean our equipment thoroughly between rolls, but please inform us of any severe allergies before ordering." },
    { q: "Are portions shareable?", a: "Yes, our portions are quite generous! Many couples and families find one cup perfectly shareable, especially with extra toppings." }
  ];

  return (
    <section id="faq" className="py-32 px-6">
      <div className="max-w-3xl mx-auto">
        <motion.h2 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInUp}
          className="text-5xl font-serif font-bold mb-16 text-center"
        >
          Frequently Asked Questions
        </motion.h2>
        <motion.div 
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="space-y-4"
        >
          {questions.map((q, i) => (
            <motion.div key={i} variants={fadeInUp} className={`border border-white/10 rounded-[2rem] overflow-hidden transition-all ${open === i ? 'bg-white/5' : 'hover:bg-white/[0.02]'}`}>
              <button onClick={() => setOpen(open === i ? -1 : i)} className="w-full p-8 flex justify-between items-center text-left">
                <span className="text-xl font-bold">{q.q}</span>
                <div className={`transition-transform duration-500 ${open === i ? 'rotate-180' : ''}`}><ChevronDown size={24} /></div>
              </button>
              <AnimatePresence>
                {open === i && (
                  <motion.div initial={{ height: 0 }} animate={{ height: 'auto' }} exit={{ height: 0 }} className="overflow-hidden">
                    <p className="p-8 pt-0 text-white/50 leading-relaxed font-light">{q.a}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

const FinalCTA = () => {
  const { lenis } = useLanguage();
  return (
    <section className="py-40 px-6 relative overflow-hidden">
       <div className="absolute inset-0 z-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120vw] h-[120vw] bg-gradient-to-tr from-rose-500/10 via-amber-500/10 to-transparent rounded-full blur-[150px]" />
      </div>

      <div className="max-w-5xl mx-auto text-center relative z-10">
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={scaleIn}
        >
          <h2 className="text-6xl md:text-9xl font-serif font-bold mb-8 tracking-tight">Make Tonight a Spoonz Night.</h2>
          <p className="text-2xl text-white/50 mb-12 font-light">A Gulf Shores favorite for families, visitors, and locals — rolled fresh, served happy.</p>
          <div className="flex flex-wrap justify-center gap-6 mb-20">
            <button 
              onClick={() => lenis?.scrollTo('#location')}
              className="bg-amber-500 text-black px-12 py-6 rounded-full font-bold text-xl hover:bg-amber-400 transition-all flex items-center gap-3 shadow-2xl shadow-amber-500/20"
            >
              Get Directions <ArrowRight />
            </button>
            <a href="tel:+12567364021" className="bg-white/5 border border-white/10 text-white px-12 py-6 rounded-full font-bold text-xl hover:bg-white/10 transition-all">
              Call Now
            </a>
          </div>

          <div className="flex flex-wrap justify-center gap-12 border-t border-white/10 pt-12">
            <div className="text-center">
              <span className="block text-4xl font-serif font-bold text-amber-500">
                <AnimatedCounter value={4.9} decimals={1} />
              </span>
              <span className="text-xs uppercase tracking-[0.2em] text-white/40 font-bold">Google Rating</span>
            </div>
            <div className="text-center">
              <span className="block text-4xl font-serif font-bold text-amber-500">
                <AnimatedCounter value={102} suffix="+" />
              </span>
              <span className="text-xs uppercase tracking-[0.2em] text-white/40 font-bold">Reviews</span>
            </div>
            <div className="text-center">
              <span className="block text-4xl font-serif font-bold text-amber-500">100%</span>
              <span className="text-xs uppercase tracking-[0.2em] text-white/40 font-bold">Family Owned</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

const Footer = () => {
  const { t, lenis } = useLanguage();
  return (
    <footer className="py-20 px-6 border-t border-white/5 bg-[#0b0b0f]">
      <div className="max-w-7xl mx-auto flex flex-col items-center">
        <div className="flex flex-col items-center mb-12 cursor-pointer" onClick={() => lenis?.scrollTo(0)}>
          <span className="text-4xl font-serif font-bold tracking-tight text-white mb-2">Spoonz</span>
          <span className="text-[10px] uppercase tracking-[0.4em] text-amber-500 font-bold">Rolled Ice Cream</span>
        </div>

        <div className="flex gap-8 mb-12">
          <a href="#" className="w-12 h-12 bg-white/5 rounded-full flex items-center justify-center text-white/60 hover:text-amber-500 hover:bg-amber-500/10 transition-all border border-white/10"><Instagram size={20} /></a>
          <a href="#" className="w-12 h-12 bg-white/5 rounded-full flex items-center justify-center text-white/60 hover:text-amber-500 hover:bg-amber-500/10 transition-all border border-white/10"><Facebook size={20} /></a>
          <a href="#" className="w-12 h-12 bg-white/5 rounded-full flex items-center justify-center text-white/60 hover:text-amber-500 hover:bg-amber-500/10 transition-all border border-white/10"><Star size={20} /></a>
        </div>

        <div className="text-center">
          <p className="text-white/40 text-sm mb-4">1544 Gulf Shores Pkwy, Gulf Shores, AL 36542</p>
          <div className="text-white/40 text-[11px] uppercase tracking-widest font-bold">
            © 2026 Spoonz Rolled Ice Cream. {t.footer.rights}
          </div>
          <div className="mt-8 text-white/30 text-sm font-medium tracking-wide">
             {t.footer.designed}{' '}
             <a 
               href="https://gustavo-goedert-hcac.vercel.app/" 
               target="_blank" 
               rel="noopener noreferrer"
               className="text-amber-500 underline decoration-amber-500/30 underline-offset-4 hover:decoration-amber-500 transition-all font-bold"
             >
               Gustavo Goedert Graphic Designer
             </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default function App() {
  const [lang, setLang] = useState<Language>('EN');
  const [lenisInstance, setLenisInstance] = useState<Lenis | null>(null);

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2,
      infinite: false,
    });

    setLenisInstance(lenis);

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  const value = {
    lang,
    setLang,
    t: translations[lang],
    lenis: lenisInstance
  };

  return (
    <LanguageContext.Provider value={value}>
      <div className="relative selection:bg-amber-500 selection:text-black cursor-none">
        <div className="fixed inset-0 noise-bg z-[200] opacity-5 pointer-events-none" />
        <CursorGlow />
        <ScrollProgress />
        <Navbar />
        <main>
          <Hero />
          <TrustStrip />
          
          <Awards />
          
          <FeaturedMenu />
          
          <HowItWorks />
          
          <CustomBuilder />
          
          <section id="story" className="py-32 px-6">
            <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-20 items-center">
              <motion.div 
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={scaleIn}
                className="relative group"
              >
                 <div className="absolute -inset-4 bg-amber-500/10 rounded-[3rem] blur-2xl opacity-0 group-hover:opacity-100 transition-opacity" />
                 <img src="https://images.unsplash.com/photo-1551024506-0bccd828d307?auto=format&fit=crop&q=80&w=1200" className="relative rounded-[3rem] shadow-2xl" alt="Family Shop" />
                 <motion.div 
                   variants={fadeInUp}
                   className="absolute bottom-8 right-8 bg-white/10 backdrop-blur-xl p-8 rounded-[2rem] border border-white/20"
                 >
                    <p className="text-2xl font-serif italic font-bold">"{translations[lang].about.quote}"</p>
                 </motion.div>
              </motion.div>
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeInUp}
              >
                <h2 className="text-5xl font-serif font-bold mb-8">{translations[lang].about.title}</h2>
                <div className="space-y-6 text-white/60 text-lg font-light leading-relaxed">
                  <p>Starting as a dream to bring something unique to the shores of Alabama, Spoonz has grown into a beloved community staple. We are more than just an ice cream shop; we are a destination for families to create lasting memories.</p>
                  <p>Our commitment to freshness means every base is made in-house, and every roll is crafted with care right before your eyes. Whether you are a local or just visiting on vacation, we treat you like family from the moment you walk in.</p>
                </div>
                <div className="mt-12 flex flex-wrap gap-8 border-t border-white/10 pt-12">
                   <div className="flex flex-col gap-2">
                      <ShieldCheck className="text-amber-500" size={32} />
                      <span className="font-bold text-white tracking-widest uppercase text-[10px]">Allergy Safety</span>
                   </div>
                   <div className="flex flex-col gap-2">
                      <Star className="text-amber-500" size={32} />
                      <span className="font-bold text-white tracking-widest uppercase text-[10px]">Premium Ingredients</span>
                   </div>
                   <div className="flex flex-col gap-2">
                      <Phone className="text-amber-500" size={32} />
                      <span className="font-bold text-white tracking-widest uppercase text-[10px]">Personal Service</span>
                   </div>
                </div>
              </motion.div>
            </div>
          </section>

          <AllergySection />
          
          <Gallery />
          
          <ReviewsCarousel />
          
          <Location />
          
          <FAQ />
          
          <FinalCTA />
        </main>
        <Footer />
      </div>
    </LanguageContext.Provider>
  );
}
