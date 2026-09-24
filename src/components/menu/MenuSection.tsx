import React, { useState, useMemo } from 'react';
import { Search, X, Utensils, Sparkles } from 'lucide-react';
import { PRODUCTS_DATA, COMBOS_DATA } from '../../data/catalog';
import type { Product } from '../../types/catalog';
import { CategoryTabs } from './CategoryTabs';
import { ProductCard } from './ProductCard';
import { ProductModal } from './ProductModal';
import { useCart } from '../../context/CartContext';

export const MenuSection: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string>('todos');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const { addToCart } = useCart();

  // Filter products based on category and search
  const filteredProducts = useMemo(() => {
    return PRODUCTS_DATA.filter((product) => {
      const matchesCategory =
        activeCategory === 'todos' || product.categorySlug === activeCategory;
      const matchesSearch =
        searchQuery.trim() === '' ||
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.description.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [activeCategory, searchQuery]);

  // Filter combos if on "todos" or "combos"
  const filteredCombos = useMemo(() => {
    if (activeCategory !== 'todos' && activeCategory !== 'combos') {
      return [];
    }
    return COMBOS_DATA.filter((combo) => {
      return (
        searchQuery.trim() === '' ||
        combo.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        combo.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
    });
  }, [activeCategory, searchQuery]);

  return (
    <section id="cardapio" className="py-16 bg-[#09090b] relative min-h-screen">
      
      {/* Category Tabs (Sticky) */}
      <CategoryTabs
        activeCategory={activeCategory}
        onSelectCategory={setActiveCategory}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-10">
        
        {/* Header & Search Bar */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10 pb-6 border-b border-zinc-800/80">
          <div>
            <div className="inline-flex items-center gap-1.5 text-brand-500 font-semibold text-xs tracking-wider uppercase mb-1">
              <Utensils className="w-3.5 h-3.5" />
              CARDÁPIO COMPLETO
            </div>
            <h2 className="font-display text-4xl sm:text-5xl text-white tracking-wide uppercase">
              {activeCategory === 'todos'
                ? 'TODOS OS SABORES'
                : activeCategory === 'combos'
                ? 'COMBOS & BARCAS ESPECIAIS'
                : activeCategory === 'pasteis'
                ? 'PASTÉIS GOURMET ARTESANAIS'
                : activeCategory === 'hamburguer'
                ? 'HAMBÚRGUERES ARTESANAIS'
                : activeCategory.toUpperCase()}
            </h2>
            <p className="text-zinc-400 text-xs sm:text-sm mt-1">
              Mostrando {filteredProducts.length + filteredCombos.length} itens deliciosos
            </p>
          </div>

          {/* Search Box */}
          <div className="relative w-full md:w-80">
            <Search className="w-4 h-4 text-zinc-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Buscar lanche, pastel, combo..."
              className="w-full pl-10 pr-9 py-2.5 rounded-full bg-zinc-900 border border-zinc-800 text-white placeholder-zinc-500 text-xs sm:text-sm focus:outline-none focus:border-brand-500 transition-colors shadow-inner"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>

        {/* Special Banner for Pastéis if in "pasteis" category */}
        {activeCategory === 'pasteis' && (
          <div className="mb-10 p-6 rounded-3xl bg-gradient-to-r from-amber-950/40 via-zinc-900 to-zinc-900 border border-amber-500/30 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xl">
            <div className="space-y-2 text-center sm:text-left">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 font-bold text-xs uppercase tracking-wider">
                <Sparkles className="w-3.5 h-3.5" />
                Massa Sequinha & Super Recheada
              </span>
              <h3 className="text-2xl font-bold font-heading text-white">
                Mais de 25 Sabores de Pastéis Fritos na Hora!
              </h3>
              <p className="text-zinc-400 text-sm max-w-xl">
                Nossos pastéis são preparados na hora com ingredientes frescos de primeira linha e massa crocante tradicional.
              </p>
            </div>
            <div className="text-center sm:text-right shrink-0">
              <span className="text-xs text-zinc-400 block">A partir de apenas</span>
              <span className="text-3xl font-extrabold text-amber-400 font-heading">R$ 10,00</span>
            </div>
          </div>
        )}

        {/* Combos Grid (Rendered when viewing all or combos category) */}
        {filteredCombos.length > 0 && (
          <div className="mb-14">
            <div className="flex items-center gap-3 mb-6">
              <h3 className="font-display text-2xl sm:text-3xl text-white tracking-wide uppercase">
                COMBOS & BARCAS
              </h3>
              <span className="text-xs bg-brand-600/30 text-brand-400 font-bold px-2 py-0.5 rounded-full border border-brand-500/30">
                {filteredCombos.length} opções
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredCombos.map((combo) => (
                <div
                  key={combo.id}
                  className="group bg-zinc-900/60 hover:bg-zinc-900 border border-zinc-800/80 hover:border-brand-600/50 rounded-2xl overflow-hidden transition-all duration-300 flex flex-col justify-between hover:shadow-2xl hover:shadow-brand-950/30"
                >
                  {/* Combo Image Stage - Generous height & NO badge covering the burgers */}
                  <div className="relative h-56 sm:h-64 overflow-hidden bg-zinc-950">
                    <img
                      src={combo.image}
                      alt={combo.title}
                      className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/70 via-transparent to-transparent pointer-events-none"></div>
                    {combo.badge && (
                      <span className="absolute top-3 left-3 z-10 bg-brand-600 text-white text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider shadow-lg">
                        {combo.badge}
                      </span>
                    )}
                    <span className="absolute bottom-3 left-3 z-10 text-[11px] text-zinc-300 bg-black/75 backdrop-blur-md px-2.5 py-1 rounded-lg border border-white/15 shadow-md">
                      {combo.tag || "Combo Completo"}
                    </span>
                  </div>

                  <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between">
                    <div>
                      <h4 className="font-heading font-bold text-base sm:text-lg text-white group-hover:text-brand-400 transition-colors">
                        {combo.title}
                      </h4>
                      <p className="text-zinc-400 text-xs sm:text-sm mt-1.5 line-clamp-3 leading-relaxed">
                        {combo.description}
                      </p>
                    </div>

                    <div className="mt-4 pt-3 border-t border-zinc-800/80 flex items-center justify-between">
                      <div>
                        <span className="text-[10px] text-zinc-500 block leading-tight">Valor do Combo</span>
                        <span className="text-xl font-bold font-heading text-amber-400">
                          {combo.price}
                        </span>
                      </div>
                      <button
                        onClick={() => addToCart(combo, 1)}
                        className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-brand-600 hover:bg-brand-500 text-white font-semibold text-xs transition-colors shadow-lg shadow-brand-900/30 active:scale-95"
                      >
                        Pedir Combo
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Regular Products Grid */}
        {filteredProducts.length > 0 ? (
          <div>
            {activeCategory === 'todos' && (
              <div className="flex items-center gap-3 mb-6">
                <h3 className="font-display text-2xl sm:text-3xl text-white tracking-wide uppercase">
                  CARDÁPIO INDIVIDUAL
                </h3>
                <span className="text-xs bg-zinc-800 text-zinc-400 font-bold px-2 py-0.5 rounded-full">
                  {filteredProducts.length} itens
                </span>
              </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onOpenDetails={(p) => setSelectedProduct(p)}
                />
              ))}
            </div>
          </div>
        ) : (
          filteredCombos.length === 0 && (
            <div className="py-24 text-center">
              <div className="w-16 h-16 rounded-full bg-zinc-900 border border-zinc-800 flex items-center justify-center mx-auto mb-4 text-zinc-500">
                <Search className="w-8 h-8" />
              </div>
              <h3 className="text-lg font-bold text-white mb-1">Nenhum item encontrado</h3>
              <p className="text-sm text-zinc-400 max-w-sm mx-auto mb-6">
                Não encontramos nenhum produto correspondente a "{searchQuery}".
              </p>
              <button
                onClick={() => {
                  setSearchQuery('');
                  setActiveCategory('todos');
                }}
                className="px-6 py-2.5 rounded-full bg-brand-600 hover:bg-brand-500 text-white font-semibold text-xs"
              >
                Limpar filtros e ver tudo
              </button>
            </div>
          )
        )}

      </div>

      {/* Product Customization Modal */}
      <ProductModal
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
      />
    </section>
  );
};
