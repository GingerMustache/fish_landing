import { AnimatePresence, motion, useInView } from 'framer-motion';
import { ExternalLink, Info, MapPin, Menu, MessageCircle, Navigation, Radio, Send, Users, X } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

// --- CONFIGURATION ---
const SHOP_CONFIG = {
  name: "Рыба моя",
  telegramUsername: "ryba_moya_gubern",
  vkGroupUrl: "https://vk.ru/club236313284",
  vkChannelUrl:
    "https://vk.ru/?u=2&to=L2ltL2NoYW5uZWxzLy0yMzczNzc4MDU/dDJmcz0wMTQzZGU1N2QyMmU1YzJiZDRfMw--",
  maxMessengerUrl: "https://max.ru/join/bT9qTZaXzce5UGbIY1M1bJrO2CNwg5UPlNXSHbPGmuc",
  address: "ул. Кузнецова, 6А, Новокузнецк (Губернский рынок)",
  yandexMapLink: "https://yandex.ru/maps/org/ryba_moya/143227952967/?ll=87.136978%2C53.746522&z=17",
  yandexMapsRouteUrl: "https://yandex.ru/maps/237/novokuznetsk/?ll=87.136978%2C53.746522&mode=routes&rtext=~53.746724%2C87.137262&rtt=auto&ruri=~ymapsbm1%3A%2F%2Forg%3Foid%3D143227952967&z=17",
  twoGisUrl: "https://2gis.ru/novokuznetsk/firm/70000001031547900",
};

const getSocialLinks = (telegramUrl) => [
  { href: telegramUrl, label: "Телеграм" },
  { href: SHOP_CONFIG.vkGroupUrl, label: "Группа ВК" },
  { href: SHOP_CONFIG.vkChannelUrl, label: "Канал ВК" },
  { href: SHOP_CONFIG.maxMessengerUrl, label: "MAX" },
];

/** Один текст для блока: Телеграм + группа ВК + MAX */
const ABOUT_SHARED_SOCIAL_DESCRIPTION =
  "Хиты продаж, рецепты, уникальные предложения, акции, и розыгрыши - выберите, как с нами связаться: Телеграм, группа ВКонтакте или мессенджер MAX.";

const getAboutSharedSocialButtons = (telegramUrl) => [
  {
    key: "telegram",
    href: telegramUrl,
    label: "Телеграм",
    ariaLabel: "Перейти в Телеграм",
    icon: Send,
    iconBg: "bg-sky-100 text-sky-600",
  },
  {
    key: "vkGroup",
    href: SHOP_CONFIG.vkGroupUrl,
    label: "ВК",
    ariaLabel: "Перейти в группу ВКонтакте",
    icon: Users,
    iconBg: "bg-blue-100 text-blue-600",
  },
  {
    key: "max",
    href: SHOP_CONFIG.maxMessengerUrl,
    label: "MAX",
    ariaLabel: "Перейти в мессенджер MAX",
    icon: MessageCircle,
    iconBg: "bg-violet-100 text-violet-600",
  },
];

const getAboutVkChannelCard = () => ({
  key: "vkChannel",
  href: SHOP_CONFIG.vkChannelUrl,
  description: "Канал ВК - наличие в ассортименте, свежие поставки, предзаказы.",
  cta: "Перейти",
  icon: Radio,
  iconBg: "bg-indigo-100 text-indigo-600",
});

// --- COMPONENTS ---

const ActionButton = ({ title, subLabel, onClick, icon: Icon, colorClass }) => (
  <motion.button
    onClick={onClick}
    className="snap-center shrink-0 min-w-[280px] md:min-w-0 group relative flex items-center justify-between w-full md:w-auto md:flex-1 p-4 md:p-6 bg-slate-50 hover:bg-white rounded-2xl transition-all duration-300 border-2 border-transparent hover:border-slate-200 hover:shadow-xl active:scale-95 text-left"
    whileTap={{ scale: 0.97 }}
  >
    <div>
      <h3 className="font-bold text-slate-800 text-lg leading-tight group-hover:text-blue-900">{title}</h3>
      {subLabel && <p className="text-xs text-slate-500 font-medium uppercase tracking-wide mt-1">{subLabel}</p>}
    </div>
    <div className={`h-10 w-10 rounded-full flex items-center justify-center transition-colors ${colorClass}`}>
      <Icon size={20} />
    </div>
  </motion.button>
);

