import { CartProvider } from './context/CartContext';
import { CartDrawer } from './components/cart/CartDrawer';
import Site from './Site';

export default function App() {
  return (
    <CartProvider>
      <Site />
      <CartDrawer />
    </CartProvider>
  );
}
