import { default as heroFoodSpread } from "@/assets/restaurant-interior.jpg";
import FoodCard from "@/components/FoodCard";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { Tables } from "@/integrations/supabase/types";
import { motion, useInView, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { ArrowRight, Flame, Loader2, Quote, Star, Utensils, Send, X, Sparkles } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "sonner";

type MenuItem = Tables<"menu_items">;

const fadeUp = {
  hidden: { opacity: 0, y: 30, filter: "blur(8px)" },
  visible: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { delay: i * 0.1, duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] as const },
  }),
};

const scaleIn = {
  hidden: { opacity: 0, scale: 0.85, filter: "blur(6px)" },
  visible: (i: number = 0) => ({
    opacity: 1,
    scale: 1,
    filter: "blur(0px)",
    transition: { delay: i * 0.12, duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] as const },
  }),
};

const staggerContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
};

interface Review {
  id: string;
  user_name: string;
  text: string;
  rating: number;
  created_at: string;
}

const Home = () => {
  const { user } = useAuth();
  const [popular, setPopular] = useState<MenuItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [reviewText, setReviewText] = useState("");
  const [reviewRating, setReviewRating] = useState(5);
  const [submittingReview, setSubmittingReview] = useState(false);

  const heroRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const heroY = useTransform(scrollYProgress, [0, 1], [0, 80]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

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

  useEffect(() => {
    const fetchReviews = async () => {
      const { data } = await supabase
        .from("reviews")
        .select("id, user_name, text, rating, created_at")
        .eq("is_approved", true)
        .order("created_at", { ascending: false })
        .limit(6);
      setReviews(data || []);
    };
    fetchReviews();
  }, []);

  const submitReview = async () => {
    if (!user) return;
    if (!reviewText.trim()) { toast.error("Please write a review"); return; }
    setSubmittingReview(true);

    const { data: profile } = await supabase.from("profiles").select("full_name").eq("user_id", user.id).maybeSingle();
    const userName = profile?.full_name || user.email || "Anonymous";

    const { error } = await supabase.from("reviews").insert({
      user_id: user.id,
      user_name: userName,
      text: reviewText.trim(),
      rating: reviewRating,
    });

    setSubmittingReview(false);
    if (error) {
      toast.error("Failed to submit review");
    } else {
      toast.success("Review submitted! It will appear once approved.");
      setReviewText("");
      setReviewRating(5);
      setShowReviewForm(false);
    }
  };

  return (
    <div className="overflow-hidden">
      {/* Hero Section */}
      <section ref={heroRef} className="relative min-h-[600px] overflow-hidden py-16 md:py-24">
        <motion.div style={{ y: heroY, opacity: heroOpacity }} className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-primary/5" />
          {/* Morphing blobs */}
          <div className="absolute top-20 right-20 w-72 h-72 rounded-full bg-primary/10 blur-3xl animate-morph" />
          <div className="absolute bottom-32 right-40 w-48 h-48 rounded-full bg-accent/10 blur-3xl animate-morph" style={{ animationDelay: "2s" }} />
          <div className="absolute top-40 left-1/2 w-60 h-60 rounded-full bg-primary/5 blur-3xl animate-pulse-glow" />
          
          {/* Grid pattern overlay */}
          <div className="absolute inset-0 opacity-[0.03]" style={{
            backgroundImage: `linear-gradient(hsl(30 90% 45% / 0.3) 1px, transparent 1px), linear-gradient(90deg, hsl(30 90% 45% / 0.3) 1px, transparent 1px)`,
            backgroundSize: '60px 60px'
          }} />
        </motion.div>

        {/* Animated particles */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(8)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1.5 h-1.5 rounded-full bg-primary/40"
              style={{ left: `${10 + i * 12}%`, top: `${15 + (i % 4) * 20}%` }}
              animate={{
                y: [-30, 30, -30],
                x: [-10, 10, -10],
                opacity: [0.1, 0.6, 0.1],
                scale: [0.8, 1.2, 0.8],
              }}
              transition={{ duration: 4 + i * 0.5, repeat: Infinity, ease: "easeInOut", delay: i * 0.4 }}
            />
          ))}
        </div>

        <div className="relative z-10 container mx-auto px-4 h-full flex items-center">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center w-full">
            <motion.div initial="hidden" animate="visible" className="max-w-xl">
              <motion.div variants={fadeUp} custom={0} className="inline-flex items-center gap-2 glass px-4 py-2 rounded-full mb-6 shimmer">
                <Flame className="w-4 h-4 text-primary" />
                <span className="text-sm font-body text-foreground">Premium Dubai & Turkish Cuisine</span>
              </motion.div>

              <motion.h1 variants={fadeUp} custom={1} className="text-5xl md:text-7xl font-display font-bold text-foreground leading-tight mb-6">
                Food That Makes You Go{" "}
                <span className="text-gradient-fire relative text-glow">
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
                <Link to="/menu" className="group inline-flex items-center gap-2 bg-gradient-fire text-primary-foreground px-8 py-4 rounded-xl font-bold font-body hover:shadow-fire transition-all text-lg relative overflow-hidden glow-pulse">
                  <span className="relative z-10 flex items-center gap-2">
                    Order Now <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-primary/0 via-primary-foreground/15 to-primary/0 -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
                </Link>
                <Link to="/menu" className="group inline-flex items-center gap-2 glass text-foreground px-8 py-4 rounded-xl font-bold font-body hover:bg-secondary transition-all text-lg hover:shadow-glow gradient-border-animated">
                  <Sparkles className="w-5 h-5 text-primary opacity-0 group-hover:opacity-100 transition-opacity" />
                  View Menu
                </Link>
              </motion.div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.85, x: 60, filter: "blur(10px)" }}
              animate={{ opacity: 1, scale: 1, x: 0, filter: "blur(0px)" }}
              transition={{ duration: 1, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="relative hidden lg:block"
            >
              <div className="relative rounded-3xl overflow-hidden shadow-card group gradient-border-animated">
                <img src={heroFoodSpread} alt="Jushh signature food spread" className="w-full h-[480px] object-cover group-hover:scale-105 transition-transform duration-700" />
                <div className="absolute inset-0 bg-gradient-to-t from-background/60 via-transparent to-transparent" />
                {/* Shimmer overlay */}
                <div className="absolute inset-0 shimmer pointer-events-none" />
              </div>
              {/* Floating badge */}
              <motion.div
                initial={{ opacity: 0, scale: 0, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ delay: 1.2, duration: 0.6, type: "spring", bounce: 0.4 }}
                className="absolute -bottom-4 left-8 glass-card rounded-2xl p-4 flex items-center gap-3 shadow-card shimmer"
              >
                <div className="w-10 h-10 rounded-xl bg-gradient-fire flex items-center justify-center">
                  <Utensils className="w-5 h-5 text-primary-foreground" />
                </div>
                <div>
                  <p className="font-display font-bold text-foreground text-sm">50+ Dishes</p>
                  <p className="text-xs text-muted-foreground font-body">Crafted with love</p>
                </div>
              </motion.div>
              <div className="absolute -bottom-6 -left-6 w-40 h-40 rounded-full bg-gradient-fire opacity-20 blur-3xl animate-pulse-glow" />
              <div className="absolute -top-4 -right-4 w-24 h-24 rounded-full bg-accent/20 blur-2xl animate-morph" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Popular Picks */}
      <section className="container mx-auto px-4 py-16 relative">
        {/* Section divider */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[400px] h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />

        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-80px" }} className="flex items-end justify-between mb-10">
          <div>
            <motion.div variants={fadeUp} custom={0} className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass text-xs font-body text-muted-foreground mb-3 shimmer">
              <Flame className="w-3 h-3 text-primary" /> Trending Now
            </motion.div>
            <motion.h2 variants={fadeUp} custom={0} className="text-3xl md:text-4xl font-display font-bold text-foreground">
              Popular <span className="text-gradient-fire text-glow">Picks</span>
            </motion.h2>
            <motion.p variants={fadeUp} custom={1} className="text-muted-foreground font-body mt-2">Our most loved dishes</motion.p>
          </div>
          <motion.div variants={fadeUp} custom={2}>
            <Link to="/menu" className="group text-primary font-body font-bold text-sm flex items-center gap-1 hover:gap-2 transition-all reveal-line">
              View Full Menu <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>
        </motion.div>

        {loading ? (
          <div className="flex justify-center py-10">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            >
              <Loader2 className="w-8 h-8 text-primary" />
            </motion.div>
          </div>
        ) : (
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {popular.map((item, i) => (
              <motion.div key={item.id} variants={scaleIn} custom={i}>
                <FoodCard item={item} />
              </motion.div>
            ))}
          </motion.div>
        )}
      </section>

      {/* Reviews / Testimonials */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-transparent" />
        {/* Decorative elements */}
        <div className="absolute top-10 right-10 w-64 h-64 rounded-full bg-primary/5 blur-3xl animate-morph" />
        <div className="absolute bottom-10 left-10 w-48 h-48 rounded-full bg-accent/5 blur-3xl animate-morph" style={{ animationDelay: "4s" }} />

        <div className="container mx-auto px-4 relative z-10">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-80px" }} className="text-center mb-14">
            <motion.div variants={fadeUp} custom={0} className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass text-xs font-body text-muted-foreground mx-auto mb-3 shimmer">
              <Star className="w-3 h-3 text-primary fill-primary" /> Reviews
            </motion.div>
            <motion.h2 variants={fadeUp} custom={0} className="text-3xl md:text-4xl font-display font-bold text-foreground mb-3">
              What Our <span className="text-gradient-fire text-glow">Customers</span> Say
            </motion.h2>
            <motion.p variants={fadeUp} custom={1} className="text-muted-foreground font-body">Don't just take our word for it</motion.p>
          </motion.div>

          {/* Review cards */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto"
          >
            {reviews.length === 0 ? (
              <div className="col-span-3 text-center py-10">
                <p className="text-muted-foreground font-body">No reviews yet. Be the first to leave one!</p>
              </div>
            ) : (
              reviews.map((t, i) => (
                <motion.div
                  key={t.id}
                  variants={scaleIn}
                  custom={i}
                  whileHover={{ y: -6, transition: { type: "spring", stiffness: 300 } }}
                  className="glass-card rounded-2xl p-6 relative group cursor-default gradient-border-animated"
                >
                  <Quote className="w-8 h-8 text-primary/20 absolute top-4 right-4 group-hover:text-primary/40 transition-colors duration-500" />
                  <div className="flex gap-1 mb-4">
                    {Array.from({ length: t.rating }).map((_, j) => (
                      <motion.div
                        key={j}
                        initial={{ opacity: 0, scale: 0, rotate: -180 }}
                        whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.3 + j * 0.1, type: "spring", bounce: 0.5 }}
                      >
                        <Star className="w-4 h-4 text-primary fill-primary" />
                      </motion.div>
                    ))}
                  </div>
                  <p className="text-foreground font-body text-sm leading-relaxed mb-4">"{t.text}"</p>
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-gradient-fire flex items-center justify-center text-primary-foreground font-display font-bold text-xs">
                      {t.user_name[0]}
                    </div>
                    <p className="text-primary font-body font-bold text-sm">{t.user_name}</p>
                  </div>
                </motion.div>
              ))
            )}
          </motion.div>

          {/* Write a review button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="text-center mt-10"
          >
            {user ? (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setShowReviewForm(true)}
                className="inline-flex items-center gap-2 bg-gradient-fire text-primary-foreground px-6 py-3 rounded-xl font-bold font-body hover:shadow-fire transition-all glow-pulse"
              >
                <Send className="w-4 h-4" /> Write a Review
              </motion.button>
            ) : (
              <Link to="/signin" className="inline-flex items-center gap-2 glass text-foreground px-6 py-3 rounded-xl font-bold font-body hover:bg-secondary transition-all gradient-border-animated">
                Sign in to leave a review
              </Link>
            )}
          </motion.div>
        </div>
      </section>

      {/* Review Form Modal */}
      <AnimatePresence>
        {showReviewForm && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-md p-4"
            onClick={() => setShowReviewForm(false)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.85, y: 30, filter: "blur(10px)" }}
              animate={{ opacity: 1, scale: 1, y: 0, filter: "blur(0px)" }}
              exit={{ opacity: 0, scale: 0.85, y: 30, filter: "blur(10px)" }}
              transition={{ type: "spring", bounce: 0.3 }}
              onClick={(e) => e.stopPropagation()}
              className="glass-card rounded-2xl p-6 w-full max-w-md space-y-5 gradient-border-animated"
            >
              <div className="flex items-center justify-between">
                <h3 className="font-display font-bold text-xl text-foreground">Write a Review</h3>
                <motion.button
                  whileHover={{ rotate: 90 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setShowReviewForm(false)}
                  className="p-1 rounded-lg hover:bg-secondary transition-colors"
                >
                  <X className="w-5 h-5 text-muted-foreground" />
                </motion.button>
              </div>

              {/* Star rating */}
              <div>
                <p className="text-sm font-body text-muted-foreground mb-2">Your Rating</p>
                <div className="flex gap-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <motion.button
                      key={star}
                      onClick={() => setReviewRating(star)}
                      whileHover={{ scale: 1.2, rotate: 15 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <Star className={`w-7 h-7 transition-colors duration-200 ${star <= reviewRating ? "text-primary fill-primary" : "text-muted-foreground/30"}`} />
                    </motion.button>
                  ))}
                </div>
              </div>

              {/* Review text */}
              <div>
                <p className="text-sm font-body text-muted-foreground mb-2">Your Review</p>
                <textarea
                  value={reviewText}
                  onChange={(e) => setReviewText(e.target.value)}
                  placeholder="Tell us about your experience..."
                  maxLength={500}
                  rows={4}
                  className="w-full bg-secondary border border-border rounded-xl px-4 py-3 text-foreground font-body placeholder:text-muted-foreground outline-none focus:border-primary focus:shadow-fire transition-all resize-none"
                />
                <p className="text-xs text-muted-foreground font-body mt-1">{reviewText.length}/500</p>
              </div>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={submitReview}
                disabled={submittingReview}
                className="w-full flex items-center justify-center gap-2 bg-gradient-fire text-primary-foreground px-6 py-3 rounded-xl font-bold font-body hover:shadow-fire transition-all disabled:opacity-50 glow-pulse"
              >
                {submittingReview ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
                Submit Review
              </motion.button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* CTA Banner */}
      <section className="container mx-auto px-4 pb-20">
        <motion.div
          initial={{ opacity: 0, y: 40, filter: "blur(8px)" }}
          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="relative rounded-3xl overflow-hidden bg-gradient-fire p-10 md:p-16 group shimmer"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-transparent" />
          <div className="absolute top-0 right-0 w-80 h-80 rounded-full bg-accent/20 blur-3xl group-hover:bg-accent/30 transition-colors duration-700 animate-morph" />
          <div className="absolute bottom-0 left-1/3 w-60 h-60 rounded-full bg-primary/20 blur-3xl animate-pulse-glow" />
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-primary-foreground/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
          <div className="relative z-10 max-w-lg">
            <motion.h3
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-3xl md:text-4xl font-display font-bold text-primary-foreground mb-4"
            >
              Craving Something Special?
            </motion.h3>
            <motion.p
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
              className="text-primary-foreground/80 font-body mb-8 text-lg"
            >
              Browse our full menu with 30+ dishes from appetizers to desserts.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.6 }}
            >
              <Link to="/menu" className="group/btn inline-flex items-center gap-2 bg-background text-foreground px-8 py-4 rounded-xl font-bold font-body hover:bg-background/90 transition-all text-lg hover:shadow-glow">
                Explore Menu <ArrowRight className="w-5 h-5 group-hover/btn:translate-x-1 transition-transform" />
              </Link>
            </motion.div>
          </div>
        </motion.div>
      </section>
    </div>
  );
};

export default Home;
