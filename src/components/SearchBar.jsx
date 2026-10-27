import { SearchIcon, FilterIcon } from "../assets/icons";

export default function SearchBar({ value, onChange }) {
  return (
    <div className="flex items-center gap-4">
      <label className="flex h-12 flex-1 items-center gap-3 rounded-xl bg-white/10 px-4 text-gray-400 focus-within:ring-2 focus-within:ring-coffee">
        <SearchIcon size={20} />
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="Search coffee"
          className="w-full bg-transparent text-sm text-white outline-none placeholder:text-gray-400"
        />
      </label>
      <button
        aria-label="Filters"
        className="flex h-12 w-12 items-center justify-center rounded-xl bg-coffee text-white transition hover:brightness-110 active:scale-95"
      >
        <FilterIcon size={20} />
      </button>
    </div>
  );
}
