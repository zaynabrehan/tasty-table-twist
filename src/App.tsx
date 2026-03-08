import CartPanel from "@/components/CartPanel";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { StoreProvider } from "@/context/StoreContext";
import { AuthProvider } from "@/hooks/useAuth";
import About from "@/pages/About";
import Admin from "@/pages/Admin";
import BranchSelection from "@/pages/BranchSelection";
import Checkout from "@/pages/checkout";
import Contact from "@/pages/Contact";
import Favorites from "@/pages/Favorites";
import Home from "@/pages/Home";
import MenuPage from "@/pages/MenuPage";
import Orders from "@/pages/Orders";
import OrderTracking from "@/pages/OrderTracking";
import SignIn from "@/pages/signin";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const AppLayout = () => {
  const location = useLocation();
  const isBranchPage = location.pathname === "/";

  return (
    <>
      <Navbar />
      <main className="min-h-screen">
        <Routes>
          <Route path="/" element={<BranchSelection />} />
          <Route path="/home" element={<Home />} />
          <Route path="/menu" element={<MenuPage />} />
          <Route path="/favorites" element={<Favorites />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="/orders/:orderId" element={<OrderTracking />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      {!isBranchPage && <Footer />}
      <CartPanel />
    </>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <AuthProvider>
        <StoreProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <AppLayout />
          </BrowserRouter>
        </StoreProvider>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
