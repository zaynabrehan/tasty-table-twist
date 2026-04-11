import heroFoodSpread from "@/assets/homeimage.jpg";
import restaurantInterior from "@/assets/restaurant-interior.jpg";
import FoodCard from "@/components/FoodCard";
import { supabase } from "@/integrations/supabase/client";
import { Tables } from "@/integrations/supabase/types";
import { motion, useInView } from "framer-motion";
import { ArrowRight, Flame, Loader2, Quote, Star, Utensils, Clock, Users } from "lucide-react";
import { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";

type MenuItem = Tables<"menu_items">;

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] as const },
  }),
};

const scaleIn = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: (i: number = 0) => ({
    opacity: 1,
    scale: 1,
    transition: { delay: i * 0.15, duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] as const },
  }),
};

// Animated counter component
const AnimatedCounter = ({ value, suffix = "" }: { value: string; suffix?: string }) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true });
  const [display, setDisplay] = useState("0");

  useEffect(() => {
    if (!isInView) return;
    const num = parseInt(value.replace(/\D/g, ""));
    if (isNaN(num)) { setDisplay(value); return; }
    let start = 0;
    const duration = 1500;
    const startTime = Date.now();
    const animate = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      start = Math.floor(eased * num);
      setDisplay(value.includes("M") ? `${start >= num ? num : start}` : `${start}`);
      if (progress < 1) requestAnimationFrame(animate);
    };
    animate();
  }, [isInView, value]);

  return (
    <div ref={ref} className="text-2xl font-display font-bold text-gradient-fire">
      {display}{suffix}
    </div>
  );
};

