import React, { useState } from 'react';
import { MapPin, Clock, Send, Menu, X, Navigation } from 'lucide-react';

// --- CONFIGURATION (EDIT THESE VALUES / НАСТРОЙКИ) ---
const SHOP_CONFIG = {
  name: "Рыба моя", // Shop Name
  // TODO: REPLACE WITH YOUR TELEGRAM USERNAME (no @ symbol)
  telegramUsername: "ryba_moya_gubern",
  // TODO: REPLACE WITH YOUR ADDRESS
  address: "ул. Кузнецова, 6А, Новокузнецк (Губернский рынок)",
  // TODO: REPLACE WITH GOOGLE MAPS LINK FOR THE 'OPEN MAP' BUTTON
  yandexMapLink: "https://yandex.ru/maps/org/ryba_moya/143227952967/?ll=87.136978%2C53.746522&z=17",
  // TODO: REPLACE WITH YOUR YANDEX MAPS URL (for QR generation)
  yandexMapsRouteUrl: "https://yandex.ru/maps/237/novokuznetsk/?ll=87.136978%2C53.746522&mode=routes&rtext=~53.746724%2C87.137262&rtt=auto&ruri=~ymapsbm1%3A%2F%2Forg%3Foid%3D143227952967&z=17",
  // TODO: REPLACE WITH YOUR 2GIS URL (for QR generation)
  twoGisUrl: "https://2gis.ru/novokuznetsk/firm/70000001031547900",
};

// --- COMPONENTS ---

const Button = ({ children, primary, className = "", onClick, icon: Icon }) => (
  <button
    onClick={onClick}
    className={`flex items-center justify-center gap-2 px-6 py-3 rounded-full font-bold transition-all transform hover:scale-105 active:scale-95 ${primary
      ? "text-white hover:opacity-90 shadow-lg"
      : "bg-white hover:bg-slate-50 border-2 border-slate-200"
      } ${className}`}
    style={primary ? { backgroundColor: 'rgb(21,35,62)' } : { color: 'rgb(21,35,62)' }}
  >
    {Icon && <Icon size={20} />}
    {children}
  </button>
);

// Simple QR Card Component
const QrCard = ({ title, url, label, colorClass }) => (
  <div className="bg-white p-6 rounded-2xl shadow-md border border-slate-100 flex flex-col items-center text-center hover:shadow-xl transition-shadow">
    <h3 className="font-bold text-slate-800 mb-4">{title}</h3>
    <div className="bg-slate-50 p-2 rounded-xl mb-4">
      {/* Generates a QR code automatically from the URL provided */}
      <img
        src={`https://api.qrserver.com/v1/create-qr-code/?size=150x150&color=1e293b&data=${encodeURIComponent(url)}`}
        alt={`${title} QR`}
        className="w-40 h-40 mix-blend-multiply"
      />
    </div>
    <span className={`text-sm font-semibold px-3 py-1 rounded-full ${colorClass}`}>
      {label}
    </span>
  </div>
);

// --- MAIN APP COMPONENT ---

