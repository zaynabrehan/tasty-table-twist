import { MenuItem } from "@/context/StoreContext";

import foodSamosa from "@/assets/food-samosa.jpg";
import foodKebab from "@/assets/food-kebab.jpg";
import foodBiryani from "@/assets/food-biryani.jpg";
import foodTikka from "@/assets/food-tikka.jpg";
import foodNaan from "@/assets/food-naan.jpg";
import foodButterChicken from "@/assets/food-butter-chicken.jpg";
import foodNihari from "@/assets/food-nihari.jpg";
import foodGulabJamun from "@/assets/food-gulab-jamun.jpg";

export const menuItems: MenuItem[] = [
  {
    id: "1",
    name: "Crispy Samosas",
    description: "Golden fried pastry filled with spiced potatoes and peas, served with mint chutney",
    price: 350,
    category: "Appetizers",
    image: foodSamosa,
  },
  {
    id: "2",
    name: "Seekh Kebab",
    description: "Charcoal-grilled minced meat kebabs seasoned with aromatic spices",
    price: 750,
    category: "BBQ",
    image: foodKebab,
  },
  {
    id: "3",
    name: "Chicken Biryani",
    description: "Fragrant basmati rice layered with tender chicken and saffron",
    price: 850,
    category: "Rice",
    image: foodBiryani,
  },
  {
    id: "4",
    name: "Chicken Tikka",
    description: "Juicy boneless chicken marinated in yogurt and spices, char-grilled to perfection",
    price: 700,
    category: "BBQ",
    image: foodTikka,
  },
  {
    id: "5",
    name: "Butter Naan",
    description: "Soft leavened bread brushed with melted butter, baked in a tandoor",
    price: 120,
    category: "Breads",
    image: foodNaan,
  },
  {
    id: "6",
    name: "Butter Chicken",
    description: "Tender chicken in a rich, creamy tomato-based curry with aromatic spices",
    price: 950,
    category: "Curries",
    image: foodButterChicken,
  },
  {
    id: "7",
    name: "Nihari",
    description: "Slow-cooked beef stew with bone marrow, garnished with ginger and cilantro",
    price: 1100,
    category: "Curries",
    image: foodNihari,
  },
  {
    id: "8",
    name: "Gulab Jamun",
    description: "Deep-fried milk dumplings soaked in rose-scented sugar syrup",
    price: 400,
    category: "Desserts",
    image: foodGulabJamun,
  },
];

export const categories = ["All", "Appetizers", "BBQ", "Curries", "Rice", "Breads", "Desserts"];
