import { Tables } from "@/integrations/supabase/types";
import { useStore } from "@/context/StoreContext";
import { Heart, Plus, ShoppingBag } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import BeverageUpsellModal from "@/components/BeverageUpsellModal";

type DbMenuItem = Tables<"menu_items">;

interface FoodCardProps {
  item: DbMenuItem;
}

const NON_UPSELL_CATEGORIES = ["Beverages", "Add-ons", "Sauces", "Jushhpk Desserts"];

const FoodCard = ({ item }: FoodCardProps) => {
  const { addToCart, toggleFavorite, isFavorite, openCart } = useStore();
  const fav = isFavorite(item.id);
  const imageUrl = item.image_url || "/placeholder.svg";
  const [showBeverageModal, setShowBeverageModal] = useState(false);
  const [justAdded, setJustAdded] = useState(false);

  const isMainItem = !NON_UPSELL_CATEGORIES.includes(item.category);

  const handleAdd = () => {
    setJustAdded(true);
    setTimeout(() => setJustAdded(false), 1200);

    if (isMainItem) {
      addToCart(
        {
          id: item.id,
          name: item.name,
          description: item.description || "",
          price: item.price,
          category: item.category,
          image: imageUrl,
        },
        false
      );
      setShowBeverageModal(true);
    } else {
      addToCart({
        id: item.id,
        name: item.name,
        description: item.description || "",
        price: item.price,
        category: item.category,
        image: imageUrl,
      });
    }
  };

  const handleUpsellClose = () => {
    setShowBeverageModal(false);
    openCart();
  };

  return (
    <>
      <motion.div
        className="group relative rounded-2xl overflow-hidden magnetic-hover"
        whileHover={{ y: -6 }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
      >
        {/* Animated gradient border on hover */}
        <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10 p-[1.5px] bg-gradient-to-r from-primary via-accent to-primary bg-[length:200%_200%] animate-gradient-x" />

        <div className="glass-card rounded-2xl overflow-hidden h-full">
          <div className="relative overflow-hidden aspect-square">
            <img
              src={imageUrl}
              alt={item.name}
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
              loading="lazy"
            />
            {/* Overlay on hover */}
            <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

            {/* Fav button */}
            <motion.button
              onClick={() => toggleFavorite(item.id)}
              whileTap={{ scale: 0.8 }}
              className={`absolute top-3 right-3 w-9 h-9 rounded-full flex items-center justify-center transition-all duration-300 ${
                fav
                  ? "bg-accent text-accent-foreground shadow-fire"
                  : "glass text-muted-foreground hover:text-accent hover:shadow-fire"
              }`}
            >
              <Heart className={`w-4 h-4 transition-transform duration-300 ${fav ? "fill-current scale-110" : "group-hover:scale-110"}`} />
            </motion.button>

            {/* Category badge */}
            <div className="absolute top-3 left-3 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0">
              <span className="text-[10px] font-bold font-body uppercase tracking-wider bg-background/80 backdrop-blur-md text-primary px-2.5 py-1 rounded-full border border-primary/20">
                {item.category}
              </span>
            </div>

            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-background/90 to-transparent h-20" />
          </div>

          <div className="p-4">
            <div className="flex items-start justify-between gap-2">
              <div className="min-w-0">
                <h3 className="font-display font-bold text-foreground truncate group-hover:text-primary transition-colors duration-300">
                  {item.name}
                </h3>
                <p className="text-xs text-muted-foreground mt-1 line-clamp-2 font-body">
                  {item.description || ""}
                </p>
              </div>
            </div>
            <div className="flex items-center justify-between mt-3">
              <span className="text-lg font-display font-bold text-gradient-fire">
                Rs. {item.price}
              </span>
              <motion.button
                whileTap={{ scale: 0.9 }}
                whileHover={{ scale: 1.05 }}
                onClick={handleAdd}
                className="relative flex items-center gap-1.5 bg-gradient-fire text-primary-foreground px-3 py-1.5 rounded-lg text-sm font-bold hover:shadow-fire transition-all font-body overflow-hidden glow-pulse"
              >
                <AnimatePresence mode="wait">
                  {justAdded ? (
                    <motion.span
                      key="added"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="flex items-center gap-1"
                    >
                      <ShoppingBag className="w-4 h-4" /> Added!
                    </motion.span>
                  ) : (
                    <motion.span
                      key="add"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="flex items-center gap-1"
                    >
                      <Plus className="w-4 h-4" /> Add
                    </motion.span>
                  )}
                </AnimatePresence>
                {/* Shimmer overlay on button */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-primary-foreground/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
              </motion.button>
            </div>
          </div>
        </div>
      </motion.div>

      <BeverageUpsellModal
        open={showBeverageModal}
        onClose={handleUpsellClose}
        addedItemName={item.name}
      />
    </>
  );
};

export default FoodCard;
