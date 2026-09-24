import React, { useState } from 'react';
import { X, Plus, Minus, ShoppingBag, Check } from 'lucide-react';
import type { Product } from '../../types/catalog';
import { useCart } from '../../context/CartContext';

interface ProductModalProps {
  product: Product | null;
  onClose: () => void;
}

export const ProductModal: React.FC<ProductModalProps> = ({ product, onClose }) => {
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [observation, setObservation] = useState('');
  const [isDone, setIsDone] = useState(false);

  if (!product) return null;

  const handleAdd = () => {
    addToCart(product, quantity, observation);
    setIsDone(true);
    setTimeout(() => {
      setIsDone(false);
      onClose();
    }, 600);
  };

  const itemTotal = product.rawPrice > 0 ? (product.rawPrice * quantity).toFixed(2).replace('.', ',') : product.price;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div
        className="bg-zinc-900 border border-zinc-800 rounded-3xl max-w-lg w-full overflow-hidden shadow-2xl relative animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2 rounded-full bg-black/60 hover:bg-zinc-800 text-zinc-300 hover:text-white transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Product Image Stage */}
        <div className="relative h-64 sm:h-72 w-full bg-zinc-950 overflow-hidden flex items-center justify-center">
          {/* Creative Ambient Backdrop */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <img
              src={product.image}
              alt=""
              aria-hidden="true"
              className="w-full h-full object-cover scale-150 blur-2xl opacity-40 brightness-75"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-zinc-900 via-zinc-900/30 to-black/40"></div>
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_transparent_40%,_rgba(9,9,11,0.5)_100%)]"></div>
          </div>

          {/* Foreground photo */}
          <div className="relative z-10 w-full h-full flex items-center justify-center p-4">
            <img
              src={product.image}
              alt={product.name}
              className="max-h-full max-w-full object-contain rounded-2xl drop-shadow-2xl"
            />
          </div>
          {product.badge && (
            <span className="absolute top-4 left-4 z-20 bg-brand-600 text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider shadow-lg">
              {product.badge}
            </span>
          )}
        </div>

        {/* Modal Body */}
        <div className="p-6">
          <div className="flex items-start justify-between gap-4 mb-2">
            <div>
              <span className="text-xs text-brand-400 font-semibold uppercase tracking-wider block mb-1">
                {product.categoryName}
              </span>
              <h2 className="text-2xl font-bold font-heading text-white">
                {product.name}
              </h2>
            </div>
            <div className="text-right">
              <span className="text-2xl font-bold font-heading text-amber-400">
                {product.price}
              </span>
            </div>
          </div>

          <p className="text-zinc-300 text-sm leading-relaxed mb-6">
            {product.description}
          </p>

          {/* Observations Input */}
          <div className="mb-6">
            <label className="block text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-2">
              Alguma observação? (Opcional)
            </label>
            <input
              type="text"
              value={observation}
              onChange={(e) => setObservation(e.target.value)}
              placeholder="Ex: Sem cebola, molho à parte, bem passado..."
              className="w-full px-4 py-3 rounded-xl bg-zinc-950 border border-zinc-800 text-white placeholder-zinc-500 text-sm focus:outline-none focus:border-brand-500 transition-colors"
            />
          </div>

          {/* Quantity and Add Button */}
          <div className="flex items-center justify-between gap-4 pt-4 border-t border-zinc-800">
            {/* Quantity selector */}
            <div className="flex items-center bg-zinc-950 border border-zinc-800 rounded-xl p-1">
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="w-9 h-9 rounded-lg flex items-center justify-center text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors"
              >
                <Minus className="w-4 h-4" />
              </button>
              <span className="w-10 text-center font-bold text-white text-sm">
                {quantity}
              </span>
              <button
                onClick={() => setQuantity(quantity + 1)}
                className="w-9 h-9 rounded-lg flex items-center justify-center text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors"
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>

            {/* Add to Cart button */}
            <button
              onClick={handleAdd}
              disabled={isDone}
              className="flex-1 inline-flex items-center justify-center gap-2 py-3.5 px-6 rounded-xl bg-brand-600 hover:bg-brand-500 text-white font-bold text-sm shadow-lg shadow-brand-900/50 transition-all active:scale-95 disabled:bg-emerald-600"
            >
              {isDone ? (
                <>
                  <Check className="w-5 h-5" />
                  <span>Adicionado ao Carrinho!</span>
                </>
              ) : (
                <>
                  <ShoppingBag className="w-5 h-5" />
                  <span>Adicionar • R$ {itemTotal}</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
