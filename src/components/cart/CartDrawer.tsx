import React, { useEffect, useState } from 'react';
import { 
  X, 
  Trash2, 
  Plus, 
  Minus, 
  ShoppingBag, 
  Send, 
  Bike, 
  Store, 
  CreditCard, 
  Banknote, 
  QrCode,
  AlertCircle
} from 'lucide-react';
import { useCart } from '../../context/CartContext';
import confetti from 'canvas-confetti';

export const CartDrawer: React.FC = () => {
  const {
    cart,
    isCartOpen,
    setIsCartOpen,
    removeFromCart,
    updateQuantity,
    clearCart,
    deliveryType,
    setDeliveryType,
    customerName,
    setCustomerName,
    customerAddress,
    setCustomerAddress,
    customerNeighborhood,
    setCustomerNeighborhood,
    paymentMethod,
    setPaymentMethod,
    changeFor,
    setChangeFor,
    subtotal,
    deliveryFee,
    total,
    generateWhatsAppUrl,
  } = useCart();

  const [formError, setFormError] = useState('');

  useEffect(() => {
    if (!isCartOpen) return;
    const previousOverflow = document.body.style.overflow;
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setIsCartOpen(false);
    };
    document.body.style.overflow = 'hidden';
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isCartOpen, setIsCartOpen]);

  if (!isCartOpen) return null;

  const handleCheckout = () => {
    if (cart.length === 0) {
      setFormError('Seu carrinho está vazio!');
      return;
    }

    if (!customerName.trim()) {
      setFormError('Por favor, informe seu nome.');
      return;
    }

    if (deliveryType === 'delivery' && !customerAddress.trim()) {
      setFormError('Por favor, informe seu endereço de entrega.');
      return;
    }

    if (deliveryType === 'delivery' && !customerNeighborhood.trim()) {
      setFormError('Por favor, informe seu bairro.');
      return;
    }

    setFormError('');

    try {
      confetti({
        particleCount: 50,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#22c55e', '#dc2626', '#f59e0b']
      });
    } catch {}

    const url = generateWhatsAppUrl();
    window.open(url, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden" role="dialog" aria-modal="true" aria-label="Meu Pedido">
      {/* Backdrop */}
      <div
        onClick={() => setIsCartOpen(false)}
        className="absolute inset-0 bg-black/80 backdrop-blur-sm transition-opacity duration-300 animate-in fade-in"
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-zinc-950 border-l border-zinc-800 text-white flex flex-col shadow-2xl animate-in slide-in-from-right duration-300">
          
          {/* Drawer Header */}
          <div className="p-5 border-b border-zinc-800/80 flex items-center justify-between bg-zinc-900/60">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-brand-600/30 border border-brand-500/40 flex items-center justify-center text-brand-400">
                <ShoppingBag className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-heading font-bold text-lg text-white">
                  Meu Pedido
                </h3>
                <p className="text-xs text-zinc-400">
                  {cart.length} {cart.length === 1 ? 'item selecionado' : 'itens selecionados'}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              {cart.length > 0 && (
                <button
                  onClick={clearCart}
                  className="text-xs text-zinc-400 hover:text-red-400 px-2 py-1 rounded transition-colors"
                  title="Esvaziar carrinho"
                >
                  Limpar
                </button>
              )}
              <button
                onClick={() => setIsCartOpen(false)}
                className="p-2 rounded-lg bg-zinc-800/80 hover:bg-zinc-700 text-zinc-400 hover:text-white transition-colors"
                aria-label="Fechar meu pedido"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Drawer Body */}
          <div className="flex-1 overflow-y-auto p-5 space-y-6">
            
            {/* Empty State */}
            {cart.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center py-16">
                <div className="w-20 h-20 rounded-full bg-zinc-900 border border-zinc-800 flex items-center justify-center text-zinc-600 mb-4">
                  <ShoppingBag className="w-10 h-10" />
                </div>
                <h4 className="font-heading font-bold text-lg text-white mb-2">
                  Seu carrinho está vazio
                </h4>
                <p className="text-xs sm:text-sm text-zinc-400 max-w-xs mb-6">
                  Dê uma olhada em nossos hambúrgueres artesanais, barcas e pastéis deliciosos!
                </p>
                <button
                  onClick={() => {
                    setIsCartOpen(false);
                    document.getElementById('cardapio')?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="px-6 py-2.5 rounded-full bg-brand-600 hover:bg-brand-500 text-white font-semibold text-xs transition-colors shadow-lg shadow-brand-900/40"
                >
                  Ver Cardápio
                </button>
              </div>
            ) : (
              <>
                {/* List of Cart Items */}
                <div className="space-y-3">
                  {cart.map((item) => {
                    const name = 'title' in item.product ? item.product.title : item.product.name;
                    const price = item.product.price;
                    const itemSubtotal = item.product.rawPrice > 0
                      ? `R$ ${(item.product.rawPrice * item.quantity).toFixed(2).replace('.', ',')}`
                      : price;

                    return (
                      <div
                        key={item.product.id}
                        className="p-3.5 rounded-2xl bg-zinc-900/60 border border-zinc-800/80 flex gap-3 items-center group hover:border-zinc-700 transition-colors"
                      >
                        {/* Thumbnail */}
                        <div className="w-16 h-16 rounded-xl bg-zinc-950 overflow-hidden shrink-0 border border-zinc-800">
                          <img
                            src={item.product.image}
                            alt={name}
                            className="w-full h-full object-cover"
                          />
                        </div>

                        {/* Info */}
                        <div className="flex-1 min-w-0">
                          <h4 className="font-heading font-bold text-sm text-white truncate">
                            {name}
                          </h4>
                          <p className="text-xs text-amber-400 font-semibold mt-0.5">
                            {itemSubtotal}
                          </p>
                          {item.observation && (
                            <p className="text-[11px] text-zinc-400 italic truncate mt-1">
                              Obs: {item.observation}
                            </p>
                          )}
                        </div>

                        {/* Controls */}
                        <div className="flex items-center gap-1.5 shrink-0">
                          <div className="flex items-center bg-zinc-950 border border-zinc-800 rounded-lg p-0.5">
                            <button
                              onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                              className="w-6 h-6 rounded flex items-center justify-center text-zinc-400 hover:text-white transition-colors"
                              aria-label={`Diminuir quantidade de ${name}`}
                            >
                              <Minus className="w-3 h-3" />
                            </button>
                            <span className="w-6 text-center font-bold text-xs text-white">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                              className="w-6 h-6 rounded flex items-center justify-center text-zinc-400 hover:text-white transition-colors"
                              aria-label={`Aumentar quantidade de ${name}`}
                            >
                              <Plus className="w-3 h-3" />
                            </button>
                          </div>

                          <button
                            onClick={() => removeFromCart(item.product.id)}
                            className="p-1.5 text-zinc-500 hover:text-red-400 transition-colors rounded-lg"
                            title="Remover item"
                            aria-label={`Remover ${name}`}
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Delivery Type Switch */}
                <div className="space-y-3 pt-2">
                  <label className="block text-xs font-semibold text-zinc-400 uppercase tracking-wider">
                    Como deseja receber?
                  </label>
                  <div className="grid grid-cols-2 gap-2 p-1 rounded-xl bg-zinc-900 border border-zinc-800">
                    <button
                      type="button"
                      onClick={() => setDeliveryType('delivery')}
                      className={`flex items-center justify-center gap-2 py-2 px-3 rounded-lg text-xs font-semibold transition-all ${
                        deliveryType === 'delivery'
                          ? 'bg-brand-600 text-white shadow-md'
                          : 'text-zinc-400 hover:text-white'
                      }`}
                    >
                      <Bike className="w-4 h-4" />
                      <span>Entrega (+ R$ 5,00)</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setDeliveryType('takeout')}
                      className={`flex items-center justify-center gap-2 py-2 px-3 rounded-lg text-xs font-semibold transition-all ${
                        deliveryType === 'takeout'
                          ? 'bg-brand-600 text-white shadow-md'
                          : 'text-zinc-400 hover:text-white'
                      }`}
                    >
                      <Store className="w-4 h-4" />
                      <span>Retirada (Grátis)</span>
                    </button>
                  </div>
                </div>

                {/* Customer Information Form */}
                <div className="space-y-3 pt-2 border-t border-zinc-900">
                  <label className="block text-xs font-semibold text-zinc-400 uppercase tracking-wider">
                    Seus Dados
                  </label>

                  <div>
                    <input
                      type="text"
                      value={customerName}
                      onChange={(e) => setCustomerName(e.target.value)}
                      placeholder="Seu nome completo *"
                      aria-label="Seu nome completo"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-900 border border-zinc-800 text-white placeholder-zinc-500 text-xs focus:outline-none focus:border-brand-500 transition-colors"
                    />
                  </div>

                  {deliveryType === 'delivery' && (
                    <div className="space-y-2">
                      <input
                        type="text"
                        value={customerAddress}
                        onChange={(e) => setCustomerAddress(e.target.value)}
                        placeholder="Rua, Número e Complemento *"
                        aria-label="Rua, número e complemento"
                        className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-900 border border-zinc-800 text-white placeholder-zinc-500 text-xs focus:outline-none focus:border-brand-500 transition-colors"
                      />
                      <input
                        type="text"
                        value={customerNeighborhood}
                        onChange={(e) => setCustomerNeighborhood(e.target.value)}
                        placeholder="Bairro em Anápolis *"
                        aria-label="Bairro em Anápolis"
                        className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-900 border border-zinc-800 text-white placeholder-zinc-500 text-xs focus:outline-none focus:border-brand-500 transition-colors"
                      />
                    </div>
                  )}
                </div>

                {/* Payment Method */}
                <div className="space-y-3 pt-2 border-t border-zinc-900">
                  <label className="block text-xs font-semibold text-zinc-400 uppercase tracking-wider">
                    Forma de Pagamento
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    {[
                      { id: 'PIX', label: 'PIX', icon: <QrCode className="w-3.5 h-3.5" /> },
                      { id: 'Cartão', label: 'Cartão', icon: <CreditCard className="w-3.5 h-3.5" /> },
                      { id: 'Dinheiro', label: 'Dinheiro', icon: <Banknote className="w-3.5 h-3.5" /> },
                    ].map((pm) => (
                      <button
                        key={pm.id}
                        type="button"
                        onClick={() => setPaymentMethod(pm.id)}
                        className={`flex flex-col items-center justify-center gap-1 py-2 px-1 rounded-xl text-xs font-medium border transition-all ${
                          paymentMethod === pm.id
                            ? 'bg-brand-600/20 border-brand-500 text-white font-semibold'
                            : 'bg-zinc-900 border-zinc-800 text-zinc-400 hover:text-white'
                        }`}
                      >
                        {pm.icon}
                        <span>{pm.label}</span>
                      </button>
                    ))}
                  </div>

                  {paymentMethod === 'Dinheiro' && (
                    <div className="pt-1">
                      <input
                        type="text"
                        value={changeFor}
                        onChange={(e) => setChangeFor(e.target.value)}
                        placeholder="Precisa de troco para quanto? (Ex: R$ 50,00)"
                        className="w-full px-3.5 py-2 rounded-xl bg-zinc-900 border border-zinc-800 text-white placeholder-zinc-500 text-xs focus:outline-none focus:border-brand-500"
                      />
                    </div>
                  )}
                </div>
              </>
            )}

          </div>

          {/* Drawer Footer with Totals and WhatsApp CTA */}
          {cart.length > 0 && (
            <div className="p-5 border-t border-zinc-800 bg-zinc-900/90 space-y-4">
              {formError && (
                <div className="flex items-center gap-2 p-2.5 rounded-lg bg-red-950/80 border border-red-800 text-red-300 text-xs">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{formError}</span>
                </div>
              )}

              {/* Price summary */}
              <div className="space-y-1.5 text-xs">
                <div className="flex justify-between text-zinc-400">
                  <span>Subtotal</span>
                  <span>R$ {subtotal.toFixed(2).replace('.', ',')}</span>
                </div>
                <div className="flex justify-between text-zinc-400">
                  <span>Taxa de Entrega</span>
                  <span>{deliveryType === 'delivery' ? `R$ ${deliveryFee.toFixed(2).replace('.', ',')}` : 'Grátis'}</span>
                </div>
                <div className="flex justify-between text-white font-bold text-base pt-2 border-t border-zinc-800">
                  <span>Total do Pedido</span>
                  <span className="text-amber-400 font-heading text-xl">
                    R$ {total.toFixed(2).replace('.', ',')}
                  </span>
                </div>
              </div>

              {/* WhatsApp Checkout Button */}
              <button
                onClick={handleCheckout}
                className="w-full flex items-center justify-center gap-2.5 py-3.5 px-6 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm shadow-xl shadow-emerald-950 hover:shadow-emerald-900 transition-all duration-300 active:scale-98 group"
              >
                <Send className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                <span>Finalizar Pedido no WhatsApp</span>
              </button>

              <p className="text-[11px] text-zinc-500 text-center">
                Seu pedido será enviado diretamente para a cozinha pelo WhatsApp!
              </p>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};
