import { useState, useRef } from 'react';
import { MapPin, Navigation, Send, Menu, X, Info, ExternalLink } from 'lucide-react';
import { motion, AnimatePresence, useInView } from 'framer-motion';

// --- CONFIGURATION ---
const SHOP_CONFIG = {
  name: "Рыба моя",
  telegramUsername: "ryba_moya_gubern",
  address: "ул. Кузнецова, 6А, Новокузнецк (Губернский рынок)",
  yandexMapLink: "https://yandex.ru/maps/org/ryba_moya/143227952967/?ll=87.136978%2C53.746522&z=17",
  yandexMapsRouteUrl: "https://yandex.ru/maps/237/novokuznetsk/?ll=87.136978%2C53.746522&mode=routes&rtext=~53.746724%2C87.137262&rtt=auto&ruri=~ymapsbm1%3A%2F%2Forg%3Foid%3D143227952967&z=17",
  twoGisUrl: "https://2gis.ru/novokuznetsk/firm/70000001031547900",
};

// --- COMPONENTS ---

const ActionButton = ({ title, subLabel, onClick, icon: Icon, colorClass }) => (
  <motion.button
    onClick={onClick}
    className="group relative flex items-center justify-between w-full md:w-auto md:flex-1 p-4 md:p-6 bg-slate-50 hover:bg-white rounded-2xl transition-all duration-300 border-2 border-transparent hover:border-slate-200 hover:shadow-xl active:scale-95 text-left"
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

const PrimaryButton = ({ children, onClick, icon: Icon }) => (
  <motion.button
    onClick={onClick}
    className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full font-bold text-white shadow-lg shadow-blue-900/20 hover:shadow-blue-900/40 hover:-translate-y-1 transition-all active:translate-y-0 active:scale-95 text-lg"
    style={{ backgroundColor: 'rgb(21,35,62)' }}
    whileTap={{ scale: 0.97 }}
  >
    {Icon && <Icon size={22} />}
    {children}
  </motion.button>
);

const AboutSectionContent = ({ telegramUrl }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  const sectionVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, staggerChildren: 0.2 } },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  return (
    <motion.div
      ref={ref}
      variants={sectionVariants}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
    >
      <motion.div variants={itemVariants} className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-100 text-slate-600 text-sm font-semibold uppercase tracking-wider mb-8">
        <Info size={16} />
        О магазине
      </motion.div>

      <motion.h2 variants={itemVariants} className="text-3xl md:text-4xl font-bold text-slate-900 mb-8">
        Качество, которому доверяют
      </motion.h2>

      <motion.div variants={itemVariants} className="prose prose-lg mx-auto text-slate-600 mb-12 leading-relaxed">
        <p className="mb-4">
          «Рыба моя» — это не просто магазин, это место, где мы тщательно отбираем для вас самые свежие морепродукты. Мы работаем напрямую с проверенными поставщиками, чтобы гарантировать качество каждого товара на прилавке.
        </p>
        <p>
          В нашем ассортименте вы найдете всё: от свежемороженой рыбы до изысканных деликатесов. Мы гордимся тем, что наши покупатели возвращаются к нам снова и снова. Приходите и убедитесь сами!
        </p>
      </motion.div>

      <motion.div variants={itemVariants} className="bg-slate-50 rounded-3xl p-8 md:p-12 border border-slate-100">
        <div className="flex flex-col items-center">
          <div className="w-16 h-16 bg-blue-100 text-blue-600 rounded-2xl flex items-center justify-center mb-6">
            <Send size={32} />
          </div>
          <h3 className="text-2xl font-bold text-slate-900 mb-3">Свежий улов в Телеграм</h3>
          <p className="text-slate-500 mb-8 max-w-md">
            Подпишитесь на наш канал, чтобы первыми узнавать о новых поставках, акциях и специальных предложениях.
          </p>
          <PrimaryButton icon={Send} onClick={() => window.open(telegramUrl, '_blank')}>
            Перейти в группу
          </PrimaryButton>
        </div>
      </motion.div>
    </motion.div>
  );
};

