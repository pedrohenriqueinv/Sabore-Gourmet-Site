import React, { createContext, useContext, useState, useEffect } from 'react';
import type { CartItem, Product, ComboItem } from '../types/catalog';
import { STORE_INFO } from '../data/catalog';

interface CartContextType {
  cart: CartItem[];
  addToCart: (product: Product | ComboItem, quantity?: number, observation?: string) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  isCartOpen: boolean;
  setIsCartOpen: (isOpen: boolean) => void;
  deliveryType: 'delivery' | 'takeout';
  setDeliveryType: (type: 'delivery' | 'takeout') => void;
  customerName: string;
  setCustomerName: (name: string) => void;
  customerAddress: string;
  setCustomerAddress: (address: string) => void;
  customerNeighborhood: string;
  setCustomerNeighborhood: (neigh: string) => void;
  paymentMethod: string;
  setPaymentMethod: (pm: string) => void;
  changeFor: string;
  setChangeFor: (val: string) => void;
  totalItems: number;
  subtotal: number;
  deliveryFee: number;
  total: number;
  generateWhatsAppUrl: () => string;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('sabore_cart');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [isCartOpen, setIsCartOpen] = useState(false);
  const [deliveryType, setDeliveryType] = useState<'delivery' | 'takeout'>('delivery');
  const [customerName, setCustomerName] = useState('');
  const [customerAddress, setCustomerAddress] = useState('');
  const [customerNeighborhood, setCustomerNeighborhood] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('PIX');
  const [changeFor, setChangeFor] = useState('');

  useEffect(() => {
    try {
      localStorage.setItem('sabore_cart', JSON.stringify(cart));
    } catch (e) {
      console.error(e);
    }
  }, [cart]);

  const addToCart = (product: Product | ComboItem, quantity = 1, observation = '') => {
    setCart((prev) => {
      const existingIndex = prev.findIndex((item) => item.product.id === product.id);
      if (existingIndex > -1) {
        const next = [...prev];
        next[existingIndex] = {
          ...next[existingIndex],
          quantity: next[existingIndex].quantity + quantity,
          observation: observation || next[existingIndex].observation,
        };
        return next;
      } else {
        return [...prev, { product, quantity, observation }];
      }
    });
    setIsCartOpen(true);
  };

  const removeFromCart = (productId: string) => {
    setCart((prev) => prev.filter((item) => item.product.id !== productId));
  };

  const updateQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setCart((prev) =>
      prev.map((item) =>
        item.product.id === productId ? { ...item, quantity } : item
      )
    );
  };

  const clearCart = () => {
    setCart([]);
  };

  const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);

  const subtotal = cart.reduce((acc, item) => {
    const itemPrice = item.product.rawPrice > 0 ? item.product.rawPrice : 0;
    return acc + itemPrice * item.quantity;
  }, 0);

  const deliveryFee = deliveryType === 'delivery' && subtotal > 0 ? 5.00 : 0.00;
  const total = subtotal + deliveryFee;

  const generateWhatsAppUrl = (): string => {
    let message = `🍔 *NOVO PEDIDO - SABORE GOURMET* 🍔\n`;
    message += `--------------------------------------\n`;
    
    if (customerName) {
      message += `👤 *Cliente:* ${customerName}\n`;
    }
    
    message += `🛵 *Tipo:* ${deliveryType === 'delivery' ? 'Entrega em Domicílio' : 'Retirada no Balcão'}\n`;
    
    if (deliveryType === 'delivery' && customerAddress) {
      message += `📍 *Endereço:* ${customerAddress} ${customerNeighborhood ? `(${customerNeighborhood})` : ''}\n`;
    }
    
    message += `💳 *Forma de Pagamento:* ${paymentMethod}\n`;
    if (paymentMethod === 'Dinheiro' && changeFor) {
      message += `💵 *Troco para:* R$ ${changeFor}\n`;
    }
    
    message += `\n📋 *ITENS DO PEDIDO:*\n`;
    cart.forEach((item, index) => {
      const name = 'title' in item.product ? item.product.title : item.product.name;
      const priceUnit = item.product.rawPrice > 0 ? `R$ ${item.product.rawPrice.toFixed(2).replace('.', ',')}` : item.product.price;
      const subtotalItem = item.product.rawPrice > 0 ? (item.product.rawPrice * item.quantity).toFixed(2).replace('.', ',') : '';
      
      message += `${index + 1}. *${item.quantity}x ${name}* (${priceUnit})${subtotalItem ? ` = R$ ${subtotalItem}` : ''}\n`;
      if (item.observation) {
        message += `   _Obs: ${item.observation}_\n`;
      }
    });

    message += `\n--------------------------------------\n`;
    message += `Subtotal: R$ ${subtotal.toFixed(2).replace('.', ',')}\n`;
    if (deliveryType === 'delivery') {
      message += `Taxa de Entrega: R$ ${deliveryFee.toFixed(2).replace('.', ',')}\n`;
    }
    message += `*TOTAL: R$ ${total.toFixed(2).replace('.', ',')}*\n`;
    message += `--------------------------------------\n`;
    message += `Por favor, confirmem o recebimento e o tempo estimado de entrega! 🙏`;

    return `https://wa.me/${STORE_INFO.whatsapp}?text=${encodeURIComponent(message)}`;
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        isCartOpen,
        setIsCartOpen,
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
        totalItems,
        subtotal,
        deliveryFee,
        total,
        generateWhatsAppUrl,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart deve ser usado dentro de um CartProvider');
  }
  return context;
};
