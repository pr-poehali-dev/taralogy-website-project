import { useEffect, useState } from "react";
import Icon from "@/components/ui/icon";

// ─── PAYMENT URL ───────────────────────────────────────────────────────────────
const CREATE_PAYMENT_URL = "https://functions.poehali.dev/929e829c-3dc0-43c4-9a05-5ce4df837e89";

// ─── DATA ─────────────────────────────────────────────────────────────────────

const ARCANA = [
  { id: 0,  sym: "0",    name: "Шут",            emoji: "🃏", short: "Новое начало. Смелость шагнуть в неизвестность — ваш главный ресурс сейчас.", full: "Шут — карта чистого потенциала. Вы стоите на пороге нового этапа, и вселенная предлагает вам доверять интуиции. Страх и сомнения — лишь иллюзии. Главное предостережение: не игнорируйте мелочи. Аффирмация дня: «Я иду вперёд легко и с радостью»." },
  { id: 1,  sym: "I",    name: "Маг",             emoji: "🔮", short: "Все ресурсы у вас в руках. Действуйте — момент благоприятен.", full: "Маг символизирует мастерство и силу воли. У вас есть всё необходимое для реализации задуманного. Не ждите идеальных условий — они уже здесь. Предостережение: избегайте манипуляций. Аффирмация: «Я создаю свою реальность силой намерения»." },
  { id: 2,  sym: "II",   name: "Жрица",           emoji: "🌙", short: "Слушайте внутренний голос. Ответ уже есть внутри вас.", full: "Жрица хранит тайные знания и интуицию. Сейчас важнее не действовать, а слушать и наблюдать. Ваша интуиция на подъёме. Предостережение: не раскрывайте всё сразу. Аффирмация: «Моя интуиция — мой верный компас»." },
  { id: 3,  sym: "III",  name: "Императрица",     emoji: "🌸", short: "Время роста, изобилия и творчества. Позвольте себе расцвести.", full: "Императрица несёт энергию плодородия и красоты. В отношениях — тепло и забота. В финансах — рост. В творчестве — вдохновение. Предостережение: не зависайте в комфорте. Аффирмация: «Я достойна изобилия во всех его формах»." },
  { id: 4,  sym: "IV",   name: "Император",       emoji: "👑", short: "Пришло время взять контроль и построить прочный фундамент.", full: "Император — архетип порядка и стабильности. Вам нужна структура и чёткие правила. Возможна встреча с авторитетным человеком. Предостережение: не будьте слишком жёсткими. Аффирмация: «Я строю прочное и надёжное будущее»." },
  { id: 5,  sym: "V",    name: "Иерофант",        emoji: "⛪", short: "Обратитесь к традиции, наставнику или своим ценностям.", full: "Иерофант указывает на духовное наставничество и проверенные пути. Хороший момент для учёбы и получения совета от мудрого человека. Предостережение: не следуйте слепо. Аффирмация: «Я открыт мудрости и готов учиться»." },
  { id: 6,  sym: "VI",   name: "Влюблённые",      emoji: "💞", short: "Ключевой выбор в отношениях или ценностях. Следуйте сердцу.", full: "Влюблённые — карта союзов и важных решений. Не обязательно о романтике: возможен выбор жизненного пути. Предостережение: не позволяйте страсти затмевать разум. Аффирмация: «Я выбираю любовь и доверяю своему сердцу»." },
  { id: 7,  sym: "VII",  name: "Колесница",       emoji: "🏆", short: "Победа через дисциплину. Вы на верном пути — продолжайте.", full: "Колесница символизирует победу через упорство. Вы справляетесь с противоречиями и движетесь вперёд. Предостережение: не переусердствуйте с контролем. Аффирмация: «Я уверенно двигаюсь к своей цели»." },
  { id: 8,  sym: "VIII", name: "Сила",            emoji: "🦁", short: "Ваша внутренняя сила больше, чем кажется. Доверьтесь ей.", full: "Сила — не агрессия, а мягкое управление. Сейчас важна эмоциональная устойчивость и терпение. Предостережение: не подавляйте свои чувства. Аффирмация: «Моя мягкость — это сила, а не слабость»." },
  { id: 9,  sym: "IX",   name: "Отшельник",       emoji: "🕯️", short: "Время уединения и поиска внутреннего ответа.", full: "Отшельник призывает к размышлению. Ответы не снаружи — они внутри вас. Уйдите от суеты, прислушайтесь к себе. Предостережение: не изолируйтесь полностью. Аффирмация: «В тишине я нахожу своё истинное «я»»." },
  { id: 10, sym: "X",    name: "Колесо",          emoji: "☸️", short: "Судьба делает поворот. Будьте готовы к переменам.", full: "Колесо Фортуны напоминает: всё циклично. После трудного периода приходит лёгкость. Предостережение: не цепляйтесь за уходящее. Аффирмация: «Я принимаю перемены и доверяю течению жизни»." },
  { id: 11, sym: "XI",   name: "Справедливость",  emoji: "⚖️", short: "Взвесьте решение трезво. Справедливый исход неизбежен.", full: "Справедливость говорит о балансе и честности. Ваши действия вернутся к вам. Хороший момент для юридических и деловых вопросов. Предостережение: будьте объективны к себе. Аффирмация: «Я действую честно и получаю по заслугам»." },
  { id: 12, sym: "XII",  name: "Повешенный",      emoji: "🔄", short: "Пауза и смена угла зрения — вот что нужно сейчас.", full: "Повешенный предлагает отпустить контроль и посмотреть на ситуацию иначе. Иногда бездействие — лучшее действие. Предостережение: не сопротивляйтесь. Аффирмация: «Я отпускаю и позволяю жизни вести меня»." },
  { id: 13, sym: "XIII", name: "Смерть",          emoji: "🌑", short: "Конец одного цикла и рождение нового. Не бойтесь перемен.", full: "Смерть — карта трансформации, не буквальной гибели. Что-то заканчивается, чтобы освободить место для нового. Предостережение: не держитесь за прошлое. Аффирмация: «Я освобождаю прошлое и встречаю новое с открытым сердцем»." },
  { id: 14, sym: "XIV",  name: "Умеренность",     emoji: "🌊", short: "Баланс и терпение принесут лучший результат, чем спешка.", full: "Умеренность — карта гармонии и синтеза. Найдите золотую середину в своей ситуации. Предостережение: избегайте крайностей. Аффирмация: «Я нахожу баланс и иду своим ритмом»." },
  { id: 15, sym: "XV",   name: "Дьявол",          emoji: "🔗", short: "Обратите внимание на зависимости и страхи, которые вас держат.", full: "Дьявол указывает на ловушки — материальные, эмоциональные, ментальные. Вы сильнее своих страхов. Предостережение: честно признайте свои цепи. Аффирмация: «Я осознаю свои ограничения и освобождаюсь от них»." },
  { id: 16, sym: "XVI",  name: "Башня",           emoji: "⚡", short: "Внезапные перемены разрушают старое — чтобы построить лучшее.", full: "Башня — шоковая карта, но она освобождает от иллюзий. Кризис может стать лучшим, что случалось. Предостережение: не паникуйте. Аффирмация: «Разрушение старого открывает путь к истинному»." },
  { id: 17, sym: "XVII", name: "Звезда",          emoji: "⭐", short: "Надежда и вдохновение. После тьмы — свет.", full: "Звезда дарит надежду и исцеление. Вы на пути восстановления. Верьте в лучшее — оно приходит. Предостережение: не уходите в мечты, действуйте. Аффирмация: «Я верю в хорошее и притягиваю его»." },
  { id: 18, sym: "XVIII",name: "Луна",            emoji: "🌕", short: "Не всё видно. Доверяйте интуиции, а не видимости.", full: "Луна создаёт иллюзии и страхи. Сейчас что-то скрыто от вас. Доверяйте инстинктам. Предостережение: избегайте решений в состоянии тревоги. Аффирмация: «Я вижу сквозь иллюзии к истинной сути»." },
  { id: 19, sym: "XIX",  name: "Солнце",          emoji: "☀️", short: "Ясность, радость и успех. Всё идёт как надо.", full: "Солнце — одна из лучших карт. Радость, успех, ясность ситуации. Дети, творчество, победа. Предостережение: не расслабляйтесь преждевременно. Аффирмация: «Я сияю и притягиваю радость»." },
  { id: 20, sym: "XX",   name: "Суд",             emoji: "📯", short: "Время переосмыслить прошлое и принять зов перемен.", full: "Суд зовёт к пробуждению и осознанию. Пришло время важных решений на основе прожитого опыта. Предостережение: не откладывайте осознание. Аффирмация: «Я принимаю своё прошлое и иду вперёд обновлённым»." },
  { id: 21, sym: "XXI",  name: "Мир",             emoji: "🌍", short: "Завершение цикла. Успех, гармония и полнота.", full: "Мир — карта завершения и достижения. Вы подошли к финишу важного этапа. Наслаждайтесь результатом. Предостережение: будьте благодарны. Аффирмация: «Я завершаю с достоинством и принимаю своё совершенство»." },
];

