import { useStore } from "@/context/StoreContext";
import { AnimatePresence, motion } from "framer-motion";
import { Minus, Plus, X } from "lucide-react";
import { useState } from "react";

const Checkout = () => {
  const { cart, updateQuantity, removeFromCart, cartTotal, clearCart } = useStore();

  // Form state
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");

  const handlePlaceOrder = () => {
    if (!name || !email || !phone || !address) {
      alert("Please fill in all delivery details.");
      return;
    }
    alert(`Order placed successfully!\n\nName: ${name}\nEmail: ${email}\nPhone: ${phone}\nAddress: ${address}\nTotal: Rs. ${cartTotal}`);
    clearCart();
    setName("");
    setEmail("");
    setPhone("");
    setAddress("");
  };

  if (!cart || cart.length === 0) {
    return (
      <div className="container mx-auto p-10 text-center text-muted-foreground">
        <p>Your cart is empty. Add some items to checkout.</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6 max-w-4xl">
      <h1 className="text-3xl font-bold mb-6 text-foreground">Checkout</h1>

      {/* Cart Items */}
      <AnimatePresence>
        {cart.map((item) => (
          <motion.div
            key={item.id}
            layout
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="flex items-center gap-4 mb-4 glass-card rounded-xl p-4"
          >
            <img
              src={item.image}
              alt={item.name}
              className="w-16 h-16 rounded-lg object-cover"
            />
            <div className="flex-1 min-w-0">
              <h4 className="font-bold text-foreground">{item.name}</h4>
              <p className="text-primary font-bold mt-1">Rs. {item.price}</p>
              <div className="flex items-center gap-2 mt-2">
                <button
                  aria-label="Decrease quantity"
                  onClick={() => updateQuantity(item.id, item.quantity - 1)}
                  className="w-6 h-6 rounded-full bg-muted flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors"
                >
                  <Minus className="w-3 h-3" />
                </button>
                <span className="text-sm font-bold text-foreground w-6 text-center">{item.quantity}</span>
                <button
                  aria-label="Increase quantity"
                  onClick={() => updateQuantity(item.id, item.quantity + 1)}
                  className="w-6 h-6 rounded-full bg-gradient-fire text-primary-foreground flex items-center justify-center hover:shadow-fire transition-shadow"
                >
                  <Plus className="w-3 h-3" />
                </button>
              </div>
            </div>
            <button
              aria-label="Remove item"
              onClick={() => removeFromCart(item.id)}
              className="text-muted-foreground hover:text-destructive transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </motion.div>
        ))}
      </AnimatePresence>

      {/* Total */}
      <div className="flex justify-between items-center mt-6 p-4 bg-secondary rounded-xl">
        <span className="font-bold text-foreground">Total</span>
        <span className="font-bold text-lg text-primary-foreground">Rs. {cartTotal || 0}</span>
      </div>

      {/* Delivery Form */}
      <div className="mt-6 space-y-4">
        <h2 className="text-xl font-bold text-foreground">Delivery Information</h2>
        <input
          type="text"
          placeholder="Full Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full p-3 border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary-foreground"
        />
        <input
          type="email"
          placeholder="Email Address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-3 border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary-foreground"
        />
        <input
          type="tel"
          placeholder="Phone Number"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          className="w-full p-3 border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary-foreground"
        />
        <textarea
          placeholder="Delivery Address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          className="w-full p-3 border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary-foreground"
          rows={3}
        />
      </div>

      {/* Buttons */}
      <button
        onClick={handlePlaceOrder}
        className="w-full py-3 bg-gradient-fire text-primary-foreground font-bold rounded-xl hover:shadow-fire hover:scale-[1.02] transition-all font-body mt-4"
      >
        Place Order
      </button>
      <button
        onClick={clearCart}
        className="w-full py-2 mt-2 text-sm text-muted-foreground hover:text-destructive transition-colors"
      >
        Clear Cart
      </button>
    </div>
  );
};

export default Checkout;