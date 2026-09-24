import React from 'react';
import { CATEGORIES } from '../../data/catalog';
import { 
  Flame, 
  Sandwich, 
  UtensilsCrossed, 
  Sparkles, 
  Boxes, 
  CupSoda, 
  IceCream, 
  Cake, 
  Layers
} from 'lucide-react';

interface CategoryTabsProps {
  activeCategory: string;
  onSelectCategory: (slug: string) => void;
}

export const CategoryTabs: React.FC<CategoryTabsProps> = ({
  activeCategory,
  onSelectCategory,
}) => {
  const getIcon = (name: string) => {
    switch (name) {
      case 'Flame': return <Flame className="w-4 h-4" />;
      case 'Sandwich': return <Sandwich className="w-4 h-4" />;
      case 'UtensilsCrossed': return <UtensilsCrossed className="w-4 h-4" />;
      case 'Sparkles': return <Sparkles className="w-4 h-4" />;
      case 'Boxes': return <Boxes className="w-4 h-4" />;
      case 'CupSoda': return <CupSoda className="w-4 h-4" />;
      case 'IceCream': return <IceCream className="w-4 h-4" />;
      case 'Cake': return <Cake className="w-4 h-4" />;
      default: return <Layers className="w-4 h-4" />;
    }
  };

  return (
    <div className="sticky top-[60px] md:top-[68px] z-30 bg-[#09090b]/95 backdrop-blur-md border-y border-zinc-800/80 py-3 shadow-xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar scroll-smooth py-1">
          
          {/* "Todos" button */}
          <button
            onClick={() => onSelectCategory('todos')}
            className={`flex items-center gap-2 px-4 py-2 rounded-full text-xs sm:text-sm font-semibold whitespace-nowrap transition-all duration-200 ${
              activeCategory === 'todos'
                ? 'bg-brand-600 text-white shadow-lg shadow-brand-600/30 border border-brand-400/40'
                : 'bg-zinc-900/90 text-zinc-400 hover:text-white hover:bg-zinc-800 border border-zinc-800'
            }`}
          >
            <Layers className="w-4 h-4" />
            <span>Ver Tudo</span>
          </button>

          {/* Dynamic Categories */}
          {CATEGORIES.map((cat) => {
            const isActive = activeCategory === cat.slug;
            return (
              <button
                key={cat.slug}
                onClick={() => onSelectCategory(cat.slug)}
                className={`flex items-center gap-2 px-4 py-2 rounded-full text-xs sm:text-sm font-semibold whitespace-nowrap transition-all duration-200 ${
                  isActive
                    ? 'bg-brand-600 text-white shadow-lg shadow-brand-600/30 border border-brand-400/40'
                    : 'bg-zinc-900/90 text-zinc-400 hover:text-white hover:bg-zinc-800 border border-zinc-800'
                }`}
              >
                {getIcon(cat.iconName)}
                <span>{cat.name}</span>
                <span
                  className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                    isActive ? 'bg-brand-800 text-brand-200' : 'bg-zinc-800 text-zinc-500'
                  }`}
                >
                  {cat.totalItems}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
