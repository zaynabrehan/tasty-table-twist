import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import FoodCard from "@/components/FoodCard";
import { menuItems } from "@/data/menu";
import heroBanner from "@/assets/hero-banner.jpg";

const Home = () => {
  const appetizers = menuItems.filter((i) => i.category === "Appetizers" || i.category === "BBQ").slice(0, 4);

  return (
    <div>
      {/* Hero */}
      <section className="relative h-[70vh] min-h-[500px] overflow-hidden">
        <img
          src={heroBanner}
          alt="Jushhpk Restaurant signature dishes spread"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-background/90 via-background/60 to-transparent" />
        <div className="relative z-10 container mx-auto px-4 h-full flex items-center">
          <div className="max-w-lg animate-fade-in">
            <h1 className="text-4xl md:text-6xl font-display font-bold text-foreground leading-tight mb-4">
              Taste the <span className="text-gradient-gold">Authentic</span> Flavors
            </h1>
            <p className="text-muted-foreground font-body text-lg mb-8 leading-relaxed">
              From sizzling kebabs to aromatic biryanis — experience the finest Pakistani cuisine crafted with love and tradition.
            </p>
            <Link
              to="/menu"
              className="inline-flex items-center gap-2 bg-gradient-gold text-primary-foreground px-8 py-3.5 rounded-lg font-bold font-body hover:opacity-90 transition-opacity text-lg"
            >
              Order Now <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Appetizers Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="flex items-end justify-between mb-8">
          <div>
            <h2 className="text-3xl font-display font-bold text-foreground">
              Popular <span className="text-gradient-gold">Picks</span>
            </h2>
            <p className="text-muted-foreground font-body mt-2">Our most loved dishes</p>
          </div>
          <Link
            to="/menu"
            className="text-primary font-body font-bold text-sm flex items-center gap-1 hover:gap-2 transition-all"
          >
            View Full Menu <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {appetizers.map((item) => (
            <FoodCard key={item.id} item={item} />
          ))}
        </div>
      </section>

      {/* CTA Banner */}
      <section className="container mx-auto px-4 pb-16">
        <div className="relative rounded-2xl overflow-hidden bg-card border border-border p-8 md:p-12">
          <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-transparent" />
          <div className="relative z-10 max-w-md">
            <h3 className="text-2xl md:text-3xl font-display font-bold text-foreground mb-3">
              Craving Something Special?
            </h3>
            <p className="text-muted-foreground font-body mb-6">
              Browse our full menu with over 50+ dishes from appetizers to desserts.
            </p>
            <Link
              to="/menu"
              className="inline-flex items-center gap-2 bg-gradient-gold text-primary-foreground px-6 py-3 rounded-lg font-bold font-body hover:opacity-90 transition-opacity"
            >
              Explore Menu <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