const TOPICS = [
  { id: "love",    label: "💞 Любовь",    q: "Что происходит в моих отношениях?" },
  { id: "money",   label: "💰 Деньги",    q: "Каков мой финансовый путь сейчас?" },
  { id: "work",    label: "💼 Карьера",   q: "Правильный ли я путь выбрал?" },
  { id: "choice",  label: "🔱 Выбор",     q: "Стоит ли мне принять это решение?" },
  { id: "future",  label: "🌠 Будущее",   q: "Что ждёт меня впереди?" },
  { id: "health",  label: "🌿 Здоровье",  q: "Как восстановить силы и гармонию?" },
];

const SERVICES_LIST = [
  { icon: "🃏", title: "Расклад «Да/Нет»",    desc: "Конкретный ответ на один вопрос + карта-советник", price: "199 ₽",   oldPrice: "500 ₽",   dur: "15 мин",     hot: false },
  { icon: "💞", title: "Чувства партнёра",     desc: "3 карты: что думает, чувствует и скрывает",        price: "790 ₽",   oldPrice: "990 ₽",   dur: "30 мин",     hot: true  },
  { icon: "🌿", title: "Кельтский крест",      desc: "10 карт — полная картина любой ситуации",          price: "1 590 ₽", oldPrice: null,       dur: "60 мин",     hot: false },
  { icon: "⭐", title: "Расклад на год",        desc: "12 карт по месяцам — карта предстоящего года",    price: "2 390 ₽", oldPrice: null,       dur: "90 мин",     hot: true  },
  { icon: "🔮", title: "VIP-диагностика",      desc: "Видео + PDF + сертификат — полный разбор жизни",   price: "6 990 ₽", oldPrice: "7 500 ₽", dur: "120 мин",    hot: false },
  { icon: "✨", title: "PDF-сертификат",       desc: "Именной документ с полной расшифровкой карты",     price: "199 ₽",   oldPrice: "699 ₽",   dur: "мгновенно",  hot: true  },
];

const REVIEWS_LIST = [
  { name: "★ Анонимный отзыв",  city: "", stars: 5, text: "Сделала расклад перед собеседованием — карта сказала «не бояться». Прошла! Сохранила PDF, перечитываю в трудные моменты.",                                          service: "PDF-сертификат"   },
  { name: "★ Анонимный отзыв",  city: "", stars: 5, text: "Подарила подруге сертификат на «Чувства партнёра». Он оказался точным до мурашек. Теперь обе стали постоянными клиентами.",                                          service: "Чувства партнёра" },
  { name: "★ Анонимный отзыв",  city: "", stars: 5, text: "Скептик по природе, но расклад на год описал мою ситуацию настолько точно, что я потерял дар речи. Рекомендую всем.",                                               service: "Расклад на год"   },
  { name: "★ Анонимный отзыв",  city: "", stars: 5, text: "VIP-диагностика изменила моё отношение к ситуации. Получила чёткий план действий. Видео и PDF — на память. Спасибо огромное!",                                      service: "VIP-диагностика"  },
  { name: "★ Анонимный отзыв",  city: "", stars: 5, text: "Заказала «Да/Нет» перед важным разговором с мамой. Карта дала именно тот ответ, который я боялась признать. Всё прошло хорошо.",                                    service: "Расклад «Да/Нет»" },
  { name: "★ Анонимный отзыв",  city: "", stars: 5, text: "Кельтский крест полностью описал мою ситуацию на работе. Даже детали, о которых я никому не говорила. Была в шоке от точности.",                                    service: "Кельтский крест"  },
  { name: "★ Анонимный отзыв",  city: "", stars: 5, text: "Раньше не верила в Таро. Заказала ради интереса — теперь делаю расклад перед каждым важным решением. Это просто работает.",                                          service: "PDF-сертификат"   },
  { name: "★ Анонимный отзыв",  city: "", stars: 5, text: "Расклад на год показал тяжёлый период в марте — так и вышло. Зато карты предупредили заранее, и я была готова. Очень ценно.",                                       service: "Расклад на год"   },
  { name: "★ Анонимный отзыв",  city: "", stars: 5, text: "Написала в 2 часа ночи в панике — нужен был срочный ответ. Сделала расклад сама, получила PDF. Утром уже знала, что делать.",                                        service: "Расклад «Да/Нет»" },
  { name: "★ Анонимный отзыв",  city: "", stars: 5, text: "Подарила себе на день рождения VIP-диагностику. Три часа разбора жизни — это лучший подарок, который я когда-либо делала себе.",                                    service: "VIP-диагностика"  },
  { name: "★ Анонимный отзыв",  city: "", stars: 5, text: "Чувства партнёра — просто попадание в десятку. Он молчит, а карты рассказали всё. Теперь понимаю его намного лучше.",                                               service: "Чувства партнёра" },
  { name: "★ Анонимный отзыв",  city: "", stars: 5, text: "Очень ценю анонимность — никто не знает, что я обращалась. Расклад помог разобраться в ситуации с близким человеком. Деликатно и точно.",                           service: "Кельтский крест"  },
];

