import { Link } from "react-router-dom";
import { ArrowRight, Flame, Star, Clock, Truck, Award, Quote } from "lucide-react";
import { motion } from "framer-motion";
import FoodCard from "@/components/FoodCard";
import { menuItems } from "@/data/menu";
import heroBanner from "@/assets/hero-banner.jpg";
import restaurantInterior from "@/assets/restaurant-interior.jpg";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] as const },
  }),
};

const Home = () => {
  const popular = menuItems.slice(0, 4);

  const features = [
    { icon: Flame, title: "Charcoal Grilled", desc: "Authentic smoky flavors from traditional grilling" },
    { icon: Clock, title: "Fast Delivery", desc: "Hot food at your doorstep in under 30 minutes" },
    { icon: Star, title: "Premium Quality", desc: "Only the finest, freshest ingredients used" },
    { icon: Truck, title: "Free Delivery", desc: "No delivery charges on orders above Rs. 1500" },
    { icon: Award, title: "Award Winning", desc: "Recognized for Lahore's best Turkish cuisine" },
    { icon: Flame, title: "Halal Certified", desc: "100% halal meat sourced from trusted suppliers" },
  ];

  const testimonials = [
    { name: "Ahmed R.", text: "Best shawarma in Lahore, hands down! The flavors are incredible.", rating: 5 },
    { name: "Sara K.", text: "The Turkish doner is absolutely divine. We order every weekend!", rating: 5 },
    { name: "Usman M.", text: "Amazing quality and fast delivery. Jushhpk never disappoints.", rating: 5 },
  ];

  return (
    <div>
      {/* Hero Section */}
      <section className="relative h-[85vh] min-h-[600px] overflow-hidden">
        <img
          src={heroBanner}
          alt="Jushhpk Restaurant signature dishes"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-background via-background/80 to-background/30" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />

        {/* Floating blobs */}
        <div className="absolute top-20 right-20 w-72 h-72 rounded-full bg-primary/10 blur-3xl animate-float" />
        <div className="absolute bottom-32 right-40 w-48 h-48 rounded-full bg-accent/10 blur-3xl animate-float" style={{ animationDelay: "2s" }} />
        <div className="absolute top-40 left-1/2 w-60 h-60 rounded-full bg-orange-light/5 blur-3xl animate-pulse-glow" />

        <div className="relative z-10 container mx-auto px-4 h-full flex items-center">
          <motion.div
            initial="hidden"
            animate="visible"
            className="max-w-xl"
          >
            <motion.div variants={fadeUp} custom={0} className="inline-flex items-center gap-2 glass px-4 py-2 rounded-full mb-6">
              <Flame className="w-4 h-4 text-primary" />
              <span className="text-sm font-body text-foreground">Premium Pakistani & Turkish Cuisine</span>
            </motion.div>

            <motion.h1 variants={fadeUp} custom={1} className="text-5xl md:text-7xl font-display font-bold text-foreground leading-tight mb-6">
              Taste the{" "}
              <span className="text-gradient-fire">Authentic</span>{" "}
              Flavors
            </motion.h1>

            <motion.p variants={fadeUp} custom={2} className="text-muted-foreground font-body text-lg mb-10 leading-relaxed max-w-md">
              From sizzling kebabs to aromatic biryanis — experience the finest cuisine crafted with love and tradition.
            </motion.p>

            <motion.div variants={fadeUp} custom={3} className="flex flex-wrap gap-4">
              <Link
                to="/menu"
                className="inline-flex items-center gap-2 bg-gradient-fire text-primary-foreground px-8 py-4 rounded-xl font-bold font-body hover:shadow-fire hover:scale-105 transition-all text-lg"
              >
                Order Now <ArrowRight className="w-5 h-5" />
              </Link>
              <Link
                to="/menu"
                className="inline-flex items-center gap-2 glass text-foreground px-8 py-4 rounded-xl font-bold font-body hover:bg-secondary transition-all text-lg"
              >
                View Menu
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-4 py-20">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="text-center mb-14"
        >
          <motion.h2 variants={fadeUp} custom={0} className="text-3xl md:text-4xl font-display font-bold text-foreground mb-3">
            Why Choose <span className="text-gradient-fire">Jushhpk</span>
          </motion.h2>
          <motion.p variants={fadeUp} custom={1} className="text-muted-foreground font-body max-w-lg mx-auto">
            We don't just serve food — we deliver an experience
          </motion.p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((f, i) => (
            <motion.div
              key={f.title}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUp}
              custom={i}
              className="glass-card rounded-2xl p-6 hover-lift group cursor-default"
            >
              <div className="w-12 h-12 rounded-xl bg-gradient-fire flex items-center justify-center mb-4 group-hover:shadow-fire transition-shadow">
                <f.icon className="w-6 h-6 text-primary-foreground" />
              </div>
              <h3 className="font-display font-bold text-foreground text-lg mb-2">{f.title}</h3>
              <p className="text-sm text-muted-foreground font-body">{f.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Popular Picks */}
      <section className="container mx-auto px-4 py-16">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="flex items-end justify-between mb-10"
        >
          <div>
            <motion.h2 variants={fadeUp} custom={0} className="text-3xl md:text-4xl font-display font-bold text-foreground">
              Popular <span className="text-gradient-fire">Picks</span>
            </motion.h2>
            <motion.p variants={fadeUp} custom={1} className="text-muted-foreground font-body mt-2">Our most loved dishes</motion.p>
          </div>
          <motion.div variants={fadeUp} custom={2}>
            <Link
              to="/menu"
              className="text-primary font-body font-bold text-sm flex items-center gap-1 hover:gap-2 transition-all"
            >
              View Full Menu <ArrowRight className="w-4 h-4" />
            </Link>
          </motion.div>
        </motion.div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {popular.map((item, i) => (
            <motion.div
              key={item.id}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUp}
              custom={i}
            >
              <FoodCard item={item} />
            </motion.div>
          ))}
        </div>
      </section>

      {/* About Section */}
      <section className="container mx-auto px-4 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            className="relative"
          >
            <div className="rounded-2xl overflow-hidden shadow-card">
              <img
                src={restaurantInterior}
                alt="Jushhpk Restaurant interior"
                className="w-full h-96 object-cover"
              />
            </div>
            <div className="absolute -bottom-6 -right-6 w-32 h-32 rounded-2xl bg-gradient-fire opacity-20 blur-2xl" />
          </motion.div>
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            className="space-y-5"
          >
            <motion.h2 variants={fadeUp} custom={0} className="text-3xl md:text-4xl font-display font-bold text-foreground">
              A Legacy of <span className="text-gradient-fire">Flavor</span>
            </motion.h2>
            <motion.p variants={fadeUp} custom={1} className="text-muted-foreground font-body leading-relaxed">
              Born in the heart of Lahore, Jushhpk brings together rich culinary traditions with a modern dining experience. Every dish tells a story — of spices ground fresh, recipes passed down generations.
            </motion.p>
            <motion.p variants={fadeUp} custom={2} className="text-muted-foreground font-body leading-relaxed">
              Our chefs use only the finest ingredients, sourced locally and prepared with meticulous attention to detail.
            </motion.p>
            <motion.div variants={fadeUp} custom={3} className="grid grid-cols-3 gap-4 pt-4">
              {[
                { value: "10+", label: "Years" },
                { value: "50+", label: "Dishes" },
                { value: "1M+", label: "Happy Customers" },
              ].map((stat) => (
                <div key={stat.label} className="text-center glass-card rounded-xl p-4">
                  <div className="text-2xl font-display font-bold text-gradient-fire">{stat.value}</div>
                  <div className="text-xs text-muted-foreground font-body mt-1">{stat.label}</div>
                </div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-transparent" />
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            className="text-center mb-14"
          >
            <motion.h2 variants={fadeUp} custom={0} className="text-3xl md:text-4xl font-display font-bold text-foreground mb-3">
              What Our <span className="text-gradient-fire">Customers</span> Say
            </motion.h2>
            <motion.p variants={fadeUp} custom={1} className="text-muted-foreground font-body">
              Don't just take our word for it
            </motion.p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {testimonials.map((t, i) => (
              <motion.div
                key={t.name}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUp}
                custom={i}
                className="glass-card rounded-2xl p-6 hover-lift relative"
              >
                <Quote className="w-8 h-8 text-primary/20 absolute top-4 right-4" />
                <div className="flex gap-1 mb-4">
                  {Array.from({ length: t.rating }).map((_, j) => (
                    <Star key={j} className="w-4 h-4 text-primary fill-primary" />
                  ))}
                </div>
                <p className="text-foreground font-body text-sm leading-relaxed mb-4">"{t.text}"</p>
                <p className="text-primary font-body font-bold text-sm">— {t.name}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="container mx-auto px-4 pb-20">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
          className="relative rounded-3xl overflow-hidden bg-gradient-fire p-10 md:p-16"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-transparent" />
          <div className="absolute top-0 right-0 w-80 h-80 rounded-full bg-accent/20 blur-3xl" />
          <div className="absolute bottom-0 left-1/3 w-60 h-60 rounded-full bg-orange-light/20 blur-3xl" />
          <div className="relative z-10 max-w-lg">
            <h3 className="text-3xl md:text-4xl font-display font-bold text-primary-foreground mb-4">
              Craving Something Special?
            </h3>
            <p className="text-primary-foreground/80 font-body mb-8 text-lg">
              Browse our full menu with 30+ dishes from appetizers to desserts.
            </p>
            <Link
              to="/menu"
              className="inline-flex items-center gap-2 bg-background text-foreground px-8 py-4 rounded-xl font-bold font-body hover:bg-background/90 transition-all text-lg hover:scale-105"
            >
              Explore Menu <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </motion.div>
      </section>
    </div>
  );
};

export default Home;
