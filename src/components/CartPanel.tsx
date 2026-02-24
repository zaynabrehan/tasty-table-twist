import { X, Minus, Plus, ShoppingBag } from "lucide-react";
import { useStore } from "@/context/StoreContext";

interface CartPanelProps {
  isOpen: boolean;
  onClose: () => void;
}

const CartPanel = ({ isOpen, onClose }: CartPanelProps) => {
  const { cart, updateQuantity, removeFromCart, cartTotal, clearCart } = useStore();

  if (!isOpen) return null;

  return (
    <>
      {/* Overlay */}
      <div className="fixed inset-0 z-50 bg-background/60 backdrop-blur-sm" onClick={onClose} />

      {/* Panel */}
      <div className="fixed right-0 top-0 z-50 h-full w-full max-w-md bg-card border-l border-border animate-slide-in-right flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border">
          <h2 className="text-xl font-display font-bold text-foreground">Your Cart</h2>
          <button onClick={onClose} className="p-2 text-muted-foreground hover:text-foreground transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Cart Items */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {cart.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-muted-foreground">
              <ShoppingBag className="w-16 h-16 mb-4 opacity-30" />
              <p className="font-display text-lg">Your cart is empty</p>
              <p className="text-sm mt-1">Add some delicious items!</p>
            </div>
          ) : (
            cart.map((item) => (
              <div key={item.id} className="flex gap-3 bg-secondary/50 rounded-lg p-3">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-16 h-16 rounded-md object-cover"
                />
                <div className="flex-1 min-w-0">
                  <h4 className="font-display font-semibold text-sm text-foreground truncate">
                    {item.name}
                  </h4>
                  <p className="text-primary font-bold text-sm mt-0.5">
                    Rs. {item.price}
                  </p>
                  <div className="flex items-center gap-2 mt-2">
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      className="w-6 h-6 rounded-full bg-muted flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors"
                    >
                      <Minus className="w-3 h-3" />
                    </button>
                    <span className="text-sm font-bold text-foreground w-6 text-center">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      className="w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center hover:opacity-90 transition-opacity"
                    >
                      <Plus className="w-3 h-3" />
                    </button>
                  </div>
                </div>
                <button
                  onClick={() => removeFromCart(item.id)}
                  className="text-muted-foreground hover:text-destructive transition-colors self-start"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        {cart.length > 0 && (
          <div className="border-t border-border p-6 space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">Subtotal</span>
              <span className="text-lg font-display font-bold text-foreground">
                Rs. {cartTotal.toLocaleString()}
              </span>
            </div>
            <button className="w-full py-3 bg-gradient-gold text-primary-foreground font-bold rounded-lg hover:opacity-90 transition-opacity font-body">
              Proceed to Checkout
            </button>
            <button
              onClick={clearCart}
              className="w-full py-2 text-sm text-muted-foreground hover:text-destructive transition-colors"
            >
              Clear Cart
            </button>
          </div>
        )}
      </div>
    </>
  );
};

export default CartPanel;
