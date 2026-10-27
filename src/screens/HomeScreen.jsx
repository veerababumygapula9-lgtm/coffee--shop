import { useMemo, useState } from "react";
import SearchBar from "../components/SearchBar";
import PromoBanner from "../components/PromoBanner";
import CategoryTabs from "../components/CategoryTabs";
import ProductCard from "../components/ProductCard";
import { CATEGORIES, PRODUCTS } from "../data/mockData";
import { ChevronDownIcon, BellIcon } from "../assets/icons";

export default function HomeScreen({ tab, favorites, onSelectProduct, onAddToCart }) {
  const [category, setCategory] = useState(CATEGORIES[0]);
  const [query, setQuery] = useState("");

  const visibleProducts = useMemo(() => {
    return PRODUCTS.filter((product) => {
      const matchesTab = tab === "favorites" ? favorites.includes(product.id) : true;
      const matchesCategory = category === CATEGORIES[0] || product.category === category;
      const matchesQuery = product.name.toLowerCase().includes(query.trim().toLowerCase());
      return matchesTab && matchesCategory && matchesQuery;
    });
  }, [tab, favorites, category, query]);

  if (tab === "notifications") {
    return (
      <div className="flex h-full flex-col items-center justify-center gap-3 px-10 pb-24 text-center">
        <BellIcon size={40} className="text-coffee" />
        <h2 className="text-lg font-semibold">No notifications yet</h2>
        <p className="text-sm text-gray-400">We'll let you know when your order or a new promo is on its way.</p>
      </div>
    );
  }

  return (
    <div className="flex h-full flex-col bg-surface">
      {/* Fixed header: stays put while the feed scrolls underneath */}
      <header className="shrink-0 bg-coffee-dark px-6 pb-4 pt-10">
        <p className="text-xs text-gray-400">Location</p>
        <button className="mb-5 mt-1 flex items-center gap-2 text-sm font-semibold text-gray-200">
          Bilzen, Tanjungbalai
          <ChevronDownIcon size={16} />
        </button>
        <SearchBar value={query} onChange={setQuery} />
      </header>

      {/* Scrollable feed. pb-32 keeps the last row clear of the bottom nav */}
      <div className="no-scrollbar min-h-0 flex-1 overflow-y-auto pb-32">
        <div className="relative">
          {/* Dark strip behind the top half of the promo card, as in the design */}
          <div aria-hidden className="absolute inset-x-0 top-0 h-20 bg-coffee-dark" />

          <div className="relative space-y-6 px-6">
            <PromoBanner />
            <CategoryTabs categories={CATEGORIES} selected={category} onSelect={setCategory} />

            {visibleProducts.length > 0 ? (
              <div className="grid grid-cols-2 gap-4">
                {visibleProducts.map((product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    onSelect={onSelectProduct}
                    onAdd={onAddToCart}
                  />
                ))}
              </div>
            ) : (
              <p className="py-12 text-center text-sm text-gray-400">
                {tab === "favorites" ? "You haven't favorited any coffee yet." : "No coffee matches your search."}
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
