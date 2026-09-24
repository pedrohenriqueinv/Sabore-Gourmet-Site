import React from 'react';
import { ArrowUp, Heart } from 'lucide-react';
import { STORE_INFO } from '../../data/catalog';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-black border-t border-zinc-900 text-zinc-400 text-xs py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-10 pb-10 border-b border-zinc-900">
          
          {/* Brand */}
          <div className="space-y-3 md:col-span-2">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-zinc-950 p-1 flex items-center justify-center shadow-lg border border-amber-500/40 ring-2 ring-amber-500/20 overflow-hidden">
                <img
                  src="/sabore_logo_official.png"
                  alt="Sabore Gourmet Logo"
                  className="w-full h-full object-contain"
                />
              </div>
              <div>
                <span className="font-display tracking-wider text-2xl font-bold text-white">
                  SABORE GOURMET
                </span>
                <p className="text-[11px] text-brand-400 font-medium tracking-wide">
                  Hamburgueria & Pastelaria Artesanal
                </p>
              </div>
            </div>
            <p className="text-zinc-400 text-xs sm:text-sm max-w-md leading-relaxed">
              Hamburgueria & Pastelaria artesanal em Anápolis-GO. Ingredientes selecionados, sabor incomparável e atendimento de primeira para sua família.
            </p>
            <p className="text-zinc-500 text-xs">
              CNPJ e dados cadastrais registrados em Anápolis - GO.
            </p>
          </div>

          {/* Quick links */}
          <div>
            <h4 className="font-heading font-bold text-sm text-white mb-3 uppercase tracking-wider">
              Navegação
            </h4>
            <ul className="space-y-2 text-zinc-400">
              <li>
                <a href="#" onClick={(e) => { e.preventDefault(); scrollToTop(); }} className="hover:text-brand-400 transition-colors">
                  Início
                </a>
              </li>
              <li>
                <a href="#cardapio" className="hover:text-brand-400 transition-colors">
                  Cardápio Completo
                </a>
              </li>
              <li>
                <a href="#combos" className="hover:text-brand-400 transition-colors">
                  Combos & Barcas
                </a>
              </li>
              <li>
                <a href="#sobre" className="hover:text-brand-400 transition-colors">
                  Sobre Nós
                </a>
              </li>
              <li>
                <a href="#contato" className="hover:text-brand-400 transition-colors">
                  Horários e Contato
                </a>
              </li>
            </ul>
          </div>

          {/* Opening summary */}
          <div>
            <h4 className="font-heading font-bold text-sm text-white mb-3 uppercase tracking-wider">
              Atendimento
            </h4>
            <div className="space-y-1.5 text-zinc-400">
              <p className="text-white font-medium">Terça a Quinta:</p>
              <p className="text-zinc-400">18:00 às 23:15</p>
              <p className="text-white font-medium pt-2">Sexta a Domingo:</p>
              <p className="text-zinc-400">18:00 às 23:45</p>
              <p className="text-brand-400 font-semibold pt-2">Delivery: {STORE_INFO.whatsappFormatted}</p>
            </div>
          </div>

        </div>

        {/* Bottom row */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-zinc-500">
          <p className="flex items-center gap-1">
            © {new Date().getFullYear()} Sabore Gourmet. Feito com{' '}
            <Heart className="w-3.5 h-3.5 text-brand-500 fill-brand-500" /> para Anápolis.
          </p>

          <button
            onClick={scrollToTop}
            className="inline-flex items-center gap-2 p-2 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-zinc-400 hover:text-white transition-colors border border-zinc-800 text-xs"
          >
            <span>Voltar ao topo</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>

      </div>
    </footer>
  );
};
