import { useState } from 'react';
import { MapPin, Navigation, Send, Menu, X, Info, ExternalLink } from 'lucide-react';

// --- CONFIGURATION ---
const SHOP_CONFIG = {
  name: "Рыба моя",
  telegramUsername: "ryba_moya_gubern",
  address: "ул. Кузнецова, 6А, Новокузнецк (Губернский рынок)",
  // Direct link to open map
  yandexMapLink: "https://yandex.ru/maps/org/ryba_moya/143227952967/?ll=87.136978%2C53.746522&z=17",
  // Route generation link
  yandexMapsRouteUrl: "https://yandex.ru/maps/237/novokuznetsk/?ll=87.136978%2C53.746522&mode=routes&rtext=~53.746724%2C87.137262&rtt=auto&ruri=~ymapsbm1%3A%2F%2Forg%3Foid%3D143227952967&z=17",
  twoGisUrl: "https://2gis.ru/novokuznetsk/firm/70000001031547900",
};

// --- COMPONENTS ---

// A sleek button component that fits the "Sprite" aesthetic
const ActionButton = ({ title, subLabel, onClick, icon: Icon, colorClass }) => (
  <button
    onClick={onClick}
    className="group relative flex items-center justify-between w-full md:w-auto md:flex-1 p-4 md:p-6 bg-slate-50 hover:bg-white rounded-2xl transition-all duration-300 border-2 border-transparent hover:border-slate-200 hover:shadow-xl active:scale-95 text-left"
  >
    <div>
      <h3 className="font-bold text-slate-800 text-lg leading-tight group-hover:text-blue-900">{title}</h3>
      {subLabel && <p className="text-xs text-slate-500 font-medium uppercase tracking-wide mt-1">{subLabel}</p>}
    </div>
    <div className={`h-10 w-10 rounded-full flex items-center justify-center transition-colors ${colorClass}`}>
      <Icon size={20} />
    </div>
  </button>
);

const PrimaryButton = ({ children, onClick, icon: Icon }) => (
  <button
    onClick={onClick}
    className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full font-bold text-white shadow-lg shadow-blue-900/20 hover:shadow-blue-900/40 hover:-translate-y-1 transition-all active:translate-y-0 active:scale-95 text-lg"
    style={{ backgroundColor: 'rgb(21,35,62)' }}
  >
    {Icon && <Icon size={22} />}
    {children}
  </button>
);

// --- MAIN APP COMPONENT ---