const PrimaryButton = ({ children, onClick, icon: Icon, "aria-label": ariaLabel }) => (
  <motion.button
    type="button"
    onClick={onClick}
    aria-label={ariaLabel}
    className="inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-full font-bold text-white text-sm shadow-md shadow-blue-900/15 hover:shadow-lg hover:shadow-blue-900/30 hover:-translate-y-0.5 transition-all active:translate-y-0 active:scale-95"
    style={{ backgroundColor: 'rgb(21,35,62)' }}
    whileTap={{ scale: 0.97 }}
  >
    {Icon && <Icon size={14} />}
    {children}
  </motion.button>
);

const AboutSocialCard = ({ card, className = "" }) => {
  const Icon = card.icon;
  return (
    <div
      className={`flex flex-col items-center text-center bg-white rounded-2xl p-6 md:p-8 border border-slate-100 shadow-sm ${className}`}
    >
      <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-5 ${card.iconBg}`}>
        <Icon size={32} />
      </div>
      <h3 className="text-xl font-bold text-slate-900 mb-3">{card.title}</h3>
      <p className="text-slate-500 mb-6 text-sm leading-relaxed flex-1">{card.description}</p>
      <PrimaryButton icon={Icon} onClick={() => window.open(card.href, "_blank")}>
        {card.cta}
      </PrimaryButton>
    </div>
  );
};

const AboutSharedSocialBlock = ({ description, buttons }) => (
  <div className="flex flex-col items-center text-center bg-white rounded-2xl p-6 md:p-8 border border-slate-100 shadow-sm">
    <div className="flex flex-row flex-wrap justify-center items-center gap-5 md:gap-6 mb-6">
      {buttons.map((btn) => {
        const Icon = btn.icon;
        return (
          <div
            key={btn.key}
            className={`w-14 h-14 md:w-16 md:h-16 rounded-2xl flex items-center justify-center shrink-0 ${btn.iconBg}`}
            aria-hidden
          >
            <Icon size={30} />
          </div>
        );
      })}
    </div>
    <p className="text-slate-500 mb-6 text-sm leading-relaxed max-w-xl">{description}</p>
    <div className="flex flex-col sm:flex-row flex-wrap justify-center gap-3 w-full max-w-lg">
      {buttons.map((btn) => (
        <PrimaryButton
          key={btn.key}
          aria-label={btn.ariaLabel}
          onClick={() => window.open(btn.href, "_blank")}
        >
          {btn.label}
        </PrimaryButton>
      ))}
    </div>
  </div>
);

const AboutSectionContent = ({ sharedDescription, sharedButtons, vkChannelCard }) => {
  const headerRef = useRef(null);
  const contentRef = useRef(null);

  const isHeaderInView = useInView(headerRef, { once: true, amount: 0.01 });
  const isContentInView = useInView(contentRef, { once: true, amount: 0.1 });

  return (
    <div>
      <motion.div
        ref={headerRef}
        initial={{ opacity: 0, y: 30 }}
        animate={isHeaderInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
        transition={{ duration: 0.5 }}
      >
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-100 text-slate-600 text-sm font-semibold uppercase tracking-wider mb-6">
          <Info size={16} />
          О магазине
        </div>

        <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-8">
          Качество, которому доверяют
        </h2>
      </motion.div>

      <motion.div
        ref={contentRef}
        initial={{ opacity: 0, y: 30 }}
        animate={isContentInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
        transition={{ duration: 0.5 }}
      >
        <div className="prose prose-lg mx-auto text-slate-600 mb-12 leading-relaxed">
          <p className="mb-4">
            «Рыба моя» - место, где море встречается с вашим столом.
          </p>
          <p className="mb-4">
            Мы тщательно отбираем только самые свежие морепродукты и работаем напрямую с проверенными поставщиками, чтобы каждый товар на прилавке говорил сам за себя: вкусом, запахом, качеством.
          </p>
          <p>
            В нашем ассортименте вы найдете всё: от свежемороженой рыбы до изысканных деликатесов. Мы гордимся тем, что наши покупатели возвращаются к нам снова и снова. Приходите и убедитесь сами!
          </p>
        </div>

        <div className="bg-slate-50 rounded-3xl p-6 md:p-12 border border-slate-100">
          <div className="flex flex-col items-center mb-8 md:mb-10">
            <h3 className="text-2xl font-bold text-slate-900 mb-2">Мы в соцсетях</h3>
            <p className="text-slate-500 text-sm md:text-base max-w-md">
              Выберите удобный канал — новости, акции и общение с нами.
            </p>
          </div>

          <div className="flex flex-col gap-4">
            <AboutSharedSocialBlock description={sharedDescription} buttons={sharedButtons} />
            <AboutSocialCard card={vkChannelCard} className="min-h-0" />
          </div>
        </div>
      </motion.div>
    </div>
  );
};

const BottomSheet = ({ isOpen, onClose, sharedButtons, vkChannelCard }) => (
  <AnimatePresence>
    {isOpen && (
      <>
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-[100]"
        />

        {/* Sheet */}
        <motion.div
          initial={{ y: "100%" }}
          animate={{ y: 0 }}
          exit={{ y: "100%" }}
          transition={{ type: "spring", damping: 25, stiffness: 200 }}
          className="fixed bottom-0 left-0 right-0 bg-white rounded-t-[2.5rem] shadow-2xl z-[101] px-6 pt-8 pb-10 md:pb-12 max-h-[90vh] overflow-y-auto"
        >
          {/* Handle */}
          <div className="absolute top-3 left-1/2 -translate-x-1/2 w-12 h-1.5 bg-slate-200 rounded-full" />

          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-6 right-6 p-2 text-slate-400 hover:text-slate-600 transition-colors"
          >
            <X size={24} />
          </button>

          <div className="max-w-xl mx-auto text-center">
            <h3 className="text-2xl font-bold text-slate-900 mb-2">Мы в соцсетях</h3>
            <p className="text-slate-500 text-sm mb-8">
              Выберите удобный канал — новости, акции и общение с нами.
            </p>

            <div className="flex flex-col gap-4">
              <div className="flex flex-col items-center bg-slate-50 rounded-2xl p-6 border border-slate-100">
                <div className="flex flex-row flex-wrap justify-center items-center gap-4 mb-6">
                  {sharedButtons.map((btn) => {
                    const Icon = btn.icon;
                    return (
                      <div
                        key={btn.key}
                        className={`w-14 h-14 rounded-2xl flex items-center justify-center shrink-0 ${btn.iconBg}`}
                      >
                        <Icon size={28} />
                      </div>
                    );
                  })}
                </div>
                <div className="flex flex-col sm:flex-row flex-wrap justify-center gap-3 w-full">
                  {sharedButtons.map((btn) => (
                    <PrimaryButton
                      key={btn.key}
                      aria-label={btn.ariaLabel}
                      onClick={() => {
                        window.open(btn.href, "_blank");
                        onClose();
                      }}
                    >
                      {btn.label}
                    </PrimaryButton>
                  ))}
                </div>
              </div>

              <div className="flex flex-col items-center bg-white rounded-2xl p-6 border border-slate-100 shadow-sm">
                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-4 ${vkChannelCard.iconBg}`}>
                  <vkChannelCard.icon size={28} />
                </div>
                <p className="text-slate-500 mb-4 text-sm leading-relaxed">{vkChannelCard.description}</p>
                <PrimaryButton
                  icon={vkChannelCard.icon}
                  onClick={() => {
                    window.open(vkChannelCard.href, "_blank");
                    onClose();
                  }}
                >
                  {vkChannelCard.cta}
                </PrimaryButton>
              </div>
            </div>
          </div>
        </motion.div>
      </>
    )}
  </AnimatePresence>
);