const Home = () => {
  const [popular, setPopular] = useState<MenuItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPopular = async () => {
      const { data } = await supabase
        .from("menu_items")
        .select("*")
        .eq("is_available", true)
        .not("category", "in", '("Beverages","Add-ons","Jush Desserts")')
        .limit(4);
      setPopular(data || []);
      setLoading(false);
    };
    fetchPopular();
  }, []);

  const testimonials = [
    { name: "Ahmed R.", text: "Best shawarma in Lahore, hands down! The flavors are incredible.", rating: 5 },
    { name: "Sara K.", text: "The Turkish doner is absolutely divine. We order every weekend!", rating: 5 },
    { name: "Usman M.", text: "Amazing quality and fast delivery. Jushhpk never disappoints.", rating: 5 },
  ];

  return (
    <div>
      {/* Hero Section */}
      <section className="relative min-h-[600px] overflow-hidden py-16 md:py-24">
        <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-primary/5" />
        <div className="absolute top-20 right-20 w-72 h-72 rounded-full bg-primary/10 blur-3xl animate-float" />
        <div className="absolute bottom-32 right-40 w-48 h-48 rounded-full bg-accent/10 blur-3xl animate-float" style={{ animationDelay: "2s" }} />
        <div className="absolute top-40 left-1/2 w-60 h-60 rounded-full bg-orange-light/5 blur-3xl animate-pulse-glow" />

        {/* Animated particles */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 rounded-full bg-primary/30"
              style={{ left: `${15 + i * 15}%`, top: `${20 + (i % 3) * 25}%` }}
              animate={{ y: [-20, 20, -20], opacity: [0.2, 0.6, 0.2] }}
              transition={{ duration: 3 + i * 0.5, repeat: Infinity, ease: "easeInOut", delay: i * 0.3 }}
            />
          ))}
        </div>

        <div className="relative z-10 container mx-auto px-4 h-full flex items-center">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center w-full">
            <motion.div initial="hidden" animate="visible" className="max-w-xl">
              <motion.div variants={fadeUp} custom={0} className="inline-flex items-center gap-2 glass px-4 py-2 rounded-full mb-6">
                <Flame className="w-4 h-4 text-primary" />
                <span className="text-sm font-body text-foreground">Premium Dubai & Turkish Cuisine</span>
              </motion.div>

              <motion.h1 variants={fadeUp} custom={1} className="text-5xl md:text-7xl font-display font-bold text-foreground leading-tight mb-6">
                Food That Makes You Go{" "}
                <span className="text-gradient-fire relative">
                  Shh..
                  <motion.span
                    className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-fire rounded-full"
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ delay: 0.8, duration: 0.6, ease: "easeOut" }}
                    style={{ originX: 0 }}
                  />
                </span>
              </motion.h1>

              <motion.p variants={fadeUp} custom={2} className="text-muted-foreground font-body text-lg mb-10 leading-relaxed max-w-md">
                Craving vibes grabbing Jushh!!
              </motion.p>

              <motion.div variants={fadeUp} custom={3} className="flex flex-wrap gap-4">
                <Link to="/menu" className="group inline-flex items-center gap-2 bg-gradient-fire text-primary-foreground px-8 py-4 rounded-xl font-bold font-body hover:shadow-fire transition-all text-lg relative overflow-hidden">
                  <span className="relative z-10 flex items-center gap-2">
                    Order Now <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-primary/0 via-primary-foreground/10 to-primary/0 -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
                </Link>
                <Link to="/menu" className="inline-flex items-center gap-2 glass text-foreground px-8 py-4 rounded-xl font-bold font-body hover:bg-secondary transition-all text-lg hover:shadow-glow">
                  View Menu
                </Link>
              </motion.div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9, x: 40 }}
              animate={{ opacity: 1, scale: 1, x: 0 }}
              transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="relative hidden lg:block"
            >
              <div className="relative rounded-3xl overflow-hidden shadow-card group">
                <img src={heroFoodSpread} alt="Jushh signature food spread" className="w-full h-[480px] object-cover group-hover:scale-105 transition-transform duration-700" />
                <div className="absolute inset-0 bg-gradient-to-t from-background/40 via-transparent to-transparent" />
              </div>
              {/* Floating badge */}
              <motion.div
                initial={{ opacity: 0, scale: 0, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ delay: 1, duration: 0.5, type: "spring" }}
                className="absolute -bottom-4 left-8 glass-card rounded-2xl p-4 flex items-center gap-3 shadow-card"
              >
                <div className="w-10 h-10 rounded-xl bg-gradient-fire flex items-center justify-center">
                  <Utensils className="w-5 h-5 text-primary-foreground" />
                </div>
                <div>
                  <p className="font-display font-bold text-foreground text-sm">50+ Dishes</p>
                  <p className="text-xs text-muted-foreground font-body">Crafted with love</p>
                </div>
              </motion.div>
              <div className="absolute -bottom-6 -left-6 w-40 h-40 rounded-full bg-gradient-fire opacity-20 blur-3xl" />
              <div className="absolute -top-4 -right-4 w-24 h-24 rounded-full bg-accent/20 blur-2xl" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Popular Picks */}
      <section className="container mx-auto px-4 py-16">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-80px" }} className="flex items-end justify-between mb-10">
          <div>
            <motion.div variants={fadeUp} custom={0} className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass text-xs font-body text-muted-foreground mb-3">
              <Flame className="w-3 h-3 text-primary" /> Trending Now
            </motion.div>
            <motion.h2 variants={fadeUp} custom={0} className="text-3xl md:text-4xl font-display font-bold text-foreground">
              Popular <span className="text-gradient-fire">Picks</span>
            </motion.h2>
            <motion.p variants={fadeUp} custom={1} className="text-muted-foreground font-body mt-2">Our most loved dishes</motion.p>
          </div>
          <motion.div variants={fadeUp} custom={2}>
            <Link to="/menu" className="group text-primary font-body font-bold text-sm flex items-center gap-1 hover:gap-2 transition-all">
              View Full Menu <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>
        </motion.div>

        {loading ? (
          <div className="flex justify-center py-10">
            <Loader2 className="w-8 h-8 text-primary animate-spin" />
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {popular.map((item, i) => (
              <motion.div key={item.id} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={scaleIn} custom={i}>
                <FoodCard item={item} />
              </motion.div>
            ))}
          </div>
        )}
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
            <div className="rounded-2xl overflow-hidden shadow-card group">
              <img src={restaurantInterior} alt="Jushh Restaurant interior" className="w-full h-96 object-cover group-hover:scale-105 transition-transform duration-700" />
              <div className="absolute inset-0 bg-gradient-to-t from-background/30 via-transparent to-transparent rounded-2xl" />
            </div>
            {/* Experience badge */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5 }}
              className="absolute -right-4 top-8 glass-card rounded-2xl p-4 shadow-card hidden md:flex items-center gap-3"
            >
              <div className="w-10 h-10 rounded-xl bg-gradient-fire flex items-center justify-center">
                <Clock className="w-5 h-5 text-primary-foreground" />
              </div>
              <div>
                <p className="font-display font-bold text-foreground text-sm">10+ Years</p>
                <p className="text-xs text-muted-foreground font-body">of Excellence</p>
              </div>
            </motion.div>
            <div className="absolute -bottom-6 -right-6 w-32 h-32 rounded-2xl bg-gradient-fire opacity-20 blur-2xl" />
          </motion.div>
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-80px" }} className="space-y-5">
            <motion.div variants={fadeUp} custom={0} className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass text-xs font-body text-muted-foreground">
              Our Story
            </motion.div>
            <motion.h2 variants={fadeUp} custom={0} className="text-3xl md:text-4xl font-display font-bold text-foreground">
              A Legacy of <span className="text-gradient-fire">Flavor</span>
            </motion.h2>
            <motion.p variants={fadeUp} custom={1} className="text-muted-foreground font-body leading-relaxed">
              Born in the heart of Lahore, Jushh brings together rich culinary traditions with a modern dining experience. Every dish tells a story — of spices ground fresh, recipes passed down generations.
            </motion.p>
            <motion.p variants={fadeUp} custom={2} className="text-muted-foreground font-body leading-relaxed">
              Our chefs use only the finest ingredients, sourced locally and prepared with meticulous attention to detail.
            </motion.p>
            <motion.div variants={fadeUp} custom={3} className="grid grid-cols-3 gap-4 pt-4">
              {[
                { value: "10", suffix: "+", label: "Years", icon: Clock },
                { value: "50", suffix: "+", label: "Dishes", icon: Utensils },
                { value: "1", suffix: "M+", label: "Happy Customers", icon: Users },
              ].map((stat) => (
                <div key={stat.label} className="text-center glass-card rounded-xl p-4 hover:shadow-fire transition-shadow duration-300 group">
                  <div className="w-8 h-8 rounded-lg bg-secondary flex items-center justify-center mx-auto mb-2 group-hover:bg-gradient-fire transition-all">
                    <stat.icon className="w-4 h-4 text-primary group-hover:text-primary-foreground transition-colors" />
                  </div>
                  <AnimatedCounter value={stat.value} suffix={stat.suffix} />
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
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-80px" }} className="text-center mb-14">
            <motion.div variants={fadeUp} custom={0} className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass text-xs font-body text-muted-foreground mx-auto mb-3">
              <Star className="w-3 h-3 text-primary fill-primary" /> Reviews
            </motion.div>
            <motion.h2 variants={fadeUp} custom={0} className="text-3xl md:text-4xl font-display font-bold text-foreground mb-3">
              What Our <span className="text-gradient-fire">Customers</span> Say
            </motion.h2>
            <motion.p variants={fadeUp} custom={1} className="text-muted-foreground font-body">Don't just take our word for it</motion.p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {testimonials.map((t, i) => (
              <motion.div
                key={t.name}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={scaleIn}
                custom={i}
                className="glass-card rounded-2xl p-6 hover-lift relative group"
              >
                <Quote className="w-8 h-8 text-primary/20 absolute top-4 right-4 group-hover:text-primary/40 transition-colors" />
                <div className="flex gap-1 mb-4">
                  {Array.from({ length: t.rating }).map((_, j) => (
                    <motion.div
                      key={j}
                      initial={{ opacity: 0, scale: 0 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.3 + j * 0.1 }}
                    >
                      <Star className="w-4 h-4 text-primary fill-primary" />
                    </motion.div>
                  ))}
                </div>
                <p className="text-foreground font-body text-sm leading-relaxed mb-4">"{t.text}"</p>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-gradient-fire flex items-center justify-center text-primary-foreground font-display font-bold text-xs">
                    {t.name[0]}
                  </div>
                  <p className="text-primary font-body font-bold text-sm">{t.name}</p>
                </div>
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
          className="relative rounded-3xl overflow-hidden bg-gradient-fire p-10 md:p-16 group"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-transparent" />
          <div className="absolute top-0 right-0 w-80 h-80 rounded-full bg-accent/20 blur-3xl group-hover:bg-accent/30 transition-colors duration-700" />
          <div className="absolute bottom-0 left-1/3 w-60 h-60 rounded-full bg-orange-light/20 blur-3xl" />
          {/* Shimmer effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-primary-foreground/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
          <div className="relative z-10 max-w-lg">
            <h3 className="text-3xl md:text-4xl font-display font-bold text-primary-foreground mb-4">
              Craving Something Special?
            </h3>
            <p className="text-primary-foreground/80 font-body mb-8 text-lg">
              Browse our full menu with 30+ dishes from appetizers to desserts.
            </p>
            <Link to="/menu" className="group/btn inline-flex items-center gap-2 bg-background text-foreground px-8 py-4 rounded-xl font-bold font-body hover:bg-background/90 transition-all text-lg hover:shadow-glow">
              Explore Menu <ArrowRight className="w-5 h-5 group-hover/btn:translate-x-1 transition-transform" />
            </Link>
          </div>
        </motion.div>
      </section>
    </div>
  );
};

export default Home;
