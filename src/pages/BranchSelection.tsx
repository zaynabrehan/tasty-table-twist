import { useNavigate } from "react-router-dom";
import { useStore } from "@/context/StoreContext";
import { MapPin, Clock, ArrowRight } from "lucide-react";
import restaurantInterior from "@/assets/restaurant-interior.jpg";

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
      address: "Main Boulevard, Johar Town, Lahore",
      timing: "12 PM – 2 AM",
    },
    {
      name: "DHA",
      address: "MM Alam Road, DHA Phase 5, Lahore",
      timing: "12 PM – 2 AM",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-dark flex flex-col items-center justify-center relative overflow-hidden">
      {/* BG Image overlay */}
      <div
        className="absolute inset-0 opacity-20 bg-cover bg-center"
        style={{ backgroundImage: `url(${restaurantInterior})` }}
      />
      <div className="absolute inset-0 bg-background/80" />

      <div className="relative z-10 text-center px-4 max-w-2xl mx-auto">
        <h1 className="text-5xl md:text-7xl font-display font-bold text-primary mb-3 tracking-wider">
          HOWDY
        </h1>
        <p className="text-lg text-muted-foreground font-body mb-2">
          Premium Pakistani Cuisine
        </p>
        <div className="w-20 h-0.5 bg-gradient-gold mx-auto mb-10" />

        <h2 className="text-xl font-display font-semibold text-foreground mb-8">
          Select Your Branch
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {branches.map((b) => (
            <button
              key={b.name}
              onClick={() => selectBranch(b.name)}
              className="group bg-card/80 backdrop-blur-sm border border-border hover:border-primary/50 rounded-xl p-6 text-left transition-all duration-300 hover:shadow-gold"
            >
              <div className="flex items-center gap-2 mb-3">
                <MapPin className="w-5 h-5 text-primary" />
                <h3 className="text-lg font-display font-bold text-foreground">
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
                Order Now <ArrowRight className="w-4 h-4" />
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BranchSelection;