const FooterContent = ({ shopConfig, socialLinks }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  const footerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, staggerChildren: 0.2 } },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  return (
    <motion.footer
      ref={ref}
      variants={footerVariants}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      className="bg-slate-900 py-12 text-center text-slate-400 text-sm"
    >
      <div className="max-w-7xl mx-auto px-4">
        <motion.p variants={itemVariants} className="font-bold text-slate-200 text-lg mb-2">{shopConfig.name}</motion.p>
        <motion.p variants={itemVariants} className="mb-6 opacity-60">{shopConfig.address}</motion.p>
        <motion.div
          variants={itemVariants}
          className="flex flex-wrap justify-center items-center gap-x-1 gap-y-2 mb-8 text-sm"
        >
          {socialLinks.map((link, index) => (
            <span key={link.label} className="inline-flex items-center">
              {index > 0 && <span className="mx-2 text-slate-600 select-none" aria-hidden>·</span>}
              <a
                href={link.href}
                target="_blank"
                rel="noreferrer"
                className="font-medium text-slate-300 hover:text-white transition-colors"
              >
                {link.label}
              </a>
            </span>
          ))}
        </motion.div>
        <motion.p variants={itemVariants}>© 2026 Все права защищены.</motion.p>
      </div>
    </motion.footer>
  );
};

