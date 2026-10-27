import { StarIcon, PlusIcon } from "../assets/icons";
import { formatPrice } from "../data/mockData";

export default function ProductCard({ product, onSelect, onAdd }) {
  return (
    <article
      onClick={() => onSelect(product)}
      className="cursor-pointer rounded-2xl bg-white p-2 shadow-sm transition duration-200 hover:-translate-y-1 hover:shadow-lg"
    >
      <div className="relative overflow-hidden rounded-xl">
        <img
          src={product.image}
          alt={product.name}
          className="h-32 w-full object-cover transition duration-300 hover:scale-105"
        />
        <span className="absolute right-0 top-0 flex items-center gap-1 rounded-bl-2xl bg-black/40 px-2.5 py-1 text-[10px] font-semibold text-white backdrop-blur">
          <StarIcon size={11} className="fill-gold text-gold" />
          {product.rating}
        </span>
      </div>

      <div className="px-1 pb-1 pt-3">
        <h3 className="truncate text-sm font-semibold">{product.name}</h3>
        <p className="text-xs text-gray-400">{product.subtitle}</p>
        <div className="mt-3 flex items-center justify-between">
          <span className="text-base font-semibold">{formatPrice(product.price)}</span>
          <button
            aria-label={`Add ${product.name} to cart`}
            onClick={(e) => {
              e.stopPropagation();
              onAdd(product);
            }}
            className="flex h-8 w-8 items-center justify-center rounded-lg bg-coffee text-white transition hover:brightness-110 active:scale-90"
          >
            <PlusIcon size={16} />
          </button>
        </div>
      </div>
    </article>
  );
}
