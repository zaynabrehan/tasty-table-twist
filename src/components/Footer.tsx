import { Clock, MapPin, Phone } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import JushhLogo from "./JushhLogo";

const fadeUp = {
  hidden: { opacity: 0, y: 20, filter: "blur(6px)" },
  visible: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { delay: i * 0.12, duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] as const },
  }),
};

const Footer = () => {
  return (
    <footer className="border-t border-border bg-background relative overflow-hidden">
      {/* Animated glow line */}
      <motion.div
        className="absolute top-0 left-0 right-0 h-px"
        style={{ background: "linear-gradient(90deg, transparent, hsl(30 90% 45% / 0.5), transparent)" }}
        animate={{ backgroundPosition: ["0% 0%", "100% 0%"] }}
        transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
      />
      <div className="absolute -top-20 left-1/2 -translate-x-1/2 w-80 h-40 rounded-full bg-primary/5 blur-3xl animate-pulse-glow" />

      <div className="container mx-auto px-4 py-12 relative z-10">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
        >
          {/* Brand */}
          <motion.div variants={fadeUp} custom={0}>
            <JushhLogo size="md" showTagline />
            <p className="text-sm text-muted-foreground font-body leading-relaxed mt-2">
              YOUR VIBE, YOUR SIP, YOUR JUSHH
            </p>
          </motion.div>

          {/* Quick Links */}
          <motion.div variants={fadeUp} custom={1}>
            <h3 className="font-display font-semibold text-foreground mb-4">Quick Links</h3>
            <div className="space-y-2">
              {[
                { to: "/home", label: "Home" },
                { to: "/menu", label: "Menu" },
                { to: "/about", label: "About Us" },
                { to: "/contact", label: "Contact" },
              ].map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  className="group block text-sm text-muted-foreground hover:text-primary transition-colors font-body reveal-line"
                >
                  <span className="inline-flex items-center gap-1.5">
                    <span className="w-0 group-hover:w-2 h-0.5 bg-primary rounded-full transition-all duration-300" />
                    {link.label}
                  </span>
                </Link>
              ))}
            </div>
          </motion.div>

          {/* Contact */}
          <motion.div variants={fadeUp} custom={2}>
            <h3 className="font-display font-semibold text-foreground mb-4">Contact</h3>
            <div className="space-y-3">
              <a href="tel:03269946142" className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors font-body group">
                <div className="w-8 h-8 rounded-lg glass flex items-center justify-center group-hover:shadow-fire transition-all duration-300 group-hover:scale-110">
                  <Phone className="w-3.5 h-3.5 text-primary" />
                </div>
                0326 9946142
              </a>
              <a href="tel:03257217221" className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors font-body group">
                <div className="w-8 h-8 rounded-lg glass flex items-center justify-center group-hover:shadow-fire transition-all duration-300 group-hover:scale-110">
                  <Phone className="w-3.5 h-3.5 text-primary" />
                </div>
                0325 7217221
              </a>
              <a href="https://instagram.com/jushhpk" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors font-body group">
                <div className="w-8 h-8 rounded-lg glass flex items-center justify-center group-hover:shadow-fire transition-all duration-300 group-hover:scale-110">
                  <svg className="w-3.5 h-3.5 text-primary" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>
                </div>
                @Jushhpk
              </a>
              <div className="flex items-center gap-2 text-sm text-muted-foreground font-body">
                <div className="w-8 h-8 rounded-lg glass flex items-center justify-center">
                  <Clock className="w-3.5 h-3.5 text-primary" />
                </div>
                12:00 PM – 2:00 AM
              </div>
            </div>
          </motion.div>

          {/* Branches */}
          <motion.div variants={fadeUp} custom={3}>
            <h3 className="font-display font-semibold text-foreground mb-4">Our Branches</h3>
            <div className="space-y-3">
              <div className="flex items-start gap-2 text-sm text-muted-foreground font-body group hover:text-foreground transition-colors">
                <div className="w-8 h-8 rounded-lg glass flex items-center justify-center flex-shrink-0 mt-0.5 group-hover:shadow-fire transition-all duration-300">
                  <MapPin className="w-3.5 h-3.5 text-primary" />
                </div>
                <span>R-2 Johar Town, Near Shaukat Khanum, Lahore</span>
              </div>
              <div className="flex items-start gap-2 text-sm text-muted-foreground font-body group hover:text-foreground transition-colors">
                <div className="w-8 h-8 rounded-lg glass flex items-center justify-center flex-shrink-0 mt-0.5 group-hover:shadow-fire transition-all duration-300">
                  <MapPin className="w-3.5 h-3.5 text-primary" />
                </div>
                <span>100-H, DHA, Phase 01, Lahore</span>
              </div>
            </div>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="mt-10 pt-6 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-4"
        >
          <p className="text-xs text-muted-foreground font-body">
            © 2026 Jushhpk Restaurant. All rights reserved.
          </p>
          <a
            href="https://instagram.com/jushhpk"
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs text-muted-foreground hover:text-primary transition-colors font-body reveal-line"
          >
            Instagram
          </a>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;
