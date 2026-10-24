import React, { useState } from 'react';
import { WatchProvider, useWatches } from './context/WatchContext';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { HomePage } from './components/HomePage';
import { ShopPage } from './components/ShopPage';
import { AboutPage } from './components/AboutPage';
import { ContactSection } from './components/ContactSection';
import { WatchDetailModal } from './components/WatchDetailModal';
import { InquiryModal } from './components/InquiryModal';
import { InventoryManagerModal } from './components/InventoryManagerModal';
import { Watch } from './types/watch';

function MainApp() {
  const [activeTab, setActiveTab] = useState<string>('home');
  const {
    selectedWatch,
    setSelectedWatch,
    inquiryWatch,
    setInquiryWatch
  } = useWatches();

  const handleNav = (tab: string) => {
    setActiveTab(tab);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectWatch = (watch: Watch) => {
    setSelectedWatch(watch);
  };

  const handleInquireWatch = (watch: Watch) => {
    setInquiryWatch(watch);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#faf9f6] text-neutral-900 font-sans-body">
      {/* Sticky Navigation Bar */}
      <Navbar activeTab={activeTab} setActiveTab={handleNav} />

      {/* Main View Area */}
      <main className="flex-1">
        {activeTab === 'home' && (
          <HomePage
            onNav={handleNav}
            onSelectWatch={handleSelectWatch}
            onInquireWatch={handleInquireWatch}
          />
        )}
        {activeTab === 'shop' && (
          <ShopPage
            onSelectWatch={handleSelectWatch}
            onInquireWatch={handleInquireWatch}
          />
        )}
        {activeTab === 'about' && (
          <AboutPage
            onShopClick={() => handleNav('shop')}
            onContactClick={() => handleNav('contact')}
          />
        )}
        {activeTab === 'contact' && (
          <ContactSection />
        )}
      </main>

      {/* Footer */}
      <Footer onNav={handleNav} />

      {/* Modals */}
      <WatchDetailModal
        watch={selectedWatch}
        onClose={() => setSelectedWatch(null)}
        onInquire={(w) => {
          setSelectedWatch(null);
          setInquiryWatch(w);
        }}
      />

      <InquiryModal
        watch={inquiryWatch}
        onClose={() => setInquiryWatch(null)}
      />

      <InventoryManagerModal />
    </div>
  );
}

export default function App() {
  return (
    <WatchProvider>
      <MainApp />
    </WatchProvider>
  );
}