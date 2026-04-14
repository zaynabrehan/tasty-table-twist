import { useNavigate } from "react-router-dom";
import { useStore } from "@/context/StoreContext";
import { MapPin, Clock, ArrowRight, Sparkles } from "lucide-react";
import { motion } from "framer-motion";
import restaurantInterior from "@/assets/restaurant-interior.jpg";
import JushhLogo from "@/components/JushhLogo";

const fadeUp = {
  hidden: { opacity: 0, y: 30, filter: "blur(8px)" },
  visible: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { delay: i * 0.15, duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] as const },
  }),
};

const BranchSelection = () => {
  const { setBranch } = useStore();
  const navigate = useNavigate();

  const selectBranch = (branchName: string) => {
    setBranch(branchName);
    navigate("/home");
  };

  const branches = [
    {
      name: "Johar Town",
      address: "R-2 Johar Town, Near Shaukat Khanum, Lahore",
      timing: "12 PM – 2 AM",
    },
    {
      name: "DHA",
      address: "100-H, DHA, Phase 01, Lahore",
      timing: "12 PM – 2 AM",
    },
  ];

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center relative overflow-hidden">
      {/* BG Image overlay */}
      <motion.div
        initial={{ scale: 1.1, opacity: 0 }}
        animate={{ scale: 1, opacity: 0.15 }}
        transition={{ duration: 1.5 }}
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${restaurantInterior})` }}
      />
      <div className="absolute inset-0 bg-background/85" />

      {/* Grid pattern */}
      <div className="absolute inset-0 opacity-[0.03]" style={{
        backgroundImage: `linear-gradient(hsl(30 90% 45% / 0.3) 1px, transparent 1px), linear-gradient(90deg, hsl(30 90% 45% / 0.3) 1px, transparent 1px)`,
        backgroundSize: '60px 60px'
      }} />

      {/* Morphing blobs */}
      <div className="absolute top-20 right-20 w-96 h-96 rounded-full bg-primary/5 blur-3xl animate-morph" />
      <div className="absolute bottom-20 left-20 w-72 h-72 rounded-full bg-accent/5 blur-3xl animate-morph" style={{ animationDelay: "3s" }} />

      {/* Animated particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 rounded-full bg-primary/30"
            style={{ left: `${15 + i * 15}%`, top: `${20 + (i % 3) * 25}%` }}
            animate={{ y: [-20, 20, -20], opacity: [0.1, 0.5, 0.1] }}
            transition={{ duration: 3 + i * 0.5, repeat: Infinity, ease: "easeInOut", delay: i * 0.3 }}
          />
        ))}
      </div>

      <motion.div
        initial="hidden"
        animate="visible"
        className="relative z-10 text-center px-4 max-w-2xl mx-auto"
      >
        <motion.div variants={fadeUp} custom={0} className="mb-2">
          <JushhLogo size="xl" showTagline />
        </motion.div>
        <motion.p variants={fadeUp} custom={1} className="text-lg text-muted-foreground font-body mb-2">
          Premium Pakistani & Turkish Cuisine
        </motion.p>
        <motion.div variants={fadeUp} custom={2} className="w-20 h-1 bg-gradient-fire mx-auto mb-12 rounded-full" />

        <motion.h2 variants={fadeUp} custom={3} className="text-xl font-display font-semibold text-foreground mb-8 flex items-center justify-center gap-2">
          <Sparkles className="w-5 h-5 text-primary" />
          Select Your Branch
        </motion.h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {branches.map((b, i) => (
            <motion.button
              key={b.name}
              variants={fadeUp}
              custom={4 + i}
              onClick={() => selectBranch(b.name)}
              whileHover={{ y: -8, scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="group glass-card rounded-2xl p-6 text-left transition-all duration-300 hover:shadow-fire gradient-border-animated"
            >
              <div className="flex items-center gap-2 mb-3">
                <motion.div
                  className="w-8 h-8 rounded-lg bg-gradient-fire flex items-center justify-center"
                  whileHover={{ rotate: 15 }}
                >
                  <MapPin className="w-4 h-4 text-primary-foreground" />
                </motion.div>
                <h3 className="text-lg font-display font-bold text-foreground group-hover:text-primary transition-colors">
                  {b.name}
                </h3>
              </div>
              <p className="text-sm text-muted-foreground font-body mb-2">
                {b.address}
              </p>
              <div className="flex items-center gap-1.5 text-xs text-muted-foreground font-body mb-4">
                <Clock className="w-3.5 h-3.5 text-primary" />
                {b.timing}
              </div>
              <div className="flex items-center gap-1 text-primary text-sm font-bold font-body group-hover:gap-2 transition-all">
                Order Now <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </motion.button>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default BranchSelection;
