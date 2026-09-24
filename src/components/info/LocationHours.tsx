import React from 'react';
import { MapPin, Clock, Phone, MessageSquare, Navigation, CheckCircle2 } from 'lucide-react';
import { STORE_INFO } from '../../data/catalog';

export const LocationHours: React.FC = () => {
  return (
    <section id="contato" className="py-20 bg-[#09090b] border-t border-zinc-900 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-900 border border-zinc-800 text-zinc-400 text-xs font-semibold mb-3">
            <MapPin className="w-3.5 h-3.5 text-brand-500" />
            ONDE ESTAMOS & QUANDO ABRIMOS
          </div>
          <h2 className="font-display text-4xl sm:text-5xl text-white tracking-wide uppercase">
            LOCALIZAÇÃO & <span className="text-brand-500">HORÁRIOS</span>
          </h2>
          <p className="text-zinc-400 text-sm sm:text-base mt-2">
            Venha retirar seu pedido quentinho no balcão ou peça para receber no conforto de casa em Anápolis.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Card 1: Endereço & Local */}
          <div className="p-6 sm:p-8 rounded-3xl bg-zinc-900/60 border border-zinc-800/80 flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-brand-600/20 border border-brand-500/30 flex items-center justify-center text-brand-400 mb-5">
                <MapPin className="w-6 h-6" />
              </div>
              <h3 className="font-heading font-bold text-xl text-white mb-2">
                Nosso Endereço
              </h3>
              <p className="text-zinc-300 text-sm leading-relaxed mb-4">
                {STORE_INFO.address}
              </p>
              <div className="p-3 rounded-xl bg-zinc-950/80 border border-zinc-800/60 text-xs text-zinc-400 space-y-1">
                <p className="flex items-center gap-2 text-zinc-300 font-semibold">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                  Bairro Paraíso • Anápolis-GO
                </p>
                <p>Retirada no balcão e Delivery disponível.</p>
              </div>
            </div>

            <div className="mt-6 pt-6 border-t border-zinc-800">
              <a
                href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(STORE_INFO.address)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 w-full py-3 px-4 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-white font-semibold text-xs transition-colors"
              >
                <Navigation className="w-4 h-4 text-brand-400" />
                <span>Como Chegar no Maps</span>
              </a>
            </div>
          </div>

          {/* Card 2: Horários de Atendimento */}
          <div className="p-6 sm:p-8 rounded-3xl bg-zinc-900/60 border border-zinc-800/80 flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-amber-600/20 border border-amber-500/30 flex items-center justify-center text-amber-400 mb-5">
                <Clock className="w-6 h-6" />
              </div>
              <h3 className="font-heading font-bold text-xl text-white mb-2">
                Horário de Atendimento
              </h3>
              <p className="text-zinc-400 text-sm mb-4">
                Estamos abertos no horário do jantar:
              </p>

              <div className="space-y-2.5 text-xs">
                <div className="flex justify-between p-2.5 rounded-xl bg-zinc-950/60 border border-zinc-800/60">
                  <span className="text-zinc-300 font-medium">Terça a Quinta</span>
                  <span className="text-amber-400 font-bold">18:00 - 23:15</span>
                </div>
                <div className="flex justify-between p-2.5 rounded-xl bg-zinc-950/60 border border-zinc-800/60">
                  <span className="text-zinc-300 font-medium">Sexta a Domingo</span>
                  <span className="text-amber-400 font-bold">18:00 - 23:45</span>
                </div>
                <div className="flex justify-between p-2.5 rounded-xl bg-zinc-950/40 border border-zinc-800/40 text-zinc-500">
                  <span>Segunda-feira</span>
                  <span>Fechado</span>
                </div>
              </div>
            </div>

            <div className="mt-6 pt-6 border-t border-zinc-800">
              <span className="flex items-center justify-center gap-2 text-emerald-400 text-xs font-semibold py-2">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping"></span>
                Cozinha Aberta Hoje às 18h
              </span>
            </div>
          </div>

          {/* Card 3: Pedidos por Telefone e WhatsApp */}
          <div className="p-6 sm:p-8 rounded-3xl bg-zinc-900/60 border border-zinc-800/80 flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-emerald-600/20 border border-emerald-500/30 flex items-center justify-center text-emerald-400 mb-5">
                <Phone className="w-6 h-6" />
              </div>
              <h3 className="font-heading font-bold text-xl text-white mb-2">
                Fale com a Gente
              </h3>
              <p className="text-zinc-400 text-sm mb-4">
                Atendimento rápido para dúvidas, eventos ou pedidos direto no balcão:
              </p>

              <div className="space-y-3">
                <a
                  href={`https://wa.me/${STORE_INFO.whatsapp}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 p-3 rounded-xl bg-emerald-950/40 border border-emerald-800/60 text-white hover:bg-emerald-900/50 transition-colors"
                >
                  <MessageSquare className="w-5 h-5 text-emerald-400 shrink-0" />
                  <div>
                    <p className="text-[10px] text-emerald-400 uppercase font-bold">WhatsApp Oficial</p>
                    <p className="text-sm font-semibold">{STORE_INFO.whatsappFormatted}</p>
                  </div>
                </a>

                <a
                  href={`tel:${STORE_INFO.phones[1].replace(/\D/g, '')}`}
                  className="flex items-center gap-3 p-3 rounded-xl bg-zinc-950/60 border border-zinc-800/60 text-white hover:bg-zinc-800 transition-colors"
                >
                  <Phone className="w-5 h-5 text-zinc-400 shrink-0" />
                  <div>
                    <p className="text-[10px] text-zinc-400 uppercase font-bold">Telefone Secundário</p>
                    <p className="text-sm font-semibold">{STORE_INFO.phones[1]}</p>
                  </div>
                </a>
              </div>
            </div>

            <div className="mt-6 pt-6 border-t border-zinc-800">
              <a
                href={`https://wa.me/${STORE_INFO.whatsapp}?text=${encodeURIComponent('Olá! Gostaria de fazer uma pergunta sobre o cardápio.')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 w-full py-3 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs transition-colors shadow-lg shadow-emerald-950"
              >
                <span>Chamar no WhatsApp</span>
              </a>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