export default function FishShopLanding() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const telegramUrl = `https://t.me/${SHOP_CONFIG.telegramUsername}`;

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-600">

      {/* --- NAVIGATION --- */}
      <nav className="fixed w-full top-0 z-50 bg-white/90 backdrop-blur-md border-b border-slate-100 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <div className="flex items-center gap-3">
              <img
                src="https://raw.githubusercontent.com/GingerMustache/fish_landing/refs/heads/main/public/logo.png"
                alt="Logo"
                className="h-10 w-10 object-contain rounded-lg"
              />
              <span className="font-bold text-xl text-slate-900 tracking-tight">
                {SHOP_CONFIG.name}
              </span>
            </div>

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center space-x-8">
              <a href="#about" className="font-medium hover:text-blue-900 transition-colors">О нас</a>
              <button
                onClick={() => window.open(telegramUrl, '_blank')}
                className="font-bold text-blue-900 hover:opacity-80 transition-opacity"
              >
                Телеграм
              </button>
            </div>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden p-2 text-slate-600"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-white border-t border-slate-100 absolute w-full shadow-xl">
            <div className="px-4 pt-2 pb-6 space-y-2">
              <a href="#about" onClick={() => setIsMobileMenuOpen(false)} className="block py-3 px-4 rounded-lg hover:bg-slate-50 text-slate-800 font-medium">О нас</a>
              <a href={telegramUrl} target="_blank" rel="noreferrer" className="block py-3 px-4 rounded-lg hover:bg-slate-50 text-blue-900 font-bold">Телеграм Канал</a>
            </div>
          </div>
        )}
      </nav>

      {/* --- HERO SECTION (Sprite Style Center Container) --- */}
      <section className="relative pt-32 pb-20 px-4 min-h-[80vh] flex flex-col items-center justify-center overflow-hidden">

        {/* Background blob for visual interest */}
        <div className="absolute top-0 left-0 w-full h-full bg-slate-50 z-0">
          <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-blue-100/50 rounded-full blur-3xl opacity-60"></div>
        </div>

        <div className="relative z-10 w-full max-w-5xl mx-auto text-center">

          {/* Main Headline */}
          <h1 className="text-4xl md:text-6xl font-black text-slate-900 mb-6 tracking-tight">
            Свежая рыба <br />
            <span style={{ color: 'rgb(21,35,62)' }}>на вашем столе</span>
          </h1>

          <p className="text-lg md:text-xl text-slate-500 mb-12 max-w-2xl mx-auto">
            Лучшие морепродукты в Новокузнецке. Находимся на Губернском рынке.
          </p>

          {/* --- THE CENTER CONTAINER (Sprite-like Floating Nav) --- */}
          <div className="bg-white p-3 rounded-[2rem] shadow-2xl shadow-blue-900/10 border border-slate-100 mx-auto max-w-4xl">
            <div className="flex flex-col md:flex-row gap-3">

              {/* Button 1: Route */}
              <ActionButton
                title="Проложить путь"
                subLabel="Навигатор"
                icon={Navigation}
                colorClass="bg-blue-100 text-blue-800"
                onClick={() => window.open(SHOP_CONFIG.yandexMapsRouteUrl, '_blank')}
              />

              {/* Button 2: 2GIS */}
              <ActionButton
                title="2ГИС"
                subLabel="Открыть карту"
                icon={MapPin}
                colorClass="bg-green-100 text-green-800"
                onClick={() => window.open(SHOP_CONFIG.twoGisUrl, '_blank')}
              />

              {/* Button 3: Yandex */}
              <ActionButton
                title="Яндекс Карты"
                subLabel="Открыть карту"
                icon={ExternalLink}
                colorClass="bg-yellow-100 text-yellow-800"
                onClick={() => window.open(SHOP_CONFIG.yandexMapLink, '_blank')}
              />

            </div>
          </div>

          <div className="mt-8 text-sm text-slate-400 font-medium">
            <MapPin className="inline w-4 h-4 mr-1 -mt-1" />
            {SHOP_CONFIG.address}
          </div>

        </div>
      </section>

      {/* --- ABOUT US SECTION --- */}
      <section id="about" className="py-24 bg-white relative">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">

          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-100 text-slate-600 text-sm font-semibold uppercase tracking-wider mb-8">
            <Info size={16} />
            О магазине
          </div>

          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-8">
            Качество, которому доверяют
          </h2>

          <div className="prose prose-lg mx-auto text-slate-600 mb-12 leading-relaxed">
            <p className="mb-4">
              «Рыба моя» — это не просто магазин, это место, где мы тщательно отбираем для вас самые свежие морепродукты. Мы работаем напрямую с проверенными поставщиками, чтобы гарантировать качество каждого товара на прилавке.
            </p>
            <p>
              В нашем ассортименте вы найдете всё: от свежемороженой рыбы до изысканных деликатесов. Мы гордимся тем, что наши покупатели возвращаются к нам снова и снова. Приходите и убедитесь сами!
            </p>
          </div>

          {/* Call to Action: Telegram */}
          <div className="bg-slate-50 rounded-3xl p-8 md:p-12 border border-slate-100">
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
          </div>

        </div>
      </section>

      {/* --- FOOTER --- */}
      <footer className="bg-slate-900 py-12 text-center text-slate-400 text-sm">
        <div className="max-w-7xl mx-auto px-4">
          <p className="font-bold text-slate-200 text-lg mb-2">{SHOP_CONFIG.name}</p>
          <p className="mb-8 opacity-60">{SHOP_CONFIG.address}</p>
          <p>© 2025 Все права защищены.</p>
        </div>
      </footer>

    </div>
  );
}