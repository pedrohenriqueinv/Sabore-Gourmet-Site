import React, { useState, useEffect } from 'react';
import { ShoppingBag, Menu, X } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { STORE_INFO } from '../../data/catalog';

export const Navbar: React.FC = () => {
  const { totalItems, setIsCartOpen, subtotal } = useCart();
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState<'inicio' | 'cardapio' | 'sobre' | 'contato'>('inicio');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.scrollY > 30;
      setIsScrolled(scrolled);

      const cardapio = document.getElementById('cardapio');
      const sobre = document.getElementById('sobre');
      const contato = document.getElementById('contato');

      const scrollPos = window.scrollY + 200;

      if (contato && scrollPos >= contato.offsetTop) {
        setActiveSection('contato');
      } else if (sobre && scrollPos >= sobre.offsetTop) {
        setActiveSection('sobre');
      } else if (cardapio && scrollPos >= cardapio.offsetTop) {
        setActiveSection('cardapio');
      } else {
        setActiveSection('inicio');
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollTo = (id: string, section: 'inicio' | 'cardapio' | 'sobre' | 'contato') => {
    setIsMobileMenuOpen(false);
    setActiveSection(section);
    if (id === 'inicio') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-[#09090b]/95 backdrop-blur-md border-b border-zinc-800/90 py-2.5 shadow-2xl'
          : 'bg-[#09090b]/90 backdrop-blur-sm border-b border-white/10 py-3 shadow-lg'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-8 flex items-center justify-between">
        
        {/* Official Brand Logo */}
        <a
          href="#"
          className="flex items-center gap-3 group focus:outline-none"
          onClick={(e) => {
            e.preventDefault();
            scrollTo('inicio', 'inicio');
          }}
        >
          <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-zinc-950 p-1 flex items-center justify-center shadow-lg border border-amber-500/50 group-hover:scale-105 transition-transform overflow-hidden ring-2 ring-amber-500/20">
            <img
              src="/sabore_logo_official.png"
              alt="Sabore Gourmet Logo"
              className="w-full h-full object-contain"
            />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-display tracking-wider text-xl sm:text-2xl font-bold text-white leading-none">
                SABORE
              </span>
              <span className="text-[10px] px-1.5 py-0.2 rounded bg-brand-600/30 text-brand-400 font-bold uppercase tracking-wider border border-brand-500/30">
                Gourmet
              </span>
            </div>
            <p className="text-[10px] text-zinc-400 font-medium tracking-wide">
              Hamburgueria & Pastelaria
            </p>
          </div>
        </a>

        {/* Center Navigation Links - ALWAYS VISIBLE FROM Y=0 */}
        <div className="hidden md:flex items-center gap-8 text-sm font-medium text-zinc-300">
          <button
            onClick={() => scrollTo('inicio', 'inicio')}
            className={`transition-colors relative py-1 cursor-pointer ${
              activeSection === 'inicio'
                ? 'text-white font-bold after:content-[""] after:absolute after:-bottom-1.5 after:left-1/2 after:-translate-x-1/2 after:w-6 after:h-0.5 after:bg-brand-500 after:rounded-full'
                : 'hover:text-white text-zinc-300'
            }`}
          >
            Início
          </button>
          <button
            onClick={() => scrollTo('cardapio', 'cardapio')}
            className={`transition-colors relative py-1 cursor-pointer ${
              activeSection === 'cardapio'
                ? 'text-white font-bold after:content-[""] after:absolute after:-bottom-1.5 after:left-1/2 after:-translate-x-1/2 after:w-6 after:h-0.5 after:bg-brand-500 after:rounded-full'
                : 'hover:text-white text-zinc-300'
            }`}
          >
            Cardápio
          </button>
          <button
            onClick={() => scrollTo('sobre', 'sobre')}
            className={`transition-colors relative py-1 cursor-pointer ${
              activeSection === 'sobre'
                ? 'text-white font-bold after:content-[""] after:absolute after:-bottom-1.5 after:left-1/2 after:-translate-x-1/2 after:w-6 after:h-0.5 after:bg-brand-500 after:rounded-full'
                : 'hover:text-white text-zinc-300'
            }`}
          >
            Sobre nós
          </button>
          <button
            onClick={() => scrollTo('contato', 'contato')}
            className={`transition-colors relative py-1 cursor-pointer ${
              activeSection === 'contato'
                ? 'text-white font-bold after:content-[""] after:absolute after:-bottom-1.5 after:left-1/2 after:-translate-x-1/2 after:w-6 after:h-0.5 after:bg-brand-500 after:rounded-full'
                : 'hover:text-white text-zinc-300'
            }`}
          >
            Contato
          </button>
        </div>

        {/* Right Action: Pill Button ALWAYS VISIBLE */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => setIsCartOpen(true)}
            className="relative inline-flex items-center gap-2 px-5 sm:px-6 py-2.5 rounded-full bg-brand-600 hover:bg-brand-500 text-white font-semibold text-xs sm:text-sm box-glow-btn transition-all duration-300 border border-white/20 active:scale-95 shadow-xl cursor-pointer"
          >
            <div className="relative">
              <ShoppingBag className="w-4 h-4" />
              {totalItems > 0 && (
                <span className="absolute -top-2 -right-2.5 w-4 h-4 rounded-full bg-white text-brand-700 text-[10px] font-bold flex items-center justify-center shadow-md animate-bounce">
                  {totalItems}
                </span>
              )}
            </div>
            <span>Fazer pedido</span>
            {subtotal > 0 && (
              <span className="text-[11px] bg-brand-800/90 px-1.5 py-0.5 rounded-full font-bold text-amber-200 border border-brand-700">
                R$ {subtotal.toFixed(2).replace('.', ',')}
              </span>
            )}
            <span className="text-white text-base leading-none">→</span>
          </button>

          {/* Mobile Menu Toggle Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 rounded-xl bg-zinc-900/90 border border-zinc-800 text-zinc-300 hover:text-white cursor-pointer"
            aria-label="Menu"
          >
            {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-zinc-950/98 border-b border-zinc-800 px-6 py-5 space-y-4 animate-in fade-in slide-in-from-top-4 duration-200 backdrop-blur-md">
          <div className="flex flex-col space-y-3 font-medium text-zinc-300 text-sm">
            <button
              onClick={() => scrollTo('inicio', 'inicio')}
              className={`text-left py-2 border-b border-zinc-900 ${
                activeSection === 'inicio' ? 'text-brand-500 font-bold' : ''
              }`}
            >
              Início
            </button>
            <button
              onClick={() => scrollTo('cardapio', 'cardapio')}
              className={`text-left py-2 border-b border-zinc-900 ${
                activeSection === 'cardapio' ? 'text-brand-500 font-bold' : ''
              }`}
            >
              Cardápio Completo (93 itens)
            </button>
            <button
              onClick={() => scrollTo('sobre', 'sobre')}
              className={`text-left py-2 border-b border-zinc-900 ${
                activeSection === 'sobre' ? 'text-brand-500 font-bold' : ''
              }`}
            >
              Sobre nós
            </button>
            <button
              onClick={() => scrollTo('contato', 'contato')}
              className={`text-left py-2 border-b border-zinc-900 ${
                activeSection === 'contato' ? 'text-brand-500 font-bold' : ''
              }`}
            >
              Contato & Localização
            </button>
          </div>

          <div className="pt-2 text-xs text-zinc-400">
            <p className="text-emerald-400 font-semibold">● Aberto Hoje das 18h às 23h45</p>
            <p className="mt-1">{STORE_INFO.address}</p>
          </div>
        </div>
      )}
    </nav>
  );
};
