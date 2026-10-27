import { useState } from "react";
import ScreenHeader from "../components/ScreenHeader";
import { HeartIcon, StarIcon, CourierIcon, BeanIcon, MilkIcon } from "../assets/icons";
import { SIZES, formatPrice, getUnitPrice } from "../data/mockData";

const FEATURE_ICONS = [CourierIcon, BeanIcon, MilkIcon];

export default function DetailScreen({ product, isFavorite, onToggleFavorite, onBack, onBuyNow }) {
  const [size, setSize] = useState("M");
  const [expanded, setExpanded] = useState(false);

  const shortDescription = product.description.slice(0, 110);

  return (
    <div className="flex h-full flex-col bg-surface">
      <ScreenHeader
        title="Detail"
        onBack={onBack}
        right={
          <button
            onClick={() => onToggleFavorite(product.id)}
            aria-label="Toggle favorite"
            className="transition active:scale-75"
          >
            <HeartIcon
              size={24}
              className={`transition-colors ${isFavorite ? "fill-danger text-danger" : "text-coffee-dark"}`}
            />
          </button>
        }
      />

      <div className="no-scrollbar min-h-0 flex-1 overflow-y-auto px-6 pb-6">
        <img src={product.image} alt={product.name} className="h-48 w-full rounded-3xl object-cover" />

        <div className="mt-5 flex items-start justify-between">
          <div>
            <h2 className="text-xl font-semibold">{product.name}</h2>
            <p className="mt-1 text-xs text-gray-400">{product.variant}</p>
            <div className="mt-4 flex items-center gap-1.5">
              <StarIcon size={20} className="fill-gold text-gold" />
              <span className="text-base font-semibold">{product.rating}</span>
              <span className="text-xs text-gray-400">({product.reviews})</span>
            </div>
          </div>
          <div className="flex gap-3">
            {FEATURE_ICONS.map((Icon, index) => (
              <span key={index} className="flex h-11 w-11 items-center justify-center rounded-xl bg-coffee-cream text-coffee">
                <Icon size={22} />
              </span>
            ))}
          </div>
        </div>

        <hr className="my-5 border-coffee-muted" />

        <h3 className="text-base font-semibold">Description</h3>
        <p className="mt-2 text-sm leading-relaxed text-gray-500">
          {expanded ? product.description : `${shortDescription}.. `}
          <button onClick={() => setExpanded((v) => !v)} className="font-semibold text-coffee">
            {expanded ? "Show Less" : "Read More"}
          </button>
        </p>

        <h3 className="mb-3 mt-6 text-base font-semibold">Size</h3>
        <div className="grid grid-cols-3 gap-3">
          {SIZES.map((option) => (
            <button
              key={option}
              onClick={() => setSize(option)}
              className={`rounded-xl border py-2.5 text-sm transition ${
                size === option
                  ? "border-coffee bg-coffee-cream text-coffee"
                  : "border-coffee-muted bg-white hover:border-coffee-light"
              }`}
            >
              {option}
            </button>
          ))}
        </div>
      </div>

      <footer className="flex items-center gap-6 rounded-t-3xl bg-white px-6 pb-8 pt-5 shadow-[0_-4px_20px_rgba(0,0,0,0.06)]">
        <div>
          <p className="text-xs text-gray-400">Price</p>
          <p className="text-lg font-semibold text-coffee">{formatPrice(getUnitPrice(product, size))}</p>
        </div>
        <button
          onClick={() => onBuyNow(product, size)}
          className="h-14 flex-1 rounded-2xl bg-coffee text-base font-semibold text-white transition hover:brightness-110 active:scale-[0.98]"
        >
          Buy Now
        </button>
      </footer>
    </div>
  );
}