const FooterContent = ({ shopConfig }) => {
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
        <motion.p variants={itemVariants} className="mb-8 opacity-60">{shopConfig.address}</motion.p>
        <motion.p variants={itemVariants}>© 2025 Все права защищены.</motion.p>
      </div>
    </motion.footer>
  );
};

// --- MAIN APP COMPONENT ---

export default function FishShopLanding() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const telegramUrl = `https://t.me/${SHOP_CONFIG.telegramUsername}`;

  return (
    <motion.div
      className="min-h-screen bg-slate-50 font-sans text-slate-600"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >

      {/* --- NAVIGATION --- */}
      <nav className="fixed w-full top-0 z-50 bg-white/90 backdrop-blur-md border-b border-slate-100 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <div className="flex items-center gap-3">
              {/* Added fallback handling for the image just in case */}
              <img
                src="https://raw.githubusercontent.com/GingerMustache/fish_landing/refs/heads/main/public/logo.png"
                alt="Logo"
                className="h-10 w-10 object-contain rounded-lg bg-slate-100"
                onError={(e) => { e.target.style.display = 'none' }}
              />
              <span className="font-bold text-xl text-slate-900 tracking-tight">
                {SHOP_CONFIG.name}
              </span>
            </div>

            <div className="hidden md:flex items-center space-x-8">
              <a href="#about" className="font-medium hover:text-blue-900 transition-colors">О нас</a>
              <button
                onClick={() => window.open(telegramUrl, '_blank')}
                className="font-bold text-blue-900 hover:opacity-80 transition-opacity"
              >
                Телеграм
              </button>
            </div>

            <button
              className="md:hidden p-2 text-slate-600"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>

        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.2 }}
              className="md:hidden bg-white border-t border-slate-100 absolute w-full shadow-xl"
            >
              <div className="px-4 pt-2 pb-6 space-y-2">
                <a href="#about" onClick={() => setIsMobileMenuOpen(false)} className="block py-3 px-4 rounded-lg hover:bg-slate-50 text-slate-800 font-medium">О нас</a>
                <a href={telegramUrl} target="_blank" rel="noreferrer" className="block py-3 px-4 rounded-lg hover:bg-slate-50 text-blue-900 font-bold">Телеграм Канал</a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* --- HERO SECTION --- */}
      <section className="relative pt-32 pb-20 px-4 min-h-[80vh] flex flex-col items-center justify-center overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full bg-slate-50 z-0">
          <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-blue-100/50 rounded-full blur-3xl opacity-60"></div>
        </div>

        <div className="relative z-10 w-full max-w-5xl mx-auto text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-4xl md:text-6xl font-black text-slate-900 mb-6 tracking-tight"
          >
            Свежая рыба <br />
            <span style={{ color: 'rgb(21,35,62)' }}>на вашем столе</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="text-lg md:text-xl text-slate-500 mb-12 max-w-2xl mx-auto"
          >
            Лучшие морепродукты в Новокузнецке. Находимся на Губернском рынке.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="bg-white p-3 rounded-[2rem] shadow-2xl shadow-blue-900/10 border border-slate-100 mx-auto max-w-4xl"
          >
            <div className="flex flex-col md:flex-row gap-3">
              <ActionButton
                title="Проложить маршрут"
                subLabel="Навигатор"
                icon={Navigation}
                colorClass="bg-blue-100 text-blue-800"
                onClick={() => window.open(SHOP_CONFIG.yandexMapsRouteUrl, '_blank')}
              />
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
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="mt-8 text-sm text-slate-400 font-medium"
          >
            <MapPin className="inline w-4 h-4 mr-1 -mt-1" />
            {SHOP_CONFIG.address}
          </motion.div>
        </div>
      </section>

      <section id="about" className="py-24 bg-white relative">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <AboutSectionContent telegramUrl={telegramUrl} />
        </div>
      </section>

      <FooterContent shopConfig={SHOP_CONFIG} />

    </motion.div>
  );
}