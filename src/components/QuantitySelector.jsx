import { PlusIcon, MinusIcon } from "../assets/icons";

export default function QuantitySelector({ quantity, onIncrease, onDecrease }) {
  const buttonStyles =
    "flex h-8 w-8 items-center justify-center rounded-full border border-coffee-muted bg-white shadow-sm transition active:scale-90";

  return (
    <div className="flex items-center gap-3">
      <button onClick={onDecrease} aria-label="Decrease quantity" className={buttonStyles}>
        <MinusIcon size={14} />
      </button>
      <span className="w-4 text-center text-sm font-semibold">{quantity}</span>
      <button onClick={onIncrease} aria-label="Increase quantity" className={buttonStyles}>
        <PlusIcon size={14} />
      </button>
    </div>
  );
}
