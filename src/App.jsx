import { useState } from "react";
import OnboardingScreen from "./screens/OnboardingScreen";
import HomeScreen from "./screens/HomeScreen";
import DetailScreen from "./screens/DetailScreen";
import CartScreen from "./screens/CartScreen";
import OrderTrackingScreen from "./screens/OrderTrackingScreen";
import BottomNav from "./components/BottomNav";

const SCREENS_WITH_NAV = ["home"];

export default function App() {
  const [screen, setScreen] = useState("onboarding");
  const [tab, setTab] = useState("home");
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [favorites, setFavorites] = useState([]);
  const [cart, setCart] = useState([]); // [{ productId, size, quantity }]

  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  const addToCart = (product, size = "M") => {
    setCart((current) => {
      const existing = current.find((i) => i.productId === product.id && i.size === size);
      if (existing) {
        return current.map((i) => (i === existing ? { ...i, quantity: i.quantity + 1 } : i));
      }
      return [...current, { productId: product.id, size, quantity: 1 }];
    });
  };

  const updateQuantity = (productId, size, delta) => {
    setCart((current) =>
      current
        .map((i) => (i.productId === productId && i.size === size ? { ...i, quantity: i.quantity + delta } : i))
        .filter((i) => i.quantity > 0)
    );
  };

  const toggleFavorite = (productId) => {
    setFavorites((current) =>
      current.includes(productId) ? current.filter((id) => id !== productId) : [...current, productId]
    );
  };

  const openProduct = (product) => {
    setSelectedProduct(product);
    setScreen("detail");
  };

  const handleBuyNow = (product, size) => {
    addToCart(product, size);
    setScreen("cart");
  };

  const handlePlaceOrder = () => {
    setCart([]);
    setScreen("tracking");
  };

  const handleBackToHome = () => {
    setTab("home");
    setScreen("home");
  };

  const handleNavChange = (id) => {
    if (id === "bag") return setScreen("cart");
    setTab(id);
    setScreen("home");
  };

  const renderScreen = () => {
    switch (screen) {
      case "onboarding":
        return <OnboardingScreen onStart={() => setScreen("home")} />;
      case "detail":
        return (
          <DetailScreen
            product={selectedProduct}
            isFavorite={favorites.includes(selectedProduct.id)}
            onToggleFavorite={toggleFavorite}
            onBack={() => setScreen("home")}
            onBuyNow={handleBuyNow}
          />
        );
      case "cart":
        return (
          <CartScreen
            cart={cart}
            onUpdateQuantity={updateQuantity}
            onBack={() => setScreen("home")}
            onPlaceOrder={handlePlaceOrder}
          />
        );
      case "tracking":
        return <OrderTrackingScreen onBack={handleBackToHome} />;
      default:
        return (
          <HomeScreen
            tab={tab}
            favorites={favorites}
            onSelectProduct={openProduct}
            onAddToCart={(product) => addToCart(product)}
          />
        );
    }
  };

  return (
    <main className="flex h-dvh w-full justify-center bg-gray-100">
      {/* Mobile-web layout: full viewport on phones, a centred column on larger screens */}
      <div className="relative h-full w-full max-w-md overflow-hidden bg-surface sm:shadow-xl">
        <div key={screen} className="h-full animate-fade-in">
          {renderScreen()}
        </div>

        {SCREENS_WITH_NAV.includes(screen) && (
          <BottomNav active={tab} onChange={handleNavChange} cartCount={cartCount} />
        )}
      </div>
    </main>
  );
}