export default function FishShopLanding() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Telegram URL helper
  const telegramUrl = `https://t.me/${SHOP_CONFIG.telegramUsername}`;

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-600">

      {/* --- NAVIGATION --- */}
      <nav className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-slate-100 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <div className="flex items-center gap-2">
              {/* TODO: REPLACE 'logo.png' WITH YOUR LOGO FILENAME */}
              <img
                src="/logo.png"
                alt={`${SHOP_CONFIG.name} Logo`}
                className="h-12 w-12 object-contain rounded-lg"
              />
              {/* TODO: CHANGE SHOP NAME TEXT HERE */}
              <span className="font-bold text-2xl text-slate-900 tracking-tight">
                {SHOP_CONFIG.name}
              </span>
            </div>

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center space-x-8">
              <a href="#find-us" className="font-medium hover:opacity-70 transition-colors" style={{ color: 'rgb(21,35,62)' }}>Как найти</a>
              <a href="#contact" className="font-medium hover:opacity-70 transition-colors" style={{ color: 'rgb(21,35,62)' }}>Контакты</a>
              <Button primary icon={Send} onClick={() => window.open(telegramUrl, '_blank')}>
                Телеграм
              </Button>
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

        {/* Mobile Menu Dropdown */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-white border-t border-slate-100 absolute w-full shadow-lg">
            <div className="px-4 pt-2 pb-6 space-y-2">
              <a href="#find-us" className="block py-3 px-4 rounded-lg hover:bg-slate-50 text-slate-800 font-medium">Как найти</a>
              <a href="#contact" className="block py-3 px-4 rounded-lg hover:bg-slate-50 text-slate-800 font-medium">Контакты</a>
            </div>
          </div>
        )}
      </nav>

      {/* --- HERO SECTION (Simple) --- */}

      {/* --- SECTION 1: HOW TO FIND US (Maps & QRs) --- */}
      <section id="find-us" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-slate-900 flex items-center justify-center gap-2">
              <Navigation style={{ color: 'rgb(21,35,62)' }} />
              Как до нас добраться
            </h2>
            <p className="text-slate-500 mt-2">Сканируйте, чтобы открыть в удобном приложении</p>
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-center">

            {/* Left: Map QR Codes */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {/* YANDEX QR */}
              <QrCard
                title="Яндекс Карты"
                url={SHOP_CONFIG.yandexMapsRouteUrl}
                label="Проложить маршрут"
                colorClass="bg-yellow-100 text-yellow-800"
              />

              {/* 2GIS QR */}
              <QrCard
                title="2ГИС"
                url={SHOP_CONFIG.twoGisUrl}
                label="Показать на карте"
                colorClass="bg-green-100 text-green-800"
              />
            </div>

            {/* Right: Visual Map Placeholder */}
            <div className="h-full min-h-[310px] bg-slate-100 rounded-3xl overflow-hidden relative border border-slate-200">
              {/* TODO: REPLACE 'map-location.jpg' WITH YOUR IMAGE FILENAME */}
              <img
                src="/map_yandex.png"
                alt="Map Preview"
                className="absolute inset-0 w-full h-full object-cover opacity-80"
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <Button onClick={() => window.open(SHOP_CONFIG.yandexMapLink, '_blank')} className="shadow-2xl">
                  Открыть Яндекс Карты
                </Button>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* --- SECTION 2: CONTACT & TELEGRAM --- */}
      <section id="contact" className="py-20 bg-slate-50 border-t border-slate-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-[2rem] shadow-xl overflow-hidden">
            <div className="grid md:grid-cols-2">

              {/* Contact Details */}
              <div className="p-10 flex flex-col justify-center text-white" style={{ backgroundColor: 'rgb(21,35,62)' }}>
                <h2 className="text-3xl font-bold mb-8">Контакты</h2>

                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <MapPin className="shrink-0 opacity-70 mt-1" />
                    <div>
                      <p className="opacity-70 text-sm uppercase tracking-wider font-semibold mb-1">Адрес</p>
                      {/* Uses config address */}
                      <p className="text-xl font-medium">{SHOP_CONFIG.address}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <Clock className="shrink-0 opacity-70 mt-1" />
                    <div>
                      <p className="opacity-70 text-sm uppercase tracking-wider font-semibold mb-1">Часы работы</p>
                      <p className="font-medium">Ежедневно: 09:00 - 20:00</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Telegram QR */}
              <div className="p-10 flex flex-col items-center justify-center text-center bg-white">
                <div className="bg-slate-50 p-4 rounded-2xl mb-6">
                  <img
                    src={`https://api.qrserver.com/v1/create-qr-code/?size=200x200&color=15233e&data=${encodeURIComponent(telegramUrl)}`}
                    alt="Telegram QR"
                    className="w-40 h-40 mix-blend-multiply"
                  />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-2">Наш Телеграм Канал</h3>
                <p className="text-slate-500 mb-6 text-sm">Сканируйте, чтобы узнать о свежем улове и ценах.</p>
                <Button primary icon={Send} onClick={() => window.open(telegramUrl, '_blank')} className="w-full">
                  Перейти в канал
                </Button>
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* --- FOOTER --- */}
      <footer className="bg-white py-8 text-center text-slate-400 text-sm">
        <p>© 2025 {SHOP_CONFIG.name}. Все права защищены.</p>
      </footer>

    </div>
  );
}