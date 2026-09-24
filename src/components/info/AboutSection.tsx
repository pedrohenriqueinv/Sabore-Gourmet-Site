import React from 'react';
import { Flame, ShieldCheck, HeartHandshake, Award } from 'lucide-react';

export const AboutSection: React.FC = () => {
  return (
    <section id="sobre" className="py-20 bg-zinc-950 border-t border-zinc-900 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          
          {/* Visual Showcase */}
          <div className="relative">
            <div className="relative rounded-3xl overflow-hidden border border-zinc-800 shadow-2xl shadow-brand-950/60 aspect-[4/3] bg-zinc-900">
              <img
                src="https://images.unsplash.com/photo-1550547660-d9450f859349?auto=format&fit=crop&w=1000&q=80"
                alt="Hamburgueria e Pastelaria Sabore Gourmet"
                className="w-full h-full object-cover filter contrast-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
              
              <div className="absolute bottom-6 left-6 right-6 p-4 rounded-2xl bg-zinc-950/80 backdrop-blur-md border border-white/10">
                <p className="text-brand-400 font-bold text-xs uppercase tracking-wider">Tradição em Anápolis</p>
                <p className="text-white font-heading font-bold text-lg">Amor e dedicação em cada mordida</p>
              </div>
            </div>

            {/* Floating badge */}
            <div className="absolute -top-4 -right-4 p-4 rounded-2xl bg-brand-600 border border-brand-400/40 text-white shadow-xl hidden sm:flex items-center gap-3 animate-float">
              <Flame className="w-8 h-8 text-amber-300" />
              <div>
                <p className="text-xs uppercase font-semibold text-brand-200">Qualidade</p>
                <p className="text-base font-bold font-heading">100% Artesanal</p>
              </div>
            </div>
          </div>

          {/* Story & Values */}
          <div className="space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-950 border border-brand-800 text-brand-400 text-xs font-semibold">
              <Award className="w-3.5 h-3.5 text-brand-500" />
              CONHEÇA A SABORE GOURMET
            </div>

            <h2 className="font-display text-4xl sm:text-5xl text-white tracking-wide uppercase leading-tight">
              O SABOR QUE CONQUISTOU A <span className="text-brand-500">CIDADE</span>
            </h2>

            <p className="text-zinc-300 text-sm sm:text-base leading-relaxed">
              A <strong>Sabore Gourmet Hamburgueria e Pastelaria</strong> nasceu com a missão de unir duas das maiores paixões gastronômicas do brasileiro em um só lugar: hambúrgueres artesanais suculentos e pastéis crocantes com recheio de verdade.
            </p>

            <p className="text-zinc-400 text-sm sm:text-base leading-relaxed">
              Trabalhamos apenas com carnes selecionadas, pães artesanais fresquinhos, molhos de receita exclusiva e pastéis fritos na hora com óleo sempre renovado. Seja para um jantar individual, um lanche com a família ou para comemorar com os amigos ao redor das nossas famosas <strong>Barcas Especiais</strong>, você tem a garantia de uma refeição inesquecível.
            </p>

            {/* Pillars */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
              <div className="p-4 rounded-2xl bg-zinc-900/60 border border-zinc-800/80 flex items-start gap-3">
                <div className="p-2 rounded-xl bg-brand-600/20 text-brand-400 shrink-0">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-white text-sm">Higiene e Qualidade</h4>
                  <p className="text-zinc-400 text-xs mt-1">Padrão rigoroso em cada processo da cozinha.</p>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-zinc-900/60 border border-zinc-800/80 flex items-start gap-3">
                <div className="p-2 rounded-xl bg-amber-600/20 text-amber-400 shrink-0">
                  <HeartHandshake className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-white text-sm">Atendimento Ágil</h4>
                  <p className="text-zinc-400 text-xs mt-1">Equipe pronta para te atender com carinho.</p>
                </div>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
