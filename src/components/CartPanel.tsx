import { X, Minus, Plus, ShoppingBag } from "lucide-react";
import { useStore } from "@/context/StoreContext";
import { motion, AnimatePresence } from "framer-motion";

interface CartPanelProps {
  isOpen: boolean;
  onClose: () => void;
}

const CartPanel = ({ isOpen, onClose }: CartPanelProps) => {
  const { cart, updateQuantity, removeFromCart, cartTotal, clearCart } = useStore();

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-background/60 backdrop-blur-sm"
            onClick={onClose}
          />

          {/* Panel */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
            className="fixed right-0 top-0 z-50 h-full w-full max-w-md bg-card border-l border-border flex flex-col"
          >
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
                  <motion.div
                    key={item.id}
                    layout
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="flex gap-3 glass-card rounded-xl p-3"
                  >
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-16 h-16 rounded-lg object-cover"
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
                          className="w-6 h-6 rounded-full bg-gradient-fire text-primary-foreground flex items-center justify-center hover:shadow-fire transition-shadow"
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
                  </motion.div>
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
                <button className="w-full py-3 bg-gradient-fire text-primary-foreground font-bold rounded-xl hover:shadow-fire hover:scale-[1.02] transition-all font-body">
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
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default CartPanel;
