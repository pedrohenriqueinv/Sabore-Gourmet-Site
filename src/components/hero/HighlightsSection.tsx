import React from 'react';
import { Flame, Plus } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { COMBOS_DATA, PRODUCTS_DATA } from '../../data/catalog';
import type { Product, ComboItem } from '../../types/catalog';

export const HighlightsSection: React.FC = () => {
  const { addToCart } = useCart();

  // Curated list of best sellers
  const featuredBurgers: Product[] = [
    PRODUCTS_DATA.find(p => p.name === "Top Burger") || PRODUCTS_DATA[12],
    PRODUCTS_DATA.find(p => p.name === "Duplo Cheddar") || PRODUCTS_DATA[11],
    PRODUCTS_DATA.find(p => p.name === "Duplo Bacon") || PRODUCTS_DATA[9],
  ].filter(Boolean);

  const featuredCombos: ComboItem[] = [
    COMBOS_DATA.find(c => c.title.includes("Barca Mini Sanduíche")) || COMBOS_DATA[15],
    COMBOS_DATA.find(c => c.title.includes("BARCA CARNE - Pequena")) || COMBOS_DATA[10],
    COMBOS_DATA.find(c => c.title.includes("Combo Duplo Misto")) || COMBOS_DATA[1],
  ].filter(Boolean);

  return (
    <section id="combos" className="py-20 bg-zinc-950 relative border-t border-zinc-900 overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-brand-900/15 rounded-full blur-[140px] pointer-events-none"></div>
      <div className="absolute top-1/3 right-0 w-96 h-96 bg-amber-600/10 rounded-full blur-[140px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-950 border border-brand-800 text-brand-400 text-xs font-semibold mb-3">
            <Flame className="w-3.5 h-3.5 text-brand-500 fill-brand-500" />
            OS QUERIDINHOS DE ANÁPOLIS
          </div>
          <h2 className="font-display text-4xl sm:text-6xl text-white tracking-wide uppercase">
            CAMPEÕES DE <span className="text-brand-500">VENDAS</span>
          </h2>
          <p className="text-zinc-400 text-sm sm:text-base mt-2">
            Os pratos e barcas mais pedidos pelos nossos clientes. Se você está em dúvida, comece por um desses!
          </p>
        </div>

        {/* Combos & Barcas Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {featuredCombos.map((combo) => (
            <div
              key={combo.id}
              className="group bg-zinc-900/70 border border-zinc-800/80 rounded-2xl overflow-hidden hover:border-brand-600/60 transition-all duration-300 hover:shadow-2xl hover:shadow-brand-950 flex flex-col justify-between"
            >
              <div className="relative h-56 sm:h-64 overflow-hidden bg-zinc-950">
                <img
                  src={combo.image}
                  alt={combo.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/20 to-transparent"></div>
                
                {combo.badge && (
                  <span className="absolute top-3 left-3 bg-brand-600 text-white text-[11px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider shadow-lg">
                    {combo.badge}
                  </span>
                )}

                <div className="absolute bottom-3 left-3 z-10">
                  <span className="text-[11px] text-zinc-300 bg-black/75 px-2.5 py-1 rounded-lg backdrop-blur-md border border-white/10 shadow-md">
                    {combo.tag || "Destaque"}
                  </span>
                </div>
              </div>

              <div className="p-5 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="font-heading font-bold text-lg text-white group-hover:text-brand-400 transition-colors">
                    {combo.title}
                  </h3>
                  <p className="text-zinc-400 text-xs sm:text-sm mt-2 line-clamp-3 leading-relaxed">
                    {combo.description}
                  </p>
                </div>

                <div className="mt-5 pt-4 border-t border-zinc-800/80 flex items-center justify-between">
                  <div>
                    <span className="text-[10px] text-zinc-500 block leading-tight">Valor</span>
                    <span className="text-xl sm:text-2xl font-bold font-heading text-amber-400">
                      {combo.price}
                    </span>
                  </div>
                  <button
                    onClick={() => addToCart(combo, 1)}
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-brand-600 hover:bg-brand-500 text-white font-semibold text-xs transition-colors shadow-lg shadow-brand-900/40 active:scale-95"
                  >
                    <Plus className="w-4 h-4" />
                    Adicionar
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Featured Burgers Row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {featuredBurgers.map((burger) => (
            <div
              key={burger.id}
              className="group bg-zinc-900/50 border border-zinc-800/70 rounded-2xl overflow-hidden hover:border-brand-500/50 transition-all duration-300 flex flex-col justify-between"
            >
              <div className="relative h-48 overflow-hidden bg-zinc-950 flex items-center justify-center">
                {/* Creative Ambient Backdrop */}
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                  <img
                    src={burger.image}
                    alt=""
                    aria-hidden="true"
                    className="w-full h-full object-cover scale-150 blur-2xl opacity-35 brightness-75 group-hover:opacity-55 group-hover:scale-175 transition-all duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/30 to-black/40"></div>
                  <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_transparent_40%,_rgba(9,9,11,0.6)_100%)]"></div>
                </div>

                {/* Foreground burger */}
                <div className="relative z-10 w-full h-full flex items-center justify-center p-2.5">
                  <img
                    src={burger.image}
                    alt={burger.name}
                    className="max-h-full max-w-full object-contain rounded-xl drop-shadow-[0_10px_20px_rgba(0,0,0,0.7)] group-hover:scale-105 transition-transform duration-300"
                    loading="lazy"
                  />
                </div>
                <span className="absolute top-3 right-3 z-20 bg-zinc-900/90 text-amber-400 text-xs font-bold px-2.5 py-1 rounded-full border border-amber-500/30">
                  {burger.price}
                </span>
              </div>

              <div className="p-5 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="font-heading font-bold text-base text-white group-hover:text-brand-400 transition-colors">
                    {burger.name}
                  </h3>
                  <p className="text-zinc-400 text-xs mt-1.5 line-clamp-2 leading-relaxed">
                    {burger.description}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-zinc-800/60 flex items-center justify-between">
                  <span className="text-[11px] text-zinc-500 font-medium">Hambúrguer Artesanal</span>
                  <button
                    onClick={() => addToCart(burger, 1)}
                    className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-zinc-800 hover:bg-brand-600 text-white font-medium text-xs transition-colors"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    Quero esse
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
