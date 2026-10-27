export default function CategoryTabs({ categories, selected, onSelect }) {
  return (
    <div className="no-scrollbar -mx-6 flex gap-3 overflow-x-auto px-6">
      {categories.map((category) => {
        const isActive = category === selected;
        return (
          <button
            key={category}
            onClick={() => onSelect(category)}
            className={`shrink-0 rounded-lg px-4 py-2 text-sm transition-all duration-200 ${
              isActive
                ? "bg-coffee font-semibold text-white shadow-md shadow-coffee/30"
                : "bg-white text-coffee-dark hover:bg-coffee-light"
            }`}
          >
            {category}
          </button>
        );
      })}
    </div>
  );
}
