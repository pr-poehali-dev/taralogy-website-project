import { useEffect, useState } from "react";
import Icon from "@/components/ui/icon";

// ── Star field ────────────────────────────────────────────────────────────────
const StarField = () => {
  const stars = Array.from({ length: 120 }, (_, i) => ({
    id: i,
    top: Math.random() * 100,
    left: Math.random() * 100,
    size: Math.random() * 2.5 + 0.5,
    delay: Math.random() * 6,
    duration: Math.random() * 4 + 3,
  }));
  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {stars.map((s) => (
        <div
          key={s.id}
          className="star animate-twinkle"
          style={{
            top: `${s.top}%`,
            left: `${s.left}%`,
            width: s.size,
            height: s.size,
            animationDelay: `${s.delay}s`,
            animationDuration: `${s.duration}s`,
            opacity: 0.4,
          }}
        />
      ))}
    </div>
  );
};

// ── Nav ───────────────────────────────────────────────────────────────────────
const Nav = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", h);
    return () => window.removeEventListener("scroll", h);
  }, []);
  const links = [
    { label: "Услуги", href: "#services" },
    { label: "О практике", href: "#about" },
    { label: "Отзывы", href: "#reviews" },
    { label: "Контакты", href: "#contacts" },
  ];
  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled ? "nav-blur py-3" : "py-5"}`}>
      <div className="max-w-6xl mx-auto px-6 flex items-center justify-between">
        <a href="#hero" className="font-cormorant text-xl font-light tracking-[0.2em] gold-text uppercase">
          Таро & Судьба
        </a>
        <div className="hidden md:flex items-center gap-8">
          {links.map((l) => (
            <a key={l.href} href={l.href}
              className="font-golos text-sm tracking-widest uppercase text-foreground/60 hover:text-gold transition-colors duration-300">
              {l.label}
            </a>
          ))}
          <a href="#contacts"
            className="font-golos text-sm px-5 py-2 border border-gold/40 text-gold hover:bg-gold hover:text-background transition-all duration-300 rounded-sm tracking-widest uppercase">
            Записаться
          </a>
        </div>
        <button className="md:hidden text-gold" onClick={() => setMenuOpen(!menuOpen)}>
          <Icon name={menuOpen ? "X" : "Menu"} size={22} />
        </button>
      </div>
      {menuOpen && (
        <div className="md:hidden nav-blur border-t border-gold/10 px-6 py-6 flex flex-col gap-5">
          {links.map((l) => (
            <a key={l.href} href={l.href} onClick={() => setMenuOpen(false)}
              className="font-golos text-sm tracking-widest uppercase text-foreground/60 hover:text-gold transition-colors">
              {l.label}
            </a>
          ))}
          <a href="#contacts" onClick={() => setMenuOpen(false)}
            className="font-golos text-sm px-5 py-2 border border-gold/40 text-gold text-center tracking-widest uppercase">
            Записаться
          </a>
        </div>
      )}
    </nav>
  );
};

// ── Divider ───────────────────────────────────────────────────────────────────
const Divider = () => (
  <div className="flex items-center gap-4 my-4">
    <div className="flex-1 divider-line" />
    <span className="text-gold/50 text-lg">✦</span>
    <div className="flex-1 divider-line" />
  </div>
);

// ── Hero ──────────────────────────────────────────────────────────────────────
const Hero = () => (
  <section id="hero" className="relative min-h-screen hero-gradient flex items-center justify-center overflow-hidden">
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full opacity-10 pointer-events-none"
      style={{ background: "radial-gradient(circle, hsl(270,50%,55%) 0%, transparent 70%)" }} />
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] animate-spin-slow opacity-5 pointer-events-none select-none">
      <svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
        {[0, 30, 60, 90, 120, 150].map((deg) => (
          <g key={deg} transform={`rotate(${deg} 100 100)`}>
            <ellipse cx="100" cy="100" rx="80" ry="20" stroke="hsl(45,70%,60%)" strokeWidth="0.5" />
          </g>
        ))}
        <circle cx="100" cy="100" r="8" stroke="hsl(45,70%,60%)" strokeWidth="0.8" />
        <circle cx="100" cy="100" r="60" stroke="hsl(270,50%,55%)" strokeWidth="0.4" strokeDasharray="4 6" />
        <circle cx="100" cy="100" r="80" stroke="hsl(45,70%,60%)" strokeWidth="0.3" strokeDasharray="2 10" />
      </svg>
    </div>
    <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
      <p className="font-golos text-xs tracking-[0.4em] uppercase text-gold/60 mb-6 animate-fade-in" style={{ animationDelay: "0.2s", opacity: 0 }}>
        ✦ &nbsp; Древнее искусство &nbsp; ✦
      </p>
      <h1 className="font-cormorant text-6xl md:text-8xl lg:text-9xl font-light leading-none mb-6 animate-fade-in-up" style={{ animationDelay: "0.4s", opacity: 0 }}>
        <span className="animate-shimmer">Таро</span>
        <br />
        <span className="text-foreground/80 italic font-light">& судьба</span>
      </h1>
      <p className="font-cormorant text-xl md:text-2xl text-foreground/60 italic mb-10 leading-relaxed animate-fade-in" style={{ animationDelay: "0.8s", opacity: 0 }}>
        Послания звёзд, расшифрованные в картах —<br />
        путь к пониманию себя и своего предназначения
      </p>
      <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in" style={{ animationDelay: "1.1s", opacity: 0 }}>
        <a href="#services"
          className="animate-pulse-glow font-golos tracking-widest uppercase text-sm px-8 py-4 bg-gold text-background hover:bg-gold/90 transition-all duration-300 rounded-sm">
          Узнать больше
        </a>
        <a href="#contacts"
          className="font-golos tracking-widest uppercase text-sm px-8 py-4 border border-gold/40 text-gold hover:border-gold hover:bg-gold/10 transition-all duration-300 rounded-sm">
          Записаться на сеанс
        </a>
      </div>
      <div className="mt-16 flex justify-center gap-10 text-center animate-fade-in" style={{ animationDelay: "1.4s", opacity: 0 }}>
        {[
          { num: "7+", label: "лет практики" },
          { num: "500+", label: "консультаций" },
          { num: "98%", label: "точность" },
        ].map((s) => (
          <div key={s.label}>
            <div className="font-cormorant text-3xl gold-text font-light">{s.num}</div>
            <div className="font-golos text-xs text-foreground/40 tracking-widest uppercase mt-1">{s.label}</div>
          </div>
        ))}
      </div>
    </div>
    <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-float">
      <span className="font-golos text-xs tracking-widest uppercase text-foreground/30">Прокрутите</span>
      <Icon name="ChevronDown" size={16} className="text-gold/40" />
    </div>
  </section>
);

// ── Services ──────────────────────────────────────────────────────────────────
const services = [
  { icon: "🃏", title: "Расклад на отношения", desc: "Глубокое исследование вашей любовной ситуации. Прошлое, настоящее и потенциал развития.", price: "от 2 500 ₽", duration: "60–90 мин" },
  { icon: "⭐", title: "Расклад на год", desc: "Полная карта предстоящего года по месяцам. Ключевые события, возможности и предостережения.", price: "от 3 500 ₽", duration: "90 мин" },
  { icon: "💼", title: "Карьера и деньги", desc: "Прогноз финансового пути, карьерные развилки, скрытые блоки и ресурсы для роста.", price: "от 2 000 ₽", duration: "60 мин" },
  { icon: "🔮", title: "Общий расклад", desc: "Общая картина жизни на ближайшие 3 месяца: здоровье, отношения, работа, рост.", price: "от 1 500 ₽", duration: "45 мин" },
  { icon: "🌙", title: "Ответ на вопрос", desc: "Конкретный ответ на один важный вопрос с детальным разбором и рекомендациями.", price: "от 1 000 ₽", duration: "30 мин" },
  { icon: "✨", title: "Самопознание", desc: "Кто вы на самом деле? Ваши истинные таланты, миссия и блоки, мешающие раскрыться.", price: "от 2 500 ₽", duration: "75 мин" },
];

const Services = () => (
  <section id="services" className="relative py-28 px-6 section-gradient">
    <div className="max-w-6xl mx-auto">
      <div className="text-center mb-16">
        <p className="font-golos text-xs tracking-[0.4em] uppercase text-gold/50 mb-4">✦ Чем могу помочь ✦</p>
        <h2 className="font-cormorant text-5xl md:text-6xl font-light text-foreground">Услуги</h2>
        <Divider />
        <p className="font-cormorant text-xl text-foreground/50 italic mt-4 max-w-xl mx-auto">
          Каждый сеанс — это уникальный диалог с вашей судьбой
        </p>
      </div>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {services.map((s) => (
          <div key={s.title} className="mystical-card rounded-sm p-7 flex flex-col gap-4">
            <span className="text-3xl">{s.icon}</span>
            <h3 className="font-cormorant text-xl font-medium text-foreground">{s.title}</h3>
            <p className="font-golos text-sm text-foreground/50 leading-relaxed flex-1">{s.desc}</p>
            <div className="divider-line" />
            <div className="flex items-center justify-between">
              <span className="font-cormorant text-lg gold-text font-light">{s.price}</span>
              <span className="font-golos text-xs text-foreground/35 tracking-wider">{s.duration}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

// ── About ─────────────────────────────────────────────────────────────────────
const About = () => (
  <section id="about" className="relative py-28 px-6 overflow-hidden" style={{ background: "hsl(240,20%,4%)" }}>
    <div className="absolute right-0 top-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full opacity-5 pointer-events-none"
      style={{ background: "radial-gradient(circle, hsl(45,70%,60%) 0%, transparent 70%)" }} />
    <div className="max-w-6xl mx-auto">
      <div className="grid md:grid-cols-2 gap-16 items-center">
        <div className="relative flex justify-center">
          <div className="relative w-64 h-96 rounded-sm gold-border overflow-hidden animate-float"
            style={{ background: "linear-gradient(135deg, hsl(270,30%,10%), hsl(240,20%,7%))" }}>
            <div className="absolute inset-3 border border-gold/20 rounded-sm" />
            <div className="absolute inset-6 border border-amethyst/20 rounded-sm" />
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 p-6">
              <div className="text-6xl opacity-60">🌙</div>
              <div className="divider-line w-full" />
              <p className="font-cormorant text-center text-sm text-gold/60 italic leading-relaxed">
                «Звёзды не управляют нами — они освещают путь»
              </p>
              <div className="divider-line w-full" />
              <div className="text-3xl opacity-40">✦</div>
            </div>
            {["top-2 left-2", "top-2 right-2", "bottom-2 left-2", "bottom-2 right-2"].map((pos) => (
              <span key={pos} className={`absolute ${pos} text-gold/30 text-xs`}>✦</span>
            ))}
          </div>
          <div className="absolute -top-4 -right-4 w-24 h-36 rounded-sm opacity-40"
            style={{ background: "linear-gradient(135deg, hsl(270,30%,12%), hsl(240,20%,8%))", border: "1px solid hsla(45,70%,60%,0.2)", transform: "rotate(12deg)", animation: "float 7s ease-in-out infinite 1s" }}>
            <div className="h-full flex items-center justify-center text-2xl opacity-50">☽</div>
          </div>
          <div className="absolute -bottom-4 -left-4 w-20 h-32 rounded-sm opacity-30"
            style={{ background: "linear-gradient(135deg, hsl(270,30%,12%), hsl(240,20%,8%))", border: "1px solid hsla(45,70%,60%,0.15)", transform: "rotate(-8deg)", animation: "float 8s ease-in-out infinite 2s" }}>
            <div className="h-full flex items-center justify-center text-xl opacity-50">☆</div>
          </div>
        </div>
        <div>
          <p className="font-golos text-xs tracking-[0.4em] uppercase text-gold/50 mb-4">✦ Обо мне ✦</p>
          <h2 className="font-cormorant text-5xl font-light text-foreground mb-6 leading-tight">О практике</h2>
          <Divider />
          <div className="space-y-5 mt-8">
            <p className="font-cormorant text-xl text-foreground/75 italic leading-relaxed">
              Более семи лет я помогаю людям находить ответы на важные вопросы жизни через древнее искусство Таро.
            </p>
            <p className="font-golos text-sm text-foreground/55 leading-relaxed">
              Таро — это не предсказание будущего, а инструмент самопознания. Каждая карта — зеркало,
              отражающее ваши внутренние состояния, страхи и скрытые возможности.
            </p>
            <p className="font-golos text-sm text-foreground/55 leading-relaxed">
              Я провожу консультации онлайн и лично, создавая безопасное пространство для
              честного разговора о том, что вас действительно волнует.
            </p>
          </div>
          <div className="grid grid-cols-3 gap-4 mt-10">
            {[
              { icon: "🎓", text: "Сертифицированный таролог" },
              { icon: "🌍", text: "Консультирую онлайн" },
              { icon: "🔒", text: "Полная конфиденциальность" },
            ].map((item) => (
              <div key={item.text} className="text-center p-4 mystical-card rounded-sm">
                <div className="text-2xl mb-2">{item.icon}</div>
                <p className="font-golos text-xs text-foreground/50 leading-snug">{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  </section>
);

// ── Reviews ───────────────────────────────────────────────────────────────────
const reviews = [
  { name: "Мария К.", city: "Москва", stars: 5, text: "Поразительная точность! Расклад на год описал события, которые я никому не рассказывала. Особенно помогли рекомендации по карьере — через 2 месяца получила желанный оффер.", service: "Расклад на год" },
  { name: "Анна В.", city: "Санкт-Петербург", stars: 5, text: "Пришла с вопросом об отношениях, была скептически настроена. Ушла с полным пониманием ситуации и, главное, самой себя. Спасибо за деликатность и глубину!", service: "Расклад на отношения" },
  { name: "Елена Р.", city: "Екатеринбург", stars: 5, text: "Третий раз обращаюсь, и каждый раз уровень просто невероятный. Помогает увидеть то, что сам боишься заметить. Рекомендую всем, кто застрял на перепутье.", service: "Общий расклад" },
  { name: "Светлана М.", city: "Казань", stars: 5, text: "Очень точно описана моя ситуация с бизнесом. Расклад помог принять важное решение, которое откладывала год. Результат превзошёл все ожидания.", service: "Карьера и деньги" },
];

const Reviews = () => (
  <section id="reviews" className="relative py-28 px-6 section-gradient">
    <div className="max-w-6xl mx-auto">
      <div className="text-center mb-16">
        <p className="font-golos text-xs tracking-[0.4em] uppercase text-gold/50 mb-4">✦ Истории клиентов ✦</p>
        <h2 className="font-cormorant text-5xl md:text-6xl font-light text-foreground">Отзывы</h2>
        <Divider />
      </div>
      <div className="grid md:grid-cols-2 gap-6">
        {reviews.map((r) => (
          <div key={r.name} className="mystical-card rounded-sm p-7 flex flex-col gap-4">
            <div className="flex items-start justify-between">
              <div>
                <p className="font-cormorant text-lg text-foreground font-medium">{r.name}</p>
                <p className="font-golos text-xs text-foreground/40">{r.city}</p>
              </div>
              <div className="flex gap-0.5">
                {Array.from({ length: r.stars }).map((_, j) => (
                  <span key={j} className="text-gold text-sm">★</span>
                ))}
              </div>
            </div>
            <p className="font-cormorant text-base text-foreground/65 italic leading-relaxed flex-1">«{r.text}»</p>
            <div className="flex items-center gap-2">
              <span className="text-gold/30 text-xs">✦</span>
              <span className="font-golos text-xs text-gold/50 tracking-wider">{r.service}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

// ── Contacts ──────────────────────────────────────────────────────────────────
const Contacts = () => (
  <section id="contacts" className="relative py-28 px-6 overflow-hidden" style={{ background: "hsl(240,20%,4%)" }}>
    <div className="absolute left-1/2 -translate-x-1/2 bottom-0 w-[700px] h-[400px] opacity-10 pointer-events-none"
      style={{ background: "radial-gradient(ellipse, hsl(270,40%,20%) 0%, transparent 70%)" }} />
    <div className="max-w-2xl mx-auto relative z-10">
      <div className="text-center mb-12">
        <p className="font-golos text-xs tracking-[0.4em] uppercase text-gold/50 mb-4">✦ Начать путь ✦</p>
        <h2 className="font-cormorant text-5xl md:text-6xl font-light text-foreground">Контакты</h2>
        <Divider />
        <p className="font-cormorant text-xl text-foreground/50 italic mt-4">
          Напишите мне — и мы найдём удобное время для сеанса
        </p>
      </div>
      <div className="mystical-card rounded-sm p-8">
        <div className="space-y-5">
          <div>
            <label className="font-golos text-xs tracking-widest uppercase text-foreground/50 block mb-2">Ваше имя</label>
            <input type="text" placeholder="Как вас зовут?"
              className="w-full bg-transparent border border-gold/20 focus:border-gold/50 outline-none px-4 py-3 font-golos text-sm text-foreground placeholder:text-foreground/25 transition-colors rounded-sm" />
          </div>
          <div>
            <label className="font-golos text-xs tracking-widest uppercase text-foreground/50 block mb-2">Telegram / Телефон</label>
            <input type="text" placeholder="@username или +7 (000) 000-00-00"
              className="w-full bg-transparent border border-gold/20 focus:border-gold/50 outline-none px-4 py-3 font-golos text-sm text-foreground placeholder:text-foreground/25 transition-colors rounded-sm" />
          </div>
          <div>
            <label className="font-golos text-xs tracking-widest uppercase text-foreground/50 block mb-2">Интересующая услуга</label>
            <select className="w-full bg-card border border-gold/20 focus:border-gold/50 outline-none px-4 py-3 font-golos text-sm text-foreground/70 transition-colors rounded-sm">
              <option value="">Выберите услугу...</option>
              {services.map((s) => (
                <option key={s.title} value={s.title}>{s.title} — {s.price}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="font-golos text-xs tracking-widest uppercase text-foreground/50 block mb-2">Ваш вопрос</label>
            <textarea rows={4} placeholder="Расскажите кратко о своей ситуации..."
              className="w-full bg-transparent border border-gold/20 focus:border-gold/50 outline-none px-4 py-3 font-golos text-sm text-foreground placeholder:text-foreground/25 transition-colors rounded-sm resize-none" />
          </div>
          <button className="animate-pulse-glow w-full font-golos tracking-widest uppercase text-sm py-4 bg-gold text-background hover:bg-gold/90 transition-all duration-300 rounded-sm">
            Отправить заявку
          </button>
        </div>
      </div>
      <div className="flex flex-col sm:flex-row justify-center gap-6 mt-10 text-center">
        {[
          { icon: "Send", label: "Telegram", sub: "@tarotmaster" },
          { icon: "Instagram", label: "Instagram", sub: "@tarot.sudba" },
          { icon: "Phone", label: "WhatsApp", sub: "+7 (999) 000-00-00" },
        ].map((c) => (
          <div key={c.label} className="flex items-center gap-3 justify-center">
            <Icon name={c.icon} size={16} className="text-gold/60" />
            <div className="text-left">
              <p className="font-golos text-xs text-foreground/40 tracking-widest uppercase">{c.label}</p>
              <p className="font-golos text-sm text-foreground/70">{c.sub}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

// ── Footer ────────────────────────────────────────────────────────────────────
const Footer = () => (
  <footer className="py-10 px-6 border-t border-gold/10 text-center" style={{ background: "hsl(240,22%,3%)" }}>
    <p className="font-cormorant text-lg gold-text font-light tracking-widest">Таро & Судьба</p>
    <p className="font-golos text-xs text-foreground/25 mt-2 tracking-wider">
      © {new Date().getFullYear()} · Все права защищены · Для лиц 18+
    </p>
  </footer>
);

// ── Page ──────────────────────────────────────────────────────────────────────
export default function Index() {
  return (
    <div className="relative min-h-screen" style={{ background: "hsl(240,20%,4%)" }}>
      <StarField />
      <Nav />
      <Hero />
      <Services />
      <About />
      <Reviews />
      <Contacts />
      <Footer />
    </div>
  );
}
