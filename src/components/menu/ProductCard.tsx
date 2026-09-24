import React, { useState } from 'react';
import { Plus, Check, Eye } from 'lucide-react';
import type { Product } from '../../types/catalog';
import { useCart } from '../../context/CartContext';
import confetti from 'canvas-confetti';

interface ProductCardProps {
  product: Product;
  onOpenDetails: (product: Product) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, onOpenDetails }) => {
  const { addToCart } = useCart();
  const [isAdded, setIsAdded] = useState(false);

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.stopPropagation();
    addToCart(product, 1);
    setIsAdded(true);

    // Subtle mini confetti trigger on add
    try {
      confetti({
        particleCount: 15,
        spread: 40,
        origin: { y: 0.8 },
        colors: ['#dc2626', '#f59e0b', '#ffffff']
      });
    } catch {}

    setTimeout(() => {
      setIsAdded(false);
    }, 1200);
  };

  return (
    <div
      onClick={() => onOpenDetails(product)}
      className="group bg-zinc-900/60 hover:bg-zinc-900 border border-zinc-800/80 hover:border-brand-600/50 rounded-2xl overflow-hidden transition-all duration-300 flex flex-col justify-between cursor-pointer hover:shadow-2xl hover:shadow-brand-950/40 relative"
    >
      {/* Product Image Stage */}
      <div className="relative h-48 sm:h-52 overflow-hidden bg-zinc-950 flex items-center justify-center">
        {/* Creative Ambient Backdrop: Eliminates empty gaps by extending warm food colors with organic diffused glow */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <img
            src={product.image}
            alt=""
            aria-hidden="true"
            className="w-full h-full object-cover scale-150 blur-2xl opacity-35 brightness-75 group-hover:opacity-55 group-hover:scale-175 transition-all duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/30 to-black/40"></div>
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_transparent_40%,_rgba(9,9,11,0.6)_100%)]"></div>
        </div>

        {/* Foreground Food Showcase: 100% complete, uncropped with 3D shadow */}
        <div className="relative z-10 w-full h-full flex items-center justify-center p-2.5">
          <img
            src={product.image}
            alt={product.name}
            className="max-h-full max-w-full object-contain rounded-xl drop-shadow-[0_10px_20px_rgba(0,0,0,0.7)] group-hover:scale-105 transition-transform duration-300"
            loading="lazy"
          />
        </div>

        {/* Badge */}
        {product.badge && (
          <span className="absolute top-2.5 left-2.5 z-20 bg-brand-600 text-white text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider shadow-md">
            {product.badge}
          </span>
        )}

        {/* Category tag - Elevated z-20 so it never renders behind the product on desktop */}
        <span className="absolute bottom-2.5 left-2.5 z-20 text-[11px] font-semibold text-zinc-200 bg-black/80 backdrop-blur-md px-2.5 py-1 rounded-md border border-white/20 shadow-lg pointer-events-none">
          {product.categoryName}
        </span>

        {/* Quick View overlay button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onOpenDetails(product);
          }}
          className="absolute top-2.5 right-2.5 z-20 p-2 rounded-full bg-black/60 hover:bg-brand-600 text-white opacity-0 group-hover:opacity-100 transition-all duration-200 backdrop-blur-sm"
          title="Ver detalhes"
        >
          <Eye className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Content */}
      <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between">
        <div>
          <div className="flex items-start justify-between gap-2 mb-1.5">
            <h3 className="font-heading font-bold text-base sm:text-lg text-white group-hover:text-brand-400 transition-colors line-clamp-1">
              {product.name}
            </h3>
          </div>

          <p className="text-zinc-400 text-xs sm:text-sm line-clamp-2 leading-relaxed">
            {product.description}
          </p>
        </div>

        {/* Price and Add Button */}
        <div className="mt-4 pt-3 border-t border-zinc-800/80 flex items-center justify-between">
          <div>
            <span className="text-xs text-zinc-500 block leading-tight">Valor</span>
            <span className="text-base sm:text-xl font-bold font-heading text-amber-400">
              {product.price}
            </span>
          </div>

          <button
            onClick={handleQuickAdd}
            className={`inline-flex items-center gap-1.5 px-3.5 sm:px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-200 active:scale-95 ${
              isAdded
                ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-900/50'
                : 'bg-brand-600 hover:bg-brand-500 text-white shadow-lg shadow-brand-900/40 hover:shadow-brand-600/30'
            }`}
          >
            {isAdded ? (
              <>
                <Check className="w-4 h-4" />
                <span>Adicionado!</span>
              </>
            ) : (
              <>
                <Plus className="w-4 h-4" />
                <span>Adicionar</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