// --- MAIN APP COMPONENT ---

export default function FishShopLanding() {
  const [isNavMenuOpen, setIsNavMenuOpen] = useState(false);
  const [isBottomSheetOpen, setIsBottomSheetOpen] = useState(false);

  useEffect(() => {
    // Open bottom sheet after a short delay on load
    const timer = setTimeout(() => {
      setIsBottomSheetOpen(true);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  const [activeSlide, setActiveSlide] = useState(0);

  const telegramUrl = `https://t.me/${SHOP_CONFIG.telegramUsername}`;
  const socialLinks = getSocialLinks(telegramUrl);
  const aboutSharedButtons = getAboutSharedSocialButtons(telegramUrl);
  const aboutVkChannelCard = getAboutVkChannelCard();
  const handleScroll = (e) => {
    const { scrollLeft, scrollWidth, clientWidth } = e.target;
    const maxScroll = scrollWidth - clientWidth;

    // Safety check to avoid division by zero
    if (maxScroll <= 0) return;

    // Calculate progress from 0.0 to 1.0
    const progress = scrollLeft / maxScroll;

    // Determine active slide based on progress
    if (progress < 0.33) {
      setActiveSlide(0);
    } else if (progress > 0.66) {
      setActiveSlide(2);
    } else {
      setActiveSlide(1);
    }
  };

  return (
    <motion.div
      className="min-h-screen bg-slate-50 font-sans text-slate-600"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.9 }}
    >

      {/* --- NAVIGATION --- */}
      <nav className="fixed w-full top-0 z-50 bg-white/90 backdrop-blur-md border-b border-slate-100 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <div className="flex items-center gap-3">
              <img
                src="https://raw.githubusercontent.com/GingerMustache/fish_landing/refs/heads/main/public/logo.png"
                alt="Logo"
                className="h-10 w-10 object-contain rounded-lg bg-slate-50"
                onError={(e) => { e.target.style.display = 'none' }}
              />
              <span className="font-bold text-xl text-slate-900 tracking-tight">
                {SHOP_CONFIG.name}
              </span>
            </div>

            <button
              type="button"
              aria-expanded={isNavMenuOpen}
              aria-label={isNavMenuOpen ? "Закрыть меню" : "Открыть меню"}
              className="p-2 text-slate-600"
              onClick={() => setIsNavMenuOpen(!isNavMenuOpen)}
            >
              {isNavMenuOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>

        <AnimatePresence>
          {isNavMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.2 }}
              className="bg-white border-t border-slate-100 absolute w-full shadow-xl left-0"
            >
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-2 pb-2 space-y-2">
                <a href="#about" onClick={() => setIsNavMenuOpen(false)} className="block py-3 px-4 rounded-lg hover:bg-slate-50 text-slate-800 font-medium">О нас</a>
                {socialLinks.map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    target="_blank"
                    rel="noreferrer"
                    onClick={() => setIsNavMenuOpen(false)}
                    className="block py-3 px-4 rounded-lg hover:bg-slate-50 text-blue-900 font-bold"
                  >
                    {link.label}
                  </a>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>


      {/* --- HERO SECTION --- */}
      <section className="relative pt-24 pb-2 md:pb-12 px-4 min-h-[75vh] md:min-h-[80vh] flex flex-col items-center justify-center overflow-hidden">

        <div className="absolute top-0 left-0 w-full h-full bg-slate-50 z-0">
          <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-blue-100/50 rounded-full blur-3xl opacity-60"></div>
        </div>

        <div className="relative z-10 w-full max-w-5xl mx-auto text-center">

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-4xl md:text-6xl font-black text-slate-900 mb-7 tracking-tight"
          >
            Свежая рыба <br />
            <span style={{ color: 'rgb(21,35,62)' }}>на вашем столе</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="text-lg md:text-xl text-slate-500 mb-14 max-w-2xl mx-auto"
          >
            Лучшие морепродукты в Новокузнецке. Находимся на Губернском рынке.
          </motion.p>

          {/* --- THE CENTER CONTAINER --- */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="w-full md:w-auto md:bg-white md:p-3 md:rounded-[2rem] md:shadow-2xl md:shadow-blue-900/10 md:border md:border-slate-100 mx-auto max-w-4xl"
          >

            {/* Horizontal Scroll Container */}
            <div
              onScroll={handleScroll} // Added scroll listener
              className="
                flex flex-row gap-3
                overflow-x-auto
                snap-x snap-mandatory
                pb-4 md:pb-0
                -mx-4 px-4 md:mx-0 md:px-0
                scrollbar-hide
            ">

              <ActionButton
                title="2ГИС"
                subLabel="Открыть карту"
                icon={MapPin}
                colorClass="bg-green-100 text-green-800"
                onClick={() => window.open(SHOP_CONFIG.twoGisUrl, '_blank')}
              />

              <ActionButton
                title="Яндекс Карты"
                subLabel="Открыть карту"
                icon={ExternalLink}
                colorClass="bg-yellow-100 text-yellow-800"
                onClick={() => window.open(SHOP_CONFIG.yandexMapLink, '_blank')}
              />

              <ActionButton
                title="Проложить маршрут"
                subLabel="Навигатор"
                icon={Navigation}
                colorClass="bg-blue-100 text-blue-800"
                onClick={() => window.open(SHOP_CONFIG.yandexMapsRouteUrl, '_blank')}
              />
            </div>

            <div className="md:hidden flex justify-center gap-2 -mt-1 mb-4">
              {[0, 1, 2].map((index) => (
                <div
                  key={index}
                  className={`
                    h-2 rounded-full transition-all duration-300
                    ${activeSlide === index
                      ? 'w-6' // Active: Wide and Dark Blue
                      : 'w-2 bg-slate-300' // Inactive: Small and Grey
                    }
                  `}
                  style={{ backgroundColor: activeSlide === index ? 'rgb(21,35,62)' : '' }}
                />
              ))}
            </div>

          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="mt-12 md:mt-12 text-sm text-slate-400 font-medium"
          >
            <MapPin className="inline w-4 h-4 mr-1 -mt-1" />
            {SHOP_CONFIG.address}
          </motion.div>

        </div>
      </section>

      <section id="about" className="py-16 bg-white relative">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <AboutSectionContent
            sharedDescription={ABOUT_SHARED_SOCIAL_DESCRIPTION}
            sharedButtons={aboutSharedButtons}
            vkChannelCard={aboutVkChannelCard}
          />
        </div>
      </section>

      <FooterContent shopConfig={SHOP_CONFIG} socialLinks={socialLinks} />

      <BottomSheet
        isOpen={isBottomSheetOpen}
        onClose={() => setIsBottomSheetOpen(false)}
        sharedButtons={aboutSharedButtons}
        vkChannelCard={aboutVkChannelCard}
      />
    </motion.div>
  );
}