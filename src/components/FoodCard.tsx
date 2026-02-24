import { Heart, Plus } from "lucide-react";
import { MenuItem } from "@/context/StoreContext";
import { useStore } from "@/context/StoreContext";

interface FoodCardProps {
  item: MenuItem;
}

const FoodCard = ({ item }: FoodCardProps) => {
  const { addToCart, toggleFavorite, isFavorite } = useStore();
  const fav = isFavorite(item.id);

  return (
    <div className="group bg-card rounded-xl overflow-hidden border border-border hover:border-primary/30 transition-all duration-300 shadow-card hover:shadow-gold animate-scale-in">
      {/* Image */}
      <div className="relative overflow-hidden aspect-square">
        <img
          src={item.image}
          alt={item.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />
        <button
          onClick={() => toggleFavorite(item.id)}
          className={`absolute top-3 right-3 w-9 h-9 rounded-full flex items-center justify-center transition-all ${
            fav
              ? "bg-accent text-accent-foreground"
              : "bg-background/70 backdrop-blur-sm text-muted-foreground hover:text-accent"
          }`}
        >
          <Heart className={`w-4 h-4 ${fav ? "fill-current" : ""}`} />
        </button>
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-background/80 to-transparent h-16" />
      </div>

      {/* Content */}
      <div className="p-4">
        <div className="flex items-start justify-between gap-2">
          <div className="min-w-0">
            <h3 className="font-display font-bold text-foreground truncate">
              {item.name}
            </h3>
            <p className="text-xs text-muted-foreground mt-1 line-clamp-2 font-body">
              {item.description}
            </p>
          </div>
        </div>
        <div className="flex items-center justify-between mt-3">
          <span className="text-lg font-display font-bold text-primary">
            Rs. {item.price}
          </span>
          <button
            onClick={() => addToCart(item)}
            className="flex items-center gap-1.5 bg-gradient-gold text-primary-foreground px-3 py-1.5 rounded-lg text-sm font-bold hover:opacity-90 transition-opacity font-body"
          >
            <Plus className="w-4 h-4" />
            Add
          </button>
        </div>
      </div>
    </div>
  );
};

export default FoodCard;
