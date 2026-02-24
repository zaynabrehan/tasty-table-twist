import { Phone, Mail, MapPin, Clock } from "lucide-react";

const Contact = () => {
  return (
    <div className="container mx-auto px-4 py-10">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-display font-bold text-foreground mb-2">
          Contact <span className="text-gradient-gold">Us</span>
        </h1>
        <p className="text-muted-foreground font-body">We'd love to hear from you</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 max-w-5xl mx-auto">
        {/* Contact Info */}
        <div className="space-y-6">
          <h2 className="text-2xl font-display font-bold text-foreground">Get in Touch</h2>
          <div className="space-y-4">
            {[
              { icon: Phone, label: "Phone", value: "+92 300 1234567", href: "tel:+923001234567" },
              { icon: Mail, label: "Email", value: "info@howdy.pk", href: "mailto:info@howdy.pk" },
              { icon: Clock, label: "Hours", value: "12:00 PM – 2:00 AM Daily" },
            ].map(({ icon: Icon, label, value, href }) => (
              <div key={label} className="flex items-center gap-4 bg-card border border-border rounded-xl p-4">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <Icon className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground font-body">{label}</p>
                  {href ? (
                    <a href={href} className="text-foreground font-body font-medium hover:text-primary transition-colors">
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
              { name: "Johar Town", address: "Main Boulevard, Johar Town, Lahore" },
              { name: "DHA", address: "MM Alam Road, DHA Phase 5, Lahore" },
            ].map((b) => (
              <div key={b.name} className="flex items-start gap-3 bg-card border border-border rounded-xl p-4">
                <MapPin className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                <div>
                  <p className="font-body font-medium text-foreground">{b.name}</p>
                  <p className="text-sm text-muted-foreground font-body">{b.address}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Contact Form */}
        <div className="bg-card border border-border rounded-2xl p-6 md:p-8">
          <h3 className="text-xl font-display font-bold text-foreground mb-6">Send a Message</h3>
          <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
            <div>
              <label className="text-sm text-muted-foreground font-body mb-1.5 block">Name</label>
              <input
                type="text"
                className="w-full bg-secondary border border-border rounded-lg px-4 py-3 text-foreground font-body placeholder:text-muted-foreground outline-none focus:border-primary transition-colors"
                placeholder="Your name"
              />
            </div>
            <div>
              <label className="text-sm text-muted-foreground font-body mb-1.5 block">Email</label>
              <input
                type="email"
                className="w-full bg-secondary border border-border rounded-lg px-4 py-3 text-foreground font-body placeholder:text-muted-foreground outline-none focus:border-primary transition-colors"
                placeholder="your@email.com"
              />
            </div>
            <div>
              <label className="text-sm text-muted-foreground font-body mb-1.5 block">Message</label>
              <textarea
                rows={4}
                className="w-full bg-secondary border border-border rounded-lg px-4 py-3 text-foreground font-body placeholder:text-muted-foreground outline-none focus:border-primary transition-colors resize-none"
                placeholder="Your message..."
              />
            </div>
            <button
              type="submit"
              className="w-full bg-gradient-gold text-primary-foreground py-3 rounded-lg font-bold font-body hover:opacity-90 transition-opacity"
            >
              Send Message
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Contact;
