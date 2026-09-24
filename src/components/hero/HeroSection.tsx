import React from 'react';
import { ShoppingBag, ChevronDown, Sandwich, UtensilsCrossed, Boxes, Bike, Clock } from 'lucide-react';

export const HeroSection: React.FC = () => {

  const scrollTo = (id: string) => {
    if (id === 'inicio') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      const el = document.getElementById(id);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative w-full min-h-[720px] sm:min-h-[820px] lg:min-h-screen flex flex-col justify-between overflow-hidden bg-black select-none pt-24 sm:pt-28 pb-8 px-4">
      
      {/* 1. Full-Bleed Artwork Background (New Master 4K image: Pastel Crocante + Burger Gourmet) */}
      <div className="absolute inset-0 w-full h-full z-0 overflow-hidden pointer-events-none">
        <img
          src="/hero_sabore_gourmet_4k.jpg"
          alt="Sabore Gourmet - Hambúrgueres & Pastéis Artesanais"
          className="w-full h-full object-cover object-center"
        />

        {/* Cinematic Vignettes for Seamless Transition */}
        <div className="absolute inset-0 bg-radial-glow opacity-15"></div>
        <div className="absolute top-0 inset-x-0 h-20 bg-gradient-to-b from-black/70 to-transparent"></div>
        <div className="absolute bottom-0 inset-x-0 h-32 bg-gradient-to-t from-[#09090b] via-[#09090b]/70 to-transparent"></div>
      </div>

      {/* 2. Top Spacer to balance navbar */}
      <div className="flex-1 min-h-[40px] sm:min-h-[80px]"></div>

      {/* 4. Bottom Controls: Action CTA + Real Category Cards */}
      <div className="relative z-20 w-full max-w-5xl mx-auto flex flex-col items-center gap-4 sm:gap-5">
        
        {/* Real Interactive CTA Button: Fazer Pedido (redireciona para o cardápio) */}
        <div className="flex flex-col items-center gap-2 z-30">
          <button
            onClick={() => scrollTo('cardapio')}
            className="inline-flex items-center gap-3 px-10 sm:px-14 py-3.5 sm:py-4 rounded-full bg-brand-600 hover:bg-brand-500 text-white font-bold text-base sm:text-lg box-glow-btn transition-all duration-300 border border-white/25 shadow-2xl active:scale-95 group cursor-pointer"
          >
            <ShoppingBag className="w-5 h-5 group-hover:rotate-12 transition-transform" />
            <span className="tracking-wide">Fazer pedido</span>
            <span className="text-xl leading-none font-sans group-hover:translate-x-1.5 transition-transform">→</span>
          </button>

          <button
            onClick={() => scrollTo('cardapio')}
            className="inline-flex items-center gap-1.5 text-zinc-300 hover:text-white text-xs sm:text-sm font-medium transition-colors drop-shadow cursor-pointer"
          >
            <Clock className="w-3.5 h-3.5 text-brand-400" />
            <span>Ou explore os 93 itens do cardápio</span>
            <ChevronDown className="w-4 h-4 animate-bounce ml-0.5" />
          </button>
        </div>

        {/* Real Interactive Category Buttons (100% Clickable & Responsive) */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 sm:gap-3 w-full text-center z-30">
          
          {/* 1. Hambúrgueres */}
          <button
            onClick={() => scrollTo('cardapio')}
            className="py-3 px-3.5 rounded-2xl bg-black/75 hover:bg-zinc-900 border border-zinc-800 hover:border-brand-500/60 backdrop-blur-md transition-all text-left group flex items-center gap-3 shadow-lg active:scale-95 cursor-pointer"
          >
            <div className="w-9 h-9 rounded-xl bg-brand-600/20 text-brand-400 flex items-center justify-center shrink-0 group-hover:bg-brand-600 group-hover:text-white transition-colors">
              <Sandwich className="w-4 h-4" />
            </div>
            <div>
              <span className="text-xs font-bold text-white block group-hover:text-brand-400 transition-colors uppercase tracking-wider leading-tight">
                Hambúrgueres
              </span>
              <span className="text-[10px] text-zinc-400 block mt-0.5">13 opções suculentas</span>
            </div>
          </button>

          {/* 2. Pastéis Gourmet */}
          <button
            onClick={() => scrollTo('cardapio')}
            className="py-3 px-3.5 rounded-2xl bg-black/75 hover:bg-zinc-900 border border-zinc-800 hover:border-amber-500/60 backdrop-blur-md transition-all text-left group flex items-center gap-3 shadow-lg active:scale-95 cursor-pointer"
          >
            <div className="w-9 h-9 rounded-xl bg-amber-600/20 text-amber-400 flex items-center justify-center shrink-0 group-hover:bg-amber-600 group-hover:text-white transition-colors">
              <UtensilsCrossed className="w-4 h-4" />
            </div>
            <div>
              <span className="text-xs font-bold text-white block group-hover:text-amber-400 transition-colors uppercase tracking-wider leading-tight">
                Pastéis Gourmet
              </span>
              <span className="text-[10px] text-zinc-400 block mt-0.5">+25 sabores crocantes</span>
            </div>
          </button>

          {/* 3. Barcas Gigantes */}
          <button
            onClick={() => scrollTo('combos')}
            className="py-3 px-3.5 rounded-2xl bg-black/75 hover:bg-zinc-900 border border-zinc-800 hover:border-brand-500/60 backdrop-blur-md transition-all text-left group flex items-center gap-3 shadow-lg active:scale-95 cursor-pointer"
          >
            <div className="w-9 h-9 rounded-xl bg-brand-600/20 text-brand-400 flex items-center justify-center shrink-0 group-hover:bg-brand-600 group-hover:text-white transition-colors">
              <Boxes className="w-4 h-4" />
            </div>
            <div>
              <span className="text-xs font-bold text-white block group-hover:text-brand-400 transition-colors uppercase tracking-wider leading-tight">
                Barcas Gigantes
              </span>
              <span className="text-[10px] text-zinc-400 block mt-0.5">Batata, cheddar e bacon</span>
            </div>
          </button>

          {/* 4. Delivery Anápolis */}
          <button
            onClick={() => scrollTo('contato')}
            className="py-3 px-3.5 rounded-2xl bg-black/75 hover:bg-zinc-900 border border-zinc-800 hover:border-emerald-500/60 backdrop-blur-md transition-all text-left group flex items-center gap-3 shadow-lg active:scale-95 cursor-pointer"
          >
            <div className="w-9 h-9 rounded-xl bg-emerald-600/20 text-emerald-400 flex items-center justify-center shrink-0 group-hover:bg-emerald-600 group-hover:text-white transition-colors">
              <Bike className="w-4 h-4" />
            </div>
            <div>
              <span className="text-xs font-bold text-white block group-hover:text-emerald-400 transition-colors uppercase tracking-wider leading-tight">
                Delivery Anápolis
              </span>
              <span className="text-[10px] text-zinc-400 block mt-0.5">Entrega rápida e segura</span>
            </div>
          </button>

        </div>

      </div>

    </section>
  );
};
