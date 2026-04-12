import { default as heroFoodSpread } from "@/assets/restaurant-interior.jpg";
import FoodCard from "@/components/FoodCard";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { Tables } from "@/integrations/supabase/types";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { ArrowRight, Clock, Flame, Loader2, Quote, Star, Users, Utensils, Send, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "sonner";

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

    // Get user name from profile
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

      {/* Reviews / Testimonials */}
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

          {/* Review cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {reviews.length === 0 ? (
              <div className="col-span-3 text-center py-10">
                <p className="text-muted-foreground font-body">No reviews yet. Be the first to leave one!</p>
              </div>
            ) : (
              reviews.map((t, i) => (
                <motion.div
                  key={t.id}
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
                      {t.user_name[0]}
                    </div>
                    <p className="text-primary font-body font-bold text-sm">{t.user_name}</p>
                  </div>
                </motion.div>
              ))
            )}
          </div>

          {/* Write a review button */}
          <div className="text-center mt-10">
            {user ? (
              <button
                onClick={() => setShowReviewForm(true)}
                className="inline-flex items-center gap-2 bg-gradient-fire text-primary-foreground px-6 py-3 rounded-xl font-bold font-body hover:shadow-fire transition-all"
              >
                <Send className="w-4 h-4" /> Write a Review
              </button>
            ) : (
              <Link to="/signin" className="inline-flex items-center gap-2 glass text-foreground px-6 py-3 rounded-xl font-bold font-body hover:bg-secondary transition-all">
                Sign in to leave a review
              </Link>
            )}
          </div>
        </div>
      </section>

      {/* Review Form Modal */}
      <AnimatePresence>
        {showReviewForm && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
            onClick={() => setShowReviewForm(false)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="glass-card rounded-2xl p-6 w-full max-w-md space-y-5"
            >
              <div className="flex items-center justify-between">
                <h3 className="font-display font-bold text-xl text-foreground">Write a Review</h3>
                <button onClick={() => setShowReviewForm(false)} className="p-1 rounded-lg hover:bg-secondary transition-colors">
                  <X className="w-5 h-5 text-muted-foreground" />
                </button>
              </div>

              {/* Star rating */}
              <div>
                <p className="text-sm font-body text-muted-foreground mb-2">Your Rating</p>
                <div className="flex gap-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button key={star} onClick={() => setReviewRating(star)} className="transition-transform hover:scale-110">
                      <Star className={`w-7 h-7 ${star <= reviewRating ? "text-primary fill-primary" : "text-muted-foreground/30"}`} />
                    </button>
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
                  className="w-full bg-secondary border border-border rounded-xl px-4 py-3 text-foreground font-body placeholder:text-muted-foreground outline-none focus:border-primary transition-all resize-none"
                />
                <p className="text-xs text-muted-foreground font-body mt-1">{reviewText.length}/500</p>
              </div>

              <button
                onClick={submitReview}
                disabled={submittingReview}
                className="w-full flex items-center justify-center gap-2 bg-gradient-fire text-primary-foreground px-6 py-3 rounded-xl font-bold font-body hover:shadow-fire transition-all disabled:opacity-50"
              >
                {submittingReview ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
                Submit Review
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

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
