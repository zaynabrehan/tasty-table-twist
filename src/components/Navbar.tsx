import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Search, Heart, ShoppingCart, Phone, User, Menu, X, MapPin } from "lucide-react";
import { useStore } from "@/context/StoreContext";
import CartPanel from "./CartPanel";

const Navbar = () => {
  const { cartCount, branch } = useStore();
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const location = useLocation();

  const navLinks = [
    { to: "/home", label: "Home" },
    { to: "/menu", label: "Menu" },
    { to: "/about", label: "About" },
    { to: "/contact", label: "Contact" },
  ];

  const isActive = (path: string) => location.pathname === path;

  if (!branch && location.pathname === "/") return null;

  return (
    <>
      {/* Top Bar */}
      <div className="bg-primary/10 border-b border-border">
        <div className="container mx-auto px-4 py-2 flex items-center justify-between text-sm">
          <span className="text-muted-foreground font-body">
            Open Daily: 12 PM – 2 AM
          </span>
          <div className="flex items-center gap-4">
            <a href="tel:+923001234567" className="flex items-center gap-1 text-primary hover:text-gold-light transition-colors">
              <Phone className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">+92 300 1234567</span>
            </a>
            <button className="flex items-center gap-1 text-muted-foreground hover:text-foreground transition-colors">
              <User className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Sign In</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Nav */}
      <nav className="sticky top-0 z-50 bg-background/95 backdrop-blur-md border-b border-border">
        <div className="container mx-auto px-4 py-3 flex items-center justify-between gap-4">
          {/* Logo */}
          <Link to="/home" className="flex-shrink-0">
            <h1 className="text-2xl font-display font-bold text-primary tracking-wide">
              HOWDY
            </h1>
          </Link>

          {/* Desktop Nav Links */}
          <div className="hidden md:flex items-center gap-6">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className={`text-sm font-medium transition-colors hover:text-primary ${
                  isActive(link.to) ? "text-primary" : "text-muted-foreground"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Search */}
          <div className="hidden lg:flex items-center bg-secondary rounded-lg px-3 py-2 flex-1 max-w-xs">
            <Search className="w-4 h-4 text-muted-foreground mr-2" />
            <input
              type="text"
              placeholder="Search menu..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-transparent text-sm text-foreground placeholder:text-muted-foreground outline-none w-full font-body"
            />
          </div>

          {/* Right Actions */}
          <div className="flex items-center gap-3">
            {branch && (
              <div className="hidden sm:flex items-center gap-1 text-xs text-muted-foreground bg-secondary px-2.5 py-1.5 rounded-lg">
                <MapPin className="w-3 h-3 text-primary" />
                {branch}
              </div>
            )}

            <Link
              to="/favorites"
              className="relative p-2 text-muted-foreground hover:text-primary transition-colors"
            >
              <Heart className="w-5 h-5" />
            </Link>

            <button
              onClick={() => setIsCartOpen(true)}
              className="relative p-2 text-muted-foreground hover:text-primary transition-colors"
            >
              <ShoppingCart className="w-5 h-5" />
              {cartCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 bg-primary text-primary-foreground text-xs w-5 h-5 rounded-full flex items-center justify-center font-bold">
                  {cartCount}
                </span>
              )}
            </button>

            {/* Mobile menu toggle */}
            <button
              className="md:hidden p-2 text-muted-foreground hover:text-foreground"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden border-t border-border bg-background animate-fade-in">
            <div className="container mx-auto px-4 py-4 space-y-3">
              {/* Mobile Search */}
              <div className="flex items-center bg-secondary rounded-lg px-3 py-2">
                <Search className="w-4 h-4 text-muted-foreground mr-2" />
                <input
                  type="text"
                  placeholder="Search menu..."
                  className="bg-transparent text-sm text-foreground placeholder:text-muted-foreground outline-none w-full font-body"
                />
              </div>
              {navLinks.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`block py-2 text-sm font-medium transition-colors ${
                    isActive(link.to) ? "text-primary" : "text-muted-foreground"
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        )}
      </nav>

      {/* Cart Panel */}
      <CartPanel isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </>
  );
};

export default Navbar;
