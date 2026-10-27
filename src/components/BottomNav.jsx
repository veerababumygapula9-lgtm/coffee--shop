import { HomeIcon, HeartIcon, BagIcon, BellIcon } from "../assets/icons";

const NAV_ITEMS = [
  { id: "home", label: "Home", Icon: HomeIcon },
  { id: "favorites", label: "Favorites", Icon: HeartIcon },
  { id: "bag", label: "Cart", Icon: BagIcon },
  { id: "notifications", label: "Notifications", Icon: BellIcon },
];

export default function BottomNav({ active, onChange, cartCount = 0 }) {
  return (
    <nav className="absolute inset-x-0 bottom-0 z-20 flex items-center justify-around rounded-t-3xl bg-white px-4 pb-[max(1.5rem,env(safe-area-inset-bottom))] pt-4 shadow-[0_-4px_20px_rgba(0,0,0,0.06)]">
      {NAV_ITEMS.map(({ id, label, Icon }) => {
        const isActive = active === id;
        return (
          <button
            key={id}
            aria-label={label}
            onClick={() => onChange(id)}
            className="relative flex flex-col items-center gap-1 p-2 transition active:scale-90"
          >
            <Icon
              size={24}
              className={`transition-colors ${isActive ? "fill-coffee text-coffee" : "text-gray-400"}`}
            />
            <span
              className={`h-1 rounded-full bg-coffee transition-all duration-300 ${
                isActive ? "w-3 opacity-100" : "w-0 opacity-0"
              }`}
            />
            {id === "bag" && cartCount > 0 && (
              <span className="absolute right-0 top-0 flex h-4 min-w-4 items-center justify-center rounded-full bg-danger px-1 text-[10px] font-semibold text-white">
                {cartCount}
              </span>
            )}
          </button>
        );
      })}
    </nav>
  );
}
