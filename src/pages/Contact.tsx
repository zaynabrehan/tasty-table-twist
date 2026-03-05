import { Phone, MapPin, Clock } from "lucide-react";
import { motion } from "framer-motion";

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const Contact = () => {
  return (
    <div className="container mx-auto px-4 py-10">
      <motion.div initial="hidden" animate="visible" variants={fadeUp} className="text-center mb-12">
        <h1 className="text-4xl font-display font-bold text-foreground mb-2">
          Contact <span className="text-gradient-fire">Us</span>
        </h1>
        <p className="text-muted-foreground font-body">We'd love to hear from you</p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 max-w-5xl mx-auto">
        {/* Contact Info */}
        <motion.div initial="hidden" animate="visible" variants={fadeUp} className="space-y-6">
          <h2 className="text-2xl font-display font-bold text-foreground">Get in Touch</h2>
          <div className="space-y-4">
            {[
              { icon: Phone, label: "Phone", value: "0326 9946142", href: "tel:03269946142" },
              { icon: Phone, label: "Phone 2", value: "0325 7217221", href: "tel:03257217221" },
              {
                icon: () => (
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>
                ),
                label: "Instagram",
                value: "@Jushhpk",
                href: "https://instagram.com/jushhpk",
              },
              { icon: Clock, label: "Hours", value: "12:00 PM – 2:00 AM Daily" },
            ].map(({ icon: Icon, label, value, href }) => (
              <div key={label} className="flex items-center gap-4 glass-card rounded-xl p-4">
                <div className="w-10 h-10 rounded-lg bg-gradient-fire flex items-center justify-center flex-shrink-0">
                  <span className="text-primary-foreground"><Icon className="w-5 h-5" /></span>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground font-body">{label}</p>
                  {href ? (
                    <a href={href} target={href.startsWith("http") ? "_blank" : undefined} rel="noopener noreferrer" className="text-foreground font-body font-medium hover:text-primary transition-colors">
                      {value}
                    </a>
                  ) : (
                    <p className="text-foreground font-body font-medium">{value}</p>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Branches */}
          <div className="space-y-3 pt-2">
            <h3 className="font-display font-semibold text-foreground">Our Branches</h3>
            {[
              { name: "Johar Town", address: "R-2 Johar Town, Near Shaukat Khanum, Lahore" },
              { name: "DHA", address: "100-H, DHA, Phase 01, Lahore" },
            ].map((b) => (
              <div key={b.name} className="flex items-start gap-3 glass-card rounded-xl p-4">
                <MapPin className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                <div>
                  <p className="font-body font-medium text-foreground">{b.name}</p>
                  <p className="text-sm text-muted-foreground font-body">{b.address}</p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Contact Form */}
        <motion.div initial="hidden" animate="visible" variants={fadeUp} className="glass-card rounded-2xl p-6 md:p-8">
          <h3 className="text-xl font-display font-bold text-foreground mb-6">Send a Message</h3>
          <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
            <div>
              <label className="text-sm text-muted-foreground font-body mb-1.5 block">Name</label>
              <input
                type="text"
                className="w-full bg-secondary border border-border rounded-xl px-4 py-3 text-foreground font-body placeholder:text-muted-foreground outline-none focus:border-primary focus:shadow-fire transition-all"
                placeholder="Your name"
              />
            </div>
            <div>
              <label className="text-sm text-muted-foreground font-body mb-1.5 block">Email</label>
              <input
                type="email"
                className="w-full bg-secondary border border-border rounded-xl px-4 py-3 text-foreground font-body placeholder:text-muted-foreground outline-none focus:border-primary focus:shadow-fire transition-all"
                placeholder="your@email.com"
              />
            </div>
            <div>
              <label className="text-sm text-muted-foreground font-body mb-1.5 block">Message</label>
              <textarea
                rows={4}
                className="w-full bg-secondary border border-border rounded-xl px-4 py-3 text-foreground font-body placeholder:text-muted-foreground outline-none focus:border-primary focus:shadow-fire transition-all resize-none"
                placeholder="Your message..."
              />
            </div>
            <button
              type="submit"
              className="w-full bg-gradient-fire text-primary-foreground py-3 rounded-xl font-bold font-body hover:shadow-fire hover:scale-[1.02] transition-all"
            >
              Send Message
            </button>
          </form>
        </motion.div>
      </div>
    </div>
  );
};

export default Contact;
