import { useState } from "react";
import ScreenHeader from "../components/ScreenHeader";
import QuantitySelector from "../components/QuantitySelector";
import {
  EditIcon, NoteIcon, DiscountIcon, ChevronRightIcon, ChevronDownIcon, WalletIcon,
} from "../assets/icons";
import {
  DELIVERY_FEE, DELIVERY_DISCOUNT, PRODUCTS, formatPrice, getUnitPrice,
} from "../data/mockData";

export default function CartScreen({ cart, onUpdateQuantity, onBack, onPlaceOrder }) {
  const [mode, setMode] = useState("deliver");
  const isDelivery = mode === "deliver";

  const lines = cart.map((item) => {
    const product = PRODUCTS.find((p) => p.id === item.productId);
    return { ...item, product, unitPrice: getUnitPrice(product, item.size) };
  });

  const subtotal = lines.reduce((sum, line) => sum + line.unitPrice * line.quantity, 0);
  const deliveryFee = isDelivery ? DELIVERY_FEE - DELIVERY_DISCOUNT : 0;
  const total = subtotal + deliveryFee;

  return (
    <div className="flex h-full flex-col bg-surface">
      <ScreenHeader title="Order" onBack={onBack} />

      {lines.length === 0 ? (
        <div className="flex flex-1 flex-col items-center justify-center gap-2 px-10 text-center">
          <h2 className="text-lg font-semibold">Your cart is empty</h2>
          <p className="text-sm text-gray-400">Add a coffee from the menu to get started.</p>
          <button onClick={onBack} className="mt-4 rounded-xl bg-coffee px-6 py-3 text-sm font-semibold text-white">
            Browse Menu
          </button>
        </div>
      ) : (
        <>
          <div className="no-scrollbar min-h-0 flex-1 overflow-y-auto px-6 pb-6">
            <div className="flex rounded-xl bg-coffee-muted/50 p-1">
              {[["deliver", "Deliver"], ["pickup", "Pick Up"]].map(([id, label]) => (
                <button
                  key={id}
                  onClick={() => setMode(id)}
                  className={`flex-1 rounded-lg py-2.5 text-sm transition-all duration-200 ${
                    mode === id ? "bg-coffee font-semibold text-white shadow" : "text-coffee-dark"
                  }`}
                >
                  {label}
                </button>
              ))}
            </div>

            {isDelivery && (
              <section className="mt-6">
                <h3 className="text-base font-semibold">Delivery Address</h3>
                <p className="mt-4 text-sm font-semibold">Jl. Kpg Sutoyo</p>
                <p className="mt-1 text-xs text-gray-400">Kpg. Sutoyo No. 620, Bilzen, Tanjungbalai.</p>
                <div className="mt-4 flex gap-3">
                  {[[EditIcon, "Edit Address"], [NoteIcon, "Add Note"]].map(([Icon, label]) => (
                    <button
                      key={label}
                      className="flex items-center gap-1.5 rounded-full border border-gray-300 px-3 py-1.5 text-xs transition hover:bg-coffee-cream"
                    >
                      <Icon size={14} />
                      {label}
                    </button>
                  ))}
                </div>
              </section>
            )}

            <hr className="my-5 border-coffee-muted" />

            <ul className="space-y-4">
              {lines.map((line) => (
                <li key={`${line.productId}-${line.size}`} className="flex items-center gap-4">
                  <img src={line.product.image} alt="" className="h-14 w-14 rounded-xl object-cover" />
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-semibold">{line.product.name}</p>
                    <p className="text-xs text-gray-400">
                      {line.product.subtitle} · {line.size}
                    </p>
                  </div>
                  <QuantitySelector
                    quantity={line.quantity}
                    onIncrease={() => onUpdateQuantity(line.productId, line.size, 1)}
                    onDecrease={() => onUpdateQuantity(line.productId, line.size, -1)}
                  />
                </li>
              ))}
            </ul>

            {isDelivery && (
              <button className="mt-6 flex w-full items-center gap-3 rounded-2xl border border-coffee-muted bg-white px-4 py-4 text-left transition hover:border-coffee-light">
                <DiscountIcon size={22} className="text-coffee" />
                <span className="flex-1 text-sm font-semibold">1 Discount is Applies</span>
                <ChevronRightIcon size={20} />
              </button>
            )}

            <section className="mt-6">
              <h3 className="text-base font-semibold">Payment Summary</h3>
              <dl className="mt-4 space-y-3 text-sm">
                <div className="flex justify-between">
                  <dt>Price</dt>
                  <dd className="font-semibold">{formatPrice(subtotal)}</dd>
                </div>
                {isDelivery && (
                  <div className="flex justify-between">
                    <dt>Delivery Fee</dt>
                    <dd className="flex gap-2 font-semibold">
                      <span className="font-normal text-gray-400 line-through">$ {DELIVERY_FEE.toFixed(1)}</span>
                      $ {deliveryFee.toFixed(1)}
                    </dd>
                  </div>
                )}
              </dl>
            </section>
          </div>

          <footer className="rounded-t-3xl bg-white px-6 pb-8 pt-5 shadow-[0_-4px_20px_rgba(0,0,0,0.06)]">
            <div className="mb-4 flex items-center gap-3">
              <WalletIcon size={24} className="text-coffee" />
              <div className="flex-1">
                <p className="text-sm font-semibold">Cash/Wallet</p>
                <p className="text-sm font-semibold text-coffee">{formatPrice(total)}</p>
              </div>
              <ChevronDownIcon size={22} />
            </div>
            <button
              onClick={onPlaceOrder}
              className="h-14 w-full rounded-2xl bg-coffee text-base font-semibold text-white transition hover:brightness-110 active:scale-[0.98]"
            >
              Order
            </button>
          </footer>
        </>
      )}
    </div>
  );
}