// ─── STAR FIELD ───────────────────────────────────────────────────────────────
const StarField = () => {
  const stars = Array.from({ length: 60 }, (_, i) => ({
    id: i,
    top: Math.random() * 100,
    left: Math.random() * 100,
    size: Math.random() * 2 + 1,
    delay: Math.random() * 4,
    dur: Math.random() * 3 + 2,
  }));
  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {stars.map((s) => (
        <div key={s.id} className="star animate-twinkle"
          style={{ top: `${s.top}%`, left: `${s.left}%`, width: s.size, height: s.size,
            animationDelay: `${s.delay}s`, animationDuration: `${s.dur}s`, opacity: 0.5 }} />
      ))}
    </div>
  );
};

const Divider = ({ slim = false }: { slim?: boolean }) => (
  <div className={`flex items-center gap-3 ${slim ? "my-2" : "my-6"}`}>
    <div className="flex-1 divider-line" />
    <span className="text-gold/40 text-sm">✦</span>
    <div className="flex-1 divider-line" />
  </div>
);

// ─── NAV ──────────────────────────────────────────────────────────────────────
const Nav = () => {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", h);
    return () => window.removeEventListener("scroll", h);
  }, []);
  const links: [string, string][] = [["Расклад","#reading"],["Услуги","#services"],["Отзывы","#reviews"],["Контакты","#contacts"],["Telegram","https://t.me/keyarcana"]];
  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled ? "nav-blur py-3" : "py-5"}`}>
      <div className="max-w-6xl mx-auto px-6 flex items-center justify-between">
        <span className="font-playfair text-2xl font-medium tracking-[0.12em] gold-text">✦ KeyArcana</span>
        <div className="hidden md:flex items-center gap-7">
          {links.map(([l, h]) => (
            <a key={h} href={h} className="font-roboto text-xs tracking-[0.2em] uppercase text-foreground/55 hover:text-gold transition-colors">{l}</a>
          ))}
          <a href="#reading" className="font-roboto text-xs px-5 py-2.5 bg-gold text-background hover:opacity-85 transition-all rounded-sm tracking-[0.15em] uppercase font-medium">
            Вытянуть карту
          </a>
        </div>
        <button className="md:hidden text-gold" onClick={() => setOpen(!open)}>
          <Icon name={open ? "X" : "Menu"} size={20} />
        </button>
      </div>
      {open && (
        <div className="md:hidden nav-blur border-t border-gold/10 px-6 py-5 flex flex-col gap-4">
          {links.map(([l, h]) => (
            <a key={h} href={h} onClick={() => setOpen(false)} className="font-roboto text-xs tracking-[0.2em] uppercase text-foreground/55 hover:text-gold transition-colors">{l}</a>
          ))}
        </div>
      )}
    </nav>
  );
};

// ─── HERO ─────────────────────────────────────────────────────────────────────
const Hero = () => (
  <section className="relative min-h-screen hero-gradient flex items-center justify-center overflow-hidden pt-20">
    <div className="absolute inset-0 pointer-events-none">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full opacity-[0.07]"
        style={{ background: "radial-gradient(circle, hsl(270,50%,40%) 0%, transparent 65%)" }} />
    </div>
    {/* Hero character image */}
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      <img
        src="https://cdn.poehali.dev/projects/6a37c80e-c75c-4233-8378-6241b16a3843/bucket/6b9087d0-2546-435f-bda5-485762824a6e.jpg"
        alt=""
        className="absolute right-0 top-0 h-full w-auto max-w-[55%] object-cover object-top opacity-30"
        style={{ maskImage: "linear-gradient(to left, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 50%, transparent 80%)", WebkitMaskImage: "linear-gradient(to left, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 50%, transparent 80%)" }}
      />
    </div>
    {/* Spinning mandala */}
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[450px] h-[450px] animate-spin-slow opacity-[0.04] pointer-events-none select-none">
      <svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
        {[0, 30, 60, 90, 120, 150].map((deg) => (
          <g key={deg} transform={`rotate(${deg} 100 100)`}>
            <ellipse cx="100" cy="100" rx="85" ry="22" stroke="hsl(46,100%,60%)" strokeWidth="0.5" />
          </g>
        ))}
        <circle cx="100" cy="100" r="10" stroke="hsl(46,100%,60%)" strokeWidth="0.8" />
        <circle cx="100" cy="100" r="65" stroke="hsl(270,50%,40%)" strokeWidth="0.4" strokeDasharray="4 6" />
        <circle cx="100" cy="100" r="85" stroke="hsl(46,100%,60%)" strokeWidth="0.3" strokeDasharray="2 10" />
      </svg>
    </div>

    <div className="relative z-10 text-center px-6 max-w-5xl mx-auto">
      <p className="font-roboto text-xs tracking-[0.45em] uppercase text-gold/50 mb-8 animate-fade-in"
        style={{ animationDelay: "0.2s", opacity: 0 }}>
        ✦ &nbsp; 22 старших аркана &nbsp;·&nbsp; мгновенный ответ &nbsp; ✦
      </p>
      <h1 className="font-playfair font-medium leading-[0.92] mb-7 animate-fade-in-up"
        style={{ fontSize: "clamp(3.2rem, 9.5vw, 7.5rem)", animationDelay: "0.35s", opacity: 0 }}>
        <span className="animate-shimmer block">Карты знают</span>
        <span className="text-foreground/65 italic font-normal">ответ</span>
      </h1>
      <p className="font-playfair text-xl md:text-2xl text-foreground/50 italic leading-relaxed mb-11 animate-fade-in"
        style={{ animationDelay: "0.7s", opacity: 0 }}>
        Задайте вопрос картам Таро — бесплатно, без регистрации, прямо сейчас.<br className="hidden md:block" />
        Вытяните одну карту и получите личный ответ за 10 секунд.<br className="hidden md:block" />
        Сохраните именной PDF-сертификат с полной расшифровкой — останется с вами навсегда.
      </p>
      <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in"
        style={{ animationDelay: "1s", opacity: 0 }}>
        <a href="#reading" className="animate-pulse-glow font-roboto text-sm px-10 py-4 bg-gold text-background hover:opacity-85 transition-all rounded-sm tracking-[0.18em] uppercase font-medium">
          🔮 Вытянуть карту — бесплатно
        </a>
        <a href="#cert-preview" className="font-roboto text-sm px-8 py-4 border border-gold/35 text-gold hover:bg-gold/8 transition-all rounded-sm tracking-[0.15em] uppercase">
          Смотреть пример
        </a>
      </div>
      <div className="mt-10 flex justify-center gap-8 animate-fade-in"
        style={{ animationDelay: "1.3s", opacity: 0 }}>
        {[["2 400+","раскладов"],["98%","точность"],["4.9★","рейтинг"]].map(([n, l]) => (
          <div key={l} className="text-center">
            <div className="font-playfair text-3xl md:text-4xl gold-text font-medium">{n}</div>
            <div className="font-roboto text-xs text-foreground/35 tracking-widest uppercase mt-1">{l}</div>
          </div>
        ))}
      </div>
      <p className="font-roboto text-sm text-foreground/40 mt-6 animate-fade-in" style={{ animationDelay: "1.5s", opacity: 0 }}>
        Каждый день сотни людей находят ответы с помощью Таро. Присоединяйтесь — это бесплатно.
      </p>
    </div>
    <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-float opacity-40">
      <span className="font-golos text-xs tracking-[0.3em] uppercase text-foreground/50">Прокрутите</span>
      <Icon name="ChevronDown" size={14} className="text-gold/60" />
    </div>
  </section>
);

// ─── READING (воронка) ────────────────────────────────────────────────────────
type Step = "topic" | "shuffle" | "reveal" | "upsell";

const Reading = () => {
  const [step, setStep] = useState<Step>("topic");
  const [topic, setTopic] = useState<typeof TOPICS[0] | null>(null);
  const [card, setCard] = useState<typeof ARCANA[0] | null>(null);
  const [flipped, setFlipped] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [showFull, setShowFull] = useState(false);
  const [shared, setShared] = useState(false);
  const [loading, setLoading] = useState(false);
  const [payError, setPayError] = useState("");

  // Check for successful payment redirect
  const [paid, setPaid] = useState(false);
  useEffect(() => {
    if (window.location.search.includes("paid=1")) {
      setPaid(true);
    }
  }, []);

  const pickTopic = (t: typeof TOPICS[0]) => { setTopic(t); setStep("shuffle"); };

  const drawCard = () => {
    const c = ARCANA[Math.floor(Math.random() * ARCANA.length)];
    setCard(c);
    setFlipped(false);
    setStep("reveal");
    setTimeout(() => setFlipped(true), 300);
  };

  const reset = () => {
    setStep("topic"); setTopic(null); setCard(null);
    setFlipped(false); setShowFull(false); setName(""); setEmail("");
    setShared(false); setLoading(false); setPayError("");
  };

  const handleShare = () => {
    const text = `Карты ответили на мой вопрос! Выпал «${card?.name}» ✦ ${card?.short} Попробуй и ты → ${window.location.href}`;
    if (navigator.share) {
      navigator.share({ title: `Моя карта — ${card?.name}`, text, url: window.location.href }).catch(() => {});
    } else {
      navigator.clipboard.writeText(text).then(() => { setShared(true); setTimeout(() => setShared(false), 3000); });
    }
  };

  const handlePayment = async () => {
    if (!email || !name) {
      setPayError("Пожалуйста, заполните email и имя.");
      return;
    }
    setLoading(true);
    setPayError("");
    try {
      const res = await fetch(CREATE_PAYMENT_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          email,
          card_name: card?.name,
          card_emoji: card?.emoji,
          card_full: card?.full,
          amount: 199,
          return_url: window.location.href + "?paid=1",
        }),
      });
      const data = await res.json();
      if (data.payment_url) {
        window.location.href = data.payment_url;
      } else {
        setPayError(data.error || "Не удалось создать платёж. Попробуйте ещё раз.");
        setLoading(false);
      }
    } catch {
      setPayError("Ошибка соединения. Проверьте интернет и попробуйте снова.");
      setLoading(false);
    }
  };

  // Thank you page after successful payment
  if (paid) {
    return (
      <section id="reading" className="relative py-16 px-6" style={{ background: "hsl(270,25%,5%)" }}>
        <div className="max-w-2xl mx-auto text-center">
          <div className="text-6xl mb-6">✦</div>
          <h2 className="font-playfair text-4xl md:text-5xl font-medium gold-text mb-4">
            Спасибо! Сертификат уже летит к вам на email ✦
          </h2>
          <Divider />
          <p className="font-playfair text-xl italic text-foreground/55 mt-4 leading-relaxed">
            Проверьте вашу почту — именной PDF-сертификат с полной расшифровкой уже в пути.<br />
            Если письма нет в течение 5 минут, загляните в папку «Спам».
          </p>
          <button onClick={() => { setPaid(false); reset(); window.history.replaceState({}, "", window.location.pathname); }}
            className="mt-8 font-roboto text-xs px-8 py-3 border border-gold/35 text-gold hover:bg-gold/8 transition-all rounded-sm tracking-[0.15em] uppercase">
            Сделать новый расклад
          </button>
        </div>
      </section>
    );
  }

  return (
    <section id="reading" className="relative py-16 px-6" style={{ background: "hsl(270,25%,5%)" }}>
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-8">
          <p className="font-roboto text-xs tracking-[0.4em] uppercase text-gold/45 mb-4">✦ Бесплатный расклад ✦</p>
          <h2 className="font-playfair text-5xl md:text-6xl font-medium">Вытяни карту</h2>
          <Divider />
          <p className="font-playfair text-lg text-foreground/45 italic mt-3">Сосредоточьтесь на своём вопросе</p>
          <div className="mt-4 flex flex-wrap justify-center gap-3">
            {[
              { icon: "EyeOff", text: "Полная анонимность" },
              { icon: "Lock",   text: "Без регистрации" },
              { icon: "Zap",    text: "Ответ за 10 секунд" },
            ].map(({ icon, text }) => (
              <div key={text} className="flex items-center gap-1.5 px-3 py-1.5 rounded-sm"
                style={{ background: "hsla(46,100%,60%,0.07)", border: "1px solid hsla(46,100%,60%,0.18)" }}>
                <Icon name={icon} size={12} className="text-gold/55" />
                <span className="font-roboto text-xs text-foreground/50">{text}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Step 1 — Topic */}
        {step === "topic" && (
          <div className="animate-fade-in-up">
            <p className="font-roboto text-sm text-foreground/50 text-center mb-6 tracking-wide">Выберите тему расклада:</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {TOPICS.map((t) => (
                <button key={t.id} onClick={() => pickTopic(t)}
                  className="mystical-card rounded-sm p-5 text-left hover:border-gold/40 transition-all group">
                  <span className="font-playfair text-lg group-hover:gold-text transition-colors">{t.label}</span>
                  <p className="font-roboto text-xs text-foreground/35 mt-1">{t.q}</p>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Step 2 — Shuffle */}
        {step === "shuffle" && topic && (
          <div className="animate-fade-in-up text-center">
            <div className="mystical-card rounded-sm p-6 mb-6">
              <p className="font-roboto text-xs text-foreground/40 tracking-widest uppercase mb-3">Ваш вопрос</p>
              <p className="font-playfair text-xl italic text-foreground/70">«{topic.q}»</p>
            </div>
            <p className="font-playfair text-base text-foreground/50 italic mb-8">
              Сделайте три глубоких вдоха. Сосредоточьтесь.<br />Когда будете готовы — вытяните карту.
            </p>
            <button onClick={drawCard}
              className="animate-pulse-glow mx-auto flex flex-col items-center gap-4 mystical-card rounded-sm p-8 hover:border-gold/50 transition-all w-48 cursor-pointer">
              <div className="text-5xl animate-float">🃏</div>
              <span className="font-roboto text-xs tracking-[0.25em] uppercase text-gold/60">Вытянуть</span>
            </button>
            <button onClick={() => setStep("topic")}
              className="mt-6 font-roboto text-xs text-foreground/25 hover:text-foreground/50 transition-colors tracking-wider">
              ← Изменить тему
            </button>
          </div>
        )}

        {/* Step 3 — Reveal */}
        {step === "reveal" && card && (
          <div className="animate-fade-in-up">
            <div className="text-center mb-6">
              <p className="font-roboto text-xs text-foreground/40 tracking-widest uppercase mb-2">Ваша карта</p>
              <div className={`transition-all duration-700 ${flipped ? "opacity-100 scale-100" : "opacity-0 scale-90"}`}>
                <div className="text-7xl mb-4">{card.emoji}</div>
                <h3 className="font-playfair text-4xl font-medium gold-text">{card.name}</h3>
                <p className="font-roboto text-xs text-foreground/30 tracking-widest mt-1">{card.sym} · Старший Аркан</p>
              </div>
            </div>
            <div className="mystical-card rounded-sm p-6 mb-4">
              <p className="font-playfair text-lg italic text-foreground/70 leading-relaxed text-center">
                «{card.short}»
              </p>
            </div>
            {showFull ? (
              <div className="mystical-card rounded-sm p-6 mb-4 animate-fade-in">
                <p className="font-roboto text-xs tracking-widest uppercase text-gold/40 mb-3">Полная расшифровка</p>
                <p className="font-playfair text-base text-foreground/65 leading-relaxed">{card.full}</p>
              </div>
            ) : (
              <div className="mystical-card rounded-sm p-6 mb-4 relative overflow-hidden">
                <div className="absolute inset-0 backdrop-blur-sm bg-background/40 flex items-center justify-center z-10 rounded-sm">
                  <div className="text-center px-4">
                    <p className="font-playfair text-lg italic text-foreground/60 mb-3">Полная расшифровка закрыта</p>
                    <button onClick={() => setStep("upsell")}
                      className="font-roboto text-xs px-6 py-2.5 bg-gold text-background hover:opacity-85 transition-all rounded-sm tracking-widest uppercase font-medium">
                      Открыть за 199 ₽
                    </button>
                  </div>
                </div>
                <p className="font-playfair text-base text-foreground/20 leading-relaxed select-none">{card.full}</p>
              </div>
            )}
            <div className="flex gap-3">
              <button onClick={handleShare}
                className="flex-1 font-roboto text-xs py-3 border border-gold/25 text-gold/60 hover:bg-gold/8 transition-all rounded-sm tracking-wider uppercase flex items-center justify-center gap-2">
                <Icon name="Share2" size={13} />
                {shared ? "Скопировано!" : "Поделиться"}
              </button>
              <button onClick={() => setStep("upsell")}
                className="flex-1 animate-pulse-glow font-roboto text-xs py-3 bg-gold text-background hover:opacity-85 transition-all rounded-sm tracking-wider uppercase font-medium">
                Получить PDF — 199 ₽
              </button>
            </div>
            <button onClick={reset}
              className="mt-4 font-roboto text-xs text-foreground/25 hover:text-foreground/50 transition-colors tracking-wider block mx-auto">
              ← Новый расклад
            </button>
          </div>
        )}

        {/* Step 4 — Upsell / Payment */}
        {step === "upsell" && card && (
          <div className="animate-fade-in-up" id="cert-preview">
            <div className="mystical-card rounded-sm p-6">
              <div className="text-center mb-5">
                <span className="text-4xl">{card.emoji}</span>
                <h3 className="font-playfair text-2xl text-gold mb-1">Именной PDF-сертификат</h3>
                <p className="font-playfair text-lg italic text-foreground/50">Карта «{card.name}» для вас</p>
              </div>
              {/* Превью сертификата */}
              <div className="rounded-sm p-5 mb-4 relative overflow-hidden"
                style={{ background: "linear-gradient(145deg, hsl(270,25%,9%), hsl(270,35%,13%))", border: "1px solid hsla(46,100%,60%,0.42)" }}>
                <div className="absolute inset-0 opacity-5" style={{ background: "radial-gradient(ellipse at 50% 0%, hsl(270,60%,40%), transparent 70%)" }} />
                <p className="font-roboto text-xs tracking-[0.3em] uppercase text-gold/40 text-center mb-3">Предварительный просмотр</p>
                <div className="flex items-center gap-4">
                  <div className="text-3xl">{card.emoji}</div>
                  <div className="flex-1">
                    <p className="font-playfair text-base text-gold">{name || "Ваше Имя"}</p>
                    <p className="font-roboto text-xs text-foreground/40 mt-0.5">{card.sym} · {card.name}</p>
                    <p className="font-playfair text-xs italic text-foreground/50 mt-1 leading-relaxed line-clamp-2">{card.short}</p>
                  </div>
                </div>
                <div className="mt-3 pt-3 border-t border-gold/10 flex justify-between">
                  <span className="font-roboto text-xs text-foreground/25 tracking-wider">Совет · Предостережение · Аффирмация</span>
                  <span className="font-roboto text-xs text-gold/30">✦ KeyArcana</span>
                </div>
              </div>
              <Divider />
              <ul className="space-y-2.5 my-5">
                {["Ваше имя на красивом документе","Полная расшифровка — 300–500 слов","Личный совет и предостережение","Аффирмация на день","Красивый дизайн для соцсетей"].map(item => (
                  <li key={item} className="flex items-center gap-3">
                    <span className="text-gold text-xs">✦</span>
                    <span className="font-roboto text-sm text-foreground/65">{item}</span>
                  </li>
                ))}
              </ul>
              <Divider />
              <div className="mt-5 space-y-3">
                <div>
                  <label className="font-roboto text-xs tracking-widest uppercase text-foreground/45 block mb-2">Email для сертификата</label>
                  <input
                    type="email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    placeholder="Email для сертификата"
                    className="w-full bg-transparent border border-gold/25 focus:border-gold/60 outline-none px-4 py-3 font-roboto text-sm text-foreground placeholder:text-foreground/25 transition-colors rounded-sm"
                  />
                </div>
                <div>
                  <label className="font-roboto text-xs tracking-widest uppercase text-foreground/45 block mb-2">Ваше имя для сертификата</label>
                  <input
                    type="text"
                    value={name}
                    onChange={e => setName(e.target.value)}
                    placeholder="Например: Мария"
                    className="w-full bg-transparent border border-gold/25 focus:border-gold/60 outline-none px-4 py-3 font-roboto text-sm text-foreground placeholder:text-foreground/25 transition-colors rounded-sm"
                  />
                </div>
                {payError && (
                  <p className="font-roboto text-xs text-red-400 text-center">{payError}</p>
                )}
                <div className="flex items-center justify-between mb-2">
                  <span className="font-playfair text-3xl gold-text">199 ₽</span>
                  <span className="font-roboto text-xs text-foreground/30 line-through">1 500 ₽ у таролога</span>
                </div>
                <button
                  onClick={handlePayment}
                  disabled={loading}
                  className="w-full animate-pulse-glow font-roboto text-sm py-4 bg-gold text-background hover:opacity-85 transition-all rounded-sm tracking-[0.15em] uppercase font-medium flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {loading ? (
                    <>
                      <Icon name="Loader" size={16} className="animate-spin" />
                      Оплата...
                    </>
                  ) : (
                    "Хочу правду — 199 ₽"
                  )}
                </button>
                <p className="font-roboto text-xs text-foreground/30 text-center mt-2">Без подписки · Разовая покупка · Мгновенно на email</p>
              </div>
            </div>
            {/* Mini upsell */}
            <div className="mt-4 p-5 border border-gold/10 rounded-sm">
              <p className="font-roboto text-xs text-foreground/40 text-center mb-3 tracking-wider uppercase">Добавьте к заказу</p>
              <div className="grid grid-cols-2 gap-3">
                {([["3 карты","прошлое · настоящее · будущее","+300 ₽"],["Подарок другу","готовый PDF-сертификат","149 ₽"]] as const).map(([t, d, p]) => (
                  <div key={t} className="mystical-card rounded-sm p-4 text-center cursor-pointer hover:border-gold/40 transition-all">
                    <div className="font-playfair text-base text-foreground mb-1">{t}</div>
                    <div className="font-roboto text-xs text-foreground/35 mb-2">{d}</div>
                    <div className="font-playfair text-lg gold-text">{p}</div>
                  </div>
                ))}
              </div>
            </div>
            <button onClick={reset} className="mt-4 font-roboto text-xs text-foreground/25 hover:text-foreground/50 transition-colors tracking-wider block mx-auto">
              ← Вернуться к раскладу
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

// ─── SERVICES ─────────────────────────────────────────────────────────────────
const Services = () => (
  <section id="services" className="py-16 px-6 section-gradient">
    <div className="max-w-6xl mx-auto">
      <div className="text-center mb-10">
        <p className="font-roboto text-xs tracking-[0.4em] uppercase text-gold/45 mb-4">✦ Линейка услуг ✦</p>
        <h2 className="font-playfair text-5xl md:text-6xl font-medium">Услуги и цены</h2>
        <Divider />
        <p className="font-playfair text-lg text-foreground/45 italic mt-3">
          Выберите глубину погружения — от мгновенного PDF до VIP-сессии с тарологом
        </p>
      </div>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
        {SERVICES_LIST.map((s) => (
          <div key={s.title} className={`mystical-card rounded-sm p-5 flex flex-col gap-4 relative ${s.hot ? "border-gold/30" : ""}`}>
            {s.hot && (
              <div className="absolute -top-3 left-6 bg-gold text-background font-roboto text-xs px-3 py-1 rounded-sm tracking-widest uppercase font-medium">Хит</div>
            )}
            <span className="text-3xl">{s.icon}</span>
            <div>
              <h3 className="font-playfair text-xl font-medium text-foreground">{s.title}</h3>
              <p className="font-roboto text-xs text-foreground/45 mt-1 leading-relaxed">{s.desc}</p>
            </div>
            <div className="flex-1" />
            <Divider slim />
            <div className="flex items-center justify-between">
              <div className="flex flex-col">
                {s.oldPrice && (
                  <span className="font-roboto text-xs text-foreground/30 line-through">{s.oldPrice}</span>
                )}
                <span className="font-playfair text-2xl gold-text font-medium">{s.price}</span>
              </div>
              <span className="font-roboto text-xs text-foreground/30 tracking-wider">{s.dur}</span>
            </div>
            <a href="#contacts" className="mt-1 font-roboto text-xs text-center py-2.5 border border-gold/25 text-gold/70 hover:bg-gold hover:text-background hover:border-gold transition-all rounded-sm tracking-[0.15em] uppercase">
              Выбрать
            </a>
          </div>
        ))}
      </div>

      {/* Subscription */}
      <div className="mt-8 p-6 rounded-sm relative overflow-hidden"
        style={{ background: "linear-gradient(135deg, hsl(270,28%,10%), hsl(270,20%,8%))", border: "1px solid hsla(46,100%,60%,0.22)" }}>
        <div className="absolute right-0 top-0 bottom-0 w-1/3 opacity-5"
          style={{ background: "radial-gradient(ellipse at right, hsl(270,50%,40%), transparent)" }} />
        <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <p className="font-roboto text-xs tracking-[0.35em] uppercase text-gold/50 mb-2">✦ Специальное предложение</p>
            <h3 className="font-playfair text-3xl font-medium text-foreground">Подписка на месяц</h3>
            <p className="font-roboto text-sm text-foreground/45 mt-1">5 любых сертификатов · эксклюзивные расклады недели · приоритет записи</p>
          </div>
          <div className="text-center flex-shrink-0">
            <div className="font-playfair text-4xl gold-text font-medium">699 ₽</div>
            <div className="font-roboto text-xs text-foreground/30 line-through">1 500 ₽</div>
            <a href="#contacts" className="mt-3 block font-roboto text-xs px-7 py-3 bg-gold text-background hover:opacity-85 transition-all rounded-sm tracking-widest uppercase font-medium">
              Оформить
            </a>
          </div>
        </div>
      </div>
    </div>
  </section>
);

// ─── HOW IT WORKS ─────────────────────────────────────────────────────────────
const HowItWorks = () => (
  <section className="py-14 px-6" style={{ background: "hsl(270,25%,5%)" }}>
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-10">
        <p className="font-roboto text-xs tracking-[0.4em] uppercase text-gold/45 mb-4">✦ Процесс ✦</p>
        <h2 className="font-playfair text-4xl md:text-5xl font-medium">Как это работает</h2>
        <Divider />
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {[
          { n: "01", icon: "🎯", t: "Выберите тему",  d: "Любовь, деньги, карьера или просто вопрос судьбы. Сфокусируйтесь на том, что волнует вас больше всего." },
          { n: "02", icon: "🃏", t: "Вытяните карту", d: "Кликните на колоду — карта выпадет мгновенно. Доверьтесь интуиции и первому ощущению." },
          { n: "03", icon: "📖", t: "Получите ответ", d: "Краткая трактовка бесплатно, полная — за 199 ₽. Глубокая расшифровка откроет скрытые смыслы." },
          { n: "04", icon: "📄", t: "Сохраните PDF",  d: "Именной сертификат приходит на email за минуту. Красивый документ остаётся с вами навсегда." },
        ].map(({ n, icon, t, d }) => (
          <div key={n} className="text-center">
            <div className="font-playfair text-5xl text-gold/25 font-medium mb-4 leading-none">{n}</div>
            <div className="text-3xl mb-3">{icon}</div>
            <h3 className="font-playfair text-lg font-medium text-foreground mb-2">{t}</h3>
            <p className="font-roboto text-xs text-foreground/40 leading-relaxed">{d}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

// ─── REVIEWS ──────────────────────────────────────────────────────────────────
const Reviews = () => (
  <section id="reviews" className="py-16 px-6 section-gradient">
    <div className="max-w-5xl mx-auto">
      <div className="text-center mb-10">
        <p className="font-roboto text-xs tracking-[0.4em] uppercase text-gold/45 mb-4">✦ Истории клиентов ✦</p>
        <h2 className="font-playfair text-5xl md:text-6xl font-medium">Отзывы</h2>
        <Divider />
        <p className="font-playfair text-lg text-foreground/45 italic mt-3">
          Более 2 400 человек уже нашли ответы. Вот что они говорят:
        </p>
        <div className="mt-4 inline-flex items-center gap-2 px-4 py-2 rounded-sm mx-auto"
          style={{ background: "hsla(46,100%,60%,0.07)", border: "1px solid hsla(46,100%,60%,0.18)" }}>
          <Icon name="EyeOff" size={12} className="text-gold/55" />
          <span className="font-roboto text-xs text-foreground/50">Все отзывы публикуются анонимно — с разрешения клиентов</span>
        </div>
      </div>
      <div className="grid md:grid-cols-2 gap-5">
        {REVIEWS_LIST.map((r, i) => (
          <div key={i} className="mystical-card rounded-sm p-5 flex flex-col gap-4">
            <div className="flex justify-between items-start">
              <div>
                <p className="font-playfair text-lg font-medium">{r.name}</p>
                <p className="font-roboto text-xs text-foreground/35">{r.city}</p>
              </div>
              <div className="flex gap-0.5">{Array.from({ length: r.stars }).map((_, j) => <span key={j} className="text-gold">★</span>)}</div>
            </div>
            <p className="font-playfair text-base italic text-foreground/60 leading-relaxed flex-1">«{r.text}»</p>
            <div className="flex items-center gap-2">
              <span className="text-gold/30 text-xs">✦</span>
              <span className="font-roboto text-xs text-gold/45 tracking-wider">{r.service}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

// ─── CONTACTS ─────────────────────────────────────────────────────────────────
const SEND_CONTACT_URL = "https://functions.poehali.dev/f2f03086-5943-48eb-8fc9-420e6499b8ef";

const Contacts = () => {
  const [cName, setCName] = useState("");
  const [cEmail, setCEmail] = useState("");
  const [cService, setCService] = useState("");
  const [cMessage, setCMessage] = useState("");
  const [cLoading, setCLoading] = useState(false);
  const [cDone, setCDone] = useState(false);
  const [cError, setCError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!cEmail) { setCError("Укажите email для связи"); return; }
    setCLoading(true); setCError("");
    try {
      const res = await fetch(SEND_CONTACT_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: cName, email: cEmail, service: cService, message: cMessage }),
      });
      const data = await res.json();
      if (data.ok) { setCDone(true); }
      else { setCError(data.error || "Ошибка. Попробуйте ещё раз."); }
    } catch { setCError("Ошибка соединения. Проверьте интернет."); }
    finally { setCLoading(false); }
  };

  return (
  <section id="contacts" className="py-16 px-6 relative overflow-hidden" style={{ background: "hsl(270,25%,5%)" }}>
    <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] opacity-[0.06] pointer-events-none"
      style={{ background: "radial-gradient(ellipse, hsl(270,50%,40%), transparent)" }} />
    <div className="max-w-xl mx-auto relative z-10">
      <div className="text-center mb-8">
        <p className="font-roboto text-xs tracking-[0.4em] uppercase text-gold/45 mb-4">✦ Записаться ✦</p>
        <h2 className="font-playfair text-5xl md:text-6xl font-medium">Контакты</h2>
        <Divider />
        <p className="font-playfair text-xl italic text-foreground/45 mt-3">Напишите — отвечаю в течение часа</p>
      </div>
      <div className="mystical-card rounded-sm p-6">
        {cDone ? (
          <div className="text-center py-8 animate-fade-in">
            <div className="text-4xl mb-4">✦</div>
            <h3 className="font-playfair text-2xl gold-text mb-2">Заявка отправлена!</h3>
            <p className="font-roboto text-sm text-foreground/50">Вернёмся к вам в течение часа на указанный email.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="font-roboto text-xs tracking-widest uppercase text-foreground/40 block mb-2">Ваше имя</label>
              <input type="text" value={cName} onChange={e => setCName(e.target.value)} placeholder="Как вас зовут?"
                className="w-full bg-transparent border border-gold/20 focus:border-gold/50 outline-none px-4 py-3 font-roboto text-sm text-foreground placeholder:text-foreground/22 transition-colors rounded-sm" />
            </div>
            <div>
              <label className="font-roboto text-xs tracking-widest uppercase text-foreground/40 block mb-2">Email для ответа</label>
              <input type="email" value={cEmail} onChange={e => setCEmail(e.target.value)} placeholder="your@email.com" required
                className="w-full bg-transparent border border-gold/20 focus:border-gold/50 outline-none px-4 py-3 font-roboto text-sm text-foreground placeholder:text-foreground/22 transition-colors rounded-sm" />
            </div>
            <div>
              <label className="font-roboto text-xs tracking-widest uppercase text-foreground/40 block mb-2">Услуга</label>
              <select value={cService} onChange={e => setCService(e.target.value)}
                className="w-full bg-card border border-gold/20 focus:border-gold/50 outline-none px-4 py-3 font-roboto text-sm text-foreground/60 transition-colors rounded-sm">
                <option value="">Выберите...</option>
                {SERVICES_LIST.map(s => <option key={s.title}>{s.title} — {s.price}</option>)}
              </select>
            </div>
            <div>
              <label className="font-roboto text-xs tracking-widest uppercase text-foreground/40 block mb-2">Вопрос или комментарий</label>
              <textarea rows={3} value={cMessage} onChange={e => setCMessage(e.target.value)} placeholder="Опишите свою ситуацию..."
                className="w-full bg-transparent border border-gold/20 focus:border-gold/50 outline-none px-4 py-3 font-roboto text-sm text-foreground placeholder:text-foreground/22 transition-colors rounded-sm resize-none" />
            </div>
            {cError && <p className="font-roboto text-xs text-red-400 text-center">{cError}</p>}
            <button type="submit" disabled={cLoading}
              className="animate-pulse-glow w-full font-roboto text-sm py-4 bg-gold text-background hover:opacity-85 transition-all rounded-sm tracking-[0.18em] uppercase font-medium flex items-center justify-center gap-2 disabled:opacity-60">
              {cLoading ? <><Icon name="Loader" size={16} className="animate-spin" />Отправка...</> : "Отправить заявку"}
            </button>
          </form>
        )}
      </div>
      <div className="flex justify-center gap-10 mt-10">
        {[
          { icon: "Send",          label: "Telegram", val: "@keyarcana",           href: "https://t.me/keyarcana" },
          { icon: "MessageCircle", label: "VK",       val: "vk.com/keyarcana", href: "https://vk.com/keyarcana" },
          { icon: "Mail",          label: "Email",    val: "key.arcana@mail.ru",   href: "mailto:key.arcana@mail.ru" },
        ].map((c) => (
          <a key={c.label} href={c.href} target={c.href.startsWith("http") ? "_blank" : undefined} rel="noopener noreferrer" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
            <Icon name={c.icon} size={15} className="text-gold/50" />
            <div>
              <p className="font-roboto text-xs text-foreground/35 tracking-widest uppercase">{c.label}</p>
              <p className="font-roboto text-sm text-foreground/65">{c.val}</p>
            </div>
          </a>
        ))}
      </div>
    </div>
  </section>
  );
};

// ─── EMAIL SUBSCRIBE ──────────────────────────────────────────────────────────
const EmailSubscribe = () => {
  const [email, setEmail] = useState("");
  const [done, setDone] = useState(false);
  return (
    <section className="py-16 px-6 border-t border-gold/10" style={{ background: "hsl(270,25%,4%)" }}>
      <div className="max-w-xl mx-auto text-center">
        <p className="font-roboto text-xs tracking-[0.4em] uppercase text-gold/45 mb-3">✦ Рассылка ✦</p>
        <h3 className="font-playfair text-3xl font-medium mb-2">Расклад недели — бесплатно</h3>
        <p className="font-roboto text-xs text-foreground/40 mb-6 leading-relaxed">
          Каждую неделю: расклад на 7 дней, карта-совет и аффирмация.<br />Только по делу, без спама. Отписаться в 1 клик.
        </p>
        {done ? (
          <p className="font-playfair text-xl italic text-gold animate-fade-in">✦ Вы подписаны. Первый расклад придёт в воскресенье ✦</p>
        ) : (
          <form onSubmit={e => { e.preventDefault(); if (email) setDone(true); }}
            className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <input type="email" value={email} onChange={e => setEmail(e.target.value)} required
              placeholder="your@email.com"
              className="flex-1 bg-transparent border border-gold/20 focus:border-gold/50 outline-none px-4 py-3 font-roboto text-sm text-foreground placeholder:text-foreground/25 transition-colors rounded-sm" />
            <button type="submit"
              className="font-roboto text-xs px-6 py-3 bg-gold text-background hover:opacity-85 transition-all rounded-sm tracking-widest uppercase font-medium whitespace-nowrap">
              Подписаться
            </button>
          </form>
        )}
        <p className="font-roboto text-xs text-foreground/20 mt-3">
          Нажимая «Подписаться», вы соглашаетесь с{" "}
          <a href="#privacy" className="underline hover:text-foreground/40 transition-colors">политикой конфиденциальности</a>
        </p>
      </div>
    </section>
  );
};

// ─── LEGAL MODALS ─────────────────────────────────────────────────────────────
const LegalModal = ({ type, onClose }: { type: "privacy" | "offer"; onClose: () => void }) => {
  const isPrivacy = type === "privacy";
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4" onClick={onClose}>
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />
      <div className="relative z-10 max-w-lg w-full mystical-card rounded-sm p-6 max-h-[80vh] overflow-y-auto"
        onClick={e => e.stopPropagation()}>
        <button onClick={onClose} className="absolute top-4 right-4 text-foreground/40 hover:text-foreground transition-colors">
          <Icon name="X" size={18} />
        </button>
        <h3 className="font-playfair text-2xl gold-text mb-4">
          {isPrivacy ? "Политика конфиденциальности" : "Публичная оферта"}
        </h3>
        <Divider slim />
        {isPrivacy ? (
          <div className="font-roboto text-xs text-foreground/55 leading-relaxed space-y-3 mt-4">
            <p><strong className="text-foreground/70">Сбор данных.</strong> Мы собираем только имя и email, которые вы добровольно указываете при оформлении заказа или подписки.</p>
            <p><strong className="text-foreground/70">Использование.</strong> Данные используются исключительно для доставки PDF-сертификата и рассылки (при подписке). Третьим лицам не передаются.</p>
            <p><strong className="text-foreground/70">Хранение.</strong> Данные хранятся на защищённых серверах. Вы можете запросить удаление в любой момент, написав нам.</p>
            <p><strong className="text-foreground/70">Рассылка.</strong> Отписаться можно в один клик по ссылке в любом письме.</p>
            <p><strong className="text-foreground/70">Контакт.</strong> По вопросам конфиденциальности: @keyarcana в Telegram.</p>
          </div>
        ) : (
          <div className="font-roboto text-xs text-foreground/55 leading-relaxed space-y-3 mt-4">
            <p><strong className="text-foreground/70">Предмет.</strong> Исполнитель оказывает услуги по составлению Таро-раскладов и подготовке аналитических PDF-материалов в развлекательных целях.</p>
            <p><strong className="text-foreground/70">Характер услуг.</strong> Все расклады носят исключительно развлекательный и рекомендательный характер. Исполнитель не даёт гарантий реализации каких-либо событий.</p>
            <p><strong className="text-foreground/70">Оплата.</strong> Услуга считается оказанной после доставки PDF-сертификата на email клиента.</p>
            <p><strong className="text-foreground/70">Возврат.</strong> Возврат осуществляется в течение 24 часов с момента оплаты, если PDF не был открыт. Для возврата напишите в Telegram.</p>
            <p><strong className="text-foreground/70">Ограничение ответственности.</strong> Исполнитель не несёт ответственности за решения, принятые клиентом на основании расклада.</p>
          </div>
        )}
      </div>
    </div>
  );
};

// ─── FOOTER ───────────────────────────────────────────────────────────────────
const Footer = () => {
  const [modal, setModal] = useState<"privacy" | "offer" | null>(null);
  return (
    <>
      <footer className="py-10 px-6 border-t border-gold/10" style={{ background: "hsl(240,22%,3%)" }}>
        <div className="max-w-5xl mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-6">
            <p className="font-playfair text-xl gold-text font-medium tracking-[0.15em]">✦ KeyArcana</p>
            <div className="flex flex-wrap justify-center gap-x-6 gap-y-2">
              <button onClick={() => setModal("privacy")}
                className="font-roboto text-xs text-foreground/30 hover:text-gold/60 transition-colors tracking-wider underline-offset-2">
                Политика конфиденциальности
              </button>
              <button onClick={() => setModal("offer")}
                className="font-roboto text-xs text-foreground/30 hover:text-gold/60 transition-colors tracking-wider underline-offset-2">
                Публичная оферта
              </button>
              <a href="https://t.me/keyarcana" target="_blank" rel="noopener noreferrer"
                className="font-roboto text-xs text-foreground/30 hover:text-gold/60 transition-colors tracking-wider flex items-center gap-1">
                <Icon name="Send" size={11} />
                Telegram-канал
              </a>
            </div>
          </div>
          <Divider slim />
          <p className="font-roboto text-xs text-foreground/20 text-center mt-4 leading-relaxed tracking-wider">
            © {new Date().getFullYear()} KeyArcana · Все права защищены · Для лиц 18+<br />
            Услуги носят исключительно развлекательный и рекомендательный характер.
            Результаты раскладов не являются гарантией наступления каких-либо событий.
          </p>
        </div>
      </footer>
      {modal && <LegalModal type={modal} onClose={() => setModal(null)} />}
    </>
  );
};

// ─── PAGE ─────────────────────────────────────────────────────────────────────
export default function Index() {
  return (
    <div className="relative min-h-screen" style={{ background: "hsl(240,20%,4%)" }}>
      <StarField />
      <Nav />
      <Hero />
      <Reading />
      <Services />
      <HowItWorks />
      <Reviews />
      <Contacts />
      <EmailSubscribe />
      <Footer />
    </div>
  );
}