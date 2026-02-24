import FoodCard from "@/components/FoodCard";
import { menuItems } from "@/data/menu";
import { useStore } from "@/context/StoreContext";
import { Heart } from "lucide-react";
import { Link } from "react-router-dom";

const Favorites = () => {
  const { favorites } = useStore();
  const favoriteItems = menuItems.filter((i) => favorites.includes(i.id));

  return (
    <div className="container mx-auto px-4 py-10">
      <div className="text-center mb-10">
        <h1 className="text-4xl font-display font-bold text-foreground mb-2">
          Your <span className="text-gradient-gold">Favorites</span>
        </h1>
        <p className="text-muted-foreground font-body">
          Dishes you've saved for later
        </p>
      </div>

      {favoriteItems.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {favoriteItems.map((item) => (
            <FoodCard key={item.id} item={item} />
          ))}
        </div>
      ) : (
        <div className="text-center py-20">
          <Heart className="w-16 h-16 text-muted-foreground/30 mx-auto mb-4" />
          <p className="text-muted-foreground font-display text-xl">No favorites yet</p>
          <p className="text-sm text-muted-foreground font-body mt-1 mb-6">
            Tap the heart icon on any dish to save it here
          </p>
          <Link
            to="/menu"
            className="inline-flex bg-gradient-gold text-primary-foreground px-6 py-3 rounded-lg font-bold font-body hover:opacity-90 transition-opacity"
          >
            Browse Menu
          </Link>
        </div>
      )}
    </div>
  );
};

export default Favorites;
